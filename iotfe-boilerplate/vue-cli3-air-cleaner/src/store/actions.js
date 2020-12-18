import {
  GET_DEVICE_INFO,
  GET_ALL_STATES,
  SET_DEVICE_INFO,
  SET_DATA_OBJECT,
  SEND_CTRL,
  SET_PM2P5,
  SET_DISINFECT,
  SET_DEVICE_DATA
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
window.uiLock = false; // 全局ui锁
let isFirst = true;
let _timer2 = null; // 轮询定时器2
let setData = {};

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
      console.log('接收到的数据：', DataObject);
      if (!state.isScene && !window.uiLock) {
        // 非场景时提交数据
        commit(SET_DEVICE_DATA, DataObject);
        commit(SET_DATA_OBJECT, DataObject);
      }
      if (state.isScene && !window.uiLock) {
        commit(SET_PM2P5, DataObject['wipm25']);
        commit(SET_DISINFECT, DataObject['sterilize']);
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
      isFirst = false;
    }
  },
  /**
   * @description 获取设备全部状态,插件初始化时立刻查询一次，成功加载数据后finishLoad，然后5秒一次轮询
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
   */
  async [SEND_CTRL]({ state, commit }, DataObject) {
    // console.table(DataObject);
    if (Object.keys(DataObject).length !== 0) {
      const keys = Object.keys(DataObject);
      const opt = [];
      const p = [];
      const Arr = {};
      keys.forEach(key => {
        // 组装指令，根据业务更改
        if (DataObject[key] !== state.deviceData[key]) {
          commit(SET_DEVICE_DATA, JSON.parse(`{"${key}":${DataObject[key]}}`));
          opt.push(key);
          p.push(DataObject[key]);
          Arr[key] = DataObject[key];
        }
      });
      const mac = state.mac;
      const t = 'cmd';

      // 调用原生方法发送控制命令
      if (!state.isScene && p.length !== 0) {
        _timer2 && clearTimeout(_timer2);
        setData = { ...setData, ...Arr };
        window.uiLock = true;
        console.log('uilock', window.uiLock);
        // 非场景模式发送指令，否则不发送
        _timer2 = setTimeout(async () => {
          const setOpt = Object.keys(setData);
          const setP = [];
          setOpt.forEach(key => {
            setP.push(setData[key]);
          });

          setData = {};
          const opt = setOpt;
          const p = setP;
          const json = JSON.stringify({ mac, t, opt, p });
          console.table([opt, p]);
          const res = await sendDataToDevice(mac, json, false)
            .then(res => {
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
              return res;
            })
            .catch(err => err);
          try {
            const result = JSON.parse(res);
            const { r } = result;
            const _p = [
              state.dataObject.Pow,
              state.dataObject.mode,
              state.dataObject.wipm25,
              state.deviceInfo.light,
              state.deviceInfo.FiltUPercent,
              state.dataObject.FiltUPercent1,
              state.dataObject.FiltUPercent2,
              state.dataObject.JFerr,
              state.dataObject.estate,
              state.dataObject.estate2,
              state.dataObject.sterilize
            ];
            // 成功之后更新主体状态
            window.uiLock = false;
            r === 200 &&
              (await updateStates(state.mac, JSON.stringify(_p))
                .then(res => res)
                .catch(err => err));
          } catch (err) {
            window.uiLock = false;
            err;
          }
        }, 500);
      }
    }
  },
};
