<template>
  <gree-popup
    v-model="isPopupShow.bottom"
    position="bottom"
  >
    <div class="popup-bottom">
      <gree-row>
        <gree-col
          v-for="(item, index) in FootFuncList"
          :key="index"
          width="25"
          :disabled="item.Disabled"
          :class="{'is-checked': index === checkedIndex}"
          @click.native="handleFunc(item, index)"
        >
          <div class="circle">
            <i
              class="iconfont icon-font"
              :class="item.iconfont"
            ></i>
          </div>
          <h3>{{ item.label }}</h3>
        </gree-col>
      </gree-row>
      <gree-block>
        <gree-row>
          <gree-button
            round
            @click="cancel"
          >{{ $language('home.cancel') }}</gree-button>
          <gree-button
            round
            @click="confirm"
          >{{ $language('home.confirm') }}</gree-button>
        </gree-row>
      </gree-block>
    </div>
  </gree-popup>
</template>

<script>
import { Popup, Block, Row, Col, Dialog, Button } from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import * as types from '@/store/types';
import {
  ProfessionalBakingFootFuncList,
  IntelligentFootFuncList,
  AuxiliaryFunctionList
} from '@/api/828d04/FootFuncListData';
import {
  MODE_BAKING,
  MODE_STEAMING,
  MODE_SMART_MENU,
  MODE_NETWORK_MODE,
  MODE_HELPER,
  MODE_CLEAN,
  LIST1_SMART_MENU_CLOUD,
  RUN_STAT
} from '@/api/828d04/constant';

export default {
  components: {
    [Popup.name]: Popup,
    [Block.name]: Block,
    [Row.name]: Row,
    [Col.name]: Col,
    [Dialog.name]: Dialog,
    [Button.name]: Button
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
      checkedIndex: 0
    };
  },
  computed: {
    ...mapState({
      cacheMod: state => state.dataObjectCache.Mod,
      mac: state => state.mac,
      Mod: state => state.dataObject.Mod,
      List1: state => state.dataObject.List1,
      cacheList1: state => state.dataObjectCache.List1,
      cacheMod: state => state.dataObjectCache.Mod,
      RunStat: state => state.dataObject.RunStat
    }),
    FootFuncList() {
      const { Mod, List1, cacheMod } = this;
      const isCloudMenu = Mod === MODE_NETWORK_MODE
        || (Mod === MODE_SMART_MENU && List1 === LIST1_SMART_MENU_CLOUD);
      let ret = [];
      if (Mod === MODE_SMART_MENU) {
        ret = IntelligentFootFuncList;
      } else if (Mod === MODE_BAKING) {
        ret = ProfessionalBakingFootFuncList;
      } else if (Mod === MODE_STEAMING) {
        ret = [];
      } else if (Mod === MODE_HELPER) {
        ret = AuxiliaryFunctionList;
      } else if (isCloudMenu) {
        ret = IntelligentFootFuncList;
      }
      return ret;
    }
  },

  watch: {
    List1: {
      handler(newV) {
        this.checkedIndex = newV;
      },
      immediate: true
    }
  },

  mounted() {},

  destroyed() {
    Dialog.closeAll();
  },

  methods: {
    ...mapMutations({
      setDataObject: types.SET_DATA_OBJECT,
      setList1: types.SET_LIST1,
      setIsFunctionListPopupShow: types.IS_FUNCTION_LIST_POPUP_SHOW
    }),
    cancel() {
      this.setIsFunctionListPopupShow({ bottom: false });
      const List1 = this.cacheList1;
      this.setList1(List1);
      this.checkedIndex = List1;
    },
    confirm() {
      this.setIsFunctionListPopupShow({ bottom: false });
      this.setList1(this.checkedIndex);
    },
    /**
     * @description 功能触发事件
     */
    handleFunc(item, index) {
      const { List1 } = this;
      this.checkedIndex = index;
      this.setList1(item.List1Value);
      console.log({ List1 });
    }
  }
};
</script>
