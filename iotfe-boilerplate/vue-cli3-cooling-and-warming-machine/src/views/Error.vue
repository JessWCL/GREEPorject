<template>
  <gree-view id="ERROR" bg-color="#F4F5F5">
    <gree-header>故障详情</gree-header>
    <gree-page>
      <gree-error-page type="malfunction":bg-url="BgUrl2"
                       :text="errorMultiText"></gree-error-page>
    </gree-page>
    <gree-toolbar position="bottom"
                  class="footer">
      <gree-row>
        <gree-col v-for="(item, index) in options"
                  :key="index"
                  @click.native="setFunction(index)">
          <div class="icon">
            <img class="img"
                 :src="require('../assets/img/' + item.ImgName + '.png')" />
          </div>
          <h3>{{ item.Name }}</h3>
        </gree-col>
      </gree-row>
    </gree-toolbar>
  </gree-view>
</template>

<script>
import { mapState } from "vuex";
import errorList from "../api/error";
import {
  toWebPage,
  callNumber
} from "../../../static/lib/PluginInterface.promise";

import { Header, Row, Col, Icon, ToolBar, ErrorPage } from "gree-ui";

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
      BgUrl2: require("../assets/img/bg_error.png"),
      errorMultiText: [], // 故障列表
      options: [
        {
          ImgName: "service",
          Name: "售后电话"
        },
        {
          ImgName: "subscribe",
          Name: "服务预约"
        },
        {
          ImgName: "search",
          Name: "进度查询"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      Er(state) {
        if (state.dataObject.Er) {
          this.updateError();
        }
        return state.dataObject.Er;
      },
      err: state => state.dataObject.err
    })

    /**
     * @description 检测是否有故障
     */
  },
  watch: {
    /**
     * @description 无故障时退出故障页面
     */
    Er: function watchError(newV) {
      if (!newV) {
        this.$router.push({ path: "/" });
      }
    }
  },
  methods: {
    /**
     * @description 页面跳转
     */
    setFunction(index) {
      console.log(index);
      switch (index) {
        // case 0: toWebPage('https://grih.gree.com/zixun/#/customerChats', '售后电话'); break;
        case 0:
          callNumber(4008365315);
          break;
        case 1:
          toWebPage(
            "http://pgxt.gree.com:7909/hjzx/bx/addbx.jsp?source=greejia",
            "服务预约"
          );
          break;
        case 2:
          toWebPage(
            "http://pgxt.gree.com:7909/hjzx/bx/chabx.jsp?source=greejia",
            "进度查询"
          );
          break;
        default:
          console.log("Error，出错了！");
          break;
      }
    },
    /**
     * @description 故障解析
     */
    updateError() {
      this.errorMultiText = [];
      for (let index = 0; index < this.err.length; index++) {
        this.List.forEach(element => {
          if (element.index === Number(this.err[index])) {
            this.errorMultiText.push(element);
          }
        });
      }
      console.log("故障页面", this.errorMultiText);
    }
  }
};
</script>

<style lang="scss" scope>
#ERROR {
  .gree-new-error {
    padding-bottom: 350px;
  }
  .page .page-content {
    // padding-top: 1rem;
    overflow: scroll !important;
  }
  .item-title,
  .item-after {
    white-space: normal;
  }
  .toolbar {
    height: 324px !important;
    bottom: 0 !important;
    // background-color:
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
}
</style>


<style lang="scss" >
// .gree-new-error .list ul li .item-content .item-media .logo .divider {
//   top: 1.2rem;
// }
// .gree-new-error .list ul li .item-content .item-media .logo .divider:before {
//   left: 100%;
// }

// .gree-new-error .list ul li .item-content .item-media .logo .divider:after {
//   top: -100%;
//   bottom: 100%;
//   left: 100%;
// }
</style>
