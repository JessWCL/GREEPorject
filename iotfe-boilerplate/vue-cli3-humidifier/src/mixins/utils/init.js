// 根据实际业务修改
import { mapState, mapMutations, mapActions } from 'vuex';
import updateStatus from './updateStatus';
import {
  GET_DEVICE_INFO,
  SET_MAC,
  SET_DATA_OBJECT,
  SET_FUNCTYPE,
  SET_INIT_STATUS,
} from '../../store/types';
import { getQueryStringByName } from '../../utils';
import { finishLoad, getInfo } from '../../../../static/lib/PluginInterface.promise';
import router from '../../router';

function parseData(data) {
  // 更新state状态，需更改
  const obj = JSON.parse(data);
  const DataObject = {};
  if (window._mid === '828501') {
    DataObject.Pow = parseInt(obj[0], 10);
    DataObject.FogLevel = parseInt(obj[1], 10);
    DataObject.mode = parseInt(obj[2], 10);
    DataObject.UVLight = parseInt(obj[3], 10);
    DataObject.WaterTankLight = parseInt(obj[4], 10);
    DataObject.TmrHour = parseInt(obj[5], 10);
    DataObject.TmrMin = parseInt(obj[6], 10);
    DataObject.TmrOn = parseInt(obj[7], 10);
    DataObject.TmrAction = parseInt(obj[8], 10);
    DataObject.estate1 = parseInt(obj[9], 10);
  } else if (window._mid === '828502') {
    DataObject.Pow = parseInt(obj[0], 10);
    DataObject.Mode = parseInt(obj[1], 10);
    DataObject.FogLevel = parseInt(obj[2], 10);
    DataObject.WaterTankLight = parseInt(obj[3], 10);
    DataObject.Humidity = parseInt(obj[4], 10);
    DataObject.Estate1 = parseInt(obj[5], 10);
    DataObject.Estate2 = parseInt(obj[6], 10);
    DataObject.Estate3 = parseInt(obj[7], 10);
    DataObject.MidType = parseInt(obj[8], 10);
  } else {
    DataObject.Pow = parseInt(obj[0], 10);
    DataObject.Mode = parseInt(obj[1], 10);
    DataObject.FogLevel = parseInt(obj[2], 10);
    DataObject.Humidity = parseInt(obj[3], 10);
    DataObject.HumiditySet = parseInt(obj[4], 10);
    DataObject.Sleep = parseInt(obj[5], 10);
    DataObject.Estate1 = parseInt(obj[6], 10);
    DataObject.Estate2 = parseInt(obj[7], 10);
    DataObject.Jferr = parseInt(obj[8], 10);
    DataObject.MidType = parseInt(obj[9], 10);
    DataObject.TmrHour = parseInt(obj[10], 10);
    DataObject.TmrMin = parseInt(obj[11], 10);
    DataObject.TmrOn = parseInt(obj[12], 10);
    DataObject.TmrAction = parseInt(obj[13], 10);
    DataObject.UV = parseInt(obj[14], 10);
  }
  
  return DataObject;
}

const mixin = {
  mixins: [updateStatus], // 该mixin自定义初始化时检测故障等功能，需更改
  computed: {
    ...mapState({ 
      mac: state => state.mac,
      lang: state => state.deviceInfo.lang
    })
  },
  watch: {
    lang: {
      handler(val) {
        if (!val) {
          return;
        }
        console.log(val);
        if (val.toLowerCase().indexOf('zh') !== -1) {
          this.$options.i18n.locale = 'zh_CN';
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
      setFunctype: SET_FUNCTYPE,
      setInitStatus: SET_INIT_STATUS,
    }),
    ...mapActions({ getInfo: GET_DEVICE_INFO }),
    /**
     * @description 初始化，并将小卡片传进来的值赋予state
     */
    init() {
      const mac = getQueryStringByName('mac');
      const dataArr = getQueryStringByName('data');
      const ext = getQueryStringByName('ext');
      console.log('mac', mac);
      console.log('data', dataArr);
      console.log(location.href);
      if (ext) {
        this.setInitStatus(true);
        this.updateError(mac, ext);
        return;
      }
      if (dataArr) {
        const DataObject = parseData(dataArr);
        this.setDataObject(DataObject);
      }
      const functype = getQueryStringByName('functype'); // 0 :normal 1: scene
      this.setFunctype(Number(functype));// 场景
      this.setMac(mac);
      this.getInfo(mac);
      setTimeout(() => {
        this.setInitStatus(true);
      }, 200);
      
      console.log('init end');
    },
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
      const estateList = [
        {
          code: 'F0',
          val: 16,
          type: 'Estate1'
        },
        {
          code: 'F1',
          val: 8,
          type: 'Estate1'
        },
        {
          code: 'E3',
          val: 128,
          type: 'Estate2'
        },
        {
          code: 'H1',
          val: 1,
          type: 'Estate3'
        }
      ];
      const estate = {};
      let isErrorExisted = false;
      estateList.forEach(x => {
        if (x.code === errorCode) {
          estate[x.type] = x.val;
          isErrorExisted = true;
        }
      });
      isErrorExisted && this.setDataObject(estate);
      this.$router.push('/Error');
      finishLoad();
    }
  }
};

export default mixin;
