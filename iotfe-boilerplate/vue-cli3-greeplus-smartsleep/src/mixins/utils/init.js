/*
 * @Author: Jerry-Rain
 * @Date: 2020-02-20 11:30:18
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-02-22 14:23:55
 * @Description:
 */
// 根据实际业务修改
import { mapState, mapMutations, mapActions } from 'vuex';
import updateStatus from './updateStatus';

import {
  GET_DEVICE_INFO,
  SET_MAC,
  IS_SCENE,
  GET_MAIN_PAGE_DATE,
} from '../../store/types';
// import { getQueryStringByName } from '../../utils';

const mixin = {
  mixins: [updateStatus], // 该mixin自定义初始化时检测故障等功能，需更改
  created() {
    this.init();
  },
  computed: {
    ...mapState({ mac: state => state.mac }),
  },
  methods: {
    ...mapMutations({
      setMac: SET_MAC,
      updateIsScene: IS_SCENE,
    }),
    ...mapActions({
      getDeviceInfo: GET_DEVICE_INFO,
      getMainPageDate: GET_MAIN_PAGE_DATE,
    }),
    /**
     * @description 初始化，并将小卡片传进来的值赋予state
     */
    init() {
      // const mac = getQueryStringByName('mac');
      console.log('到这里');
      // const dataArr = getQueryStringByName('data');
      // console.log(`mac: ${mac}`);
      // const DataObject = dataArr;
      // console.log(DataObject);
      // const isScene = getQueryStringByName('functype');
      // console.log(`functype: ${isScene}`);
      // this.setMac(mac);
      this.getMainPageDate('');
      this.getDeviceInfo();
      // setTimeout(() => {
      //   this.getCreatLink()
      // }, 0)

      // // this.setDataObject(DataObject);
      // Number(isScene) ? this.updateIsScene(1) : this.updateIsScene(0); // 场景
    },
  },
};

export default mixin;
