/**
 * 模板store
 */

import mainGlobal from '@/util/main_global';

const getGroupData = mainGlobal.helper.getGroupData;

// initial state
const initialState = {
  templates: [], // 模板列表
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
  }
};

// mutations
const mutations = {
  newTemplates(state, templates) {
    state.templates = templates;
  },
  updateTemplates(state, template) {
    if (Array.isArray(template)) {
      state.templates = state.template.concat(template);
    } else {
      state.templates.push(template);
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
