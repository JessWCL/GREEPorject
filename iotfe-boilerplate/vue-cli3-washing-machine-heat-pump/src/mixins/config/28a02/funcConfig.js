/*
 * @Descripttion: 28a02的高级功能选项
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2020-01-08 13:53:45
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-04-29 19:33:45
 */
/**
 * @description Home配置列表
 */
import { mapState} from 'vuex';
import { advancedList, modeIndexList, washList, disableFunObj } from '../../../api/index';
import { getDisableObj } from '../../../utils/index';

const funcConfig = {
  data() {
    return {
      JsonData: {},
      modeIndexList,
      washList,
      disableFunObj,
    };
  },
  created() {
    this.JsonData.advancedList = advancedList;
  },
  computed: {
    ...mapState({
      washMode: state => state.dataObject.washMode,
      runStage: state => state.dataObject.runStage,
      devState: state => state.dataObject.devState,
      launch: state => state.dataObject.launch,
      
      order: state => state.dataObject.order,
      childLock: state => state.dataObject.childLock,
      mute: state => state.dataObject.mute,
      nightWash: state => state.dataObject.nightWash,
      energySave: state => state.dataObject.energySave,
      highWater: state => state.dataObject.highWater,
      soak: state => state.dataObject.soak,
      autoMeek: state => state.dataObject.autoMeek,
      autoScour: state => state.dataObject.autoScour,
      autoOpenDoor: state => state.dataObject.autoOpenDoor,
    }),
    
    // 高级功能列表
    advancedList() {
      const modeIndex = this.modeIndexList[this.washMode]; // 模式对应list下表
      const auxiliaryObj = this.washList[modeIndex].auxiliaryFunction; // 高级功能基础配置

      // 高级功能进入洗涤程序某些阶段后（含该阶段）不可再选
      const disableObj = getDisableObj(this.disableFunObj, this.runStage); 

      this.JsonData.advancedList.forEach((item, index) => {
        this.JsonData.advancedList[index].selected = this[item.protocol] === 1; // 是否选中 勿改，0, 2都是置灰
        const invalid = !auxiliaryObj[item.protocol]; // 是否禁用
        this.JsonData.advancedList[index].invalid = invalid;
        if (invalid) this.JsonData.advancedList[index].selected = false;
        if (!invalid) this.JsonData.advancedList[index].invalid = disableObj[item.protocol]; // 进入洗涤后某些功能开始禁用
        !index && this.devState && (this.JsonData.advancedList[index].invalid = true); // 启动后预约禁用
        if (index === 1) this.JsonData.advancedList[index].invalid = Boolean(this.devState !== 1); // 启动后解禁童锁
      });

      return this.JsonData.advancedList;
    },
  },

};

export default funcConfig;
