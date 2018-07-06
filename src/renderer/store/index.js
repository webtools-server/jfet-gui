import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

// modules
import project from './modules/project';
import template from './modules/template';
import setting from './modules/setting';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    project,
    template,
    setting
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
