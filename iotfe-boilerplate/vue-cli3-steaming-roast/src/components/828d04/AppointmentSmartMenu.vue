<template>
  <div class="main">
    <div
      v-show="isWorking"
      class="custom-swiper-layer"
    ></div>
    <swiper
      v-show="!selectedList3Item && !isShrinkOnresize"
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

    <transition
      name="tab-fade"
      mode="out-in"
    >
      <component :is="currentView"></component>
    </transition>
  </div>
</template>

<script>
/* eslint import/no-extraneous-dependencies: off */
import { mapState, mapMutations } from 'vuex';
import uniqBy from 'lodash/uniqBy';
import filter from 'lodash/filter';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import * as types from '@/store/types';
import IntelligentMenusV2 from '@/api/828d04/IntelligentMenusV2';
import Working from '@/components/common/Working';
import { RUN_STAT, LIST1_SMART_MENU_CLOUD } from '@/api/828d04/constant';
import 'swiper/dist/css/swiper.css';
import AppointmentCommonSmartMenu from './Appointment/AppointmentCommonSmartMenu';
import CloudMenu from './SmartMenu/CloudMenu';

export default {
  components: {
    swiper,
    swiperSlide,
    AppointmentCommonSmartMenu,
    CloudMenu,
    Working,
    'tab-component-1': AppointmentCommonSmartMenu, // 烘烤
    'tab-component-5': CloudMenu, // 云菜单
  },
  data() {
    return {
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
      currentSwiperIndex: 0,
    };
  },
  computed: {
    ...mapState({
      reFresh: state => state.reFresh,
      isAppointmentDetail: state => state.isAppointmentDetail,
      selectedList3Item: state => state.selectedList3Item,
      Mod: state => state.dataObject.Mod,
      RunStat: state => state.dataObject.RunStat,
      List1: state => state.dataObject.List1,
      List2: state => state.dataObject.List2,
      SmartMenuList1: state => state.dataObjectCache.SmartMenuList1,
      isShrinkOnresize: state => state.isShrinkOnresize,
    }),
    swiper() {
      return this.$refs.awesomeSwiper.swiper;
    },
    imgSrc() {
      let ret = [];
      ret = uniqBy(IntelligentMenusV2, 'List1Label');
      // TODO: 优化云菜单
      ret = filter(ret, ele => {
        return ele.List1Label !== '云菜单';
      });
      return ret;
    },
    isWorking() {
      let ret = false;
      if (this.RunStat === RUN_STAT.Appointment || this.RunStat === RUN_STAT.Working) {
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
    reFresh() {
      const { SmartMenuList1 } = this;
      this.swiper.slideToLoop(SmartMenuList1);
    },
  },

  mounted() {
    this.swiper.slideToLoop(this.List1);
  },

  methods: {
    ...mapMutations({
      setDataObjectCache: types.SET_DATA_OBJECT_CACHE,
      setMod: types.SET_MOD,
      setList1: types.SET_LIST1,
      setIsShrinkOnResize: types.SET_IS_SHRINK_ONRESIZE,
    }),

    onSlideChange() {
      if (this.RunStat === RUN_STAT.Appointment || this.RunStat === RUN_STAT.Working) return;

      let {realIndex} = this.swiper;
      this.currentSwiperIndex = realIndex;

      if (realIndex < 0) {
        realIndex = 0;
      } else if (realIndex > this.imgSrc.length - 1) {
        realIndex = 0;
      }

      const mode = this.imgSrc[realIndex];
      const List1 = mode.List1Value;
      this.setList1(List1);
      this.setDataObjectCache({ SmartMenuList1: List1 });
      console.log({ List1 });
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
    height: 555px;
    min-height: 555px;
    pointer-events: none;
    user-select: none;
    background-image: url(data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==);
    z-index: 1985;
  }
  .custom-swiper {
    background-image: url(../../assets/img/smartMenu/appointment_bg.jpg);
    height: 555px;
    min-height: 555px;
  }
  .is-shrink-onresize {
    display: none;
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
