<template>
  <div class="child-mode">
    <div
      v-if="!isList3ItemClick"
      class="smart-menu-wrapper"
      :class="{
        'is-shrink-onresize': isShrinkOnresize,
      }"
    >
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
      <gree-list
        v-show="List3Array.length >= 1"
        :class="{ 'is-shrink-onresize': isShrinkOnresize }"
      >
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
        v-show="List3Array.length === 0"
        class="zero-result-tips"
      >
        没有找到
        <span class="gold-color">{{ searchKey }}</span> 相关菜单，请换个搜索关键字~
      </div>
      <div
        class="box-wrapper"
        :class="{
          'd-none': isShrinkOnresize,
          'is-shrink-onresize': isShrinkOnresize,
        }"
      >
        <gree-button
          round
          @click.native="goBack"
        >取消</gree-button>
      </div>
    </div>

    <!-- 预约 start -->
    <div
      v-show="isList3ItemClick"
      class="blur-wrapper"
    >
      <div
        v-show="selectedList3Item"
        class="custom-list3-item"
      ></div>
      <img
        v-if="selectedList3Item"
        v-lazy="`./static/${selectedList3Item.List1Value}/${selectedList3Item.List2Value}/${selectedList3Item.List3Value}.png`"
      />
      <span
        v-if="selectedList3Item"
        class="name"
      >{{ selectedList3Item.List3Label }}</span>
    </div>
    <div
      v-show="isList3ItemClick"
      class="smart-menu-appointment-container"
    >
      <!-- 没参数 start -->
      <template v-if="isShowList3Desc">
        <gree-block-title>烹饪说明</gree-block-title>
        <gree-block
          class="justify-content-center"
          @click.native="cancleIsTimePicking"
        >
          {{ dialogText }}
        </gree-block>
      </template>
      <!-- 没参数 end -->

      <!-- 多个参数 start -->
      <template v-if="!isShowList3Desc">
        <gree-block-title>{{ popupTitleForList4 }}</gree-block-title>
        <gree-block
          class="justify-content-around"
          @click.native="cancleIsTimePicking"
        >
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
        </gree-block>
      </template>

      <template
        v-if="!isShowList3Desc && isHasList5Array"
      >
        <gree-block-title
          v-show="isHasList5Array"
        >
          {{ popupTitleForList5 }}
        </gree-block-title>
        <gree-block
          v-show="isHasList5Array"
          class="justify-content-around"
          @click.native="cancleIsTimePicking"
        >
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
        </gree-block>
      </template>

      <template v-if="!isShowList3Desc">
        <gree-block-title>烹饪说明</gree-block-title>
        <gree-block
          class="justify-content-around"
          @click.native="cancleIsTimePicking"
        >
          {{ List4OrList5ForDesc }}
        </gree-block>
      </template>

      <template>
        <gree-block-title>预约完成时间</gree-block-title>
        <gree-block 
          v-show="!isTimePicking"
          class="justify-content-center time"
          @click.native="showTimePicking"
        >
          {{ pickerAppointmentValueTime[0] }}
          <span class="semicolon">:</span>
          {{ pickerAppointmentValueTime[1] }}
        </gree-block>
        <div :class="{ 'not-visible': !isTimePicking }">
          <div class="picker-column">
            <gree-picker
              ref="picker"
              class="picker-appointment-time"
              :data="pickerAppointmentDataTime"
              :cols="2"
              :line-height="60"
              :default-index="pickerAppointmentDefaultIndexTime"
              is-view
              is-cascade
              :multi-line="false"
              @change="onPickerAppointmentConfirmTime"
            ></gree-picker>
          </div>
        </div>
      </template>

      <gree-block class="btns">
        <gree-button
          round
          @click="handleCancleAppointment"
        >取消</gree-button>
        <gree-button
          v-show="isList3ItemClick"
          round
          @click="handleAppointment"
        >确定</gree-button>
      </gree-block>
    </div>
    <!-- 预约 end -->
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import uniqBy from 'lodash/uniqBy';
import filter from 'lodash/filter';
import {
  SearchBar,
  Block,
  BlockTitle,
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
  Toast,
  Button,
  Picker,
} from 'gree-ui';
import * as types from '@/store/types';
import {
  RUN_STAT,
  LIST2_ALL,
  GET_ALL,
  GET_ALL_TEXT,
  FoodCategory,
  MODE_SMART_MENU,
  LIST1_SMART_MENU_BAKING,
  LIST1_SMART_MENU_STEAMING,
  LIST1_SMART_MENU_BAKING_STEAMING,
  LIST1_SMART_MENU_PACKAGE,
} from '@/api/828d04/constant';
import commonMethodConfig from '@/mixins/config/828d04/commonMethod';
import IntelligentMenusV2 from '@/api/828d04/IntelligentMenusV2';
import oneDayTimeData from '@/api/828d04/oneDayTimeData';
import { padZero, isGtChrome, isIPhone } from '@/utils/index';

export default {
  components: {
    [SearchBar.name]: SearchBar,
    [Block.name]: Block,
    [BlockTitle.name]: BlockTitle,
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
    [Toast.name]: Toast,
    [Button.name]: Button,
    [Picker.name]: Picker,
  },
  mixins: [commonMethodConfig],
  data() {
    return {
      isList3ItemClick: false, // 是否点击 List3
      isShowList3Desc: false,
      isTimePicking: false, // timePicker是否打开
      Dialog: {
        open: false,
        btns: [
          {
            text: '开始',
            handler: this.onConfirm
          }
        ]
      },
      isPopupShow: {},
      errorTip: false,
      dList4: 0, // 点击List4
      dList5: 0, // 点击List5

      dialogTitle: '',
      dialogText: '',
      List2ItemClickLabel: FoodCategory,
      List2ItemClickValue: GET_ALL,
      popupTitle: '',
      popupChildren: [],
      popupTitleForList4: '选择类型',
      popupTitleForList5: '选择类型',
      searchKey: '',
      pickerAppointmentDataTime: oneDayTimeData,
      pickerAppointmentDefaultIndexTime: [0, 0],
      pickerAppointmentValueTime: ['00', '00'],
    };
  },

  computed: {
    ...mapState({
      isAppointment: state => state.isAppointment,
      isAppointmentDetail: state => state.isAppointmentDetail,
      selectedList3Item: state => state.selectedList3Item,
      dataObject: state => state.dataObject,
      Mod: state => state.dataObject.Mod,
      List1: state => state.dataObject.List1,
      List2: state => state.dataObject.List2,
      List3: state => state.dataObject.List3,
      List4: state => state.dataObject.List4,
      List5: state => state.dataObject.List5,
      isShrinkOnresize: state => state.isShrinkOnresize,
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
        console.error(e)
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

    dList4(newV) {
      const List4 = newV;
      console.log({ List4 });
      this.setList4(List4);
    },
  
    dList5(newV) {
      const List5 = newV;
      console.log({ List5 });
      this.setList5(List5);
    }
  },

  created() {
    this.setNowTimeToPicker();
  },

  mounted() {
    setTimeout(() => { this.$refs.picker.refresh(); }, 0);
    window.onscroll = function () {
      const { pageXOffset, pageYOffset } = window;
      console.log({ pageXOffset, pageYOffset });
    };
  },

  destroyed() {
    Dialog.closeAll();
    this.setSelectedList3Item(undefined);
  },

  methods: {
    ...mapMutations({
      setDataObject: types.SET_DATA_OBJECT,
      setSelectedList3Item: types.SET_SELECTED_LIST3_ITEM,
      setIsAppointmentDetail: types.SET_IS_APPOINTMENT_DETAIL,
      setRunStat: types.SET_RUNSTAT,
      setMod: types.SET_MOD,
      setList1: types.SET_LIST1,
      setList2: types.SET_LIST2,
      setList3: types.SET_LIST3,
      setList4: types.SET_LIST4,
      setList5: types.SET_LIST5,
      setTmrHour: types.SET_TMR_HOUR,
      setTmrMin: types.SET_TMR_MIN,
      setDisTmrHour: types.SET_DIS_TMR_HOUR,
      setDisTmrMin: types.SET_DIS_TMR_MIN,
      setTmp: types.SET_SET_TMP,
    }),
    ...mapActions({
      sendCtrl: types.SEND_CTRL,
    }),

    goBack() {
      this.$router.push('Home');
    },

    setNowTimeToPicker() {
      const nowTime = new Date();
      const hour = nowTime.getHours();
      const minute = nowTime.getMinutes();
      this.pickerAppointmentDefaultIndexTime = [hour, minute];
      const strHour = padZero(hour);
      const strMinute = padZero(minute);
      this.pickerAppointmentValueTime = [strHour, strMinute];
    },

    showTimePicking() {
      this.isTimePicking = true;

      // 体验优化 滑动到底部
      if (isGtChrome(44) || isIPhone()) {
        setTimeout(() => {
          const elem = document.querySelector('.main');
          const {scrollHeight, offsetHeight} = elem;
          const top = scrollHeight - offsetHeight;
          elem.scrollTo({ top, left: 0, behavior: 'smooth' });
        }, 0);
      }
    },

    handleCancleAppointment() {
      if (this.selectedList3Item !== undefined) {
        this.setSelectedList3Item(undefined);
        this.isList3ItemClick = false;
      } else {
        this.$router.push('Home');
      }
      this.isTimePicking = false;
    },

    cancleIsTimePicking() {
      this.isTimePicking = false;
    },

    handleAppointment() {
      console.log(`pickerTime取值为：${JSON.stringify(this.pickerAppointmentValueTime)}`);

      // 整机是否能启动
      const canTrunOn = this.useCanTurnOn();

      if (canTrunOn) {
        this.isTimePicking = false;
        const pickerHour = ~~this.pickerAppointmentValueTime[0];
        const pickerMin = ~~this.pickerAppointmentValueTime[1];
        this.setDisTmrHour(pickerHour);
        this.setDisTmrMin(pickerMin);
        this.setTmrHour(pickerHour);
        this.setTmrMin(pickerMin);
        this.setRunStat(RUN_STAT.Appointment);

        const { RunStat, Mod, List1, List2, List3, List4, List5, TmrHour, TmrMin } = this.dataObject;
        const isHasList4 = List4 !== -1;
        const isHasList5 = List5 !== -1;
        if (isHasList5) {
          this.sendCtrl({ RunStat, Mod, List1, List2, List3, List4, List5, TmrHour, TmrMin });
        } else if (isHasList4) {
          this.sendCtrl({ RunStat, Mod, List1, List2, List3, List4, TmrHour, TmrMin });
        } else {
          this.sendCtrl({ RunStat, Mod, List1, List2, List3, TmrHour, TmrMin });
        }

        if (this.selectedList3Item !== undefined) {
          this.setSelectedList3Item(undefined);
          this.isList3ItemClick = false;
        }
        // 跳到主页
        this.$router.push('Home');
      }
    },

    blurFun(e) {
      console.log(e);
      // 问题#001 先屏蔽关闭按钮，无法判断失焦是用户点击是close-icon，还是点击其他元素
      // this.searchKey = '';
      // iOS：H5页面在IOS input输入后会把页面顶起 留白
      if (isGtChrome(44)) {
        window.scrollTo(0, 0);
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    },

    onPickerAppointmentConfirmTime(columnIndex, itemIndex, value) {
      if (value) {
        const ref = this.$refs.picker;
        const sHour = padZero(ref.getColumnValues()[0].value);
        const sMinute = padZero(ref.getColumnValues()[1].value);
        this.$set(this.pickerAppointmentValueTime, 0, sHour);
        this.$set(this.pickerAppointmentValueTime, 1, sMinute);
      }
    },

    handleSearch(e) {
      console.log(e);
      this.searchKey = e.trim();
    },

    handleList3ItemClick(item, index) {
      this.isList3ItemClick = true;
      console.log('handleList3ItemClick: ', item);

      setTimeout(() => { this.$refs.picker.refresh(); }, 0);

      const { List1Value, List2Value, List3Value, List4Value, List5Value } = item;

      if (List1Value !== undefined) this.setList1(List1Value);
      if (List2Value !== undefined) this.setList2(List2Value);
      if (List3Value !== undefined) this.setList3(List3Value);
      if (List4Value !== undefined) {
        this.setList4(List4Value);
      } else {
        this.setList4(-1);
      }
      if (List5Value !== undefined) {
        this.setList5(List5Value);
      } else {
        this.setList5(-1);
      }

      this.List3ItemClick(item, index);
      this.setSelectedList3Item(item);

      // if (this.isAppointment) {
      //   this.setIsAppointmentDetail(true);
      // } else {
      //   this.List3ItemClick(item, index);
      // }
    },

    List3ItemClick(item, index) {
      console.log(item, index);
      const isHasList4 = (item.List4Label !== undefined && item.List4Value !== undefined);
      const isHasList5 = (item.List5Label !== undefined && item.List5Value !== undefined);

      if (isHasList5) {
        // this.showPopUp('center');
        this.isShowList3Desc = false;
        this.popupTitleForList4 = '选择厚度';
        this.popupTitleForList5 = '选择熟度';
        this.popupTitle = item.List3Label;

        const List2 = item.List2Value;
        this.setList2(List2);
        const List3 = item.List3Value;
        this.setList3(List3);
        const List4 = item.List4Value;
        this.setList4(List4);
      } else if (isHasList4) {
        // this.showPopUp('center');
        this.isShowList3Desc = false;
        this.popupTitleForList4 = '选择类型';
        this.popupTitle = item.List3Label;

        const List2 = item.List2Value;
        this.setList2(List2);
        const List3 = item.List3Value;
        this.setList3(List3);
      } else {
        this.popupTitleForList4 = '选择类型';
        this.popupTitleForList5 = '选择类型';
        const List3 = item.List3Value;
        this.setList3(List3);
        this.dialogTitle = item.List3Label;
        this.dialogText = item.Desc;
        // this.Dialog.open = true;
        this.isShowList3Desc = true;
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

    hidePopUp(type) {
      if (this.isHasChildrenPopupLabel) {
        if (this.dList4 === -1 || this.dList5 === -1) {
          this.errorTip = true;
          return;
        }
      }
      if (this.dList4 === -1) {
        this.errorTip = true;
        return;
      }
      this.setList4(this.dList4);
      this.setList5(this.dList5);
      // reset Radio value
      this.dList4 = 0;
      this.dList5 = 0;
      this.$set(this.isPopupShow, type, false);
      this.setRunStat(RUN_STAT.Working);
      const { RunStat, Mod, List1, List2, List3, List4, List5 } = this.dataObject;

      const isList5 = this.fullParamsMode[0] && this.fullParamsMode[0].List5Label !== undefined;

      if (isList5) {
        this.sendCtrl({ RunStat, Mod, List1, List2, List3, List4, List5 });
      } else {
        this.sendCtrl({ RunStat, Mod, List1, List2, List3, List4 });
      }
    },
    onConfirm() {
      this.Dialog.open = false;
      this.setRunStat(RUN_STAT.Working);
      const { RunStat, Mod, List1, List2, List3 } = this.dataObject;
      this.sendCtrl({ RunStat, Mod, List1, List2, List3 });
    },
  }
};
</script>

<style scoped>
.not-visible {
  overflow: hidden;
  visibility: hidden;
  display: block;
  opacity: 0;
  height: 0;
}
.block-title {
  margin-top: 20px;
}
</style>
