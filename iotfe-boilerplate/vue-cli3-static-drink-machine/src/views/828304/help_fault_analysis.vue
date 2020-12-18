<template>
  <gree-view>
    <gree-header
      :left-options="{preventGoBack: true}"
      @on-click-back="goBack"
    >{{ devname }}</gree-header>
    <div class="page-main-help">
      <div class="main-details-bg">
        <h2 
        class="title-txt">常见故障分析</h2>
        <div class="context">
          <div>
            <div class="context-title">1.净饮机不运行,不制水</div>
            <div class="context-body">
              原因：(1).电源没接好或者家里断电；(2).进水阀门没打开；(3).净水机长时间连续运行保护。(4).控制器损坏。<br />
              解决方法：(1).接好电源或等电力恢复；(2).打开进水阀门；(3).按“制水”键手动制水；(4).其余问题请通知售后人员排查。
            </div>
          </div>
          <div>
            <div class="context-title">2.运行异常</div>
            <div class="context-body">
              原因：(1).操作错误；(2).高压开关不正常；(3).线路连接松动；(4).控制器损坏。<br />
              解决方法：(1).按照说明书正确操作；(2).通知售后人员调整、更换；(3).通知售后人员维修；(4).通知售后人员及时更换滤芯。
            </div>
          </div>
          <div>
            <div class="context-title">3.运行过程中有异常噪音</div>
            <div class="context-body">
              原因：(1).电源不正常；(2).稳压泵异常。; (3).前两级滤芯堵塞或进水压力太低<br />
              解决方法：(1).接好电源，仍不正常，通知售后人员更换电源；(2).通知售后人员维修，更换稳压泵; (3).及时更换滤芯，提高进水压力。
            </div>
          </div>
          <div>
            <div class="context-title">4.产水量达不到要求或浓水管不排水</div>
            <div class="context-body">
              原因：(1).滤芯过脏堵塞；(2).水温太低；(3).超滤膜滤芯堵塞；(4)。进水压力太低<br />
              解决方法：(1).对滤芯进行冲洗或者更换滤芯；(2).水温过低造成产水量少，属于RO膜正常特性，待水温恢复正常室温后产水量即可恢复；(3).清洗超滤膜内芯；(4).提高进水压力到0.1-0.4MPa。
            </div>
          </div>
          <div>
            <div class="context-title">5.口感明显下降，有异味</div>
            <div class="context-body">
              原因： (1).滤芯寿命到期；(2).净水机长期不冲洗或者不用；(3).压力桶受污染或者损坏。<br />
              解决方法：(1).更换滤芯；(2).开机制水5分钟左右。并放掉压力桶里面的水，重新制一桶水；(3).通知售后人员更换压力桶。
            </div>
          </div>
          <div>
            <div class="context-title">6.连接处漏水</div>
            <div class="context-body">
              原因： (1).未密封好。<br />
              解决方法：通知售后人员维修。
            </div>
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
