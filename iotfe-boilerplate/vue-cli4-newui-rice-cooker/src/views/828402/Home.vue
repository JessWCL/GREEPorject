<template>
  <gree-view bg-color="#1d59aa" class="view-home">
    <gree-header
      theme="transparent"
      :title="devname"
      :left-options="{ preventGoBack: true }"
      @on-click-back="goBack"
      :right-options="{ showMore: true }"
      @on-click-more="moreInfo"
    />
    <gree-page class="page-home">
      <div class="round-bg">
        <div class="round-animate" :class="{
          'is-working': isWorking
        }"></div>
        <div class="mode-container">
          <div class="mode-name">杂粮粥</div>
          <div>
            <span class="time-num">1</span>
            <span class="time-unit">钟</span>
            <span class="time-num">30</span>
            <span class="time-unit">分</span>
          </div>
        </div>
      </div>
      <div
        :class="{
          'is-working': isWorking
        }"
        class="rice-texture-container"
      >
        <gree-row>
          <gree-col @click.native="showRiceTextrePopUpCenter('center')">
            <div>米种</div>
            <div>短粒米</div>
          </gree-col>
          <gree-col @click.native="showRiceTextrePopUpCenter('center')">
            <div>口感</div>
            <div>适中</div>
          </gree-col>
        </gree-row>
        <!-- <gree-row>
          <gree-col>
            <div>可调节时长</div>
            <div>1时~3时</div>
          </gree-col>
        </gree-row> -->
      </div>

    </gree-page>

    <gree-toolbar position="bottom" no-hairline>
      <gree-row>
        <gree-col :class="{ 'invisible': isWorking }" @click.native="showModelPopUp('bottom')">
          <span class="iconfont icon-moshi"></span>
          <div>模式</div>
        </gree-col>
        <gree-col :class="{ 'invisible': isWorking }" @click.native="showAppointmentPopUpCenter('center')">
          <span class="iconfont icon-pengrenshezhi"></span>
          <div>烹饪设置</div>
        </gree-col>
        <gree-col
          v-if="!isWorking"
          @click.native="start()"
        >
          <div class="btn-start-bg">
            <span class="iconfont icon-kaishi"></span>
          </div>
        </gree-col>
        <gree-col
          v-if="isWorking"
          @click.native="cancle()"
        >
          <div class="btn-start-bg">
            取消
          </div>
        </gree-col>
        <gree-col :class="{ 'invisible': isWorking }" @click.native="toAppointmentPage()">
          <span class="iconfont icon-dingshi"></span>
          <div>预约</div>
        </gree-col>
        <gree-col @click.native="caipu()">
          <span class="iconfont icon-caipu"></span>
          <div>菜谱</div>
        </gree-col>
      </gree-row>
    </gree-toolbar>

    <gree-popup
      v-model="isModelPopupShow.bottom"
      position="bottom"
    >
      <gree-popup-title-bar
        title="精煮饭50分钟"
        ok-text="编辑"
        large-radius
        @confirm="hideModelPopUp('bottom')"
      ></gree-popup-title-bar>
      <gree-row class="model-contaienr">
        <gree-col
          v-for="(item, index) in modelList"
          :key="index"
          :class="{'selected': selectedModel === index}"
        >
          <div class="iconfont-container" @click="setSelectedModel(index)">
            <div
              class="iconfont"
              :class="item.iconfont"
            ></div>
            <div class="name">{{item.name}}</div>
          </div>
        </gree-col>
      </gree-row>
    </gree-popup>

    <gree-popup class="gree-popup-rice-textre" v-model="isPopuoShowCenterRiceTextre.center" position="bottom">
      <gree-popup-title-bar
        title="精煮饭约50分钟"
      ></gree-popup-title-bar>
      <div class="popup-center">
        <gree-list>
          <gree-list-item media-item>
            <label slot="media">米种</label>
          </gree-list-item>
          <gree-list-item media-item>
            <gree-row slot="title">
              <gree-radio
                :name="1"
                v-model="rice"
                icon
                icon-inverse
                icon-disabled
                label="长粒米"
                inline
              ></gree-radio>
              <gree-radio
                :name="2"
                v-model="rice"
                icon
                icon-inverse
                icon-disabled
                label="短粒米"
                inline
                disabled
              ></gree-radio>
              <gree-radio
                :name="3"
                v-model="rice"
                icon
                icon-inverse
                icon-disabled
                label="糙米"
                inline
              ></gree-radio>
            </gree-row>
          </gree-list-item>
          <gree-list-item media-item>
            <label slot="media">口感</label>
          </gree-list-item>
          <gree-list-item media-item>
            <gree-row slot="title">
              <gree-radio
                name="1"
                v-model="taste"
                icon
                icon-inverse
                icon-disabled
                label="稍软"
                inline
              ></gree-radio>
              <gree-radio
                name="2"
                v-model="taste"
                icon
                icon-inverse
                icon-disabled
                label="适中"
                inline
              ></gree-radio>
              <gree-radio
                name="3"
                v-model="taste"
                icon
                icon-inverse
                icon-disabled
                label="稍硬"
                inline
              ></gree-radio>
            </gree-row>
          </gree-list-item>
        </gree-list>
        <footer class="gree-dialog-actions">
          <div class="gree-dialog-btn" @click="hideRiceTextrePopUpCenter('center')">取消</div>
          <div class="gree-dialog-btn" @click="hideRiceTextrePopUpCenter('center')">确定</div>
        </footer>
      </div>
    </gree-popup>

    <gree-popup class="gree-popup-appointment" v-model="isPopuoShowCenterAppointment.center" position="bottom">
      <gree-popup-title-bar
        title="可调：1~3小时"
      ></gree-popup-title-bar>
      <div class="popup-center">
        <gree-picker
          class="picker-time"
          ref="picker"
          :data="pickerData"
          :cols="2"
          :line-height="65"
          :default-index="pickerDefaultIndex"
          is-view
          is-cascade
          :multi-line="false"
          @change="onPickerConfirm"
        />
        <footer class="gree-dialog-actions">
          <div class="gree-dialog-btn" @click="hideAppointmentPopUpCenter('center')">取消</div>
          <div class="gree-dialog-btn" @click="handleAppointment()">确定</div>
        </footer>
      </div>
    </gree-popup>

  </gree-view>
</template>

<script>
import { Header, Picker, Toast, Dialog, Popup, PopupTitleBar, Radio, List, Item, Block, ToolBar, BlockHeader, BlockFooter, Divider, Button, NoticeBar, Row, Col, Icon, Tag } from 'gree-ui';
import { mapState, mapMutations } from 'vuex';
import { closePage, changeBarColor } from '../../../../static/lib/PluginInterface.promise';

const pickerCascadeData = [
  [
    {
      text: '1',
      value: 1,
      children: [
        {
          text: '1',
          value: 1
        },
        {
          text: '2',
          value: 2
        },
        {
          text: '3',
          value: 3
        },
        {
          text: '4',
          value: 4
        },
        {
          text: '5',
          value: 5
        },
        {
          text: '6',
          value: 6
        },
        {
          text: '7',
          value: 7
        },
        {
          text: '8',
          value: 8
        }
      ]
    },
    {
      text: '2',
      value: 2,
      children: [
        {
          text: '9',
          value: 9
        },
        {
          text: '10',
          value: 10
        },
        {
          text: '11',
          value: 11
        },
        {
          text: '12',
          value: 12
        },
        {
          text: '13',
          value: 13
        },
        {
          text: '14',
          value: 14
        },
        {
          text: '15',
          value: 15
        },
        {
          text: '16',
          value: 16
        }
      ]
    },
    {
      text: '3',
      value: 3,
      children: [
        {
          text: '17',
          value: 17
        },
        {
          text: '18',
          value: 18
        },
        {
          text: '19',
          value: 19
        },
        {
          text: '20',
          value: 20
        },
        {
          text: '21',
          value: 21
        },
        {
          text: '22',
          value: 22
        },
        {
          text: '23',
          value: 23
        }
      ]
    }
  ]
];

const modelList = [
  { name: '快煮饭', iconfont: 'icon-kuaizhufan' },
  { name: '精煮饭', iconfont: 'icon-jingzhufan' },
  { name: '糙米饭', iconfont: 'icon-caomifan' },
  { name: '稀饭', iconfont: 'icon-xifan' },
  { name: '煮粥', iconfont: 'icon-zhuzhou' },
  { name: '杂粮粥', iconfont: 'icon-zaliangzhou' },
  { name: '煲汤', iconfont: 'icon-baotang' },
  { name: '蒸煮', iconfont: 'icon-zhengzhu' },
  { name: '酸奶', iconfont: 'icon-suannai' },
  { name: '蛋糕', iconfont: 'icon-dangao' },
  { name: '保温', iconfont: 'icon-baowen' },
  { name: '热饭', iconfont: 'icon-refan' },
]

export default {
  components: {
    [Header.name]: Header,
    [Block.name]: Block,
    [BlockHeader.name]: BlockHeader,
    [BlockFooter.name]: BlockFooter,
    [Divider.name]: Divider,
    [Button.name]: Button,
    [NoticeBar.name]: NoticeBar,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Tag.name]: Tag,
    [ToolBar.name]: ToolBar,
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    [Radio.name]: Radio,
    [List.name]: List,
    [Item.name]: Item,
    [Picker.name]: Picker,
    [Toast.name]: Toast,
  },
  data() {
    return {
      modelList,
      selectedModel: 0,

      isModelPopupShow: {},
      isPopuoShowCenterRiceTextre: {},
      isPopuoShowCenterAppointment: {},
      rice: 1,
      taste: '2',
      isWorking: false,

      isPickerShow: true,
      pickerData: pickerCascadeData,
      pickerValue: [1, 0],
      pickerDefaultIndex: [1, 0]
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      devname: state => state.deviceInfo.name,
      functype: state => state.functype,
      mac: state => state.mac
    }),
    power_off_bg() {
      const bg = require('@/assets/img/bg_off.png');
      return bg;
    },
    /**
     * @description 主页面下更新状态栏颜色
     */
    ColorChange() {
      let color = false;
      if (this.$route.name === 'Home') {
        color = '#000000';
      }
      color ? changeBarColor(color) : '';
      return color;
    }
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT'
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
    moreInfo() {
      Toast.info('跳转编辑界面');
    },

    start() {
      this.isWorking = true;
    },

    setSelectedModel(index) {
      this.selectedModel = index;
    },

    cancle() {
      Dialog.confirm({
        title: '提示',
        content: '烹饪进行中，如果中途取消工作会影响<br />烹饪效果，是否取消',
        confirmText: '继续烹饪',
        onConfirm: () => {},
        cancelText: '取消烹饪',
        onCancel: () => {
          this.isWorking = false;
        }
      });
    },

    showModelPopUp(type) {
      this.$set(this.isModelPopupShow, type, true);
    },

    hideModelPopUp(type) {
      this.$set(this.isModelPopupShow, type, false);
    },

    showRiceTextrePopUpCenter(type) {
      if (this.isWorking) return;
      this.$set(this.isPopuoShowCenterRiceTextre, type, true);
    },

    hideRiceTextrePopUpCenter(type) {
      if (this.isWorking) return;
      this.$set(this.isPopuoShowCenterRiceTextre, type, false);
    },

    showAppointmentPopUpCenter(type) {
      if (this.isWorking) return;
      setTimeout(() => { this.$refs.picker.refresh(); }, 0);
      this.$set(this.isPopuoShowCenterAppointment, type, true);
    },

    hideAppointmentPopUpCenter(type) {
      if (this.isWorking) return;
      this.$set(this.isPopuoShowCenterAppointment, type, false);
    },

    handleAppointment() {
      this.hideAppointmentPopUpCenter('center');
    },

    onPickerConfirm(columnIndex, itemIndex, value) {
      if (value) {
        this.pickerValue = value.text;
      }
    },

    toAppointmentPage() {
      this.$router.push('/Appointment');
    },

    caipu() {
      Toast.info('你点我干啥？');
    }

  }
};
</script>
