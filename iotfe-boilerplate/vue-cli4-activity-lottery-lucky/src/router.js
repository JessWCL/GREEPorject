import Vue from 'vue';
import Router from 'vue-router';

const Home = r => require.ensure([], () => r(require(`./views/Home`)), 'home');

// const Adjoin = r => require.ensure([], () => r(require(`./views/Adjoin`)), 'adjoin');

Vue.use(Router);

export default new Router({
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
    }
    // {
    //   path: '/Adjoin',
    //   name: 'Adjoin',
    //   component: Adjoin
    // }
  ]
});
