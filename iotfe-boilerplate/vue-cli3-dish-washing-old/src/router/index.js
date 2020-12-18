import Vue from 'vue';
import VueRouter from 'vue-router';
import ControlComponent from '../pages/Control';
import NotifyComponent from '../pages/Notify';
import OfflineComponent from '../components/offline';
import GreeAppointmentComponent from '../pages/Appointment';
import ErrorTipsDetailComponent from '../pages/ErrorTipsDetail';
import NewError from '../pages/NewError';

Vue.use(VueRouter);

const router = new VueRouter({
  // mode: 'history', // history can not use for default routes
  routes: [
    { path: '/', redirect: 'index' },
    { path: '/index', component: ControlComponent },
    { path: '/notify', component: NotifyComponent },
    { path: '/offline', component: OfflineComponent },
    { path: '/appointment', component: GreeAppointmentComponent },
    { path: '/errorTipsDetail', component: ErrorTipsDetailComponent },
    { path: '/error', component: NewError },
  ],
});

export default router;
