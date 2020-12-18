<template>
  <gree-view>
    <gree-page no-navbar>
      <gree-header
        theme="transparent"
        :left-options="{preventGoBack: true}"
        @on-click-back="goBack"
        :right-options="{showMore: !state.functype && state.editEnable}"
        @on-click-more="moreInfo"
      >{{ state.deviceInfo.name }}</gree-header>
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
    </gree-page>
  </gree-view>
</template>

<script>
import { View, Header, Dialog, ErrorPage } from 'gree-ui';
import { mapState } from 'vuex';
import {
  closePage,
  editDevice
} from '../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [View.name]: View,
    [Header.name]: Header,
    [Dialog.name]: Dialog,
    [ErrorPage.name]: ErrorPage
  },
  data() {
    return {
      BgUrl: require('@/assets/img/bg_off.png'),
      offlineImgUrl: require('@/assets/img/offline.png')
    };
  },
  computed: {
    ...mapState({
      state: state => state
    }),
    /**
     * @description 更新背景图片
     */
    HeaderImg() {
      return `offline-${
        this.state.dataObject.Mod === this.state.ModHeat ? 'heat' : 'cool'
      }`;
    }
  },
  watch: {
    /**
     * @description 设备上线时返回主页
     */
    isOffline(newVal) {
      newVal === 2 ? this.$router.push({ path: '/' }) : '';
    }
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
      editDevice(this.mac);
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
