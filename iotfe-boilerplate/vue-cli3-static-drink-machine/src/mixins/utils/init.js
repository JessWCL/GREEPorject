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
  DataObject.ErrorCode1 = parseInt(obj[0], 10);
  DataObject.ErrorCode2 = parseInt(obj[1], 10);
  DataObject.LifeTimeFilter1 = parseInt(obj[2], 10);
  DataObject.LifeTimeFilter2 = parseInt(obj[3], 10);
  DataObject.LifeTimeFilter3 = parseInt(obj[4], 10);
  DataObject.LifeTimeFilter4 = parseInt(obj[5], 10);
  DataObject.TotalPureWater = parseInt(obj[6], 10);
  DataObject.FilterKind1 = parseInt(obj[7], 10);
  DataObject.FilterKind2 = parseInt(obj[8], 10);
  DataObject.FilterKind3 = parseInt(obj[9], 10);
  DataObject.FilterKind4 = parseInt(obj[10], 10);
  DataObject.FilterWarning1 = parseInt(obj[11], 10);
  DataObject.FilterWarning2 = parseInt(obj[12], 10);
  DataObject.FilterWarning3 = parseInt(obj[13], 10);
  DataObject.FilterWarning4 = parseInt(obj[14], 10);
  DataObject.WorkStatus = parseInt(obj[15], 10);
  DataObject.LifeFilterDays1 = parseInt(obj[16], 10);
  DataObject.LifeFilterDays2 = parseInt(obj[17], 10);
  DataObject.LifeFilterDays3 = parseInt(obj[18], 10);
  DataObject.LifeFilterDays4 = parseInt(obj[19], 10);
  DataObject.JFerr = parseInt(obj[20], 10);

  return DataObject;
}

const mixin = {
  mixins: [updateStatus], // 该mixin自定义初始化时检测故障等功能，需更改
  computed: {
    ...mapState({ mac: state => state.mac }),
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
