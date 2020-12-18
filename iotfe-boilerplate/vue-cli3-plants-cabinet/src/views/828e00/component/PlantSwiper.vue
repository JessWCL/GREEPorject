<template>
  <div class="plant-swiper">
    <swiper :options="swiperOption" ref="mySwiper" @slideChange="slideChange" @touchStart="touchStart" @touchMove="touchMove" @touchEnd="touchEnd" >
      <!-- slides -->
      <swiper-slide v-for="(el, i) in imgAssets.plants" :key="i" >
        <div class="plant-container">
          <div class="img-box">
            <img :src="el" alt="">
          </div>
          <div class="text">
            {{ plantsGroup[i].name }}
          </div>
        </div>
      </swiper-slide>
      <!-- Optional controls -->
      <!-- <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <div class="swiper-scrollbar" slot="scrollbar"></div> -->
    </swiper>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { plantsList } from '../../../assets/js/plants-data.js'; // 植物默认配置表

export default {
  name: 'PlantSwiper',
  props: {
    /* currentTab: {
      type: Number,
      default: 0,
    }, */
  },
  data() {
    return {
      // imgAssets,
      touching: false,
    };
  },
  computed: {
    ...mapState({
      mac: state => state.mac,
      devname: state => state.deviceInfo.name,
      dataObject: state => state.dataObject,
      PltType: state => state.dataObject.PltType,
    }),
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    swiperOption() {
      let initialSlide = 0;
      const PltType = this.PltType;
      const index = this.plantsGroup.findIndex(el => el.PltType === PltType);
      if (index > -1) initialSlide = index;
      return {
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // loop: true,
        slidesPerView: 1,
        initialSlide,
      };
    },
    currentTab() {
      const PltType = this.PltType;
      let currentTab = 0;
      plantsList.forEach((el, i) => {
        el.children.forEach(item => {
          if (item.PltType === PltType) {
            currentTab = i;
          }
        });
      });
      return currentTab;
    },
    plantsGroup() { // 当前的植物类
      const tabIndex = this.currentTab;
      return plantsList[tabIndex].children; 
    },
    imgAssets() {
      const arr = [];
      const tabIndex = this.currentTab;
      plantsList[tabIndex].children.forEach(el => {
        arr.push(require('@/assets/img/plants-' + el.PltType + '.png'));
      });
      return {
        plants: arr,
      };
    },
  },
  watch: {
    currentTab(newVal) {
      console.log('currentTab: ', newVal);  
    },
    PltType(newVal, oldVal) {
      // 根据PltType变化设置slide
      console.log('PltType: ', newVal);
      if (newVal !== oldVal) {
        let lastNext = false; // 是否是最后一个滑到第一个
        oldVal - newVal === this.plantsGroup.length - 1 ? lastNext = true : lastNext = false;
        let firstPrev = false; // 是否是第一个滑到最后一个
        newVal - oldVal === this.plantsGroup.length - 1 ? firstPrev = true : firstPrev = false;
        this.slideChangeByPltType(newVal, lastNext, firstPrev);
      }
    }
  },
  created() {
    // console.log(this.plantsGroup);
    // console.log(this.PltType);
  },
  mounted() {
    // console.log(this.swiper);
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT',
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL',
    }),
    slideChange() {
      // console.log(this.swiper);
      console.log('slideChange: ', this.swiper.realIndex);
      // console.log('this.plantsGroup: ', this.plantsGroup);
      const target = this.plantsGroup[this.swiper.realIndex].PltType;
      console.log('target: ', target);
      /* if (target != this.PltType) { // 当PltType值和当前不一样时才发送指令
        console.log('slideChange >set >PltType: ', target);
        this.setDataObject({PltType: target});
        this.sendCtrl({PltType: target});
      } */
    },
    // 根据传入的PltType值改变slide
    slideChangeByPltType(PltType, lastNext, firstPrev) {
      const index = this.plantsGroup.findIndex(el => el.PltType === PltType);
      if (index > -1) {
        // console.log(lastNext);
        // lastNext 为true 时，是最后一个slide滑到第一个，用slideNext()才会有正确动画效果
        // firstPrev 为true 时，是第一个slide滑到最后一个，用slidePrev()才会有正确动画效果
        /* if (lastNext) {
          this.swiper.slideNext();
          console.log('slideNext');
        } else if (firstPrev) {
          this.swiper.slidePrev();
          console.log('slidePrev');
        } else {
          this.swiper.slideToLoop(index);
          console.log('slideToLoop: ', index);
        } */
        this.swiper.slideToLoop(index);
        console.log('slideToLoop: ', index);
      }
    },
    touchStart(event) {
      this.touching = true;
    },
    touchMove() {
      this.touching = true;
    },
    touchEnd(event) {
      this.touching = false;
    },
  }
};
</script>

<style lang="scss">
.plant-swiper {
  height: 100%;
}
.swiper-container{
  height: 100%;
  .swiper-slide{
    // opacity: 0;
    transition: opacity .5s;
    &.opc1 {
      opacity: 1;
    }
    &.swiper-slide-active{
      opacity: 1;
    }
    &.swiper-slide-duplicate {
      opacity: 1;
    }
  }
  .plant-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    .img-box {
      width: 250px;
      >img {
        width: 100%;
        height: auto;
      }
    }
    .text {
      color: #fff;
      font-size: 45px;
    }
  }
}
</style>
