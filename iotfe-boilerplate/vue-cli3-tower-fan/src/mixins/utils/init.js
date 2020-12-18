// 根据实际业务修改
import {
  mapState,
  mapMutations,
  mapActions
} from 'vuex';
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
import {
  getQueryStringByName
} from '@/utils';
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
  if (window.VUE_APP_MID === '828211') {
    DataObject.Pow = parseInt(obj[0], 10);
    DataObject.Rotate = parseInt(obj[1], 10);
    DataObject.LRAngle = parseInt(obj[2], 10);
    DataObject.Mod = parseInt(obj[3], 10);
    DataObject.WdSpd = parseInt(obj[4], 10);
    DataObject.TmrOn = parseInt(obj[5], 10);
    DataObject.TmrAction = parseInt(obj[6], 10);
    DataObject.TmrHour = parseInt(obj[7], 10);
    DataObject.TmrMin = parseInt(obj[8], 10);
    DataObject.estate = parseInt(obj[9], 10);
    DataObject.JFerr = parseInt(obj[10], 10);
  } else if (window.VUE_APP_MID === '828213') {
    DataObject.Pow = parseInt(obj[0], 10);
    DataObject.Rotate = parseInt(obj[1], 10);
    DataObject.Anion = parseInt(obj[2], 10);
    DataObject.Mod = parseInt(obj[3], 10);
    DataObject.WdSpd = parseInt(obj[4], 10);
    DataObject.TmrOn = parseInt(obj[5], 10);
    DataObject.TmrAction = parseInt(obj[6], 10);
    DataObject.TmrHour = parseInt(obj[7], 10);
    DataObject.TmrMin = parseInt(obj[8], 10);
    DataObject.estate1 = parseInt(obj[9], 10);
    DataObject.JFerr = parseInt(obj[10], 10);
  }
  
  return DataObject;
}

const mixin = {
  mixins: [updateStatus], // 该mixin自定义初始化时检测故障等功能，需更改
  computed: {
    ...mapState({
      mac: state => state.mac
    })
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
    ...mapActions({
      getInfo: GET_DEVICE_INFO,
      getAllStates: GET_ALL_STATES
    }),
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
        return;
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
      finishLoad();//暂定
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
      const estateList = [
        {
          code: 'H0',
          val: 1,
          type: 'estate'
        },
        {
          code: 'H8',
          val: 64,
          type: 'estate1'
        },
        {
          code: 'H1',
          val: 1,
          type: 'JFerr'
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
      this.setEditEnable(false);
      finishLoad();
    }
  }
};

export default mixin;
