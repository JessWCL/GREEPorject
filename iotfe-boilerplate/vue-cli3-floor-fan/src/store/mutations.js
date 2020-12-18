import * as type from './types';
// 同步操作放这里
export default {
  [type.SET_MAC](state, mac) {
    state.mac = mac;
  },
  [type.SET_DEVICE_INFO](state, deviceInfo) {
    state.deviceInfo = deviceInfo;
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
  [type.SET_LOCK](state, uilock) {
    console.log('setLock:', uilock);
    state.uilock = uilock;
  },
  [type.EDIT_ERCODE](state, errorCode) {
    state.errorCode = errorCode;
  },
  [type.EDIT_ENABLE](state, editEnable) {
    state.editEnable = editEnable;
  },
  [type.SET_SUBSCRIBE_TIMER](state, subscribeTimer) {
    state.subscribeTimer = subscribeTimer;
  },
  [type.SET_INIT_STATUS](state, isInit) {
    state.isInit = isInit;
  },
  [type.SET_TIMER_VALUE](state, timerValue) {
    setTimeout(() => {
      state.timerValue = timerValue;
    }, 300);
  },
  [type.SET_ERROR_LIST](state, errorList) {
    state.errorList.splice(0, state.errorList.length, ...errorList);
  }
};
