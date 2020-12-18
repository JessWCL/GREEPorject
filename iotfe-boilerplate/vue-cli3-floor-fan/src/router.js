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
const ErrorPage = r =>
  require.ensure([], () => r(require('./views/Error')), 'error');
// const Sweep = r => require.ensure([], () => r(require('./views/Sweep')), 'sweep');
const Timer = r => require.ensure([], () => r(require('./views/Timer')), 'timer');
Vue.use(Router);

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export default new Router({
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
      path: '/Offline',
      name: 'Offline',
      component: Offline,
      meta: {
        keepAlive: true
      },
    },
    {
      path: '/Error',
      name: 'Error',
      component: ErrorPage
    }
  ]
});
