/*
 * @Author: Jerry-Rain
 * @Date: 2020-04-22 14:07:56
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-07-02 15:45:02
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
  INIT_DATA,
  TUYA_GET_ALL_STATE,
  GET_DEV_INFO
} from '../../store/types';
import { getQueryStringByName } from '../../utils';
import { finishLoad } from '../../../../static/lib/PluginInterface.promise';

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
    }),
    ...mapActions({ getDeviceInfo: GET_DEVICE_INFO, initData: INIT_DATA, tuyaGetAllState: TUYA_GET_ALL_STATE, getDevInfo: GET_DEV_INFO }),
    /**
     * @description 初始化，并将小卡片传进来的值赋予state
     */
    init() {
      const href = decodeURIComponent(location.href);
      const macFull = this.getUrlParm(href, 'mac');
      const mac = macFull.split('#')[0];
      const switchNum = parseInt(macFull.split('#')[1]);
      const devData = getQueryStringByName('devData'); 
      console.log('macFull, mac, switchNum, devData: ', [macFull, mac, switchNum, devData]);
      this.setDataObject({switchNum, devData});
      this.setMac(mac);
      this.initDevData(devData, switchNum); // 第一包
      finishLoad(); // 结束loading
      this.initData(); // 打开初始化
      this.$router.push({ name: 'Home'});
    },
    initDevData(res, switchNum) {
      if (!res) { return; } // 如果为空，那就跳过，插件去获取
      const resParse = JSON.parse(res);
      console.log('初始化第一包: ', resParse);
      const porpertyPow = resParse.properties[switchNum - 1]; // 对应开挂拿笔拿 
      const { value: Pow, code } = porpertyPow;
      const { deviceName, online, deviceTypeName } = resParse;
      this.setDataObject({ Pow, code, deviceName: `${deviceName}${switchNum}`, online, deviceTypeName });
    },
    getUrlParm(url, name) {
      const result = {};
    
      if (!url || (typeof url !== "string" && String !== url.constructor)) {
        return result;
      }
      const str = url.split("?");
      const items = str && str.length > 1 ? str[1].split("&") : [];
    
      for (let arr = [], i = 0, len = items.length; i < len; i++) {
        arr = items[i].split("=");
        result[arr[0]] = arr[1];
      }
      console.log('result[name]', result[name]);
      return result[name];
    }
  }
};

export default mixin;
