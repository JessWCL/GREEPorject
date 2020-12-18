/*
 * @Descripttion: 
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2019-11-18 15:05:08
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-07-09 11:10:34
 */
import * as type from './types';
const specialProtocol = ['Pow', 'childLock', 'mute']

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

  [type.SET_PARSE_OBJECT](state, obj) {
    console.log('--parseObj---', obj);
    state.parseObj = { ...state.parseObj, ...obj };
  },

  // 解析查询到模块的值
  [type.SET_PARSE_DATAOBJECT](state, obj) {
    const keys = Object.keys(obj)
    keys.forEach(element => {
      switch (element) {
        case 'drum1Params':
          const newObj = parseParams(obj[element])
          state.parseObj.drum1Params = {...state.parseObj.drum1Params,  newObj}
          break;
      
        default:
          break;
      }
    });
  },
  
  // 上筒数据
  [type.SET_UPPER_OBJECT](state, obj) {
    console.log('--upper---', obj);
    state.parseObj.drum1Params = { ...state.parseObj.drum1Params, ...obj };
    specialProtocol.forEach(item => { if (item in obj) state.parseObj[item] = obj[item] })
  },
  // 中筒数据
  [type.SET_MIDDLE_OBJECT](state, obj) {
    console.log('--middle---', obj);
    state.parseObj.drum2Params = { ...state.parseObj.drum2Params, ...obj };
    specialProtocol.forEach(item => { if (item in obj) state.parseObj[item] = obj[item] })
  }  ,
  // 下筒数据
  [type.SET_LOW_OBJECT](state, obj) {
    console.log('--low---', obj);
    state.parseObj.drum3Params = { ...state.parseObj.drum3Params, ...obj };
    specialProtocol.forEach(item => { if (item in obj) state.parseObj[item] = obj[item] })
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

const paramsArrayagreement = {
  0 : ['launch', 'nightWash', 'highWater', 'creaseRes', ],
  launch: {
    0: 0  // P8 0
  }
}
/**
 * @description // 解析 params 的数组
 * @returns {Object} 返回对应内容的对象
 */
const parseParams = (parseObj) => {
  const launch = parseObj[0]
}  