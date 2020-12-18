/*
 * @Author: Jerry-Rain
 * @Date: 2019-09-11 16:43:42
 * @LastEditors: Feng
 * @LastEditTime: 2020-04-23 15:50:18
 * @Description: 首页底部功能的配置表
 */
/**
 * @description Home配置列表
 */

const homeConfig = {
  data() {
    return {
      functionList: [
        {
          url: require('../../../assets/img/functionReport.png'),
          name: '睡眠报告',
        },
      ]
    };
  },
};

export default homeConfig;
