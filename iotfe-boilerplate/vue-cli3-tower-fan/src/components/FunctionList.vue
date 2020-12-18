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
import {
  Header,
  Row,
  Col,
  Icon,
  NoticeBar,
  Popup,
  PowerOff,
  ToolBar
} from 'gree-ui';
import btnConfig from '../mixins/config/13803/btn';

export default {
  components: {
    [Header.name]: Header,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [NoticeBar.name]: NoticeBar,
    [Popup.name]: Popup,
    [PowerOff.name]: PowerOff,
    [ToolBar.name]: ToolBar,
  },
  mixins: [btnConfig],
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
      functype: state => state.functype,
      Lig: state => state.dataObject.Lig,
      AppTimer: state => state.dataObject.AppTimer,
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
            const cmd = { Lig: this.Lig ? 0 : 1};
            this.setDataObject(cmd);
            this.sendCtrl(cmd);
          }
          break;
        case 2:
          this.$router.push({name: 'Appointment'});
          break;
        default:
          break;
      }
    },
    jumpPage(index) {
      switch (index) {
        case 2:
          this.$router.push({name: 'Appointment'});
          break;
        default:
          break;
      }
    }
  }
};
</script>
