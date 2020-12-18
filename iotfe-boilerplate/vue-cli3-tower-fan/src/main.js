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
import { getQueryStringByName } from './utils';
import language from './utils/language'; // 对i18n的封装
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

window.VUE_APP_MID = process.env.VUE_APP_MID;

const vm = new Vue({
  el: '#app',
  mixins: debug ? [debugMixin] : [initMixin],
  render: h => h(App),
  router,
  store,
  i18n
});
window.vm = vm;

const lang = getQueryStringByName('lang');
// 更改为其它的 locale
if (lang.includes('en')) {
  i18n.locale = 'en';
}

console.info(`Current Running mid: ${process.env.VUE_APP_MID}`);


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
      if (window.VUE_APP_MID !== '828211') {
        window.vm.$root.$emit('btn-back');
      } else {
        closePage();
      }
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
    console.log(to.name);
    let color = '#000000';
    if (to.name === 'Offline') {
      color = '#0abfec';
    } else if (to.name === 'Timer') {
      color = '#f4f4f4';
    } else if (to.name === 'Sweep') {
      color = '#ffffff';
    } else if (to.name === 'Error') {
      color = '#ffffff';
    } else {
      color = '#0abfec';
    }
    changeBarColor(color);
    next();
  });
};
