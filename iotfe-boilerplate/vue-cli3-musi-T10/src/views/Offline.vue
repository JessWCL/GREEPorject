<!--
 * @Author: Jerry-Rain
 * @Date: 2019-08-09 14:43:49
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-03-21 15:08:01
 * @Description: 离线页面
 -->
<template>
  <gree-view bg-color="#0b83e9">
    <gree-header
      theme="transparent"
      :left-options="{preventGoBack: true}"
      :right-options="{showMore: true}"
      @on-click-back="goBack"
      @on-click-more="moreInfo"
    >{{ devname }}</gree-header>
    <gree-error-page type="offline" :bg-url="BgUrl" :img-url="offlineImgUrl"></gree-error-page>
    <div class="tipList">
      <ol>
        <li>{{ '连接超时，试试以下方法：' }}</li>
        <li>{{ '1.请靠近设备重试。' }}</li>
        <li>{{ '2.请检查设备是否有电。' }}</li>
        <li>{{ '3.如果以上仍未恢复连接，您可尝试重置设备。' }}</li>
      </ol>
    </div>
  </gree-view>
</template>

<script>
import { ErrorPage, Header } from 'gree-ui'
import { mapState, mapMutations, mapActions } from 'vuex'
import {
  closePage,
  editDevice,
} from '../../../static/lib/PluginInterface.promise'

export default {
  components: {
    [ErrorPage.name]: ErrorPage,
    [Header.name]: Header
  },
  data() {
    return {
      BgUrl: require('@/assets/img/bg_off.png'),
      offlineImgUrl: require('@/assets/img/offline.png')
    }
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      mac: state => state.mac
    })
  },
  watch: {
    /**
     * @description 设备上线时返回主页
     */
    isOffline(newV) {
      if (newV === 2) {
        this.$router.push({ path: '/' })
      }
    }
  },
  methods: {
    goBack() {
      closePage()
    },
    moreInfo() {
      editDevice(this.mac)
    }
  }
}
</script>

<style lang="scss" scoped>

.tipList {
  position: absolute;
  top: 55%;
  z-index: inherit;
  li {
    line-height: 1.5;
  }
}
</style>
