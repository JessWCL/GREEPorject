<template>
  <div class="air-page page-section" id="">
    <div class="air-quality">
      <h4>空气质量</h4>
      <div class="air-quality-level">
        <span class="border-circle">
          优
        </span>
      </div>
    </div>
    <div class="air-data">
      <dl>
        <dt><span>{{ temperature_grade }}</span></dt>
        <dd>温度: <span>{{ air.temperature }}℃</span></dd>
      </dl>
      <dl>
        <dt><span>{{ humidity_grade }}</span></dt>
        <dd>湿度: <span>{{ air.humidity }}%</span></dd>
      </dl>
      <dl>
        <dt><span>{{ pm2p5_grade }}</span></dt>
        <dd>PM2.5: <span>{{ air.pm2p5 === 0 ? '--' : air.pm2p5 }}ug/m³</span></dd>
      </dl>
      <dl>
        <dt><span>{{ CO2_grade }}</span></dt>
        <dd>二氧化碳: <span>{{ air.CO2 }}ppm</span></dd>
      </dl>
      <dl>
        <dt><span>{{ formaldehyde_grade }}</span></dt>
        <dd>甲醛: <span>{{ air.formaldehyde }}ug/m³</span></dd>
      </dl>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState({
      air: state => state.dataObject.air,
    }),
    temperature_grade() {
      const val = this.air.temperature;
      let result = '';
      if (val >= 38) {
        result = '酷热';
      } else if (val >= 35) {
        result = '炎热';
      } else if (val >= 28) {
        result = '闷热';
      } else if (val >= 20) {
        result = '舒适';
      } else if (val >= 10) {
        result = '凉爽';
      } else if (val >= -9) {
        result = '寒冷';
      } else if (val < -9) {
        result = '严寒';
      }
      return result;
    },
    humidity_grade() {
      const val = this.air.humidity;
      let result = '';
      if (val >= 60) {
        result = '潮湿';
      } else if (val >= 40) {
        result = '舒适';
      } else if (val < 40) {
        result = '干燥';
      }
      return result;
    },
    pm2p5_grade() {
      const val = this.air.pm2p5;
      let result = '';
      if (val >= 250) {
        result = '严重';
      } else if (val >= 150) {
        result = '重度';
      } else if (val >= 115) {
        result = '中度';
      } else if (val >= 75) {
        result = '轻度';
      } else if (val >= 35) {
        result = '良';
      } else if (val < 35) {
        result = '优';
      }
      return result;
    },
    CO2_grade() {
      const val = this.air.CO2;
      let result = '';
      if (val >= 1000) {
        result = '浑浊';
      } else if (val > 450) {
        result = '正常';
      } else if (val <= 450) {
        result = '清新';
      }
      return result;
    },
    formaldehyde_grade() {
      const val = this.air.formaldehyde;
      let result = '';
      if (val >= 80) {
        result = '超标';
      } else if (val < 80) {
        result = '合格';
      }
      return result;
    },
  },
  watch: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
$skyblue: #32C5FF;
$grassgreen: #6DD400;
$greenCyan: linear-gradient(to bottom, #0EF69D, #05D5EF);

/* 渐变圆环边框::before */
@mixin border-circle-before(
  $width: 100%,
  $height: 100%,
  $url: '../assets/img/border-circle.svg',
  $bg: linear-gradient(to bottom, #0EF69D, #05D5EF),
  ) {
  content: "";
  display: block;
  position: absolute;
  width: $width;
  height: $height;
  background: $bg;
  mask: url($url) no-repeat center center;
  mask-size: 100% 100%;
}
/* 渐变圆环边框 */
.border-circle {
  position:relative;
  box-sizing: border-box;
}


h4 {
  font-size: 34px;
  font-weight: normal;
  margin: 0;
  line-height: 54px;
}

.air-page {
  color: #fff;;
  .air-quality {
    margin-bottom: 120px;
    h4 {
      font-size: 42px;
      color: #fff;
      text-align: center;
      margin-top: 80px;
      margin-bottom: 40px;
    }
    .air-quality-level {
      text-align: center;
      font-size: 100px;
      color: #fff;
      display: flex;
      justify-content: center;
      position: relative;
      span {
        width: 260px;
        height: 260px;
        display: block;
        line-height: 260px;
        position: relative;
        background-color: transparent;
        &::before {
          @include border-circle-before(
            $width: 260px,
            $height: 260px,
            $url: '../assets/img/border-circle.svg',
            $bg: $greenCyan,
          );
        }
      }
    }
  }
  .air-data {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    dl {
      text-align: center;
      width: 20%;
      dt {
        margin-bottom: 30px;
        span {
          text-align: center;
          width: 150px;
          height: 150px;
          margin: 0 auto;
          font-size: 36px;
          display: block;
          line-height: 150px;
          border: 4px solid #fff;
          border-radius: 127px;
          // background-color: rgba(255,255,255,.2);
        }
      }
      dd {
        font-size: 36px;
        span {
          color: $skyblue;
        }
      }
    }
  }
}
</style>
