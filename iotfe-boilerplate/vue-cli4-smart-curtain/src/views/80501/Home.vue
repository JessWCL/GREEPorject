<template>
  <gree-view :bg-color="statusBarColor">
    <gree-page no-navbar class="page-home">
      <div class="page-header" :style="{ backgroundImage: 'url(' + head_bg + ')' }">
        <gree-header
          theme="transparent"
          :title="devname"
          :left-options="{ preventGoBack: true }"
          @on-click-back="goBack"
          :right-options="{ showMore: !functype }"
          @on-click-more="moreInfo"
        />
        <div class="curtain">
          <div class="curtain-left"></div>
          <div class="curtain-right"></div>
        </div>
      </div>
      <div class="page-main">
        <gree-block>
          <gree-row>
            <gree-col>
              <gree-button round @click="doHandle(1)" />
              <gree-button round @click="doHandle(2)" />
              <gree-button round @click="doHandle(0)" />
            </gree-col>
          </gree-row>
        </gree-block>
      </div>
      <div v-show="false">{{ ColorChange }}</div>
    </gree-page>
    <!-- 底部按钮 -->
    <gree-toolbar position="bottom" no-hairline>
      <gree-row>
        <gree-col :width="25" v-for="(item, index) in JsonData.FootList" :key="index" @click.native="setFunction(index)">
          <div class="icon">
            <img :src="require('@/assets/img/' + item.ImgName + '.png')" />
          </div>
          <h3>{{ $language(item.Name) }}</h3>
        </gree-col>
      </gree-row>
    </gree-toolbar>
  </gree-view>
</template>

<script>
import { Header, List, Item, Block, Row, Col, Button, Icon, ToolBar, Toast } from 'gree-ui';
import { TimelineLite, Linear } from 'gsap';
import { mapState, mapMutations, mapActions } from 'vuex';
import homeConfig from '@/mixins/config/80501/home';
import throttle from 'lodash/throttle';
import { closePage, editDevice, changeBarColor, timerListDevice, getCurtainOpenPercent } from '../../../../static/lib/PluginInterface.promise';

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
      devname: state => state.deviceInfo.name,
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
  mounted() {
    getCurtainOpenPercent(this.mac)
      .then(res => {
        const curtainInfo = JSON.parse(res);
        console.log('curtainInfo:', curtainInfo);
        this.progress = curtainInfo.p[0] || 0;
        this.duration = curtainInfo.p[1] || 2;
        if (this.progress > 0) {
          this.timeline1 = new TimelineLite();
          this.timeline1.to('.curtain>div', 1, {
            width: parseFloat(((this.progress / 100) * this.curtainWidth) / 54).toFixed(5) + 'rem'
          });
        }
        return res;
      })
      .catch(err => {
        err;
      });
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT'
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL'
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
    open: throttle(function() {
      this.timeline1 = new TimelineLite();
      this.timeline1.to('.curtain>div', 1, { width: 20, ease: Linear.easeInOut }).duration(this.duration);
    }, 1000),
    play: throttle(function() {
      this.timeline1 && this.timeline1.pause();
      this.timeline2 && this.timeline2.pause();
    }, 1000),
    close: throttle(function() {
      this.timeline2 = new TimelineLite();
      this.timeline2.to('.curtain>div', 1, { width: '2.89815rem', ease: Linear.easeInOut }).duration(this.duration);
    }, 1000),
    doHandle(value) {
      if (this.duration <= 0) {
        return Toast.failed('获取窗帘状态异常');
      }
      switch (value) {
        case 0:
          this.close();
          break;
        case 1:
          this.open();
          break;
        case 2:
          this.play();
          break;
        default:
          break;
      }
      this.setDataObject({ Pow: value });
      this.sendCtrl({ Pow: value });
    },
    /**
     * @description 点击底部功能列表
     */
    setFunction(val) {
      switch (val) {
        case 0:
          timerListDevice(this.mac);
          break;
        default:
          break;
      }
    }
  }
};
</script>
