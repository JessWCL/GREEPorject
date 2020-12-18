// 根据实际业务修改
import { mapState, mapMutations, mapActions } from 'vuex';
import updateStatus from './updateStatus';
import {
  GET_DEVICE_INFO,
  SET_MAC,
  SET_DATA_OBJECT,
  IS_SCENE,
} from '../../store/types';
import { getQueryStringByName } from '../../utils';
import { finishLoad } from './../../../../static/lib/PluginInterface.promise';

function parseData(data) {
  // 更新state状态，需更改
  const obj = JSON.parse(data);
  const DataObject = {};
  DataObject.Pow = parseInt(obj[0], 10);
  DataObject.FanMod = parseInt(obj[1], 10);
  DataObject.WdSpd = parseInt(obj[2], 10);
  DataObject.PctCle = parseInt(obj[3], 10);
  DataObject.VitiGr = parseInt(obj[4], 10);
  DataObject.PctRe = parseInt(obj[5], 10);
  DataObject.GetEr = parseInt(obj[6], 10);
  DataObject.IDUAirQu = parseInt(obj[7], 10);
  DataObject.AirQu = parseInt(obj[8], 10);
  DataObject.TemSor = parseInt(obj[9], 10);
  DataObject.HumSor = parseInt(obj[10], 10);
  DataObject.PM2P5 = parseInt(obj[11], 10);
  DataObject.VOC = parseInt(obj[12], 10);
  DataObject.CO2 = parseInt(obj[13], 10);
  DataObject.HCHO = parseInt(obj[14], 10);
  DataObject.PM2P5EN = parseInt(obj[15], 10);
  DataObject.HCHOEN = parseInt(obj[16], 10);
  DataObject.ODUViti = parseInt(obj[17], 10);
  DataObject.InVitiGr = parseInt(obj[18], 10);
  DataObject.InVitiGrCg = parseInt(obj[19], 10);
  DataObject.InEffClRes = parseInt(obj[20], 10);
  DataObject.InEffReRes = parseInt(obj[21], 10);
  DataObject.IFDClRes = parseInt(obj[22], 10);
  DataObject.EffReRes = parseInt(obj[23], 10);
  DataObject.RunMod = parseInt(obj[24], 10);
  DataObject.ErrType = parseInt(obj[25], 10);
  DataObject.ModS = parseInt(obj[26], 10);
  DataObject.MdVitiGr = parseInt(obj[27], 10);
  DataObject.MIdType = parseInt(obj[28], 10);
  DataObject.Inloop = parseInt(obj[29], 10);
  DataObject.InloopEN = parseInt(obj[30], 10);
  DataObject.SorSet = parseInt(obj[31], 10);

  return DataObject;
}

const mixin = {
  mixins: [updateStatus], // 该mixin自定义初始化时检测故障等功能，需更改
  computed: {
    ...mapState({ mac: state => state.mac }),
  },
  created() {
    this.init();
  },
  methods: {
    ...mapMutations({
      setMac: SET_MAC,
      setDataObject: SET_DATA_OBJECT,
      updateIsScene: IS_SCENE,
    }),
    ...mapActions({ getDeviceInfo: GET_DEVICE_INFO }),
    /**
     * @description 初始化，并将小卡片传进来的值赋予state
     */
    init() {
      const gmac = getQueryStringByName('mac');
      const dataArr = getQueryStringByName('data');
      const DataObject = parseData(dataArr);
      const isScene = getQueryStringByName('functype'); // 0 :normal 1: scene
      this.setMac(gmac);
      this.getDeviceInfo(gmac);
      this.setDataObject(DataObject);
      Number(isScene) ? this.updateIsScene(1) : this.updateIsScene(0); // 场景
      finishLoad();
    },
  },
};

export default mixin;
