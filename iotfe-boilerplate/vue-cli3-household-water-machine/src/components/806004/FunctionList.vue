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
          v-for="(item, index) in FootFuncList"
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
import homeConfig from '@/mixins/config/806004/home';

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
      mac: state => state.mac,
      enAcSvSt: state => state.dataObject.enAcSvSt, // 空调节能是否有效
      AcSvSt: state => state.dataObject.AcSvSt, // 空调节能
      Mod: state => state.dataObject.Mod // 模式
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
      switch (index) {
        case 0:
          this.LefHom || this.SvSt ? '' : (obj.Quiet = !this.Quiet ? 1 : 0);
          break;
        case 1:
          this.Quiet || this.SvSt || this.Mod === 1
            ? ''
            : (obj.LefHom = !this.LefHom ? 1 : 0);
          break;
        case 2:
          this.Quiet || this.LefHom ? '' : (obj.SvSt = !this.SvSt ? 1 : 0);
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
