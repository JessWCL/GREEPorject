import * as types from './types';
import {
  getInfo,
  sendDataToDevice,
  finishLoad,
  showToast,
  closePage,
  updateStates,
  pluginHttp,
  pluginHttpPost,
} from '../../../static/lib/PluginInterface.promise';
import { getQueryStringByName, sleep } from '../utils/index';
import { LOCAL_STORAGE_DEVICE_INFO, __PROD__, __TEST__ } from '../api/constant';
import mock from '../api/81000/mock.js';

let _intervalID = 0; // setInterval定时器ID
let _timeoutID = 0; // setTimeout定时器ID
let _ignoreCtrl = false; // 忽略一包数据的Flag
let _firstCallback = true; // 是否第一次查询设备状态
let isSetDeviceInfo = true; // 是否设置本地deviceInfo缓存Flag, 用于第一次设置

var TIMER = 0;
var _timer = 0;

// 自定义数据，根据业务更改
function customerDataObject(_dataObject) {
  const dataObject = _dataObject;
  return dataObject;
}
/**
 * @description 请求实时数据
 */
function getRealTimeData({ state, commit }, obj) {
  const sleepReal = pluginHttpPost(obj)
    .then(res => {
      return res;
    })
    .catch(err => console.log(err));
  commit(types.SET_DATA_MID_STATE, { sleepReal });
}

function initWeekMonthReportDate({ state, commit }, obj) { 
  const initData = {
      mac: "mac00001",
      startDate: null,
      endDate: null,
      score: null, // 周平均得分
      heartRate: null, // 平均心率
      breatheRate: null, // 平均呼吸率
      inBedTime: null, // 平均睡眠时间
      scorePlot: null, // 周内评分
      datePlot: null // 日期列表
  }
  console.log('%c obj.type', 'color: red;', obj.type);
  obj.type === 'weekReportData' ? commit(types.SET_DATA_MID_STATE, { weekReportData: initData }) : commit(types.SET_DATA_MID_STATE, { monthReportData: initData });
}

function initDayReportDate({ state, commit }, obj) {
  const dayReportData = {
    "left": {
      "onBedAt": null,
      "sleepStartAt": null,
      "leaveBedAt": null,
      "sleepEndAt": null,
      "turnOver": null,
      "sleepCycleCount": null,
      "score": null,
      "meanHeartRate": null,
      "meanBreathRate": null,
      "nrDuration": null,
      "deepDuration": null,
      "wakeDuration": null,
      "remDuration": null,
      "leaveBedDuration": null,
      "enterSleepDuration": null,
      "meanTurnOverDuration": null,
      "minHeartRateMoment": null,
      "maxHeartRateMoment": null,
      "maxBreathRateMoment": null,
      "minBreathRateMoment": null,
      "minHeartRate": null,
      "maxHeartRate": null,
      "maxBreathRate": null,
      "minBreathRate": null,
      "snore": null,
      "apneaCount": null,
      "apneaMeanDuration": null,
      "sleepStage": null,
      "sleepRate": null
    },
  }
  commit(types.SET_DATA_MID_STATE, { dayReportData });
}

const actions = {
  /**
   * @description 初始化设备数据
   */
  async [types.INIT_DEVICE_DATA]({ dispatch, commit }) {
    // try {
      // 获取mac
      const mac = getQueryStringByName('mac');
      const path = getQueryStringByName('pathName');
      commit(types.SET_MAC, mac);
      console.log('[url] mac、pathName', mac, path);
      path ? this.$router.push({name: path}) : '';
    //   // 获取functype
    //   const functype = getQueryStringByName('functype') || 0;
    //   console.log('[url] functype:', functype);
    //   commit(types.SET_FUNCTYPE, Number(functype));
    //   // TODO: 为了兼容，后续此方法与属性会废弃，建议使用functype属性
    //   commit(types.SET_IS_SCENE, Number(functype));
    //   // 获取小卡片提供第一包设备数据
    //   const data = getQueryStringByName('data');
    //   console.log('[url] data:', data);
    //   // 根据设备信息解析第一包设备数据
    //   let dataObject = await dispatch(types.PARSE_DATA_BY_COLS, data);
    //   if (Object.keys(dataObject).length === 0) {
    //     // 第一次下载插件没有localDeviceInfo缓存
    //     // eslint-disable-next-line
    //     throw 'GreePlugin Helper: [localDeviceInfo] is null or [deviceInfo.fullstatueJson] is not a string object';
    //   }
    //   // 自定义数据，根据业务更改
    //   dataObject = customerDataObject(dataObject);
    //   commit(types.SET_DATA_OBJECT, dataObject);
    // } catch (e) {
    //   if (__PROD__ || __TEST__) {
    //     console.error(e);
    //   } else {
    //     console.warn(e);
    //   }
    // }
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

  /**
   * @description 用于初始化插件所需要的数据，cordova初始化后调用
   */
  async [types.INIT]({ dispatch, state }) {
    // try {
    //   const { deviceInfo } = state;
    //   const { cols } = JSON.parse(deviceInfo.fullstatueJson);
    //   console.log('localDeviceInfo:', JSON.stringify(deviceInfo));
    //   if (Array.isArray(cols) && !cols.length > 0) {
    //     // eslint-disable-next-line no-throw-literal
    //     throw 'GreePlugin Helper: [localDeviceInfo] 为空，获取deviceInfo后重新解析初始化设备的数据';
    //   }
    //   // 获取设备信息
    //   dispatch(types.GET_DEVICE_INFO);
    // } catch (e) {
    //   console.warn(e);
    //   // 获取设备信息
    //   await dispatch(types.GET_DEVICE_INFO);
    //   // 初始化设备数据
    //   await dispatch(types.INIT_DEVICE_DATA);
    // } finally {
    //   // 关闭原生加载H5的全屏白底loading
      dispatch(types.SEARCH_POWER_DATA);
      // dispatch(types.SEARCH_REALTIME_DATA);
      finishLoad();
    //   // 定时轮询 - 获取设备数据
      dispatch(types.INIT_TIMER_GET_DEVICE_DATA);
    // }
    // (__PROD__ || __TEST__) && console.timeEnd('init time');
  },

  /**
   * @description 5秒一次轮询获取设备全部状态
   */
  async [types.INIT_TIMER_GET_DEVICE_DATA]({ dispatch }) {
    try {
      // 开启轮询设备状态
      if (!_intervalID) {
        console.log('?????????????????????');
        _intervalID = setInterval(() => {
          dispatch(types.GET_DEVICE_STATES);
          dispatch(types.GET_DEVICE_INFO);
          dispatch(types.SEARCH_POWER_DATA);
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
  async [types.GET_DEVICE_INFO]({ dispatch, commit, state }) {
    try {
      const { mac } = state;
      const res = await getInfo(mac).catch(e => {
        console.error(e);
      });
      const deviceInfo = JSON.parse(res);
      const { fullstatueJson } = deviceInfo;
      // 防止Android端第一次下载插件fullstatueJson为空值
      if (fullstatueJson === '' || fullstatueJson === undefined || fullstatueJson === null) {
        await sleep(1000);
        dispatch(types.GET_DEVICE_INFO);
      } else {
        if (isSetDeviceInfo) {
          console.log('设置本地数据 localDeviceInfo:', res);
          localStorage.setItem(LOCAL_STORAGE_DEVICE_INFO, res);
          isSetDeviceInfo = false;
        }
        commit(types.SET_DEVICE_INFO, deviceInfo);
      }
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
      if (_ignoreCtrl) {
        console.log('发送命令后8秒竟然有数据想解析，赶紧忽略防止跳变');
        return;
      }

      const { mac, deviceInfo } = state;
      const data = 0

      // 是否要忽略数据解析，sendDataToDevice可能还在上一轮查询中，所以在此也加上忽略数据解析判断
      if (_ignoreCtrl) {
        console.log('发送命令后8秒竟然有数据想解析，上一轮数据回来了，赶紧忽略防止跳变');
        return;
      }

      // 尝试修复设备断电后，立刻点击小卡片，显示WebView控制页面的整改问题
      // if (_firstCallback && data === '') {
      //   showToast('网络异常', 1);
      //   closePage();
      // }
      _firstCallback = false;

      let dataObject = await dispatch(types.PARSE_DATA_BY_COLS, data);
      // 自定义数据，根据业务更改
      dataObject = customerDataObject(dataObject);
      commit(types.SET_DATA_OBJECT, dataObject);
    } catch (e) {
      console.error(e);
    }
  },

  /**
   * @description 下发启动后需要马上一包数据，及时更新状态，一般用于小家电
   */
  async [types.GET_WORKING_DEVICE_STATES]({ dispatch, commit, state }) {
    // const { mac, deviceInfo } = state;
    // const data = await sendDataToDevice(mac, deviceInfo.fullstatueJson, false);
    // const dataObject = await dispatch(types.PARSE_DATA_BY_COLS, data);
    // // 更新的状态，根据业务更改
    // const { pow } = dataObject;
    // commit(types.SET_DATA_OBJECT, { pow });
  },

  /**
   * @description 发送控制指令
   */
  async [types.SEND_CTRL]({ state, dispatch }, DataObject) {
    // const { mac } = state;
    // const keys = Object.keys(DataObject);
    // const opt = [];
    // const p = [];
    // // 组装指令，根据业务更改
    // keys.forEach(key => {
    //   opt.push(key);
    //   p.push(DataObject[key]);
    // });
    // const t = 'cmd';
    // const json = JSON.stringify({ mac, t, opt, p });
    // console.log(json);

    // // 集中控制时数据不下发
    // if (state.functype) return;

    // if (__PROD__ || __TEST__) {
    //   // 忽略一包数据的Flag
    //   _ignoreCtrl = true;
    //   // 发送指令前取消定时器
    //   if (_intervalID) {
    //     clearInterval(_intervalID);
    //     _intervalID = 0;
    //   }
    //   // 取消连续发送命令重启的setTimeout定时器
    //   if (_timeoutID) {
    //     clearTimeout(_timeoutID);
    //     _timeoutID = 0;
    //   }
    //   // 8秒后重启定时轮询
    //   _timeoutID = setTimeout(() => {
    //     if (!_intervalID) {
    //       // 接受查询数据
    //       _ignoreCtrl = false;
    //       // 定时轮询 - 获取设备数据
    //       dispatch(types.INIT_TIMER_GET_DEVICE_DATA);
    //     }
    //   }, 8000);
    //   const res = await sendDataToDevice(mac, json, false)
    //     .catch(e => console.error(e));
    //   const resJson = JSON.parse(res);
    //   const { r, p: _p } = resJson;
    //   // 成功之后更新主体状态
    //   if (r === 200) {
    //     // TODO: updateStates应该是不用再更新给主体，需进一步确认
    //     await updateStates(mac, JSON.stringify(_p))
    //       .catch(e => console.error(e));
    //   }
    // }
  },

  async initMockData({ commit }, payload) {
    const mockData = payload || mock;
    commit('setMyModule', mockData);
  },

  // 请求报告接口-日
  async [types.GET_DAY_REPORT]({ state, commit }, obj = {}) {
    const sendData = {
      url: `/gateway/wisdom-sleep/dailyReport`,
      paramsStr: {
        mac: state.mac,
        // mac: '114233105061',
        startAt: '2020-08-20'
      },
      headersStr: {
        Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mjk1MzIwODAsInVzZXJfbmFtZSI6ImRvYy1kZWJ1ZyIsImF1dGhvcml0aWVzIjpbIlVTRVIiXSwianRpIjoiNjEwODNiMTItYjhmMS00NjBlLThhMDItOTI3OWUyMDJmZDNmIiwiY2xpZW50X2lkIjoiZG9jLWRlYnVnIiwic2NvcGUiOlsiLyoqIl19.UzbiKpkCG1seD3R5ls4zXl0HqNq8IKCRohDb-43GWvIJorjc9epLGY5HZONhrHeFSFeTeVGr4dZhygKw7Cox2tiWsan4PBQgoaGXQz8Q1Kpx7TXfPZhxZ56ELyGQFheZoxgq8XLi39FlAQq8dHIUNtobyeTt8QsuAQk1Rw7t2M47Ux0Zf1qFhbpjjhcGg_sKjNxn57f5k9BSVuXoExHTwqPFDNibBLGiIDwOqY--jr6B8_wNQeInSAIh6bx3FZdcMdy3T5KwNJkv3oiObtqTXgWe3XzJaL5P8Wu35WMixK5vzWcmWL_84jNYay-rXJ_roHx-oT-ZGs7BPmzF9AmYOA'
      },
      ...obj
    }
    // TODO:这里的mac先写死了，实际使用时，要改成真实的mac，测试阶段真实mac没用
    console.log('%c 报告日期', 'color: red;', sendData);
    initDayReportDate({state, commit}); // 测试用
      // TODO:pluginHttp接口是新增的万能接口，由劳工创建，具体以他写的文档为准
    const dayReportData = await pluginHttp(sendData.url, '', JSON.stringify(sendData.paramsStr), 'post', 'iot7', '')
      .then(res => {
        console.log((res) || 'res是空');
        const { data, errorCode } = JSON.parse(res);
        if (errorCode !== 0) { // 与主体的请求状态码，非0失败
          showToast(`网络异常，请重试`, 0);
        } else if (data.data === null) {
          showToast(`今日暂无睡眠报告哦~${sendData.paramsStr.startAt}`, 0);
          initDayReportDate({state, commit});
        } else {
          console.log('%c ---- ', 'color: red;', data.data);
          commit(types.SET_DATA_MID_STATE, { dayReportData: data.data });
        }
        return data.data;
      })
      .catch(err => console.log(err));
  },
  // 请求报告接口-周
  async [types.GET_WEEK_REPORT]({ state, commit }, obj) {
    const sendData = {
      url: `/gateway/wisdom-sleep/weeklyReport`,
      paramsStr: {
        mac: state.mac,
        // mac: '114233105061',
        startAt: '2020-08-20'
      },
      headersStr: {
        Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mjk1MzIwODAsInVzZXJfbmFtZSI6ImRvYy1kZWJ1ZyIsImF1dGhvcml0aWVzIjpbIlVTRVIiXSwianRpIjoiNjEwODNiMTItYjhmMS00NjBlLThhMDItOTI3OWUyMDJmZDNmIiwiY2xpZW50X2lkIjoiZG9jLWRlYnVnIiwic2NvcGUiOlsiLyoqIl19.UzbiKpkCG1seD3R5ls4zXl0HqNq8IKCRohDb-43GWvIJorjc9epLGY5HZONhrHeFSFeTeVGr4dZhygKw7Cox2tiWsan4PBQgoaGXQz8Q1Kpx7TXfPZhxZ56ELyGQFheZoxgq8XLi39FlAQq8dHIUNtobyeTt8QsuAQk1Rw7t2M47Ux0Zf1qFhbpjjhcGg_sKjNxn57f5k9BSVuXoExHTwqPFDNibBLGiIDwOqY--jr6B8_wNQeInSAIh6bx3FZdcMdy3T5KwNJkv3oiObtqTXgWe3XzJaL5P8Wu35WMixK5vzWcmWL_84jNYay-rXJ_roHx-oT-ZGs7BPmzF9AmYOA'
      },
      ...obj
    }
    initWeekMonthReportDate({state, commit}, { type: 'weekReportData' });
    const weekReportData = await pluginHttp(sendData.url, '', JSON.stringify(sendData.paramsStr), 'post', 'iot7', '')
      .then(res => {
        console.log(JSON.parse(res) || 'res是空');
        const { data, errorCode } = JSON.parse(res);
        if (errorCode !== 0) { // 与主体的请求状态码，非0失败
          showToast(`网络异常，请重试`, 0);
        } else if (data.data === null) {
          showToast('本周暂无睡眠报告哦~', 0)
        } else {
          console.log('%c ---- ', 'color: red;', data.data);
          commit(types.SET_DATA_MID_STATE, { weekReportData: data.data });
        }
        return data.data;
      })
      .catch(err => console.log(err));
  },
  // 请求报告接口-月
  async [types.GET_MONTH_REPORT]({ state, commit }, obj) {
    const sendData = {
      url: `/gateway/wisdom-sleep/dailyReport`,
      paramsStr: {
        mac: state.mac,
        // mac: '114233105061',
        startAt: '2020-08-20'
      },
      headersStr: {
        Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mjk1MzIwODAsInVzZXJfbmFtZSI6ImRvYy1kZWJ1ZyIsImF1dGhvcml0aWVzIjpbIlVTRVIiXSwianRpIjoiNjEwODNiMTItYjhmMS00NjBlLThhMDItOTI3OWUyMDJmZDNmIiwiY2xpZW50X2lkIjoiZG9jLWRlYnVnIiwic2NvcGUiOlsiLyoqIl19.UzbiKpkCG1seD3R5ls4zXl0HqNq8IKCRohDb-43GWvIJorjc9epLGY5HZONhrHeFSFeTeVGr4dZhygKw7Cox2tiWsan4PBQgoaGXQz8Q1Kpx7TXfPZhxZ56ELyGQFheZoxgq8XLi39FlAQq8dHIUNtobyeTt8QsuAQk1Rw7t2M47Ux0Zf1qFhbpjjhcGg_sKjNxn57f5k9BSVuXoExHTwqPFDNibBLGiIDwOqY--jr6B8_wNQeInSAIh6bx3FZdcMdy3T5KwNJkv3oiObtqTXgWe3XzJaL5P8Wu35WMixK5vzWcmWL_84jNYay-rXJ_roHx-oT-ZGs7BPmzF9AmYOA'
      },
      ...obj
    }
    initWeekMonthReportDate({state, commit}, { type: 'monthReportData' });
      const monthReportData = await pluginHttp(sendData.url, '', JSON.stringify(sendData.paramsStr), 'post', 'iot7', '')
      .then(res => {
        console.log(JSON.parse(res) || 'res是空');
        const { data, errorCode } = JSON.parse(res);
        if (errorCode !== 0) {
          showToast(`网络异常，请重试`, 0);
        } else if (data.data === null) {
          showToast('本月暂无睡眠报告哦~', 0)
        } else {
          commit(types.SET_DATA_MID_STATE, { monthReportData: data.data });
        }
        return data.data;
      })
      .catch(err => console.log(err));
  },

  // 发送实时查询指令，三个实时数据
  async [types.SEARCH_REALTIME_DATA]({ state, commit, dispatch }) {
    // const { mac } = state;
    // const json = {
    //   t: "status",
    //   cols: ["SleepData"]
    // }
    // console.log('发送的meshstatus指令：', json);
    // clearTimeout(_timer);
    // _timer = 0;
    // const result =  await sendDataToDevice(mac, JSON.stringify(json), false)
    //   .then(res => {
    //     console.log(res || 'res是空');
    //     let dataArr = [];
    //     if (!res || !JSON.parse(res) || JSON.parse(res).length === 0) {
    //       console.log('%c 返回数据格式有误', 'color: red;');
    //       return;
    //     } else {
    //       const { dat } = JSON.parse(res);
    //       const dataStr = dat[0];
    //       console.log('%c dataStr', 'color: red;', dataStr);
    //       dataArr = dataStr.match(/../g).map(item => parseInt(item, 16)); // 全匹配2个
    //       commit(types.SET_DATA_OBJECT, { heartRate: dataArr[0], breathRate: dataArr[1], inBedState: dataArr[2] });
    //     }
    //     console.log('%c 解析后的实时数据', 'color: red;', dataArr);
    //     _timer = setTimeout(() => {
    //       commit(types.SET_LOADING, false);
    //     }, 1000);
    //     return 'success';
    //   })
    //   .catch(err => {
    //     console.log('Error', err);
    //     _timer = setTimeout(() => {
    //       commit(types.SET_LOADING, false);
    //     }, 1000);
    //     return 'fail';
    //   })
    //   return result;
  },
  
  // 发送电量查询指令
  // TODO:据说以后的mesh查询包都是这个样子的，只需要传meshStatus就可以查询所有可轮训的内容，具体以劳工的文档协议为准
  // 当前项目实时数据页对应
  [types.SEARCH_POWER_DATA]({ state, commit }) {
    const { mac } = state;
    const json = {
      t: "meshStatus",
    }
    console.log('发送的meshstatus指令：', json);
    sendDataToDevice(mac, JSON.stringify(json), false)
    .then(res => {
      try {
        console.log(res || 'res是空');
        let dataObj = {};
        const { cols, dat } = JSON.parse(res);
        // TODO:返回格式是{cols dat}
        for (let i = 0, len = cols.length; i < len; i++) {
          dataObj = { ...dataObj, [cols[i]]: dat[i] }
        }
        commit(types.SET_DATA_OBJECT, dataObj);
        console.log('%c SET_DATA_OBJECT', 'color: red;', dataObj);
      } catch (error) {
        console.log('%c error:数据格式有误', 'color: red;', res);
      }
    })
  }
};

export default actions;
