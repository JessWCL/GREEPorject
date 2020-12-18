import Vue from 'vue';
import VueI18n from 'vue-i18n';
import vueSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import { View, Page } from 'gree-ui';
import './assets/js/flexible';
import App from './App';
import store from './store';
import router from './router';
import zhCNLang from './i18n/zh_CN';
import enLang from './i18n/en';
import initMixin from './mixins/init';
import debugMixin from './mixins/debug';
import language from './utils/language'; // 对i18n的封装
import { closePage, changeBarColor, getCurrentMode } from '../../static/lib/PluginInterface.promise';
import { __DEV__, __PROD__, __TEST__, LIGHT_BAR_COLOR, PRIMARY_BAR_COLOR } from './api/constant';
import * as types from './store/types';

/* 启用页面调试器 */
if (process.env.NODE_ENV === 'production') {
  if (process.env.VUE_APP_MODE === 'debug') {
    const VConsole = require('vconsole/dist/vconsole.min.js');
    new VConsole(); // eslint-disable-line
  }
}

/* 启用页面调试器 */
if (process.env.NODE_ENV === 'testing') {
  if (process.env.VUE_APP_MODE === 'test') {
    const VConsole = require('vconsole/dist/vconsole.min.js');
    new VConsole(); // eslint-disable-line
  }
}

Vue.use(VueI18n);
Vue.use(language);
Vue.use(vueSwiper);
Vue.component(View.name, View);
Vue.component(Page.name, Page);
const i18n = new VueI18n({
  locale: 'zh_CN', // 语言标识
  messages: {
    zh_CN: zhCNLang, // 中文语言包
    en: enLang // 英文语言包
  }
});

console.time('init time');

router.beforeEach((to, from, next) => {
  const name = to.name;
  if (name === 'PowerOff') {
    changeBarColor(PRIMARY_BAR_COLOR);
  } else if (name === 'Home') {
    changeBarColor(LIGHT_BAR_COLOR);
  } else if (name === 'Offline') {
    changeBarColor('#0880ee');
  } else {
    changeBarColor(LIGHT_BAR_COLOR);
  }
  next();
});

// 初始化设备数据
store.dispatch(types.INIT_DEVICE_DATA);

function createVue() {
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
}
__DEV__ && createVue();

/* ********************************* Native Function ********************************* */

/**
 * @description cordova 初始化完成后调用
 */
window.init = function init() {
  createVue();
  store.dispatch(types.INIT);
};

/**
 * @description 后退键的回调方法 - Android
 */
window.backButton = function backButton() {
  const name = router.currentRoute.name;
  const isRouterBack = ['Appointment', 'Purifier'].includes(name);
  if (isRouterBack) {
    router.back();
  } else {
    (__PROD__ || __TEST__) && closePage();
  }
};

/**
 * @description APP从后台切回来之后同步数据 - iOS
 */
window.onReFocus = function onReFocus() {
  // 获取设备信息
  store.dispatch(types.GET_DEVICE_INFO);
};

/**
 * @description APP从后台切回来之后同步数据 - Android
 */
window.onResume = function onResume() {
  // 获取设备信息
  store.dispatch(types.GET_DEVICE_INFO);
};
