import Vue from 'vue';
import Router from 'vue-router';
import { getQueryStringByName } from './utils';

const isOwner = getQueryStringByName('isOwner');
const Home = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/Home`)),
    'home',
  );
const User = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/User`)),
    'user',
  );
const Offline = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/Offline`)),
    'offline',
  );
const error = r => require.ensure([], () => r(require('./views/error')));

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: isOwner === 'false' ? '/User' : '/Home',
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
      path: '/Offline',
      name: 'Offline',
      component: Offline,
    },
    {
      path: '/error',
      name: 'error',
      component: error,
    },
    {
      path: '/User',
      name: 'User',
      component: User,
    },
  ],
});
