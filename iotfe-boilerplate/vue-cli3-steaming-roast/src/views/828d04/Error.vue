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
        :bg-url="BgUrl2"
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
              :src="require('@/assets/img/' + item.ImgName + '.png')"
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
// import errorData from '@/api/828d04/errorData.js';
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

const BgUrl2 = require('@/assets/img/bg_error.png');

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
      BgUrl2,
      errorMultiText: [
        // example
        // {
        //   code: 'F0',
        //   headtitle: '故障名称：',
        //   title: 'PM2.5 传感器故障',
        //   subtitle: '解除办法：',
        //   text: '请联系指定服务商或服务中心'
        // },
        { order: 3, code: 'F2', headtitle: '故障名称：', title: '面板驱动故障', subtitle: '解除办法：', text: '按确定退出，若多次出现，请联系售后服务中心' },
        { order: 2, code: 'F1', headtitle: '故障名称：', title: '水路故障', subtitle: '解除办法：', text: '按确定退出，若多次出现，请联系售后服务中心' },
        { order: 5, code: 'L3', headtitle: '故障名称：', title: '散热风机故障', subtitle: '解除办法：', text: '按确定退出，若多次出现，请联系售后服务中心' },
        { order: undefined, code: '!', headtitle: '故障名称：', title: '预留', subtitle: '预留', text: '请联系售后服务中心' },
        { order: 4, code: 'H0', headtitle: '故障名称：', title: '板间通讯故障', subtitle: '解除办法：', text: '请联系售后服务中心' },
        { order: 1, code: 'E6', headtitle: '故障名称：', title: '底感温包故障', subtitle: '解除办法：', text: '请联系售后服务中心' },
        { order: 0, code: 'E5', headtitle: '故障名称：', title: '顶感温包故障', subtitle: '解除办法：', text: '请联系售后服务中心' },
        { order: undefined, code: '!', headtitle: '故障名称：', title: '预留', subtitle: '预留', text: '请联系售后服务中心' },
      ],
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
      estate1: state => state.dataObject.estate1,
      estate2: state => state.dataObject.estate2,
      estate3: state => state.dataObject.estate3,
      estate4: state => state.dataObject.estate4,
      estate5: state => state.dataObject.estate5,
    }),

    errorInfoList() {
      const ret = [];
      const {estate1} = this;
      const errorData = this.errorMultiText;
      if (estate1 !== 0) {
        // 多个错误显示
        for (let i = 0; i <= 8; i += 1) {
          if (estate1 & (0x01 << i)) {
            const isNoUse = i === 3 || i === 7; // 预留的排除
            if (isNoUse) {
              // console.log('整机预留位，不作显示', {i});
            } else {
              errorData[i] && ret.push(errorData[i]);
            }
          }
        }
      }
      // 升序
      const act = (a, b) => { return a.order - b.order };
      ret.sort(act);
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
      const isHasError = this.estate1 !== 0;
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
