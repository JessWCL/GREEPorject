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
        <!-- Lock -->
        <gree-col
          width="25"
          :class="{
            'active': Lock === 1,
          }"
          @click.native="handleFunc(checkLockItem, 0)"
        >
          <gree-check
            v-model="Lock"
            :name="checkLockItem.htmlAttr.value"
          >
            <gree-image
              :src="checkLockItem.normalIconSrc"
              radius="radius"
            ></gree-image>
          </gree-check>
          <div class="name">{{ checkLockItem.name }}</div>
        </gree-col>
        <!-- Lighting -->
        <gree-col
          width="25"
          :class="{
            'visible': hasLighting,
            'invisible': !hasLighting,
            'active': Lighting === 1,
          }"
          @click.native="handleFunc(checkLightingItem, 0)"
        >
          <gree-check
            v-model="Lighting"
            :name="checkLightingItem.htmlAttr.value"
          >
            <gree-image
              :src="checkLightingItem.normalIconSrc"
              radius="radius"
            ></gree-image>
          </gree-check>
          <div class="name">{{ checkLightingItem.name }}</div>
        </gree-col>
      </gree-row>
    </div>
  </gree-popup>
</template>

<script>
import {
  Popup,
  Block,
  Row,
  Col,
  Dialog,
  Button,
  Image,
  Icon,
  Radio,
  Check
} from 'gree-ui';
import funBtnList from '@/api/828902/funBtnList';
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';
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
    [Radio.name]: Radio,
    [Check.name]: Check
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
    };
  },
  computed: {
    ...mapGetters(['hasLighting']),
    ...mapState({
      DataObject: state => state.DataObject
    }),

    Lock: {
      // eslint-disable-next-line func-names
      get: function () {
        const { Lock } = this.DataObject;
        return Lock;
      },
      // eslint-disable-next-line func-names
      set: function (payload) {
        const Lock = payload;
        this.setDataObject({ Lock });
      }
    },

    Lighting: {
      // eslint-disable-next-line func-names
      get: function () {
        const { Lighting } = this.DataObject;
        return Lighting;
      },
      // eslint-disable-next-line func-names
      set: function (payload) {
        const Lighting = payload;
        this.setDataObject({ Lighting });
      }
    },

    checkLightingItem() {
      const ret = [];
      funBtnList.forEach(item => {
        try {
          if (
            item.htmlAttr.type === 'checkbox' &&
            item.htmlAttr.name === 'Lighting'
          ) {
            ret.push(item);
          }
        } catch (e) {
          // console.log(e);
        }
      });
      return ret.length === 1 ? ret[0] : ret;
    },

    checkLockItem() {
      const ret = [];
      funBtnList.forEach(item => {
        try {
          if (
            item.htmlAttr.type === 'checkbox' &&
            item.htmlAttr.name === 'Lock'
          ) {
            ret.push(item);
          }
        } catch (e) {
          // console.log(e);
        }
      });
      return ret.length === 1 ? ret[0] : ret;
    }
  },

  methods: {
    ...mapMutations({
      setDataObject: types.SET_DATA_OBJECT
    }),
    ...mapActions({
      sendCtrl: types.SEND_CTRL
    }),

    hidePopUp(type) {
      this.$set(this.isPopupShow, type, false);
    },

    handleFunc(funItem, index) {
      console.log({ funItem, index });
      const opt = funItem.htmlAttr.name;
      const p = this[opt] || 0;
      this.setDataObject({ [opt]: p });
      const { immediate } = funItem;
      if (immediate) {
        this.sendCtrl({ [opt]: p });
      }
    },

  }
};
</script>
