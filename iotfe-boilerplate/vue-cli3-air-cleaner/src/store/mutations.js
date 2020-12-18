/*
 * @Descripttion: 
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2020-03-14 08:50:27
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-03-18 17:00:48
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
    console.log('commit', obj);
    state.dataObject = { ...state.dataObject, ...obj };
  },
  [type.IS_SCENE](state, isScene) {
    state.isScene = isScene;
  },
  [type.IS_ERROR](state, isError) {
    state.isError = isError;
  },
  [type.SET_PM2P5](state, pm25) {
    state.dataObject.wipm25 = pm25;
  },
  [type.SET_DISINFECT](state, sterilize) {
    state.dataObject.sterilize = sterilize;
  },
  [type.SET_DEVICE_DATA](state, obj) {
    state.deviceData = { ...state.deviceData, ...obj };
  },
};
