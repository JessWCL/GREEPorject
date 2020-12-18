<template>
  <gree-popup
    v-model="isPopupShow.bottom"
    position="bottom"
  >
    <div class="popup-bottom">
      <div
        class="arrow-down"
        @touchend="cancel"
      ></div>
      <gree-row>
        <gree-col
          :width="25"
          v-for="(item, index) in functionList"
          :key="index"
          v-show="item.ScenesShow || !functype"
        >
          <div
            class="icon"
            @click="BtnFunction(item.sign, item.index)"
          >
            <img :src="item.ImgUrl" />
          </div>
          <span
            v-if="item.name"
            @click="jumpPage(item.index)"
          >
            {{ $language(item.name) }}
            <i
              class="triangle"
              v-if="item.moreBtn"
            ></i>
          </span>
        </gree-col>
      </gree-row>
    </div>
  </gree-popup>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import BtnConfig from '@/mixins/config/btn';
import { Popup, Row, Col } from 'gree-ui';

export default {
  components: {
    [Popup.name]: Popup,
    [Row.name]: Row,
    [Col.name]: Col
  },
  mixins: [BtnConfig],
  props: {
    isPopupShow: {
      type: Object,
      default() {
        return {};
      }
    },
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      Pow: state => state.dataObject.Pow,
      functype: state => state.functype,
      mac: state => state.mac,
      UVLight: state => state.dataObject.UVLight,
      WaterTankLight: state => state.dataObject.WaterTankLight,
    }),
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
    BtnFunction(val, index) {
      switch (index) {
        case 1:
          {
            const cmd = {UVLight: this.UVLight ? 0 : 1};
            this.setDataObject(cmd);
            this.sendCtrl(cmd);
          }
          break;
        case 2:
          {
            const cmd = {WaterTankLight: this.WaterTankLight ? 0 : 1};
            this.setDataObject(cmd);
            this.sendCtrl(cmd);
          }
          break;
        case 3:
          this.$router.push('/Timer');
          break;
        default:
          break;
      }
    },
    jumpPage(index) {
      switch (index) {
        case 3:
          this.$router.push('/Timer');
          break;
        default:
          break;
      }
    }
  }
};
</script>
