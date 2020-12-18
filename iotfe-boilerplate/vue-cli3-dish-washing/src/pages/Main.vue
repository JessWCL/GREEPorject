<template>
  <div class="top-container">
    <!-- header start -->
    <!--导航栏-->
    <GreeHeader />
    <!-- header end -->

    <!-- 状态栏 -->
    <TimeTips v-if="isAppointmentPage" />
    <GreeStatus v-if="isIndexPage" />

    <van-popup
      v-model="show"
      :style="{ width: '100%', height: '100%' }">
      <SafeAreaInsetTopComponent :top-color="barColor" />
      <purifier-appointment @closePopup="closePopup" />
    </van-popup>

    <div class="status-container">
      <div
        class="top-bg"
        :style="{
          backgroundColor: bgColor,
          backgroundImage: 'url(' + workStatusImgBG + ')'
        }"
      >
        <div class="work-status-container">
          <div class="carousel-wrapper-container">
            <Carousel
              ref="carousel"
              class="carousel-wrapper"
              @currentChange="handleChange"
              @currentItemChange="handleItemChange"
              :prop-data="carouselData"
              :prop-data-name="carouselDataName"
              :options="carouselOptions"
            />
          </div>
          <div class="work-status-name">
            <span>{{ touchedModeName || $t(workStatusName) }}</span>
          </div>
        </div>
        <ErrorTips />

      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { Popup } from 'mint-ui';
import TimeTips from '@/components/TimeTips';
import { BarColor } from '../api/constant';
import GreeHeader from './Header';
import Carousel from '../components/Carousel';
import PurifierAppointment from './PurifierAppointment';
import ErrorTips from './ErrorTips';
import GreeStatus from './GreeStatus';

export default {
  name: 'GreeMain',
  components: {
    Popup,
    GreeHeader,
    Carousel,
    PurifierAppointment,
    ErrorTips,
    GreeStatus,
    TimeTips,
  },
  data() {
    return {
      touchedModeName: null,
      show: false,
    };
  },
  computed: {
    ...mapState({
      functype: state => state.functype,
      DataObject: state => state.DataObject,
      modeBtnList: state => state.modeBtnList,
      isPurifierAppointment: state => state.isPurifierAppointment,
      workStatusName: state => state.workStatusName,
      workStatusImgSrc: state => state.workStatusImgSrc,
      workStatusImgBG: state => state.workStatusImgBG,
      carouselId: state => state.carouselId,
      isAppointment: state => state.isAppointment,
      barColor: state => state.barColor,

      carouselData() {
        const rModeList = [];
        const modeBtnList = this.modeBtnList;
        modeBtnList && modeBtnList.forEach(element => {
          const modeBtn = element;
          const isPush = modeBtn.show === true;
          if (isPush) {
            rModeList.push(modeBtn);
          }
        });
        return rModeList;
      },

      isAppointmentPage() {
        let ret = false;
        if (this.$route.path === '/appointment') {
          ret = true;
        }
        return ret;
      },

      isIndexPage() {
        let ret = false;
        if (this.$route.path === '/index') {
          ret = true;
        }
        return ret;
      },

      carouselDataName() {
        const rModeList = [];
        const modeBtnList = this.modeBtnList;
        modeBtnList && this.modeBtnList.forEach(element => {
          const modeBtn = element;
          rModeList.push(modeBtn.name);
        });
        return rModeList;
      },

      carouselOptions(state) {
        const { Wash, TmrOn } = state.DataObject;
        let controlAble = true;
        if (Wash || TmrOn) {
          controlAble = false;
        } else {
          controlAble = true;
        }
        return {
          controlAble, // 滑轮能不能滑动

          isShow: true, // 是否显示
          showNumOrImg: false, // 显示数字还是图片
          horizontal: true, // 水平显示or竖直显示
          controlMode: 1,
          threeOrAll: true, // 显示3个or全部显示
          width: '60%', // 组件宽度
          spaceBetween: '6rem', // 间距
          marginLeft: '0', // 组件左边距
          height: '3rem', // 图片大小
          containerHeight: '5rem', // 图片容器大小
          fontSize: '32px'
        };
      },

      bgColor() {
        let ret = BarColor.blue;
        const { Mod, Dry, Disinfect } = this.DataObject;
        const isDryMod = Dry === 1 && Disinfect === 0;
        const isDisinfectMod = Dry === 0 && Disinfect === 0;
        const isDryDisinfectMod = Dry === 1 && Disinfect === 1;
        if (Mod === 0) {
          if (isDryMod) {
            ret = BarColor.yellow;
          } else if (isDisinfectMod) {
            ret = BarColor.blue;
          } else if (isDryDisinfectMod) {
            ret = BarColor.yellow1;
          }
        } else if (Mod !== 0) {
          ret = BarColor.blue;
        }
        return ret;
      },

      /**
       * @function isCooking
       * @param  {object} state
       * @description 判断设备有没有启动，启动后滑轮禁止滑动
       */
      isCarouselLocking: function isCarouselLocking(state) {
        if (state.DataObject.Wash || state.DataObject.TmrOn) {
          this.carouselOptions.controlAble = false;
        } else {
          this.carouselOptions.controlAble = true;
        }
      }
    }),
  },

  watch: {
    carouselId(newV, oldV) {
      if (newV !== oldV) {
        this.$nextTick(() => {
          this.initMain();
        });
      }
    },
    isPurifierAppointment: {
      handler(newV) {
        this.show = newV;
      },
      immediate: true,
    }
  },

  mounted() {
    this.initMain();
  },
  methods: {
    ...mapActions(['changeModeFromCarouselId']),
    ...mapMutations(['setIsPurifierAppointment']),

    closePopup() {
      this.setIsPurifierAppointment({ value: false });
    },

    initMain() {
      const realIndex = this.carouselId;
      let carouselId = 0;
      const rModeList = [];
      const modeBtnList = this.modeBtnList;
      modeBtnList && modeBtnList.forEach((element, index) => {
        const modeBtn = element;
        const isPush = modeBtn.show === true;
        if (isPush) {
          rModeList.push(modeBtn);
          if (realIndex === index) {
            carouselId = rModeList.length - 1;
          }
        }
      });

      // next trick
      // eslint-disable-next-line no-console
      console.log('==== init carousel mode ====');
      this.$refs.carousel.setId(carouselId);
    },
    handleChange(carouselIndex) {
      // eslint-disable-next-line no-console
      console.log('==== carouselIndex ====', carouselIndex);

      const modeBtnList = this.modeBtnList;
      const rModeList = [];
      let realIndex = 0;
      modeBtnList && modeBtnList.forEach((element, index) => {
        const modeBtn = element;
        const isPush = modeBtn.show === true;
        if (isPush) {
          rModeList.push(modeBtn);
          if (rModeList.length - 1 === carouselIndex) {
            realIndex = index;
          }
        }
      });
      const modeBtn = modeBtnList[realIndex];

      this.changeModeFromCarouselId({ carouselIndex, modeBtn });
    },
    handleItemChange(name) {
      this.touchedModeName = name;
    }
  }
};
</script>

<style scoped>
.popup-fullscreen {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.top-container {
  overflow: hidden;
  position: relative;
  display: flex;
  flex-basis: 35%;
}
.status-container {
  display: flex;
  flex: 1;
}
/*头部视图（包括导航栏和头部视图）*/
.top-bg {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  background-size: cover;
  background-repeat: no-repeat;
}

.top-bg.water-full {
  background-position-y: 0px;
  animation: upAndDown30px 8s ease infinite;
}
@keyframes upAndDown30px {
  0% {
    background-position-y: 0px;
  }
  50% {
    background-position-y: 30px;
  }
  100% {
    background-position-y: 0px;
  }
}

.btnBack {
  position: absolute;
  width: 2.5rem;
  height: 2.5rem;
  text-align: center;
}
.btnBack:active {
  background: rgba(0, 0, 0, 0.1);
}

.btnBack img {
  height: 1.5rem;
  margin-top: 0.5rem;
}

#txtTitle {
  margin-top: 0.25rem;
  display: inline-block;
  font-size: 1.2rem;
  color: #ffffff;
}
.titleMore {
  position: absolute;
  top: 0;
  right: 0;
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1.5rem;
  color: #ffffff;
  text-align: center;
}
.titleMore:active {
  background: rgba(0, 0, 0, 0.1);
}

.work-status-container {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 20%;
}
.carousel-wrapper-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
}

/* 旋转10 */
.rotate10 {
  animation: rotate10 2s ease-in-out 2;
}
@keyframes rotate10 {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(-10deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

/* 从95%到105%放大 */
.breath95to105 {
  animation: breath95to105 2s ease-in-out 2;
}
@keyframes breath95to105 {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.05);
  }
  50% {
    transform: scale(0.95);
  }
  75% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.work-status-name {
  font-size: 1.5rem;
  text-align: center;
  color: #fff;
  margin-top: 0.5rem;
}
.footer-container {
  height: 3.3rem;
  line-height: 3.3rem;
  background-color: rgba(0, 0, 0, 0.1);
  /* background: linear-gradient(rgba(0, 0, 0, 0.1) 80%, #55a4cf); */
  color: #ffffff;
}
</style>
