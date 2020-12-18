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
          :src="require('@/assets/img/'+item.ImgName+'.png')" >
          <h3>
            {{ item.Name }}
            <span
              @click="SvstJump"
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
import homeConfig from '@/mixins/utils/config/btn.js';
// import { timerListDevice } from '../../../static/lib/PluginInterface.promise';

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
      Pow: state => state.dataObject.Pow
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
              this.$router.push({ name: 'setting' });
              break;
            case 1:
              this.Breathe ? (obj.Breathe = 0) : (obj.Breathe = 1);
              break;
            default:
              break;
          }
        } else {
          // switch (index) {
          // }
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
