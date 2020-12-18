/*
 * @Author: Jerry-Rain
 * @Date: 2019-08-09 14:43:49
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-06-27 09:40:29
 * @Description:
 */
// 根据实际业务修改
import { mapState, mapMutations, mapActions } from "vuex";
import updateStatus from "./updateStatus";

import {
  GET_DEVICE_INFO,
  SET_MAC,
  SET_DATA_OBJECT,
  IS_SCENE,
  SET_MESHID,
  SET_SWITCHNUM,
  GET_TIMERLIST,
  SET_MAIN_MAC,
  SET_CLOUD_TIMER
} from "../../store/types";
import { getQueryStringByName } from "../../utils";

const mixin = {
  mixins: [updateStatus], // 该mixin自定义初始化时检测故障等功能，需更改
  computed: {
    ...mapState({ mac: state => state.mac })
  },
  created() {
    this.init();
  },
  methods: {
    ...mapMutations({
      setMac: SET_MAC,
      setMainMac: SET_MAIN_MAC,
      setMeshId: SET_MESHID,
      setSwitchNum: SET_SWITCHNUM,
      setDataObject: SET_DATA_OBJECT,
      updateIsScene: IS_SCENE,
      setCloudTimer: SET_CLOUD_TIMER
    }),
    ...mapActions({ getTimerList: GET_TIMERLIST, getDeviceInfo: GET_DEVICE_INFO }),
    /**
     * @description 初始化，并将小卡片传进来的值赋予state
     */
    init() {
      console.log('-------------init Begin-------------');
      const mac = getQueryStringByName('mac');
      const meshId = getQueryStringByName('meshId');
      const dataArr = getQueryStringByName('data');
      const switchNum = parseInt(mac.slice(-2)) + 1 || getQueryStringByName('switchNum'); // 前面是80404网关开关，后面是80401开关
      const mainMac = getQueryStringByName('mainMac');
      const cloudTimer = getQueryStringByName('cloudTimer');
      const isScene = getQueryStringByName('functype');
      const DataObject = this.parseData(dataArr);
      console.log(`mac: ${mac}  mainMac: ${mainMac}  cluodTimer: ${cloudTimer} DataObject:${DataObject}`);
      
      this.setMeshId(meshId);
      this.setCloudTimer(cloudTimer);
      this.setSwitchNum(switchNum);
      this.setMac(mac);
      this.setMainMac(mainMac);
      this.setDataObject(DataObject);
      this.getDeviceInfo(mac);
      // console.log(`meshid =  ${meshId}`);
      
      Number(isScene) ? this.updateIsScene(1) : this.updateIsScene(0); // 场景

      console.log('-------------init End-------------');
    },

    parseData(data) {
      console.log('typeOf - url - data : ', typeof (data));
      const obj = JSON.parse(data);
      const DataObject = {};
      DataObject.Pow = parseInt(obj[0], 10);
      return DataObject;
    }
  }
};

export default mixin;
