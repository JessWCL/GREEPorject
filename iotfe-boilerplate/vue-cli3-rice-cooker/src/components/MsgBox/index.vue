<template>
  <!-- 米种、口感组件。因需求更改突然，节点紧急，只在Home中用了 -->
  <div
    class="mask"
    :class="{hide: !selType}"
    @click.self="Cancel"
  >
    <div
      class="taste-type"
      :class="{type: !selTaste}"
    >
      <!-- 米种、口感选择弹框 -->
      <div class="title">
        {{ cookType }}{{ about }}{{ typeTime }}{{ unitMin }}
      </div>
      <div class="top">
        <div class="riceType">
          {{ riceType }}
        </div>
        <div
          v-for="(item, index) in riceList"
          :ref="'rice_' + index "
          :key="item.index"
          class="rice"
          :class="{active: item.selected}"
          @click="selectRice(index)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="middle">
        <div class="tasteType">
          {{ tasteType }}
        </div>
        <div
          v-for="(item, index) in tasteList"
          :ref="'taste_' + index "
          :key="item.index"
          class="taste"
          :class="{active: item.selected}"
          @click="selectTaste(index)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="confirm">
        <div @click="Cancel">
          {{ btnCancel }}
        </div>
        <div @click="Confirm">
          {{ btnAffirm }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @module Mode
 * @description 模式列表选择模块
 * @requires module:setTime 设置插件内的时间
 */
import { mapState, mapMutations } from 'vuex';
import { setTime } from '../../mixins/function-change-device.mixin';

export default {
  name: 'Mode',
  mixins: [setTime],
  props: {
    modeListId: { // 当前模式ID
      type: Number,
      default() {
        return 0;
      }
    },
    isType: { // 是否开始选择米种
      type: Boolean,
      default() {
        return false;
      },
    },
    selTaste: { // 是否有选择口感的功能
      type: Boolean,
      default() {
        return true;
      },
    },
    cookType: { // 模式
      type: String,
      default() {
        return '烹饪';
      },
    },
  },
  data() {
    return {
      about: this.$language('about'),
      unitMin: this.$language('unitMin'),
      btnCancel: this.$language('btnCancel'),
      btnAffirm: this.$language('btnAffirm'),
      riceType: this.$language('rice_kind'),
      tasteType: this.$language('taste'),
      typeTime: 50,
      typeCache: 0, // 米种缓存
      tasteCache: 1, // 口感缓存
      selType: this.isType,
      timeBuffer: 50,
    };
  },
  computed: {
    ...mapState({
      MidType: state => state.dataObject.MidType,
      devname: state => state.devName,
      modeIndex: state => state.dataObject.mode,
      modeName: state => state.modeName,
      requireTime: state => state.dataObject.StTmr,
      riceIndex: state => state.dataObject.Rice,
      tasteIndex: state => state.dataObject.Textre,
      isPreseting: state => state.dataObject.SchEn
    }),
  },
  watch: {
    isType: function isType(newv) {
      this.selType = newv;
    },
    selType: function selType(newv) {
      this.$emit('change', newv);
      if (newv) {
        this.updateUI();
      }
    },
    selTaste: function selTaste(newv) {
      this.isTaste = newv;
    }
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT',
    }),
    updateUI() {
      const stateRice = this.riceIndex - 1;
      const stateTaste = this.tasteIndex - 1;
      this.selectRice(stateRice);
      this.selectTaste(stateTaste);
    },
    /**
     * @function selectRice
     * @param index 米种列表下标
     * @description 选择米种触发事件
     */
    selectRice(index) {
      this.riceList.forEach(element => {
        const riceList = element;
        riceList.selected = false;
      });
      this.riceList[index].selected = true;
      this.typeCache = index;
      this.typeChangeTime();
    },
    /**
     * @function selectTaste
     * @param index 口感列表下标
     * @description 选择口感触发事件
     */
    selectTaste(index) {
      if (this.selTaste) {
        this.tasteList.forEach(element => {
          const tasteList = element;
          tasteList.selected = false;
        });
        this.tasteList[index].selected = true;
        this.tasteCache = index;
        this.typeChangeTime();
      }
    },
    /**
     * @function typeChangeTime
     * @description 选择不同米种或口感需要的烹饪时间，typeChange在setTime.mixin中
     */
    typeChangeTime() {
      this.typeTime = this.typeTasteChangeByMode(
        this.modeListId,
        this.typeCache + 1,
        this.tasteCache + 1
      );
      this.setDataObject({
        StTmr: this.typeTime,
      });
    },
    /**
     * @function Cancel
     * @description 米种、口感弹框的取消键
     */
    Cancel() {
      this.selType = false;
      this.setDataObject({
        StTmr: this.timeBuffer,
      });
    },
    /**
     * @function Confirm
     * @description 米种、口感弹框的确认键
     */
    Confirm() {
      this.selType = false;
      this.setDataObject({
        Rice: this.riceList[this.typeCache].itemId,
        Textre: this.tasteList[this.tasteCache].itemId,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/index.scss";

$main-width: 100%;
$main-height: 100%;
.mask {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #404657;
  background-image: url("../../assets/img/blackBg.png");
  background-size: 100% 100%;
  .taste-type {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 90%;
    height: 38%;
    border-radius: 8px;
    color: #404657;
    background-color: #fff;
    box-shadow: rgb(219, 219, 219) 0px 0px 10px 0px;
    z-index: 100;
    div {
      width: 100%;
      height: 25%;
    }
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      @include font-size(20px);
      letter-spacing: 2px;
      font-weight: 500;
      font-family: appLight;
    }
    .top {
      display: flex;
      justify-content: space-around;
      align-items: baseline;
      @include font-size(15px);
      .riceType {
        width: 15%;
        margin-right: -8%;
        margin-left: -5%;
        @include font-size(16px);
      }
      .rice {
        width: 15%;
        height: 32%;
        padding: 2% 0;
        border-radius: 6px;
        border: 2px solid #e4e4e4;
      }
      .active {
        border: 2px solid rgb(242, 218, 124);
        background-color: rgb(242, 218, 124);
      }
    }
    .middle {
      display: flex;
      justify-content: space-around;
      align-items: baseline;
      @include font-size(15px);
      .tasteType {
        width: 15%;
        margin-right: -8%;
        margin-left: -5%;
        @include font-size(16px);
      }
      .taste {
        width: 15%;
        height: 32%;
        padding: 2% 0;
        border-radius: 6px;
        border: 2px solid #e4e4e4;
      }
      .active {
        border: 2px solid rgb(242, 218, 124);
        background-color: rgb(242, 218, 124);
      }
    }
    .confirm {
      display: flex;
      height: 20%;
      border-top: 1px solid #e4e4e4;
      // @include border-top-1px(#000000);
      font-size: 22px;
      div {
        height: 100%;
        line-height: 1.5rem;
        font-size: 0.5rem;
      }
    }
  }
  .type {
    width: 90%;
    height: 38%;
    border-radius: 8px;
    background-color: #fff;
    .middle {
      .taste {
        width: 16%;
        height: 34%;
        padding: 2% 0;
        border-radius: 6px;
        color: #404657;
        opacity: 0.6;
        background-color: #eee;
        border: 2px solid #eee;
      }
    }
  }
}
.hidden {
  visibility: hidden;
}
.hide {
  display: none;
}
</style>
