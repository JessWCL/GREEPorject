import * as type from './types';
// 同步操作放这里
export default {
  [type.SET_MAC](state, mac) {
    state.mac = mac;
  },
  [type.SET_MAINMAC](state, mac) {
    state.mainmac = mac;
  },
  [type.SET_G_MAC](state, mac) {
    state.g_mac = mac;
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
  [type.SET_BOX_List_VALUE](state, object) {      // 给盒子赋值
    const objAttrs = Object.keys(object);
    objAttrs.forEach(element => {
      const boxList = object[element].toString(2).split('').reverse();
      if (boxList.length === 1 && state.dataObject.GasQ === 3){
        boxList.push(0);
      }
      for (let i = 0; i < boxList.length; i +=1){
        state.DataBoxData[i][element] = Number(boxList[i]);
      }
    })
  },
  [type.SET_HOME0_OBJECT](state, boxName) {
    state.homeName[0].room = boxName;
  },
  [type.SET_HOME1_OBJECT](state, boxName) {
    state.homeName[1].room = boxName;
  },
  [type.SET_BOX_OBJECT](state, list) {
    state.DataBoxData = list;
  },
  [type.SET_BOX_NUM](state, boxNum) {
    state.GasN = boxNum;
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
  [type.BOX_STATUS](state, BoxStatus) {
    state.BoxStatus = BoxStatus;
  }
};
