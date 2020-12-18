<!--
 * @Description: In User Settings Edit
 * @Author: Jerry-Rain
 * @Date: 2019-08-09 18:37:21
 * @LastEditTime: 2019-09-10 11:13:58
 * @LastEditors: Jerry-Rain
 -->
<template>
  <gree-view>
    <!-- 头部功能 -->
    <gree-header>
      <gree-icon slot="overwrite-left" name="back" @click="goBack"></gree-icon>
      <span style="color:#404657">定时</span>
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

    <gree-page class="page-list">
      <div v-for="(item, index) in timerListShow" :key="index" class="listItem">
        <div class="clickArea" @touchstart="showDeleteButton(index)" @touchend="clearLoop(index)" />
        <!-- <div class="clickArea" v-press:1000="showDeleteButton(index)" v-tap="clearLoop(index)"/> -->
        <div class="titleFont">
          {{item.hour}}:{{item.min}}
          <label class="type">{{item.type}}</label>
        </div>
        <div class="repeat">{{item.repeat}}</div>
        <gree-switch slot="after" v-model="item.enable" @change="select(index)" class="switch"></gree-switch>
      </div>
    </gree-page>

    <!-- 底部添加栏 -->
    <gree-toolbar class="toolBar" position="bottom" no-hairline>
      <div class="bottom" @click="addTimer">
        <gree-icon name="add" />
      </div>
    </gree-toolbar>
  </gree-view>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import {
  Header,
  Row,
  Col,
  Button,
  Icon,
  Switch,
  List,
  Item,
  ToolBar
} from "gree-ui";
import * as types from '../../store/types';

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
      // { enable: 0, type: 0, hour: 0, min: 0, repeat: 0 }
      timerListShow: [
        {
          type: "开",
          hour: "3",
          min: "30",
          repeat: "每天",
          enable: false
        },
        {
          type: "开",
          hour: "3",
          min: "30",
          repeat: "周一 周二 周二 周二 周二 周二 周二",
          enable: true
        },
        {
          type: "开",
          hour: "3",
          min: "30",
          repeat: "周四",
          enable: false
        },
        {
          type: "开",
          hour: "3",
          min: "30",
          repeat: "周三",
          enable: true
        }
      ]
    };
  },
  mounted() {
    // 初始化 定时列表
    this.timerListShow = JSON.parse(JSON.stringify(this.timerList));
    this.switchTyprFunction(); // 开关状态文字
    this.repeatTextFunction(); // 获取周期文字
  },
  computed: {
    ...mapState({
      timerList: state => state.timerList
    })
  },
  methods: {
    ...mapMutations({
      setDataObject: types.SET_DATA_OBJECT
    }),
    ...mapActions({
      sendCtrl: types.SEND_CTRL,
      sendTimer: types.SEND_TIMER,
      modifyTimer: types.MODIFY_TIMER
    }),
    goBack() {
      console.log("返回上级");
      this.$router.go(-1);
    },
    /**
     * @description: 长按 删除
     * @param {type}
     * @return:
     */

    showDeleteButton(index) {
      clearInterval(this.Loop); //再次清空定时器，防止重复注册定时器
      this.isDel = false;
      this.Loop = setTimeout(() => {
        console.log("长按");
        this.del(index);
        this.isDel = true;
      }, 1000);
    },
    /**
     * @description: 清除定时器
     * @param {type}
     * @return:
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
     * @param {type}
     * @return:
     */

    addTimer() {
      if (this.timerList.length < 5) {
        this.$router.push({ name: "SetTimer" });
      } else {
        this.$toast("最多设定五条定时");
        console.log("超过五条定时");
      }
    },
    /**
     * @description: 修改定时列表
     * @param {type}
     * @return:
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
     * @param {type}
     * @return:
     */

    del(index) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "是否删除定时？"
        })
        .then(() => {
          // on confirm
          console.log("按钮： " + index);
          let obj = { index: 0, type: 0 }; // 初始化定时列表
          // 开关编号 > 列表索引 > 类型 1开 | 2关 | 3删除
          if (this.timerList[index].enable) {
            obj.type = 0;
          } else {
            obj.type = 1;
          }
          obj.index = index;
          this.modifyTimer(obj);
        })
        .catch(() => {
          // on cancel
        });
    },
    /**
     * @description: 使能开关切换
     * @param index:从0开始
     * @return:
     */

    select(index) {
      console.log("按钮： " + index);
      let obj = { index: 0, type: 0 }; // 初始化定时列表
      // 开关编号 > 列表索引 > 类型 1开 | 2关 | 3删除
      console.log(this.timerList[index].enable);
      if (this.timerList[index].enable) {
        obj.type = 0;
      } else {
        obj.type = 1;
      }
      obj.index = index;
      console.log(obj.type);
      this.modifyTimer(obj);
    },
    /**
     * @description: 时间列表的定时周期汉字输出
     * @param
     * @return:
     */

    repeatTextFunction() {
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
      console.group("------------- repeatTextFunction ----------------");
      // 循环每一条定时
      for (let j = 0; j < this.timerList.length; j++) {
        judgeTxt = this.timerList[j].repeat.toString(2); // 将十进制转化为二进制
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
        this.timerListShow[j].repeat = txt;
        showTxt.push(txt);
        txt = "";
      }
      console.log(`所有的定时显示：${showTxt}`);
      console.groupEnd("------------- repeatTextFunction ----------------");
    },
    /**
     * @description: 开关类型文字
     * @param {type}
     * @return:
     */

    switchTyprFunction() {
      // 文字
      for (let i = 0; i < this.timerList.length; i++) {
        if (this.timerList[i].type == 0) {
          this.timerListShow[i].type = "关";
        } else if (this.timerList[i].type == 1) {
          this.timerListShow[i].type = "开";
        }
        // 开关Number 转 Blean
        if (!this.timerList[i].enable) {
          this.timerListShow[i].enable = false;
        } else if (this.timerList[i].enable) {
          this.timerListShow[i].enable = true;
        }
      }
    }
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
