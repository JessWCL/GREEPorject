<template>
  <gree-view>
    <gree-error-page
      type="offline"
      :bg-url="BgUrl"
      :img-url="offlineImgUrl"
      :text="$language('offline.prompt')"
    ></gree-error-page>
  </gree-view>
</template>

<script>
import { ErrorPage } from 'gree-ui';

export default {
  components: {
    [ErrorPage.name]: ErrorPage
  },
  data() {
    return {
      BgUrl: require('@/assets/images/bg_off.png'),
      offlineImgUrl: require('@/assets/images/offline.png')
    };
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
  }
};
</script>
