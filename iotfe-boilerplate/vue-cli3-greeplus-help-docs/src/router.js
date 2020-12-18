/*
 * @Author: Jerry-Rain
 * @Date: 2019-09-10 15:34:24
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2019-12-13 08:34:57
 * @Description: 
 */
import Vue from 'vue';
import Router from 'vue-router';

const Home = r => require.ensure([], () => r(require('./views/Home')), 'home');

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
      path: '/menuDetail/:tag',
      name: 'MenuDetail',
      component: () => import('./views/MenuDetail.vue')
    },
    {
      path: '/linkDetail',
      name: 'LinkDetail',
      component: () => import('./views/LinkDetail.vue')
    }
  ]
});
