import Vue from 'vue';
import Router from 'vue-router';

const Home = r => require.ensure([], () => r(require('./views/Home')), 'home');
const Timer = r =>
  require.ensure([], () => r(require('./views/Timer')), 'timer');
const Menu = r => require.ensure([], () => r(require('./views/Menu')), 'menu');
const Voice = r =>
  require.ensure([], () => r(require('./views/Voice')), 'voice');
const ErrorPage = r =>
  require.ensure([], () => r(require('./views/Error')), 'error');
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
      component: Home
    },
    {
      path: '/Timer',
      name: 'Timer',
      component: Timer
    },
    {
      path: '/Menu',
      name: 'Menu',
      component: Menu
    },
    {
      path: '/Voice',
      name: 'Voice',
      component: Voice
    },
    {
      path: '/Error',
      name: 'Error',
      component: ErrorPage
    },
    {
      path: '/Offline',
      name: 'Offline',
      component: Offline
    }
  ]
});
