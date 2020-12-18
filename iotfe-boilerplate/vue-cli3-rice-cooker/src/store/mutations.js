import * as type from './types';

export default {
  [type.SET_MAC](state, mac) {
    state.mac = mac;
  },
  [type.SET_DEVICE_INFO](state, deviceInfo) {
    state.deviceInfo = deviceInfo;
  },
  [type.SET_DATA_OBJECT](state, obj) {
    // state.unLock = true;
    state.dataObject = { ...state.dataObject, ...obj };
  },
  [type.UPDATE_DATA_OBJECT](state, obj) {
    state.dataObject = { ...state.dataObject, ...obj };
  },
  [type.SET_UNLOCK](state, payload) {
    state.unLock = payload;
  },
  [type.SET_CURRENT_MODE](state, currentMode) {
    state.currentMode = currentMode;
  },
  [type.SET_FIRLOAD_DATA](state, val) {
    state.firLoad = val;
  },
  [type.MODE_NAME](state, modeName) {
    state.modeName = modeName;
  },
  [type.ADJUSTIME](state, adjustime) {
    state.adjustime = adjustime;
  },
  [type.SET_FUNCTYPE](state, functype) {
    state.functype = functype;
  },
  [type.IS_MODE](state, isMode) {
    state.isMode = isMode;
  },
  [type.IS_WARN](state, isWarn) {
    state.isWarn = isWarn;
  },
  [type.IS_ABOUT](state, isAbout) {
    state.isAbout = isAbout;
  },
  [type.SET_MODE_LIST](state, payload) {
    const { modeList } = payload;
    state.modeList = modeList;
  },
  [type.SET_ACTIVE_MODE](state, payload) {
    const { modeIndex } = payload;
    state.modeList.forEach((ele, _index) => {
      const mode = ele;
      if (modeIndex === _index) {
        mode.selected = true;
      } else {
        mode.selected = false;
      }
    });
  },
  [type.SET_ISDEBUG](state, isDebug) {
    state.isDebug = isDebug;
  },
  [type.SET_NOTIFY](state, notify) {
    state.notify = notify;
  },
  [type.SET_LOCK](state, uilock) {
    state.uilock = uilock;
  },
  [type.EDIT_ENABLE](state, editEnable) {
    state.editEnable = editEnable;
  },
  [type.SET_IS_MENU_SELECTED](state, payload) {
    state.menuPages.isMenuSelected = payload;
  }
};
