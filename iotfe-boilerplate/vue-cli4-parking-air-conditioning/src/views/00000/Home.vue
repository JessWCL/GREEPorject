<template>
  <gree-view bg-color="#1d59aa">
    <gree-header
      :title="devname"
      :left-options="{ preventGoBack: true }"
      @on-click-back="goBack"
      :right-options="{ showMore: true }"
      @on-click-more="moreInfo"
    />
    <gree-page class="page-home">
      <div class="page-main">
        <gree-notice-bar type="activity" icon="voice">一套基于 Vue 2.0 的移动端UI组件库</gree-notice-bar>
        <gree-block>
          <p>专为物联网研究院前端小组Mobile App开发而生</p>
        </gree-block>
        <gree-divider />
        <gree-block>
          <gree-block-header>项目介绍</gree-block-header>
          <gree-row>
            <gree-col v-for="(item, index) in introduce" :key="index" width="50">
              <gree-tag size="large" shape="fillet" type="ghost" font-color="#d29c52">{{ item }}</gree-tag>
            </gree-col>
          </gree-row>
          <gree-block-footer>Vue CLI4.0更新了什么？具体请查阅官方文档！</gree-block-footer>
        </gree-block>
        <gree-divider />
        <gree-block>
          <gree-button>按钮</gree-button>
        </gree-block>
      </div>
    </gree-page>
  </gree-view>
</template>

<script>
import { Header, Block, BlockHeader, BlockFooter, Divider, Button, NoticeBar, Row, Col, Icon, Tag } from 'gree-ui';
import { mapState, mapMutations } from 'vuex';
import { closePage, changeBarColor } from '../../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [Header.name]: Header,
    [Block.name]: Block,
    [BlockHeader.name]: BlockHeader,
    [BlockFooter.name]: BlockFooter,
    [Divider.name]: Divider,
    [Button.name]: Button,
    [NoticeBar.name]: NoticeBar,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Tag.name]: Tag
  },
  data() {
    return {
      introduce: [
        'Vue CLI4.0',
        'GreeUI组件按需加载',
        'Sass',
        'Webpack 4',
        'Vuex',
        'rem适配方案',
        '多环境配置',
        'babel低版本浏览器兼容',
        'Eslint+Pettier统一开发规范'
      ]
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      devname: state => state.deviceInfo.name,
      functype: state => state.functype,
      mac: state => state.mac
    }),
    power_off_bg() {
      const bg = require('@/assets/img/bg_off.png');
      return bg;
    },
    /**
     * @description 主页面下更新状态栏颜色
     */
    ColorChange() {
      let color = false;
      if (this.$route.name === 'Home') {
        color = '#000000';
      }
      color ? changeBarColor(color) : '';
      return color;
    }
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT'
    }),
    /**
     * @description 返回键
     */
    goBack() {
      closePage();
    },
    /**
     * @description 编辑设备名称
     */
    moreInfo() {
      console.log('跳转编辑界面');
    }
  }
};
</script>
