<!--
 * @Author: Jerry-Rain
 * @Date: 2019-09-10 15:34:25
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2019-12-13 08:35:32
 * @Description: 继承强哥的意志-写一个快速开始的101模板; 
 -->
<template>
  <gree-view>
    <gree-page no-navbar class="page-home">
      <!-- 头部 -->
      <div class="page-header" :style="{backgroundImage:'url(' + head_bg + ')'}">
        <gree-header
          theme="transparent"
          :left-options="{preventGoBack: true}"
          :right-options="{showMore: true}"
          @on-click-back="goBack"
          @on-click-more="moreInfo"
        >{{ devname }}</gree-header>
      </div>
      <div class="page-main">
      <!-- 居中内容提示 -->
      </div>
      <!-- 尾部 -->
      <div class="page-footer">
        <div class="item" v-for="(item, index) in functionList" :key="index">
          <img :src="item.url" @click="footerFunction(index)" />
          <span>{{ item.name }}</span>
        </div>
      </div>
      <!-- drawer pop弹框 -->
      <gree-popup v-model="showDrawer" position="bottom">
        <div class="drawer-area">
          <Drawer @hideDrawer="hideDrawer()" />
        </div>
      </gree-popup>
      <!-- 关机页面 -->
      <gree-power-off
        v-model="showPowerOff"
        text="已关机"
        :style="{backgroundImage:'url(' + power_off_bg + ')'}"
      ></gree-power-off>
    </gree-page>
  </gree-view>
</template>

<script>
import { Header, PowerOff, Popup } from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import {
  closePage,
  editDevice
} from '@/../../static/lib/PluginInterface.promise';
import Drawer from '@/component/Drawer';
import homeConfig from '@/mixins/config/start_plugin/home.js';
import * as types from '../../store/types';


export default {
  components: {
    [Header.name]: Header,
    [PowerOff.name]: PowerOff,
    [Popup.name]: Popup,
    Drawer
  },
  mixins: [homeConfig],
  data() {
    return {
      showPowerOff: false,
      showDrawer: false
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      devname: state => state.deviceInfo.name,
      functype: state => state.functype,
      mac: state => state.mac,
      pow: state => state.dataObject.pow
    }),

    head_bg() {
      const bg = require('@/assets/img/bg_header_on.png');
      return bg;
    },
    power_off_bg() {
      const bg = require('@/assets/img/bg_off.png');
      return bg;
    }
  },
  watch: {
    pow(newv) {
      newv ? '' : (this.power_off_bg = require('@/assets/img/bg_off.png'));
      return newv ? (this.showPowerOff = false) : (this.showPowerOff = true);
    }
  },
  created() {},
  mounted() {},
  methods: {
    ...mapMutations({
      setDataObject: types.SET_DATA_OBJECT
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
    /**
     * @description 隐藏抽屉列表
     */
    hideDrawer() {
      this.showDrawer = false;
    },
    /**
     * @description: 底部功能按钮的点击事件
     */
    footerFunction(index) {
      console.log('btnfunc-', index);
      switch (index) {
        case 0:
          this.pow === 1
            ? this.setDataObject({ pow: 0 })
            : this.setDataObject({ pow: 1 });
          console.log(this.pow);
          break;
        case 1:
          this.showDrawer = true;
          break;
        case 2:
          break;
        default:
          break;
      }
    }
  }
};
</script>
