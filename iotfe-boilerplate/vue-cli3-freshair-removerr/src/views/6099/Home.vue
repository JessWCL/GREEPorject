<template>
  <gree-view>
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
          :right-options="{showMore: !functype}"
          @on-click-more="moreInfo"
        >{{ devname }}</gree-header>
        <!-- 设备状态小图标 -->
        <!-- <div 
          class="bar-top" 
          :class="{hidden: ChargeOnesCountInNum2() === 2}">
          <gree-row>
            <gree-col>
              <img
                :src="require('@/assets/img/' + item.ImgName + '.png')"
                :class="{hidden: item.isHidden}"
                v-for="(item, index) in DeviceStatusIcon"
                :key="index"
              >
            </gree-col>
          </gree-row>
        </div> -->
        <gree-row>
          <div class="page-line" :class="{hidden: ChargeOnesCountInNum2() !== 2}"></div>
          <gree-col
            v-for="(item, index) in DataBoxData"
            :key="index" 
            @click.native="JumpBoxDetali(index)"> 
            <!-- 空气质量 -->
            <div class="air-quality">
              <span class="air-level">{{ airQ[item.AirQu] }}</span>
            </div>
            <div class="room-name"> 
              <span class="room-name-txt">{{ homeName[index].room }}</span>
              <img v-show="DataBoxData[index].GasMas"                
                src="@/assets/img/mainroom.png"
              >
            </div>
            <!-- cols 数据展示 -->
            <gree-row :class="ChargeOnesCountInNum2() !== 2? 'data-list':'data-listbox'" 
               v-if="!DataBoxData[index].SorErr&&DataBoxData[index].GasAvail">
              <gree-col
                width="20"
                v-for="(item, index) in JsonDataList[`ColsList_${index}`]"
                :key="index"
              >
                <p>{{ item.Value }}</p>
                <p>{{ $language(item.Name) }}</p>
              </gree-col>
            </gree-row>
             <gree-row v-else-if="DataBoxData[index].SorErr">
                <gree-notice-bar 
                 class="box-notice-bar-error"
                >
                  <img
                    slot="left"
                    src="@/assets/img/warning-box.png"
                  >
                  <span>{{ $language('error.box_error') }}</span>
                </gree-notice-bar>
             </gree-row>
              <gree-row v-else-if="!DataBoxData[index].GasAvail && !DataBoxData[index].SorErr">
                <gree-notice-bar 
                 class="box-notice-bar-error"
                >
                  <span>{{ $language('error.box_stop') }}</span>
                </gree-notice-bar>
             </gree-row>
          </gree-col>
        </gree-row>
        <gree-block class="notice-err">
          <!-- 故障 -->
          <gree-notice-bar class="custom-notice-bar-error"
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
       </gree-block>
      </div>

      <div class="page-main">
        <!-- 警告 -->
        <gree-notice-bar
          icon
          v-show="PctCle||PctRe"
        >
          <img src="@/assets/img/warning-tips.png">
          <span v-if="PctRe">{{ $language("home.PctRe") }}<a :href="this.filterAddress" class="buy">{{ $language("home.buy") }}</a></span>
          <span v-else-if="PctCle">{{ $language("home.PctCle") }}</span>
        </gree-notice-bar>
      </div>
      <gree-popup
          v-model="isPopupShow3.center"
          position="center"
        >
        <van-radio-group v-model="IDUAirQu">
          <van-cell-group>
            <van-cell class='better' title="空气品质目标／良" clickable>
              <van-radio  slot="right-icon" name="2" @click="Airqualityl()"/>
            </van-cell>
            <van-cell class='better' title="空气品质目标／优" clickable>
              <van-radio  slot="right-icon" name="1" @click="Airqualityy()"/>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </gree-popup> 
      <div class="page-main">
        <!-- 设备状态底部小图标 -->
        <!-- <div 
          class="bar-bottom" 
          :class="{hidden: ChargeOnesCountInNum2() !== 2}">
          <gree-row>
            <gree-col>
              <img
                :src="require('@/assets/img/' + item.ImgName + '.png')"
                :class="{hidden: item.isHidden}"
                v-for="(item, index) in DeviceStatusIcon"
                :key="index"
              >
            </gree-col>
          </gree-row>
        </div> -->
      </div>
      <!-- 滑块组件 -->
      <gree-block class="extend">
        <Carousel
          class="carousel-fanmode"
          ref="carousel-fanmode"
          @currentChange="handleChangeFan"
          :propdata="ModFanIcons"
          :options="carouselFanOptions"
        >
        </Carousel>
        <p class="mode-text">{{ ModFanText }}</p>
      </gree-block>
      <gree-block class="last-extend">
        <Carousel
          class="carousel-movemode"
          ref="carousel-movemode"
          @currentChange="handleChangeMove"
          @touchstart.native="showTip"
          :propdata="ModMoveIcons"
          :options="carouselMoveOptions"
        >
        </Carousel>
        <div class="fan-text">
          <span >{{ ModMoveText }}</span>
          <img @click="showPopUp3('center')" v-if="this.FanMod === 3"
            class="imgtips" 
            :src="require('@assets/img/rename.png')">
        </div>
      </gree-block>
      <gree-block class="caro-txt">
         <div class="caro-txt-tips">
           <span class="caro-txt-mode">{{airMode[RunMod]}}</span>
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
import { mapState, mapMutations, mapActions } from "vuex";
import homeConfig from "@/mixins/config/6099/home";
import errorConfig from "@/mixins/config/error";
import watchMod from "@/mixins/utils/watch-mod";
import FunctionList from "@/components/6099/FunctionList";
import * as type from "@/store/types";
import {
  closePage,
  editDevice,
  changeBarColor,
  showToast
} from "../../../../static/lib/PluginInterface.promise";
import Carousel from "../../components/6099/carousel/Carousel";

export default {
  components: {
    FunctionList,
    Carousel
  },
  mixins: [homeConfig, errorConfig, watchMod],
  data() {
    return {
      showPowerOff: false,
      isPopupShow: {},
      isWarningShow: false,
      airQ: ["--", "优", "良", "中", "差", "差", "差"],
      FanModFlag: true,
      roomFlag:true,
      filterAddress:"http://mall.gree.com/mall/zh-CN/beijing/jiayongzhongyang/%E9%99%A4%E9%9C%BE%E6%9C%BA%E8%BF%87%E6%BB%A4%E7%BD%91",
      airMode: [
        "全热模式",
        "旁通模式",
        "排风模式",
        "低温模式",
        "内循环1",
        "内循环2"
      ],
      errorIndex: null, // 故障下标
      isMultiError: false, // 是否多故障
      errorMsg: [], // 故障文本(如果多故障的话)
      errorCode:[], // 故障代码
      width: 20, // 列表
      //radioqqq: String(this.IDUAirQu),
      isPopupShow3: {},
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
        width: "100%",
        marginLeft: "0%",
        // 子项间距,值越小越密集
        spaceBetween: "95%",
        // 子项容器高度 （似乎这两个值之间存在某种联系，需要一起按比例改变）
        height: "1rem",
        // 字体大小
        fontSize: "4rem"
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
        width: "100%",
        marginLeft: "0%",
        // 子项间距,值越小越密集
        spaceBetween: "95%",
        // 子项容器高度 （似乎这两个值之间存在某种联系，需要一起按比例改变）
        height: "1rem",
        // 字体大小
        fontSize: "4rem"
        // 文字颜色及背景颜色在css中设置即可
      }
    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      functype: state => state.functype,
      isMorebtn: state => state.isMorebtn,
      isScene: state => state.isScene,
      Pow: function(state) {
        if (state.dataObject.Pow === 1) {
          this.showPowerOff = false;
        } else {
          this.showPowerOff = true;
        }
        return state.dataObject.Pow;
      },
      IDUAirQu: state => String(state.dataObject.IDUAirQu),
      DataBoxData: state => state.DataBoxData,
      // DataBoxData:function(state){
      //     this.roomFlag = state.DataBoxData[this.]
      //     return state.DataBoxData
      // },
      FanMod: state => state.dataObject.FanMod, // 设定模式
      WdSpd: state => state.dataObject.WdSpd, // 风速定义
      GasQ: state => state.dataObject.GasQ, // 盒子个数
      // GasN: state => state.GasN,
      PctCle: state => state.dataObject.PctCle,
      PctRe: state => state.dataObject.PctRe,
      mac: state => state.mac,

      ModFanIcons: state => {
        return state.data.FanMode.icons;
      },
      ModMoveIcons: state => {
        return state.data.MoveMode.icons;
      },
      allState: state => state.data,
      ModFanText: state => {
        const val = state.dataObject.WdSpd;
        const index = state.data.FanMode.range.indexOf(val);
        return state.data.FanMode.rNames[index];
      },
      ModMoveText: state => {
        const val = state.dataObject.FanMod;
        const index = state.data.MoveMode.range.indexOf(val);
        return state.data.MoveMode.rNames[index];
      },
      SensorErr: state => state.dataObject.ErrType,
      homeName: state => state.homeName,
      RunMod: state => state.dataObject.RunMod,
      ModS: state => state.dataObject.ModS,
    }),
    head_bg() {
      let bg;
      if (this.ChargeOnesCountInNum2() === 2) {
        bg = require("@/assets/img/bg_box_n.png");
      } else {
        bg = require("@/assets/img/bg_box_n.png");
      }
      return bg;
    },
    power_off_bg() {
      let bg;
      if (this.InAirQuality === 1) {
        bg = require("@/assets/img/bg_off_a.png");
      } else if (this.InAirQuality === 2) {
        bg = require("@/assets/img/blur_new.png");
      } else if (this.InAirQuality === 3) {
        bg = require("@/assets/img/bg_off_c.png");
      } else {
        bg = require("@/assets/img/bg_off_s.png");
      }
      return bg;
    }
  },
  watch: {
    /**
     * @description 获取电源开关信息，更新电源按键UI
     */
    Pow() {
      this.showPowerOff = Boolean(!this.Pow);
      this.Pow
        ? (this.FootList[0].ImgName = "btn_off")
        : (this.FootList[0].ImgName = "btn_on");
      //this.FootList[1].isDisabled = Boolean(!this.Pow);
    },
    InAirQuality(val) {
      switch (val) {
        case 0:
          changeBarColor(this.BarColor[0].Value);
          break;
        case 1:
          changeBarColor(this.BarColor[1].Value);
          break;
        case 2:
          changeBarColor(this.BarColor[2].Value);
          break;
        case 3:
          changeBarColor(this.BarColor[3].Value);
          break;
        default:
          changeBarColor(this.BarColor[0].Value);
          break;
      }
    },
    /**
     * @description 更新故障显示
     */
    SensorErr() {
      this.errorIndex = this.getErrorIndex();
      this.errorMsg = [];
      this.errorCode = [];
      this.getErrorMsg();
      // if (this.SensorErr){
      //  this.carouselFanOptions.controlAble = false;
      //  this.carouselMoveOptions.controlAble = false;
      // }else{
      //  this.carouselFanOptions.controlAble = true;
      //  this.carouselMoveOptions.controlAble = true;
      // }
    },
    /**
     * @description 房间内设备数量
     */
    deviceNum() {
      if (this.deviceNum <= 1 && this.AutoCtr === 1) {
        this.setDataObject({ AutoCtr: 0 });
        this.sendCtrl({ AutoCtr: 0 });
      }
    },
    ModFanText(newValue, oldValue) {
      const index = this.allState.FanMode.rNames.indexOf(newValue);
      this.setCarouselId("carousel-fanmode", index);
      console.log(newValue, oldValue, index);
    },
    ModMoveText(newValue, oldValue) {
      const index = this.allState.MoveMode.rNames.indexOf(newValue);
      this.setCarouselId("carousel-movemode", index);
      console.log(newValue, oldValue, index);
    }
  },
  created() {
    //this.$set(this.isPopupShow, 'bottom', this.isMorebtn);
    this.Pow
      ? (this.FootList[0].ImgName = "btn_off")
      : (this.FootList[0].ImgName = "btn_on");
    this.errorIndex = this.getErrorIndex();
  },
  mounted() {
    this.getErrorMsg();
    const fanval = this.allState.FanMode.value;
    const fanindex = this.allState.FanMode.range.indexOf(fanval);
    this.setCarouselId("carousel-fanmode", fanindex);
    const moveval = this.allState.MoveMode.value;
    const moveindex = this.allState.MoveMode.range.indexOf(moveval);
    this.setCarouselId("carousel-movemode", moveindex);
  },
  methods: {
    ...mapMutations({
      setDataObject: "SET_DATA_OBJECT",
      setBoxNum: "SET_BOX_NUM"
    }),
    ...mapActions({
      sendCtrl: "SEND_CTRL"
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
      if (this.SensorErr) {
        showToast("故障中,不可调节", 0);
      } else {
        switch (val) {
          case 0:
            this.Pow ? this.sendCtrl({ Pow: 0 }) : this.sendCtrl({ Pow: 1 });
            this.Pow
              ? this.setDataObject({ Pow: 0 })
              : this.setDataObject({ Pow: 1 });
            break;
          case 1:
            this.$set(this.isPopupShow, "bottom", true);
            this.$store.commit(type.IS_MOREBTN, false);
            break;
          case 2:
            this.$router.push({ name: "Voice" });
            break;
          default:
            break;
        }
      }
    },
    getErrorIndex() {
      const __SensorErr = this.SensorErr.toString(2);
      // 发生任一故障，禁用自动控制功能
      // if (__SensorErr > 0) {
      //   this.setDataObject({ AutoCtr: 0 });
      //   this.sendCtrl({ AutoCtr: 0 });
      //   if (parseInt(__SensorErr, 2) !== 2) {
      //     this.setDataObject({ LigPow: 0 });
      //     this.sendCtrl({ LigPow: 0 });
      //   }
      // }
      for (let i = 0; i < 8; i += 1) {
        if (__SensorErr & (0x01 << i)) {
          return i;
        }
      }
      return null;
    },
    getErrorMsg() {
      const __SensorErr = this.SensorErr.toString(2)
        .split("")
        .reverse();
      let errorSum = 0;
      setTimeout(() => {
        __SensorErr.forEach((v, k) => {
          if (v === "1") {
            errorSum += 1;
            this.errorMsg.push(`${this.errorListMixins[k].name}`);
            this.errorCode.push(`${this.errorListMixins[k].code},`)
          }
        });
        if (errorSum === 1) {
          this.isMultiError = false;
        } else {
          this.isMultiError = true;
        }
      }, 200);
    },
    JumpBoxDetali(index) {
      // this.$router.push({
      //   path: 'BoxDetail',
      //   query: {
      //     index,
      //   }

      // });
      this.DataBoxData[index].SorErr ? "" : this.$router.push({ name: "BoxDetail" });
      this.setBoxNum(index);
    },
    handleChangeFan(args) {
      if (this.SensorErr) {
        showToast("故障中,不可调节", 0);
        //this.carouselFanOptions.controlAble = false;
      } 
      //this.carouselFanOptions.controlAble = true;
      let val = this.allState.FanMode.range[args];
      let rName = this.allState.FanMode.rNames[args];
      this.setDataObject({ WdSpd: val });
      if (this.SensorErr) {
        showToast("故障中,不可调节", 0);
        //this.carouselFanOptions.controlAble = false;
      }else{
       this.sendCtrl({ WdSpd: val });
      }
    },
    handleChangeMove(args) {
      let val = this.allState.MoveMode.range[args];
      let rName = this.allState.MoveMode.rNames[args];
      this.setDataObject({ FanMod: val });
      if (this.SensorErr) {
        showToast("故障中,不可调节", 0);
      }else{
        // if (this.FanModFlag){
        //   this.sendCtrl({ FanMod: val });
        // }else{
        //   // showToast(`不可设置${rName}`, 0);
        //   console.log(`不可设置${rName}`)
        // }
       // debugger
       //this.sendCtrl({ FanMod: val });
       // const effective =  this.ModS.toString(2).split("").reverse();

      } 
      //this.sendCtrl({ FanMod: val });

    },
    setCarouselId(name, id) {
      this.$refs[name].setId(id);
      console.log(name, id);
    },
    ChargeOnesCountInNum2() {
      let number = this.GasQ;
      let maximumN = 5;
      let n = 0;
      const test = 0x1;
      let res = 0;
      while (maximumN !== 0 && number !== 0) {
        res = number & test;
        if (res === 1) {
          n += 1;
        }
        number >>= 1;
        maximumN -= 1;
      }
      return n;
    },
    showPopUp3(type) {
      this.$set(this.isPopupShow3, type, true);
    },
    Airqualityl() {
      //this.$set(this.isPopupShow3, 'center', false);
      this.sendCtrl({ IDUAirQu: 2 });
      this.setDataObject({ IDUAirQu: 2 });
    },
    Airqualityy() {
      //this.$set(this.isPopupShow3, 'center', false);
      this.sendCtrl({ IDUAirQu: 1 });
      this.setDataObject({ IDUAirQu: 1 });
    },
    filterBuy(){
      
    },
    /**
     * @function showTip
     * @description 滑轮不可滑动时弹出提示
     *
     */
    showTip() {
      // if (this.carouselMoveOptions.controlAble === false) {
      //   try {
      //     showToast("不能设置此模式", 0);
      //   } catch (err) {
      //     console.log(`%c showToast`, 'color: blue');
      //   }
      // }
    },
    mainBoxShow(index){
      if(this.DataBoxData[index].GasMas.toString(2).split("").reverse()[index] === "1"){
        return true;
      }else{
        return false;
      }
    }
  }
};
</script>

<style type="text/scss" lang="scss" scoped>
.swiperfy {
  height: 180px;
}
.carousel-fanmode {
  height: 1.3rem;
}
.carousel-movemode {
  height: 1.3rem;
}
.mode-text {
  text-align: center;
  font-size: 0.7rem;
  color: black;
  -webkit-margin-before: 0;
  -webkit-margin-after: 0;
  margin-top: 0.2rem;
}
.fan-text {
  position: absolute;
  left: 43%;
  font-size: 0.7rem;
  color: black;
  -webkit-margin-before: 0;
  -webkit-margin-after: 0;
  margin-top: 0.2rem;
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
}
.caro-txt {
  margin-top: 19px;
  .caro-txt-tips {
    text-align: center;
    font-size: 0.7rem;
    color: black;
    -webkit-margin-before: 0;
    -webkit-margin-after: 0;
    margin-top: 160px;
  }
}
</style>
