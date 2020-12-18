import Vue from 'vue';
import Router from 'vue-router';

const Home = r => require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/Home`)), 'Home');
const SearchPage = r => require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/SearchPage`)), 'SearchPage');
const SearchPageList = r => require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/SearchPageList`)), 'SearchPageList');
const CloudMenuList = r => require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/CloudMenuList`)), 'CloudMenuList');
const CloudMenuDetailSteps = r => require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/CloudMenuDetailSteps`)), 'CloudMenuDetailSteps');
const Basket = r => require.ensure([], () => r(require(`./views/${process.env.VUE_APP_MID}/Basket`)), 'Basket');

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
    },
    {
      path: '/SearchPage',
      name: 'SearchPage',
      component: SearchPage,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/SearchPageList',
      name: 'SearchPageList',
      component: SearchPageList,
    },
    {
      path: '/CloudMenuList',
      name: 'CloudMenuList',
      component: CloudMenuList,
      meta: {
        keepAlive: false // 需要被缓存
      }
    },
    {
      path: '/CloudMenuDetailSteps',
      name: 'CloudMenuDetailSteps',
      component: CloudMenuDetailSteps,
      meta: {
        keepAlive: false // 需要被缓存
      }
    },
    {
      path: '/Basket',
      name: 'Basket',
      component: Basket,
    },
  ]
});
