import Vue from 'vue';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';
import GreeUI from 'gree-ui';
import 'gree-ui/dist/gree-ui.min.css';
import App from './App';
import router from './router';
import store from './store';
import debugMixin from './mixins/utils/debug';
import initMixin from './mixins/utils/init';
import { closePage, getInfo } from '../../static/lib/PluginInterface.promise'; // 主体接口：关闭插件页、获取设备信息、改变状态栏颜色

import './assets/js/flexible';
import './assets/scss/global.scss';
import language from './utils/language'; // 对i18n的封装
import ChatScroll from './directives/chat-scroll';

Vue.use(VueI18n);
Vue.use(language);
Vue.use(Vuex);
Vue.use(GreeUI);

Vue.directive('chat-scroll', ChatScroll);

const debug = process.env.NODE_ENV !== 'production';
store.commit('SET_ISDEBUG', debug);

const i18n = new VueI18n({
  locale: 'zh_CN', // 语言标识
  messages: {
    en: require('./i18n/en'),
    zh_CN: require('./i18n/zh_CN')
  }
});

if (process.env.NODE_ENV === 'production') {
  const VConsole = require('vconsole/dist/vconsole.min.js');
  // eslint-disable-next-line no-new
  new VConsole();
}

Vue.config.productionTip = false;

const vm = new Vue({
  el: '#app',
  mixins: debug ? [debugMixin] : [initMixin],
  render: h => h(App),
  router,
  store,
  i18n
});

/* ********************************* Native Func ********************************* */

/**
 * @function backButton
 * @description 安卓后退键方法。如果开始预约或者故障则直接退出。预约界面调用取消预约的按键，模式选择页面时调用取消选择的按键。其他就返回上一层
 */
window.backButton = function backButton() {
  const { name } = router.currentRoute;
  if (name === 'Error' || name === 'Home' || name === 'Offline') {
    closePage();
  } else if (name === 'Voice' || name === 'Sweep' || name === 'Air') {
    router.push({ name: 'Home' });
  } else {
    router.back(-1);
  }
};

/**
 * @function onReFocus
 * @description APP从后台切回来之后同步数据(IOS)，一般不需要更改
 */
window.onReFocus = function onReFocus(msg) {
  // console.log('------');
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
 * @function onResume
 * @description APP从后台切回来之后同步数据(Android))，一般不需要更改
 */
window.onResume = function onResume(msg) {
  // console.log('------');
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
    next();
  });
};
