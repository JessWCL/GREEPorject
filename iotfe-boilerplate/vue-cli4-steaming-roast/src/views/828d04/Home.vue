<template>
  <gree-view
    :bg-color="bgColor"
    class="page-home"
    :class="{
      'is-shrink-onresize': isShrinkOnresize,
      'is-working': isWorking,
    }"
  >
    <common-header />
    <gree-page :no-navbar="isNoNavbar">
      <!-- <div class="page-main"> -->
      <gree-tab-bar
        v-show="!isAppointment"
        v-model="Mod"
        class="custom-tab-bar"
        :items="tabbarItems"
        :has-ink="false"
        @change="onTabBarChange"
      ></gree-tab-bar>
      <!-- 智能菜单 -->
      <keep-alive>
        <smart-menu v-if="Mod === MODE_SMART_MENU"></smart-menu>
      </keep-alive>
      <!-- 专业烘烤 -->
      <keep-alive>
        <professional-baking v-if="Mod === MODE_BAKING"></professional-baking>
      </keep-alive>
      <!-- 专业蒸制 -->
      <keep-alive>
        <professional-steaming v-if="Mod === MODE_STEAMING"></professional-steaming>
      </keep-alive>
      <!-- 辅助功能 -->
      <keep-alive>
        <auxiliary-function v-if="Mod === MODE_HELPER"></auxiliary-function>
      </keep-alive>
      <!-- 云菜单 -->
      <keep-alive>
        <smart-menu v-if="Mod === MODE_NETWORK_MODE"></smart-menu>
      </keep-alive>
      <!-- </div> -->

      <!-- 电源关闭 -->
      <gree-power-off
        v-model="showPowerOff"
        :text="$language('home.powerOff')"
        :style="{ backgroundImage:'url(' + power_off_bg + ')' }"
      ></gree-power-off>

      <!-- 底部弹出层按钮 -->
      <function-list :is-popup-show="isFunctionListPopupShow"></function-list>

      <!-- 底部按钮 -->
      <GreeToolBar />
    </gree-page>
  </gree-view>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import {
  Header,
  Row,
  Col,
  Icon,
  NoticeBar,
  Marquee,
  MarqueeItem,
  PowerOff,
  ToolBar,
  TabBar,
  Toast,
  Dropdown,
  DropdownItem,
  Button,
  Dialog
} from 'gree-ui';
import {
  POW,
  LIST1,
  LIST2,
  GET_ALL,
  RUN_STAT,
  MODE_BAKING,
  MODE_STEAMING,
  MODE_SMART_MENU,
  MODE_HELPER,
  MODE_CLEAN,
  MODE_NETWORK_MODE,
  LIST1_SMART_MENU_CLOUD,
  LIGHT_BAR_COLOR,
  DARK_BAR_COLOR,
} from '@/api/828d04/constant';
import homeConfig from '@/mixins/config/828d04/home';
import commonMethodConfig from '@/mixins/config/828d04/commonMethod';
import errorConfig from '@/mixins/config/error';
import FunctionList from '@/components/828d04/FunctionList';
import SmartMenu from '@/components/828d04/SmartMenu';
import ProfessionalBaking from '@/components/828d04/ProfessionalBaking';
import ProfessionalSteaming from '@/components/828d04/ProfessionalSteaming';
import AuxiliaryFunction from '@/components/828d04/AuxiliaryFunction.vue';
import CommonHeader from '@/components/common/CommonHeader.vue';
import GreeToolBar from '@/components/828d04/ToolBar.vue';
import * as types from '@/store/types';
import {
  ProfessionalBakingFootFuncList,
  IntelligentFootFuncList,
  AuxiliaryFunctionList
} from '@/api/828d04/FootFuncListData';
import {
  closePage,
  editDevice,
  changeBarColor
} from '../../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [Header.name]: Header,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [NoticeBar.name]: NoticeBar,
    [Marquee.name]: Marquee,
    [MarqueeItem.name]: MarqueeItem,
    [PowerOff.name]: PowerOff,
    [ToolBar.name]: ToolBar,
    [TabBar.name]: TabBar,
    [Toast.name]: Toast,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    CommonHeader,
    FunctionList,
    SmartMenu,
    ProfessionalBaking,
    ProfessionalSteaming,
    AuxiliaryFunction,
    GreeToolBar
  },
  mixins: [homeConfig, errorConfig, commonMethodConfig],
  data() {
    return {
      MODE_BAKING,
      MODE_STEAMING,
      MODE_SMART_MENU,
      MODE_HELPER,
      MODE_NETWORK_MODE,
      selAdvanced: false,
    };
  },
  computed: {
    ...mapState({
      cacheMod: state => state.dataObjectCache.Mod,
      cacheRunStat: state => state.dataObjectCache.RunStat,
      SmartMenuList1: state => state.dataObjectCache.SmartMenuList1,
      ProfessionalBakingList1: state => state.dataObjectCache.ProfessionalBakingList1,
      AuxiliaryFunctionList1: state => state.dataObjectCache.AuxiliaryFunctionList1,
      mac: state => state.mac,
      isFunctionListPopupShow: state => state.isFunctionListPopupShow,
      isAppointment: state => state.isAppointment,
      RunStat: state => state.dataObject.RunStat,
      Pow: state => state.dataObject.Pow,
      storeMod: state => state.dataObject.Mod,
      List1: state => state.dataObject.List1,
      List2: state => state.dataObject.List2,
      DisSetHour: state => state.dataObject.DisSetHour,
      DisSetMin: state => state.dataObject.DisSetMin,
      MachStat: state => state.dataObject.MachStat,
      isShrinkOnresize: state => state.isShrinkOnresize,
    }),

    Mod: {
      // eslint-disable-next-line func-names
      get: function () {
        const { storeMod, cacheMod, List1 } = this;
        let ret = storeMod;
        const isCloudMenu = storeMod === MODE_NETWORK_MODE
          || (storeMod === MODE_SMART_MENU && List1 === LIST1_SMART_MENU_CLOUD);
        const isCLean = cacheMod === MODE_CLEAN;

        if (isCLean) {
          ret = this.storeMod;
        } else if (isCloudMenu) {
          ret = MODE_SMART_MENU;
        }
        return ret;
      },
      // eslint-disable-next-line func-names
      set: function (payload) {
        const Mod = payload;
        this.setMod(Mod);
      }
    },

    bgColor() {
      const { Pow } = this;
      const isTurnOff = Pow === 0;
      const isTurnOn = Pow === 1;
      let ret = LIGHT_BAR_COLOR
      if (isTurnOff) {
        ret = DARK_BAR_COLOR;
      } else if (isTurnOn) {
        ret = LIGHT_BAR_COLOR;
      }
      return ret;
    },

    isNoNavbar() {
      const { Pow } = this;
      const ret = !Pow;
      return ret;
    },

    headerTheme() {
      return this.Pow ? '' : 'transparent';
    },

    showPowerOff() {
      return Boolean(!this.Pow);
    },

    isShowToolbar() {
      let ret = false;
      const isSearching = this.isShrinkOnresize === true;
      const isShow = this.Pow === 0 || !this.isWorking;
      if (isSearching) {
        ret = false;
      } else if (isShow) {
        ret = true;
      }
      return ret;
    },

    power_off_bg() {
      const bg = require('@/assets/img/bg_off.jpg');
      return bg;
    },

    isWorking() {
      const { cacheMod, cacheRunStat, RunStat } = this;
      const isClean = cacheMod === MODE_CLEAN;
      // 清洁模式是否工作
      const isCleanWorking = cacheRunStat === RUN_STAT.Appointment || cacheRunStat === RUN_STAT.Working;
      // 正常模式是否工作
      const isWorking = RunStat === RUN_STAT.Appointment || RunStat === RUN_STAT.Working;

      let ret = false;
      if (isWorking && isClean) {
        ret = false;
      } else if (isWorking) {
        ret = true;
      }
      return ret;
    },

    tabbarItems() {
      return [
        {
          name: MODE_SMART_MENU,
          value: MODE_SMART_MENU,
          label: '智能菜单',
          disabled: this.isWorking
        },
        {
          name: MODE_BAKING,
          value: MODE_BAKING,
          label: '专业烘烤',
          disabled: this.isWorking
        },
        {
          name: MODE_STEAMING,
          value: MODE_STEAMING,
          label: '专业蒸制',
          disabled: this.isWorking
        },
        {
          name: MODE_HELPER,
          value: MODE_HELPER,
          label: '辅助功能',
          disabled: this.isWorking
        }
      ];
    }
  },

  watch: {

    Pow(newV) {
      const isTurnOff = newV === POW.TurnOff;
      const isTurnOn = newV === POW.TurnOn;
      if (isTurnOff) {
        Dialog.closeAll();
        changeBarColor(DARK_BAR_COLOR);
      } else if (isTurnOn) {
        changeBarColor(LIGHT_BAR_COLOR);
      }
    },

    Mod: {
      handler(newVal) {
        // 根据不同的模式检查List1的合法性
        this.checkLegalList1Val();
      },
      immediate: true
    }, 

  },

  destroyed() {
    Dialog.closeAll();
  },

  methods: {
    ...mapMutations({
      setDataObjectCache: types.SET_DATA_OBJECT_CACHE,
      setDataObject: types.SET_DATA_OBJECT,
      setIsAppointment: types.SET_IS_APPOINTMENT,
      setMod: types.SET_MOD,
      setList1: types.SET_LIST1,
      setList2: types.SET_LIST2,
    }),

    ...mapActions({
      sendCtrl: types.SEND_CTRL
    }),

    /**
     * @description 返回键
     */
    goBack() {
      closePage();
    },
    /**
     * @description 编辑设备名称
     */
    moreInfo() {
      editDevice(this.mac);
    },

    // 根据不同的模式检查List1的合法性
    checkLegalList1Val() {
      const { RunStat, Mod, List1, SmartMenuList1, ProfessionalBakingList1, AuxiliaryFunctionList1 } = this;
      const isSmartMenu = Mod === MODE_SMART_MENU;
      const isBaking = Mod === MODE_BAKING;
      // const isSteaming = Mod === MODE_STEAMING;
      const isHelper = Mod === MODE_HELPER;

      const islegalForIntel = IntelligentFootFuncList.length < List1;
      const islegalForPro = ProfessionalBakingFootFuncList.length < List1;
      const islegalForAuxi = AuxiliaryFunctionList.length < List1;
      const isNegative = List1 < 0;

      const isWorking = RunStat === RUN_STAT.Appointment || RunStat === RUN_STAT.Working;

      // 工作中，根据不同的模式判断List1的合法性
      if (isWorking && (isNegative || (isSmartMenu && islegalForIntel) || (isBaking && islegalForPro) || isHelper && islegalForAuxi)) {
        console.warn('[List1] index out of boundary');
        this.setList1(LIST1.DefaultValue);
      }

      const islegalCacheForIntel = IntelligentFootFuncList.length < SmartMenuList1;
      const islegalCacheForPro = ProfessionalBakingFootFuncList.length < ProfessionalBakingList1;
      const islegalCacheForAuxi = AuxiliaryFunctionList.length < AuxiliaryFunctionList1;

      // 待机中，根据不同的模式判断List1的合法性
      if (isNegative || (isSmartMenu && islegalCacheForIntel) || (isBaking && islegalCacheForPro) || isHelper && islegalCacheForAuxi) {
        console.warn('[List1] index out of boundary');
        this.setList1(LIST1.DefaultValue);
      }
    },

    onTabBarChange(item, index, prevIndex) {
      if (this.isWorking) return;

      const Mod = item.value;
      this.setMod(Mod);
      console.log(`Mod: ${Mod}`);
      console.log(item);
      console.log(`currentIndex: ${index}, prevIndex: ${prevIndex}, label: ${item.label}`);
    }

  }
};
</script>
