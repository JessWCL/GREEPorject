// 根据实际业务修改
import { mapState, mapMutations, mapActions } from 'vuex';
import {
  GET_DEVICE_INFO,
  SET_MAC,
  SET_G_MAC,
  SET_DATA_OBJECT,
  IS_SCENE,
} from '@/store/types';
import { getQueryStringByName } from '@/utils';
import updateStatus from './updateStatus';

function parseData(data) {
  // 更新state状态，需更改
  const obj = data === '' ? [] : JSON.parse(data);
  console.log(obj);

  const DataObject = {};
  DataObject.Pow = parseInt(obj[0], 10) ? parseInt(obj[0], 10) : 0;
  DataObject.Mod = parseInt(obj[1], 10) ? parseInt(obj[1], 10) : 1;
  DataObject.StTem = parseInt(obj[2], 10) ? parseInt(obj[2], 10) : 0;
  DataObject.WdSpd = parseInt(obj[3], 10) ? parseInt(obj[3], 10) : 0;
  DataObject.Dry = parseInt(obj[4], 10) ? parseInt(obj[4], 10) : 0;
  DataObject.EnSvSt = parseInt(obj[5], 10) ? parseInt(obj[5], 10) : 0;
  DataObject.StFahFlg = parseInt(obj[6], 10) ? parseInt(obj[6], 10) : 0;
  DataObject.ColdMod = parseInt(obj[7], 10) ? parseInt(obj[7], 10) : 0;
  DataObject.HeatSvStTemMax = parseInt(obj[8], 10) ? parseInt(obj[8], 10) : 0;
  DataObject.CoolSvStTemMin = parseInt(obj[9], 10) ? parseInt(obj[9], 10) : 0;
  DataObject.Dred = parseInt(obj[10], 10) ? parseInt(obj[10], 10) : 0;
  DataObject.AppTimer = parseInt(obj[11], 10) ? parseInt(obj[11], 10) : 0;
  DataObject.TemUnit = parseInt(obj[12], 10) ? parseInt(obj[12], 10) : 0;
  DataObject.IndoorType = parseInt(obj[13], 10) ? parseInt(obj[13], 10) : 0;
  DataObject.OMod = parseInt(obj[14], 10) ? parseInt(obj[14], 10) : 0;
  DataObject.LowDeHumi = parseInt(obj[15], 10) ? parseInt(obj[15], 10) : 0;
  DataObject.Quier = parseInt(obj[16], 10) ? parseInt(obj[16], 10) : 0;
  DataObject.RmType = parseInt(obj[17], 10) ? parseInt(obj[17], 10) : 0;
  DataObject.RmNum = parseInt(obj[18], 10) ? parseInt(obj[18], 10) : 0;
  DataObject.VavleAllOn = parseInt(obj[19], 10) ? parseInt(obj[19], 10) : 0;
  DataObject.CSvStTemMinFlg = parseInt(obj[20], 10) ? parseInt(obj[20], 10) : 0;
  DataObject.HSvStTemMaxFlg = parseInt(obj[21], 10) ? parseInt(obj[21], 10) : 0;
  return DataObject;
}

const mixin = {
  mixins: [updateStatus], // 该mixin自定义初始化时检测故障等功能，需更改
  computed: {
    ...mapState({
      mac: state => state.mac,
    }),
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapMutations({
      setMac: SET_MAC,
      setgMac: SET_G_MAC,
      setDataObject: SET_DATA_OBJECT,
      setFunctype: IS_SCENE,
    }),
    ...mapActions({ getInfo: GET_DEVICE_INFO }),
    /**
     * @description 初始化，并将小卡片传进来的值赋予state，请勿修改
     */
    init() {
      const mac = getQueryStringByName('mainMac'); // 主mac
      const gmac = getQueryStringByName('mac'); // 子mac
      const dataArr = getQueryStringByName('data');
      console.log('dataArr', dataArr);
      const DataObject = parseData(dataArr);
      const functype = getQueryStringByName('functype');
      console.log(`functype: ${functype}`);
      console.log('init.js', DataObject);
      this.setDataObject(DataObject);
      this.setFunctype(Number(functype)); // 场景
      this.setMac(mac);
      this.setgMac(gmac);
      this.getInfo(mac);
      // setTimeout(() => {
      //   this.setInitStatus(true);
      // }, 200);
    },
  },
};

export default mixin;
