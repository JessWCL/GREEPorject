// 根据实际业务修改
import {
  mapState,
  mapMutations,
  mapActions
} from 'vuex';
import updateStatus from './updateStatus';
import {
  GET_DEVICE_INFO,
  SET_MAC,
  SET_MAINMAC,
  SET_G_MAC,
  SET_DATA_OBJECT,
  IS_SCENE
} from '../../store/types';
import {
  getQueryStringByName
} from '../../utils';
import {
  finishLoad
} from './../../../../static/lib/PluginInterface.promise';

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
  DataObject.ODUViti = parseInt(obj[8], 10);
  DataObject.GasQ = parseInt(obj[9], 10);
  DataObject.InVitiGr = parseInt(obj[10], 10);
  DataObject.InVitiGrCg = parseInt(obj[11], 10);
  DataObject.RunMod = parseInt(obj[12], 10);
  DataObject.ErrType = parseInt(obj[13], 10);
  DataObject.ModS = parseInt(obj[14], 10);
  DataObject.MIdType = parseInt(obj[15], 10);
  DataObject.Inloop = parseInt(obj[16], 10);
  DataObject.IFDtiGr = parseInt(obj[17], 10);
  DataObject.VitiGr = parseInt(obj[18], 10);

  return DataObject;
}

const mixin = {
  mixins: [updateStatus], // 该mixin自定义初始化时检测故障等功能，需更改
  computed: {
    ...mapState({
      mac: state => state.mac
    })
  },
  created() {
    this.init();
  },
  methods: {
    ...mapMutations({
      setMac: SET_MAC,
      setMainMac: SET_MAINMAC,
      setgMac: SET_G_MAC,
      setDataObject: SET_DATA_OBJECT,
      updateIsScene: IS_SCENE
    }),
    ...mapActions({
      getDeviceInfo: GET_DEVICE_INFO
    }),
    /**
     * @description 初始化，并将小卡片传进来的值赋予state
     */
    async init() {
      console.log('--------location.href----------');
      console.log(location.href);

      const mainmac = getQueryStringByName('mainmac');
      const gmac = getQueryStringByName('mac');
      // const mac = gmac + '@' + mainmac;
      const mac = `${gmac}@${mainmac}`;
      const dataArr = getQueryStringByName('data');
      const DataObject = parseData(dataArr);
      const isScene = getQueryStringByName('functype'); // 0 :normal 1: scene
      this.setMac(mac);
      this.setMainMac(mainmac);
      this.setgMac(gmac);
      await this.getDeviceInfo(mac);
      this.setDataObject(DataObject);
      Number(isScene) ? this.updateIsScene(1) : this.updateIsScene(0); // 场景
      finishLoad();
    }
  }
};

export default mixin;