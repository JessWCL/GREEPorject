<template>
  <gree-view
    bg-color="#ffffff"
    class="view-error-waring"
  >
    <gree-header
      :left-options="{ preventGoBack: true }"
      @on-click-back="clickBack"
      @on-click-more="moreInfo"
    >
      <gree-icon
        slot="overwrite-left"
        name="back"
        size="lg"
        @click="clickBack"
      ></gree-icon>
      {{ $language("error.errorTitle") }}
    </gree-header>
    <gree-page :no-navbar="false">
      <gree-block>
        <gree-tabs v-model="tabs_type">
          <gree-tab-pane
            class="content"
            name="error"
            label="故障"
          >
            <div
              v-if="$errorList.length === 0"
              class="empty-data-contianer"
            >
              <img
                :src="EmptyImg"
                alt
              />
              <p>暂无故障...</p>
            </div>
            <main class="new-error">
              <div class="gree-new-error">
                <gree-list>
                  <gree-list-item
                    media-item
                    :style="{backgroundImage:'url(' + BgUrlError + ')'}"
                    v-for="(item, index) in $errorList"
                    :key="index"
                  >
                    <div
                      class="logo"
                      slot="media"
                    >
                      {{ item.code }}
                      <div class="divider"></div>
                    </div>
                    <p slot="title">{{ item.headtitle }}{{ item.title }}</p>
                    <p slot="footer">{{ item.subtitle }}{{ item.text }}</p>
                  </gree-list-item>
                </gree-list>
              </div>
            </main>
          </gree-tab-pane>
          <gree-tab-pane
            class="content"
            name="warning"
            label="提醒"
          >
            <div
              v-if="$warningList.length === 0"
              class="empty-data-contianer"
            >
              <img
                :src="EmptyImg"
                alt
              />
              <p>暂无提醒...</p>
            </div>
            <main class="new-error warning">
              <div class="gree-new-error">
                <!-- 新版故障 -->
                <gree-list>
                  <gree-list-item
                    media-item
                    link
                    v-for="(item, index) in $warningList"
                    :style="{backgroundImage:'url(' + BgUrlTips + ')'}"
                    :key="index"
                  >
                    <div
                      class="logo"
                      slot="media"
                    >
                      <div class="divider"></div>
                    </div>
                    <p slot="title">{{ item.headtitle }}{{ item.title }}</p>
                    <p slot="footer">{{ item.subtitle }}{{ item.text }}</p>
                    <template
                      slot="after"
                      v-if="item.href"
                    >
                      <p>
                        <span @click="toWebViewPage(item.href, item.name)">
                          {{ item.btnText }}
                          <gree-icon name="arrow-right"></gree-icon>
                        </span>
                      </p>
                    </template>
                  </gree-list-item>
                </gree-list>
              </div>
            </main>
          </gree-tab-pane>
        </gree-tabs>
      </gree-block>
    </gree-page>
    <transition name="fade">
      <gree-toolbar
        v-show="tabs_type === 'error'"
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
    </transition>
  </gree-view>
</template>

<script>
import {
  View,
  Page,
  Header,
  Row,
  Col,
  Icon,
  ToolBar,
  Toast,
  ErrorPage,
  Block,
  Tabs,
  TabPane,
  List,
  Item,
} from 'gree-ui';
import {
  // closePage,
  toWebPage,
  callNumber,
  editDevice,
  changeBarColor,
} from '../../../static/lib/PluginInterface.promise';
import { getQueryStringByName } from '../utils/index';

export default {
  name: 'ErrorWarningComponent',
  components: {
    [View.name]: View,
    [Page.name]: Page,
    [Header.name]: Header,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [ToolBar.name]: ToolBar,
    [Toast.name]: Toast,
    [Block.name]: Block,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    [List.name]: List,
    [Item.name]: Item,
    [ErrorPage.name]: ErrorPage,
  },
  props: {
    type: {
      type: String,
      required: true,
      default: 'error',
      // eslint-disable-next-line func-names
      validator: function (t) {
        return ['error', 'warning'].includes(t);
      },
    },
    errorList: {
      type: Array,
      default() {
        // return [{ code: 'E3', title: '感温包故障', text: '请通知售后人员维修' }]
        return [];
      },
    },
    warningList: {
      type: Array,
      default() {
        // return [
        //   {
        //     title: '滤芯寿命将尽',
        //     text: '活性炭滤芯已经使用361天，为了您的健康，请尽快更换滤网',
        //   },
        //   {
        //     title: '滤芯寿命将尽',
        //     text: '活性炭滤芯已经使用361天，为了您的健康，请尽快更换滤网',
        //     name: '格力商城',
        //     href: 'https://www.gree.com/',
        //     btnText: '立即购买',
        //   },
        // ];
        return [];
      },
    },
  },
  data() {
    return {
      tabs_type: 'error',
      EmptyImg: require('@/assets/img/bg/bg_no_error.png'),
      BgUrlError: require('@/assets/img/bg/bg_error.png'),
      BgUrlTips: require('@/assets/img/bg/bg_reminder.png'),
      options: [
        {
          ImgName: 'service',
          Name: '售后电话',
        },
        {
          ImgName: 'subscribe',
          Name: '服务预约',
        },
        {
          ImgName: 'search',
          Name: '进度查询',
        },
      ],
    };
  },

  computed: {
    $errorList() {
      this.errorList.forEach(item => {
        // eslint-disable-next-line no-param-reassign
        item.headtitle = '故障名称：';
        // eslint-disable-next-line no-param-reassign
        item.subtitle = '解除办法：';
      });
      return this.errorList;
    },
    $warningList() {
      this.warningList.forEach(item => {
        // eslint-disable-next-line no-param-reassign
        item.headtitle = '';
        // eslint-disable-next-line no-param-reassign
        item.subtitle = '';
        // eslint-disable-next-line no-param-reassign
        item.code = ''; // remove useless code
      });
      return this.warningList;
    },
  },

  watch: {
    type: {
      immediate: true,
      handler(newV) {
        this.tabs_type = newV;
      },
    },
  },
  created() {
    changeBarColor('#ffffff');
  },
  mounted() {},

  methods: {
    setFunction(index) {
      console.log(index);
      switch (index) {
        // case 0: toWebPage('https://grih.gree.com/zixun/#/customerChats', '售后电话'); break;
        case 0:
          callNumber(4008365315);
          break;
        case 1:
          toWebPage(
            'http://pgxt.gree.com:7909/hjzx/bx/addbx.jsp?source=greejia',
            '服务预约'
          );
          break;
        case 2:
          toWebPage(
            'http://pgxt.gree.com:7909/hjzx/bx/chabx.jsp?source=greejia',
            '进度查询'
          );
          break;
        default:
          console.log('Error，出错了！');
          break;
      }
    },

    /**
     * @description 返回键
     */
    clickBack() {
      // if (this.errorList.length > 0) {
      //   closePage();
      // } else {
      //   this.$router.back();
      // }
      this.$router.go(-1);
    },

    moreInfo() {
      const mac = getQueryStringByName('mac');
      editDevice(mac);
    },

    toWebViewPage(url, title) {
      toWebPage(url, title);
    },
  },
};
</script>

<style lang="scss">
.view.view-error-waring {
  .page {
    .page-content {
      overflow: unset !important;
      .gree-tabs {
        .gree-tab-bar {
          background: #fff;
          .gree-tab-bar-list {
            .gree-tab-bar-item {
              &.is-active {
                color: #619ce7;
              }
            }
          }
          .gree-tab-bar-ink {
            width: 80px !important;
            height: 6px;
            background-color: #619ce7;
            // transform: translateX(18.5px) !important;
            margin-left: 150px;
          }
        }
      }
      .gree-tabs-content {
        .gree-tab-pane {
          &.content {
            overflow: auto;
            // 减去 Toolbar Header Tabbar
            max-height: calc(100vh - 324px - 127px - 144px);
          }
        }
      }
      .empty-data-contianer {
        img {
          display: block;
          margin: 0 auto;
          padding-top: 292px;
          width: 961px;
          height: 680px;
        }
        p {
          text-align: center;
          color: #b3b3b3;
          font-size: 36px;
          &.success {
            margin-top: 72px;
          }
        }
      }
    }
  }
}
.new-error {
  &.warning {
    .gree-new-error {
      .list {
        .item-content {
          .item-media {
            .logo {
              background-image: url('../assets/img/lingdang.png');
              background-size: 100px 100px;
              background-repeat: no-repeat;
              background-position: center;
            }
          }
          .item-inner {
            .item-after {
              position: absolute;
              bottom: 0;
              right: 40px;
              padding: 40px 0;
              p {
                text-align: right;
              }
            }
          }
        }
      }
    }
  }
  .gree-new-error {
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
        .item-inner {
          padding-bottom: 120px;
          .item-title {
            p {
              white-space: break-spaces;
            }
          }
          .item-footer {
            color: #fff;
            padding-top: 40px;
            font-size: 38px;
          }
          .item-after {
            white-space: inherit;
            font-size: 38px;
            p {
              width: 100%;
              // line-height: 38px;
              i {
                padding-left: 35px;
              }
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.view.view-error-waring {
  .gree-header {
    background: #ffffff;
  }
  .page {
    padding-bottom: 324px;
    .page-content {
      // padding-bottom: 324px !important;
      // overflow: scroll !important;
      .block {
        margin: 0;
        padding: 0;
        .gree-tabs {
          .gree-tab-bar {
            background: #fff;
          }
        }
      }
    }
  }
  .item-after {
    white-space: normal;
  }
  .toolbar {
    margin: 0 !important;
    height: 324px !important;
    background-color: #f4f4f4 !important;
    .row {
      background-color: #f4f4f4;
      width: 100%;
      height: 100%;
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
  .toolbar-bottom::before {
    height: 0;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
