import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import voice from './modules/voice';
import mutations from './mutations';
import state from './state';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: { voice },
  strict: debug
});
