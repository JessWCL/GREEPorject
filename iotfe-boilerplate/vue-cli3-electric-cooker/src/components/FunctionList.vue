<template>
  <gree-popup
    v-model="isPopupShow.bottom"
    position="bottom"
    :mask-closable="false"
  >
    <div class="popup-bottom">
      <div class="row">
        <div
          class="col-25"
          v-for="(item, index) in modeList"
          :key="index"
          @click="handleAdvanced(index)"
        >
          <img :src="imgStyle[index] ? item.lightImgUrl : item.ImgUrl">
          <span>{{ item.name }}</span>
        </div>
      </div>
      <div class="block">
        <div class="row">
          <gree-button
            round
            @click="cancel"
          >{{ $language('home.cancel') }}</gree-button>
          <gree-button
            round
            @click="confirm"
          >{{ $language('home.confirm') }}</gree-button>
        </div>
      </div>
    </div>
  </gree-popup>
</template>

<script>
export default {
  props: {
    isPopupShow: {
      type: Object,
      default() {
        return {};
      }
    },
    modeList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      imgStyle: []
    };
  },
  mounted() {
    for (let i = 0; i < this.modeList.length; i += 1) {
      this.imgStyle.push(false);
    }
  },
  methods: {
    /**
     * @param index 高级功能index
     * @description 高级功能的图标触发事件
     */
    handleAdvanced(index) {
      this.modeList[index].protocolVal === 2 ? this.$parent.openRiceBox() : '';
      const protocolVal = this.modeList[index].protocolVal; // 对应的协议值
      let defaultTime;
      if (this.modeList[index].protocolVal === 2) {
        defaultTime = this.$parent.defaultTime[this.$parent.Rice - 1][
          this.$parent.Textre - 1
        ];
      } else {
        defaultTime = this.modeList[index].defaultTime;
      }
      this.$parent.setDataObject({
        mode: protocolVal,
        StTmr: defaultTime
      });
      this.$parent.setModeTime(defaultTime);
    },
    cancel() {
      this.$parent.setDataObject({
        mode: this.$parent.modeBuffer.protocolVal,
        StTmr: this.$parent.modeBuffer.defaultTime
      });
      this.$parent.setModeTime(this.$parent.modeBuffer.defaultTime);
      this.$parent.setModeName(this.$parent.modeBuffer.modeName);
      this.$set(this.isPopupShow, 'bottom', false);
    },
    confirm() {
      this.$set(this.isPopupShow, 'bottom', false);
    },
    setId(val) {
      for (let i = 0; i < this.imgStyle.length; i += 1) {
        this.imgStyle[i] = false;
      }
      this.$set(this.imgStyle, val, true);
    }
  }
};
</script>
