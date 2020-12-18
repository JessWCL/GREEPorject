<template>
  <gree-view>
    <gree-header
      theme="transparent"
      :left-options="{ preventGoBack: false }"
      :right-options="{ showMore: true }"
      @on-click-back="clickBack"
      @on-click-more="moreInfo"
    >{{ deviceName }}</gree-header>
    <gree-error-page
      type="offline"
      :bg-url="BgUrl"
      :img-url="offlineImgUrl"
      :text="$language('offline.prompt')"
    >
      <a
        href="javascript:;"
        class="link"
        @click="clickOffline"
      >查看详情</a>
    </gree-error-page>
  </gree-view>
</template>

<script>
import { mapState } from 'vuex';
import { ErrorPage, Header, Dialog } from 'gree-ui';
import {
  editDevice,
  closePage
} from '../../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [ErrorPage.name]: ErrorPage,
    [Header.name]: Header,
    [Dialog.name]: Dialog
  },
  data() {
    return {
      BgUrl: require('@/assets/images/closeBG.png'),
      offlineImgUrl: require('@/assets/images/offline.png')
    };
  },

  computed: {
    ...mapState({
      deviceName: state => state.deviceInfo.name
    })
  },

  destroyed() {
    Dialog.closeAll();
  },

  methods: {
    clickBack() {
      closePage();
    },

    moreInfo() {
      editDevice(this.mac);
    },

    clickOffline() {
      Dialog.alert({
        title: '离线检查',
        content: `1.&ensp;${this.$language('offline.deviceName')}是否连接上电源？<br>2.&ensp;拔掉电源插头再插上试试看。<br>3.&ensp;路由器名称和密码是否有变动，若有变动则需要重新添加设备。`,
        confirmText: '取消'
      });
    }
  }
};
</script>
