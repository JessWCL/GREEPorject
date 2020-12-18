import Vue from 'vue';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';
import { View, Page } from 'gree-ui';
import VueAwesomeSwiper from 'vue-awesome-swiper';

import App from './App';
import router from './router';
import store from './store';

import {
  closePage,
  changeBarColor,
  finishLoad
} from '../../static/lib/PluginInterface.promise'; // 主体接口：关闭插件页、获取设备信息、改变状态栏颜色

import 'swiper/dist/css/swiper.css';
import './assets/js/flexible';
import './assets/scss/global.scss';
import language from './utils/language'; // 对i18n的封装

import {
  __DEV__,
  __PROD__,
  __TEST__,
  __SHARE__,
  isIPhone
} from './api/constant';

// 安装插件
Vue.use(VueI18n);
Vue.use(language);
Vue.use(Vuex);
Vue.component(View.name, View);
Vue.component(Page.name, Page);
Vue.use(VueAwesomeSwiper, /* { default global options } */);

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
if (process.env.NODE_ENV === 'production') {
  if (process.env.VUE_APP_MODE === 'debug') {
    const VConsole = require('vconsole/dist/vconsole.min.js');
    // eslint-disable-next-line no-new
    new VConsole();
  }
}

/* 启用页面调试器 */
if (process.env.NODE_ENV === 'testing') {
  if (process.env.VUE_APP_MODE === 'test') {
    const VConsole = require('vconsole/dist/vconsole.min.js');
    // eslint-disable-next-line no-new
    new VConsole();
  }
}

/**
 * 创建 Vue 应用
 */
function createVue() {
  // 根据加载页面改变状态栏颜色
  router.beforeEach((to, from, next) => {
    changeBarColor('#f4f4f4');
    next();
  });
  const vm = new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App),
  });
  window.vm = vm;
  // 分享链接跳转到Basket
  __SHARE__ && vm.$router.push({ name: 'Basket' });
}
// 开发环境创建Vue实例
(__DEV__ || __SHARE__) && createVue();

/* ********************************* Native Func ********************************* */

/**
 * @description 安卓后退键方法 Home页面直接退出 其他就返回上一层
 */
window.backButton = function backButton() {
  const { name } = router.currentRoute;
  if (name === 'Home') {
    closePage();
  } else {
    router.back(-1);
  }
};

/**
 * @description APP从后台切回来之后同步数据 - iOS
 */
window.onReFocus = function onReFocus() {
  console.log('=== onReFocus ===');
};

/**
 * @description APP从后台切回来之后同步数据 - Android
 */
window.onResume = function onResume() {
  console.log('=== onResume ===');
};

// cordova 初始化完成后调用此方法
window.init = function init() {
  finishLoad();
  createVue();
};
