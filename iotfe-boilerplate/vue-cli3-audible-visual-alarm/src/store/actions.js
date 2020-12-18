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
  finishLoad,
  tuyaRequestDevData,
  tuyaControlDev,
} from '../../../static/lib/PluginInterface.promise'; // 主体接口

let _timer = 0; // 轮询定时器
const _timerDebounce = {}; // 防抖定时器对象

/**
 * @description 获取涂鸦设备信息
 */
function getTuyaData({ state, commit }) {
  return tuyaRequestDevData(state.mac)
    .then(res => {
      const _res = JSON.parse(res);
      console.log('actions.js === tuyaRequestDevData');
      console.log(_res);
      if (_res.code === 200) {
        const resultInfo = _res;
        const DataObject = resultInfo.message.result;
        commit(SET_DATA_OBJECT, DataObject);
      }
      return res;
    })
    .catch(err => {
      err;
    });
}

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
// function getStatusOfDev({ state, commit }) {
//   const { cols } = JSON.parse(state.deviceInfo.fullstatueJson);
//   return sendDataToDevice(state.mac, state.deviceInfo.fullstatueJson, false)
//     .then(_res => {
//       const DataObject = {};
//       const res = JSON.parse(_res);
//       for (let i = 0, j = cols.length; i < j; i += 1) {
//         DataObject[cols[i]] = res[i]; // 遍历查询到的数据，将值写入state中的DataObject，根据业务更改
//       }
//       if (!state.isScene) {
//         // 非场景时提交数据
//         commit(SET_DATA_OBJECT, DataObject);
//       }
//       return DataObject;
//     })
//     .catch(err => {
//       return err;
//     });
// }

/**
 * @returns Promise，等待计时结束进行下一项任务
 */
// eslint-disable-next-line
function sleep(time = 1000) {
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
    /* if (JSON.parse(_res).fullstatueJson === '') {
      await sleep(1000);
      dispatch(GET_DEVICE_INFO);
      console.log(111111);
    } else {
      const deviceInfo = JSON.parse(_res);
      commit(SET_DEVICE_INFO, deviceInfo);
      await dispatch(GET_ALL_STATES);
      console.log(2222222);
    } */
    const deviceInfo = JSON.parse(_res);
    commit(SET_DEVICE_INFO, deviceInfo);
    await dispatch(GET_ALL_STATES);
    console.log('GET_DEVICE_INFO in actions.js');
  },
  /**
   * @description 获取设备全部状态,插件初始化时立刻查询一次，成功加载数据后finishLoad，然后5秒一次轮询
   */
  async [GET_ALL_STATES]({ state, commit }) {
    getDeviceInfo({ state, commit });
    getTuyaData({ state, commit });
    finishLoad();
    if (_timer === 0) {
      _timer = setInterval(() => {
        getDeviceInfo({ state, commit });
        getTuyaData({ state, commit });
      }, 5000);
    }
  },

  /**
   * @description 发送控制指令
   */
  async [SEND_CTRL]({ state, commit }, DataObject) {
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
    // 调用原生方法发送控制命令
    if (!state.isScene) {
      // 非场景模式发送指令，否则不发送
      const res = await sendDataToDevice(mac, json, false)
        .then(res => {
          // 发送指令后暂停接收，过8秒后重启轮询
          clearInterval(_timer);
          _timer = 0;
          setTimeout(() => {
            if (!_timer) {
              _timer = setInterval(() => {
                getDeviceInfo({ state, commit });
                // getStatusOfDev({ state, commit });
              }, 5000);
            }
          }, 3000);
          return res;
        })
        .catch(err => err);
      const result = JSON.parse(res);
      const { r } = result;
      const _p = result.p;
      // 成功之后更新主体状态
      r === 200 &&
        (await updateStates(state.mac, JSON.stringify(_p))
          .then(res => res)
          .catch(err => err));
    }
  },

  /**
   * @description 涂鸦声光报警器发送控制指令
   * 涂鸦的指令是每个字段单独发的，所以和格力+的不一样
   * 防抖时不需要拼装指令了，只需要发送最新的
   */
  async tuyaCtrl({commit, state}, DataObject) {
    const devId = state.dataObject.deviceId;
    const key = DataObject.key;
    const value = DataObject.value;

    // 非场景模式发送指令，否则不发送
    if (!state.isScene) {
      // 是否已经在防抖中
      if (_timerDebounce.key) { // 清除旧的防抖计时器
        _timerDebounce.key && clearTimeout(_timerDebounce.key);
        _timerDebounce.key = null;
      }

      _timerDebounce.key = setTimeout(async () => {
        _timerDebounce.key = null;
        
        // 发送指令前暂停接收，过8秒后重启轮询
        clearInterval(_timer);
        _timer = 0;
        setTimeout(() => {
          // 取消dataObjLock的锁定
          state.dataObjLock = 0;
          if (!_timer) {
            _timer = setInterval(() => {
              getDeviceInfo({ state, commit });
              getTuyaData({ state, commit });
            }, 5000);
          }
        }, 3000);

        
        // 调用主体接口发送控制命令
        console.log(`
          devId: ${devId},
          key: ${key},
          value: ${value},
        `);

        const res = await tuyaControlDev(devId, key, value)
          .then(res => {
            console.log('actions.js > tuyaCtrl');
            console.log(res);
            return res;
          })
          .catch(err => err);
          
        // 取消dataObjLock的锁定
        state.dataObjLock = 0;

        const result = JSON.parse(res);
        const { r } = result;
        const _p = result.p;
        // 成功之后更新主体状态
        r === 200 &&
          (await updateStates(state.mac, JSON.stringify(_p))
            .then(res => res)
            .catch(err => err));
        
        // return res;
      }, 500);
    }
  },
};
