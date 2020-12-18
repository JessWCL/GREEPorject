import * as types from './types';
import {
  getInfo,
  sendDataToDevice,
  finishLoad,
  showToast,
  closePage
} from '../../../static/lib/PluginInterface.promise';
import { useDefaultValue, getQueryStringByName } from '../utils/index';
import { LOCAL_STORAGE_DEVICE_INFO, __PROD__, __TEST__ } from '../api/constant';
import store from '../store';

let intervalID = 0; // setInterval定时器ID
let timeoutID = 0; // setTimeout定时器ID
let ignoreCtrl = false; // 忽略一包数据的Flag
let _firstCallback = true; // 是否第一次查询设备状态
let isSetDeviceInfo = true; // 是否设置本地deviceInfo缓存Flag, 用于第一次设置

// 自定义数据
function customerDataObject(_DataObject) {
  let DataObject = _DataObject;
  try {
    DataObject = useDefaultValue(DataObject); // remove illegal value;
    const {
      Wash,
      WashDone,
      TmrOn,
      Mod,
      Dry,
      Purifier
    } = DataObject;
    // 工作时才查询
    const isWorking = WashDone === 1 || Wash === 1 || TmrOn === 1;
    if (isWorking) {
      const isWashTabbar = Mod !== 0;
      const isDryTabbar = Mod === 0 && Dry !== 0;
      const isPurifierTabbar = Mod === 0 && Dry === 0 && Purifier !== 0;
      let modType = 0;
      if (isWashTabbar) {
        modType = 0; // 洗涤模式
      } else if (isDryTabbar) {
        modType = 1; // 单烘干
      } else if (isPurifierTabbar) {
        modType = 2; // 单保洁
      }
      store.commit(types.SET_CACHE, { modType });
    } else {
      delete DataObject.Mod;
      delete DataObject.LayerWash;
      delete DataObject.Dry;
      delete DataObject.RmTmrHour;
      delete DataObject.RmTmrMin;
      delete DataObject.TmrHour;
      delete DataObject.TmrMin;
      delete DataObject.StTmr;
      delete DataObject.Purifier;
      delete DataObject.Disinfect;
      delete DataObject.PurifierTime;
    }
  } catch (e) {
    console.error(e);
  }
  return DataObject;
}

const actions = {
  async [types.INIT_DEVICE_DATA]({ dispatch, commit }) {
    try {
      // 获取mac
      const mac = getQueryStringByName('mac');
      console.log('[url] mac:', mac);
      commit(types.SET_MAC, mac);
      // 获取functype
      const functype = getQueryStringByName('functype') || 0;
      console.log('[url] functype:', functype);
      commit(types.SET_FUNCTYPE, Number(functype));
      // 获取小卡片提供第一包设备数据
      const data = getQueryStringByName('data');
      console.log('[url] data:', data);
      // 根据设备信息解析第一包设备数据
      let dataObject = await dispatch(types.PARSE_DATA_BY_COLS, data);
      if (Object.keys(dataObject).length === 0) {
        // 第一次下载插件没有localDeviceInfo缓存
        // eslint-disable-next-line
        throw 'GreePlugin Helper: [localDeviceInfo] is null or [deviceInfo.fullstatueJson] is not a string object';
      }
      // 自定义数据
      dataObject = customerDataObject(dataObject);
      commit(types.SET_DATA_OBJECT, dataObject);
    } catch (e) {
      if (__PROD__ || __TEST__) {
        console.error(e);
      } else {
        console.warn(e);
      }
    }
  },

  /**
   * @description 解析设备数据
   * @param {String} data
   */
  [types.PARSE_DATA_BY_COLS]({ state }, payload) {
    const dataObject = {};
    try {
      const { deviceInfo } = state;
      const { cols } = JSON.parse(deviceInfo.fullstatueJson);
      const res = JSON.parse(payload);
      for (let i = 0, j = cols.length; i < j; i += 1) {
        dataObject[cols[i]] = res[i]; // 遍历查询到的数据
      }
      console.log('dataObject:', JSON.stringify(dataObject));
    } catch (e) {
      // 用于本地开发调试时，不乱报错
      if (__PROD__ || __TEST__) {
        console.error(e);
      } else {
        console.warn(e);
      }
    }
    return dataObject;
  },

  async [types.INIT]({ dispatch, state }) {
    try {
      const { deviceInfo } = state;
      const { cols } = JSON.parse(deviceInfo.fullstatueJson);
      console.log('localDeviceInfo:', JSON.stringify(deviceInfo));
      if (Array.isArray(cols) && !cols.length > 0) {
        // eslint-disable-next-line no-throw-literal
        throw 'GreePlugin Helper: [localDeviceInfo] 为空，获取deviceInfo后重新解析初始化设备的数据';
      }
      // 获取设备信息
      dispatch(types.GET_DEVICE_INFO);
    } catch (e) {
      console.warn(e);
      // 获取设备信息
      await dispatch(types.GET_DEVICE_INFO);
      // 初始化设备数据
      await dispatch(types.INIT_DEVICE_DATA);
    } finally {
      // 关闭原生加载H5的全屏白底loading
      finishLoad();
      // 定时轮询 - 获取设备数据
      (__PROD__ || __TEST__) && dispatch(types.INIT_TIMER_GET_DEVICE_DATA);
    }
    console.timeEnd('init time');
  },

  /**
   * @description 5秒一次轮询获取设备全部状态
   */
  async [types.INIT_TIMER_GET_DEVICE_DATA]({ dispatch }) {
    try {
      // 开启轮询设备状态
      if (!intervalID) {
        intervalID = setInterval(() => {
          dispatch(types.GET_DEVICE_STATES);
          dispatch(types.GET_DEVICE_INFO);
        }, 5000);
      }
    } catch (e) {
      // 用于本地开发调试时，不乱报错
      if (__PROD__ || __TEST__) {
        console.error(e);
      } else {
        console.warn(e);
      }
    }
  },

  /**
   * @description 获取设备信息
   */
  async [types.GET_DEVICE_INFO]({ commit, state }) {
    try {
      const { mac } = state;
      const res = await getInfo(mac).catch(e => {
        console.error(e);
      });
      const deviceInfo = JSON.parse(res);
      if (isSetDeviceInfo) {
        localStorage.setItem(LOCAL_STORAGE_DEVICE_INFO, res);
        isSetDeviceInfo = false;
      }
      commit(types.SET_DEVICE_INFO, deviceInfo);
    } catch (e) {
      console.error(e);
    }
  },

  /**
   * @description 获取设备状态
   */
  async [types.GET_DEVICE_STATES]({ state, commit, dispatch }) {
    try {
      // 集中控制时数据不查询
      if (state.functype) return;

      // 是否要忽略数据解析
      if (ignoreCtrl) {
        console.log('发送命令后8秒竟然有数据想解析，赶紧忽略防止跳变');
        return;
      }

      const { mac, deviceInfo } = state;
      const data = await sendDataToDevice(
        mac,
        deviceInfo.fullstatueJson,
        false
      );

      // 尝试修复设备断电后，立刻点击小卡片，显示WebView控制页面的整改问题
      if (_firstCallback && data === '') {
        showToast('网络异常', 1);
        closePage();
      }
      _firstCallback = false;

      // 是否要忽略数据解析
      if (ignoreCtrl) {
        console.log('发送命令后8秒竟然有数据想解析，赶紧忽略防止跳变');
        return;
      }

      let dataObject = await dispatch(types.PARSE_DATA_BY_COLS, data);
      // 自定义数据
      dataObject = customerDataObject(dataObject);
      commit(types.SET_DATA_OBJECT, dataObject);
    } catch (e) {
      console.error(e);
    }
  },

  async [types.GET_WORK_DEVICE_STATES]({ dispatch, commit, state }) {
    const { mac, deviceInfo } = state;
    const data = await sendDataToDevice(mac, deviceInfo.fullstatueJson, false);
    const dataObject = await dispatch(types.PARSE_DATA_BY_COLS, data);
    const { RmTmrHour, RmTmrMin, WorkStatus } = dataObject;
    commit(types.SET_DATA_OBJECT, { RmTmrHour, RmTmrMin, WorkStatus });
  },

  /**
   * @description 发送控制指令
   */
  async [types.SEND_CTRL]({ state, dispatch }, DataObject) {
    const keys = Object.keys(DataObject);

    // 发送命令时先同步界面，如果有失败恢复之前设备状态
    // dispatch(setDataObjectAction(payload));

    const opt = [];
    const p = [];
    // 组装指令，根据业务更改
    keys.forEach(key => {
      opt.push(key);
      p.push(DataObject[key]);
    });
    const mac = state.mac;
    const t = 'cmd';
    const json = JSON.stringify({ mac, t, opt, p });
    console.log(json);
    if (__PROD__ || __TEST__) {
      // 忽略一包数据的Flag
      ignoreCtrl = true;
      // 发送指令前取消定时器
      if (intervalID) {
        clearInterval(intervalID);
        intervalID = 0;
      }
      // 取消连续发送命令重启的setTimeout定时器
      if (timeoutID) {
        clearTimeout(timeoutID);
        timeoutID = 0;
      }
      // 8秒后重启定时轮询
      timeoutID = setTimeout(() => {
        if (!intervalID) {
          // 接受查询数据
          ignoreCtrl = false;
          // 定时轮询 - 获取设备数据
          dispatch(types.INIT_TIMER_GET_DEVICE_DATA);
        }
      }, 8000);
      await sendDataToDevice(mac, json, false).catch(e => {
        console.error(e);
        // 恢复发送命令前的状态
      });
    }
  }
};

export default actions;
