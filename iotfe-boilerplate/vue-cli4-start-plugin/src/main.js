import { Page, View } from 'gree-ui';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Vuex from 'vuex';
import { changeBarColor, closePage } from '../../static/lib/PluginInterface.promise'; // 主体接口：关闭插件页、获取设备信息、改变状态栏颜色
import App from './App';
// 引入 rem 适配
import './assets/js/flexible';
import './assets/scss/global.scss';
import debugMixin from './mixins/utils/debug'; // 开发环境初始化
import initMixin from './mixins/utils/init'; // 生产环境初始化
import router from './router';
import store from './store';
import * as types from './store/types';
import { __DEV__ } from './api/constant';
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
  }
});

Vue.config.productionTip = false;

/**
 * @description 创建Vue应用
 */
function createVue() {
  // 根据加载页面改变状态栏颜色
  router.beforeEach((to, from, next) => {
    let color = '#000000';
    if (to.name === 'Home') {
      color = '#f4f4f4';
    }
    changeBarColor(color);
    next();
  });

  // vue实例挂载到window，用于控制台查看
  window.vm = new Vue({
    el: '#app',
    i18n,
    store,
    router,
    mixins: __DEV__ ? [debugMixin] : [initMixin],
    render: h => h(App)
  });
}

// 开发环境 创建 vue 实例
__DEV__ && createVue();

/* 启用页面调试器 */
if (['test', 'debug'].includes(process.env.VUE_APP_MODE)) {
  const VConsole = require('vconsole/dist/vconsole.min.js');
  new VConsole();
}

/* ********************************* Native Func ********************************* */

/**
 * @description 安卓后退键方法
 */
window.backButton = function backButton() {
  const { name } = router.currentRoute;
  if (name === 'Home' || name === 'Offline') {
    closePage();
  } else if (name === 'ErrorWarning') {
    // TODO: 故障字段，跟具实际业务内容修改
    const { JFerr } = window.vm.$store.state.dataObject;
    if (JFerr !== 0) {
      closePage();
    } else {
      router.push({ name: 'Home' });
    }
  } else {
    router.back(-1);
  }
};

/**
 * @description 主体通知插件，用户按下哪个键盘按键
 * @param {Array<string, number>} arr ['onKeyDown', 'keycode']
 *
 * keycode (按钮名)
 *
 *          19 (上)
 * 21 (左)  66 (OK)  22 (右)
 *          20 (下)
 */
window.onKeyDown = function onKeyDown(arr) {
  console.log('===== onKeyDown ====', arr);
  // TODO: 请跟具实际业务做对应的事件分发
  const keycode = arr[1];
  switch (keycode) {
    case 66:
      console.log('处理确定按钮事件');
      break;

    default:
      console.log('未处理', keycode);
      break;
  }
};

/**
 * @description 原生调用H5插件路由跳转方法
 * @param {Array<string>} arr ['onToPage', 'pathName', '{ ...params }' ]
 */
window.onToPage = function onToPage(arr) {
  try {
    const pathName = arr[1];
    const params = arr[2] !== undefined ? JSON.parse(arr[2]) : {};
    router.push({ path: `/${pathName}`, params });
  } catch (e) {
    console.error(e);
  }
};

/**
 * @description APP从后台切回来之后同步数据 - iOS
 */
window.onReFocus = function onReFocus() {
  store.dispatch(types.GET_DEVICE_INFO);
};

/**
 * @description APP从后台切回来之后同步数据 - Android
 */
window.onResume = function onResume() {
  store.dispatch(types.GET_DEVICE_INFO);
};

// cordova 初始化完成后调用此方法
window.init = function init() {
  createVue();
};
