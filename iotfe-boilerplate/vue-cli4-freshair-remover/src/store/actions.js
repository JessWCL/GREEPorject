import {
  GET_DEVICE_INFO,
  GET_ALL_STATES,
  SET_DEVICE_INFO,
  SET_DATA_OBJECT,
  SET_BOX_OBJECT,
  SEND_CTRL,
  GET_BOX_NAME,
  SET_BOX_NAME,
  BOX_STATUS,
  SET_HOME0_OBJECT,
  SET_HOME1_OBJECT,
} from './types';

import {
  sendDataToDevice,
  getInfo,
  updateStates,
  GetDevCustomData,
  SetDevCustomData,
  showToast,
} from '../../../static/lib/PluginInterface.promise'; // 主体接口

let _timer = 0; // 轮询定时器
let uiLock = false

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
      // console.log('获取设备状态数据:', deviceInfo);
      commit(SET_DEVICE_INFO, deviceInfo);
      return res;
    })
    .catch(err => {
      err;
    });
}

/**
 * @description 设置房间内盒子名称
 */
function SetDevCustomName({
  state,
  commit
}) {
  return SetDevCustomData(
      state.mainmac,
      state.g_mac,
      state.GasN,
      state.homeName[state.GasN].room,
    )
    .then(res => {
      const resMsg = JSON.parse(res);
      if (resMsg.r === 10700) {
        if (state.GasN === 0) {
          commit(SET_HOME0_OBJECT, state.homeName[0].room);
        } else if (state.GasN === 1) {
          commit(SET_HOME1_OBJECT, state.homeName[1].room);
        }
        GetDevCustomName({
          state,
          commit
        }); // 还原以前数据
        showToast('非主设备不能设置', 0);
      }
      return res;
    })
    .catch(err => {
      err;
    });
}
/**
 * @description 获取房间内盒子名称
 */
function GetDevCustomName({
  state,
  commit
}) {
  return GetDevCustomData(state.mainmac, state.g_mac, state.GasN)
    .then(res => {
      const resMsg = JSON.parse(res);
      if (state.GasN === 0) {
        if (resMsg.r === 502) {
          commit(SET_HOME0_OBJECT, '客厅');
        } else {
          resMsg.value.length > 10 ?
            commit(SET_HOME0_OBJECT, `${resMsg.value.slice(0, 10)}...`) :
            commit(SET_HOME0_OBJECT, resMsg.value);
        }
      } else if (state.GasN === 1) {
        if (resMsg.r === 502) {
          commit(SET_HOME1_OBJECT, '卧室');
        } else {
          resMsg.value.length > 10 ?
            commit(SET_HOME1_OBJECT, `${resMsg.value.slice(0, 10)}...`) :
            commit(SET_HOME1_OBJECT, resMsg.value);
        }
      }
      return res;
    })
    .catch(err => {
      err;
    });
}
/**
 * @description 返回一个向整机查询数据的promise，这个promise执行成功后返回查到的数据DataObject
 */
async function getStatusOfDev({
  state,
  commit
}) {
  const {
    cols
  } = JSON.parse(state.deviceInfo.fullstatueJson);
  const dataBox = state.DataBoxData[0];
  return sendDataToDevice(state.mainmac, state.deviceInfo.fullstatueJson, false)
    .then(_res => {
      // console.log('发送字段值：', state.deviceInfo.fullstatueJson);
      // console.log('获取的主控数据:', _res);
      const DataObject = {};
      const BoxList = [];
      let status = false; // 数据是否异常字段
      const res = JSON.parse(_res);
      // 提前检查数据是否有异常
      for (let n = 0; n < cols.length; n += 1) {
        if (res[n] === '') {
          status = true;
          break;
        }
      }
      for (let i = 0, j = cols.length; i < j; i += 1) {
        if (!status) {
          DataObject[cols[i]] = res[i]; // 遍历查询到的数据，将值写入state中的DataObject，根据业务更改
          if (cols[i] === 'GasQ' && res[i] !== 0) {
            // 查询盒子数据
            const getBoxData = async () => {
              const objArrs = Object.keys(dataBox);
              for (let z = 0; z < chargeOnesCountInNum2(res[i]); z += 1) {
                const sJson = `{"t":"status","mac":"${state.g_mac}","GasN":${z},"cols":${JSON.stringify(objArrs)}}`;
                // console.log('发包数据:------', sJson);
                await sendDataToDevice(state.mainmac, sJson, false).then(
                  _resbox => {
                    const resbox = JSON.parse(_resbox);
                    const BoxObject = {};
                    objArrs.forEach((element, index) => {
                      BoxObject[element] = resbox[index];
                    });
                    BoxList[z] = BoxObject;
                    console.log('获取的盒子数据:', JSON.stringify(BoxList));
                  },
                );

                // 查询盒子名称（只执行一次）
                if (state.BoxStatus) {
                  console.log('++++++++++++查询盒子名称（只执行一次）++++++++++++++++++++++');
                  GetDevCustomData(state.mainmac, state.g_mac, z)
                    .then(res => {
                      console.log(res);
                      const resMsg = JSON.parse(res);
                      if (z === 0) {
                        if (resMsg.r === 502) {
                          commit(SET_HOME0_OBJECT, '客厅');
                        } else {
                          commit(SET_HOME0_OBJECT, resMsg.value);
                        }
                      } else if (z === 1) {
                        if (resMsg.r === 502) {
                          commit(SET_HOME1_OBJECT, '卧室');
                        } else {
                          commit(SET_HOME1_OBJECT, resMsg.value);
                        }
                      }
                      return res;
                    })
                    .catch(err => {
                      err;
                    });
                }
              }
              commit(BOX_STATUS, false);
              if (!state.isScene) {
                commit(SET_BOX_OBJECT, BoxList);
              }
            };
            getBoxData();
          }
        } else {
          console.log('有异常数据', res);
        }
      }
      if (!state.isScene && !uiLock) {
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
/**
 * @returns Promise，十进制转二级制
 */
function chargeOnesCountInNum2(number) {
  let maximumN = 5;
  let n = 0;
  const test = 0x1;
  let res = 0;
  while (maximumN !== 0 && number !== 0) {
    res = number & test;
    if (res === 1) {
      n += 1;
    }
    number >>= 1;
    maximumN -= 1;
  }
  return n;
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
      commit(SET_DEVICE_INFO, deviceInfo);
      await dispatch(GET_ALL_STATES);
    }
  },
  /**
   * @description 获取设备全部状态,插件初始化时立刻查询一次，成功加载数据后finishLoad，然后5秒一次轮询
   */
  async [GET_ALL_STATES]({
    state,
    commit
  }) {
    if (!state.isScene) {
      await getStatusOfDev({
        state,
        commit
      }).then(res => res);
      await GetDevCustomName({
        state,
        commit
      }).then(res => res);
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
          // getDeviceNum({ state, commit });
        }, 5000);
      }
    }
  },
  /**
   * @description 点击查询盒子名称
   */

  async [GET_BOX_NAME]({
    state,
    commit
  }) {
    if (!state.isScene) {
      await GetDevCustomName({
        state,
        commit
      }).then(res => res);
    }
  },
  /**
   * @description 点击查询盒子名称
   */

  async [SET_BOX_NAME]({
    state,
    commit
  }) {
    if (!state.isScene) {
      await SetDevCustomName({
        state,
        commit
      }).then(res => res);
    }
  },
  /**
   * @description 发送控制指令
   */
  async [SEND_CTRL]({
    state,
    commit
  }, DataObject) {
    uiLock = true
    const keys = Object.keys(DataObject);
    const opt = [];
    const p = [];
    keys.forEach(key => {
      // 组装指令，根据业务更改
      opt.push(key);
      p.push(DataObject[key]);
    });
    const mainmac = state.mainmac;
    const sub = state.g_mac;
    const t = 'cmd';
    const json = JSON.stringify({
      sub,
      t,
      opt,
      p
    });
    console.log('发送命令', json);
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
                getDeviceInfo({
                  state,
                  commit
                });
                getStatusOfDev({
                  state,
                  commit
                });
                // getDeviceNum({ state, commit });
              }, 5000);
            }
          }, 3000);
          return res;
        })
        .catch(err => err);
      uiLock = false
      const result = JSON.parse(res);
      const {
        r
      } = result;
      const _p = result.p;
      // 成功之后更新主体状态
      r === 200 &&
        (await updateStates(state.mac, JSON.stringify(_p))
          .then(res => res)
          .catch(err => err));
    }
  },
};