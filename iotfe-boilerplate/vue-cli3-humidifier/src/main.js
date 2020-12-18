import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';

import Vue from 'vue';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';

import { View, Page, Dialog } from 'gree-ui';
import App from './App';
import router from './router';
import store from './store';

import debugMixin from './mixins/utils/debug'; // 开发环境初始化
import initMixin from './mixins/utils/init'; // 生产环境初始化
import {
  closePage,
  getInfo,
  changeBarColor
} from '../../static/lib/PluginInterface.promise'; // 主体接口：关闭插件页、获取设备信息、改变状态栏颜色

import './assets/js/flexible';
import './assets/scss/global.scss';
import language from './utils/language'; // 对i18n的封装
import ChatScroll from './directives/chat-scroll';

window._mid = process.env.VUE_APP_MID;
// 安装插件
Vue.use(VueI18n);
Vue.use(language);
Vue.use(Vuex);

Vue.component(View.name, View);
Vue.component(Page.name, Page);

// 注册全局指令
Vue.directive('chat-scroll', ChatScroll);

// 使用语言包
const i18n = new VueI18n({
  locale: 'zh_CN',
  messages: {
    en: require('./i18n/en'),
    zh_CN: require('./i18n/zh_CN')
  }
});

/* 启用页面调试器 */
// if (process.env.NODE_ENV !== 'production') {
  const VConsole = require('vconsole/dist/vconsole.min.js');
  // eslint-disable-next-line no-new
  new VConsole();
//   setTimeout(() => {
//     vm.init();
//   }, 10);
// }

Vue.config.productionTip = false;

// const debug = process.env.NODE_ENV !== 'production';
const debug = process.env.NODE_ENV === 'development';

const vm = new Vue({
  el: '#app',
  mixins: debug ? [debugMixin] : [initMixin],
  render: h => h(App),
  router,
  store,
  i18n
});
window.vm = vm;
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
  vm.init();
  router.beforeEach((to, from, next) => {
    if (to.name !== 'Offline') {
      Dialog.closeAll(); // 关闭离线提示对话框
    }
    let color;
    console.log(`router-${to.name}`);
    if (to.name === 'Offline') {
      color = '#5c92b5';
    } else if (to.name === 'Timer') {
      color = '#f4f4f4';
    } else if (to.name === 'Timer1') {
      color = '#f4f4f4';
    } else if (to.name === 'Error') {
      color = '#fffffe';
    } else {
      color = '#2f6c98';
    }
    changeBarColor(color);
    next();
  });
};

