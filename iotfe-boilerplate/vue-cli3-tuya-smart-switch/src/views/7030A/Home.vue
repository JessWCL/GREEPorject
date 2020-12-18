/* eslint-disable vue/no-parsing-error */
<!--
 * @Author: Jerry-Rain
 * @Date: 2019-08-09 14:43:49
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-07-01 14:11:56
 * @Description: 首页
 -->
<template>
  <gree-view :bg-color="Pow ? '#51A9FA' : '#ACB0B4'">
    <gree-page no-navbar class="page-home">
      <div class="page-header" :style="{backgroundImage:'url(' + bg + ')'}">
        <gree-header
          theme="transparent"
          :left-options="{preventGoBack: true}"
          :right-options="{showMore: true}"
          @on-click-back="goBack"
          @on-click-more="moreInfo"
        >{{ devname }}</gree-header>
        <!-- <gree-row class="iconZoom"><img :src="timerIcon" class="iconImg" v-show="Pow"/></gree-row> -->
        <gree-row class="showStatus">
          <img class="statusImg" @click="showLog()" :src="Pow ? lightOn : lightOff"/>
          <div @click="showLog" style="position:absolute;bottom:0;right:0;width:50px;height: 50px;backgroud: red;z-index:100;"></div>
        </gree-row>
      </div>
      <div class="page-main">
        <gree-row class="powZoom">
          <!-- 开关键区域 -->
          <gree-button class="powBtn" @click="powCtrl()" round>{{ Pow ? '关闭' : '开启' }}</gree-button>
        </gree-row>
        <!-- <gree-row style="margin-top: 18px;">
          <gree-button class="powBtn" @click="setTimers()" round>设置定时</gree-button>
          <gree-button class="powBtn" @click="searchTimers()" round>查询定时</gree-button>
          <gree-button class="powBtn" @click="delTimers()" round>删除定时</gree-button>
        </gree-row> -->
        <!-- 底部功能按钮 -->
        <gree-row class="btn-bottom">
          <!-- <div><img :src="Pow ? timerOn : timerOff" @click="$router.push({ name: 'Timer' })"><span>定时</span></div>       -->
        </gree-row>
      </div>
    </gree-page>
  </gree-view>
</template>

<script>
import {
  closePage,
  changeBarColor,
  tuyaDeviceMore,
  showToast
} from '../../../../static/lib/PluginInterface.promise';
import { Header, Field, InputItem, Row, Col, Button, Block, DatePicker, Popup } from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {
    [Header.name]: Header,
    [Field.name]: Field,
    [InputItem.name]: InputItem,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [Block.name]: Block, 
    [DatePicker.name]: DatePicker, 
    [Popup.name]: Popup, 
  },
  data() {
    return {
      bgOn: require('@/assets/img/bg_header_on.png'),
      bgOff: require('@/assets/img/bg_header_off.png'),
      timerIcon: require('@/assets/img/timerIcon.png'),
      lightOn: require('@/assets/img/light_on.png'),
      lightOff: require('@/assets/img/light_off.png'),
      timerOn: require('@/assets/img/timer_on.png'),
      timerOff: require('@/assets/img/timer_off.png'),
      timer: null,
      fast: false,
    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      dataObject: state => state.dataObject,
      switchNum: state => state.dataObject.switchNum,
      mac: state => state.mac,
      Pow(state) {
        this.bg = state.dataObject.Pow ? this.bgOn : this.bgOff;
        changeBarColor(state.dataObject.Pow ? '#51A9FA' : '#ACB0B4');
        // console.log('%c ####', `color: ${state.dataObject.Pow ? '#51A9FA' : '#ACB0B4'};`);
        return state.dataObject.Pow;
      }
    }),
  },
  watch: {},
  mounted() {
    // this.getDevData(); // 轮询
    // this.getTimers(); // 获取定时列表
    console.log('2020 06 13 15:19');
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT'
    }),
    ...mapActions({
      getDevInfo: 'GET_DEV_INFO',
      sendPowCtrl: 'POW_CTRL',
      getTimers: 'GET_TIMERS',
    }),
    // 开关控制
    powCtrl() {
      // clearInterval(this.timer);
      if (!this.fast) {
        this.fast = true;
        setTimeout(() => {
          this.fast = false;
        }, 1200);
        this.sendPowCtrl();
      } else {
        showToast('哎呀，你点太快了~', 0);
      }
    },
    // 查询设备详情
    getDevData() {
      this.getDevInfo();
      this.timer = setInterval(() => {
        this.getDevInfo();
      }, 20 * 1000);
      this.$once('hook:destroyed', () => {
        clearInterval(this.timer);
      });
    },
    // 返回
    goBack() {
      closePage();
    },
    // 设备详情
    moreInfo() {
      tuyaDeviceMore(`${this.mac}#${this.switchNum}`)
        .then(res => console.log('tuyaDeviceMore - res: ', res))
        .catch(res => console.log('Err', res));
    },
    showLog() {
      if (!window.showVconsole) {
        window.showVconsole = 1;
      } else {
        window.showVconsole++;
      }
      /* 启用页面调试器 */
      if (window.showVconsole > 50) {
        const VConsole = require('vconsole/dist/vconsole.min.js');
        // eslint-disable-next-line no-new
        new VConsole();
        console.log('`${this.mac}#${this.switchNum}`', `${this.mac}#${this.switchNum}`);
      }
    }
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/global.scss';
@import '@/assets/scss/home.scss';
</style>
