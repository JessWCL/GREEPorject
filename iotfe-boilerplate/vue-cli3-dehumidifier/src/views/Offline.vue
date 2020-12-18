<template>
  <gree-view bg-color="#a0bf3b">
    <gree-header
        theme="transparent"
        :left-options="{preventGoBack: true}"
        @on-click-back="goBack"
        @on-click-more="moreInfo"
        :right-options="{showMore: !state.functype}"
      >{{ devname }}</gree-header>
    <gree-error-page
      type="offline"
      :bg-url="BgUrl"
      :img-url="offlineImgUrl"
      :text="$language('offline.device_offline')"
    ></gree-error-page>
  </gree-view>
</template>

<script>
import { Header, Dialog, ErrorPage } from 'gree-ui';
import { mapState } from 'vuex';
import {
  closePage,
  editDevice
} from '../../../static/lib/PluginInterface.promise';

export default {
  components: {
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
      state: state => state,
      mac: state => state.mac,
      isOffline: state => state.deviceInfo.deviceState,
      devname: state => state.deviceInfo.name.length > 12 ? `${state.deviceInfo.name.slice(0, 12)}...` : state.deviceInfo.name,
    })
  },
  watch: {
    /**
     * @description 设备上线时返回主页
     */
    isOffline(newVal) {
      newVal !== -1 ? this.$router.push({ path: '/' }) : '';
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
