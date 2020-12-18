import Vue from 'vue';
import Router from 'vue-router';

const Home = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/Home`)),
    'home'
  );
const Sweep = r =>
  require.ensure([], () => r(require('./views/Sweep')), 'sweep');
const Offline = r =>
  require.ensure([], () => r(require('./views/Offline')), 'offline');
const ErrorPage = r =>
  require.ensure([], () => r(require('./views/Error')), 'error');

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
      path: '/Sweep/:id',
      name: 'Sweep',
      component: Sweep
    },
    {
      path: '/Offline',
      name: 'Offline',
      component: Offline
    },
    {
      path: '/Error',
      name: 'Error',
      component: ErrorPage
    }
  ]
});
