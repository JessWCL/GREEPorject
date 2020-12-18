// import Vue from 'vue';
import MyToastJS from './MyToast.js';
import MyToast from './MyToast.vue';

// 单个组件暴露
export const components = {
  MyToast,
};

const install = function (Vue, options) {
  // 注册组件
  Vue.component('myToast', MyToast);

  // 注册原型方法
  // eslint-disable-next-line
  Vue.prototype.$myToast= MyToastJS;
};

export default {
  install,
};
