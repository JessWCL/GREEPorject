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
  [type.IS_SCENE](state, isScene) {
    state.isScene = isScene;
  },
  [type.USER_INFO](state, obj) {
    const ob = typeof obj === 'string' ? JSON.parse(obj) : obj;
    state.dataObject = { ...state.dataObject, ...ob };
  },
  [type.EDIT_USER_INFO](state, obj) {
    state.currentUserMessage = { ...state.currentUserMessage, ...obj };
  },
  [type.SET_USER_LIST](state, list) {
    state.userList = list;
  },
  [type.SET_USER_MESSAGE](state, obj) {
    state.useerMessage = { ...state.useerMessage, ...obj };
  },
  [type.SET_KPI_VALUE](state, obj) {
    state.kpiValue = { ...state.kpiValue, ...obj };
  },
};
