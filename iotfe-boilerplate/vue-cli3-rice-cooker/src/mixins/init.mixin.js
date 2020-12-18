import { mapState, mapMutations, mapActions } from 'vuex';
import { initStatusMixin } from './function-change-device.mixin';
import {
  SET_MAC,
  GET_DEVICE_INFO,
  SET_DATA_OBJECT,
  GET_ALL_STATES,
  SET_MODE_LIST,
  SET_FUNCTYPE,
  SET_NOTIFY,
  EDIT_ENABLE,
  MQTT_INIT,
} from '../store/types';
import { finishLoad, getInfo } from '../../../static/lib/PluginInterface.promise';
import modeList from '../plugins/midtype';
import errorConfig from './error-config.mixin';

function parseData(data) {
  const obj = JSON.parse(data);
  const DataObject = {};
  DataObject.Pow = parseInt(obj[0], 10); // 工作状态
  DataObject.mode = parseInt(obj[1], 10); // 功能模式
  DataObject.TmrEn = parseInt(obj[2], 10); // 定时使能
  DataObject.StTmr = parseInt(obj[3], 10); // 定时时间
  DataObject.SchEn = parseInt(obj[4], 10); // 预约使能
  DataObject.SchTmr = parseInt(obj[5], 10); // 预约时间
  DataObject.Rice = parseInt(obj[6], 10); // 米种
  DataObject.Textre = parseInt(obj[7], 10); // 口感
  DataObject.StpRic = parseInt(obj[8], 10); // 煮饭阶段
  DataObject.KpTpEn = parseInt(obj[9], 10); // 保温使能
  DataObject.KpTpTmr = parseInt(obj[10], 10); // 保温时间
  DataObject.ModeTmr = parseInt(obj[11], 10); // 定时总时间
  DataObject.estate = parseInt(obj[12], 10); // 故障代码
  DataObject.estate2 = parseInt(obj[13], 10); // 故障代码
  DataObject.Volt = parseInt(obj[14], 10); // 电源电压
  DataObject.estate3 = parseInt(obj[15], 10); // 故障代码
  DataObject.estate4 = parseInt(obj[16], 10); // 故障代码
  DataObject.MidType = parseInt(obj[17], 10); // 机型细分码
  // eslint-disable-next-line no-console
  console.log(DataObject);
  return DataObject;
}

const mixin = {
  mixins: [initStatusMixin, errorConfig],
  created() {
    this.init();
  },
  computed: {
    ...mapState({ mac: state => state.mac })
  },
  mounted() {
    finishLoad();
  },
  methods: {
    ...mapMutations({
      setMac: SET_MAC,
      setDataObject: SET_DATA_OBJECT,
      setModeList: SET_MODE_LIST,
      setFunctype: SET_FUNCTYPE,
      setNotify: SET_NOTIFY,
      setEditEnable: EDIT_ENABLE
    }),
    ...mapActions({ getInfo: GET_DEVICE_INFO, getAllStates: GET_ALL_STATES, mqttInit: MQTT_INIT }),
    /**
     * @method init
     * @description 初始化函数
     */
    init() {
      const mac = this.$getQueryStringByName('mac');
      const ext = this.$getQueryStringByName('ext');
      if (ext) {
        this.updateError(mac, ext);
      } else {
        const dataArr = this.$getQueryStringByName('data');
        const DataObject = parseData(dataArr);
        const functype = this.$getQueryStringByName('functype');
        console.log('init===========v3.1--build--1================>'); // eslint-disable-line
        console.log(DataObject); // eslint-disable-line
        this.setMac(mac);
        this.getInfo(mac);
        this.setDataObject(DataObject);
        // 根据不同的设备加载不同的按钮
        this.setModeList({ modeList: modeList.default });
        this.setFunctype(Number(functype)); // 场景
        this.mqttInit();
      }
    },
    /**
     * @function updateError
     * @description 从消息里进入故障页面时更新相关故障信息, 复用故障页面
     * @param {any} mac
     * @param {any} ext
     */
    updateError(mac, ext) {
      getInfo(mac)
        .then(res => {
          const deviceInfo = JSON.parse(res);
          deviceInfo.deviceState = 2; // 手动设置在线
          this.setDeviceInfo(deviceInfo); // 更新设备名称等信息
          return res;
        })
        .catch(err => {
          return err;
        });
      const errorObject = JSON.parse(ext);
      const errorCode = errorObject.data.code; // 提取故障信息
      console.log(ext); // eslint-disable-line
      for (let i = 0; i < 8; i += 1) {
        for (let j = 0; j < 4; j += 1) {
          if (this[`errorList_${j}`][i] && this[`errorList_${j}`][i].code === errorCode) {
            this.setDataObject({
              [`estate${j === 0 ? '' : j + 1}`]: this[`errorList_${j}`][i].itemId
            });
          }
        }
      }
      this.setEditEnable(false); // 禁止进入“更多”，防止在消息界面解绑设备
      finishLoad();
    }
  }
};

export default mixin;
