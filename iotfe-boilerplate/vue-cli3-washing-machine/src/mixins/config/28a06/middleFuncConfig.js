/**
 * @description Home配置列表
 */
import { mapState} from 'vuex';
import { middleWashList, middleModeIndexList, disabledConfigObj} from '@/api/28a06/config';
import { funcConfig} from '@/api/28a06/advanced';
import { getDisableObj } from '@/utils/index';

const middleFuncConfig = {
  data() {
    return {
      JsonData: {},
      washList: middleWashList,
      modeIndexList: middleModeIndexList,
      disabledConfigObj,
      washModeIndex: 0, //  模式对应washList的下表
    };
  },
  created() {
    this.JsonData.advancedList = funcConfig;
  },
  computed: {
    ...mapState({
      washMode: state => state.parseObj.drum2Params.washMode,
      runStage: state => state.parseObj.drum2Params.runStage,
      devState: state => state.parseObj.drum2Params.devState,
      launch: state => state.parseObj.drum2Params.launch,
      timeAll: state => state.parseObj.drum2Params.timeAll,
      timeLeft: state => state.parseObj.drum2Params.timeLeft,
      childLock: state => state.parseObj.drum2Params.childLock,
      
      soak: state => state.parseObj.drum2Params.soak,
      clear: state => state.parseObj.drum2Params.clear,
      nightWash: state => state.parseObj.drum2Params.nightWash,
      creaseRes: state => state.parseObj.drum2Params.creaseRes,
      highWater: state => state.parseObj.drum2Params.highWater,

      autoMeek: state => state.parseObj.drum2Params.autoMeek,
      autoScour: state => state.parseObj.drum2Params.autoScour,

    }),
    
    // 高级功能列表
    advancedList() {
      const modeIndex = this.modeIndexList[this.washMode]; // 模式对应list下表
      const auxiliaryObj = this.washList[modeIndex].auxiliaryFunction; // 高级功能基础配置

      // 高级功能进入洗涤程序某些阶段后（含该阶段）不可再选
      const disableObj = getDisableObj(this.disabledConfigObj, this.runStage); 

      this.JsonData.advancedList.forEach(element => {
        let item = element;
        item.selected = this[item.protocol] === 1; // 是否选中 勿改，0, 2都是置灰
        let invalid = !auxiliaryObj[item.protocol]; // 是否禁用
        item.invalid = invalid;
        
        // if (!invalid) { // 未禁用的情况下，判断烘干下 夜间洗是否需要禁用
        //   if (item.protocol === 'nightWash' && this.dry) {
        //     item.invalid = true;
        //     invalid = true;
        //   }
        // }
        
        if (invalid) item.selected = false;
        if (!invalid) item.invalid = disableObj[item.protocol]; // 进入洗涤后某些功能开始禁用
      });
      return this.JsonData.advancedList;
    },
  },
  watch: {
    washMode: {
      handler(newV) {
        this.washModeIndex = this.modeIndexList[newV];
      },
      immediate: true,
    },
  }
};

export default middleFuncConfig;
