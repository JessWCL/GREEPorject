<template>
  <gree-view class="view-cloud-menu-detail">
    <gree-header
      :left-options="{ preventGoBack: false }"
      @on-click-back="clickBack"
      :right-options="{ showMore: false }"
    >{{ CloudMenuDetailSteps.dataMsg.Name }}
      <gree-button
        v-show="isShow"
        class="btn-basket hightlight"
        slot="right"
        @click.native="addDish"
        inline
        round>
        <img
          :src="require('@/assets/img/shopping_cart.png')"
          alt="">购物篮</gree-button>
    </gree-header>
    <gree-page id="page">
      <dir class="banner-wrapper">
        <gree-image 
          :src="CloudMenuDetailSteps.dataMsg.Pic"
          class="banner"
          width="100%">
          <template v-slot:loading>
            <gree-activity-indicator
              type="spinner"
              :size="30" />
          </template>
          <template v-slot:error>加载失败</template>
        </gree-image>
        <gree-tag
          v-show="deviceTypeName"
          shape="fillet"
          type="fill"
          fill-color="rgba(0, 0, 0, .6)"
          font-color="#ffffff">
          {{ deviceTypeName }}
        </gree-tag>
      </dir>
      <gree-block
        v-html="CloudMenuDetailSteps.dataMsg.Dis"
        class="dis"></gree-block>
      <gree-block class="basket-button-wrapper">
        <gree-divider class="title">主料</gree-divider>
        <gree-button
          @click.native="addDish"
          id="js-btn"
          class="btn-basket hightlight"
          inline
          round>
          <img
            :src="require('@/assets/img/shopping_cart.png')"
            alt="">购物篮</gree-button>
      </gree-block>
      <div class="foods-wrapper">
        <gree-row
          v-for="(mItem, mIndex) in CloudMenuDetailSteps.dataMsg.MainFoods"
          :key="'card_main' + mIndex">
          <gree-col>{{ mItem.ingredName }}<span>{{ mItem.num | toCookerStr }}{{ mItem.unit }}</span></gree-col>
        </gree-row>
        <gree-row
          v-if="!CloudMenuDetailSteps.dataMsg.MainFoods.length > 0"
          class="loading">
          <gree-col key="loading_card_main0">&nbsp;</gree-col>
        </gree-row>
      </div>
      <gree-divider class="title">辅料</gree-divider>
      <div class="foods-wrapper">
        <gree-row
          class="loading"
          v-for="(item, index) in 5"
          v-show="!CloudMenuDetailSteps.dataMsg.AuxiliaryFoods.length > 0"
          :key="'loading_card_auxi' + index">
          <gree-col>&nbsp;</gree-col>
        </gree-row>
        <gree-row
          v-for="(aItem, aIndex) in CloudMenuDetailSteps.dataMsg.AuxiliaryFoods"
          :key="'card_auxi' + aIndex">
          <gree-col>{{ aItem.ingredName }}<span>{{ aItem.num | toCookerStr }}{{ aItem.unit }}</span></gree-col>
        </gree-row>
      </div>
      <gree-divider class="title">制作步骤</gree-divider>
      <div
        class="steps"
        v-for="(item, index) in CloudMenuDetailSteps.data"
        :key="'steps_' + index"
      >
        <gree-block class="title">
          {{ item.Step }} / {{ CloudMenuDetailSteps.data.length }}
        </gree-block>
        <gree-image
          v-show="item.Spic !== ''"
          :src="item.Spic"
          width="100%">
          <template v-slot:loading>
            <gree-activity-indicator
              type="spinner"
              :size="30" />
          </template>
          <template v-slot:error>加载失败</template>
        </gree-image>
        <gree-block class="sdis">
          {{ item.Sdis }}
        </gree-block>
      </div>
      <gree-block
        v-show="isShowTips"
        class="title title__tips">小贴士</gree-block>
      <gree-block
        v-html="CloudMenuDetailSteps.dataMsg.Tips"
        class="tips"></gree-block>
        <!-- <gree-divider>我是有底线的</gree-divider> -->
    </gree-page>
  </gree-view>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex';
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
  Block,
  ActivityIndicator,
  Divider,
  List,
  Item,
  Button,
  Tag,
} from 'gree-ui';
import * as types from '@/store/types';
import { sortByProps } from '@/utils';
import { isJSONStr } from '../../utils/index';
import filtersMixin from '../../mixins/utils/filtersMixin';
import { showToast } from '../../../../static/lib/PluginInterface.promise';

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
    [Block.name]: Block,
    [ActivityIndicator.name]: ActivityIndicator,
    [Divider.name]: Divider,
    [List.name]: List,
    [Item.name]: Item,
    [Button.name]: Button,
    [Tag.name]: Tag,
  },

  mixins: [filtersMixin],

  data() {
    return {
      isShow: false,
    };
  },

  computed: {
    ...mapState({
      deviceType: state => state.dataObject.deviceType,
      deviceTypeName: state => state.dataObject.deviceTypeName,
      Cid: state => state.dataObject.Cid,
      cacheCid: state => state.dataObjectCache.Cid,
      DishFromBasket: state => state.DishFromBasket,
      SearchCloudMenu: state => state.SearchCloudMenu,
      cloudMenuList: state => state.SearchCloudMenu.data,
      CloudMenuDetailSteps: state => {
        const { CloudMenuDetailSteps } = state;
        const cloneData = JSON.parse(JSON.stringify(CloudMenuDetailSteps));
        try {
          cloneData.data = sortByProps(cloneData.data, ['Step:asc']);
          if (cloneData.dataMsg.Dis) {
            cloneData.dataMsg.Dis = cloneData.dataMsg.Dis.replace(/\n/g, '<br/>');
          }
          if (cloneData.dataMsg.Tips) {
            cloneData.dataMsg.Tips = cloneData.dataMsg.Tips.replace(/\n/g, '<br/>');
          }
          cloneData.dataMsg.MainFoods = [];
          cloneData.dataMsg.AuxiliaryFoods = [];
          if (cloneData.dataMsg.Foods) {
            let Foods = {};
            if (isJSONStr(cloneData.dataMsg.Foods)) {
              console.log('DetailSteps computed parse');
              Foods = JSON.parse(cloneData.dataMsg.Foods);
            } else {
              console.log('DetailSteps computed no parse');
              Foods = cloneData.dataMsg.Foods;
            }
            const MainFoods = Foods.main || [];
            const AuxiliaryFoods = Foods.auxiliary || [];
            for (let index = 0; index < MainFoods.length; index += 1) {
              const item = MainFoods[index];
              item.num = parseFloat(item.num) || item.num;
            }
            for (let index = 0; index < AuxiliaryFoods.length; index += 1) {
              const item = AuxiliaryFoods[index];
              item.num = parseFloat(item.num) || item.num;
            }
            cloneData.dataMsg.MainFoods = MainFoods;
            cloneData.dataMsg.AuxiliaryFoods = AuxiliaryFoods;
          }
        } catch (e) {
          console.error(e);
        }
        return cloneData;
      },
    }),

    deviceIcon() {
      const { deviceType } = this;
      const ret = undefined;
      try {
        const icon = require(`@/assets/img/${deviceType}.png`);
        if (icon) {
          return icon;
        }
        return ret;
      } catch (e) {
        return ret;
      }
    },

    isShowTips() {
      const {
        CloudMenuDetailSteps: {
          dataMsg: {
            Tips
          }
        }
      } = this;
      if (Tips && Tips.length > 0) {
        return true;
      }
      return false;
    }

  },

  created() {
    const { Cid, cacheCid } = this;
    if (Cid !== cacheCid) {
      this.setDataObjectCache({ Cid });
      this.getCloudMenuDetailSteps({ Cid });
    }
  },

  mounted() {
    try {
      const scrollDom = document.getElementsByClassName('page-content')[0];
      const btnWrapperDom = document.getElementsByClassName('basket-button-wrapper')[0];
      const headerDom = document.getElementsByClassName('gree-header-title')[0];
      const btnDom = document.getElementById('js-btn');
  
      const btnHeight = btnDom.getBoundingClientRect().height;
      const headerHeight = headerDom.getBoundingClientRect().height;
  
      // 高度差
      const dHeight = headerHeight - btnHeight;
  
      scrollDom.addEventListener('scroll', () => {
        const scrollTop = scrollDom.scrollTop;
        const offsetTop = btnWrapperDom.offsetTop;
        if (scrollTop + dHeight >= offsetTop) {
          this.isShow = true;
        } else {
          this.isShow = false;
        }
      });
    } catch (e) {
      console.error(e);
    }
  },

  methods: {
    ...mapMutations({
      setDataObjectCache: types.SET_DATA_OBJECT_CACHE,
      setShareDishBasket: types.SET_SHARE_DISH_BASKET,
    }),
    ...mapActions({
      getCloudMenuDetailSteps: types.GET_CLOUD_MENU_DETAIL_STEPS,
      addDishToBasket: types.ADD_DISH_TO_BASKET,
      getDishFromBasket: types.GET_DISH_FROM_BASKET
    }),

    clickBack() {},

    clickMore() {},

    async addDish() {
      if (this.disable) {
        console.log('连续点击...');
        return;
      }
      this.disable = true;

      setTimeout(() => {
        this.disable = false;
      }, 3000);

      // 刷新菜篮子数据
      await this.getDishFromBasket();

      if (this.DishFromBasket.length >= 20) {
        showToast('购物篮数量已满，请先删除', 0);
        return;
      }

      const {
        dataMsg: {
          Name: dishname,
          Pic: picture,
          MainFoods: main,
          AuxiliaryFoods: auxiliary,
        }
      } = this.CloudMenuDetailSteps;
      console.log('=== addBasket ===');
      this.setShareDishBasket(null);
      this.addDishToBasket({
        dishname,
        picture,
        ingredients: {
          main,
          auxiliary
        }
      });
    },

  },
};
</script>
