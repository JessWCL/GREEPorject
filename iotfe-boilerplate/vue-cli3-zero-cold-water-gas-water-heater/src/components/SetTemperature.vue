<template>
  <div id="SETTEMP">
    <div class="page-set-temp">
      <div class="page-main">
        <div v-show="powerOff" id="slider"></div>
        <div
          :class="{ layer: true, powOff: !powerOff }"
          :style="{
            width: lottieRadius / 2.25 + 'px',
            height: lottieRadius / 2.25 + 'px',
          }"
        >
          <div :class="{ 'rotate -one': true, 'powOff-item': !powerOff }"></div>
          <div :class="{ 'rotate -two': true, 'powOff-item': !powerOff }"></div>
          <div :class="{ play: true, 'powOff-item': !powerOff }"></div>
        </div>
        <article class="turn-on" v-if="powerOff">
          <div class="mode-text">{{ titleText }}</div>
          <div class="water-temp">{{ setTempValue }}</div>
          <div class="inlet-text">
            <div>{{ $language('home.inletTemp') }}</div>
            <div class="temp-num">{{ inletTemp }}</div>
            <div class="temp-unit">{{ $language('home.unit') }}</div>
          </div>
        </article>
        <article class="turn-off" v-if="!powerOff">
          <gree-block>
            <span class="turn-off-text">{{ turnOffText }}</span>
          </gree-block>
        </article>
        <div v-if="reSetRoundSlider">{{ reSetRoundSlider }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Header,
  List,
  Item,
  Block,
  Row,
  Col,
  Button,
  Icon,
  ToolBar,
} from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import { showToast } from '../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [Header.name]: Header,
    [List.name]: List,
    [Item.name]: Item,
    [Block.name]: Block,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [ToolBar.name]: ToolBar,
  },
  props: {
    // 头部标识文本
    titleText: {
      type: String,
      default() {
        return '- - -';
      },
    },
    // 进水温度
    inletTemp: {
      type: String,
      default() {
        return '- - -';
      },
    },
    // 提示图
    waterTepm: {
      type: Number,
      default() {
        return 35;
      },
    },
    // 电源开关
    powerOff: {
      type: Boolean,
      default() {
        return true;
      },
    },
    // 燃烧状态
    burning: {
      type: Number,
      default() {
        return 0;
      },
    },
    // 零冷水和增压
    modeAndBoost: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  data() {
    return {
      svgRadius: 0,
      lottieRadius: 0,
      circleVal: 35,
      turnOffText: this.$language('home.powerOff'),
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      devname: state => state.deviceInfo.name,
      functype: state => state.functype,
      mac: state => state.mac,

      /**
       * 重绘滚轮
       */
      reSetRoundSlider() {
        const tepm = this.waterTepm;
        const burn = this.burning;
        const modeBoost = this.modeAndBoost;
        if (modeBoost !== 0) {
          this.drawRoundSlider(50, '+168');
        } else if (burn === 1 && tepm > 50) {
          this.drawRoundSlider(tepm, `+${(tepm - 35) * 11.2}`);
        } else if (burn === 1 && tepm <= 50) {
          this.drawRoundSlider(50, '+168');
        } else {
          this.drawRoundSlider(60, '+280');
        }
        return false;
      },
    }),
    /**
     * 取整数温度，用于显示
     */
    setTempValue() {
      return parseInt(this.circleVal, 10);
    },
  },
  watch: {
    waterTepm(val) {
      this.circleVal = val;
    },
  },
  created() {
    this.circleVal = this.waterTepm;
    this.svgRadius = window.screen.width * 0.75;
    this.lottieRadius = this.svgRadius * 1.8;
  },
  mounted() {
    if (this.modeAndBoost !== 0) {
      this.drawRoundSlider(50, '+168');
    } else if (this.burning === 1 && this.waterTepm > 50) {
      this.drawRoundSlider(this.waterTepm, `+${(this.waterTepm - 35) * 11.2}`);
    } else if (this.burning === 1 && this.waterTepm <= 50) {
      this.drawRoundSlider(50, '+168');
    } else {
      this.drawRoundSlider(60, '+280');
    }
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT',
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL',
    }),
    /**
     * @description 绘制图形
     */
    drawRoundSlider(maxVal, endVal) {
      // init circular slider
      // eslint-disable-next-line no-undef
      this.circleObj = $('#slider').roundSlider({
        min: 35, // 最小值
        max: maxVal, // 最大值
        step: 0.1, // 步进
        value: this.circleVal, // 当前值
        radius: this.svgRadius / 2,
        width: 2,
        handleSize: `+${this.svgRadius / 8.8}`,
        keyboardAction: false,
        startAngle: -50, // 起始角度
        endAngle: endVal, // 最终角度
        sliderType: 'min-range',
        circleShape: 'full',
        handleShape: 'dot',
        beforeCreate: () => {
          console.log('beforeCreate');
        },
        create: e => {
          console.log('create: ', e);
        },
        start: () => {
          // eslint-disable-next-line no-undef
          $('span.rs-block').css('padding', '4px');
          console.log('start');
        },
        stop: e => {
          // eslint-disable-next-line no-undef
          $('span.rs-block').css('padding', '2px');
          console.log('stop');
          if (this.burning === 1 && this.waterTepm > 50 && e.value === maxVal) {
            console.log('热水器燃烧中，请稍后再试');
            showToast('热水器燃烧中，请稍后再试', 0);
          }
          this.changeTemp();
        },
        beforeValueChange: () => {
          // console.log('beforeValueChange');
          // if (this.modeAndBoost !== 0 && e.value > 50) {
          //   return 0;
          // } else if (
          //   this.burning === 1 &&
          //   this.waterTepm > 50 &&
          //   e.value > this.waterTepm
          // ) {
          //   console.log('热水器燃烧中，请稍后再试');
          //   return 0;
          // } else if (
          //   this.burning === 1 &&
          //   this.waterTepm <= 50 &&
          //   e.value > 50
          // ) {
          //   return 0;
          // }
          // return 1;
        },
        drag: e => {
          this.circleVal = e.value;
          // console.log('drag', e);
        },
        change: e => {
          console.log('change', e);
          this.circleVal = e.value;
          this.changeTemp();
        },
      });
    },
    /**
     * @description 设置温度
     */
    changeTemp() {
      console.log(`温度：${this.circleVal}`);
      this.$emit('changeTemp', parseInt(this.circleVal, 10)); // 向父组件抛出整数
    },
  },
};
</script>

<style lang="scss">
#SETTEMP {
  .page-set-temp {
    .page-main {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 82.42%;
      padding: 0.8rem 0;
      // background-color: rgb(98, 206, 248);
      #slider {
        .slider-circle {
          svg {
            filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.3));
          }
        }
        .rs-path-color {
          background-color: rgba(244, 231, 221, 0);
          border: rgb(246, 226, 226) 5px solid;
          border-bottom: 0px;
        }
        .rs-range-color {
          background-color: rgba(255, 255, 255, 0);
          border: rgb(255, 255, 255) 5px solid;
          border-bottom: 0px;
        }
        &:not(.rs-animation) {
          .rs-path-color {
            background-color: rgba(244, 231, 221, 0);
            border: rgb(246, 226, 226) 5px solid;
            border-bottom: 0px;
          }
          .rs-range-color {
            background-color: rgba(255, 255, 255, 0);
            border: rgb(255, 255, 255) 5px solid;
            border-bottom: 0px;
          }
        }
        .rs-handle {
          padding: 10px;
          border: none;
          padding: 4px;
          background-color: #fff;
          // box-shadow: 0px 5px 5px rgba(227, 233, 239, 0.95) inset, 0 -7px 6px 0 rgba(193, 209, 219, 0.76), 0 -7px 6px 0 rgba(193, 209, 219, 0.82);
          &::after {
            // border-color: #fff;
            // background-color: #fff;
            border: none;
            background-color: #f7dfcd;
          }
          .rs-move {
            background-color: transparent;
            border: 0 none;
            padding: 0;
          }
          .rs-handle-dot {
            background-color: transparent;
            &::after {
              border: none;
              background-color: transparent;
            }
          }
        }
        .rs-border {
          border: none;
          // opacity: 0;
          background-color: rgba(249, 249, 247, 0);
          // background: url(../assets/img/bg/bg.png) no-repeat;
          background-position: -170px -260px;
          background-size: 10rem 17.8rem;
        }
        &.rs-control .rs-container,
        .rs-handle.rs-focus {
          animation: crescendo 0.5s alternate 1 ease-in-out both;
        }
        &.rs-control.rs-animation .rs-container,
        .rs-handle.rs-move {
          animation: decrescendo 0.5s alternate 1 ease-in-out both;
        }
        .rs-tooltip-text {
          visibility: hidden;
        }
      }
      .layer {
        // margin-top: 0.5rem;
        position: absolute;
        left: 50%;
        top: 50%;
        border-radius: 50%;
        box-shadow: 0px 6px 50px #e5b599, 0px 0px 30px #e5b599 inset;
        overflow: hidden;
        transform: translate(-50%, -50%);
        // margin-top: 44px !important;
        background: url(../assets/img/ball_bg.png) center no-repeat;
        // background: url(../assets/img/dsada.png) center no-repeat;
        background-size: 160%;
        background-position: -180px -200px;
        background-color: #e6dad3;
        // background-position: center;
        pointer-events: none;
        .rotate {
          position: absolute;
          top: -7%;
          left: -7%;
          width: 114%;
          height: 114%;
          transform: translate(-50%, -50%);
          background-position: center;
          background-repeat: no-repeat;
          background-size: 100%;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
          &.-one {
            animation-name: clockwise;
            background-image: url(../assets/img/smoke-purifier-2.png);
            animation-duration: 12s;
          }
          &.-two {
            background-image: url(../assets/img/smoke-purifier-1.png);
            animation-name: anticlockwise;
            animation-duration: 12s;
          }
        }
        .play {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          // background-position: center;
          background-position: -75px -230px;
          background-repeat: no-repeat;
          background-size: 115% 143%;
          /* 热水器 */
          background-image: url(../assets/img/bubbles.png);
          // animation: play 1s steps(10, end) infinite;
        }
        &.powOff {
          background-size: 0;
          box-shadow: 0px 0px 0px #f3955e, 0px 0px 0px #f3955e inset;
        }
        .powOff-item {
          background-size: 0;
        }
      }
      article {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 4rem;
        height: 4rem;
        // margin-top: 35px !important;
        // width: 4rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .mode-text {
          width: 4rem;
          height: 0.6rem;
          font-family: 'appleUltralight';
          font-size: 56px;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .water-temp {
          font-family: 'appleUltralight';
          color: #fff;
          font-weight: 400;
          font-size: 232px;
          height: 180px;
          // width: 312px;
          line-height: 180px;
          #text {
            width: 2.32rem;
          }
          &::before {
            content: '°';
            position: absolute;
            font-family: 'appleUltralight';
            font-weight: 600;
            text-align: left;
            top: 59px;
            right: 76px;
            font-size: 51px;
          }
          &::after {
            content: 'C';
            position: absolute;
            font-family: 'appleUltralight';
            font-weight: 600;
            text-align: left;
            top: 67px;
            right: 34px;
            font-size: 62px;
          }
        }
        .inlet-text {
          width: 4rem;
          height: 0.5rem;
          color: #fff;
          font-family: 'appleUltralight';
          font-size: 46px;
          // margin-top: 0.2rem;
          padding-top: 16px;
          // font-weight: 600;
          display: flex;
          align-items: center;
          flex-direction: row;
          justify-content: center;
          .temp-num {
            font-weight: 600;
            margin: 0 0.03rem 0 0.1rem;
          }
          .temp-unit {
            font-weight: 600;
          }
        }
        .turn-off-text {
          font-family: 'appleUltralight';
          font-size: 99px;
          color: #fff;
        }
      }

      @keyframes crescendo {
        0% {
          transform: scale(1);
        }

        100% {
          transform: scale(1.05);
        }
      }

      @keyframes decrescendo {
        0% {
          transform: scale(1.05);
        }

        100% {
          transform: scale(1);
        }
      }

      @keyframes clockwise {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(359deg);
        }
      }

      @keyframes anticlockwise {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(-359deg);
        }
      }

      @keyframes play {
        0% {
          background-position-y: 0;
        }
        100% {
          background-position-y: 100%;
        }
      }
    }
  }
}
</style>
