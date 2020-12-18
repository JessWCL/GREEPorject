// 根据实际业务修改
import { mapState, mapMutations, mapActions } from 'vuex';
import {
  GET_DEVICE_INFO,
  SET_MAC,
  SET_MAINMAC,
  SET_DATA_OBJECT,
  IS_SCENE,
  SET_G_MAC,
} from '@/store/types';
import { getQueryStringByName } from '../../utils';
import updateStatus from './updateStatus';

function parseData(data) {
  // 更新state状态，需更改
  const obj = JSON.parse(data);
  console.log(obj);

  const DataObject = {};
  DataObject.Pow = parseInt(obj[0], 10);
  DataObject.Mod = parseInt(obj[1], 10);
  DataObject.SetTem = parseInt(obj[2], 10);
  DataObject.WdSpd = parseInt(obj[3], 10);
  DataObject.Quiet = parseInt(obj[4], 10);
  DataObject.Blo = parseInt(obj[5], 10);
  DataObject.SvSt = parseInt(obj[6], 10);
  DataObject.Air = parseInt(obj[7], 10);
  DataObject.CoolSvStTemMin = parseInt(obj[8], 10);
  DataObject.HeatSvStTemMax = parseInt(obj[9], 10);
  DataObject.SetCoolHumi = parseInt(obj[10], 10);
  DataObject.SwhSlp = parseInt(obj[11], 10);
  DataObject.AidHeat = parseInt(obj[12], 10);
  DataObject.SetDeciTem = parseInt(obj[13], 10);
  DataObject.GetEr = parseInt(obj[14], 10);
  DataObject.MasSub = parseInt(obj[15], 10);
  DataObject.SysSta = parseInt(obj[16], 10);

  return DataObject;
}

const mixin = {
  mixins: [updateStatus], // 该mixin自定义初始化时检测故障等功能，需更改
  computed: {
    ...mapState({ mac: state => state.mac }),
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapMutations({
      setMac: SET_MAC,
      setMainMac: SET_MAINMAC,
      setgMac: SET_G_MAC,
      setDataObject: SET_DATA_OBJECT,
      updateIsScene: IS_SCENE,
    }),
    ...mapActions({
      getDeviceInfo: GET_DEVICE_INFO,
    }),
    /**
     * @description 初始化，并将小卡片传进来的值赋予state
     */
    init() {
      const mainmac = getQueryStringByName('mainmac');
      const gmac = getQueryStringByName('mac');
      // const mac = getQueryStringByName('mac');
      const mac = `${gmac}@${mainmac}`;
      console.log(`mac: ${mac}`);

      const isScene = getQueryStringByName('functype');
      console.log(`functype: ${isScene}`);
      const dataArr = getQueryStringByName('data');
      console.log(`初始化拿到的url值${dataArr}`);
      const DataObject = parseData(dataArr);
      if ((DataObject.Mod === 11) & isScene) {
        // 场景不能设置外出，强行改变成制冷
        DataObject.Mod = 1;
      }
      this.setDataObject(DataObject);
      this.setMac(mac);
      this.setMainMac(mainmac);
      this.setgMac(gmac);
      this.getDeviceInfo(mac);
      Number(isScene) ? this.updateIsScene(1) : this.updateIsScene(0); // 场景
    },
  },
};

export default mixin;
