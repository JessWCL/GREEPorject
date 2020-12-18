<template>
  <gree-view :bg-color="PRIMARY_BAR_COLOR">
    <gree-header
      theme="transparent"
      :left-options="{ preventGoBack: true }"
      :right-options="{ showMore: true }"
      @on-click-back="clickBack"
      @on-click-more="moreInfo"
    >{{ deviceName }}</gree-header>
    <gree-page>
      <gree-power-off
        v-model="showPowerOff"
        :text="$language('home.powerOff')"
        :style="{ backgroundImage:'url(' + require('@/assets/images/closeBG.png') + ')' }"
      ></gree-power-off>
      <!-- 底部按钮 -->
      <gree-tool-bar @click="toolbarClick" />
      <pow-off-function-list :is-popup-show="isPopupShow"></pow-off-function-list>
    </gree-page>
  </gree-view>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import { Header, View, Page, PowerOff } from 'gree-ui';
import GreeToolBar from '@/components/828902/ToolBar';
import PowOffFunctionList from '@/components/828902/PowOffFunctionList';
import * as types from '../../store/types';
import { __PROD__, __TEST__, PRIMARY_BAR_COLOR } from '../../api/constant';
import {
  closePage,
  editDevice
} from '../../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [View.name]: View,
    [Page.name]: Page,
    [Header.name]: Header,
    [PowerOff.name]: PowerOff,
    GreeToolBar,
    PowOffFunctionList
  },
  data() {
    return {
      PRIMARY_BAR_COLOR,
      isPopupShow: { bottom: false },
    };
  },

  computed: {
    ...mapState({
      deviceName: state => state.deviceInfo.name,
      mac: state => state.mac,
      Pow: state => state.DataObject.Pow
    }),

    showPowerOff() {
      return Boolean(!this.Pow);
    }
  },

  methods: {
    ...mapMutations({
      setDataObject: types.SET_DATA_OBJECT,
    }),
    ...mapActions({
      sendCtrl: types.SEND_CTRL
    }),
    clickBack() {
      (__PROD__ || __TEST__) && closePage();
    },
    moreInfo() {
      editDevice(this.mac);
    },
    toolbarClick(footerItem, index) {
      console.log({ footerItem, index });
      
      const Pow = 1;
      switch (index) {
        case 0:
          this.setDataObject({ Pow });
          this.sendCtrl({ Pow });
          break;
        case 2:
          this.isPopupShow.bottom = !this.isPopupShow.bottom;
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang='scss'>
</style>
