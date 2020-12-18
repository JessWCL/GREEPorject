/*
 * @Descripttion: 
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2019-09-12 08:58:51
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2019-11-28 17:08:54
 */
// 根据实际业务修改
import { mapState, mapMutations, mapActions } from 'vuex';
import {
  GET_DEVICE_INFO,
  GET_THIRD_INFO,
  SET_MAC,
  SET_DATA_OBJECT,
  IS_SCENE,
  SET_TYPE_NUMBER
} from '@/store/types';
import { getQueryStringByName } from '@/utils';
import updateStatus from './updateStatus';

const mixin = {
  mixins: [updateStatus], // 该mixin自定义初始化时检测故障等功能，需更改
  computed: {
    ...mapState({ mac: state => state.mac })
  },
  methods: {
    ...mapMutations({
      setMac: SET_MAC,
      setDataObject: SET_DATA_OBJECT,
      updateIsScene: IS_SCENE,
      setTypeNumber: SET_TYPE_NUMBER,
    }),
    ...mapActions({
      getDeviceInfo: GET_DEVICE_INFO,
      getThirdInfo: GET_THIRD_INFO
    }),
    /**
     * @description 初始化，并将小卡片传进来的值赋予state
     */
    init() {
      const mac = getQueryStringByName('mac');
      try {
        const typeNumber = Number(mac.split('@switch_')[1]);
        this.setTypeNumber(typeNumber);
        console.log(`多路开关typeNumber: ${typeNumber}`);
      } catch (error) {
        console.log('单路开关', error);
      }
       
      console.log(`mac: ${mac}`);
      this.setMac(mac);
      const isScene = getQueryStringByName('functype');
      console.log(`functype: ${isScene}`);

      this.getDeviceInfo(mac);
      this.getThirdInfo(mac);
      Number(isScene) ? this.updateIsScene(1) : this.updateIsScene(0); // 场景
    }
  }
};

export default mixin;
