<template>
  <gree-view bg-color="#F4F5F5">
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
          title="内机运行模式"
          :text="OxChangeBinary(5) == -98 ? '制热': '制冷'"
        >
        </gree-list-item>
        <gree-list-item
          title="空调辅助电加热"
          :text="OxChangeBinary(93) === 0 ? '关': '开'"
        >
        </gree-list-item>
        <gree-list-item
          title="进水温度"
          :text="`${OxChangeBinary(35)}℃`"
        >
        </gree-list-item>
        <gree-list-item
          title="出水温度"
          :text="`${OxChangeBinary(34)}℃`"
        >
        </gree-list-item>
        <gree-list-item
          title="入管温度"
          :text="`${OxChangeBinary(36)}℃`"
        >
        </gree-list-item>
        <gree-list-item
          title="室外环境温度"
          :text="`${OxChangeBinary(44)}℃`"
        >
        </gree-list-item>
        <gree-list-item
          title="排气温度1"
          :text="`${OxChangeBinary(47)}℃`"
        >
        </gree-list-item>
        <gree-list-item
          title="排气温度2"
          :text="`${OxChangeBinary(48)}℃`"
        >
        </gree-list-item>

        <gree-list-item
          title="吸气温度"
          :text="`${OxChangeBinary(52)}℃`"
        >
        </gree-list-item>

        <gree-list-item
          title="闪蒸器温度"
          :text="`${OxChangeBinary(54)}℃`"
        >
        </gree-list-item>
        <gree-list-item
          title="补气温度1"
          :text="`${OxChangeBinary(45)}℃`"
        >
        </gree-list-item>
        <gree-list-item
          title="补气温度2"
          :text="`${OxChangeBinary(46)}℃`"
        >
        </gree-list-item>
        <gree-list-item
          title="除霜温度"
          :text="`${OxChangeBinary(53)}℃`"
        >
        </gree-list-item>
        <gree-list-item
          title="防冻温度"
          :text="`${OxChangeBinary(37)}℃`"
        >
        </gree-list-item>

        <gree-list-item
          title="手操器感温包温度"
          :text="`${OxChangeBinary(43)}℃`"
        >
        </gree-list-item>
        <gree-list-item
          title="中压温度"
          :text="`${OxChangeBinaryTem(50)}℃`"
        >
        </gree-list-item>
        <gree-list-item
          title="低压温度"
          :text="`${OxChangeBinaryTem(49)}℃`"
        >
        </gree-list-item>
        <gree-list-item
          title="高压温度"
          :text="`${OxChangeBinaryTem(51)}℃`"
        >
        </gree-list-item>
        <gree-list-item
          title="压缩机1频率"
          :text="`${OxChangeBinary(61)}Hz`"
        >
        </gree-list-item>

        <gree-list-item
          title="压缩机2频率"
          :text="`${OxChangeBinary(62)}Hz`"
        >
        </gree-list-item>
        <gree-list-item
          title="电子膨胀阀1开度"
          :text="`${OxChangeBinary(76)}`"
        >
        </gree-list-item>
        <gree-list-item
          title="电子膨胀阀2开度"
          :text="`${OxChangeBinary(78)}`"
        >
        </gree-list-item>
        <gree-list-item
          title="电子膨胀阀3开度"
          text="预留"
        >
        </gree-list-item>
        <gree-list-item
          title="电子膨胀阀4开度"
          text="预留"
        >
        </gree-list-item>
        <gree-list-item
          title="变频水泵运行频率"
          :text="`${OxChangeBinary(69)}Hz`"
        >
        </gree-list-item>
        <gree-list-item
          title="风机1转速"
          :text="`${OxChangeBinary(72)}`"
        >
        </gree-list-item>
        <gree-list-item
          title="风机2转速"
          :text="`${OxChangeBinary(74)}`"
        >
        </gree-list-item>
        <gree-list-item
          title="制冷进水设定温度"
          :text="`${OxChangeBinary(6)}℃`"
        >
        </gree-list-item>
        <gree-list-item
          title="制热进水设定温度"
          :text="`${OxChangeBinary(7)}℃`"
        >
        </gree-list-item>
        <gree-list-item
          title="制冷房间设定温度"
          :text="`${OxChangeBinary(9)}℃`"
        >
        </gree-list-item>
        <gree-list-item
          title="制热房间设定温度"
          :text="`${OxChangeBinary(10)}℃`"
        >
        </gree-list-item>
      </gree-list>
    </gree-page>

  </gree-view>
</template> 

<script>
import { Header, List, Item, Icon } from 'gree-ui';
import { editDevicePlugin, changeBarColorPlugin } from '../api/utils';
import { mapState } from 'vuex';

export default {
  components: {
    [Header.name]: Header,
    [List.name]: List,
    [Item.name]: Item,
    [Icon.name]: Icon,
  },
  data() {
    return {
      itemStr: '',
    };
  },
  computed:
  {
    ...mapState({
      Mod: state => state.dataObject.Mod,
      as1: state => state.dataObject.as1,
      as2: state => state.dataObject.as2,
      as3: state => state.dataObject.as3,
      mac: state => state.mac,
    }),
  },
  created() {
    const asIndex = this.$route.params.asIndex;
    const arrIndex = this.$route.params.arrIndex;
    this.itemStr = this[`as${asIndex}`][arrIndex];
    console.log(asIndex, arrIndex, this.itemStr);
  },
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
    /**
     * @description 字符串16进制转10进制
     * @params data 该数据说代表的位
     */
    OxChangeBinary(data) {
      const spe = [63, 72, 74, 76, 78];
      const hz = [61, 62, 69];
      let num = -1;
      try {
        if (spe.indexOf(data) === -1) {
          const value = this.itemStr.substr(data * 2, 2);
          num = Number(parseInt(value[0], 16).toString(10)) * 16 + Number(parseInt(value[1], 16).toString(10));
        } else {
          const value1 = this.itemStr.substr(data * 2, 4);
          num = Number(parseInt(value1[0], 16).toString(10)) * 16 + Number(parseInt(value1[1], 16).toString(10)) + Number(parseInt(value1[2], 16).toString(10)) * 4096 + Number(parseInt(value1[3], 16).toString(10) * 256);
        }
      } catch (error) {
        num = -1;
      }
      const arr = spe.concat(hz);
      num !== 0 && arr.indexOf(data) === -1 ? num -= 100 : '';   
      return num;
    },

    /**
     * @description 特殊的处理 低、中、高压温度
     * @params data 该数据说代表的位
     */
    OxChangeBinaryTem(data) {
      let value = null;
      let num = -1;
      switch (data) {
        case 51:
          value = this.itemStr.substr(data * 2, 2);
          num = ((Number(parseInt(value[0], 16).toString(10)) * 16 + Number(parseInt(value[1], 16).toString(10))) - 80) / 2;
          break;
        case 50:
          value = this.itemStr.substr(data * 2, 2);
          num = ((Number(parseInt(value[0], 16).toString(10)) * 16 + Number(parseInt(value[1], 16).toString(10))) - 80) / 2;
          break;
        case 49:
          value = this.itemStr.substr(data * 2, 2);
          num = ((Number(parseInt(value[0], 16).toString(10)) * 16 + Number(parseInt(value[1], 16).toString(10))) - 140) / 2;
          break;
        default:
          break;
      }
      return num;
    },
  }
};
</script>

<style lang="scss" scoped>
.list ul:after {
  padding-bottom: 200px !important;
}
</style>
