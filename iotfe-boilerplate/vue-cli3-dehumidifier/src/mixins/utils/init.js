// 根据实际业务修改
import { mapState, mapMutations, mapActions } from 'vuex';
import {
  GET_DEVICE_INFO,
  GET_ALL_STATES,
  SET_MAC,
  SET_DATA_OBJECT,
  SET_DEVICE_DATA,
  SET_FUNCTYPE,
  EDIT_ERCODE,
  EDIT_ENABLE,
  SET_INIT_STATUS
} from '@/store/types';
import { getQueryStringByName } from '@/utils';
import updateStatus from './updateStatus';
import {
  finishLoad,
  getInfo
} from '../../../../static/lib/PluginInterface.promise'; // 主体接口

function parseData(data) {
  // 更新state状态，需更改
  const obj = JSON.parse(data);
  console.log(obj);

  const DataObject = {};
  if (window.VUE_APP_MID === '13805') {
    DataObject.Pow = parseInt(obj[0], 10);
    DataObject.Dmod = parseInt(obj[1], 10);
    DataObject.Dwet = parseInt(obj[2], 10);
    DataObject.WdSpd = parseInt(obj[3], 10);
    DataObject.Dfltr = parseInt(obj[4], 10);
    DataObject.DwatFul = parseInt(obj[5], 10);
    DataObject.Lig = parseInt(obj[6], 10);
    DataObject.SwUpDn = parseInt(obj[7], 10);
    DataObject.Health = parseInt(obj[8], 10);
    DataObject.Quiet = parseInt(obj[9], 10);
    DataObject.PM2P5 = parseInt(obj[10], 10);
    DataObject.airQlt = parseInt(obj[11], 10);
    DataObject.DwatSen = parseInt(obj[12], 10);
    DataObject.ChildLock = parseInt(obj[13], 10);
    DataObject.AppTimer = parseInt(obj[14], 10);
    DataObject.AllErr = parseInt(obj[15], 10);
  } else {
    DataObject.Pow = parseInt(obj[0], 10);
    DataObject.Dwet = parseInt(obj[1], 10);
    DataObject.DwatSen = parseInt(obj[2], 10);
    DataObject.Dmod = parseInt(obj[3], 10);
    DataObject.WdSpd = parseInt(obj[4], 10);
    if (DataObject.WdSpd === 1) DataObject.WdSpd = 0;
    if (DataObject.WdSpd === 3) DataObject.WdSpd = 1;
    DataObject.Dfltr = parseInt(obj[5], 10);
    DataObject.DwatFul = parseInt(obj[6], 10);
    DataObject.AllErr = parseInt(obj[7], 10);
    DataObject.TemSen = parseInt(obj[8], 10);
    DataObject.Health = parseInt(obj[9], 10);
    DataObject.AppTimer = parseInt(obj[10], 10);
  }
  console.log(JSON.stringify(DataObject));
  return DataObject;
}

const mixin = {
  mixins: [updateStatus], // 该mixin自定义初始化时检测故障等功能，需更改
  computed: {
    ...mapState({
      mac: state => state.mac,
      lang: state => state.deviceInfo.lang,
    })
  },
  watch: {
    lang: {
      handler(val) {
        if (!val) {
          return;
        }
        console.log(val);
        let lang = val.toLowerCase();
        if (lang.indexOf('zh') !== -1) {
          if (lang.indexOf('tw') !== -1 || lang.indexOf('hk') !== -1) {
            this.$options.i18n.locale = 'hant';
          } else {
            this.$options.i18n.locale = 'zh_CN';
          }
        } else if (lang.indexOf('hant') !== -1) {
          this.$options.i18n.locale = 'hant';
        } else {
          this.$options.i18n.locale = 'en';
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations({
      setMac: SET_MAC,
      setDataObject: SET_DATA_OBJECT,
      setDeviceData: SET_DEVICE_DATA,
      setFunctype: SET_FUNCTYPE,
      setErrCode: EDIT_ERCODE,
      setEditEnable: EDIT_ENABLE,
      setInitStatus: SET_INIT_STATUS
    }),
    ...mapActions({ getInfo: GET_DEVICE_INFO, getAllStates: GET_ALL_STATES }),
    /**
     * @description 初始化，并将小卡片传进来的值赋予state，请勿修改
     */
    init() {
      const mac = getQueryStringByName('mac');
      const ext = getQueryStringByName('ext');
      console.log(`mac: ${mac} === ext: ${ext}`);

      if (ext) {
        this.setInitStatus(true);
        this.updateError(mac, ext);
      }
      const dataArr = getQueryStringByName('data');
      let DataObject;
      if (dataArr) {
        DataObject = parseData(dataArr);
      }
      const functype = getQueryStringByName('functype');
      console.log(`functype: ${functype}`);

      if (DataObject) {
        console.log('init.js', DataObject);
        this.setDeviceData(DataObject);
        this.setDataObject(DataObject);
      }
      this.setFunctype(Number(functype)); // 场景
      this.setEditEnable(true);
      this.setMac(mac);
      this.getInfo(mac);
      setTimeout(() => {
        this.setInitStatus(true);
      }, 200);
    },
    /**
     * @description 从消息里进入故障页面时更新相关故障信息
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
      this.setErrCode(errorCode);
      this.setEditEnable(false);
      finishLoad();
    }
  }
};

export default mixin;
