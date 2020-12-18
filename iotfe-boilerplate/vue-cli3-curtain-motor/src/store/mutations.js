/*
 * @Descripttion: 
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2019-09-09 14:12:03
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2019-11-28 11:06:01
 */
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
  [type.CHANGE_STATUS](state, arr) {
    state.dataObject.properties = arr;
  },
  [type.SET_UILOCK](state, value) {
    state.isUiLock = value;
  },
  [type.SET_ISFIRST](state, value) {
    state.isFirst = value;
  },
};
