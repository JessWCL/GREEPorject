<template>
  <div class="main">
    <div
      v-show="isWorking"
      class="custom-swiper-layer"
    ></div>
    <swiper
      ref="awesomeSwiper"
      class="custom-swiper"
      :style="{ 'z-index': isWorking ? -1 : 1 }"
      :options="swiperOption"
      @slide-change="onSlideChange"
    >
      <swiper-slide
        v-for="(item, index) in imgSrc"
        :key="index"
        :class="{'swiper-no-swiping': isWorking}"
      >
        <div class="circle">
          <span
            class="iconfont"
            :class="item.iconfont"
          ></span>
        </div>
        <p>{{ item.List1Label }}</p>
      </swiper-slide>
    </swiper>

    <!-- 故障提示 -->
    <common-notice-bar />

    <transition
      name="tab-fade"
      mode="out-in"
    >
      <appointmenting v-if="RunStat === RUN_STAT.Appointment"></appointmenting>
      <Working v-if="isWorking"></Working>
      <component
        :is="currentView"
        v-else
      ></component>
    </transition>
  </div>
</template>

<script>
/* eslint import/no-extraneous-dependencies: off */
import { mapState, mapMutations } from 'vuex';
import uniqBy from 'lodash/uniqBy';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import * as types from '@/store/types';
import IntelligentMenusV2 from '@/api/828d04/IntelligentMenusV2';
import Working from '@/components/common/Working';
import CommonNoticeBar from '@/components/828d04/CommonNoticeBar';
import {
  RUN_STAT,
  MODE_SMART_MENU,
  MODE_CLEAN,
  LIST1_SMART_MENU_CLOUD
} from '@/api/828d04/constant';
import { isGtChrome, isIPhone } from '@/utils';
import 'swiper/dist/css/swiper.css';
import CommonSmartMenu from './SmartMenu/CommonSmartMenu';
import CloudMenu from './SmartMenu/CloudMenu';
import Appointmenting from './SmartMenu/Appointmenting';

export default {
  components: {
    swiper,
    swiperSlide,
    CommonSmartMenu,
    CommonNoticeBar,
    CloudMenu,
    Working,
    Appointmenting, // 预约
    'tab-component-1': CommonSmartMenu, // 烘烤
    'tab-component-5': CloudMenu // 云菜单
  },
  data() {
    return {
      RUN_STAT,
      currentView: 'tab-component-1',
      swiperOption: {
        effect: 'coverflow',
        slidesPerView: 3,
        centeredSlides: true,
        loop: false,
        noSwiping: true,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: Math.floor(document.body.clientWidth / 6.5 / 10) * 10,
          modifier: 2,
          slideShadows: false
        }
      },
      currentSwiperIndex: 0
    };
  },
  computed: {
    ...mapState({
      reFresh: state => state.reFresh,
      cacheMod: state => state.dataObjectCache.Mod,
      cacheRunStat: state => state.dataObjectCache.RunStat,
      SmartMenuList1: state => state.dataObjectCache.SmartMenuList1,
      RunStat: state => state.dataObject.RunStat,
      Mod: state => state.dataObject.Mod,
      List1: state => state.dataObject.List1,
    }),
    swiper() {
      return this.$refs.awesomeSwiper.swiper;
    },
    imgSrc() {
      let ret = [];
      ret = uniqBy(IntelligentMenusV2, 'List1Label');
      return ret;
    },

    isWorking() {
      const { cacheMod, cacheRunStat, RunStat } = this;

      const isClean = cacheMod === MODE_CLEAN;
      // 清洁模式是否工作
      const isCleanWorking = cacheRunStat === RUN_STAT.Appointment || cacheRunStat === RUN_STAT.Working;
      // 正常模式是否工作
      const isWorking = RunStat === RUN_STAT.Appointment || RunStat === RUN_STAT.Working;

      let ret = false;
      if (isCleanWorking && isClean) {
        this.$nextTick(() => {
          this.$refs.awesomeSwiper.$el.classList.remove('custom-no-swiping');
        });
      } else if (isWorking) {
        ret = true;
        this.$nextTick(() => {
          this.$refs.awesomeSwiper.$el.classList.add('custom-no-swiping');
        });
      } else {
        this.$nextTick(() => {
          this.$refs.awesomeSwiper.$el.classList.remove('custom-no-swiping');
        });
      }
      return ret;
    }
  },
  watch: {
    Mod(newVal) {
      const Mod = newVal;
      const { realIndex } = this.swiper;
      const List1 = realIndex;
      const isSmartmenu = Mod === MODE_SMART_MENU;
      if (isSmartmenu) {
        this.setList1(List1);
        this.setDataObjectCache({ SmartMenuList1: List1 });
      }
    },

    List1(newVal) {
      const List1 = newVal;
      const { Mod, RunStat } = this;
      const isSmartmenu = Mod === MODE_SMART_MENU;
      const isWorking = RunStat === RUN_STAT.Appointment || RunStat === RUN_STAT.Working;
      if (isWorking && isSmartmenu) {
        // 先设置可滑动
        this.swiper.allowSlideNext = true;
        this.swiper.allowSlidePrev = true;
        // swiper翻到对应的模式List1
        this.swiper.slideToLoop(List1);
        // 后设置不可滑动
        this.swiper.allowSlideNext = false;
        this.swiper.allowSlidePrev = false;
      } else if (isSmartmenu) {
        // swiper翻到对应的模式List1
        this.swiper.slideToLoop(List1);
      }

      // iOS：H5页面在IOS input输入后会把页面顶起 留白
      if (isGtChrome(44) || isIPhone()) {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    },

    RunStat(newVal) {
      const RunStat = newVal;
      const { Mod } = this;
      const isWorking = RunStat === RUN_STAT.Appointment || RunStat === RUN_STAT.Working;
      if (isWorking) {
        this.currentView = 'Working';
      } else {
        const { realIndex } = this.swiper;
        const currentSwiperIndex = realIndex;
        this.currentSwiperIndex = realIndex;
        if (currentSwiperIndex === LIST1_SMART_MENU_CLOUD) {
          this.currentView = 'tab-component-5';
        } else {
          this.currentView = 'tab-component-1';
        }
      }

      // 判断Swiper是否能滑动
      this.handleSwiperAllowStatus();
    },

    currentSwiperIndex(newV) {
      if (newV === LIST1_SMART_MENU_CLOUD) {
        this.currentView = 'tab-component-5';
      } else {
        this.currentView = 'tab-component-1';
      }
    },

    reFresh() {
      const { SmartMenuList1 } = this;
      this.swiper.slideToLoop(SmartMenuList1);
    },
  },

  mounted() {
    // window.onresize监听页面高度的变化
    let docmHeight = document.documentElement.clientHeight; // 默认屏幕高度
    let onresizeDocmHeight = document.documentElement.clientHeight; // 实时屏幕高度
    console.log('mounted:', { docmHeight, onresizeDocmHeight });
    // 修复手机屏幕高度为0的问题
    const timer = setInterval(() => {
      docmHeight = document.documentElement.clientHeight;
      onresizeDocmHeight = document.documentElement.clientHeight;
      console.log('setInterval:', { docmHeight, onresizeDocmHeight });
      if (docmHeight !== 0) {
        console.log('clearInterval:', { docmHeight, onresizeDocmHeight });
        clearInterval(timer);
      }
    }, 100);
    window.addEventListener('resize', () => {
      this.setReFresh(this.reFresh + 1);
      onresizeDocmHeight = document.body.clientHeight;
      console.log('onresize:', { docmHeight, onresizeDocmHeight });
      const isShrink = docmHeight > onresizeDocmHeight;
      if (isShrink) {
        this.setIsShrinkOnResize(true);
      } else {
        this.setIsShrinkOnResize(false);
      }
    });

    // 判断Swiper是否能滑动
    this.handleSwiperAllowStatus();
  },
  methods: {
    ...mapMutations({
      setReFresh: types.RE_FRESH,
      setDataObjectCache: types.SET_DATA_OBJECT_CACHE,
      setMod: types.SET_MOD,
      setList1: types.SET_LIST1,
      setIsShrinkOnResize: types.SET_IS_SHRINK_ONRESIZE
    }),

    // 判断Swiper是否能滑动
    handleSwiperAllowStatus() {
      const { RunStat, List1 } = this;
      const isWorking = RunStat === RUN_STAT.Appointment || RunStat === RUN_STAT.Working;
      if (isWorking) {
        this.swiper.slideToLoop(List1);
        // #iOS问题 工作时不可滑动
        this.swiper.allowSlideNext = false;
        this.swiper.allowSlidePrev = false;
      } else {
        const { SmartMenuList1 } = this;
        this.swiper.slideToLoop(SmartMenuList1);
        // #iOS问题 工作时可以滑动
        this.swiper.allowSlideNext = true;
        this.swiper.allowSlidePrev = true;
      }
    },

    onSlideChange() {
      const { Mod } = this;
      const isSmartMenu = Mod === MODE_SMART_MENU;

      if (isSmartMenu) {
        const { realIndex } = this.swiper;
        this.currentSwiperIndex = realIndex;
        // this.currentView = `tab-component-${(this.currentSwiperIndex % 5) + 1}`;
        const mode = this.imgSrc[realIndex];
        const List1 = mode.List1Value;
        this.setList1(List1);
        this.setDataObjectCache({ SmartMenuList1: List1 });
        console.log({ List1 });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  .custom-swiper-layer {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 428px;
    pointer-events: none;
    user-select: none;
    background-image: url(data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==);
    z-index: 1985;
  }
  .custom-swiper {
    background-image: url(../../assets/img/smartMenu/bg.jpg);
  }
  .tab-fade-enter-active,
  .tab-fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .tab-fade-enter,
  .tab-fade-leave-to {
    opacity: 0;
  }
}
</style>
