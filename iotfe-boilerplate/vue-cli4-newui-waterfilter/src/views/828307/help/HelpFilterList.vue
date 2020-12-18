<template>
  <gree-view>
    <div class="page-header-help">
      <gree-header
        :left-options="{ preventGoBack: true }"
        @on-click-back="goBack"
      >滤芯帮助说明</gree-header>
    </div>
    <gree-page class="page-list">
      <div class="page-main-list">
        <gree-list>
          <gree-list-item
            @click.native="toAnalysis"
            link
            title="常见故障分析"
          ></gree-list-item>

          <gree-list-item
            @click.native="toMethod"
            link
            title="滤芯更换方法"
          ></gree-list-item>

          <gree-list-item
            @click.native="toReset"
            link
            title="滤芯寿命复位"
          ></gree-list-item>

          <gree-list-item
            @click.native="toCycle"
            link
            title="滤芯更换周期"
          ></gree-list-item>
        </gree-list>
      </div>
    </gree-page>
  </gree-view>
</template>
<script>
import { Header, List, Item, Divider } from 'gree-ui';
import { closePage, editDevice, changeBarColor } from '../../../../../static/lib/PluginInterface.promise';
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  components: {
    [Header.name]: Header,
    [List.name]: List,
    [Item.name]: Item,
    [Divider.name]: Divider
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
  mounted() {
    changeBarColor('#ffffff');
  },
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
      closePage();
    },
    /**
     * @description 编辑设备名称
     */
    moreInfo() {
      editDevice(this.mac);
    },
    // 常见故障分析
    toAnalysis() {
      this.$router.push({ name: 'HelpFaultAnalysis' });
    },
    // 滤芯更换方法
    toMethod() {
      this.$router.push({ name: 'HelpFilterReplaceMethod' });
    },
    // 滤芯寿命复位
    toReset() {
      this.$router.push({ name: 'HelpFilterReset' });
    },
    // 滤芯更换周期
    toCycle() {
      this.$router.push({ name: 'HelpFilterReplaceCycle' });
    }
  }
};
</script>
<style lang="scss">
.page-header-help {
  // margin-top: constant(safe-area-inset-top);
  // padding-top: calc(env(safe-area-inset-top));
  .gree-header {
    background-color: #ffffff !important;
  }
  .page-content {
    background-color: aqua !important;
  }
}
.page-list {
  font-size: 38px;
  // background-color: #ffffff;
  .page-content {
    margin-bottom: 0px;
    padding-bottom: 0px;
    // background-color: red;
    .page-header-list {
      .gree-header {
        background-color: #ffffff;
        // background-size: 100% 0px;
        .gree-header-left {
          .gree-icon.icon-font.md {
            // margin-left: 0.24rem;
            font-weight: 600;
          }
        }
      }
    }

    .page-main-list {
      background-color: #ffffff;

      // margin: 0px 0px 0px 30px;
      .list {
        margin-top: 0px;
        .item-content {
          // padding-left: 0px;
        }
      }
      .list01 {
        // border-bottom: 1px solid #e5e5e5;
      }
    }
  }
}
</style>