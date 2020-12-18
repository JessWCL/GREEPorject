<template>
  <gree-popup
    v-model="isPopupShow.bottom"
    position="bottom"
  >
    <div class="popup-bottom">
      <div
        class="arrow-down"
        @click="cancel"
        @touchmove="cancel"
      ></div>
      <gree-row>
        <gree-col
          :style="`${item.Disabled ? 'opacity: 0.3': ''}`"
          v-for="(item, index) in functionList"
          :key="index"
          @click.native="handleFunc(index,item.Disabled)"
        >
          <img :src="item.ImgUrl">
          <h3 @click="SvstJump">
            {{ item.Name }}
            <span
              class="triangle"
              v-if="item.showArrowMore"
            ></span>
          </h3>
        </gree-col>
      </gree-row>
    </div>
  </gree-popup>
</template>

<script>
import { Popup, Row, Col } from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import homeConfig from '@/mixins/config/5000/btn';

export default {
  components: {
    [Popup.name]: Popup,
    [Row.name]: Row,
    [Col.name]: Col
  },
  mixins: [homeConfig],
  props: {
    isPopupShow: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    ...mapState({
      Dry: state => state.dataObject.Dry,
      EnSvSt: state => state.dataObject.EnSvSt
    })
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT'
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL',
      setDeviceTime: 'SET_DEVICE_TIME'
    }),
    cancel() {
      this.$set(this.isPopupShow, 'bottom', false);
    },
    confirm() {
      this.$set(this.isPopupShow, 'bottom', false);
    },
    /**
     * @description 功能点击触发事件
     */
    handleFunc(index, status) {
      if (!status) {
        const obj = {};
        switch (index) {
          case 0:
            this.Dry ? (obj.Dry = 0) : (obj.Dry = 1);
            break;
          case 1:
            this.EnSvSt ? (obj.EnSvSt = 0) : (obj.EnSvSt = 1);
            // this.$router.push({ name: 'Energy' });
            break;
          case 2:
            this.setDeviceTime({ time: 'time' });
            break;
          case 3:
            this.$router.push({ name: 'NormallyArea' });
            break;
          default:
            break;
        }
        if (JSON.stringify(obj) !== '{}') {
          this.setDataObject(obj);
          this.sendCtrl(obj);
        }
      }
    },
    SvstJump() {
      event.stopPropagation(); // 阻止触发父元素的点击事件
      this.Mod === 1 || this.Mod === 2 || this.Mod === 3
        ? this.$router.push({ name: 'Energy' })
        : '';
    }
  }
};
</script>
