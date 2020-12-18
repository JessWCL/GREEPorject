<template>
  <gree-view bg-color="#5c92b5">
    <gree-page no-navbar >
      <gree-header
        theme="transparent"
        :left-options="{preventGoBack: true}"
        @on-click-back="goBack"
        :right-options="{showMore: !state.functype}"
        @on-click-more="moreInfo"
      >{{ state.deviceInfo.name }}</gree-header>
      <gree-error-page
        type="offline"
        :bg-url="BgUrl"
        :img-url="offlineImgUrl"
      >
        连接已断开，
        <span 
          class="detail-link"
          @click="offlineDialog"
        >查看详情</span>
      </gree-error-page>
    </gree-page>
  </gree-view>
</template>

<script>
import { Header, Dialog, ErrorPage } from 'gree-ui';
import { mapState } from 'vuex';
import {
  closePage,
  editDevice,
  changeBarColor
} from '../../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [Header.name]: Header,
    [Dialog.name]: Dialog,
    [ErrorPage.name]: ErrorPage
  },
  data() {
    return {
      BgUrl: require('@/assets/images/offline_bg.png'),
      offlineImgUrl: require('@/assets/images/offline-icon.png')
    };
  },
  computed: {
    ...mapState({
      state: state => state,
      mac: state => state.mac,
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
  mounted() {
    changeBarColor('#5c92b5');
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
          '1.&ensp;加湿器是否连接电源？<br>2. 拔掉电源插头再插上试试看。<br>3. 路由器名称和密码是否有变动，若有变动则需要重新添加设备。',
        confirmText: '取消'
      });
    }
  }
};
</script>
<style lang="scss" scoped>
  .detail-link {
      padding-bottom: 2px;
      border-bottom: 1px solid rgb(67, 188, 248);
      color: rgb(67, 188, 248);
    }
</style>
