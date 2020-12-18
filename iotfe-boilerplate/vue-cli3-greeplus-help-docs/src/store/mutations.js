import * as types from './types';
// 同步操作放这里
export default {
  [types.SET_MAC](state, payload) {
    state.mac = payload;
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
  [types.SET_IS_SCENE](state, payload) {
    state.isScene = payload;
  },
  [types.SET_ALL_HELPDOC_ITEMS](state, payload) {
    state.helpDocs.allItems.splice(0, state.helpDocs.allItems.length, ...payload);
  },
  [types.SET_TOP_HELPDOC_ITEMS](state, payload) {
    console.log(`payload: ${payload}`);
    state.helpDocs.topItems.splice(0, state.helpDocs.topItems.length, ...payload);
  },
  [types.IS_DATA_INIT](state, payload) {
    state.isDataInit = payload;
  }
};
