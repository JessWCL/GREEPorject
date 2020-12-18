<!--
 * @Descripttion: 
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2019-09-05 14:12:57
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-05-27 11:25:59
 -->
<template>
  <gree-view :bg-color="bgStatus">
    <gree-header
      theme="transparent"
      :left-options="{preventGoBack: true}"
      @on-click-back="goBack"
      :right-options="{showMore: !functype}"
      @on-click-more="moreInfo"
    >{{ devname }}</gree-header>
    <gree-error-page
      type="offline"
      :bg-url="BgUrl"
      :img-url="offlineImgUrl"
      text="连接已断开，"
    >
      <a
        href="javascript:;"
        class="link"
        @click="offlineDialog"
      >查看详情</a>
    </gree-error-page>
  </gree-view>
</template>

<script>
import { Header, ErrorPage, Dialog } from 'gree-ui';
import { mapState } from 'vuex';
import {
  closePage,
  editDevice,
} from '../../../static/lib/PluginInterface.promise';
import { changeBarColorPlugin} from '../api/pluginInterface.js';

export default {
  components: {
    [Header.name]: Header,
    [ErrorPage.name]: ErrorPage,
    [Dialog.name]: Dialog
  },
  data() {
    return {
      BgUrl: require('../assets/img/bg_off_s.png'),
      offlineImgUrl: require('@/assets/img/offline.png'),
      bgStatus: '#cdd0d9'
    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      functype: state => state.functype,
      mac: state => state.mac,
      isOffline: state => state.deviceInfo.deviceState
    })
  },
  watch: {
    /**
     * @description 设备上线时返回主页
     */
    isOffline(newV) {
      if (newV === 2) {
        this.$router.push({ name: 'Home' });
      }
    }
  },
  created() {
    this.bgStatus = process.env.VUE_APP_MID === '28a01' ? '#cdd0d9' : '#4DB6CF';
    changeBarColorPlugin(process.env.VUE_APP_MID === '28a01' ? '#cdd0d9' : '#4DB6CF');
  },
  methods: {
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
      if (!this.functype) {
        editDevice(this.mac);
      }
    },
    /**
     * @description 离线检查Dialog
     */
    offlineDialog() {
      Dialog.alert({
        title: '离线检查',
        content:
          `1. ${this.devname}是否连接电源？<br>2. 拔掉电源插头再插上试试看。<br>3. 路由器名称和密码是否有变动,若有变动则需要重新添加设备。`,
        confirmText: '取消'
      });
    }
  }
};
</script>

<style lang="scss" >
.gree-dialog-text {
  text-align: left !important;
  font-size: 40px;
}
.gree-dialog-content {
 width: 850px;
}
</style>
