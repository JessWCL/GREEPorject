<template>
  <gree-view bg-color="#fffffe">
    <gree-page class="page-error">
      <gree-header>故障详情</gree-header>
      <gree-error-page
        type="malfunction"
        :bg-url="BgUrl2"
        :text="errorMultiText"
      ></gree-error-page>
    </gree-page>
    <gree-toolbar position="bottom">
      <gree-row>
        <gree-col
          v-for="(item, index) in options"
          :key="index"
          @click.native="setFunction(index)"
        >
          <div class="icon">
            <img :src="require('@assets/img/errorPage/' + item.ImgName + '.png')" />
          </div>
          <h3>{{ item.Name }}</h3>
        </gree-col>
      </gree-row>
    </gree-toolbar>
    <gree-dialog
      :closable="false"
      v-model="showDialog"
      :btns="btns"
      :has-mask="true"
      :mask-closable="true"
      >400 836 5315</gree-dialog>
  </gree-view>
</template>
<script>
import { Header, ErrorPage, Row, Col, ToolBar, Dialog } from 'gree-ui';
import { toWebPage, callNumber } from '../../../static/lib/PluginInterface.promise';
import errorlogic from '../mixins/config/828212/errorLogic';

export default {
  components: {
    [Header.name]: Header,
    [ErrorPage.name]: ErrorPage,
    [Row.name]: Row,
    [Col.name]: Col,
    [ToolBar.name]: ToolBar,
    [Dialog.name]: Dialog
  },
  mixins: [errorlogic],
  data() {
    return {
      BgUrl2: require('@/assets/img/errorPage/bg_error.png'),
      options: [
        {
          ImgName: 'service',
          Name: '售后电话'
        },
        {
          ImgName: 'subscribe',
          Name: '服务预约'
        },
        {
          ImgName: 'search',
          Name: '进度查询'
        }
      ],
      errorMultiText: [],
      showDialog: false,
      btns: [
        {
          text: '确定',
          handler: () => {
            this.showDialog = false;
            callNumber('4008365315');
          }
        }
      ]
    };
  },
  watch: {
    errors: {
      handler(val) {
        if (!val || val.length === 0) {
          this.$router.push('/');
        }
        this.errorMultiText.splice(0, this.errorMultiText.length, ...(val));
      },
      immediate: true
    }
  },
  mounted() {
     window.vm.$root.$on('btn-back', () => {
      console.log('btn-back');
      if (this.showDialog) {
        this.showDialog = false;
      } else{
        this.$router.back(-1);
      }
    });
    this.$once('hook:beforeDestroy', () => {
       window.vm.$root.$off('btn-back');
    });
  },
  methods: {
    setFunction(index) {
      switch (index) {
        case 0:
          this.showDialog = true;
          break;
        case 1:
          toWebPage('http://pgxt.gree.com:7909/hjzx/bx/addbx.jsp?source=greejia', '服务预约');
          break;
        case 2:
          toWebPage('http://pgxt.gree.com:7909/hjzx/bx/chabx.jsp', '进度查询');
          break;
        default:
          break;
      }
    }
  }
};
</script>

