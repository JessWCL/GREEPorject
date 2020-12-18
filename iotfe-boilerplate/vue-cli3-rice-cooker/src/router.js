import Vue from 'vue';
import Router from 'vue-router';

// const Home = r => require.ensure([], () => r(require('./pages/Home')), 'home');
// const Show = r => require.ensure([], () => r(require('./pages/Show')), 'show');
// const Mode = r => require.ensure([], () => r(require('./pages/Mode')), 'mode');
// const Menu = r => require.ensure([], () => r(require('./pages/Menu')), 'menu');
// const Appointment = r => require.ensure([], () => r(require('./pages/Appointment')), 'appointment');
// const Error = r => require.ensure([], () => r(require('./pages/Error')), 'error');
// const Voice = r => require.ensure([], () => r(require('./pages/Voice')), 'voice');

// const Home = () => import( /* webpackChunkName: 'Home' */ './pages/Home/index.vue');
// const Show = () => import( /* webpackChunkName: 'Show' */ './pages/Show/index.vue');
// const Mode = () => import( /* webpackChunkName: 'Mode' */ './pages/Mode/index.vue');
// const Menu = () => import( /* webpackChunkName: 'Menu' */ './pages/Menu/index.vue');
// const Appointment = () => import( /* webpackChunkName: 'Appointment' */ './pages/Appointment/index.vue');
// const Error = () => import( /* webpackChunkName: 'Error' */ './pages/Error/index.vue');
// const Voice = () => import( /* webpackChunkName: 'Voice' */ './pages/Voice/index.vue');

import Home from './pages/Home';
import Show from './pages/Show';
import Mode from './pages/Mode';
import Menu from './pages/Menu';
import Appointment from './pages/Appointment';
import Error from './pages/Error';
import Voice from './pages/Voice';

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  routes: [
    { path: '/', redirect: '/Home' },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      redirect: { name: 'Show' },
      children: [
        {
          path: 'Show',
          name: 'Show',
          component: Show,
        },
        {
          path: 'Mode',
          name: 'Mode',
          component: Mode,
        },
      ],
    },
    {
      path: '/Appointment',
      name: 'Appointment',
      component: Appointment,
    },
    {
      path: '/Menu',
      name: 'Menu',
      component: Menu,
    },
    {
      path: '/Voice',
      name: 'Voice',
      component: Voice,
    },
    {
      path: '/Error',
      name: 'Error',
      component: Error,
    },
  ],
});

export default router;
