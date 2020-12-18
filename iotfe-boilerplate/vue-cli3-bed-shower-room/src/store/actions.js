import {
  SEND_CTRL,
  SET_DEVICE_INFO,
  SET_DATA_OBJECT,
  GET_DEVICE_INFO,
  GET_ALL_STATES,
} from './types';
import {
  sendDataToDevice,
  getInfo,
  updateStates,
  finishLoad,
} from '../../../static/lib/PluginInterface.promise';

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
  return sendDataToDevice(state.mainmac, state.deviceInfo.fullstatueJson, false)
    .then(_res => {
      const DataObject = {};
      const res = JSON.parse(_res);
      for (let i = 0, j = cols.length; i < j; i += 1) {
        DataObject[cols[i]] = res[i]; // 遍历查询到的数据，将值写入state中的DataObject，根据业务更改
      }
      console.log(DataObject);
      if (!state.isScene) {
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
// 主体接口
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
   */
  async [GET_ALL_STATES]({ state, commit }) {
    const Data1 = new Date();
    console.log(`开始取第一包数据时间为${Data1}`);
    await getStatusOfDev({ state, commit }).then(res => res);
    const Data2 = new Date();
    console.log(
      `第一次拿到数据后结束loading时间为${Data2}`,
      `所用时间为${Data2.getTime() - Data1.getTime()}`,
    );
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
    const keys = Object.keys(DataObject);
    const opt = [];
    const p = [];
    keys.forEach(key => {
      // 组装指令，根据业务更改
      opt.push(key);
      p.push(DataObject[key]);
    });
    const sub = state.g_mac;
    const mainmac = state.mainmac;
    const t = 'cmd';
    const json = JSON.stringify({ sub, t, opt, p });
    console.log(json);
    // 调用原生方法发送控制命令
    if (!state.isScene) {
      // 非场景模式发送指令，否则不发送
      const res = await sendDataToDevice(mainmac, json, false)
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
      const result = JSON.parse(res);
      const { r } = result;
      // const _p = result.p;
      const _p = [
        state.dataObject.Pow,
        state.dataObject.Mod,
        state.dataObject.SetTem,
        state.dataObject.WdSpd,
        state.dataObject.Quiet,
        state.dataObject.Blo,
        state.dataObject.SvSt,
        state.dataObject.Air,
        state.dataObject.CoolSvStTemMin,
        state.dataObject.HeatSvStTemMax,
        state.dataObject.SetCoolHumi,
        state.dataObject.SwhSlp,
        state.dataObject.AidHeat,
        state.dataObject.SetDeciTem,
        state.dataObject.GetEr,
        state.dataObject.MasSub,
      ];
      // 成功之后更新主体状态
      r === 200 &&
        (await updateStates(state.mac, JSON.stringify(_p))
          .then(res => res)
          .catch(err => err));
    }
  },
};
