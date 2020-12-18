<template>
  <!-- 主页面，包含状态栏、Show、Mode模块 -->
  <div class="page-main">
    <div class="func-head">
      <DevInfo @statusBack="goBack()" />
      <RiceTypeTaste
        ref="TypeTaste"
        :type-list="['长粒米', '短粒米', '糙米']"
        :taste-list="['稍软', '适中', '稍硬']"
        :editable="currentMode.canEditableRiceTextreComponent && Pow == 0"
        :has-rice="currentMode.hasRice"
        :has-textre="currentMode.hasTextre"
        :default-time-for-customize="currentMode.defaultTimeForCustomize"
        :class="{ hidden: (!currentMode.hasRice && !currentMode.hasTextre) }"
        @handleConfirm="handleRiceTextreConfirm"
      >
        <template slot="title">
          {{ currentMode.modeName }}<span>{{ computedWorkTime }}</span>分钟
        </template>
      </RiceTypeTaste>
      <div
        class="carousel"
        :class="{hide: isMode}"
      >
        <carousel
          ref="modeCarousel"
          class="carousel-wrapper"
          :prop-data="computedCarouselData"
          :options="carouselOptions"
          @currentChange="handleChange"
          @currentItemChange="handleCurrentItemChange"
        /> <!-- 主页模式滑轮-->
        <div class="mode-name">
          {{ touchMoveModeName || currentMode.modeName }}
        </div>
      </div>
      <div
        class="mode-head"
        :class="{ hide: !isMode }"
      >
        <!-- 显示时间 -->
        <WorkTime
          :time="computedWorkTime"
          :class="{ 'd-none': currentMode.timeType === 'timing' }"
        />
        <div
          class="mode-name"
          :class="{ 'timing': currentMode.timeType === 'timing' }"
        >
          {{ currentMode.modeName }}
        </div>
      </div>
    </div>
    <router-view ref="childMode" />
  </div>
</template>

<script>
/**
 * @module Home
 * @description 主页面，包含状态栏、Show、Mode模块
 * @requires module:carouselConfig 滑轮组件
 * @requires module:DevInfo 设备信息组件
 * @requires module:progressConfig 煮饭过程.mixin
 * @requires module:setTime 时间变换.mixin
 */
import { mapState, mapMutations } from 'vuex';
import Carousel from '../../components/Carousel';
import DevInfo from '../../components/DevInfo';
import RiceTypeTaste from '../../components/RiceTypeTaste';
import WorkTime from '../../components/WorkTime';
import { setTime } from '../../mixins/function-change-device.mixin';
import globalMixin from '../../mixins/global.mixin';
import { TURN_ON, TURN_OFF, MODE_KEEP_WARM } from '../../api/constants';

export default {
  name: 'Home',
  components: {
    Carousel,
    DevInfo,
    RiceTypeTaste,
    WorkTime
  },
  mixins: [globalMixin, setTime],
  data() {
    return {
      touchMoveModeName: null,
      modeListIndex: null,
      save: this.$language('btnSave'),
      unitHour: this.$language('unitHour'),
      about: this.$language('about'),
      unitMin: this.$language('unitMin'),
      type: this.$language('long_rice'),
      taste: this.$language('suitable'),
      isProgress: false, // 所选模式有没有煮饭步骤
      curType: false, // 是否显示米种弹框
      canSelRice: true, // 是否可以点击
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      MidType: state => state.dataObject.MidType,
      Pow: state => state.dataObject.Pow,
      mode: state => state.dataObject.mode,
      Rice: state => state.dataObject.Rice,
      Textre: state => state.dataObject.Textre,
      KpTpEn: state => state.dataObject.KpTpEn,
      KpTpTmr: state => state.dataObject.KpTpTmr,

      currentMode: state => state.currentMode,
      modeList: state => state.modeList,
      devname: state => state.devName,
      modeName: state => state.modeName,
      isMode: state => state.isMode,
      /**
       * @function isAbout
       * @param {object} state
       * @description 当前模式的烹饪时间是否显示“约”字
       */
      isAbout: function isAbout(state) {
        let status;
        if (state.isMode) {
          state.isAbout ? (status = true) : (status = false);
        } else {
          status = false;
        }
        return status;
      },
      /**
       * @function isCooking
       * @param  {object} state
       * @description 判断设备有没有启动，启动后滑轮禁止滑动
       * @returns {number} state.dataObject.Pow
       */
      isCooking: function isCooking(state) {
        let result = false;
        if (state.dataObject.Pow === 1) {
          result = true;
        }
        return result;
      },
      /**
       * @function modeIndex
       * @param  {object} state
       * @description 模式更改后执行动作:同步滑轮ID、模式名称、烹饪时间
       * @returns {number} state.dataObject.mode
       */
      modeIndex: function modeIndex(state) {
        const myMode = state.dataObject.mode;
        if (!state.dataObject.SchEn) {
          this.$nextTick(() => {
            this.initMain();
          });
        }
        return myMode;
      },
      isPreseting: function isPreseting(state) {
        state.dataObject.SchEn ? this.$router.push({ name: 'Appointment' }) : '';
        return state.dataObject.SchEn;
      },

      computedCarouselData: function computedCarouselData() {
        const ret = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const mode of this.modeList) {
          ret.push(mode);
        }
        return ret;
      },

      computedWorkTime: function computedWorkTime() {
        const rWorkTime = this.getRiceTextreModeTime(this.currentMode, this.Rice, this.Textre);
        return rWorkTime;
      },
      carouselOptions() {
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
  watch: {
    // 监控整机
    Pow: function watchPow(newValue) {
      if (newValue === 1) {
        let currentMode = this.modeList[0];
        this.modeList.forEach(ele => {
          const mode = ele;
          if (this.mode === mode.modeId) {
            currentMode = mode;
          }
        });
        const { index } = currentMode;
        this.setCurrentMode(currentMode);
        this.setActiveMode({ modeIndex: index });
        this.$refs.modeCarousel.setId(index);

        const refTypeTaste = this.$refs.TypeTaste;
        // 设置米种口感
        refTypeTaste.setType({ type: this.Rice });
        refTypeTaste.setTaste({ taste: this.Textre });
      }
    },

    KpTpEn(newV) {
      // 是否保温模式
      const isKeepWarm = newV === TURN_ON;
      const isCancleKeepWarm = newV === TURN_OFF;
      if (isKeepWarm) {
        // 保温模式
        const currentMode = this.getCurrentModeByModeId(MODE_KEEP_WARM);
        this.setCurrentMode(currentMode);
        console.warn('::保温模式::'); // eslint-disable-line
      } else if (isCancleKeepWarm) {
        const currentMode = this.getCurrentModeByModeId();
        this.setCurrentMode(currentMode);
      }
    },

    mode(newV, oldV) {
      if (newV !== oldV) {
        let currentMode = this.getCurrentModeByModeId();
        // 是否保温模式
        const isKeepWarm = this.KpTpEn === TURN_ON;
        if (isKeepWarm) {
          // 保温模式
          currentMode = this.getCurrentModeByModeId(MODE_KEEP_WARM);
          console.warn('::保温模式::'); // eslint-disable-line
        }
        this.setCurrentMode(currentMode);

        const { index, modeName } = currentMode;
        console.log(`watchMode :: 模式：${modeName}`); // eslint-disable-line
        this.$refs.modeCarousel.setId(index);
      }
    }
  },
  /**
   * @function init
   * @description 初始化页面
   */
  mounted: function init() {
    this.initMain();
  },
  methods: {
    ...mapMutations({
      updateIsAbout: 'IS_ABOUT',
      updateModeName: 'MODE_NAME',
      setDataObject: 'SET_DATA_OBJECT',
      setCurrentMode: 'SET_CURRENT_MODE',
      setActiveMode: 'SET_ACTIVE_MODE',
    }),
    goBack() {
      window.backButton();
    },
    /**
     * @function initMain
     * @description 控制滑轮ID、控制class:type-taste下的米种和口感的显示、更新模式名称、判断有没有煮饭过程
     */
    initMain() {
      const refTypeTaste = this.$refs.TypeTaste;
      // eslint-disable-next-line no-undef
      try{vm.$refs.$TypeTaste = refTypeTaste;}
          catch (e) {console.log(e);} // 共享组件

      // 设置米种口感
      refTypeTaste.setType({ type: this.dataObject.Rice });
      refTypeTaste.setTaste({ taste: this.dataObject.Textre });
      // let currentMode = this.getCurrentModeByModeId(this.currentMode.modeId);
      let currentMode = this.getCurrentModeByModeId();
      // 是否保温模式
      const isKeepWarm = this.KpTpEn === TURN_ON;
      if (isKeepWarm) {
        // 保温模式
        currentMode = this.getCurrentModeByModeId(MODE_KEEP_WARM);
        console.warn('::保温模式::'); // eslint-disable-line
      }

      const { index, modeName } = currentMode;
      // eslint-disable-next-line no-console
      console.log(`initMain :: 模式：${modeName}`);
      this.setCurrentMode(currentMode);
      this.setActiveMode({ modeIndex: index });
      this.$refs.modeCarousel.setId(index);
    },

    handleRiceTextreConfirm: function handleRiceTextreConfirm(typeTaste) {
      try {
        const { type, taste } = typeTaste;
        this.setDataObject({
          Rice: type, // 米种
          Textre: taste, // 口感
        });
      } catch (e) {
        console.log(e); // eslint-disable-line
      }
    },

    /**
     * @function selRice
     * @description 点击米种、口感选择米种
     */
    selRice() {
      if (this.canSelRice) {
        this.modeIndex === 13 ? '' : this.curType = true;
      }
    },
    riceChange(val) {
      this.curType = val;
    },
    /**
     * 设置Picker时间
     *
     * @param {*} hour
     * @param {*} minute
     */
    setPickerTime(hour, minute) {
      const selfPicker = this.$refs.childMode.$refs.timePicker;
      selfPicker.setSlotValue(0, hour);
      selfPicker.setSlotValue(1, minute);
    },
    handleCurrentItemChange(modeName) {
      this.touchMoveModeName = modeName;
    },
    /**
     * @function handleChange
     * @description 模式滑轮滑动触发的事件:向state提交模式、口感、米种，判断是否显示“约”
     * @param index modLeist下标
     */
    handleChange(index) {
      console.log('=== home 滑轮回调 ==='); // eslint-disable-line
      this.updateIsAbout(true); // “约”
      this.setActiveMode({ modeIndex: index });
      const currentMode = this.modeList[index];

      // 设置米种口感 同步工作时间
      const [Rice, Textre] = currentMode.defaultValueRiceTextre;
      this.setDataObject({
        Rice,
        Textre
      });
      // eslint-disable-next-line no-undef
      const refTypeTaste = vm.$refs.$TypeTaste;
      // 设置米种口感
      refTypeTaste.setType({ type: this.dataObject.Rice });
      refTypeTaste.setTaste({ taste: this.dataObject.Textre });
      this.setCurrentMode(currentMode);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/index.scss";

$main-width: 100%;
$main-height: 100%;
.d-none {
  display: none;
}
.page-main {
  width: $main-width;
  height: $main-height;
  text-align: center;
  color: #ffffff;
  overflow: hidden;
  .func-head {
    width: $main-width;
    height: round($main-height / 3.3);
    box-sizing: border-box;
    background-image: url("../../assets/img/Ymainbg.png");
    background-size: 100% 100%;
    .type-taste {
      width: 100%;
      height: 15%;
      box-sizing: border-box;
      text-align: left;
      padding-left: 5%;
      @include font-size(18px);
      .rice-arrow {
        margin-bottom: -2px;
        width: 0.2rem;
      }
      .rice-taste {
        display: inline;
      }
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
        font-size: 0.6rem;
      }
    }
    .mode-head {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 65%;
      box-sizing: border-box;
      .distime {
        display: flex;
        justify-content: center;
        align-items: baseline;
        width: 100%;
        height: 50%;
        margin-top: 8%;
        box-sizing: border-box;
        .time-text {
          @include font-size(20px);
        }
        .time-num {
          @include font-size(58px);
        }
      }
      .mode-name {
        margin-top: 2%;
        box-sizing: border-box;
        font-size: 0.6rem;
      }
      .mode-name.timing {
        font-size: 0.8rem;
      }
    }
    .hide {
      display: none;
    }
  }
  .hidden {
    visibility: hidden;
  }
  .hide {
    display: none;
  }
  .none {
    display: none;
  }
}
</style>
