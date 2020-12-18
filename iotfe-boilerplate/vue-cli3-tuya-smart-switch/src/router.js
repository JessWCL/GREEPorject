/*
 * @Author: Jerry-Rain
 * @Date: 2019-09-10 15:34:24
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-06-05 11:18:57
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
const SetTimer = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/SetTimer`)),
    'SetTimer'
  );
const Timer = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/Timer`)),
    'Timer'
  );
const Dial = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/Dial`)),
    'Dial'
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
        keepAlive: true
      }
    },
    {
      path: '/Offline',
      name: 'Offline',
      component: Offline
    },
    {
      path: '/SetTimer',
      name: 'SetTimer',
      component: SetTimer
    },
    {
      path: '/Timer',
      name: 'Timer',
      component: Timer,
      meta: {
        keepAlive: false
      },
      children: [{
        name: 'Dial',
        path: 'Dial',
        component: Dial,
      }],
    }
  ]
});
