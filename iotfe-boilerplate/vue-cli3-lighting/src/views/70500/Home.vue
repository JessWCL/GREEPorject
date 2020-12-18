<template>
  <gree-view>
    <gree-page
      no-navbar
      class="page-home"
    >
      <div
        class="page-header"
        :style="{backgroundImage:'url(' + head_bg + ')'}"
      >
        <gree-header
          theme="transparent"
          :left-options="{preventGoBack: true}"
          @on-click-back="goBack"
          :right-options="{showMore: true}"
          @on-click-more="moreInfo"
          v-if="!isScene"
        >{{ devname }}
        </gree-header>
        <gree-header
          theme="transparent"
          :left-options="{preventGoBack: true}"
          @on-click-back="goBack"
          v-else
        >{{ devname }}
          <div 
            slot="right" 
            class="header-right">
            <a @click="sceneSave"> 
              {{ $language("home.btnSave") }}
            </a> 
          </div>
        </gree-header>
        <div class="light-mode">
          <img 
            src="../../assets/img/light_icon.png" 
            alt="">
          <span>{{ lightMode[Pow] }}</span>
        </div>
      </div>
      <div class="page-main">
        <!-- <svg-icon icon-class="auto"/> -->
        <div class="btn-control">
          <div
            class="btn-open-img"
            @click="handleBtn()"
          >{{ !Pow ? '开' :'关' }} </div>
        </div>
      </div>
    </gree-page>
    <!-- 底部按钮 -->
    <gree-toolbar
      position="bottom"
      no-hairline
    >
      <gree-row>
        <gree-col
          width="25"
          v-for="(item, index) in footList"
          :key="index"
          @click.native="setFunction(index)"
        >
          <div class="icon">
            <img :src="require('@/assets/img/' + item.ImgName + '.png')" />
          </div>
          <h3>
            {{ $language(item.Name) }}
            <i
              class="triangle"
              v-if="item.moreBtn"
            ></i>
          </h3>
        </gree-col>
      </gree-row>
    </gree-toolbar>
    <!-- 底部弹出层按钮 -->
    <function-list :is-popup-show="isPopupShow"></function-list>
  </gree-view>
</template>

<script>
import {
  Header,
  List,
  Item,
  // Block,
  Icon,
  ActivityIndicator,
  ScrollView,
  ScrollViewMore,
  ToolBar,
  Row,
  Col
} from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import btnConfig from '@/mixins/utils/config/btn';
import SvgIcon from '../../components/SvgIcon';
import FunctionList from '../../components/FunctionList';
// import canvansjh from '../../components/canvansyh';
// closePage,
// editDevice,
// changeBarColor,
import {
  changeBarColorPlugin,
  closePagePlugin,
  tuyaDeviceMorePlugin,
  getCCcmdPlugin
} from '../../api/utils';

export default {
  components: {
    [Header.name]: Header,
    [List.name]: List,
    [Item.name]: Item,
    // [Block.name]: Block,
    [Icon.name]: Icon,
    [ActivityIndicator.name]: ActivityIndicator,
    [ScrollView.name]: ScrollView,
    [ScrollViewMore.name]: ScrollViewMore,
    [ToolBar.name]: ToolBar,
    [Row.name]: Row,
    [Col.name]: Col,
    SvgIcon,
    FunctionList
  },
  mixins: [btnConfig],
  data() {
    return {
      isPopupShow: {},
      percentage: 60
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      devname: state => state.deviceInfo.name,
      isScene: state => state.isScene,
      mac: state => state.mac,
      Pow: state => state.dataObject.Pow
    }),
    /**
     * @description 主页面下根据开关状态更新背景图
     */
    head_bg() {
      return this.Pow
        ? require('@/assets/img/bg_on.png')
        : require('@/assets/img/bg_off.png');
    },
    /**
     * @description 主页面下根据开关状态更新状态栏颜色
     */
    ColorChange() {
      let color = false;
      this.Pow ? (color = '#51A9F9') : (color = '#AEB2B6');
      changeBarColorPlugin(color);
      return color;
    }
  },
  watch: {},
  mounted() {},
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
      closePagePlugin();
    },
    /**
     * @description 编辑设备名称
     */
    moreInfo() {
      tuyaDeviceMorePlugin(this.mac);
    },
    /**
     * @description 场景模式的保存
     */
    sceneSave() {
      const keys = Object.keys(this.dataObject);
      const opt = [];
      const p = [];
      const remarks = '...';
      for (let i = 0, j = keys.length; i < j; i += 1) {
        opt.push(keys[i]);
        p.push(this.dataObject[keys[i]]);
      }
      const json = JSON.stringify({ opt, p, t: 'cmd', sub: this.g_mac });
      console.log('保存的数据: ', json);
      getCCcmdPlugin(this.mac, json, remarks, JSON.stringify(p));
    },
    handleBtn() {
      const controlStatus = this.Pow ? 0 : 1;

      this.setDataObject({ Pow: controlStatus });
      this.sendCtrl({ Pow: controlStatus });
    },
    setFunction(index) {
      switch (index) {
        case 0:
          this.$set(this.isPopupShow, 'bottom', true);
          break;
        default:
          break;
      }
    }
  }
};
</script>
