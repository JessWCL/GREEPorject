/**
 * @description Home配置列表
 */
import { mapState} from 'vuex';
import { upperWashList, upperModeIndexList, disabledConfigObj} from '@/api/28a06/config';
import { funcConfig} from '@/api/28a06/advanced';
import { getDisableObj } from '@/utils/index';

const upperFuncConfig = {
  data() {
    return {
      JsonData: {},
      washList: upperWashList,
      modeIndexList: upperModeIndexList,
      disabledConfigObj,
    };
  },
  created() {
    this.JsonData.advancedList = funcConfig;
  },
  computed: {
    ...mapState({
      washMode: state => state.parseObj.drum1Params.washMode,
      runStage: state => state.parseObj.drum1Params.runStage,
      devState: state => state.parseObj.drum1Params.devState,
      launch: state => state.parseObj.drum1Params.launch,
      timeAll: state => state.parseObj.drum1Params.timeAll,
      timeLeft: state => state.parseObj.drum1Params.timeLeft,
      childLock: state => state.parseObj.drum1Params.childLock,
      
      soak: state => state.parseObj.drum1Params.soak,
      clear: state => state.parseObj.drum1Params.clear,
      nightWash: state => state.parseObj.drum1Params.nightWash,
      creaseRes: state => state.parseObj.drum1Params.creaseRes,
      highWater: state => state.parseObj.drum1Params.highWater,

      autoMeek: state => state.parseObj.drum1Params.autoMeek,
      autoScour: state => state.parseObj.drum1Params.autoScour,

      
    }),
    
    // 高级功能列表
    advancedList() {
      const auxiliaryObj = upperWashList[this.washModeIndex].auxiliaryFunction; // 高级功能基础配置

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

    washModeIndex(){
      return this.modeIndexList[this.washMode];
    }
  },
};

export default upperFuncConfig;
