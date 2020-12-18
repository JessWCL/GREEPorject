/* eslint-disable vue/no-parsing-error */
<!--
 * @Author: Jerry-Rain
 * @Date: 2019-08-09 14:43:49
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-07-01 10:11:53
 * @Description: 首页
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
        @click="showLog()"
      >
        <div class="header-content">
          <gree-row class="miniIcon"><img :src="timerIcon" v-show="false"></gree-row>
          <!-- 数据显示区域 -->
          <gree-row class="data-show">
            <gree-col v-for="(item, index) in realTimeDataOpt" :key="index">{{ item.name }}</br>{{ (Pow ? (dataObject[item.value] || '0') : '-') + ' ' + item.unit }}</gree-col>
          </gree-row>
        </div>
      </div>
      <gree-row class="powZoom">
        <!-- 开关键区域 -->
        <gree-button class="powBtn" @click="powCtrl()" round>{{ Pow ? '关闭' : '开启' }}</gree-button>
      </gree-row>
      <gree-block class="time-tip" v-show="countDown">将在{{ formatCDT(countDown) }}后{{ !Pow ? '开启' : '关闭' }}</gree-block>
      <!-- 底部功能按钮 -->
      <gree-row class="btn-bottom">
        <div v-for="(item, index) in btnBottomOpt" :key="index"><img :src="item.imgUrl" @click="funcCtrl(index)"><span>{{ item.name }}</span></div>      
      </gree-row>
        
    </gree-page>
    <!-- 倒计时pop -->
    <gree-popup v-model="showFlag" id="timePicker" class="pop" position="bottom">
      <div class="title">倒计时</div>
      <van-datetime-picker
        v-model="initTime"
        type="time"
        confirm-button-text=" "
        cancel-button-text=" "
        visible-item-count="3"
        item-height="50"
        @change="changeDate"
      />
      <gree-row>
        <gree-col width="50" @click.native="showFlag = false">取消</gree-col>
        <gree-col width="50" @click.native="sendSetTime()">确定</gree-col>
      </gree-row>
      <div class="unit-hour">时</div>
      <div v-if="Pow" class="unit-min">分钟后关闭</div>
      <div v-if="!Pow" class="unit-min">分钟后开启</div>
    </gree-popup>  
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
      bg: require('@/assets/img/bg_header_off.png'),
      bgOn: require('@/assets/img/bg_header_on.png'),
      bgOff: require('@/assets/img/bg_header_off.png'),
      timerIcon: require('@/assets/img/timerIcon.png'),
      realTimeDataOpt: [
        {name: '电压', unit: 'V', value: 'curVoltage'},
        {name: '电流', unit: 'A', value: 'curCurrent'},
        {name: '功率', unit: 'W', value: 'curPower'}
      ],
      btnBottomOpt: [
        { imgUrl: require('@/assets/img/countDown.png'), name: '倒计时' },
        // { imgUrl: require('@/assets/img/electric.png'), name: '电量统计' },
        // { imgUrl: require('@/assets/img/timer.png'), name: '预约' }
      ],
      showFlag: false, // 显示定时标志位
      selectTime: 15 * 60, // 选择的时间
      initTime: '00:15', // 初始化时间
      timer: null,
      fast: false
    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      countDown: state => state.dataObject.countDown,
      dataObject: state => state.dataObject,
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
    console.log('2020 07 01');
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT'
    }),
    ...mapActions({
      getDevInfo: 'GET_DEV_INFO',
      sendPowCtrl: 'POW_CTRL',
      getTimers: 'GET_TIMERS',
      sendAllCtrl: 'SEND_ALL_CTRL',
    }),
    // 开关控制
    async powCtrl() {
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
      // this.getDevData();
    },
    // 查询设备详情
    getDevData() {
      this.getDevInfo();
      this.timer = setInterval(() => {
        this.getDevInfo();
      }, 8 * 1000);
      this.$once('hook:destroyed', () => {
        clearInterval(this.timer);
      });
    },
    // 发送确定的时间
    sendSetTime() {
      this.showFlag = false;
      const data = {
        commands: [
          {
            code: 'countdown_1',
            value: this.selectTime
          },
          // {
          //   code: 'switch',
          //   value: !this.Pow,
          // }
        ]
      };
      this.sendAllCtrl(data)
        .then(res => { 
          res === 'success' ? this.setDataObject({ countDown: this.selectTime }) : '';
        });
    },
    // 功能按钮
    funcCtrl(index) {
      switch (index) {
        case 0:
          this.showFlag = true;
          this.initTime = '00:15';
          break;
        case 1:
          // this.$router.push({ name: 'Electric' });
          break;
        case 2:
          break;
        default:
          break;
      }
    },
    // 改变时间选择
    changeDate(picker) {
      const List = picker.getValues();
      const hour = parseInt(List[0]);
      const min = parseInt(List[1]);
      this.selectTime = (hour * 60 + min) * 60;
    },
    // 格式化倒计时
    formatCDT() {
      let min = Math.ceil(this.countDown / 60);
      const hour = parseInt(min / 60);
      min -= hour * 60;
      return `${hour}时${min}分`;
    },
    // 返回
    goBack() {
      closePage();
    },
    // 设备详情
    moreInfo() {
      tuyaDeviceMore(this.mac)
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
      } 
    }
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/global.scss';
@import '@/assets/scss/home.scss';
</style>
