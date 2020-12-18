/*
 * @Author: Jerry-Rain
 * @Date: 2019-08-09 14:43:49
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-06-22 15:21:29
 * @Description: 
 */
import * as type from './types';
// 同步操作放这里
export default {
  [type.SET_MAC](state, mac) {
    state.mac = mac;
  },
  [type.SET_CLOUD_TIMER](state, cloudTimer) {
    state.cloudTimer = cloudTimer;
  },
  [type.SET_MAIN_MAC](state, mainMac) {
    state.mainMac = mainMac;
  },
  [type.SET_MESHID](state, meshId) {
    state.meshId = meshId;
  },
  [type.SET_SWITCHNUM](state, switchNum) {
    state.switchNum = switchNum;
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
  [type.SET_TIMERLIST](state, timerList) {
    state.timerList = timerList;
  },
  [type.SET_TYPE](state, type) {
    state.type = type;
  },
  // [type.SET_TIMERLIST_ITEM](state, [item, index]) {
  //   state.timerList[index] = item; 
  // },
};
