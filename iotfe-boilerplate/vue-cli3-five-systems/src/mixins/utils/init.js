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
    ...mapActions({ 
      getDeviceInfo: GET_DEVICE_INFO,
      getDataPollingInit: 'getDataPollingInit',
    }),
    /**
     * @description 初始化，并将小卡片传进来的值赋予state
     */
    init() {
      const mac = getQueryStringByName('mac');
      console.log(`mac: ${mac}`);

      const dataQuery = getQueryStringByName('data');
      console.log('getQueryStringByName("data")');
      console.log(dataQuery);

      const isScene = getQueryStringByName('functype');
      console.log(`functype: ${isScene}`);

      this.setMac(mac);
      // this.getDeviceInfo(mac);

      // 取URL中查询参数data的值，取html名字，放入DataObject中
      if (dataQuery) {
        const dataQdecode = decodeURIComponent(dataQuery);
        const dataParsed = JSON.parse(dataQdecode);
        const htmlName = window.htmlName;
        const DataObject = {
          [htmlName]: dataParsed,
        };
        this.setDataObject(DataObject);
      }
      // 开始五大系统轮询action
      this.getDataPollingInit();

      Number(isScene) ? this.updateIsScene(1) : this.updateIsScene(0); // 场景
    }
  }
};

export default mixin;
