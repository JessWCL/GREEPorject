/*
 * @Descripttion: 
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2019-11-18 15:05:07
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-07-09 17:36:10
 */
import Vue from 'vue';
import Router from 'vue-router';

const Home = r => require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/Home`)), 'home');
const Offline = r =>
  require.ensure([], () => r(require('./views/Offline')), 'offline');

const Error = r => require.ensure([], () => r(require('./views/Error')), 'error');

const Startup = r =>
  require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/Startup`)), 'Startup');

const Standby = r =>
  require.ensure([], () => r(require('./views/28a06/Standby/index')), 'Standby');

const Upper = r => require.ensure([], () => r(require('./views/28a06/Standby/Upper')), 'Upper');
const Middle = r => require.ensure([], () => r(require('./views/28a06/Standby/Middle')), 'Middle');
const Lower = r => require.ensure([], () => r(require('./views/28a06/Standby/Lower')), 'Lower');

const UpperStartup = r => require.ensure([], () => r(require('./views/28a06/Startup/Upper')), 'Upper');
const MiddleStartup = r => require.ensure([], () => r(require('./views/28a06/Startup/Middle')), 'Middle');
const LowerStartup = r => require.ensure([], () => r(require('./views/28a06/Startup/Lower')), 'Lower');

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
    },
    {
      path: '/Startup',
      name: 'Startup',
      component: Startup
    },
    {
      path: '/Offline',
      name: 'Offline',
      component: Offline
    },
    {
      path: '/Error',
      name: 'Error',
      component: Error
    },
    {
      path: '/Upper',
      name: 'Upper',
      component: Upper
    },
    {
      path: '/Middle',
      name: 'Middle',
      component: Middle
    },
    {
      path: '/Lower',
      name: 'Lower',
      component: Lower
    },
    {
      path: '/UpperStartup',
      name: 'UpperStartup',
      component: UpperStartup
    },
    {
      path: '/MiddleStartup',
      name: 'MiddleStartup',
      component: MiddleStartup
    },
    {
      path: '/LowerStartup',
      name: 'LowerStartup',
      component: LowerStartup
    },
  ]
});
