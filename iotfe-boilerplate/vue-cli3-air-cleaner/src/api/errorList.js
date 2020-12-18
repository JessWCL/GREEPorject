/*
 * @Descripttion: 
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2020-03-17 01:44:50
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-03-30 17:34:35
 */
const errorList = {
  data() {
    return {
      errorList: [{
        code: 'L3', 
        title: this.$language('L3_reason'),
        text: this.$language('common_project'),
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 1,
      }, 
      {
        // code: 'E5', 
        // title: this.$language('E5_reason'),
        // text: this.$language('E5_project'),
        // headtitle: this.$language('error.headtitle'),
        // subtitle: this.$language('error.subtitle'),
        // index: 2,
      },
      {
        // code: 'H8',
        // title: this.$language('H8_reason'),
        // text: this.$language('H8_project'),
        // headtitle: this.$language('error.headtitle'),
        // subtitle: this.$language('error.subtitle'),
        // index: 4,
      }, 
      {
        // code: 'H3',
        // title: this.$language('H3_reason'),
        // text: this.$language('H3_project'),
        // headtitle: this.$language('error.headtitle'),
        // subtitle: this.$language('error.subtitle'),
        // index: 8,
      },
      {
        code: '!',
        title: this.$language('openboard'),
        text: this.$language('openboard_reason'),
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 16,
      }],
      error2List: [{
        // code: 'F1',
        // title: this.$language('F1_reason'),
        // text: this.$language('F1_project'),
        // headtitle: this.$language('error.headtitle'),
        // subtitle: this.$language('error.subtitle'),
        // index: 1,
      }, {
        code: 'F2',
        title: this.$language('F2_reason'),
        text: this.$language('common_project'), 
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 2,
      }, 
      {
        code: 'E3',
        title: this.$language('E3_reason'),
        text: this.$language('common_project'),
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 4,
      }, 
      {
        code: 'E4',
        title: this.$language('E4_reason'),
        text: this.$language('common_project'),
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 8,
      }, {
        code: 'H0',
        title: this.$language('H0_reason'),
        text: this.$language('H0_project'),
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 16,
      },
      {
        code: 'E8',
        title: this.$language('E8_reason'),
        text: this.$language('E8_project'),
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 32,
      }],
      wifiErrorList: [{
        code: '!', // 0
        title: this.$language('notify_fault_name_wifi'),
        text: this.$language('notify_fault_resolve_wifi'),
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 1
      }],
    };
  }
};

export default errorList;
