<template>
  <gree-view bg-color="#F4F5F5" id="ERROR">
    <gree-header>故障详情</gree-header>
    <gree-page>
      <gree-error-page type="malfunction" :bg-url="BgUrl2" :text="errorMultiText" ></gree-error-page>
    </gree-page>
    <gree-toolbar position="bottom" class="footer">
      <gree-row>
        <gree-col v-for="(item, row) in options" :key="row" @click.native="setFunction(row)">
          <div class="icon">
            <img class="img" :src="require('../assets/img/' + item.ImgName + '.png')" />
          </div>
          <h3>{{ item.Name }}</h3>
        </gree-col>
      </gree-row>
    </gree-toolbar>
  </gree-view>
</template>

<script>
import {
  Header,
  Row,
  Col,
  Icon,
  ToolBar,
  ErrorPage,
  Dialog
} from 'gree-ui';
// eslint-disable-next-line no-unused-vars
import { toWebPage, changeBarColor, callNumber } from '../../../static/lib/PluginInterface.promise';
import error from '../mixins/error';

export default {
  components: {
    [Header.name]: Header,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [ToolBar.name]: ToolBar,
    [ErrorPage.name]: ErrorPage
  },
  mixins: [error],
  data() {
    return {
      BgUrl2: require('../assets/img/bg_error.png'),
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
      ]
    };
  },

  watch: {
    /**
     * @description 无故障时退出故障页面
     */
    errStatus(newV) {
      if (!newV) {
        this.$router.push({ path: '/' });
      }
    }
  },
  methods: {
    setFunction(index) {
      console.log(index);
      switch (index) {
        case 0: 
          Dialog.alert({
            title: '',
            content: '400 836 5315',
            confirmText: '呼叫',
            onConfirm: () => callNumber('4008365315'),
          });
         break;
        case 1: toWebPage('http://pgxt.gree.com:7909/hjzx/bx/addbx.jsp?source=greejia', '服务预约'); break;
        case 2: toWebPage('http://pgxt.gree.com:7909/hjzx/bx/chabx.jsp', '进度查询'); break;
        default: console.log('Error，出错了！'); break;
      }
    },
  },
  mounted() {
    changeBarColor('#f4f5f5');
  }
};
</script>

<style lang="scss" scope>
.page-content {
  padding-bottom: 324px !important;
  overflow: scroll !important;
}
.toolbar { 
    height: 324px !important;
  .row {
    width: 100%;
    text-align: center;
    }
    .col {
      .icon {
        background: none;
        border: none;
        box-shadow: none;
      }
        .img {
          width: 162px;
          height: 162px;
        }
    }
}

</style>


<style lang="scss">
#ERROR{
.item-title,
.item-after {
  white-space: normal;
}
}
</style>
