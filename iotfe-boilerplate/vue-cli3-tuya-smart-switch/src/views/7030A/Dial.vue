<!--
 * @Author: Jerry-Rain
 * @Date: 2019-07-28 10:29:24
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-06-17 13:48:50
 * @Description: 子路由删除框
 -->
<template>
  <gree-view class="page-main"> 
  </gree-view>
</template>

<script>
import { mapActions } from 'vuex';
import { Dialog } from 'gree-ui';

export default {
  name: 'Dial',
  data() {
    return {   
      delIndex: 0,
    };
  },
  mounted() {
    this.delIndex = this.$route.query.index;
    this.del(this.delIndex);
  },
  // 使用路由守卫控制 对话框返回
  beforeRouteLeave(to, from, next) {
    this.dialog.close();
    next();
  },
  methods: {
    ...mapActions({
      delTimers: 'DEL_TIMERS'
    }),
    // 删除定时
    del(index) {
      console.log('确认是否删除 - ', this.delIndex);
      this.dialog = Dialog.confirm({
        title: '提示',
        content:
          '是否删除定时？',
        confirmText: '确定',
        onConfirm: () => {
          this.delTimers({index});
          this.goBack();
        },
        cancelText: '取消',
        onCancel: () => {
          this.goBack();
        },
      });
    },
    goBack() {
      this.$router.go(-1);
    },
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

