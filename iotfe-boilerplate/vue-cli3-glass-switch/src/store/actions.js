/* eslint-disable consistent-return */
/*
 * @Author: Jerry-Rain
 * @Date: 2019-08-09 14:43:49
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-09-14 14:31:25
 * @Description:这个开关项目属于第一批单品，所以里面的内容比较坑（哼，插件是不会有问题的），参与开发的人员有李远钦、李伟鸿，硬件已走。
 *
 */

import {
  GET_DEVICE_INFO,
  GET_ALL_STATES,
  SET_DEVICE_INFO,
  SET_DATA_OBJECT,
  SEND_CTRL,
  GET_TIMERLIST,
  SET_TIMERLIST,
  SEND_TIMER,
  MODIFY_TIMER,
  FORMAT_TIMERLIST,
  STOP_TIMER,
  BEGIN_TIMER,
  SET_TYPE,
  GET_CLOUD_TIMER_LIST
} from './types';

import {
  sendDataToDevice,
  getInfo,
  updateStates,
  finishLoad,
  hideLoading,
  showLoading,
  showToast,
  getCloudTimerByMac
} from '../../../static/lib/PluginInterface.promise'; // 主体接口

window._timer = 0; // 轮询定时器
let ignoreCtr = false; // 忽略包标志位

/**
 * @description 获取设备在线状态
 */
async function getDeviceInfo({ state, commit }) {
  console.log('getInfo 请求');
  return getInfo(state.mac)
    .then(res => {
      const deviceInfo = JSON.parse(res);
      console.log(`设备状态#${deviceInfo.deviceState}`);
      commit(SET_DEVICE_INFO, deviceInfo);
      console.log('getInfo 返回');
      return res;
    })
    .catch(err => {
      err;
    });
}

/**
 * @description 返回一个向整机查询数据的promise，这个promise执行成功后返回查到的数据DataObject
 */
async function getStatusOfDev({ state, commit }) {
  console.log('getStatusOfDev 发送查询字段');
  const { cols } = JSON.parse(state.deviceInfo.fullstatueJson);
  console.log(cols);
  // showLoading();
  // const searchJson = '{"cols":["Pow"],"mac":"112233440226","t":"MeshStatus"}';
  return sendDataToDevice(state.mac, state.deviceInfo.fullstatueJson, false)
    .then(_res => {
      // hideLoading();
      if (ignoreCtr) {
        console.log('ignoreCtr: ', ignoreCtr);
        return;
      } // 如果是点击了控制回调回来的就直接return
      const DataObject = {};
      const res = JSON.parse(_res);
      console.log('----res Before----');
      console.log(res);
      console.log('----res After----');
      for (let i = 0, j = cols.length; i < j; i += 1) {
        DataObject[cols[i]] = res[i]; // 遍历查询到的数据，将值写入state中的DataObject，根据业务更改
        console.log('setDataObject: ', DataObject);
      }
      if (!state.isScene) {
        // 非场景时提交数据
        commit(SET_DATA_OBJECT, DataObject);
      }
      return DataObject;
    })
    .catch(err => {
      // hideLoading();
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
 * @returns setTimerList
 */
function formatTimerList({ state, commit, dispatch }, _res) {
  // 此处解析数据 讲定时列表的东西取出来组成timerList
  const res = JSON.parse(_res);
  console.log(res);
  if (res != 404) {
    if (res.length === 0) {
      commit(SET_TIMERLIST, []); // 更新state
      return '空列表';
    } // 空列表不解析直接退出
    // const res = [[1,0,121,1]]; // 测试数据
    const timerList = []; // 初始化所有列表
    console.log(timerList);
    let timerObj = { enable: 0, type: 0, hour: 0, min: 0, repeat: 0 }; // 初始化定时列表
    const listLength = res.length; // 定时列表的长度
    console.log("-------------开始解析时间------------") // eslint-disable-line
    for (let i = 0; i < listLength; i += 1) {
      console.log(res[i][0], res[i][1], res[i][2], res[i][3]);
      timerObj.enable = res[i][0]; // 使能状态
      timerObj.type = res[i][1]; // 开关类型
      timerObj.hour = parseInt(res[i][2] / 60); // 向下取整，取小时
      timerObj.min = res[i][2] % 60; // 求于取分钟
      timerObj.repeat = res[i][3]; // 周期 十进制
      timerList.push(timerObj);
      console.log('timerList:', timerObj);
      timerObj = { enable: 0, type: 0, hour: 0, min: 0, repeat: 0 }; // 清空定时列表
    }
    console.log('state.type= ', state.type);
    if (state.type == 3 || state.type == '3') {
      console.log('删除成功');
      showToast('删除成功', 0);
    }
    console.log('最终timerList:', timerList);
    commit(SET_TIMERLIST, timerList); // 更新state
    console.log('---------------结束解析时间------------');
  } else {
    if (state.type === 3 || state.type === '3') {
      showToast('删除失败', 0);
    } else {
      showToast('定时设置失败', 0);
      showLoading();
      dispatch(GET_TIMERLIST);
      hideLoading();
    }
    commit(SET_TIMERLIST, state.timerList); // 更新state
    console.log('404 数据异常错误！');
  }
  // hideLoading();
}

/**
 * @description 获取定时列表
 * @auther Jerry
 *  */
async function getTimerList({ state, commit }) {
  const searchJsonObj = {
    t: 'meshStatus',
    meshId: state.meshId,
    switchNum: state.switchNum,
    cols: ['timerList']
  };
  const searchJson = JSON.stringify(searchJsonObj);
  console.log(JSON.stringify(searchJsonObj));

  return sendDataToDevice(state.mac, searchJson, false)
    .then(_res => {
      // 此处解析数据 讲定时列表的东西取出来组成timerList
      const res = JSON.parse(_res);
      console.log(res);
      if (res != 404) {
        if (res.length === 0) {
          commit(SET_TIMERLIST, []); // 更新state
          return '空列表';
        } // 空列表不解析直接退出
        // const res = [[[1],[0],[121],[1]]]; // 测试数据
        const timerList = []; // 初始化所有列表
        console.log(timerList);
        let timerObj = { enable: 0, type: 0, hour: 0, min: 0, repeat: 0 }; // 初始化定时列表
        const listLength = res.length; // 定时列表的长度
        console.log('-------------开始解析时间------------');
        for (let i = 0; i < listLength; i++) {
          console.log(res[i][0], res[i][1], res[i][2], res[i][3]);
          timerObj.enable = res[i][0]; // 使能状态
          timerObj.type = res[i][1]; // 开关类型
          timerObj.hour = parseInt(res[i][2] / 60); // 向下取整，取小时
          timerObj.min = res[i][2] % 60; // 求于取分钟
          timerObj.repeat = res[i][3]; // 周期 十进制
          timerList.push(timerObj);
          console.log('timerList:', timerObj);
          timerObj = { enable: 0, type: 0, hour: 0, min: 0, repeat: 0 }; // 清空定时列表
        }
        console.log('最终timerList:', timerList);
        console.log('---------------结束解析时间------------');
        commit(SET_TIMERLIST, timerList); // 更新state
      } else {
        commit(SET_TIMERLIST, state.timerList); // 更新state
        showToast('定时获取失败', 0);
        console.log('404 数据异常错误！');
      }
    })
    .catch(err => {
      commit(SET_TIMERLIST, state.timerList); // 更新state
      showToast('定时获取失败', 0);
      console.log('没有收到！！查询的TimerList');
      return err;
    });
}

/**
 * @function getCloudTimerList
 * @param {object} { state, commit} 
 * @returns getCloudTimerList
 * @description 获取云定时列表
 */
function getCloudTimerList({state, commit}) {
  // 没有云定时直接跳过
  if (!state.cloudTimer && process.env.VUE_APP_MID === '80401') {
    return;
  }
  console.log('-------查询云定时-------');
  return getCloudTimerByMac(`${state.mac}@${state.mainMac}`).then(res => {
    const result = JSON.parse(res);
    console.log('result', result);
    const { timerTasks } = result;
    if (timerTasks.length > 0) { 
      for (const item of timerTasks) {
        if (!item.timer.status) {
          commit(SET_DATA_OBJECT, { AppTimer: 0 });
          console.log('无云定时');
        } else if (item.timer.status) {
          commit(SET_DATA_OBJECT, { AppTimer: 1 });
          console.log('有云定时');
          return;
        }
      }
    } else {
      commit(SET_DATA_OBJECT, { AppTimer: 0 });
      console.log('timerTasks为空，无定时数据');
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
   * @description 格式化时间
   */
  async [FORMAT_TIMERLIST]({ state, commit, dispatch }, res) {
    await formatTimerList({ state, commit, dispatch }, res);
  },
  /**
   * @description 停止轮询
   */
  async [STOP_TIMER]({ state, commit }) {
    console.log('》》》》》》》》》停止轮询字段，但是设备状态是要的');
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
  },
  /**
   * @description 开始轮询
   */
  async [BEGIN_TIMER]({ state, commit }) {
    console.log('》》》》》》》》》开始轮询');
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
  },
  /**
   * @description 获取设备定时列表
   */
  async [GET_TIMERLIST]({ state, commit }) {
    if (state.cloudTimer) {
      return;
    }
    await getTimerList({ state, commit })
      .then(res => {
        console.log('************hideloading************', res);
        hideLoading();
      })
      .catch(err => {
        console.log(err);
        hideLoading();
      });
  },
  /**
   * @description 获取设备信息，并开始轮询设备状态
   */
  async [GET_DEVICE_INFO]({ dispatch, commit, state }) {
    const _res = await getInfo(state.mac)
      .then(res => {
        if (state.cloudTimer) {
          getCloudTimerList({ state, commit });
        }
        return res;
      })
      .catch(err => {
        err;
      });
    // 防止Android端第一次下载插件fullstatueJson为空值
    if (JSON.parse(_res).fullstatueJson === '') {
      await sleep(1000);
      console.log('查询到的fullstatueJson为空');
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
    finishLoad();
    if (_timer === 0) {
      _timer = setInterval(() => {
        getDeviceInfo({ state, commit });
        console.log('---------- 结束deviceInfo -------------');
        getStatusOfDev({ state, commit });
        getCloudTimerList({state, commit});
      }, 5000);
    }
  },

  /**
   * @description 发送控制指令
   */
  async [SEND_CTRL]({ state, commit, dispatch }, obj) {
    const keys = Object.keys(obj);
    const opt = [];
    const p = [];
    const sub = state.mac;
    const mac = state.mac;
    keys.forEach(key => {
      // 组装指令，根据业务更改
      opt.push(key);
      p.push(obj[key]);
    });
    let t = ''; // cmd
    let json = ''; // json
    // TODO:这里是重点！80404 和 其他的发的命令是不一样的
    if (process.env.VUE_APP_MID === '80404') {
      t = 'cmd';
      json = JSON.stringify({ sub, t, opt, p }); // 增加meshId字段 新增开关编号
    } else {
      t = 'meshCmd';
      const meshId = state.meshId; // 新增meshId
      const switchNum = state.switchNum; // 新增开关编号
      json = JSON.stringify({ mac, t, meshId, switchNum, opt, p }); // 增加meshId字段 新增开关编号
    }
    
    console.log(json);
    // 调用原生方法发送控制命令
    if (!state.isScene) {
      // 非场景模式发送指令，否则不发送
      ignoreCtr = true;
      clearInterval(_timer);
      _timer = 0;
      console.log('发送命令 - ignoreCtr: ', ignoreCtr);
      setTimeout(() => {
        ignoreCtr = false;
        console.log('发送命令后 8s - ignoreCtr: ', ignoreCtr);
        clearInterval(_timer);
        _timer = 0;
        setTimeout(() => {
          if (!_timer) {
            _timer = setInterval(() => {
              getDeviceInfo({ state, commit });
              getStatusOfDev({ state, commit });
              getCloudTimerList({state, commit});
            }, 5000);
          }
        }, 3000);
      }, 8000);

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
                getCloudTimerList({state, commit});
              }, 5000);
            }
          }, 3000);
          return res;
        })
        .catch(err => {
          return err;
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

  /**
   * @description 发送设备定时列表
   */
  async [SEND_TIMER]({ state, commit, dispatch }, obj) {
    // const { dispatch, state, commit } = context;
    const sendJsonObj = {
      t: 'meshCmd',
      meshId: state.meshId,
      p: [
        `[49,[[1,6],[1,${state.switchNum}],[1,${obj.index}],[2,${obj.hour * 60 +
        obj.min}],[1,${obj.repeat}],[1,${obj.type}]]]`
      ],
      opt: ['timerList']
      // cmd > 功能字6 > 开关编号 > 列表索引 > 时间（分钟） > 周期 （二进制转十进制）> 开关状态
    };
    // let newObj = delete obj.index;
    commit(SET_TYPE, obj.type);
    const sendJson = JSON.stringify(sendJsonObj);
    console.log(JSON.stringify(sendJson));
    console.log(sendDataToDevice);
    // showLoading();
    await sendDataToDevice(state.mac, sendJson, false)
      .then(result => {
        console.log('--------------setTimerList Begin----------------');
        dispatch(FORMAT_TIMERLIST, result); // 格式化收到的时间
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  },

  /**
   * @description 发送设备定时列表
   */
  async [MODIFY_TIMER]({ dispatch, state, commit }, obj) {
    const sendJsonObj = {
      t: 'meshCmd',
      meshId: state.meshId,
      p: [
        `[49,[[1,7],[1,${state.switchNum}],[1,${obj.index}],[1,${obj.type}]]]`
      ],
      opt: ['timerList']
      // cmd > 功能字7 > 开关编号 > 列表索引 > 类型 1开 | 2关 | 3删除
    };
    commit(SET_TYPE, obj.type);
    const sendJson = JSON.stringify(sendJsonObj);
    console.log(JSON.stringify(sendJson));
    console.log(sendDataToDevice);
    await sendDataToDevice(state.mac, sendJson, false)
      .then(result => {
        dispatch(FORMAT_TIMERLIST, result); // 格式化收到的时间
      })
      .catch(err => {
        console.log(err);
        // hideLoading();
        return err;
      });
  }
};
