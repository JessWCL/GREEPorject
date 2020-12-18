<template>
  <gree-view :bg-color="statusBarColor">
    <gree-page no-navbar class="page-home">
      <div class="page-header" :style="{ backgroundImage: 'url(' + head_bg + ')' }">
        <gree-header
          theme="transparent"
          :title="deviceName"
          :left-options="{ preventGoBack: true }"
          @on-click-back="goBack"
          :right-options="{ showMore: !functype }"
          @on-click-more="moreInfo"
        >
        <a slot="right" v-show="functype" @click="clickMore">保存</a>
      </gree-header>
        <div class="curtain">
          <div class="curtain-left"></div>
          <div class="curtain-right"></div>
        </div>
      </div>
      <div class="page-main">
        <gree-block>
          <gree-row>
            <gree-col>
              <gree-button round @click="doHandle(0)" />
              <gree-button round @click="doHandle(1)" />
              <gree-button round @click="doHandle(2)" />
            </gree-col>
          </gree-row>
        </gree-block>
      </div>
      <div v-show="false">{{ ColorChange }}</div>
    </gree-page>
    <!-- 底部按钮 -->
    <!-- <gree-toolbar position="bottom" no-hairline>
      <gree-row>
        <gree-col :width="25" v-for="(item, index) in JsonData.FootList" :key="index" @click.native="setFunction(index)">
          <div class="icon">
            <img :src="require('@/assets/img/' + item.ImgName + '.png')" />
          </div>
          <h3>{{ $language(item.Name) }}</h3>
        </gree-col>
      </gree-row>
    </gree-toolbar> -->
  </gree-view>
</template>

<script>
import { Header, List, Item, Block, Row, Col, Button, Icon, ToolBar, Toast } from 'gree-ui';
import { TimelineLite, Linear } from 'gsap';
import { mapState, mapMutations, mapActions } from 'vuex';
import homeConfig from '@/mixins/config/80501/home';
import throttle from 'lodash/throttle';
import { closePage, changeBarColor, timerListDevice, getCurtainOpenPercent, tuyaDeviceMore, showToast } from '../../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [Header.name]: Header,
    [List.name]: List,
    [Item.name]: Item,
    [Block.name]: Block,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [ToolBar.name]: ToolBar
  },
  mixins: [homeConfig],
  data() {
    return {
      statusBarColor: '#0C84E9',
      head_bg: require('@/assets/img/bg_header.png'),
      timeline1: null,
      timeline2: null,
      progress: 0,
      duration: 0,
      curtainWidth: 156.5
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      deviceName: state => state.dataObject.deviceName,
      functype: state => state.functype,
      mac: state => state.mac
    }),
    /**
     * @description 主页面下更新状态栏颜色
     */
    ColorChange() {
      let color = false;
      if (this.$route.name === 'Home') {
        color = this.statusBarColor;
      }
      color ? changeBarColor(color) : '';
      return color;
    }
  },

  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT'
    }),
    ...mapActions({
      sendTuyaCtrl: 'TUYA_CONTROL_DEV',
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
      const { mac } = this;
      console.log('[tuyaDeviceMore] mac: ' + mac);
      tuyaDeviceMore(mac);
    },
    doHandle(index) {
      let mach_operate = 'FZ';
      switch (index) {
        case 0:
          showToast('窗帘打开', 0);
          mach_operate = 'ZZ'; // ZZ打开
          break;
        case 1:
          showToast('窗帘暂停', 0);
          mach_operate = 'STOP'; // STOP暂停
          break;
        case 2:
          showToast('窗帘关闭', 0);
          mach_operate = 'FZ'; // FZ关闭
          break;
        default:
          break;
      }
      this.setDataObject({ mach_operate });
      this.sendTuyaCtrl({ mach_operate });
    },
    /**
     * @description 点击底部功能列表
     */
    setFunction(val) {
      switch (val) {
        case 0:
          // timerListDevice(this.mac);
          break;
        default:
          break;
      }
    }
  }
};
</script>
