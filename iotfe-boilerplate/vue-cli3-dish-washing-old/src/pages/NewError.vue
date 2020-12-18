<template>
  <gree-view>
    <gree-header
      :left-options="{ preventGoBack: true }"
      @on-click-back="clickBack">故障详情</gree-header>
    <gree-error-page
      type="malfunction"
      :bg-url="BgUrl2"
      :text="computedErrorList"
    ></gree-error-page>
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
import { mapState, mapActions } from 'vuex';
import {
  Header,
  View,
  Row,
  Col,
  Icon,
  ToolBar,
  Toast,
  ErrorPage,
} from 'gree-ui';
import { getCharCodeAtForArray } from '../utils/index';
import { closePage, toWebPage, callNumber } from '../../../static/lib/PluginInterface.promise';

const BgUrl2 = require('@/assets/images/error/bg_error.png');

export default {
  components: {
    [Header.name]: Header,
    [View.name]: View,
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
        {
          code: 'F0',
          headtitle: '故障名称：',
          title: 'PM2.5 传感器故障',
          subtitle: '解除办法：',
          text: '请联系指定服务商或服务中心'
        },
        {
          code: 'F1',
          headtitle: '故障名称：',
          title: '温湿度传感器故障',
          subtitle: '解除办法：',
          text: '请联系指定服务商或服务中心'
        },
        {
          code: 'F2',
          headtitle: '故障名称：',
          title: '甲醛传感器故障',
          subtitle: '解除办法：',
          text: '请联系指定服务商或服务中心'
        },
        {
          code: 'F3',
          headtitle: '故障名称：',
          title: 'CO2 传感器故障',
          subtitle: '解除办法：',
          text: '请联系指定服务商或服务中心'
        },
        {
          code: 'F4',
          headtitle: '故障名称：',
          title: '与主控板通讯故障',
          subtitle: '解除办法：',
          text: '请联系指定服务商或服务中心'
        }
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
      estate1: state => state.device.DataObject.estate1,
      estate2: state => state.device.DataObject.estate2,
      errItemList: state => state.device.errItemList,
      warningItemList: state => state.device.warningItemList,
    }),

    computedErrorList() {
      function sortFn(a, b) {
        return getCharCodeAtForArray(b.code) - getCharCodeAtForArray(a.code);
      }
      const ret = this.errItemList.concat(this.warningItemList);
      ret.sort(sortFn);
      return ret;
    },
    hasError() {
      return this.computedErrorList.length > 0;
    },

    errorInfoList() {
      const ret = [];
      const estate1 = this.estate1;
      const errorData = this.errorMultiText;
      if (estate1 !== 0) {
        // 多个错误显示
        for (let i = 0; i <= 8; i += 1) {
          if (estate1 & (0x01 << i)) {
            errorData[i] && ret.push(errorData[i]);
          }
        }
      }
      return ret;
    }
  },

  methods: {
    ...mapActions('device', ['parseBarColor']),

    clickBack() {
      if (this.errItemList.length > 0) {
        closePage();
      } else if (this.warningItemList.length > 0) {
        this.$router.back();
        this.parseBarColor();
      }
    },
    setFunction(index) {
      console.log(index);
      switch (index) {
        // case 0: toWebPage('https://grih.gree.com/zixun/#/customerChats', '售后电话'); break;
        case 0: callNumber(4008365315); break;
        case 1: toWebPage('http://pgxt.gree.com:7909/hjzx/bx/addbx.jsp?source=greejia', '服务预约'); break;
        case 2: toWebPage('http://pgxt.gree.com:7909/hjzx/bx/chabx.jsp?source=greejia', '进度查询'); break;
        default: console.log('Error，出错了！'); break;
      }
    }
  }
};
</script>

<style lang="scss">
.view {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1001;
}

.gree-header {
  height: 4rem;
  .gree-header-left {
    left: 1rem;
    top: 1rem;
    height: 2rem;
    width: 2rem;
    .left-arrow {
      width: 2rem;
      height: 2rem;
      left: 0;
      .icon-font {
        font-size: 2rem;
      }
    }
  }
  .gree-header-title {
    font-size: 2rem;
    height: 4rem;
    line-height: 4rem;
  }
}

main.new-error {
  overflow: auto;
  display: flex;
  flex: 1;
  margin-top: 4rem;
  height: calc(80% - 4rem);
  background: #f6f6f6;
}

.gree-new-error {
  height: 100%;
  width: 100%;
  background: #f6f6f6;
  .list {
    margin: 2rem 1.5rem;
    ul {
      li {
        margin-bottom: 1rem;
        .item-content {
          min-height: auto;
          height: 10rem;
          .item-media .logo {
            width: 5rem;
            height: 5rem;
            font-size: 2rem;
            border: 2px solid #fff;
            .divider {
              top: 0;
              left: 0;
              height: 100%;
            }
            .divider:before {
              left: 6rem;
            }
            .divider:after {
              left: 6rem;
            }
          }
          .item-inner {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 2rem;
            padding: 1rem;
            min-height: auto;
            .item-title {
              white-space: normal;
              overflow: initial;
              margin: initial;
              width: 100%;
              font-size: 1.5rem;
            }
            .item-after {
              margin: initial;
              width: 100%;
              margin-left: 0;
              padding-top: 0;
              font-size: 1.2rem;
              white-space: pre-wrap;
            }
          }
        }
      }
    }
  }
}

// .page {
//   padding-bottom: 2rem;
//   .page-content {
//     padding-bottom: 324px !important;
//     overflow: scroll !important;
//   }
// }

.toolbar {
  margin: 0 !important;
  height: 20% !important;
  background-color: #f6f6f6 !important;
  .toolbar-inner {
    height: 10rem;
    .row {
      width: 100%;
      margin: 0;
      text-align: center;
    }
    .col {
      .icon {
        background: none;
        border: none;
        box-shadow: none;
      }
      .img {
        width: 6rem;
        height: 6rem;
      }
      h3 {
        font-size: 1.5rem;
        padding-top: 0rem;
      }
    }
  }
}
</style>
