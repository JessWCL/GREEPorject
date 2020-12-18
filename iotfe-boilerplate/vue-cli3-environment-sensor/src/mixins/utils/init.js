// 根据实际业务修改
import { mapState, mapMutations, mapActions } from 'vuex';
import updateStatus from './updateStatus';
import {
  GET_DEVICE_INFO,
  SET_MAC,
  SET_DATA_OBJECT,
  IS_SCENE
} from '../../store/types';
import { getQueryStringByName } from '../../utils';

function parseData(data) {
  // 更新state状态，需更改
  const obj = JSON.parse(data);
  const DataObject = {};
  DataObject.Pow = parseInt(obj[0], 10);
  DataObject.LigPow = parseInt(obj[1], 10);
  DataObject.ScrTime = parseInt(obj[2], 10);
  DataObject.AutoCtr = parseInt(obj[3], 10);
  DataObject.TemSor = parseInt(obj[4], 10);
  DataObject.HumSor = parseInt(obj[5], 10);
  DataObject.HCHO = parseInt(obj[6], 10);
  DataObject.PM2P5 = parseInt(obj[7], 10);
  DataObject.CO2 = parseInt(obj[8], 10);
  DataObject.InAirQuality = parseInt(obj[9], 10);
  DataObject.SensorErr = parseInt(obj[10], 10);
  DataObject.BatteryWarn = parseInt(obj[11], 10);
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
      updateIsScene: IS_SCENE
    }),
    ...mapActions({ getDeviceInfo: GET_DEVICE_INFO }),
    /**
     * @description 初始化，并将小卡片传进来的值赋予state
     */
    init() {
      const mac = getQueryStringByName('mac');
      const dataArr = getQueryStringByName('data');
      console.log(`mac: ${mac}`);

      const DataObject = parseData(dataArr);
      console.log(DataObject);

      const isScene = getQueryStringByName('functype');
      console.log(`functype: ${isScene}`);

      this.setMac(mac);
      this.getDeviceInfo(mac);
      this.setDataObject(DataObject);
      Number(isScene) ? this.updateIsScene(1) : this.updateIsScene(0); // 场景
    }
  }
};

export default mixin;
