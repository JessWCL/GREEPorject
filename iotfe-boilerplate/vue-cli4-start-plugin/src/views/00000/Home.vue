<template>
  <gree-view :bg-color="bgColor">
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
          <gree-button @click.native="handleClick">按钮</gree-button>
        </gree-block>
      </div>
    </gree-page>
  </gree-view>
</template>

<script>
import { Header, Block, BlockHeader, BlockFooter, Divider, Button, NoticeBar, Row, Col, Icon, Tag } from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import { closePage, changeBarColor, editDevice } from '../../../../static/lib/PluginInterface.promise';
import * as types from '../../store/types';

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
    bgColor() {
      let color = false;
      if (this.$route.name === 'Home') {
        color = '#f4f4f4';
      }
      color ? changeBarColor(color) : '';
      return color;
    }
  },
  methods: {
    ...mapMutations({
      setDataObject: types.SET_DATA_OBJECT
    }),
    ...mapActions({
      sendCtrl: types.SEND_CTRL
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
      editDevice(this.mac);
    },

    handleClick() {
      // 根据自己实际业务逻辑来
      let { Pow } = this.dataObject;
      Pow = Number(!Pow); // 开关机取反
      this.setDataObject({ Pow }); // 同步更新store中的设备状态
      this.sendCtrl({ Pow }); // 向设备下发控制命令
    },

    /**
     * @description 保存场景控制指令
     */
    save() {
      const { Pow } = this;
      let zh = {};
      // TODO: 场景开机才有文案显示  根据实际业务内容修改
      if (Pow) {
        zh = {
          mode_1: '模式自动', // 非动态的，getRemarks方法直接取值
          mode_2: '模式睡眠',
          mode_3: '模式手动',
          mode_4: '模式快速',
          light_0: '灯光关',
          light_1: '灯光开',
          AirChildLock_0: '童锁关',
          AirChildLock_1: '童锁开',

          wspd: '风速' // 动态的，getRemarks方法会拼接字段值
        };
      }
      this.sendFunctypeCtrl(zh);
    }
  }
};
</script>
