import Vue from 'vue';
import Router from 'vue-router';

const HelpFilterList = r =>
  require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/help/HelpFilterList`)), 'HelpFilterList');

const HelpFaultAnalysis = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/help/HelpFaultAnalysis`)),
    'HelpFaultAnalysis'
  );

const HelpFilterReplaceCycle = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/help/HelpFilterReplaceCycle`)),
    'HelpFilterReplaceCycle'
  );

const HelpFilterReset = r =>
  require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/help/HelpFilterReset`)), 'HelpFilterReset');
const HelpFilterReplaceMethod = r =>
  require.ensure(
    [],
    () => r(require(`./views/${process.env.VUE_APP_MID}/help/HelpFilterReplaceMethod`)),
    'HelpFilterReplaceMethod'
  );

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/HelpFilterList'
    },
    {
      path: '/HelpFilterList',
      name: 'HelpFilterList',
      component: HelpFilterList
    },
    {
      path: '/HelpFaultAnalysis',
      name: 'HelpFaultAnalysis',
      component: HelpFaultAnalysis
    },
    {
      path: '/HelpFilterReplaceMethod',
      name: 'HelpFilterReplaceMethod',
      component: HelpFilterReplaceMethod
    },
    {
      path: '/HelpFilterReset',
      name: 'HelpFilterReset',
      component: HelpFilterReset
    },
    {
      path: '/HelpFilterReplaceCycle',
      name: 'HelpFilterReplaceCycle',
      component: HelpFilterReplaceCycle
    }
  ]
});
