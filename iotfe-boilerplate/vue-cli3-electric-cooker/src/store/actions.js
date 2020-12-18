/* 一般不需要更改 */
import {
  GET_DEVICE_INFO,
  GET_ALL_STATES,
  SET_DEVICE_INFO,
  SET_DATA_OBJECT,
  SEND_CTRL
} from './types';

import {
  sendDataToDevice,
  getInfo,
  updateStates,
  finishLoad
} from '../../../static/lib/PluginInterface.promise.js'; // 主体接口

let _timer = 0; // 轮询定时器

/**
 * @param {object} { state, commit}
 * @returns getInfo
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
 * @param {object} { state, commit }
 * @returns sendDataToDevice(state.mac, state.deviceInfo.fullstatueJson, false)
 * @description 返回一个向整机查询数据的promise，这个promise执行成功后返回查到的数据DataObject
 *
 */
let firFlag = true; // 首次进入插件更新所有数据
function getStatusOfDev({ state, commit }) {
  const { cols } = JSON.parse(state.deviceInfo.fullstatueJson);
  return sendDataToDevice(state.mac, state.deviceInfo.fullstatueJson, false)
    .then(_res => {
      const DataObject = {};
      const res = JSON.parse(_res);
      let flag = false; // 没有开始烹饪时只更新个别数据
      let index = 0;
      let tmrEnIndex = 0;
      let schEnIndex = 0;
      let errIndex = 12;
      let errIndex2 = 13;
      let errIndex3 = 15;
      let errIndex4 = 16;
      for (let i = 0, j = cols.length; i < j; i += 1) {
        if (cols[i] === 'Pow') {
          if (res[i] === 1) {
            flag = true;
          } else {
            flag = false;
          }
          index = i;
        }
        if (cols[i] === 'estate') {
          errIndex = i;
        }
        if (cols[i] === 'estate2') {
          errIndex2 = i;
        }
        if (cols[i] === 'estate3') {
          errIndex3 = i;
        }
        if (cols[i] === 'estate4') {
          errIndex4 = i;
        }
        if (cols[i] === 'TmrEn') {
          tmrEnIndex = i;
        }
        if (cols[i] === 'SchEn') {
          schEnIndex = i;
        }
      }
      if (flag || firFlag) {
        for (let i = 0, j = cols.length; i < j; i += 1) {
          DataObject[cols[i]] = res[i];
        }
        firFlag = false;
      } else {
        DataObject.Pow = res[index];
        DataObject.TmrEn = res[tmrEnIndex];
        DataObject.SchEn = res[schEnIndex];
        DataObject.estate = res[errIndex];
        DataObject.estate2 = res[errIndex2];
        DataObject.estate3 = res[errIndex3];
        DataObject.estate4 = res[errIndex4];
      }
      const dataKeys = Object.keys(DataObject);
      const dataValues = Object.values(DataObject);
      dataKeys.forEach((item, index) => {
        dataKeys.splice(2 * index + 1, 0, dataValues[index]);
      });
      if (!state.functype) {
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
 * @description 暂停进程
 * @param {any} time 需要暂停的时间
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
   * @param dispatch vuex异步分发
   * @param commit vuex同步分发
   * @param state vuex store 状态
   */
  async [GET_DEVICE_INFO]({ dispatch, commit, state }) {
    const _res = await getInfo(state.mac)
      .then(res => {
        console.log(`res============>${res}`);
        return res;
      })
      .catch(err => {
        err;
      });
    // 防止Android端第一次下载插件fullstatueJson为空值
    if (JSON.parse(_res).fullstatueJson === '') {
      console.log('get fullstatueJson...');
      await sleep(1000);
      dispatch(GET_DEVICE_INFO);
    } else {
      const deviceInfo = JSON.parse(_res);
      commit(SET_DEVICE_INFO, deviceInfo);
      await dispatch(GET_ALL_STATES);
    }
  },
  /**
   * @description 获取设备全部状态,插件初始化时立刻查询一次，成功加载数据后finishLoad，然后5秒一次轮询
   * @function GET_ALL_STATES
   * @param state vuex store 状态
   * @param commit vuex同步分发
   */
  async [GET_ALL_STATES]({ state, commit }) {
    await getStatusOfDev({ state, commit }).then(res => res);
    finishLoad();
    if (_timer === 0) {
      _timer = setInterval(() => {
        getDeviceInfo({ state, commit });
        getStatusOfDev({ state, commit });
      }, 5000);
    }
  },

  /**
   * @description 发送控制指令
   * @function SEND_CTRL
   * @param commit vuex同步分发
   * @param state vuex store 状态
   * @param DataObject state中存储config.xml字段数据的对象
   */
  async [SEND_CTRL]({ state, commit }, DataObject) {
    const keys = Object.keys(DataObject);
    const opt = [];
    const p = [];
    keys.forEach(key => {
      // 组装指令，根据业务更改
      if (key.indexOf('estate') === -1) {
        opt.push(key);
        p.push(DataObject[key]);
      }
    });
    const mac = state.mac;
    const t = 'cmd';
    const json = JSON.stringify({ mac, t, opt, p });
    // 调用原生方法发送控制命令
    if (!state.functype && !state.isDebug) {
      // 非场景模式发送指令，否则不发送
      // 发送指令后暂停接收，过8秒后重启轮询
      clearInterval(_timer);
      _timer = 0;
      setTimeout(() => {
        if (!_timer) {
          _timer = setInterval(() => {
            getDeviceInfo({ state, commit });
            getStatusOfDev({ state, commit });
          }, 5000);
        }
      }, 3000);
      const res = await sendDataToDevice(mac, json, false)
        .then(res => {
          return res;
        })
        .catch(err => err);
      const result = JSON.parse(res);
      const { r } = result;
      const _p = [];
      Object.keys(state.synchronize).forEach(key => {
        _p.push(state.synchronize[key]);
      });
      // 成功之后更新主体状态
      r === 200 &&
        (await updateStates(state.mac, JSON.stringify(_p))
          .then(res => res)
          .catch(err => err));
    }
  }
};
