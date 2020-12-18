import { finishLoad, getInfo } from '../../../static/lib/PluginInterface.promise'; // 主体接口
import { GET_ALL_STATES, GET_DEVICE_INFO, SET_DEVICE_INFO } from './types';
import config from '../config/config.json';

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

export default {
  /**
   * @description 获取设备信息，并开始轮询设备状态
   */
  async [GET_DEVICE_INFO]({ dispatch, commit, state }) {
    const _res = await getInfo(state.mac)
      .then(res => {
        console.log('actions.js === GET_DEVICE_INFO', res);
        finishLoad();
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
   * @description 获取设备全部状态,插件初始化时立刻查询一次，成功加载数据后finishLoad，然后5秒一次轮询
   */
  async [GET_ALL_STATES]({ state, commit }) {
    if (_timer === 0) {
      _timer = setInterval(() => {
        getDeviceInfo({ state, commit });
        // TODO: 增加查询设备状态接口
        const cols = config.device.statueJson2
        const t = 'status';
        const searchJson = JSON.stringify({ cols, mac, t });
        console.log(searchJson);
      }, 5000);
    }
  }
};
