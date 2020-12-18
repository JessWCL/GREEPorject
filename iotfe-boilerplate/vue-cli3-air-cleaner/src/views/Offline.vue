<!--
 * @Descripttion: 
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2019-09-05 14:12:57
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-03-18 18:47:19
 -->
<template>
  <gree-view bg-color="#6CA0E3">
    <gree-header
      theme="transparent"
      :left-options="{preventGoBack: true}"
      @on-click-back="goBack"
      :right-options="{showMore: !isScene}"
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
  closePagePlugin,
  editDevicePlugin,
  changeBarColorPlugin
} from '../utils/pluginInterface';
import homeData from '../api/828105/home';

export default {
  components: {
    [Header.name]: Header,
    [ErrorPage.name]: ErrorPage,
    [Dialog.name]: Dialog
  },
  data() {
    return {
      BgUrl: require('@/assets/img/bg_off_gooder.png'),
      offlineImgUrl: require('@/assets/img/offline.png'),
      homeData
    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      isScene: state => state.isScene,
      mac: state => state.mac,
      isOffline: state => state.deviceInfo.deviceState,
      wipm25: state => state.dataObject.wipm25
    })
  },
  watch: {
    /**
     * @description 设备上线时返回主页
     */
    isOffline(newV) {
      if (newV === 2) {
        this.$router.push({ path: '/' });
      }
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const newV = this.wipm25;
      let status = NaN;
      if (newV >= 0 && newV < 36) {
        status = 'gooder';
      } else if (newV >= 36 && newV < 116) {
        status = 'middle';
      } else if (newV === 1001) {
        status = 'unstable';
      } else {
        status = 'bad';
      }
      console.log(`%c ${this.homeData[0].pm25statusObj[status].barColor}`,`background:${this.homeData[0].pm25statusObj[status].barColor};`);
      changeBarColorPlugin(this.homeData[0].pm25statusObj[status].barColor);
      this.BgUrl = require(`@/assets/img/bg_off_${status}.png`);
    },
    /**
     * @description 返回键
     */
    goBack() {
      closePagePlugin();
    },
    /**
     * @description 编辑设备名称
     */
    moreInfo() {
      editDevicePlugin(this.mac);
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
