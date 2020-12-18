import {
  DISPOSE,
  SUBPACKAGE_SEND_DATA_TO_DEVICE,
  GET_DEVICE_DATA_BY_URL,
  SEND_DATA_TO_DEVICE,
  UPDATE_STATES,
  GET_DEVICE_INFO,
  GET_ALL_STATES,
  QUERY_WORKING_STATE,
  SET_DEVICE_INFO,
  SET_DATA_OBJECT,
  SET_DATA_OBJECT_CACHE,
  SEND_CTRL,
  SAVE_MENU,
  SAVE_MENU_FOR_FAVORITE_PAGE,
  SET_USER_DATA_FAVORITE_MENU,
  GET_USER_DATA_FAVORITE_MENU,
  DELETE_MENU,
  SEND_TIME,
  QUERY_TIME,
  GET_TIMELIST,
  SEARCH_CLOUD_MENU,
  GET_CLOUD_MENU_LIST,
  SET_COUNT_CLOUD_MENU_LIST,
  SET_CLOUD_MENU_LIST,
  APPEND_CLOUD_MENU_LIST,
  GET_CLOUD_MENU_DETAIL_STEPS,
  SET_CLOUD_MENU_DETAIL_STEPS,
  SET_FAVORITE_MENU_CLOUD
} from './types';

import {
  sendDataToDevice,
  getInfo,
  updateStates,
  finishLoad,
  setUserData,
  getUserData,
  getCloudMenuList,
  searchCloudMenu,
  getCloudMenuDetailSteps,
  showLoading,
  hideLoading,
  showToast,
  closePage
} from '../../../static/lib/PluginInterface.promise'; // 主体接口
import {
  MID_828D04,
  FavoriteType,
  RUN_STAT,
  MODE_CLEAN,
  __PROD__,
  __TEST__
} from '../api/828d04/constant';
import { getQueryStringByName, getCloudMenuKey, isLegalForFavoriteData } from '../utils/index';

let _timer = 0; // 轮询定时器
let ignoreCtr = false; // 忽略一包数据的Flag
let _prevObjectData = {}; // 设备上一包数据

/**
 * @description 比较设备状态是否有变化
 */
function comparePrevDeviceData(nextData) {
  let isEqual = true;
  const nextKeys = Object.keys(nextData);
  const diffData = {};
  for (let index = 0; index < nextKeys.length; index += 1) {
    const key = nextKeys[index];
    if (nextData[key] !== _prevObjectData[key]) {
      diffData[key] = nextData[key];
      isEqual = false;
    }
  }
  if (!isEqual) {
    // 拷贝与赋值
    const strNextDataJson = JSON.stringify(nextData);
    _prevObjectData = JSON.parse(strNextDataJson);
    console.log(`设备状态有变化 ${JSON.stringify(diffData)}`);
  } else {
    console.log('设备状态没有变化');
  }
  return isEqual;
}

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
async function getStatusOfDev({ state, dispatch, commit }, options = {}) {

  // 第几次查询设备状态
  const { countCallback } = options;

  // 是否要忽略数据解析
  if (ignoreCtr) {
    console.log('BEFORE SUBPACK 发送命令后8秒竟然有数据想解析，赶紧忽略防止跳变');
    return;
  }

  // 分包查询设备状态
  // const DataObject = await dispatch(SUBPACKAGE_SEND_DATA_TO_DEVICE);
  // 查询设备状态
  const DataObject = await dispatch(SEND_DATA_TO_DEVICE);

  // 尝试修复设备断电后，立刻点击小卡片，显示WebView控制页面的整改问题
  if (countCallback === 1 && DataObject === '') {
    showToast('网络异常', 1);
    closePage();
  }

  // 是否要忽略数据解析
  if (ignoreCtr) {
    console.log('AFTER SUBPACK 发送命令后8秒竟然有数据想解析，赶紧忽略防止跳变');
    return;
  }

  // 比较设备状态是否有变化
  const isEqual = comparePrevDeviceData(DataObject);

  // 处理DataObject自定义的业务逻辑
  const commitDataObject = customizeDataObject({ commit }, DataObject);

  // 非场景和数据有变更时，提交数据
  if (!state.isScene && !isEqual && !ignoreCtr) {
    commit(SET_DATA_OBJECT, commitDataObject);
  }
  return DataObject;
}

/**
  * 处理DataObject自定义的业务逻辑
  * @returns DataObject
  */
function customizeDataObject({ commit }, DataObject) {
  const { RunStat, Mod, List1 } = DataObject;
  // 是否保洁中
  const isClean = Mod === MODE_CLEAN;
  // 是否工作中
  const isWorking = RunStat === RUN_STAT.Working || RunStat === RUN_STAT.Appointment;
  // 是否待机中
  const isNormal = RunStat === RUN_STAT.TurnOn || RunStat === RUN_STAT.TurnOff;
  if (isWorking && isClean) {
    // 清洁模式更新RunStat, Mod, List1到dataObjectCache
    commit(SET_DATA_OBJECT_CACHE, { RunStat, Mod, CleanList1: List1 });
    // 整机运行清洁模式时，不接收以下数据
    delete DataObject.Mod;
    delete DataObject.RunStat;
    delete DataObject.List1;
    delete DataObject.List2;
    delete DataObject.List3;
    delete DataObject.List4;
    delete DataObject.List5;
  } else if (isWorking) {
    // 清洁模式需要重置RunStat, Mod到dataObjectCache
    commit(SET_DATA_OBJECT_CACHE, { RunStat, Mod });
    // 工作时把缓存同步设备数据
    commit(SET_DATA_OBJECT_CACHE, {
      SmartMenuList1: List1,
      ProfessionalBakingList1: List1,
      AuxiliaryFunctionList1: List1,
    });
  } else if (isNormal) {
    // 清洁模式需要重置RunStat, Mod到dataObjectCache
    commit(SET_DATA_OBJECT_CACHE, { RunStat, Mod });
    // 不工作时，不接收以下数据
    delete DataObject.Mod;
    delete DataObject.List1;
    delete DataObject.List2;
    delete DataObject.List3;
    delete DataObject.List4;
    delete DataObject.List5;
  }
  return DataObject;
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
   * 获取URL的设备状态
   */
  [GET_DEVICE_DATA_BY_URL]({ state, commit }) {
    const _res = getQueryStringByName('data');
    const { cols } = JSON.parse(state.deviceInfo.fullstatueJson);
    let DataObject = {};
    try {
      const res = JSON.parse(_res);
      for (let i = 0, j = cols.length; i < j; i += 1) {
        DataObject[cols[i]] = res[i]; // 遍历查询到的数据
      }
      // 处理DataObject自定义的业务逻辑
      const commitDataObject = customizeDataObject({ commit }, DataObject);
      commit(SET_DATA_OBJECT, commitDataObject);
    } catch (e) {
      console.error(e);
      DataObject = ''; // 主体查询不到状态会给空字符
    }
    console.log('GET_DEVICE_DATA_BY_URL:', JSON.stringify(DataObject));
  },

  /**
   * @desc 分包查询设备状态
   * @version 1.0.0
   * @return DataObject 设备状态
   * @author linbingquan
   */
  async [SUBPACKAGE_SEND_DATA_TO_DEVICE]({ state }) {
    const { cols, mac, t } = JSON.parse(state.deviceInfo.fullstatueJson);
    const BASE_LEN = 15; // 设备状态一包查询个数
    const MILLISECONDS = 200; // 间隔查询时间毫秒为单位
    const arrCols = []; // 分包查询cols数组
    for (let index = 0; index < cols.length; index += BASE_LEN) {
      arrCols.push(cols.slice(index, index + BASE_LEN)); // slice不改变原数组
    }
    let DataObject = {};
    // 循环查询字段设备信息
    for (let i = 0; i < arrCols.length; i += 1) {
      const cols = arrCols[i];
      // 查询命令格式 "{\"cols\":[\"Pow\"],\"mac\":\"f4911e8f4c5f\",\"t\":\"status\"}"
      const json = { cols, mac, t };
      await sleep(MILLISECONDS); // 等待计时结束进行下一项任务
      const strData = await sendDataToDevice(mac, JSON.stringify(json), false);
      try {
        const data = JSON.parse(strData);
        let subData = {};
        for (let j = 0; j < cols.length; j += 1) {
          subData[cols[j]] = data[j]; // 遍历查询到的数据
        }
        DataObject = Object.assign(DataObject, subData); // 合并分包查询的数据
      } catch (e) {
        console.error(e);
        DataObject = ''; // 主体查询不到状态会给空字符
      }
    }
    console.log('SUBPACKAGE_SEND_DATA_TO_DEVICE:', JSON.stringify(DataObject));
    return DataObject;
  },

  /**
   * @desc 查询设备状态
   * @version 1.0.0
   * @return DataObject 设备状态
   * @author linbingquan
   */
  async [SEND_DATA_TO_DEVICE]({ state }) {
    const _res = await sendDataToDevice(state.mac, state.deviceInfo.fullstatueJson, false);
    let DataObject = {};
    const { cols } = JSON.parse(state.deviceInfo.fullstatueJson);
    try {
      const res = JSON.parse(_res);
      for (let i = 0, j = cols.length; i < j; i += 1) {
        DataObject[cols[i]] = res[i]; // 遍历查询到的数据
      }
    } catch (e) {
      console.error(e);
      DataObject = ''; // 主体查询不到状态会给空字符
    }
    console.log('SEND_DATA_TO_DEVICE:', JSON.stringify(DataObject));
    return DataObject;
  },

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
      dispatch(GET_ALL_STATES);
    }
  },

  /**
   * 查询整机的工作状态
   * @param {Array} cols 整机状态字段
   * 
   * @author linbingquan
   * @version 1.0.0
   * @desc 用于智能菜单下的工作状态查询
   */
  async [QUERY_WORKING_STATE]({ state, dispatch, commit }, { cols = [], timeout = 1000, countLoop = 0 }) {
    if (!Array.isArray(cols)) cols = [];
    const { mac } = state;
    const t = 'status';
    const queryJson = { mac, t, cols };
    const _res = await sendDataToDevice(mac, JSON.stringify(queryJson), false);
    try {
      const res = JSON.parse(_res);
      const DataObject = {};
      for (let i = 0, j = cols.length; i < j; i += 1) {
        DataObject[cols[i]] = res[i]; // 遍历查询到的数据
      }
      // 根据业务内容决定，工作时间大于零才是正确
      const time = DataObject['DisSetHour'] + DataObject['DisSetMin']
      console.log('QUERY_WORKING_STATE:', JSON.stringify(DataObject));
      // 根据业务内容决定，工作时间大于零才是正确
      if (time <= 0) {
        await sleep(timeout);
        if (countLoop > 5) {
          // 只循环调用6次
          return;
        } else {
          countLoop += 1;
          dispatch(QUERY_WORKING_STATE, { cols, timeout, countLoop }); // 整机不满足业务数据，重新查询
        }
      } else {
        // 提交数据
        commit(SET_DATA_OBJECT, DataObject);
        // 工作时把缓存同步设备数据
        const List1 = DataObject.List1;
        commit(SET_DATA_OBJECT_CACHE, {
          SmartMenuList1: List1,
          ProfessionalBakingList1: List1,
          AuxiliaryFunctionList1: List1,
        });
      }
    } catch (e) {
      console.error(e);
    }
  },

  /**
   * @description 获取设备全部状态,插件初始化时立刻查询一次，成功加载数据后finishLoad，然后5秒一次轮询
   */
  async [GET_ALL_STATES]({ state, dispatch, commit }) {
    // dispatch(GET_DEVICE_DATA_BY_URL);
    // 尝试修复设备断电后，立刻点击小卡片，显示WebView控制页面的整改问题
    await getStatusOfDev({ state, dispatch, commit }, { countCallback: 1 });
    console.log('=== finishLoad() ===');
    finishLoad();
    if (_timer === 0) {
      // 启动定时5秒轮询
      _timer = setInterval(async () => {
        getDeviceInfo({ state, commit });
        await getStatusOfDev({ state, dispatch, commit });
      }, 5000);
    }
  },

  async [SAVE_MENU_FOR_FAVORITE_PAGE]({ dispatch }, payload) {
    dispatch(SET_USER_DATA_FAVORITE_MENU, {
      type: FavoriteType.Update,
      CloudMenu: payload
    });
  },

  // 保存菜单
  async [SAVE_MENU]({ getters, dispatch }, payload) {
    dispatch(GET_USER_DATA_FAVORITE_MENU);
    const favoriteCloudMenuList = getters.getFavoriteCloudMenuList;
    // const [sList1, sList2, sList3] = payload;
    const FavoriteCloudMenu = [];
    if (favoriteCloudMenuList.length > 0) {
      favoriteCloudMenuList.forEach(menuObj => {
        // menu 数据格式： [number, number, number]
        FavoriteCloudMenu.push(menuObj);
      });
    }
    FavoriteCloudMenu.push(payload);
    dispatch(SET_USER_DATA_FAVORITE_MENU, {
      type: FavoriteType.Add,
      CloudMenu: FavoriteCloudMenu
    });
  },

  // 删除菜单
  async [DELETE_MENU]({ getters, dispatch }, payload) {
    const favoriteCloudMenuList = getters.getFavoriteCloudMenuList;
    // payload 数据格式： [[number, number, number], [number, number, number], ...]
    // const deleteFavoriteMenuList = payload;
    // deleteFavoriteMenuList.forEach(deleteObj => {
    const [dList1, dList2, dList3] = payload;
    favoriteCloudMenuList.forEach((menuObj, index) => {
      // menu 数据格式： [number, number, number]
      const [List1, List2, List3] = menuObj;
      const isDelete = dList1 === List1 && dList2 === List2 && dList3 === List3;
      if (isDelete) {
        favoriteCloudMenuList.splice(index, 1);
      }
    });
    // });
    dispatch(SET_USER_DATA_FAVORITE_MENU, {
      type: FavoriteType.Delete,
      CloudMenu: favoriteCloudMenuList
    });
  },

  async [GET_USER_DATA_FAVORITE_MENU]({ state, commit }) {
    let FavoriteCloudMenu = [];
    try {
      showLoading();
      const { mac } = state;
      const res = await getUserData(getCloudMenuKey(mac));
      const { r, value, msg } = JSON.parse(res);
      if (r === 200) {
        const _FavoriteCloudMenu = JSON.parse(value);
        if (isLegalForFavoriteData(_FavoriteCloudMenu)) {
          FavoriteCloudMenu = _FavoriteCloudMenu;
        }
      } else if (r === 502) {
        FavoriteCloudMenu = [];
        console.log(msg);
      }
      commit(SET_FAVORITE_MENU_CLOUD, FavoriteCloudMenu);
    } catch (e) {
      console.error(e);
      showToast('数据异常...', 1);
      commit(SET_FAVORITE_MENU_CLOUD, []);
    } finally {
      hideLoading();
    }
  },

  async [SET_USER_DATA_FAVORITE_MENU]({ state, commit }, payload) {
    try {
      showLoading();
      const { type, CloudMenu } = payload;
      const { mac } = state;
      const strJson = JSON.stringify(CloudMenu);
      const res = await setUserData(getCloudMenuKey(mac), strJson);
      const { r } = JSON.parse(res);
      if (r === 200) {
        console.log('setUserData:', strJson);
        commit(SET_FAVORITE_MENU_CLOUD, strJson);

        const isSave = type === FavoriteType.Add;
        const isDelete = type === FavoriteType.Delete;
        const isUpdate = type === FavoriteType.Update;
        if (isSave) {
          showToast('收藏成功', 1);
        } else if (isDelete) {
          showToast('取消收藏', 1);
        } else if (isUpdate) {
          showToast('更新成功', 1);
        }
      } else {
        showToast('保存失败...', 1);
      }
    } catch (e) {
      console.warn(e);
      showToast('网络异常...', 1);
    } finally {
      hideLoading();
    }
  },

  [DISPOSE]() {
    console.log('=== 清空设备状态的缓存数据 ===');
    _prevObjectData = {};
  },

  /**
   * @description 发送控制指令
   * @version v1.0.1 修复定时器关闭与启动的时机
   */
  async [SEND_CTRL]({ state, dispatch, commit }, DataObject) {
    const keys = Object.keys(DataObject);
    const opt = [];
    const p = [];
    keys.forEach(key => {
      // 组装指令，根据业务更改
      opt.push(key);
      p.push(DataObject[key]);
    });
    const { mac } = state;
    const t = 'cmd';
    const json = JSON.stringify({ mac, t, opt, p });
    console.log('sendCtrl json: ', json);
    // 非场景模式发送指令，否则不发送
    if (!state.isScene) {
      // 忽略一包数据的Flag
      ignoreCtr = true;
      // 发送指令前暂停接收
      clearInterval(_timer);
      _timer = 0;
      console.log('发送命令 - ignoreCtr: ', ignoreCtr);
      setTimeout(() => {
        ignoreCtr = false;
        console.log('发送命令后 8s - ignoreCtr: ', ignoreCtr);
        clearInterval(_timer);
        _timer = 0;
        // 生产环境与测试环境开启轮询
        if (__PROD__ || __TEST__) {
          // 过3秒后重启5秒轮询
          setTimeout(() => {
            /**
             * 在APP启动工作后，整机取消，APP会一直停留在工作中的界面
             * 下发正常命令，整机数据会有变化，清空上一次设备的状态数据
             * 启动轮询问后第一次查询回来的数据commit到store
             */
            _prevObjectData = {};
            console.log('=== 清空设备状态的缓存数据 ===');
            if (!_timer) {
              _timer = setInterval(async () => {
                getDeviceInfo({ state, commit });
                await getStatusOfDev({ state, dispatch, commit });
              }, 5000);
            }
          }, 3000);
        }
      }, 8000);
      // 调用原生方法发送控制命令
      const res = await sendDataToDevice(mac, json, false)
        .then(res => res)
        .catch(err => console.error(err));

      // 成功之后更新主体状态
      dispatch(UPDATE_STATES, res);
    }
  },

  // 更新小卡片主体状态
  async [UPDATE_STATES]({ state }, payload) {
    try {
      const { r, p, opt } = JSON.parse(payload);
      // 成功之后更新主体状态
      if (r === 200) {
        const { mac } = state;
        // 解析小卡片字段
        const { cols } = JSON.parse(state.deviceInfo.statueJson);
        // 当前设备状态信息
        const dataObject = state.dataObject;
        const DataObject = {};
        for (let i = 0, j = cols.length; i < j; i += 1) {
          DataObject[cols[i]] = dataObject[cols[i]]; // 遍历查询到的数据
        }
        for (let i = 0, j = opt.length; i < j; i += 1) {
          DataObject[opt[i]] = p[i]; // 覆盖下发命令的数据
        }
        const _p = [];
        for (let i = 0, j = cols.length; i < j; i += 1) {
          _p.push(DataObject[cols[i]]);
        }
        console.log('UPDATE_STATES:', JSON.stringify(_p));
        await updateStates(mac, JSON.stringify(_p))
          .then(res => res)
          .catch(err => console.error(err));
      } 
    } catch (e) {
      console.error(e);
    }
  },

  /**
   * @description 发送定时指令
   */
  async [SEND_TIME]({ state }) {
    const { mac } = state;
    const json = JSON.stringify(state.setTime);
    // 调用原生方法发送控制命令
    if (!state.isScene) {
      // 非场景模式发送指令，否则不发送
      const res = await sendDataToDevice(mac, json, false)
        .then(res => {
          return res;
        })
        .catch(err => err);
      const result = JSON.parse(res);
      console.log(result);
    }
  },
  /**
   * @description 查询定时指令
   */
  async [QUERY_TIME]({ state, commit }) {
    const { mac } = state;
    const json = JSON.stringify(state.queryTime);
    // 调用原生方法发送控制命令
    if (!state.isScene) {
      // 非场景模式发送指令，否则不发送
      const res = await sendDataToDevice(mac, json, false)
        .then(res => {
          return res;
        })
        .catch(err => err);
      const result = JSON.parse(res);
      commit(GET_TIMELIST, result);
    }
  },

  async [GET_CLOUD_MENU_LIST]({ commit }, payload = 1) {
    try {
      let res = await getCloudMenuList(MID_828D04, payload, 10);
      // res = res.replace(/\n/g, '<br/>');
      res = res.replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t');
      const jsonRes = JSON.parse(res);
      console.log('GET_CLOUD_MENU_LIST:', jsonRes);
      commit(SET_COUNT_CLOUD_MENU_LIST, jsonRes.count);
      commit(APPEND_CLOUD_MENU_LIST, jsonRes.data);
    } catch (e) {
      console.error(e);
    }
  },

  async [SEARCH_CLOUD_MENU]({ commit }, payload = { keyword: '', index: 1 }) {
    try {
      const { keyword, index } = payload;
      const cnt = 10;
      let res = await searchCloudMenu(keyword, MID_828D04, index, cnt);
      // res = res.replace(/\n/g, '<br/>');
      res = res.replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t');
      const jsonRes = JSON.parse(res);
      console.log('SEARCH_CLOUD_MENU:', { jsonRes, keyword, MID_828D04, index, cnt});
      const { r, msg, count, data } = jsonRes;
      if (r === 11506) {
        if (msg === '没有搜索到相关信息哦，请试试其他关键词') {
          commit(SET_COUNT_CLOUD_MENU_LIST, 0);
        } else if (msg === '无法翻页了') {
          throw Error(msg);
        }
      } else if (r === 200) {
        commit(SET_COUNT_CLOUD_MENU_LIST, count);
        if (data === undefined || data === null) {
          commit(APPEND_CLOUD_MENU_LIST, []);
        } else {
          if (index === 1) {
            // 第一页设置
            commit(SET_CLOUD_MENU_LIST, data);
          } else {
            // 非第一页追加
            commit(APPEND_CLOUD_MENU_LIST, data);
          }
        }
      } else {
        throw Error('SEARCH_CLOUD_MENU has something error!');
      }
    } catch (e) {
      console.error(e);
    }
  },

  async [GET_CLOUD_MENU_DETAIL_STEPS]({ commit }, payload) {
    try {
      const { Cid } = payload;
      let res = await getCloudMenuDetailSteps(Cid);
      res = res.replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t');
      const jsonRes = JSON.parse(res);
      console.log('GET_CLOUD_MENU_DETAIL_STEPS:', jsonRes);
      commit(SET_CLOUD_MENU_DETAIL_STEPS, jsonRes.data);
    } catch (error) {
      console.error(error);
    }
  }
};
