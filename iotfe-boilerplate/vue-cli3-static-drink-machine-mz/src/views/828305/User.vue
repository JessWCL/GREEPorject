<template>
  <gree-view bg-color="#5BB5F3">
    <gree-page
      no-navbar
      class="page-home"
    >
      <div
        class="page-header"
      >
        <gree-header
          theme="transparent"
          :left-options="{preventGoBack: true}"
          @on-click-back="goBack"
          :right-options="{showMore: true}"
          @on-click-more="moreInfo"
        >{{ devname }}</gree-header> 
      </div>
      <!-- 中间及下面 -->
      <div class="page-main">
        <span class="plugining">插件开发中敬请期待~</span>
      </div>
    </gree-page>
  </gree-view>
</template>

<script>
import { Header } from 'gree-ui';
import { mapState } from 'vuex';
// closePage,
// editDevice,
// changeBarColor,
import {
  changeBarColorPlugin,
  closePagePlugin,
  editDevicePlugin
} from '../../api/utils';
import homeConfig from '../../mixins/config/home';
// import Carousel from '../../components/Carousel';

export default {
  components: {
    [Header.name]: Header
  },
  mixins: [homeConfig],
  data() {
    return {};
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      functype: state => state.functype,
      mac: state => state.mac
    }),
    /**
     * @description 主页面下根据开关状态更新状态栏颜色
     */
    ColorChange() {
      let color = false;
      this.Switch ? (color = '#51A9F9') : (color = '#AEB2B6');
      changeBarColorPlugin(color);
      return color;
    }
  },
  methods: {
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
      editDevicePlugin(this.mac);
    }
  }
};
</script>
