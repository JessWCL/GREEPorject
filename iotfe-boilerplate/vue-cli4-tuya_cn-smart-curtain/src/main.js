import { Page, View } from 'gree-ui';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Vuex from 'vuex';
import { changeBarColor, closePage, finishLoad } from '../../static/lib/PluginInterface.promise'; // 主体接口：关闭插件页、获取设备信息、改变状态栏颜色
import App from './App';
import './assets/js/flexible';
import './assets/scss/global.scss';
import debugMixin from './mixins/utils/debug'; // 开发环境初始化
import initMixin from './mixins/utils/init'; // 生产环境初始化
import router from './router';
import store from './store';
import language from './utils/language'; // 对i18n的封装
import * as types from './store/types';

// 安装插件
Vue.use(VueI18n);
Vue.use(language);
Vue.use(Vuex);
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

Vue.config.productionTip = false;
Vue.config.silent = true;

const dev = process.env.NODE_ENV === 'development';
const test = process.env.VUE_APP_MODE === 'test';

if (dev && !test) {
  new Vue({
    el: '#app',
    i18n,
    store,
    router,
    mixins: dev ? [debugMixin] : [initMixin],
    render: h => h(App)
  });
}

/* 启用页面调试器 */
if (['test', 'debug'].includes(process.env.VUE_APP_MODE)) {
  const VConsole = require('vconsole/dist/vconsole.min.js');
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
 * @description APP从后台切回来之后同步数据 - Android / iOS
 */
window.onReFocus = function onReFocus() {
  // 获取设备信息
  store.dispatch(types.GET_TUYA_DEVICE_INFO);
};

/**
 * @description APP从后台切回来之后同步数据 - Android / iOS
 */
window.onResume = function onResume() {
  // 获取设备信息
  store.dispatch(types.GET_TUYA_DEVICE_INFO);
};

// 根据加载页面改变状态栏颜色
window.init = function init() {
  finishLoad()
  store.dispatch(types.INIT_DEVICE_DATA);
  if (!dev || test) {
    new Vue({
      el: '#app',
      i18n,
      store,
      router,
      mixins: dev ? [debugMixin] : [initMixin],
      render: h => h(App)
    });
  }
  router.beforeEach((to, from, next) => {
    const color = '#000000';
    changeBarColor(color);
    next();
  });
};
