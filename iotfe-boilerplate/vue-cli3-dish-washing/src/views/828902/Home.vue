<template>
  <gree-view class="home">
    <gree-header
      :theme="headerTheme"
      :left-options="{ preventGoBack: true }"
      :right-options="{ showMore: true }"
      @on-click-back="clickBack"
      @on-click-more="moreInfo"
    >{{ deviceName }}</gree-header>
    <gree-page>
      <gree-tab-bar
        :value="modType"
        :items="tabbarList"
        :has-ink="false"
        @change="handleTabBarChange"
        :class="{
          yellow: modType === 1,
          blue: modType === 0 || modType === 2,
        }"
      ></gree-tab-bar>

      <keep-alive>
        <!-- 正常模式 -->
        <normal-mod v-if="modType === 0"></normal-mod>
        <!-- 单烘干 -->
        <single-dry-mod v-if="modType === 1"></single-dry-mod>
        <!-- 单保洁 -->
        <single-purifier-mod v-if="modType === 2"></single-purifier-mod>
      </keep-alive>

    </gree-page>
    <!-- 菜单按钮 -->
    <gree-tool-bar v-if="!isWorking" @click="toolbarClick"></gree-tool-bar>
    <!-- 功能按钮 -->
    <function-list :is-popup-show="isFuncPopupShow"></function-list>
    <!-- 模式按钮 -->
    <gree-mod-list :is-popup-show="isPopupShow"></gree-mod-list>

    <!-- 工作中 - 菜单按钮 -->
    <gree-working-tool-bar v-if="isWorking" @click="openWorkingFunction"></gree-working-tool-bar>
    <!-- 工作中 - 功能按钮 -->
    <gree-working-function-list :is-popup-show="isWorkingPopupShow"></gree-working-function-list>
  </gree-view>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex';
import {
  TabBar,
  Header,
  Image,
  Block,
  Button,
  PowerOff,
  CanvasGauge
} from 'gree-ui';
import GreeToolBar from '@/components/828902/ToolBar';
import GreeWorkingToolBar from '@/components/828902/WorkingToolBar';
import FunctionSmallList from '@/components/828902/FunctionSmallList';
import FunctionList from '@/components/828902/FunctionList';
import GreeWorkingFunctionList from '@/components/828902/WorkingFunctionList';
import GreeModList from '@/components/828902/ModList';
import Working from '@/components/828902/Working';
import NormalMod from '@/components/828902/NormalMod';
import SingleDryMod from '@/components/828902/SingleDryMod';
import SinglePurifierMod from '@/components/828902/SinglePurifierMod';
import * as types from '@/store/types';
import TabbarList from '@/api/828902/tabbarList';
import {
  closePage,
  editDevice
} from '../../../../static/lib/PluginInterface.promise.js';
import { __PROD__, __TEST__ } from '../../api/constant';

export default {
  components: {
    [Header.name]: Header,
    [TabBar.name]: TabBar,
    [Image.name]: Image,
    [Block.name]: Block,
    [Button.name]: Button,
    [PowerOff.name]: PowerOff,
    [CanvasGauge.name]: CanvasGauge,
    NormalMod,
    SingleDryMod,
    SinglePurifierMod,
    FunctionList,
    GreeWorkingFunctionList,
    GreeToolBar,
    GreeWorkingToolBar,
    GreeModList,
    FunctionSmallList,
    Working
  },

  data() {
    return {
      isPopupShow: { bottom: false },
      isNormalModPopupShow: { bottom: false },
      isSingleDryModPopupShow: { bottom: false },
      isSinglePurifierModPopupShow: { bottom: false },
      isModPopupShow: { bottom: false },
      isWorkingPopupShow: { bottom: false },
      isFuncPopupShow: { bottom: false }
    };
  },

  computed: {
    ...mapState({
      deviceName: state => state.deviceInfo.name,
      mac: state => state.mac,
      cache: state => state.cache,
      normalModIndex: state => state.cache.normalModIndex,
      singleDryModIndex: state => state.cache.singleDryModIndex,
      singlePurifierModIndex: state => state.cache.singlePurifierModIndex,
      DataObject: state => state.DataObject,
      Pow: state => state.DataObject.Pow,
      Wash: state => state.DataObject.Wash,
      TmrOn: state => state.DataObject.TmrOn,
      Mod: state => state.DataObject.Mod,
      Dry: state => state.DataObject.Dry
    }),

    modType: {
      // eslint-disable-next-line func-names
      get: function () {
        const { modType } = this.cache;
        return modType;
      },
      // eslint-disable-next-line func-names
      set: function (newV) {
        const modType = newV;
        this.setCache({ modType });
      }
    },

    headerTheme() {
      const { Pow } = this;
      const { deviceState } = this;
      const isOffline = deviceState === -1 || this.$route.name === 'Offline';
      let ret = '';
      if (isOffline || !Pow) {
        ret = 'transparent';
      }
      return ret;
    },

    isWorking() {
      const { Wash, TmrOn } = this;
      return Wash === 1 || TmrOn === 1;
    },

    tabbarList() {
      const disabled = this.isWorking;
      TabbarList.forEach(element => {
        const item = element;
        item.disabled = disabled;
      });
      const ret = TabbarList;
      return ret;
    }
  },

  watch: {

    modType(newV) {
      if (newV === 1) {
        this.setDataObject({ Mod: 0 });
      } else if (newV === 2) {
        this.setDataObject({ Mod: 0, Dry: 0 });
      }
    },

    Wash: {
      immediate: true,
      handler(newV) {
        const Wash = newV;
        const { Mod, Dry, Purifier, TmrOn } = this.DataObject;
        const isWorking = Wash === 1 || TmrOn === 1;
        const isWashTabbar = Mod !== 0;
        const isDryTabbar = Mod === 0 && Dry !== 0;
        const isPurifierTabbar = Mod === 0 && Dry === 0 && Purifier !== 0;

        if (isWorking) {
          this.isPopupShow.bottom = false;
          this.isFuncPopupShow.bottom = false;
          if (isWashTabbar) {
            this.setCache({ modType: 0 });
          } else if (isDryTabbar) {
            this.setCache({ modType: 1 });
          } else if (isPurifierTabbar) {
            this.setCache({ modType: 2 });
          }
        }
      }
    }

  },

  mounted() {
    const { Mod, Dry, Purifier } = this.DataObject;
    const isWashTabbar = Mod !== 0;
    const isDryTabbar = Mod === 0 && Dry !== 0;
    const isPurifierTabbar = Mod === 0 && Dry === 0 && Purifier !== 0;
    let modType = 0;
    if (isWashTabbar) {
      modType = 0;
    } else if (isDryTabbar) {
      modType = 1;
    } else if (isPurifierTabbar) {
      modType = 2;
    }
    this.setCache({ modType });
  },

  methods: {
    ...mapMutations({
      setDataObject: types.SET_DATA_OBJECT,
      setCache: types.SET_CACHE,
    }),
    ...mapActions({
      sendCtrl: types.SEND_CTRL,
    }),

    /**
     * @description 返回键
     */
    clickBack() {
      if (this.$route.name === 'Home' || this.$route.name === 'Offline') {
        (__PROD__ || __TEST__) && closePage();
      } else {
        this.$router.back();
      }
    },

    moreInfo() {
      editDevice(this.mac);
    },

    handleTabBarChange(tabBarItem) {
      const { name: modType } = tabBarItem;
      this.setCache({ modType });
    },

    openWorkingFunction(footerItem, index) {
      console.log({ footerItem, index });
      if (index === 2) {
        this.isWorkingPopupShow.bottom = !this.isWorkingPopupShow.bottom;
      }
    },

    toolbarClick(footerItem, index) {
      console.log(footerItem, index);
      if (index === 0) {
        const Pow = this.Pow === 1 ? 0 : 1;
        console.log({ Pow });
        this.setDataObject({ Pow });
        this.sendCtrl({ Pow });
      } else if (index === 1) {
        if (this.Pow === 0) return;
        this.isPopupShow.bottom = !this.isPopupShow.bottom;
      } else if (index === 2) {
        if (this.Pow === 0) return;
        this.isFuncPopupShow.bottom = !this.isFuncPopupShow.bottom;
      }
    }
  }
};
</script>

<style scoped>
</style>
