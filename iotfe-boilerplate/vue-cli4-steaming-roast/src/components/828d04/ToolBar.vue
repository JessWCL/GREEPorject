<template>
  <gree-toolbar
    v-show="isShowToolbar"
    position="bottom"
    no-hairline
    :class="{
      'turn-off': !Pow
    }"
  >
    <gree-row>
      <gree-col
        v-for="(item, index) in FootList"
        :key="index"
        :class="{hidden: !item.isShowFuncBtn, disabled: item.isDisabled}"
        @click.native="setFunction(index)"
      >
        <div class="icon">
          <img :src="require('@/assets/img/' + item.ImgName + '.png')" />
        </div>
        <h3>{{ $language(item.Name) }}</h3>
      </gree-col>
    </gree-row>
  </gree-toolbar>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import {
  Row,
  Col,
  ToolBar
} from 'gree-ui';
import {
  POW,
  RUN_STAT,
  MODE_CLEAN,
  LIGHT_BAR_COLOR,
  DARK_BAR_COLOR,
} from '@/api/828d04/constant';
import debounce from 'lodash/debounce';
import * as types from '@/store/types';
import homeConfig from '@/mixins/config/828d04/home';
import commonMethodConfig from '@/mixins/config/828d04/commonMethod';
import { changeBarColor } from '../../../../static/lib/PluginInterface.promise';

export default {
  name: 'ToolBar',
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [ToolBar.name]: ToolBar,
  },
  mixins: [homeConfig, commonMethodConfig],

  computed: {
    ...mapState({
      cacheMod: state => state.dataObjectCache.Mod,
      cacheRunStat: state => state.dataObjectCache.RunStat,
      Pow: state => state.dataObject.Pow,
      Mod: state => state.dataObject.Mod,
      List1: state => state.dataObject.List1,
      RunStat: state => state.dataObject.RunStat,
      isShrinkOnresize: state => state.isShrinkOnresize,
    }),

    showPowerOff() {
      return Boolean(!this.Pow);
    },

    isShowToolbar() {
      let ret = false;
      const isSearching = this.isShrinkOnresize === true;
      const isShow = this.Pow === 0 || !this.isWorking;
      if (isSearching) {
        ret = false;
      } else if (isShow) {
        ret = true;
      }
      return ret;
    },

    isWorking() {
      const { cacheMod, cacheRunStat, RunStat } = this;

      const isClean = cacheMod === MODE_CLEAN;
      // 清洁模式是否工作
      const isCleanWorking = cacheRunStat === RUN_STAT.Appointment || cacheRunStat === RUN_STAT.Working;
      // 正常模式是否工作
      const isWorking = RunStat === RUN_STAT.Appointment || RunStat === RUN_STAT.Working;

      let ret = false;
      if (isCleanWorking && isClean) {
        ret = false;
      } else if (isWorking) {
        ret = true;
      }
      return ret;
    },

  },

  created() {
    // this.$set(this.isPopupShow, 'bottom', false);
    this.setIsFunctionListPopupShow({ bottom: false });

    this.debounceTrunOn = debounce(() => {
      this.turnOn();
    }, 300);
    this.debounceTrunOff = debounce(() => {
      this.turnOff();
    }, 300);
  },

  methods: {
    ...mapMutations({
      setDataObjectCache: types.SET_DATA_OBJECT_CACHE,
      setDataObject: types.SET_DATA_OBJECT,
      setIsFunctionListPopupShow: types.IS_FUNCTION_LIST_POPUP_SHOW
    }),
    ...mapActions({
      sendCtrl: types.SEND_CTRL,
    }),

    /**
     * @description 点击底部功能列表
     */
    setFunction(val) {
      const { cacheMod, cacheRunStat, List1 } = this;
      const isClean = cacheMod === MODE_CLEAN;
      const isWorking = cacheRunStat === RUN_STAT.Appointment || cacheRunStat === RUN_STAT.Working;
      switch (val) {
        case 0:
          if (isWorking && isClean) {
            this.handleCleanMod();
          } else {
            this.Pow === 1 ? this.debounceTrunOff() : this.debounceTrunOn();
          }
          break;
        case 1:
          this.selAdvanced = true;
          this.setDataObjectCache({ List1 })
          // this.$set(this.isPopupShow, 'bottom', true);
          this.setIsFunctionListPopupShow({ bottom: true });
          break;
        case 2:
          if (isWorking && isClean) {
            this.handleCleanMod();
          } else {
            this.$router.push('Appointment');
          }
          break;
        default:
          break;
      }
    },

    turnOn() {
      const Pow = POW.TurnOn;
      const RunStat = RUN_STAT.TurnOn;
      this.sendCtrl({ Pow, RunStat });
      this.setDataObject({ Pow, RunStat });
      changeBarColor(LIGHT_BAR_COLOR);
    },

    turnOff() {
      const Pow = POW.TurnOff;
      const RunStat = RUN_STAT.TurnOff;
      this.sendCtrl({ Pow, RunStat });
      this.setDataObject({ Pow, RunStat });
      changeBarColor(DARK_BAR_COLOR);
    }

  },
};
</script>
