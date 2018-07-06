/**
 * 配置store
 */

import mainGlobal from '@/util/main_global';

const {
  TEMPLATE_REPOSITORY,
  NPM_REGISTRY,
  SUBLIME_TEXT_3_NAME,
  VS_CODE_NAME,
  WEBSTORM_NAME,
  VSCODE_BASE_PATH,
  SUBLIME_TEXT_3_BASE_PATH,
  WEBSTORM_BASE_PATH
} = mainGlobal.constants;

// initial state
const initialState = {
  setting: {
    templateRepository: TEMPLATE_REPOSITORY,
    defaultNpmRegistry: NPM_REGISTRY.JNPM,
    npmRegistry: [{
      label: NPM_REGISTRY.JNPM,
      value: NPM_REGISTRY.JNPM
    }, {
      label: NPM_REGISTRY.CNPM,
      value: NPM_REGISTRY.CNPM
    }, {
      label: NPM_REGISTRY.NPM,
      value: NPM_REGISTRY.NPM
    }],
    defaultEditor: VS_CODE_NAME,
    editor: [{ // 编辑器配置
      label: VS_CODE_NAME,
      path: VSCODE_BASE_PATH
    }, {
      label: WEBSTORM_NAME,
      path: WEBSTORM_BASE_PATH
    }, {
      label: SUBLIME_TEXT_3_NAME,
      path: SUBLIME_TEXT_3_BASE_PATH
    }]
  }
};

// getters
const initialGetters = {
  setting: state => state.setting
};

// actions
const actions = {
  getSetting({ commit }) {

  },
  updateSetting({ commit }, setting) {
    commit('updateSetting', setting);
  }
};

// mutations
const mutations = {
  updateSetting(state, kv) {
    const key = kv.key.split('.');
    let current = state.setting;

    for (let i = 0, l = key.length; i < l; i++) {
      if (key.length - 1 === i) {
        current[key[i]] = kv.value;
      } else {
        current = current[key[i]];
      }
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
