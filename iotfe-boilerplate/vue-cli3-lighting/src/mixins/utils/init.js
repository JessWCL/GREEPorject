// 根据实际业务修改
import { mapState, mapMutations, mapActions } from 'vuex';
import {
  GET_DEVICE_INFO,
  SET_MAC,
  SET_DATA_OBJECT,
  IS_SCENE,
} from '@/store/types';
import { getQueryStringByName } from '@/utils';
import updateStatus from './updateStatus';

function parseData(data) {
  // 更新state状态，需更改
  const obj = JSON.parse(data);
  console.log(obj);

  const DataObject = {};
  DataObject.Pow = parseInt(obj[0], 10);
  DataObject.SetTem = parseInt(obj[1], 10);
  DataObject.Breathe = parseInt(obj[2], 10);
  DataObject.SetBright = parseInt(obj[3], 10);

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
      const mac = getQueryStringByName('mac');
      console.log(`mac: ${mac}`);

      const isScene = getQueryStringByName('functype');
      console.log(`functype: ${isScene}`);
      const dataArr = getQueryStringByName('data');
      const DataObject = parseData(dataArr);
      this.setDataObject(DataObject);
      this.setMac(mac);
      this.getDeviceInfo(mac);
      Number(isScene) ? this.updateIsScene(1) : this.updateIsScene(0); // 场景
    },
  },
};

export default mixin;
