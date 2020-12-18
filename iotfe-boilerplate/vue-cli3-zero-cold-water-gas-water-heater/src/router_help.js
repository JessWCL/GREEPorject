import Vue from 'vue';
import Router from 'vue-router';

/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};

const Problem = r =>
  require.ensure([], () => r(require('./views/help/Problem')), 'Problem');

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/Problem'
    },
    {
      path: '/Problem',
      name: 'Problem',
      component: Problem
    }
  ]
});
