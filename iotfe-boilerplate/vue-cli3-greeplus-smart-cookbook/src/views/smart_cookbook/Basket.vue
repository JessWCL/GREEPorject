<template>
  <gree-view class="view-basket">
    <gree-header
      :class="{ 'is-download': isDownload }"
      :left-options="{ preventGoBack: false }"
      :right-options="{ showMore: false }"
    >{{ title }}
      <div slot="right">
        <a
          v-show="!isDownload && isHaveDish && isEdit"
          @click="onEdit">{{ isEdit ? '取消' : '编辑' }}</a>
        <a
          v-show="!isEdit && !isDownload && isHaveDish"
          @click="onShareURL">分享</a>
      </div>
    </gree-header>
    <gree-page :class="{ 'is-download': isDownload }">
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
        :class="{ 'is-edit': isEdit }"
      >
        <template slot-scope="{ option, index }">
          <gree-card
            :data-index="index"
            @touchstart.native="ontouchstart($event, index)"
            @touchmove.native="ontouchmove"
            @touchend.native="ontouchend">
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
      <gree-list v-show="isDownload">
        <gree-list-item
          media-item
          title="格力，让生活更简单"
          footer="长按识别二维码"
        >
          <img
            slot="media"
            :src="require('@/assets/img/qrcode.png')"
            width="80" />
        </gree-list-item>
      </gree-list>
      <!-- <gree-divider v-if="!isDownload && isHaveDish">我是有底线的</gree-divider> -->
    </gree-page>
    <gree-button
      class="btn-delete"
      v-show="!isDownload && isHaveDish && isEdit && vCheckList.length >= 0">
      <div
        :class="{ 'disabled': vCheckList.length === 0 }"
        @click="handleDelete">
        <img :src="require('@/assets/img/delete.png')" >
        <div class="text">删除</div>
      </div>
    </gree-button>
    <gree-button
      ref="btnDownload"
      class="btn-basket"
      v-show="!isDownload && isHaveDish && !isEdit"
      @click.native="download">生成清单</gree-button>
  </gree-view>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
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
  Dialog,
} from 'gree-ui';
import * as types from '@/store/types';
import {
  longClickListenerVibrator,
  showLoading,
  hideLoading,
  generateMenuListByCaptureImg,
  showToast,
} from '../../../../static/lib/PluginInterface.promise';
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
    [Dialog.name]: Dialog,
  },

  mixins: [filtersMixin],

  data() {
    return {
      queryStatus: {
        r: undefined,
        data: undefined,
      },
      isEdit: false,
      vCheckList: [],
      isDownload: false,
      touchedIndex: undefined,
      moveX: 0
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

    title() {
      const { isDownload } = this;
      if (isDownload) {
        return '购物篮清单';
      }
      return '购物篮';
    }
  },

  watch: {
    isEdit(newV) {
      if (newV && this.touchedIndex !== undefined) {
        // this.vCheckList[0] = this.touchedIndex;
      } else {
        this.vCheckList = [];
        this.touchedIndex = undefined;
      }
      console.log('vCheckList:', this.vCheckList);
    },
    DishFromBasket(newV) {
      const DishFromBasket = newV;
      this.isEdit = false;
      this.vCheckList = [];
      try {
        if (DishFromBasket.length <= 0) {
          this.queryStatus = { r: 'success', data: [] };
        }
      } catch (e) {
        console.error(e);
      }
    }
  },

  created() {
    this.queryData();
  },

  beforeDestroy() {
    Dialog.closeAll();
  },

  methods: {
    ...mapMutations({
      setShareDishBasket: types.SET_SHARE_DISH_BASKET,
    }),
    ...mapActions({
      getDishFromBasket: types.GET_DISH_FROM_BASKET,
      removeDishFromBasket: types.REMOVE_DISH_FROM_BASKET,
      shareDishBasket: types.SHARE_DISH_BASKET,
    }),

    async queryData() {
      const res = await this.getDishFromBasket();
      const { r, basket } = res;
      this.queryStatus = { r, data: basket };
    },

    onEdit() {
      this.isEdit = !this.isEdit;
    },

    onShareURL() {
      const { DishFromBasket } = this;
      this.shareDishBasket(DishFromBasket);
    },

    ontouchstart($event, index) {
      const { isEdit } = this;
      if (isEdit) return;
      if ($event.touches && $event.touches.length > 1) {
        clearTimeout(this.timer);
        return;
      }
      this.touchedIndex = index;
      this.timer = setTimeout(() => {
        this.isEdit = true;
        this.$set(this.vCheckList, 'length', 0);
        this.$set(this.vCheckList, 0, this.DishFromBasket[index].id);
        longClickListenerVibrator();
      }, 800);
    },
    ontouchmove(e) {
      const { isEdit } = this;
      if (isEdit) return;
      if (e.touches.length > 1) {
        clearTimeout(this.timer);
        return;
      }
      clearTimeout(this.timer);
    },
    ontouchend() {
      const { isEdit } = this;
      if (isEdit) return;
      clearTimeout(this.timer);
    },

    handleDelete() {
      Dialog.confirm({
        title: '提示',
        content: '您是否确定删除？',
        confirmText: '确定',
        onConfirm: () => {
          this.remove();
        },
        cancelText: '取消'
      });
    },

    remove() {
      const { vCheckList } = this;
      console.log({ vCheckList });
      this.setShareDishBasket(null);
      this.removeDishFromBasket(vCheckList);
    },

    download() {
      // const captureDom = document.querySelector('#capture');
      // html2canvas(captureDom).then(canvas => {
      //   console.log('生成清单');
      //   const alink = document.createElement('a');
      //   const dataUrl = canvas.toDataURL('image/png');
      //   alink.href = dataUrl;
      //   alink.download = `购物篮${new Date().toLocaleDateString()}`;
      //   alink.dispatchEvent(new MouseEvent('click'));
      // });
      this.isDownload = true;
      document.body.style.height = 'auto';
      setTimeout(async () => {
        const res = await generateMenuListByCaptureImg();
        if (res === 'success') {
          showToast('已保存至相册', 0);
        } else if (res === 'fail') {
          showToast('保存失败，请稍后重试', 0);
        }
        setTimeout(() => {
          this.isDownload = false;
          document.body.style.height = '100%';
          hideLoading();
        }, 300);
      }, 300);
      showLoading();
    }
  },

};
</script>
