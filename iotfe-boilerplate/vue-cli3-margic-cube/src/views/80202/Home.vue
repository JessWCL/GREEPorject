<template>
  <gree-view bg-color="#D5D5D5">
    <gree-page
      no-navbar
      class="page-home"
    >
      <!-- loading -->
      <div
        v-if="!finishLoad"
        class="blank"
      >
        <img
          src="@/assets/img/loading2.gif"
          class="loading"
        >
      </div>
      <!-- 头部 -->
      <div
        class="page-header"
        :style="{backgroundImage:'url(' + head_bg + ')'}"
      >
        <gree-header
          theme="transparent"
          :left-options="{preventGoBack: true}"
          :right-options="{showMore: true}"
          @on-click-back="goBack"
          @on-click-more="moreInfo"
        >
          {{ devname }}
        </gree-header>
        <div 
          class="battery" 
          v-if="!isNaN(dataObject.Pow)">
          <span>{{ $language('home.battery') }}</span>
          <span>{{ dataObject.Pow }}%</span>
          <img :src="batteryImg">
        </div>
      </div>
      <!-- 主要内容 -->
      <div 
        v-if="deviceInfo.deviceState === 2" 
        class="page-main">
        <div 
          class="warning" 
          v-if="dataObject.Pow <= 10">
          <img src="@assets/img/tip.png">
          <span v-text="$language('home.battery_tip')"/>
        </div>
        <div 
          class="tip" 
          v-text="$language('home.tip')"/>
        <div class="scene">
          <div
            class="card"
            v-for="(item, index) in dataObject.Scene"
            :key="index"
            @click="goPage(index)"
          >
            <img :src="sceneImgList[index]">
            <span
              class="name"
              :class="{'name-opacity': !(item || item === '')}"
            >{{ (item || item === '') ? item : $language('home.noScene') }}</span>
          </div>
        </div>
      </div>
      <div
        v-else
        class="offline-tip">
        1.请确保设备靠近网关。<br/>
        2.请确保网关网络正常。<br/>
        3.请检查设备是否断电。<br/>
        4.若以上均未恢复连接，可以尝<br/>
        试重新绑定。
      </div>
      <div 
        class="bottom-btn" 
        v-if="deviceInfo.deviceState === 2">
        <img 
          :src="findImg"
          @click="findCube">
        <span>{{ $language('home.findBtn') }}</span>
      </div>
    </gree-page>
  </gree-view>
</template>

<script>
import { Header, NoticeBar } from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import {
  closePage,
  editDevice,
} from '../../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [Header.name]: Header,
    [NoticeBar.name]: NoticeBar,
  },
  // mixins: [homeConfig],
  data() {
    return {};
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      deviceInfo: state => state.deviceInfo,
      devname: state => state.deviceInfo.name,
      mac: state => state.mac,
      finishLoad: state => state.finishLoad,
      sceneDate: state => state.sceneDate,
      devLang: state => state.deviceInfo.lang
    }),
    sceneImgList() {
      if (this.devLang === 'zh_CN') {
        return [
          require('@/assets/img/home.png'),
          require('@/assets/img/getUp.png'),
          require('@/assets/img/cinema.png'),
          require('@/assets/img/sleep.png'),
          require('@/assets/img/leave.png'),
        ];
      }
      return [
        require('@/assets/img/home_en.png'),
        require('@/assets/img/getUp_en.png'),
        require('@/assets/img/cinema_en.png'),
        require('@/assets/img/sleep_en.png'),
        require('@/assets/img/leave_en.png'),
      ]
    },
    head_bg() {
      const bg = require('@/assets/img/bg_header_on.png');
      return bg;
    },
    batteryImg() {
      if (this.dataObject.Pow >= 100) {
        return require('@assets/img/battery_fill.png');
      } else if (this.dataObject.Pow <= 10) {
        return require('@assets/img/battery_red.png');
      }
      let num = 3 - parseInt(this.dataObject.Pow / 33);
      console.log(this.dataObject.Pow);
      num = num || 1;
      return require(`@assets/img/battery_${num}.png`);
    },
    findImg() {
      return this.dataObject.FindCube ? require('@assets/img/find.gif') : require('@assets/img/find.png');
    },
  },
  watch: {},
  created() {},
  mounted() {
    document.getElementsByClassName('gree-header-title')[0].style = 'color: #404657 !important';
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT',
      setState: 'SET_STATE'
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL'
    }),
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
    findCube() {
      console.log(this.dataObject.FindCube);
      const setData = { FindCube: this.dataObject.FindCube ? 0 : 1 };
      this.sendCtrl(setData);
      this.setDataObject(setData);
    },
    goPage(index) {
      this.sendCtrl({Scene: index + 1});
    }
  }
};
</script>

<style lang="scss" scoped>
.scroll-view-wrapper {
  height: calc(100vh - 690px);
}
</style>
