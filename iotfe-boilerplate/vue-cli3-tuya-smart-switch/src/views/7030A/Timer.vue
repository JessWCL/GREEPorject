/* eslint-disable vue/no-dupe-keys */
<!--
 * @Description: In User Settings Edit
 * @Author: Jerry-Rain
 * @Date: 2019-08-09 18:37:21
 * @LastEditTime: 2020-06-17 17:06:05
 * @LastEditors: Jerry-Rain
 -->
<template>
  <gree-view>
    <!-- 头部功能 -->
    <gree-header>
      <gree-icon slot="overwrite-left" name="back" @click="goBack"></gree-icon>
      <span style="color:#404657">定时</span>
    </gree-header>
    <gree-page class="page-list" v-if="refresh">
      <div v-for="(item, index) in timerListShow" :key="index" class="listItem">
        <div class="clickArea" @touchstart="showDeleteButton(index)" @touchend="clearLoop(index)" @touchmove="move"/>
        <div class="titleFont">
          {{ item.hour }}:{{ item.min }}
          <label class="type">{{ item.type }}</label>
        </div>
        <div class="repeat">{{ item.repeat }}</div>
        <van-switch slot="after" v-model="item.enable" class="switch" @change="select(index)" size="24px" active-color="#4c0" inactive-color="#f4f4f4" />
      </div>
      <div class="none" v-show="!timerList.length">点击底部"+"添加定时！</div>
    </gree-page>
    <!-- 底部添加栏 -->
    <gree-toolbar class="toolBar" position="bottom" no-hairline>
      <div class="bottom" @click="addTimer">
        <gree-icon name="add" />
      </div>
    </gree-toolbar>
    <!-- Dailog 删除对话框的位置 -->
    <router-link to="/Timer/Dial"></router-link>
    <router-view></router-view>
  </gree-view>
</template>

<script>
import dayjs from 'dayjs';
import { mapState, mapMutations, mapActions } from 'vuex';
import {
  hideLoading,
  showLoading
} from '../../../../static/lib/PluginInterface.promise';
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
  Dialog 
} from 'gree-ui';

export default {
  name: 'Timer',
  components: {
    [Header.name]: Header,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Switch.name]: Switch,
    [List.name]: List,
    [Item.name]: Item,
    [ToolBar.name]: ToolBar
  },
  data() {
    return {
      backImg: require('@/assets/img/back_black.png'),
      Loop: null,
      isDel: false,
      isMove: false,
      repeatText: '',
      refresh: true,
      firstIn: true,
      // timerList: [{ enable: 0, type: 0, hour: 2, min: 0, repeat: 0 }, { enable: 1, type: 0, hour: 4, min: 0, repeat: 1 }], // 测试数据
      timerList: [], // 测试数据
      // timerListShow: [
      // {
      //   type: '开',
      //   hour: '3',
      //   min: '30',
      //   repeat: '每天',
      //   enable: false
      // },
      // ]
    };
  },
  computed: {
    ...mapState({
      groups: state => state.dataObject.groups,
      code: state => state.dataObject.code,
      mac: state => state.mac
    }),
    
    // 格式化显示内容, timerList刷新就触发格式化刷新
    timerListShow() {
      let list = JSON.parse(JSON.stringify(this.timerList));
      list = this.switchTypeFormat(list);
      return list;
    }
  },
  mounted() {
    this.getTimers(); // 直接获取定时 
    this.groups.length && this.handleTimerList(); // 格式化时间
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT',
      setTimerList: 'SET_TIMERLIST'
    }),
    ...mapActions({
      getTimers: 'GET_TIMERS',
      delTimers: 'DEL_TIMERS',
      updateTimers: 'UPDATE_TIMERS',
    }),   
    
    // 显示定时列表的数据
    handleTimerList() {
      console.log('groups: ', this.groups);
      const list = [];
      for (const item of this.groups) {
        const listItem = {};
        const newItem = item.timers[0];
        console.log('newItem', newItem);
        listItem.enable = newItem.status;
        listItem.type = +newItem.functions[0].value;
        listItem.hour = newItem.time.slice(0, 2);
        listItem.min = newItem.time.slice(-2);
        listItem.repeat = parseInt(newItem.loops, 2);
        list.push(listItem);
      }
      this.timerList = list;
      console.log('所有定时列表： ', this.timerList);
    },

    // 修改定时跳转
    modify(index) {
      console.log(`modify - ${index}`);
      // 防止事件穿透，加一个延时
      setTimeout(() => {
        this.$router.push({
          name: 'SetTimer',
          query: { type: 'modify', index }
        });
      }, 10);
    },

    // 删除确认
    del(index) {
      this.$router.push({
        name: 'Dial',
        query: { index }
      });
    },

    // 切换时能开关
    select(index) {
      const item = this.timerList[index];
      console.log(`第${index}个开关`, this.timerList[index]);
      const Data = {
        group_id: this.groups[index].id,
        message: {
          loops: item.repeat.toString(2).padStart(7, 0), // 二进制string
          time_zone: '+08:00',
          timeZoneId: 'Asia',
          catagory: this.mac,
          instruct: [{
            time: dayjs(`2020-02-02 ${item.hour}:${item.min}`).format('HH:mm'),
            date: '',
            functions: [{
              code: this.code,
              value: !!item.enable
            }]
          }],
        }
      };
      this.updateTimers(Data);
    },

    // 添加定时
    addTimer() {
      if (this.timerList.length < 50) {
        this.$router.push({ name: 'SetTimer' });
      } else {
        navigator.PluginInterface.showToast('最多设置五条定时哦', 0);
        console.log('超过五条定时');
      }
    },

    // 开关类型文字
    switchTypeFormat(list) {
      // 文字
      for (let i = 0, len = this.timerList.length; i < len; i++) {
        if (this.timerList[i].type == 0) {
          list[i].type = '关';
        } else if (this.timerList[i].type == 1) {
          list[i].type = '开';
        }
        // 开关Number 转 Blean   1开  2关
        if (this.timerList[i].enable == 2) {
          list[i].enable = false;
        } else if (this.timerList[i].enable == 1) {
          list[i].enable = true;
        }
        // 24 改 00 
        if ((this.timerList[i].hour == 24 || this.timerList[i].hour == '24') && (this.timerList[i].min == 0 || this.timerList[i].min == '00')) {
          list[i].hour = '00';
          list[i].min = '00';
        } else {
          // 时间
          if (this.timerList[i].hour < 10) {
            list[i].hour = `0${this.timerList[i].hour}`;
          } else {
            list[i].hour = this.timerList[i].hour;
          }
          if (this.timerList[i].min < 10) {
            list[i].min = `0${this.timerList[i].min}`;
          } else {
            list[i].min = this.timerList[i].min;
          }
        }
      }
      return this.repeatTextFormat(list);
    },

    // 格式化输出文字
    repeatTextFormat(list) {
      let txt = '';
      const showTxt = [];
      const selectTxt = [
        '',
        ' 周日 ',
        ' 周六 ',
        ' 周五 ',
        ' 周四 ',
        ' 周三 ',
        ' 周二 ',
        ' 周一 '
      ];
      let judgeTxt = '';
      // 循环每一条定时
      for (let j = 0; j < this.timerList.length; j++) {
        judgeTxt = this.timerList[j].repeat.toString(2); // 将十进制转化为二进制
        if (this.timerList[j].repeat == 0) {
          list[j].repeat = '不重复';
        } else {
          // 补齐八位，前面补0
          const addZeroNum = 8 - judgeTxt.length;
          for (let i = 0; i < addZeroNum; i++) {
            judgeTxt = `0${judgeTxt}`;
          }
          // 给每一条设置显示的时间
          for (let k = 0; k < 8; k++) {
            if (judgeTxt[k] == 1) {
              txt = selectTxt[k] + txt;
            }
          }
          list[j].repeat = txt;
        }
        // this.$set(this.timerListShow[j], repeat, txt); // set方法
        showTxt.push(txt);
        txt = '';
      }
      return list;
    },

    // 长按删除
    showDeleteButton(index) {
      clearTimeout(this.Loop); // 再次清空定时器，防止重复注册定时器
      this.isDel = false;
      if (!this.isMove) {
        this.Loop = setTimeout(() => {
          console.log('长按');
          this.del(index);
          this.isDel = true;
        }, 500);       
      }     
    },

    // 清除定时器
    clearLoop(index) {
      clearTimeout(this.Loop);
      if (!this.isDel && !this.isMove) {
        this.modify(index);
        console.log('点击');
      }
      this.isMove = false;
    },

    move(e) {
      this.isMove = true;
      clearTimeout(this.Loop);
      this.Loop = null;
      e.stopPropagation();
    },

    goBack() {
      this.$router.go(-1);
    },
  }
};
</script>

<style>
.item-title {
  width: 8rem;
}

.page .list ul li .item-content .item-inner {
  min-height: 1.5rem !important;
}
.list {
  margin: 0rem;
}

.gree-switch {
  transform: scale(1.5);
}
.item-after {
  margin-right: 30px;
}

.list .item-media + .item-inner {
  margin-left: 0 !important;
}

.list .item-content {
  padding-left: 0 !important;
}

.item-title {
  margin-left: 50px;
}
.item-footer {
  font-size: 35px !important;
}
</style>

<style scoped lang="scss">
// .page-list {
//   .listItem {
//     height: 1.2rem;
//     .type {
//     margin-left: 22px;
//     width: 8rem;
//   }
//   .titleFont {
//     font-size: 45px;
//   }
//   }
// }
/deep/ .gree-header .gree-header-right {
  right: .5rem;
}
.page-list {
  .listItem {
    position: relative;
    height: 1.5rem;
    width: 10rem;
    background: white;
    border-bottom: 1px solid #f4f4f4;
    .clickArea {
      height: 1.5rem;
      width: 80%;
      position: absolute;
      z-index: 100;
    }
    .type {
      margin-left: 22px;
      width: 8rem;
    }
    .titleFont {
      font-size: 45px;
      position: absolute;
      left: 0.5rem;
      top: 0.2rem;
    }
    .repeat {
      position: absolute;
      left: 0.5rem;
      top: 0.9rem;
    }
    .switch {
      position: absolute;
      right: 0.5rem;
      top: 0.5rem;
    }
  }
  .none {
    font-size: 40px;
    display: flex;
    justify-content: center;
    align-content: center;
    margin-top: 700px;
  }
}

.toolBar {
  height: 1.2rem;
  .bottom {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #eaeaea;
    height: 100%;
    width: 100%;
  }
}

.gree-icon.icon-font.md {
  // Sass缩写形式
  font: {
    size: 0.5rem;
    weight: 600;
  }
}

// .page-list .listItem {
//     height: auto;
// }
</style>
