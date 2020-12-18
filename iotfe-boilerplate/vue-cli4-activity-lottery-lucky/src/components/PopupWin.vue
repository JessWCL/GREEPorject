<template>
  <gree-popup-activity v-model="isPopupShow" @hide="$_close">
    <div class="dialog obtain-prize">
      <div class="dialog-header">
        <div class="dialog-title">添加设备赢好礼！</div>
        <gree-image :src="prizeImg" :show-loading="false" />
      </div>
      <div class="dialog-body">
        <div class="body-title">恭喜你！</div>
        <div class="body-content">赢得{{ prizeName }}</div>
        <gree-button round @click="goToMall">前往查看</gree-button>
      </div>
    </div>
  </gree-popup-activity>
</template>

<script>
import { PopupActivity, Image, Button } from 'gree-ui';
import { toMallUserPage } from '../../../static/lib/PluginInterface.promise';

export default {
  name: 'popup-win',
  props: {
    value: Boolean,
    winId: Number,
    prizeList: Array
  },
  components: {
    [PopupActivity.name]: PopupActivity,
    [Image.name]: Image,
    [Button.name]: Button
  },
  watch: {
    value(val) {
      this.isPopupShow = val;
    }
  },
  data() {
    return {
      isPopupShow: this.value,
      prizeName: '',
      prizeImg: ''
    };
  },
  mounted() {
    this.prizeList.forEach((item, index) => {
      if (item.id === this.winId) {
        this.prizeName = this.prizeList[index].awardName;
        this.prizeImg = this.prizeList[index].awardImg;
        console.log(`WinPrize - prizeName:${this.prizeName}, prizeImg:${this.prizeImg}`);
      }
    });
  },
  methods: {
    $_close() {
      this.isPopupShow = false;
      this.$emit('hide');
    },
    goToMall() {
      toMallUserPage();
    }
  }
};
</script>
