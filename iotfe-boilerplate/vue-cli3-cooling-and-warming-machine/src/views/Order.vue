<template>
  <gree-view 
    class="view" 
    bg-color="#F4F5F5"
  >
    <!-- 头部 -->
    <gree-header>
      <span style="color:#404657">{{ $route.params.row >= 0 ? '编辑预约' : '添加预约' }}  </span>
      <span
        slot="right"
        @click="saveTimer"
        style="margin-right:0.32rem;"
      >保存</span>
    </gree-header>

    <!-- 整个内容区域 -->
    <gree-page class="content">
      <!-- 时间选择区域 -->
      <div
        class="picker picker-column"
        id="picker"
      >
        <gree-row>
          <gree-col>
            <gree-picker
              class="picker-time"
              ref="pickerTime"
              :data="pickerDataTime"
              :cols="2"
              :line-height="80"
              :default-index="timeDefalut"
              is-view
              @change="onPickerConfirmTime"
            ></gree-picker>
          </gree-col>
        </gree-row>
        <!-- 逗号 -->
        <div class="douhao">:</div>
      </div>

      <div class="relative">

        <!-- 按钮区域 -->
        <div class="timerType">
          <span class="title">定时类型</span>
          <button
            :class="[setType==1 ? 'btnOnSelect' : 'btnOn']"
            @click="changeType(1)"
          >
            <span>开</span>
          </button>
          <button
            :class="[setType==0 ? 'btnOffSelect' : 'btnOff']"
            @click="changeType(0)"
          >
            <span>关</span>
          </button>
        </div>

        <div
          class="set-param"
          @click="handleIsSeting"
        >
          <div
            v-if="isSeting"
            class="set-text"
          >
            收起参数选择
          </div>
          <div
            v-else
            class="set-text"
          >
            更多参数选择
          </div>
          <gree-icon
            class="set-icon"
            name="arrow-up"
            v-if="isSeting"
            size="xl"
          ></gree-icon>
          <gree-icon
            class="set-icon"
            name="arrow-down"
            v-else
            size="xl"
          ></gree-icon>
        </div>

        <div
          class="set-type"
          v-show="setType && isSeting"
        >
          <div class="set-selct">
            <img
              :src="setMode === 1 ? require('../assets/img/ic_sleep_in.png') : require('../assets/img/ic_sleep_out.png')"
              @click="handleSetMode(1)"
            >
            <div
              class="set-mode"
              @click="handleSetMode(1)"
            > 制冷 </div>
            <div
              class="set-tep"
              @click="setTemColdPickerFlag = true"
            >进水温度{{ mode1 }}℃</div>
          </div>
          <div class="set-selct">
            <img
              :src="setMode === 2 ? require('../assets/img/ic_sleep_in.png') : require('../assets/img/ic_sleep_out.png')"
              @click="handleSetMode(2)"
            >
            <div
              class="set-mode"
              @click="handleSetMode(2)"
            > 制热 </div>
            <div
              class="set-tep"
              @click="setTemHotPickerFlag = true "
            >进水温度{{ mode2 }}℃</div>
          </div>
        </div>
        <div
          class="set-type"
          v-show="!setType && isSeting"
        >
          <div class="set-none">
            无
          </div>
        </div>

        <div class="week">
          <span class="title">重复</span>
          <div class="list">
            <button
              v-for="(item,index) in weekList"
              :key="index"
              :class="[selectDay[index]==1 ? 'btnSelect' : 'btn']"
              @click="select(index)"
            >
              <span>{{ item.name }}</span>
            </button>
          </div>
        </div>
      </div>
      <gree-picker
        v-model="setTemColdPickerFlag"
        class="picker1"
        ref="picker"
        title="选择温度"
        :data="pickerColdData"
        :cols="1"
        :line-height="90"
        :default-index="pickerColdDefaultIndex"
        :default-value="pickerColdDefaultValue"
        @confirm="onPickerConfirm"
      ></gree-picker>

      <gree-picker
        v-model="setTemHotPickerFlag"
        class="picker1"
        ref="picker"
        title="选择温度"
        :data="pickerHotData"
        :cols="1"
        :line-height="90"
        :default-index="pickerHotDefaultIndex"
        :default-value="pickerHotDefaultValue"
        @confirm="onPickerConfirm"
      ></gree-picker>

      <!-- <gree-picker
        v-model="setAsTemColdPickerFlag"
        class="picker1"
        ref="picker"
        title="选择温度"
        :data="pickerAsHotData"
        :cols="1"
        :line-height="90"
        :default-index="pickerAsHotDefaultIndex"
        :default-value="pickerAsHotDefaultValue"
        @confirm="onPickerConfirm"
      ></gree-picker> -->

      <!-- <gree-picker
        v-model="setAsTemHotPickerFlag"
        class="picker1"
        ref="picker"
        title="选择温度"
        :data="pickerAsHotData"
        :cols="1"
        :line-height="90"
        :default-index="pickerAsHotDefaultIndex"
        :default-value="pickerAsHotDefaultValue"
        @confirm="onPickerConfirm"
      ></gree-picker> -->
    </gree-page>
  </gree-view>
</template>

<script>
import {
  Header,
  Row,
  Col,
  Button,
  Icon,
  Switch,
  List,
  Item,
  ToolBar,
  Picker,
  Slider,
  Dialog
} from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import { timeData } from '../api/timeData';
import { weekData } from '../api/weekData';
import { showToastPlugin } from '../api/utils';

export default {
  name: 'SetTimer',
  components: {
    [Header.name]: Header,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Switch.name]: Switch,
    [List.name]: List,
    [Item.name]: Item,
    [ToolBar.name]: ToolBar,
    [Picker.name]: Picker,
    [Slider.name]: Slider,
    [Dialog.name]: Dialog,
  },
  data() {
    return {
      currentTime: '3:00',
      phoneH: 0,
      setType: 1,
      repeat: 0,
      selectDay: [0, 0, 0, 0, 0, 0, 0],
      pickerDataTime: timeData(),
      weekList: weekData,
      percentage: 50,
      timeValue: [15, 29],
      isSeting: false,
      setMode: null,

      setTemColdPickerFlag: false,
      pickerColdDefaultIndex: [0],
      pickerColdDefaultValue: [this.CWMin],
      pickerColdData: [],

      setTemHotPickerFlag: false,
      pickerHotDefaultIndex: [0],
      pickerHotDefaultValue: [this.HWMin],
      pickerHotData: [],

      // setAsTemColdPickerFlag: false,
      // pickerAsColdDefaultIndex: [0],
      // pickerAsColdDefaultValue: [this.CSMin],
      // pickerAsColdData: [],

      // setAsTemHotPickerFlag: false,
      // pickerAsHotDefaultIndex: [0],
      // pickerAsHotDefaultValue: [this.HSMin],
      // pickerAsHotData: [],

      mode1: null,
      mode2: null,
      oldTimer: {},
      timeDefalut: [15, 29],
      setTemName: '',
      setTemValue: null, // 当前设置温度值
    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      mac: state => state.mac,

      // AcSvSt: state => state.dataObject.AcSvSt, // 空调节能
      timeList: state => state.timeList,

      // HSMax: state => state.dataObject.HSMax, // 制热房间温度设置上限(空调节能)
      // HSMin: state => state.dataObject.HSMin, // 制热房间温度设置下限(空调节能)
      // CSMax: state => state.dataObject.CSMax, // 制冷房间温度设置上限(空调节能)
      // CSMin: state => state.dataObject.CSMin, // 制冷房间温度设置下限(空调节能)
      isFirstOrder: state => state.dataObject.isFirstOrder, // 
      HWMax: state => state.dataObject.HWMax, // 制热进水温度设置上限
      HWMin: state => state.dataObject.HWMin, // 制热进水温度设置下限
      CWMax: state => state.dataObject.CWMax, // 制冷进水温度设置上限
      CWMin: state => state.dataObject.CWMin, // 制冷进水温度设置下限

    })
  },
  watch: {
    /**
     * @function HWMax @HWMin @CWMax @CWMin 
     * @description 更新可设置的上下值限制
     */
    HWMax(newV) {
      if (newV) {
        this.pickerHotData = [];
        for (let index = this.HWMin; index <= newV; index++) {
          this.pickerHotData.push({ text: `${index}`, value: index });
        }
        this.pickerHotData = [this.pickerHotData];
      }
    },
    HWMin(newV) {
      if (newV) {
        this.pickerHotData = [];
        for (let index = newV; index <= this.HWMax; index++) {
          this.pickerHotData.push({ text: `${index}`, value: index });
        }
        this.pickerHotData = [this.pickerHotData];
      }
    },
    CWMax(newV) {
      if (newV) {
        this.pickerColdData = [];
        for (let index = this.CWMin; index <= newV; index++) {
          this.pickerColdData.push({ text: `${index}`, value: index });
        }
        this.pickerColdData = [this.pickerColdData];
      }
    },
    CWMin(newV) {
      if (newV) {
        this.pickerColdData = [];
        for (let index = newV; index <= this.CWMax; index++) {
          this.pickerColdData.push({ text: `${index}`, value: index });
        }
        this.pickerColdData = [this.pickerColdData];
      }
    },

    /**
     * @function HSMax @HSMin @CSMax @CSMin (空调节能模式下)
     * @description 更新可设置的上下值限制
     */
    // HSMax(newV) {
    //   if (newV) {
    //     this.pickerAsHotData = [];
    //     for (let index = this.HSMin; index <= newV; index++) {
    //       this.pickerAsHotData.push({ text: `${index}`, value: index });
    //     }
    //     this.pickerAsHotData = [this.pickerAsHotData];
    //   }
    // },
    // HSMin(newV) {
    //   if (newV) {
    //     this.pickerAsHotData = [];
    //     for (let index = newV; index <= this.HSMax; index++) {
    //       this.pickerAsHotData.push({ text: `${index}`, value: index });
    //     }
    //     this.pickerAsHotData = [this.pickerAsHotData];
    //   }
    // },
    // CSMax(newV) {
    //   if (newV) {
    //     this.pickerAsColdData = [];
    //     for (let index = this.CSMin; index <= newV; index++) {
    //       this.pickerAsColdData.push({ text: `${index}`, value: index });
    //     }
    //     this.pickerAsColdData = [this.pickerAsColdData];
    //   }
    // },
    // CSMin(newV) {
    //   if (newV) {
    //     this.pickerAsColdData = [];
    //     for (let index = newV; index <= this.CSMax; index++) {
    //       this.pickerAsColdData.push({ text: `${index}`, value: index });
    //     }
    //     this.pickerAsColdData = [this.pickerAsColdData];
    //   }
    // },

  },
  mounted() {
    // 空调节能滑轮设置屏蔽
    // this.pickerAsColdData = [];
    // for (let index = this.CSMin; index <= this.CSMax; index++) {
    //   this.pickerAsColdData.push({ text: `${index}`, value: index });
    // }
    // this.pickerAsColdData = [this.pickerAsColdData];
    // 
    // this.pickerAsHotData = [];
    // for (let index = this.HSMin; index <= this.HSMax; index++) {
    //   this.pickerAsHotData.push({ text: `${index}`, value: index });
    // }
    // this.pickerAsHotData = [this.pickerAsHotData];

    // 正常模式下制冷、热滑轮配置
    this.pickerColdData = [];
    for (let index = this.CWMin; index <= this.CWMax; index++) {
      this.pickerColdData.push({ text: `${index}`, value: index });
    }
    this.pickerColdData = [this.pickerColdData];

    this.pickerHotData = [];
    for (let index = this.HWMin; index <= this.HWMax; index++) {
      this.pickerHotData.push({ text: `${index}`, value: index });
    }
    this.pickerHotData = [this.pickerHotData];
    // 是否编辑状态
    if (this.$route.params.row >= 0) {
      this.oldTimer = JSON.parse(JSON.stringify(this.timeList.list[this.$route.params.row]));
      this.timeDefalut = JSON.parse(JSON.stringify([this.oldTimer.hr, this.oldTimer.min]));
      this.timeValue = JSON.parse(JSON.stringify([this.oldTimer.hr, this.oldTimer.min]));
      this.selectDay = JSON.parse(JSON.stringify(this.oldTimer.week));
      this.setType = Number(this.oldTimer.cmd[0].p[0]);
      if (this.oldTimer.cmd[0].p.length > 1) {
        this.setMode = Number(this.oldTimer.cmd[0].p[1]);
        this.setTemValue = this.oldTimer.cmd[0].p[2];
        switch (this.oldTimer.cmd[0].opt[2]) {
          case 'ColWtSetTem':
            this.pickerColdDefaultIndex = [this.oldTimer.cmd[0].p[2]];
            this.pickerColdDefaultValue = [this.oldTimer.cmd[0].p[2]];
            this.mode1 = this.oldTimer.cmd[0].p[2];
            this.mode2 = this.HWMin;
            break;
          case 'HtWtSetTem':
            this.pickerHotDefaultIndex = [this.oldTimer.cmd[0].p[2]];
            this.pickerHotDefaultValue = [this.oldTimer.cmd[0].p[2]];
            this.mode1 = this.CWMin;
            this.mode2 = this.oldTimer.cmd[0].p[2];
            break;
          // case 'ColSetTem':
          //   this.pickerAsColdDefaultIndex = [this.oldTimer.cmd[0].p[2]];
          //   this.pickerAsColdDefaultValue = [this.oldTimer.cmd[0].p[2]];
          //   this.mode1 = this.oldTimer.cmd[0].p[2];
          //   this.mode2 = this.HSMin;
          //   break;
          // case 'HtSetTem':
          //   this.pickerAsHotDefaultIndex = [this.oldTimer.cmd[0].p[2]];
          //   this.pickerAsHotDefaultValue = [this.oldTimer.cmd[0].p[2]];
          //   this.mode1 = this.CSMin;
          //   this.mode2 = this.oldTimer.cmd[0].p[2];
          //   break;
          default:
            break;
        }
      } else {
        this.mode1 = this.CWMin;
        this.mode2 = this.HWMin;
      }
    } else {
      this.mode1 = this.CWMin;
      this.mode2 = this.HWMin;
    }
  },
  methods: {
    ...mapMutations({
      // setTime: 'SET_TIME',
      setTimeList: 'GET_TIMELIST',
      setDataObject: 'SET_DATA_OBJECT'
    }),
    ...mapActions({
      sendTime: 'SEND_TIME',
    }),
    /**
     * @description: 返回按钮
    */
    goBack() {
      console.log('返回上级');
      this.$router.push({
        name: 'OrderList'
      });
    },
    /**
     * @description: 保存定时
     */
    saveTimer() {
      if (this.selectDay.indexOf(1) !== -1) { // 是否选择日期
        const obj = {};
        if (this.$route.params.row >= 0) { // 编辑还是新建
          obj.t = 'updataT';
          obj.id = this.oldTimer.id;
        } else {
          obj.t = 'setT';
          if (this.timeList.list.length === 0) {
            obj.id = 1;
          } else {
            obj.id = this.timeList.list[this.timeList.list.length - 1].id + 1;
          }
        }
        obj.enable = 0;
        obj.hr = this.timeValue[0];
        obj.min = this.timeValue[1];
        obj.sec = 0;
        obj.tz = 8;
        obj.week = this.selectDay;
        obj.name = `${Date.now()}`;
        const cmdObj = {};
        cmdObj.mac = [this.mac];
        cmdObj.opt = ['Pow'];
        cmdObj.p = [this.setType];
        if (this.setMode !== null && this.setType !== 0) {
          if (this.setTemValue === null) {
            this.setTemValue = this.setMode === 1 ? this.CWMin : this.HWMin;
          }
          cmdObj.opt = ['Pow', 'Mod', 'HtWtSetTem'];
          cmdObj.p = [this.setType, this.setMode, this.setTemValue];
          const nameList = ['ColWtSetTem', 'HtWtSetTem'];
          const Value = `[${this.setMode}, 0]`;
          const nameValue = ['[1, 0]', '[2, 0]'];
          cmdObj.opt[2] = nameList[nameValue.indexOf(Value)];
        }
        obj.cmd = [cmdObj];
        console.log('发送的定时预约', JSON.stringify(obj));
        // 是否重复定时预约
        if (!this.isRepeat(obj, this.timeList.list, this.$route.params.row >= 0)) {
          let timeData = JSON.parse(JSON.stringify(this.timeList));
          if (this.$route.params.row >= 0) { // 编辑
            timeData.list[this.$route.params.row] = obj;
          } else {
            timeData.list.push(obj);
            timeData.total += 1;
          }
          this.setTimeList(timeData);
          this.sendTime(obj);
          this.$router.replace({
            name: 'OrderList'
          });
        } else {
          showToastPlugin('当前预约时间与已有预约时间冲突', 0);
        }
      } else {
        showToastPlugin('请选择日期', 0);
      }
    },
    /**
     * @description: 判断是否重复
     * @param {obj,obj, boolean} value 判断的值
     * @return: boolean
     */
    isRepeat(target, targetAll, isEdit) {
      if (isEdit) {
        for (let index = 0; index < targetAll.length; index++) {
          if (target.hr === targetAll[index].hr && target.min === targetAll[index].min && target.id !== targetAll[index].id) {
            for (let row = 0; row < target.week.length; row++) {
              if (target.week[row] === 1 && targetAll[index].week[row] === 1) {
                return true;
              }
            }
          }
        }
      } else {
        for (let index = 0; index < targetAll.length; index++) {
          if (target.hr === targetAll[index].hr && target.min === targetAll[index].min) {
            for (let row = 0; row < target.week.length; row++) {
              if (target.week[row] === 1 && targetAll[index].week[row] === 1) {
                return true;
              }
            }
          }
        }
      }

      console.log('------');
      return false;
    },
    /**
     * @description: 实时时间选择
     */
    changeSelect(picker) {
      console.log(Number(picker.getColumnValue(0))); // 获取小时
      console.log(Number(picker.getColumnValue(1))); // 获取分钟
      this.hour = Number(picker.getColumnValue(0));
      this.min = Number(picker.getColumnValue(1));
    },

    /**
     * @description: 根据选择时间 更新周期样式
     */
    select(index) {
      if (this.selectDay[index] == 0) {
        this.selectDay[index] = 1;
      } else {
        this.selectDay[index] = 0;
      }
      this.selectDay.splice(0, this.selectDay.length, ...this.selectDay);
      console.log(`selectDay : ${this.selectDay}`);

      // 核心代码保密: 复制数组 > 数组倒转 > 字符串二进制转int
      this.repeat = parseInt(
        this.selectDay
          .concat()
          .reverse()
          .join(''),
        2
      );
    },
 

    /**
     * @description: 时间选中的值
     * @function onPickerConfirmTime
     */
    onPickerConfirmTime(columnIndex, itemIndex, value) {
      console.log(columnIndex, itemIndex, value);
      if (value) {
        this.timeValue[columnIndex] = itemIndex;
        console.log(this.timeValue);
      }
    },
    /**
     * @description: 是否显示更多参数
     */
    handleIsSeting() {
      this.isSeting = !this.isSeting;
      if (this.isFirstOrder) {
        Dialog.alert({
          title: '提示',
          content: '预约制冷在制热模式下将无法执行，反之亦然。',
          confirmText: '确定',
        });
        this.setDataObject({isFirstOrder: false });
      }
    },
    /**
     * @description: 选择的类型
     * @function changeType
     */
    changeType(newv) {
      this.setType = newv;
      console.log('this.setType', this.setType);
    },

    handleSetMode(value) {
      if (this.setMode === null || this.setMode !== value) {
        this.setMode = value;
        if (value === 1) {
          this.setTemValue = this.mode1;
        } else {
          this.setTemValue = this.mode2;
        }
      } else {
        this.setMode = null;
      }
    },
    /**
     * @description: 滑轮确定项
     * @function onPickerConfirm
     */
    onPickerConfirm(columnsValue) {
      if (columnsValue) {
        if (this.setTemColdPickerFlag) {
          this.mode1 = columnsValue[0].value;
          this.setMode = 1;
        } else {
          this.mode2 = columnsValue[0].value;
          this.setMode = 2;
        }
        this.setTemValue = columnsValue[0].value;
      }
    },
  }
};
</script>


<style lang="scss" scoped>
.relative {
  position: relative;
}
.body {
  font-family: appleUltralight;
}

// .gree-header {
//   z-index: 100;
// }

/*暴露注释：Scss 练练手*/
$fontSize04: 0.5rem; // 0.4rem字体的大小
$marginLR05: 0.4rem; // 0.5rem左右边距

// 文字样式抽出来
.Txt {
  font-size: $fontSize04;
  position: absolute;
  bottom: 1rem;
  width: 100%;
  top: 52%;
  color: #00aeff !important;
}

// 未选中的buttn样式
.btnExtend {
  color: #696c78;
  background: white;
  height: 0.85rem;
  width: 0.85rem;
  font-size: $fontSize04;
  display: flex;
  justify-content: center; // 左右居中
  align-items: center; // 上下居中
  border: 1px solid #d9d9d9 {
    radius: 0.2rem;
  }
}

// 选中的buttn样式
.btnSelectExtend {
  border: 1px solid #00aeff {
    radius: 0.2rem;
  }
  color: white;
  background: #00aeff;
  height: 0.85rem;
  width: 0.85rem;
  font-size: $fontSize04;
  display: flex;
  justify-content: center;
  align-items: center;
}

.view {
  background: #f4f4f4;
  .content {
    background: #fff;
  }
}

.gree-icon.icon-font.md {
  font-size: 0.5rem;
  font-weight: 600;
}

.hourTxt {
  @extend .Txt;
  left: 4.6rem;
}

.minTxt {
  @extend .Txt;
  left: 7.2rem;
}

.douhao {
  font-size: 1.2rem;
  position: absolute;
  bottom: 2.5rem;
  width: 10%;
  top: 37%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: #00aeff !important;
}

.picker {
  z-index: 100;
  position: relative;
  width: 10rem;
  height: auto;
}

.week {
  border: {
    top: 1px solid #f4f4f4;
    bottom: 1px solid #f4f4f4;
  }
  // position: absolute;
  // top: 13.9rem;
  font-size: $fontSize04;
  height: auto;
  width: 10rem;
  .title {
    margin-left: $marginLR05;
    font-size: $fontSize04;
  }
  .list {
    display: flex;
    width: 10rem;
    justify-content: space-between;
    margin-top: 0.2rem;
    &:before,
    &:after {
      content: "";
      display: block;
    }
    .btn {
      @extend .btnExtend;
    }
    .btnSelect {
      @extend .btnSelectExtend;
    }
  }
}

.timerType {
  border: {
    top: 1px solid #f4f4f4;
    bottom: 1px solid #f4f4f4;
  }
  // position: absolute;
  // top: 9.5rem;
  font-size: $fontSize04;
  width: 10rem;
  height: 1.2rem;
  // align-items: center;
  // display: flex;
  .title {
    margin-left: $marginLR05;
    line-height: 1.2rem;
  }
  .btnOn {
    @extend .btnExtend;
    position: absolute;
    right: 1.8rem;
    top: 0.175rem;
  }
  .btnOff {
    @extend .btnExtend;
    position: absolute;
    right: $marginLR05;
    top: 0.175rem;
  }
  .btnOnSelect {
    @extend .btnSelectExtend;
    position: absolute;
    right: 1.8rem;
    top: 0.175rem;
  }
  .btnOffSelect {
    @extend .btnSelectExtend;
    position: absolute;
    right: $marginLR05;
    top: 0.175rem;
  }
}

.set-param {
  border: {
    top: 1px solid #f4f4f4;
    bottom: 1px solid #f4f4f4;
  }
  // position: absolute;
  // top: 10.5rem;
  width: 10rem;
  height: 1.2rem;
  align-items: center;
  display: flex;
  .set-text {
    display: inline-block;
    margin-left: 45px;
    font-size: $fontSize04;
  }
  .set-icon {
    position: absolute;
    right: 45px;
    margin-top: 0.2rem;
  }
}
.set-type {
  border: {
    bottom: 1px solid #f4f4f4;
  }
  // position: absolute;
  // top: 11.5rem;
  padding: 10px 50px;
  width: -webkit-fill-available;
  height: 240px;
  .set-selct {
    position: relative;
    height: 120px;
    width: 100%;
    img {
      position: absolute;
      justify-content: center;
      align-self: center;
      width: 70px;
      height: 70px;
      padding-top: 30px;
      padding-left: 15px;
    }
    .set-mode {
      position: absolute;
      left: 100px;
      font-size: 40px;
      color: #000;
      top: 50%;
      bottom: 0;
      transform: translate(0, -50%);
      font-size: $fontSize04;
    }
    .set-tep {
      position: absolute;
      font-size: 40px;
      color: #000;
      top: 50%;
      bottom: 0;
      transform: translate(0, -50%);
      right: 100px;
      font-size: $fontSize04;
    }
  }
  .set-none {
    display: flex;
    justify-content: center;
    align-items: center;
    top: -50%;
    bottom: 0;
    transform: translate(0, 50%);
    font-size: 80px;
  }
}
</style>
