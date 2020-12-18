/*
 * @Descripttion: 
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2019-09-05 14:12:57
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2019-11-20 16:16:19
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
  [type.SET_DEVICE_LIST](state, deviceList) {
    state.deviceList = deviceList;
  },
  [type.GET_TIMELIST](state, timeList) {
    state.timeList = timeList;
    console.log('定时列表', JSON.stringify(state.timeList));
  },
  [type.SET_DATA_OBJECT](state, obj) {
    console.log('----SET_DATA_OBJECT-----', obj);
    state.dataObject = {
      ...state.dataObject,
      ...obj
    };
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
    state.timeList.list = data;
  },
  // [type.QUERY_TIME](state, data) {
  //   state.queryTime = {
  //     ...state.queryTime,
  //     ...data
  //   };
  // }
};