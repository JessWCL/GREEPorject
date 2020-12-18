import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const Review = r => require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/Review`)), 'Review');

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/Review'
    },
    {
      path: '/Review',
      name: 'Review',
      component: Review,
    },
  ]
});
