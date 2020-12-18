
<template>
  <gree-view class="error" bg-color="#f4f4f4">
    <gree-header :left-options="{preventGoBack: true}"
                 @on-click-back="clickBack">故障详情
    </gree-header>
    <gree-page>
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
            <img :src="require('../assets/img/' + item.ImgName + '.png')" />
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
  ErrorPage 
} from 'gree-ui';
import { mapState } from 'vuex';
import { HandleErrorCode } from '../utils/index';
import { changeBarColorPlugin, closePagePlugin, toWebPagePlugin, callNumberPlugin} from '../api/pluginInterface';
import errorList from '../api/error';

export default {
  components: {
    [Header.name]: Header,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [ToolBar.name]: ToolBar,
    [ErrorPage.name]: ErrorPage 
  },
  mixins: [errorList],
  data() {
    return {
      BgUrl2: require('../assets/img/bg_error.png'),
      errorMultiText: [], // 故障列表
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
  computed: {
    ...mapState({
      devState: state => state.dataObject.devState,
      error1: state => state.dataObject.error1,
      error2: state => state.dataObject.error2,
      error3: state => state.dataObject.error3,
      error4: state => state.dataObject.error4,
      prompt1: state => state.dataObject.prompt1,
      prompt2: state => state.dataObject.prompt2,
      JFerr: state => state.dataObject.JFerr,
    }),

    /**
     * @description 检测是否有故障
     */
    errStatus() {
      let errState;
      const isError = this.error1 || this.error2 || this.error3 || this.error4 || this.prompt1 || this.prompt2 || this.JFerr || this.devState === 4;
      if (isError) {
        errState = true;
        this.updateError();
      } else {
        errState = false;
      }
      return errState;
    }
  },
  watch: {
    /**
     * @description 无故障时退出故障页面
     */
    errStatus(newV) {
      if (!newV) {
        if ('13'.includes(this.devState)) {
          this.$router.push({ name: 'Startup' });
        } else {
          this.$router.push({ name: 'Home' });
        }
      }
    }
  },
  mounted() {
    changeBarColorPlugin('#F4F4F4');
  },
  methods: {
    clickBack() {
      if (this.devState === 4 || this.JFerr) {
        closePagePlugin();
      } else if ('13'.includes(this.devState)) {
        this.$router.push({ name: 'Startup' });
      } else {
        this.$router.push({ name: 'Home' });
      }
    },
    /**
     * @description 页面跳转
     */
    setFunction(index) {
      console.log(index);
      switch (index) {
        case 0:
          callNumberPlugin(4008365315);
          break;
        case 1:
          toWebPagePlugin('http://pgxt.gree.com:7909/hjzx/bx/addbx.jsp?source=greejia', '服务预约');
          break;
        case 2:
          toWebPagePlugin('http://pgxt.gree.com:7909/hjzx/bx/chabx.jsp?source=greejia', '进度查询');
          break;
        default:
          console.log('Error，出错了！');
          break;
      }
    },
    /**
     * @description 故障解析
     */
    updateError() {
      this.errorMultiText = [];
      let errorIndexList = [];
      errorIndexList = HandleErrorCode(this.error1);
      for (let index = 0; index < errorIndexList.length; index++) {
        this.errorMultiText.push(this.errorList1[errorIndexList[index]]);
      }
      errorIndexList = HandleErrorCode(this.error2);
      for (let index = 0; index < errorIndexList.length; index++) {
        this.errorMultiText.push(this.errorList2[errorIndexList[index]]);
      }
      errorIndexList = HandleErrorCode(this.error3);
      for (let index = 0; index < errorIndexList.length; index++) {
        this.errorMultiText.push(this.errorList3[errorIndexList[index]]);
      }
      errorIndexList = HandleErrorCode(this.error4);
      for (let index = 0; index < errorIndexList.length; index++) {
        this.errorMultiText.push(this.errorList4[errorIndexList[index]]);
      }
      errorIndexList = HandleErrorCode(this.prompt1);
      for (let index = 0; index < errorIndexList.length; index++) {
        this.errorMultiText.push(this.prompt1List[errorIndexList[index]]);
      }
      errorIndexList = HandleErrorCode(this.prompt2);    
      for (let index = 0; index < errorIndexList.length; index++) {
        this.errorMultiText.push(this.prompt2List[errorIndexList[index]]);
      }
      if (this.JFerr) {
        this.errorMultiText.push(this.wifiErrorList[0]);
      }
      // console.log('故障页面', this.errorMultiText);
    }

  }
};
</script>

<style lang="scss">
.list {
  .item-content {
    .item-media {
      .logo {
        .divider {
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          display: block !important;
          height: 100% !important;
          &:before {
            top: 10% !important;
            border-left: 1px solid rgba(255, 255, 255, 0.6) !important;
          }
          &:after {
            bottom: 10% !important;
            border-left: 1px solid rgba(255, 255, 255, 0.6) !important;
          }
        }
      }
    }
    .item-inner{
      .item-title,
      .item-after{
        white-space: normal;
        width: 100%;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.page {
  padding-bottom: 200px;
  // .page-content {
  //   // padding-bottom: 324px !important;
  //   // overflow: scroll !important;
  // }
}
.toolbar {
  margin: 0 !important;
  height: 324px !important;
  background-color: #f6f6f6 !important;
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
  
