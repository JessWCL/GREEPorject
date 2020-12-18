<!--
 * @Author: Jerry-Rain
 * @Date: 2019-08-09 14:43:49
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-09-25 13:01:05
 * @Description: 首页 没什么坑
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
          <gree-row class="miniIcon"><img :src="timerIcon" v-show="AppTimer"></gree-row>
          <!-- 数据显示区域 -->
          <gree-row class="data-show" @click.native="showLog()">
            <gree-col v-for="(item, index) in realTimeDataOpt" :key="index">{{ item.name }}</br>{{ (index !== 2 ? (dataObject[realTimeDataOpt[index].key] || '0.00') : (Pow ? dataObject[realTimeDataOpt[index].key] || '0.00' : '-')) + ' ' + item.unit }}</gree-col>
          </gree-row>
        </div>
      </div>
      <gree-notice-bar 
        :style="{opacity: MessagePushFlag ? 1 : 0 }" 
        class="tip"
        scrollable >
        {{ tipTxt }}
        <div slot="left"><img :src="bellImg"></div>
      </gree-notice-bar>
      <gree-row class="powZoom">
        <!-- 开关键区域 -->
        <gree-button class="powBtn" @click="powCtrl()" round> <img :src="onOffPic"></gree-button>
      </gree-row>
      <gree-row class="powStatus">{{ Pow ? "插座已开启" : "插座已关闭" }}</gree-row>
      <gree-block class="time-tip" v-show="CountDownFlag && CountDownTime">将在{{ formatCDT(CountDownTime) }}后{{ !Pow ? '开启' : '关闭' }}</gree-block>
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
  editDevice,
  timerListDevice,
  changeBarColor,
  showToast
} from '../../../../static/lib/PluginInterface.promise';
import { Header, Field, InputItem, Row, Col, Button, Block, DatePicker, Popup, NoticeBar, Icon } from 'gree-ui';
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
    [NoticeBar.name]: NoticeBar, 
    [Icon.name]: Icon, 
  },
  data() {
    return {
      bg: require('@/assets/img/bg_header_off.png'),
      bgOn: require('@/assets/img/bg_header_on.png'),
      bgOff: require('@/assets/img/bg_header_off.png'),
      timerIcon: require('@/assets/img/timerIcon.png'),
      realTimeDataOpt: [
        {name: '本月用电', unit: 'kW·h', key: 'monthEleUsed'},
        {name: '今日用电', unit: 'kW·h', key: 'dayEleUsed'},
        {name: '当前功率', unit: 'W', key: 'RealTimePower'}
      ],
      showFlag: false, // 显示定时标志位
      selectTime: 15, // 选择的时间
      initTime: '00:15', // 初始化时间
      fast: false, // 快速点击标志位
      bellImg: require('@/assets/img/bell.png'),
    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      mac: state => state.mac,
      CountDownState: state => state.dataObject.CountDownState,
      CountDownTime: state => state.dataObject.CountDownTime,
      CountDownFlag: state => state.dataObject.CountDownFlag,
      RealTimeVoltage: state => state.dataObject.RealTimeVoltage,
      RealTimeEleCurrent: state => state.dataObject.RealTimeEleCurrent,
      RealTimePower: state => state.dataObject.RealTimePower.toFixed(2),
      dataObject: state => state.dataObject,
      AppTimer: state => state.dataObject.AppTimer,
      MessagePushFlag: state => state.dataObject.MessagePushFlag,
      Pow(state) {
        this.bg = state.dataObject.Pow ? this.bgOn : this.bgOff;
        changeBarColor(state.dataObject.Pow ? '#51A9F9' : '#ADB0B4');
        // console.log('%c ####', `color: ${state.dataObject.Pow ? '#51A9F9' : '#ADB0B4'};`);
        return state.dataObject.Pow;
      },
      monthEleUsed: state => state.dataObject.monthEleUsed,
      dayEleUsed: state => state.dataObject.dayEleUsed,
    }),
    // 实时数据显示
    nowDataList() {
      const arr = [];
      arr.push(this.RealTimeVoltage * 0.1);
      arr.push(this.RealTimeEleCurrent * 0.01);
      arr.push(this.RealTimePower);
      console.log('RealTimePower', this.RealTimePower);
      return arr || [0, 0, 0];
    },
    // 底部功能区的三个按钮配置
    btnBottomOpt() {
      if (this.AppTimer) {
        return ([
          { imgUrl: require('@/assets/img/countDown.png'), name: '倒计时' },
          { imgUrl: require('@/assets/img/electric.png'), name: '电量统计' },
          { imgUrl: require('@/assets/img/timer_on.png'), name: '预约' }
        ]);  
      } 
      return ([
        { imgUrl: require('@/assets/img/countDown.png'), name: '倒计时' },
        { imgUrl: require('@/assets/img/electric.png'), name: '电量统计' },
        { imgUrl: require('@/assets/img/timer_off.png'), name: '预约' }
      ]);
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
    console.log('2020/7/22');
    if (this.$route.query.type === 'clear') {
      this.getDayEleUsed();
      this.getYearEleUsed();
    }
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT'
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL',
      getDayEleUsed: 'GET_DAY_ELE_USED',
      getYearEleUsed: 'GET_MONTH_ELE_USED'
    }),
    // 开关控制
    powCtrl() {
      // TODO:这里是节流，建议后续改成lodash库
      if (!this.fast) {
        this.fast = true;
        setTimeout(() => {
          this.fast = false;
        }, 1200);
        const pow = this.Pow ? 0 : 1; 
        console.log(this.Pow ? '关' : '开', this.Pow);
        this.setDataObject({ Pow: pow, CountDownTime: 0, CountDownFlag: 0, RealTimePower: 0});
        this.sendCtrl({ Pow: pow, CountDownTime: 0, CountDownFlag: 0 });
      } else {
        showToast('哎呀，你点太快了~', 0);
      }
    },
    // 改变时间选择
    changeDate(picker) {
      const List = picker.getValues();
      const hour = parseInt(List[0]);
      const min = parseInt(List[1]);
      this.selectTime = hour * 60 + min;
    },
    // 发送确定的时间
    sendSetTime() {
      this.showFlag = false;
      const newPow = this.Pow ? 0 : 1;
      if (this.selectTime) {
        this.setDataObject({ CountDownTime: this.selectTime, CountDownState: newPow, CountDownFlag: 1 });
        this.sendCtrl({ CountDownTime: this.selectTime, CountDownState: newPow, CountDownFlag: 1 });
      } else {
        this.setDataObject({ CountDownTime: 0, CountDownState: newPow, CountDownFlag: 1 });
        this.sendCtrl({ CountDownTime: 0, CountDownState: newPow, CountDownFlag: 1 });
      }
      console.log('倒计时', this.selectTime, this.CountDownTime);
    },
    // 功能按钮
    funcCtrl(index) {
      switch (index) {
        case 0:
          this.showFlag = true;
          this.initTime = '00:15';
          this.selectTime = 15;
          break;
        case 1:
          this.$router.push({ name: 'Electric' });
          // this.$router.push({ name: 'ElectricTip' });
          break;
        case 2:
          timerListDevice(this.mac);
          break;
        default:
          break;
      }
    },
    // 格式化倒计时
    formatCDT() {
      const hour = parseInt(this.CountDownTime / 60);
      const min = this.CountDownTime % 60;
      return `${hour}时${min}分`;
    },
    goBack() {
      closePage();
    },
    moreInfo() {
      editDevice(this.mac);
    },
    // 显示vconsole，狂点50下
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
