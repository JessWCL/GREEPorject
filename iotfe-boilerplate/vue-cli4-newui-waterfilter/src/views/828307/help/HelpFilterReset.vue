<template>
  <gree-view>
    <div class="page-header-help">
      <gree-header
        :left-options="{ preventGoBack: true }"
        @on-click-back="goBack"
      >滤芯寿命复位</gree-header>
    </div>
    <gree-page class="page-home-reset">
      <div class="page-main-reset">
        <gree-block
          strong
          inset
        >
          <span class="weight">滤芯寿命复位方式说明：</span>
          <br />
          <br />

          <span class="content">更换滤芯后需要对更换的滤芯进行寿命复位，长按对应复位键3秒即可复位对应滤芯寿命，按键响应后相应滤芯寿命指示灯常亮。</span>
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
.page-header {
  background-color: #ffffff;
}
.gree-header {
  background-color: #ffffff;
}
.page-home-reset {
  // background-color: #ffffff;
  .gree-header {
    background-color: #ffffff;
  }
  .page-main-reset {
    // margin: 20px 50px 10px 50px;
    .weight {
      color: #989898;
      font-size: 42px;
      font-weight: 400;
      line-height: 60px;
      color: #404657;
    }
    .content {
      color: #989898;
      font-size: 38px;
      line-height: 60px;
    }
  }
}
</style>