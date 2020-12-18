import * as type from './types';

export default {
  [type.SET_MAC](state, mac) {
    state.mac = mac;
  },
  [type.SET_MAINMAC](state, mainmac) {
    state.mainmac = mainmac;
  },
  [type.SET_G_MAC](state, mac) {
    state.g_mac = mac;
  },
  [type.SET_DATA_OBJECT](state, obj) {
    state.dataObject = { ...state.dataObject, ...obj };
  },
  [type.SET_DEVICE_INFO](state, deviceInfo) {
    state.deviceInfo = deviceInfo;
  },
  [type.IS_SCENE](state, isScene) {
    state.isScene = isScene;
  },
};
