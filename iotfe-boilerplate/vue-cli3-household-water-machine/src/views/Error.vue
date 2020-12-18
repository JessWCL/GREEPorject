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
        <img src="../assets/img/Error.png">
        <p>{{ $language("error.error") }}</p>
      </div>
    </gree-page>
  </gree-view>
</template>

<script>
import { Header } from 'gree-ui';
import { mapState } from 'vuex';
import { editDevicePlugin, closePagePlugin } from '../api/utils';

export default {
  components: {
    [Header.name]: Header
  },
  data() {
    return {
      BgUrl: require('@/assets/img/blur_cool.png')
    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      functype: state => state.functype,
      mac: state => state.mac,
      GetEr: state => state.dataObject.GetEr,
      Mod: state => state.dataObject.Mod
    }),
    /**
     * @description 刘海屏顶部颜色变化
     */

    bgColor: {
      get() {
        let color;
        color = this.Mod === 2 ? '#F9A130' : '#6BA0E2';
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
    this.Mod === 1
      ? (this.BgUrl = require('@/assets/img/blur_cool.png'))
      : (this.BgUrl = require('@/assets/img/blur_heat.png'));
  },
  methods: {
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
      if (!this.functype) {
        editDevicePlugin(this.mac);
      }
    }
  }
};
</script>
