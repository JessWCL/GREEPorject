import {
  GET_DEVICE_INFO,
  GET_ALL_STATES,
  SET_DEVICE_INFO,
  SET_DATA_OBJECT,
  SET_DEVICE_DATA,
  SEND_CTRL,
  SET_LOCK,
  SET_SUBSCRIBE_TIMER,
  SET_LOADING,
  SET_TIMER_VALUE,
  SET_ENVIRONMENTAL_HUMIDITY,
  SET_FUNCTYPE_DATA,
} from './types';
import {
  sendDataToDevice,
  getInfo,
  getAllTimerList,
  updateStates,
  finishLoad,
} from '../../../static/lib/PluginInterface.promise'; // 主体接口

let _timer = 0; // 轮询定时器
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
      const DataObject = {};
      const res = JSON.parse(_res);
      for (let i = 0, j = cols.length; i < j; i += 1) {
        if (window.VUE_APP_MID !== '13805') {
          // 查询状态时再转换回来 - 0：低风；1：高风
          if (cols[i] === 'WdSpd') {
            if (res[i] === 1) {
              res[i] = 0;
            } else if (res[i] === 3) {
              res[i] = 1;
            }
          }
        }
        
        DataObject[cols[i]] = res[i]; // 遍历查询到的数据，将值写入state中的DataObject，根据业务更改
      }
      console.log('getStatusOfDev', JSON.stringify(DataObject));
      // 场景下同步环境湿度的值
      if (state.functype) {
        if (window.VUE_APP_MID === '13804') {
          commit(SET_FUNCTYPE_DATA, {AllErr: DataObject.AllErr, Dfltr: DataObject.Dfltr, DwatFul: DataObject.DwatFul});
        }
        commit(SET_ENVIRONMENTAL_HUMIDITY, DataObject.DwatSen);
      }
      
      if (!state.functype && !state.uilock) {
        // 非场景时提交数据
        commit(SET_DEVICE_DATA, DataObject);
        commit(SET_DATA_OBJECT, DataObject);
      }  

      return DataObject;
    })
    .catch(err => {
      return err;
    });
}

function getSubscribeTimer({ state, commit }) {
  getAllTimerList(null, state.mac)
    .then(_res => {
      console.log('定时查询+++++++++++++++++++++++++++++++++++++==：' + _res);
      const res = JSON.parse(_res);
      if (res && res[0]) {
        console.log('timerenabled:', res[0].enable);
        console.log('actions.js ==> getSubscribeTimer:', res[0].hr);
        commit(SET_SUBSCRIBE_TIMER, res[0].hr);
        commit(SET_TIMER_VALUE, { hr: res[0].hr, min: res[0].min });
      }
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
        getSubscribeTimer({ state, commit });
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
      console.log(deviceInfo.fullstatueJson);
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
    setTimeout(() => {
      finishLoad();
    }, 50);
    if (_timer === 0) {
      _timer = setInterval(() => {
        getDeviceInfo({ state, commit });
        getStatusOfDev({ state, commit });
        if (window.VUE_APP_MID === '13803') {
          getSubscribeTimer({ state, commit });
        }
        // console.log('GET_ALL_STATES', state.deviceInfo);
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
          if (window.VUE_APP_MID !== '13805') {
            // 13803和13804只有高低风两档，滑轮的值为0（低风）、1（高风），但json的字段的为1（低风），3（高风），故此处做以下处理
            if (key === 'WdSpd') {
              /* eslint no-param-reassign: 0 */
              // 发送指令时转换一下 - 1：低风；3：高风
              if (DataObject[key] === 0) {
                DataObject[key] = 1;
              } else if (DataObject[key] === 1) {
                DataObject[key] = 3;
              }
            }
          }
          
          opt.push(key);
          p.push(DataObject[key]);
          Arr[key] = DataObject[key];
        }
      });
      const mac = state.mac;
      const t = 'cmd';

      // 调用原生方法发送控制命令
      if (!state.functype && p.length !== 0) {
        _timer2 && clearTimeout(_timer2);
        setData = { ...setData, ...Arr };
        commit(SET_LOCK, true);
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
          console.log(json);
          commit(SET_LOADING, true);
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
                    if (window.VUE_APP_MID === '13803') {
                      getSubscribeTimer({ state, commit });
                    }
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
              state.dataObject.Dmod,
              state.dataObject.Dwet,
              state.deviceInfo.host,
              state.deviceInfo.name,
              state.dataObject.AllErr,
              state.dataObject.TemSen,
            ];
            // 成功之后更新主体状态
            r === 200 &&
              commit(SET_LOCK, false) &&
              (await updateStates(state.mac, JSON.stringify(_p))
                .then(res => res)
                .catch(err => err));
          } catch (err) {
            commit(SET_LOCK, false);
            err;
          }
          commit(SET_LOADING, false);
        }, 500);
      }
    }
  },
};
