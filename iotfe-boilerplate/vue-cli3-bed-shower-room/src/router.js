import Vue from 'vue';
import Router from 'vue-router';

const Home = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/Home`)),
    'home',
  );
const Energy = r =>
  require.ensure([], () => r(require('./views/Energy')), 'Energy');
const Offline = r =>
  require.ensure([], () => r(require('./views//Offline')), 'Offline');
const error = r =>
  require.ensure([], () => r(require('./views/error')), 'error');
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
      redirect: '/Home',
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
    },
    {
      path: '/Energy',
      name: 'Energy',
      component: Energy,
    },
    {
      path: '/Offline',
      name: 'Offline',
      component: Offline,
    },
    {
      path: '/error',
      name: 'error',
      component: error,
    },
  ],
});
