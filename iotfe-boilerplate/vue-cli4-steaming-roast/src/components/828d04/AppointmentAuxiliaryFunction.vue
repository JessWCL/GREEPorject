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
    <section v-if="RunStat === RUN_STAT.TurnOn">
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

      <gree-block-title>预约完成时间</gree-block-title>
      <gree-block
        v-show="!isAppointmentPicking"
        @click.native="appointPick"
      >
        <gree-row>
          <gree-col>
            <section>
              {{ pickerAppointmentValueTime[0] }}<span class="semicolon">:</span>{{ pickerAppointmentValueTime[1] }}
            </section>
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

      <gree-block>
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
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { BlockTitle, Block, Row, Col, Button, Picker } from 'gree-ui';
import { mapState, mapMutations, mapActions, } from 'vuex';
import { isIPhone5, isIPhone678, isIPhone678plus, isPixel2, isGalaxyS5, isGreePhone2 } from '@/utils';
import * as types from '@/store/types';
import { tempConfig, tempData } from '@/api/828d04/helper-tempData.js';
import { timeConfig, timeData } from '@/api/828d04/helper-timeData.js';
import { AuxiliaryFunctionList } from '@/api/828d04/FootFuncListData.js';
import {
  RUN_STAT,
  MODE_HELPER,
  LIST1_HELPER_UNFREEZE,
  LIST1_HELPER_FERMENT,
  LIST1_HELPER_REHEAT_BAKING,
  LIST1_HELPER_REHEAT_STEAM,
  LIST1_HELPER_DISINFECTION,
  LIST1_HELPER_BLANCH,
  LIST1_HELPER_WARM_DISH,
  LIST1_HELPER_HEAT_PRESERVATION,
} from '@/api/828d04/constant.js';
import oneDayTimeData from '@/api/828d04/oneDayTimeData';
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
    Working,
  },
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
      currentSwiperIndex: 0,
      temp: tempConfig[0].defaultTemp,
      time: timeConfig[0].defaultValue,
      pickerLineHeight: 60, // picker高度
      isTempPicking: false, // tempPicker是否打开
      isTimePicking: false, // timePicker是否打开
      isAppointmentPicking: false, // timePicker是否打开
      pickerAppointmentDataTime: oneDayTimeData,
      pickerAppointmentDefaultIndexTime: [0, 0],
      pickerAppointmentValueTime: ['0', '0']
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
      Mod: state => state.dataObject.Mod,
      List1: state => state.dataObject.List1,
      AuxiliaryFunctionList1: state => state.dataObjectCache.AuxiliaryFunctionList1,
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
      if (this.Mod === MODE_HELPER) {
        // swiper翻到对应的模式List1
        this.swiper.slideToLoop(newVal);
      }
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

    this.setNowTimeToPicker();

    // 初始化由state赋值
    if (this.Mod === MODE_HELPER) {
      /* if (this.SetTmp) {
        this.temp = this.SetTmp;
      } */
    }
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
      setHour: types.SET_SET_HOUR,
      setMin: types.SET_SET_MIN,
      setTmrHour: types.SET_TMR_HOUR,
      setTmrMin: types.SET_TMR_MIN,
      setRunStat: types.SET_RUNSTAT,
      setTmp: types.SET_SET_TMP,
      setMod: types.SET_MOD,
      setList1: types.SET_LIST1,
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
      this.setDataObjectCache({ AuxiliaryFunctionList1: this.mode });
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
      if (this.RunStat === RUN_STAT.TurnOff || this.RunStat === RUN_STAT.TurnOn) { // 未开启
        // 刷新temp
        this.temp = ref.getColumnValue().text;
      }
    },
    // 模式切换时间picker
    changeTimePicker(realIndex = this.currentSwiperIndex) {
      const ref = this.$refs[`pickerTime_${realIndex}`][0];
      if (this.RunStat === RUN_STAT.TurnOff || this.RunStat === RUN_STAT.TurnOn) { // 未开启
        // 刷新time
        this.time = [ref.getColumnValue().value, ref.getColumnValue(1).value];
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

        this.$set(this.pickerAppointmentValueTime, 0, ref.getColumnValues()[0].value);
        this.$set(this.pickerAppointmentValueTime, 1, ref.getColumnValues()[1].value);
      }
    },

    onPickerConfirmTime(columnIndex, itemIndex, value) {
      /* if (value) {
        this.time[columnIndex] = value.value;
      } */
      // console.log(this.$refs[`pickerTime_${this.List1}`]);
      // if (value) {
      //   const ref = this.$refs[`pickerTime_${this.List1}`][0];

      //   this.$set(this.time, 0, ref.getColumnValues()[0].value);
      //   this.$set(this.time, 1, ref.getColumnValues()[1].value);
      // }

      const { List1 } = this;

      if (List1 === LIST1_HELPER_UNFREEZE
          || List1 === LIST1_HELPER_REHEAT_BAKING
          || List1 === LIST1_HELPER_REHEAT_STEAM) {
        // 解冻 / 烘焙再加热 / 蒸汽再加热
        // 00:05~01:00
        if (columnIndex === 0 && itemIndex === 1) {
          this.time[1] = '0';
        }
        if (columnIndex === 0 && itemIndex !== 1) {
          this.time[1] = '5';
        }
      } else if (List1 === LIST1_HELPER_FERMENT) {
        // 发酵 00:20~24:00
        if (columnIndex === 0 && itemIndex === 24) {
          this.time[1] = '0';
        }
        if (columnIndex === 0 && itemIndex !== 24) {
          this.time[1] = '1';
        }
        if (columnIndex === 0 && itemIndex === 0) {
          this.time[1] = '20';
        }
      } else if (List1 === LIST1_HELPELIST1_HELPER_DISINFECTIONR_FERMENT) {
        // 餐具消毒 00:20~02:00
        if (columnIndex === 0 && itemIndex === 2) {
          this.time[1] = '0';
        }
        if (columnIndex === 0 && itemIndex !== 2) {
          this.time[1] = '1';
        }
        if (columnIndex === 0 && itemIndex === 0) {
          this.time[1] = '20';
        }
      } else if (List1 === LIST1_HELPER_BLANCH) {
        // 焯水 00:03~00:20
        if (columnIndex === 0 && itemIndex === 0) {
          this.time[1] = '10';
        }
      } else if (List1 === LIST1_HELPER_WARM_DISH) {
        // 暖盘 00:01~04:00
        if (columnIndex === 0 && itemIndex === 4) {
          this.time[1] = '0';
        }
        if (columnIndex === 0 && itemIndex !== 4) {
          this.time[1] = '1';
        }
      } else if (List1 === LIST1_HELPER_HEAT_PRESERVATION) {
        // 保温 00:01~00:30
        if (columnIndex === 0 && itemIndex === 4) {
          this.time[1] = '0';
        }
        if (columnIndex === 0 && itemIndex !== 4) {
          this.time[1] = '1';
        }
      }
      if (value) {
        this.time[columnIndex] = value.text;
      }
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
    },

    goBack() {
      this.$router.push('Home');
    },

    startWorking() {
      console.log(`pickerTime取值为：${JSON.stringify(this.pickerValueTime)}`);
      this.isTempPicking = false;
      this.isTimePicking = false;
      this.isAppointmentPicking = false;
      this.setTmp(~~this.temp);
      this.setHour(~~this.time[0]);
      this.setMin(~~this.time[1]);
      this.setTmrHour(~~this.pickerAppointmentValueTime[0]);
      this.setTmrMin(~~this.pickerAppointmentValueTime[1]);
      this.setRunStat(RUN_STAT.Appointment);

      const { Mod, RunStat, List1, SetHour, SetMin, SetTmp, TmrHour, TmrMin } = this.dataObject;
      this.sendCtrl({ Mod, RunStat, List1, SetHour, SetMin, SetTmp, TmrHour, TmrMin });

      // 跳到主页
      this.$router.push('Home');
    },
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
  height: 555px;
  min-height: 555px;
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
