<template>
  <gree-view class="view-basket">
    <gree-page>
      <div
        v-if="queryStatus.r !== undefined"
        class="empty-data-contianer">
        <img
          v-if="queryStatus.r === 'error'"
          :src="require('../../assets/img/error.png')"
          alt="查询失败">
        <img
          v-else-if="queryStatus.r === 'success' && queryStatus.data.length === 0"
          :src="require('../../assets/img/empty.png')"
          alt="数据为空">
        <p
          v-if="queryStatus.r === 'error'"
          class="error">查询失败...</p>
        <p
          v-else-if="queryStatus.r === 'success' && queryStatus.data.length === 0"
          class="success">数据为空...</p>
      </div>
      <gree-check-list
        v-model="vCheckList"
        :options="DishFromBasket"
        :is-slot-scope="true"
        icon-position="left"
        icon-size="lg"
      >
        <template slot-scope="{ option }">
          <gree-card>
            <gree-card-header>
              <p>{{ option.dishname }}</p>
            </gree-card-header>
            <gree-card-content>
              <gree-divider content-position="left">主料</gree-divider>
              <gree-row
                v-for="(mItem, mIndex) in option.ingredients.main"
                :key="'card_main' + mIndex">
                <gree-col>{{ mItem.ingredName }}<span>{{ mItem.num | toCookerStr }}{{ mItem.unit }}</span></gree-col>
              </gree-row>
              <gree-divider content-position="left">辅料</gree-divider>
              <gree-row
                v-for="(aItem, aIndex) in option.ingredients.auxiliary"
                :key="'card_auxi' + aIndex">
                <gree-col>{{ aItem.ingredName }}<span>{{ aItem.num | toCookerStr }}{{ aItem.unit }}</span></gree-col>
              </gree-row>
            </gree-card-content>
          </gree-card>
        </template>
      </gree-check-list>
      <!-- <gree-divider v-if="isHaveDish">我是有底线的</gree-divider> -->
    </gree-page>
    <gree-list
      v-show="isShow"
      class="share-page-wrapper">
      <gree-list-item
        media-item
        title="格力，让生活更简单"
        after="进入格力+APP"
        @click.native="toGreeUrl"
      >
        <img
          slot="media"
          :src="require('@/assets/img/gree-logo.png')"
          width="40" />
      </gree-list-item>
    </gree-list>
  </gree-view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import {
  View,
  Page,
  Button,
  Header,
  Block,
  Row,
  Col,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Divider,
  CheckList,
  List,
  Item,
} from 'gree-ui';
import * as types from '@/store/types';
import filtersMixin from '../../mixins/utils/filtersMixin';

export default {
  components: {
    [View.name]: View,
    [Page.name]: Page,
    [Button.name]: Button,
    [Header.name]: Header,
    [Block.name]: Block,
    [Row.name]: Row,
    [Col.name]: Col,
    [Card.name]: Card,
    [CardHeader.name]: CardHeader,
    [CardContent.name]: CardContent,
    [CardFooter.name]: CardFooter,
    [Divider.name]: Divider,
    [CheckList.name]: CheckList,
    [List.name]: List,
    [Item.name]: Item,
  },

  mixins: [filtersMixin],

  data() {
    return {
      queryStatus: {
        r: undefined,
        data: undefined,
      },
      vCheckList: [],
      isShow: true,
      touchstartScrollTop: 0,
    };
  },

  computed: {
    ...mapState({
      DishFromBasket: state => {
        const { DishFromBasket } = state;
        const ret = [];
        DishFromBasket.forEach(item => {
          const dish = item;
          dish.value = item.id;
          ret.push(dish);
        });
        return ret;
      },
    }),

    isHaveDish() {
      const { DishFromBasket } = this;
      if (DishFromBasket.length > 0) {
        return true;
      }
      return false;
    },

  },

  created() {
    this.queryData();
  },

  mounted() {
    // const scrollDom = document.getElementsByClassName('page-content')[0];
    // scrollDom.addEventListener('touchstart', () => {
    //   this.touchstartScrollTop = scrollDom.scrollTop;
    // });
    // scrollDom.addEventListener('scroll', () => {
    //   const scrollTop = scrollDom.scrollTop;
    //   if (scrollTop - this.touchstartScrollTop >= 150) {
    //     this.isShow = false;
    //   } else if (scrollTop - this.touchstartScrollTop <= -150) {
    //     this.isShow = true;
    //   } else if (scrollTop === 0) {
    //     this.isShow = true;
    //   }
    // });
  },

  methods: {
    ...mapActions({
      getShareDishBasket: types.GET_SHARE_DISH_BASKET
    }),

    async queryData() {
      const res = await this.getShareDishBasket();
      const { r, basket } = res;
      this.queryStatus = { r, data: basket };
    },

    toGreeUrl() {
      window.location.href = 'http://global.ewpeinfo.com/GreePlus';
    }

  },

};
</script>
