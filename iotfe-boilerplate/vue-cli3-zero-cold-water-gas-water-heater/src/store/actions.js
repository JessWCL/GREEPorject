import {
  GET_DEVICE_INFO,
  GET_ALL_STATES,
  SET_DEVICE_INFO,
  SET_DATA_OBJECT,
  SET_DEVICE_DATA,
  SEND_CTRL
} from './types';
import {
  sendDataToDevice,
  getInfo,
  updateStates,
  finishLoad
} from '../../../static/lib/PluginInterface.promise'; // 主体接口

let _timer = 0; // 轮询定时器
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
      // state.Has05 ? (DataObject.Add05 = res[cols.indexOf('Add0.5')]) : ''; // 支持0.5度机型需要修改此处，不支持的需屏蔽
      console.log(_res);
      if (!state.functype) {
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
   * @description 获取设备全部状态,插件初始化时立刻查询一次，成功加载数据后finishLoad，然后5秒一次轮询
   * @function GET_ALL_STATES
   * @param state vuex store 状态
   * @param commit vuex同步分发
   */
  async [GET_ALL_STATES]({ state, commit }) {
    await getStatusOfDev({ state, commit }).then(res => res);
    setTimeout(() => {
      finishLoad();
    }, 500);
    if (_timer === 0) {
      _timer = setInterval(() => {
        getDeviceInfo({ state, commit });
        getStatusOfDev({ state, commit });
        console.log(state.deviceInfo);
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
      keys.forEach(key => {
        // 组装指令，根据业务更改
        // if (DataObject[key] !== state.deviceData[key]) {
        commit(SET_DEVICE_DATA, JSON.parse(`{"${key}":${DataObject[key]}}`));
        opt.push(key);
        // if (key === 'Add05') {
        //   opt[opt.length - 1] = 'Add0.5';
        // }
        p.push(DataObject[key]);
        // }
      });
      // console.log(opt);
      // console.log(p);
      const mac = state.mac;
      const t = 'cmd';
      const json = JSON.stringify({ mac, t, opt, p });
      console.log(`json--${json}`);
      // 调用原生方法发送控制命令
      if (!state.functype && p.length !== 0) {
        // 非场景模式发送指令，否则不发送
        const Arr = [];
        Arr.push(opt, p);
        console.table(Arr);
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
            state.dataObject.Mode,
            state.dataObject.PreBoost,
            state.dataObject.InWaterTemp,
            state.dataObject.SetTemp,
            state.dataObject.Cruise,
            state.dataObject.ErrorCode1,
            state.dataObject.ErrorCode2,
            state.dataObject.ErrorCode3,
            state.dataObject.JFerr,
            state.dataObject.rssi,
            state.dataObject.BurnState,
            state.dataObject.CruiseState,
            // state.dataObject.TmrStartHour,
            // state.dataObject.TmrStartMin,
            // state.dataObject.TmrEndHour,
            // state.dataObject.TmrEndMin,
            state.deviceInfo.name
          ];
          // 成功之后更新主体状态
          r === 200 &&
            (await updateStates(state.mac, JSON.stringify(_p))
              .then(res => res)
              .catch(err => err));
        } catch (err) {
          err;
        }
      }
    }
  }
};
