import Vue from 'vue';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';
import { View, Page } from 'gree-ui';
import VueLazyload from 'vue-lazyload';

import App from './App';
import router from './router';
import store from './store';

import debugMixin from './mixins/utils/debug'; // 开发环境初始化
import initMixin from './mixins/utils/init'; // 生产环境初始化
import {
  closePage,
  getInfo,
  changeBarColor,
  getCurrentMode
} from '../../static/lib/PluginInterface.promise'; // 主体接口：关闭插件页、获取设备信息、改变状态栏颜色

import './assets/js/flexible';
import './assets/scss/global.scss';
import language from './utils/language'; // 对i18n的封装
import { isIPhone } from './utils/index';
import {
  __DEV__,
  __PROD__,
  __TEST__,
  LIGHT_BAR_COLOR,
  DARK_BAR_COLOR
} from './api/828d04/constant.js';

// 安装插件
Vue.use(VueI18n);
Vue.use(language);
Vue.use(Vuex);
Vue.use(VueLazyload);
Vue.component(View.name, View);
Vue.component(Page.name, Page);

// 使用语言包
const i18n = new VueI18n({
  locale: 'zh_CN',
  messages: {
    zh_CN: require('./i18n/zh_CN')
  }
});

Vue.config.productionTip = false;

let reFresh = 0;

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

function createVue() {
  const vm = new Vue({
    el: '#app',
    mixins: __DEV__ ? [debugMixin] : [initMixin],
    render: h => h(App),
    router,
    store,
    i18n
  });
  window.vm = vm;
  (__PROD__ || __TEST__) && vm.init();
}
__DEV__ && createVue();

async function createVConsole() {
  const currentMode = await getCurrentMode();
  const isPluginDebug = currentMode === 0;
  if (isPluginDebug) {
    const VConsole = require('vconsole/dist/vconsole.min.js');
    new VConsole(); // eslint-disable-line
  }
}

/* ********************************* Native Func ********************************* */

/**
 * @description 安卓后退键方法。如果开始预约或者故障则直接退出。预约界面调用取消预约的按键，模式选择页面时调用取消选择的按键。其他就返回上一层
 */
window.backButton = function backButton() {
  const { name } = router.currentRoute;
  if (name === 'Error' || name === 'Home' || name === 'Offline') {
    closePage();
  } else {
    router.back(-1);
  }
};

/**
 * @description APP从后台切回来之后同步数据 - iOS
 */
window.onReFocus = function onReFocus() {
  store.commit('RE_FRESH', reFresh++);

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
  store.commit('RE_FRESH', reFresh++);

  getInfo(store.state.mac)
    .then(res => {
      const deviceInfo = JSON.parse(res);
      store.commit('SET_DEVICE_INFO', deviceInfo);
    })
    .catch(err => {
      err;
    });
};

function handleBarColor() {
  const { Pow } = store.state.dataObject;
  const isTrunOff = Pow === 0;
  const isTrunOn = Pow === 1;
  if (isTrunOff) {
    changeBarColor(DARK_BAR_COLOR);
  } else if (isTrunOn) {
    changeBarColor(LIGHT_BAR_COLOR);
  }
}

// 根据加载页面改变状态栏颜色
window.init = function init() {
  createVue();
  // createVConsole();
  handleBarColor();
  router.beforeEach((to, from, next) => {
    let color = '';
    if (to.name === 'Error') {
      color = LIGHT_BAR_COLOR;
    } else if (to.name === 'Offline') {
      color = DARK_BAR_COLOR;
    }
    if (color) changeBarColor(color);
    handleBarColor();

    next();
  });
};
