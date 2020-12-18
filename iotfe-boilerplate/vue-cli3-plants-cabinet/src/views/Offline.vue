<!--
 * @Author: Jerry-Rain
 * @Date: 2019-08-09 14:43:49
 * @LastEditors: Feng
 * @LastEditTime: 2019-12-05 16:30:10
 * @Description: 
 -->
<template>
  <gree-view>
    <gree-header
      theme="transparent"
      :left-options="{preventGoBack: true}"
      :right-options="{showMore: true}"
      @on-click-back="goBack"
      @on-click-more="moreInfo"
    >{{ devname }}</gree-header>
    <gree-error-page type="offline" :bg-url="BgUrl" :img-url="offlineImgUrl"></gree-error-page>
    <div class="tipList">
      <ol>
        <li>{{ $language('offline.prompt') }}</li>
      </ol>
    </div>
  </gree-view>
</template>

<script>
import { ErrorPage, Header } from "gree-ui";
import { mapState, } from "vuex";
import { closePage, editDevice } from '../../../static/lib/PluginInterface.promise.js';

export default {
  components: {
    [ErrorPage.name]: ErrorPage,
    [Header.name]: Header
  },
  data() {
    return {
      BgUrl: require("@/assets/img/bg_off.png"),
      offlineImgUrl: require("@/assets/img/offline.png")
    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      mac: state => state.mac,
      deviceState: state => state.deviceInfo.deviceState,
    })
  },
  watch: {
    /**
     * @description 设备上线时返回主页
     */
    deviceState(newV) {
      if (newV === 2) {
        this.$router.push({ path: "/" });
      }
    }
  },
  methods: {
    goBack() {
      closePage();
    },
    moreInfo() {
      editDevice(this.mac);
    }
  }
};
</script>

<style lang="scss" scoped>

.tipList {
  position: absolute;
  top: 1000px;
  z-index: inherit;
  white-space: nowrap;
  ol {
    li {
      text-align: center;
    }
  }
}
</style>
