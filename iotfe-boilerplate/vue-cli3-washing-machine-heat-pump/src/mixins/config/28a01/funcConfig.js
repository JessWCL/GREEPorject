/*
 * @Descripttion: 28a01的高级功能选项
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2020-01-08 13:53:45
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-05-18 11:49:22
 */
/**
 * @description Home配置列表 
 */
import advancedList from '../../../api/28a01/advanced';
import { washList, modeIndexList } from '../../../api/index';
import {
  mapState
} from 'vuex';


const funcConfig = {
  data() {
    return {
      modeIndexList,
      washList,
      JsonData: {},
    };
  },
  created() {
    this.JsonData.advancedList = advancedList;
  },
  computed: {
    ...mapState({
      devState: state => state.dataObject.devState,
      washType: state => state.dataObject.washType,
      washMode: state => state.dataObject.washMode,
      runStage: state => state.dataObject.runStage,
      washTemp: state => state.dataObject.washTemp,
      
      order: state => state.dataObject.order, // 预约
      noDrain: state => state.dataObject.noDrain, // 免排水
      creaseRes: state => state.dataObject.creaseRes, // 防皱
      soak: state => state.dataObject.soak, // 浸泡
      energySave: state => state.dataObject.energySave, // 节能
      highWater: state => state.dataObject.highWater, // 高水位
    }),
    
    advancedList() {
      const modeIndex = this.modeIndexList[this.washType][this.washMode]; // 模式对应list下表
      const auxiliaryObj = this.washList[this.washType].washMode[modeIndex].auxiliaryFunction; // 类型下的模式配置数据
      
      const UNorder = this.runStage > 1; // 预约  启动后禁用
      const UNnoDrain = this.runStage >= 88; // 免排水
      const UNcreaseRes = this.runStage >= 84; // 防皱
      const UNsoak = this.runStage > 1; // 浸泡  启动后禁用
      const UNenergySave = this.runStage >= 37; // 节能 
      const UNhighWater = this.runStage >= 37; // 高水位

      const obj = {UNorder, UNnoDrain, UNcreaseRes, UNenergySave, UNsoak, UNhighWater};

      this.JsonData.advancedList.forEach((item, index) => {
        this.JsonData.advancedList[index].selected = this[item.protocol] === 1; // 是否选中 勿改，0, 2都是不选中 此处有坑，请注意
        const invalid = !auxiliaryObj[item.protocol]; // 是否禁用
        
        this.JsonData.advancedList[index].invalid = invalid; // 先配置默认是否禁用

        if (!invalid) {
          this.JsonData.advancedList[index].invalid = obj[`UN${item.protocol}`]; // 进入洗涤后某些功能开始禁用
          
          if (!obj[`UN${item.protocol}`]) {
          // 以下为互斥禁用  注意此处必须判断是否为1, 会存在为2的情况
            if (item.protocol === 'soak' && this.energySave === 1) {
              this.JsonData.advancedList[index].invalid = true;
            }
            if (item.protocol === 'energySave' && ((this.highWater === 1 || this.soak === 1) || !this.washTemp)) {
              this.JsonData.advancedList[index].invalid = true;
            }
            if (item.protocol === 'highWater' && this.energySave === 1) {
              this.JsonData.advancedList[index].invalid = true;
            } 
          }
        } 
      });

      return this.JsonData.advancedList;
    },
  },

};

export default funcConfig;
