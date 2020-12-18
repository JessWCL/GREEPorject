/*
 * @Author: Jerry-Rain
 * @Date: 2019-08-09 14:43:48
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-05-09 10:52:58
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
const Timer = r =>
  require.ensure(
    [],
    () => r(require(`./views/80401/Timer`)),
    'Timer'
  );
const SetTimer = r =>
  require.ensure(
    [],
    () => r(require(`./views/80401/SetTimer`)),
    'SetTimer'
  );
const Error = r =>
  require.ensure(
    [],
    () => r(require(`./views/80401/Error`)),
    'Error'
  );
const Dial = r =>
  require.ensure(
    [],
    () => r(require(`./views/80401/Dial`)),
    'Dial'
  );
const Offline = r =>
  require.ensure([], () => r(require('./views/Offline')), 'offline');

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/Home'
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: {
        keepAlive: true
      }
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
    },
    {
      path: '/SetTimer',
      name: 'SetTimer',
      component: SetTimer,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/Error',
      name: 'Error',
      component: Error,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/Offline',
      name: 'Offline',
      component: Offline
    }
  ]
});
