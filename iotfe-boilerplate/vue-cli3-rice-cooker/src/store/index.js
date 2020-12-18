import Vue from 'vue';
import Vuex from 'vuex';
// import createLogger from 'vuex/dist/logger';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import state from './state';
import voice from './modules/voice';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: { voice },
  // getters: {},
  strict: debug,
  // plugins: debug ? [createLogger()] : [],
});
