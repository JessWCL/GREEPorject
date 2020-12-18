import Vue from 'vue';
import VueRouter from 'vue-router';

// const Home = r => require.ensure([], () => r(require('./views/828d04/Home')), 'home');
// const Offline = r => require.ensure([], () => r(require('./views/Offline')), 'offline');

const Home = r => require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/Home`)), 'Home');
const PowerOff = r => require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/PowerOff`)), 'PowerOff');
const Appointment = r => require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/Appointment`)), 'Appointment');
const Purifier = r => require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/Purifier`)), 'Purifier');
const Offline = r => require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/Offline`)), 'Offline');
const NewError = r => require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/NewError`)), 'NewError');

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: 'Home' },
    { path: '/Home', name: 'Home', component: Home },
    { path: '/PowerOff', name: 'PowerOff', component: PowerOff },
    {
      path: '/Appointment',
      name: 'Appointment',
      component: Appointment,
      meta: { keepAlive: true }
    },
    {
      path: '/Purifier',
      name: 'Purifier',
      component: Purifier,
      meta: { keepAlive: true }
    },
    { path: '/Error', name: 'Error', component: NewError },
    { path: '/Offline', name: 'Offline', component: Offline }
  ]
});

export default router;
