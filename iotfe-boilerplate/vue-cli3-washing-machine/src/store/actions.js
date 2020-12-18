import {
  GET_DEVICE_INFO,
  GET_ALL_STATES,
  SET_DEVICE_INFO,
  SET_DATA_OBJECT,
  SET_PARSE_OBJECT,
  SEND_CTRL,
  GET_POW_ON_STATES
} from './types';

import {
  sendDataToDevice,
  getInfo,
  updateStates,
  finishLoad,
  showToast,
  closePage
} from '../../../static/lib/PluginInterface.promise'; // 主体接口

let _timer = 0; // 轮询定时器
let uiLock = false;
let _timer2 = 0; // 节流 发送定时器
let isFirst = true;
let cacheObj = {}; // 收集300ms 内的指令
let firstObj = {}; // 查询的第一包数据
let isfirstReq = false; // 是否正在查询第一包

const mid = process.env.VUE_APP_MID; // 热泵需要单独查询收藏夹
let protocolList = [];
const a02 = ['nightWash', 'energySave', 'highWater', 'soak', 'autoScour', 'autoMeek'];
const a03 = ['nightWash', 'energySave', 'highWater', 'soak', 'autoScour', 'autoMeek'];
const a04 = ['nightWash', 'energySave', 'highWater', 'autoScour', 'autoMeek', 'smudge', 'autoOpenDoor'];
const a05 = ['nightWash', 'energySave', 'highWater', 'autoScour', 'autoMeek', 'smudge', 'autoOpenDoor'];

switch (mid) {
  case '28a02':
    protocolList = a02;
    break;
  case '28a03':
    protocolList = a03;
    break;
  case '28a04':
    protocolList = a04;
    break;
  case '28a05':
    protocolList = a05;
      break;
  default:
    break;
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
export function getStatusOfDev({ state, commit }) {
  const { cols } = JSON.parse(state.deviceInfo.fullstatueJson);
  isfirstReq = true;
  return sendDataToDevice(state.mac, state.deviceInfo.fullstatueJson, false)
    .then(_res => {
      // 解决进来时设备已离线问题
      if (_res === '' && isFirst) {
        showToast('网络异常', 1);
        closePage();
      }
      const DataObject = {};
      firstObj = {};
      try {
        const res = JSON.parse(_res);
        for (let i = 0, j = cols.length; i < j; i += 1) {
          if(res[i] == undefined || res[i] == NaN) continue
          DataObject[cols[i]] = res[i]; // 遍历查询到的数据，将值写入state中的DataObject，根据业务更改
        }
        isfirstReq = false;
        firstObj = DataObject;
      } catch (error) {
        console.error('第一个包查询的值异常_res', _res);
        firstObj = {};
      }
      // if (!state.isScene && !uiLock) {
      //   // 非场景时提交数据
      //   commit(SET_DATA_OBJECT, DataObject);
      // } 
      return DataObject;
    })
    .catch(err => {
      return err;
    });
}

export function getStatusOfDevTwo({ state, commit }) {
  const mac = state.mac;
  const str = { cols: protocolList, mac, t: 'status'};
  const { cols } = str;
  return sendDataToDevice(state.mac, JSON.stringify(str), false)
    .then(_res => {
      // 解决进来时设备已离线问题
      if (_res === '' && isFirst) {
        showToast('网络异常', 1);
        closePage();
      }
      const DataObject = {};
      try {
        const res = JSON.parse(_res);
        for (let i = 0, j = cols.length; i < j; i += 1) {
          DataObject[cols[i]] = res[i]; // 遍历查询到的数据，将值写入state中的DataObject，根据业务更改
        }
        isFirst && (isFirst = false);
        if (!state.isScene && !uiLock && !isfirstReq) {
          // 非场景时提交数据
          Object.assign(DataObject, firstObj);
          commit(SET_DATA_OBJECT, DataObject);
        } 
      } catch (error) {
        console.error('第二个包查询的值异常_res', _res);
      }
      firstObj = {};
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
    }
  },

  // 开机查一包
  async [GET_POW_ON_STATES]({ state, commit}) {
    console.log('开机查一包');
    await getStatusOfDev({ state, commit }).then(res => res);
    await getStatusOfDevTwo({ state, commit }).then(res => res);
  },

  /**
   * @description 获取设备全部状态,插件初始化时立刻查询一次，成功加载数据后finishLoad，然后5秒一次轮询
   */
  async [GET_ALL_STATES]({ state, commit}) {
    await getStatusOfDev({ state, commit }).then(res => res);
    await getStatusOfDevTwo({ state, commit }).then(res => res);
    setTimeout(() => { finishLoad()}, 200)
    if (_timer === 0) {
      _timer = setInterval(() => {
        getDeviceInfo({ state, commit });
        getStatusOfDev({ state, commit });
        getStatusOfDevTwo({ state, commit });
      }, 5000);
    }
  },

  /**
   * @description 发送控制指令
   */
  async [SEND_CTRL]({ state, commit }, DataObject) {
    uiLock = true;
    if (_timer2) {
      clearTimeout(_timer2);
      _timer2 = 0;
      cacheObj = {...cacheObj, ...DataObject }
    } else {
      cacheObj = DataObject;// 收集300ms内指令
    }
    _timer2 = setTimeout(async () => {
      const keys = Object.keys(cacheObj);
      const opt = [];
      const p = [];
      keys.forEach(key => {
      // 组装指令，根据业务更改
        opt.push(key);
        p.push(cacheObj[key]);
      });
      const mac = state.mac;
      const t = 'cmd';
      const json = JSON.stringify({ mac, t, opt, p });
      console.log((`发送的数据--------------------------: ${JSON.stringify(cacheObj)}`));
      !navigator.PluginInterface && (cacheObj = {});
      // 调用原生方法发送控制命令
      if (!state.isScene && navigator.PluginInterface) {
      // 非场景模式发送指令，否则不发送
        cacheObj = {};
        const res = await sendDataToDevice(mac, json, false)
          .then(res => {
          // 发送指令后暂停接收，过8秒后重启轮询
            clearInterval(_timer);
            _timer = 0;
            return res;
          })
          .catch(err => err);
        setTimeout(() => {
          // 无论成功与否，过8秒后重启轮询
          uiLock = false; 
          if (!_timer) {
            _timer = setInterval(() => {
              getDeviceInfo({ state, commit });
              getStatusOfDev({ state, commit });
              getStatusOfDevTwo({ state, commit });
            }, 5000);
          }
        }, 3000);
        const result = JSON.parse(res);
        const { r } = result;
        const _p = result.p;
        // 成功之后更新主体状态
        r === 200 &&
        (await updateStates(state.mac, JSON.stringify(_p))
          .then(res => res)
          .catch(err => err));
      }
    }, 300);
  },

};
