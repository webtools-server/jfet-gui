/**
 * 配置store
 */

import mainGlobal from '@/util/main_global';
import lsStorage from '@/util/ls_storage';

const {
  TEMPLATE_REPOSITORY,
  NPM_REGISTRY,
  SUBLIME_TEXT_3_NAME,
  VS_CODE_NAME,
  WEBSTORM_NAME,
  VSCODE_BASE_PATH,
  SUBLIME_TEXT_3_BASE_PATH,
  WEBSTORM_BASE_PATH,
  SETTING
} = mainGlobal.constants;

// 默认配置
const defaultSetting = {
  templateRepository: TEMPLATE_REPOSITORY,
  defaultNpmRegistry: NPM_REGISTRY.JNPM,
  defaultEditor: VS_CODE_NAME,
  editorBasePath: VSCODE_BASE_PATH
};

// 初始化
let storageSetting = lsStorage.get(SETTING);
if (!storageSetting) {
  storageSetting = Object.assign({}, defaultSetting);
  lsStorage.set(SETTING, storageSetting);
}

// 设置npm源
mainGlobal.helper.setRegistry(storageSetting.defaultNpmRegistry);

// initial state
const initialState = {
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
  editor: [{ // 编辑器配置
    label: VS_CODE_NAME,
    path: VSCODE_BASE_PATH
  }, {
    label: WEBSTORM_NAME,
    path: WEBSTORM_BASE_PATH
  }, {
    label: SUBLIME_TEXT_3_NAME,
    path: SUBLIME_TEXT_3_BASE_PATH
  }],
  setting: Object.assign({}, defaultSetting, storageSetting)
};

// getters
const initialGetters = {
  npmRegistry: state => state.npmRegistry,
  editor: state => state.editor,
  setting: state => state.setting
};

// actions
const actions = {
  saveSetting({ state }) {
    try {
      lsStorage.set(SETTING, state.setting);
      // 设置npm源
      mainGlobal.helper.setRegistry(state.setting.defaultNpmRegistry);
      return {
        success: true,
        message: ''
      };
    } catch (e) {
      return {
        success: false,
        message: e
      };
    }
  },
  resetSetting({ commit }) {
    try {
      lsStorage.set(SETTING, defaultSetting);
      // 设置npm源
      mainGlobal.helper.setRegistry(defaultSetting.defaultNpmRegistry);
      commit('resetSetting', defaultSetting);
      return {
        success: true,
        message: ''
      };
    } catch (e) {
      return {
        success: false,
        message: e
      };
    }
  },
  updateSetting({ commit }, setting) {
    commit('updateSetting', setting);
  },
  changeEditor({ commit, state }, editor) {
    const editorData = state.editor.find(e => e.label === editor) || {};
    commit('updateEditor', {
      name: editor,
      basePath: editorData.path || ''
    });
  }
};

// mutations
const mutations = {
  updateEditor(state, editor) {
    state.setting.defaultEditor = editor.name;
    state.setting.editorBasePath = editor.basePath;
  },
  resetSetting(state, setting) {
    if (!setting) return;
    state.setting = setting;
  },
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
