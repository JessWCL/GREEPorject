/*
 * @Author: Jerry-Rain
 * @Date: 2019-09-10 15:34:24
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2019-09-10 15:34:24
 * @Description: 
 */
import Vue from 'vue';
import Router from 'vue-router';
import {changeBarColor} from '../../static/lib/PluginInterface.promise';

const Home = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/Home`)),
    'home'
  );
const Offline = r =>
  require.ensure([], () => r(require('./views/Offline')), 'offline');

const Error = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/Error`)),
    'Error'
  );

Vue.use(Router);
const router = new Router({
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
      path: '/Offline',
      name: 'Offline',
      component: Offline
    },
    {
      path: '/Error',
      name: 'Error',
      component: Error
    }
  ]
});

router.beforeEach((to, from, next) => {
  console.log(to);
  let color = '#D5D5D5';
  if (to.name === 'Offline') {
    color = '#0ABFEC';
  }
  changeBarColor(color);
  next();
});

export default router;
