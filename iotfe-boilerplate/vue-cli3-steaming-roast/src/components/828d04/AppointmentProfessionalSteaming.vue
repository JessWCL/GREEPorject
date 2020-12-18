<template>
  <div class="main">
    <swiper
      ref="awesomeSwiper"
      class="custom-swiper swiper-no-swiping"
      :options="swiperOption"
      @slide-change="onSlideChange"
    >
      <swiper-slide
        v-for="(item, index) in imgSrc"
        :key="index"
      >
        <div class="circle">
          <span
            class="iconfont"
            :class="item.iconfont"
          ></span>
        </div>
        <p>{{ item.label }}</p>
      </swiper-slide>
    </swiper>
    <section v-if="RunStat === RUN_STAT.TurnOn">
      <gree-block-title>烹饪温度</gree-block-title>
      <gree-block
        v-show="!isTempPicking"
        @click.native="tempPick"
      >
        <gree-row>
          <gree-col>
            <div class="section">
              {{ pickerValueTemp }}
              <code>&#x2103;</code>
            </div>
          </gree-col>
        </gree-row>
      </gree-block>
      <div
        class="picker-column"
        :class="{'not-visible': !isTempPicking}"
      >
        <gree-row>
          <gree-col>
            <gree-picker
              ref="pickerTemp"
              class="picker-temp"
              :data="pickerDataTemp"
              :cols="1"
              :line-height="pickerLineHeight"
              :default-index="pickerDefaultIndexTemp"
              is-view
              :multi-line="false"
              @change="onPickerConfirmTemp"
            ></gree-picker>
          </gree-col>
        </gree-row>
      </div>
      <gree-block-title>烹饪时长</gree-block-title>
      <gree-block
        v-show="!isTimePicking"
        @click.native="timePick"
      >
        <gree-row>
          <gree-col>
            <div class="section">
              {{ pickerValueTime[0] }}
              <time>时</time>
              {{ pickerValueTime[1] }}
              <time>分</time>
            </div>
          </gree-col>
        </gree-row>
      </gree-block>
      <div
        class="picker-column"
        :class="{'not-visible': !isTimePicking}"
      >
        <gree-row>
          <gree-col>
            <gree-picker
              ref="pickerTime"
              class="picker-time"
              :data="pickerDataTime"
              :cols="2"
              :line-height="pickerLineHeight"
              :default-index="pickerDefaultIndexTime"
              is-view
              is-cascade
              :multi-line="false"
              @change="onPickerConfirmTime"
            ></gree-picker>
          </gree-col>
        </gree-row>
      </div>

      <gree-block-title>预约完成时间</gree-block-title>
      <gree-block
        v-show="!isAppointmentPicking"
        @click.native="appointPick"
      >
        <gree-row>
          <gree-col>
            <div class="section">
              {{ pickerAppointmentValueTime[0] }}<span class="semicolon">:</span>{{ pickerAppointmentValueTime[1] }}
            </div>
          </gree-col>
        </gree-row>
      </gree-block>
      <div
        class="picker-column"
        :class="{'not-visible': !isAppointmentPicking}"
      >
        <gree-row>
          <gree-col>
            <gree-picker
              ref="picker"
              class="picker-time"
              :data="pickerAppointmentDataTime"
              :cols="2"
              :line-height="60"
              :default-index="pickerAppointmentDefaultIndexTime"
              is-view
              is-cascade
              :multi-line="false"
              @change="onPickerAppointmentConfirmTime"
            ></gree-picker>
          </gree-col>
        </gree-row>
      </div>

      <gree-block class="justify-content-between">
        <gree-row>
          <gree-button
            round
            @click="goBack"
          >
            取消
          </gree-button>
          <gree-button
            round
            @click="startWorking"
          >
            开始
          </gree-button>
        </gree-row>
      </gree-block>
    </section>
    <working v-if="RunStat === RUN_STAT.Appointment || RunStat === RUN_STAT.Working"></working>
  </div>
</template>

<script>
/* eslint import/no-extraneous-dependencies: off */
import { mapState, mapMutations, mapActions } from 'vuex';
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { BlockTitle, Block, Row, Col, Button, Picker } from 'gree-ui';
import * as types from '@/store/types';
import { isGtChrome, isIPhone, padZero, isIPhone5, isIPhone678, isIPhone678plus, isPixel2, isGalaxyS5, isGreePhone2 } from '@/utils';
import { RUN_STAT } from '@/api/828d04/constant';
import tempData from '@/api/828d04/tempData';
import timeData from '@/api/828d04/timeData';
import oneDayTimeData from '@/api/828d04/oneDayTimeData';
import commonMethodConfig from '@/mixins/config/828d04/commonMethod';
import Working from './ProfessionalSteaming/Working';

export default {
  components: {
    swiper,
    swiperSlide,
    [BlockTitle.name]: BlockTitle,
    [Block.name]: Block,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [Picker.name]: Picker,
    Working
  },
  mixins: [commonMethodConfig],
  data() {
    return {
      RUN_STAT,
      swiperOption: {
        slidesPerView: 3,
        centeredSlides: true,
        loop: false,
        noSwiping: true
      },
      imgSrc: [
        {
          iconfont: 'steamed',
          label: '专业蒸制'
        }
      ],
      pickerLineHeight: 60, // picker高度
      isTempPicking: false, // tempPicker是否打开
      isTimePicking: false, // timePicker是否打开
      isAppointmentPicking: false, // timePicker是否打开
      currentSwiperIndex: 0,
      pickerDataTemp: tempData,
      pickerDefaultIndexTemp: [60],
      pickerValueTemp: '100',
      pickerDataTime: timeData,
      pickerDefaultIndexTime: [0, 19],
      pickerValueTime: ['0', '20'],
      pickerAppointmentDataTime: oneDayTimeData,
      pickerAppointmentDefaultIndexTime: [0, 0],
      pickerAppointmentValueTime: ['00', '00']
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      SetHour: state => state.dataObject.SetHour,
      SetMin: state => state.dataObject.SetMin,
      RunStat: state => state.dataObject.RunStat,
      SetTmp: state => state.dataObject.SetTmp,
    }),
    swiper() {
      return this.$refs.awesomeSwiper.swiper;
    }
  },
  created() {
    // if (isIPhone5()) {
    //   this.pickerLineHeight = 20;
    // } else if (isIPhone678()) {
    //   this.pickerLineHeight = 25;
    // } else if (isIPhone678plus()) {
    //   this.pickerLineHeight = 28;
    // } else if (isPixel2()) {
    //   this.pickerLineHeight = 28;
    // } else if (isGalaxyS5()) {
    //   this.pickerLineHeight = 22;
    // } else if (isGreePhone2()) {
    //   this.pickerLineHeight = 20;
    // } else {
    //   this.pickerLineHeight = 60;
    // }
    this.setNowTimeToPicker();
  },
  methods: {
    ...mapActions({
      sendCtrl: types.SEND_CTRL
    }),
    ...mapMutations({
      setHour: types.SET_SET_HOUR,
      setMin: types.SET_SET_MIN,
      setTmrHour: types.SET_TMR_HOUR,
      setTmrMin: types.SET_TMR_MIN,
      setRunStat: types.SET_RUNSTAT,
      setTmp: types.SET_SET_TMP,
      setDisTmrHour: types.SET_DIS_TMR_HOUR,
      setDisTmrMin: types.SET_DIS_TMR_MIN,
    }),

    setNowTimeToPicker() {
      const nowTime = new Date();
      const hour = nowTime.getHours();
      const minute = nowTime.getMinutes();
      this.pickerAppointmentDefaultIndexTime = [hour, minute];
      const strHour = padZero(hour);
      const strMinute = padZero(minute);
      this.pickerAppointmentValueTime = [strHour, strMinute];
    },

    onSlideChange() {
      const {realIndex} = this.swiper;
      this.currentSwiperIndex = realIndex;
    },
    onPickerConfirmTemp(columnIndex, itemIndex, value) {
      if (value) {
        this.pickerValueTemp = value.text;
      }
    },

    onPickerAppointmentConfirmTime(columnIndex, itemIndex, value) {
      setTimeout(() => {
        if (value) {
          const ref = this.$refs.picker;
          const sHour = padZero(ref.getColumnValues()[0].value);
          const sMinute = padZero(ref.getColumnValues()[1].value);
          this.$set(this.pickerAppointmentValueTime, 0, sHour);
          this.$set(this.pickerAppointmentValueTime, 1, sMinute);
          console.log(this.pickerAppointmentValueTime);
        }
      }, 0);
    },

    onPickerConfirmTime(columnIndex, itemIndex, value) {
      setTimeout(() => {
        if (value) {
          const ref = this.$refs.pickerTime;
          const hour = ref.getColumnValues()[0].value;
          const minute = ref.getColumnValues()[1].value;
          this.$set(this.pickerValueTime, 0, hour);
          this.$set(this.pickerValueTime, 1, minute);
          console.log(this.pickerValueTime);
        }
      }, 0);
    },

    /**
     * @description 点击温度, 打开tempPicker
     */
    tempPick() {
      this.isTempPicking = true;

      this.isTimePicking = false;
      this.isAppointmentPicking = false;
    },
    /**
     * @description 点击时间, 打开timePicker
     */
    timePick() {
      this.isTimePicking = true;

      this.isTempPicking = false;
      this.isAppointmentPicking = false;
    },
    /**
     * @description 点击预约, 打开timePicker
     */
    appointPick() {
      this.isAppointmentPicking = true;

      this.isTempPicking = false;
      this.isTimePicking = false;

      // 体验优化 滑动到底部
      if (isGtChrome(44) || isIPhone()) {
        setTimeout(() => {
          const elem = document.querySelector('.main');
          const {scrollHeight, offsetHeight} = elem;
          const top = scrollHeight - offsetHeight;
          elem.scrollTo({ top, left: 0, behavior: 'smooth' });
        }, 0);
      }
    },

    goBack() {
      this.$router.push('Home');
    },

    startWorking() {
      console.log(`pickerTime取值为：${JSON.stringify(this.pickerValueTime)}`);

      // 整机是否能启动
      const canTrunOn = this.useCanTurnOn();

      if (canTrunOn) {
        this.isTempPicking = false;
        this.isTimePicking = false;
        this.isAppointmentPicking = false;
        this.setTmp(~~this.pickerValueTemp);
        const pickerHour = ~~this.pickerValueTime[0];
        const pickerMin = ~~this.pickerValueTime[1];
        this.setHour(pickerHour);
        this.setMin(pickerMin);
        const pickerTmrHour = ~~this.pickerAppointmentValueTime[0];
        const pickerTmrMin = ~~this.pickerAppointmentValueTime[1];
        this.setTmrHour(pickerTmrHour);
        this.setTmrMin(pickerTmrMin);
        this.setDisTmrHour(pickerTmrHour);
        this.setDisTmrMin(pickerTmrMin);
        this.setRunStat(RUN_STAT.Appointment);
  
        const { Mod, RunStat, List1, SetHour, SetMin, SetTmp, TmrHour, TmrMin } = this.dataObject;
        this.sendCtrl({ Mod, RunStat, List1, SetHour, SetMin, SetTmp, TmrHour, TmrMin });
  
        // 跳到主页
        this.$router.push('Home');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.not-visible {
  overflow: hidden;
  visibility: hidden;
  display: block;
  opacity: 0;
  height: 0;
}
.custom-swiper {
  background-image: url(../../assets/img/ProfessionalSteaming/appointment_bg.jpg);
  height: 555px;
  min-height: 555px;
  .circle {
    border-color: transparent;
  }
}

section {
  display: flex;
  flex: 1;
  flex-direction: column;
  transform: translateZ(0);
  .block-title {
    margin: 20px 52px 20px;
  }
  .block {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 285px;
    min-height: 285px; // for iOS 6/7/8
    &.justify-content-between {
      justify-content: space-between;
    }
    &.gree-button {
      height: 120px;
      min-height: unset;
      .row {
        // justify-content: space-between;
        button.block {
          // reset
          margin-bottom: 0;
        }
      }
    }
    .row {
      width: 100%;
      .col {
        .section {
          position: relative;
          font-size: 120px;
          font-family: appleLight;
          color: #404657;
          text-align: center;
          transform: translateZ(0);
          code {
            position: absolute;
            top: 10px;
            font-size: 69px;
            margin-left: 20px;
          }
          time {
            font-size: 69px;
          }
        }
      }
    }
    &:last-child {
      .row {
        justify-content: space-between;
      }
    }
  }
}
</style>
