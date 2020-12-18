// 请勿修改
import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import state from './state';
import state_828213 from './828213/state';

// eslint-disable-next-line
const STATE_MAP = {
  828211: state,
  828213: state_828213,
};

Vue.use(Vuex);

export default new Vuex.Store({
  state: STATE_MAP[process.env.VUE_APP_MID],
  actions,
  mutations,
  modules: {}
});
