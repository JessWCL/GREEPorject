<template>
  <gree-popup
    v-model="isPopupShow.bottom"
    position="bottom"
  >
    <div class="popup-bottom">
      <div
        class="arrow-down"
        @touchmove="cancel"
      ></div>
      <gree-row>
        <gree-col
          :disabled="item.Disabled"
          v-for="(item, index) in FootFuncList"
          :key="index"
          @click.native="handleFunc(index)"
        >
          <img :src="item.ImgUrl">
          <h3>{{ item.Name }}</h3>
        </gree-col>
      </gree-row>
    </div>
  </gree-popup>
</template>

<script>
import { Popup, Col, Row } from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import homeConfig from '@/mixins/config/6048/home';
import { timerListDevice } from '../../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [Popup.name]: Popup,
    [Col.name]: Col,
    [Row.name]: Row
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
      SensorErr: state => state.dataObject.SensorErr,
      Timer: state => state.dataObject.Timer,
      mac: state => state.mac,
      mainmac: state => state.mainmac,
      Inloop: state => state.dataObject.Inloop,
      MIdType: state => state.dataObject.MIdType,
      FanMod: state => state.dataObject.FanMod,
      InloopEN: state => state.dataObject.InloopEN
    })
  },
  created() {},
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
     * @description 功能触发事件
     */
    handleFunc(index) {
      // const __SensorErr = this.SensorErr.toString(2);
      switch (index) {
        case 0:
          // if (__SensorErr > 0) {
          //   if (parseInt(__SensorErr, 2) !== 2) {
          //     return;
          //   }
          // }
          timerListDevice(this.mac);
          break;
        case 1:
          this.$router.push({ name: 'Filter' });
          break;
        case 2:
          if (this.Inloop) {
            this.setDataObject({ Inloop: 0 });
          } else {
            this.setDataObject({ Inloop: 1 });
          }
          this.sendCtrl({ Inloop: this.Inloop });
          break;
        default:
          break;
      }
    }
  }
};
</script>
