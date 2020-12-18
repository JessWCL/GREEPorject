import {
  SEND_CTRL,
  SET_DEVICE_INFO,
  SET_DATA_OBJECT,
  GET_DEVICE_INFO,
  GET_ALL_STATES,
  SET_DEVICE_TIME,
  SET_LOADING,
} from './types';
import {
  sendDataToDevice,
  getInfo,
  updateStates,
  // finishLoad,
  showToast,
} from '../../../static/lib/PluginInterface.promise';

let _timer = 0; // 轮询定时器

/**
 * @description 获取设备在线状态
 */
function getDeviceInfo({ state, commit }) {
  return getInfo(`${state.gmac}@${state.mac}`)
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
  let macCommon;
  if (state.mac === '') {
    macCommon = state.gmac;
  } else {
    macCommon = state.mac;
  }
  return sendDataToDevice(macCommon, state.deviceInfo.fullstatueJson, false)
    .then(_res => {
      const DataObject = {};
      const res = JSON.parse(_res);
      for (let i = 0, j = cols.length; i < j; i += 1) {
        DataObject[cols[i]] = res[i]; // 遍历查询到的数据，将值写入state中的DataObject，根据业务更改
      }
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
 * @description 同步wifi模块时间
 */
function sendTime({ state }, date) {
  const mac = state.mac;
  const gmac = state.gmac;
  const seperator1 = '-';
  const seperator2 = ':';
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  let hour = date.getHours();
  hour = hour > 0 && hour <= 9 ? `0${hour}` : hour;
  let minutes = date.getMinutes();
  minutes = minutes > 0 && minutes <= 9 ? `0${minutes}` : minutes;
  let seconds = date.getSeconds();
  seconds = seconds > 0 && seconds <= 9 ? `0${seconds}` : seconds;
  if (month >= 1 && month <= 9) {
    month = `0${month}`;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = `0${strDate}`;
  }
  const currentDate = `"${date.getFullYear()}${seperator1}${month}${seperator1}${strDate} ${hour}${seperator2}${minutes}${seperator2}${seconds}"`;
  console.log(currentDate);
  const jsonTime = `{"opt":["time"],"p":[${currentDate}],"t":"cmd"}`;
  console.log(jsonTime);
  let macCommon;
  if (mac === '') {
    macCommon = gmac;
  } else {
    macCommon = mac;
  }
  return sendDataToDevice(macCommon, jsonTime, false)
    .then(_res => {
      return _res;
    })
    .catch(err => {
      err;
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
    const _res = await getInfo(`${state.gmac}@${state.mac}`)
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
      // this.$i18n.locale = deviceInfo.lang;
      commit(SET_DEVICE_INFO, deviceInfo);
      await dispatch(GET_ALL_STATES);
    }
  },
  /**
   * @description 获取设备全部状态,插件初始化时立刻查询一次，成功加载数据后finishLoad，然后5秒一次轮询
   */
  async [GET_ALL_STATES]({ state, commit }) {
    if (!state.isScene) {
      await getStatusOfDev({ state, commit }).then(res => {
        console.log(`${res}第一次的返回值`);
      });
      // finishLoad();
      commit(SET_LOADING, true);
      console.log(`${_timer} haha`);
      if (_timer === 0) {
        _timer = setInterval(() => {
          getDeviceInfo({ state, commit });
          getStatusOfDev({ state, commit });
        }, 5000);
      }
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
    const sub = state.gmac;
    const t = 'cmd';
    const json = JSON.stringify({ sub, t, opt, p });
    console.log(json);
    // 调用原生方法发送控制命令
    let macCommon;
    if (mac === '') {
      macCommon = sub;
    } else {
      macCommon = mac;
    }
    if (!state.isScene) {
      // 非场景模式发送指令，否则不发送
      const res = await sendDataToDevice(macCommon, json, false)
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
        state.dataObject.StTem,
        state.dataObject.WdSpd,
        state.dataObject.EnSvSt,
        state.dataObject.StFahFlg,
        state.dataObject.ColdMod,
        state.dataObject.HeatSvStTemMax,
        state.dataObject.CoolSvStTemMin,
        state.dataObject.TemUnit,
        state.dataObject.IndoorType,
        state.dataObject.OMod,
        state.dataObject.LowDeHumi,
        state.dataObject.Quier,
      ];
      // 成功之后更新主体状态
      r === 200 &&
        (await updateStates(state.mac, JSON.stringify(_p))
          .then(res => res)
          .catch(err => err));
    }
  },
  // 获取手机时间与当前时间差>3分钟，大于执行方法同步
  async [SET_DEVICE_TIME]({ state }, DataObject) {
    const mmac = state.mac; // 主mac
    const mac = state.gmac; // 子mac
    const cols = [];
    cols.push(DataObject.time);
    const t = 'status';
    const json = JSON.stringify({ t, mac, cols });
    console.log(json);
    let macCommon;
    if (mmac === '') {
      macCommon = mac;
    } else {
      macCommon = mmac;
    }
    await sendDataToDevice(macCommon, json, false)
      .then(res => {
        let devdate;
        if (res.indexOf('"') > -1) {
          devdate = new Date(Date.parse(JSON.parse(res)[0].replace(/-/g, '/')));
        } else {
          devdate = new Date(JSON.parse(res));
        }
        const date = new Date();
        console.log(
          '时间差为：',
          devdate.getTime() - date.getTime(),
          '超出3分钟：',
          devdate.getTime() - date.getTime() - 3 * 60 * 1000,
        );
        if (Math.abs(devdate.getTime() - date.getTime()) > 3 * 60 * 1000) {
          const res = sendTime({ state }, date);
          console.log('要看的返回值', JSON.stringify(res));
          if (res !== '') {
            state.deviceInfo.lang === 'zh_CN' || state.deviceInfo.lang === ''
              ? showToast('时间已校准', 1)
              : showToast('Timer has been calibrated', 1);
          } else {
            state.deviceInfo.lang === 'zh_CN' || state.deviceInfo.lang === ''
              ? showToast('同步时间失败', 1)
              : showToast('Synchronization time failed', 1);
          }
        } else {
          console.log('没超三分钟弹出toast');
          state.deviceInfo.lang === 'zh_CN' || state.deviceInfo.lang === ''
            ? showToast('时间已校准', 1)
            : showToast('Timer has been calibrated', 1);
        }
      })
      .catch(err => err);
  },
};
