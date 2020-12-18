import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Mint from 'mint-ui';
import Vant from 'vant';
import 'vant/lib/index.css';
import App from './App';

import store from './store';
import router from './router';
import zhCNLang from './i18n/zh_CN';
import enLang from './i18n/en';
import mixin from './mixins/indexMixin';
import { closePage } from '../../static/lib/PluginInterface.promise';

// webpack 打包必须声明
__webpack_public_path__ = './../../'; // eslint-disable-line

let isDebug = process.env.NODE_ENV !== 'production';
// const isDebug = false; // `adb reverse tcp:port tcp:port` 打开

/* 启用页面调试器 */
if (process.env.NODE_ENV === 'production') {
  if (process.env.VUE_APP_MODE === 'debug') {
    const VConsole = require('vconsole/dist/vconsole.min.js');
    new VConsole(); // eslint-disable-line
  }
}

/* 启用页面调试器 */
if (process.env.NODE_ENV === 'testing') {
  if (process.env.VUE_APP_MODE === 'test') {
    isDebug = false;
    const VConsole = require('vconsole/dist/vconsole.min.js');
    new VConsole(); // eslint-disable-line
  }
}

function createVue() {
  Vue.use(VueI18n);
  Vue.use(Vant);
  Vue.use(Mint);
  const i18n = new VueI18n({
    locale: 'zh_CN', // 语言标识
    messages: {
      zh_CN: zhCNLang, // 中文语言包
      en: enLang, // 英文语言包
    },
  });
  const vm = new Vue({
    el: '#app',
    i18n,
    router,
    store,
    mixins: isDebug ? [mixin] : [mixin],
    render: h => h(App),
  });
  Vue.use(vm);
  // 加载到window
  window.vm = vm;
  vm.$store.commit('device/setIsDebug', isDebug);
}
isDebug && createVue();

// cordova init
window.init = function init() {
  createVue();
  window.vm.init();
};
// 后退键触发
window.backButton = function backButton() {
  // eslint-disable-next-line no-console
  console.log('==== backButton() ====');
  const path = router.currentRoute.path;
  const { commit, dispatch, state } = store;
  const {
    isDebug,
    device: {
      isPurifierAppointment,
      isShowPop
    }
  } = state;
  if (path.match(new RegExp('/errorTipsDetail+', 'i'))) {
    commit('device/setIsShowWaringTipsDetails', { value: false });
    dispatch('device/parseBarColor');
    router.back();
  } else if (isPurifierAppointment) {
    commit('device/setIsPurifierAppointment', { value: false });
    setTimeout(() => { dispatch('device/parseBarColor'); }, 300);
  } else if (path.match('appointment')) {
    router.back();
  } else if (isShowPop) {
    dispatch('device/togglePop');
  } else {
    !isDebug && closePage();
  }
};
// 主体通知页面返回
window.onResume = function onResume() {
  // eslint-disable-next-line no-console
  console.log('==== onResume() ====');
};
window.updateKeyValue = function updateKeyValue(key, value) {
  // eslint-disable-next-line no-console
  console.log(`==== updateKeyValue() ==== key: ${key}, value: ${value}`);
};
window.onReFocus = function onReFocus() {
  // eslint-disable-next-line no-console
  console.log('==== onReFocus() ====');
};
window.onResult = function onResult(data) {
  // eslint-disable-next-line no-console
  console.log(`==== onResult() ==== data: ${data}`);
};
