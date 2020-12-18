/*
 * @Descripttion: 
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2019-11-18 15:05:08
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-04-21 13:56:15
 */
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
import {
  finishLoad
} from '../.././../../static/lib/PluginInterface.promise'; // 主体接口

function parseData(data) {
  // 更新state状态，需更改
  const obj = JSON.parse(data);
  const DataObject = {};
  // DataObject.Pow = parseInt(obj[0], 10);
  // DataObject.devState = parseInt(obj[1], 10);
  // DataObject.launch = parseInt(obj[2], 10);
  // DataObject.washMode = parseInt(obj[3], 10);
  // DataObject.timeAll = parseInt(obj[4], 10);
  // DataObject.timeLeft = parseInt(obj[5], 10);
  // DataObject.runStage = parseInt(obj[6], 10);
  // DataObject.order = parseInt(obj[7], 10);
  // DataObject.orderLaunch = parseInt(obj[8], 10);
  // DataObject.orderTimeHour = parseInt(obj[9], 10);
  // DataObject.orderTimeMin = parseInt(obj[10], 10);
  // DataObject.setWashTime = parseInt(obj[11], 10);
  // DataObject.washTemp = parseInt(obj[12], 10);
  // DataObject.potch = parseInt(obj[13], 10);
  // DataObject.speed = parseInt(obj[14], 10);
  // DataObject.mute = parseInt(obj[15], 10);
  // DataObject.childLock = parseInt(obj[16], 10);
  // DataObject.error1 = parseInt(obj[17], 10);
  // DataObject.error2 = parseInt(obj[18], 10);
  // DataObject.error3 = parseInt(obj[19], 10);
  // DataObject.error4 = parseInt(obj[20], 10);
  // DataObject.prompt1 = parseInt(obj[21], 10);
  // DataObject.prompt2 = parseInt(obj[22], 10);
  // DataObject.JFerr = parseInt(obj[23], 10);
  return DataObject;
}

const mixin = {
  mixins: [updateStatus], // 该mixin自定义初始化时检测故障等功能，需更改
  computed: {
    ...mapState({ 
      mac: state => state.mac, 
      isOffline: state => state.deviceInfo.deviceState,
      devState: state => state.dataObject.devState, 
      JFerr: state => state.dataObject.JFerr
    })
  },
  methods: {
    ...mapMutations({
      setMac: SET_MAC,
      setDataObject: SET_DATA_OBJECT,
      updateIsScene: IS_SCENE
    }),
    ...mapActions({ getInfo: GET_DEVICE_INFO }),
    /**
     * @description 初始化，并将小卡片传进来的值赋予state
     */
    async init() {
      const mac = getQueryStringByName('mac');
      this.setMac(mac);
      // const dataArr = getQueryStringByName('data');
      // const DataObject = parseData(dataArr);
      // this.setDataObject(DataObject);
      const isScene = getQueryStringByName('functype'); // 0 :normal 1: scene
      Number(isScene) ? this.updateIsScene(1) : this.updateIsScene(0); // 场景
      await this.getInfo(mac);
      if (this.isOffline === -1) {
        this.$router.push({
          name: 'Offline'
        });
      } else if (this.devState === 4 || (this.JFerr && this.Pow)) {
        this.$router.push({
          name: 'Error'
        });
      } else if ('13'.includes(this.devState)) {
        this.$router.push({ name: 'Startup' });
      } else {
        this.$router.push({
          name: 'Home'
        });
      }
    }
  }
};

export default mixin;
