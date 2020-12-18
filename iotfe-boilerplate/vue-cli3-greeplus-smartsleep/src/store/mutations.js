import * as type from './types';
// 同步操作放这里
export default {
  [type.SET_MAC](state, mac) {
    state.mac = mac;
  },
  [type.SET_DEVICE_INFO](state, deviceInfo) {
    state.deviceInfo = deviceInfo;
  },
  // [type.SET_DATA_OBJECT](state, obj) {
  //   state.dataObject = { ...state.dataObject, ...obj };
  // },
  [type.IS_SCENE](state, isScene) {
    state.isScene = isScene;
  },
  [type.SET_MUSIC_OBJECT](state, status) {
    state.dataObject.musicIndex = parseInt(status.split(',')[1], 10);
    state.dataObject.playStatus = status.split(',')[0];
    state.dataObject.tryStatus = parseInt(status.split(',')[2], 10);
  },
  [type.DEVICE_LOOP](state, status) {
    state.Status = status;
  },
  [type.SCENE_LIST](state, list) {
    state.dataObject.sceneList = list;
  },
  [type.SET_SECOND_DATA](state, dataObject) {
    state.secondsData.smartIndex = dataObject.smartIndex;
    state.secondsData.no = dataObject.no;
    state.secondsData.mac = dataObject.mac;
  },
  [type.SET_LINK_DATA](state, dataObject) {
    // state.linkData.hour = dataObject.hour;
    // state.linkData.min = dataObject.min;
    // state.linkData.selectedScene = dataObject.selectedScene;
    // state.linkData.name = dataObject.name;
    // state.linkData.id = dataObject.id;
    state.linkData = { ...state.linkData, ...dataObject };
  },
  [type.SET_MAIN_DATA](state, obj) {
    state.mainPageData = { ...state.mainPageData, ...obj };
    localStorage.setItem('mainPageData', JSON.stringify(state.mainPageData));
    console.log(' state.mainPageData', state.mainPageData);
  },
  [type.SET_SCENE_DETAIL](state, obj) {
    state.sceneDetail = obj;
  },
  [type.SET_PROGRESS_VALUE](state, obj) {
    console.log(obj);
    const id = obj.id;
    const value = Number(obj.value);
    console.log(id, `${value}hahahahah`);
    const newObj = {
      progress: value / 100,
    };
    if (state.mainPageData.musicDataArray.length > 0) {
      // state.mainPageData.musicDataArray[id].progress = value / 100;
      const fnl = Object.assign(
        {},
        state.mainPageData.musicDataArray[id],
        newObj,
      );
      state.mainPageData.musicDataArray[id] = fnl;
      console.log(state.mainPageData.musicDataArray[id]);
    }
  },
  // 已下载完成更新状态
  [type.SET_LOAD_STATUS](state, id) {
    if (state.mainPageData.musicDataArray.length > 0) {
      state.mainPageData.musicDataArray[id].exist = 1;
    }
  },
  // 更新 主页时间状态
  // [type.SET_TIMES](state, obj) {
  //   state.mainPageData = { ...state.mainPageData, ...obj };
  // },

  // 记录刚进入二级页面的状态
  [type.SET_CURRENT_SCENE](state, id) {
    state.dataObject.currentSenceId = id;
  },
};
