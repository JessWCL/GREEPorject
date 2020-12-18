<template>
  <gree-popup-activity v-model="isPopupShow" @hide="$_close">
    <div class="dialog empty-prize">
      <div class="dialog-header">
        <div class="dialog-title">添加设备赢好礼！</div>
        <gree-image :src="require('@/assets/img/prize-empty.png')" :show-loading="false" />
      </div>
      <div class="dialog-body">
        <div class="body-title">谢谢惠顾</div>
      </div>
    </div>
  </gree-popup-activity>
</template>

<script>
import { PopupActivity, Image } from 'gree-ui';

export default {
  name: 'popup-lose',
  components: {
    [PopupActivity.name]: PopupActivity,
    [Image.name]: Image
  },
  props: {
    value: Boolean
  },
  data() {
    return {
      isPopupShow: this.value
    };
  },
  watch: {
    value(val) {
      this.isPopupShow = val;
    }
  },
  methods: {
    $_close() {
      this.isPopupShow = false;
      this.$emit('hide');
    }
  }
};
</script>
