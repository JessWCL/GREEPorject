<!--
 * @Author: Jerry-Rain
 * @Date: 2019-08-09 14:43:49
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-07-23 12:33:55
 * @Description: wifi设备的离线页面
 -->
<template>
  <gree-view bg-color="#56A9F7">
    <gree-header
      theme="transparent"
      :left-options="{preventGoBack: true}"
      @on-click-back="goBack"
      :right-options="{showMore: !functype}"
      @on-click-more="moreInfo"
    >{{ devname }}</gree-header>
    <gree-error-page
      type="offline"
      :bg-url="BgUrl"
      :img-url="offlineImgUrl"
      text="连接已断开，"
    >
      <a
        href="javascript:;"
        class="link"
        @click="offlineDialog"
      >查看详情</a>
    </gree-error-page>
  </gree-view>
</template>

<script>
import { Header, ErrorPage, Dialog } from 'gree-ui';
import { mapState } from 'vuex';
import {
  closePage,
  editDevice,
} from '../../../static/lib/PluginInterface.promise';
import { changeBarColor } from '../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [Header.name]: Header,
    [ErrorPage.name]: ErrorPage,
    [Dialog.name]: Dialog
  },
  data() {
    return {
      BgUrl: require('@/assets/img/bg_off.png'),
      offlineImgUrl: require('@/assets/img/offline.png')
    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      functype: state => state.functype,
      mac: state => state.mac,
      isOffline: state => state.deviceInfo.deviceState
    })
  },
  watch: {
    /**
     * @description 设备上线时返回主页
     */
    isOffline(newV) {
      if (newV === 2) {
        this.$router.push({ name: 'Home' });
      }
    }
  },
  mounted() {
    changeBarColor('#56A9F7');
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
        content: `1.智能插座是否已通电？<br>2.网络是否通畅?<br>3.路由器名称和密码是否有变动，若有变动则需要重新添加设备。`,
        confirmText: '取消'
      });
    }
  }
};
</script>

<style lang="scss" >

</style>
