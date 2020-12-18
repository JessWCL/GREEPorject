/*
 * @Author: Jerry-Rain
 * @Date: 2020-01-03 10:55:46
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-05-15 17:03:52
 * @Description:
 */
// 根据实际业务修改
import { mapState, mapMutations, mapActions } from 'vuex';
import updateStatus from './updateStatus';

import {
  GET_DEVICE_INFO,
  SET_MAC,
  SET_DATA_OBJECT,
  SET_PATH_NAME,
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
      setPathName: SET_PATH_NAME,
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
      const pathName = getQueryStringByName('pathName');
      this.setPathName(pathName);
      console.log(`mac: ${mac}  pathName: ${pathName}`);

      const DataObject = dataArr;
      console.log(DataObject);

      const isScene = getQueryStringByName('functype');
      console.log(`functype: ${isScene}`);

      this.setMac(mac);
      this.getDeviceInfo(mac);
      this.setDataObject(DataObject);
      pathName === 'SleepReport' ? this.$router.push({ name: 'SleepReport'}) : this.$router.push({ name: 'HomePage'});
      // Number(isScene) ? this.updateIsScene(1) : this.updateIsScene(0) // 场景
    }
  }
};

export default mixin;
