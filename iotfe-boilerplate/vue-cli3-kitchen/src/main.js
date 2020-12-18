import Vue from 'vue';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';
import { View, Page } from 'gree-ui';

import App from './App';
import router from './router';
import store from './store';

import debugMixin from './mixins/utils/debug'; // 开发环境初始化
import initMixin from './mixins/utils/init'; // 生产环境初始化
import { changeBarColorPlugin, closePagePlugin } from './api/utils';

import './assets/js/flexible';
import './assets/scss/global.scss';
import language from './utils/language'; // 对i18n的封装

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
    zh_CN: require('./i18n/zh_CN'),
  },
});

Vue.config.productionTip = false;

const debug = process.env.NODE_ENV === 'development';
const test = process.env.VUE_APP_MODE === 'test';
let vm;

if (debug && !test) {
  vm = new Vue({
    el: '#app',
    mixins: debug ? [debugMixin] : [initMixin],
    render: h => h(App),
    router,
    store,
    i18n,
  });
}

/* 启用页面调试器 */
if (['test', 'debug'].includes(process.env.VUE_APP_MODE)) {
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
    // closePage();
    closePagePlugin();
  } else {
    router.back(-1);
  }
};

// 根据加载页面改变状态栏颜色
window.init = function init() {
  if (!debug || test) {
    vm = new Vue({
      el: '#app',
      mixins: debug ? [debugMixin] : [initMixin],
      render: h => h(App),
      router,
      store,
      i18n,
    });
  }
  vm.init();
  router.beforeEach((to, from, next) => {
    const color = '#000000';
    // changeBarColor(color);
    changeBarColorPlugin(color);
    next();
  });
};
