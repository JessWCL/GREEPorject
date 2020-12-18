/*
 * @Descripttion: 
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2019-11-18 15:05:07
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-04-16 11:08:32
 */
import Vue from 'vue';
import Router from 'vue-router';

const Home = r => require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/Home`)), 'home');
const Offline = r =>
  require.ensure([], () => r(require('./views/Offline')), 'offline');
const Setup = r =>
  require.ensure([], () => r(require('./views/28a01/Setup')), 'Setup');
const Favorites = r =>
  require.ensure([], () => r(require('./views/Favorites')), 'Favorites');
const Error = r => require.ensure([], () => r(require('./views/Error')), 'error');
const Startup = r =>
  require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/Startup`)), 'Startup');
Vue.use(Router);

export default new Router({
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
    path: '/Setup',
    name: 'Setup',
    component: Setup
  },
  {
    path: '/Favorites',
    name: 'Favorites',
    component: Favorites
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
    path: '/Startup',
    name: 'Startup',
    component: Startup
  }
  ]
});
