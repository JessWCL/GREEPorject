import Vue from 'vue';
import Router from 'vue-router';

const Home = r => require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/Home`)), 'home');
const Offline = r => require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/Offline`)), 'offline');
const Appointment = r => require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/Appointment`)), 'appointment');
const MyFavorite = r => require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/MyFavorite`)), 'my-favorite');
const ChildLock = r => require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/ChildLock`)), 'child-lock');
const CloudMenuDetail = r => require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/CloudMenuDetail`)), 'cloud-menu-detail');
const ErrorPage = r => require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/Error`)), 'error');

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
      path: '/Offline',
      name: 'Offline',
      component: Offline
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/Home/:menuId',
      name: 'Home',
      component: Home
    },
    {
      path: '/Appointment',
      name: 'Appointment',
      component: Appointment
    },
    {
      path: '/MyFavorite',
      name: 'MyFavorite',
      component: MyFavorite
    },
    {
      path: '/ChildLock',
      name: 'ChildLock',
      component: ChildLock
    },
    {
      path: '/CloudMenuDetail/:id',
      name: 'CloudMenuDetail',
      component: CloudMenuDetail
    },
    {
      path: '/Error',
      name: 'Error',
      component: ErrorPage
    }
  ]
});
