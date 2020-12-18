import Vue from 'vue';
import Router from 'vue-router';

const Home = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/Home`)),
    'home'
  );
// const Appointment = r =>
//   require.ensure([], () => r(require('./views/Appointment')), 'appointment');
const Offline = r =>
  require.ensure([], () => r(require('./views/Offline')), 'offline');
const ErrorPage = r =>
  require.ensure([], () => r(require('./views/Error')), 'error');
const Sweep = r => require.ensure([], () => r(require('./views/Sweep')), 'sweep');
const Timer = r => require.ensure([], () => r(require('./views/Timer')), 'timer');
const ErrorPage_828213 = r => require.ensure([], () => r(require('./views/828213/Error.vue')), 'error');
const Timer_828213 = r => require.ensure([], () => r(require('./views/828213/Timer.vue')), 'timer');

Vue.use(Router);

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const routes_828211 = [
  {
    path: '/Sweep',
    name: 'Sweep',
    component: Sweep
  },
  {
    path: '/Timer',
    name: 'Timer',
    component: Timer
  },
  {
    path: '/Error',
    name: 'Error',
    component: ErrorPage
  }
];
const routes_828213 = [
  {
    path: '/Timer',
    name: 'Timer',
    component: Timer_828213
  },
  {
    path: '/Error',
    name: 'Error',
    component: ErrorPage_828213
  }
];

const ROUTES_MAP = {
  828211: routes_828211,
  828213: routes_828213
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
      path: '/Offline',
      name: 'Offline',
      component: Offline,
      meta: {
        keepAlive: true
      },
    },
    ...ROUTES_MAP[process.env.VUE_APP_MID],
  ]
});
