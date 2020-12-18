<template>
  <gree-view>
    <gree-header>
      <span>收藏夹</span>
      <a
        v-show="lists.length > 0"
        slot="right"
        @click="clickEdit"
        v-text="isEditing ? '取消编辑' : '编辑'"
      ></a>
    </gree-header>
    <gree-page
      class="page-my-favorite"
      :class="{ delete: isShowActionBar }"
    >
      <gree-check-list
        v-model="vCheckList"
        :options="lists"
        :is-slot-scope="true"
      >
        <template slot-scope="{ option }">
          <gree-card class="card-header-pic">
            <gree-card-header
              :style="{backgroundImage:'url(' + option.img + ')'}"
              @click.native="handleItemClick(option.value)"
            >
              <article>
                <h3>{{ option.header }}</h3>
                <p>{{ option.desc }}</p>
              </article>
            </gree-card-header>
          </gree-card>
        </template>
      </gree-check-list>
      <!-- <gree-divider v-if="lists.length > 0">我是有底线的</gree-divider>
      <gree-divider v-else-if="lists.length === 0">暂无收藏</gree-divider> -->
    </gree-page>
    <gree-action-bar
      v-if="isShowActionBar"
      :actions="actionBarData"
    ></gree-action-bar>
  </gree-view>
</template>

<script>
import { mapGetters, mapActions, mapMutations, mapState } from 'vuex';
import filter from 'lodash/filter';
import {
  View,
  Page,
  Header,
  CheckList,
  Card,
  CardHeader,
  ActionBar,
  Dialog,
  Divider,
} from 'gree-ui';
import * as types from '@/store/types';
import IntelligentMenusV2 from '@/api/828d04/IntelligentMenusV2';
import { showToast, changeBarColor } from '../../../../static/lib/PluginInterface.promise.js';
import { __DEV__, MODE_SMART_MENU, LIGHT_BAR_COLOR, RUN_STAT } from '@/api/828d04/constant';

// 烘烤
const IMG_BG_FAVORITE_BAKING_MODE = require('@/assets/img/favorite/baking-mode.jpg');
// 蒸汽嫩烤
const IMG_BG_FAVORITE_STEAM_BAKE_MODE = require('@/assets/img/favorite/steam-bake-mode.jpg');
// 蒸制
const IMG_BG_FAVORITE_STEAMED_MODE = require('@/assets/img/favorite/steamed-mode.jpg');
// 蒸烤套餐
const IMG_BG_FAVORITE_SYNC_STEAM_BAKE_MODE = require('@/assets/img/favorite/sync-steam-bake-mode.jpg');

export default {
  components: {
    [View.name]: View,
    [Page.name]: Page,
    [Header.name]: Header,
    [CheckList.name]: CheckList,
    [Card.name]: Card,
    [CardHeader.name]: CardHeader,
    [ActionBar.name]: ActionBar,
    [Dialog.name]: Dialog,
    [Divider.name]: Divider,
  },
  data() {
    return {
      isEditing: false, // 是否编辑中
      menu: [], // 整机收藏菜单
      vCheckList: [],
      actionBarData: [
        {
          text: '删除',
          onClick: this.handleClick
        }
      ]
    };
  },
  computed: {
    ...mapState({
      favoriteMenu: state => state.favoriteMenu,
      RunStat: state => state.dataObject.RunStat,
      favoriteCloudMenu: state => state.favoriteCloudMenu,
    }),

    isShowActionBar() {
      if (this.isEditing && this.vCheckList.length > 0) return true;
      return false;
    },

    lists() {
      let ret = [];
      const temp = [];
      let favoriteCloudMenuList = this.getFavoriteCloudMenuList();

      // 测试数据
      if (__DEV__) {
        const arr = [];
        for (let index = 0; index < 7; index += 1) {
          arr.push([index, 0, 0]);
        }
        favoriteCloudMenuList = arr;
      }

      favoriteCloudMenuList.forEach(menu => {
        const [List1, List2, List3] = menu;
        const realMenu = filter(IntelligentMenusV2, ele => {
          return ele.List1Value === List1
            && ele.List2Value === List2
            && ele.List3Value === List3;
        });
        if (realMenu.length > 0) {
          temp.push(realMenu[0]);
        }
      });

      function formateMenu(_IntelligentMenus, isEditing) {
        const ret = [];
        const menus = _IntelligentMenus;
        menus.forEach((menu, index) => {
          const { List1Label, List1Value, List3Label } = menu;
          const favorite = {};
          favorite.value = `${index}`;
          favorite.header = List3Label;

          switch (List1Value) {
            case 0:
              favorite.img = IMG_BG_FAVORITE_BAKING_MODE;
              break;
            case 1:
              favorite.img = IMG_BG_FAVORITE_STEAM_BAKE_MODE;
              break;
            case 2:
              favorite.img = IMG_BG_FAVORITE_STEAMED_MODE;
              break;
            case 3:
              favorite.img = IMG_BG_FAVORITE_SYNC_STEAM_BAKE_MODE;
              break;

            default:
              favorite.img = IMG_BG_FAVORITE_BAKING_MODE;
              break;
          }

          favorite.desc = List1Label;
          favorite.desc = List1Label;
          favorite.disabled = !isEditing;
          ret.push(favorite);
        });
        return ret;
      }
      ret = formateMenu(temp, this.isEditing);
      return ret;
    }
  },

  created() {
    this.getFavoriteCloudMenu();
  },

  mounted() {
    changeBarColor(LIGHT_BAR_COLOR);
  },

  destroyed() {
    Dialog.closeAll();
  },

  methods: {
    ...mapGetters({
      getFavoriteCloudMenuList: 'getFavoriteCloudMenuList'
    }),
    ...mapMutations({
      setDataObjectCache: types.SET_DATA_OBJECT_CACHE,
      setMod: types.SET_MOD,
      setList1: types.SET_LIST1,
    }),
    ...mapActions({
      saveMenu: types.SAVE_MENU,
      saveMenuForFavoritePage: types.SAVE_MENU_FOR_FAVORITE_PAGE,
      getFavoriteCloudMenu: types.GET_USER_DATA_FAVORITE_MENU,
      setFavoriteCloudMenu: types.SET_USER_DATA_FAVORITE_MENU,
    }),

    clickEdit() {
      this.isEditing = !this.isEditing;
      this.vCheckList = [];
    },

    cancleEdit() {
      this.isEditing = false;
      this.vCheckList = [];
    },

    handleClick() {
      Dialog.confirm({
        content: '确认取消收藏？',
        confirmText: '确定',
        onConfirm: () => {
          const favoriteMenuList = this.getFavoriteCloudMenuList();
          const {vCheckList} = this;
          if (vCheckList.length > 0) {
            const saveArr = [];
            favoriteMenuList.forEach((menuItem, mIndex) => {
              if (vCheckList.indexOf(String(mIndex)) === -1) {
                saveArr.push(menuItem);
              }
            });
            console.log(vCheckList);
            this.saveMenuForFavoritePage(saveArr);
            this.cancleEdit();
          }
        },
        cancelText: '取消'
      });
    },

    handleItemClick(index) {
      const { isEditing, RunStat } = this;
      const favoriteCloudMenuList = this.getFavoriteCloudMenuList();
      const clickItem = favoriteCloudMenuList[index];
      const isWorking = RunStat === RUN_STAT.Appointment || RunStat === RUN_STAT.Working;
      if (isEditing) {
        console.log('editing :: ', clickItem);
      } else if (isWorking) {
        showToast('运行中，不可操作', 0);
      } else {
        // 切换到智能菜单
        this.setMod(MODE_SMART_MENU);
        const [List1] = clickItem;
        this.setList1(List1);
        this.setDataObjectCache({ SmartMenuList1: List1 });
        this.$router.push({
          name: 'Home',
          params: { menuId: clickItem }
        });
      }
    },
  }
};
</script>
