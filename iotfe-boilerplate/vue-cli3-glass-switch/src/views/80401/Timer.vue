<!--
 * @Description: In User Settings Edit
 * @Author: Jerry-Rain
 * @Date: 2019-08-09 18:37:21
 * @LastEditTime: 2020-06-29 19:10:21
 * @LastEditors: Jerry-Rain
 -->
<template>
  <gree-view>
    <!-- 头部功能 -->
    <gree-header>
      <gree-icon slot="overwrite-left" name="back" @click="goBack"></gree-icon>
      <span style="color:#404657">定时</span>
      <!-- <div slot="right" @click="refreshFunction()">刷新</div> -->
    </gree-header>
    <!-- 定时列表 -->
    <!-- <gree-page class="page-list">
      <gree-list>
          <gree-list-item
            :footer="item.repeat"
            media-item
            v-for="(item, index) in timerListShow" 
            :key="index" 
            class="listItem"
          >
          <div slot="title" class="titleFont">{{item.title}}<label class="type">{{item.type}}</label></div>
         <gree-switch
            slot="after"
            v-model="item.enable"
            @change="select(index)"
          >
          </gree-switch>
        </gree-list-item>
      </gree-list>
    </gree-page>-->

    <gree-page class="page-list" v-if="refresh">
      <div v-for="(item, index) in timerListShow" :key="index" class="listItem">
        <div class="clickArea" @touchstart="showDeleteButton(index)" @touchend="clearLoop(index)" />
        <!-- <div class="clickArea" v-press:1000="showDeleteButton(index)" v-tap="clearLoop(index)"/> -->
        <div class="titleFont">
          {{item.hour}}:{{item.min}}
          <label class="type">{{item.type}}</label>
        </div>
        <div class="repeat">{{item.repeat}}</div>
        <van-switch slot="after" v-model="item.enable" class="switch" @change="select(index)" size="24px" active-color="#4c0" inactive-color="#f4f4f4" />
        <!-- <gree-switch slot="after" v-model="item.enable" @change="select(index)" class="switch"></gree-switch> -->
      </div>
      <!-- <button @click="test()">菩萨保佑，大吉大利，万事如意. V长按删除+动画</button>
      <button @click="testDel()">测试删除index=0函数</button>
      <div>当前的显示列表：{{timerListShow}}</div> -->
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
import { mapState, mapMutations, mapActions } from "vuex";
import {
  hideLoading,
  showLoading
} from "../../../../static/lib/PluginInterface.promise";
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
} from "gree-ui";

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
    [ToolBar.name]: ToolBar
  },
  data() {
    return {
      backImg: require("@/assets/img/back_black.png"),
      Loop: null,
      isDel: false,
      repeatText: "",
      refresh: true,
      firstIn: true,
      _timer: 0,
      // timerList: [{ enable: 0, type: 0, hour: 24, min: 0, repeat: 0 }, { enable: 1, type: 0, hour: 24, min: 0, repeat: 1 }], // 测试数据
      // timerListShow: [
      //   {
      //     type: "开",
      //     hour: "3",
      //     min: "30",
      //     repeat: "每天",
      //     enable: false
      //   },
      // ]
    };
  },
  mounted() {
    // this.init();
    // this.stopTimer(); // 停止轮询

    // 不是第一次进来开启轮询
    if(!this.$store.state.isFirstIn){
      console.log('不是第一次进来，开始时间轮询，一分钟一次');
        if (!this._timer) {
          this._timer = setInterval(() => {
          console.log('》》》》》》轮询定时列表中');
          showLoading()
          this.getTimerList();
          hideLoading()
          }, 60000);
        }
    }
  },
  created(){},
  // activated() {
  //   // hideLoading();
  //   this.refreshList();
  //   console.log("activated");
  // },
  destroyed(){
    clearInterval(this._timer);
    this._timer = 0;
  },
  computed: {
    ...mapState({
      timerList: state => state.timerList,
    }),
    // 格式化显示内容, timerList刷新就触发格式化刷新
    timerListShow: function() {
      let list = JSON.parse(JSON.stringify(this.timerList));
      console.log('复制： ',list);
      list = this.switchTypeFormat(list);
      console.log('格式化1： ',list);
      list = this.repeatTextFormat(list);
      console.log('格式化2： ',list);
      return list;
    }
  },
  methods: {
    ...mapMutations({
      setDataObject: "SET_DATA_OBJECT",
      setTimerList: "SET_TIMERLIST"
    }),
    ...mapActions({
      sendCtrl: "SEND_CTRL",
      sendTimer: "SEND_TIMER",
      modifyTimer: "MODIFY_TIMER",
      getTimerList: "GET_TIMERLIST",
      stopTimer: "STOP_TIMER",
      beginTimer: "BEGIN_TIMER"
    }),
    // 测试按钮函数
    test() {
      this.getTimerList();
      this.refreshList();
    },
    refreshFunction(){
      showLoading()
      this.getTimerList();
      hideLoading()
    },
    // 测试删除函数
    testDel() {  
      this.del(0)
    },
    /**
     * @description: 刷新List的Dom
     */    
    refreshList() {
      this.refresh = false;
      setTimeout(() => {
        this.refresh = true;
      }, 10);
      console.log("成功添加后刷新");
      console.log("##timerLists ", this.timerList);
    },
    /**
     * @description: 返回上一级
     */    
    goBack() {
      console.log("返回上级");
      this.$router.go(-1);
    },
    /**
     * @description: 长按 删除
     */
    showDeleteButton(index) {
      clearInterval(this.Loop); //再次清空定时器，防止重复注册定时器
      this.isDel = false;
      this.Loop = setTimeout(() => {
        console.log("长按");
        this.del(index);
        this.isDel = true;
      }, 500);
    },
    /**
     * @description: 清除定时器
     */
    clearLoop(index) {
      clearInterval(this.Loop);
      if (!this.isDel) {
        this.modify(index);
        console.log("点击");
      }
    },
    /**
     * @description: 添加定时按钮
     */
    addTimer() {
      if (this.timerList.length < 5) {
        this.$router.push({ name: "SetTimer" });
      } else {
        navigator.PluginInterface.showToast("最多设置五条定时哦", 0);
        console.log("超过五条定时");
      }
    },
    /**
     * @description: 修改定时列表
     */
    modify(index) {
      console.log("modify - " + index);
      // 防止事件穿透，加一个延时
      setTimeout(() => {
        this.$router.push({
          name: "SetTimer",
          query: { type: "modify", index: index }
        });
      }, 10);
    },
    /**
     * @description: 删除 确认框
     */
    del(index) {
      this.$router.push({
          name: "Dial",
          query: { index: index }
        });
      // Dialog.confirm({
      //     title: '提示',
      //     content:
      //       '是否删除定时？',
      //     confirmText: '确定',
      //     onConfirm: () => {
      //     console.log("按钮： " + index);
      //     let obj = { index: 0, type: 0 }; // 初始化定时列表
      //     // 开关编号 > 列表索引 > 类型 1开 | 2关 | 3删除
      //     obj.type = 3;
      //     obj.index = index;
      //     // showLoading();
      //     this.modifyTimer(obj);
      //     // this.$router.push({ path: '/'})
      //     // this.$router.push({ path: '/Timer'})
      //     this.refreshList();
      //     this.timerListShow.splice(obj.index, 1);
      //     },
      //     cancelText: '取消',
      //     onCancel: () => {

      //     },
      //   });
    },
    /**
     * @description: 使能开关切换
     * @param index:从0开始
     */
    select(index) {
      console.log("按钮： " + index);
      console.log("使能开关状态：", this.timerList[index].enable);
      let obj = { index: 0, type: 0 }; // 初始化定时列表
      // 开关编号 > 列表索引 > 类型 1开 | 2关 | 3删除
      let list = JSON.parse(JSON.stringify(this.timerList));
      console.log("List: ", list);
      if (this.timerList[index].enable == 2) {
        list[index].enable = 1;
        this.setTimerList(list);
        obj.type = 1;
      } else if (this.timerList[index].enable == 1) {
        list[index].enable = 2;
        this.setTimerList(list);
        obj.type = 2;
      }
      obj.index = index;
      console.log(obj.type);
      // showLoading();
      this.modifyTimer(obj);
      // hideLoading();
    },
    /**
     * @description: 开关类型文字
     */
    switchTypeFormat(list) {
      // 文字
      console.log("----------解析显示文字 Begin-----------");
      console.log(list);
      console.log(this.timerList.length);
      for (let i = 0; i < this.timerList.length; i++) {
        console.log('list',list[i]);
        if (this.timerList[i].type == 0) {
          list[i].type = "关";
        } else if (this.timerList[i].type == 1) {
          list[i].type = "开";
        }
        // 开关Number 转 Blean   1开  2关
        if (this.timerList[i].enable == 2) {
          list[i].enable = false;
        } else if (this.timerList[i].enable == 1) {
          list[i].enable = true;
        }
        // 24 改 00 
          if ((this.timerList[i].hour == 24 || this.timerList[i].hour == '24') && (this.timerList[i].min == 0 || this.timerList[i].min == '00')) {
            console.log('24点');
            list[i].hour = `00`;
            list[i].min = `00`;
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
      console.log(list);
      console.log("----------解析显示文字 End-----------");
      return list;
    },
    /**
     * @description: 时间列表的定时周期汉字输出
     */
    repeatTextFormat(list) {
      let txt = "";
      let showTxt = [];
      let selectTxt = [
        "",
        " 周日 ",
        " 周六 ",
        " 周五 ",
        " 周四 ",
        " 周三 ",
        " 周二 ",
        " 周一 "
      ];
      let judgeTxt = "";
      console.log("------------- repeatTextFormat Begin----------------");
      console.log(list);
      // 循环每一条定时
      for (let j = 0; j < this.timerList.length; j++) {
        judgeTxt = this.timerList[j].repeat.toString(2); // 将十进制转化为二进制
        if(this.timerList[j].repeat == 0){
          list[j].repeat = '不重复';
        } else {
          // 补齐八位，前面补0
        let addZeroNum = 8 - judgeTxt.length;
        for (let i = 0; i < addZeroNum; i++) {
          judgeTxt = "0" + judgeTxt;
        }
        console.log("补齐八位后：" + judgeTxt);
        // 给每一条设置显示的时间
        for (let k = 0; k < 8; k++) {
          if (judgeTxt[k] == 1) {
            txt = selectTxt[k] + txt;
            // console.log(`判断的位: ${judgeTxt[k]}`);
            // console.log(`位对应的时间： ${selectTxt[k]}`);
          }
        }
        console.log(`第${j + 1}条 定时： ${txt}`);
        list[j].repeat = txt;
        }
        // this.$set(this.timerListShow[j], repeat, txt); // set方法
        showTxt.push(txt);
        txt = "";
      }
      console.log(`所有的定时显示：${showTxt}`);
      console.log(list);
      console.log("------------- repeatTextFormat End----------------");
      return list;
    },


    /**
     * @description: 初始化函数，获取timerlist并装换成显示的timerListShow 
     */    
    init() {
      // 初始化 定时列表
      console.log("-------------Timer.vue mounted Begin-----------");
      this.timerListShow = JSON.parse(JSON.stringify(this.timerList));
      // this.$nextTick(() => {
      // this.getTimerList(); // 获取时间列表
      // this.switchTypeFormat(); // 开关状态文字
      // this.repeatTextFormat(); // 获取周期文字
      // })
      this.stopTimer();
      // hideLoading();
      console.log("-------------Timer.vue mounted End-----------");
    },

    /**
     * @description: 时间列表的定时周期汉字输出
     */
    // repeatTextFormat() {
    //   let txt = "";
    //   let showTxt = [];
    //   let selectTxt = [
    //     "",
    //     " 周日 ",
    //     " 周六 ",
    //     " 周五 ",
    //     " 周四 ",
    //     " 周三 ",
    //     " 周二 ",
    //     " 周一 "
    //   ];
    //   let judgeTxt = "";
    //   console.log("------------- repeatTextFormat Begin----------------");
    //   // 循环每一条定时
    //   for (let j = 0; j < this.timerList.length; j++) {
    //     judgeTxt = this.timerList[j].repeat.toString(2); // 将十进制转化为二进制
    //     // 补齐八位，前面补0
    //     let addZeroNum = 8 - judgeTxt.length;
    //     for (let i = 0; i < addZeroNum; i++) {
    //       judgeTxt = "0" + judgeTxt;
    //     }
    //     console.log("补齐八位后：" + judgeTxt);
    //     // 给每一条设置显示的时间
    //     for (let k = 0; k < 8; k++) {
    //       if (judgeTxt[k] == 1) {
    //         txt = selectTxt[k] + txt;
    //         // console.log(`判断的位: ${judgeTxt[k]}`);
    //         // console.log(`位对应的时间： ${selectTxt[k]}`);
    //       }
    //     }
    //     console.log(`第${j + 1}条 定时： ${txt}`);
    //     this.timerListShow[j].repeat = txt;
    //     // this.$set(this.timerListShow[j], repeat, txt); // set方法
    //     showTxt.push(txt);
    //     txt = "";
    //   }
    //   console.log(`所有的定时显示：${showTxt}`);
    //   console.log("------------- repeatTextFormat End----------------");
    // },
    /**
     * @description: 开关类型文字
     */
    // switchTypetFormat() {
    //   // 文字
    //   console.log("----------解析显示文字 Begin-----------");
    //   for (let i = 0; i < this.timerList.length; i++) {
    //     if (this.timerList[i].type == 0) {
    //       this.timerListShow[i].type = "关";
    //     } else if (this.timerList[i].type == 1) {
    //       this.timerListShow[i].type = "开";
    //     }
    //     // 开关Number 转 Blean   1开  2关
    //     if (this.timerList[i].enable == 2) {
    //       this.timerListShow[i].enable = false;
    //     } else if (this.timerList[i].enable == 1) {
    //       this.timerListShow[i].enable = true;
    //     }
    //     // 时间
    //     if (this.timerList[i].hour < 10) {
    //       this.timerListShow[i].hour = `0${this.timerList[i].hour}`;
    //     } else {
    //       this.timerListShow[i].hour = this.timerList[i].hour;
    //     }
    //     if (this.timerList[i].min < 10) {
    //       this.timerListShow[i].min = `0${this.timerList[i].min}`;
    //     } else {
    //       this.timerListShow[i].min = this.timerList[i].min;
    //     }
    //   }
    //   console.log(this.timerListShow);
    //   console.log("----------解析显示文字 End-----------");
    // },
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
