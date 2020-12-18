<template>
  <gree-header
    :theme="headerTheme"
    :left-options="{ preventGoBack: true }"
    @on-click-back="clickBack"
  >
    {{ headerTitel }}
    <gree-dropdown
      slot="right"
      position="is-bottom-left"
    >
      <gree-icon
        slot="trigger"
        name="more"
        size="lg"
      ></gree-icon>
      <gree-dropdown-item @click="moreInfo">
        设备信息
      </gree-dropdown-item>
      <gree-dropdown-item @click="$router.push('MyFavorite')">
        我的收藏
      </gree-dropdown-item>
      <gree-dropdown-item @click="$router.push('ChildLock')">
        童锁
      </gree-dropdown-item>
    </gree-dropdown>
  </gree-header>
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
import { editDevice, closePage } from '../../../../static/lib/PluginInterface.promise';

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
      deviceState: state => state.deviceInfo.deviceState,
      isAppointment: state => state.isAppointment,
      devname: state => state.deviceInfo.name,
      Pow: state => state.dataObject.Pow,
      List1: state => state.dataObject.List1,
    }),

    headerTheme() {
      const {Pow} = this;
      const {deviceState} = this;
      const isOffline = deviceState === -1 || this.$route.name === 'Offline';
      let ret = '';
      if (isOffline || !Pow) {
        ret = 'transparent';
      }
      return ret;
    },

    headerTitel() {
      return this.isAppointment ? '预约' : this.devname;
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
    clickBack() {
      if (this.$route.name === 'Home' || this.$route.name === 'Offline') {
        closePage();
      } else {
        this.$router.back();
      }
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
