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
      <gree-row
        :class="{
          'function-list': true,
          'invisible-none': isSingleDryMod || isSinglePurifierMod
        }"
      >
        <!-- radio1 -->
        <gree-col
          v-for="(item, index) in radioFuncList1"
          :key="'radio' + index"
          width="25"
          :disabled="item.disabled"
          :class="{
            'active': index === LayerWash,
            'invisible': item.visibility === 'hidden' || isSingleDryMod || isSinglePurifierMod
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
        <!-- TmrOn -->
        <gree-col
          width="25"
          :disabled="checkTmrOnItem.disabled"
          :class="{
            'active': TmrOn === 1,
          }"
        >
          <gree-check
            @click.native="handleTmrOnFunc(checkTmrOnItem, 0)"
            v-model="TmrOn"
            :name="checkTmrOnItem.htmlAttr.value"
          >
            <gree-image
              :src="checkTmrOnItem.normalIconSrc"
              radius="radius"
            ></gree-image>
          </gree-check>
          <div class="name">{{ checkTmrOnItem.name }}</div>
        </gree-col>
        <!-- Lock -->
        <gree-col
          width="25"
          :class="{
            'active': Lock === 1,
          }"
        >
          <gree-check
            @click.native="handleFunc(checkLockItem, 0)"
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
        >
          <gree-check
            @click.native="handleFunc(checkLightingItem, 0)"
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
import { debounce } from '../../utils/index';

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
      funBtnList,
      radioFuncList1: [],
      checkDryFuncList: [],
      checkLightingItem: {
        htmlAttr: {
          value: 0
        }
      },
      checkPurifierItem: {
        htmlAttr: {
          value: 0
        }
      },
      checkTmrOnItem: {
        htmlAttr: {
          value: 0
        }
      },
      checkDisinfectItem: {
        htmlAttr: {
          value: 0
        },
        userData: {}
      },
      checkLockItem: {
        htmlAttr: {
          value: 0
        }
      },
    };
  },

  computed: {
    ...mapGetters(['hasLighting']),
    ...mapState({
      DataObject: state => state.DataObject,
      Mod: state => state.DataObject.Mod,
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
    }
  },

  watch: {
    Mod() {
      this.debounceModChange();
    },
    Dry() {
      this.debounceModChange();
    },
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
      const { Dry } = this;
      if (Dry === 3) {
        console.log('玻璃洗没有加强烘干');
        this.setDataObject({ Dry: 0 });
      }
    },
    isSelfCleaning() {
      const LayerWash = 0;
      const Purifier = 0;
      this.LayerWash = LayerWash;
      this.Purifier = Purifier;
      this.setDataObject({ LayerWash, Purifier });
    }
  },

  created() {
    this.debounceModChange = debounce(() => {
      this.initRadioFuncList1();
      this.initCheckDryFuncList();
      this.initCheckLightingItem();
      this.initCheckPurifierItem();
      this.initCheckTmrOnItem();
      this.initCheckDisinfectItem();
      this.initCheckLockItem();
    }, 300);
  },

  mounted() {
    console.log('==== mounted ====');
    this.initRadioFuncList1();
    this.initCheckDryFuncList();
    this.initCheckLightingItem();
    this.initCheckPurifierItem();
    this.initCheckTmrOnItem();
    this.initCheckDisinfectItem();
    this.initCheckLockItem();
  },

  methods: {
    ...mapMutations({
      setDataObject: types.SET_DATA_OBJECT
    }),
    ...mapActions({
      sendCtrl: types.SEND_CTRL
    }),

    initRadioFuncList1() {
      const ret = [];
      this.funBtnList.forEach(item => {
        try {
          if (
            item.htmlAttr.type === 'radio' &&
            item.htmlAttr.name === 'LayerWash'
          ) {
            ret.push(item);
          }
        } catch (e) {
          console.log(e);
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
      this.radioFuncList1 = ret;
    },

    initCheckDryFuncList() {
      const ret = [];
      this.funBtnList.forEach(item => {
        try {
          if (
            item.htmlAttr.type === 'checkbox' &&
            item.htmlAttr.name === 'Dry'
          ) {
            ret.push(item);
          }
        } catch (e) {
          console.log(e);
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
      this.checkDryFuncList = ret;
    },

    initCheckLightingItem() {
      const ret = [];
      this.funBtnList.forEach(item => {
        try {
          if (
            item.htmlAttr.type === 'checkbox' &&
            item.htmlAttr.name === 'Lighting'
          ) {
            ret.push(item);
          }
        } catch (e) {
          console.log(e);
        }
      });
      this.checkLightingItem = ret.length === 1 ? ret[0] : ret;
    },

    initCheckPurifierItem() {
      const ret = [];
      this.funBtnList.forEach(item => {
        try {
          if (
            item.htmlAttr.type === 'checkbox' &&
            item.htmlAttr.name === 'Purifier'
          ) {
            ret.push(item);
          }
        } catch (e) {
          console.log(e);
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
      this.checkPurifierItem = ret.length === 1 ? ret[0] : ret;
    },

    initCheckTmrOnItem() {
      const ret = [];
      this.funBtnList.forEach(item => {
        try {
          if (
            item.htmlAttr.type === 'checkbox' &&
            item.htmlAttr.name === 'TmrOn'
          ) {
            ret.push(item);
          }
        } catch (e) {
          console.log(e);
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
      this.checkTmrOnItem = ret.length === 1 ? ret[0] : ret;
    },

    initCheckDisinfectItem() {
      const ret = [];
      this.funBtnList.forEach(item => {
        try {
          if (
            item.htmlAttr.type === 'checkbox' &&
            item.htmlAttr.name === 'Disinfect'
          ) {
            ret.push(item);
          }
        } catch (e) {
          console.log(e);
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
      this.checkDisinfectItem = ret.length === 1 ? ret[0] : ret;
    },

    initCheckLockItem() {
      const ret = [];
      this.funBtnList.forEach(item => {
        try {
          if (
            item.htmlAttr.type === 'checkbox' &&
            item.htmlAttr.name === 'Lock'
          ) {
            ret.push(item);
          }
        } catch (e) {
          console.log(e);
        }
      });
      this.checkLockItem = ret.length === 1 ? ret[0] : ret;
    },

    hidePopUp(type) {
      this.$set(this.isPopupShow, type, false);
    },

    handleFunc(funItem, index) {
      console.log({ funItem, index });
      const opt = funItem.htmlAttr.name;
      const { immediate, command } = funItem;
      const p = this[opt] || 0;
      this.setDataObject({ [opt]: p });
      if (immediate) {
        const cmd = { [opt]: p };
        this.sendCtrl({ ...cmd, ...command });
      }
      if (command !== undefined) {
        const data = JSON.parse(JSON.stringify(command));
        this.setDataObject(data);
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
