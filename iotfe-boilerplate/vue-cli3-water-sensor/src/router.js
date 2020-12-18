import Vue from 'vue';
import Router from 'vue-router';

const Home = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/Home`)),
    'home'
  );
const DeviceInfo = r =>
  require.ensure([], () => r(require('./views/DeviceInfo')), 'device-info');
const Setting = r =>
  require.ensure([], () => r(require('./views/Setting')), 'setting');
const Offline = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/Offline`)),
    'offline'
  );

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
      path: '/DeviceInfo',
      name: 'DeviceInfo',
      component: DeviceInfo
    },
    {
      path: '/Setting',
      name: 'Setting',
      component: Setting
    },
    {
      path: '/Offline',
      name: 'Offline',
      component: Offline
    }
  ]
});
