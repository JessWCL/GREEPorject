<template>
  <gree-view>
    <gree-header
      :left-options="{ preventGoBack: true }"
      @on-click-back="clickBack"
    >
      故障详情
    </gree-header>
    <gree-page>
      <gree-error-page
        type="malfunction"
        :bg-url="BgUrl"
        :text="errorInfoList"
      ></gree-error-page>
    </gree-page>
    <gree-toolbar
      position="bottom"
      class="footer"
    >
      <gree-row>
        <gree-col
          v-for="(item, index) in options"
          :key="index"
          @click.native="setFunction(index)"
        >
          <div class="icon">
            <img
              class="img"
              :src="require('@/assets/images/error/' + item.ImgName + '.png')"
            />
          </div>
          <h3>{{ item.Name }}</h3>
        </gree-col>
      </gree-row>
    </gree-toolbar>
  </gree-view>
</template>

<script>
import { mapState } from 'vuex';
import { errorObjects } from '@/api/index';
import { LIGHT_BAR_COLOR } from '@/api/constant';
import {
  Dialog,
  Header,
  Row,
  Col,
  Icon,
  ToolBar,
  Toast,
  ErrorPage,
} from 'gree-ui';
import { closePage, toWebPage, callNumber } from '../../../../static/lib/PluginInterface.promise';
import { __PROD__, __TEST__ } from '../../api/constant';

export default {
  components: {
    [Header.name]: Header,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [ToolBar.name]: ToolBar,
    [Toast.name]: Toast,
    [ErrorPage.name]: ErrorPage,
  },
  data() {
    return {
      errorObjects,
      BgUrl: require('@/assets/images/error/bg_error.png'),
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
      estate1: state => state.DataObject.estate1,
      estate2: state => state.DataObject.estate2,
      JFerr: state => state.DataObject.JFerr,
    }),

    errorInfoList() {
      const ret = [];
      const { estate1, estate2, JFerr } = this;
      const errorData1 = this.errorObjects.ErrObj1;
      const errorData2 = this.errorObjects.ErrObj2;
      const errorData3 = this.errorObjects.ErrObj3;
      if (estate1 !== 0) {
        for (let i = 0; i <= 8; i += 1) {
          if (estate1 & (0x01 << i)) {
            errorData1[i] && ret.push(errorData1[i]);
          }
        }
      }
      if (estate2 !== 0) {
        for (let i = 0; i <= 4; i += 1) {
          if (estate2 & (0x01 << i)) {
            errorData2[i] && ret.push(errorData2[i]);
          }
        }
      }
      if (JFerr !== 0) {
        errorData3[0] && ret.push(errorData3[0]);
      }

      function compare(p) {
        return function (m, n) {
          var code0 = m[p].toUpperCase();
          var code1 = n[p].toUpperCase();
          var a = code0.charAt(0).charCodeAt() * 10 + (code1.charAt(1).charCodeAt() || 0)
          var b = code1.charAt(0).charCodeAt() * 10 + (code0.charAt(1).charCodeAt() || 0)
          if (code0 === '!') a = 990 + 99; // code: 'zz'
          if (code1 === '!') b = 990 + 99; // code: 'zz'
          return a - b; // 升序
        }
      }
      ret.sort(compare('code'));

      return ret;
    }

  },

  watch: {
    estate1: {
      handler(newV) {
        const hasError = newV !== 0;
        if (hasError) {
          Dialog.closeAll();
        }
      },
      immediate: true
    },
  },

  methods: {
    setFunction(index) {
      console.log(index);
      switch (index) {
        // case 0: toWebPage('https://grih.gree.com/zixun/#/customerChats', '售后电话'); break;
        case 0: callNumber(4008365315); break;
        case 1: toWebPage('http://pgxt.gree.com:7909/hjzx/bx/addbx.jsp?source=greejia', '服务预约'); break;
        case 2: toWebPage('http://pgxt.gree.com:7909/hjzx/bx/chabx.jsp?source=greejia', '进度查询'); break;
        default: console.log('Error，出错了！'); break;
      }
    },

    /**
     * @description 返回键
     */
    clickBack() {
      const { estate1, estate2, JFerr } = this;
      const isHasError = estate1 !== 0 || estate2 & (0x01 << 4) || estate2 & (0x01 << 1) || estate2 & (0x01 << 0) || JFerr !== 0;
      if (isHasError) {
        closePage();
      } else {
        this.$router.back();
      }
    },
  }
};
</script>

<style lang="scss">
.list {
  .item-content {
    .item-media {
      .logo {
        .divider {
          top: 0 !important;
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
      .item-after{
        white-space: inherit;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.page {
  padding-bottom: 2rem;
  .page-content {
    padding-bottom: 324px !important;
    overflow: scroll !important;
  }
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
