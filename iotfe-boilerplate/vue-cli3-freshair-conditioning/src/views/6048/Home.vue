<template>
  <gree-view bgColor='#AACD52'>
    <gree-page
      no-navbar
      class="page-home"
    >
      <div
        class="page-header"
        :style="{backgroundImage:'url(' + head_bg + ')'}"
      >
        <gree-header
          theme="transparent"
          :left-options="{preventGoBack: true}"
          @on-click-back="goBack"
          :right-options="{showMore: !isScene}"
          @on-click-more="moreInfo"
        >{{ devname }}<a slot="right" @click="saveScene" v-if="isScene">保存</a></gree-header>
        <gree-row>
          <gree-col
            @click.native="JumpBoxDetali()"> 
            <!-- 空气质量 -->
            <div class="air-quality">
              <span class="air-level">{{ Boolean(airQ[AirQu])? airQ[AirQu]: '--'}}</span>
            </div>
            <!-- cols 数据展示 -->
            <gree-row class="data-list" >
              <gree-col
                width="12"
                v-for="(item, index) in JsonDataList.ColsList"
                :key="index"
              >
                <p>{{ item.Value }}</p>
                <p>{{ $language(item.Name) }}</p>
              </gree-col>
            </gree-row>
          </gree-col>
        </gree-row>
        <!-- 故障 -->
        <gree-notice-bar 
          class="custom-notice-bar-error" 
          v-show="!isScene"
          @click.native="$router.push({ name: 'Error' })"
          v-if="SensorErr && !isMultiError"
        >
          <span>{{ $language('error.error_in') + '：' + errorListMixins[errorIndex].code}}, </span>
          <img
            slot="left"
            src="@/assets/img/warning.png"
          >
          <span>{{ errorListMixins[errorIndex].name }}</span>
          <a>{{ $language('home.detail') }}</a>
        </gree-notice-bar>
        <gree-notice-bar class="custom-notice-bar-error"
          @click.native="$router.push({ name: 'Error' })"
          v-else-if="SensorErr && isMultiError"
        >
          <img
            slot="left"
            src="@/assets/img/warning.png"
          >
          <gree-marquee>
            <gree-marquee-item
              v-for="(item, key) in errorMsg"
              :key="key"
              ><span>{{ $language('error.error_in') + '：' + errorCode[key] }}
              </span>{{ item }}<a>
              {{ $language('home.detail') }}</a>
            </gree-marquee-item>
          </gree-marquee>
        </gree-notice-bar>
      </div>

      <div class="page-main" v-show="!isScene">
        <!-- 警告 -->
        <gree-notice-bar
          icon
          v-show="PctCle||PctRe"
        >
          <img src="@/assets/img/warning-tips.png">
          <span v-if="PctRe">{{ $language("home.PctRe") }}
            <!-- <a @click="buyAddress()" class="buy">{{ $language("home.buy") }}</a> -->
          </span>
          <span v-else-if="PctCle">{{ $language("home.PctCle") }}</span>
        </gree-notice-bar>
      </div>
      <gree-popup
          v-model="isPopupShowAir.center"
          position="center"
        >
        <gree-radio-list
          :options="modes"
          :value="IDUAirQu"
          icon="check"
          icon-inverse
          @change="Airquality"
        />
      </gree-popup> 
      <div class="page-main">
      </div>
      <!-- 滑块组件 -->
      <gree-block class="extend">
        <Carousel-Fan
          class="carousel-fanmode"
          ref="carousel-fanmode"
          @currentChange="handleChangeFan"
          :propData="ModFanIcons"
          :options="carouselFanOptions"
        >
        </Carousel-Fan>
        <p class="mode-text">{{ ModFanText }}</p>
      </gree-block>
      <gree-block class="last-extend">
        <Carousel-Move
          class="carousel-movemode"
          ref="carousel-movemode"
          @currentChange="handleChangeMove"
          @touchstart.native="showTip"
          :propData="ModMoveIcons"
          :options="carouselMoveOptions"
        >
        </Carousel-Move>
        <div class="fan-text">
          <span >{{ ModMoveText }}</span>
          <img @click="showPopUp('center')" v-if="this.FanMod === 3 && !isScene"
            class="imgtips" 
            :src="require('@assets/img/rename.png')">
        </div>
      </gree-block>
      <gree-block class="caro-txt" v-show="!isScene">
         <div class="caro-txt-tips">
           <span class="caro-txt-mode">{{airMode[RunMod-1]}}</span>
         </div>
      </gree-block>
      <!-- 电源关闭 -->
      <gree-power-off class="gree-power-off-extend"
        v-model="showPowerOff"
        :text="$language('home.powerOff')"
        :style="{background:'#F4F4F4'}"
      ></gree-power-off>
      <!-- 底部按钮 -->
      <gree-toolbar class="toolbar_position"
        position="bottom"
        no-hairline
      >
        <gree-row>
          <gree-col
            :class="{hidden: !item.isShowFuncBtn, disabled: item.isDisabled}"
            v-for="(item, index) in FootList"
            :key="index"
            @click.native="setFunction(index)"
          >
            <div class="icon">
              <img :src="require('@/assets/img/' + item.ImgName + '.png')">
            </div>
            <h3>{{ $language(item.Name) }}</h3>
          </gree-col>
        </gree-row>
      </gree-toolbar>
    </gree-page>
    <!-- 底部弹出层按钮 -->
    <function-list :is-popup-show="isPopupShow"></function-list>
  </gree-view>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import homeConfig from '@/mixins/config/6048/home';
import errorConfig from '@/mixins/config/error';
import watchMod from '@/mixins/utils/watch-mod';
import FunctionList from '@/components/6048/FunctionList';
import * as type from '@/store/types';
import {
  Header,
  Row,
  Block,
  NoticeBar,
  Popup,
  RadioGroup,
  PowerOff,
  ToolBar,
  Col,
  RadioList,
  Marquee,
  MarqueeItem
} from 'gree-ui';
import {
  closePage,
  editDevice,
  showToast,
  toWebPage,
  getCCcmd
} from '../../../../static/lib/PluginInterface.promise';
import CarouselFan from '../../components/6048/carousel/CarouselFan';
import CarouselMove from '../../components/6048/carousel/CarouselMove';

export default {
  components: {
    FunctionList,
    CarouselFan,
    CarouselMove,
    [Header.name]: Header,
    [Row.name]: Row,
    [Block.name]: Block,
    [NoticeBar.name]: NoticeBar,
    [Popup.name]: Popup,
    [RadioGroup.name]: RadioGroup,
    [PowerOff.name]: PowerOff,
    [ToolBar.name]: ToolBar,
    [Col.name]: Col,
    [RadioList.name]: RadioList,
    [Marquee.name]: Marquee,
    [MarqueeItem.name]: MarqueeItem
  },
  mixins: [homeConfig, errorConfig, watchMod],
  data() {
    return {
      showPowerOff: false,
      isPopupShow: {},
      isWarningShow: false,
      airQ: ['--', '优', '良', '中', '差', '差', '差'],
      FanModFlag: true,
      roomFlag: true,
      filterAddress:
        'http://mall.gree.com/mall/zh-CN/beijing/jiayongzhongyang/%E9%99%A4%E9%9C%BE%E6%9C%BA%E8%BF%87%E6%BB%A4%E7%BD%91',
      airMode: [
        '热交换',
        '旁通模式',
        '排风模式',
        '低温模式',
        '内循环',
        '内循环'
      ],
      errorIndex: null, // 故障下标
      isMultiError: false, // 是否多故障
      errorMsg: [], // 故障文本(如果多故障的话)
      errorCode: [], // 故障代码
      width: 20, // 列表
      // radioqqq: String(this.IDUAirQu),
      isPopupShowAir: {},
      modes: [
        {
          value: '2',
          text: '空气品质目标／良'
        },
        {
          value: '1',
          text: '空气品质目标／优'
        }
      ],
      carouselFanOptions: {
        // 是否显示
        isShow: true,
        // 是否可控
        controlAble: true,
        // 显示数字还是图片
        showNumOrImg: false,
        // 这里设想了2种控制模式：
        // 1.滑动选择控制，是之前使用的方案，只显示当前的选中元素，滑动时出现左右元素
        // 2.滑动+点选控制，以后可能会有这样的需求，显示当前及左右两侧的多个元素，可滑动调节也可点击直接跳至点击元素
        controlMode: 1,
        // 水平显示or竖直显示
        horizontal: true,
        // 显示3个or全部显示（有时会有只显示当前及左右两边的值(共三个)的需求，在组件内部实现了隐藏效果）
        threeOrAll: false,
        // 打开/关闭点选，某些场景需要这样设置，点选和滑动有冲突，比较鸡肋的点选功能
        clickAble: false,
        // 定位布局配置项：容器的水平位置绝对定位于窗口
        // 组件宽度及水平定位
        width: '100%',
        marginLeft: '0%',
        // 子项间距,值越小越密集
        spaceBetween: '95%',
        // 子项容器高度 （似乎这两个值之间存在某种联系，需要一起按比例改变）
        height: '1rem',
        // 字体大小
        fontSize: '4rem'
        // 文字颜色及背景颜色在css中设置即可
      },
      carouselMoveOptions: {
        // 是否显示
        isShow: true,
        // 是否可控
        controlAble: true,
        // 显示数字还是图片
        showNumOrImg: false,
        // 这里设想了2种控制模式：
        // 1.滑动选择控制，是之前使用的方案，只显示当前的选中元素，滑动时出现左右元素
        // 2.滑动+点选控制，以后可能会有这样的需求，显示当前及左右两侧的多个元素，可滑动调节也可点击直接跳至点击元素
        controlMode: 1,
        // 水平显示or竖直显示
        horizontal: true,
        // 显示3个or全部显示（有时会有只显示当前及左右两边的值(共三个)的需求，在组件内部实现了隐藏效果）
        threeOrAll: false,
        // 打开/关闭点选，某些场景需要这样设置，点选和滑动有冲突，比较鸡肋的点选功能
        clickAble: false,
        // 定位布局配置项：容器的水平位置绝对定位于窗口
        // 组件宽度及水平定位
        width: '100%',
        marginLeft: '0%',
        // 子项间距,值越小越密集
        spaceBetween: '95%',
        // 子项容器高度 （似乎这两个值之间存在某种联系，需要一起按比例改变）
        height: '1rem',
        // 字体大小
        fontSize: '4rem'
        // 文字颜色及背景颜色在css中设置即可
      }
    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      isScene: state => state.isScene,
      dataObject: state => state.dataObject,
      remarks: state => state.remarks,
      Pow: state => state.dataObject.Pow,
      IDUAirQu: state => String(state.dataObject.IDUAirQu),
      TemSor: state => state.dataObject.TemSor,
      HumSor: state => state.dataObject.HumSor,
      HCHO: state => state.dataObject.HCHO,
      VOC: state => state.dataObject.VOC,
      CO2: state => state.dataObject.CO2,
      PM2P5: state => state.dataObject.PM2P5,
      FanMod: state => state.dataObject.FanMod, // 设定模式
      WdSpd: state => state.dataObject.WdSpd, // 风速定义
      AirQu: state => state.dataObject.AirQu, // 空气质量
      PctCle: state => state.dataObject.PctCle,
      PctRe: state => state.dataObject.PctRe,
      mac: state => state.mac,
      ModFanIcons: state => state.data.FanMode.icons,
      ModMoveIcons: state => state.data.MoveMode.icons,
      allState: state => state.data,
      ModFanText(state) {
        const val = state.dataObject.WdSpd;
        const index = state.data.FanMode.range.indexOf(val);
        const ifindex = index === -1 ? 1 : index;
        this.$nextTick(() => {
          this.setCarouselIdFan('carousel-fanmode', ifindex);
        });
        return state.data.FanMode.rNames[ifindex];
      },
      ModMoveText(state) {
        const val = state.dataObject.FanMod;
        const index = state.data.MoveMode.range.indexOf(val);
        const ifindex = index === -1 ? 1 : index;
        this.$nextTick(() => {
          this.setCarouselIdMove('carousel-movemode', ifindex);
        });
        return state.data.MoveMode.rNames[ifindex];
      },
      SensorErr: state => state.dataObject.ErrType,
      RunMod: state => state.dataObject.RunMod,
      ModS: state => state.dataObject.ModS,
      MIdType: state => state.dataObject.MIdType
    }),
    head_bg() {
      const bg = require('@/assets/img/bg_box_n.png');
      return bg;
    }
  },
  watch: {
    /**
     * @description 获取电源开关信息，更新电源按键UI
     */
    Pow: {
      handler() {
        this.showPowerOff = Boolean(!this.Pow);
        this.$nextTick(() => {
          this.Pow
            ? (this.FootList[0].ImgName = 'btn_off')
            : (this.FootList[0].ImgName = 'btn_on');
        });
      },
      immediate: true
    },

    /**
     * @description 更新故障显示
     */
    SensorErr() {
      this.errorIndex = this.getErrorIndex();
      this.errorMsg = [];
      this.errorCode = [];
      this.getErrorMsg();
    }
  },
  created() {
    this.Pow
      ? (this.FootList[0].ImgName = 'btn_off')
      : (this.FootList[0].ImgName = 'btn_on');
    this.errorIndex = this.getErrorIndex();
  },
  mounted() {
    this.getErrorMsg();
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT'
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL'
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
    /**
     * @description 点击底部功能列表
     */
    setFunction(val) {
      if (this.SensorErr && !this.isScene) {
        showToast(this.$language('error.error_tips'), 0);
      } else {
        switch (val) {
          case 0:
            this.Pow ? this.sendCtrl({ Pow: 0 }) : this.sendCtrl({ Pow: 1 });
            this.Pow
              ? this.setDataObject({ Pow: 0 })
              : this.setDataObject({ Pow: 1 });
            break;
          case 1:
            this.$set(this.isPopupShow, 'bottom', true);
            this.$store.commit(type.IS_MOREBTN, false);
            break;
          case 2:
            this.$router.push({ name: 'Voice' });
            break;
          default:
            break;
        }
      }
    },
    getErrorIndex() {
      const __SensorErr = this.SensorErr.toString(2);
      for (let i = 0; i < 16; i += 1) {
        if (__SensorErr & (0x01 << i)) {
          return i;
        }
      }
      return null;
    },
    getErrorMsg() {
      const __SensorErr = this.SensorErr.toString(2)
        .split('')
        .reverse();
      let errorSum = 0;
      setTimeout(() => {
        __SensorErr.forEach((v, k) => {
          if (v === '1') {
            errorSum += 1;
            this.errorMsg.push(`${this.errorListMixins[k].title}`);
            this.errorCode.push(`${this.errorListMixins[k].code},`);
          }
        });
        if (errorSum === 1) {
          this.isMultiError = false;
        } else {
          this.isMultiError = true;
        }
      }, 200);
    },
    JumpBoxDetali() {
      this.SensorErr
        ? showToast(this.$language('error.error_tips'), 0)
        : this.$router.push({ name: 'BoxDetail' });
    },
    handleChangeFan(args) {
      const val = this.allState.FanMode.range[args];
      console.log(`${val}!!!!`);
      if (this.SensorErr) {
        showToast(this.$language('error.error_tips'), 0);
      } else if (this.FanMod !== 3 && val === 1) {
        this.setDataObject({ WdSpd: this.WdSpd });
        this.setCarouselIdFan('carousel-fanmode', this.WdSpd - 1);
        // 自动模式下才能设置自动风
        showToast(this.$language('home.autoFanMutexAutoMove'), 0);
      } else {
        this.setDataObject({ WdSpd: val });
        this.sendCtrl({ WdSpd: val });
      }
    },
    handleChangeMove(args) {
      const val = this.allState.MoveMode.range[args];
      console.log('验证问题', args);
      const rName = this.allState.MoveMode.rNames[args];
      const lastModFan = this.FanMod; // 拿上一个模式先存起来
      this.setDataObject({ FanMod: val });
      if (this.SensorErr) {
        showToast(this.$language('error.error_tips'), 0);
      } else {
        const effective = this.ModS.toString(2)
          .split('')
          .reverse();
        if (effective[args] === '1') {
          this.sendCtrl({ FanMod: val });
          if (args !== 2 && this.WdSpd === 1) {
            this.setDataObject({ WdSpd: 2 }); // 自动风下，改变自动模式，默认设置风挡为低风
            this.sendCtrl({ WdSpd: 2 });
          }
        } else {
          showToast(`不可设置${rName}`, 0);
          setTimeout(() => {
            this.setDataObject({ FanMod: lastModFan });
            this.setCarouselIdMove(
              'carousel-movemode',
              this.allState.FanMode.range.indexOf(lastModFan)
            );
          }, 0);
        }
      }
    },
    setCarouselIdMove(name, id) {
      setTimeout(() => {
        this.$refs[name].setId(id);
        console.log(name, id);
      }, 0);
    },
    // 修复ios异常问题复制两个分开
    setCarouselIdFan(name, id) {
      setTimeout(() => {
        this.$refs[name].setId(id);
        console.log(name, id);
      }, 0);
    },
    showPopUp(type) {
      this.$set(this.isPopupShowAir, type, true);
    },
    Airquality(option) {
      this.sendCtrl({ IDUAirQu: Number(option.value) });
      this.setDataObject({ IDUAirQu: Number(option.value) });
      this.$set(this.isPopupShowAir, 'center', false);
    },
    /**
     * @function showTip
     * @description 滑轮不可滑动时弹出提示
     *
     */
    showTip() {},
    mainBoxShow(index) {
      if (
        this.DataBoxData[index].GasMas.toString(2)
          .split('')
          .reverse()[index] === '1'
      ) {
        return true;
      }
      return false;
    },
    buyAddress() {
      toWebPage(this.filterAddress, this.$language('home.filterbuy'));
    },
    /**
     * @function saveScene
     * @description 场景模式的保存
     */
    saveScene() {
      const keys = Object.keys(this.dataObject);
      const opt = [];
      const p = [];
      console.log(this.remarks);
      const remarks = '...';
      for (let i = 0, j = keys.length; i < j; i += 1) {
        opt.push(keys[i]);
        p.push(this.dataObject[keys[i]]);
      }
      const json = JSON.stringify({ opt, p, t: 'cmd', sub: this.g_mac });
      console.log('保存的数据: ', json);
      getCCcmd(this.mac, json, remarks, JSON.stringify(p));
    }
  }
};
</script>

<style type="text/scss" lang="scss" scoped>
.swiperfy {
  height: 180px;
}
.carousel-fanmode {
  height: 140px;
}
.carousel-movemode {
  height: 140px;
}
.mode-text {
  text-align: center;
  font-size: 75.6px;
  color: black;
  -webkit-margin-before: 0;
  -webkit-margin-after: 0;
  margin-top: 21.6px;
}
.fan-text {
  font-size: 75.6px;
  color: black;
  -webkit-margin-before: 0;
  -webkit-margin-after: 0;
  margin-top: 21.6px;
  .imgtips {
    float: right;
    width: 40px;
    padding-top: 50px;
  }
}
.extend {
  margin-top: 160px;
}
.last-extend {
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.caro-txt {
  margin-top: 19px;
  .caro-txt-tips {
    text-align: center;
    font-size: 75.6px;
    color: black;
    -webkit-margin-before: 0;
    -webkit-margin-after: 0;
    // margin-top: 160px;
  }
}
</style>
