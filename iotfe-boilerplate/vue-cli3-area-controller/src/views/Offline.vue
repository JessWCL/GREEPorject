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
      :text="$language('offline.prompt')"
    >
      <a
        href="javascript:;"
        class="link"
        @click="offlineDialog"
      >{{ $language('offline.detail') }}</a>
    </gree-error-page>
  </gree-view>
</template>

<script>
import { Header, ErrorPage, Dialog } from 'gree-ui';
import { mapState } from 'vuex';
import {
  closePage,
  editDevice
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
      isOffline: state => state.deviceInfo.deviceState,
      Mod: state => state.dataObject.Mod
    }),
    /**
     * @description 刘海屏顶部颜色变化
     */

    bgColor: {
      get() {
        let color;
        if (
          this.Mod === 1 ||
          this.Mod === 3 ||
          this.Mod === 4 ||
          this.Mod === 5
        ) {
          color = '#6BA0E2';
        } else {
          color = '#F9A130';
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
    this.Mod === 2
      ? (this.BgUrl = require('@/assets/imgs/background/blur_heat.png'))
      : (this.BgUrl = require('@/assets/imgs/background/blur_cool.png'));
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
        title: this.$language('offline.title'),
        content: `1.&ensp;${this.$language(
          'offline.first'
        )}<br>2. ${this.$language('offline.second')}<br>3. ${this.$language(
          'offline.three'
        )}<br>${this.$language('offline.four')}`,
        confirmText: this.$language('offline.Cancel')
      });
    }
  }
};
</script>
