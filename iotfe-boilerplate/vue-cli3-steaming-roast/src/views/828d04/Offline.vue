<template>
  <gree-view>
    <common-header />
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
import { ErrorPage, Dialog } from 'gree-ui';
import { DARK_BAR_COLOR } from '@/api/828d04/constant';
import { changeBarColor } from '../../../../static/lib/PluginInterface.promise';
import CommonHeader from '@/components/common/CommonHeader.vue';

export default {
  components: {
    [ErrorPage.name]: ErrorPage,
    [Dialog.name]: Dialog,
    CommonHeader
  },
  data() {
    return {
      BgUrl: require('@/assets/img/bg_off.jpg'),
      offlineImgUrl: require('@/assets/img/offline.png')
    };
  },

  mounted() {
    changeBarColor(DARK_BAR_COLOR);
  },

  destroyed() {
    Dialog.closeAll();
  },

  methods: {
    clickOffline() {
      Dialog.alert({
        title: '离线检查',
        content:
          '1.&ensp;蒸烤双能机是否连接上电源？<br>2. 拔掉电源插头再插上试试看。<br>3.路由器名称和密码是否有变动，若有变动则需要重新添加设备。',
        confirmText: '取消'
      });
    }
  }
};
</script>
