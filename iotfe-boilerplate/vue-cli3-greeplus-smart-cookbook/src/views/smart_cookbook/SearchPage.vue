<template>
  <gree-view
    class="view-home"
    bg-color="#f4f4f4">
    <!-- 头部 -->
    <gree-header
      :left-options="{preventGoBack: false}"
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
      <div class="search-container">
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
        <!-- 历史记录 start -->
        <template v-if="isShowHistory && historyList.length > 0">
          <gree-block class="title">
            <span>历史记录</span>
            <div @click="onClickDelete">
              <img :src="require('../../assets/img/icon_delete.png')" />
            </div>
          </gree-block>
          <div class="history-container">
            <span
              class="history-item"
              :key="index"
              @click="onClickKeyword(item)"
              v-for="(item, index) in historyList">{{ item }}</span>
          </div>
        </template>
        <!-- 历史记录 end -->

        <Promised :promise="promise">
          <!-- Use the "pending" slot to display a loading message -->
          <template v-slot:pending>
            <gree-row>
              <gree-col
                v-for="(item, index) in 6"
                :key="`loading-col-${index}`">
                <gree-card class="loading">
                  <gree-card-content>
                    <gree-image
                      src=""
                      width="100%">
                      <template v-slot:loading>
                        <gree-activity-indicator
                          type="spinner"
                          :size="30" />
                      </template>
                      <template v-slot:error>&nbsp;</template>
                    </gree-image>
                  </gree-card-content>
                  <gree-card-footer>
                    <h3>&nbsp;</h3>
                    <p>&nbsp;</p>
                  </gree-card-footer>
                </gree-card>
              </gree-col>
            </gree-row>
          </template>
          <!-- The default scoped slot will be used as the result -->
          <template v-slot="data">
            <!-- <div>{{ JSON.stringify(data) }}</div> -->
            <gree-row>
              <gree-col
                v-for="(item, index) in searchCloudMenuList"
                :key="`loading-${index}`">
                <gree-card @click.native="toDetailPage(item)">
                  <gree-card-content>
                    <gree-image
                      :src="item.Pic"
                      width="100%">
                      <template v-slot:loading>
                        <gree-activity-indicator
                          type="spinner"
                          :size="30" />
                      </template>
                      <template v-slot:error>加载失败</template>
                    </gree-image>
                  </gree-card-content>
                  <gree-card-footer>
                    <h3>{{ item.Name }}</h3>
                    <p>{{ item.FoodsToString }}</p>
                  </gree-card-footer>
                </gree-card>
              </gree-col>
            </gree-row>
            <gree-divider>全部已加载</gree-divider>
          </template>
          <!-- The "rejected" scoped slot will be used if there is an error -->
          <template v-slot:rejected="error">
            <gree-block class="title no-result">
              对不起，没有搜索到相关菜谱
            </gree-block>
            <Promised :promise="promiseRecommend">
              <!-- Use the "pending" slot to display a loading message -->
              <template v-slot:pending>
                <gree-row>
                  <gree-col
                    v-for="(item, index) in 4"
                    :key="`loading-col-${index}`">
                    <gree-card class="loading">
                      <gree-card-content>
                        <gree-image
                          src=""
                          width="100%">
                          <template v-slot:loading>
                            <gree-activity-indicator
                              type="spinner"
                              :size="30" />
                          </template>
                          <template v-slot:error>&nbsp;</template>
                        </gree-image>
                      </gree-card-content>
                      <gree-card-footer>
                        <h3>&nbsp;</h3>
                        <p>&nbsp;</p>
                      </gree-card-footer>
                    </gree-card>
                  </gree-col>
                </gree-row>
              </template>
              <!-- The default scoped slot will be used as the result -->
              <template v-slot="data">
                <gree-block class="title">
                  <span>您可以试试</span>
                </gree-block>
                <gree-row>
                  <gree-col
                    v-for="(item, index) in data.data"
                    v-show="true"
                    :key="`loading-${index}`">
                    <gree-card @click.native="toDetailPage(item)">
                      <gree-card-content>
                        <gree-image
                          :src="item.Pic"
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
                          <!-- {{ item.Type | toZH }} -->
                          {{ item.Mid | toDeviceNameStr }}
                        </gree-tag>
                      </gree-card-content>
                      <gree-card-footer>
                        <h3>{{ item.Name }}</h3>
                        <p>{{ item.FoodsToString }}</p>
                      </gree-card-footer>
                    </gree-card>
                  </gree-col>
                </gree-row>
              </template>
            </Promised>
          </template>
        </Promised>
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
  CardFooter
} from 'gree-ui';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import { Promised } from 'vue-promised';
import { closePage, showToast } from '@/../../static/lib/PluginInterface.promise';
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
    Promised,
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
      promise: null,
      promiseRecommend: null,
      isShowHistory: true,
      isClickedKeyword: false,
      historyList: [],
      isTyping: false,
    };
  },
  computed: {
    ...mapGetters(['searchCloudMenuList']),
    ...mapState({
      dataObject: state => state.dataObject,
      _keyword: state => state.dataObject.keyword,
      dataObjectCache: state => state.dataObjectCache,
      cacheCid: state => state.dataObjectCache.Cid,
      devname: state => state.deviceInfo.name,
      functype: state => state.functype,
      mac: state => state.mac,
      GlobalRecommendedMenu: state => state.GlobalRecommendedMenu,
      GlobalSearchCloudMenu: state => state.GlobalSearchCloudMenu,
    }),

    keyword: {
      get() {
        return this._keyword;
      },
      set(keyword) {
        this.setDataObject({ keyword });
      }
    },

    swiper() {
      return this.$refs.swiper;
    },

    isShowAction() {
      return this.keyword.length > 0;
    },

  },

  created() {
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

  mounted() {
    const { keyword } = this;
    // 第三级页面返回时不为空
    if (keyword) {
      this.queryKeywordCloudMenu(keyword);
      this.$refs.search.inputValue = keyword;
    } else {
      // 首页进来时为空，需要focus
      try {
        const inputDom = document.querySelector('input');
        inputDom.focus();
      } catch (e) {
        console.error(e);
      } finally {
        showToast('请输入您想要的菜谱名', 0);
      }
    }
  },

  methods: {
    ...mapMutations({
      setDataObject: types.SET_DATA_OBJECT,
      setDataObjectCache: types.SET_DATA_OBJECT_CACHE,
      setGlobalSearchCloudMenu: types.SET_GLOBAL_SEARCH_CLOUD_MENU,
      initSearchCloudMenu: types.INIT_SEARCH_CLOUD_MENU,
      initCloudMenuDetailSteps: types.INIT_CLOUD_MENU_DETAIL_STEPS,
      initGlobalSearchCloudMenu: types.INIT_GLOBAL_SEARCH_CLOUD_MENU,
    }),
    ...mapActions({
      sendCtrl: types.SEND_CTRL,
      getGlobalRecommendedMenu: types.GET_GLOBAL_RECOMMENDED_MENU,
      getGlobalSearchCloudMenu: types.GET_GLOBAL_SEARCH_CLOUD_MENU,
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

    onFocus() {},

    onBlur() {},

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

    async onClickSearch() {
      const { keyword: _keyword } = this;
      const keyword = _keyword.trim();
      if (keyword) {
        this.queryKeywordCloudMenu(keyword);
      }
    },

    async onSearch() {
      const { keyword: _keyword } = this;
      const keyword = _keyword.trim();
      if (keyword) {
        this.queryKeywordCloudMenu(keyword);
        // iOS没有失去焦点 为了Android与iOS保持一致
        const inputDom = document.querySelector('input');
        inputDom.blur();
      }
    },

    onClickKeyword(_keyword) {
      const keyword = _keyword.trim();
      if (keyword) {
        this.setDataObject({ keyword });
        this.queryKeywordCloudMenu(keyword);
        this.$refs.search.inputValue = keyword;
      }
    },

    queryKeywordCloudMenu(keyword) {
      this.saveHistoryList(keyword);
      this.isShowHistory = false;
      this.promise = this.getGlobalSearchCloudMenu({ keyword, index: 1, cnt: 100 });
      this.promise
        .then(data => {
          this.setGlobalSearchCloudMenu(data);
        })
        .catch(e => {
          console.error(e);
          this.promiseRecommend = this.getGlobalRecommendedMenu({ mid: '2', index: 1, cnt: 20 });
        });
    },

    saveHistoryList(_keyword) {
      const keyword = _keyword.trim();
      if (keyword === '') return;
      let historyList = [keyword, ...this.historyList];
      historyList = [...new Set(historyList)];
      this.historyList = historyList;
      localStorage.setItem(LS_KEY_GREE_SMART_COOKBOOK_HISTORY_LIST, JSON.stringify(historyList));
    },

    clearHistoryList() {
      this.historyList = [];
      localStorage.setItem(LS_KEY_GREE_SMART_COOKBOOK_HISTORY_LIST, '[]');
    },

    onClickDelete() {
      this.clearHistoryList();
    }

  }
};
</script>
