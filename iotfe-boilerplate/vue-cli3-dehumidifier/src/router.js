import Vue from 'vue';
import Router from 'vue-router';

const Home = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/Home`)),
    'home'
  );
const Appointment = r =>
  require.ensure([], () => r(require('./views/Appointment')), 'appointment');
const Offline = r =>
  require.ensure([], () => r(require('./views/Offline')), 'offline');

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
      redirect: '/Home'
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
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
    }
  ]
});
