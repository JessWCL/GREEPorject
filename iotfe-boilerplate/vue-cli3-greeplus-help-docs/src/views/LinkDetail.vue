<template>
  <gree-view>
    <title-bar 
      style="background-color:#fff;" 
      :show-share-menu="true" 
      @share="onShare"/>
    <gree-page class="page-detail">
      <section 
        id="iframeContainer" 
        class="content"
        :style="{ visibility: isShow? 'visible' : 'hidden' }"
      >
        <iframe id="docContent" v-show="docUrl" :src="docUrl" frameborder="0" scrolling="auto"></iframe>
      </section>
      <footer>
        <span>是否解决了您的问题：</span>
        <span class="radio-wrapper">
          <input type="radio" id="radio1" v-model="selected" value="yes">
          <label for="radio1">已解决</label>
        </span>
        <span class="radio-wrapper">
          <input type="radio" id="radio2" v-model="selected" value="no">
          <label for="radio2">未解决</label>
        </span>
      </footer>
    </gree-page>
  </gree-view>
 
</template>

<script>
import { mapState } from 'vuex';
import { Dialog } from 'gree-ui';
import TitleBar from '../components/TitleBar';
import { feedbackCommit, showLoading, hideLoading, webShareUrlGeneral } from '../../../static/lib/PluginInterface.promise';

export default {
  components: {
    'title-bar': TitleBar,
  },
  data() {
    return {
      selected: 'yes',
      docUrl: '',
      isShow: false
    };
  },
  computed: {
    ...mapState({
      topHelpDocItems: state => state.helpDocs.topItems,
      allHelpDocItems: state => state.helpDocs.allItems,
      isDataInit: state => state.isDataInit,
    }),
  },
  mounted() {
    showLoading();
    const iframe = document.getElementById('docContent');
    iframe.onload = () => {
      console.log('iframe load');
      hideLoading();
      this.isShow = true;
      const container = document.getElementById('iframeContainer');
      console.log(container.clientHeight);
      iframe.style.height = `${container.clientHeight}px`;
    };
    iframe.onerror = () => {
      hideLoading();
      this.isShow = true;
    };
    this.setDocUrl();
  },
  watch: {
    selected(val) {
      if (val === 'no') {
        Dialog.confirm({
          title: '',
          content: '很抱歉没能解决您的问题，您可以试试',
          confirmText: '问题反馈',
          onConfirm: () => feedbackCommit('12345678911'),
          cancelText: '取消',
          onCancel: () => this.selected = 'yes'
        });
      }
    },
    isDataInit(val) {
      if (val) {
        this.setDocUrl();
      }
    }
  },
  methods: {
    onShare() {
      webShareUrlGeneral(this.docUrl, '帮助文档', '帮助文档');
    },
    // 设置文档URL
    setDocUrl() {
      console.log(this.$route.query);
      const query = this.$route.query;
      const isTop = !!Number(query.istop); // 是否为来自“猜你想问”的链接
      if (isTop) {
        const item = this.topHelpDocItems.find(x => x.pid === Number(query.pid) && x.id === Number(query.id));
        if (item) {
          this.docUrl = item.content;
        }
      } else {
        const item = this.allHelpDocItems.find(x => x.category === query.category && x.id === Number(query.id));
        if (item) {
          this.docUrl = item.content;
        }
      }
    },
  }
};
</script>

<style lang="scss" scoped>
  $radioSize: 56px;
  .page-detail {
    /deep/ .page-content {
      background: #ffffff;
      height: 100%;
      box-sizing: border-box;
      margin: 0;
      display: flex;
      flex-direction: column;
      padding-bottom: calc(0px + env(safe-area-inset-bottom));
      padding-bottom: 0px;
    }
    .content {
      flex: 1;
      overflow: auto;
      padding: 0px 57px;
      box-sizing: border-box;
      text-align: left;
      iframe {
        height: 100%;
        width: 100%;
      }
    }
    footer {
      background-color: #ffffff;
      height: 140px;
      font-size: 42px;
      padding: 0 57px 0 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      box-shadow: 1PX 1PX 6PX 1PX #ccc;
      .radio-wrapper {
        display: flex;
        align-items: center;
        input[type="radio"] {
          visibility: hidden;
          position: relative;
          margin: 0;
          &::before {
            content: '';
            position: absolute;
            width: $radioSize;
            height: $radioSize;
            background-image: url('../assets/img/checkbox-unchecked.png');
            background-size: 100% 100%;
            visibility: visible;
            right: 33px;
            top: 50%;
            transform: translateY(-50%);
          }
          &:checked{
            &::before {
              background-image: url('../assets/img/checkbox-checked.png');
            }
          }
        }
      }
    }
  }
</style>
