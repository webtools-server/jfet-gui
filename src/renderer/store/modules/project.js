

import { ipcRenderer } from 'electron';
import path from 'path';
import { homedir } from 'os';
import { PROJECT_STORAGE_NAME } from '@/util/constants';
import lsStorage from '@/util/ls_storage';
import { Notification } from 'element-ui';

// initial state
const initialState = {
  list: []
};

// getters
const initialGetters = {
  projectList: state => state.list
};

// actions
const actions = {
  // 初始化项目
  initProject({ commit }) {
    const projectList = lsStorage.get(PROJECT_STORAGE_NAME);
    if (Array.isArray(projectList)) {
      commit('initProject', projectList);
    }
  },
  // 打开项目
  openProject() {
    ipcRenderer.send('open-dir-dialog', {
      defaultPath: path.join(homedir(), 'jfet-workspace')
    });
  },
  createProject() {

  },
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
  deleteProject({ commit }, project) {
    const projectList = lsStorage.get(PROJECT_STORAGE_NAME);
    const index = projectList.findIndex(p => p.path === project.path);
    projectList.splice(index, 1);
    // 存储
    lsStorage.set(PROJECT_STORAGE_NAME, projectList);
    commit('initProject', projectList);
  },
  getProjectList({ commit }) {
    // shop.getProductList().then((products) => {
    //   if (products.code === 0) {
    //     commit('setProducts', products.data);
    //   }
    // });
  }
};

// mutations
const mutations = {
  initProject(state, projects) {
    state.list = projects;
  },
  addProject(state, project) {
    if (Array.isArray(project)) {
      state.list = state.list.concat(project);
    } else {
      state.list.push(project);
    }
  },
  setProducts(state, products) {
    state.all = products;
  },
  decrementProductInventory(state, { id }) {
    const product = state.all.find(p => p.id === id);
    product.inventory--;
  }
};

export default {
  namespaced: true,
  state: initialState,
  getters: initialGetters,
  actions,
  mutations
};
