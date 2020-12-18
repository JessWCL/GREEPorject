import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const ShareBasket = r => require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/ShareBasket`)), 'ShareBasket');

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/ShareBasket'
    },
    {
      path: '/ShareBasket',
      name: 'ShareBasket',
      component: ShareBasket,
    },
  ]
});
