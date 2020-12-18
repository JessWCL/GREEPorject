
import Vue from 'vue';
import Router from 'vue-router';

const VUE_APP_MID = process.env.VUE_APP_MID;

const Home = r => require.ensure([], () => r(require(`./views/${VUE_APP_MID}/Home`)), 'home');
const Error = r => require.ensure([], () => r(require(`./views/${VUE_APP_MID}/Error`)), 'Error');
const Offline = r => require.ensure([], () => r(require('./views/Offline')), 'offline');
const Drawer = r => require.ensure([], () => r(require('./component/Drawer')), 'Drawer');

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
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: {
        keepAlive: true,
      },
      children: [
        {
          name: 'Drawer',
          path: 'Drawer',
          component: Drawer
        },
      ],
    },
    {
      path: '/Report',
      name: 'Report',
      redirect: '/Report/day',
      // component: () => import(/* webpackChunkName: "group-foo" */ './Foo.vue'),
      component: r => require.ensure([], () => r(require(`./views/${VUE_APP_MID}/Report.vue`)), 'Report'),
      meta: {
        keepAlive: true,
      },
      children: [
        {
          name: 'report_day',
          path: 'day',
          component: r => require.ensure([], () => r(require(`./views/${VUE_APP_MID}/report/Report-Day.vue`)), 'Report-Day'),
        },
        {
          name: 'report_week',
          path: 'week',
          component: r => require.ensure([], () => r(require(`./views/${VUE_APP_MID}/report/Report-Week.vue`)), 'Report-Week'),
        },
        {
          name: 'report_month',
          path: 'month',
          component: r => require.ensure([], () => r(require(`./views/${VUE_APP_MID}/report/Report-Month.vue`)), 'Report-Month'),
        },
      ],
    },
    {
      path: '/Offline',
      name: 'Offline',
      component: Offline
    },
    {
      path: '/Error',
      name: 'Error',
      component: Error
    }
  ]
});
