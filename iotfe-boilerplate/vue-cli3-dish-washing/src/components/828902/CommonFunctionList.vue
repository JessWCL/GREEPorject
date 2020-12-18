<template>
  <gree-row class="function-list">
    <!-- radio1 -->
    <gree-col
      v-for="(item, index) in radioFuncList1"
      :key="'radio' + index"
      width="25"
      :disabled="item.disabled"
      :class="{
        'active': index === LayerWash,
        'invisible': item.visibility === 'hidden'
      }"
    >
      <gree-radio
        @click.native="handleFunc(item, index)"
        v-model="LayerWash"
        :name="item.htmlAttr.value"
      >
        <gree-image
          :src="item.normalIconSrc"
          radius="radius"
        ></gree-image>
      </gree-radio>
      <div class="name">{{ item.name }}</div>
    </gree-col>
    <!-- check1 -->
    <gree-col
      v-for="(item, dIndex) in checkDryFuncList"
      :key="'check' + dIndex"
      width="25"
      :disabled="item.disabled"
      :class="{
        'active': (dIndex + 1) === Dry,
        'invisible': item.visibility === 'hidden'
      }"
    >
      <gree-check
        @click.native="handleFunc(item, dIndex)"
        v-model="Dry"
        :name="item.htmlAttr.value"
      >
        <gree-image
          :src="item.normalIconSrc"
          radius="radius"
        ></gree-image>
      </gree-check>
      <div class="name">{{ item.name }}</div>
    </gree-col>
    <!-- Purifier -->
    <gree-col
      width="25"
      :disabled="checkPurifierItem.disabled"
      :class="{
        'active': Purifier === 1,
      }"
    >
      <gree-check
        @click.native="handleFunc(checkPurifierItem, 0)"
        v-model="Purifier"
        :name="checkPurifierItem.htmlAttr.value"
      >
        <gree-image
          :src="checkPurifierItem.normalIconSrc"
          radius="radius"
        ></gree-image>
      </gree-check>
      <div
        class="name"
        @click="handlePurifierDetial(checkPurifierItem, 0)"
      >
        {{ checkPurifierItem.name }}
        <span></span>
      </div>
    </gree-col>
    <!-- Disinfect -->
    <gree-col
      width="25"
      :disabled="checkDisinfectItem.disabled"
      :class="{
        'hidden': checkDisinfectItem.userData.hidden,
        'active': Disinfect === 1,
      }"
    >
      <gree-check
        @click.native="handleFunc(checkDisinfectItem, 0)"
        v-model="Disinfect"
        :name="checkDisinfectItem.htmlAttr.value"
      >
        <gree-image
          :src="checkDisinfectItem.normalIconSrc"
          radius="radius"
        ></gree-image>
      </gree-check>
      <div class="name">{{ checkDisinfectItem.name }}</div>
    </gree-col>
  </gree-row>
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
import { mapActions, mapMutations, mapState } from 'vuex';
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
    ...mapState({
      DataObject: state => state.DataObject,
    }),
    LayerWash: {
      // eslint-disable-next-line func-names
      get: function () {
        const { LayerWash } = this.DataObject;
        return LayerWash;
      },
      // eslint-disable-next-line func-names
      set: function (payload) {
        const LayerWash = payload;
        this.setDataObject({ LayerWash });
      }
    },
    Dry: {
      // eslint-disable-next-line func-names
      get: function () {
        const { Dry } = this.DataObject;
        return Dry;
      },
      // eslint-disable-next-line func-names
      set: function (payload) {
        const Dry = payload;
        this.setDataObject({ Dry });
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
    Disinfect: {
      // eslint-disable-next-line func-names
      get: function () {
        const { Disinfect } = this.DataObject;
        return Disinfect;
      },
      // eslint-disable-next-line func-names
      set: function (payload) {
        const Disinfect = payload;
        this.setDataObject({ Disinfect });
      }
    },
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
    Purifier: {
      // eslint-disable-next-line func-names
      get: function () {
        const { Purifier } = this.DataObject;
        return Purifier;
      },
      // eslint-disable-next-line func-names
      set: function (payload) {
        const Purifier = payload || 0;
        this.setDataObject({ Purifier });
      }
    },
    TmrOn: {
      // eslint-disable-next-line func-names
      get: function () {
        const { TmrOn } = this.DataObject;
        return TmrOn;
      },
      // eslint-disable-next-line func-names
      set: function () {
      }
    },

    isQuickWash() {
      const { Mod } = this.DataObject;
      const isQuickWash = Mod === 4;
      return isQuickWash;
    },

    isGlassWash() {
      const { Mod } = this.DataObject;
      const isGlassWash = Mod === 5;
      return isGlassWash;
    },

    isSelfCleaning() {
      const { Mod } = this.DataObject;
      const isSelfCleaning = Mod === 7;
      return isSelfCleaning;
    },

    isSingleDryMod() {
      const { Mod } = this.DataObject;
      const isSingleDryMod = Mod === 0;
      return isSingleDryMod;
    },

    isSinglePurifierMod() {
      const { Mod, Dry } = this.DataObject;
      const isSinglePurifierMod = Mod === 0 && Dry === 0;
      return isSinglePurifierMod;
    },

    FootFuncList() {
      return funBtnList;
    },
    radioFuncList1() {
      const ret = [];
      funBtnList.forEach(item => {
        try {
          if (
            item.htmlAttr.type === 'radio' &&
            item.htmlAttr.name === 'LayerWash'
          ) {
            ret.push(item);
          }
        } catch (e) {
          // console.log(e);
        }
      });
      ret.forEach((element, index) => {
        const item = element;
        if (
          (this.isQuickWash ||
            this.isSelfCleaning ||
            this.isSingleDryMod ||
            this.isSinglePurifierMod) &&
          (index === 1 || index === 2)
        ) {
          item.disabled = true;
        } else {
          item.disabled = false;
        }
      });
      return ret;
    },
    checkDryFuncList() {
      const ret = [];
      funBtnList.forEach(item => {
        try {
          if (
            item.htmlAttr.type === 'checkbox' &&
            item.htmlAttr.name === 'Dry'
          ) {
            ret.push(item);
          }
        } catch (e) {
          // console.log(e);
        }
      });
      ret.forEach((element, index) => {
        const item = element;
        if (
          (this.isGlassWash && index === 2) ||
          this.isSingleDryMod || this.isSinglePurifierMod
        ) {
          item.disabled = true;
        } else {
          item.disabled = false;
        }
      });
      return ret;
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
    checkPurifierItem() {
      const ret = [];
      funBtnList.forEach(item => {
        try {
          if (
            item.htmlAttr.type === 'checkbox' &&
            item.htmlAttr.name === 'Purifier'
          ) {
            ret.push(item);
          }
        } catch (e) {
          // console.log(e);
        }
      });
      ret.forEach((element, index) => {
        const item = element;
        if (
          (this.isSelfCleaning ||
            this.isSingleDryMod ||
            this.isSinglePurifierMod) &&
          index === 0
        ) {
          item.disabled = true;
        } else {
          item.disabled = false;
        }
      });
      return ret.length === 1 ? ret[0] : ret;
    },
    checkTmrOnItem() {
      const ret = [];
      funBtnList.forEach(item => {
        try {
          if (
            item.htmlAttr.type === 'checkbox' &&
            item.htmlAttr.name === 'TmrOn'
          ) {
            ret.push(item);
          }
        } catch (e) {
          // console.log(e);
        }
      });
      ret.forEach((element, index) => {
        const item = element;
        if ((this.isSelfCleaning || this.isSinglePurifierMod) && index === 0) {
          item.disabled = true;
        } else {
          item.disabled = false;
        }
      });
      return ret.length === 1 ? ret[0] : ret;
    },
    checkDisinfectItem() {
      const ret = [];
      funBtnList.forEach(item => {
        try {
          if (
            item.htmlAttr.type === 'checkbox' &&
            item.htmlAttr.name === 'Disinfect'
          ) {
            ret.push(item);
          }
        } catch (e) {
          // console.log(e);
        }
      });
      ret.forEach((element, index) => {
        const item = element;
        if (this.isQuickWash && index === 0) {
          item.disabled = true;
        } else {
          item.disabled = false;
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

  watch: {
    isQuickWash() {
      const LayerWash = 0;
      const Disinfect = 0;
      this.LayerWash = LayerWash;
      this.Disinfect = Disinfect;
      this.setDataObject({ LayerWash, Disinfect });
    },
    isSingleDryMod() {
      const LayerWash = 0;
      this.LayerWash = LayerWash;
      this.setDataObject({ LayerWash });
    },
    isGlassWash() {
      const Dry = 0;
      this.Dry = Dry;
      this.setDataObject({ Dry });
    },
    isSelfCleaning() {
      const LayerWash = 0;
      const Purifier = 0;
      this.LayerWash = LayerWash;
      this.Purifier = Purifier;
      this.setDataObject({ LayerWash, Purifier });
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

    handleTmrOnFunc() {
      this.$router.push('/Appointment');
    },

    handlePurifierDetial() {
      this.$router.push('/Purifier');
    },

    handleCheckboxFunc(funItem, index) {
      console.log({ funItem, index });
    }
  }
};
</script>
