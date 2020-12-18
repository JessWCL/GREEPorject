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

    <!-- 故障提示 -->
    <common-notice-bar />

    <section v-if="!isWorking">
      <gree-block-title>烹饪温度</gree-block-title>
      <gree-block
        v-show="!isTempPicking"
        @click.native="tempPick"
      >
        <gree-row>
          <gree-col>
            <section>
              {{ pickerValueTemp }}
              <code>&#x2103;</code>
            </section>
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
            <section>
              {{ pickerValueTime[0] }}
              <time>时</time>
              {{ pickerValueTime[1] }}
              <time>分</time>
            </section>
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
      <gree-block>
        <gree-row>
          <gree-button
            round
            @click="startWorking"
          >
            开始
          </gree-button>
        </gree-row>
      </gree-block>
    </section>

    <appointmenting v-if="RunStat === RUN_STAT.Appointment"></appointmenting>
    <working v-else-if="isWorking"></working>
  </div>
</template>

<script>
/* eslint import/no-extraneous-dependencies: off */
import { mapState, mapMutations, mapActions } from 'vuex';
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { BlockTitle, Block, Row, Col, Button, Picker } from 'gree-ui';
import * as types from '@/store/types';
import { isGtChrome, isIPhone, isIPhone5, isIPhone678, isIPhone678plus, isPixel2, isGalaxyS5, isGreePhone2 } from '@/utils';
import commonMethodConfig from '@/mixins/config/828d04/commonMethod';
import { RUN_STAT, PAUSE, MODE_CLEAN } from '@/api/828d04/constant';
import tempData from '@/api/828d04/tempData';
import timeData from '@/api/828d04/timeData';
import CommonNoticeBar from '@/components/828d04/CommonNoticeBar';
import Working from '../common/Working';
import Appointmenting from './SmartMenu/Appointmenting';

const DefaultValueTemp = '100';
const DefaultValueTime = ['0', '20'];

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
    Working,
    Appointmenting,
    CommonNoticeBar,
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
      currentSwiperIndex: 0,
      pickerDataTemp: tempData,
      pickerDefaultIndexTemp: [60],
      pickerValueTemp: DefaultValueTemp,
      pickerDataTime: timeData,
      pickerDefaultIndexTime: [0, 19],
      pickerValueTime: ['0', '20']
    };
  },
  computed: {
    ...mapState({
      cacheMod: state => state.dataObjectCache.Mod,
      cacheRunStat: state => state.dataObjectCache.RunStat,
      RunStat: state => state.dataObject.RunStat,
      Mod: state => state.dataObject.Mod,
      SetHour: state => state.dataObject.SetHour,
      SetMin: state => state.dataObject.SetMin,
      SetTmp: state => state.dataObject.SetTmp,
      dataObject: state => state.dataObject
    }),
    swiper() {
      return this.$refs.awesomeSwiper.swiper;
    },

    isWorking() {
      const { cacheMod, cacheRunStat, RunStat } = this;

      const isClean = cacheMod === MODE_CLEAN;
      // 清洁模式是否工作
      const isCleanWorking = cacheRunStat === RUN_STAT.Appointment || cacheRunStat === RUN_STAT.Working;
      // 正常模式是否工作
      const isWorking = RunStat === RUN_STAT.Appointment || RunStat === RUN_STAT.Working;

      let ret = false;
      if (isCleanWorking && isClean) {
        ret = false;
      } else if (isWorking) {
        ret = true;
      }
      return ret;
    }

  },

  watch: {
    RunStat(newV) {
      const RunStat = newV;
      if (RunStat === RUN_STAT.TurnOn || RunStat === RUN_STAT.TurnOff) {
        this.pickerValueTemp = DefaultValueTemp;
        // 由于 DefaultValueTime 会被Picker修改了值
        this.pickerValueTime = ['0', '20'];
      }
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
  },
  methods: {
    ...mapActions({
      sendCtrl: types.SEND_CTRL
    }),
    ...mapMutations({
      setHour: types.SET_SET_HOUR,
      setMin: types.SET_SET_MIN,
      setRunStat: types.SET_RUNSTAT,
      setPause: types.SET_PAUSE,
      setTmp: types.SET_SET_TMP,
      setDisHour: types.SET_DIS_SET_HOUR,
      setDisMin: types.SET_DIS_SET_MIN,
    }),
    onSlideChange() {
      const {realIndex} = this.swiper;
      this.currentSwiperIndex = realIndex;
    },
    onPickerConfirmTemp(columnIndex, itemIndex, value) {
      if (value) {
        this.pickerValueTemp = value.text;
      }
    },
    onPickerConfirmTime(columnIndex, itemIndex, value) {
      setTimeout(() => {
        if (value) {
          const ref = this.$refs.pickerTime;
          const hour = ref.getColumnValues()[0].value;
          const minute = ref.getColumnValues()[1].value;
          this.pickerValueTime[0] = hour;
          this.pickerValueTime[1] = minute;
          console.log(this.pickerValueTime);
        }
      }, 0);
    },
    /**
     * @description 点击温度, 打开tempPicker
     */
    tempPick() {
      if (this.isTimePicking) {
        this.isTimePicking = false;
      }
      this.isTempPicking = !this.isTempPicking;
    },
    /**
     * @description 点击时间, 打开timePicker
     */
    timePick() {
      if (this.isTempPicking) {
        this.isTempPicking = false;
      }
      this.isTimePicking = !this.isTimePicking;

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
    startWorking() {
      // 弹出对应的清洁模式和剩余时间
      const isNextHandle = this.handleCleanMod();
      if (!isNextHandle) return;

      // 整机是否能启动
      const canTrunOn = this.useCanTurnOn();

      if (isNextHandle && canTrunOn) {
        console.log(`pickerTime取值为：${JSON.stringify(this.pickerValueTime)}`);
        this.isTempPicking = false;
        this.isTimePicking = false;
        this.setTmp(~~this.pickerValueTemp);
        const pickerHour = ~~this.pickerValueTime[0];
        const pickerMin = ~~this.pickerValueTime[1];
        this.setHour(pickerHour);
        this.setMin(pickerMin);
        this.setDisHour(pickerHour);
        this.setDisMin(pickerMin);
        this.setRunStat(RUN_STAT.Working);
        this.setPause(PAUSE.Off);
        const { RunStat, Pause, Mod, SetHour, SetMin, SetTmp } = this.dataObject;
        this.sendCtrl({ RunStat, Pause, Mod, SetHour, SetMin, SetTmp });
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
  background-image: url(../../assets/img/ProfessionalSteaming/bg.jpg);
  .circle {
    border-color: transparent;
  }
}
.block-title {
  margin: 20px 52px 20px;
}
.block {
  .row {
    .col {
      section {
        position: relative;
        color: #404657;
        font-size: 120px;
        font-family: appleLight;
        text-align: center;
        transform: translateZ(0);
        code {
          position: absolute;
          top: 10px;
          font-size: 60px;
          margin-left: 20px;
        }
        time {
          font-size: 60px;
        }
      }
    }
  }
  &:last-child {
    .row {
      justify-content: center;
    }
  }
}
</style>
