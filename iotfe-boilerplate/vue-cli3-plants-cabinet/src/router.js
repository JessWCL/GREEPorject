
import Vue from 'vue';
import Router from 'vue-router';

const Home = r =>
  require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/Home`)), 'home');
const Offline = r =>
  require.ensure([], () => r(require('./views/Offline')), 'offline');
const Error = r =>
  require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/Error`)), 'Error');
const Pop = r =>
  require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/component/Pop`)), 'Pop');

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
        keepAlive: false,
      },
      children: [{
        name: 'Pop',
        path: 'Pop',
        component: Pop
      }, {
        name: 'PlantsList',
        path: 'plantslist',
        component: () => import(/* webpackChunkName: "group-components" */ `./views/${process.env.VUE_APP_MID}/component/popup/PlantsList.vue`),
      }, {
        name: 'FunctionList',
        path: 'functionlist',
        component: () => import(/* webpackChunkName: "group-components" */ `./views/${process.env.VUE_APP_MID}/component/popup/FunctionList.vue`),
      }, {
        name: 'PopupPicker',
        path: 'popup-picker/:mode',
        props: true,
        component: () => import(/* webpackChunkName: "group-components" */ `./views/${process.env.VUE_APP_MID}/component/popup/Popup-picker.vue`),
      }, ],
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
