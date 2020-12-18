import Vue from 'vue';
import Vuex from 'vuex';
import 'vant/lib/index.css';
import Vant from 'vant';
import VueI18n from 'vue-i18n';
import echarts from 'echarts/lib/echarts';
import { View, Page } from 'gree-ui';

import App from './App';
import router from './router';
import store from './store';

import debugMixin from './mixins/utils/debug'; // 开发环境初始化
import initMixin from './mixins/utils/init'; // 生产环境初始化
import {
  closePage,
  getInfo,
  changeBarColor,
} from '../../static/lib/PluginInterface.promise'; // 主体接口：关闭插件页、获取设备信息、改变状态栏颜色

// eslint-disable-next-line import/first
import _ from 'lodash';
import './assets/js/flexible';
import './assets/scss/global.scss';
import language from './utils/language'; // 对i18n的封装
import { __DEV__, __PROD__, __TEST__ } from './api/constant';

// 安装插件
Vue.use(VueI18n);
Vue.use(language);
Vue.use(Vuex);
Vue.use(Vant);
Vue.use(echarts);
Vue.component(View.name, View);
Vue.component(Page.name, Page);

// 使用语言包
const i18n = new VueI18n({
  locale: 'en',
  messages: {
    en: require('./i18n/en'),
    zh_CN: require('./i18n/zh_CN'),
  },
});

Vue.config.productionTip = false;
Vue.prototype._ = _;

function createVue() {
  const vm = new Vue({
    el: '#app',
    mixins: __DEV__ ? [debugMixin] : [initMixin],
    render: h => h(App),
    router,
    store,
    i18n,
  });
  window.vm = vm;
  // 生产环境与测试环境调用 src/mixins/utils/init.js 的 init 方法
  (__PROD__ || __TEST__) && vm.init();
}
// 开发环境创建Vue实例
__DEV__ && createVue();

// const VConsole = require('vconsole/dist/vconsole.min.js');
// eslint-disable-next-line no-new
// new VConsole();

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
  createVue();
  router.beforeEach((to, from, next) => {
    if (to.name === 'Offline') {
      changeBarColor('#56A9F7');
    } else if (to.name === 'Electric' || to.name === 'ElectricTip') {
      changeBarColor('#00aeff');
    }
    next();
  });
};
