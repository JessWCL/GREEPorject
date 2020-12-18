// import Vue from 'vue';
// import SvgIcon from '../components/SvgIcon.vue';

// Vue.component('svg-icon', SvgIcon);

// requires and returns all modules that match
const requireAll = requireContext => requireContext.keys().map(requireContext);
// import all svg
const req = require.context('./svg', true, /\.svg$/);
requireAll(req);
