<template>
  <gree-view class="view">
    <!-- 头部 -->
    <gree-header>
      <gree-icon
        slot="overwrite-left"
        name="back"
        @click="goBack"
      ></gree-icon>
      <span style="color:#404657">添加预约</span>
      <span
        slot="right"
        @click="saveTimer"
        style="margin-right:0.32rem;"
      >保存</span>
    </gree-header>
    <!-- 整个内容区域 -->
    <div class="content">
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
              :default-index="[3, 0]"
              is-view
              is-cascade
              @change="onPickerConfirmTime"
            ></gree-picker>
          </gree-col>
        </gree-row>
        <!-- 逗号 -->
        <div class="douhao">:</div>
      </div>
      <!-- 按钮区域 -->
      <gree-block>
        <!-- <div>选择窗户开启到的位置</div> -->
        <gree-row>
          <gree-col>
            <gree-slider
              :min="0"
              :max="100"
              v-model="percentage"
              :format="format"
            ></gree-slider>
          </gree-col>
        </gree-row>
      </gree-block>
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
  DatePicker,
  Slider,
  Block
} from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import { timeData } from '../api/timeData';
import { weekData } from '../api/weekData';

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
    [DatePicker.name]: Picker,
    [Slider.name]: Slider,
    [Block.name]: Block,

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
      timeValue: [3, 0]
    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      switchNum: state => state.switchNum,
      timerList: state => state.timerList
    })
  },
  watch: {},
  mounted() {

  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT'
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL',
      sendTimer: 'SEND_TIMER'
    }),
    /**
     * @description: 返回按钮
    */
    goBack() {
      console.log('返回上级');
      this.$router.go(-1);
    },

    /**
     * @function format
     * @description: 返回百分比
    */
    format(val) {
      return `${val}%`;
    },

    /**
     * @description: 保存定时
     */
    saveTimer() {
      console.log('保存事件');
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
     * @description: 保存为二进制并存入数组[]
     * @param {type}
     * @return:
     */
    toStringBinaryList(num) {
      const list = num
        .toString(2)
        .split('')
        .reverse()
        .join('');
      console.log(list);
      const result = [0, 0, 0, 0, 0, 0, 0];
      for (const k in list) {
        result[k] = parseInt(list[k]);
      }
      console.log(result);
      return result;
    },

    /**
     * @description: 时间选中的值
     * @function onPickerConfirmTime
     */
    onPickerConfirmTime(columnIndex, itemIndex, value) {
      console.log(columnIndex, itemIndex, value);
      if (value) {
        this.timeValue[columnIndex] = itemIndex;
        columnIndex < 1 ? this.timeValue[1] = 0 : '';
        console.log(this.timeValue);
      }
    },

  }
};
</script>


<style lang="scss" scoped>
/*暴露注释：Scss 练练手*/
$fontSize04: 0.35rem; // 0.4rem字体的大小
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
  left: 4.6rem;
}

.minTxt {
  @extend .Txt;
  left: 7.2rem;
}

.douhao {
  font-size: 0.8rem;
  position: absolute;
  bottom: 2.5rem;
  width: 100%;
  top: 41%;
  text-align: center;
  color: #00aeff !important;
  font-family: Roboto;
}

.picker {
  position: relative;
  width: 10rem;
  height: auto;
  top: 2rem;
  z-index: 100;
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
    display: inline-flex;
    width: 10rem;
    justify-content: space-evenly;
    margin-top: 0.2rem;
    .btn {
      @extend .btnExtend;
    }
    .btnSelect {
      @extend .btnSelectExtend;
    }
  }
}
</style>
