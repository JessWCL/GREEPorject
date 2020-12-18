import Vue from 'vue';
import Router from 'vue-router';

const VUE_APP_MID = process.env.VUE_APP_MID;

const Home = r => require.ensure([], () => r(require(`./views/${VUE_APP_MID}/Home`)), 'home');
const Offline = r => require.ensure([], () => r(require(`./views/${VUE_APP_MID}/Offline`)), 'offline');
const ErrorWarning = r => require.ensure([], () => r(require(`./views/${VUE_APP_MID}/ErrorWarning`)), 'errorW-warning');

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
      path: '/Offline',
      name: 'Offline',
      component: Offline
    },
    {
      path: '/ErrorWarning',
      name: 'ErrorWarning',
      component: ErrorWarning
    }
  ]
});
