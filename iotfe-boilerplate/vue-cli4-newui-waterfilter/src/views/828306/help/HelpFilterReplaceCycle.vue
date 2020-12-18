<template>
  <gree-view>
    <div class="page-header-help">
      <gree-header
        :left-options="{ preventGoBack: true }"
        @on-click-back="goBack"
        @on-click-more="moreInfo"
      >滤芯更换周期</gree-header>
    </div>
    <gree-page class="page-home-cycle">
      <div class="page-main-cycle">
        <gree-block
          strong
          inset
        >
          <span class="title">滤芯更换周期特别说明：</span>
          <div class="cycle-content">
            <br />1.&nbsp;&nbsp;滤芯更换周期不是质量保证期限，因水质、家庭用水量和季节(夏季、冬季)不同，实际更换周期有所不同。
            <br />
            <br />2.&nbsp;&nbsp;附表给出的滤芯更换参考周期，是在一定水质条件下经实验测试得到，其中关键指标为：水温为25℃，TDS值为250mg/L，浑浊度≤1NTU，SDI≤3，总硬度 (以CaCO3计)≤100 mg/L。上述关键指标必须使用专业仪器测试才能得到精确值，指标数值直接影响滤芯使用时间。如，浑浊度越大复合滤芯使用时间越短、TDS值和总硬度越大反渗透膜使用时间越短。
            <br />
            <br />3.&nbsp;&nbsp;各地水质有差异，在水质特别差的地区，甚至无法达到更换参考周期的最低值。针对自来水水质较差地区，我司开发了一系列前置过滤器产品，能有效保护净水机滤芯，延长滤芯使用寿命，且使用成本低。如您家庭水质情况较差，建议在净水机前配备前置过滤器，具体方案请联系当地经销商。
            <br />注：前置过滤器需要另外收费。
            <br />
            <br />4.&nbsp;&nbsp;请适时更换滤芯，以确保永久享用新鲜、健康的净水。建议各滤芯的更换周期如下(仅供参考)：
            <br />
            <br />
            <div class="table">
              <table>
                <tr>
                  <th>滤芯名称</th>
                  <th>滤芯更换参考周期</th>
                </tr>
                <tr>
                  <td>反渗透膜滤芯</td>
                  <td>24-36个月</td>
                </tr>
                <tr>
                  <td>复合滤芯</td>
                  <td>12-18个月</td>
                </tr>
              </table>
            </div>
          </div>
        </gree-block>
      </div>
    </gree-page>
  </gree-view>
</template>
<script>
import { Header, Block, BlockTitle, BlockHeader, BlockFooter } from 'gree-ui';
import { closePage, editDevice } from '../../../../../static/lib/PluginInterface.promise';
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
  components: {
    [Header.name]: Header,
    [Block.name]: Block,
    [BlockTitle.name]: BlockTitle,
    [BlockHeader.name]: BlockHeader,
    [BlockFooter.name]: BlockFooter
  },
  mixins: [],
  data() {
    return {};
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      devname: state => state.deviceInfo.name,
      functype: state => state.functype,
      mac: state => state.mac
    })
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT'
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL'
    }),
    /**
     * @description 返回键
     */
    goBack() {
      this.$router.push({ name: 'HelpFilterList' });
    },
    /**
     * @description 编辑设备名称
     */
    moreInfo() {
      editDevice(this.mac);
    }
  }
};
</script>

<style lang="scss">
.page-home-cycle {
  // background-color: #ffffff;

  .gree-header {
    background-color: #ffffff;
  }

  .page-main-cycle {
    // margin: 20px 50px 10px 50px;
    .title {
      color: #989898;
      font-size: 42px;
      font-weight: 400;
      line-height: 60px;
      color: #404657;
    }
    .cycle-content {
      color: #989898;
      font-size: 38px;
      line-height: 60px;
    }
    .table {
      // width: 100%;
      table-layout: fixed;
      // border-collapse: collapse;
      text-align: center;
      th {
        width: 50%;
        border: 1px solid #000;
        color: #404657;
        background-color: rgb(217, 217, 217);
      }
      td {
        border: 1px solid #000;
        width: 500px;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
}
</style>
