import * as type from './types';
import state from './state';
// 同步操作放这里
export default {
  [type.SET_MAC](state, mac) {
    state.mac = mac;
  },
  [type.SET_DEVICE_INFO](state, deviceInfo) {
    state.deviceInfo = deviceInfo;
  },
  [type.SET_DATA_OBJECT](state, obj) {
    if (state.dataObjLock !== 1) {
      state.dataObject = { ...state.dataObject, ...obj };
    }
  },
  [type.IS_SCENE](state, isScene) {
    state.isScene = isScene;
  },
  setFirstLoad(state) {
    state.firstLoad = 1;
  },
  setDataObjLock(num = 0) {
    // 设置dataObjLock的锁定, 0 取消, 1 上锁
    state.dataObjLock = num;
  }
};
