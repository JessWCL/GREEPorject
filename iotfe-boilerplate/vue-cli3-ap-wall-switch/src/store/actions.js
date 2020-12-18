import {
  GET_DEVICE_INFO,
  GET_ALL_STATES,
  SET_DEVICE_INFO,
  SET_DATA_OBJECT,
  SEND_CTRL,
  GET_CLOUD_TIMER_LIST,
  GET_DAY_ELE_USED,
  GET_MONTH_ELE_USED
} from './types';

import {
  sendDataToDevice,
  getInfo,
  updateStates,
  finishLoad,
  getCloudTimerByMac,
  getGridConListOneDay,
  getDayUseAndGenerElec
} from '../../../static/lib/PluginInterface.promise'; // 主体接口

import dayjs from 'dayjs';

let _timer = 0; // 轮询定时器
let ignoreSetData = false; // 忽略标志位

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
      const DataObject = {};
      const res = JSON.parse(_res);
      for (let i = 0, j = cols.length; i < j; i += 1) {
        DataObject[cols[i]] = res[i]; // 遍历查询到的数据，将值写入state中的DataObject，根据业务更改
      }
      console.log('%c ===== 轮询 =====', 'color: red;');
      console.log(DataObject);
      if (!state.isScene) {
        // 非场景时提交数据
        if (ignoreSetData) {
          return false;
        }
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

/**
 * @function getCloudTimerList
 * @param {object} { state, commit} 
 * @returns getCloudTimerList
 * @description 获取云定时列表
 */
function getCloudTimerList({state, commit}) {
  console.log('-------查询定时-------');
  return getCloudTimerByMac(state.mac).then(res => {
    const result = JSON.parse(res);
    console.log('result', result);
    const { timerTasks } = result;
    if (timerTasks.length > 0) { 
      for (const item of timerTasks) {
        if (!item.timer.status) {
          commit(SET_DATA_OBJECT, { AppTimer: 0 });
          console.log('无定时');
        } else if (item.timer.status) {
          commit(SET_DATA_OBJECT, { AppTimer: 1 });
          console.log('有定时');
          return;
        }
      }
    } else {
      commit(SET_DATA_OBJECT, { AppTimer: 0 });
      console.log('%c timerTasks为空，无定时数据');
    }
  })
    .catch(res => console.log('查询定时Error', res));
}

export default {
  /**
   * 获取云定时
   */
  [GET_CLOUD_TIMER_LIST]({ state, commit }) {
    getCloudTimerList({ state, commit });
  },
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
  /**
   * @description 获取设备全部状态,插件初始化时立刻查询一次，成功加载数据后finishLoad，然后8秒一次轮询
   */
  async [GET_ALL_STATES]({ state, commit, dispatch }) {
    await getStatusOfDev({ state, commit }).then(res => res);
    finishLoad();
    dispatch(GET_DAY_ELE_USED);
    dispatch(GET_MONTH_ELE_USED);
    if (_timer === 0) {
      _timer = setInterval(() => {
        getDeviceInfo({ state, commit });
        getStatusOfDev({ state, commit });
      }, 8000);
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
    console.log('发送命令： ', json);
    ignoreSetData = true;
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
                ignoreSetData = false;
                getDeviceInfo({ state, commit });
                getStatusOfDev({ state, commit });
              }, 8000);
            }
          }, 3000);
          return res;
        })
        .catch(err => {
          console.log(err);
          ignoreSetData = false;
        });
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

  [GET_DAY_ELE_USED]({state, commit}) {
    const sendDate = dayjs(new Date()).format('YYYY-MM-DD');
    console.log('查询今日用电量', sendDate);
    getDayUseAndGenerElec(state.mac, sendDate)
      .then(res => {
        console.log('JSON.parse(res)', JSON.parse(res));
        const {dayUseElec: dayEleUsed, r} = JSON.parse(res);
        if (r === 200) {
          commit(SET_DATA_OBJECT, { dayEleUsed: dayEleUsed.toFixed(2) });
          console.log('%c 今日用电：', 'color: red;', dayEleUsed);
        } else {
          console.log('请求错误', r);
        }
      })
      .catch(res => {
        console.log('查询失败', res);
      });
  },
  
  [GET_MONTH_ELE_USED]({state, commit}) {
    const date = dayjs(new Date()).format('M');
    console.log('查询本月用电量', date);
    getGridConListOneDay(state.mac, 'year', '').then(res => {
      console.log('JSON.parse(res)', JSON.parse(res));
      const { data, r } = JSON.parse(res);
      const { time, val } = data;
      if (r === 200) {
        const monthEleUsed = val[time.findIndex(item => item == date)].toFixed(2) || 0.00;
        commit(SET_DATA_OBJECT, { monthEleUsed });
        console.log('%c 今月用电：', 'color: red;', monthEleUsed);
      } else {
        console.log('请求错误', r);
      }
    });
  }
};
