import Vue from 'vue';
import Router from 'vue-router';

const Home = r => require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/Home`)), 'home');
const Settings = r => require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/Settings`)), 'settings');
const Device = r => require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/Device`)), 'device');

Vue.use(Router);

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
      component: Home,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/Settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/Device',
      name: 'Device',
      component: Device
    }
  ]
});
