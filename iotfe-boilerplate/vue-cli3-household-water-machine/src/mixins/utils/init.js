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
  console.log(data);
  // const obj = JSON.parse(data.split(',[null]')[0] +']');
  const obj = JSON.parse(data);
  const DataObject = {};
  DataObject.Pow = parseInt(obj[0], 10);
  DataObject.Mod = parseInt(obj[1], 10);
  // DataObject.SetTem = parseInt(obj[2], 10);
  DataObject.HeWatOutTemSet = parseInt(obj[2], 10);
  DataObject.HeWatOutTemSetFloor = parseInt(obj[3], 10);
  DataObject.CoWatOutTemSet = parseInt(obj[4], 10);
  DataObject.Quiet = parseInt(obj[5], 10);
  DataObject.LefHom = parseInt(obj[6], 10);
  DataObject.SvSt = parseInt(obj[7], 10);
  DataObject.EnvironmentTem = parseInt(obj[8], 10);
  DataObject.AirInTem = parseInt(obj[9], 10);
  DataObject.AirOutTem = parseInt(obj[10], 10);
  DataObject.DefrostTem = parseInt(obj[11], 10);
  DataObject.AllInWatTem = parseInt(obj[12], 10);
  DataObject.AllOutWatTem = parseInt(obj[13], 10);
  DataObject.AntifreezeTem = parseInt(obj[14], 10);
  DataObject.CodeCoalGasTem = parseInt(obj[15], 10);
  DataObject.CodeCoalLiquidTem = parseInt(obj[15], 10);
  DataObject.HighPressureTem = parseInt(obj[17], 10);
  DataObject.AllErr = parseInt(obj[18], 10);
  DataObject.FloorHeat = parseInt(obj[19], 10);
  DataObject.TemUn = parseInt(obj[20], 10);

  return DataObject;
}

const mixin = {
  mixins: [updateStatus], // 该mixin自定义初始化时检测故障等功能，需更改
  computed: {
    ...mapState({ mac: state => state.mac })
  },
  created() {
    this.init();
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
