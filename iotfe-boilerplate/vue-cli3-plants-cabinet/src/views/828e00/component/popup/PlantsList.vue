
<template>
  <transition name="fade" v-on:after-leave="mask_afterLeave" >
    <div class="mask" @click.stop.self="cancel()" v-show="pageShow" key="mask">
      <transition name="popup" mode="out-in" >
        <div class="popup-wrapper" v-if="pageShow" key="popupWrapper" >
          <!-- <div class="popup-header">
            <div class="pulldown">
              <span class="pulldown-icon" @click="cancel()" >
                <img class="img" src="../../../assets/img/ic_pulldown.png">
              </span>
            </div>
          </div> -->
          <div class="popup-content">
            <ol class="drawer-list-group">
              <li class="drawer-list-item"
                  v-for="(species, speciesIndex) in plantsGroup"
                  :key="speciesIndex"
                  :class="{collapsed: speciesIndex !== drawerListShow}"
              >
                <div class="drawer-list-header" @click="drawerListShow = speciesIndex" >
                  <span class="species">
                    {{ species.species }}类
                  </span>
                  <i class="arrow-icon">
                    <img class="img" src="../../../../assets/img/ic_pulldown.png">
                  </i>
                </div>
                <div class="drawer-list-content" >
                  <ul class="popup-items-group">
                    <li 
                      class="popup-item "
                      v-for="(el, plantsIndex) in species.children"
                      :key="plantsIndex"
                    >
                      <span class="plants-list-img">
                        <img 
                          :src="el.img"
                          class="item-img"
                          @click="ImgClick({index: plantsIndex, val:el.PltType});"
                        />
                      </span>
                      
                      <div class="item-name">
                        {{ el.name }}
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { Icon } from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import popFunctionConfig from '../../../../mixins/config/828e00/Popfunction.js';
import { plantsList } from '../../../../assets/js/plants-data.js';

const imgAssets = {
  Light: [require("../../../../assets/img/function.png"), require("../../../../assets/img/function-on.png"), ],
  Wind: [require("../../../../assets/img/function.png"), require("../../../../assets/img/function-on.png"), ],
  WatPump: [require("../../../../assets/img/function.png"), require("../../../../assets/img/function-on.png"), ],
};
// home 配置文件
export default {
  name: 'PlantsList',
  components: {
    [Icon.name]: Icon,
  },
  data() {
    return {
      pageShow: false,
      drawerListShow: 0,
    };
  },
  computed: {
    ...mapState({
      PltType: state => state.dataObject.PltType,
    }),
    imgAssets() {
      const arr = [];
      plantsList.forEach(el => {
        el.children.forEach(plant => {
          arr.push(require('@/assets/img/plants-' + plant.PltType + '.png'));
        });
      });
      return {
        plants: arr,
      };
    },
    plantsGroup() {
      const arr = [];
      const plantsImg = this.imgAssets.plants;
      plantsList.forEach((species, index) => {
        arr.push({
          species: species.species,
          children: [],
        });
        species.children.forEach(el => {
          const PltType = el.PltType;
          arr[index].children.push({
            name: el.name,
            PltType,
            img: plantsImg[PltType - 1],
          });
        });
      });
      return arr;
    },
    // 计算当前的Tab
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
  },
  mounted() {
    this.pageShow = true;
    this.mountedInit();
    // console.log(this.plantsGroup);
    // console.log(this.imgAssets);
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT'
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL'
    }),
    mountedInit() {
      this.drawerListShow = this.currentTab;
    },
    /**
     * @function cancel
     * @description 取消popup，回退路由
     */
    cancel() {
      this.pageShow = false;
    },
    /**
     * @function mask_afterLeave
     * @description 在mask离开动画结束之后调用, 回退路由
     */
    mask_afterLeave(el) {
      // console.log(el);
      this.$router.go(-1);
    },
    // 按钮图片被点击
    ImgClick({index, val}) {
      // console.log('ImgClick: %s , %s ', index, val);
      if (val !== this.PltType) { // 当PltType值和当前不一样时才发送指令
        console.log('ImgClick >set >PltType: ', val);
        this.setDataObject({PltType: val});
        this.sendCtrl({PltType: val});
      }
    },
    // 按钮更多角标被点击
    moreBtnClick(index) {
      console.log(`moreBtnClick: `, index);
    },
  },
  
};
</script>

<style lang="scss" scoped>
@import '../../../../assets/scss/popup.scss';

/* 抽屉式列表样式 */
.drawer-list-group {
  list-style: none;
  width: 100%;
  height: auto;
  .drawer-list-item {
    list-style: none;
    .drawer-list-header {
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      font-size: 42px;
      padding: 30px 50px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      .arrow-icon{
        transition: transform .4s ease;
        img {
          width: 0.5rem;
        }
      }
    }
    .drawer-list-content {
      height: auto;
      padding: 20px 0;
      box-sizing: border-box;
      transition: height .4s ease;
      overflow: hidden;
    }
    &.collapsed {
      .drawer-list-header {
        .arrow-icon{
          transform: rotateX(180deg);
        }
      }
      .drawer-list-content {
        height: 0;
        padding: 0;
      }
    }
  }
}

.popup-wrapper {
  .popup-items-group {
    padding-bottom: 10px;
    .popup-item {
      .plants-list-img {
        width: 160px;
        height: 160px;
        display: inline-block;
        border-radius: 100px;
        border: 1px solid #bbb;
        text-align: center;
        overflow: hidden;
        cursor: pointer;
        margin-bottom: 10px;
        .item-img {
          display: block;
          width: 80%;
          height: 80%;
          margin: auto;
          margin-top: 10%;
          border-radius: 100%;
        }
      }
    }
  }
}

// ---

</style>
