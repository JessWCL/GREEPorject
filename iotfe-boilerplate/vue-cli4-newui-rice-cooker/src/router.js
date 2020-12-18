import Vue from 'vue';
import Router from 'vue-router';

const Home = r => require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/Home`)), 'home');
const Appointment = r => require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/Appointment`)), 'appointment');
const Offline = r => require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/Offline`)), 'offline');
const ErrorWarning = r => require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/ErrorWarning`)), 'errorwarning');

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
      path: '/Appointment',
      name: 'Appointment',
      component: Appointment
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
