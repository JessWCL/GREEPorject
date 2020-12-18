// 请勿修改
import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
// import state from './state';
import state13803 from './13803/state';
import state13804 from './13804/state';
import state13805 from './13805/state';

/* eslint-disable */
const MID_STATE_MAP = {
  '13803': state13803,
  '13804': state13804,
  '13805': state13805
};

Vue.use(Vuex);

export default new Vuex.Store({
  state: MID_STATE_MAP[process.env.VUE_APP_MID],
  actions,
  mutations,
  modules: {}
});
