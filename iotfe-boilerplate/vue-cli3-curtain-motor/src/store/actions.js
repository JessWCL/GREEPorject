import {
  GET_DEVICE_INFO,
  GET_THIRD_INFO,
  GET_ALL_STATES,
  SET_DEVICE_INFO,
  SET_DATA_OBJECT,
  SET_ISFIRST,
} from './types';
import {
  getInfo,
  finishLoad,
  getOuriboDevicesAllStatus,
  tuyaRequestDevData
} from '../../../static/lib/PluginInterface.promise'; // 主体接口

let _timer = 0; // 轮询定时器

/**
 * @description 获取设备在线状态
 */
function getDeviceInfo({ state, commit }) {
  return getInfo(state.mac)
    .then(res => {
      const deviceInfo = JSON.parse(res);
      console.log('actions.js === getDeviceInfo', deviceInfo);
      commit(SET_DEVICE_INFO, deviceInfo);
      return res;
    })
    .catch(err => {
      err;
    });
}

/**
 * @description 获取涂鸦设备信息
 */
function getThirdInfo({ state, commit }) {
  if (process.env.VUE_APP_MID.includes('702')) {
    return getOuriboDevicesAllStatus(state.mac)
      .then(res => {
        const __res = JSON.parse(res);
        if (__res.code === 200) {
          const DataObject = __res.message.Properties;
          console.log('actions.js === getThirdInfo', DataObject);
          !state.isUiLock && commit(SET_DATA_OBJECT, DataObject);
        }
        return res;
      })
      .catch(err => {
        err;
      });
  }
  return tuyaRequestDevData(state.mac)
    .then(res => {
      const __res = JSON.parse(res);
      if (__res.code === 200) {
        const DataObject = __res.message.result;
        console.log('actions.js = getThirdInfo = DataObject.properties ', JSON.stringify(DataObject.properties));
        state.isFirst && commit(SET_ISFIRST, false);
        !state.isUiLock && commit(SET_DATA_OBJECT, DataObject);
      }
      return res;
    })
    .catch(err => {
      err;
    });
}

export default {
  /**
   * @description 获取设备信息，并开始轮询设备状态
   */
  async [GET_DEVICE_INFO]({ dispatch, commit, state }) {
    const _res = await getInfo(state.mac)
      .then(res => {
        return res;
      })
      .catch(err => {
        err;
      });
    const deviceInfo = JSON.parse(_res);
    commit(SET_DEVICE_INFO, deviceInfo);
    await dispatch(GET_ALL_STATES);
  },

  /**
   * @description 获取第三方信息
   */
  async [GET_THIRD_INFO]({ dispatch, commit, state }) {
    getThirdInfo({ state, commit });
    await dispatch(GET_ALL_STATES);
  },

  /**
   * @description 获取设备全部状态,插件初始化时立刻查询一次，成功加载数据后finishLoad，然后5秒一次轮询
   */
  async [GET_ALL_STATES]({ state, commit }) {
    finishLoad();
    if (_timer === 0) {
      _timer = setInterval(() => {
        getDeviceInfo({ state, commit });
        getThirdInfo({ state, commit });
      }, 5000);
    }
  }
};
