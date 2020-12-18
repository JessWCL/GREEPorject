<!--
 * @Author: Jerry-Rain
 * @Date: 2019-08-09 14:43:49
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-05-09 11:03:03
 * @Description: 
 -->
<template>
  <gree-view>
    <gree-header
      theme="transparent"
      :left-options="{ preventGoBack: true }"
      :right-options="{ showMore: true }"
      @on-click-back="goBack"
      @on-click-more="moreInfo"
      >{{ devname }}</gree-header
    >
    <gree-error-page type="offline" :bg-url="BgUrl" :img-url="offlineImgUrl">
      <div class="tipList">
        <ol v-if="!mid == 80404">
          <li>{{ $language('offline.prompt1') }}</li>
          <li>{{ $language('offline.prompt2') }}</li>
          <li>{{ $language('offline.prompt3') }}</li>
          <li>{{ $language('offline.prompt4') }}</li>
        </ol>
        <ol v-else>
          <li>{{ $language('offline.wangGuan1') }}</li>
          <li>{{ $language('offline.wangGuan2') }}</li>
          <li>{{ $language('offline.wangGuan3') }}</li>
        </ol>
      </div>
    </gree-error-page>
  </gree-view>
</template>

<script>
import { ErrorPage, Header } from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import {
  closePage,
  editDevice,
} from '../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [ErrorPage.name]: ErrorPage,
    [Header.name]: Header,
  },
  data() {
    return {
      BgUrl: require('@/assets/img/bg_off.png'),
      offlineImgUrl: require('@/assets/img/offline.png'),
      mid: '80401',
    };
  },
  mounted() {
    this.mid = process.env.VUE_APP_MID;
    console.log('............', this.mid);
    console.log('离线页面加载');
  },
  computed: {
    ...mapState({
      devname: (state) => state.deviceInfo.name,
      mac: (state) => state.mac,
    }),
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
  methods: {
    goBack() {
      closePage();
    },
    moreInfo() {
      console.log('点击了更多设置');
      editDevice(this.mac);
    },
  },
};
</script>
