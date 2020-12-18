<template>
  <gree-notice-bar
    v-show="isShow && warningMsg.length > 0"
    type="activity"
    scrollable
    @click.native="handleClickMachStat"
  >
    <img
      slot="left"
      :src="icon" />
    {{ warningMsg }}
  </gree-notice-bar>
</template>

<script>
import { mapState } from 'vuex';
import { NoticeBar } from 'gree-ui';
import { MODE_SMART_MENU, TipsType, RUN_STAT } from '../../api/828d04/constant';
import commonMethodConfig from '../../mixins/config/828d04/commonMethod';

export default {
  components: {
    [NoticeBar.name]: NoticeBar,
  },

  mixins: [commonMethodConfig],

  data() {
    return {
      icon: require('@/assets/img/waring.png'),
    };
  },

  computed: {
    ...mapState({
      RunStat: state => state.dataObject.RunStat,
      Mod: state => state.dataObject.Mod,
      List1: state => state.dataObject.List1,
      estate3: state => state.dataObject.estate3,
      estate4: state => state.dataObject.estate4,
      estate5: state => state.dataObject.estate5,
      isShrinkOnresize: state => state.isShrinkOnresize
    }),

    isShow() {
      const { isShrinkOnresize, isWarning } = this;
      if (isShrinkOnresize) {
        return false;
      } else if (isWarning) {
        return true;
      }
      return false;
    },

    isWarning() {
      const { estate3, estate4 } = this;
      if (estate3 !== 0 || estate4 !== 0) {
        return true;
      }
      return false;
    },

    warningMsg() {
      const { RunStat, Mod, List1, estate3, estate4, estate5, isSmarMenuBakingModel, isSmarMenuSteamingModel } = this;
      // debugger
      // const isSmarMenuBakingModel = this.isSmarMenuBakingModel();
      // const isSmarMenuSteamingModel = this.isSmarMenuSteamingModel();
      // debugger
      let ret = '';
      if (estate3 !== 0) {
        // 除垢提醒
        // 当到达0次时，智能菜单中的蒸制、蒸汽嫩烤、蒸烤套餐；专业蒸制；辅助功能中的发酵、蒸汽再加热、焯水；清洁功能中的蒸汽辅助清洁无法使用
        if (estate3 & (1 << TipsType.WasteDescaling)) ret += this.$language('error.estate_msg6') + this.$language('error.estate_msg6_template').replace('__REPLACE_NUM__', estate5);
        // 面板开启提醒
        if (estate3 & (1 << TipsType.PanelOpening)) ret += this.$language('error.estate_msg5');
        // 净水箱缺水提醒
        if (estate3 & (1 << TipsType.WaterTankLack)) ret += this.$language('error.estate_msg4');
        // 废水箱水满提醒
        if (estate3 & (1 << TipsType.WasteTankFull)) ret += this.$language('error.estate_msg3');
        // 废水箱取出提醒
        if (estate3 & (1 << TipsType.WasteTankOut)) ret += this.$language('error.estate_msg2');
        // 净水箱取出提醒
        if (estate3 & (1 << TipsType.WaterTankOut)) ret += this.$language('error.estate_msg1');
        // 箱门打开提醒
        if (estate3 & (1 << TipsType.Opening)) ret += this.$language('error.estate_msg0');
      }

      const isStandby = RunStat === RUN_STAT.TurnOff || RunStat === RUN_STAT.TurnOn;
      const hasHighTempEstate3 = isSmarMenuBakingModel && isStandby && estate3 !== 0 && estate3 & (1 << TipsType.HighTemp4SmartMenuBaking);
      const hasHighTempEstate4 = isSmarMenuSteamingModel && isStandby && estate4 !== 0 && estate4 & (1 << TipsType.HighTemp4SmartMenuSteaming);
      if (hasHighTempEstate3) {
        // 高温提示-烘烤位
        ret += this.$language('error.estate_msg7');
      } else if (hasHighTempEstate4) {
        // 高温提示-蒸汽位
        ret += this.$language('error.estate4_msg0');
      }

      if ((estate3 !==0 || estate4 !==0) && ret.length === 0) {
        console.error('estate3/estate4非空，未匹配相关文案。');
      }

      return ret;
    }
  },

  methods: {
    handleClickMachStat() {
      // this.$router.push('/Error');
    }
  }
};
</script>

<style lang="scss" scoped>
.gree-notice-bar.activity {
  transform: translateZ(0);
}
</style>
