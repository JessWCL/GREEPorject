/*
 * @Author: Jerry-Rain
 * @Date: 2019-09-10 15:34:24

 * @Description:
 */
import Vue from 'vue'
import Router from 'vue-router'

const Offline = r =>
  require.ensure([], () => r(require('./views/Offline')), 'offline')

const SleepReport = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/SleepReport`)),
    'SleepReport'
  )

const HomePage = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/HomePage`)),
    'HomePage'
  )

const Control = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/Control`)),
    'Control'
  )

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/',
    //   redirect: '/HomePage'
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
      path: '/Control',
      name: 'Control',
      component: Control,
      meta: {
        keepAlive: false
      },
    },
  ]
})
