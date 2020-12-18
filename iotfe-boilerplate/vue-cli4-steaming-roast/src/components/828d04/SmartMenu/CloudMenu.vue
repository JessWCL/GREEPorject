<template>
  <div class="child-mode">
    <div class="c-mode-header">
      <gree-search-bar
        placeholder="请输入关键字搜索云菜单..."
        :has-icon="true"
        :has-search-button="false"
        custom-class="custom-search search-cloud-menu"
        @input="handleSearch"
        @blur="blurFun"
      ></gree-search-bar>
    </div>
    <!-- <gree-row class="list list-cloud-menu">
      <ul>
        <li
          v-for="(item, index) in cloudMenuList"
          :key="index"
        >
          <gree-card
            class="card-header-pic"
            @click.native="itemClick(item.Cid)"
          >
            <gree-card-header
              v-if="item.Pic"
              v-lazy:background-image="item.Pic"
            ></gree-card-header>
            <gree-card-content>
              <h3>{{ item.Name }}</h3>
              <p>{{ item.Taste }}</p>
            </gree-card-content>
          </gree-card>
        </li>
      </ul>
    </gree-row>-->
    <gree-row class="list list-cloud-menu">
      <div
        v-show="showTips"
        class="cloud-menu-search-tips"
      >
        没有搜索到 <span class="gold-color">{{ searchKey }}</span> 相关信息哦，请试试其他关键词
      </div>
      <gree-scroll-view
        ref="scrollView4"
        class="scroll-view-cloud-menu"
        :scrolling-x="false"
        @end-reached="onEndReached"
      >
        <gree-card
          v-for="(item, index) in cloudMenuList"
          :key="index"
          class="card-header-pic"
          @click.native="itemClick(item.Cid)"
        >
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
            <h3>{{ item.Name }}</h3>
            <p>{{ item.Taste }}</p>
          </gree-card-content>
        </gree-card>
        <gree-scroll-view-more
          slot="more"
          :is-finished="isFinished"
        ></gree-scroll-view-more>
      </gree-scroll-view>
    </gree-row>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import {
  SearchBar,
  Icon,
  List,
  Item,
  Row,
  Col,
  Card,
  CardHeader,
  CardContent,
  ScrollView,
  ScrollViewMore,
  ActivityIndicator,
  Image,
} from 'gree-ui';
import * as types from '@/store/types';
import { __DEV__ } from '@/api/828d04/constant';
import { isGtChrome, isIPhone } from '@/utils';
import debounce from 'lodash/debounce';
// import { showToast } from '../../../../../static/lib/PluginInterface.promise';
import { testCloudMenuData } from '../../../test/testData'; // 云菜单列表（测试数据）

export default {
  components: {
    [SearchBar.name]: SearchBar,
    [Icon.name]: Icon,
    [List.name]: List,
    [Item.name]: Item,
    [Row.name]: Row,
    [Col.name]: Col,
    [Card.name]: Card,
    [CardHeader.name]: CardHeader,
    [CardContent.name]: CardContent,
    [ScrollView.name]: ScrollView,
    [ScrollViewMore.name]: ScrollViewMore,
    [ActivityIndicator.name]: ActivityIndicator,
    [Image.name]: Image,
  },
  data() {
    return {
      lists: [],
      searchKey: '',
      debounceSK: '', // 防抖变量
      isFinished: false,
      cloudMenuIndex: 1,
    };
  },
  computed: {
    ...mapState({
      countCloudMenuList: state => state.countCloudMenuList,
      cloudMenuList: state => {
        if (__DEV__) return testCloudMenuData;
        return state.cloudMenuList;
      }
    }),

    showTips() {
      const { countCloudMenuList, searchKey } = this;
      if (countCloudMenuList === 0 && searchKey !== '') return true;
      return false;
    }
  },

  watch: {
    cloudMenuList() {
      if (this.$refs.scrollView4) {
        this.$refs.scrollView4.reflowScroller();
      }
    },

    searchKey() {
    // 防抖函数
      this.debounceSearchKey();
    },

    debounceSK() {
      this.setCloudMenuList([]);
      this.isFinished = false;
      this.cloudMenuIndex = 1;
      const { searchKey, cloudMenuIndex } = this;
      this.searchCloudMenu({ keyword: searchKey, index: cloudMenuIndex });
    },
  },

  created() {
    this.setCloudMenuList([]);
    // 防抖函数
    this.debounceSearchKey = debounce(() => {
      this.debounceSK = this.searchKey;
    }, 500);
  },

  mounted() {
    if (process.env.NODE_ENV !== 'development') {
      const { searchKey, cloudMenuIndex } = this;
      this.searchCloudMenu({ keyword: searchKey, index: cloudMenuIndex });
    }
  },

  methods: {
    ...mapMutations({
      setCloudMenuDetailSteps: types.SET_CLOUD_MENU_DETAIL_STEPS,
      setCloudMenuList: types.SET_CLOUD_MENU_LIST,
    }),
    ...mapActions({
      getCloudMenuList: types.GET_CLOUD_MENU_LIST,
      searchCloudMenu: types.SEARCH_CLOUD_MENU,
    }),

    blurFun(e) {
      console.log(e);
      // 问题#001 先屏蔽关闭按钮，无法判断失焦是用户点击是close-icon，还是点击其他元素
      // this.searchKey = '';

      // iOS：H5页面在IOS input输入后会把页面顶起 留白
      if (isGtChrome(44) || isIPhone()) {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    },

    itemClick(index) {
      this.setCloudMenuDetailSteps([]);
      this.$router.push({
        name: 'CloudMenuDetail',
        params: { id: index }
      });
    },

    onEndReached() {
      if (this.countCloudMenuList <= this.cloudMenuList.length) {
        this.isFinished = true;
        return;
      }
      this.cloudMenuIndex += 1;
      const { searchKey, cloudMenuIndex } = this;
      console.log('onEndReached', { cloudMenuIndex });
      this.searchCloudMenu({ keyword: searchKey, index: cloudMenuIndex });
      this.$refs.scrollView4.finishLoadMore();
    },

    handleSearch(e) {
      console.log(e);
      this.searchKey = e.trim();
    }
  }
};
</script>

<style lang="scss">
.gree-scroll-view {
  &.scroll-view-cloud-menu {
    .scroll-view-container {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
    .scroll-view-more {
      width: 100%;
    }
  }
}
</style>

<style lang="scss" scoped>
@mixin ellipsis($width: 100%) {
  max-width: $width;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.gree-scroll-view {
  width: 100%;
  height: auto;
  .card {
    display: flex;
    flex-basis: 46%;
    flex-direction: column;
    margin-bottom: 0;
    background: transparent;
    box-shadow: none;
    &:nth-child(odd) {
      margin-left: auto;
      margin-right: 12px;
    }
    &:nth-child(even) {
      margin-left: 12px;
      margin-right: auto;
    }
    &.card-header-pic {
      &:nth-child(1), &:nth-child(2) {
        margin-top: 30px;
      }
      .card-header {
        height: 350px;
        background-size: cover;
        background-position: center;
        border-radius: 15px;
      }
      .card-content {
        padding: 0px;
        .gree-image {
          overflow: hidden;
          height: 271px;
          width: 482px; // 16:9
          border-radius: 15px;
        }
        h3 {
          font-size: 50px;
          @include ellipsis();
        }
        p {
          color: #989898;
          font-size: 38px;
          @include ellipsis();
        }
      }
    }
  }
}
</style>
