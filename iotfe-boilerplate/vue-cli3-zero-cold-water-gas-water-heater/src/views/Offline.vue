<template>
  <gree-view
    id="OFFLINE"
    :bg-color="statusBarColor"
  >
    <!-- 头部 -->
    <gree-header>
      <gree-icon
        slot="overwrite-left"
        name="back"
        size="lg"
        @click="goBack"
      ></gree-icon>
      {{ devname }}
      <gree-icon
        slot="right"
        name="more"
        size="xl"
        @click="moreInfo"
      ></gree-icon>
    </gree-header>
    <gree-page no-navbar>
      <!-- 主要内容 -->
      <div class="offline-main">
        <div class="offline-main-up">
          <div class="offline-main-up-bg">
            <img
              class="offline-bg"
              :src="BgUrl"
              alt="Offline"
            />
          </div>
          <div class="offline-main-up-text">{{ $language('offline.offlineText') }}</div>
        </div>
        <div class="offline-main-down">
          <div
            v-html="$language('offline.prompt')"
            class="offline-main-down-text"
          ></div>
        </div>
        <div class="footer-bar">
          <div class="footer-bar-text">{{ $language('offline.offlineBarText') }}</div>
        </div>
      </div>
      <!-- <gree-error-page
        type="offline"
        :bg-url="BgUrl"
        :img-url="offlineImgUrl"
        :text="$language('offline.prompt2')"
      >
        <a
          href="javascript:;"
          class="link"
          @click="offlineDialog"
        >{{ $language('offline.prompt3') }}</a>
      </gree-error-page>-->
    </gree-page>
  </gree-view>
</template>

<script>
import { View, Icon, Header, Dialog, ErrorPage, ToolBar } from 'gree-ui';
import { mapState } from 'vuex';
import {
  closePage,
  editDevice,
} from '../../../static/lib/PluginInterface.promise';
import UpdateStatus from '../mixins/utils/updateStatus';

export default {
  components: {
    [View.name]: View,
    [Icon.name]: Icon,
    [Header.name]: Header,
    [Dialog.name]: Dialog,
    [ErrorPage.name]: ErrorPage,
    [ToolBar.name]: ToolBar,
  },
  mixins: [UpdateStatus],
  data() {
    return {
      statusBarColor: '#ffffff',
      BgUrl: require('@/assets/img/bg/bg_no_error.png'),
      offlineImgUrl: require('@/assets/img/offline.png'),
    };
  },
  computed: {
    ...mapState({
      state: state => state,
      mac: state => state.mac,
      devname: state => state.deviceInfo.name,
      isOffline: state => state.deviceInfo.deviceState,
    }),
  },
  watch: {
    /**
     * @description 设备上线时返回主页
     */
    isOffline: function updateOffline(newv) {
      newv === 2 ? this.$router.push({ path: '/' }) : '';
    },
    // isOffline(newVal) {
    //   newVal === 2 ? this.$router.push({ path: '/' }) : '';
    // }
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
        title: `${this.$language('offline.detailTitle')}`,
        content: `${this.$language('offline.prompt')}`,
        confirmText: `${this.$language('offline.canselMsg')}`,
      });
    },
  },
};
</script>
