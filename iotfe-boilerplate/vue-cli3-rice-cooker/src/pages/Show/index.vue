<template>
  <!-- 显示页面, 显示待机、烹饪中、预约、定时等过程 -->
  <div class="func-main">
    <div
      class="main-body"
      :class="{ hide: isCooking }"
    >
      <!-- 烹饪没有开始，显示默认烹饪时间的界面 start -->
      <span
        class="warning"
        :class="{hidden: !currentMode.hasTimer}"
      >{{ timerShowTitle }}</span>

      <!-- 显示时间 -->
      <WorkTime
        class="show"
        :class="{ hide: currentMode.hasTimer, 'd-none': currentMode.timeType === 'timing' }"
        :time="computedWorkTime"
      />

      <div
        class="timePicker"
        :class="{ hide: !currentMode.hasTimer }"
      >
        <div class="time-picker-center-bg" />
        <!-- 定时滑轮 -->
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
        />
      </div>

      <div
        class="btn-begin"
        @click="confirm()"
      >
        {{ btnStart }}
      </div>
    </div>
    <!-- 烹饪没有开始，显示默认烹饪时间的界面 end -->

    <div
      class="main-cook-step"
      :class="{
        hide: dataObject.Pow === 0
          || !(isCookingSteps)
      }"
    >
      <!-- 烹饪开始===有烹饪过程 -->
      <div
        ref="progress"
        class="cook-step-imgholder"
        :class="stepClass"
      >
        <span class="cookpro">{{ cookingReadyNames[0] }}</span>
        <div class="progress-top">
          <div class="cookpro">
            {{ cookingReadyNames[1] }}
          </div>
          <div class="cookpro">
            {{ cookingReadyNames[2] }}
          </div>
        </div>
        <!-- 到最后一步时这里的烹饪过程 *占位* 隐藏，由下面的蒙版显示 -->
        <p :class="{ 'invisable': isLastCookingStage }">
          {{ stepName }}
        </p>
        <div class="progress-btm">
          <div class="cookpro">
            {{ cookingReadyNames[3] }}
          </div>
          <div class="cookpro">
            {{ cookingReadyNames[4] }}
          </div>
        </div>
      </div>
      <div
        class="btn-cancel"
        @click="cookCancel()"
      >
        {{ btnCancel }}
      </div>
    </div>

    <div
      class="main-cooking"
      :class="{
        hide: !isCooking
          || !(isRunLight || isDisplayTime)
      }"
    >
      <!-- 烹饪开始===无烹饪过程的界面 start -->
      <div
        class="cooking-imgholder"
        :class="{
          'run-light': isRunLight || isDisplayTime
        }"
      >
        <div class="cooking-top">
          <div :class="{ 'd-none': !isNoStpRic }">
            <p
              class="remainder"
              :class="{ hide: isNoStpRic }"
            >
              {{ txtLast }}
            </p>
            <WorkTime
              :time="computedWorkTime"
              :is-show-about="isTiming"
            />
          </div>
        </div>
        <div
          class="cooking-btm"
          :class="{
            'absolute-cooking-btm': isNoStpRic,
            'd-none': isLastCookingStage,
          }"
        >
          {{ cookingTxt }}
        </div>
      </div>
      <div
        class="btn-cancel"
        @click="cookCancel()"
      >
        {{ btnCancel }}
      </div>
    </div>
    <!-- 烹饪开始===无烹饪过程的界面 end -->

    <!-- 烹饪开始===有烹饪过程，而且烹饪到最后一步的蒙版：显示剩余时间 start -->
    <div
      class="main-stewed"
      :class="{ hide: !isLastCookingStage }"
    >
      <div class="retime-container">
        <p class="remainder">
          {{ txtLast }}
        </p>
        <WorkTime :time="computedWorkTime" />
      </div>
      <p class="progress-last">
        {{ stepName }}
      </p>
    </div>
    <!-- 烹饪开始===有烹饪过程，而且烹饪到最后一步的蒙版：显示剩余时间 end -->

    <div
      class="cook-mask"
      :class="{ hide: !showMask }"
      @click="affirmCancelNothing()"
    >
      <!-- 确认取消的弹框 -->
      <div class="cook-toast">
        <div class="toast-title">
          <div>{{ prompt }}</div>
        </div>
        <div
          class="toast-msg"
          v-html="txtMakeSure"
        />
        <div class="toast-confirm">
          <div @click="affirmCancelCook()">
            取消烹饪
          </div>
          <div @click="affirmCancelNothing()">
            继续烹饪
          </div>
        </div>
      </div>
    </div>

    <div
      class="cook-mask"
      :class="{ hide: !potMask }"
    >
      <!-- 煲仔饭提醒 -->
      <div class="pot-toast">
        <div class="pot-toast-title">
          <div>{{ prompt }}</div>
        </div>
        <div
          class="pot-toast-msg"
          v-html="potNotify"
        />
        <div
          class="pot-toast-confirm"
          @click="affirmCancelNothing()"
        >
          我知道了
        </div>
      </div>
    </div>

    <div
      class="main-foot"
      :class="{ hide: isCooking || isScene }"
    >
      <!-- 底部功能按键 -->
      <!-- 在 30x88C与30x61c不做语音 -->
      <div
        v-for="(item, index) in footList"
        :key="item.index"
        :ref="'func-' + index"
        class="foot-list"
        :class="{ 'd-none': index === 3 && hideVoiceBtn }"
        @click="handleFunc(index, currentMode)"
      >
        <img
          v-if="item.menu_id == 1 && !currentMode.hasAppointment"
          class="img"
          :src="item.disabledImgUrl"
        >
        <img
          v-else
          class="img"
          :src="item.ImgUrl"
        >
        <span
          class="name"
          :class="{ disable: item.menu_id == 1 && !currentMode.hasAppointment }"
        >
          {{ item.name }}
        </span>
      </div>
    </div>
    <div
      class="main-foot"
      :class="{ hide: !isScene, hidden: isCooking }"
    >
      <!-- 场景模式底部功能按键 -->
      <div
        v-for="(item, index) in footList"
        :key="item.index"
        class="foot-list"
        @click="handleSceneFunc(index)"
      >
        <img
          v-if="index<1"
          class="img"
          :src="item.ImgUrl"
        >
        <span
          v-if="index<1"
          class="name"
        >{{ item.name }}</span>
      </div>
    </div>
    <div
      class="main-foot-cook"
      :class="{ hide: !isCooking, hidden: isScene }"
    >
      <!-- 开始烹饪后底部功能按键 -->
      <div
        class="foot-cook-list"
        @click="handleCookFunc()"
      >
        <img
          class="img"
          src="../../assets/img/menu.png"
        >
        <span class="name">{{ this.$language('btnMenu') }}</span>
      </div>

      <!-- 在 30x88C与30x61c不做语音 -->
      <div
        class="foot-cook-list"
        :class="{ 'd-none': hideVoiceBtn }"
        @click="handleVoiceFn()"
      >
        <img
          class="img"
          src="../../assets/img/voice.png"
        >
        <span class="name">{{ this.$language('btnVoice') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @module Show
 * @description 显示页面, 显示待机、烹饪中、预约、定时等过程
 * @requires module:setTime 时间变换.mixin
 */
import { mapState, mapMutations, mapActions } from 'vuex';
import { closePage } from '../../../../static/lib/PluginInterface.promise';
import WorkTime from '../../components/WorkTime';
import { setTime, timePickerConfig } from '../../mixins/function-change-device.mixin';
import carouselConfig from '../../mixins/carousel-config.mixin';
import globalMixin from '../../mixins/global.mixin';
import initPickerSlotsMixin from '../../mixins/initPickerSlots.mixin';
import {
  TURN_ON,
  TURN_OFF,
  RC_MID_TYPE_30X61C,
  RC_MID_TYPE_30X66C,
  RC_MID_TYPE_30X88C,
  RC_MID_TYPE_40X65C,
  RC_MID_TYPE_4009C,
  RC_MID_TYPE_2008C,
  COOKING_STAGE_DISPLAY_TIME,
  COOKING_STAGE_DISPLAY_TIME_2008C,
  MODE_KEEP_WARM,
  MODE_HOT_POT_RICE,
  MODE_DESUGAR_RICE,
  MODE_SPROUT_RICE,
  MODE_SLOW_COOKING,
  MODE_QUICK_COOKING,
  MID_828409,
  CR_STAGE_DEFAULT,
  CR_4030C_SLOW_OR_QUICK_COOKING,
  CR_4030C_SPROUT_RICE,
  CR_4030C_DESUGAR_RICE,
} from '../../api/constants';
import {
  getVantPickerTimeRange,
  generatorColumns,
  formateIndex,
  getVantDateTimeForTiming
} from '../../utils/index';

const imgFunc = require('../../assets/img/func.png');
const imgPreset = require('../../assets/img/preset.png');
const imgPresetDisable = require('../../assets/img/preset_disable.png');
const imgMenu = require('../../assets/img/menu.png');
const imgVoice = require('../../assets/img/voice.png');

export default {
  name: 'Show',
  components: {
    WorkTime
  },
  mixins: [globalMixin, initPickerSlotsMixin, carouselConfig, setTime, timePickerConfig],
  data() {
    return {
      hourAll: [],
      miniteAll: [],
      isPicking: false, // 有没有选择时间
      isSurplusH: true, // 显示小时
      showMask: false, // 弹框遮罩
      potMask: false, // 煲仔饭提示遮罩
      potNotify: this.$language('potNotifyBefore'), // 煲仔饭提示
      btnStart: this.$language('btnStart'),
      save: this.$language('btnSave'),
      unitHour: this.$language('unitHour'),
      about: this.$language('about'),
      unitMin: this.$language('unitMin'),
      btnCancel: this.$language('btnCancel'),
      txtLast: this.$language('txtLast'),
      prompt: this.$language('prompt'),
      txtMakeSure: this.$language('txtMakeSure'),
      func: this.$language('btnFunc'),
      preset: this.$language('btnPreset'),
      menu: this.$language('btnMenu'),
      voice: this.$language('btnVoice'),
      adjustime: this.$language('time_zhuzhou'),
      // 时间picker配置
      pickerTimeList: [],
      footList: [
        {
          menu_id: 0,
          name: this.$language('btnFunc'),
          ImgUrl: imgFunc,
          disabledImgUrl: require('../../assets/img/func.png'),
        },
        {
          menu_id: 1,
          name: this.$language('btnPreset'),
          ImgUrl: imgPreset,
          disabledImgUrl: imgPresetDisable,
        },
        {
          menu_id: 2,
          name: this.$language('btnMenu'),
          ImgUrl: imgMenu,
          disabledImgUrl: require('../../assets/img/menu.png'),
        },
        {
          menu_id: 3,
          name: this.$language('btnVoice'),
          ImgUrl: imgVoice,
          disabledImgUrl: require('../../assets/img/voice.png'),
        },
      ],
      progressList: [
        { index: 0, stepName: this.$language('stage_one'), className: 'step1' },
        { index: 1, stepName: this.$language('stage_two'), className: 'step2' },
        { index: 2, stepName: this.$language('stage_three'), className: 'step3' },
        { index: 3, stepName: this.$language('stage_four'), className: 'step4' },
        { index: 4, stepName: this.$language('stage_five'), className: 'step5' },
        { index: 5, stepName: this.$language('stage_cooking'), className: 'step6' }, // 占位
        { index: 6, stepName: this.$language('stage_cooking'), className: 'step6' }, // 占位
      ],
      timingCurrentTime: '00:00',
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      Pow: state => state.dataObject.Pow,
      mode: state => state.dataObject.mode,
      Rice: state => state.dataObject.Rice,
      Textre: state => state.dataObject.Textre,
      MidType: state => state.dataObject.MidType,
      StpRic: state => state.dataObject.StpRic,
      KpTpEn: state => state.dataObject.KpTpEn,
      KpTpTmr: state => state.dataObject.KpTpTmr,
      StTmr: state => state.dataObject.StTmr,
      riceType: state => state.dataObject.Rice,
      tasteType: state => state.dataObject.Textre,
      modeList: state => state.modeList,
      devname: state => state.devName,
      isScene: state => state.isScene,
      isAbout: state => state.isAbout,
      modeName: state => state.modeName,
      currentMode: state => state.currentMode,

      cookingReadyNames() {
        const { mode } = this;
        const is4030C = process.env.VUE_APP_MID === MID_828409;
        let ret = CR_STAGE_DEFAULT;
        if (is4030C) {
          const isSlowOrQuickCooking = mode === MODE_SLOW_COOKING || mode === MODE_QUICK_COOKING;
          const isSproutRice = mode === MODE_SPROUT_RICE;
          const isDesugarRice = mode === MODE_DESUGAR_RICE;
          if (isSlowOrQuickCooking) {
            ret = CR_4030C_SLOW_OR_QUICK_COOKING;
          } else if (isSproutRice) {
            ret = CR_4030C_SPROUT_RICE;
          } else if (isDesugarRice) {
            ret = CR_4030C_DESUGAR_RICE;
          }
        }
        return ret;
      },

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

      vanPickerList() {
        const ret = [];
        const {modeList} = this;
        for (let index = 0; index < modeList.length; index += 1) {
          const mode = modeList[index];
          const { minTime, maxTime, defaultTime } = mode;
          const times = generatorColumns({ minTime, maxTime });
          const index = parseInt(defaultTime / 60, 10);
          const defaultKey = formateIndex(index);
          const defaultIndex = parseInt(defaultTime % 60, 10);
          const modeVanPicker = [
            {
              values: Object.keys(times),
              className: 'column1',
            },
            {
              values: times[`${defaultKey}`],
              className: 'column2',
              defaultIndex
            }
          ];
          ret.push(modeVanPicker);
        }
        return ret;
      },

      vanPickerTimeRange() {
        const { minTime, maxTime } = this.currentMode;
        return generatorColumns({ minTime, maxTime });
      },

      columns() {
        const { defaultTime } = this.currentMode;
        const index = parseInt(defaultTime / 60, 10);
        const defaultKey = formateIndex(index);
        const defaultIndex = parseInt(defaultTime % 60, 10);
        return [
          {
            values: Object.keys(this.vanPickerTimeRange),
            className: 'column1',
          },
          {
            values: this.vanPickerTimeRange[`${defaultKey}`],
            className: 'column2',
            defaultIndex
          }
        ];
      },

      isCookingSteps() {
        return this.currentMode.cookingType === 'cooking_steps';
      },

      isNoStpRic() {
        let ret = false;
        if (this.isTiming || this.isDisplayTime) {
          ret = true;
        }
        return ret;
      },

      isTiming() {
        return this.currentMode.timeType === 'timing';
      },

      isDisplayTime() {
        return this.currentMode.cookingType === 'display_time';
      },

      isRunLight() {
        return this.currentMode.cookingType === 'run_light';
      },

      cookingTxt() {
        if (this.KpTpEn === TURN_ON) {
          return this.$language('stage_keep_warn');
        }
        return this.$language('stage_cooking');
      },

      // 煮饭阶段有没有到最后一步，到最后一步显示时间
      isLastCookingStage() {
        const is2008C = this.MidType === RC_MID_TYPE_2008C;
        const isRunLight = this.currentMode.cookingType === 'run_light';
        const isCooking = this.Pow === TURN_ON && this.KpTpEn === TURN_OFF;

        const {StpRic} = this;
        // 只有五个步骤，防止溢出
        if (is2008C && (StpRic > 4 || StpRic < 0)) {
          console.warn(`StpRic: array bound. StpRic: ${StpRic}`); // eslint-disable-line
        } else if (StpRic > 6 || StpRic < 0) {
          console.warn(`StpRic: array bound. StpRic: ${StpRic}`); // eslint-disable-line
        }

        const isLastStage = is2008C
          ? COOKING_STAGE_DISPLAY_TIME_2008C <= StpRic
          : COOKING_STAGE_DISPLAY_TIME <= StpRic;

        let ret = false;
        if (isRunLight && isCooking && isLastStage) {
          ret = true;
        }
        return ret;
      },

      /**
       * @function isCooking
       * @description 判断是否开始烹饪
       */
      isCooking: function isCooking(state) {
        const {Pow} = state.dataObject;
        const {SchEn} = state.dataObject;
        let status = false;
        if (SchEn === TURN_ON) {
          this.$router.push({ name: 'Appointment' });
          status = false;
        } else if (Pow === TURN_ON) {
          status = true;
        } else if (Pow === TURN_OFF) {
          status = false;
        }
        if (!status) { this.potMask = false; }

        return status;
      },
      /**
       * @function requireTime
       * @param {object} state state对象
       * @description 定时时间
       * @returns {number} 定时时间
       */
      requireTime: function requireTime(state) {
        state.dataObject.StTmr <= 0 ? this.setDataObject({ TmrEn: 0 }) : '';
        return state.dataObject.StTmr;
      },

      /**
       * @function StepName
       * @param {object} state state对象
       * @description 煮饭阶段的名称
       * @returns {string} stepName
       */
      cookingStepObj() {
        const is2008C = this.MidType === RC_MID_TYPE_2008C;
        const {StpRic} = this;
        let rStepName = '';
        let rStepClass = '';
        // 只有五个步骤，防止溢出
        if (is2008C && (StpRic > 4 || StpRic < 0)) {
          console.warn(`StpRic: array bound. StpRic: ${StpRic}`); // eslint-disable-line
          rStepName = this.progressList[6].stepName;
          rStepClass = this.progressList[6].className;
        } else if (StpRic > 6 || StpRic < 0) {
          console.warn(`StpRic: array bound. StpRic: ${StpRic}`); // eslint-disable-line
        } else {
          rStepName = this.progressList[StpRic].stepName;
          rStepClass = this.progressList[StpRic].className;
        }
        return { StepName: rStepName, StepClass: rStepClass };
      },

      /**
       * @function StepName
       * @param {object} state state对象
       * @description 煮饭阶段的名称
       * @returns {string} stepName
       */
      stepName() {
        let ret = '烹饪中';
        if (this.KpTpEn === TURN_ON) {
          ret = '保温中';
        } else if (this.isCookingSteps) {
          ret = this.cookingStepObj.StepName;
        }
        return ret;
      },

      /**
       * @function stepClass
       * @function StepName
       * @param {object} state state对象
       * @description 根据模式切换是否显示煮饭阶段，如果显示煮饭阶段，根据state.dataObject.StpRic调整UI
       * @returns {string} 不同煮饭阶段的类名，控制UI变化
       * @description 煮饭阶段的名称
       * @returns {string} stepName
       */
      stepClass() {
        return this.cookingStepObj.StepClass;
      },
    }),

    hideVoiceBtn() {
      const MidType = Number(this.MidType);
      if (MidType === RC_MID_TYPE_30X61C
        || MidType === RC_MID_TYPE_30X66C
        || MidType === RC_MID_TYPE_30X88C) {
        return true;
      }
      return false;
    },

    timerShowTitle: function timerShowTitle() {
      const result = this.globalTimerTitleTips('可调时间范围', this.currentMode);
      return result;
    },

    // eslint-disable-next-line func-names
    computedWorkTime: function () {
      // 获取米种，口感
      let rWorkTime = this.getRiceTextreModeTime(this.currentMode, this.Rice, this.Textre);

      // 保温时间
      if (this.Pow === 1 && this.KpTpEn === 1) {
        rWorkTime = this.KpTpTmr;
        // 工作时间
      } else if (this.Pow) {
        rWorkTime = this.StTmr;
      }
      return rWorkTime;
    }


  },

  watch: {

    // 根据模式更换时间
    currentMode() {
      this.handleWorkTime();
    },

    // 煲仔饭开始提示
    Pow(newV, oldV) {
      const isTurnOn = newV === 1 && oldV === 0;
      const isTurnOff = newV === 0 && oldV === 1;
      const isHotPotRice = this.currentMode.modeId === MODE_HOT_POT_RICE;
      if (isTurnOn && isHotPotRice) {
        this.potNotify = this.$language('potNotifyBefore');
        this.potMask = true;
      }
      if (isTurnOff) {
        // this.handleCurrentModeChange();
      }
    },
    /**
     * @function StpRic
     * @description 煲仔饭开始倒计时时需要弹框提示加菜
     */
    StpRic: function watchStpRic(newv, oldv) {
      if (oldv === 0 && newv === 6
        && this.currentMode.modeId === MODE_HOT_POT_RICE
        && this.isCooking) {
        this.potNotify = this.$language('potNotifyAfter');
        this.potMask = true;
      }
    },
    /**
     * @function potMask
     * @description 没有任何操作就60s倒计时,然后关闭煲仔饭弹框
     */
    potMask: function potMask(newv, oldv) {
      if (oldv === false && newv === true) {
        setTimeout(() => { this.potMask = false; }, 60000);
      }
    },
    /**
     * @function cookStage
     * @description 煲仔饭烹饪结束需要弹框提示搅拌
     */
    KpTpEn: function updatePotToast(newv, oldv) {
      if (oldv === 0 && newv === 1
        && this.modeIndex === MODE_HOT_POT_RICE) {
        this.potMask = true;
        this.potNotify = this.$language('potNotifyEnd');
      }
    }
  },
  mounted() {
    console.log('==== ShowPages mounted ===='); // eslint-disable-line
    this.handleWorkTime();
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
  methods: {
    ...mapMutations({
      updateIsMode: 'IS_MODE',
      updateIsWarn: 'IS_WARN',
      updateIsAbout: 'IS_ABOUT',
      setDataObject: 'SET_DATA_OBJECT',
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL',
    }),

    handleWorkTime() {
      const {currentMode} = this;
      const {StTmr} = this;
      const { minTime, maxTime } = currentMode;

      let WorkTime = this.getRiceTextreModeTime(this.currentMode, this.Rice, this.Textre);

      // 判断是否用 CacheBuffer
      const isValid = StTmr >= minTime && StTmr <= maxTime;
      if (isValid) WorkTime = StTmr;

      this.timingCurrentTime = getVantDateTimeForTiming(WorkTime);
      // this.appointCurrentTime = getVantDateTimeForAppointment(WorkTime);
    },

    filter(type, options) {
      const currentTime = this.timingCurrentTime;
      const { maxTime, minTime } = this.currentMode;

      const _minTime = Math.min(minTime, maxTime);
      const _maxTime = Math.max(minTime, maxTime);
      const minTimeHour = parseInt(_minTime / 60, 10);
      const minTimeMinute = parseInt(_minTime % 60, 10);
      const maxTimeHour = parseInt(_maxTime / 60, 10);
      const maxTimeMinute = parseInt(_maxTime % 60, 10);

      const currentTimeHour = parseInt(currentTime.split(':')[0], 10);
      // console.log(currentTimeHour);

      if (type === 'hour') {
        return options.filter(option => option >= minTimeHour && option <= maxTimeHour);
      }
      if (type === 'minute') {
        if (minTimeHour === maxTimeHour) {
          return options.filter(option => option >= minTimeMinute && option <= maxTimeMinute);
        } if (minTimeHour !== maxTimeHour) {
          if (currentTimeHour > minTimeHour && currentTimeHour < maxTimeHour) {
            return options;
          } if (currentTimeHour === minTimeHour) {
            return options.filter(option => option >= minTimeMinute);
          } if (currentTimeHour === maxTimeHour) {
            return options.filter(option => option >= maxTimeMinute);
          }
        }
      }

      return options;
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

    handleCurrentModeChange() {
      const {currentMode} = this;
      const { index, minTime, maxTime, defaultTime } = currentMode;
      const selectedTime = defaultTime;
      const TimeObject = this.parseTimeRange(minTime, maxTime, selectedTime);
      const { arrHour, arrMinute } = TimeObject;

      const selfPicker = this.$refs[`timePicker-${index}`];
      selfPicker[0].setSlotValues(0, arrHour);
      selfPicker[0].setSlotValues(1, arrMinute);

      // this.setDefaultTimePickerTime(0); // 设置模式默认时间
      // this.setDefaultTimePickerTime(defaultTime); // 设置模式默认时间

      // 设置时间点
      // const hour = parseInt(defaultTime / 60, 10);
      // const minute = parseInt(defaultTime % 60, 10);
      // const strHour = hour < 10 ? `0${hour}` : hour;
      // const strMinute = minute < 10 ? `0${minute}` : minute;

      // const pickerValues = [strHour, strMinute];
      // const selfPicker = this.$refs.timePicker;
      // this.handlePickerValuesChange(selfPicker, pickerValues);
      // setTimeout(() => {
      //   this.fixBug(selectedTime);
      // }, 0);
    },

    handleVoiceFn() {
      this.$router.push({ name: 'Voice' });
    },

    setDefaultTimePickerTime(defaultTime) {
      const hour = parseInt(defaultTime / 60, 10);
      const minute = parseInt(defaultTime % 60, 10);
      const strHour = hour < 10 ? `0${hour}` : hour;
      const strMinute = minute < 10 ? `0${minute}` : minute;
      this.setPickerTime(strHour, strMinute);
    },

    handlePickerValuesChange(picker, values) {
      const selfPicker = picker;
      let [pickerHour, pickerMinute] = values;

      // 字符串格式化为数字: '01' -> 1
      pickerHour = parseInt(pickerHour, 10);
      pickerMinute = parseInt(pickerMinute, 10);

      const {currentMode} = this;
      const { minTime, maxTime } = currentMode;
      const selectedTime = pickerHour * 60 + pickerMinute;

      const preArrMinute = selfPicker[0].getSlotValues(1); // fix bug

      const TimeObject = this.parseTimeRange(minTime, maxTime, selectedTime);
      const { arrMinute } = TimeObject;
      if (selfPicker) {
        selfPicker.setSlotValues(1, arrMinute);
        this.fixMinuteDefaultValue(selfPicker, preArrMinute); // fix bug
      } else {
        console.error('Picker component is none'); // eslint-disable-line
      }
    },

    /**
     * 设置Picker时间
     *
     * @param {Number} hour
     * @param {Number} minute
     */
    setPickerTime(hour, minute) {
      const selfPicker = this.$refs.timePicker;
      selfPicker.setSlotValue(0, hour);
      selfPicker.setSlotValue(1, minute);
    },

    setPickerMinuteSlot(arrMinute) {
      const selfPicker = this.$refs.timePicker;
      selfPicker.setSlotValues(1, arrMinute);
    },
    getPickerTime() {
      // const selfPicker = this.$refs.timePicker;
      // const hour = selfPicker.getSlotValue(0);
      // const minute = selfPicker.getSlotValue(1);
      // const result = parseInt(hour, 10) * 60 + parseInt(minute, 10);

      const currentTime = this.timingCurrentTime;
      const currentTimeHour = parseInt(currentTime.split(':')[0], 10);
      const currentTimeMinute = parseInt(currentTime.split(':')[1], 10);
      const result = parseInt(currentTimeHour, 10) * 60 + parseInt(currentTimeMinute, 10);
      return result;
    },
    /**
     * @function confirm
     * @description 点击开始/确定后进行：开始烹饪/时间选择
     */
    confirm() {
      const {currentMode} = this;
      const {
        hasRice, // 是否有米种选择
        hasTextre, // 是否口感选择
        hasTimer, // 有没有定时
        // defaultTime, // 默认时间
      } = currentMode;

      const mode = currentMode.modeId;

      const rWorkTime = this.getRiceTextreModeTime(this.currentMode, this.Rice, this.Textre);
      let StTmr = rWorkTime;

      let TmrEn = 0; // 定时使能
      let KpTpEn = 0; // 保温使能
      let StpRic = 0; // 煮饭阶段
      const KpTpTmr = 0; // 保温时间

      if (hasTimer) {
        const appointTime = this.getPickerTime();
        StTmr = appointTime;
        TmrEn = 1;
      }

      // 是否为保温
      const isModeKeepWarm = MODE_KEEP_WARM === mode;
      if (isModeKeepWarm) KpTpEn = 1;

      const MidType = Number(this.MidType);
      const is30X61C = MidType === RC_MID_TYPE_30X61C;
      const is30X66C = MidType === RC_MID_TYPE_30X66C;
      const is30X88C = MidType === RC_MID_TYPE_30X88C;
      const is40X65C = MidType === RC_MID_TYPE_40X65C;
      const is4009C = MidType === RC_MID_TYPE_4009C;
      // 没有煮饭阶段 先显示时间，下一包数据会自动刷为`烹饪中`
      const canSetLastStage = is30X61C || is30X66C || is30X88C || is40X65C || is4009C;
      if (canSetLastStage) StpRic = COOKING_STAGE_DISPLAY_TIME; // 设置煮饭阶段为最后阶段，显示一个轮循单位模式工作时间

      this.setDataObject({
        Pow: 1,
        mode, // 模式
        TmrEn, // 定时使能
        StTmr, // 工作时间
        SchEn: 0, // 预约使能
        StpRic, // 煮饭阶段
        KpTpEn, // 保温使能
        KpTpTmr, // 保温时间
      });

      const {
        Pow,
        SchEn,
        Rice,
        Textre,
      } = this.dataObject;

      if (isModeKeepWarm) {
        this.sendCtrl({ Pow, mode, TmrEn, StTmr, SchEn, StpRic, Rice, Textre, KpTpEn, KpTpTmr });
      } else if (hasRice && hasTextre) {
        this.sendCtrl({ Pow, mode, TmrEn, StTmr, SchEn, StpRic, Rice, Textre });
      } else if (hasRice) {
        this.sendCtrl({ Pow, mode, TmrEn, StTmr, SchEn, StpRic, Rice });
      } else if (hasTextre) {
        this.sendCtrl({ Pow, mode, TmrEn, StTmr, SchEn, StpRic, Textre });
      } else {
        this.sendCtrl({ Pow, mode, TmrEn, StTmr, SchEn, StpRic, Rice, Textre });
      }
    },
    /**
     * @function cookCancel
     * @description 取消烹饪
     */
    cookCancel() {
      this.showMask = true;
    },
    /**
     * @function affirmCancelCook
     * @description 弹框确认取消烹饪
     */
    affirmCancelCook() {
      const sendObj = {
        Pow: 0, // 工作状态
        TmrEn: 0, // 定时使能
        SchEn: 0, // 预约使能
        StpRic: 0 // 煮饭阶段
      };
      this.setDataObject(sendObj);
      this.sendCtrl(sendObj);
    },
    /**
     * @function affirmCancelNothing
     * @description 弹框取消按键
     */
    affirmCancelNothing() {
      this.showMask = false;
      this.potMask = false;
    },
    /**
     * @function handleFunc
     * @description 功能跳转
     */
    handleFunc(index) {
      switch (index) {
        case 0:
          this.updateIsMode(true);
          this.$router.push({ name: 'Mode' });
          break;
        case 1:
          // 没有预约功能的模式无法跳转
          if (this.currentMode.hasAppointment) {
            const StTmr = this.getPickerTime();
            console.log(`Appointment StTmr: ${StTmr}`); // eslint-disable-line
            this.setDataObject({ mode: this.currentMode.modeId, StTmr });
            this.$router.push({ name: 'Appointment' });
          } else {
            // showToast(this.$language('txtNoPreset'), 0);
          }
          break;
        case 2:
          this.$router.push({ name: 'Menu' });
          break;
        case 3:
          this.$router.push({ name: 'Voice' });
          break;
        default:
          this.$router.push({ name: 'Home' });
          break;
      }
    },
    /**
     * @function handleSceneFunc
     * @description 场景模式下开始烹饪之后功能跳转
     */
    handleSceneFunc(index) {
      if (index === 0) {
        this.updateIsMode(true);
        this.$router.push({ name: 'Mode' });
      }
    },
    goBack() {
      this.showMask ? this.showMask = false : closePage();
    },
  },
};
</script>

<style>
.work-time.show .time-text {
  font-size: 0.6rem;
}
.work-time.show .time-num {
  font-size: 2.2rem;
}
.work-time.d-none {
  display: none;
}
</style>


<style lang="scss" scoped>
@import "../../assets/scss/index.scss";

.d-none {
  display: none !important;
}

$main-width: 100%;
$main-height: 70%;

.btn-cancel {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3%;
  padding: 0.38rem 1.5rem;
  line-height: 0.675rem;
  font-size: 0.675rem;
  background-color: #fff;
  border-radius: 35px;
  box-shadow: 0 0 5px 0 #ccc;
  color: #404657;
  &:active {
    background: #f4f4f4;
  }
}

.func-main {
  width: $main-width;
  height: $main-height;
  text-align: center;
  color: #ffffff;
  overflow: hidden;
  .main-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: $main-width;
    height: 75%;
    box-sizing: border-box;
    color: #000000;
    background-color: rgb(244, 244, 244);
    .warning {
      display: block;
      padding: 0.25rem 0 0.25rem 1rem;
      width: 100%;
      @include font-size(20px);
      text-align: left;
      font-family: appleLight;
      color: #858585;
    }

    .distime {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 76%;
      div {
        display: flex;
        justify-content: center;
        align-items: baseline;
      }
      .time-text {
        @include font-size(25px);
      }
      .time-num {
        @include font-size(90px);
      }
    }

    .timePicker {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      // height: 76%;
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
    .hide {
      display: none;
    }
    .btn-begin {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 3%;
      padding: 0.38rem 1.5rem;
      line-height: 0.675rem;
      font-size: 0.675rem;
      background-color: #fff;
      border-radius: 35px;
      box-shadow: 0px 0px 10px 0px #dbdbdb;
      &:active {
        background: #ededed;
      }
    }
  }
  .main-cook-step {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: $main-width;
    height: 80%;
    box-sizing: border-box;
    text-align: center;
    color: #000000;
    .cookpro {
      color: #9799a0;
      width: 1rem;
      @include font-size(16px);
    }
    .cook-step-imgholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      width: 86%;
      height: 70vw;
      background-size: 66vw;
      background-repeat: no-repeat;
      background-position: center 1.4rem;
      p {
        @include font-size(30px);
        color: #ebc100;
      }
      .progress-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 88%;
      }
      .progress-btm {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 98%;
      }
    }
    .step1 {
      background-image: url("../../assets/img/rice_stage_1.gif");
    }
    .step2 {
      background-image: url("../../assets/img/rice_stage_2.gif");
    }
    .step3 {
      background-image: url("../../assets/img/rice_stage_3.gif");
    }
    .step4 {
      background-image: url("../../assets/img/rice_stage_4.gif");
    }
    .step5 {
      background-image: url("../../assets/img/rice_stage_5.gif");
    }
    .hide {
      display: none;
    }
  }
  .main-cooking {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: $main-width;
    height: 80%;
    box-sizing: border-box;
    text-align: center;
    color: #000000;
    .showTime {
      justify-content: center;
    }
    .hideTime {
      justify-content: center;
    }
    .cooking-imgholder {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 65vmin;
      background-size: 70%;
      background-repeat: no-repeat;
      background-position: center top;
      &.run-light {
        background-image: url("../../assets/img/progress_hd.gif");
      }
      .cooking-top {
        width: 100%;
        .remainder {
          @include font-size(25px);
          color: rgb(64, 70, 87);
        }
        .retime {
          color: #404657;
          .surplus-num {
            @include font-size(90px);
          }
          .surplus-txt {
            @include font-size(20px);
          }
        }
      }
      .cooking-btm {
        width: 100%;
        font-size: 0.7rem;
        color: #ebc100;
      }
      .absolute-cooking-btm {
        position: absolute;
        bottom: 0.5rem;
      }
    }
  }
  .main-stewed {
    position: absolute;
    top: 30%;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40%;
    .retime-container {
      margin: auto 0 1rem;
      color: #404657;
    }
    .placeholder {
      color: transparent;
      visibility: hidden;
    }
    .remainder {
      @include font-size(25px);
      color: rgb(64, 70, 87);
    }
    .retime {
      color: #404657;
      .surplus-num {
        @include font-size(90px);
      }
      .surplus-txt {
        @include font-size(20px);
      }
    }
    .progress-last {
      @include font-size(30px);
      color: #ebc100;
    }
  }
  .cook-mask {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: #404657;
    background-image: url("../../assets/img/blackBg.png");
    background-size: 100% 100%;
    .cook-toast {
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      width: 80%;
      // height: 30%;
      background-color: #fff;
      border-radius: 10px;
      z-index: 100;
      .toast-title {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.5rem 0;
        width: 100%;
        div {
          @include font-size(20px);
        }
      }
      .toast-msg {
        width: 96%;
        padding-bottom: 1rem;
        @include font-size(16px);
      }
      .toast-confirm {
        display: flex;
        // justify-content: space-around;
        // align-items: center;
        width: 100%;
        border-top: 1px solid #ededed;
        div:not(:first-child) {
          border-left: 1px solid #ededed;
        }
        div {
          flex-grow: 1;
          line-height: 1.5rem;
          font-size: 0.5rem;
        }
        div:last-child {
          color: #0ab1ff;
        }
        div:active {
          background: #ededed;
        }
      }
    }
    .pot-toast {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      width: 92%;
      height: 23%;
      background-color: #fff;
      border-radius: 5px;
      z-index: 100;
      .pot-toast-title {
        flex-basis: 35%;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        letter-spacing: 2px;
        text-indent: 2px;
        color: #404657;
        div {
          @include font-size(20px);
        }
      }
      .pot-toast-msg {
        flex-basis: 35%;
        padding-top: 2%;
        width: 96%;
        box-sizing: border-box;
        color: #404657;
        font-family: appLight;
        @include font-size(17px);
      }
      .pot-toast-confirm {
        padding: 5% 0;
        width: 100%;
        @include font-size(17px);
        text-align: center;
        letter-spacing: 2px;
        text-indent: 2px;
        text-align: center;
        color: #00aeff;
        border-top: 1px solid #efefef;
      }
    }
  }
  .main-foot {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: $main-width;
    height: 25%;
    box-sizing: border-box;
    color: #000000;
    background-color: rgb(244, 244, 244);
    .foot-list {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 25%;
      max-width: 3rem;
      padding-top: 2%;
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      img {
        width: 1.6rem;
      }
      span {
        font-size: 0.35rem;
      }
      span.disable {
        color: rgba(0, 0, 0, 0.5);
      }
    }
  }
  .main-foot-cook {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    width: 90%;
    height: 20%;
    box-sizing: border-box;
    color: #000000;
    background-color: rgb(244, 244, 244);
    .foot-cook-list {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 25%;
      padding-bottom: 0.45rem;
      .img {
        width: 1.6rem;
      }
      .name {
        @include font-size(16px);
      }
    }
  }
  .hidden {
    visibility: hidden;
  }
  .hide {
    display: none;
  }
  .invisable {
    visibility: hidden;
  }
}
</style>
