<template>
  <gree-view class="page-home page-appointment">
    <common-header />
    <!-- 智能菜单 -->
    <keep-alive>
      <appointment-smart-menu v-if="Mod === MODE_SMART_MENU"></appointment-smart-menu>
    </keep-alive>
    <!-- 专业烘烤 -->
    <keep-alive>
      <appointment-professional-baking v-if="Mod === MODE_BAKING"></appointment-professional-baking>
    </keep-alive>
    <!-- 专业蒸制 -->
    <keep-alive>
      <appointment-professional-steaming v-if="Mod === MODE_STEAMING"></appointment-professional-steaming>
    </keep-alive>
    <!-- 辅助功能 -->
    <keep-alive>
      <appointment-auxiliary-function v-if="Mod === MODE_HELPER"></appointment-auxiliary-function>
    </keep-alive>
  </gree-view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
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
  Button
} from 'gree-ui';
import { timeConfig, timeData } from '@/api/828d04/baking-timeData.js';
import {
  MODE_BAKING,
  MODE_STEAMING,
  MODE_SMART_MENU,
  MODE_HELPER
} from '@/api/828d04/constant';
import * as types from '@/store/types';
import AppointmentSmartMenu from '@/components/828d04/AppointmentSmartMenu';
import AppointmentProfessionalBaking from '@/components/828d04/AppointmentProfessionalBaking';
import AppointmentProfessionalSteaming from '@/components/828d04/AppointmentProfessionalSteaming';
import AppointmentAuxiliaryFunction from '@/components/828d04/AppointmentAuxiliaryFunction.vue';
import CommonHeader from '@/components/common/CommonHeader.vue';
import { closePage, editDevice } from '../../../../static/lib/PluginInterface.promise';

export default {
  name: 'Appointment',
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
    AppointmentSmartMenu,
    AppointmentProfessionalBaking,
    AppointmentProfessionalSteaming,
    AppointmentAuxiliaryFunction,
    CommonHeader,
  },
  data() {
    return {
      MODE_BAKING,
      MODE_STEAMING,
      MODE_SMART_MENU,
      MODE_HELPER,
      currentMod: MODE_SMART_MENU,
      isTimePicking: false, // timePicker是否打开
    };
  },
  computed: {
    ...mapState({
      mac: state => state.mac,
      isAppointment: state => state.isAppointment,
      devname: state => state.deviceInfo.name,
      Pow: state => state.dataObject.Pow,
      Mod: state => state.dataObject.Mod,
      RunStat: state => state.dataObject.RunStat,
      List1: state => state.dataObject.List1,
    }),

    headerTheme() {
      return this.Pow ? '' : '';
    },

    // 时间选择器生成数据
    timePicker() {
      const data = [];
      for (let i = 0; i < timeConfig.length; i += 1) {
        data.push({
          ref: `pickerTime_${i}`,
          data: timeData[i],
          'default-index': [...timeConfig[i].defaultIndex],
          'default-value': [...timeConfig[i].defaultValue],
        });
      }
      return data;
    },
  },

  watch: {
    Pow() {
      this.$router.push({ path: '/' });
    },
    RunStat() {
      this.$router.push({ path: '/' });
    }
  },

  mounted() {
    this.setIsAppointment(true);
  },

  destroyed() {
    this.setIsAppointment(false);
  },

  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT',
      setIsAppointment: types.SET_IS_APPOINTMENT,
      setMod: types.SET_MOD,
    }),

    onPickerConfirmTem() {

    },

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

  }
};
</script>
