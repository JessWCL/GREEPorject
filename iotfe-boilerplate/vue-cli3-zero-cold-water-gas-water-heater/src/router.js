import Vue from 'vue';
import Router from 'vue-router';

/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};

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
const TimingPage = r =>
  require.ensure([], () => r(require('./views/Timing')), 'Timing');

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
      path: '/Offline',
      name: 'Offline',
      component: Offline
    },
    {
      path: '/Error',
      name: 'Error',
      component: ErrorPage
    },
    {
      path: '/Timing',
      name: 'Timing',
      component: TimingPage
    }
  ]
});
