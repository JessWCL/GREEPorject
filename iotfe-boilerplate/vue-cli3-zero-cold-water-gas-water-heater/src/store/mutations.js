import * as type from './types';
// 同步操作放这里
export default {
  [type.SET_MAC](state, mac) {
    state.mac = mac;
  },
  [type.SET_DEVICE_INFO](state, deviceInfo) {
    state.deviceInfo = deviceInfo;
  },
  [type.SET_REPAIR](state, hasReportedForRepair) {
    state.hasReportedForRepair = hasReportedForRepair;
  },
  [type.SET_DATA_OBJECT](state, obj) {
    state.dataObject = { ...state.dataObject, ...obj };
  },
  [type.SET_DEVICE_DATA](state, obj) {
    state.deviceData = { ...state.deviceData, ...obj };
  },
  [type.SET_FUNCTYPE](state, functype) {
    state.functype = functype;
  },
  [type.EDIT_ERCODE](state, errorCode) {
    state.errorCode = errorCode;
  },
  [type.EDIT_ENABLE](state, editEnable) {
    state.editEnable = editEnable;
  },
  [type.SET_CLOUD_TIMER_DATA](state, cloudTimer) {
    state.cloudTimer = cloudTimer;
  },
  [type.SET_TOASTLOCK](state, toastLock) {
    state.toastLock = toastLock;
  },
};
