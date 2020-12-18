<template>
  <div>
    <gree-block v-if="!isSearching">一日三餐</gree-block>
    <swiper
      v-if="!isSearching"
      ref="swiper"
      @touchstart.native="touchstart"
      @touchmove.native="touchmove"
      @touchend.native="touchend"
      @touchcancle.native="touchcancle"
      @slide-change="onSlideChange"
      :options="swiperOption">
      <swiper-slide
        v-for="(item, index) in RecommendedMenu.data"
        :key="index"
        :data-background="item.Pic"
        @click="toDetailPage(item)"
        class="swiper-slide">
        <gree-image
          @click="toDetailPage(item)"
          :src="item.Pic"
          style="height: 100%"
          width="100%">
          <template v-slot:loading>
            <gree-activity-indicator
              type="spinner"
              :size="30" />
          </template>
          <template v-slot:error>加载失败</template>
        </gree-image>
        <gree-tag
          v-show="item.Mid"
          shape="fillet"
          type="fill"
          fill-color="rgba(0, 0, 0, .6)"
          font-color="#ffffff">
          {{ item.Type | toZH }}{{ item.Mid | toDeviceNameStr }}
        </gree-tag>
      </swiper-slide>
      <div
        class="swiper-pagination"
        slot="pagination"></div>
    </swiper>
    <!-- 尾部 -->
    <gree-block v-if="!isSearching">厨电菜谱</gree-block>
    <div
      class="page-footer"
      v-if="!isSearching">
      <div
        class="item"
        :key="index"
        v-for="(item, index) in functionList">
        <img
          :src="item.url"
          @click="footerFunction(index)" />
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Header, PowerOff, SearchBar, Popup, Block, Button, Divider, Image, ActivityIndicator, Tag, ScrollView } from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import { closePage } from '@/../../static/lib/PluginInterface.promise';
import homeConfig from '@/mixins/config/home.js'; // home 配置文件
import * as types from '../../store/types';
import {
  DeviceRiceCooker,
  DeviceSteamingBaking,
  DeviceHotPot,
  DeviceNull
} from '../../api/constant';

export default {
  name: 'HomeMainPage',
  components: {
    [Header.name]: Header,
    [PowerOff.name]: PowerOff,
    [Popup.name]: Popup,
    [Block.name]: Block,
    [Button.name]: Button,
    [Divider.name]: Divider,
    [Image.name]: Image,
    [ActivityIndicator.name]: ActivityIndicator,
    [Tag.name]: Tag,
    [ScrollView.name]: ScrollView,
    [SearchBar.name]: SearchBar,
  },

  filters: {
    toZH(value) {
      if (value === 'breakfast') {
        return '早餐 • ';
      } else if (value === 'lunch') {
        return '午餐 • ';
      } else if (value === 'dinner') {
        return '晚餐 • ';
      }
      return '';
    },
    toDeviceNameStr(value) {
      if (value === '1') {
        return DeviceRiceCooker.deviceTypeName;
      } else if (value === '2') {
        return DeviceSteamingBaking.deviceTypeName;
      } else if (value === '3') {
        return DeviceHotPot.deviceTypeName;
      }
      return '';
    }
  },

  mixins: [homeConfig],

  data() {
    return {
      showPowerOff: false,
      showDrawer: false,
      swiperOption: {
        observer: true,
        observerParents: true,
        observeSlideChildren: true,
        loop: false,
        spaceBetween: 5,
        pagination: {
          el: '.swiper-pagination',
        },
        autoplay: false,
        lazy: true,
      },
      value: '',
      isSearching: false
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      dataObjectCache: state => state.dataObjectCache,
      cacheCid: state => state.dataObjectCache.Cid,
      devname: state => state.deviceInfo.name,
      functype: state => state.functype,
      mac: state => state.mac,
      RecommendedMenu: state => state.RecommendedMenu,
    }),

    swiper() {
      return this.$refs.swiper;
    },
    // version() {
    //   return `V${version.slice(0, 3)}`;
    // }
  },

  watch: {
    RecommendedMenu(newV) {
      if (newV.data.length > 0) {
        const that = this;
        setTimeout(() => {
          that.$refs.swiper.swiper.autoplay.start();
        }, 3000);
      }
    }
  },

  created() {
    const { RecommendedMenu } = this;
    if (RecommendedMenu.data.length === 0) {
      this.getRecommendedMenu();
    }
  },

  mounted() {
    // 版本号 start
    // const scrollDom = document.getElementsByClassName('gree-scroll-view')[0];
    // const vDom = document.createElement('div');
    // vDom.innerText = `智慧菜谱 V${version.slice(0, 3)}`;
    // vDom.className = 'version';
    // scrollDom.appendChild(vDom);
    // 版本号 end
  },

  methods: {
    ...mapMutations({
      setDataObject: types.SET_DATA_OBJECT,
      setDataObjectCache: types.SET_DATA_OBJECT_CACHE,
      initSearchCloudMenu: types.INIT_SEARCH_CLOUD_MENU,
      initCloudMenuDetailSteps: types.INIT_CLOUD_MENU_DETAIL_STEPS,
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL',
      getRecommendedMenu: types.GET_RECOMMENDED_MENU,
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
    goMore() {
      this.$router.push({ name: 'Basket' });
    },

    onFocus() {
      this.isSearching = true;
      this.$router.push({ name: 'Search' });
    },

    onBlur() {
      this.isSearching = false;
    },

    /**
     * @description 隐藏抽屉列表
     */
    hideDrawer() {
      this.showDrawer = false;
    },
    /**
     * @description: 底部功能按钮的点击事件
     */
    footerFunction(index) {
      console.log('btnfunc-', index);
      const { mid } = this.dataObject;
      switch (index) {
        case 0:
          if (mid !== '1') {
            this.initSearchCloudMenu();
            this.setDataObject(DeviceRiceCooker);
          }
          break;
        case 1:
          if (mid !== '2') {
            this.initSearchCloudMenu();
            this.setDataObject(DeviceSteamingBaking);
          }
          break;
        case 2:
          if (mid !== '3') {
            this.initSearchCloudMenu();
            this.setDataObject(DeviceHotPot);
          }
          break;
        default:
          this.setDataObject(DeviceNull);
          break;
      }
      this.$router.push({ name: 'CloudMenuList' });
    },

    touchstart() {
      if (this.timeoutID !== 0) {
        clearTimeout(this.timeoutID);
        console.log('clearTimeout');
        this.timeoutID = 0;
      }
    },

    touchmove() {
    },

    touchend() {
      const that = this;
      this.timeoutID = setTimeout(() => {
        console.log('autoplay');
        that.$refs.swiper.swiper.autoplay.start();
      }, 1000);
    },

    touchcancle() {
      console.log('autoplay');
      this.$refs.swiper.swiper.autoplay.start();
    },

    onSlideChange() {
    },

    toDetailPage(menu) {
      const { Cid, Name, Mid } = menu;
      const { cacheCid } = this;
      if (Cid !== cacheCid) {
        this.setDataObject({ Cid });
        this.initCloudMenuDetailSteps({ Name });
        if (Mid === '1') {
          this.setDataObject(DeviceRiceCooker);
        } else if (Mid === '2') {
          this.setDataObject(DeviceSteamingBaking);
        } else if (Mid === '3') {
          this.setDataObject(DeviceHotPot);
        } else {
          this.setDataObject(DeviceNull);
        }
      }
      this.$router.push({ name: 'CloudMenuDetailSteps' });
    }

  }
};
</script>
