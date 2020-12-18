/*
 * @Author: Jerry-Rain
 * @Date: 2019-09-11 16:43:42
 * @LastEditors  : Jerry-Rain
 * @LastEditTime : 2019-12-27 13:48:03
 * @Description: 首页底部功能的配置表
 */
/**
 * @description Home配置列表
 */

const homeConfig = {
  data() {
    return {
      functionList:[
        {
          url: require('../../../assets/img/report.png'),
          name: '睡眠报告'
        },
        {
          url: require('../../../assets/img/control.png'),
          name: '软硬调节'
        },   
      ]
    };
  },
};

export default homeConfig;
