import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import state828501 from './828501/state';
import state828502 from './828502/state';
import state828503 from './828503/state';

let states = {
  '828501': state828501,
  '828502': state828502,
  '828503': state828503
};

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: states[process.env.VUE_APP_MID],
  getters,
  actions,
  mutations,
  strict: debug
});
