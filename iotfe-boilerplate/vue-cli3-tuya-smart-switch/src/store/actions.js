/*
 * @Author: Jerry-Rain
 * @Date: 2020-06-04 17:08:36
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-07-02 17:33:19
 * @Description: 
 */ 
import {
  SET_DATA_OBJECT,
  POW_CTRL,
  SET_TIMERS,
  GET_TIMERS,
  UPDATE_TIMERS,
  DEL_TIMERS,
  GET_DEV_INFO,
  INIT_DATA,
  TUYA_GET_ALL_STATE,
  SET_DEVICE_INFO
} from './types';

import {
  tuyaRequestDevData,
  tuyaSetTimers,
  tuyaQueryTimerslist,
  tuyaControlDev,
  tuyaDeleteTimers,
  tuyaEditTimers,
  showLoading,
  hideLoading,
  updateStates,
  showToast,
  finishLoad,
  getInfo
} from '../../../static/lib/PluginInterface.promise'; // 主体接口

function setData(res, name) {
  return JSON.parse(res).message.result.properties.find(item => item.code === name);
}

function getDeviceInfo({ state, commit }) {
  return getInfo(`${state.mac}#${state.dataObject.switchNum}`)
    .then(res => {
      const deviceInfo = JSON.parse(res);
      commit(SET_DEVICE_INFO, deviceInfo);
      console.log('%c 设备在线状态：', 'color: red;', state.deviceInfo.deviceState);
      return res;
    })
    .catch(err => {
      err;
    });
}

let timer = null;
let allowCommit = true;

export default {
  // 开始轮询
  async [TUYA_GET_ALL_STATE]({state, commit, dispatch}) {
    dispatch(GET_DEV_INFO);
    clearInterval(timer);
    timer = null;
    timer = setInterval(() => {
      allowCommit = true;
      dispatch(GET_DEV_INFO);
      getDeviceInfo({ state, commit });
    }, 8 * 1000);
  },
  
  // 初始化获取数据用
  async [INIT_DATA]({state, commit, dispatch}) {
    getDeviceInfo({ state, commit });
    const getInfo = await dispatch(GET_DEV_INFO);
    dispatch(TUYA_GET_ALL_STATE);
    // if (getInfo === 'success') {
    //   finishLoad();
    //   dispatch(GET_TIMERS);
    //   setTimeout(() => {
    //     dispatch(TUYA_GET_ALL_STATE);
    //     getDeviceInfo({ state, commit });
    //   }, 5000);
    // } else {
    //   await dispatch(GET_DEV_INFO);
    //   finishLoad();
    //   dispatch(GET_TIMERS);
    //   setTimeout(() => {
    //     dispatch(TUYA_GET_ALL_STATE);
    //     getDeviceInfo({ state, commit });
    //   }, 5000);
    // }
  },
  
  // 查询设备所有状态
  async [GET_DEV_INFO]({state, commit}) {
    const mac = state.mac;
    const { switchNum } = state.dataObject;
    const result = await tuyaRequestDevData(mac)
      .then(res => { 
        console.log('tuyaRequestDevData - res: ', JSON.parse(res));
        const porpertyPow = JSON.parse(res).message.result.properties[parseInt(switchNum) - 1]; // 对应开挂拿笔拿 
        const { value: Pow, code } = porpertyPow;
        const { deviceName, online, deviceTypeName } = JSON.parse(res).message.result;
        allowCommit && commit(SET_DATA_OBJECT, { Pow, code, deviceName, online, deviceTypeName }); 
        console.log('设置字段以后： ', state.dataObject);
        if (JSON.parse(res).code != 200) { 
          return 'initFail'; 
        } 
        return 'success';
      })
      .catch(res => console.log('Err', res));
    return result;
  },

  // 控制命令
  async [POW_CTRL]({ state, commit, dispatch }) {
    const mac = state.mac;
    const { code, deviceTypeName, Pow } = state.dataObject;
    const data = {
      commands: [
        { code, value: !Pow }
      ]
    };
    console.log('发送的开关指令：', [mac, code, !Pow]);
    // showLoading();
    allowCommit = false;
    clearInterval(timer);
    timer = null;
    await tuyaControlDev(mac, deviceTypeName, data)
      .then(res => {
        hideLoading();
        console.log('tuyaControlDev - res: ', JSON.parse(res));
        commit(SET_DATA_OBJECT, { Pow: !Pow });
      })
      .catch(res => {
        hideLoading();
        console.log('Err', res);
      });
    dispatch(TUYA_GET_ALL_STATE);
    await updateStates(mac, JSON.stringify([Pow]))
      .then(res => res)
      .catch(err => err);
  },

  // 发送定时
  async [SET_TIMERS]({ state, commit, dispatch }, Data) {
    const mac = state.mac;
    console.log('设置定时： ', Data);
    showLoading();
    await tuyaSetTimers(mac, Data)
      .then(res => {
        hideLoading();
        commit(SET_DATA_OBJECT, { });
        console.log('tuyaSetTimers - res: ', JSON.parse(res));
      })
      .catch(res => {
        hideLoading();
        console.log('Err', res);
      });
  },

  // 获取定时列表
  async [GET_TIMERS]({ state, commit }) {
    console.log('获取定时列表：');
    // showLoading();
    await tuyaQueryTimerslist(state.mac)
      .then(res => {
        hideLoading();
        console.log('tuyaQueryTimerslist - res: ', JSON.parse(res));
        if (JSON.parse(res).message.result.length === 0) { return; }
        const { groups } = JSON.parse(res).message.result[0];
        commit(SET_DATA_OBJECT, { groups });
        console.log('定时列表的id： ', groups);
      })
      .catch(res => {
        hideLoading();
        console.log('Err', res);
      });
  },

  // 更新定时
  async [UPDATE_TIMERS]({ state, commit, dispatch }, Data) {
    const mac = state.mac;
    console.log('更新定时: ', Data);
    // showLoading();
    await tuyaEditTimers(mac, Data)
      .then(res => {
        hideLoading();
        console.log('tuyaEditTimers - res: ', JSON.parse(res));
        commit(SET_DATA_OBJECT, { });
      })
      .catch(res => {
        hideLoading();
        console.log('Err', res);
      });
  },

  // 删除定时
  async [DEL_TIMERS]({ state, commit, dispatch }, obj) {
    const { mac } = state;
    const { groups } = state.dataObject;
    console.log('obj.index', obj.index);
    const data = {
      // categoryTimers: mac,
      // group_id: groups[obj.index].id
    };
    console.log('删除定时的id', data);
    // showLoading();
    await tuyaDeleteTimers(mac, data)
      .then(res => {
        hideLoading();
        commit(SET_DATA_OBJECT, { });
        console.log('tuyaQueryTimerslist - res: ', JSON.parse(res));
      })
      .catch(res => {
        hideLoading();
        console.log('Err', res);
      });
  }
};
