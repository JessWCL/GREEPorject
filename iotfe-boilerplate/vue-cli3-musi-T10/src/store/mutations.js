/*
 * @Author: Jerry-Rain
 * @Date: 2020-01-03 10:55:46
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-05-12 08:54:29
 * @Description:
 */
import * as type from './types';
// 同步操作放这里
export default {
  [type.SET_MAC](state, mac) {
    state.mac = mac;
  },
  [type.SET_MAC](state, mac) {
    state.mac = mac;
  },
  [type.SET_PATH_NAME](state, pathName) {
    state.pathName = pathName;
  },
  [type.SET_YES_SCORE_LEFT](state, yesScoreLeft) {
    state.yesScoreLeft = yesScoreLeft;
  },
  [type.SET_YES_SCORE_RIGHT](state, yesScoreRight) {
    state.yesScoreRight = yesScoreRight;
  },
  [type.SET_DEVICE_INFO](state, deviceInfo) {
    state.deviceInfo = deviceInfo;
  },
  [type.SET_DATA_OBJECT](state, obj) {
    state.dataObject = { ...state.dataObject, ...obj };
  },
  [type.SET_API_OBJECT](state, obj) {
    state.apiObject = { ...state.apiObject, ...obj };
  },
  [type.IS_SCENE](state, isScene) {
    state.isScene = isScene;
  }
};
