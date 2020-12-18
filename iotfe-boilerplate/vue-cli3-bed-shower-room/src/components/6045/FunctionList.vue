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
          width="25"
          :style="`${item.Disabled ? 'opacity: 0.3': ''}`"
          v-for="(item, index) in functionList"
          :key="index"
          @click.native="handleFunc(index,item.Disabled)"
        >
          <img 
          :src="item.ImgUrl" >
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
import homeConfig from '@/mixins/config/6045/btn';
import { timerListDevice } from '../../../../static/lib/PluginInterface.promise';

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
      Air: state => state.dataObject.Air,
      mac: state => state.mac,
      Pow: state => state.dataObject.Pow,
      Mod: state => state.dataObject.Mod,
      SwhSlp: state => state.dataObject.SwhSlp,
      AidHeat: state => state.dataObject.AidHeat,
      SvSt: state => state.dataObject.SvSt,
      isScene: state => state.isScene
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
    handleFunc(index, status) {
      if (!status) {
        const obj = {};
        if (this.Pow) {
          switch (index) {
            case 0:
              this.Blo ? (obj.Blo = 0) : (obj.Blo = 1);
              break;
            case 1:
              // this.Mod === 1 || this.Mod === 3
              //   ? this.$router.push({ name: 'Energy' })
              //   : '';
              // this.$router.push({ name: 'Energy' });
              this.SvSt ? (obj.SvSt = 0) : (obj.SvSt = 1);
              break;
            case 2:
              // this.SwhSlp ? (obj.SwhSlp = 0) : (obj.SwhSlp = 1);
              if (this.SwhSlp) {
                obj.SwhSlp = 0;
                obj.Quiet = 0;
              } else {
                obj.SwhSlp = 1;
                obj.Quiet = 1;
              }
              break;
            case 3:
              timerListDevice(this.mac);
              break;
            case 4:
              this.AidHeat ? (obj.AidHeat = 0) : (obj.AidHeat = 1);
              break;
            default:
              break;
          }
        } else {
          switch (index) {
            // case 0:
            //   this.Air ? (obj.Air = 0) : (obj.Air = 1);
            //   break;
            case 0:
              timerListDevice(this.mac);
              break;
            default:
              break;
          }
        }
        if (JSON.stringify(obj) !== '{}') {
          this.sendCtrl(obj);
          this.setDataObject(obj);
        }
      }
    },
    SvstJump() {
      event.stopPropagation(); // 阻止触发父元素的点击事件
      this.Mod === 1 || this.Mod === 4
        ? this.$router.push({ name: 'Energy' })
        : '';
    }
  }
};
</script>
