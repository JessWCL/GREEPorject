<template>
  <div class="view-home">
    <gree-header
      :title="devname"
      :left-options="{ preventGoBack: true }"
      @on-click-back="goBack"
      :right-options="{ showMore: !isScene }"
      @on-click-more="moreInfo"
    >
      <a
        v-if="isScene"
        slot="right"
        @click="save"
      >保存</a>
    </gree-header>
    <gree-page
      class="page-home"
      :style="{backgroundImage:'url('+phbg1+')'}"
    >
      <div class="page-main">
        <!-- 故障和消息提醒 -->
        <div
          class="notice_bar"
          v-if="errorList.isNot&&!isScene"
        >
          <div class="bar2">
            <span class="iconfont icon-lingdang"></span>
            <gree-marquee v-if="errorList.Not.length>1">
              <gree-marquee-item
                v-for="(item, index) in errorList.Not"
                :key="index"
              >{{ item.title }}</gree-marquee-item>
            </gree-marquee>
            <div v-else>{{errorList.Not[0].title}}</div>
            <a
              href="javascript:;"
              @click="gotoerr"
            >立即查看</a>
          </div>
        </div>
        <!-- 选择模式 -->
        <div v-if="Pow">
          <div class="ball">
            <img
              :src="layerbg"
              :class="ballcolor"
            />
          </div>
          <div
            class="layer"
            :style="{ width: lottieRadius / 2 + 'px', height: lottieRadius / 2 + 'px'}"
            :class="{'notshow': Pow?false:true}"
          >
            <div class="rotate -one"></div>
            <div class="rotate -two"></div>
            <div class="play"></div>
          </div>
          <div
            class="mode_div"
          >
          <div v-if="MidType!==57088">{{ modeNameList[mode] }}</div>
           <div v-if="MidType===57088">{{ modeNameList1[mode] }}</div>
          <div class="lineshort"/>{{wspd}}档风</div>
          <div
            class="num_div"
            :class="{'notshow': Pow?false:true,'fomade_div':MidType===57088?true:false}"
          >
            <div>
              <span>{{wipm25Val.val}}</span>
              <p>PM 2.5</p>
            </div>
            <div
              v-if="MidType===57088"
            >
             <p class="line"/>
             <span>{{FomadeVal.val}}</span>
              <p>甲醛</p>
            </div>
          </div>
        </div>
        <div
          class="ball_off"
          :class="{'ball_off1': errorList.isNot?true:false}"
          v-if="!Pow"
        >
          <p>已关机</p>
        </div>
        <div
          class="box"
          v-if="!Pow"
        ></div>
        <!-- 显示功能小图标 -->
        <div
          class="icon_list"
          :class="{'icon_list1': Pow?false:true,
          'icon_list2': errorList.isNot?true:false,
          'icon_list3': errorList.isNot&&!Pow?true:false,
          }"
        >
          <div
            v-for="(obj,index) in iconList"
            v-if="obj.isshow"
          >
            <img :src="obj.miniIcon" />
            <p v-if="obj.name==='time'">({{timeshow[0]}}:{{timeshow[1]}}后{{btn_pow.powtime}})</p>
          </div>
        </div>
        <!-- 底部栏-->
        <div class="footer">
          <div
            class="dot"
            v-if="!Pow&&isScene===0&&MeshWarning1!==2"
            
          ></div>
          <img
            class="btn_pow"
            @click="setpow"
            :src="btn_pow.powimg"
            :class="{begray: MeshWarning1===2?true:false}"
          />
          <div class="btn_all">
            <div
              v-for="(obj,index) in funcList"
              class="btn_func"
              :class="{begray: obj.isgray,begreen:obj.isgreen}"
              @click="setfunc(index)"
            >
              <div
                class="iconfont"
                :class="obj.iconfont"
              />
              <p>{{obj.name}}</p>
            </div>
          </div>
        </div>
        <!-- 模式弹出框 -->
        <gree-popup
          v-model="isPopupShowBottom.bottom"
          position="bottom"
        >
          <div class="popup-bottom">
            <div
              class="arrow-down"
              @touchend.stop="hidePopUpDemo('bottom')"
            >模式</div>
            <div class="btn_mode">
              <div
                v-for="(obj,index) in ModeList"
                @click="setMode(index)"
                v-if="obj.isshow"
              >
                <img :src="obj.imgname" />
                <span>{{obj.title}}</span>
              </div>
            </div>
          </div>
        </gree-popup>
        <!-- 风速弹出框 -->
        <gree-popup
          v-model="isPopupShowBottom.bottom1"
          position="bottom"
        >
          <div class="popup-bottom">
            <div
              class="arrow-down"
              @touchend.stop="hidePopUpDemo('bottom')"
            >风速：1~5档</div>
            <div class="gree-example-child gree-example-child-picker gree-example-child-picker-0">
              <gree-picker
                v-if="isPopupShowBottom.bottom1"
                ref="picker1"
                :data="pickerData1"
                :cols="1"
                :line-height="40"
                is-view
                keep-index
                :multi-line="false"
                :default-index="pickerDefaultIndex1"
                @change="onPickerConfirm1"
              ></gree-picker>
            </div>
          </div>
        </gree-popup>
        <!-- 定时弹出框 -->
        <div
          class="gree-example-child gree-example-child-picker gree-example-child-picker-3"
          v-if="isPickerShow"
          :class="{'gree-example-child-picker-3kai': Pow?false:true}"
        >
          <gree-picker
            class="picker"
            ref="picker4"
            v-model="isPickerShow"
            :data="pickerData2"
            :cols="2"
            :line-height="55"
            :multi-line="false"
            @confirm="onPickerConfirm4()"
            title="定时"
            ok-text
            cancel-text
          ></gree-picker>
        </div>
        <!-- 高级弹出框 -->
        <gree-popup
          v-model="isPopupShowBottom.bottom3"
          position="bottom"
        >
          <div class="popup-bottom">
            <div
              class="arrow-down"
              @touchend.stop="hidePopUpDemo('bottom')"
            >高级</div>
            <div class="btn_mode btn_more">
              <div
                v-for="(obj,index) in MoreList"
                :class="{begray: obj.isgray,isshow:obj.ishow}"
              >
                <img
                  class="btn_littemode"
                  :src="obj.imgname"
                  @click="setMore(index)"
                />
                <span :class="obj.imgname">{{obj.title}}</span>
              </div>
            </div>
          </div>
        </gree-popup>
      </div>
    </gree-page>
  </div>
</template>

<script>
import {
  Header,
  Block,
  BlockHeader,
  Marquee,
  MarqueeItem,
  BlockFooter,
  Divider,
  Button,
  Dialog,
  NoticeBar,
  Row,
  Col,
  Icon,
  Tag,
  Popup,
  Picker
} from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import { closePage, changeBarColor, editDevice, getCCcmd } from '../../../../static/lib/PluginInterface.promise';
import error from '../../mixins/utils/config/error.js';
let AUTO_MODE = 1;
let SLEEP_MODE = 2;
let MANUAL_MODE = 3;
let QUICK_MODE = 4;
//500g-b01甲醛派生模式协议改动
export default {
  mixins: [error],
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
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Dialog.name]: Dialog,
    [Marquee.name]: Marquee,
    [MarqueeItem.name]: MarqueeItem
  },
  data() {
    let Data1 = [];
    for (let i = 1; i < 6; i++) {
      Data1[i - 1] = { text: `${i}`, value: i };
    }
    Data1 = [Data1];
    return {
      svgRadius: 0,
      lottieRadius: 0,
      circleVal: 0,
      isPickerShow: false,
      isPopupShowBottom: {
        bottom: false,
        bottom1: false,
        bottom3: false
      },
      pickerValue: 0,
      pickerData1: Data1,
      pickerData2: this.timeData(),
      phbg1: require('../../assets/img/bg_green.png'),
      layerbg: require('../../assets/img/ball_green.png'),
      ballcolor: 'green',
      modeNameList: {
        1: '自动' ,
        2: '睡眠' ,
        3: '手动' ,
        4: '快速' ,
      },
      modeNameList1: {
        1: '手动' ,
        2: '自动' ,
        3: '睡眠' ,
        4: '快速' ,
      }
    };
  },
  created() {
    this.svgRadius = window.screen.width * 0.7;
    this.lottieRadius = this.svgRadius * 1.8;
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      mac: state => state.mac,
      Pow: state => state.dataObject.Pow,
      wipm25: state => state.dataObject.wipm25,
      MidType: state => state.dataObject.MidType,
      FomadeValue: state => state.dataObject.FomadeValue,
      mode: state => state.dataObject.mode,
      light: state => state.dataObject.light,
      AirChildLock: state => state.dataObject.AirChildLock,
      wspd: state => state.dataObject.wspd,
      TmrOn: state => state.dataObject.TmrOn,
      TmrOff: state => state.dataObject.TmrOff,
      StTmr: state => state.dataObject.StTmr,
      FiltUPercent: state => state.dataObject.FiltUPercent,
      MeshWarning1: state => state.dataObject.MeshWarning1,
      JFerr: state => state.dataObject.JFerr,
      isScene: state => state.functype,
      deviceInfo: state => state.deviceInfo,
      devname: state => state.deviceInfo.name,
    }),
    btn_pow() {
      let powimg = '';
      let ret = '';
      let powtime = '';

      const { Pow } = this.dataObject;

      if (Pow) {
        powimg = require('../../assets/img/btn_powon.png');
        ret = true;
        powtime = '关';
      } else {
        powimg = require('../../assets/img/btn_powoff.png');
        ret = false;
        powtime = '开';
      }
      return { powimg, pow: ret, powtime };
    },
    /**
     *背景颜色随进风口的pm2.5的值进行变化
     * 0~35 优 绿色
     * 36~115 良 蓝色
     * 116以上 差 红色
     * 1001 整机开机时不稳定传来的值
     */
    wipm25Val() {
      const InletPm2p5 = this.wipm25;
      let airGradeNum = '';
      let color = '#eaf3ed';
      let val;
      val= InletPm2p5;
      if (InletPm2p5 >= 0 && InletPm2p5 < 36 && this.Pow === 1) {
        airGradeNum = 'green';
        color = '#eaf3ed';
      } else if (InletPm2p5 >= 36 && InletPm2p5 < 116 && this.Pow === 1) {
        airGradeNum = 'blue';
        color = '#eef5f5';
      } else if (InletPm2p5 > 999 || this.Pow === 0) {
        airGradeNum = 'green';
        color = '#eaf3ed';
        val='---';
      } else if (InletPm2p5 <= 999 && InletPm2p5 >= 116 && this.Pow === 1) {
        airGradeNum = 'red';
        color = '#f3f1ee';
      }
      if (this.MidType !== 57088) {
        this.phbg1 = require(`../../assets/img/bg_${airGradeNum}.png`);
        this.layerbg = require(`../../assets/img/ball_${airGradeNum}.png`);
        this.ballcolor = airGradeNum;
        if (this.$route.name === 'Home') {
          changeBarColor(color);
        }
      }
      return { val };
    },
    FomadeVal() {
      const fv = (parseInt(this.FomadeValue / 10) / 100).toFixed(2);
      let fvairGrade = '';
      let fvairGradeNum = '';
      let color = '#eaf3ed';
      let val=fv;
      if(this.FomadeValue>999){
        val='---';
      }
      if (fv >= 0 && fv <= 0.17 && this.Pow === 1) {
        fvairGradeNum = 'green';
        color = '#eaf3ed';
      } else if (fv > 0.17 && fv <= 0.4 && this.Pow === 1) {
        fvairGradeNum = 'blue';
        color = '#eef5f5';
      } else if (fv >= 0.99 || this.Pow === 0) {
        fvairGradeNum = 'green';
        color = '#eaf3ed';
      } else if (fv < 0.99 && fv > 0.4 && this.Pow === 1) {
        fvairGradeNum = 'red';
        color = '#f3f1ee';
      }
      this.phbg1 = require(`../../assets/img/bg_${fvairGradeNum}.png`);
      this.layerbg = require(`../../assets/img/ball_${fvairGradeNum}.png`);
      this.ballcolor = fvairGradeNum;
      if (this.$route.name === 'Home') {
        changeBarColor(color);
      }
      return { val };
    },
    funcList() {
      return [
        {
          name: '模式',
          iconfont: 'icon-moshi',
          isgray: this.Pow ? false : true,
          isgreen: false
        },
        {
          name: '风速',
          iconfont: 'icon-fengsu',
          isgreen: false,
          isgray: this.Pow ? false : true
        },
        {
          name: '定时',
          iconfont: 'icon-yuyue',
          isgreen: this.StTmr ? true : false,
          isgray: this.isScene||this.MeshWarning1===2 ? true : false
        },
        {
          name: '高级',
          isgreen: false,
          iconfont: 'icon-gaoji',
          isgray: this.MeshWarning1===2 ? true : false
        }
      ];
    },
    iconList() {
      return [
        {
          name: 'light',
          miniIcon: require('../../assets/img/icon_light.png'),
          isshow: this.light && this.Pow && this.MidType!==57088  //整机在一配好网发的数据就是light：1
        },
        {
          name: 'time',
          miniIcon: require('../../assets/img/icon_time.png'),
          isshow: this.StTmr ? true : false
        },
        {
          name: 'childlock',
          miniIcon: require('../../assets/img/icon_childlock.png'),
          isshow: this.AirChildLock ? true : false
        }
      ];
    },
    ModeList() {
      const { mode } = this.dataObject;
      return [
        {
          imgname:
            mode === AUTO_MODE ? require('../../assets/img/auto_on.png') : require('../../assets/img/auto_off.png'), //机型57088模式协议和其他款不同
          title: '自动',
          num: AUTO_MODE,
          begreen: mode === AUTO_MODE ? true : false,
          isshow:true,
        },
        {
          imgname:
            mode === MANUAL_MODE ? require('../../assets/img/hand_on.png') : require('../../assets/img/hand_off.png'),
          title: '手动',
          num: MANUAL_MODE,
          begreen: mode === MANUAL_MODE ? true : false,
          isshow:true,
        },
        {
          imgname:
            mode === SLEEP_MODE
              ? require('../../assets/img/sleep_on.png')
              : require('../../assets/img/sleep_off.png'),
          title: '睡眠',
          num: SLEEP_MODE,
          begreen: mode === SLEEP_MODE ? true : false,
          isshow:true,
        },
        {
          imgname:
            mode === 4 ? require('../../assets/img/quick_on.png') : require('../../assets/img/quick_off.png'),
          title: '快速',
          num: 4,
          begreen: mode === 4 ? true : false,
          isshow: this.MidType & 512 ? true : false,
        }
      ];
    },
    MoreList() {
      const { light } = this.dataObject;
      return [
        {
          imgname:
            light && this.Pow ? require('../../assets/img/light_on.png') : require('../../assets/img/light_off.png'),
          title: '灯光',
          isgray: this.Pow ? false : true,
          ishow: this.MidType === 57088|| this.MidType === 24320? true : false
        },
        {
          imgname: require('../../assets/img/fliter.png'),
          title: '滤网',
          isgray: this.Pow && !this.isScene ? false : true
        },
        {
          imgname: this.AirChildLock
            ? require('../../assets/img/lock_on.png')
            : require('../../assets/img/lock_off.png'),
          title: '童锁'
        }
      ];
    },
    power_off_bg() {
      const bg = require('@/assets/img/bg_off.png');
      return bg;
    },
    pickerDefaultIndex1() {
      const { wspd } = this.dataObject;
      return [wspd - 1];
    },
    timeshow() {
      let hour = parseInt(this.StTmr / 60);
      let min = parseInt(this.StTmr % 60); // 取余
      hour = hour < 10 ? `0${hour}` : `${hour}`; // 取整
      min = min < 10 ? `0${min}` : `${min}`; // 取整
      return [hour, min];
    }
  },
  watch: {
    Pow(newV) {
      this.setDataObject({ TmrOn: 0, StTmr: 0, TmrOff: 0 }); /*修改定时后开关机再次查看定时选中没有更新*/
      if(this.Pow===0){
      this.phbg1 = require(`../../assets/img/bg_green.png`);
      if (this.$route.name === 'Home') {
        changeBarColor("#eaf3ed");
      }
      }
    },
    mode(newV) {
      if (newV === AUTO_MODE) {
        this.setDataObject({ wspd: 2 });
        this.sendCtrl({ wspd: 2 });
      }
      if (newV === SLEEP_MODE) {
        this.setDataObject({ wspd: 1 });
        this.sendCtrl({ wspd: 1 });
      }
      if (newV === 4) {
        this.setDataObject({ wspd: 5 });
        this.sendCtrl({ wspd: 5 });
      }
    }
  },
  mounted() {
    if (this.Pow !== 1) changeBarColor('#eaf3ed');
    if (this.MidType === 57088) {
      AUTO_MODE = 2;
      MANUAL_MODE = 1;
      SLEEP_MODE = 3;
    }
    console.log(SLEEP_MODE);
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT'
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL',
      sendFunctypeCtrl: 'SEND_FUNCTYPE_CTRL'
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
      editDevice(this.mac);
    },
    save() {
      // 数据类型不匹配，导致安卓在设置场景时出现开机关机按钮同时可以点击的bug
      const hid = 0;
      this.setDataObject({ hid });

      const { Pow } = this;

      let zh = {};
      // 场景开机才有文案显示
      if (Pow) {
        zh = {
          mode_1: '模式自动',
          mode_2: '模式睡眠',
          mode_3: '模式手动',
          mode_4: '模式快速',
          light_0: '灯光关',
          light_1: '灯光开',
          AirChildLock_0: '童锁关',
          AirChildLock_1: '童锁开',
          wspd: '风速'
        };
      }
      this.sendFunctypeCtrl(zh);
    },
    showPopUpDemo(type) {
      this.$set(this.isPopupShowBottom, type, true);
    },
    hidePopUpDemo(type) {
      this.$set(this.isPopupShowBottom, type, false);
    },
    selectedPopup(index) {
      console.log(index);
    },
    onPickerConfirm1(columnIndex, itemIndex, value) {
      //调节风速时，模式切换到手动挡
      if (value) {
        this.pickerValue = value.text;
        this.setDataObject({ wspd: value.value, mode: MANUAL_MODE });
        this.sendCtrl({ wspd: value.value, mode: MANUAL_MODE });
      }
    },
    setpow() {
      if( this.MeshWarning1===2) return;
      if (this.Pow === 1) {
        this.setDataObject({ Pow: 0, TmrOn: 0, TmrOff: 0 });
        this.sendCtrl({ Pow: 0 });
      } else {
        this.setDataObject({ Pow: 1, TmrOn: 0, TmrOff: 0 });
        this.sendCtrl({ Pow: 1 });
      }
    },
    setfunc(index) {
      //重复点击处理
      switch (index) {
        case 0:
          if (this.Pow === 1) this.isPopupShowBottom.bottom = true;
          else return;
          break;
        case 1:
          if (this.Pow === 1) this.isPopupShowBottom.bottom1 = true;
          else return;
          break;
        case 2:
          if (this.isScene === 0 && this.MeshWarning1!==2) {
            if (this.TmrOn || this.TmrOff) {
              Dialog.confirm({
                title: '提示',
                content: '是否要取消定时?',
                confirmText: '是',
                onConfirm: () => {
                  this.setDataObject({ TmrOn: 0, StTmr: 0, TmrOff: 0 });
                  this.sendCtrl({ TmrOn: 0, StTmr: 0, TmrOff: 0 });
                },
                cancelText: '否',
                onCancel: () => console.log('[Dialog.confirm] cancel clicked')
              });
            } else {
              this.isPickerShow = true;
              this.$nextTick(() => {
                let dom = document.getElementsByClassName('gree-footer-btn')[1];
                dom.innerHTML = '保存';
                dom.style.color = '#5eb79e';
              });
            }
          }
          break;
        case 3:
          if(this.MeshWarning1!==2)
          this.isPopupShowBottom.bottom3 = true;
          else return;
      }
    },
    setMode(index) {
      //重复点击处理
      this.ModeList[index].begreen = true;
      this.setDataObject({ mode: this.ModeList[index].num });
      this.sendCtrl({ mode: this.ModeList[index].num });
      console.log(this.mode);
    },
    setMore(index) {
      switch (index) {
        case 0:
          if (this.Pow === 1) {
            if (this.light === 1) {
              this.setDataObject({ light: 0 });
              this.sendCtrl({ light: 0 });
            } else {
              this.setDataObject({ light: 1 });
              this.sendCtrl({ light: 1 });
            }
          } else return;
          break;
        case 1:
          if (this.Pow === 1 && this.isScene === 0) {
            this.$router.push({ path: 'fliter' });
          } else return;
          break;
        case 2:
          if (this.AirChildLock === 1) {
            this.setDataObject({ AirChildLock: 0 });
            this.sendCtrl({ AirChildLock: 0 });
          } else {
            this.setDataObject({ AirChildLock: 1 });
            this.sendCtrl({ AirChildLock: 1 });
          }
          break;
      }
    },
    timeData() {
      const timelist = [];
      const minLIist = [];
      for (let index = 0; index < 60; index++) {
        const child = {};
        child.value = index;
        child.text = index < 10 ? `0${index}` : `${index}`;
        minLIist.push(child);
      }
      for (let index = 0; index < 24; index++) {
        const parent = {};
        parent.value = index;
        parent.text = index < 10 ? `0${index}` : `${index}`;
        timelist.push(parent);
      }
      return [timelist, minLIist];
    },
    onPickerConfirm4() {
      const values = this.$refs['picker4'].getColumnValues();
      const lestTimes = values[0].value * 60 + values[1].value;
      if (lestTimes === 0) return;
      if (this.Pow === 1) {
        this.setDataObject({ TmrOff: 1, StTmr: lestTimes });
        this.sendCtrl({ TmrOff: 1, StTmr: lestTimes });
      }
      if (this.Pow === 0) {
        this.setDataObject({ TmrOn: 1, StTmr: lestTimes });
        this.sendCtrl({ TmrOn: 1, StTmr: lestTimes });
      }
    },
    goto() {
      this.$router.push({ path: 'fliter' });
    },
    gotoerr() {
      this.$router.push({ path: 'errorwarning' });
    }
  }
};
</script>
