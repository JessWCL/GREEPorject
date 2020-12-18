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

    <!-- 故障提示 -->
    <common-notice-bar />

    <section v-if="!isWorking">
      <gree-block-title>工作温度</gree-block-title>
      <gree-block
        v-show="!isTempPicking"
        @click.native="tempPick"
      >
        <gree-row>
          <gree-col>
            <section>
              {{ temp }}
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
            <template v-for="(el, index) in tempPicker">
              <gree-picker
                :key="index"
                :ref="el.ref"
                class="picker-temp"
                :class="{'not-visible': currentSwiperIndex !== index}"
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
      <gree-block-title>工作时长</gree-block-title>
      <gree-block
        v-show="!isTimePicking"
        @click.native="timePick"
      >
        <gree-row>
          <gree-col>
            <section>
              {{ time[0] }}
              <time>时</time>
              {{ time[1] }}
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
      <gree-block>
        <gree-row>
          <gree-button
            round
            @click="startWorking"
          >开始</gree-button>
        </gree-row>
      </gree-block>
    </section>

    <appointmenting v-if="RunStat === RUN_STAT.Appointment"></appointmenting>
    <working v-else-if="isWorking"></working>
  </div>
</template>

<script>
/* eslint import/no-extraneous-dependencies: off */
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { BlockTitle, Block, Row, Col, Button, Picker } from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import {
  isGtChrome,
  isIPhone,
  isIPhone5,
  isIPhone678,
  isIPhone678plus,
  isPixel2,
  isGalaxyS5,
  isGreePhone2
} from '@/utils';
import commonMethodConfig from '@/mixins/config/828d04/commonMethod';
import * as types from '@/store/types';
import { tempConfig, tempData } from '@/api/828d04/helper-tempData.js';
import { timeConfig, timeData } from '@/api/828d04/helper-timeData.js';
import { AuxiliaryFunctionList } from '@/api/828d04/FootFuncListData.js';
import {
  PAUSE,
  RUN_STAT,
  MODE_HELPER,
  MODE_CLEAN,
  LIST1_HELPER_UNFREEZE,
  LIST1_HELPER_FERMENT,
  LIST1_HELPER_REHEAT_BAKING,
  LIST1_HELPER_REHEAT_STEAM,
  LIST1_HELPER_DISINFECTION,
  LIST1_HELPER_BLANCH,
  LIST1_HELPER_WARM_DISH,
  LIST1_HELPER_HEAT_PRESERVATION
} from '@/api/828d04/constant.js';
import Working from '@/components/common/Working';
import CommonNoticeBar from '@/components/828d04/CommonNoticeBar';
import Appointmenting from './SmartMenu/Appointmenting';
import { showToast } from '../../../../static/lib/PluginInterface.promise';

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
    CommonNoticeBar
  },
  mixins: [commonMethodConfig],
  data() {
    return {
      RUN_STAT,
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
      mode: 0,
      imgSrc: AuxiliaryFunctionList,
      disableStart: false, // 防止快速点击的问题
      currentSwiperIndex: 0,
      temp: tempConfig[0].defaultTemp,
      time: timeConfig[0].defaultValue,
      pickerLineHeight: 60, // picker高度
      isTempPicking: false, // tempPicker是否打开
      isTimePicking: false // timePicker是否打开
    };
  },
  computed: {
    ...mapState({
      reFresh: state => state.reFresh,
      cacheMod: state => state.dataObjectCache.Mod,
      cacheRunStat: state => state.dataObjectCache.RunStat,
      AuxiliaryFunctionList1: state => state.dataObjectCache.AuxiliaryFunctionList1,
      SetHour: state => state.dataObject.SetHour,
      SetMin: state => state.dataObject.SetMin,
      RunStat: state => state.dataObject.RunStat,
      SetTmp: state => state.dataObject.SetTmp,
      dataObject: state => state.dataObject,
      List1: state => state.dataObject.List1,
      Mod: state => state.dataObject.Mod
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
          'default-value': [tempConfig[i].defaultTemp]
        });
      }
      return data;
    },

    // 时间选择器生成数据
    timePicker() {
      const data = [];
      for (let i = 0; i < timeConfig.length; i += 1) {
        data.push({
          ref: `pickerTime_${i}`,
          data: timeData[i],
          'default-index': [...timeConfig[i].defaultIndex],
          'default-value': [...timeConfig[i].defaultValue]
        });
      }
      return data;
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
    Mod(newVal) {
      const Mod = newVal;
      const { realIndex } = this.swiper;
      const List1 = realIndex;
      const isHelper = Mod === MODE_HELPER;
      if (isHelper) {
        this.setList1(List1);
        this.setDataObjectCache({ AuxiliaryFunctionList1: List1 });
      }
    },

    List1(newVal) {
      const List1 = newVal;
      const { Mod, RunStat } = this;
      const isHelper = Mod === MODE_HELPER;
      const isWorking = RunStat === RUN_STAT.Appointment || RunStat === RUN_STAT.Working;
      if (isWorking && isHelper) {
        // 先设置可滑动
        this.swiper.allowSlideNext = true;
        this.swiper.allowSlidePrev = true;
        // swiper翻到对应的模式List1
        this.swiper.slideToLoop(List1);
        // 后设置不可滑动
        this.swiper.allowSlideNext = false;
        this.swiper.allowSlidePrev = false;
      } else if (isHelper) {
        // swiper翻到对应的模式List1
        this.swiper.slideToLoop(List1);
      }

      this.isTempPicking = false;
      this.isTimePicking = false;
    },

    RunStat(newV) {
      const RunStat = newV;
      if (RunStat === RUN_STAT.TurnOn || RunStat === RUN_STAT.TurnOff) {
        const { List1 } = this;
        // this.temp = tempConfig[List1].defaultTemp;
        this.temp = this.tempPicker[List1]['default-value'][0];
        this.time = this.timePicker[List1]['default-value'];
      }
      // 判断Swiper是否能滑动
      this.handleSwiperAllowStatus();
    },

    reFresh() {
      const { AuxiliaryFunctionList1 } = this;
      this.swiper.slideToLoop(AuxiliaryFunctionList1);
    },

    /**
     * 这样子先设置defaultIndex再刷新控制台会报一个警告：
     * vue.runtime.esm.js?2b0e:619 [Vue warn]: Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders......
     * 黎工的picker组件暂时也只有这种通过js设置值的办法
     * 时间picker也一样
     */
    /* SetTmp(newVal) {
      if (this.Mod === MODE_HELPER) {
        this.temp = newVal;

        const ref = this.$refs[`pickerTemp_${this.List1}`][0];
      // console.log(ref);
      ref.defaultIndex = [newVal - tempConfig[this.List1].tempMin];
        // ref.defaultValue = [newVal];
        ref.refresh();
      }
    }, */
    /* SetHour(newVal) {
      if (this.Mod === MODE_HELPER) {
        this.$set(this.time, 0, newVal);
        // console.log(this);

        const ref = this.$refs[`pickerTime_${this.List1}`][0];
        console.log(ref);
        const index = timeConfig[this.List1].defaultIndex;
        index[0] = newVal - timeConfig[this.List1].hourRange[0];
        const value = timeConfig[this.List1].defaultValue;
        value[0] = newVal;
        ref.defaultIndex = index;
        ref.defaultValue = value;
        this.$nextTick(() => {
          ref.refresh();
        });
      }
    }, */
    /* SetMin(newVal) {
      if (this.Mod === MODE_HELPER) {
        this.$set(this.time, 1, newVal);

        const ref = this.$refs[`pickerTime_${this.List1}`][0];
        console.log(ref);
      }
    }, */
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
    //   this.pickerLineHeight = 22;
    // } else {
    //   this.pickerLineHeight = 60;
    // }

    // 初始化由state赋值
    if (this.Mod === MODE_HELPER) {
      /* if (this.SetTmp) {
        this.temp = this.SetTmp;
      } */
    }
  },
  mounted() {
    // 判断Swiper是否能滑动
    this.handleSwiperAllowStatus();
  },
  methods: {
    ...mapActions({
      sendCtrl: types.SEND_CTRL
    }),
    ...mapMutations({
      setDataObjectCache: types.SET_DATA_OBJECT_CACHE,
      setHour: types.SET_SET_HOUR,
      setMin: types.SET_SET_MIN,
      setRunStat: types.SET_RUNSTAT,
      setTmp: types.SET_SET_TMP,
      setPause: types.SET_PAUSE,
      setMod: types.SET_MOD,
      setList1: types.SET_LIST1,
      setDisHour: types.SET_DIS_SET_HOUR,
      setDisMin: types.SET_DIS_SET_MIN
    }),

    // 判断Swiper是否能滑动
    handleSwiperAllowStatus() {
      const { RunStat, List1 } = this;
      const isWorking = RunStat === RUN_STAT.Appointment || RunStat === RUN_STAT.Working;
      if (isWorking) {
        this.swiper.slideToLoop(List1);
        // #iOS问题 工作时不可滑动
        this.swiper.allowSlideNext = false;
        this.swiper.allowSlidePrev = false;
      } else {
        const { AuxiliaryFunctionList1 } = this;
        this.swiper.slideToLoop(AuxiliaryFunctionList1);
        // #iOS问题 工作时可以滑动
        this.swiper.allowSlideNext = true;
        this.swiper.allowSlidePrev = true;
      }
    },

    // 模式切换
    onSlideChange() {
      // 防止快速点击的问题
      this.disableStart = true;

      const { realIndex } = this.swiper;
      const List1 = realIndex;
      console.log({ List1 });

      const { Mod } = this;
      const isHelper = Mod === MODE_HELPER;

      if (isHelper) {
        this.currentSwiperIndex = realIndex;

        // 切模式更新mode
        this.changeModeBySwiper(realIndex);

        // 切换温度更新picker
        this.changeTempPicker(realIndex);

        // 切换时间更新picker
        this.changeTimePicker(realIndex);

        // 设置模式
        this.setList1(this.mode);
        this.setDataObjectCache({ AuxiliaryFunctionList1: this.mode });
      }

      // 防止快速点击的问题
      this.disableStart = false;
    },
    /**
     * @description 切换swiper, 更新mode
     */
    changeModeBySwiper(index = this.currentSwiperIndex) {
      switch (index) {
        case 0:
          this.mode = LIST1_HELPER_UNFREEZE;
          break;
        case 1:
          this.mode = LIST1_HELPER_FERMENT;
          break;
        case 2:
          this.mode = LIST1_HELPER_REHEAT_BAKING;
          break;
        case 3:
          this.mode = LIST1_HELPER_REHEAT_STEAM;
          break;
        case 4:
          this.mode = LIST1_HELPER_DISINFECTION;
          break;
        case 5:
          this.mode = LIST1_HELPER_BLANCH;
          break;
        case 6:
          this.mode = LIST1_HELPER_WARM_DISH;
          break;
        case 7:
          this.mode = LIST1_HELPER_HEAT_PRESERVATION;
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
        setTimeout(() => {
          this.temp = ref.getColumnValue().text;
        }, 0);
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
      // 防止快速点击的问题
      if (this.disableStart) {
        showToast(QuickClickToast, 1);
        console.log(QuickClickToast);
        return;
      }
      // 弹出对应的清洁模式和剩余时间
      const isNextHandle = this.handleCleanMod();
      if (!isNextHandle) return;

      // 整机是否能启动
      const canTrunOn = this.useCanTurnOn();

      if (isNextHandle && canTrunOn) {
        console.log(`pickerTime取值为：${JSON.stringify(this.time)}`);
        this.isTempPicking = false;
        this.isTimePicking = false;
        this.setTmp(~~this.temp);
        const pickerHour = ~~this.time[0];
        const pickerMin = ~~this.time[1];
        this.setHour(pickerHour);
        this.setMin(pickerMin);
        this.setPause(PAUSE.Off);
        this.setRunStat(RUN_STAT.Working);
        this.setDisHour(pickerHour);
        this.setDisMin(pickerMin);
        const {
          RunStat,
          Pause,
          Mod,
          List1,
          SetHour,
          SetMin,
          SetTmp
        } = this.dataObject;
        this.sendCtrl({ RunStat, Pause, Mod, List1, SetHour, SetMin, SetTmp });
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
  background-image: url(../../assets/img/AuxiliaryFunction/bg.jpg);
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
      justify-content: space-around;
    }
  }
}
</style>
