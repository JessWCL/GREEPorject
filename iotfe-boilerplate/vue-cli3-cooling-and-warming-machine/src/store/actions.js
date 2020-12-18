/*
 * @Descripttion: 
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2019-09-05 14:12:57
 * @LastEditors  : ZM_lee└(^o^)┘
 * @LastEditTime : 2019-12-20 10:18:40
 */
import {
  GET_DEVICE_INFO,
  GET_ALL_STATES,
  SET_DEVICE_INFO,
  SET_DATA_OBJECT,
  SEND_CTRL,
  SEND_TIME,
  QUERY_TIME,
  QUERY_TIME_SOME,
  GET_TIMELIST,
  QUERY_MODULES,
  DELETE_TIMER,
} from './types';

import {
  sendDataToDevice,
  getInfo,
  updateStates,
  finishLoad,
  showLoading,
  hideLoading,
  showToast,
  closePage
} from '../../../static/lib/PluginInterface.promise'; // 主体接口

let _timer = 0; // 轮询定时器
// let _timer2 = 0; // 发送定时器
// let _control_Timer = null; // 控制命令定时器，用于收集1秒内的所有控制命令
let timeList1 = {};
let timeList2 = {};
// let setDataOK = true;
let uiLock = false;
let setTimeUiLock = false;
let isFirst = true;

/**
 * @description 获取设备在线状态
 */
function getDeviceInfo({ state, commit }) {
  return getInfo(state.mac)
    .then(res => {
      const deviceInfo = JSON.parse(res);
      commit(SET_DEVICE_INFO, deviceInfo);
      return res;
    })
    .catch(err => {
      err;
    });
}


/**
 * @description 返回一个向整机查询数据的promise，这个promise执行成功后返回查到的数据DataObject
 */
function getStatusOfDev({ state, commit }) {
  const { cols } = JSON.parse(state.deviceInfo.fullstatueJson);
  return sendDataToDevice(state.mac, state.deviceInfo.fullstatueJson, false)
    .then(_res => {
      // 解决进来时设备已离线问题
      if (_res === '' && isFirst) {
        showToast('网络异常', 1);
        closePage();
      }
      
      const DataObject = {};
      const res = JSON.parse(_res);
      for (let i = 0, j = cols.length; i < j; i += 1) {
        DataObject[cols[i]] = res[i]; // 遍历查询到的数据，将值写入state中的DataObject，根据业务更改
      }
      if (!state.isScene && !uiLock) {
        // 非场景时提交数据
        commit(SET_DATA_OBJECT, DataObject);
      }
      return DataObject;
    })
    .catch(err => {
      return err;
    });
}
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
    // 防止Android端第一次下载插件fullstatueJson为空值
    if (JSON.parse(_res).fullstatueJson === '') {
      await sleep(1000);
      dispatch(GET_DEVICE_INFO);
    } else {
      const deviceInfo = JSON.parse(_res);
      commit(SET_DEVICE_INFO, deviceInfo);
      await dispatch(GET_ALL_STATES);
      await dispatch(QUERY_TIME_SOME, 0);
      await dispatch(QUERY_TIME_SOME, 4);
      await dispatch(QUERY_TIME, 8);
      await dispatch(QUERY_MODULES, 1);
      await dispatch(QUERY_MODULES, 2);
      await dispatch(QUERY_MODULES, 3);
      finishLoad();
      isFirst = false;
    }
  },
  /**
   * @description 获取设备全部状态,插件初始化时立刻查询一次，成功加载数据后finishLoad，然后5秒一次轮询
   */
  async [GET_ALL_STATES]({ state, commit }) {
    await getStatusOfDev({ state, commit }).then(res => res);
    !state.isScene && !isFirst ? finishLoad() : '';
    if (_timer === 0) {
      _timer = setInterval(() => {
        getDeviceInfo({ state, commit });
        getStatusOfDev({ state, commit });
      }, 5000);
    }
  },

  /**
   * @description 发送控制指令
   */
  async [SEND_CTRL]({ state, commit }, DataObject) {
    uiLock = true;
    // clearInterval(_timer2);
    // _timer2 = setTimeout(async () => {
      const keys = Object.keys(DataObject);
      const opt = [];
      const p = [];
      keys.forEach(key => {
        // 组装指令，根据业务更改
        opt.push(key);
        p.push(DataObject[key]);
      });
      const mac = state.mac;
      const t = 'cmd';
      const json = JSON.stringify({ mac, t, opt, p });
      console.table(DataObject);
      // 调用原生方法发送控制命令
      if (!state.isScene && navigator.PluginInterface) {
        // 非场景模式发送指令，否则不发送
        clearInterval(_timer);
        _timer = 0;
        const res = await sendDataToDevice(mac, json, false)
          .then(res => {
            return res;
          })
          .catch(err => err);
        // 无论成功与否，过8秒后重启轮询
        setTimeout(() => {
          if (!_timer) {
            uiLock = false; 
            _timer = setInterval(() => {
              getDeviceInfo({ state, commit });
              getStatusOfDev({ state, commit });
            }, 5000);
          }
        }, 3000);
        const result = JSON.parse(res);
        const { r, p: _p } = result;
        // 成功之后更新主体状态
        r === 200 &&
          (await updateStates(state.mac, JSON.stringify(_p))
            .then(res => res)
            .catch(err => err));
      }
    // }, 200); 
  },
  /**
   * @description 发送定时指令
   */
  async [SEND_TIME]({ state }, obj) {
    const mac = state.mac;
    const json = JSON.stringify(obj);
    // 调用原生方法发送控制命令
    showLoading();
    if (!state.isScene) {
      // 非场景模式发送指令，否则不发送
      setTimeUiLock = true;
      const res = await sendDataToDevice(mac, json, false)
        .then(res => {
          hideLoading();
          setTimeout(() => {
            setTimeUiLock = false;
          }, 3000);
          return res;
        })
        .catch(err => err);
      const result = JSON.parse(res);
      console.log(result);
    }
  },
  /**
   * @description 查询定时指令, 由于字节过长， 需要分开查
   */
  async [QUERY_TIME_SOME]({ state }, index) {
    const mac = state.mac;
    const queryTime = {
      t: 'queryT',
      index,
      count: 4
    };
    const json = JSON.stringify(queryTime);
    // 调用原生方法发送查询指令
    if (!state.isScene) {
      // 非场景模式发送指令，否则不发送
      const res = await sendDataToDevice(mac, json, false)
        .then(res => {
          return res;
        })
        .catch(err => err);
      const result = JSON.parse(res);
      if (index === 0) {
        timeList1 = result;
      } else {
        timeList2 = result;
      }
    }
  },


  /**
   * @description 查询定时指令, 由于字节过长， 需要分开查 。在这里合并
   */
  async [QUERY_TIME]({ state, commit }, index) {
    const mac = state.mac;
    const queryTime = {
      t: 'queryT',
      index,
      count: 2
    };
    const json = JSON.stringify(queryTime);
    // 调用原生方法发送查询指令
    if (!state.isScene) {
      // 非场景模式发送指令，否则不发送
      const res = await sendDataToDevice(mac, json, false)
        .then(res => {
          return res;
        })
        .catch(err => err);
      const timeList3 = JSON.parse(res);
      if (timeList2.list.length > 0) {
        timeList1.total = timeList1.list.length + timeList2.list.length;
        timeList1.list = timeList1.list.concat(timeList2.list);
      }
      if (timeList3.list.length > 0) {
        timeList1.total = timeList1.list.length + timeList3.list.length;
        timeList1.list = timeList1.list.concat(timeList3.list);
      }
      if (!setTimeUiLock) {
        commit(GET_TIMELIST, timeList1);
      } else {
        timeList1 = {};
        timeList2 = {};
      }
    }
  },

  /**
   * @description 删除定时
   */
  async [DELETE_TIMER]({ state }, id) {
    const mac = state.mac;
    const str = { t: 'deleteT', id};
    console.log('str', str);
    showLoading();
    // 调用原生方法发送查询指令
    if (!state.isScene) {
      // 非场景模式发送指令，否则不发送
      await sendDataToDevice(mac, JSON.stringify(str), false)
        .then(res => {
          console.log('删除成功');
          hideLoading();
          setTimeUiLock = true;
          setTimeout(() => {
            setTimeUiLock = false;
          }, 3000);
          return res;
        })
        .catch(err => err);
    }
  },

  /**
   * @description 查询模块数据
   */
  async [QUERY_MODULES]({ state, commit }, index) {
    const mac = state.mac;
    const str = { cols: [`as${index}`], mac, t: 'status'};
    const { cols } = str;
    // 调用原生方法发送查询指令
    if (!state.isScene) {
      // 非场景模式发送指令，否则不发送
      const res = await sendDataToDevice(mac, JSON.stringify(str), false)
        .then(res => {
          return res;
        })
        .catch(err => err);
      const DataObject = {};
      const result = JSON.parse(res);
      for (let i = 0, j = cols.length; i < j; i += 1) {
        DataObject[cols[i]] = result[i]; 
      }
      if (!state.isScene) {
        // 非场景时提交数据 iOS 给的数据有问题，做兼容
        if (DataObject[`as${[index]}`] === undefined) { 
          if (index === 1) {
            DataObject[`as${[index]}`] = [null, null];
          } else {
            DataObject[`as${[index]}`] = [null, null, null];
          }
        }
        commit(SET_DATA_OBJECT, DataObject);
      }
    }
  },
};
