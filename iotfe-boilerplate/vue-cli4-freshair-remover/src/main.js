import 'jquery';
import 'round-slider';
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import {
  View,
  Page
} from 'gree-ui';
import router from './router';
import store from './store';
import VueI18n from 'vue-i18n';
import IotfeComponents from 'iotfe-components';
import 'iotfe-components/dist/iotfeComponents.css';

import debugMixin from './mixins/utils/debug'; // 开发环境初始化
import initMixin from './mixins/utils/init'; // 生产环境初始化

import './assets/js/flexible';
import './assets/scss/global.scss';
import language from './utils/language'; // 对i18n的封装

import {
  closePage,
  getInfo,
  changeBarColor,
  finishLoad
} from '../../static/lib/PluginInterface.promise'; // 主体接口：关闭插件页、获取设备信息、改变状态栏颜色
import '../node_modules/round-slider/dist/roundslider.min.css';
Vue.use(VueI18n);
Vue.use(language);
Vue.use(Vuex);
Vue.use(IotfeComponents);
Vue.component(View.name, View);
Vue.component(Page.name, Page);

// 使用语言包
const i18n = new VueI18n({
  locale: 'zh_CN',
  messages: {
    en: require('./i18n/en'),
    zh_CN: require('./i18n/zh_CN')
  }
});

// finishLoad()
const dev = process.env.NODE_ENV === 'development';
const test = process.env.VUE_APP_MODE === 'test';

if (dev && !test) {
  window.myvm = new Vue({
    el: '#app',
    i18n,
    store,
    router,
    mixins: dev ? [debugMixin] : [initMixin],
    render: h => h(App)
  });
  router.beforeEach((to, from, next) => {
    if (from.name === 'SetAirquality') store.commit('SET_FORM_SETAIT_PAGE', true)
    const color = '#000000';
    changeBarColor(color);
    next();
  });
}
Vue.config.productionTip = false;

// window.myvm = new Vue({
//   render: h => h(App),
//   router,
//   store,
//   i18n
// }).$mount('#app');

/* 启用页面调试器 */
// const VConsole = require('vconsole/dist/vconsole.min.js');
// new VConsole();
// if (['test', 'debug'].includes(process.env.VUE_APP_MODE)) {
// }

/* ********************************* Native Func ********************************* */

/**
 * @description 安卓后退键方法。如果开始预约或者故障则直接退出。预约界面调用取消预约的按键，模式选择页面时调用取消选择的按键。其他就返回上一层
 */
window.backButton = function backButton() {
  const {
    name
  } = router.currentRoute;
  if (store.state.isShowPopUp) {
    store.commit('SET_SHOW_POPOP', false)
    return
  }
  if (name === 'Home' || name === 'Offline' || name === 'ErrorWarning') {
    closePage();
  } else {
    router.back(-1);
  }
};

/**
 * @description APP从后台切回来之后同步数据 - iOS
 */
window.onReFocus = function onReFocus(msg) {
  msg;
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
window.onResume = function onResume(msg) {
  msg;
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
  console.log('=-====');
  if (!dev || test) {
    window.myvm = new Vue({
      el: '#app',
      i18n,
      store,
      router,
      mixins: dev ? [debugMixin] : [initMixin],
      render: h => h(App)
    });
  }
  router.beforeEach((to, from, next) => {
    // console.warn(from.name)
    if (from.name === 'SetAirquality') store.commit('SET_FORM_SETAIT_PAGE', true)
    const color = '#000000';
    changeBarColor(color);
    next();
  });
};