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
            <img :src="require('@assets/images/errorPage/' + item.ImgName + '.png')" />
          </div>
          <h3>{{ item.Name }}</h3>
        </gree-col>
      </gree-row>
    </gree-toolbar>
  </gree-view>
</template>
<script>
import { Header, ErrorPage, Row, Col, ToolBar, Dialog } from 'gree-ui';
import { toWebPage, callNumber, changeBarColor } from '../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [Header.name]: Header,
    [ErrorPage.name]: ErrorPage,
    [Row.name]: Row,
    [Col.name]: Col,
    [ToolBar.name]: ToolBar
  },
  data() {
    return {
      BgUrl2: require('@/assets/images/errorPage/bg_error.png'),
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
      errorMultiText: []
    };
  },
  created() {
    if (this.$store.state.errorList && this.$store.state.errorList.length) {
      this.errorMultiText.splice(0, this.errorMultiText.length, ...(this.$store.state.errorList));
    }
  },
  mounted() {
    changeBarColor('#fffffe');
  },
  methods: {
    setFunction(index) {
      switch (index) {
        case 0:
          Dialog.alert({
            title: '',
            content: '400 836 5315',
            confirmText: '呼叫',
            onConfirm: () => callNumber('4008365315'),
          });
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

