<template>
  <error-warning-component
    :type="type"
    :errorList="Er.a"
    :warningList="warningList"
    :left-options="{ preventGoBack: true }"
    @on-click-back="clickBack"
  />
</template>

<script>
import { mapState } from 'vuex';

import errorList from '../../api/error';
export default {
  components: {},
  mixins: [errorList],
  data() {
    return {
      type: 'error', // error: 故障组件 warning: 提醒组件
      errorListMsg: [
        // { code: 'EC', title: '记忆故障', text: '请联系售后' },
        // { code: 'EE', title: '长时间制水提醒', text: '按复位1键退出，如若再次出现请通知售后' },
        // { code: 'C5', title: '跳线帽故障', text: '请通知售后' }
      ],
      warningList: [
        // { title: '缺盐提示', text: '请添加洗碗机专用盐' },
        // // 滤芯购买链接
        // {
        //   title: '滤芯寿命将尽',
        //   text: '活性炭滤芯已经使用361天，为了您的健康，请尽快更换滤网',
        //   name: '格力商城',
        //   href: 'https://www.gree.com/'
        // }
      ]
    };
  },
  computed: {
    ...mapState({
      ErrorCode1: state => state.dataObject.ErrorCode1,
      // ErrorCode2: state => state.dataObject.ErrorCode2,
      JFerr: state => state.dataObject.JFerr,

      Er(state) {
        let a = [];
        this.errorListMsg = [];
        let estate = this.ErrorCode1 + this.ErrorCode2 + this.JFerr;
        const ErrorCode1 = this.ErrorCode1;
        const ErrorCode2 = this.ErrorCode2;
        const JFerr = this.JFerr;
        const errorData1 = errorList.data().errorMultiText1;
        const errorData2 = errorList.data().errorMultiText2;
        const errorMultiTextJFerr = errorList.data().errorMultiTextJFerr;

        if (ErrorCode1 !== 0) {
          // Data1多个错误显示
          for (let i = 0; i < 8; i += 1) {
            if (ErrorCode1 & (0x01 << i)) {
              errorData1[i].title !== '' && this.errorListMsg.push(errorData1[i]);
            }
          }
        }
        // if (ErrorCode2 !== 0) {
        //   // Data2多个错误显示
        //   for (let i = 0; i < 8; i += 1) {
        //     if (ErrorCode2 & (0x01 << i)) {
        //       errorData2[i].title !== '' && this.errorListMsg.push(errorData2[i]);
        //     }
        //   }
        // }
        if (JFerr !== 0) {
          // wifi故障
          this.errorListMsg.push(errorMultiTextJFerr[0]);
        }
        if (this.errorListMsg === undefined || this.errorListMsg.length < 1) {
          // 判断是否是已知的故障
          this.errMsg = [];
          estate = 0;
        }
        a = this.errorListMsg;
        console.log('a', a);
        return { a };
      }
    })
  },
  methods: {
    clickBack() {
      // $ret.router.back(-1);
      this.$router.push({ name: 'Home' });
      console.log('clickBack');
    }
  }
};
</script>


