/*
 * @Author: Jerry-Rain
 * @Date: 2019-08-09 14:43:48
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-06-29 19:27:40
 * @Description: 
 */
import Vue from 'vue';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';
import { View, Page } from 'gree-ui';

import App from './App';
import router from './router';
import store from './store';
import 'vant/lib/index.css';
import Vant from 'vant';
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
// eslint-disable-next-line import/first
import _ from 'lodash';

// 安装插件
Vue.use(VueI18n);
Vue.use(language);
Vue.use(Vuex);
Vue.component(View.name, View);
Vue.component(Page.name, Page);
Vue.use(Vant);
Vue.prototype._ = _;

// 使用语言包
const i18n = new VueI18n({
  locale: process.env.VUE_APP_MID.startsWith('804') ? 'zh_CN' : 'en',
  messages: {
    en: require('./i18n/en'),
    zh_CN: require('./i18n/zh_CN')
  }
});

Vue.config.productionTip = false;

const dev = process.env.NODE_ENV === 'development';
const test = process.env.VUE_APP_MODE === 'test';

if (dev && !test) {
  let vm = new Vue({
    el: '#app',
    mixins: dev ? [debugMixin] : [initMixin],
    render: h => h(App),
    router,
    store,
    i18n
  });
  Vue.use(vm);
  window.myvm = vm;
}

/* ********************************* Native Func ********************************* */

/**
 * @description 后退键方法。如果开始预约或者故障则直接退出。预约界面调用取消预约的按键，模式选择页面时调用取消选择的按键。其他就返回上一层
 */
window.backButton = function backButton() {
  const { name } = router.currentRoute;
  if (name === 'Home' || name === 'Offline') {
    clearInterval(window._timer);
    closePage();
  } if (name === 'Timer') {
    router.push({ path: '/'});
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
  if (!dev || test) {
    new Vue({
      el: '#app',
      mixins: dev ? [debugMixin] : [initMixin],
      render: h => h(App),
      router,
      store,
      i18n
    });
  }
  router.beforeEach((to, from, next) => {
    let color = '#000001';
    if(to.name == 'Timer'){
      changeBarColor(color);
    }
    next();
  });
};
