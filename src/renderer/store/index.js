import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

// modules
import project from './modules/project';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    project
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
