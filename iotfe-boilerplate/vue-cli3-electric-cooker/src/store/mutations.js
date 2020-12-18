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
    Object.keys(obj).forEach(ele => {
      const _ele = ele;
      if (state.synchronize[_ele] !== undefined) {
        state.synchronize[_ele] = obj[_ele];
      }
    });
    state.dataObject = { ...state.dataObject, ...obj };
  },
  [type.SET_FUNCTYPE](state, functype) {
    state.functype = functype;
  },
  [type.SET_ISDEBUG](state, isDebug) {
    state.isDebug = isDebug;
  },
  [type.SET_MODE_NAME](state, modeName) {
    state.modeName = modeName;
  },
  [type.SET_MODE_TIME](state, modeTime) {
    state.modeTime = modeTime;
  },
  [type.EDIT_ENABLE](state, editEnable) {
    state.editEnable = editEnable;
  }
};
