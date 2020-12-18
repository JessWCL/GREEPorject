/*
 * @Author: Jerry-Rain
 * @Date: 2020-04-01 13:52:03
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-05-16 09:41:19
 * @Description: 
 */
// 根据实际业务修改
import { mapState, mapMutations, mapActions } from 'vuex';
import updateStatus from './updateStatus';
import {
  finishLoad
} from '../../../../static/lib/PluginInterface.promise';

import {
  GET_DEVICE_INFO,
  SET_MAC,
  SET_PATH_NAME,
  SET_DATA_OBJECT,
  IS_SCENE,
  SET_API_OBJECT
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
      setPathName: SET_PATH_NAME,
      setDataObject: SET_DATA_OBJECT,
      updateIsScene: IS_SCENE,
      setApiObj: SET_API_OBJECT
    }),
    ...mapActions({ getDeviceInfo: GET_DEVICE_INFO }),
    /**
     * @description 初始化，并将小卡片传进来的值赋予state
     */
    async init() {
      const mac = getQueryStringByName('mac');
      const dataArr = getQueryStringByName('data');
      const pathName = getQueryStringByName('pathName');
      this.setPathName(pathName);
      console.log(`mac: ${mac}   pathName: ${pathName}`);
      
      const DataObject = dataArr;
      console.log(DataObject);
      
      // const isScene = getQueryStringByName('functype');
      // console.log(`functype: ${isScene}`);
      
      this.setMac(mac);
      // this.getDeviceInfo(mac);
      // this.setDataObject(DataObject);
      finishLoad();
      pathName === 'SleepReport' ? this.$router.push({ name: 'SleepReport'}) : this.$router.push({ name: 'HomePage'});
      // Number(isScene) ? this.updateIsScene(1) : this.updateIsScene(0); // 场景
    },
    
  }
};

export default mixin;
