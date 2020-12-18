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
      <a href="javascript:;" class="link" @click="offlineDialog">查看详情</a>
    </gree-error-page>
  </gree-view>
</template>

<script>
import { Header, ErrorPage, Dialog } from 'gree-ui';
import { mapState } from 'vuex';
import { closePage, editDevice } from '../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [Header.name]: Header,
    [ErrorPage.name]: ErrorPage
  },
  data() {
    return {
      offlineImgUrl: require('@/assets/img/offline.png'),
      offline_bg: require('@/assets/img/bg_off.png')
    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      isOffline: state => state.deviceInfo.deviceState,
      functype: state => state.functype,
      mac: state => state.mac,
      InAirQuality: state => state.dataObject.InAirQuality
    })
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
    offlineDialog() {
      Dialog.alert({
        title: '离线检查',
        content: `1.${this.devname}是否连接上电源？<br>2.拔掉电源插头再插上试试看。<br>3.路由器名称和密码是否有变动，若有变动则需要重新添加设备。`,
        confirmText: '取消'
      });
    }
  }
};
</script>
