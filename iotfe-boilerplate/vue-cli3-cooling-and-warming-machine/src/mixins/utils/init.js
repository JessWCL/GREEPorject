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
  SET_DATA_OBJECT,
  IS_SCENE
} from '../../store/types';
import {
  getQueryStringByName
} from '../../utils';
import {
  showToast,
  closePage
} from "../../../../static/lib/PluginInterface.promise";

function parseData(data) {
  // 更新state状态，需更改
  console.log(data);
  const obj = JSON.parse(data);
  const DataObject = {};
  DataObject.Pow = parseInt(obj[0], 10);
  DataObject.Mod = parseInt(obj[1], 10);
  DataObject.Temp = parseInt(obj[2], 10);
  DataObject.WtTemp = parseInt(obj[3], 10);
  DataObject.ColWtSetTem = parseInt(obj[4], 10);
  DataObject.HtWtSetTem = parseInt(obj[5], 10);
  DataObject.ColSetTem = parseInt(obj[6], 10);
  DataObject.HtSetTem = parseInt(obj[7], 10);
  DataObject.AcSvSt = parseInt(obj[8], 10);
  DataObject.SvSt = parseInt(obj[9], 10);
  DataObject.AssHt = parseInt(obj[10], 10);
  DataObject.Quiet = parseInt(obj[11], 10);
  DataObject.OutMode = parseInt(obj[12], 10);
  DataObject.Er = parseInt(obj[13], 10);

  // DataObject.TemUn = parseInt(obj[14], 10);
  // DataObject.host = parseInt(obj[15], 10);
  // DataObject.name = parseInt(obj[16], 10);
  
  DataObject.HWMax = parseInt(obj[17], 10);
  DataObject.HWMin = parseInt(obj[18], 10);
  DataObject.HSMax = parseInt(obj[19], 10);
  DataObject.HSMin = parseInt(obj[20], 10);
  DataObject.CWMax = parseInt(obj[21], 10);
  DataObject.CWMin = parseInt(obj[22], 10);
  DataObject.CSMax = parseInt(obj[23], 10);
  DataObject.CSMin = parseInt(obj[24], 10);
  DataObject.AntiF = parseInt(obj[25], 10);
  
  DataObject.SvStDebug = parseInt(obj[26], 10);
  DataObject.Ocmd = parseInt(obj[27], 10);
  DataObject.err = parseInt(obj[28], 10);
  DataObject.enAcSvSt = parseInt(obj[29], 10);
  DataObject.DebugOk = parseInt(obj[30], 10);
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
      setDataObject: SET_DATA_OBJECT,
      updateIsScene: IS_SCENE
    }),
    ...mapActions({
      getDeviceInfo: GET_DEVICE_INFO
    }),
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
      if (Number(isScene)) {
        showToast('该家电不支持更多场景设置', 0);
        setTimeout(() => {
          closePage();
        }, 2000);
        this.updateIsScene(1);
      } else {
        this.updateIsScene(0);
      }
      // Number(isScene) ? this.updateIsScene(1) : this.updateIsScene(0); // 场景
    }
  }
};

export default mixin;
