<template>
  <gree-view :bg-color="bgColor">
    <gree-page
      no-navbar
      class="page-timer"
    >
      <gree-header
        :left-options="{preventGoBack: true}"
        @on-click-back="goBack"
        :title="title"
      >
        <span slot="right" @click.stop="saveTimer">{{ '保存' }}</span>
      </gree-header>
      <div class="container" @touchcancel="reset">
        <swiper :options="swiperOption" ref="mySwiper" >
          <swiper-slide
            v-for="(item, index) in hourList"
            :key="index"
          >
            {{ item }}
          </swiper-slide>
        </swiper>
        <span class="label-unit" >{{ '小时' }}</span>
      </div>
      <div class="type-bar">
        <span >{{ '定时类型' }}</span>
        <span style="opacity: 0.8;">{{ this.Pow?'关':'开' }}</span>
      </div>
      <div class="btn-delete" @click="deleteTimer">{{ '删除' }}</div>
    </gree-page>
  </gree-view>
</template>
<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { mapState, mapMutations, mapActions } from 'vuex';
import { showToast, changeBarColor } from '../../../../static/lib/PluginInterface.promise';
import { Header } from 'gree-ui';

function dealWithTmrHour(hour, min) {
  let result = 0;
  const totalMin = hour * 60 + min;
  if (totalMin <= 1 * 60) {
    result = 1;
  } else if ((totalMin > 1 * 60) && (totalMin <= 2 * 60)) {
    result = 2;
  } else if ((totalMin > 2 * 60) && (totalMin <= 3 * 60)) {
    result = 3;
  } else if ((totalMin > 3 * 60) && (totalMin <= 4 * 60)) {
    result = 4;
  } else if ((totalMin > 4 * 60) && (totalMin <= 5 * 60)) {
    result = 5;
  } else if ((totalMin > 5 * 60) && (totalMin <= 6 * 60)) {
    result = 6;
  } else if ((totalMin > 6 * 60) && (totalMin <= 7 * 60)) {
    result = 7;
  } else if ((totalMin > 7 * 60) && (totalMin <= 8 * 60)) {
    result = 8;
  } else if ((totalMin > 8 * 60) && (totalMin <= 9 * 60)) {
    result = 9;
  } else if ((totalMin > 9 * 60) && (totalMin <= 10 * 60)) {
    result = 10;
  } else if ((totalMin > 10 * 60) && (totalMin <= 11 * 60)) {
    result = 11;
  } else if ((totalMin > 11 * 60) && (totalMin <= 12 * 60)) {
    result = 12;
  }
  return result;
}

const TmrHourList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default {
  components: {
    swiper,
    swiperSlide,
    [Header.name]: Header
  },
  data() {
    return {
      bgColor: '#f4f4f4',
      hourList: TmrHourList,
      swiperOption: {
        direction: 'vertical',
        slidesPerView: 3,
        centeredSlides: true,
        freeMode: true,
        freeModeSticky: true,
        freeModeMinimumVelocity: 0.25,
        initialSlide: TmrHourList.indexOf(dealWithTmrHour(Number(this.$store.state.dataObject.TmrHour), Number(this.$store.state.dataObject.TmrMin)))
      },
      selectedHour: dealWithTmrHour(Number(this.$store.state.dataObject.TmrHour), Number(this.$store.state.dataObject.TmrMin)),
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    ...mapState({
      Pow: state => state.dataObject.Pow,
      TmrOn: state => state.dataObject.TmrOn
    }),
    title() {
      return '编辑定时';
    }
  },
  watch: {
    Pow(val) {
      if (!val) {
        this.goBack();
      }
    }
  },
  mounted() {
    changeBarColor('#f4f4f4');
    this.swiper.on('slideChange', () => {
      console.log('index', this.swiper.activeIndex);
      this.selectedHour = TmrHourList[Number(this.swiper.activeIndex)];
      console.log('selected TmrHour', this.selectedHour);
    });
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT'
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL'
    }),
    reset() {
      // console.log('reset');
      this.swiper.update(true);
      this.swiper.slideTo(this.swiper.realIndex,0,true);
    },
    goBack() {
      this.$router.replace('/Home');
    },
    saveTimer() {
      console.log('save timer');
      let cmd = { TmrHour: this.selectedHour, TmrMin: 0, TmrAction: 1, TmrOn: 1 };
      if (this.Pow === 1) { cmd = { TmrHour: this.selectedHour, TmrMin: 0, TmrAction: 0, TmrOn: 1 }; }
      this.setDataObject(cmd);this.sendCtrl(cmd);this.goBack();
      //this.sendTimerSetting(cmd);
    },
    deleteTimer() {
      console.log('delete timer');
      const cmd = { TmrHour: 0, TmrMin: 0, TmrAction: 0, TmrOn: 0 };
      this.setDataObject(cmd);this.sendCtrl(cmd);this.goBack();
      //this.sendTimerSetting(cmd);
    },
    // async sendTimerSetting(cmd) {
    //   const self = this;
    //   try {
    //     cmd.callback = function (res) {
    //       let tips = '保存成功';
    //       if (res) {
    //         if (res.r && res.r === 200) {
    //           tips = '保存成功';
    //           setTimeout(() => {
    //             self.goBack();
    //           }, 2000);
    //         } else {
    //           tips = '保存失败，请稍后重试。';
    //         }
    //       } else {
    //         tips = '保存失败，请稍后重试。';
    //       }
    //       showToast(tips, 1500);
    //     };
    //     await this.sendCtrl(cmd);
    //   } catch (error) {
    //     showToast('保存失败，请稍后重试。', 1500);
    //   }
    // }
  }
};
</script>
<style lang="scss" scoped>
  .page-timer{
    position: relative;
    font-family: 'appleLight';
    // padding-top: calc(0px + env(safe-area-inset-top));
    width: 100vw;
    overflow: hidden;
    background-color: #f4f4f4;
    .title-bar {
      background: #f4f4f4;
      height: 1.1574rem;
      line-height: 1.1574rem;
      text-align: center;
      display: flex;
      justify-content: space-between;
      .back-btn{
        margin-top: 0.334rem;
        margin-left: 0.5rem;
        height: 0.5926rem;
      }
      .title{
        font-size: 51px;
        color: #404657;
        font-weight: bold;
      }
      .btn-save{
        margin-right: 0.5rem;
        font-size: 42px;
      }
    }
    .type-bar{
      background-color: #ffffff;
      height: 122px;
      line-height: 122px;
      margin-top: 104px;
      display: flex;
      justify-content: space-between;
      font-size: 42px;
      padding: 0 57px;
      color: #404657;
      border-top: 1px solid #eeeeee;
      border-bottom: 1px solid #eeeeee;
    }
    .btn-delete{
      height: 156px;
      line-height: 156px;
      background-color: #ffffff;
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;
      font-size: 51px;
      color: #ff0202;
      border-top: 1px solid #eeeeee;
    }
    .mask{
      z-index: 99;
      background: rgba(255, 255, 255, 0.75);
      position: absolute;
      width: 100vw;
      height: 100vh;
      top: 0;
      left: 0;
      .loading{
        display: block;
        width: 280px;
        height: 280px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .container{
      margin-top: 1.0463rem;
      position: relative;
      &::before{
        position: absolute;
        content: '';
        z-index: 3;
        top: 0;
        left: 0;
        width: 100%;
        height: 374px;
        background: rgba(255, 255, 255, 0.65);
        border-bottom: 1px solid #eeeeee;
        border-top: 1px solid #eeeeee;
        pointer-events: none;
      }
      &::after{
        position: absolute;
        content: '';
        z-index: 3;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 374px;
        background: rgba(255, 255, 255, 0.65);
        border-bottom: 1px solid #eeeeee;
        border-top: 1px solid #eeeeee;
        pointer-events: none;
      }
      .label-unit{
        position: absolute;
        color: #095ab5;
        font-size: 90px;
        z-index: 5;
        left: 50%;
        top: 50%;
        transform: translate(100%, -27%);
      }
    }
    .swiper-container{
      height: 1091px;
      background-color: #ffffff;
    }
    .swiper-slide{
      height: 374px;
      line-height: 374px;
      text-align: center;
      font-family: 'appleUltralight';
      font-size: 209px;
    }
    .swiper-slide-active{
      height: 343px;
      line-height: 343px;
      color: #095ab5;
      transition: all 0.4s linear;
    }
   
  }
</style>
