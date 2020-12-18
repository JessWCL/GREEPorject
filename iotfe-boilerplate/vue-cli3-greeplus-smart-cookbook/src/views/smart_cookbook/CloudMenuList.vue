<template>
  <gree-view class="view-cloud-menu-list">
    <gree-header
      :left-options="{ preventGoBack: false }"
      @on-click-back="clickBack"
      :right-options="{ showMore: false }"
      @on-click-more="clickMore"
    >{{ deviceTypeName }}菜谱</gree-header>
    <gree-page>
      <gree-scroll-view
        ref="scrollView"
        :scrolling-x="false"
        @end-reached="onEndReached">
        <gree-scroll-view-more
          slot="more"
          :is-finished="isFinished"
        ></gree-scroll-view-more>
        <gree-card
          class="banner"
          v-if="!isLoading && cloudMenuList[0]"
          @click.native="toDetailPage(cloudMenuList[0])">
          <gree-card-content>
            <gree-image 
              :src="cloudMenuList[0].Pic"
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
            <h3>{{ cloudMenuList[0].Name }}</h3>
            <p>{{ cloudMenuList[0].FoodsToString }}</p>
          </gree-card-footer>
        </gree-card>
        <gree-card
          class="banner"
          v-if="isLoading"
          :class="{ 'loading': isLoading }">
          <gree-card-content>
            <gree-image width="100%">
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
        <gree-row>
          <!-- v-for 不应该 有v-if 但目前没找到更好的方法 -->
          <gree-col
            v-for="(item, index) in cloudMenuList"
            v-show="!isLoading && index !== 0"
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
          <gree-col
            v-for="(item, index) in 9"
            v-show="isLoading && index !== 0"
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
      </gree-scroll-view>
    </gree-page>
  </gree-view>
</template>

<script>
import { mapMutations, mapActions, mapState, mapGetters } from 'vuex';
import {
  View,
  Page,
  Header,
  Row,
  Col,
  Image,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  ActivityIndicator,
  Divider,
  ScrollView,
  ScrollViewMore
} from 'gree-ui';
import * as types from '@/store/types';

export default {

  components: {
    [View.name]: View,
    [Page.name]: Page,
    [Header.name]: Header,
    [Row.name]: Row,
    [Col.name]: Col,
    [Image.name]: Image,
    [Card.name]: Card,
    [CardHeader.name]: CardHeader,
    [CardContent.name]: CardContent,
    [CardFooter.name]: CardFooter,
    [ActivityIndicator.name]: ActivityIndicator,
    [Divider.name]: Divider,
    [ScrollView.name]: ScrollView,
    [ScrollViewMore.name]: ScrollViewMore,
  },

  data() {
    return {
      isFinished: false,
      cnt: 10,
      index: 1
    };
  },

  computed: {
    ...mapGetters(['cloudMenuList']),
    ...mapState({
      mid: state => state.dataObject.mid,
      SearchCloudMenu: state => state.SearchCloudMenu,
      cacheMid: state => state.dataObjectCache.mid,
      cacheCid: state => state.dataObjectCache.Cid,
      deviceTypeName: state => state.dataObject.deviceTypeName
    }),

    isLoading() {
      return this.cloudMenuList.length === 0;
    }
  },

  created() {
    const { mid, cacheMid, cnt, index } = this;
    // 初始化
    if (mid !== cacheMid) {
      this.setDataObjectCache({ mid });
      this.getSearchCloudMenu({ mid, cnt, index });
    }

    // 5秒后没有数据再发送一次
    setTimeout(() => {
      if (this.isLoading) {
        this.setDataObjectCache({ mid });
        this.getSearchCloudMenu({ mid, cnt, index });
      }
    }, 5000);
  },

  methods: {
    ...mapMutations({
      setDataObject: types.SET_DATA_OBJECT,
      setDataObjectCache: types.SET_DATA_OBJECT_CACHE,
      initCloudMenuDetailSteps: types.INIT_CLOUD_MENU_DETAIL_STEPS,
    }),
    ...mapActions({
      getSearchCloudMenu: types.GET_SEARCH_CLOUD_MENU,
    }),

    clickBack() {},

    clickMore() {},

    cloudMenuListFirst() {
      if (this.cloudMenuList[0]) {
        return this.cloudMenuList[0];
      }
      return {};
    },

    onEndReached() {
      const count = this.SearchCloudMenu.count;
      const len = this.SearchCloudMenu.data.length;
      if (len === 0) return;
      if (len >= count) {
        this.isFinished = true;
        return;
      }
      // 当前分页
      const currentIndex = Math.ceil(len / this.cnt);
      console.log(`菜谱总个数：${count}, 当前分页：${currentIndex}`);
      this.index = currentIndex + 1;

      const { mid, cnt, index } = this;
      console.log(`onEndReached: 总数：${count}, 当前列表个数：${len}, 当前分页：${index}`);
      this.getSearchCloudMenu({ mid, cnt, index });
      setTimeout(() => {
        this.$refs.scrollView.finishLoadMore();
      }, 1000);
    },

    toDetailPage(menu) {
      const { Cid, Name } = menu;
      const { cacheCid } = this;
      if (this.cloudMenuList.length === 0) {
        return;
      }
      if (Cid !== cacheCid) {
        this.setDataObject({ Cid });
        this.initCloudMenuDetailSteps({ Name });
      }
      this.$router.push({ name: 'CloudMenuDetailSteps' });
    }
  },
};
</script>
