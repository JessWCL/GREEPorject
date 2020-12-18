import Vue from 'vue';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';
import { View, Page } from 'gree-ui';

import App from './App';
import router from './router';
import store from './store';

import * as filters from './utils/filter';

import debugMixin from './mixins/utils/debug'; // 开发环境初始化
import initMixin from './mixins/utils/init'; // 生产环境初始化
import {
  closePage,
  getInfo,
  changeBarColor,
  finishLoad
} from '../../static/lib/PluginInterface.promise'; // 主体接口：关闭插件页、获取设备信息、改变状态栏颜色

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
    zh_CN: require('./i18n/zh_CN')
  },
  silentTranslationWarn: true,
});

Vue.config.productionTip = false;

const dev = process.env.NODE_ENV === 'development';
const test = process.env.VUE_APP_MODE === 'test';

/* 启用页面调试器 */
if (['test', 'debug'].includes(process.env.VUE_APP_MODE)) {
const VConsole = require('vconsole/dist/vconsole.min.js');
// eslint-disable-next-line no-new
new VConsole();
}


// finishLoad();

// 全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
window.myvm = null;
if (dev || test) {
  window.myvm = new Vue({
    el: '#app',
    mixins: dev ? [debugMixin] : [initMixin],
    render: h => h(App),
    router,
    store,
    i18n
  });
}


switch (process.env.VUE_APP_MID) {
  case '28a02':
    console.log('-------纤净款------1.5.0版本-----送测-关闭log-----');
    break;  
  case '28a03':
    console.log('-------纤净洗干------1.1.0版本-----2020年8月6日16:53:53');
    break;  
  case '28a04':
    console.log('-------智泊------1.5.0版本----图片');
    break;
  case '28a05':
    console.log('-------智泊洗干------1.0.0版本---初版');
      break;
  default:
    break;
}


/* ********************************* Native Func ********************************* */

/**
 * @description 安卓后退键方法。如果开始预约或者故障则直接退出。预约界面调用取消预约的按键，模式选择页面时调用取消选择的按键。其他就返回上一层
 */
window.backButton = function backButton() {
  const { name } = router.currentRoute;
  const devState = window.myvm.$store.state.dataObject.devState;
  const launch = window.myvm.$store.state.dataObject.launch;
  const JFerr = window.myvm.$store.state.dataObject.JFerr;
  const isShowPopUp = window.myvm.$store.state.showData.isShowPopUp;

  if (isShowPopUp) { // 先判断是否所有弹框
    window.myvm.$store.state.showData.isShowPopUp = false;
    return;
  }

  // 关闭插件页的条件  首页 离线 启动页（整机状态1， 3, 4, 5, 6） 故障页 （故障状态为4） JFerr
  const isClosePage = name === 'Home' || name === 'Offline' ||  ((name === 'Startup') && (devState > 0) && (devState !== 2))  ||  (name === 'Error') && (devState === 4)  || JFerr
  // 去首页条件
  const toHomePage = (name === 'Startup') && (devState === 2)
  if (isClosePage) {
    closePage();
  } else if (toHomePage) {
    router.push({name: 'Home'});
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

window.init = function init() {
  if (!dev || test) {
    window.myvm = new Vue({
      el: '#app',
      mixins: dev ? [debugMixin] : [initMixin],
      render: h => h(App),
      router,
      store,
      i18n
    });
    window.myvm.init();
  }
  router.beforeEach((to, from, next) => {
    next();
  });
};
