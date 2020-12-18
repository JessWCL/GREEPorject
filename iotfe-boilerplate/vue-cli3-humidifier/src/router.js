import Vue from 'vue';
import Router from 'vue-router';

const Home = r => require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/Home`)), 'home');
const Timer = r => require.ensure([], () => r(require('./views/Timer')), 'timer');
const Timer1 = r => require.ensure([], () => r(require('./views/828503/Timer1')), 'timer1');
const Offline = r => require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/Offline`)), 'offline');
const ErrorPage = r => require.ensure([], () => r(require('./views/Error')), 'error');
Vue.use(Router);

const VUE_APP_MID = process.env.VUE_APP_MID;
const baseRoutes = [
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
    path: '/Timer1',
    name: 'Timer1',
    component: Timer1
  }
];
const routesMap = {
  828501: [
    ...baseRoutes,
    {
      path: '/Timer',
      name: 'Timer',
      component: Timer
    },
  ],
  828502: [
    ...baseRoutes,
    {
      path: '/Error',
      name: 'Error',
      component: ErrorPage
    }
  ],
  828503:[
    ...baseRoutes,
    {
      path: '/Error',
      name: 'Error',
      component: ErrorPage
    },
    {
      path: '/Timer',
      name: 'Timer',
      component: Timer
    },
  ],
};

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    ...routesMap[VUE_APP_MID]
  ]
});
