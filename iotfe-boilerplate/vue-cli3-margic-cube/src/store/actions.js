import {
  GET_DEVICE_INFO,
  GET_ALL_STATES,
  SET_DEVICE_INFO,
  SET_DATA_OBJECT,
  SEND_CTRL,
  SET_STATE
} from './types';
import {
  sendDataToDevice,
  getInfo,
  finishLoad,
} from '../../../static/lib/PluginInterface.promise'; // 主体接口

let _timer = 0; // 轮询定时器

function getDeviceInfo({state, commit}) {
  return getInfo(state.mac)
    .then(res => {
      console.log('-----getDeviceInfo-----');
      console.log(res);
      const deviceInfo = JSON.parse(res);
      commit(SET_DEVICE_INFO, deviceInfo);
      return res;
    })
    .catch(err => {
      err;
    });
}

function getStatusOfDev({ state, commit }) {
  sendDataToDevice(state.mac, '{"t": "BLEStatus"}', false)
    .then(_res => {
      if (_res === '' || _res === '[]') {
        console.log('获取数据失败');
        return false;
      }
      const res = JSON.parse(_res);
      console.log('----getStatusOfDev----');
      console.log(res);
      commit(SET_DATA_OBJECT, res);
      return true;
    })
    .catch(err => {
      console.log(err);
    });
}

export default {
  async [GET_DEVICE_INFO]({ dispatch, commit, state }) {
    await getDeviceInfo({state, commit});
    dispatch(GET_ALL_STATES);
  },
  async [GET_ALL_STATES]({ state, commit }) {
    await getStatusOfDev({state, commit});
    await getDeviceInfo({state, commit});
    setTimeout(() => {
      commit(SET_STATE, ['finishLoad', true]);
      finishLoad();
    }, 0);
    if (_timer === 0) {
      _timer = setInterval(() => {
        getDeviceInfo({state, commit});
        getStatusOfDev({state, commit});
      }, 5000);
    }
  },
  async [SEND_CTRL]({ state, commit }, DataObject) {
    if (Object.keys(DataObject).length !== 0) {
      const keys = Object.keys(DataObject);
      const opt = [];
      const p = [];
      const mac = state.mac;
      const t = 'BLECmd';
      keys.forEach(key => {
        opt.push(key);
        p.push(DataObject[key]);
      });
      const json = JSON.stringify({ t, opt, p });
      console.log(json);
      await sendDataToDevice(mac, json, false)
        .then(res => {
          clearInterval(_timer);
          _timer = 0;
          setTimeout(() => {
            if (!_timer) {
              _timer = setInterval(() => {
                getDeviceInfo({state, commit});
                getStatusOfDev({state, commit});
              }, 5000);
            }
          }, 3000);
          return res;
        })
        .catch(err => err);
    }
  },
};
