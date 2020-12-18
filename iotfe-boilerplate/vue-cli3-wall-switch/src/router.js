/*
 * @Author: Jerry-Rain
 * @Date: 2019-09-10 15:34:24
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-08-11 09:48:08
 * @Description:
 */
import Vue from 'vue';
import Router from 'vue-router';

const Home = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/Home`)),
    'home'
  );
const Offline = r =>
  require.ensure([], () => r(require('./views/Offline')), 'offline');
const Electric = r =>
  require.ensure(
    [],
    () => r(require(`./views/Electric`)),
    'Electric'
  );
const ElectricTip = r =>
  require.ensure(
    [],
    () => r(require(`./views/ElectricTip`)),
    'ElectricTip'
  );
Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/',
    //   redirect: '/Home'
    // },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/Offline',
      name: 'Offline',
      component: Offline
    },
    {
      path: '/Electric',
      name: 'Electric',
      component: Electric
    },
    {
      path: '/ElectricTip',
      name: 'ElectricTip',
      component: ElectricTip
    }
  ]
});
