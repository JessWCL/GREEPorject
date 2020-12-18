<template>
  <gree-view bg-color="color">
    <div class="page-header-help">
      <gree-header
        :left-options="{ preventGoBack: true }"
        @on-click-back="goBack"
        @on-click-more="moreInfo"
      >常见故障分析</gree-header>
    </div>
    <gree-page class="home_analysis">
      <div class="page-analysis">
        <gree-block
          strong
          inset
        >
          <div class="question">1、净水机不运行，不制水</div>
          <br />
          <div class="reason">
            <span>原因：</span>
            <br />
            <span>（1）电源没接好或家里断电（2）进水阀门没打开（3）净水机长时间连续运行保护（4）控制器损坏</span>
            <br />

            <span>对应解决办法：</span>
            <br />
            <span>（1）接好电源或等电力恢复（2）打开进水阀门（3）三次点击复位（复位1）键手动制水（4）其余问题请通知售后人员排查</span>
            <br />
          </div>
        </gree-block>

        <gree-block
          strong
          inset
        >
          <div class="question">2、运行异常</div>
          <br />

          <div class="reason">
            <span>原因：</span>
            <br />
            <span>（1）操作错误（2）高压开关不正常（3）线路连接松动（4）控制器损坏</span>
            <br />

            <span>&nbsp;&nbsp;对应解决办法：</span>
            <br />
            <span>（1）按照说明书正确操作（2）通知售后人员调整、更换（3）通知售后人员维修</span>
            <br />
          </div>
        </gree-block>

        <gree-block
          strong
          inset
        >
          <div class="question">3、运行过程中有异常噪音</div>
          <br />

          <div class="reason">
            <span>原因：</span>
            <br />
            <span>（1）电源不正常（2）稳压泵异常（3）滤芯堵塞或进水压力太低</span>
            <br />

            <span>对应解决办法：</span>
            <br />
            <span>（1）接好电源，仍不正常，通知售后人员更换电源（2）通知售后人员维修，更换稳压泵（3）通知售后人员及时更换滤芯，提高进水压力</span>
            <br />
          </div>
        </gree-block>

        <gree-block
          strong
          inset
        >
          <div class="question">4、产水量达不到要求或浓水管不排水</div>
          <br />

          <div class="reason">
            <span>原因：</span>
            <br />
            <span>（1）滤芯过脏堵塞 （2）水温太低（3）进水压力太低</span>
            <br />

            <span>对应解决办法：</span>
            <br />
            <span>（1）对滤芯进行冲洗或者更换滤芯（2）水温过低造成产水量少，属于RO膜正常特性，待水温恢复正常室温后产水量即可恢复（3）提高进水压力到0.1-0.4MPa</span>
            <br />
          </div>
        </gree-block>

        <gree-block
          strong
          inset
        >
          <div class="question">5、口感明显下降，有异味</div>
          <br />

          <div class="reason">
            <span>原因：</span>
            <br />
            <span>（1）滤芯寿命到期（2）净水机长期不冲洗或不用</span>
            <br />

            <span>对应解决办法：</span>
            <br />
            <span>（1）更换滤芯（2）开机制水5分钟左右</span>
            <br />
          </div>
        </gree-block>

        <gree-block
          strong
          inset
        >
          <div class="question">6、连接处漏水</div>
          <br />

          <div class="reason">
            <span>原因：</span>
            <br />
            <span>（1）未密封好</span>
            <br />

            <span>对应解决办法：</span>
            <br />
            <span>通知售后人员维修</span>
            <br />
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
    return {
      color: '#ffffff'
    };
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
      // closePage();
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
.statusbar {
  background-color: #f4f4f4;
}

.page-header-help {
  .gree-header {
    background-color: #ffffff;
  }
}
.home_analysis {
  overflow: hidden;
  .question {
    font-size: 46px;
    color: #404657;
  }
  .reason {
    font-weight: 400;
    font-size: 38px;
    color: #989898;
    text-align: justify;
  }
}
</style>
