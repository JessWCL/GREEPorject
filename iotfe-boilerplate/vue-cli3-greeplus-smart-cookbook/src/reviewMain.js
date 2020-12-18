import Vue from 'vue';
import Vuex from 'vuex';
import { View, Page } from 'gree-ui';

import App from './App';
import router from './reviewRouter';
import store from './store';

import './assets/js/flexible';
import './assets/scss/review.scss';

// 安装插件
Vue.use(Vuex);
Vue.component(View.name, View);
Vue.component(Page.name, Page);

Vue.config.productionTip = false;

const vm = new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
});
window.vm = vm;
