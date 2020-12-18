/* eslint-disable no-nested-ternary */
/* eslint-disable no-prototype-builtins */
import dayjs from 'dayjs';
import {
  GET_DEVICE_INFO,
  GET_MUSIC_STATES,
  // SET_DEVICE_INFO,
  SET_MUSIC_OBJECT,
  GET_MAIN_PAGE_DATE,
  SET_MAIN_DATA,
  SET_MAC,
} from './types';

import {
  // getInfo,
  hideLoading,
  finishLoad,
  getPlayStatus,
  getMainPageData,
} from '../../../static/lib/PluginInterface.promise'; // 主体接口

let _timer = 0; // 轮询定时器

/**
 * @description 获取设备在线状态
 */
// function getDeviceInfo({ state, commit }) {
//   return getInfo(state.mac)
//     .then(res => {
//       const deviceInfo = JSON.parse(res);
//       commit(SET_DEVICE_INFO, deviceInfo);
//       return res;
//     })
//     .catch(err => {
//       err;
//     });
// }

/**
 * @description 返回一个向整机查询数据的promise，这个promise执行成功后返回查到的数据DataObject
 */
function getMusicStatusOfDev({ state, commit }) {
  if (!state.Status) {
    console.log('清除定时器');
    clearInterval(_timer);
    _timer = 0;
  }
  return getPlayStatus()
    .then(_res => {
      console.log(_res);
      commit(SET_MUSIC_OBJECT, _res);
      return _res;
    })
    .catch(err => {
      return err;
    });
}
/**
 * @returns Promise，等待计时结束进行下一项任务
 */
// function sleep(time) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve();
//     }, time);
//   });
// }

export default {
  /**
   * @description 获取设备信息，并开始轮询设备状态    // 床垫 暂时不用预留
   */
  async [GET_DEVICE_INFO]({ dispatch }) {
    // const _res = await getInfo(state.mac)
    //   .then(res => {
    //     return res;
    //   })
    //   .catch(err => {
    //     err;
    //   });
    // // 防止Android端第一次下载插件fullstatueJson为空值
    // if (JSON.parse(_res).fullstatueJson === '') {
    //   await sleep(1000);
    //   dispatch(GET_DEVICE_INFO);
    // } else {
    //   const deviceInfo = JSON.parse(_res);
    //   commit(SET_DEVICE_INFO, deviceInfo);
    //   await dispatch(GET_MUSIC_STATES);
    // }
    await dispatch(GET_MUSIC_STATES);
  },
  /**
   * @description 获取设备全部状态,插件初始化时立刻查询一次，成功加载数据后finishLoad，然后5秒一次轮询
   */
  async [GET_MUSIC_STATES]({ state, commit }) {
    await getMusicStatusOfDev({ state, commit }).then(res => res);
    if (_timer === 0) {
      _timer = setInterval(() => {
        // getDeviceInfo({ state, commit });
        getMusicStatusOfDev({ state, commit });
      }, 5000);
    }
  },
  /**
   * @description 获取主页数据
   */
  async [GET_MAIN_PAGE_DATE]({ state, commit }, mac) {
    // 为了防止拿不到数据 设置 localStorage 暂存，如果是第一次存state默认数据
    if (localStorage.getItem('mainPageData') !== null) {
      commit(SET_MAIN_DATA, JSON.parse(localStorage.getItem('mainPageData')));
    }
    await getMainPageData(mac).then(res => {
      if (res) {
        console.log('res', res);
        console.log('state.mac', state.mac);
        const _res = JSON.parse(res);
        console.log('_res', _res);
        console.log(_res.allSleepDevices);
        const obj = {
          funcSleepValue: _res.hasOwnProperty('sleep')
            ? parseInt(_res.sleep.split(',')[1], 10)
            : 0,
          funcSleep: _res.hasOwnProperty('sleep')
            ? Boolean(parseInt(_res.sleep.split(',')[1], 10))
            : false,
          sleepIndex: _res.hasOwnProperty('sleep')
            ? parseInt(_res.sleep.split(',')[0], 10)
            : -1,
          funcWakeValue: _res.hasOwnProperty('wakeUp')
            ? parseInt(_res.wakeUp.split(',')[1], 10)
            : 0,
          funcWake: _res.hasOwnProperty('wakeUp')
            ? Boolean(parseInt(_res.wakeUp.split(',')[1], 10))
            : false,
          wakeupindex: _res.hasOwnProperty('wakeUp')
            ? parseInt(_res.wakeUp.split(',')[0], 10)
            : -1,
          circleValue: _res.hasOwnProperty('sleepScore')
            ? !_res.sleepScore
              ? ''
              : _res.sleepScore / 100
            : '',
          sleepStartAt: _res.hasOwnProperty('sleepTime')
            ? !_res.sleepTime
              ? '--:--'
              : dayjs(Number(_res.sleepTime)).format('HH:mm')
            : '--:--',
          sleepEndAt: _res.hasOwnProperty('wakeUpTime')
            ? !_res.wakeUpTime
              ? '--:--'
              : dayjs(Number(_res.wakeUpTime)).format('HH:mm')
            : '--:--',
          deviceList: _res.hasOwnProperty('allSleepDevices')
            ? _res.allSleepDevices
              ? _res.allSleepDevices
              : ''
            : '',
          currentMacIndex: _res.hasOwnProperty('allSleepDevices')
            ? _res.allSleepDevices
              ? _res.allSleepDevices[0].mac
              : ''
            : '',
          smartMode: Boolean(_res.smartIntelligence),
          musicDataArray: _res.hasOwnProperty('musicDataArray')
            ? _res.musicDataArray
              ? _res.musicDataArray
              : state.zwtArray
            : state.zwtArray, // 为空用默认state里的数据
          hasAirCondition: _res.hasOwnProperty('hasAirCondition')
            ? _res.hasAirCondition
            : 0,
          sleepStandardTime: _res.hasOwnProperty('sleepStandardTime')
            ? _res.sleepStandardTime
            : '22:00',
          wakeUpStandardTime: _res.hasOwnProperty('wakeUpStandardTime')
            ? _res.wakeUpStandardTime
            : '07:00',
        };
        if (_res.allSleepDevices && !state.mac) {
          console.log(
            _res.allSleepDevices,
            '!!!',
            state.mac,
            'mac为空拿第一个',
          );
          commit(SET_MAC, _res.allSleepDevices[0].mac);
        }
        console.log('主页数据', obj);
        commit(SET_MAIN_DATA, obj);
      }
      navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)
        ? finishLoad()
        : hideLoading();
    });
  },
};
