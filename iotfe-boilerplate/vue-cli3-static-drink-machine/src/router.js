import Vue from 'vue';
import Router from 'vue-router';

const Home = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/Home`)),
    'home',
  );
const Offline = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/Offline`)),
    'offline',
  );
const error = r => require.ensure([], () => r(require('./views/error')));
const helpfaultanalysis = r =>
  require.ensure([], () =>
    r(require(`./views/${process.env.VUE_APP_MID}/help_fault_analysis`)),
  );
const helpfilterreplace = r =>
  require.ensure([], () =>
    r(require(`./views/${process.env.VUE_APP_MID}/help_filter_replace`)),
  );
const helpfilteryears = r =>
  require.ensure([], () =>
    r(require(`./views/${process.env.VUE_APP_MID}/help_filter_years`)),
  );
const helpcarbon = r =>
  require.ensure([], () =>
    r(require(`./views/${process.env.VUE_APP_MID}/help_carbon`)),
  );
const helpfilterreplacecycle = r =>
  require.ensure([], () =>
    r(require(`./views/${process.env.VUE_APP_MID}/help_filter_replace_cycle`)),
  );
Vue.use(Router);

export default new Router({
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
      path: '/help_fault_analysis',
      name: 'help_fault_analysis',
      component: helpfaultanalysis,
    },
    {
      path: '/help_fault_analysis',
      name: 'help_fault_analysis',
      component: helpfilterreplace,
    },
    {
      path: '/help_fault_analysis',
      name: 'help_fault_analysis',
      component: helpfilteryears,
    },
    {
      path: '/help_fault_analysis',
      name: 'help_fault_analysis',
      component: helpcarbon,
    },
    {
      path: '/help_fault_analysis',
      name: 'help_fault_analysis',
      component: helpfilterreplacecycle,
    },
  ],
});
