import * as types from './types';
import {
  getInfo,
  getCCcmd,
  sendDataToDevice,
  finishLoad,
  showToast,
  closePage,
  updateStates
} from '../../../static/lib/PluginInterface.promise';
import { getQueryStringByName, useDefaultValue } from '../utils/index';
import { __PROD__, __TEST__ } from '../api/constant';
import config from '../config/config.json';

let timer = 0; // setInterval定时器ID
let _firstCallback = true; // 是否第一次查询设备状态
let allowCommit = true; // 是否允许提交 dataObject

// 自定义数据，根据业务更改
function customizeDataObject(_dataObject) {
  let dataObject = _dataObject;
  dataObject = useDefaultValue(DataObject); // 由于不同设备，有些设备没有此字段模块回空字符串;
  return dataObject;
}

export default {
  /**
   * @description 初始化，并将小卡片传进来的值赋予 state
   */
  async [types.INIT]({ dispatch }) {
    try {
      // 初始化设备数据
      await dispatch(types.INIT_DEVICE_DATA);
      // 获取设备信息
      dispatch(types.GET_DEVICE_INFO);
      // 查询一包数据
      dispatch(types.GET_DEVICE_DATA);
      // 定时轮询 - 获取设备所有状态数据
      dispatch(types.TIMER_GET_ALL_DEVICE_STATES);
    } catch (e) {
      console.warn(e);
    } finally {
      // 关闭原生加载H5的全屏白底loading
      // TODO: vue 可能没渲染完页面
      finishLoad();
    }
  },

  /**
   * @description 初始化设备数据
   */
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

      // 自定义数据，根据业务更改
      dataObject = customizeDataObject(dataObject);
      commit(types.SET_DATA_OBJECT, dataObject);
    } catch (e) {
      console.error(e);
    }
  },

  /**
   * @description 解析设备数据
   * @param {String} data
   */
  [types.PARSE_DATA_BY_COLS](context, payload) {
    const dataObject = {};
    try {
      const cols = config.device.statueJson2;
      const res = JSON.parse(payload);
      for (let i = 0, j = cols.length; i < j; i += 1) {
        dataObject[cols[i]] = res[i]; // 遍历查询到的数据
      }
      console.log('dataObject:', JSON.stringify(dataObject));
    } catch (e) {
      console.error(e);
    }
    return dataObject;
  },

  /**
   * @description 5秒一次轮询获取设备全部状态
   */
  async [types.TIMER_GET_ALL_DEVICE_STATES]({ dispatch }) {
    try {
      // 清除定时器
      timer && clearInterval(timer);
      // 开启轮询设备状态
      timer = setInterval(() => {
        allowCommit = true;
        // 获取设备信息
        dispatch(types.GET_DEVICE_INFO);
        // 查询一包数据
        dispatch(types.GET_DEVICE_DATA);
      }, 5000);
    } catch (e) {
      console.error(e);
    }
  },

  /**
   * @description 获取设备在线状态
   */
  async [types.GET_DEVICE_INFO]({ dispatch, commit, state }) {
    try {
      const { mac } = state;
      const res = await getInfo(mac).catch(e => console.error(e));
      const deviceInfo = JSON.parse(res);
      commit(types.SET_DEVICE_INFO, deviceInfo);
    } catch (e) {
      console.error(e);
    }
  },

  /**
   * @description 获取设备状态
   */
  async [types.GET_DEVICE_DATA]({ state, commit, dispatch }) {
    try {
      // 集中控制时数据不查询
      if (state.functype) return;

      const { mac } = state;

      // 采用本地 SEARCH_JSON 作查询， fullstatueJson 弃用，为了更快显示H5
      const cols = config.device.statueJson2;
      const t = 'status';
      const SEARCH_JSON = JSON.stringify({ cols, mac, t });

      const data = await sendDataToDevice(mac, SEARCH_JSON, false);

      // 尝试修复设备断电后，立刻点击小卡片，显示WebView控制页面的整改问题
      if (_firstCallback && data === '') {
        showToast('网络异常', 1);
        closePage();
      }
      _firstCallback = false;

      let dataObject = await dispatch(types.PARSE_DATA_BY_COLS, data);
      // 自定义数据，根据业务更改
      dataObject = customizeDataObject(dataObject);
      allowCommit && commit(types.SET_DATA_OBJECT, dataObject);
    } catch (e) {
      console.error(e);
    }
  },

  /**
   * @description 下发启动后需要马上一包数据，及时更新状态，一般用于小家电
   */
  async [types.GET_WORKING_DEVICE_STATES]({ dispatch, commit, state }) {
    const { mac } = state;

    // 采用本地 SEARCH_JSON 作查询， fullstatueJson 弃用，为了更快显示H5用
    const cols = config.device.statueJson2;
    const t = 'status';
    const SEARCH_JSON = JSON.stringify({ cols, mac, t });

    const data = await sendDataToDevice(mac, SEARCH_JSON, false);
    const dataObject = await dispatch(types.PARSE_DATA_BY_COLS, data);
    // 更新的状态，根据业务更改
    // const { Pow } = dataObject;
    commit(types.SET_DATA_OBJECT, dataObject);
  },

  /**
   * @description 保存场景控制指令
   * @param {Object} payload
   *
   * 场景文案，根据业务更改，示例如下
   * const zh = {
   *   mode_1: '模式自动', // 非动态的，getRemarks方法直接取值
   *   mode_2: '模式睡眠',
   *   mode_3: '模式手动',
   *   mode_4: '模式快速',
   *   light_0: '灯光关',
   *   light_1: '灯光开',
   *   AirChildLock_0: '童锁关',
   *   AirChildLock_1: '童锁开',
   *
   *   wspd: '风速' // 动态的，getRemarks方法会拼接字段值
   * };
   */
  async [types.SEND_FUNCTYPE_CTRL]({ state }, payload = {}) {
    try {
      const zh = payload;

      const { mac, dataObject } = state;

      const p = [];
      const opt = [];
      for (const key in dataObject) {
        const val = dataObject[key];
        opt.push(key);
        p.push(val);
      }

      function getRemarks({ opt, p, zh }) {
        let ret = '';
        for (let index = 0; index < opt.length; index += 1) {
          const key = opt[index];
          const val = p[index];
          if (zh[`${key}_${val}`]) {
            // 非动态的，如模式
            ret += `${zh[`${key}_${val}`]} `;
          } else if (zh[key]) {
            // 动态的，如风速
            ret += `${zh[key]}${val} `;
          }
        }
        if (ret.length > 0) ret += '...';
        return ret;
      }

      const t = 'cmd';
      const cmd = JSON.stringify({ opt, p, t });
      const remarks = getRemarks({ opt, p, zh });

      getCCcmd(mac, cmd, remarks, JSON.stringify(p));
    } catch (e) {
      console.error(e);
    }
  },

  /**
   * @description 发送控制指令
   */
  async [types.SEND_CTRL]({ state, dispatch }, DataObject) {
    try {
      const { mac, dataObject } = state;
      const keys = Object.keys(DataObject);
      const opt = [];
      const p = [];
      // 组装指令，根据业务更改
      keys.forEach(key => {
        opt.push(key);
        p.push(DataObject[key]);
      });
      const t = 'cmd';
      const json = JSON.stringify({ mac, t, opt, p });
      console.log(json);

      // 集中控制时数据不下发
      if (state.functype) return;

      if (__PROD__ || __TEST__) {
        // 发送指令前取消定时器
        timer && clearInterval(timer);
        allowCommit = false;
        const res = await sendDataToDevice(mac, json, false).catch(e => console.error(e));
        const resJson = JSON.parse(res);
        const { r } = resJson;
        // 成功之后更新主体状态
        if (r === 200) {
          // TODO: 需要项目验证此逻辑是否没问题
          // 小卡片字段 全部更新给主体
          const cardCols = config.device.statueJson;
          const _p = [];
          for (let i = 0, j = cardCols.length; i < j; i += 1) {
            _p.push(dataObject[cardCols[i]]); // 遍历查询到的数据
          }
          updateStates(mac, JSON.stringify(_p)).catch(e => console.error(e));
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      // 定时轮询 - 获取设备数据
      dispatch(types.TIMER_GET_ALL_DEVICE_STATES);
    }
  }
};
