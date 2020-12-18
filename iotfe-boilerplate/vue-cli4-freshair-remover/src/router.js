import Vue from 'vue';
import Router from 'vue-router';

const Home = r => require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/Home`)), 'home');
const Filter = r => require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/Filter`)), 'filter');
const Detail = r => require.ensure([], () => r(require('./views/Detail')), 'detail');
const ErrorWarning = r => require.ensure([], () => r(require('./views/ErrorWarning')), 'ErrorWarning');
const Offline = r => require.ensure([], () => r(require('./views/Offline')), 'Offline');
const BoxDetail = r =>
  require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/BoxDetail`)), 'boxdetail');
const SetAirquality = r =>
  require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/SetAirquality`)), 'SetAirquality');


Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      redirect: '/Home'
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/SetAirquality',
      name: 'SetAirquality',
      component: SetAirquality
    },
    {
      path: '/Filter',
      name: 'Filter',
      component: Filter
    },
    {
      path: '/Detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/BoxDetail',
      name: 'BoxDetail',
      component: BoxDetail
    },
    {
      path: '/ErrorWarning',
      name: 'ErrorWarning',
      component: ErrorWarning
    },
    {
      path: '/Offline',
      name: 'Offline',
      component: Offline
    }

  ]
});