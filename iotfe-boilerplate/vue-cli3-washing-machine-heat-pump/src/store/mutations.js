/*
 * @Descripttion: 
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2019-11-18 15:05:08
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-03-25 15:06:27
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

  [type.SET_SHOW_DATA](state, obj) {
    state.showData = { ...state.showData, ...obj };
  },
  // 目前的状态数据
  [type.SET_STATUS_LIST](state, statusList) {
    state.statusList = statusList;
  },
  
  [type.GET_TIMELIST](state, timeList) {
    state.timeList = timeList;
  },
  [type.SET_DATA_OBJECT](state, obj) {
    console.log('commit的数据', obj);
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
  }
};
