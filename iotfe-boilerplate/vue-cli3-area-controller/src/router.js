import Vue from 'vue';
import Router from 'vue-router';

const Home = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/Home`)),
    'home',
  );
const Energy = r =>
  require.ensure([], () => r(require('./views/5000/Energy')), 'Energy');
const NormallyArea = r =>
  require.ensure(
    [],
    () => r(require('./views/5000/NormallyArea')),
    'NormallyArea',
  );
const Offline = r =>
  require.ensure([], () => r(require('./views/Offline')), 'Offline');

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
      path: '/NormallyArea',
      name: 'NormallyArea',
      component: NormallyArea,
    },
    {
      path: '/Offline',
      name: 'Offline',
      component: Offline,
    },
  ],
});
