<!--
 * @Description: 详细设置定时页面
 * @Author: Jerry-Rain
 * @Date: 2019-08-10 09:29:33
 * @LastEditTime: 2020-09-14 14:26:16
 * @LastEditors: Jerry-Rain
 -->
<template>
  <gree-view class="view">
    <!-- 头部功能 -->
    <gree-header>
      <gree-icon slot="overwrite-left" name="back" @click="goBack"></gree-icon>
      <span style="color:#404657">设置</span>
      <div
        slot="right"
        @click="saveTimer"
        style="height:31px;width: 1rem;"
      >{{this.$route.query.type ? '保存' : '完成'}}</div>
    </gree-header>
    <!-- 整个内容区域 -->
    <div class="content">
      <!-- 时间选择区域 -->
      <div class="picker" id="picker">
        <!-- vant 有兼容性问题 -->
        <!-- <van-datetime-picker
          v-model="currentTime"
          :show-toolbar="false"
          :visible-item-count="3"
          type="time"
          :min-hour="0"
          :max-hour="23"
          :item-height="100"
          @change="changeSelect"
        /> -->
        <!-- 干掉了，因为没有循环，背锅 -->
        <!-- <gree-picker
          class="pickerTime"
          ref="pickerTime"
          :data="pickerDataTime"
          :cols="2"
          :line-height="80"
          :default-index="timeDefalut"
          is-view
          @change="onPickerConfirmTime"
        ></gree-picker> -->
        <!-- 逗号 -->
        <!-- <div class="hourTxt">小时</div>
        <div class="minTxt">分钟后</div>-->
        <div class="douhao">:</div>
        <div id="TimerSelector"></div>
      </div> 
      <!-- :formatter='formatter' -->
      <!-- 按钮区域 -->
      <div class="timerType">
        <span class="title">定时类型</span>
        <div :class="[setType==1 ? 'btnOnSelect' : 'btnOn']" @click="changeType(1)">
          <span>开</span>
        </div>
        <div :class="[setType==0 ? 'btnOffSelect' : 'btnOff']" @click="changeType(0)">
          <span>关</span>
        </div>
      </div>
      <div class="week">
        <span class="title">重复</span>
        <div class="list">
          <div
            v-for="(item,index) in weekList"
            :key="index"
            :class="[selectDay[index]==1 ? 'btnSelect' : 'btn']"
            @click="select(index)"
          >
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部添加栏 -->
    <gree-toolbar
      class="toolBar"
      position="bottom"
      no-hairline
      v-show="this.$route.query.type"
    >
      <div class="bottom" @click="del()">删除</div>
    </gree-toolbar>
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
  DatePicker
} from "gree-ui";
import { mapState, mapMutations, mapActions } from "vuex";
import { timeData } from '../../api/timeDate';

export default {
  name: "Timer",
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
    [DatePicker.name]: Picker
  },
  data() {
    return {
      timePicker: null,
      currentTime: "3:0",
      phoneH: 0,
      setType: 1,
      repeat: 0,
      selectDay: [0, 0, 0, 0, 0, 0, 0],
      weekList: [
        {
          value: 1,
          name: "一"
        },
        {
          value: 2,
          name: "二"
        },
        {
          value: 3,
          name: "三"
        },
        {
          value: 4,
          name: "四"
        },
        {
          value: 5,
          name: "五"
        },
        {
          value: 6,
          name: "六"
        },
        {
          value: 7,
          name: "日"
        }
      ],
      hour: 19,
      min: 30,
      modifyIndex: 0,
      routerName: '',
      pickerDataTime: timeData(),
      timeDefalut: [19,30],
    }
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      switchNum: state => state.switchNum,
      timerList: state => state.timerList
    })
    // pickerH() {
    //   let h = (100 * this.phoneH) / 736;
    //   return h;
    // }
  },
  watch: {},
  
  mounted() { 
    this.pickerInit()
    this.stopTimer(); // 进入该页面停止轮询 
    this.routerName = this.$route.query.type
    // 获取屏幕高度
    // this.phoneH = document.documentElement.clientHeight;
    console.group("mounted Start");
    console.log("进入状态 : " + this.$route.query.type);
    console.log("开关编号 : " + this.$route.query.index);
    // 测试：随机生成
      if (this.routerName == "modify") {
      this.modifyIndex = this.$route.query.index;
      this.currentTime = `${this.timerList[this.modifyIndex].hour}:${this.timerList[this.modifyIndex].min}`;
      this.selectDay = this.toStringBinaryList(
        // parseInt(Math.random() * 128, 10)
        this.timerList[this.$route.query.index].repeat
      );
      this.setType = this.timerList[this.modifyIndex].type;
      this.hour = this.timerList[this.modifyIndex].hour
      this.min = this.timerList[this.modifyIndex].min
      this.repeat = this.timerList[this.$route.query.index].repeat;
      this.timeDefalut = [this.hour, this.min];
      console.log(this.timerList[0].type);
      console.log("时间" + this.currentTime);
    }
    console.groupEnd("mounted End");
  },
  methods: {
    ...mapMutations({
      setDataObject: "SET_DATA_OBJECT"
    }),
    ...mapActions({
      sendCtrl: "SEND_CTRL",
      sendTimer: "SEND_TIMER",
      modifyTimer: "MODIFY_TIMER",
      stopTimer: "STOP_TIMER",
    }),
    pickerInit(){
      this.$nextTick(()=> {
      console.log(mobiscroll);
        this.timePicker = mobiscroll.time('#TimerSelector', {
          theme:'ios',
          rows: 3,
          width: 9999,
          height: 80,
          lang: 'zh',
          display: 'inline',
          showInput: false,
          timeFormat: 'hhii',
          timeWheels: 'HHii',
          onChange: () => {
            this.getTimer()
          }
      });
      
      let date = new Date(2016, 10, 10, this.hour, this.min);
      this.timePicker.setVal(date);
    })
    },
    getTimer(){
      this.hour = this.timePicker.getVal().getHours()
      this.min = this.timePicker.getVal().getMinutes()
      console.log(this.timePicker.getVal().getHours())  
      console.log(this.timePicker.getVal().getMinutes())  
    },
    onPickerConfirmTime(columnIndex, itemIndex, value) {
      if(columnIndex === 0) {
        this.hour = Number(itemIndex);
      } else if(columnIndex === 1) {
        this.min = Number(itemIndex);
      }
      console.log('小时： ', this.hour);
      console.log('分钟： ', this.min);
    },
    //  formatter(type, value) {
    //   if (type === 'hour') {
    //     return `${value}小时`;
    //   } else if (type === 'minute') {
    //     return `${value}分钟`
    //   }
    //   return value;
    // },

    /**
     * @description: 返回按钮
     */

    goBack() {
      console.log("返回上级");
      this.$router.go(-1);
    },

    /**
     * @description: 保存定时
     */

    saveTimer() {
      let obj = { index: 0, enable: 1, type: 0, hour: 0, min: 0, repeat: 0 }; // 初始化定时列表
      // 修改发0-4，增加发5
      if (this.routerName == "modify"){
        obj.index = this.modifyIndex
      } else {
        obj.index = 5;
      }
      if (!this.hour && !this.min) {
        obj.hour = 24;
        obj.min = 0;
      } else {
        obj.hour = this.hour;
        obj.min = this.min; 
      }
        obj.repeat = this.repeat;
        obj.type = this.setType;
        console.log(obj);
        // navigator.PluginInterface.showLoading();
        this.sendTimer(obj);
        this.goBack();
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
     * @description: 定时 开关类型
     * @param {newv}
     * @return: setType
     */
    changeType(newv) {
      this.setType = newv;
      console.log("this.setType" + this.setType);
    },

    /**
     * @description: 删除定时
     */
    async del() {
        // on confirm
        console.log("按钮： " + this.modifyIndex);
        let obj = { index: 0, type: 0 }; // 初始化定时列表
        // 开关编号 > 列表索引 > 类型 1开 | 2关 | 3删除
        obj.type = 3;
        obj.index = this.modifyIndex;
        await this.modifyTimer(obj);
        // this.$router.push({ path: '/'})
        this.goBack();
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
      console.log("selectDay : " + this.selectDay);

      // 核心代码保密: 复制数组 > 数组倒转 > 字符串二进制转int
      this.repeat = parseInt(
        this.selectDay
          .concat()
          .reverse()
          .join(""),
        2
      );
    },
    /**
     * @description: 保存为二进制并存入数组[]
     * @param {type}
     * @return:
     */

    toStringBinaryList(num) {
      let list = num
        .toString(2)
        .split("")
        .reverse()
        .join("");
      console.log(list);
      let result = [0, 0, 0, 0, 0, 0, 0];
      for (var k in list) {
        result[k] = parseInt(list[k]);
      }
      console.log(result);
      return result;
    }
  }
};
</script>


<style>
@font-face {
  font-family: RT;
  src: url("../.././assets/font/RobotoThin.ttf");
}
.van-picker-column__item--selected {
  padding: 0 0.0463rem;
  color: #00aeff !important;
  font-size: 2rem;
  /* font-family: Roboto-thin, fzlthjw, appleUltralight, appleLight, sans-serif !important; */
  font-family: RT !important;
}

.van-picker-column__item {
  padding: 0 0.0463rem;
  color: #d9d9d9;
  font-size: 1.6rem;
  /* font-family: Roboto-thin, fzlthjw, appleUltralight, appleLight, sans-serif  !important; */
  font-family: RT !important;
}

.van-picker-column {
  margin-top: 8px;
}

.van-picker {
  background-color: transparent !important;
  z-index: 1;
}

.gree-header .gree-header-left,
.gree-header .gree-header-right {
  font-size: 0.4rem;
}

.gree-header .gree-header-title {
  font-family: "FZLTH--GB1-4" !important;
}

/* #picker .van-picker .van-picker__columns .van-picker-column:nth-child(1) {
  margin-left: 1.4rem;
}
#picker .van-picker .van-picker__columns .van-picker-column:nth-child(2) {
  margin-right: 1.4rem;
} */

#picker .gree-picker-column-item .column-list .column-item {
  font-size: 150px;
  font-family: Roboto !important;
}

#TimerSelector .mbsc-sc-itm-sel {
  color: #00aeff !important;
  text-align: center;
}
#TimerSelector .mbsc-sc-itm.mbsc-btn-e {
  text-align: center;
  font-size: 160px;
}
#TimerSelector .mbsc-sc-itm.mbsc-btn-a {
  background: none;
}
</style>

<style lang="scss" scoped>
/*暴露注释：Scss 练练手*/
$fontSize04: 0.4rem; // 0.4rem字体的大小
$marginLR05: 0.5rem; // 0.5rem左右边距

// 文字样式抽出来
.Txt {
  font-size: $fontSize04;
  position: absolute;
  bottom: 2.5rem;
  width: 100%;
  top: 50%;
  color: #00aeff !important;
}

// 未选中的buttn样式
.btnExtend {
  text-align: center !important;
  line-height: 0.85rem;
  color: #696c78;
  background: white;
  height: 0.85rem;
  width: 0.85rem;
  font-size: $fontSize04;
  border: 1px solid #d9d9d9 {
    radius: 0.2rem;
  }
}

// 选中的buttn样式
.btnSelectExtend {
  text-align: center !important;
  line-height: 0.85rem;
  color: white;
  background: #00aeff;
  height: 0.85rem;
  width: 0.85rem;
  font-size: $fontSize04;
  border: 1px solid #00aeff {
    radius: 0.2rem;
  }
}

.view {
  background: #f4f4f4;
  .content {
    width: 10rem;
    height: 14.8rem;
    background: #fff;
    position: relative;
  }
}

.gree-icon.icon-font.md {
  font-size: 0.5rem;
  font-weight: 600;
}

.hourTxt {
  @extend .Txt;
  left: 4.3rem;
}

.minTxt {
  @extend .Txt;
  left: 7.9rem;
}

.douhao {
  z-index: 100;
  font-size: 130px;
  position: absolute;
  top: 49%;
  left: 50%;
  text-align: center;
  color: #00aeff !important;
  font-family: Roboto;
  transform: translate(-50%, -50%);
}

.picker {
  position: relative;
  width: 10rem;
  height: max-content;
  top: 2rem;
  z-index: 100;
}

.timerType {
  border: {
    top: 1px solid #f4f4f4;
    bottom: 1px solid #f4f4f4;
  }
  position: absolute;
  top: 11.5rem;
  font-size: $fontSize04;
  width: 10rem;
  height: 1rem;
  // flex-direction: column;
  // justify-content: center;
  // align-items: center;
  // display: flex;
  .title {
    margin-left: $marginLR05;
    line-height: 1rem;
  }
  .btnOn {
    @extend .btnExtend;
    position: absolute;
    right: 1.8rem;
    top: 0.075rem;;
  }
  .btnOff {
    @extend .btnExtend;
    position: absolute;
    right: $marginLR05;
    top: 0.075rem;
  }
  .btnOnSelect {
    @extend .btnSelectExtend;
    position: absolute;
    right: 1.8rem;
    top: 0.075rem;
  }
  .btnOffSelect {
    @extend .btnSelectExtend;
    position: absolute;
    right: $marginLR05;
    top: 0.075rem;
  }
}

.week {
  position: absolute;
  top: 12.8rem;
  font-size: $fontSize04;
  height: auto;
  width: 10rem;
  .title {
    margin-left: $marginLR05;
  }
  .list {
    display: flex;
    width: 10rem;
    justify-content: space-between;
    margin-top: 0.2rem;
    &:before,
      &:after {
          content: '';
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

.toolBar {
  height: 1.2rem;
  .bottom {
    font-size: $fontSize04;
    color: #f00;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    height: 100%;
    width: 100%;
  }
}



</style>
