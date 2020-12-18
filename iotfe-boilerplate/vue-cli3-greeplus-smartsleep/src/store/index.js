/*
 * @Author: Jerry-Rain
 * @Date: 2020-02-20 11:30:18
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-02-22 14:23:22
 * @Description:
 */
import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import state from './state';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {},
  strict: process.env.NODE_ENV !== 'production',
});
