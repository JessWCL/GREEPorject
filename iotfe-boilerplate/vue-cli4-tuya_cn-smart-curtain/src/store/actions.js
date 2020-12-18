import { finishLoad, updateStates, tuyaControlDev, tuyaRequestDevData } from '../../../static/lib/PluginInterface.promise'; // 主体接口
import * as types from './types';
import { __PROD__, __TEST__ } from '../api/constant';
import { getQueryStringByName } from '../utils/index';

let _intervalID = 0; // setInterval定时器ID
let _timeoutID = 0; // setTimeout定时器ID
let _ignoreCtrl = false; // 忽略一包数据的Flag
let _firstCallback = true; // 是否第一次查询设备状态
let isSetDeviceInfo = true; // 是否设置本地deviceInfo缓存Flag, 用于第一次设置

/**
 * @returns Promise，等待计时结束进行下一项任务
 */
function sleep(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

export default {

  /**
   * @description 获取第三方信息
   */
  async [types.INIT_DEVICE_DATA]({ dispatch, commit, state }) {
    try {
      // 获取mac
      const mac = getQueryStringByName('mac');
      console.log('[url] mac:', mac);
      commit(types.SET_MAC, mac);
      // 获取functype
      const functype = getQueryStringByName('functype') || 0;
      console.log('[url] functype:', functype);
      commit(types.SET_FUNCTYPE, Number(functype));
      // TODO: 为了兼容，后续此方法与属性会废弃，建议使用functype属性
      commit(types.SET_IS_SCENE, Number(functype));
      // 获取小卡片提供第一包设备数据
      const data = getQueryStringByName('data');
      console.log('[url] data:', data);
      dispatch(types.GET_TUYA_DEVICE_INFO);
    } catch (e) {
      console.error(e);
    } finally {
      finishLoad();
      dispatch(types.INIT_TIMER_GET_DEVICE_DATA)
    }
  },

  /**
   * @description 获取涂鸦设备信息
   */
  [types.GET_TUYA_DEVICE_INFO]({ state, commit }) {
    const mac = state.mac;
    return tuyaRequestDevData(mac)
      .then(res => {
        const __res = JSON.parse(res);
        if (__res.code === 200) {
          const DataObject = __res.message.result;
          console.log('actions.js === tuyaRequestDevData', DataObject);
          commit(types.SET_DATA_OBJECT, DataObject);
        }
        return res;
      })
      .catch(err => {
        err;
      });
  },

  /**
   * @description 获取设备全部状态,插件初始化时立刻查询一次，成功加载数据后finishLoad，然后5秒一次轮询
   */
  async [types.INIT_TIMER_GET_DEVICE_DATA]({ dispatch }) {
    if (_intervalID === 0) {
      _intervalID = setInterval(() => {
        dispatch(types.GET_TUYA_DEVICE_INFO);
      }, 5000);
    }
  },

  /**
   * 涂鸦控制设备接口
   */
  async [types.TUYA_CONTROL_DEV]({ state }, obj) {
    const {
      mac,
      dataObject: {
        deviceTypeName
      }
    } = state;
    const keys = Object.keys(obj);
    const commands = [];
    keys.forEach(key => {
      // 组装指令，根据业务更改
      commands.push({
        code: key,
        value: obj[key]
      });
    });

    console.log('tuyaControlDev:', JSON.stringify([mac, deviceTypeName, { commands }]));

    // 集中控制时数据不下发
    if (state.functype) return;

    if (__PROD__ || __TEST__) {
      // 忽略一包数据的Flag
      _ignoreCtrl = true;
      // 发送指令前取消定时器
      if (_intervalID) {
        clearInterval(_intervalID);
        _intervalID = 0;
      }
      // 取消连续发送命令重启的setTimeout定时器
      if (_timeoutID) {
        clearTimeout(_timeoutID);
        _timeoutID = 0;
      }
      // 8秒后重启定时轮询
      _timeoutID = setTimeout(() => {
        if (!_intervalID) {
          // 接受查询数据
          _ignoreCtrl = false;
          // 定时轮询 - 获取设备数据
          dispatch(types.INIT_TIMER_GET_DEVICE_DATA);
        }
      }, 8000);
      const res = await tuyaControlDev(mac, deviceTypeName, { commands })
        .catch(e => console.error(e));
      const resJson = JSON.parse(res);
      const { r, p: _p } = resJson;
      // 成功之后更新主体状态
      if (r === 200) {
        console.log('[updateStates] p:', _p);
        // TODO: updateStates应该是不用再更新给主体，需进一步确认
        await updateStates(mac, JSON.stringify(_p))
          .catch(e => console.error(e));
      }
    }
  }
};
