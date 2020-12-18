<template>
  <gree-view
    class="view-home"
    bg-color="#f4f4f4">
    <!-- 头部 -->
    <gree-header
      :left-options="{preventGoBack: true}"
      :right-options="{showMore: false}"
      @on-click-back="goBack"
    >{{ devname }}
      <a
        @click="goMore"
        slot="right">
        <img
          :src="require('@/assets/img/shopping_cart.png')"
          alt="">
      </a>
    </gree-header>
    <gree-page class="page-home">
      <div class="page-main">
        <gree-search-bar
          v-model="keyword"
          placeholder="请输入要搜索的菜谱"
          ref="search"
          shape="round"
          :show-action="isShowAction"
          @search="onSearch"
          @focus="onFocus"
          @blur="onBlur"
        >
          <div
            slot="action"
            @click="onClickSearch">搜索</div>
        </gree-search-bar>
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
      </div>
    </gree-page>
  </gree-view>
</template>

<script>
import {
  Header,
  PowerOff,
  SearchBar,
  Popup,
  Block,
  Button,
  Divider,
  Image,
  ActivityIndicator,
  Tag,
  ScrollView,
  Row,
  Col,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from 'gree-ui';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import { closePage } from '@/../../static/lib/PluginInterface.promise';
import homeConfig from '@/mixins/config/home.js'; // home 配置文件
import * as types from '../../store/types';
import {
  DeviceRiceCooker,
  DeviceSteamingBaking,
  DeviceHotPot,
  DeviceNull,
  LS_KEY_GREE_SMART_COOKBOOK_HISTORY_LIST
} from '../../api/constant';
// import HomeMainPage from './HomeMainPage.vue';
// import SearchPage from './SearchPage.vue';

export default {
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
    [Row.name]: Row,
    [Col.name]: Col,
    [ScrollView.name]: ScrollView,
    [SearchBar.name]: SearchBar,
    [Card.name]: Card,
    [CardHeader.name]: CardHeader,
    [CardContent.name]: CardContent,
    [CardFooter.name]: CardFooter,
    // HomeMainPage,
    // SearchPage,
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
      usersPromise: null,
      keyword: '',
      isSearching: false,
      isShowHistory: true,
      isClickedKeyword: false,
      historyList: [],
      isTyping: false,
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
      value: ''
    };
  },
  computed: {
    ...mapGetters(['cloudMenuList', 'searchCloudMenuList']),
    ...mapState({
      dataObject: state => state.dataObject,
      // keyword: state => state.dataObject.keyword,
      dataObjectCache: state => state.dataObjectCache,
      cacheCid: state => state.dataObjectCache.Cid,
      devname: state => state.deviceInfo.name,
      functype: state => state.functype,
      mac: state => state.mac,
      RecommendedMenu: state => state.RecommendedMenu,
      GlobalSearchCloudMenu: state => state.GlobalSearchCloudMenu,
    }),

    swiper() {
      return this.$refs.swiper;
    },

    isShowAction() {
      return this.keyword.length > 0;
    }

  },

  watch: {
    keyword(newV, oldV) {
      console.log(newV, oldV);
    },
    RecommendedMenu(newV) {
      if (newV.data.length > 0) {
        const that = this;
        this.timer = setTimeout(() => {
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
    try {
      let historyList = localStorage.getItem(LS_KEY_GREE_SMART_COOKBOOK_HISTORY_LIST) || '[]';
      historyList = JSON.parse(historyList);
      if (Array.isArray(historyList)) {
        this.historyList = historyList;
      } else {
        this.historyList = [];
      }
    } catch (e) {
      console.error(e);
      this.historyList = [];
    }
  },

  destroyed() {
    clearTimeout(this.timer);
  },

  methods: {
    ...mapMutations({
      setDataObject: types.SET_DATA_OBJECT,
      setDataObjectCache: types.SET_DATA_OBJECT_CACHE,
      initSearchCloudMenu: types.INIT_SEARCH_CLOUD_MENU,
      initCloudMenuDetailSteps: types.INIT_CLOUD_MENU_DETAIL_STEPS,
      initGlobalSearchCloudMenu: types.INIT_GLOBAL_SEARCH_CLOUD_MENU,
    }),
    ...mapActions({
      sendCtrl: types.SEND_CTRL,
      // getRecommendedMenu: types.GET_RECOMMENDED_MENU,
      getGlobalSearchCloudMenu: types.GET_GLOBAL_SEARCH_CLOUD_MENU,
      getRecommendedMenu: types.GET_RECOMMENDED_MENU,
    }),

    /**
     * @description 返回键
     */
    goBack() {
      const { isSearching } = this;
      if (isSearching) {
        this.isSearching = false;
        this.$refs.search.inputValue = '';
        this.$refs.search.onInputChange(null, '');
      } else {
        closePage();
      }
    },
    /**
     * @description 编辑设备名称
     */
    goMore() {
      this.$router.push({ name: 'Basket' });
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
    },

    onFocus() {
      // this.isSearching = true;
      this.setDataObject({ keyword: '' });
      this.$router.push({ name: 'SearchPage' });
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

    onSlideChange() {},

    async onClickSearch() {
      const { keyword } = this;
      if (keyword.trim() === '') return;
      this.$refs.refSearchPage.onClickSearch(keyword);
    },

    async onSearch() {
      const { keyword } = this;
      if (keyword.trim() === '') return;
      this.$refs.refSearchPage.onSearch(this.keyword);
    },

    onUpdateKeyword(keyword) {
      this.$refs.search.inputValue = keyword;
      this.$refs.search.onInputChange(null, keyword);
    }

  }
};
</script>
