<template>
  <div class="page">
    <div class="page-content page-home">
      <div class="page-header">
        <gree-header
          theme="transparent"
          :left-options="{preventGoBack: true}"
          @on-click-back="goBack"
          :right-options="{showMore: !functype}"
          @on-click-more="moreInfo"
        >{{ devname }}</gree-header>
        <!-- 米种、口感 -->
        <div
          class="wrapper"
          :class="{'hidden': isPopupShowFunctionList.bottom}"
        >
          <label
            @click="openRiceBox"
            v-show="mode === 2"
          >
            {{ riceList[Rice - 1].name }}&emsp;{{ tasteList[Textre - 1].name }}
            <i class="arrow"></i>
          </label>
          <span v-show="Pow && enableProgress && Runlight && StpRic > 0 && StpRic < 6">
            {{ stepName | setStepName(StpRic, progressList) }}
          </span>
          <!-- 模式滑轮 -->
          <gree-swiper
            :class="{'swiper-no-swiping': Pow}"
            slide-id="modeCarousel"
            :swiper-options="swiperOptions"
            :swiper-slides="ModList"
            @slide-change-end="setMod"
          ></gree-swiper>
        </div>
        <!-- 打开模式组件，显示模式和默认时间 -->
        <div
          class="mode-time-wrapper"
          :class="{'hidden': !isPopupShowFunctionList.bottom}"
        >
          <p>
            <span>{{ $language('home.about') }}</span>
            <span v-show="showHour">{{ surplusH }}</span>
            <span v-show="showHour">{{ $language('timer.hour') }}</span>
            <span>{{ surplusM }}</span>
            <span>{{ $language('timer.minute') }}</span>
          </p>
          <p class="mode-name">
            {{ modeName }}
          </p>
        </div>
      </div>
      <div class="page-main">
        <!-- 未开始烹饪===>默认烹饪时间 -->
        <div
          class="default-time-wrapper"
          v-show="!Pow || SchEn"
        >
          <!-- 可调时间范围 -->
          <gree-notice-bar
            icon=""
            :class="{'hidden': !hasTimer || isPopupShowFunctionList.bottom}"
          >
            {{ $language('home.timeRange') }}
            <span> {{ warnTimeMin }} </span>
            <span v-show="showMinWarnFir">{{ $language('timer.minute') }}</span>
            ~
            <span> {{ warnTimeMax }} </span>
            <span v-show="!showMinWarn">{{ $language('timer.hour') }}</span>
            <span v-show="showMinWarn">{{ $language('timer.minute') }}</span>
          </gree-notice-bar>
          <!-- 默认烹饪时间-->
          <div
            class="default-time"
            v-show="!isPicking"
            @click="timePick"
          >
            <span class="txt">{{ $language('home.about') }}</span>
            <span
              class="txt"
              v-show="showHour"
            >{{ surplusH }}</span>
            <span
              class="txt"
              v-show="showHour"
            >{{ $language('timer.hour') }}</span>
            <span class="txt">{{ surplusM }}</span>
            <span class="txt">{{ $language('timer.minute') }}</span>
          </div>
          <!-- 定时滑轮 -->
          <gree-picker
            ref="timePicker"
            :data="pickerData"
            :cols="2"
            :line-height="65"
            :default-index="pickerDefaultIndex"
            is-view
            is-cascade
            v-show="isPicking"
          ></gree-picker>
        </div>
        <!-- 开始烹饪 -->
        <gree-gauge
          class="lave-time-wrapper"
          :header="gaugeObj.header"
          :hour="gaugeObj.hour"
          :hour-unit="gaugeObj.hourUnit"
          :minute="gaugeObj.minute"
          :minute-unit="gaugeObj.minuteUnit"
          :tips="gaugeObj.tips"
          v-show="Pow && !Runlight && !SchEn"
        ></gree-gauge>
        <!-- 开始烹饪 显示烹饪阶段 -->
        <gree-gauge
          is-segment
          :step="stepClass"
          :title="gaugeTitle"
          :tips="stepName | setStepName(StpRic, progressList)"
          v-show="Pow && enableProgress && Runlight && !SchEn"
        ></gree-gauge>
        <!-- 到最后一步时这里的烹饪过程隐藏，显示剩余时间 -->
        <gree-gauge
          is-segment
          :step="5"
          :header="$language('home.lave')"
          :title="gaugeTitle"
          :hour="showHour ? surplusH : undefined"
          :hour-unit="showHour ? $language('timer.hour') : ''"
          :minute="surplusM"
          :minute-unit="$language('timer.minute')"
          tips="焖饭中"
          v-show="StpRic === 5"
        ></gree-gauge>
        <!-- 开始按键 -->
        <div class="row center">
          <gree-button
            class="btn-switch"
            round
            @click="powSwitch"
          >{{ msg | btnContent(Pow, isPicking, SchEn) }}</gree-button>
        </div>
      </div>
      <!-- 底部功能按键 -->
      <div class="block toolbar">
        <div class="row">
          <div
            class="col"
            :class="{'hidden': (item.sceneInvalid && functype)}"
            v-for="(item, index) in footList"
            :key="item.index"
            @click="setFunction(index)"
            v-show="!Pow || (Pow && item.show) || SchEn"
          >
            <div class="icon">
              <img :src="item.ImgUrl">
            </div>
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <RiceBox
      ref="riceBox"
      :enable-rice-box="isPopupShowRiceBox"
      :mode-name="modeName"
      :cook-time="modeTime"
      :has-taste="true"
      :rice-list="riceList"
      :taste-list="tasteList"
      @setCookTime="setCookTime"
      @cancel="closeRiceBox"
      @begin="riceBoxBegin"
    />
    <function-list
      ref="functionList"
      :is-popup-show="isPopupShowFunctionList"
      :mode-list="advancedList"
    ></function-list>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import {
  closePage,
  editDevice,
  showToast
} from '../../../static/lib/PluginInterface.promise';
import RiceBox from '../components/RiceBox';
import FunctionList from '../components/FunctionList';
import homeConfig from '../mixins/config/home';
import advancedConfig from '../mixins/config/advanced';
import timerConfig from '../mixins/config/timer';
import { getRealIndex } from '../utils';

export default {
  name: 'Home',
  components: {
    RiceBox,
    FunctionList
  },
  filters: {
    /**
     * @param val 开始按键的默认内容
     * @param pow 电源
     * @param isPicking 有没有在调节定时时间
     * @returns result 按键显示内容
     */
    btnContent(val, pow, isPicking, ispreseting) {
      let result;
      result = pow && !ispreseting ? '取消' : '开始';
      result = isPicking ? '确定' : result;
      return result;
    },
    /**
     * @param StpRic 煮饭阶段
     * @returns result 返回烹饪阶段的名称
     */
    setStepName(val, StpRic, progressList) {
      let result = '';
      result = StpRic >= 0 && StpRic <= 6 ? progressList[StpRic].stepName : '';
      return result;
    }
  },
  mixins: [homeConfig, advancedConfig, timerConfig],
  data() {
    return {
      pickerData: [],
      pickerDefaultIndex: [],
      gaugeObj: {},
      gaugeTitle: ['小火预热', '大火升温', '淀粉溶胀', '焖饭增香'],
      isPopupShowRiceBox: {}, // 米种、口感选择弹框
      isPopupShowFunctionList: {}, // 弹起高级功能弹框
      enableProgress: false, // 是否显示煮饭阶段
      modeBuffer: {
        // 模式缓存，取消选择模式时还原
        advancedName: '精煮饭',
        protocolVal: 2,
        defaultTime: 60
      },
      riceBuffer: {
        // 米种、口感缓存
        rice: 1,
        taste: 2,
        defaultTime: 50
      },
      msg: '开始',
      stepName: '',
      isPicking: false, // 定时滑轮,
      selectTime: 50, // 定时滑轮选择的值
      showHour: false, // 剩余时间单位控制
      surplusH: 3, // 剩余烹饪时间小时
      surplusM: 50, // 剩余烹饪时间分钟
      currentDefaultTime: 50 // 当前模式的默认时间
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      devname: state => state.deviceInfo.name,
      editEnable: state => state.editEnable,
      functype: state => state.functype,
      KpTpEn: state => state.dataObject.KpTpEn,
      KpTpTmr: state => state.dataObject.KpTpTmr,
      mac: state => state.mac,
      modeName: state => state.modeName,
      modeTime: state => state.modeTime,
      Rice: state => state.dataObject.Rice,
      Runlight: state => state.dataObject.Runlight,
      SchEn: state => state.dataObject.SchEn,
      StpRic: state => state.dataObject.StpRic,
      StTmr: state => state.dataObject.StTmr,
      Textre: state => state.dataObject.Textre,
      /**
       * @description 获取电源开关信息，更新电源按键UI
       */
      Pow(state) {
        const myPow = state.dataObject.Pow;
        if (myPow) {
          this.$set(this.isPopupShowFunctionList, 'bottom', false);
        }
        let showTime;
        if (myPow && !this.SchEn) {
          showTime = this.KpTpEn ? this.KpTpTmr : this.StTmr;
        } else {
          showTime = this.modeTime; // 开始烹饪后显示剩余时间，否则显示默认时间
        }
        this.surplusH = this.timeChange(showTime).hour;
        this.surplusM = this.timeChange(showTime).min;
        // 重置Gauge数据
        this.gaugeObj = {
          header: !this.KpTpEn ? this.$language('home.lave') : '',
          hour: this.showHour ? this.surplusH : undefined,
          hourUnit: this.showHour ? this.$language('timer.hour') : '',
          minute: this.surplusM,
          minuteUnit: this.$language('timer.minute'),
          tips: !this.KpTpEn ? this.$language('home.cooking') : ''
        };
        return myPow;
      },
      /**
       * @description 获取模式
       */
      mode(state) {
        const myMode = state.dataObject.mode;
        const myModeIndex = getRealIndex(
          this.advancedList,
          'protocolVal',
          myMode
        );
        const regStep = /^(2|3|13|18)$/; // 显示煮饭阶段的模式
        this.enableProgress = regStep.test(myMode);
        this.hasTimer = this.advancedList[myModeIndex].hasTimer;
        this.updateTimeRange(myMode);
        this.setModeName(this.advancedList[myModeIndex].name);
        this.$nextTick(() => {
          window.refs.modeCarousel.slideToLoop(myModeIndex, 0, false);
          this.$refs.functionList.setId(myModeIndex);
        });
        return myMode;
      }
    }),
    stepClass() {
      // 更新煮饭阶段背景
      let result;
      if (this.StpRic > 0 && this.StpRic < 6) {
        result = this.progressList[this.StpRic].className;
      } else {
        result = this.progressList[1].className;
      }
      return result;
    }
  },
  watch: {
    /**
     * @description 取消烹饪后显示当前模式的默认时间
     */
    Pow(newVal) {
      if (!newVal) {
        this.reductionTime();
      }
    },
    /**
     * @description 更新各个模式的滑轮范围
     */
    mode() {
      this.changeCarouselTime();
      if (this.mode === 13) {
        this.gaugeTitle.splice(1, 0, '糙米萌芽');
      } else {
        this.gaugeTitle.splice(1, 0, '浸润吸水');
      }
    },
    /**
     * @description 打开模式抽屉时更新缓存
     */
    'isPopupShowFunctionList.bottom'(newV, oldV) {
      if (newV && !oldV) {
        this.modeBuffer.advancedName = this.modeName;
        this.modeBuffer.protocolVal = this.mode;
        this.modeBuffer.defaultTime = this.modeTime;
      }
    },
    /**
     * @description 打开米种、口感弹框时更新米种、口感缓存
     */
    'isPopupShowRiceBox.center'(newV, oldV) {
      if (newV && !oldV) {
        this.riceBuffer.rice = this.Rice;
        this.riceBuffer.taste = this.Textre;
        this.riceBuffer.defaultTime = this.modeTime;
      }
    }
  },
  /**
   * @description 进入页面后监听根组件的事件分发，将goBack传给安卓返回键
   */
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$root.$on('statusBack', () => {
        vm.goBack();
      });
    });
  },
  /**
   * @description 退出后解除根组件的事件绑定
   */
  beforeRouteLeave(to, from, next) {
    this.$root.$off('statusBack');
    next();
  },
  created() {
    this.gaugeObj = {
      header: !this.KpTpEn ? this.$language('home.lave') : '',
      hour: this.showHour ? this.surplusH : undefined,
      hourUnit: this.showHour ? this.$language('timer.hour') : '',
      minute: this.surplusM,
      minuteUnit: this.$language('timer.minute'),
      tips: !this.KpTpEn ? this.$language('home.cooking') : ''
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.changeCarouselTime();
    });
    const regRiceTaste = /^(2)$/; // 有米种、口感的模式
    if (regRiceTaste.test(this.mode)) {
      this.setModeTime(this.defaultTime[this.Rice - 1][this.Textre - 1]);
    } else {
      this.setModeTime(
        this.advancedList[
          getRealIndex(this.advancedList, 'protocolVal', this.mode)
        ].defaultTime
      );
    }
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT',
      setModeName: 'SET_MODE_NAME',
      setModeTime: 'SET_MODE_TIME'
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL'
    }),
    /**
     * @description 返回键
     */
    goBack() {
      if (this.isPopupShowFunctionList.bottom) {
        this.$set(this.isPopupShowFunctionList, 'bottom', false);
        this.$set(this.isPopupShowRiceBox, 'center', false);
      } else {
        closePage();
      }
    },
    /**
     * @description 编辑设备名称
     */
    moreInfo() {
      if (!this.functype) {
        if (this.editEnable) {
          editDevice(this.mac);
        }
      }
    },
    /**
     * @description 打开米种弹框RiceBox
     */
    openRiceBox() {
      if (!this.Pow) {
        this.$refs.riceBox.setRiceId(Number(this.Rice - 1));
        this.$refs.riceBox.setTasteId(Number(this.Textre - 1));
        this.$set(this.isPopupShowRiceBox, 'center', true);
      }
    },
    /**
     * @param val ｛米种, 口感｝
     * @description 米种弹框==>item事件
     */
    setCookTime(val) {
      const myRice = val.rice;
      const myTaste = val.taste;
      this.setModeTime(this.defaultTime[myRice][myTaste]);
      this.setDataObject({
        StTmr: this.defaultTime[myRice][myTaste]
      });
    },
    /**
     * @param val ｛米种, 口感｝
     * @description 米种弹框==>开始事件
     */
    riceBoxBegin(val) {
      this.setDataObject({
        Rice: val.rice + 1,
        Textre: val.taste + 1
      });
      this.$set(this.isPopupShowRiceBox, 'center', false);
    },
    /**
     * @description 米种弹框==>取消事件
     */
    closeRiceBox() {
      this.setDataObject({
        Rice: this.riceBuffer.rice,
        Textre: this.riceBuffer.taste,
        StTmr: this.riceBuffer.defaultTime
      });
      this.setModeTime(this.riceBuffer.defaultTime);
      this.$set(this.isPopupShowRiceBox, 'center', false);
    },
    /**
     * @param val 模式滑轮取值
     * @description 模式滑轮设置
     */
    setMod(val) {
      this.setDataObject({
        mode: this.advancedList[val].protocolVal,
        StTmr: this.advancedList[val].defaultTime
      });
      this.setModeTime(this.advancedList[val].defaultTime);
      // 重置timePicker数据
      this.pickerData = [];
    },
    /**
     * @description 点击定时时间, 打开timePicker
     */
    timePick() {
      if (this.hasTimer) {
        this.isPicking = true;
        this.refreshPicker(); // refresh timePicker
      }
    },
    /**
     * @description 重新初始化timePicker
     */
    refreshPicker() {
      if (this.pickerData.length === 0) {
        this.pickerData = this.setPickerRange();
        setTimeout(() => {
          this.$refs.timePicker.refresh();
        }, 0);
      }
    },
    /**
     * @description 开关事件
     */
    powSwitch() {
      if (this.isPicking) {
        this.setModeTime(this.selectTime);
        this.setDataObject({
          StTmr: Number(this.selectTime)
        });
        this.isPicking = false;
      } else if (this.Pow) {
        // 点击取消触发
        this.$dialog.confirm({
          title: '提示',
          content:
            '烹饪进行中，如果中途取消烹饪工作，<br>会影响烹饪效果。是否确定取消烹饪？',
          confirmText: '否',
          cancelText: '是',
          onCancel: () => {
            this.reductionTime();
            this.sendCtrl(this.dataObject);
          }
        });
      } else {
        this.setDataObject({
          Pow: 1,
          TmrEn: 1,
          StTmr: this.modeTime,
          SchEn: 0,
          SchTmr: 0,
          StpRic: 1,
          Runlight: 0,
          KpTpEn: Number(this.mode === 30),
          KpTpTmr: 0
        });
        this.sendCtrl(this.dataObject);
      }
    },
    /**
     * @param val 功能按键取值
     * @description 点击底部功能列表
     */
    setFunction(val) {
      const canTimer = this.advancedList[
        getRealIndex(this.advancedList, 'protocolVal', this.mode)
      ].hasAppointment;
      switch (val) {
        case 0:
          this.$set(this.isPopupShowFunctionList, 'bottom', true); // 打开底部弹框
          break;
        case 1:
          if (canTimer) {
            this.$router.push({ name: 'Timer' });
          } else {
            showToast('当前模式不能进行预约', 0);
          }
          break;
        case 2:
          this.$router.push({ name: 'Menu' });
          break;
        case 3:
          this.$router.push({ name: 'Voice' });
          break;
        default:
          break;
      }
    },
    /**
     * @description 取消后设置当前模式的默认时间
     */
    reductionTime() {
      if (this.mode !== 2) {
        this.currentDefaultTime = this.advancedList[
          getRealIndex(this.advancedList, 'protocolVal', this.mode)
        ].defaultTime;
      } else {
        this.currentDefaultTime = this.defaultTime[this.Rice - 1][
          this.Textre - 1
        ];
      }
      this.setDataObject({
        Pow: 0,
        SchEn: 0,
        TmrEn: 0,
        StTmr: this.currentDefaultTime,
        KpTpTmr: 0
      });
      this.setModeTime(this.currentDefaultTime);
    }
  }
};
</script>
