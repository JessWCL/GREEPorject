/*
 * @Author: Jerry-Rain
 * @Date: 2019-09-10 15:34:24
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-02-22 14:11:27
 * @Description:
 */
import Vue from 'vue';
import Router from 'vue-router';

const Offline = r =>
  require.ensure([], () => r(require('./views/Offline')), 'offline');

const Error = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/Error`)),
    'Error',
  );

const MySleep = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/MySleep`)),
    'MySleep',
  );

const SleepScene = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/SleepScene`)),
    'SleepScene',
  );

const Scene = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/Scene`)),
    'Scene',
  );
Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/MySleep',
    },
    {
      path: '/Offline',
      name: 'Offline',
      component: Offline,
    },
    {
      path: '/Error',
      name: 'Error',
      component: Error,
    },
    {
      path: '/MySleep',
      name: 'MySleep',
      component: MySleep,
    },
    {
      path: '/SleepScene',
      name: 'SleepScene',
      component: SleepScene,
      // meta: { keepAlive: true }, // 此页需要缓存
    },
    {
      path: '/Scene',
      name: 'Scene',
      component: Scene,
    },
  ],
});
