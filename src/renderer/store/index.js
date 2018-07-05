import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

// modules
import project from './modules/project';
import template from './modules/template';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    project,
    template
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
