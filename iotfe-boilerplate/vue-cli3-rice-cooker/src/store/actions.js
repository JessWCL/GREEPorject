import {
  GET_DEVICE_INFO,
  SET_DEVICE_INFO,
  GET_ALL_STATES,
  SEND_CTRL,
  UPDATE_DATA_OBJECT,
  MQTT_INIT,
  SET_DATA_OBJECT,
  MQTT_CALLBACK,
} from './types';
import {
  sendDataToDevice,
  getInfo,
  updateStates,
  finishLoad,
  setMqttStatusCallback,
} from '../../../static/lib/PluginInterface.promise';
import {
  useDefaultValue, isMqtt,
} from '../utils/index';

/**
 *
 * @function getStatusOfDev
 * @param {object} { state, commit }
 * @returns sendDataToDevice(state.mac, state.deviceInfo.fullstatueJson, false)
 * @description 返回一个向整机查询数据的promise，这个promise执行成功后返回查到的数据DataObject
 *
 */
let firFlag = true; // 首次进入插件更新所有数据
let _timer = 0; // 轮询定时器
function getStatusOfDev({ state, commit }) {
  return sendDataToDevice(state.mac, state.deviceInfo.fullstatueJson, false)
    .then(_res => {
      const DataObject = {};
      const res = JSON.parse(_res);

      const [
        Pow,
        mode,
        TmrEn,
        StTmr,
        SchEn,
        SchTmr,
        Rice,
        Textre,
        StpRic,
        KpTpEn,
        KpTpTmr,
        ModeTmr,
        estate,
        estate2,
        Volt,
        estate3,
        estate4,
        MidType,
      ] = res;

      DataObject.Pow = Pow;
      DataObject.TmrEn = TmrEn;
      DataObject.StTmr = StTmr;
      DataObject.SchEn = SchEn;
      DataObject.StpRic = StpRic;
      DataObject.KpTpEn = KpTpEn;
      DataObject.KpTpTmr = KpTpTmr;
      DataObject.ModeTmr = ModeTmr;
      DataObject.estate = estate;
      DataObject.estate2 = estate2;
      DataObject.Volt = Volt;
      DataObject.estate3 = estate3;
      DataObject.estate4 = estate4;
      DataObject.MidType = MidType;
      if (firFlag || Pow === 1) {
        firFlag = false;
        DataObject.mode = mode;
        DataObject.SchTmr = SchTmr; // TODO: 一分钟误差
        DataObject.Rice = Rice;
        DataObject.Textre = Textre;
      }

      const dataKeys = Object.keys(state.dataObject);
      dataKeys.forEach((item, index) => {
        dataKeys.splice(2 * index + 1, 0, res[index]);
      });
      console.log(`%c轮询数据 => ${JSON.stringify(DataObject)}`, 'color: #007bff; font-size: 14px'); // eslint-disable-line

      if (!state.functype) {
        commit(UPDATE_DATA_OBJECT, DataObject);
      }
      return DataObject;
    })
    .catch(err => err);
}
/**
 * @function sleep
 * @description 暂停进程
 * @param {any} time 需要暂停的时间
 * @returns Promise，等待计时结束进行下一项任务
 */
function sleep(time) {
  return new Promise((resolve, reject) => { // eslint-disable-line
    setTimeout(() => {
      resolve();
    }, time);
  });
}

/**
 * 自定义数据，根据业务更改
 * @param {Object} _dataObject
 */
function customizeDataObject(_dataObject) {
  let dataObject = _dataObject;
  dataObject = useDefaultValue(dataObject); // 由于不同设备，有些设备没有此字段模块回空字符串
  return dataObject;
}


export default {

  /**
   * @description 初始化，并将小卡片传进来的值赋予 state
   */
  async [MQTT_INIT]({ dispatch, state }) {
    try {
      // // 初始化设备数据
      // await dispatch(types.INIT_DEVICE_DATA);
      // // 获取设备信息
      // dispatch(types.GET_DEVICE_INFO);
      // // 查询一包数据
      // dispatch(types.GET_DEVICE_DATA);
      // // 定时轮询 - 获取设备所有状态数据
      // dispatch(types.TIMER_GET_ALL_DEVICE_STATES);
      // // 初始化 原生调用插件的mqtt回调方法
      console.log('mqtt回调--开始');
      if (isMqtt()) {
        console.info('[mqtt] 设备支持 MQTT 协议');
        setMqttStatusCallback(state.mac, data => dispatch(MQTT_CALLBACK, data));
      } else {
        console.warn('[mqtt] 设备不支持 MQTT 协议');
      }
    } catch (e) {
      console.warn(e);
    } finally {
      // 关闭原生加载H5的全屏白底loading
      finishLoad();
    }
  },
     
  /**
   * @description 获取设备信息，并开始轮询设备状态
   * @function GET_DEVICE_INFO
   * @param dispatch vuex异步分发
   * @param commit vuex同步分发
   * @param state vuex store 状态
   */
  async [GET_DEVICE_INFO]({ dispatch, commit, state }) {
    const _res = await getInfo(state.mac)
      .then(res => {
        console.log(res); // eslint-disable-line
        return res;
      })
      .catch(err => {
        err;
      });
    // 防止Android端第一次下载插件fullstatueJson为空值
    if (JSON.parse(_res).fullstatueJson === '') {
      console.log('get fullstatueJson...'); // eslint-disable-line
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
    await getStatusOfDev({state, commit}).then(res => res);
    finishLoad();
    _timer = setInterval(() => {
      getStatusOfDev({state, commit});
    }, 5000);
  },

  /**
   * @description 发送控制指令
   * @function SEND_CTRL
   * @param commit vuex同步分发
   * @param state vuex store 状态
   * @param DataObject state中存储config.xml字段数据的对象
   */
  async [SEND_CTRL]({ state, commit }, DataObject) {
    const keys = Object.keys(DataObject);
    const opt = [];
    const p = [];
    keys.forEach(key => {
      opt.push(key);
      p.push(DataObject[key]);
    });
    const {mac} = state;
    const t = 'cmd';
    const json = JSON.stringify({ mac, t, opt, p });

    // const optArray = Array.splice(opt);
    // optArray.forEach((item, index) => {
    //   optArray.splice(2 * index + 1, 0, p[index]);
    // });
    // console.log(`%c下发数据 => ${json}`, 'color: #dc3545; font-size: 14px'); // eslint-disable-line
    console.log('下发数据:', json);

    // 调用原生方法发送控制命令
    if (!state.functype && !state.isDebug) {
      // 发送指令后暂停接收，过8秒后重启轮询
      clearInterval(_timer);
      _timer = 0;
      setTimeout(() => {
        if (!_timer) {
          _timer = setInterval(() => {
            getStatusOfDev({state, commit});
          }, 5000);
        }
      }, 3000);
      const res = await sendDataToDevice(mac, json, false)
        .then(res => {
          // commit(SET_UNLOCK, false);
          return res;
        })
        .catch(err => err);
      const result = JSON.parse(res);
      const { r } = result;
      const _p = [];
      const {dataObject} = state;
      Object.keys(dataObject).forEach(key => {
        _p.push(dataObject[key]);
      });
      // 成功之后更新主体状态
      r === 200
        && (await updateStates(state.mac, JSON.stringify(_p))
          .then(res => res)
          .catch(err => err));
    }
  },
  /**
   * @description 原生调用插件的mqtt回调方法
   * @param { {data: Object, status: Boolean} } payload data: 设备数据  status: mqtt连接是否可用
   */
  [MQTT_CALLBACK]({ commit }, payload) {
    console.log('...//////////////////');
    let dataObject = {};
    try {
      const res = JSON.parse(payload);
      const { data, status } = res;
      console.log('[mqtt] dataObject:', JSON.stringify(data));
      console.log('[mqtt] status:', status);
      // TODO: 是否要根据 插件字段过滤不必要的属性
      // 自定义数据，根据业务更改
      dataObject = customizeDataObject(data || {});
      // TODO: 是否要加 allowCommit 标志位
      commit(SET_DATA_OBJECT, dataObject);
      console.log('mqtt回调--结束');

      /*
       * 现架构，mqtt服需3分钟以上才能判断设备在线离线，故支持mqtt的设备还需保留原有8秒主动查询逻辑，进行离线在线判断
       * 判断 mqtt 是否可用。不可用的情况：服务器有问题  网络有问题（不能联网的局域网）
       * status 为 false 时 启动定时轮询
       * status 为 true  时 清除定时轮询
       */
      // 先屏蔽消除定时器的逻辑
      /*
      switch (status) {
        case false:
          // 获取设备信息
          dispatch(types.GET_DEVICE_INFO);
          // 查询一包数据
          dispatch(types.GET_DEVICE_DATA);
          // 定时轮询 - 获取设备所有状态数据
          dispatch(types.TIMER_GET_ALL_DEVICE_STATES);
          break;

        case true:
          // 清除定时器
          timer && clearInterval(timer);
          break;

        default:
          break;
      }
      */
    } catch (e) {
      console.error(e);
    }
    return dataObject;
  },

};
