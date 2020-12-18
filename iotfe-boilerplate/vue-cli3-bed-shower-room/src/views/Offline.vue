<template>
  <gree-view :bg-color="bgColor">
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
  changeBarColor
} from '../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [Header.name]: Header,
    [ErrorPage.name]: ErrorPage,
    [Dialog.name]: Dialog
  },
  data() {
    return {
      BgUrl: require('@/assets/imgs/background/blur_cool.png'),
      offlineImgUrl: require('@/assets/imgs/offline.png')
    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      functype: state => state.functype,
      mac: state => state.mac,
      g_mac: state => state.g_mac,
      isOffline: state => state.deviceInfo.deviceState,
      Mod: state => state.dataObject.Mod
    }),
    /**
     * @description 刘海屏顶部颜色变化
     */

    bgColor: {
      get() {
        let color;
        // if (this.Mod === 1 || this.Mod === 3 || this.Mod === 10) {
        //   color = '#6BA0E2';
        // } else if (this.Mod === 9) {
        //   color = '#2BC9DE';
        // } else if (this.Mod === 11) {
        //   console.log();
        //   color = '#3B8AFF';
        // } else {
        //   color = '#F9A130';
        // }
        if (this.Mod === 4) {
          color = '#F9A130';
        } else {
          color = '#0C5CB7';
        }
        return color;
      }
    }
  },
  watch: {
    /**
     * @description 设备上线时返回主页
     */
    isOffline(newV) {
      if (newV === 2) {
        this.$router.push({ path: '/' });
      }
    }
  },
  mounted() {
    // this.Mod === 1 || this.Mod === 3
    //   ? (this.BgUrl = require('@/assets/imgs/background/blur_cool.png'))
    //   : (this.BgUrl = require('@/assets/imgs/background/blur_heat.png'));
    this.Mod === 4
      ? (this.BgUrl = require('@/assets/imgs/background/blur_heat.png'))
      : (this.BgUrl = require('@/assets/imgs/background/blur_cool.png'));
    let color;
    if (this.Mod === 4) {
      color = '#F9A130';
    } else {
      color = '#0C5CB7';
    }
    changeBarColor(color);
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
        editDevice(this.g_mac);
      }
    },
    /**
     * @description 离线检查Dialog
     */
    offlineDialog() {
      Dialog.alert({
        title: '离线检查',
        content:
          '1.&ensp;家电是否连接电源？<br>2. 设备是否连上家庭WiFi？<br>3. 拔掉电源插头再插上试试看。<br>如果以上仍未恢复连接，您可尝试重置WiFi。',
        confirmText: '取消'
      });
    }
  }
};
</script>
