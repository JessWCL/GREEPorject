import {
  GET_DEVICE_INFO,
  GET_ALL_STATES,
  SET_DEVICE_INFO,
  SET_DATA_OBJECT,
  SET_DEVICE_DATA,
  SEND_CTRL,
  SET_LOCK,
  SET_LOADING,
} from './types';
import {
  sendDataToDevice,
  getInfo,
  updateStates,
  finishLoad
} from '../../../static/lib/PluginInterface.promise'; // 主体接口

let _timer = 0; // 轮询定时器
let _timer2 = null; // 轮询定时器2
let setData = {};

/**
 * @description 获取设备在线状态
 */
function getDeviceInfo({
  state,
  commit
}) {
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
function getStatusOfDev({
  state,
  commit
}) {
  const {
    cols
  } = JSON.parse(state.deviceInfo.fullstatueJson);
  return sendDataToDevice(state.mac, state.deviceInfo.fullstatueJson, false)
    .then(_res => {
      const DataObject = {};
      const res = JSON.parse(_res);
      for (let i = 0, j = cols.length; i < j; i += 1) {
        // // 查询状态时再转换回来 - 0：低风；1：高风
        // if (cols[i] === 'WdSpd') {
        //   if (res[i] === 1) {
        //     res[i] = 0;
        //   } else if (res[i] === 3) {
        //     res[i] = 1;
        //   }
        // }
        DataObject[cols[i]] = res[i]; // 遍历查询到的数据，将值写入state中的DataObject，根据业务更改
      }
      console.log('getStatusOfDev', res);
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
  async [GET_DEVICE_INFO]({
    dispatch,
    commit,
    state
  }) {
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
  async [GET_ALL_STATES]({
    state,
    commit
  }) {
    await getStatusOfDev({
      state,
      commit
    }).then(res => res);
    setTimeout(() => {
      finishLoad();
    }, 50);
    if (_timer === 0) {
      _timer = setInterval(() => {
        getDeviceInfo({
          state,
          commit
        });
        getStatusOfDev({
          state,
          commit
        });
      }, 5000);
    }
  },
  /**
   * @description 发送控制指令
   */
  async [SEND_CTRL]({
    state,
    commit
  }, DataObject) {
    // console.table(DataObject);
    if (Object.keys(DataObject).length !== 0) {
      const keys = Object.keys(DataObject);
      const opt = [];
      const p = [];
      const Arr = {};
      const TimerKeys = ['TmrOn', 'TmrAction', 'TmrHour', 'TmrMin'];
      keys.forEach(key => {
        // 组装指令，根据业务更改
        if (DataObject[key] !== state.deviceData[key] || TimerKeys.indexOf(key) !== -1) {
          commit(SET_DEVICE_DATA, JSON.parse(`{"${key}":${DataObject[key]}}`));
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
        setData = {
          ...setData,
          ...Arr
        };
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
          const json = JSON.stringify({
            mac,
            t,
            opt,
            p
          });
          console.table([opt, p]);
          commit(SET_LOADING, true);
          console.log(json);
          const res = await sendDataToDevice(mac, json, false)
            .then(res => {
              // 发送指令后暂停接收，过8秒后重启轮询
              clearInterval(_timer);
              _timer = 0;
              setTimeout(() => {
                if (!_timer) {
                  _timer = setInterval(() => {
                    getDeviceInfo({
                      state,
                      commit
                    });
                    getStatusOfDev({
                      state,
                      commit
                    });
                  }, 5000);
                }
              }, 3000);
              return res;
            })
            .catch(err => err);
          try {
            const result = JSON.parse(res);
            const {
              r,
              p: _p
            } = result;
            // 成功之后更新主体状态
            r === 200 && commit(SET_LOCK, false) &&
              (await updateStates(state.mac, JSON.stringify(_p))
                .then(res => res)
                .catch(err => err));
            // MID:828213，下发模式后需要8秒才开始轮询，因此风档无法及时同步，固此处发送查询指令，同步设备状态,更新风挡值
            if (window.VUE_APP_MID === '828213') {
              const ModIndex = opt.indexOf('Mod');
              if (ModIndex !== -1) {
                setTimeout(() => {
                  getStatusOfDev({
                    state,
                    commit
                  });
                }, 200);
              }
            }
          } catch (err) {
            commit(SET_LOCK, false);
            err;
          }
          commit(SET_LOADING, false);
        }, 500);
      }
    }
  }
};
