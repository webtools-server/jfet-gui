/**
 * 项目store
 */

import mainGlobal from '@/util/main_global';
import lsStorage from '@/util/ls_storage';
import fse from 'fs-extra';
import path from 'path';
import { Notification } from 'element-ui';

const {
  PROJECT_STORAGE_NAME,
  JFET_GUI_SETTING_DIR_NAME,
  JFET_GUI_COMMAND_SETTING_FILE,
  DEFAULT_PROJECT_PATH
} = mainGlobal.constants;
const projectSession = mainGlobal.sessions.projectSession;

// initial state
const initialState = {
  list: [], // 项目列表
  commands: [], // 命令行
  dependencies: [], // 依赖
  xtermText: ''
};

// getters
const initialGetters = {
  projectList: state => state.list,
  commands: state => state.commands,
  dependencies: state => state.dependencies,
  xtermText: state => state.xtermText
};

// actions
const actions = {
  // 打开项目
  async openProject({ dispatch }) {
    const result = await mainGlobal.folder.select({
      defaultPath: DEFAULT_PROJECT_PATH
    });
    if (result.success) {
      if (Array.isArray(result.data)) {
        result.data.forEach((file) => {
          const pathname = path.basename(file);
          // 添加项目
          dispatch('addProject', {
            name: pathname,
            path: file
          }).then((res) => {
            if (!res.success) {
              Notification.error({
                title: '错误',
                message: res.message
              });
            }
          });

          // const exist = await fse.pathExists(path.join(arg, JFET_GUI_SETTING_DIR_NAME));
          // if (exist) {
          //   openJfetProject(arg);
          // } else {
          // openOtherProject(file);
          // }
        });
      }
    }
  },
  // 初始化项目列表
  initProjectList({ commit }) {
    const projectList = lsStorage.get(PROJECT_STORAGE_NAME);
    if (Array.isArray(projectList)) {
      commit('initProjectList', projectList);
    }
  },
  initSession(context, options) {
    const { cwd, command } = options;
    // init new terminal
    const session = projectSession.start(cwd, command || '__default__');
    return session;
  },
  startCommand({ commit, dispatch }, options) {
    commit('startCommand', options.command);
    return dispatch('initSession', options);
  },
  stopCommand({ commit }, options) {
    commit('stopCommand', options.command);
    projectSession.stopCommand(options.cwd, options.command);
  },
  // 初始化项目
  initProject({ commit }, project) {
    const commandFilePath = path.join(
      project.path,
      JFET_GUI_SETTING_DIR_NAME,
      JFET_GUI_COMMAND_SETTING_FILE
    );
    const existCommandFile = fse.pathExistsSync(commandFilePath);
    const packageJsonPath = path.join(project.path, 'package.json');
    const existPackageJson = fse.pathExistsSync(packageJsonPath);
    let initCommand = false;
    let initDependencies = false;

    // 如果项目根目录存在gui命令行配置
    if (existCommandFile) {
      const commandFileContent = fse.readJsonSync(commandFilePath);
      commit('initCommand', commandFileContent.command);
      initCommand = true;
    }

    if (existPackageJson) { // 如果项目根目录存在package.json文件
      const command = [];
      const packageJsonContent = fse.readJsonSync(packageJsonPath);
      // 如果没有initCommand
      if (!initCommand) {
        const scripts = packageJsonContent.scripts || {};
        for (const k in scripts) {
          command.push({
            index: command.length,
            name: k,
            command: scripts[k],
            key: k,
            running: projectSession.checkCommand(project.path, scripts[k])
          });
        }
        commit('initCommand', command);
        initCommand = true;
      }

      // 依赖处理
      const dependencies = packageJsonContent.dependencies || {};
      const devDependencies = packageJsonContent.devDependencies || {};
      const projectDeps = [].concat(
        Object.keys(dependencies).map((dep) => {
          return {
            name: dep,
            version: dependencies[dep]
          };
        }),
        Object.keys(devDependencies).map((dep) => {
          return {
            name: dep,
            version: devDependencies[dep]
          };
        })
      );
      commit('initDependencies', projectDeps);
      initDependencies = true;
    }

    if (!initCommand) {
      commit('initCommand', []);
    }
    if (!initDependencies) {
      commit('initDependencies', []);
    }
    commit('updateXtermText', projectSession.queryLogs(project.path));
  },
  // 添加项目
  addProject({ commit }, project) {
    let projectList = lsStorage.get(PROJECT_STORAGE_NAME);
    if (!projectList) {
      projectList = [];
    }
    // 判断项目是否已经存在
    const projects = projectList.filter(p => p.path === project.path);
    if (projects.length > 0) {
      return {
        success: false,
        message: '项目已存在'
      };
    }
    projectList.push(project);
    // 存储
    lsStorage.set(PROJECT_STORAGE_NAME, projectList);
    commit('addProject', project);
    return { success: true };
  },
  // 删除项目
  deleteProject({ commit }, project) {
    const projectList = lsStorage.get(PROJECT_STORAGE_NAME);
    const index = projectList.findIndex(p => p.path === project.path);
    projectList.splice(index, 1);
    // 存储
    lsStorage.set(PROJECT_STORAGE_NAME, projectList);
    commit('initProjectList', projectList);
    // stop session
    projectSession.stop(project.path);
  },
  // 查询项目
  queryProject(context, pathname) {
    return lsStorage.get(PROJECT_STORAGE_NAME).filter(p => p.path === pathname)[0];
  }
};

// mutations
const mutations = {
  startCommand(state, command) {
    const index = state.commands.findIndex(c => c.command === command);
    if (index > -1 && state.commands[index]) {
      state.commands[index].running = true;
    }
  },
  stopCommand(state, command) {
    const index = state.commands.findIndex(c => c.command === command);
    if (index > -1 && state.commands[index]) {
      state.commands[index].running = false;
    }
  },
  updateXtermText(state, text) {
    state.xtermText = text;
  },
  initProjectList(state, projects = []) {
    state.list = projects;
  },
  addProject(state, project) {
    if (Array.isArray(project)) {
      state.list = state.list.concat(project);
    } else {
      state.list.push(project);
    }
  },
  initCommand(state, commands = {}) {
    state.commands = commands;
  },
  initDependencies(state, dependencies = {}) {
    state.dependencies = dependencies;
  }
};

export default {
  namespaced: true,
  state: initialState,
  getters: initialGetters,
  actions,
  mutations
};
