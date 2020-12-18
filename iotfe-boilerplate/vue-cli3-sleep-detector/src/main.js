import Vue from 'vue';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';
import { View, Page } from 'gree-ui';

import App from './App';
import router from './router';
import store from './store';

import debugMixin from './mixins/utils/debug'; // 开发环境初始化
import initMixin from './mixins/utils/init'; // 生产环境初始化
import {
  closePage,
  changeBarColor,
  finishLoad
} from '../../static/lib/PluginInterface.promise'; // 主体接口：关闭插件页、获取设备信息、改变状态栏颜色
import { __DEV__, __PROD__, __TEST__, DEFAULT_COLOR } from './api/constant';
import * as types from './store/types';

import './assets/js/flexible';
import './assets/scss/global.scss';
import language from './utils/language'; // 对i18n的封装

import MyToast from './component/MyToast/';
import _ from 'lodash';


// 安装插件
Vue.use(VueI18n);
Vue.use(language);
Vue.use(Vuex);
Vue.component(View.name, View);
Vue.component(Page.name, Page);
Vue.use(MyToast);


// 使用语言包
const i18n = new VueI18n({
  locale: 'en',
  messages: {
    en: require('./i18n/en'),
    zh_CN: require('./i18n/zh_CN')
  }
});

Vue.config.productionTip = false;


/* 启用页面调试器 */
if (process.env.NODE_ENV === 'testing') {
  if (process.env.VUE_APP_MODE === 'test') {
    const VConsole = require('vconsole/dist/vconsole.min.js');
    // eslint-disable-next-line no-new
    new VConsole();
  }
}

// 生产环境与测试环境插件初始化时间
(__PROD__ || __TEST__) && console.time('init time');

// 初始化设备数据
store.dispatch(types.INIT_DEVICE_DATA);

// 根据加载页面改变状态栏颜色
router.beforeEach((to, from, next) => {
  const name = to.name;
  let color = DEFAULT_COLOR;
  // 需要cordova初始化完才能调用原生的方法
  changeBarColor(color);
  next();
});

const vm = new Vue({
  el: '#app',
  i18n,
  router,
  store,
  mixins: __DEV__ ? [debugMixin] : [initMixin],
  render: h => h(App)
});
// 加载到window，用于调试
window.vm = vm;

/* ********************************* Native Func ********************************* */

/**
 * @description cordova 初始化完成后调用
 */
window.init = function init() {
  finishLoad();
  store.dispatch(types.INIT);
};

/**
 * @description 后退键的回调方法 - Android 如果开始预约或者故障则直接退出。
 */
window.backButton = function backButton() {
  const name = router.currentRoute.name;
  const isRouterBack = ['Report', 'report_day', 'report_week', 'report_month', 'Error', 'Offline'].includes(name);
  if (isRouterBack) {
    router.back();
  } else {
    (__PROD__ || __TEST__) && closePage();
  }
};

/**
 * @description APP从后台切回来之后同步数据 - Android / iOS
 */
window.onReFocus = function onReFocus() {
  // 获取设备信息
  store.dispatch(types.GET_DEVICE_INFO);
};

/**
 * @description APP从后台切回来之后同步数据 - Android / iOS
 */
window.onResume = function onResume() {
  // 获取设备信息
  store.dispatch(types.GET_DEVICE_INFO);
};
