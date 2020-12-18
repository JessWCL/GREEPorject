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
  SET_REPAIR
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
  DataObject.Pow = parseInt(obj[0], 10);
  DataObject.Mod = parseInt(obj[1], 10);
  DataObject.SetTem = parseInt(obj[2], 10);
  DataObject.StHt = parseInt(obj[3], 10);
  DataObject.Add05 = parseInt(obj[4], 10);
  DataObject.WdSpd = parseInt(obj[5], 10);
  DataObject.Tur = parseInt(obj[6], 10);
  DataObject.Quiet = parseInt(obj[7], 10);
  DataObject.SwUpDn = parseInt(obj[8], 10);
  DataObject.SwingLfRig = parseInt(obj[9], 10);
  DataObject.Lig = parseInt(obj[10], 10);
  DataObject.SwhSlp = parseInt(obj[11], 10);
  DataObject.SlpMod = parseInt(obj[12], 10);
  DataObject.AssHt = parseInt(obj[13], 10);
  DataObject.AppTimer = parseInt(obj[14], 10);
  obj[15] !== '' ? (DataObject.UDFanPort = parseInt(obj[15], 10)) : '';
  DataObject.VocCtl = parseInt(obj[16], 10);
  return DataObject;
}

const mixin = {
  mixins: [updateStatus], // 该mixin自定义初始化时检测故障等功能，需更改
  computed: {
    ...mapState({ mac: state => state.mac })
  },
  methods: {
    ...mapMutations({
      setMac: SET_MAC,
      setDataObject: SET_DATA_OBJECT,
      setDeviceData: SET_DEVICE_DATA,
      setFunctype: SET_FUNCTYPE,
      setErrCode: EDIT_ERCODE,
      setEditEnable: EDIT_ENABLE,
      setRepair: SET_REPAIR
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
        this.updateError(mac, ext);
      }
      const dataArr = getQueryStringByName('data');
      const DataObject = parseData(dataArr);
      const functype = getQueryStringByName('functype');
      console.log(`functype: ${functype}`);

      const hasReportedForRepair = getQueryStringByName('hasReportedForRepair');
      hasReportedForRepair === 'true'
        ? this.setRepair(true)
        : this.setRepair(false);
      console.log(DataObject);

      this.setDeviceData(DataObject);
      this.setDataObject(DataObject);
      this.setFunctype(Number(functype)); // 场景
      this.setEditEnable(true);
      this.setMac(mac);
      this.getInfo(mac);
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
      this.$router.push({ name: 'Error' });
      finishLoad();
    }
  }
};

export default mixin;
