<!--
 * @Author: Jerry-Rain
 * @Date: 2019-07-28 10:29:24
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-09-14 14:27:59
 * @Description: 删除确认框
 -->
<template>
  <gree-view class="page-main" > 
     <!-- <div class="tip">
        <div class="title"><span>提示</span></div>
        <div class="content"><span>是否删除定时？</span></div>
        <div class="bottom">
          <div class="cancel" @click="goBack()"><span>取消</span></div>
        <div class="confirm" @click="del(delIndex)"><span>确定</span></div>
        </div>
    </div> -->
  </gree-view>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { Dialog } from "gree-ui";

export default {
  name: "Dial",
  data() {
    return {   
      delIndex: 0,
      dialog: null,
    };
  },
  mounted(){
    this.delIndex = this.$route.query.index;
    this.del(this.delIndex);
    console.log('确认是否删除 - ',this.delIndex)
  },
  computed: {
  },
  watch: {
  },
  // 使用路由守卫控制 对话框返回
  beforeRouteLeave (to, from, next) {
    this.dialog.close();
    next();
  },
  methods: {
    ...mapActions({
      sendCtrl: "SEND_CTRL",
      sendTimer: "SEND_TIMER",
      modifyTimer: "MODIFY_TIMER",
      getTimerList: "GET_TIMERLIST",
    }),
     goBack() {
      console.log("返回上级");
      this.$router.go(-1);
      // this.$router.push({ path : '/Timer'});
    },
    // /**
    //  * @description: 删除 确认框
    //  */
    // del(index) {
    //   console.log("按钮： " + index);
    //   let obj = { index: 0, type: 0 }; // 初始化定时列表
    //   // 开关编号 > 列表索引 > 类型 1开 | 2关 | 3删除
    //   obj.type = 3;
    //   obj.index = index;
    //   this.modifyTimer(obj);
    //   this.goBack();
    // },


    del(index) {
      this.dialog = Dialog.confirm({
        title: '提示',
        content:
          '是否删除定时？',
        confirmText: '确定',
        onConfirm: () => {
          console.log("按钮： " + index);
          let obj = { index: 0, type: 0 }; // 初始化定时列表
          // 开关编号 > 列表索引 > 类型 1开 | 2关 | 3删除
          obj.type = 3;
          obj.index = index;
          this.modifyTimer(obj);
          this.goBack();
        },
        cancelText: '取消',
        onCancel: () => {
          this.goBack();
        },
      });
    }
  },
};
</script>

<style lang="scss" scoped>
// .page-main {
//     -webkit-animation-name: fadeIn;
//     -webkit-animation-timing-function: ease-in-out;
//     -webkit-animation-duration: 0.3s;

//     background: rgba(0,0,0,0.5);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     .tip {
//       border-radius: 5px;
//       background: white;
//       width: 950px;
//       height: 450px;
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       justify-content: space-around;
//       .title {
//         flex-grow: 1;
//         font-size: 42px;
//         display: flex;
//         align-items: center;
//       }
//       .content {
//         display: flex;
//         align-items: center;
//         flex-grow: 1;
//         font-size: 42px;
//       }
//       .bottom {
//         flex-grow: 1;
//         display: flex;
//         width: 100%;
//         justify-content: space-around;
//         align-items: center;
//         border-top: 1px solid #f4f4f4;
//         .cancel {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           text-align: center;
//           flex-grow: 1;
//           font-size: 45px;
//           border-right: 1px solid #f4f4f4;
//           height: 100%;
//         }
//         .confirm {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           text-align: center;
//           flex-grow: 1;
//           font-size: 45px;
//           color: #03a9f4;
//           height: 100%;
//         }
//       }
//   }
//   // 进入动画
//   @-webkit-keyframes fadeIn {
//     0% {
//         opacity:0;
//      }
//     25% {
//         opacity:0.25;
//     }
//     50% {
//         opacity: 0.5;    
//     }
//     75% {
//         opacity:0.75;
//     }
//     100% {
//         opacity:1;
//     }
//   }
// }


</style>

