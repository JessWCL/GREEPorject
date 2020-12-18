import Vue from 'vue';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';

import App from './App';
import router from './router';
import store from './store';

import debugMixin from './mixins/utils/debug'; // 开发环境初始化
import initMixin from './mixins/utils/init'; // 生产环境初始化
import {
  closePage,
  getInfo,
  changeBarColor,
  finishLoad,
} from '../../static/lib/PluginInterface.promise'; // 主体接口：关闭插件页、获取设备信息、改变状态栏颜色

// import './assets/js/flexible';

import './assets/js/rem.js';
import './assets/css/normalize.css';
import './assets/scss/global.scss';
import language from './utils/language'; // 对i18n的封装
import { isThailand, __DEV__ } from './api/constants';

// echarts
const echarts = require('echarts');

Vue.prototype.$echarts = echarts;

// 安装插件
Vue.use(VueI18n);
Vue.use(language);
Vue.use(Vuex);

function getLang() {
  if (isThailand) {
    return 'th';
  }
  return 'zh_CN';
}

// 使用语言包
const i18n = new VueI18n({
  locale: getLang(),
  messages: {
    en: require('./i18n/en'),
    zh_CN: require('./i18n/zh_CN'),
    th: require('./i18n/th'),
  }
});

Vue.config.productionTip = false;

const vm = new Vue({
  el: '#app',
  mixins: __DEV__ ? [debugMixin] : [initMixin],
  render: h => h(App),
  router,
  store,
  i18n,
});

// mock
// store.dispatch('MOCK_HOME_DATA');

/* 启用页面调试器 */
/* if (process.env.NODE_ENV === 'production') {
  if (process.env.VUE_APP_MODE === 'debug') {
    console.log('debug');
    const VConsole = require('vconsole/dist/vconsole.min.js');
    // eslint-disable-next-line no-new
    new VConsole();
  }
} */
/* const VConsole = require('vconsole/dist/vconsole.min.js');
// eslint-disable-next-line no-new
new VConsole(); */
if (process.env.NODE_ENV !== 'production') {
  const VConsole = require('vconsole/dist/vconsole.min.js');
  // eslint-disable-next-line no-new
  new VConsole();
}

/* ********************************* Native Func ********************************* */

/**
 * @description 安卓后退键方法。如果开始预约或者故障则直接退出。预约界面调用取消预约的按键，模式选择页面时调用取消选择的按键。其他就返回上一层
 */
window.backButton = function backButton() {
  const { name } = router.currentRoute;
  if (name === 'Home' || name === 'Offline') {
    closePage();
  } else {
    router.back(-1);
  }
};

/**
 * @description APP从后台切回来之后同步数据 - iOS
 */
window.onReFocus = function onReFocus() {
  getInfo(store.state.mac)
    .then(res => {
      const deviceInfo = JSON.parse(res);
      store.$store.commit('SET_DEVICE_INFO', deviceInfo);
    })
    .catch(err => {
      err;
    });
};

/**
 * @description APP从后台切回来之后同步数据 - Android
 */
window.onResume = function onResume() {
  getInfo(store.state.mac)
    .then(res => {
      const deviceInfo = JSON.parse(res);
      store.commit('SET_DEVICE_INFO', deviceInfo);
    })
    .catch(err => {
      err;
    });
};

// 根据加载页面改变状态栏颜色
window.init = function init() {
  vm.init();
  // 设备准备完毕通知cordova执行init()，需要带上finishLoad();
  // finishLoad();
  router.beforeEach((to, from, next) => {
    const color = '#000001';
    changeBarColor(color);
    next();
  });
};
