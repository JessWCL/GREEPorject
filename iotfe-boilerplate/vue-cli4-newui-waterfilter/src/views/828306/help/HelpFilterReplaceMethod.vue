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
            <div class="step01-1">1.&nbsp;&nbsp;将滤芯放平（提手与水平面垂直），插入滤芯槽中，如图所示。</div>
            <br />
            <div class="step01-2">
              <img
                src="../../../assets/img/more_new_2.png"
                alt
                style="width: 100%; height:150px; margin-top: -15px"
              />
            </div>
          </div>
          <br />
          <div class="step02">
            <div class="step02-1">
              <div class="step02-1-1">2.&nbsp;&nbsp;将滤芯顺时针旋转约90°，滤芯对位标识对齐即安装完成，如图所示。</div>
              <br />&nbsp;&nbsp;注意：
              <br />&nbsp;&nbsp;①滤芯1安装于上层，滤芯2安装于下层。
              <br />&nbsp;&nbsp;②为使得滤芯安装方便，滤芯安装采取周向定位，换芯时反向旋转180°也能安装到位，此种状态对整机性能与使用均无影响。
              <br />&nbsp;&nbsp;③实际情况中，对位标识可能会存在少量偏位，此种情况并非滤芯安装不到位，请放心使用本产品。
              <br />
            </div>
            <div class="step02-2">
              <img
                src="../../../assets/img/more_new_1.png"
                alt
                style="width: 100%; height:150px; "
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