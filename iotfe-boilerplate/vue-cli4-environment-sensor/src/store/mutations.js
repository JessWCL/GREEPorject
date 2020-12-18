import * as type from './types';
// 同步操作放这里
export default {
  [type.SET_MAC](state, mac) {
    state.mac = mac;
  },
  [type.SET_DEVICE_INFO](state, deviceInfo) {
    state.deviceInfo = deviceInfo;
  },
  [type.SET_DEVICE_LIST](state, deviceList) {
    state.deviceList = deviceList;
  },
  [type.GET_TIMELIST](state, timeList) {
    state.timeList = timeList;
    console.log('状态仓库已修改');
    console.log(state.timeList);
  },
  [type.SET_DATA_OBJECT](state, obj) {
    state.dataObject = { ...state.dataObject, ...obj };
  },
  [type.IS_SCENE](state, isScene) {
    state.isScene = isScene;
  },
  [type.IS_MOREBTN](state, isMorebtn) {
    state.isMorebtn = isMorebtn;
  },
  [type.IS_TIME](state, isTime) {
    state.isTime = isTime;
  },
  [type.SET_TIME](state, data) {
    state.setTime = { ...state.setTime, ...data };
  },
  [type.QUERY_TIME](state, data) {
    state.queryTime = { ...state.queryTime, ...data };
  },
  [type.SET_LOCK](state, uilock) {
    state.uilock = uilock;
  }
};
