import * as type from './types';

export default {
  [type.IS_SCENE](state, isScene) {
    state.isScene = isScene;
  },
  [type.SET_DATA_OBJECT](state, obj) {
    console.log(obj);
    state.dataObject = { ...state.dataObject, ...obj };
  },
  [type.SET_DEVICE_INFO](state, deviceInfo) {
    state.deviceInfo = deviceInfo;
  },
  [type.SET_MAC](state, mac) {
    state.mac = mac;
  },
  [type.SET_G_MAC](state, mac) {
    state.gmac = mac;
  },
  [type.SET_LOADING](state, isInit) {
    state.isInit = isInit;
  },
};
