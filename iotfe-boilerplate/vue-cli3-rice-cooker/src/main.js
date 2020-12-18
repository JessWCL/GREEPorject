import VueI18n from 'vue-i18n';
import Mint from 'mint-ui';
import Vue from 'vue';
import Vuex from 'vuex';
import { DatetimePicker } from 'vant';
import 'vant/lib/picker/style';
import App from './App';
import router from './router';
import store from './store';
import './assets/js/flexible.debug';
import './assets/js/flexible_css.debug';
import { closePage, getInfo, changeBarColor } from '../../static/lib/PluginInterface.promise';
import language from './plugins/language';
import getQueryStringByName from './plugins/getQueryStringByName';
import debugMixin from './mixins/debug.mixin';
import initMixin from './mixins/init.mixin';
import { __DEV__, __TEST__, __PROD__ } from './api/constants';

// webpack 打包必须，每个插件都要写
__webpack_public_path__ = './../../'; // eslint-disable-line

Vue.use(VueI18n);
Vue.use(language);
Vue.use(getQueryStringByName);
Vue.use(Mint);
Vue.use(Vuex);
Vue.use(DatetimePicker); // 修复时间选择器

// isDebug时要修改plugins/midtype.js里的midtype值, 在线调试时需要：isDebug = false
let isDebug = process.env.NODE_ENV !== 'production'; // 控制debug时加载的插件，作用等同于原插件的IsDebug
// const isDebug = false; // 跟PC联调时要设为false

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

store.commit('SET_ISDEBUG', isDebug);

/**
 * @constant i18n
 * @description 实例化i18n
 */
const i18n = new VueI18n({
  locale: 'zh_CN', // 语言标识
  messages: {
    en: require('../src/i18n/en'),
    zh_CN: require('../src/i18n/zh_CN')
  }
});


let vm = {};
/**
 * @function createVue
 * @description 实例化vue
 */
function createVue() {
  vm = new Vue({
    router,
    store,
    i18n,
    mixins: isDebug ? [debugMixin] : [initMixin],
    render: h => h(App)
  }).$mount('#app');

  // vm = new Vue({
  //   el: '#app',
  //   router,
  //   store,
  //   i18n,
  //   components: { App },
  //   mixins: isDebug ? [debugMixin] : [initMixin],
  //   template: '<App/>',
  // });
  window.vm = vm;
  Vue.use(vm);
}
isDebug ? createVue() : '';

/**
 * @function backButton
 * @description 安卓后退键方法。如果开始预约或者故障则直接退出。预约界面调用取消预约的按键，模式选择页面时调用取消选择的按键。其他就返回上一层
 */
window.backButton = function backButton() {
  console.log('=== backButton ==='); // eslint-disable-line

  const refTypeTaste = vm.$refs.$TypeTaste; // home共享组件
  const refPresetTypeTaste = vm.$refs.$PresetTypeTaste; // 预约共享组件
  // 口感米种弹框
  if (refTypeTaste) { // 先判断是否为空
    const homeMask = refTypeTaste.getMask();
    if (homeMask) {
      refTypeTaste.setMask(false);
      return;
    }
  }
  if (refPresetTypeTaste) { // 先判断是否为空
    const presetMask = refPresetTypeTaste.getMask();
    if (presetMask) {
      refPresetTypeTaste.setMask(false);
      return;
    }
  }

  const { name } = router.currentRoute;
  const { Pow } = vm.$store.state.dataObject;
  const { isMenuSelected } = vm.$store.state.menuPages;

  // 菜谱明细
  if (isMenuSelected) {
    vm.$store.commit('SET_IS_MENU_SELECTED', false);

    // 编辑中 预约中
  } else if (name === 'Mode'
    || name === 'Voice'
    || name === 'Menu'
    || (name === 'Appointment' && Pow === 0)) {
    // 交互优化 start
    if (name === 'Appointment' && Pow === 0) {
      const mode = vm.$store.state.currentMode.modeId;
      vm.$store.commit('SET_DATA_OBJECT', { mode });
    }
    // 交互优化 end
    if (name === 'Mode' && Pow === 0) {
      vm.$store.commit('IS_MODE', false); // 修复模式选择时按左上角返回按钮时，滑轮没出现的问题
    }

    router.back(-1);

  // 工作中、故障中
  } else if (
    Pow === 1
    || name === 'Show'
    || name === 'Error'
    || (name === 'Appointment' && Pow === 1)
  ) {
    closePage();
  } else {
    closePage();
  }
};
/**
 * @function onReFocus
 * @description APP从后台切回来之后同步数据(IOS)
 */
window.onReFocus = function onReFocus(msg) {
  console.log('------'); // eslint-disable-line
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
 * @description APP从后台切回来之后同步数据(Android))
 */
window.onResume = function onResume(msg) {
  console.log('------'); // eslint-disable-line
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
  createVue();
  changeBarColor('#E9B840');
  router.beforeEach((to, from, next) => {
    let color;
    if (to.name === 'Voice') {
      color = '#3A576B';
    } else if (to.name === 'Menu') {
      color = '#000000';
    } else if (to.name === 'Error') {
      color = '#ddd5a3';
    } else {
      color = '#E9B840';
    }
    changeBarColor(color);
    next();
  });
};
