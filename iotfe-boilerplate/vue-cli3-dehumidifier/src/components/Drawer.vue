<!--
 * @Author: Jerry-Rain
 * @Date: 2019-09-30 13:49:28
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2019-12-13 00:44:36
 * @Description: 这是一个drawer的高级功能列表，事件也在这一页
 -->
<template>
  <div class="drawer-wrapper">
    <div class="pull-down" @click="pullDown">
      <img class="img" src="@/assets/img/ic_pulldown.png" />
    </div>
    <div class="btn-wrapper">
      <div
        class="advanced-funtion"
        :class="{invalid: item.gray}"
        :ref="'advanced-' + index"
        v-for="(item, index) in functionList"
        :key="index"
      >
        <img
          class="advanced-img"
          @click="handleAdvancedImg(index,item.gray)"
          :src="item.gray ?
            item.ImgUrl : (changeColor ?
              (item.selected ? item.warmImgUrl : item.ImgUrl)
        : (item.selected ? item.selectedImgUrl : item.ImgUrl))"
        />
        <div
          v-if="!item.moreBtn"
          @click="handleAdvancedTxt(index,item.gray,item.moreBtn)"
          class="advanced-name"
        >{{ $language(item.name) }}</div>
        <div
          v-else
          @click="handleAdvancedTxt(index,item.gray,item.moreBtn)"
          class="advanced-name advanced-more"
        >
          {{ $language(item.name) }}
          <img class="moreContent" src="@/assets/img/more.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import drawerFunctionConfig from '@/mixins/config/13805/drawerFunction.js';

export default {
  name: "Drawer",
  mixins: [drawerFunctionConfig],
  data() {
    return {};
  },
  props: {
    selAdvanced: {
      // 是否点击了高级功能
      type: Boolean,
      default() {
        return false;
      }
    },
    changeColor: {
      // 改变图标颜色
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  methods: {
    /**
     * @function handleAdvancedImg
     * @param index 高级功能index
     * @description 高级功能的图标触发事件
     */
    handleAdvancedImg(index, gray) {
      if (!gray) {
        console.log("触发功能", index);
        this.$emit('setAdvanced', this.functionList[index].key);
      } else {
        console.log("无法点击状态");
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
        console.log("点击更多", index);
      } else {
        console.log("无法更多或者无法点击");
      }
    },
    /**
     * @function pullDown
     * @description 下拉小箭头,会跳路由
     */
    pullDown() {
      this.$emit("hideDrawer");
    }
  }
};
</script>
<style lang="sass" scoped>
@import '../assets/scss/drawer.scss';
</style>