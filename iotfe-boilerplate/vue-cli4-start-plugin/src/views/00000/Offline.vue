<template>
  <!-- 离线组件 —— 默认状态没WiFi按钮 -->
  <offline-component :title="devname" classname="设备品类名" />
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name
    })
  }
};
</script>
