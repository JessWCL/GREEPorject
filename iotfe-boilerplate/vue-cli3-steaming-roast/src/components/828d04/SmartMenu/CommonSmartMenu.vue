<template>
  <div class="child-mode">
    <div class="c-mode-header">
      <gree-search-bar
        :has-icon="true"
        :has-search-button="false"
        placeholder="请输入关键字搜索菜品..."
        custom-class="custom-search"
        @input="handleSearch"
        @blur="blurFun"
      ></gree-search-bar>
      <gree-dropdown position="is-bottom-left">
        <a slot="trigger">
          {{ List2ArraySelectLable }}
          <gree-icon name="arrow-down"></gree-icon>
        </a>
        <gree-dropdown-item
          v-for="(item, index) in List2Array"
          :key="index"
          @click="List2ItemClick(item, index)"
        >
          <span :class="{ 'active': (index - 1) === List2ItemClickValue }">{{ item.List2Label }}</span>
        </gree-dropdown-item>
      </gree-dropdown>
    </div>
    <gree-list v-if="List3Array.length >= 1">
      <gree-list-item
        v-for="(item, index) in List3Array"
        :key="index"
        media-item
        @click.native="handleList3ItemClick(item, index)"
      >
        <div slot="media">
          <img v-lazy="`./static/${item.List1Value}/${item.List2Value}/${item.List3Value}.png`" />
        </div>
        <div slot="title">
          {{ item.List3Label }}
          <label
            v-if="searchKey !== ''"
          >（{{ item.List1Label.replace('模式', '') }}）</label>
        </div>
      </gree-list-item>
    </gree-list>
    <div
      v-else
      class="zero-result-tips"
    >
      没有找到 <span class="gold-color">{{ searchKey }}</span> 相关菜单，请换个搜索关键字~
    </div>

    <!-- 没参数 start -->
    <gree-dialog
      v-model="Dialog.open"
      :title="dialogTitle"
      :btns="Dialog.btns"
      :mask-closable="true"
    >
      <gree-check
        v-model="isStar"
        @input="checkInput">
        <img v-if="isStar" :src="require('@/assets/img/star.png')" />
        <img v-else :src="require('@/assets/img/unstar.png')" />
      </gree-check>
      {{ dialogText }}
    </gree-dialog>
    <!-- 没参数 end -->

    <!-- 多个参数 start -->
    <gree-dialog
      v-model="multipleParamDialog.open"
      :btns="multipleParamDialog.btns"
      :mask-closable="true"
      class="smart-menu-multiple"
    >
      <header>
        <gree-notice-bar
          v-show="errorTip"
          icon="warning"
        >
          请选择
        </gree-notice-bar>
        {{ popupTitle }}
        <gree-check
          v-model="isStar"
          @input="checkInput">
          <img v-if="isStar" :src="require('@/assets/img/star.png')" />
          <img v-else :src="require('@/assets/img/unstar.png')" />
        </gree-check>
      </header>
      <gree-list>
        <gree-list-item :title="popupTitleForList4"></gree-list-item>
        <gree-list-item>
          <gree-row slot="title">
            <gree-radio
              v-for="(item, index) in List4Array"
              :key="index"
              v-model="dList4"
              :name="index"
              icon
              icon-inverse
              icon-disabled
              :label="item.List4Label"
              inline
            ></gree-radio>
          </gree-row>
        </gree-list-item>
        <gree-list-item
          v-show="isHasList5Array"
          :title="popupTitleForList5"
        ></gree-list-item>
        <gree-list-item v-show="isHasList5Array">
          <gree-row slot="title">
            <gree-radio
              v-for="(item, index) in List5Array"
              :key="index"
              v-model="dList5"
              :name="index"
              icon
              icon-inverse
              icon-disabled
              :label="item.List5Label"
              inline
            ></gree-radio>
          </gree-row>
        </gree-list-item>
        <gree-list-item title="烹饪说明"></gree-list-item>
        <gree-list-item :title="List4OrList5ForDesc"></gree-list-item>
      </gree-list>
    </gree-dialog>
    <!-- 多个参数 end -->

    <!-- 预约 start -->

    <!-- 预约 end -->
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
import uniqBy from 'lodash/uniqBy';
import filter from 'lodash/filter';
import {
  SearchBar,
  Dropdown,
  DropdownItem,
  Icon,
  List,
  Item,
  Row,
  Col,
  Popup,
  NoticeBar,
  Dialog,
  Radio,
  Check,
} from 'gree-ui';
import * as types from '@/store/types';
import {
  __PROD__,
  __TEST__,
  RUN_STAT,
  MODE_SMART_MENU,
  LIST1_SMART_MENU_BAKING,
  LIST1_SMART_MENU_STEAMING,
  LIST1_SMART_MENU_BAKING_STEAMING,
  LIST1_SMART_MENU_PACKAGE,
  // LIST1_SMART_MENU_CLOUD,
  // LIST1_CLEAN_STEAM_ASSISTED_CLEANING,
  // LIST1_CLEAN_DESCALING,
  LIST2_ALL,
  GET_ALL_TEXT,
  GET_ALL,
  TAG_LOADING_TIME,
  POW,
  PAUSE,
  FoodCategory
} from '@/api/828d04/constant';
import { isGtChrome, isIPhone } from '@/utils';
import commonMethodConfig from '@/mixins/config/828d04/commonMethod';
import IntelligentMenusV2 from '@/api/828d04/IntelligentMenusV2';

export default {
  components: {
    [SearchBar.name]: SearchBar,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [Icon.name]: Icon,
    [List.name]: List,
    [Item.name]: Item,
    [Row.name]: Row,
    [Col.name]: Col,
    [Popup.name]: Popup,
    [NoticeBar.name]: NoticeBar,
    [Dialog.name]: Dialog,
    [Radio.name]: Radio,
    [Check.name]: Check,
  },
  mixins: [commonMethodConfig],
  data() {
    return {
      Dialog: {
        open: false,
        btns: [
          {
            text: '开始',
            handler: this.onConfirm
          }
        ]
      },
      multipleParamDialog: {
        open: false,
        btns: [
          {
            text: '开始',
            handler: this.onMultipleParamConfirm
          }
        ]
      },
      isPopupShow: {},
      errorTip: false,
      dList4: 0, // 点击List4
      dList5: 0, // 点击List5
      isStar: false,

      dialogTitle: '',
      dialogText: '',
      List2ItemClickLabel: FoodCategory,
      List2ItemClickValue: GET_ALL,
      popupTitle: '',
      popupChildren: [],
      popupTitleForList4: '选择类型',
      popupTitleForList5: '选择类型',
      searchKey: '',
      clickMenuId: [],
    };
  },
  computed: {
    ...mapState({
      isAppointmentDetail: state => state.isAppointmentDetail,
      dataObject: state => state.dataObject,
      Mod: state => state.dataObject.Mod,
      Pow: state => state.dataObject.Pow,
      List1: state => state.dataObject.List1,
      List2: state => state.dataObject.List2,
      List3: state => state.dataObject.List3,
      List4: state => state.dataObject.List4,
      List5: state => state.dataObject.List5,
      DisSetHour: state => state.dataObject.DisSetHour,
      DisSetMin: state => state.dataObject.DisSetMin,
      MachStat: state => state.dataObject.MachStat,
      estate3: state => state.dataObject.estate3,
      favoriteMenu: state => state.favoriteMenu,
      favoriteCloudMenu: state => state.favoriteCloudMenu,
    }),

    List2Array() {
      let ret = [];
      ret = IntelligentMenusV2.filter(ele => {
        return ele.List1Value === this.List1;
      });
      ret.unshift(LIST2_ALL);
      ret = uniqBy(ret, 'List2Value');
      return ret;
    },

    List2ArraySelectLable() {
      let ret = '???';
      try {
        const {List2, List2Array} = this;
        if (this.List2ItemClickValue === GET_ALL) {
          ret = FoodCategory;
        } else if (List2Array.length >= 1) {
          const List2ArrayItem = List2Array[List2 + 1] || {};
          ret = List2ArrayItem.List2Label;
        } else {
          ret = List2Array[0].List2Label;
        }
      } catch (e) {
        console.error(e);
      }
      return ret;
    },

    List3Array() {
      let ret = [];
      const { List1, List2, searchKey, List2ItemClickValue } = this;
      const isSearching = searchKey !== '';
      const isGetAll = List2ItemClickValue === GET_ALL;
      const isFilterList2 = List2ItemClickValue !== GET_ALL;
      if (isSearching) {
        if (isFilterList2) {
          const filterMenus = filter(IntelligentMenusV2, ele => {
            return ele.List1Value === List1
              && ele.List2Value === List2;
          });
          // 局部搜索过滤
          ret = filterMenus.filter(ele => {
            return (ele.List1Label && ele.List1Label.includes(searchKey))
              || (ele.List2Label && ele.List2Label.includes(searchKey))
              || (ele.List3Label && ele.List3Label.includes(searchKey))
              || (ele.List4Label && ele.List4Label.includes(searchKey))
              || (ele.List5Label && ele.List5Label.includes(searchKey));
          });
        } else {
          // 全局搜索过滤
          ret = IntelligentMenusV2.filter(ele => {
            return (ele.List1Label && ele.List1Label.includes(searchKey))
              || (ele.List2Label && ele.List2Label.includes(searchKey))
              || (ele.List3Label && ele.List3Label.includes(searchKey))
              || (ele.List4Label && ele.List4Label.includes(searchKey))
              || (ele.List5Label && ele.List5Label.includes(searchKey));
          });
        }
      } else {
        if (isGetAll) {
          // this.setList2(GET_ALL);
          ret = filter(IntelligentMenusV2, ele => {
            return ele.List1Value === List1;
          });
        } else {
          ret = filter(IntelligentMenusV2, ele => {
            return ele.List1Value === List1
              && ele.List2Value === List2;
          });
        }
      }
      ret = uniqBy(ret, 'List3Label');
      return ret;
    },

    List4Array() {
      let ret = [];
      ret = filter(IntelligentMenusV2, ele => {
        return ele.List1Value === this.List1
          && ele.List2Value === this.List2
          && ele.List3Value === this.List3;
      });

      ret = uniqBy(ret, 'List4Value');

      return ret;
    },

    List5Array() {
      let ret = [];
      ret = filter(IntelligentMenusV2, ele => {
        return ele.List1Value === this.List1
          && ele.List2Value === this.List2
          && ele.List3Value === this.List3;
      });

      ret = uniqBy(ret, 'List5Value');

      return ret;
    },

    isHasList5Array() {
      let ret = false;
      let modeList = [];
      modeList = filter(IntelligentMenusV2, ele => {
        return ele.List1Value === this.List1
          && ele.List2Value === this.List2
          && ele.List3Value === this.List3
          && ele.List4Value === this.List4
          && ele.List5Value === this.List5;
      });
      if (modeList.length !== 0) {
        ret = true;
      }
      return ret;
    },


    List4OrList5ForDesc() {
      let ret = '???';
      // 四个参数
      const param4List = filter(IntelligentMenusV2, ele => {
        return ele.List1Value === this.List1
          && ele.List2Value === this.List2
          && ele.List3Value === this.List3
          && ele.List4Value === this.dList4;
      });

      const isList4Desc = param4List.length === 1;
      const isList5Desc = param4List.length > 1;
      if (isList4Desc) {
        ret = param4List[0].Desc;
      } else if (isList5Desc) {
        // 五个参数
        const param5List = filter(param4List, ele => {
          return ele.List1Value === this.List1
            && ele.List2Value === this.List2
            && ele.List3Value === this.List3
            && ele.List4Value === this.dList4
            && ele.List5Value === this.dList5;
        });
        ret = param5List[0].Desc;
      }
      return ret;
    },

    fullParamsMode() {
      let ret = [];
      ret = filter(IntelligentMenusV2, ele => {
        return ele.List1Value === this.List1
          && ele.List2Value === this.List2
          && ele.List3Value === this.List3
          && ele.List4Value === this.List4
          && ele.List5Value === this.List5;
      });
      return ret;
    },

    computedTextTips() {
      let ret = '';
      const hasText = this.popupChildrenLabels && this.popupChildrenLabels[this.dList4];
      if (hasText) {
        ret = this.popupChildrenLabels[this.dList4].text;
        // this.dList5
      }
      return ret;
    },

    popupChildrenLabels() {
      const ret = [];
      for (let index = 0; index < this.popupChildren.length; index += 1) {
        const item = this.popupChildren[index];
        ret.push(item);
      }
      return ret;
    },

    isHasChildrenPopupLabel() {
      let ret = false;
      for (let index = 0; index < this.popupChildren.length; index += 1) {
        const item = this.popupChildren[index];
        if (item) {
          ret = item.children !== undefined;
          break;
        }
      }
      return ret;
    }
  },

  watch: {
    Pow(newV) {
      if (newV === 0) {
        this.Dialog.open = false;
        this.multipleParamDialog.open = false;
      }
    },
    List1: {
      handler(newV) {
        const { Mod, List2 } = this;
        const List1 = newV;
        const isBaking = Mod === MODE_SMART_MENU && List1 === LIST1_SMART_MENU_BAKING;
        const isSteaming = Mod === MODE_SMART_MENU && List1 === LIST1_SMART_MENU_STEAMING;
        const isBakingSteaming = Mod === MODE_SMART_MENU && List1 === LIST1_SMART_MENU_BAKING_STEAMING;
        const isPackage = Mod === MODE_SMART_MENU && List1 === LIST1_SMART_MENU_PACKAGE;

        const MAX_VALUE_LIST2_SMART_MENU_BAKING = 7;
        const MAX_VALUE_LIST2_SMART_MENU_STEAMING = 4;
        const MAX_VALUE_LIST2_SMART_MENU_BAKING_STEAMING = 4;
        const MAX_VALUE_LIST2_SMART_MENU_PACKAGE = 0;

        // 根据不同的模式判断List2的合法性
        if ((isBaking && List2 > MAX_VALUE_LIST2_SMART_MENU_BAKING)
          || (isSteaming && List2 > MAX_VALUE_LIST2_SMART_MENU_STEAMING)
          || (isBakingSteaming && List2 > MAX_VALUE_LIST2_SMART_MENU_BAKING_STEAMING)
          || (isPackage && List2 > MAX_VALUE_LIST2_SMART_MENU_PACKAGE)) {
          console.warn('[List2] index out of boundary');
          this.setList2(GET_ALL);
          this.List2ItemClickLabel = FoodCategory;
          this.List2ItemClickValue = GET_ALL;
        }
      },
      immediate: true
    },
  },

  mounted() {
    // 处理我的收藏菜单的跳转
    this.handleMyFavoriteMenu();
  },

  destroyed() {
    Dialog.closeAll();
  },

  methods: {
    ...mapMutations({
      setDataObject: types.SET_DATA_OBJECT,
      setPow: types.SET_POW,
      setRunStat: types.SET_RUNSTAT,
      setPause: types.SET_PAUSE,
      setMod: types.SET_MOD,
      setList1: types.SET_LIST1,
      setList2: types.SET_LIST2,
      setList3: types.SET_LIST3,
      setList4: types.SET_LIST4,
      setList5: types.SET_LIST5,
      setDisSetHour: types.SET_DIS_SET_HOUR,
      setDisSetMin: types.SET_DIS_SET_MIN,
    }),
    ...mapGetters({
      getFavoriteCloudMenuList: 'getFavoriteCloudMenuList'
    }),
    ...mapActions({
      sendCtrl: types.SEND_CTRL,
      saveMenu: types.SAVE_MENU,
      deleteMenu: types.DELETE_MENU,
      getFavoriteCloudMenu: types.GET_USER_DATA_FAVORITE_MENU,
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

    handleSearch(e) {
      console.log(e);
      this.searchKey = e.trim();
    },

    // 处理我的收藏菜单的跳转
    async handleMyFavoriteMenu() {
      const { menuId } = this.$route.params;
      if (menuId !== undefined) {
        this.clickMenuId = menuId;

        // 根据传参数据调用点击方法
        const isSimulate = this.clickMenuId.length === 3;
        if (isSimulate) {
          // 网络请求
          await this.getFavoriteCloudMenu();

          const [List1, List2, List3] = this.clickMenuId;
          const List3List = IntelligentMenusV2.filter(ele => {
            return ele.List1Value === List1
              && ele.List2Value === List2
              && ele.List3Value === List3;
          });
          const clickItemList = uniqBy(List3List, 'List3Label');
          if (clickItemList.length > 1) {
            console.warn('我的收藏菜单的跳转后，数量不唯一', { menuId, clickItemList });
          }
          const clickItem = clickItemList[0];
          this.List2ItemClick(clickItem, undefined);
          this.handleList3ItemClick(clickItem, undefined);
          // clickMenuId = undefined 标记已经处理过
          this.$route.params.menuId = undefined;
        }
      }
    },

    handleList3ItemClick(item, index) {
      (__PROD__ || __TEST__) && this.handleCheckData(item);
      this.List3ItemClick(item, index);
    },

    async handleCheckData(List3Item) {
      // 网络请求
      await this.getFavoriteCloudMenu();
      const { List1Value, List2Value, List3Value } = List3Item;
      const favoriteCloudMenuList = this.getFavoriteCloudMenuList();
      console.log({ favoriteCloudMenuList });
      let isFavorited = false;
      if (favoriteCloudMenuList.length > 0) {
        favoriteCloudMenuList.forEach(menuObj => {
          const [List1, List2, List3] = menuObj;
          // 是否已收藏
          const isHadFavorited = List1Value === List1
            && List2Value === List2
            && List3Value === List3;
          if (isHadFavorited) {
            isFavorited = true;
          }
        });
      }
      if (isFavorited) {
        this.isStar = true; // 已收藏
      } else {
        this.isStar = false; // 未收藏
      }
    },

    List3ItemClick(item, index) {
      console.log(item, index);
      const isHasList4 = (item.List4Label !== undefined && item.List4Value !== undefined);
      const isHasList5 = (item.List5Label !== undefined && item.List5Value !== undefined);

      if (isHasList5) {
        this.showPopUp('center');
        this.popupTitleForList4 = '选择厚度';
        this.popupTitleForList5 = '选择熟度';
        this.popupTitle = item.List3Label;

        const List1 = item.List1Value;
        this.setList1(List1);
        const List2 = item.List2Value;
        this.setList2(List2);
        const List3 = item.List3Value;
        this.setList3(List3);
        this.multipleParamDialog.open = true;
      } else if (isHasList4) {
        this.showPopUp('center');
        this.popupTitleForList4 = '选择类型';
        this.popupTitle = item.List3Label;

        const List1 = item.List1Value;
        this.setList1(List1);
        const List2 = item.List2Value;
        this.setList2(List2);
        const List3 = item.List3Value;
        this.setList3(List3);
        this.multipleParamDialog.open = true;
      } else {
        this.popupTitleForList4 = '选择类型';
        this.popupTitleForList5 = '选择类型';
        const List1 = item.List1Value;
        this.setList1(List1);
        const List2 = item.List2Value;
        this.setList2(List2);
        const List3 = item.List3Value;
        this.setList3(List3);
        this.dialogTitle = item.List3Label;
        this.dialogText = item.Desc;
        this.Dialog.open = true;
      }
    },

    List2ItemClick(item, index) {
      console.log(item, index);
      const List2 = item.List2Value;
      if (GET_ALL_TEXT === item.List2Label) {
        this.List2ItemClickLabel = FoodCategory;
      } else {
        this.List2ItemClickLabel = item.List2Label;
      }
      this.List2ItemClickValue = item.List2Value;
      this.setList2(List2);
      console.log(`List2: ${this.List2}`);
    },

    showPopUp(type) {
      this.$set(this.isPopupShow, type, true);
    },

    onConfirm() {
      this.Dialog.open = false;
      // 弹出对应的清洁模式和剩余时间
      const isNextHandle = this.handleCleanMod();
      if (!isNextHandle) return;

      // 整机是否能启动
      const canTrunOn = this.useCanTurnOn();

      if (isNextHandle && canTrunOn) {
        this.setPow(POW.TurnOn);
        this.setRunStat(RUN_STAT.Working);
        this.setMod(MODE_SMART_MENU);
        this.setPause(PAUSE.Off);
        this.setDisSetHour(TAG_LOADING_TIME); // 等待下一包数据
        this.setDisSetMin(TAG_LOADING_TIME); // 等待下一包数据
        const { Pow, RunStat, Pause, Mod, List1, List2, List3 } = this.dataObject;
        this.sendCtrl({ Pow, RunStat, Pause, Mod, List1, List2, List3 });
      }
    },

    onMultipleParamConfirm() {
      this.multipleParamDialog.open = false;
      // 弹出对应的清洁模式和剩余时间
      const isNextHandle = this.handleCleanMod();
      if (!isNextHandle) return;

      // 整机是否能启动
      const canTrunOn = this.useCanTurnOn();

      if (isNextHandle && canTrunOn) {
        this.setList4(this.dList4);
        this.setList5(this.dList5);
        // reset Radio value
        this.dList4 = 0;
        this.dList5 = 0;
        this.setPow(POW.TurnOn);
        this.setRunStat(RUN_STAT.Working);
        this.setMod(MODE_SMART_MENU);
        this.setPause(PAUSE.Off);
        this.setDisSetHour(TAG_LOADING_TIME); // 等待下一包数据
        this.setDisSetMin(TAG_LOADING_TIME); // 等待下一包数据
        const { Pow, RunStat, Pause, Mod, List1, List2, List3, List4, List5 } = this.dataObject;

        const isList5 = this.fullParamsMode[0] && this.fullParamsMode[0].List5Label !== undefined;
        if (isList5) {
          this.sendCtrl({ Pow, RunStat, Pause, Mod, List1, List2, List3, List4, List5 });
        } else {
          this.sendCtrl({ Pow, RunStat, Pause, Mod, List1, List2, List3, List4 });
        }
      }
    },

    checkInput() {
      console.log('=== checkInput ===');
      const { isStar } = this;
      const isDeleteMenu = isStar === false;
      const isSaveMenu = isStar === true;
      const MenuItem = [this.List1, this.List2, this.List3];
      if (isSaveMenu) {
        (__PROD__ || __TEST__) && this.saveMenu(MenuItem);
      } else if (isDeleteMenu) {
        (__PROD__ || __TEST__) && this.deleteMenu(MenuItem);
      }
    }
  }
};
</script>
