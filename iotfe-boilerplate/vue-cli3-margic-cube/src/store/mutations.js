import * as type from './types';
// 同步操作放这里
export default {
  [type.SET_STATE](state, [key, val]) {
    state[key] = val;
  },
  [type.SET_DEVICE_INFO](state, deviceInfo) {
    state.deviceInfo = deviceInfo;
  },
  [type.SET_DATA_OBJECT](state, obj) {
    state.dataObject = { ...state.dataObject, ...obj };
  },
};
