/**
 * @description 
 */
import { mapState } from 'vuex';
import { Dialog } from 'gree-ui';
import {
  RUN_STAT,
  MODE_SMART_MENU,
  MODE_BAKING,
  MODE_STEAMING,
  MODE_HELPER,
  MODE_CLEAN,
  LIST1_SMART_MENU_BAKING,
  LIST1_SMART_MENU_STEAMING,
  LIST1_SMART_MENU_BAKING_STEAMING,
  LIST1_SMART_MENU_PACKAGE,
  LIST1_BAKING_LARGE_BARBECUE,
  LIST1_BAKING_SMALL_BARBECUE,
  LIST1_HELPER_FERMENT,
  LIST1_HELPER_REHEAT_STEAM,
  LIST1_HELPER_BLANCH,
  LIST1_CLEAN_STEAM_ASSISTED_CLEANING,
  LIST1_CLEAN_DESCALING,
  LIST2_SMART_MENU__SMART_MENU_BAKING_STEAMING__ROASTING,
  LIST3_SMART_MENU__SMART_MENU_BAKING_STEAMING__ROASTING__CHIFFON_CAKE,
  UseCanTurnOnType,
} from '@/api/828d04/constant';
import { TipsType, __PROD__, __TEST__ } from '../../../api/828d04/constant.js';
import { showToast } from '../../../../../static/lib/PluginInterface.promise.js';

const commonMethod = {
  components: {
    [Dialog.name]: Dialog
  },
  computed: {
    ...mapState({
      cacheMod: state => state.dataObjectCache.Mod,
      cacheRunStat: state => state.dataObjectCache.RunStat,
      CleanList1: state => state.dataObjectCache.CleanList1,
      dataObject: state => state.dataObject,
      Mod: state => state.dataObject.Mod,
      Pow: state => state.dataObject.Pow,
      RunStat: state => state.dataObject.RunStat,
      List1: state => state.dataObject.List1,
      DisSetHour: state => state.dataObject.DisSetHour,
      DisSetMin: state => state.dataObject.DisSetMin,
      estate3: state => state.dataObject.estate3,
      estate4: state => state.dataObject.estate4,
      estate5: state => state.dataObject.estate5,
    }),

    isShowPreheating(state) {
      const { Mod, List1 } = state.dataObject;
      const ret = (Mod === MODE_BAKING && List1 !== LIST1_BAKING_LARGE_BARBECUE &&  List1 !== LIST1_BAKING_SMALL_BARBECUE)
        || Mod === MODE_STEAMING;
      return ret;
    },

    isStopSmarMenuMod(state) {
      const { Mod, List1, List2, List3 } = state.dataObject;
      // 蒸汽嫩烤-戚风蛋糕 当烘烤功能处理
      const isChiffonCake = Mod === MODE_SMART_MENU
        && List1 === LIST1_SMART_MENU_BAKING_STEAMING
        && List2 === LIST2_SMART_MENU__SMART_MENU_BAKING_STEAMING__ROASTING
        && List3 === LIST3_SMART_MENU__SMART_MENU_BAKING_STEAMING__ROASTING__CHIFFON_CAKE;

      if (isChiffonCake) {
        return false;
      }

      const isStopSmarMenuMod = Mod === MODE_SMART_MENU
        && (LIST1_SMART_MENU_STEAMING === List1
          || LIST1_SMART_MENU_BAKING_STEAMING === List1
          || LIST1_SMART_MENU_PACKAGE === List1);
      return isStopSmarMenuMod;
    },

    // 是否智能菜单-烘烤位
    isSmarMenuBakingModel(state) {
      const { Mod, List1 } = state.dataObject;
      const isStopSmarMenuMod = Mod === MODE_SMART_MENU
        && (LIST1_SMART_MENU_BAKING === List1
          || LIST1_SMART_MENU_BAKING_STEAMING === List1
          || LIST1_SMART_MENU_PACKAGE === List1);
      return isStopSmarMenuMod;
    },

    // 是否智能菜单-蒸汽位
    isSmarMenuSteamingModel(state) {
      const { Mod, List1 } = state.dataObject;
      const isStopSmarMenuMod = Mod === MODE_SMART_MENU && LIST1_SMART_MENU_STEAMING === List1;
      return isStopSmarMenuMod;
    },

    isStopSteamMod(state) {
      const { Mod } = state.dataObject;
      return Mod === MODE_STEAMING;
    },

    isStopHelperMod(state) {
      const { Mod, List1 } = state.dataObject;
      const isStopHelperMod = Mod === MODE_HELPER
        && (LIST1_HELPER_FERMENT === List1
          || LIST1_HELPER_REHEAT_STEAM === List1
          || LIST1_HELPER_BLANCH === List1);
      return isStopHelperMod;
    },

    isStopCleanMod(state) {
      const { cacheMod, List1 } = state.dataObject;
      const isStopCleanMod = cacheMod === MODE_CLEAN && (LIST1_CLEAN_STEAM_ASSISTED_CLEANING === List1);
      return isStopCleanMod;
    },

  },

  methods: {
    /* 
     * 弹出对应的清洁模式和剩余时间
     */
    handleCleanMod() {
      const { cacheMod, cacheRunStat } = this;
      const isClean = cacheMod === MODE_CLEAN;
      const isWorking = cacheRunStat === RUN_STAT.Appointment || cacheRunStat === RUN_STAT.Working;
      let isNextHandle = true;
      if (isClean && isWorking) {
        const content = this.getCleanTips();
        Dialog.alert({ title: '提示', content });

        isNextHandle = false;
      }
      return isNextHandle;
    },

    // 通用方法
    useCanTurnOnWithEstate3(index) {
      const { estate3, isStopSmarMenuMod, isStopSteamMod, isStopHelperMod } = this;
      // 位与
      const isWaring = estate3 & (1 << index);
      let isCanTurnOn = true;
      // 开门不允许启动
      if (isWaring && index === TipsType.Opening) {
        isCanTurnOn = false;
      } else if (isWaring && (isStopSmarMenuMod || isStopSteamMod || isStopHelperMod)) {
        isCanTurnOn = false;
      }

      if (isCanTurnOn === false) {
        const content = this.$language(`error.estate_msg${index}_toast`);
        if (__PROD__ || __TEST__) showToast(content, 1);
        return isCanTurnOn;
      }
      return isCanTurnOn;
    },

    // 通用方法
    useCanTurnOnWithEstate3ForHighTemp(index, data = {}) {
      const { type, payload } = data;
      const { estate3, isSmarMenuBakingModel } = this;
      // 位与
      const isWaring = estate3 & (1 << index);
      let isCanTurnOn = true;

      // 是否云菜单下发
      const isSmartMenuCloud = type === UseCanTurnOnType.CloudMenu;
      let isStopSmartMenuCloudList1 = false;
      if (isSmartMenuCloud) {
        const arrCloudMenuCode = payload;
        const List1Code = arrCloudMenuCode[4];
        /*
        * 云菜谱的协议与控制协议不同
        * List1Code: 0为烤，1 2 3为蒸
        */
        if ([0].includes(List1Code)) {
          isStopSmartMenuCloudList1 = true;
        }
      }
      const isStopSmartMenuCloud = isSmartMenuCloud && isStopSmartMenuCloudList1;

      if (isWaring && TipsType.HighTemp4SmartMenuBaking && (isSmarMenuBakingModel || isStopSmartMenuCloud)) {
        isCanTurnOn = false;
      }

      if (isCanTurnOn === false) {
        const content = this.$language(`error.estate_msg${index}_toast`);
        if (__PROD__ || __TEST__) showToast(content, 1);
        return isCanTurnOn;
      }
      return isCanTurnOn;
    },

    // 通用方法
    useCanTurnOnWithEstate4(index,  data = {}) {
      const { type, payload } = data;
      const { estate4, isSmarMenuSteamingModel } = this;
      // 位与
      const isWaring = estate4 & (1 << index);
      let isCanTurnOn = true;

      // 是否云菜单下发
      const isSmartMenuCloud = type === UseCanTurnOnType.CloudMenu;
      let isStopSmartMenuCloudList1 = false;
      if (isSmartMenuCloud) {
        const arrCloudMenuCode = payload;
        const List1Code = arrCloudMenuCode[4];
        /*
        * 云菜谱的协议与控制协议不同
        * List1Code: 0为烤，1 2 3为蒸
        */
        if ([1, 2, 3].includes(List1Code)) {
          isStopSmartMenuCloudList1 = true;
        }
      }
      const isStopSmartMenuCloud = isSmartMenuCloud && isStopSmartMenuCloudList1;

      if (isWaring && (isSmarMenuSteamingModel || isStopSmartMenuCloud)) {
        isCanTurnOn = false;
      }

      if (isCanTurnOn === false) {
        const content = this.$language(`error.estate4_msg${index}_toast`);
        if (__PROD__ || __TEST__) showToast(content, 1);
        return isCanTurnOn;
      }
      return isCanTurnOn;
    },

    useCanTurnOnWithEstate5(data = {}) {
      const { type, payload } = data;
      const { estate3, estate5 } = this;
      // 除垢提醒的次数为0时，不能启动蒸的模式
      const isWaring = (estate3 & (1 << TipsType.WasteDescaling)) && estate5 === 0;
      // 专业烘烤不需要判断
      // 除垢提醒的次数为0时，专业烘烤还能使用
      const { isStopSmarMenuMod, isStopSteamMod, isStopHelperMod, isStopCleanMod } = this;
      // 是否云菜单下发
      const isSmartMenuCloud = type === UseCanTurnOnType.CloudMenu;
      let isStopSmartMenuCloudList1 = false;
      if (isSmartMenuCloud) {
        const arrCloudMenuCode = payload;
        const List1Code = arrCloudMenuCode[4];
        /*
        * 云菜谱的协议与控制协议不同
        * List1Code: 0为烤，1 2 3为蒸
        */
        if ([1, 2, 3].includes(List1Code)) {
          isStopSmartMenuCloudList1 = true;
        }
      }
      const isStopSmartMenuCloud = isSmartMenuCloud && isStopSmartMenuCloudList1;

      if (isWaring
        && (isStopSmarMenuMod
          || isStopSteamMod
          || isStopHelperMod
          || isStopCleanMod
          || isStopSmartMenuCloud)) {
        const content = this.$language('error.estate_msg6_toast');
        // Dialog.alert({ title: '提示', content });
        if (__PROD__ || __TEST__) showToast(content, 1);
        return false;
      }
      return true;
    },

    useCanTurnOn(data = {}) {
      const arr = [
        // 开门提示
        this.useCanTurnOnWithEstate3(TipsType.Opening),
        // 净水箱取出
        this.useCanTurnOnWithEstate3(TipsType.WaterTankOut),
        // 废水箱取出
        this.useCanTurnOnWithEstate3(TipsType.WasteTankOut),
        // 废水箱水满
        this.useCanTurnOnWithEstate3(TipsType.WasteTankFull),
        // 净水箱缺水
        this.useCanTurnOnWithEstate3(TipsType.WaterTankLack),
        // 面板开启 预留不显示
        // var ret5 = this.useCanTurnOnWithEstate3(TipsType.PanelOpening),
        // 高温提示-烘烤位
        this.useCanTurnOnWithEstate3ForHighTemp(TipsType.HighTemp4SmartMenuBaking),

        // 高温提示-蒸汽位
        this.useCanTurnOnWithEstate4(TipsType.HighTemp4SmartMenuSteaming),
        // 除垢提示 总标志位
        // var ret6 = this.useCanTurnOnWithEstate3(TipsType.WasteDescaling),
        // 除垢提示 除垢剩余次数
        this.useCanTurnOnWithEstate5(data),

        /* ======== 第四次需求变更 start ======== */
        // 云菜单-高温提示-烘烤位
        this.useCanTurnOnWithEstate3ForHighTemp(TipsType.HighTemp4SmartMenuBaking, data),

        // 云菜单-高温提示-蒸汽位
        this.useCanTurnOnWithEstate4(TipsType.HighTemp4SmartMenuSteaming, data),
        /* ======== 第四次需求变更 end ======== */
      ];
      console.log(`开门提示${arr[0]}
        净水箱取出${arr[1]}
        废水箱取出${arr[2]}
        废水箱水满${arr[3]}
        净水箱缺水${arr[4]}
        高温提示-烘烤位${arr[5]}
        高温提示-蒸汽位${arr[6]}
        除垢剩余次数${arr[7]}
      `);
      const isCanTurnOn = arr.every(item => item === true);
      return isCanTurnOn;
    },

    getCleanTips() {
      const { cacheMod, CleanList1, DisSetHour, DisSetMin } = this;
      const isClean = cacheMod === MODE_CLEAN;
      let ret = '';
      if (isClean) {
        let List1Name = '清洁模式';
        
        switch (CleanList1) {
          case LIST1_CLEAN_STEAM_ASSISTED_CLEANING:
            List1Name = '蒸汽辅助清洁';
            break;
          case LIST1_CLEAN_DESCALING:
            List1Name = '除垢';
            break;
          default:
            break;
        }
        const content = `${List1Name}剩余时间，${DisSetHour}小时${DisSetMin}分钟`;
        ret = content;
      }
      return ret;
    }
  },
};

export default commonMethod;
