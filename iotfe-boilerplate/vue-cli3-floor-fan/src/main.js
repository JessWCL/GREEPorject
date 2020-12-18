import Vue from 'vue';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';

import { View, Page } from 'gree-ui';
import dayjs from 'dayjs';

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
import {
  __DEV__,
  __PROD__,
  __TEST__,
} from './api/constant';
import consoleSwitch from './components/ConsoleSwitch/index';

// 安装插件
Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(language);
Vue.use(consoleSwitch);
Vue.component(View.name, View);
Vue.component(Page.name, Page);

Vue.prototype.$dayjs = dayjs;

// 使用语言包
const i18n = new VueI18n({
  locale: 'zh_CN',
  messages: {
    en: require('./i18n/en'),
    zh_CN: require('./i18n/zh_CN')
  }
});

Vue.config.productionTip = false;

const debug = process.env.NODE_ENV === 'development';

console.info(`Current Running mid: ${process.env.VUE_APP_MID}`);

window._mid = process.env.VUE_APP_MID;
const UA = window.navigator.userAgent.toLowerCase();
const isAndroid = (UA && UA.indexOf('android') > 0);

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
  // 生产环境与测试环境调用 src/mixins/utils/init.js 的 init 方法
  (__PROD__ || __TEST__) && vm.init();
}
// 开发环境创建Vue实例
__DEV__ && createVue();
/* ********************************* Native Func ********************************* */

/**
 * @description 安卓后退键方法。如果开始预约或者故障则直接退出。预约界面调用取消预约的按键，模式选择页面时调用取消选择的按键。其他就返回上一层
 */
window.backButton = function backButton() {
  const { name } = router.currentRoute;
  if (name === 'Home' || name === 'Offline') {
    closePage();
  } else {
    if (name === 'Error') {
      window.vm.$root.$emit('btn-back');
      return;
    }
    
    router.back(-1);
  }
};

/**
 * @description APP从后台切回来之后同步数据 - iOS
 */
window.onReFocus = function onReFocus(msg) {
  msg;
  if (!isAndroid) {
    store.commit('SET_LOCK', false);
  }
  
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
  store.commit('SET_LOCK', false);
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
  createVue();
  router.beforeEach((to, from, next) => {
    console.log(to.name);
    let color = '#000000';
    if (to.name === 'Offline') {
      color = '#0abfec';
    } else if (to.name === 'Timer') {
      color = '#f4f4f4';
    } else if (to.name === 'Sweep') {
      color = '#ffffff';
    } else if (to.name === 'Error') {
      color = '#fffffe';
    } else {
      color = '#0abfec';
    }
    changeBarColor(color);
    next();
  });
};
