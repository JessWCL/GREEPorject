<!--
 * @Author: Jerry-Rain
 * @Date: 2019-09-30 13:49:28
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2019-09-30 15:34:56
 * @Description: 这是一个Pop的高级功能列表
 -->
<template>
  <transition
    name="maskShow"
    mode="in-out">
    <div
      class="mask"
      @click.self="$router.replace({ path: '/Home'})">
      <transition
        name="slider"
        mode="in-out">
        <div
        class="pop-wrapper">
          <div
            class="pull-down"
            @click="pullDown">
            <img
              class="img"
              src="../../../assets/img/ic_pulldown.png">
          </div>
          <div class="btn-wrapper">
            <div
              class="advanced-funtion"
              :class="{invalid: item.gray}"
              :ref="'advanced-' + index"
              v-for="(item, index) in functionList"
              :key="item.index">
              <img
                class="advanced-img"
                @click="handleAdvancedImg(index,item.gray)"
                :src="item.gray ?
                  item.ImgUrl : (changeColor ?
                    (item.selected ? item.warmImgUrl : item.ImgUrl)
              : (item.selected ? item.selectedImgUrl : item.ImgUrl))">
              <div
                v-if="!item.moreBtn"
                @click="handleAdvancedTxt(index,item.gray,item.moreBtn)"
                class="advanced-name">{{ item.name }}</div>
              <div
                v-else
                @click="handleAdvancedTxt(index,item.gray,item.moreBtn)"
                class="advanced-name advanced-more">
                {{ item.name }}
                <img
                  class="moreContent"
                  src="../../../assets/img/more.png">
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import popFunctionConfig from '../../../mixins/config/828e00/Popfunction.js';
// home 配置文件
export default {
  name: 'Pop',
  mixins: [popFunctionConfig],
  data() {
    return {

    };
  },
  // props: {
  //   selAdvanced: { // 是否点击了高级功能
  //     type: Boolean,
  //     default() {
  //       return false;
  //     },
  //   },
  //   changeColor: { // 改变图标颜色
  //     type: Boolean,
  //     default() {
  //       return false;
  //     },
  //   },
  //   // dataSorce: {
  //   //   type: Array,
  //   //   default() {
  //   //     return [
  //   //       {
  //   //         index: 2,
  //   //         gray: false,
  //   //         // state: this.dataObject.SwUpDn,
  //   //         name: '功能',
  //   //         // miniIcon: require("../../assets/img/mini/SwUpDn_mini.png"),
  //   //         ImgUrl: require("../../../assets/img/function.png"),
  //   //         moreBtn: true
  //   //       },
  //   //       {
  //   //         index: 2,
  //   //         gray: false,
  //   //         // state: this.dataObject.SwUpDn,
  //   //         name: '功能',
  //   //         // miniIcon: require("../../assets/img/mini/SwUpDn_mini.png"),
  //   //         ImgUrl: require("../../../assets/img/function.png"),
  //   //         moreBtn: false
  //   //       },
  //   //       {
  //   //         index: 2,
  //   //         gray: true,
  //   //         // state: this.dataObject.SwUpDn,
  //   //         name: '功能',
  //   //         // miniIcon: require("../../assets/img/mini/SwUpDn_mini.png"),
  //   //         ImgUrl: require("../../../assets/img/function.png"),
  //   //         moreBtn: false
  //   //       },
  //   //       {
  //   //         index: 2,
  //   //         gray: true,
  //   //         // state: this.dataObject.SwUpDn,
  //   //         name: '功能',
  //   //         // miniIcon: require("../../assets/img/mini/SwUpDn_mini.png"),
  //   //         ImgUrl: require("../../../assets/img/function.png"),
  //   //         moreBtn: true
  //   //       },
  //   //       {
  //   //         index: 2,
  //   //         gray: true,
  //   //         // state: this.dataObject.SwUpDn,
  //   //         name: '功能',
  //   //         // miniIcon: require("../../assets/img/mini/SwUpDn_mini.png"),
  //   //         ImgUrl: require("../../../assets/img/function.png"),
  //   //         moreBtn: false
  //   //       },
  //   //     ];
  //   //   }
  //   // }
  // },
  methods: {
    /**
     * @function handleAdvancedImg
     * @param index 高级功能index
     * @description 高级功能的图标触发事件
     */
    handleAdvancedImg(index, gray) {
      // this.$emit('setAdvanced', index);
      if (!gray) {
        console.log('触发功能', index);
      } else {
        console.log('无法点击状态');
      }
    },
    /**
     * @function handleAdvancedTxt
     * @param index 高级功能index
     * @description 高级功能的名称触发事件
     */
    handleAdvancedTxt(index, gray, moreBtn) {
      // this.$emit('setRouter', index);
      if (!gray && moreBtn) {
        console.log('点击更多', index);
      } else {
        console.log('无法更多或者无法点击');
      }
    },
    /**
     * @function pullDown
     * @description 下拉小箭头,会跳路由
     */
    pullDown() {
      this.$router.go(-1);
    },
    /**
     * @function cancel
     * @description 蒙版点击事件
     */
    cancel() {
      this.$router.go(-1);
    }
  },
};
</script>

<style lang="scss" scoped>
$animateTime: 0.5s; // 动画持续时间
$distance: 200px; // 动画移动距离
.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 10;
}
.pop-wrapper {
  position: absolute;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  color: #404657;
  background-color: #fff;
  overflow: hidden;
}
.pull-down {
  padding-top: 8px;
  width: 100%;
  text-align: center;
  .img {
    width: 0.5rem;
  }
}
.btn-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  .foot-list, .advanced-funtion {
    padding: 0.2rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25%;
    .function-img, .advanced-img {
      width: 1.61rem;
      height: 1.61rem;
    }
    .moreContent{
      width: 0.2rem;
    }
    .function-name, .advanced-name {
      padding-bottom: 0.01rem;
      font-size: 0.42rem;
    }
    .advanced-more{
      padding-left: 0.3rem;
    }
  }
}
.maskShow-enter, .maskShow-leave-to{
  opacity: 0;
}
.maskShow-enter-active, .maskShow-leave-active{
  transition: all $animateTime;
}
.maskShow-enter-to, .maskShow-leave{
  opacity: 1;
}
.slider-enter, .slider-leave-to{
  opacity: 0;
  transform: translateY($distance);
}
.slider-enter-active, .slider-leave-active {
  transition: all $animateTime;
}
.slider-enter-to, .slider-leave {
  opacity: 1;
  transform: translateY(0);
}
.invalid {
  opacity: 0.3;
}
.hide {
  display: none;
}
.hidden {
  visibility: hidden;
}
</style>
