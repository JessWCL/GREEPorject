<template>
  <gree-view bg-color="#0ABFEC">
    <gree-header
      theme="transparent"
      :left-options="{preventGoBack: true}"
      :right-options="{showMore: true}"
      @on-click-back="goBack"
      @on-click-more="moreInfo"
    >
      {{ $store.state.deviceInfo.name }}
    </gree-header>
    <gree-error-page
      type="offline"
      :bg-url="BgUrl"
      :img-url="offlineImgUrl"
    >
    </gree-error-page>
    <div class="tipList">
      <ol>
        <li v-html="$language('offline.prompt')"/>
        <!-- <span>{{$language('offline.prompt2')}}</span>
        <span @click="showPrompt"><u>{{$language('offline.prompt3')}}</u></span> -->
      </ol>
    </div>
  </gree-view>
</template>

<script>
import { View, Header, ErrorPage, Toast } from 'gree-ui';
import {
  closePage,
  editDevice,
} from "../../../static/lib/PluginInterface.promise";

export default {
  components: {
    [View.name]: View,
    [ErrorPage.name]: ErrorPage,
    [Header.name]: Header,
    [Toast.name]: Toast,
  },
  data() {
    return {
      BgUrl: require('@/assets/img/bg_off.png'),
      offlineImgUrl: require('@/assets/img/offline.png'),
      // isPromptShow: false
    };
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
  methods: {
    goBack() {
      closePage();
    },
    moreInfo() {
      console.log(this.$store.state.mac);
      editDevice(this.$store.state.mac);
    },
    // showPrompt() {

    // }
  },
};
</script>

<style lang="scss" scoped>

.tipList {
  position: absolute;
  top: 1000px;
  z-index: inherit;
  
}
<style>
