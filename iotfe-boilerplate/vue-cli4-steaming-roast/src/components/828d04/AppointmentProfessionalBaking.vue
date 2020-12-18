<template>
  <div class="main">
    <div
      v-show="isWorking"
      class="custom-swiper-layer"
    ></div>
    <swiper
      ref="awesomeSwiper"
      class="custom-swiper"
      :style="{ 'z-index': isWorking ? -1 : 1 }"
      :options="swiperOption"
      @slide-change="onSlideChange"
    >
      <swiper-slide
        v-for="(item, index) in imgSrc"
        :key="index"
        :class="{'swiper-no-swiping': isWorking}"
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

    <section v-if="!isWorking">
      <gree-block-title>烹饪温度</gree-block-title>
      <gree-block
        v-show="!isTempPicking"
        @click.native="tempPick"
      >
        <gree-row>
          <gree-col>
            <div class="section">
              {{ textTemp }}
              <code v-show="isShowTempUnit">&#x2103;</code>
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
            <template v-for="(el, index) in tempPicker">
              <gree-picker
                :key="index"
                :ref="el.ref"
                class="picker-temp"
                :class="{
                  'not-visible': currentSwiperIndex !== index,
                  'blank-unit': !isShowTempUnit
                }"
                :cols="1"
                :line-height="pickerLineHeight"
                is-view
                :multi-line="false"
                :data="el.data"
                :default-value="el['default-value']"
                @change="onPickerConfirmTemp"
              ></gree-picker>
            </template>
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
              {{ time[0] }}
              <time>时</time>
              {{ time[1] }}
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
            <template v-for="(el, index) in timePicker">
              <gree-picker
                :key="index"
                :ref="el.ref"
                class="picker-time"
                :class="{'not-visible': currentSwiperIndex !== index}"
                :cols="2"
                :line-height="pickerLineHeight"
                is-view
                is-cascade
                :multi-line="false"
                :data="el.data"
                :default-value="el['default-value']"
                @change="onPickerConfirmTime"
              ></gree-picker>
            </template>
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
              class="picker-appointment-time"
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

    <working v-if="isWorking"></working>
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
import Working from '@/components/common/Working';
// import tempData from '@/api/828d04/tempData';
// import timeData from '@/api/828d04/timeData';
import { tempConfig, tempData } from '@/api/828d04/baking-tempData.js';
import { timeConfig, timeData } from '@/api/828d04/baking-timeData.js';
import commonMethodConfig from '@/mixins/config/828d04/commonMethod';
import { ProfessionalBakingFootFuncList } from '@/api/828d04/FootFuncListData';
import {
  RUN_STAT,
  MODE_BAKING,
  LIST1_BAKING_HOT_WIND_3D,
  LIST1_BAKING_SMALL_BARBECUE,
  LIST1_BAKING_LARGE_BARBECUE,
  LIST1_BAKING_HOT_AIR_BARBECUE,
  LIST1_BAKING_UP_DOWN_HEATING,
  LIST1_BAKING_BOTTOM_HEATING,
  LIST1_BAKING_BACK_HEATING,
  LIST1_BAKING_GREEN_HOT_AIR,
  LIST1_BAKING_SMALL_UP_DOWN_HEATING,
  MODE_BAKING_TEMP_NAMES,
  LIST2_BAKING_LOW,
  LIST2_BAKING_MIDDLE,
  LIST2_BAKING_HEIGHT,
  LIST2_BAKING_LOW_TMP,
  LIST2_BAKING_MIDDLE_TMP,
  LIST2_BAKING_HEIGHT_TMP,
} from '@/api/828d04/constant.js';
import oneDayTimeData from '@/api/828d04/oneDayTimeData';

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
      swiperOption: {
        effect: 'coverflow',
        slidesPerView: 3,
        centeredSlides: true,
        loop: false,
        noSwiping: true,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: Math.floor(document.body.clientWidth / 6.5 / 10) * 10,
          modifier: 2,
          slideShadows: false
        }
      },
      imgSrc: ProfessionalBakingFootFuncList,
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
      temp: tempConfig[0].defaultTemp,
      time: timeConfig[0].defaultValue,
      pickerAppointmentDataTime: oneDayTimeData,
      pickerAppointmentDefaultIndexTime: [0, 0],
      pickerAppointmentValueTime: ['00', '00']
    };
  },
  computed: {
    ...mapState({
      reFresh: state => state.reFresh,
      SetHour: state => state.dataObject.SetHour,
      SetMin: state => state.dataObject.SetMin,
      RunStat: state => state.dataObject.RunStat,
      SetTmp: state => state.dataObject.SetTmp,
      dataObject: state => state.dataObject,
      List1: state => state.dataObject.List1,
      Mod: state => state.dataObject.Mod,
      DisTmrHour: state => state.dataObject.DisTmrHour,
      DisTmrMin: state => state.dataObject.DisTmrMin,
      ProfessionalBakingList1: state => state.dataObjectCache.ProfessionalBakingList1,
    }),

    swiper() {
      return this.$refs.awesomeSwiper.swiper;
    },

    swiperRealIndex() {
      return this.$refs.awesomeSwiper.swiper.realIndex;
    },

    // 温度选择器生成数据
    tempPicker() {
      const data = [];
      // console.log('temp: ', this.SetTmp);
      for (let i = 0; i < tempConfig.length; i += 1) {
        data.push({
          ref: `pickerTemp_${i}`,
          data: tempData[i],
          'default-index': [tempConfig[i].defaultIndex],
          'default-value': [tempConfig[i].defaultTemp],
        });
      }
      return data;
    },

    isShowTempUnit() {
      let ret = true;
      const { Mod, List1 } = this;
      const isSmallOrLargeBaking = Mod === MODE_BAKING && (List1 === LIST1_BAKING_SMALL_BARBECUE || List1 === LIST1_BAKING_LARGE_BARBECUE);
      if (isSmallOrLargeBaking) {
        ret = false;
      }
      return ret;
    },

    textTemp() {
      const { Mod, List1 } = this;
      const isSmallOrLargeBaking = Mod === MODE_BAKING && (List1 === LIST1_BAKING_SMALL_BARBECUE || List1 === LIST1_BAKING_LARGE_BARBECUE);
      let ret = this.temp;
      if (isSmallOrLargeBaking) {
        ret = MODE_BAKING_TEMP_NAMES[this.temp] || MODE_BAKING_TEMP_NAMES[LIST2_BAKING_MIDDLE_TMP];
      }
      return ret;
    },

    // 时间选择器生成数据
    timePicker() {
      const data = [];
      for (let i = 0; i < timeConfig.length; i += 1) {
        data.push({
          ref: `pickerTime_${i}`,
          data: timeData[i],
          'default-index': [...timeConfig[i].defaultIndex],
          'default-value': [...timeConfig[i].defaultValue],
        });
      }
      return data;
    },

    isWorking() {
      let ret = false;
      if (this.RunStat === RUN_STAT.Appointment || this.RunStat === RUN_STAT.Working) {
        ret = true;
        this.$nextTick(() => {
          this.$refs.awesomeSwiper.$el.classList.add('custom-no-swiping');
        });
      } else {
        this.$nextTick(() => {
          this.$refs.awesomeSwiper.$el.classList.remove('custom-no-swiping');
        });
      }
      return ret;
    }

  },

  watch: {
    List1(newVal) {
      if (this.Mod === MODE_BAKING) {
        // swiper翻到对应的模式List1
        this.swiper.slideToLoop(newVal);
      }

      this.isTempPicking = false;
      this.isTimePicking = false;
      this.isAppointmentPicking = false;
    },

    reFresh() {
      const { ProfessionalBakingList1 } = this;
      this.swiper.slideToLoop(ProfessionalBakingList1);
    },
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

  mounted() {
    this.swiper.slideToLoop(this.List1);
  },

  methods: {
    ...mapActions({
      sendCtrl: types.SEND_CTRL
    }),
    ...mapMutations({
      setDataObjectCache: types.SET_DATA_OBJECT_CACHE,
      setRunStat: types.SET_RUNSTAT,
      setHour: types.SET_SET_HOUR,
      setMin: types.SET_SET_MIN,
      setTmrHour: types.SET_TMR_HOUR,
      setTmrMin: types.SET_TMR_MIN,
      setDisTmrHour: types.SET_DIS_TMR_HOUR,
      setDisTmrMin: types.SET_DIS_TMR_MIN,
      setTmp: types.SET_SET_TMP,
      setList1: types.SET_LIST1,
      setList2: types.SET_LIST2
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

    // 模式切换
    onSlideChange() {
      const {realIndex} = this.swiper;
      const List1 = realIndex;
      console.log({ List1 });
      this.currentSwiperIndex = realIndex;

      // 切模式更新mode
      this.changeModeBySwiper(realIndex);

      // 切换温度更新picker
      this.changeTempPicker(realIndex);

      // 切换时间更新picker
      this.changeTimePicker(realIndex);

      // 设置模式
      this.setList1(this.mode);
      this.setDataObjectCache({ ProfessionalBakingList1: this.mode });
    },

    /**
     * @description 切换swiper, 更新mode
     */
    changeModeBySwiper(index = this.currentSwiperIndex) {
      switch (index) {
        case 0:
          this.mode = LIST1_BAKING_HOT_WIND_3D;
          break;
        case 1:
          this.mode = LIST1_BAKING_SMALL_BARBECUE;
          break;
        case 2:
          this.mode = LIST1_BAKING_LARGE_BARBECUE;
          break;
        case 3:
          this.mode = LIST1_BAKING_HOT_AIR_BARBECUE;
          break;
        case 4:
          this.mode = LIST1_BAKING_UP_DOWN_HEATING;
          break;
        case 5:
          this.mode = LIST1_BAKING_BOTTOM_HEATING;
          break;
        case 6:
          this.mode = LIST1_BAKING_BACK_HEATING;
          break;
        case 7:
          this.mode = LIST1_BAKING_GREEN_HOT_AIR;
          break;
        case 8:
          this.mode = LIST1_BAKING_SMALL_UP_DOWN_HEATING;
          break;
        default:
          break;
      }
    },

    // 模式切换温度picker
    changeTempPicker(realIndex = this.currentSwiperIndex) {
      const ref = this.$refs[`pickerTemp_${realIndex}`][0];
      if (!this.isWorking) { // 未开启
        // 刷新temp
        setTimeout(() => { this.temp = ref.getColumnValue().value; }, 0);
      }
    },

    // 模式切换时间picker
    changeTimePicker(realIndex = this.currentSwiperIndex) {
      const ref = this.$refs[`pickerTime_${realIndex}`][0];
      if (!this.isWorking) { // 未开启
        // 刷新time
        setTimeout(() => {
          this.time = [ref.getColumnValue().value, ref.getColumnValue(1).value];
        }, 0);
      }
    },

    onPickerConfirmTemp(columnIndex, itemIndex, value) {
      if (value) {
        this.temp = value.value;
      }
    },

    onPickerAppointmentConfirmTime(columnIndex, itemIndex, value) {
      if (value) {
        const ref = this.$refs.picker;
        const sHour = padZero(ref.getColumnValues()[0].value);
        const sMinute = padZero(ref.getColumnValues()[1].value);
        this.$set(this.pickerAppointmentValueTime, 0, sHour);
        this.$set(this.pickerAppointmentValueTime, 1, sMinute);
      }
    },

    onPickerConfirmTime(columnIndex, itemIndex, value) {
      setTimeout(() => {
        if (value) {
          const ref = this.$refs[`pickerTime_${this.List1}`][0];
          const hour = ref.getColumnValues()[0].value;
          const minute = ref.getColumnValues()[1].value;
          this.$set(this.time, 0, hour);
          this.$set(this.time, 1, minute);
          console.log(this.time);
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
        this.setTmp(~~this.temp);
        const pickerHour = ~~this.time[0];
        const pickerMin = ~~this.time[1];
        this.setHour(pickerHour);
        this.setMin(pickerMin);
        const pickerTmrHour = ~~this.pickerAppointmentValueTime[0];
        const pickerTmrMin = ~~this.pickerAppointmentValueTime[1];
        this.setTmrHour(pickerTmrHour);
        this.setTmrMin(pickerTmrMin);
        this.setDisTmrHour(pickerTmrHour);
        this.setDisTmrMin(pickerTmrMin);
        this.setRunStat(RUN_STAT.Appointment);
  
        const { RunStat, Mod, List1, SetHour, SetMin, SetTmp, TmrHour, TmrMin } = this.dataObject;
        const isSmallOrLargeBaking = Mod === MODE_BAKING && (List1 === LIST1_BAKING_SMALL_BARBECUE || List1 === LIST1_BAKING_LARGE_BARBECUE);
        if (isSmallOrLargeBaking) {
          let List2 = LIST2_BAKING_MIDDLE;
          if (SetTmp === LIST2_BAKING_LOW_TMP) List2 = LIST2_BAKING_LOW;
          else if (SetTmp === LIST2_BAKING_MIDDLE_TMP) List2 = LIST2_BAKING_MIDDLE;
          else if (SetTmp === LIST2_BAKING_HEIGHT_TMP) List2 = LIST2_BAKING_HEIGHT;
          this.setList2(List2);
          this.sendCtrl({ RunStat, Mod, List1, List2, SetHour, SetMin, SetTmp, TmrHour, TmrMin });
        } else {
          this.sendCtrl({ RunStat, Mod, List1, SetHour, SetMin, SetTmp, TmrHour, TmrMin });
        }
  
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
  background-image: url(../../assets/img/ProfessionalBaking/appointment_bg.jpg);
  height: 555px;
  min-height: 555px;
}

.main {
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
    }
  }
}

</style>
