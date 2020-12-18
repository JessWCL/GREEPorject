import Vue from 'vue';
import Router from 'vue-router';

const Home = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/Home`)),
    'home',
  );
const Filter = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/Filter`)),
    'filter',
  );
const Offline = r =>
  require.ensure([], () => r(require('./views/Offline')), 'offline');
const ErrorPage = r =>
  require.ensure([], () => r(require('./views/Error')), 'error');
const Detail = r =>
  require.ensure([], () => r(require('./views/Detail')), 'detail');
Vue.use(Router);
const BoxDetail = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/BoxDetail`)),
    'boxdetail',
  );
Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/Home',
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: {
        keepAlive: true,
      },
    },
    {
      path: '/Filter',
      name: 'Filter',
      component: Filter,
    },
    {
      path: '/Offline',
      name: 'Offline',
      component: Offline,
    },
    {
      path: '/Error',
      name: 'Error',
      component: ErrorPage,
    },
    {
      path: '/Detail',
      name: 'Detail',
      component: Detail,
    },
    {
      path: '/BoxDetail',
      name: 'BoxDetail',
      component: BoxDetail,
    },
  ],
});
