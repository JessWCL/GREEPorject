/*
 * @Author: Jerry-Rain
 * @Date: 2020-06-19 12:05:15
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-09-14 13:53:30
 * @Description: 分模块处理
 */
import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import state from './state';
import module81000 from './81000/index.js';
import module81001 from './81001/index.js';

Vue.use(Vuex);

// TODO:根据mid来选择对应的state，这写法很不错！希望看到的同事好好学
const mid = process.env.VUE_APP_MID ? Number(process.env.VUE_APP_MID, 10) : 81000;
let myModule = null;
switch (mid) {
  case 81000:
    myModule = module81000;
    break;
  case 81001:
    myModule = module81001;
    break;
  default:
    break;
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    myModule,
  },
  strict: process.env.NODE_ENV !== 'production'
});
