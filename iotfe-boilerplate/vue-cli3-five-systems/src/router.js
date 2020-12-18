
import Vue from 'vue';
import Router from 'vue-router';
import myFunc from './utils/myFunc.js';

const Home = () => import(/* webpackChunkName: "group-components" */ `./views/Home.vue`);

Vue.use(Router);

/**
 * @description 获取html名字,存入window.htmlName
 * @description router根据html名字进入不同的路由
 * @description 因为总部展厅Android使用2个webview互相切换，切换时会整页刷新到根路径
 */
function getHtmlName() {
  let name = myFunc.getHtmlName();
  name ? '' : name = 'home';
  window.htmlName = name;
  console.log(name);
}
getHtmlName();
const htmlName = window.htmlName;

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: htmlName,
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        keepAlive: false,
      },
    },
    {
      path: '/health',
      name: 'Health',
      component: () => import(/* webpackChunkName: "group-components" */ `./views/Health.vue`),
    },
    {
      path: '/air',
      name: 'Air',
      component: () => import(`./views/Air.vue`),
    },
    {
      path: '/energy',
      name: 'Energy',
      component: () => import(`./views/Energy.vue`),
    },
    {
      path: '/illumination',
      name: 'Illumination',
      component: () => import(`./views/Illumination.vue`),
    },
    {
      path: '/getup',
      name: 'Getup',
      component: () => import(`./views/Getup.vue`),
    },
    {
      path: '/sleep',
      name: 'Sleep',
      component: () => import(`./views/Sleep.vue`),
    },
    {
      path: '/sleep-report',
      name: 'sleep-report',
      component: () => import(`./views/SleepReport.vue`),
    },
  ]
});
