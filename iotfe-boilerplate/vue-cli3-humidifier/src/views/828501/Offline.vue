<template>
  <div class="page">
    <div class="header">
      <gree-header
        theme="transparent"
        :left-options="{preventGoBack: true}"
        @on-click-back="goBack"
      >
        {{ devname }}
      </gree-header>
      <div class="main">
        <img src="../../assets/images/offline.png">
        <span>{{ $language('offline.prompt') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {
  closePage,
} from '../../../../static/lib/PluginInterface.promise';
import { judgeStringLength } from '../../utils/index';

export default {
  computed: {
    ...mapState({
      devname: state => judgeStringLength(state.deviceInfo.name),
      functype: state => state.functype,
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
<style lang="scss" scoped>
.page{
  height: 100%;
  width: 100%;
  background-image: url('../../assets/images/offline_bg.png');
  background-size: 100% 100%;
  position: relative;
  .main{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    img{
      width: 220px;
      height: 70px;
    }
    span{
      font-size: 46px;
      color: #404657;
      margin-top: 92px;
    }
  }
}
</style>

