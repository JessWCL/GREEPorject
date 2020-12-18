<template>
  <div class="carousel-section">
    <div class="carousel-box carousel-Plants-box">
      <Carousel 
        ref="Plants-Carousel" 
        :propData="propData_Plants" 
        :options="options_Plants"
        v-on:currentChange="plantsCarouselChange"
      ></Carousel>
    </div>
    <span class="text">
      {{ plantsName }}
    </span>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { plantsConfig } from '@/assets/js/plants-data.js';
import Carousel from "../../../components/Carousel.vue";
import { plantsList } from '../../../assets/js/plants-data.js'; // 植物默认配置表

export default {
  name: "plantsCarousel",
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
      PltType: state => state.dataObject.PltType,
    }),
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
    plantsGroup() { // 当前的植物类
      const tabIndex = this.currentTab;
      return plantsList[tabIndex].children; 
    },
    plantsName() { // 当前的植物名
      const PltType = this.PltType;
      const plant = this.plantsGroup.find(el => {
        return el.PltType === PltType;
      });
      return plant.name;
    },
    // 植物滑轮
    plantsCarousel() {
      return this.$refs['Plants-Carousel'];
    },
    // 植物滑轮数据
    propData_Plants() {
      const plantsImg = this.imgAssets.plants;
      return plantsImg;
    },
    // 植物滑轮配置
    options_Plants() {
      return {
        isShow: true,
        controlAble: true,
        showNumOrImg: false,
        controlMode: 1,
        horizontal: true,
        threeOrAll: true,
        clickAble: false,
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: 'auto',
        fontSize: '.4rem',
        spaceBetween: '2rem',
        radiusMutiply: 3,
      };
    },
  },
  watch: {
    PltType(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.setPlantsCarousel(newVal);
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
      // console.log(11111111111);
      // console.log(this.plantsCarousel);
      this.setPlantsCarousel(this.PltType);
    },
    // 设置温度滑轮值
    /**
     * @param: PlyType
     */
    setPlantsCarousel(val) {
      if (!val && val !== 0) {
        return console.warn('setPlantsCarousel\'s val: ', val);
      }
      const plantsGroup = this.plantsGroup;
      const index = plantsGroup.findIndex(el => {
        return el.PltType === val;
      });
      // console.log('this.plantsCarousel.setId: ', index);
      this.plantsCarousel.setId(index);
      return index;
    },
    // 温度滑轮滑动改变
    plantsCarouselChange(index) {
      // console.log(index);
      // console.log(this.plantsCarousel.propData[index]);
      const PltType = this.plantsGroup[index].PltType;
      if (PltType !== this.PltType) { // 当PltType值和当前不一样时才发送指令
        console.log('PlantsCarouselChange >set >PltType: ', PltType);
        this.setDataObject({PltType});
        this.sendCtrl({PltType});
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.carousel-section {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  .carousel-box {
    position: relative;
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
    text-align: center;
    padding-bottom: 150px;
    /deep/ .carousel-wrapper {
      font-family: 'FZLTH--GB1-4';
      font-family: 'inherit';
      font-weight: lighter;
      .container_mode {
        #itemsWrapper {
          .content-wrapper{
            >img {
              width: 250px;
              height: 250px;
            }
            >div {
              color: #fff;
            }
          }
        }
      }
    }
  }
  .text {
      color: #fff;
      position: absolute;
      bottom: 40px;
      font-size: 50px;
      left: 50%;
      transform: translateX(-50%);
    }
}
</style>
