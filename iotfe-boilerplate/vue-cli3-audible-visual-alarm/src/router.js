import Vue from 'vue';
import Router from 'vue-router';


import SoundsDuration from './views/70305/SoundsDuration';

const Home = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/Home`)),
    'home'
  );
const DeviceInfo = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/DeviceInfo`)),
    'device-info'
  );
const AlertSettings = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/AlertSettings`)),
    'alertSettings'
  );
const AlarmSounds = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/AlarmSounds`)),
    'alarmSounds'
  );

/* const SoundsDuration = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/SoundsDuration`)),
    'soundsDuration'
  ); */

const Offline = r =>
  require.ensure([], () => r(require('./views/Offline')), 'offline');

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
        keepAlive: true
      }
    },
    {
      path: '/DeviceInfo',
      name: 'DeviceInfo',
      component: DeviceInfo
    },
    {
      path: '/AlertSettings',
      name: 'AlertSettings',
      component: AlertSettings
    },
    {
      path: '/AlarmSounds',
      name: 'AlarmSounds',
      component: AlarmSounds,
    },
    {
      path: '/SoundsDuration',
      name: 'SoundsDuration',
      component: SoundsDuration,
    },
    {
      path: '/Offline',
      name: 'Offline',
      component: Offline
    }
  ]
});
