import * as types from './types';
// 同步操作放这里
export default {
  [types.SET_MAC](state, payload) {
    state.mac = payload;
  },
  [types.SET_LOADING](state, payload) {
    state.loading = payload;
  },
  [types.SET_DEVICE_INFO](state, payload) {
    state.deviceInfo = payload;
  },
  [types.SET_FUNCTYPE](state, payload) {
    state.functype = payload;
  },
  [types.SET_DATA_OBJECT](state, payload) {
    state.dataObject = { ...state.dataObject, ...payload };
  },
  [types.SET_DATA_MID_STATE](state, payload) {
    state.myModule = Object.assign({}, state.myModule, payload);
  },
  [types.SET_IS_SCENE](state, payload) {
    state.isScene = payload;
  },
  setMyModule(state, payload) {
    if (payload && typeof payload === 'object') {
      state.myModule = Object.assign({}, state.myModule, payload);
    }
  }
};
