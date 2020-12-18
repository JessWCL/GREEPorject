/*
 * @Author: Jerry-Rain
 * @Date: 2020-04-01 13:52:03
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-05-12 10:01:46
 * @Description: 
 */
import * as type from './types';
// 同步操作放这里
export default {
  [type.SET_MAC](state, mac) {
    state.mac = mac;
  },
  [type.SET_PATH_NAME](state, pathName) {
    state.pathName = pathName;
  },
  [type.SET_YES_SCORE](state, yesScore) {
    state.yesScore = yesScore;
  },
  [type.SET_API_OBJECT](state, obj) {
    state.apiObject = { ...state.apiObject, ...obj };
  },
  [type.SET_DEVICE_INFO](state, deviceInfo) {
    state.deviceInfo = deviceInfo;
  },
  [type.SET_DATA_OBJECT](state, obj) {
    state.dataObject = { ...state.dataObject, ...obj };
  },
  [type.IS_SCENE](state, isScene) {
    state.isScene = isScene;
  }
};
