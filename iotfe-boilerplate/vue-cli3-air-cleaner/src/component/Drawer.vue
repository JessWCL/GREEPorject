<!--
 * @Author: Jerry-Rain
 * @Date: 2019-09-30 13:49:28
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-03-18 16:35:32
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
        v-for="(item, index) in FootFuncList"
        :key="index"
      >
        <img
          class="advanced-img"
          @click="handleAdvancedImg(index, item.gray, item.moreBtn, item.protocol, item)"
          :src="item.gray ?
            item.ImgUrl : (changeColor ?
              (item.selected ? item.warmImgUrl : item.ImgUrl)
          : (item.selected ? item.selectedImgUrl : item.ImgUrl))"
        />
        <div
          v-if="!item.moreBtn"
          @click="handleAdvancedImg(index, item.gray, item.moreBtn, item.protocol)"
          class="advanced-name"
        >{{ item.name }}</div>
        <div
          v-else
          @click="handleAdvancedImg(index, item.gray, item.moreBtn, item.protocol)"
          class="advanced-name advanced-more"
        >
          {{ item.name }}
          <img class="moreContent" src="@/assets/img/more.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import homeConfig from '../mixins/config/828105/home';

// home 配置文件
export default {
  name: 'Drawer',
  mixins: [homeConfig],
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
  data() {
    return {};
  },
  computed: {
    ...mapState({
      light: state => state.dataObject.light,
      AirChildLock: state => state.dataObject.AirChildLock,
      TmrOn: state => state.dataObject.TmrOn,
    }),
  },
  methods: {
    ...mapMutations({
      setDataObj: 'SET_DATA_OBJECT',
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL',
    }),
    /**
     * @function handleAdvancedImg
     * @param index 高级功能index
     * @description 高级功能的图标触发事件
     */
    handleAdvancedImg(index, gray, moreBtn, protocol, item) {
      console.log('----------------');
      if (this.Pow) {
        if (!gray) {
          if (!moreBtn) { 
            const obj = {};
            obj[protocol] = Number(!this[protocol]); 
            this.setDataObj(obj);
            this.sendCtrl(obj);
          } else if (index) {
            this.$router.push({
              name: 'Preset'
            });
          } else {
            this.$router.push({
              name: 'Filter'
            });
          }
        } else {
          console.log('当前不可选择');
        }
      } else {
        this.$router.push({
          name: 'Preset'
        });
      }
    },
    /**
     * @function handleAdvancedTxt
     * @param index 高级功能index
     * @description 高级功能的名称触发事件
     */
    handleAdvancedTxt(index, gray, moreBtn) {
      // this.$emit('setRouter', index);
      console.log('handleAdvancedTxt');
      
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
      this.$emit('hideDrawer');
    }
  }
};
</script>
