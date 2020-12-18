// 根据实际业务修改
import { mapState, mapMutations, mapActions } from 'vuex';
import updateStatus from './updateStatus';
import errorConfig from '../config/error';
import {
  GET_DEVICE_INFO,
  GET_ALL_STATES,
  SET_MAC,
  SET_DATA_OBJECT,
  SET_FUNCTYPE,
  EDIT_ENABLE
} from '../../store/types';
import {
  finishLoad,
  getInfo
} from '../../../../static/lib/PluginInterface.promise'; // 主体接口
import { getQueryStringByName } from '../../utils';

function parseData(data) {
  // 更新state状态，需更改
  const obj = JSON.parse(data);
  const DataObject = {};
  DataObject.Pow = parseInt(obj[0], 10);
  DataObject.mode = parseInt(obj[1], 10);
  DataObject.TmrEn = parseInt(obj[2], 10);
  DataObject.StTmr = parseInt(obj[3], 10);
  DataObject.SchEn = parseInt(obj[4], 10);
  DataObject.SchTmr = parseInt(obj[5], 10);
  DataObject.Rice = parseInt(obj[6], 10);
  DataObject.Textre = parseInt(obj[7], 10);
  DataObject.StpRic = parseInt(obj[8], 10);
  DataObject.KpTpEn = parseInt(obj[9], 10);
  DataObject.KpTpTmr = parseInt(obj[10], 10);
  DataObject.Runlight = parseInt(obj[11], 10);
  DataObject.estate = parseInt(obj[12], 10);
  DataObject.estate2 = parseInt(obj[13], 10);
  DataObject.estate3 = parseInt(obj[14], 10);
  DataObject.estate4 = parseInt(obj[15], 10);
  return DataObject;
}

const mixin = {
  mixins: [updateStatus, errorConfig], // 该mixin自定义初始化时检测故障等功能，需更改
  created() {
    const dataArr = getQueryStringByName('data');
    const DataObject = parseData(dataArr);
    console.log('created', DataObject);
    this.setDataObject(DataObject);
  },
  computed: {
    ...mapState({ mac: state => state.mac })
  },
  methods: {
    ...mapMutations({
      setMac: SET_MAC,
      setDataObject: SET_DATA_OBJECT,
      setFunctype: SET_FUNCTYPE,
      setEditEnable: EDIT_ENABLE
    }),
    ...mapActions({ getInfo: GET_DEVICE_INFO, getAllStates: GET_ALL_STATES }),
    /**
     * @description 初始化，并将小卡片传进来的值赋予state，请勿修改
     */
    init() {
      const mac = getQueryStringByName('mac');
      const ext = getQueryStringByName('ext');
      if (ext) {
        this.updateError(mac, ext);
      } else {
        const dataArr = getQueryStringByName('data');
        const DataObject = parseData(dataArr);
        const functype = getQueryStringByName('functype');
        this.setDataObject(DataObject);
        this.setFunctype(Number(functype)); // 场景
        this.setEditEnable(true);
        this.setMac(mac);
        this.getInfo(mac);
      }
    },
    /**
     * @description 从消息里进入故障页面时更新相关故障信息
     * @param {any} mac
     * @param {any} ext
     */
    updateError(mac, ext) {
      getInfo(mac)
        .then(res => {
          const deviceInfo = JSON.parse(res);
          deviceInfo.deviceState = 2;
          this.setDeviceInfo(deviceInfo);
          return res;
        })
        .catch(err => {
          return err;
        });
      const errorObject = JSON.parse(ext);
      const errorCode = errorObject.data.code;
      for (let i = 0; i < 8; i += 1) {
        for (let j = 0; j < 4; j += 1) {
          if (
            this[`errorList_${j}`][i] &&
            this[`errorList_${j}`][i].code === errorCode
          ) {
            this.setDataObject({
              [`estate${j === 0 ? '' : j + 1}`]: this[`errorList_${j}`][i]
                .itemId
            });
          }
        }
      }
      this.setEditEnable(false);
      finishLoad();
    }
  }
};

export default mixin;
