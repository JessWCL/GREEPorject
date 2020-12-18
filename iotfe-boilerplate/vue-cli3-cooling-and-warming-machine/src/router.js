/*
 * @Descripttion: 
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2019-09-05 14:12:56
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2019-11-19 21:26:41
 */
import Vue from 'vue';
import Router from 'vue-router';
import { changeBarColorPlugin } from './api/utils';

const Home = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/Home`)),
    'home'
  );
// const Screen = r =>
//   require.ensure([], () => r(require('./views/Screen')), 'screen');
const Voice = r =>
  require.ensure([], () => r(require('./views/Voice')), 'voice');
const Offline = r =>
  require.ensure([], () => r(require('./views/Offline')), 'offline');
const ErrorPage = r =>
  require.ensure([], () => r(require('./views/Error')), 'error');
const ParameterQuery = r =>
  require.ensure([], () => r(require('./views/ParameterQuery')), 'parameterQuery');
const ParameterQueryDetails = r =>
  require.ensure([], () => r(require('./views/ParameterQueryDetails ')), 'parameterQueryDetails');
const Order = r =>
  require.ensure([], () => r(require('./views/Order')), 'order');
const OrderList = r =>
  require.ensure([], () => r(require('./views/OrderList')), 'orderList');
Vue.use(Router);

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    redirect: '/Home'
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/ParameterQuery',
    name: 'ParameterQuery',
    component: ParameterQuery,
    meta: { color: '#F4F5F5'}
  },
  {
    path: '/ParameterQueryDetails/:asIndex/:arrIndex',
    name: 'ParameterQueryDetails',
    component: ParameterQueryDetails,
    meta: { color: '#F4F5F5'}
  },
  {
    path: '/OrderList',
    name: 'OrderList',
    component: OrderList,
    meta: { color: '#F4F5F5', keepAlive: true}
  },
  {
    path: '/Order',
    name: 'Order',
    component: Order,
    meta: { color: '#F4F5F5'}
  },
  {
    path: '/Voice',
    name: 'Voice',
    component: Voice
  },
  {
    path: '/Offline',
    name: 'Offline',
    component: Offline,
    meta: { color: '#6CA0E3'}
  },
  {
    path: '/Error',
    name: 'Error',
    component: ErrorPage,
    meta: { color: '#F4F5F5'}
  }
  ]
});


router.afterEach(to => {
  if (to.meta.color) {
    changeBarColorPlugin(to.meta.color);
  }
});

export default router;
