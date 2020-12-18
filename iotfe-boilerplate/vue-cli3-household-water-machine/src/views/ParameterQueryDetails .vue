<template>
  <gree-view bgColor="#F4F4F4">
    <!-- 头部 -->
    <gree-header
      :left-options="{preventGoBack: true}"
      @on-click-back="goBack"
      :right-options="{showMore: true}"
      @on-click-more="moreInfo"
    >参数查询</gree-header>
    <gree-page
      no-navbar
      class="page-parameterDetail"
    >
      <!-- 列表 -->
      <gree-list>
        <gree-list-item
          title="环境温度"
          :text="resultChange(EnvironmentTem)"
        >
        </gree-list-item>
        <gree-list-item
          title="吸气温度"
          :text="resultChange(AirInTem)"
        >
        </gree-list-item>
        <gree-list-item
          title="排气温度"
          :text="resultChange(AirOutTem)"
        >
        </gree-list-item>
        <gree-list-item
          title="化霜温度"
          :text="resultChange(DefrostTem)"
        >
        </gree-list-item>
        <gree-list-item
          title="进水温度"
          :text="resultChange(AllInWatTem)"
        >
        </gree-list-item>
        <gree-list-item
          title="出水温度"
          :text="resultChange(AllOutWatTem)"
        >
        </gree-list-item>
        <gree-list-item
          title="防冻温度"
          :text="resultChange(AntifreezeTem)"
        >
        </gree-list-item>

        <!-- <gree-list-item
          title="吸气温度"
          :text="`${resultChange(DefrostTemLo)}℃`"
        >
        </gree-list-item> -->

        <gree-list-item
          title="冷媒侧气管温度"
          :text="resultChange(CodeCoalGasTem)"
        >
        </gree-list-item>
        <gree-list-item
          title="冷媒测液管温度"
          :text="resultChange(CodeCoalLiquidTem)"
        >
        </gree-list-item>
        <gree-list-item
          title="高压温度"
          :text="resultChange(HighPressureTem)"
        >
        </gree-list-item>
      </gree-list>
    </gree-page>

  </gree-view>
</template> 

<script>
import { mapState } from 'vuex';
import { Header, List, Item, Icon } from 'gree-ui';
import { editDevicePlugin } from '../api/utils';

export default {
  components: {
    [Header.name]: Header,
    [List.name]: List,
    [Item.name]: Item,
    [Icon.name]: Icon
  },
  data() {
    return {
      itemStr: '',
      Unit: '℃'
    };
  },
  computed: {
    ...mapState({
      Pow: state => state.dataObject.Pow,
      mac: state => state.mac,
      EnvironmentTem: state => state.dataObject.EnvironmentTem, // 环境温度（高位）
      AirInTem: state => state.dataObject.AirInTem, // 吸气温度（高位）
      AirOutTem: state => state.dataObject.AirOutTem, // 排气温度（高位）
      DefrostTem: state => state.dataObject.DefrostTem, // 化霜温度（高位）
      AllInWatTem: state => state.dataObject.AllInWatTem, // 进水温度（高位）
      AllOutWatTem: state => state.dataObject.AllOutWatTem, // 出水温度（高位）
      AntifreezeTem: state => state.dataObject.AntifreezeTem, // 防冻温度（高位）
      CodeCoalGasTem: state => state.dataObject.CodeCoalGasTem, // 冷媒侧气管温度（高位）
      CodeCoalLiquidTem: state => state.dataObject.CodeCoalLiquidTem, // 冷媒侧液管温度（高位）
      HighPressureTem: state => state.dataObject.HighPressureTem, // 高压温度（高位）
      TemUn: function getTemUn(state) {
        !state.dataObject.TemUn ? (this.Unit = '℃') : (this.Unit = '℉');
        return state.dataObject.TemUn;
      }
    })
  },
  watch: {
    TemUn() {
      !this.TemUn ? (this.Unit = '℃') : (this.Unit = '℉');
    },
    Pow(NewVal) {
      if (!NewVal) {
        this.$router.push({ path: '/' });
      }
    }
  },
  created() {},
  methods: {
    /**
     * @description 返回键
     */
    goBack() {
      this.$router.go(-1);
    },
    /**
     * @description 编辑设备名称
     */
    moreInfo() {
      editDevicePlugin(this.mac);
    },
    resultChange(value) {
      return (value - 1000) / 10 + this.Unit;
    }
  }
};
</script>
