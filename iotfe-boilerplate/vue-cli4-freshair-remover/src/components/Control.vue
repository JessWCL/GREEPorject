<template>
  <div class="center-slider">
    <div v-show="Pow" class="slider-main">
      <!-- :style="`opacity: ${work_temSetJson ? 1 : 0.01}`"  -->
      <div id="slider" />
      <div class="layer" :style="{ width: lottieRadius / 1.3 + 'px', height: lottieRadius / 1.3 + 'px' }">
        <div class="rotate -one"></div>
        <div class="rotate -two"></div>
      </div>
      <article>
        <!-- 显示模式/风档 -->
        <gree-block>
          <div class="left">
            <span> {{ FanModNames[FanMod - 1] }} </span>
          </div>
          <div class="bar" />
          <div class="right">
            <span v-text="RunModNames[RunMod - 1]" />
            <!-- 该位置 只作显示  不满足 热交换 如果选择内循环 则会显示 内循环-->
          </div>
        </gree-block>
        <h3 class="auto-span" v-text="WdSpdNames[WdSpd - 1]" />
      </article>
    </div>
    <div class="pow-off" v-show="!Pow" :style="{ width: svgRadius + 63.5 + 'px', height: svgRadius + 63.5 + 'px' }">
      <img src="@assets/img/off_bg.png" />
      <h3 v-text="'已关机'" />
    </div>
  </div>
</template>

<script>
import { Block } from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import { closePage, editDevice } from '../../../static/lib/PluginInterface.promise';
import $ from 'jquery';

// import config from '@/api/60a0/home'

export default {
  components: {
    [Block.name]: Block
  },
  data() {
    return {
      svgRadius: 0,
      lottieRadius: 0,
      circleVal: '强劲风',
      fanName: 'sss'
      // config,
      // bg_url: require('../static/img/bg.png'),
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      devname: state => state.deviceInfo.name,
      isScene: state => state.isScene,
      mac: state => state.mac,
      Pow: state => state.dataObject.Pow,
      WdSpd: state => state.dataObject.WdSpd, // 风速
      WdSpdNames: state => state.data.WdSpdMode.rNames,

      FanMod: state => state.dataObject.FanMod, // 设定模式
      FanModNames: state => state.data.MoveMode.rNames,

      RunMod: state => state.dataObject.RunMod,
      RunModNames: state => state.data.RunMod.rNames
    })
  },
  watch: {
    // 滑轮值监听
    WdSpd(newV) {
      $('#slider').roundSlider({ value: newV });
    }
  },
  created() {
    this.svgRadius = window.screen.width * 0.7;
    this.lottieRadius = this.svgRadius * 1.8;
  },
  mounted() {
    this.circleObj = $('#slider').roundSlider({
      min: 1,
      max: this.WdSpdNames.length,
      step: 1,
      value: this.WdSpd,
      radius: this.svgRadius / 2 + 20,
      width: 2,
      handleSize: '+46',
      keyboardAction: false,
      startAngle: -60,
      endAngle: '+300',
      sliderType: 'min-range',
      circleShape: 'full',
      handleShape: 'dot',
      start: () => {
        $('span.rs-block').css('padding', '4px');
      },
      stop: () => {
        $('span.rs-block').css('padding', '2px');
      },
      drag: e => {
        this.setDataObject({ WdSpd: e.value });
        console.log(e.value);
      },
      change: e => {
        this.sendCtrl({ WdSpd: e.value });
      }
    });
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT'
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL'
    }),

    // 节流函数
    throttle(value, key) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        $('#slider').roundSlider(this.sliderValueMap);
        this.sliderValueMap = {};
      }, 20);
    }
  }
};
</script>
