<template>
  <gree-view>
    <gree-page class="page-home" :style="bgImage">
      <gree-header
        :left-options="{ preventGoBack: true }"
        @on-click-back="goBack"
        :right-options="{ showMore: !isScene }"
        @on-click-more="moreInfo"
        >新风净化机
        <a v-if="isScene" slot="right" @click="sceneSave">保存</a>
      </gree-header>

      <gree-tab-bar v-if="!isScene" v-model="tabbarIndex" :items="items2" :ink-length="50" @change="changeIndex" />
      <div v-else class="blank-block" />
      <!-- 空白站位 -->

      <keep-alive>
        <Box v-if="tabbarIndex === 1" />
      </keep-alive>
      <keep-alive>
        <Control v-if="tabbarIndex === 2" class="page-main" />
      </keep-alive>

      <!-- 小图标 -->
      <div class="icons">
        <div class="col">
          <span
            class="iconfont mini-icon"
            :class="`icon-${miniIcon.key}`"
            v-for="(miniIcon, index) in DeviceStatusIcon"
            :key="index"
            v-show="!miniIcon.isHidden && miniIcon.key !== 'undefined'"
          />
        </div>
      </div>
    </gree-page>
    <!-- 底部按钮 -->
    <BottomBtn v-if="tabbarIndex === 2" @btn-popup="bottomBtnPopop" @to-new-page="toNewPage" />

    <gree-popup v-model="isModePopupShowBottom.bottom" position="bottom" @hide="hidePopup">
      <div class="popup-bottom">
        <div class="arrow-down">
          模式<img src="@/assets/img/mode-tip.png" alt="" @touchend.stop="showModeTip('bottom')" />
        </div>
        <gree-row>
          <gree-col
            :disabled="item.disabled"
            v-for="(item, index) in ModeList"
            :key="index"
            @click.native="handleFunc(item)"
            :class="{ 'set-gray': item.disabled }"
          >
            <!-- 底部功能显示控制(坑爹UI, 不切svg，只切png, 此处作废) -->
            <!-- <div class="circle">
              <span class="iconfont" :class="`icon-${item.icon}`"></span>
            </div> -->
            <img :src="[require(`../../assets/img/${item.icon}_${item.imgSatus}.png`)]" />
            <span class="item-name">
              {{ item.name }}
              <img class="icon-more" src="../../assets/img/ic_more.png" v-if="item.actionType === 'route'" />
            </span>
          </gree-col>
        </gree-row>
      </div>
    </gree-popup>
    <div style="display: none">{{ tabIndex }}</div>
  </gree-view>
</template>

<script>
import { Header, List, Item, Block, Row, Col, Button, Icon, ToolBar, TabBar, Popup, Dialog } from 'gree-ui';
import Control from '../../components/Control';
import Box from '../../components/Box';
import BottomBtn from '../../components/BottomBtn';
import { mapState, mapMutations, mapActions } from 'vuex';
import { closePage, editDevice, timerListDevice, getCCcmd } from '../../../../static/lib/PluginInterface.promise';
import homeConfig from '@/mixins/config/60a0/home';

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
    [ToolBar.name]: ToolBar,
    [TabBar.name]: TabBar,
    [Popup.name]: Popup,
    [Dialog.name]: Dialog,
    Control,
    Box,
    BottomBtn
  },
  mixins: [homeConfig],
  data() {
    return {
      svgRadius: 0,
      lottieRadius: 0,
      tabbarIndex: 2,
      items2: [
        { name: 1, label: '盒子' },
        { name: 2, label: '控制' }
      ],
      isPopupShowCenter: {},
      isModePopupShowBottom: {}
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      devname: state => state.deviceInfo.name,
      isScene: state => state.isScene,
      isfromSetAirquality: state => state.isfromSetAirquality,
      isShowPopUp: state => state.isShowPopUp,

      mac: state => state.mac,
      mainmac: state => state.mainmac,
      g_mac: state => state.g_mac,

      Pow: state => state.dataObject.Pow,
      FanMod: state => state.dataObject.FanMod,
      FanModNames: state => state.data.FanMod.rNames,
      Inloop: state => state.dataObject.Inloop,
      Timer: state => state.dataObject.Timer,
      RunMod: state => state.dataObject.RunMod,
      tabIndex(state) {
        const value = state.dataObject.tabIndex;
        if (value) {
          this.tabbarIndex = value;
        }
        return value;
      }
    }),

    bgImage() {
      if (this.tabbarIndex === 2) {
        return `background-image:url(${require('@/assets/img/bg.png')})`;
      }
      return false;
    }
  },
  watch: {
    Pow(newV) {
      if (newV === 0) {
        this.$set(this.isModePopupShowBottom, 'bottom', false);
      }
    }
  },
  mounted() {
    if (this.isfromSetAirquality && this.tabbarIndex === 2) {
      this.$set(this.isModePopupShowBottom, 'bottom', true);
      this.setShowPopop(true);
      this.setFromSetAirquality(false);
    }
  },
  methods: {
    ...mapMutations({
      setShowPopop: 'SET_SHOW_POPOP',
      setFromSetAirquality: 'SET_FORM_SETAIT_PAGE',
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
      editDevice(this.g_mac);
    },
    changeIndex(item, index, prevIndex) {
      console.log(`currentIndex: ${index}, prevIndex: ${prevIndex}, label: ${item.label}`);
      this.setDataObject({ tabIndex: Number(item.name) });
    },
    showModeTip(type) {
      Dialog.alert({
        title: '提醒',
        content:
          '<p style="font-size: 15px; margin-bottom: 15px"><b>运行控制模式：</b>新风机由用户手动控制启停，按设定值运行。</p><p style="font-size: 15px; margin-bottom: 15px"><b>联动控制模式：</b>新风机根据多联机状态自动启停。</p><p style="font-size: 15px;"><b>自动控制模式：</b>新风机根据室内空气质量目标值自动启停。需搭配空气盒子使用。</p> ',
        confirmText: '我知道了'
      });
    },

    bottomBtnPopop(key) {
      switch (key) {
        case 'moshi':
          this.$set(this.isModePopupShowBottom, 'bottom', true);
          this.setShowPopop(true);
          break;
        case 'neixunhuan':
          const setObj = { Inloop: !this.Inloop + 0 };
          this.setDataObject(setObj);
          this.sendCtrl(setObj);
          break;
        default:
          break;
      }
    },

    toNewPage(key) {
      switch (key) {
        case 'qingxifuwei':
          this.$router.push({
            name: 'Filter'
          });
          break;
        case 'yuyue':
          timerListDevice(this.mac);
          break;
        default:
          break;
      }
    },

    /**
     * @description 功能触发事件
     */
    handleFunc(item) {
      switch (item.actionType) {
        case 'route':
          // 跳转路由
          this.$router.push({
            name: 'SetAirquality'
          });
          return;
          break;
        case 'send':
          break;
      }
      const sendObj = {};
      const key = item.value.split('_')[0];
      const value = item.value.split('_')[1] >> 0;
      item.otherProtoclList.forEach(element => {
        const key = element.split('_')[0];
        const value = element.split('_')[1] >> 0;
        sendObj[key] = value;
      });
      sendObj[key] = value;
      this.setDataObject(sendObj);
      this.sendCtrl(sendObj);
    },

    hidePopup() {
      this.$set(this.isModePopupShowBottom, 'bottom', false);
      this.setShowPopop(false);
    },

    /**
     * @description 场景保存
     */
    sceneSave() {
      const keys = ['Pow', 'FanMod', 'WdSpd', 'IDUAirQu', 'Inloop'];
      const opt = [];
      const p = [];
      for (let i = 0, j = keys.length; i < j; i += 1) {
        opt.push(keys[i]);
        p.push(this.dataObject[keys[i]]);
      }
      const json = JSON.stringify({ opt, p, t: 'cmd', sub: this.g_mac });
      console.log('json', json);
      getCCcmd(this.mac, json, '...', JSON.stringify(p));
    }
  }
};
</script>
