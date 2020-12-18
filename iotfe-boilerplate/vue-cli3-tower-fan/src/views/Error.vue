<template>
  <gree-view id="errorView">
    <gree-header>故障详情</gree-header>
    <!-- <gree-page>
      <gree-error-page
        type="malfunction"
        :bg-url="BgUrl2"
        :text="errorMultiText"
      ></gree-error-page>
    </gree-page> -->
    <gree-page>
      <div class="new-error">
        <div class="gree-new-error">
          <!-- 新版故障 -->
          <gree-list>
            <gree-list-item
              media-item
              :style="{backgroundImage:'url(' + BgUrl2 + ')'}"
              v-for="(item, index) in errorMultiText"
              :key="index"
            >
              <div
                class="logo"
                slot="media"
              >
                {{ item.code }}
                <div class="divider"></div>
              </div>
              <p slot="title">
                <span>{{ item.headtitle }}</span>
                <span>{{ item.title }}</span>
              </p>
              <p slot="after">{{ item.subtitle }}{{ item.text }}</p>
            </gree-list-item>
          </gree-list>
        </div>
      </div>
    </gree-page>
    <div style="position:fixed; left:0;bottom:0;width:100%;background-color:#f4f4f4;">
      <gree-toolbar position="bottom">
        <gree-row>
          <gree-col
            v-for="(item, index) in options"
            :key="index"
            @click.native="setFunction(index)"
          >
            <div class="icon">
              <img :src="require('@/assets/img/errorPage/' + item.ImgName + '.png')" />
            </div>
            <h3>{{ item.Name }}</h3>
          </gree-col>
        </gree-row>
      </gree-toolbar>
    </div>
  </gree-view>
</template>
<script>
import {
  Header,
  Row,
  Col,
  ToolBar,
  ErrorPage,
  Dialog,
  List,
  Item
} from 'gree-ui';
import { toWebPage, callNumber } from '../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [Header.name]: Header,
    [Row.name]: Row,
    [Col.name]: Col,
    [ToolBar.name]: ToolBar,
    [ErrorPage.name]: ErrorPage,
    [List.name]: List,
    [Item.name]: Item
  },
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
      errorMultiText: []
    };
  },
  created() {
    if (this.$store.state.errorList && this.$store.state.errorList.length) {
      this.errorMultiText.splice(0, this.errorMultiText.length, ...(this.$store.state.errorList));
    }
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
