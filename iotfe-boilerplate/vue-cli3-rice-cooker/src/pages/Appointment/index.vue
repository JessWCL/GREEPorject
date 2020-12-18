<template>
  <!-- 定时/预约页面 -->
  <div class="page-appointment">
    <div class="head">
      <DevInfo
        :left-on-click="leftOnClick"
        @statusBack="goBack()"
      />
      <RiceTypeTaste
        ref="refPresetTypeTaste"
        :type-list="['长粒米', '短粒米', '糙米']"
        :taste-list="['稍软', '适中', '稍硬']"
        :editable="currentMode.canEditableRiceTextreComponent && Pow === 0"
        :has-rice="currentMode.hasRice"
        :has-textre="currentMode.hasTextre"
        :default-time-for-customize="currentMode.defaultTimeForCustomize"
        :class="{ hidden: (!currentMode.hasRice && !currentMode.hasTextre) }"
        @handleConfirm="testHandleConfirm"
      >
        <template slot="title">
          {{ currentMode.modeName }}<span>{{ computedWorkTime }}</span>分钟
        </template>
      </RiceTypeTaste>
      <div class="carousel">
        <!-- 预约界面的模式滑轮 -->
        <carousel
          ref="carouselPreset"
          class="carousel-wrapper"
          :prop-data="computedCarouselData"
          :options="computedCarouselOptions"
          @currentChange="ptModeChange"
          @currentItemChange="ptCurrentItemChange"
        />
        <div class="mode-name">
          {{ touchMoveModeName || currentMode.modeName }}
        </div>
      </div>
    </div>
    <div
      class="main"
      :class="{hide: isPreseting}"
    >
      <!-- 定时滑轮 start -->
      <div class="window-container">
        <div
          class="header"
          @click="clickAppointmentTimer"
        >
          <div>烹饪时长<span class="gray">{{ timerAppointmentDesc }}</span></div>
          <div :class="{ 'd-none': !isAppointmentTimer }">
            {{ formatComputedWorkTime }}
          </div>
          <img
            :class="{
              'd-none': !currentMode.hasTimer,
              'is-open': !isAppointmentTimer
            }"
            :src="arrowImg"
          >
        </div>
        <div
          class="body"
          :class="{ 'is-open': !isAppointmentTimer }"
        >
          <!-- 定时滑轮 -->
          <div class="time-picker-center-bg" />
          <van-datetime-picker
            v-model="timingCurrentTime"
            type="time"
            :show-toolbar="false"
            :visible-item-count="3"
            :item-height="62"
            :min-hour="minHour"
            :max-hour="maxHour"
            :min-minute="minMinute"
            :max-minute="maxMinute"
            @change="handleTimingChange"
          />
        </div>
      </div>
      <!-- 定时滑轮 end -->

      <!-- 预约滑轮 start -->
      <div class="window-container">
        <div
          class="header"
          @click="clickAppointmentTimer"
        >
          <div>{{ presetDescribe }}</div>
          <div :class="{ 'd-none': isAppointmentTimer }">
            <!-- {{ presetingH }}:{{ presetingM }} -->
            {{ appointCurrentTime }}
          </div>
          <img
            :class="{
              'd-none': !currentMode.hasTimer,
              'is-open': isAppointmentTimer
            }"
            :src="arrowImg"
          >
        </div>
        <div
          class="body"
          :class="{ 'is-open': isAppointmentTimer }"
        >
          <!-- 预约滑轮 -->
          <div class="time-picker-center-bg" />
          <van-datetime-picker
            v-model="appointCurrentTime"
            type="time"
            class="appointment"
            :show-toolbar="false"
            :visible-item-count="3"
            :item-height="62"
          />
        </div>
      </div>
      <!-- 预约滑轮 end -->
    </div>
    <div
      class="main-preset"
      :class="{hide: !isPreseting}"
    >
      <!-- 预约开始的倒计时 -->
      <div class="finishtime">
        {{ finishTime }}
      </div>
      <div class="finishdetail">
        <span class="preseting-num">{{ aHour }}</span>
        <!-- <span class="preseting-txt">{{ unitHour }}</span> -->
        <span class="preseting-txt">:</span>
        <span class="preseting-num">{{ aMinute }}</span>
        <span class="txt-finish">完成</span>
        <!-- <span class="preseting-txt">{{ afterM }}</span> -->
      </div>
      <div
        class="cancelpreset"
        @click="cancelPreset()"
      >
        {{ btnCancel }}
      </div>
    </div>
    <div
      class="foot"
      :class="{ hide: isPreseting }"
    >
      <div @click="goBack()">
        {{ btnCancel }}
      </div>
      <div @click="presetConfirm()">
        {{ btnAffirm }}
      </div>
    </div>
    <div
      class="foot-preset"
      :class="{hide: !isPreseting}"
    >
      <!-- <div
        class="cancelpreset"
        @click="cancelPreset()"
      >{{ btnCancel }}</div> -->
      <div class="footbottom">
        <div
          class="seniorfunc"
          @click="handleCookFunc()"
        >
          <img
            class="img"
            src="../../assets/img/menu.png"
          >
          <span class="name">{{ this.$language('btnMenu') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @module Appointment
 * @description 定时和预约页面，显示定时时间、预约时间和预约界面
 * @requires module:carousel-config 滑轮组件
 * @requires module:DevInfo 设备信息组件
 * @requires module:setTime 时间变换.mixin
 */
import { mapState, mapMutations, mapActions } from 'vuex';
import Carousel from '../../components/Carousel';
import DevInfo from '../../components/DevInfo';
import RiceTypeTaste from '../../components/RiceTypeTaste';
import { setTime, timePickerConfig } from '../../mixins/function-change-device.mixin';
import globalMixin from '../../mixins/global.mixin';
import initPickerSlotsMixin from '../../mixins/initPickerSlots.mixin';
import arrowImg from '../../assets/img/appointment_arrow.png';
import { getVantPickerTimeRange, parseVantDateTimeToInt, getVantDateTimeForTiming, getVantDateTimeForAppointment } from '../../utils/index';

export default {
  name: 'Appointment',
  components: {
    Carousel,
    DevInfo,
    RiceTypeTaste,
  },
  mixins: [globalMixin, initPickerSlotsMixin, setTime, timePickerConfig],
  data() {
    return {
      touchMoveModeName: null,
      save: this.$language('btnSave'),
      btnAffirm: this.$language('btnAffirm'),
      btnCancel: this.$language('btnCancel'),
      devname: this.$language('DeviceName'),
      prompt: this.$language('presetState'),
      timeDescribe: this.$language('txt_zhuzhou'),
      timeRange: this.$language('time_zhuzhou2'),
      presetDescribe: this.$language('Txt_Preset'),
      unitHour: this.$language('unitHour'),
      unitMin: this.$language('unitMin'),
      afterM: this.$language('unitMinLater'),
      modeName: this.$language('mode_jhz'),
      finishTime: this.$language('txt_presetting'),
      isPicking: false, // 是否正在选择定
      appointTime: 0, // 定时时间
      presetingH: 0, // 预约小时
      presetingM: 0, // 预约分钟
      presetingT: 0, // 预约时间
      // 时间picker配置
      timeList: [],
      modeIndexBuffer: 0, // Buffer系列是存储页面刚进来的信息，点击取消后将这些信息提交
      modeNameBuffer: '',
      typeBuffer: 0,
      tasteBuffer: 0,
      isAppointmentTimer: true,
      arrowImg,
      timingCurrentTime: '00:00',
      appointCurrentTime: '00:00',
    };
  },
  computed: {
    ...mapState({
      modeList: state => state.modeList,
      currentMode: state => state.currentMode,
      dataObject: state => state.dataObject,
      StTmr: state => state.dataObject.StTmr,
      SchEn: state => state.dataObject.SchEn,
      SchTmr: state => state.dataObject.SchTmr,
      MidType: state => state.dataObject.MidType,
      Pow: state => state.dataObject.Pow,
      modeIndex: state => state.dataObject.mode,
      mode: state => state.dataObject.mode,
      Rice: state => state.dataObject.Rice,
      Textre: state => state.dataObject.Textre,

      minHour(state) {
        const {currentMode} = state;
        const { minHour } = getVantPickerTimeRange(currentMode);
        return minHour;
      },

      maxHour(state) {
        const {currentMode} = state;
        const { maxHour } = getVantPickerTimeRange(currentMode);
        return maxHour;
      },

      minMinute(state) {
        const {currentMode} = state;
        const { minHour, minMinute } = getVantPickerTimeRange(currentMode);

        let ret = 0;
        const currentTime = this.timingCurrentTime;
        const currentTimeHour = parseInt(currentTime.split(':')[0], 10);
        if (currentTimeHour === minHour) {
          ret = minMinute;
        }

        return ret;
      },

      maxMinute(state) {
        const {currentMode} = state;
        const { maxHour, maxMinute } = getVantPickerTimeRange(currentMode);

        let ret = 59;
        const currentTime = this.timingCurrentTime;
        const currentTimeHour = parseInt(currentTime.split(':')[0], 10);
        if (currentTimeHour === maxHour) {
          ret = maxMinute;
        }

        return ret;
      },

      changePickerTimeByMode: function changePickerTimeByMode() {
        // minTime: 50, // 最小烹饪时间
        // maxTime: 50, // 最大烹饪时间
        const { minTime, maxTime } = this.currentMode;
        const hour1 = parseInt(minTime / 60, 10);
        const hour2 = parseInt(maxTime / 60, 10);

        // const min1 = minTime % 60;
        // const min2 = maxTime % 60;

        const maxHour = Math.max(hour1, hour2);
        const miniHour = Math.min(hour1, hour2);
        // const maxMin = Math.max(min1, min2);

        const _miniteAll = [];
        const _hourAll = [];
        // 时间范围数组
        for (let i = miniHour; i < maxHour; i += 1) {
          if (i < 10) {
            _hourAll.push(`0${i}`);
          } else {
            _hourAll.push(i);
          }
        }
        for (let i = 0; i < 60; i += 1) {
          if (i < 10) {
            _miniteAll.push(`0${i}`);
          } else {
            _miniteAll.push(i);
          }
        }
        // 时间picker配置
        this.timeList = [
          {
            flex: '50%',
            values: _hourAll,
            defaultIndex: 1,
            className: 'time-slot1',
            textAlign: 'center',
          },
          {
            flex: '10%',
            divider: true,
            content: '小时',
            className: 'slot2',
          },
          {
            flex: '40%',
            values: _miniteAll,
            defaultIndex: 0,
            className: 'time-slot3',
            textAlign: 'center',
          },
          {
            flex: '10%',
            divider: true,
            content: '分钟',
            className: 'slot4',
            textAlign: 'left',
          },
        ];
        console.log('=== Appointment changePickerTimeByMode ==='); // eslint-disable-line
        // console.log(this.hourAll, this.miniteAll);
      },

      computedCarouselData: function computedCarouselData() {
        const ret = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const mode of this.modeList) {
          if (mode.hasAppointment) ret.push(mode);
        }
        return ret;
      },

      timerAppointmentDesc: function timerAppointmentDesc() {
        let ret = '';
        const result = this.globalTimerTitleTips('可调', this.currentMode);
        if (result !== '') {
          ret = `（${result}）`;
        }
        return ret;
      },

      // eslint-disable-next-line func-names
      computedWorkTime() {
        let ret = this.getRiceTextreModeTime(this.currentMode, this.Rice, this.Textre);
        const { hasTimer } = this.currentMode;
        const coustomerWorkTime = parseVantDateTimeToInt(this.timingCurrentTime); // 自定义时间，定时时间
        if (hasTimer && coustomerWorkTime > 0) {
          ret = coustomerWorkTime;
        }
        return ret;
      },

      formatComputedWorkTime() {
        let ret = '';
        if (this.computedWorkTime > 60) {
          ret = `${parseInt(this.computedWorkTime / 60, 10)}小时${parseInt(this.computedWorkTime % 60, 10)}分钟`;
        } else if (this.computedWorkTime === 60) {
          ret = `${parseInt(this.computedWorkTime / 60, 10)}小时`;
        } else {
          ret = `${parseInt(this.computedWorkTime % 60, 10)}分钟`;
        }
        return ret;
      },

      /**
       * @function isPreseting
       * @param {object} state
       * @description 判断是否正在预约
       */
      isPreseting: function isPreseting(state) {
        const { Pow, SchEn } = state.dataObject;
        let ret = false;
        if (Pow === 1 && SchEn === 1) {
          ret = true;
        }
        return ret;
      },

      computedArrSchTmr() {
        // 当前时间
        const NOW_DATE = new Date();
        NOW_DATE.setSeconds(0);
        NOW_DATE.setMilliseconds(0);

        const timeSchTmr = this.SchTmr * 60 * 1000;
        const nowTime = NOW_DATE.getTime();
        // eslint-disable-next-line
        // console.log(`nowTime Hour: ${NOW_DATE.getHours()}, Minute: ${NOW_DATE.getMinutes()}`);
        let retH = new Date(timeSchTmr + nowTime).getHours();
        let retM = new Date(timeSchTmr + nowTime).getMinutes();
        retH = retH < 10 ? `0${retH}` : retH;
        retM = retM < 10 ? `0${retM}` : retM;
        // console.log(`aHour: ${retH}, aMinute: ${retM}`); // eslint-disable-line
        return [retH, retM];
      },

      aHour() {
        return this.computedArrSchTmr[0];
      },

      aMinute() {
        return this.computedArrSchTmr[1];
      },

      computedCarouselOptions() {
        let controlAble = true;
        if (this.Pow === 1) {
          controlAble = false;
        }
        return {
          isShow: true, // 是否显示
          controlAble, // 滑轮能不能滑动
          showNumOrImg: false, // 显示数字还是图片
          horizontal: true, // 水平显示or竖直显示
          controlMode: 1,
          threeOrAll: true, // 显示3个or全部显示
          width: '60%', // 组件宽度
          spaceBetween: '3rem', // 间距
          marginLeft: '0', // 组件左边距
          height: '1rem', // 图片大小
          fontSize: '32px',
        };
      },
    }),
  },
  /**
   * @function beforeRouteEnter
   * @description 进入页面后监听根组件的事件分发，将goBack传给安卓返回键
   * @param to 路由跳转的目标
   * @param from 路由从哪里来
   * @param next 传一个回调给next进而访问组件实例。否则获取不到组件内的this
   */
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     vm.$root.$on('statusBack', () => {
  //       vm.goBack();
  //     });
  //   },
  //   );
  // },
  /**
   * @function beforeRouteLeave
   * @description 退出后解除根组件的事件绑定
   * @param to 路由跳转的目标
   * @param from 路由从哪里来
   * @param next 传一个回调给next。beforeRouteLeave可以获取到this
   */
  // beforeRouteLeave(to, from, next) {
  //   this.$root.$off('statusBack');
  //   next();
  // },
  watch: {

    // 根据模式更换时间
    currentMode() {
      this.handleWorkTime();

      const {currentMode} = this;
      const { hasTimer } = currentMode;
      if (hasTimer === false) {
        this.isAppointmentTimer = true;
      }
    },

    Pow(newV) {
      const {SchEn} = this;
      const isAppointment = newV === 1 && SchEn === 1;
      if (newV === 1 && SchEn === 0) {
        this.$router.push({ name: 'Home' });
      } else if (isAppointment) {
        this.setRefTypeTaste();
      }
    },

    Rice() {
      // 预约时间联动
      this.handleWorkTime();
    },

    Textre() {
      // 预约时间联动
      this.handleWorkTime();
    },

  },
  /**
   * @function initTime
   * @description 初始化页面
   */
  mounted: function initTime() {
    const currentMode = this.getCurrentModeByModeId();
    this.setCurrentMode(currentMode);

    this.handlePresetCarouselID();

    this.updateIsMode(false);

    // 设置米种口感 同步工作时间
    this.handleCurrentModeDefaultRiceTextre();

    this.handleWorkTime();

    const coustomerStTmr = this.getCoustomerStTmr(); // CacheBuffer
    const WorkTime = coustomerStTmr;
    this.timingCurrentTime = getVantDateTimeForTiming(WorkTime);
    this.appointCurrentTime = getVantDateTimeForAppointment(WorkTime);

    // eslint-disable-next-line no-undef
    vm.$refs.$PresetTypeTaste = this.$refs.refPresetTypeTaste;
  },
  methods: {
    ...mapMutations({
      updateModeName: 'MODE_NAME',
      updateIsMode: 'IS_MODE',
      setDataObject: 'SET_DATA_OBJECT',
      setCurrentMode: 'SET_CURRENT_MODE',
      setActiveMode: 'SET_ACTIVE_MODE',
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL',
    }),

    handleTimingChange(picker) {
      const [hour, minute] = picker.getValues();
      const StTmr = parseInt(hour, 10) * 60 + parseInt(minute, 10);
      this.setDataObject({ StTmr });

      const {currentMode} = this;
      const { minTime, maxTime } = currentMode;

      let WorkTime = this.getRiceTextreModeTime(this.currentMode, this.Rice, this.Textre);

      // 判断是否用 CacheBuffer
      const isValid = StTmr >= minTime && StTmr <= maxTime;
      if (isValid) WorkTime = StTmr;

      // this.timingCurrentTime = getVantDateTimeForTiming(WorkTime);
      this.appointCurrentTime = getVantDateTimeForAppointment(WorkTime);
    },

    handleWorkTime() {
      const {currentMode} = this;
      const {StTmr} = this;
      const { minTime, maxTime } = currentMode;

      let WorkTime = this.getRiceTextreModeTime(this.currentMode, this.Rice, this.Textre);

      // 判断是否用 CacheBuffer
      const isValid = StTmr >= minTime && StTmr <= maxTime;
      if (isValid) WorkTime = StTmr;

      this.timingCurrentTime = getVantDateTimeForTiming(WorkTime);
      this.appointCurrentTime = getVantDateTimeForAppointment(WorkTime);
    },

    clickAppointmentTimer() {
      if (this.currentMode.hasTimer) {
        this.isAppointmentTimer = !this.isAppointmentTimer;
      }
    },

    setRefTypeTaste() {
      const refTypeTaste = this.$refs.refPresetTypeTaste;
      // 设置米种口感
      refTypeTaste.setType({ type: this.Rice });
      refTypeTaste.setTaste({ taste: this.Textre });
    },

    leftOnClick() {
      this.saveModeIdCache();
    },

    saveModeIdCache() {
      // 缓存
      const sendObj = {
        mode: this.currentMode.modeId
      };
      this.setDataObject(sendObj);
    },

    saveStTmrCache() {
      // 缓存
      const StTmr = parseVantDateTimeToInt(this.timingCurrentTime);
      console.log(`saveStTmrCache StTmr: ${StTmr}`); // eslint-disable-line
      this.setDataObject({ StTmr });
    },

    getCoustomerStTmr() {
      let ret = this.getRiceTextreModeTime(this.currentMode, this.Rice, this.Textre);
      const { hasTimer } = this.currentMode;
      const coustomerWorkTime = this.StTmr; // 自定义时间，定时时间
      if (hasTimer && coustomerWorkTime > 0) {
        ret = coustomerWorkTime;
      }
      return ret;
    },

    onTimingChange(picker, values) {
      const selfPicker = picker;
      let [pickerHour, pickerMinute] = values;

      // 字符串格式化为数字: '01' -> 1
      pickerHour = parseInt(pickerHour, 10);
      pickerMinute = parseInt(pickerMinute, 10);

      const countWorkTime = pickerHour * 60 + pickerMinute;

      this.appointTime = countWorkTime; // 定时时间

      const {currentMode} = this;
      const { minTime, maxTime } = currentMode;
      const selectedTime = pickerHour * 60 + pickerMinute;

      const preArrMinute = selfPicker.getSlotValues(1); // fix bug

      const TimeObject = this.parseTimeRange(minTime, maxTime, selectedTime);
      const { arrMinute } = TimeObject;
      selfPicker.setSlotValues(1, arrMinute);

      this.fixMinuteDefaultValue(selfPicker, preArrMinute); // fix bug
    },

    ptCurrentItemChange(modeName) {
      this.touchMoveModeName = modeName;
    },

    // 设置米种口感 同步工作时间
    handleCurrentModeDefaultRiceTextre() {
      // 设置米种口感 同步工作时间
      const {currentMode} = this;
      const { hasRice, hasTextre, defaultValueRiceTextre } = currentMode;
      let [Rice, Textre] = defaultValueRiceTextre;
      if (hasRice && hasTextre) {
        Rice = this.Rice;
        Textre = this.Textre;
      } else if (hasRice) {
        Rice = this.Rice;
      } else if (hasTextre) {
        Textre = this.Textre;
      }
      this.setDataObject({
        Rice,
        Textre
      });
      const refTypeTaste = this.$refs.refPresetTypeTaste;
      // 设置米种口感
      refTypeTaste.setType({ type: this.dataObject.Rice });
      refTypeTaste.setTaste({ taste: this.dataObject.Textre });
    },
    /**
     * @function ptModeChange
     * @param {number} args 滑轮index
     * @description 滑轮触发事件，不同机型不同模式的时间范围、模式名称、默认时间等都要更新
     */
    ptModeChange(index) {
      console.log('=== 预约 滑轮回调 ==='); // eslint-disable-line
      const r = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const i of this.modeList) {
        if (i.hasAppointment) r.push(i);
      }
      const currentMode = r[index];
      this.setCurrentMode(currentMode);

      // 设置米种口感 同步工作时间
      this.handleCurrentModeDefaultRiceTextre();

      this.isPicking = false; // 取消工作时间选择

      const WorkTime = this.getRiceTextreModeTime(this.currentMode, this.Rice, this.Textre);
      this.timingCurrentTime = getVantDateTimeForTiming(WorkTime);
    },

    testHandleConfirm: function testHandleConfirm(typeTaste) {
      try {
        const { type, taste } = typeTaste;
        this.setDataObject({
          Rice: type,
          Textre: taste
        });
      } catch (e) {
        console.log(e); // eslint-disable-line
      }
    },

    /**
     * @function goBack
     * @description 返回主页时更新主页数据
     */
    goBack() {
      this.saveModeIdCache();
      this.saveStTmrCache();
      window.backButton();
    },

    /**
     * @function presetPick
     * @description 点击之后可以进行预约选择
     */
    presetPick() {
      this.isPicking = false;
    },
    /**
     * @function onPresetChange - 滑动预约触发事件
     * @property {object} picker - 调用mintUI的picker组件
     * @property {function} picker.setSlotValues - 设置当前的数组范围
     * @property {function} picker.setSlotValue - 设置当前的时间
     * @param {object} values - 当前选择时间组成的数组
     */
    onPresetChange(picker, values) {
      const preHour = values[0];
      const preMin = values[1];
      this.presetingH = preHour;
      this.presetingM = preMin;
      this.presetingT = parseInt(preHour, 10) * 60 + parseInt(preMin, 10);
    },

    parseTimeRangeToTimePicker() {
      const {currentMode} = this;
      const { minTime, maxTime, defaultTime } = currentMode;
      const selectedTime = defaultTime;
      const TimeObject = this.parseTimeRange(minTime, maxTime, selectedTime);
      const { arrHour, arrMinute } = TimeObject;
      this.setPickerSlots(arrHour, arrMinute);

      const selfPicker = this.$refs.timePicker;
      selfPicker.setSlotValue(0, arrHour);
      selfPicker.setSlotValue(1, arrMinute);
    },

    parseDefaultTimetoTimePicker() {
      const {defaultTime} = this.currentMode;
      const hour = parseInt(defaultTime / 60, 10);
      const minute = parseInt(defaultTime % 60, 10);
      const strHour = hour < 10 ? `0${hour}` : hour;
      const strMinute = minute < 10 ? `0${minute}` : minute;
      this.setPickerStTmr(strHour, strMinute);
    },
    /**
     * 设置Picker时间
     *
     * @param {*} hour
     * @param {*} minute
     */
    setPickerStTmr(hour, minute) {
      const selfPicker = this.$refs.timePicker;
      selfPicker.setSlotValue(0, hour);
      selfPicker.setSlotValue(1, minute);
    },
    // 获取定时时间
    getPickerStTmr() {
      const currentTime = this.timingCurrentTime;
      const currentTimeHour = parseInt(currentTime.split(':')[0], 10);
      const currentTimeMinute = parseInt(currentTime.split(':')[1], 10);
      const result = currentTimeHour * 60 + currentTimeMinute;
      return result;
    },

    /**
     * 设置Picker时间
     *
     * @param {*} hour
     * @param {*} minute
     */
    setPickerSchTmr(hour, minute) {
      const selfPicker = this.$refs.presetPicker;
      selfPicker.setSlotValue(0, hour);
      selfPicker.setSlotValue(1, minute);
    },
    // 获取预约时间
    getPickerSchTmr() {
      const hour = this.$refs.presetPicker.getSlotValue(0);
      const minute = this.$refs.presetPicker.getSlotValue(1);
      const result = parseInt(hour, 10) * 60 + parseInt(minute, 10);
      return result;
    },
    // 获取预约时间与现在的时间差
    getPickerSchTmrDiffDataNow(pHour, pMinute) {
      // 今天零时零分
      const TODAY_H0_M0 = new Date();
      TODAY_H0_M0.setHours(0);
      TODAY_H0_M0.setMinutes(0);
      TODAY_H0_M0.setSeconds(0);
      TODAY_H0_M0.setMilliseconds(0);

      // 当前时间
      const NOW_DATE = new Date();
      NOW_DATE.setSeconds(0);
      NOW_DATE.setMilliseconds(0);

      // picker时间
      const PICKER_DATE = new Date();
      PICKER_DATE.setHours(pHour);
      PICKER_DATE.setMinutes(pMinute);
      PICKER_DATE.setSeconds(0);
      PICKER_DATE.setMilliseconds(0);

      // 一天毫秒数
      const ONE_DATE_TIME = 24 * 60 * 60 * 1000;

      /**
       * 判断预约时间在当时时间前还是后
       *
       * 如：现在是 14：00
       *    选择是  13：00  或  13：59
       * 为第二天时间
       * */
      const pickerTime = PICKER_DATE.getTime();
      const nowTime = NOW_DATE.getTime();
      const todayBeginTime = TODAY_H0_M0.getTime();

      let dHour = 0;
      let dMinute = 0;
      let diffTime = 0;
      if (pickerTime < nowTime) {
        // 预约了明天的时间

        // 选择时间小于当前时间
        diffTime = ONE_DATE_TIME - nowTime + pickerTime;
        const tempDate = new Date(todayBeginTime + diffTime);

        dHour = tempDate.getHours();
        dMinute = tempDate.getMinutes();
      } else {
        // 预约了当天的时间

        // 选择时间大于当前时间
        diffTime = pickerTime - nowTime;
        const tempDate = new Date(todayBeginTime + diffTime);

        dHour = tempDate.getHours();
        dMinute = tempDate.getMinutes();
      }

      return [dHour, dMinute];
    },

    handlePresetCarouselID() {
      const {currentMode} = this;
      // 设置预约滑轮ID
      const appointmentModeList = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const mode of this.modeList) {
        if (mode.hasAppointment) appointmentModeList.push(mode);
      }
      let selectedId = 0;
      appointmentModeList.forEach((ele, index) => {
        const {modeId} = ele;
        if (currentMode.modeId === modeId) {
          selectedId = index;
        }
      });
      this.setCarousel(selectedId);
    },

    /**
     * @function presetConfirm
     * @description 点击开始之后的操作
     */
    presetConfirm() {
      this.handlePresetCarouselID();

      const {currentMode} = this;
      const { modeId, hasTimer } = currentMode;
      const mode = modeId;
      const WorkTime = this.getRiceTextreModeTime(this.currentMode, this.Rice, this.Textre);
      let StTmr = WorkTime; // 定时时间
      const Pow = 1;
      let SchTmr = 0; // 预约时间
      let TmrEn = 0; // 定时使能
      let SchEn = 0; // 预约使能
      let StpRic = 0; // 煮饭阶段

      const currentTime = this.appointCurrentTime;
      const pHour = parseInt(currentTime.split(':')[0], 10);
      const pMinute = parseInt(currentTime.split(':')[1], 10);

      const [dHour, dMinute] = this.getPickerSchTmrDiffDataNow(pHour, pMinute);

      // 预约完成时间与现在时间差
      const dSchTmr = dHour * 60 + dMinute;

      // 是否有定时
      if (hasTimer) {
        // 获取定时
        StTmr = this.getPickerStTmr();
        // 是否定时使能
        if (WorkTime !== StTmr) {
          TmrEn = 1; // 定时使能
        }
      }

      console.log('定时:', StTmr, '预约完成:', dSchTmr); // eslint-disable-line

      // 是否有预约
      if (StTmr >= dSchTmr) {
        // 定时时间大于预约时间直接开始烹饪
        // 煮饭阶段
        StpRic = 6;
      } else {
        // 有预约
        SchTmr = dSchTmr;
        SchEn = 1; // 预约使能
      }
      this.setDataObject({ Pow, mode, StTmr, SchTmr, TmrEn, SchEn, StpRic });
      this.sendCtrl({ Pow, mode, StTmr, SchTmr, TmrEn, SchEn, StpRic });

      // 直接工作时回到主页
      if (SchEn !== 1) {
        this.$router.push({ path: '/' });
      }
    },
    /**
     * @function cancelPreset
     * @description 预约开始后点击取消的操作
     */
    cancelPreset() {
      const sendObj = {
        Pow: 0,
        TmrEn: 0,
        SchEn: 0,
        SchTmr: 0,
      };
      this.setDataObject(sendObj);
      this.sendCtrl(sendObj);
      this.$router.push({ path: '/' });
    },
    /**
     * @function setCarousel
     * @description 根据state传来的模式改变模式的名称和时间
     */
    setCarousel(param) {
      this.$refs.carouselPreset && this.$refs.carouselPreset.setId(param);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/index.scss";

$main-width: 100%;
$main-height: 100%;
.page-appointment {
  width: 100%;
  height: 100%;
  text-align: center;
  font-family: appleUltralight;
  .head {
    width: $main-width;
    height: round($main-height / 3.3);
    box-sizing: border-box;
    color: #fff;
    background-image: url("../../assets/img/Ymainbg.png");
    background-size: 100% 100%;
    .prompt {
      width: 100%;
      height: 15%;
      padding-left: 2%;
      box-sizing: border-box;
      @include font-size(20px);
      text-align: left;
    }
    .carousel {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 65%;
      box-sizing: border-box;
      .carousel-wrapper {
        margin-top: 5%;
        height: 40%;
      }
      .mode-name {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 35%;
        @include font-size(25px);
      }
    }
  }
  .main {
    width: 100%;
    height: 58%;
    background-color: #f4f4f4;
    .white-space {
      margin: 0.25rem 0;
      border-bottom: 1px solid #b4b4b4;
    }
    .time-describe {
      padding: 0.25rem 0 0.25rem 1rem;
      text-align: left;
      @include font-size(19px);
      .time-range {
        color: #000000;
        opacity: 0.6;
        font-family: appleLight;
      }
    }
    @media screen and (max-width: 320px) and (max-height: 500px) {
      .time-describe {
        padding-top: 0;
      }
    }
    .time-picker-show {
      display: flex;
      justify-content: center;
      align-items: baseline;
      width: 100%;
      height: 23%;
      box-sizing: border-box;
      .timing-num {
        @include font-size(66px);
      }
      .timing-txt {
        @include font-size(20px);
      }
    }
    .time-picker {
      width: 100%;
      box-sizing: border-box;
      .time-picker-center-bg {
        position: absolute;
        margin-top: 55px;
        height: 55px;
        width: 100%;
        background: #fff;
      }
    }
    @media screen and (max-width: 320px) and (max-height: 500px) {
      .time-picker {
        height: 58%;
      }
    }
    .preset-describe {
      padding: 0.25rem 0 0.25rem 1rem;
      text-align: left;
      @include font-size(19px);
    }
    @media screen and (max-width: 320px) and (max-height: 500px) {
      .preset-describe {
        padding-top: 0;
      }
    }
    .preset-picker-show {
      // margin-top: -3%;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 23%;
      box-sizing: border-box;
      .preseting-num {
        padding: 0 10px;
        @include font-size(66px);
      }
      .preseting-txt {
        // @include font-size(25px);
        // align-self: flex-start;
        padding-bottom: 15px;
        @include font-size(70px);
      }
    }
    .preset-picker {
      width: 100%;
      // height: 50%;
      display: flex;
      flex: 1;
      box-sizing: border-box;
      .time-picker-center-bg {
        position: absolute;
        margin-top: 55px;
        height: 55px;
        width: 100%;
        background: #fff;
      }
    }
    .picker-light {
      width: 100%;
      background-color: #fff;
    }
    .hide {
      display: none;
    }
    .hidden {
      visibility: hidden;
    }
  }
  .main-preset {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    width: 100%;
    height: 50%;
    background-color: #f4f4f4;
    .finishtime {
      font-size: 0.45rem;
    }
    .finishdetail {
      position: relative;
      display: flex;
      flex-basis: 40%;
      justify-content: center;
      align-items: center;
      margin-bottom: 1rem;
      width: 100%;
      height: 23%;
      .preseting-num {
        padding: 0 10px;
        @include font-size(90px);
      }
      .preseting-txt {
        // @include font-size(18px);
        padding-bottom: 20px;
        @include font-size(90px);
      }
      .txt-finish {
        position: absolute;
        bottom: 24%;
        left: 82%;
        font-size: 0.45rem;
      }
    }
  }
  .foot {
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    width: 100%;
    height: 12%;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.3rem 1.15rem;
      font-size: 0.45rem;
      background-color: #fff;
      border-radius: 50px;
      box-shadow: 0px 0px 10px 0px #dbdbdb;
      &:active {
        background: #f4f4f4;
      }
    }
  }
  .cancelpreset {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18%;
    margin: 3%;
    padding: 0.38rem 1.5rem;
    line-height: 0.675rem;
    font-size: 0.675rem;
    border-radius: 50px;
    background-color: #fff;
    box-shadow: 0px 0px 10px 0px #dbdbdb;
  }
  .foot-preset {
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .footbottom {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding-bottom: 0.5rem;
      .seniorfunc {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 25%;
        .img {
          width: 70%;
        }
        .name {
          @include font-size(16px);
        }
      }
    }
  }
  .hide {
    display: none;
  }
  .hidden {
    visibility: hidden;
  }
}
</style>

<style lang="scss" scoped>
.window-container {
  display: flex;
  flex-direction: column;
  &:first-child {
    border-top: 1px solid #bbbbbb;
  }
  &:not(:last-child) {
    border-bottom: 1px solid #bbbbbb;
  }
  &:last-child {
    border-bottom: 1px solid #bbbbbb;
  }
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-right: 1rem;
    padding-left: 0.5rem;
    line-height: 1rem;
    font-size: 0.4rem;
    font-family: appleLight;
    .gray {
      color: #858585;
    }
    img {
      position: absolute;
      transform: rotateZ(-90deg);
      right: 0;
      width: 1rem;
      height: 1rem;
      &.is-open {
        transform: rotateZ(0deg);
      }
    }
  }
  .body {
    position: relative;
    display: none;
    &.is-open {
      margin: 0.5rem 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .time-picker-center-bg {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      margin-top: -31px;
      height: 62px;
      width: 100%;
      background: #fff;
    }
  }
}
</style>
