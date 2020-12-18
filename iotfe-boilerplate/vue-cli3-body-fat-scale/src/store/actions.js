import {
  GET_DEVICE_INFO,
  GET_ALL_STATES,
  SET_DEVICE_INFO,
  GET_USER_LIST,
  USER_INFO,
  EDIT_USER_INFO,
  SET_USER_LIST,
  GET_USER_UPDATE,
  GET_USER_DELETE,
  SET_USER_MESSAGE,
  GET_USER_MESSAGE,
  GET_HISTORY_MESSAGE,
  SET_USER_SAVE,
  DELETE_WEIGH_DATA,
  SET_KPI_VALUE,
  // UPDATE_DATA_FOR_PLUGIN,
} from './types';

import {
  getInfo,
  finishLoad,
  tuyaWeightList,
  tuyaWeightUpdate,
  tuyaWeightDelete,
  tuyaWeightDatas,
  tuyaWeightHistory,
  SaveOrGetData,
  tuyaWeightHistorySingleDelete,
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
    const deviceInfo = JSON.parse(_res);
    commit(SET_DEVICE_INFO, deviceInfo);
    await dispatch(GET_ALL_STATES);
  },

  /**
   * @description 获取设备全部状态,插件初始化时立刻查询一次，成功加载数据后finishLoad，然后5秒一次轮询
   */
  async [GET_ALL_STATES]({ state, commit }) {
    finishLoad();
    if (_timer === 0) {
      _timer = setInterval(() => {
        getDeviceInfo({ state, commit });
      }, 5000);
    }
  },
  /**
   * @description 切换的用户给主体保存起来
   */

  async [SET_USER_SAVE]({ state }, obj) {
    console.log(state);
    console.log('SaveOrGetData的数据', obj);
    return new Promise(resolve => {
      SaveOrGetData(obj.key, obj.value, obj.status)
        .then(res => {
          console.log('SaveOrGetData的返回数据', res);
          resolve(res);
        })
        .catch(err => err);
    });
  },
  /**
   * @description 获取用户列表
   */
  async [GET_USER_LIST]({ state, commit }) {
    await tuyaWeightList(state.mac)
      .then(res => {
        const result = JSON.parse(res);
        console.log(result);
        SaveOrGetData('user', '', false).then(reso => {
          console.log('主体保存返回数据', reso);
          if (
            JSON.parse(reso).value === '' ||
            JSON.parse(reso).value === null
          ) {
            commit(USER_INFO, result.result[0]);
            console.log('第一个用户列表信息', result.result[0]);
            commit(EDIT_USER_INFO, result.result[0]);
            SaveOrGetData('user', result.result[0], true);
          } else {
            commit(USER_INFO, JSON.parse(reso).value);
            commit(EDIT_USER_INFO, JSON.parse(reso).value);
          }
        });
        console.log('返回的用户列表信息', result.result);
        commit(SET_USER_LIST, result.result);
      })
      .catch(err => err);
  },
  /**
   * @description 修改保存用户信息
   */
  async [GET_USER_UPDATE]({ state, commit }, DataObject) {
    const data = JSON.parse(DataObject);
    return new Promise(resolve => {
      tuyaWeightUpdate(state.mac, data).then(res => {
        console.log('修改用户信息返回值', res);
        commit(USER_INFO, data);
        commit(EDIT_USER_INFO, data);
        resolve(res);
      });
    });
  },
  /**
   * @description 删除用户信息
   */
  async [GET_USER_DELETE]({ dispatch, state }, userId) {
    const data = userId;
    console.log('删除接口入参信息', 'mac:', state.mac, 'userId', data);
    return new Promise(resolve => {
      tuyaWeightDelete(state.mac, data)
        .then(res => {
          dispatch(GET_USER_LIST);
          resolve(res);
        })
        .catch(e => {
          console.log(e);
        });
    });
  },
  /**
   * @description 获取用户体脂相关数据
   */
  async [GET_USER_MESSAGE]({ state, commit }, userId) {
    return new Promise(resolve => {
      tuyaWeightDatas(state.mac, userId)
        .then(res => {
          console.log('查询用户各种信息返回值', res);
          resolve(res);
          if (JSON.parse(res).code === 200) {
            commit(SET_USER_MESSAGE, JSON.parse(res).result.data.bodyRate); // 同步bodyRate数据
            commit(SET_KPI_VALUE, JSON.parse(res).data);
          } else {
            const userMessgae = {
              bmi: '--', // string BMI
              bones: '--', // string 骨量
              calories: '--', // double 卡洛里
              fat: '--', // string 体脂
              fatRate: '--', // string 体脂率
              muscle: '--', // string 肌肉量
              muscleRate: '--', // string 肌肉率
              waterRate: '--', // double 水分
              weight: '--', // double 体重
            };
            const kpiVal = {
              bmiType: '--',
              bonesType: '--',
              fatRateType: '--',
              fatType: '--',
              muscleRateType: '--',
              muscleType: '--',
              waterType: '--',
            };
            commit(SET_USER_MESSAGE, userMessgae); // 同步bodyRate数据
            commit(SET_KPI_VALUE, kpiVal);
          }
        })
        .catch(err => err);
    });
  },
  /**
   * @description 获取历史相关数据   '暂时不用'
   */
  async [GET_HISTORY_MESSAGE]({ state }, userId) {
    const pageNo = state.pageNo;
    const pageSize = state.pageSize;
    const startTime = 0;
    const endTime = 0;
    const json = JSON.stringify({
      pageNo,
      pageSize,
      startTime,
      endTime,
      userId,
    });
    console.log('查询历史数据入参', json);
    tuyaWeightHistory(state.mac, json).then(res => {
      console.log('历史数据获取返回值', res);
    });
  },
  /**
   * @description 涂鸦体脂秤删除单个称重记录 (暂时不用)
   */
  async [DELETE_WEIGH_DATA]({ state }, id) {
    tuyaWeightHistorySingleDelete(state.mac, id)
      .then(res => {
        console.log('删除单个体重返回值', res);
      })
      .catch(err => err);
  },
};
