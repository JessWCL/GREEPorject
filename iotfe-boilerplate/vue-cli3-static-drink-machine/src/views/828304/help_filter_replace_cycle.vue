<template>
  <gree-view>
    <gree-header
      :left-options="{preventGoBack: true}"
      @on-click-back="goBack"
    >{{ devname }}</gree-header>
    <div class="page-main-help">
      <div class="main-details-bg">
        <h2 
        class="title-txt">滤芯更换周期特别说明</h2>
        <div class="context">
          <div class="context-body">
            1.&nbsp;&nbsp;滤芯更换周期不是质量保证期限，因水质、家庭用水量和季节(夏季、冬季)不同，实际更换周期有所不同。<br />
            <br />
            2.&nbsp;&nbsp;附表给出的滤芯更换参考周期，是在一定水质条件下经实验测试得到，其中关键指标为：
            水温为25℃，TDS值为250mg/L，浑浊度≤1NTU，SDI≤3，总硬度(以CaCO3计)≤100 mg/L。上述关键指标必须使用专业仪器测试才能得到精确值，指标数值直接影响滤芯使用时间。如，浑浊度越大PP棉滤芯使用时间越短、TDS值和总硬度越大反渗透膜使用时间越短。<br />
            <br />
            3.&nbsp;&nbsp;各地水质有差异，在水质特别差的地区，甚至无法达到更换参考周期的最低值。针对自来水水质较差地区，我司开发了一系列前置过滤器产品，能有效保护净饮机滤芯，延长滤芯使用寿命，且使用成本低。如您家庭水质情况较差，建议在净饮机前配备前置过滤器，具体方案请联系当地经销商。<br />
            <br />
            4.&nbsp;&nbsp;请适时更换滤芯，以确保永久享用新鲜、健康的纯水。建议各滤芯的更换周期如下(仅供参考)：<br />
            <br />
            <table class="details-table">
              <tr>
                <td>滤芯1</td>
                <td>PP棉滤芯</td>
                <td>3-6个月</td>
              </tr>
              <tr>
                <td>滤芯2</td>
                <td>活性炭滤芯</td>
                <td>9-12个月</td>
              </tr>
              <tr>
                <td>滤芯3</td>
                <td>反渗透膜滤芯</td>
                <td>24-36个月</td>
              </tr>
              <tr>
                <td>滤芯4</td>
                <td>炭棒滤芯</td>
                <td>24-36个月</td>
              </tr>
            </table>
            <br />
            注：滤芯更换参考周期按每天使用10L纯水，实际更换周期因各地水质及用水量不同，可能存在差异。
          </div>
        </div>
      </div>
    </div>
  </gree-view>
</template>
<script>
import { Header } from 'gree-ui';
import { closePagePlugin } from '../../api/utils';

export default {
  components: {
    [Header.name]: Header
  },
  data() {
    return {
      devname: '帮助'
    };
  },
  methods: {
    /**
     * @description 返回键
     */
    goBack() {
      // closePage();
      closePagePlugin();
    }
  }
};
</script>
