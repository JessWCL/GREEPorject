<template>
  <div class="page">
    <div class="page-content page-offline">
      <div class="page-header">
        <gree-header
          theme="transparent"
          :left-options="{preventGoBack: true}"
          @on-click-back="goBack"
          :right-options="{showMore: !functype && editEnable}"
          @on-click-more="moreInfo"
        >{{ devname }}</gree-header>
        <div class="offline-body">
          <div class="offline-empty"></div>
          <div class="offline-msg">
            <span>{{ $language('offline.prompt') }}</span>，
            <span
              class="offline-msg-link"
              @click="offlineDialog"
            >{{ $language('offline.detail') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {
  closePage,
  editDevice,
  changeBarColor
} from '../../../static/lib/PluginInterface.promise';

export default {
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      editEnable: state => state.editEnable,
      functype: state => state.functype,
      mac: state => state.mac
    })
  },
  watch: {
    /**
     * @description 设备上线时返回主页
     */
    isOffline(newV) {
      if (newV === 2 || newV === 3) {
        this.$router.push({ path: '/' });
      }
    }
  },
  mounted() {
    changeBarColor('#ddd5a3');
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
        if (this.editEnable) {
          editDevice(this.mac);
        }
      }
    },
    /**
     * @description 离线检查Dialog
     */
    offlineDialog() {
      this.$dialog.alert({
        title: '离线检查',
        content:
          '1.&ensp;家电是否连接电源？<br>2. 设备是否连上家庭WiFi？<br>3. 拔掉电源插头再插上试试看。<br>如果以上仍未恢复连接，您可尝试重置WiFi。',
        confirmText: '取消'
      });
    }
  }
};
</script>
