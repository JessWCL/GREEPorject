<!--
 * @Author: Jerry-Rain
 * @Date: 2020-04-01 16:51:35
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-08-11 09:59:35
 * @Description: 电量提醒页面，设置后保存
 -->
<template>
  <gree-view bg-color="##FFFFFE">
    <gree-header
      :style="{ 'background-color': 'white' }"
      :left-options="{ preventGoBack: true }"
      @on-click-back="goBack()"
    >
      电量提醒
      <span slot="right" @click="saveTips()" style="margin-right:0.32rem;color: #00aeff">
        保存
      </span>
    </gree-header>
    <gree-page>
      <div class="control-area">
        
        <gree-list v-if="false">
          <!-- 定期推送 -->
          <gree-list-item class="control" title="定期推送">
            <span slot="footer">开启后APP将定时给您推送用电量</span>
            <gree-switch
              slot="after"
              class="switch"
              v-model="cycleSwitch"
              @click.native="$event.stopPropagation()"
            ></gree-switch>
          </gree-list-item>
          <!-- 提醒的内容选择 -->
          <gree-radio-list
            v-show="cycleSwitch"
            :options="cycleItem"
            v-model="cycleValue"
          ></gree-radio-list>
        </gree-list>

        <gree-list>
          <!-- 自定义时段 -->
          <gree-list-item class="control" title="自定义时段">
            <span slot="footer">开启后APP将统计并推送改时段的用电量</span>
            <gree-switch
              slot="after"
              class="switch"
              v-model="diySwitch"
            ></gree-switch>
          </gree-list-item>
          <!-- 自定义时段 -->
          <div v-show="diySwitch">
            <gree-list-item
              link
              title="开始时间"
              :text="beginSelectDateShow"
              @click.native="selectTime('begin')"
            ></gree-list-item>
            <gree-list-item
              link
              title="结束时间"
              :text="endSelectDateShow"
              @click.native="selectTime('end')"
            ></gree-list-item>
          </div>
        </gree-list>
        
        <gree-popup v-model="showFlag" id="datetimePicker" class="pop" position="bottom">
          <div class="title">{{ nowType === 'begin' ? '开始时间' : '结束时间' }}</div>
          <van-datetime-picker
            v-model="selectDate"
            type="datetime"
            :min-date="minDate"
            confirm-button-text=" "
            cancel-button-text=" "
            visible-item-count="3"
            item-height="50"
            :formatter="formatter"
            @change="changeDate"
          />
          <gree-row>
            <gree-col width="50" @click.native="showFlag = false">取消</gree-col>
            <gree-col width="50" @click.native="submitDate()">确定</gree-col>
          </gree-row>
        </gree-popup>
      </div>
    </gree-page>
  </gree-view>
</template>

<script>
import dayjs from 'dayjs';
import { mapState, mapMutations, mapActions } from 'vuex';
import {
  View,
  Page,
  Header,
  List,
  Item,
  Switch,
  Radio,
  RadioList,
  Popup,
  DatePicker,
  Block,
  Button,
  Row,
  Col
} from 'gree-ui';
import { closePage, showToast } from '../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [View.name]: View,
    [Page.name]: Page,
    [Header.name]: Header,
    [List.name]: List,
    [Item.name]: Item,
    [Switch.name]: Switch,
    [Radio.name]: Radio,
    [RadioList.name]: RadioList,
    [Popup.name]: Popup,
    [DatePicker.name]: DatePicker,
    [Block.name]: Block,
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col,
  },
  data() {
    return {
      nowType: '', // 选择的picker
      cycleValue: 1, // 定期提醒 选择值
      cycleSwitch: true, // 定期提醒 显示标志
      diySwitch: true, // 自定义时间段
      cycleItem: [
        {
          value: '1',
          text: '每日提醒',
          brief: '每日上午8点推送昨日用电量',
        },
        {
          value: '2',
          text: '每周提醒',
          brief: '每周一上午8点推送上一周用电量',
        },
        {
          value: '3',
          text: '每月提醒',
          brief: '每月一号上午8点推送上一月用电量',
        },
      ], // 定期推行循环列表
      showFlag: false, // popup 标志位

      minDate: new Date(), // 最小时间值 
      selectDate: new Date(), // 当前选定时间
      selectTimer: '',
      beginSelectDateShow: '未选择', // 显示的开始时间
      endSelectDateShow: '未选择', //  显示的结束时间
      startTimer: '', // 发送的开始时间
      endTimer: '', // 发送的结束时间
    };
  },
  computed: {
    ...mapState({ 
      StartTime: state => state.dataObject.StartTime,
      EndTime: state => state.dataObject.EndTime,
      EnergyOfTimeFlag: state => state.dataObject.EnergyOfTimeFlag
    })
  },
  mounted() {
    this.init(); // 初始化
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT'
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL',
    }),
    // 确定时间
    submitDate() {
      console.log(this.nowType);
      if (this.nowType === 'begin') {
        this.startTimer = this.selectTimer ? this.selectTimer : this.startTimer; // 设定发送的时间数据
        this.beginSelectDateShow = dayjs(this.selectDate).format('YYYY/MM/DD HH:mm');
        console.log('开始时间： ', this.startTimer);
      } else {
        this.endTimer = this.selectTimer ? this.selectTimer : this.startTimer; // 设定发送的时间数据
        this.endSelectDateShow = dayjs(this.selectDate).format('YYYY/MM/DD HH:mm');
        console.log('结束时间： ', this.endTimer);
      }
      this.showFlag = false;
      // this.selectDate = new Date(); // 当前选定时间
    },
    // 保存
    saveTips() {
      if (this.diySwitch) {
        if (this.beginSelectDateShow !== '未选择' && this.endSelectDateShow !== '未选择') {
          this.formatTimer(); // 格式化一下发送的时间
          const startTimerInt = parseInt(this.startTimer.join(''));
          const endTimerInt = parseInt(this.endTimer.join(''));

          if (endTimerInt > startTimerInt) {
            this.setDataObject({ StartTime: this.startTimer, EndTime: this.endTimer, EnergyOfTimeFlag: 1 });
            this.sendCtrl({ StartTime: this.startTimer, EndTime: this.endTimer, EnergyOfTimeFlag: 1 });      
            console.log('发送内容', this.startTimer, this.endTimer);
          } else {
            console.log('结束时间应大于开始时间');
            showToast('结束时间应大于开始时间', 0);
          }
        } else {
          console.log('没选择时间，不做保存');
          showToast('您有选项未填写', 0);
        }
      } else {
        this.setDataObject({ EnergyOfTimeFlag: 0 });
        this.sendCtrl({ EnergyOfTimeFlag: 0 }); 
      }     
      this.$router.push({ name: 'Home' });
      // closePage();
    },
    // 选着的picker
    selectTime(type) {
      this.nowType = type;
      this.showFlag = true;
    },
    // 初始化
    init() {
      this.initTimer(); // 初始化时间
      this.diySwitch = !!this.EnergyOfTimeFlag;
    },
    initSetTimer() {
      this.startTimer = this.StartTime;
      this.endTimer = this.EndTime;
      const start = `${this.StartTime[0]}/${this.StartTime[1]}/${this.StartTime[2]} ${this.StartTime[3]}:${this.StartTime[4]}`;
      const end = `${this.EndTime[0]}/${this.EndTime[1]}/${this.EndTime[2]} ${this.EndTime[3]}:${this.EndTime[4]}`;
      this.beginSelectDateShow = dayjs(start).format('YYYY/MM/DD HH:mm');
      this.endSelectDateShow = dayjs(end).format('YYYY/MM/DD HH:mm');
    },
    // 初始化时间
    initTimer() {
      if (this.EnergyOfTimeFlag) {
        this.initSetTimer();
      } else {
        const name = ['startTimer', 'endTimer'];
        for (const item of name) { 
          this[item] = dayjs(this.selectDate).format('YYYY/M/D/H/m').split('/');
        }
        console.log('初始化后 - ', [this.startTimer, this.endTimer]);     
      }
    },
    // 格式化发送数据时间
    formatTimer() {
      console.log('格式化前 - ', this.startTimer, this.endTimer);
      const name = ['startTimer', 'endTimer'];
      for (const item of name) { 
        this[item] = this[item].map(item => {  
          return +item;  
        });
      }
      console.log('格式化的时间 - ', this.startTimer, this.endTimer);
    },
    // 选时间监听事件
    changeDate(picker) {
      const date = picker.getValues().join('').replace(/月|年+/g, '/').replace(/日+/g, ' ')
        .replace(/时+/g, ':')
        .replace(/分+/g, '');
      const timer = picker.getValues().join('').replace(/月|年|日|时+/g, ',').replace(/分+/g, '')
        .split(',');
      this.selectDate = new Date(date); // 选定的时间
      this.selectTimer = timer;
    },
    // 格式化选择器
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`;
      } else if (type === 'month') {
        return `${val}月`;
      } else if (type === 'day') {
        return `${val}日`;
      } else if (type === 'hour') {
        return `${val}时`;
      } else if (type === 'minute') {
        return `${val}分`;
      }
      return val;
    },
    goBack() {
      this.$router.go(-1); // TODO: 测试用
      // closePage();
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/global.scss';
.gree-radio-icon {
    .icon-checked:before {
      background-image: url('../assets/img/on.png');
    }
    .icon-unchecked:before {
      background-image: url('../assets/img/radio_off.png');
    }
  }
</style>
