import Vue from 'vue';
import Router from 'vue-router';

const Adjust = r => require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/Adjust`)), 'adjust');
const Home = r => require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/Home`)), 'home');
const Offline = r => require.ensure([], () => r(require('./views/Offline')), 'offline');

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
      path: '/Adjust',
      name: 'Adjust',
      component: Adjust
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
    }
  ]
});
