<template>
  <gree-view :bg-color="bgColor">
    <gree-header
      theme="transparent"
      :left-options="{preventGoBack: true}"
      @on-click-back="goBack"
      :right-options="{showMore: !functype}"
      @on-click-more="moreInfo"
    >{{ devname }}</gree-header>
    <gree-page
      no-navbar
      class="page-error"
      :style="{backgroundImage:'url('+ BgUrl +')'}"
    >
      <div class="error-tips">
        <img src="../assets/imgs/Error.png">
        <p>{{ $language("error.error") }}</p>
      </div>
    </gree-page>
  </gree-view>
</template>

<script>
import { Header } from 'gree-ui';
import { mapState } from 'vuex';
import {
  closePage,
  editDevice,
  changeBarColor
} from '../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [Header.name]: Header
  },
  data() {
    return {
      BgUrl: require('@/assets/imgs/background/blur_cool.png')
    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      functype: state => state.functype,
      mac: state => state.mac,
      g_mac: state => state.g_mac,
      GetEr: state => state.dataObject.GetEr,
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
    },
    Mod: {
      handler(newValue) {
        // this.Mod === 4
        //   ? (this.BgUrl = require('@/assets/imgs/background/blur_heat.png'))
        //   : (this.BgUrl = require('@/assets/imgs/background/blur_cool.png'));
        let color;
        if (newValue === 4) {
          this.BgUrl = require('@/assets/imgs/background/blur_heat.png');
          color = '#F9A130';
        } else {
          this.BgUrl = require('@/assets/imgs/background/blur_cool.png');
          color = '#0C5CB7';
        }
        changeBarColor(color);
      },
      immediate: true
    }
  },
  mounted() {
    // this.Mod === 4
    //   ? (this.BgUrl = require('@/assets/imgs/background/blur_heat.png'))
    //   : (this.BgUrl = require('@/assets/imgs/background/blur_cool.png'));
    // let color;
    // if (this.Mod === 4) {
    //   color = '#F9A130';
    // } else {
    //   color = '#0C5CB7';
    // }
    // changeBarColor(color);
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
    }
  }
};
</script>
