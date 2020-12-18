import { Page, View } from 'gree-ui';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Vuex from 'vuex';
import { changeBarColor, closePage, finishLoad, getInfo, hideLoading } from '../../static/lib/PluginInterface.promise'; // 主体接口：关闭插件页、获取设备信息、改变状态栏颜色
import App from './App';
import './assets/js/flexible';
import './assets/scss/global.scss';
import debugMixin from './mixins/utils/debug'; // 开发环境初始化
import initMixin from './mixins/utils/init'; // 生产环境初始化
import router from './router';
import store from './store';
import { isAndroid } from './utils';
import './utils/filter';
import { preLoadImg } from './utils/imagesPreLoader';
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

const getPerformanceTiming = () => {
  if (!window.performance) {
    console.log('浏览器不支持 window.performance');
    return;
  }
  const t = window.performance.timing;
  const timeline = {};

  // TCP建立连接完成握手时间
  timeline.connect = t.connectEnd - t.connectStart;
  // Time To First Byte(白屏时间
  timeline.ttfb = t.responseStart - t.navigationStart;
  // request请求耗时
  timeline.requestTime = t.responseEnd - t.requestStart;
  // Time To Interactive(首次可持续交互时间
  timeline.tti = t.domInteractive - t.requestStart;
  // 解析dom树耗时
  timeline.domReady = t.domComplete - t.responseEnd;
  // 页面加载时间
  timeline.loadPage = t.loadEventEnd - t.navigationStart;

  return timeline;
};

const formatFn = () => {
  const comment = {
    connect: 'TCP建立连接完成握手耗时',
    ttfb: '白屏时间',
    requestTime: 'request请求耗时',
    tti: '首次可持续交互时间',
    domReady: '解析dom树耗时',
    loadPage: '页面加载时间'
  };
  const timeline = getPerformanceTiming();
  const keys = Object.keys(comment);
  const result = {};
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    result[key] = { name: comment[key], value: timeline[key] };
    console.log(`${comment[key]}(${key}):${timeline[key]}`);
  }
  return result;
};

window.onload = function() {
  setTimeout(() => {
    formatFn();
  }, 500);
};

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
    (async () => {
      await preLoadImg([
        require('@/assets/img/bg.png'),
        require('@/assets/img/banner.png'),
        require('@/assets/img/circle-inner.png'),
        require('@/assets/img/circle.png'),
        require('@/assets/img/ripple.png'),
        require('@/assets/img/noprize-bg.png'),
        require('@/assets/img/prize-bg.png'),
        require('@/assets/img/prize-empty.png'),
        require('@/assets/img/no-prize.png')
      ]);
      new Vue({
        el: '#app',
        i18n,
        store,
        router,
        mixins: dev ? [debugMixin] : [initMixin],
        render: h => h(App)
      });
      if (isAndroid) {
        hideLoading();
      } else {
        finishLoad();
      }
    })();
  }
  router.beforeEach((to, from, next) => {
    const color = '#000000';
    changeBarColor(color);
    next();
  });
};
