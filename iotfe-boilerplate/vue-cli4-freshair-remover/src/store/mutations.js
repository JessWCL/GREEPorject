import * as type from './types';
// 同步操作放这里
export default {
  [type.SET_MAC](state, mac) {
    state.mac = mac;
  },
  [type.SET_DEVICE_INFO](state, deviceInfo) {
    state.deviceInfo = deviceInfo;
  },
  [type.SET_MAINMAC](state, mac) {
    state.mainmac = mac;
  },
  [type.SET_G_MAC](state, mac) {
    state.g_mac = mac;
  },
  [type.SET_FORM_SETAIT_PAGE](state, isfromSetAirquality) {
    state.isfromSetAirquality = isfromSetAirquality;
  },
  [type.SET_SHOW_POPOP](state, value) {
    state.isShowPopUp = value;
  },

  [type.SET_DATA_OBJECT](state, obj) {
    console.log('commit的数据');
    console.log(JSON.stringify(obj));
    state.dataObject = {
      ...state.dataObject,
      ...obj
    };
  },
  [type.IS_SCENE](state, isScene) {
    state.isScene = isScene;
    state.dataObject.isScene = isScene
  },
  [type.SET_HOME0_OBJECT](state, boxName) {
    state.homeName[0].room = boxName;
  },
  [type.SET_HOME1_OBJECT](state, boxName) {
    state.homeName[1].room = boxName;
  },
  [type.SET_BOX_OBJECT](state, list) {
    state.DataBoxData = JSON.parse(JSON.stringify(list));
  },
  [type.SET_BOX_NUM](state, boxNum) { // 盒子数量
    state.GasN = boxNum;
  },
  [type.BOX_STATUS](state, BoxStatus) { // 盒子状态
    state.BoxStatus = BoxStatus;
  },
  [type.SET_BOX_List_VALUE](state, object) {
    // 给盒子赋值
    const objAttrs = Object.keys(object);
    objAttrs.forEach(element => {
      const boxList = object[element]
        .toString(2)
        .split('')
        .reverse();
      // if (boxList.length === 1 && (state.dataObject.GasQ === 3 || element === 'GasMas' || element === 'GasAvail')) {
      //   boxList.push(0);
      // }
      if (boxList.length === 1 && state.dataObject.GasQ === 3) {
        boxList.push(0);
      }
      console.log('boxList.length', boxList.length);

      for (let i = 0; i < boxList.length; i += 1) {
        state.DataBoxData[i][element] = Number(boxList[i]);
      }
    });
  },
  [type.CHANGE_BOX_VALUE](state, object) {
    const index = object.GasN
    delete object.GasN
    state.DataBoxData[index] = JSON.parse(JSON.stringify(object))
  }
};