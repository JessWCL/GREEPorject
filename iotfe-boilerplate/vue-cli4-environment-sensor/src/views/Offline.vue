<template>
  <gree-view bg-color="#add24c">
    <gree-header
      theme="transparent"
      :title="devname"
      :left-options="{ preventGoBack: true }"
      @on-click-back="goBack"
      :right-options="{ showMore: !functype }"
      @on-click-more="moreInfo"
    />
    <gree-error-page type="offline" :bg-url="offline_bg" :img-url="offlineImgUrl" text="连接已断开，">
      <a href="javascript:;" class="link" @click="actDialog.open = true">查看详情</a>
    </gree-error-page>
    <gree-dialog title="离线检查" :closable="false" v-model="actDialog.open" :btns="actDialog.btns">
      <p>1.家电是否电量耗尽？</p>
      <p>2.家电是否处于关机状态？</p>
      <p>3.设备是否连上家庭WiFi？</p>
      <p>4.拔掉电源插头在插上试试看。</p>
      <p>如果以上仍未恢复连接，您可尝试重置WiFi。</p>
    </gree-dialog>
  </gree-view>
</template>

<script>
import { Header, ErrorPage, Dialog } from 'gree-ui';
import { mapState } from 'vuex';
import { closePage, editDevice } from '../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [Header.name]: Header,
    [ErrorPage.name]: ErrorPage,
    [Dialog.name]: Dialog
  },
  data() {
    return {
      offlineImgUrl: require('@/assets/img/offline.png'),
      actDialog: {
        open: false,
        btns: [
          {
            text: '取消',
            handler: this.onActConfirm
          }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      isOffline: state => state.deviceInfo.deviceState,
      functype: state => state.functype,
      mac: state => state.mac,
      InAirQuality: state => state.dataObject.InAirQuality
    }),
    offline_bg() {
      let bg;
      switch (this.InAirQuality) {
        case 1:
          bg = require('@/assets/img/bg_off_a.png');
          break;
        case 2:
          bg = require('@/assets/img/bg_off_b.png');
          break;
        case 3:
          bg = require('@/assets/img/bg_off_c.png');
          break;
        default:
          bg = require('@/assets/img/bg_off_s.png');
          break;
      }
      return bg;
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
    onActConfirm() {
      this.actDialog.open = false;
    }
  }
};
</script>
