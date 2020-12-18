<template>
  <div class="carousel-section">
    <div class="carousel-box carousel-temperature-box">
      <Carousel 
        ref="temperature-carousel" 
        :propData="propData_temperature" 
        :options="options_temperature"
        v-on:currentChange="tempCarouselChange"
      ></Carousel>
      <span class="unit">℃</span>
      <!-- <div class="text" @click="$router.push({name:'PopupPicker',params: {mode: 'tempSetting'}})" >当前温度 {{ TempR }} ℃</div> -->
      <div class="text" @click="$router.push({path:'/Home/popup-picker/TempS'})" >当前温度 {{ TempR }} ℃</div>
    </div>
    <div class="carousel-box carousel-humidity-box">
      <Carousel 
        ref="humidity-carousel" 
        :propData="propData_humidity" 
        :options="options_humidity"
        @currentChange="humdCarouselChange"
      ></Carousel>
      <span class="unit">%</span>
      <div class="text" @click="$router.push({name:'PopupPicker',params: {mode: 'HumdS'}})" >当前湿度 {{ HumdR }} %</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { plantsConfig } from '@/assets/js/plants-data.js';
import Carousel from "../../../components/Carousel.vue";

export default {
  name: "HomeMainContent",
  components: {
    Carousel
  },
  props: {
    currentTab: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      TempS: state => state.dataObject.TempS,
      TempR: state => state.dataObject.TempR,
      HumdS: state => state.dataObject.HumdS,
      HumdR: state => state.dataObject.HumdR,
    }),
    // 温度滑轮
    tempCarousel() {
      return this.$refs['temperature-carousel'];
    },
    // 湿度滑轮
    humdCarousel() {
      return this.$refs['humidity-carousel'];
    },
    // 温度滑轮数据
    propData_temperature() {
      const arr = [];
      for (let i = plantsConfig.temperatureRange[0]; i <= plantsConfig.temperatureRange[1]; i++) {
        arr.push(i);
      }
      return arr;
    },
    // 温度滑轮配置
    options_temperature() {
      return {
        isShow: true,
        controlAble: true,
        showNumOrImg: true,
        controlMode: 1,
        horizontal: true,
        threeOrAll: true,
        clickAble: false,
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '1.5rem',
        fontSize: '1.2rem',
        spaceBetween: '1.5rem',
        radiusMutiply: 2,
      };
    },
    // 湿度滑轮数据
    propData_humidity() {
      const arr = [];
      for (let i = 50; i <= 90; i++) {
        arr.push(i);
      }
      return arr;
    },
    // 湿度滑轮配置
    options_humidity() {
      return {
        isShow: true,
        controlAble: true,
        showNumOrImg: true,
        controlMode: 1,
        horizontal: true,
        threeOrAll: true,
        clickAble: false,
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '1.5rem',
        fontSize: '1.2rem',
        spaceBetween: '1.4rem',
        radiusMutiply: 2,
      };
    },
  },
  watch: {
    TempS(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.setTempCarousel(newVal);
      }
    },
    HumdS(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.setHumdCarousel(newVal);
      }
    },
  },
  created() {
  },
  mounted() {
    this.mountedInit();
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT',
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL',
    }),
    // mounted初始化
    mountedInit() {
      this.setTempCarousel(this.TempS);
      this.setHumdCarousel(this.HumdS);
    },
    // 设置温度滑轮值
    setTempCarousel(val) {
      if (!val && val !== 0) {
        return console.warn('setTempCarousel\'s val: ', val);
      }
      let tempIndex = val - plantsConfig.temperatureRange[0];
      // val超出极限值处理
      if (val < plantsConfig.temperatureRange[0]) {
        tempIndex = 0;
      }
      if (val > plantsConfig.temperatureRange[1]) {
        tempIndex = plantsConfig.temperatureRange[1] - plantsConfig.temperatureRange[0];
      }
      this.tempCarousel.setId(tempIndex);
      return tempIndex;
    },
    // 温度滑轮滑动改变
    tempCarouselChange(index) {
      // console.log(index);
      // console.log(this.tempCarousel.propData[index]);
      const TempS = this.tempCarousel.propData[index];
      if (TempS !== this.TempS) {
        this.setDataObject({
          TempS,
        });
        this.sendCtrl({
          TempS,
        });
      }
    },
    // 设置湿度滑轮值
    setHumdCarousel(val) {
      if (!val && val !== 0) {
        return console.warn('setHumdCarousel\'s val: ', val);
      }
      let HumdIndex = val - plantsConfig.humidityRange[0];
      // val超出极限值处理
      if (val < plantsConfig.humidityRange[0]) {
        HumdIndex = 0;
      }
      if (val > plantsConfig.humidityRange[1]) {
        HumdIndex = plantsConfig.humidityRange[1] - plantsConfig.humidityRange[0];
      }
      this.humdCarousel.setId(HumdIndex);
      return HumdIndex;
    },
    // 湿度滑轮滑动改变
    humdCarouselChange(index) {
      // console.log(index);
      // console.log(this.tempCarousel.propData[index]);
      const HumdS = this.humdCarousel.propData[index];
      if (HumdS !== this.HumdS) {
        this.setDataObject({
          HumdS,
        });
        this.sendCtrl({
          HumdS,
        });
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.carousel-section {
  // padding-top: 120px;
  .carousel-box {
    margin-top: 120px;
    position: relative;
    text-align: center;
    max-width: 100%;
    overflow-x: hidden;
    /deep/ .carousel-wrapper {
      font-family: 'FZLTH--GB1-4';
      font-family: 'inherit';
      font-weight: lighter;
      .container_mode {
        #itemsWrapper {
          .content-wrapper{
            >div {
              color: #404657;
            }
          }
        }
      }
    }
    .unit {
      font-size: 64px;
      position: absolute;
      top: 30px;
      left: 50%;
      margin-left: 100px;
      pointer-events: none;
    }
    .text {
      margin-top: 10px;
      font-size: 42px;
    }
  }
}
</style>
