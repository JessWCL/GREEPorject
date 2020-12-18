<template>
  <offline-component :title="devname">
    <ol>
      <li>空气净化器是否连接上电源？</li>
      <li>拔掉电源插头再插上试试看。</li>
      <!-- TODO: 添加设备带下划线，点击可跳转链接到设备配网第一步 -->
      <li>路由器名称和密码是否有变动，若有变动则需要重新添加设备。</li>
    </ol>
  </offline-component>
</template>

<script>
import { mapState } from 'vuex';
import { changeBarColor } from '../../../../static/lib/PluginInterface.promise';

export default {
  data() {
    return {};
  },
  mounted() {
    changeBarColor('#ffffff');
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name
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
    }
  }
};
</script>
