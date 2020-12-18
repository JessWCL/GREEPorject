import * as types from './types';
// mutations
const mutations = {
  [types.SET_MAC](state, payload) {
    state.mac = payload;
  },
  [types.SET_FUNCTYPE](state, payload) {
    state.functype = payload;
  },
  [types.SET_DEVICE_INFO](state, payload) {
    state.deviceInfo = payload;
  },
  [types.SET_DATA_OBJECT](state, payload) {
    state.DataObject = { ...state.DataObject, ...payload };
  },
  [types.SET_CACHE](state, payload) {
    state.cache = { ...state.cache, ...payload };
  }
};

export default mutations;
