/*
 * @Author: Jerry-Rain
 * @Date: 2020-04-17 13:41:18
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-05-16 10:15:23
 * @Description: 
 */
import * as type from './types';
// 同步操作放这里
export default {
  [type.SET_MAC](state, mac) {
    state.mac = mac;
  },
  [type.SET_MAIN_MAC](state, mainMac) {
    state.mainMac = mainMac;
  },
  [type.SET_PATH_NAME](state, pathName) {
    state.pathName = pathName;
  },
  [type.SET_DEVICE_INFO](state, deviceInfo) {
    state.deviceInfo = deviceInfo;
  },
  [type.SET_DATA_OBJECT](state, obj) {
    state.dataObject = { ...state.dataObject, ...obj };
  },
  [type.SET_CHART_DATA](state, obj) {
    state.chartData = { ...state.chartData, ...obj };
  },
  [type.SET_TOTAL](state, total) {
    state.total = total;
  },
  [type.IS_SCENE](state, isScene) {
    state.isScene = isScene;
  }
};
