<template>
  <div class="page">
    <div class="page-content page-timer">
      <div class="page-header">
        <gree-header
          theme="transparent"
          :left-options="{preventGoBack: true}"
          @on-click-back="goBack"
          :right-options="{showMore: !functype}"
          @on-click-more="moreInfo"
        >{{ devname }}</gree-header>
        <div class="bar-top">
          <div class="row">
            <div class="col">
              <span v-show="isPreseting">
                {{ this.$language('timer.presetState') }}
              </span>
            </div>
          </div>
        </div>
        <!-- 预约界面的模式滑轮 -->
        <gree-swiper
          slide-id="presetCarousel"
          :class="{'swiper-no-swiping': !controlAble}"
          :swiper-options="swiperOptions"
          :swiper-slides="modeDataTime"
          @slide-change-end="setMod"
        ></gree-swiper>
      </div>
      <div
        class="page-main"
        v-show="!isPreseting"
      >
        <!-- 定时滑轮 -->
        <div class="time-describe">
          <span>{{ modeName }}时间选择</span>
          <span
            v-show="mode !== 2 && mode !== 13 && mode !== 18"
            class="time-range"
          >
            (可调范围:
            <span> {{ warnTimeMin }} </span>
            <span v-show="showMinWarnFir">{{ $language('timer.minute') }}</span>
            ~
            <span> {{ warnTimeMax }} </span>
            <span v-show="!showMinWarn">{{ $language('timer.hour') }}</span>
            <span v-show="showMinWarn">{{ $language('timer.minute') }}</span>
            )
          </span>
        </div>
        <div
          class="time-picker-show"
          v-show="!isPicking"
          @touchstart="timePick"
        >
          <span>{{ surplusH }}</span>
          <span>{{ $language('timer.hour') }}</span>
          <span>{{ surplusM }}</span>
          <span>{{ $language('timer.minute') }}</span>
        </div>
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
        <!-- 预约滑轮 -->
        <div class="preset-describe">
          <span>{{ $language('timer.completeTime') }}</span>
        </div>
        <div
          class="preset-picker-show"
          @touchstart="presetPick"
          v-show="isPicking"
        >
          <span v-show="hasAppointment">{{ presetingH }}</span>
          <span v-show="hasAppointment">点</span>
          <span v-show="hasAppointment">{{ presetingM }}</span>
          <span v-show="hasAppointment">分</span>
          <span v-show="!hasAppointment">当前模式无法预约</span>
        </div>
        <gree-picker
          ref="presetPicker"
          :data="presetList"
          :cols="2"
          :line-height="65"
          :default-index="[1, 0]"
          is-view
          is-cascade
          @change="onPresetChange"
          v-show="!isPicking && hasAppointment"
        ></gree-picker>
      </div>
      <!-- 预约开始的倒计时页面 -->
      <div
        class="page-main page-main-preset"
        v-show="isPreseting"
      >
        <h3 class="finish-time">{{ $language('timer.completeTime') }}</h3>
        <div class="finish-detail">
          <span>{{ presetingH }}</span>
          <span>点</span>
          <span>{{ presetingM }}</span>
          <span>分</span>
        </div>
      </div>
      <div
        class="block toolbar"
        v-show="!isPreseting"
      >
        <div class="row">
          <div class="col-50">
            <gree-button
              round
              @click="goBack"
            >{{ $language('home.cancel') }}</gree-button>
          </div>
          <div class="col-50">
            <gree-button
              round
              @click="presetConfirm"
            >{{ $language('home.begin') }}</gree-button>
          </div>
        </div>
      </div>
      <div
        class="block toolbar"
        v-show="isPreseting"
      >
        <div class="row">
          <div class="col-100">
            <gree-button
              round
              @click="cancelPreset"
            >{{ $language('home.cancel') }}</gree-button>
          </div>
        </div>
        <div class="row">
          <div
            class="col"
            @click="jumpTo('Menu')"
          >
            <div class="icon">
              <img src="../assets/img/btn_menu.png">
            </div>
            <span>{{ this.$language('home.menu') }}</span>
          </div>
          <div
            class="col"
            @click="jumpTo('Voice')"
          >
            <div class="icon">
              <img src="../assets/img/btn_voice.png">
            </div>
            <span>{{ this.$language('home.voice') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import {
  closePage,
  editDevice
} from '../../../static/lib/PluginInterface.promise';
import advancedConfig from '../mixins/config/advanced';
import timerConfig from '../mixins/config/timer';
import { getRealIndex } from '../utils';

export default {
  mixins: [advancedConfig, timerConfig],
  data() {
    return {
      pickerData: [],
      pickerDefaultIndex: [],
      controlAble: true, // 预约滑轮是否可操作
      firstLoad: true, // 初次加载，并且没有进行其他操作, 点击开始时设置定时时间
      isPicking: false, // 是否正在选择定时
      hasAppointment: true, // 是否有预约
      surplusH: 1, // 定时小时
      surplusM: 30, // 定时分钟
      selectTime: 60, // 定时时间
      presetingH: 3, // 预约小时
      presetingM: 20, // 预约分钟
      presetingT: 60, // 预约时间
      modeBuffer: 0, // Buffer系列是存储页面刚进来的信息，点击取消后将这些信息提交
      modeTimeBuffer: 0,
      StTmrBuffer: 0,
      riceBuffer: 0,
      tasteBuffer: 0,
      validMode: []
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      devname: state => state.deviceInfo.name,
      editEnable: state => state.editEnable,
      functype: state => state.functype,
      mac: state => state.mac,
      modeName: state => state.modeName,
      modeTime: state => state.modeTime,
      Pow: state => state.dataObject.Pow,
      Rice: state => state.dataObject.Rice,
      SchEn: state => state.dataObject.SchEn,
      SchTmr: state => state.dataObject.SchTmr,
      StTmr: state => state.dataObject.StTmr,
      Textre: state => state.dataObject.Textre,
      mode(state) {
        const myMode = state.dataObject.mode;
        this.hasTimer = this.advancedList[
          getRealIndex(this.advancedList, 'protocolVal', myMode)
        ].hasTimer;
        this.hasAppointment = this.advancedList[
          getRealIndex(this.advancedList, 'protocolVal', myMode)
        ].hasAppointment;
        this.hasAppointment ? '' : (this.isPicking = true);
        this.surplusH = this.timeChange(this.modeTime).hour;
        this.surplusM = this.timeChange(this.modeTime).min;
        this.updateTimeRange(myMode);
        this.setModeName(
          this.advancedList[
            getRealIndex(this.advancedList, 'protocolVal', myMode)
          ].name
        );
        this.$nextTick(() => {
          window.refs.presetCarousel.slideToLoop(
            getRealIndex(this.validMode, 'protocolVal', myMode),
            0,
            false
          );
        });
        return myMode;
      },
      /**
       * @description 判断是否正在预约
       */
      isPreseting() {
        let status;
        this.controlAble = !this.Pow;
        this.Pow ? (status = this.SchEn) : (status = false);
        return status;
      }
    })
  },
  watch: {
    /**
     * @description 更新各个模式的滑轮范围
     */
    mode() {
      this.changeCarouselTime();
    },
    isPreseting(newV, oldV) {
      if (newV && !oldV) {
        this.updateTime(this.SchTmr);
      } else if (!newV) {
        this.$router.push({ path: '/' });
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
   * @param to 路由跳转的目标
   * @param from 路由从哪里来
   * @param next 传一个回调给next。beforeRouteLeave可以获取到this
   */
  beforeRouteLeave(to, from, next) {
    this.$root.$off('statusBack');
    next();
  },
  created() {
    this.setVaildMode();
  },
  mounted() {
    this.$nextTick(() => {
      this.changeCarouselTime();
    });
    this.updateTime(this.SchTmr);
    // 缓存模式信息
    this.modeBuffer = this.mode;
    this.modeTimeBuffer = this.modeTime;
    this.StTmrBuffer = this.StTmr;
    this.riceBuffer = this.Rice;
    this.tasteBuffer = this.Textre;
    this.selectTime = this.modeTime;
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
     * @description 返回主页时更新主页数据
     */
    goBack() {
      if (!this.isPreseting) {
        if (this.$route.path !== '/') {
          this.setDataObject({
            mode: this.modeBuffer,
            Rice: this.riceBuffer,
            Textre: this.tasteBuffer,
            StTmr: this.StTmrBuffer
          });
          this.setModeTime(this.modeTimeBuffer);
          this.$router.push({ path: '/' });
        }
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
     * @description 初始化时将可以预约的模式信息组成一个数组
     */
    setVaildMode() {
      this.advancedList.forEach(element => {
        const ele = element;
        if (ele.hasAppointment) {
          this.validMode.push(ele);
        }
      });
    },
    /**
     * @description 滑轮触发事件，不同机型不同模式的时间范围、模式名称、默认时间等都要更新
     */
    setMod(val) {
      this.firstLoad = false;
      this.setDataObject({
        mode: this.validMode[val].protocolVal,
        StTmr: this.validMode[val].defaultTime
      });
      this.setModeTime(this.validMode[val].defaultTime);
      this.changeCarouselTime();
      // 重置timePicker数据
      this.pickerData = [];
    },
    /**
     * @description 点击之后可以进行定时选择
     */
    timePick() {
      this.firstLoad = false;
      const myIndex = getRealIndex(this.validMode, 'protocolVal', this.mode);
      if (this.validMode[myIndex].hasTimer) {
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
     * @description 点击之后可以进行预约选择
     */
    presetPick() {
      this.firstLoad = false;
      const myIndex = getRealIndex(this.validMode, 'protocolVal', this.mode);
      if (this.validMode[myIndex].hasAppointment) {
        this.isPicking = false;
        this.setDataObject({
          StTmr: this.selectTime
        });
        this.setModeTime(this.selectTime);
      }
    },
    /**
     * @description 滑动预约触发事件
     */
    onPresetChange(columnIndex, itemIndex, value) {
      let preHour;
      let preMin;
      if (columnIndex === 0) {
        preHour = value.value;
        preMin = 0;
      } else {
        preHour = 1;
        preMin = value.value;
      }
      this.presetingH = preHour;
      this.presetingM = preMin;
      const nowDate = new Date();
      const nowHour = nowDate.getHours();
      const nowMin = nowDate.getMinutes();
      const nowTime = nowHour * 60 + nowMin;
      const oneDay = 1440;
      this.presetingT = parseInt(preHour, 10) * 60 + parseInt(preMin, 10);
      if (this.presetingT - nowTime >= 0 && !this.isPreseting) {
        // 预约是北京时间，即下午XXX点完成烹饪,传给整机是XXX小时后完成的时间
        this.setDataObject({
          SchTmr: this.presetingT - nowTime
        });
      } else if (!this.isPreseting) {
        this.setDataObject({
          SchTmr: oneDay - nowTime + this.presetingT
        });
      }
    },
    /**
     * @description 点击开始之后的操作
     */
    presetConfirm() {
      // 更新缓存
      this.modeBuffer = this.mode;
      this.modeTimeBuffer = this.modeTime;
      this.StTmrBuffer = this.StTmr;
      this.riceBuffer = this.Rice;
      this.tasteBuffer = this.Textre;
      if (this.firstLoad) {
        this.selectTime = this.modeTime;
      }
      this.setModeTime(this.selectTime);
      if (this.selectTime >= this.SchTmr || !this.hasAppointment) {
        // 定时时间大于预约时间直接开始烹饪
        this.setDataObject({
          Pow: 1,
          TmrEn: 1,
          StTmr: this.selectTime,
          SchEn: 0,
          SchTmr: 0,
          StpRic: 1,
          Runlight: 0,
          KpTpEn: 0
        });
        this.$router.back(-1);
      } else {
        this.setDataObject({
          Pow: 1,
          TmrEn: 1,
          SchEn: 1,
          StTmr: this.selectTime,
          KpTpEn: 0
        });
      }
      this.sendCtrl(this.dataObject);
    },
    /**
     * @description 预约开始后点击取消的操作
     */
    cancelPreset() {
      this.setDataObject({
        Pow: 0,
        TmrEn: 0,
        SchEn: 0,
        SchTmr: 0,
        KpTpEn: 0
      });
      this.sendCtrl(this.dataObject);
      this.$router.push({ name: 'Home' });
    },
    /**
     * @param mySchTmr 预约时间
     * @description 根据轮询数据更新预约时间
     */
    updateTime(mySchTmr) {
      const nowDate = new Date();
      const nowHour = nowDate.getHours();
      const nowMin = nowDate.getMinutes();
      const nowTime = nowHour * 60 + nowMin;
      const oneDay = 1440;
      let result;
      if (nowTime + mySchTmr >= oneDay) {
        // 预约是北京时间，即下午XXX点完成烹饪,传给整机是XXX小时后完成的时间
        result = nowTime + mySchTmr - oneDay;
      } else {
        result = nowTime + mySchTmr;
      }
      if (mySchTmr <= 0 && this.Pow && !this.isPreseting) {
        this.$router.push({ path: '/' });
      } else {
        this.presetingH =
          this.timeChange(result).hour < 10
            ? `0${this.timeChange(result).hour}`
            : this.timeChange(result).hour;
        this.presetingM =
          this.timeChange(result).min < 10
            ? `0${this.timeChange(result).min}`
            : this.timeChange(result).min;
      }
    },
    jumpTo(path) {
      this.$router.push({ name: path });
    }
  }
};
</script>
