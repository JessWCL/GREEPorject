<template>
  <gree-view>
    <gree-page no-navbar class="page-home" v-if="!isFirst">
      <div
        class="page-header"
        :style="{ backgroundImage: 'url(' + head_bg + ')' }"
      >
        <gree-header
          theme="transparent"
          :left-options="{ preventGoBack: true }"
          @on-click-back="goBack"
          :right-options="{ showMore: true }"
          @on-click-more="moreInfo"
        >{{ devname }}</gree-header

        >
        <div class="battery-remind">
          <h3 :style="`${isSwitchOn ? 'text-shadow:0 0 3px #fff;' : ''}`">
            {{ isSwitchOn ? $language('home.on') : $language('home.off') }}
          </h3>
        </div>
      </div>
      <!-- 中间及下面 -->
      <div class="page-main">
        <div class="btn-control">
          <div class="btn-open-img" @click="handleBtn()">
            {{ !isSwitchOn ? $language('home.on') : $language('home.off') }}
          </div>
        </div>
        <!-- 预约入口 -->
        <!-- <div class="btn-appointment" @click="handleAppointment()">
          <img
            class="appointment-img"
            src="../../assets/img/appointment-icon-close.png"
            alt="appointment"
          />
          <h3 class="name-appointment">{{ $language('home.schedules') }}</h3>
        </div> -->
      </div>
      <div v-show="false">{{ ColorChange }}</div>
    </gree-page>
    <div 
      class="box" 
      v-else
    >
      <gree-activity-indicator 
        gree-activity-indicator-css 
        vertical
      >加载中...</gree-activity-indicator>
    </div>
  </gree-view>
</template>

<script>
import {
  Header,
  List,
  Item,
  // Block,
  Icon,
  ActivityIndicator,
  ScrollView,
  ScrollViewMore,
  // Toast,
} from 'gree-ui';
// import dayjs from 'dayjs';
import { mapState, mapMutations, mapActions } from 'vuex';
// import { getMsgRequest } from '../../../../static/lib/PluginInterface.promise';
// closePage,
// editDevice,
// changeBarColor,
import {
  changeBarColorPlugin,
  closePagePlugin,
  tuyaControlDevPlugin,
  tuyaDeviceMorePlugin,
} from '../../api/utils';

export default {
  components: {
    [Header.name]: Header,
    [List.name]: List,
    [Item.name]: Item,
    // [Block.name]: Block,
    [Icon.name]: Icon,
    [ActivityIndicator.name]: ActivityIndicator,
    [ScrollView.name]: ScrollView,
    [ScrollViewMore.name]: ScrollViewMore,
  },
  data() {
    return {
      lists: [],
      isLoading: false,
      isFinished: false,
      status: this.$language('home.off'),
      timer: null,
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      devname: state => state.deviceInfo.name,
      functype: state => state.functype,
      mac: state => state.mac,
      typeNumber: state => state.typeNumber,
      properties: state => state.dataObject.properties,
      isSwitchOn(state) {
        if (state.typeNumber) {
          return state.dataObject.properties[Number(state.typeNumber) - 1].value === true;
        } 
        return state.dataObject.properties[0].value === true;
      },
      isFirst: state => state.isFirst,
    }),
    /**
     * @description 主页面下根据开关状态更新背景图
     */
    head_bg() {
      let bg;
      if (this.isSwitchOn) {
        bg = require('@/assets/img/open-bg.png');
      } else {
        bg = require('@/assets/img/close-bg.png');
      }
      return bg;
    },
    /**
     * @description 主页面下根据开关状态更新状态栏颜色
     */
    ColorChange() {
      let color = false;
      this.isSwitchOn ? (color = '#51A9F9') : (color = '#AEB2B6');
      changeBarColorPlugin(color);
      return color;
    },
  },
  watch: {},
  mounted() {
    // 解决ios不支持按钮:active方法
    // const a = document.getElementsByTagName('button');
    const a = document.getElementsByClassName('btn-control');
    for (let i = 0; i < a.length; i++) {
      a[i].addEventListener('touchstart', () => {}, false);
    }
    // this.isLoading = false;
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT',
      setBtnStatus: 'CHANGE_STATUS',
      setIsUiLock: 'SET_UILOCK',
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL',
    }),
    /**
     * @description 返回键
     */
    goBack() {
      closePagePlugin();
    },
    /**
     * @description 编辑设备名称
     */
    moreInfo() {
      tuyaDeviceMorePlugin(this.mac);
    },
    /**
     * @handleAppointment 预约页跳转(主体)
     */
    handleAppointment() {
      console.log('预约页跳转(主体)');
    },
    /**
     * @description 按钮点击事件 this.typeNumber 为0 代表单路开关
     */
    handleBtn() { 
      const controlStatus = !this.isSwitchOn;
      const proper = JSON.parse(JSON.stringify(this.properties));

      if (this.typeNumber) { // 多路开关
        const changeValue = {
          code: `switch_${this.typeNumber}`,
          value: controlStatus
        };
        proper[this.typeNumber - 1] = changeValue;
      } else { // 单路开关
        const changeValue = {
          code: proper[0].code,
          value: controlStatus
        };
        proper[0] = changeValue;
      }
      this.setDataObject({properties: proper});
      this.timer && clearTimeout(this.timer);
      !this.timer && this.setIsUiLock(true);
      if (this.typeNumber) {
        tuyaControlDevPlugin(this.mac, `switch_${this.typeNumber}`, controlStatus);
      } else {
        tuyaControlDevPlugin(this.mac, proper[0].code, controlStatus);
      }
      this.timer = setTimeout(() => {
        this.setIsUiLock(false);
      }, 5000);
    },
  },
};
</script>
