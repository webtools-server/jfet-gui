/**
 * 模板store
 */

import mainGlobal from '@/util/main_global';

const getGroupData = mainGlobal.helper.getGroupData;
const { DEFAULT_PROJECT_PATH } = mainGlobal.constants;

// initial state
const initialState = {
  templates: [], // 模板列表
  templateName: '',
  templateUrl: '',
  installPath: DEFAULT_PROJECT_PATH,
  projectName: '',
  projectAlias: '',
  force: false
};

// getters
const initialGetters = {
  templates: state => state.templates
};

// actions
const actions = {
  async fetchTemplate({ commit }) {
    const group = await getGroupData();
    const groups = group.projects || [];
    commit('newTemplates', groups.filter(g => /^template-/.test(g.name)));
  },
  async changeInstallPath({ commit }) {
    const result = await mainGlobal.folder.select({
      defaultPath: DEFAULT_PROJECT_PATH
    });
    if (result.success) {
      commit('updateValue', ['installPath', result.data[0]]);
    }
  }
};

// mutations
const mutations = {
  resetProjectForm(state) {
    state.templateName = '';
    state.templateUrl = '';
    state.installPath = DEFAULT_PROJECT_PATH;
    state.projectName = '';
    state.projectAlias = '';
    state.force = false;
  },
  newTemplates(state, templates) {
    state.templates = templates;
  },
  updateTemplates(state, template) {
    if (Array.isArray(template)) {
      state.templates = state.template.concat(template);
    } else {
      state.templates.push(template);
    }
  },
  updateValue(state, kv) {
    if (Array.isArray(kv[0])) {
      kv.forEach((k) => {
        if (Object.prototype.hasOwnProperty.call(state, k[0]) && k[1] !== undefined) {
          state[k[0]] = k[1];
        }
      });
    } else if (Object.prototype.hasOwnProperty.call(state, kv[0]) && kv[1] !== undefined) {
      state[kv[0]] = kv[1];
    }
  }
};

export default {
  namespaced: true,
  state: initialState,
  getters: initialGetters,
  actions,
  mutations
};
