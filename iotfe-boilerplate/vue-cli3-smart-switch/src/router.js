/*
 * @Descripttion: 
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2019-09-12 08:58:50
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2019-11-16 14:09:18
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
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/Offline`)),
    'offline'
  );

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  routes: [{
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
  }
  ]
});
