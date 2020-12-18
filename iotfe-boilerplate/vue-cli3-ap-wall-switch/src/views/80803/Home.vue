<!--
 * @Author: Jerry-Rain
 * @Date: 2019-08-09 14:43:49
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-09-25 14:09:37
 * @Description: 首页 TODO:这个插件全部都显示在home页，电量什么的，详细说明见80801 wall-switch
 -->
<template>
  <gree-view class="page-home" :bg-color="Pow ? '#51A9F9' : '#ADB0B4'">
    <gree-header
      :style="{ background: Pow ? '#51A9F9' : '#ADB0B4' }"
      :left-options="{ preventGoBack: true }"
      :right-options="{ showMore: true }"
      @on-click-back="goBack()"
      @on-click-more="moreInfo()"
    >
      {{ devname }}
    </gree-header>
    <gree-page class="page-content">
      <div
        class="header-block"
        :style="{ backgroundImage: 'url(' + bg + ')' }"
      >
        <div class="header-content">
          <!-- 数据显示区域 -->
          <gree-row class="data-show" @click.native="showLog()">
            <gree-col v-for="(item, index) in realTimeDataOpt" :key="index">{{ item.name }}</br>{{ (index !== 2 ? (dataObject[realTimeDataOpt[index].key] || '0.00') : (Pow ? dataObject[realTimeDataOpt[index].key] || '0.00' : '-')) + ' ' + item.unit }}</gree-col>
          </gree-row>
        </div>
      </div>
      <gree-notice-bar 
        v-show="{opacity: MessagePushFlag ? 1 : 0 }" 
        class="tip"
        scrollable>
        {{ tipTxt }}
        <div slot="left"><img :src="bellImg"></div>
      </gree-notice-bar>
      <Electric/>
    </gree-page>
  </gree-view>
</template>

<script>
import {
  closePage,
  editDevice,
  timerListDevice,
  changeBarColor,
  showToast
} from '../../../../static/lib/PluginInterface.promise';
import { Header, Field, InputItem, Row, Col, Button, Block, DatePicker, Popup, NoticeBar, Icon } from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import Electric from './Electric';

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
    [NoticeBar.name]: NoticeBar, 
    [Icon.name]: Icon, 
    Electric
  },
  data() {
    return {
      bg: require('@/assets/img/bg_header_off.png'),
      bgOn: require('@/assets/img/bg_header_on.png'),
      bgOff: require('@/assets/img/bg_header_off.png'),
      realTimeDataOpt: [
        {name: '本月用电', unit: 'kW·h', key: 'monthEleUsed'},
        {name: '今日用电', unit: 'kW·h', key: 'dayEleUsed'},
        {name: '当前功率', unit: 'W', key: 'RealTimePower'}
      ],
      bellImg: require('@/assets/img/bell.png'),
    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      mac: state => state.mac,
      Pow(state) {
        this.bg = state.dataObject.Pow ? this.bgOn : this.bgOff;
        changeBarColor(state.dataObject.Pow ? '#51A9F9' : '#ADB0B4');
        // console.log('%c ####', `color: ${state.dataObject.Pow ? '#51A9F9' : '#ADB0B4'};`);
        return state.dataObject.Pow;
      },
      monthEleUsed: state => state.dataObject.monthEleUsed,
      dayEleUsed: state => state.dataObject.dayEleUsed,
      dataObject: state => state.dataObject,
      MessagePushFlag: state => state.dataObject.MessagePushFlag,
    }),
    nowDataList() {
      const arr = [];
      arr.push(this.RealTimeVoltage * 0.1);
      arr.push(this.RealTimeEleCurrent * 0.01);
      arr.push(this.RealTimePower);
      console.log('RealTimePower', this.RealTimePower);
      return arr || [0, 0, 0];
    },
    onOffPic() {
      return this.Pow ? require('@/assets/img/on.png') : require('@/assets/img/off.png');
    },
    tipTxt() {
      let txt = '';
      switch (this.MessagePushFlag) {
        case 1:
          txt = '检测到当前插座承受功率过大，请及时调整用电设备';
          break;
        case 2:
          txt = '检测到当前插座承受功率已超过最大负载功率，为保护您的安全，已为您关闭插座';
          break;
        case 3:
          txt = '检测到当前插座承受功率过大，请及时调整用电设备';
          break;
        case 0:
          txt = '';
          break;
        default:
          break;
      }
      return txt;
    }
  },
  watch: {},
  mounted() {
    console.log('2020/7/31');
    if (this.$route.query.type === 'clear') {
      this.getDayEleUsed();
      this.getYearEleUsed();
    }
  },
  methods: {
    ...mapActions({
      getDayEleUsed: 'GET_DAY_ELE_USED',
      getYearEleUsed: 'GET_MONTH_ELE_USED'
    }),
    goBack() {
      closePage();
    },
    moreInfo() {
      editDevice(this.mac);
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
      } 
    }
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/global.scss';
</style>
