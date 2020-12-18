import Vue from 'vue';
import Router from 'vue-router';

const Home = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/Home`)),
    'home',
  );
const DeviceInfo = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/DeviceInfo`)),
    'device-info',
  );
const Setting = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/Setting`)),
    'setting',
  );
const Offline = r =>
  require.ensure([], () => r(require('./views/Offline')), 'offline');

const Persionsal = r =>
  require.ensure([], () =>
    r(require(`./views/${process.env.VUE_APP_MID}/Persionsal`)),
  );

const EditPersionsal = r =>
  require.ensure([], () =>
    r(require(`./views/${process.env.VUE_APP_MID}/EditPersionsal`)),
  );

const DataDetails = r =>
  require.ensure([], () =>
    r(require(`./views/${process.env.VUE_APP_MID}/DataDetails`)),
  );

const DataDetailsExtend = r =>
  require.ensure([], () =>
    r(require(`./views/${process.env.VUE_APP_MID}/DataDetailsExtend`)),
  );

const AddUser = r =>
  require.ensure([], () =>
    r(require(`./views/${process.env.VUE_APP_MID}/AddUser`)),
  );
const Claim = r =>
  require.ensure([], () =>
    r(require(`./views/${process.env.VUE_APP_MID}/Claim`)),
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
      // meta: {
      //   keepAlive: true,
      // },
    },
    {
      path: '/DeviceInfo',
      name: 'DeviceInfo',
      component: DeviceInfo,
    },
    {
      path: '/Setting',
      name: 'Setting',
      component: Setting,
    },
    {
      path: '/Offline',
      name: 'Offline',
      component: Offline,
    },
    {
      path: '/Persionsal',
      name: 'Persionsal',
      component: Persionsal,
    },
    {
      path: '/EditPersionsal',
      name: 'EditPersionsal',
      component: EditPersionsal,
    },
    {
      path: '/DataDetails',
      name: 'DataDetails',
      component: DataDetails,
    },
    {
      path: '/DataDetailsExtend/:id',
      name: 'DataDetailsExtend',
      component: DataDetailsExtend,
    },
    {
      path: '/AddUser',
      name: 'AddUser',
      component: AddUser,
    },
    {
      path: '/Claim',
      name: 'Claim',
      component: Claim,
    },
  ],
});
