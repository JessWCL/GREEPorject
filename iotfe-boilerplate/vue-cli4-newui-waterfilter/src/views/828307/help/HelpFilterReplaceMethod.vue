<template>
  <gree-view>
     <div class="page-header-help">
        <gree-header
          :left-options="{ preventGoBack: true }"
          @on-click-back="goBack"
        >滤芯更换方法</gree-header>
      </div>
    <gree-page class="page-method">
     

      <div class="page-main-method">
        <gree-block
          strong
          inset
        >
          <div class="step01">
            <div class="step01-1">1.&nbsp;&nbsp;将滤芯放入空腔内，将滤芯提手压平至卡扣卡紧，即可完成安装；</div>
            <br />
            <div class="step01-2">
              <img
                src="../../../assets/img/307-1.png"
                alt
                style="width: 80%; height:360px; margin-top: -15px"
              />
            </div>
          </div>
          <br />
          <div class="step02">
            <div class="step02-1">
              <div class="step02-1-1">2.&nbsp;&nbsp;取出滤芯时，将滤芯上按钮按下，同时将提手提起，即可取出滤芯；</div>
            </div>
            <div class="step02-2">
              <img
                src="../../../assets/img/307-2.png"
                alt
                style="width: 50%; height:360px; "
              />
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
.page-method {
  // background-color: #ffffff;
  .gree-header {
    background-color: #ffffff;
  }

  .page-main-method {
    // margin: 20px 50px 10px 50px;

    .step01-1 {
      color: #989898;
      font-size: 42px;
      font-weight: 400;
      line-height: 60px;
      color: #404657;
    }
    .step01-2 {
      margin-top: -15px;
    }
    .step02-1 {
      color: #989898;
      font-size: 38px;
      line-height: 60px;
      .step02-1-1 {
        font-size: 42px;
        color: #404657;
        font-weight: 400;
      }
    }
  }
}
</style>