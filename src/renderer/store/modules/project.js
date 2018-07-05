

import { PROJECT_STORAGE_NAME, JFET_GUI_SETTING_DIR_NAME, JFET_GUI_COMMAND_SETTING_FILE } from '@/util/constants';
import lsStorage from '@/util/ls_storage';
import { Notification } from 'element-ui';
import fse from 'fs-extra';
import path from 'path';

// initial state
const initialState = {
  list: [], // 项目列表
  command: [] // 命令行列表
};

// getters
const initialGetters = {
  projectList: state => state.list,
  commandList: state => state.command
};

// actions
const actions = {
  // 初始化项目列表
  initProjectList({ commit }) {
    const projectList = lsStorage.get(PROJECT_STORAGE_NAME);
    if (Array.isArray(projectList)) {
      commit('initProjectList', projectList);
    }
  },
  // 初始化项目
  initProject({ commit }, project) {
    const commandFilePath = path.join(
      project.path,
      JFET_GUI_SETTING_DIR_NAME,
      JFET_GUI_COMMAND_SETTING_FILE
    );
    const existCommandFile = fse.pathExistsSync(commandFilePath);
    // 如果项目根目录存在gui命令行配置
    if (existCommandFile) {
      const commandFileContent = fse.readJsonSync(commandFilePath);
      commit('initCommand', commandFileContent.command);
      return;
    }

    const packageJsonPath = path.join(project.path, 'package.json');
    const existPackageJson = fse.pathExistsSync(packageJsonPath);
    // 如果项目根目录存在package.json文件
    if (existPackageJson) {
      const command = [];
      const packageJsonContent = fse.readJsonSync(packageJsonPath);
      const scripts = packageJsonContent.scripts || {};
      for (const k in scripts) {
        command.push({
          name: k,
          command: scripts[k],
          key: k
        });
      }
      commit('initCommand', command);
      return;
    }
  },
  // 创建项目
  createProject() {

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
      return Notification.error({
        title: '错误',
        message: '项目已存在'
      });
    }
    projectList.push(project);
    // 存储
    lsStorage.set(PROJECT_STORAGE_NAME, projectList);
    commit('addProject', project);
  },
  // 删除项目
  deleteProject({ commit }, project) {
    const projectList = lsStorage.get(PROJECT_STORAGE_NAME);
    const index = projectList.findIndex(p => p.path === project.path);
    projectList.splice(index, 1);
    // 存储
    lsStorage.set(PROJECT_STORAGE_NAME, projectList);
    commit('initProjectList', projectList);
  },
  // 查询项目
  queryProject(context, pathname) {
    return lsStorage.get(PROJECT_STORAGE_NAME).filter(p => p.path === pathname)[0];
  }
};

// mutations
const mutations = {
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
  initCommand(state, command = []) {
    state.command = command;
  }
};

export default {
  namespaced: true,
  state: initialState,
  getters: initialGetters,
  actions,
  mutations
};
