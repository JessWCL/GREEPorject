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
          v-for="(item, index) in functionListChildren"
          :key="index"
          @click.native="handleFunc(index)"
        >
          <img :src="item.ImgUrl">
          <h3>
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
import homeConfig from '@/mixins/config/5001/btn';
import {
  timerListDevice,
  showToast
} from '../../../../static/lib/PluginInterface.promise';

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
      TemUnit: state => state.dataObject.TemUnit,
      AppTimer: state => state.dataObject.AppTimer,
      mac: state => state.mac,
      gmac: state => state.gmac,
      Pow: state => state.dataObject.Pow,
      VavleAllOn: state => state.dataObject.VavleAllOn
    })
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT'
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL'
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
    handleFunc(index) {
      const obj = {};
      const macNo = parseInt(
        this.gmac.split('')[this.gmac.split('').length - 1],
        10
      );
      switch (index) {
        case 0:
          this.TemUnit ? (obj.TemUnit = 0) : (obj.TemUnit = 1);
          break;
        case 1:
          // this.$router.push({ name: 'Energy' });
          this.VavleAllOn === macNo
            ? showToast(this.$language('home.orderAlways'), 0)
            : timerListDevice(`${this.gmac}@${this.mac}`);
          break;
        default:
          break;
      }
      if (JSON.stringify(obj) !== '{}') {
        this.setDataObject(obj);
        this.sendCtrl(obj);
      }
    }
  }
};
</script>
