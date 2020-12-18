<template>
  <gree-popup
    class="menu-popup"
    v-model="isPopupShow.bottom"
    position="bottom"
  >
    <div class="popup-bottom">
      <div
        class="arrow-down"
        @touchend.stop="hidePopUp('bottom')"
      >
        <gree-icon
          name="arrow-down"
          size="md"
          color="#00000"
        ></gree-icon>
      </div>
      <gree-row class="function-list">
        <gree-col
          v-for="(item, index) in FootFuncList"
          :key="index"
          width="25"
          :disabled="item.Disabled"
          :class="{ 'active': index === value }"
          @click.native="handleFunc(item, index)"
        >
          <gree-image
            :src="item.normalIconSrc"
            radius="radius"
          ></gree-image>
          <div class="name">{{ item.name }}</div>
        </gree-col>
      </gree-row>
    </div>
  </gree-popup>
</template>

<script>
import { Popup, Block, Row, Col, Dialog, Button, Image, Icon } from 'gree-ui';
import modeBtnList from '@/api/828902/modeBtnList';
import { mapState, mapMutations } from 'vuex';
import * as types from '@/store/types';

export default {
  components: {
    [Popup.name]: Popup,
    [Block.name]: Block,
    [Row.name]: Row,
    [Col.name]: Col,
    [Dialog.name]: Dialog,
    [Button.name]: Button,
    [Image.name]: Image,
    [Icon.name]: Icon,
  },
  props: {
    isPopupShow: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      checkedIndex: 0,
      FootFuncList: []
    };
  },
  computed: {
    ...mapState({
      modType: state => state.cache.modType,
      normalModIndex: state => state.cache.normalModIndex,
      singleDryModIndex: state => state.cache.singleDryModIndex,
      singlePurifierModIndex: state => state.cache.singlePurifierModIndex
    }),

    value() {
      const {
        modType,
        normalModIndex,
        singleDryModIndex,
        singlePurifierModIndex
      } = this;
      switch (modType) {
        case 0:
          return normalModIndex;
        case 1:
          return singleDryModIndex;
        case 2:
          return singlePurifierModIndex;

        default:
          return 0;
      }
    }
  },

  watch: {
    modType(newV) {
      this.FootFuncList = modeBtnList.filter(item => item.modType === newV);
    },
  },

  mounted() {
    this.initFootFuncList();
  },

  methods: {
    ...mapMutations({
      setCache: types.SET_CACHE,
    }),

    initFootFuncList() {
      this.FootFuncList = modeBtnList.filter(item => item.modType === this.modType);
    },

    hidePopUp(type) {
      this.$set(this.isPopupShow, type, false);
    },

    handleFunc(funItem, index) {
      console.log({ funItem, index });
      const { modType } = this;
      switch (modType) {
        case 0:
          this.setCache({ normalModIndex: index });
          break;
        case 1:
          this.setCache({ singleDryModIndex: index });
          break;
        case 2:
          this.setCache({ singlePurifierModIndex: index });
          break;

        default:
          break;
      }
    },

    cancel() {
      this.isPopupShow.bottom = false;
    },

    confirm() {
      this.isPopupShow.bottom = false;
      const index = this.checkedIndex;
      this.$emit('confirm', modeBtnList[index], index);
    },
  },

};
</script>
