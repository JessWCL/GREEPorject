/*
 * @Author: Jerry-Rain
 * @Date: 2019-09-10 15:34:24
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-05-16 09:39:55
 * @Description:
 */
import Vue from 'vue'
import Router from 'vue-router'

const Offline = r =>
  require.ensure([], () => r(require('./views/Offline')), 'offline')

const Error = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/Error`)),
    'Error'
  )

const SleepReport = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/SleepReport`)),
    'SleepReport'
  )
const FirstIn = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/FirstIn`)),
    'FirstIn'
  )
const HomePage = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/HomePage`)),
    'HomePage'
  )
const FemadeReport = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/FemadeReport`)),
    'FemadeReport'
  )
const ManageAuth = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/ManageAuth`)),
    'ManageAuth'
  )

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/',
    //   name: 'HomePage',
    //   component: HomePage,
    // },
    {
      path: '/HomePage',
      name: 'HomePage',
      component: HomePage,
      meta: {
        keepAlive: false
      },
    },
    {
      path: '/Offline',
      name: 'Offline',
      component: Offline
    },
    {
      path: '/SleepReport',
      name: 'SleepReport',
      component: SleepReport
    },
    {
      path: '/FirstIn',
      name: 'FirstIn',
      component: FirstIn
    },
    {
      path: '/FemadeReport',
      name: 'FemadeReport',
      component: FemadeReport
    },
    {
      path: '/ManageAuth',
      name: 'ManageAuth',
      component: ManageAuth
    },
    {
      path: '/Error',
      name: 'Error',
      component: Error
    }
  ]
});


