import * as type from './types';
// 同步操作放这里
export default {
  [type.SET_MAC](state, mac) {
    state.mac = mac;
  },
  [type.SET_DEVICE_INFO](state, deviceInfo) {
    state.deviceInfo = deviceInfo;
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
  [type.IS_SLEEP](state, isSleep) {
    state.isSleep = isSleep;
  },
  [type.SET_TIME](state, data) {
    state.setTime = { ...state.setTime, ...data };
  },
  [type.QUERY_TIME](state, data) {
    state.queryTime = { ...state.queryTime, ...data };
  },
  [type.SET_FUNCTYPE](state, functype) {
    state.functype = functype;
  },
  [type.SET_INIT_STATUS](state, isInit) {
    state.isInit = isInit;
  },
  [type.SET_LOADING](state, showLoading) {
    state.showLoading = showLoading;
  },
  [type.SET_ERROR_LIST](state, errorList) {
    state.errorList.splice(0, state.errorList.length, ...errorList);
  },
  [type.UPDATE_HUMIDITY](state, humidity) {
    state.dataObject.Humidity = humidity;
  },
  [type.SET_DEVICE_DATA](state, obj) {
    state.deviceData = { ...state.deviceData, ...obj };
  },
  [type.SET_LOCK](state, uilock) {
    state.uilock = uilock;
  },
  [type.SET_FIRSTLOAD](state, isFirstLoad) {
    state.isFirstLoad = isFirstLoad;
  }
};
