/*
 * @Author: Jerry-Rain
 * @Date: 2019-09-30 15:22:21
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2019-12-13 00:44:36
 * @Description:这是高级功能的配置表，所有高级功能在这里配置即可
 */

/**
 * @description: 这是高级功能的配置表，所有高级功能在这里配置即可
 */
const drawerFunctionConfig = {
  data() {
    return {
      functionList: [
        {
          index: 2,
          gray: false,
          // state: this.dataObject.SwUpDn,
          name: '功能',
          // miniIcon: require("../../assets/img/mini/SwUpDn_mini.png"),
          ImgUrl: require('@/assets/img/function.png'),
          moreBtn: true
        },
        {
          index: 2,
          gray: false,
          // state: this.dataObject.SwUpDn,
          name: '功能',
          // miniIcon: require("../../assets/img/mini/SwUpDn_mini.png"),
          ImgUrl: require('@/assets/img/function.png'),
          moreBtn: false
        },
        {
          index: 2,
          gray: true,
          // state: this.dataObject.SwUpDn,
          name: '功能',
          // miniIcon: require("../../assets/img/mini/SwUpDn_mini.png"),
          ImgUrl: require('@/assets/img/function.png'),
          moreBtn: false
        },
        {
          index: 2,
          gray: true,
          // state: this.dataObject.SwUpDn,
          name: '功能',
          // miniIcon: require("../../assets/img/mini/SwUpDn_mini.png"),
          ImgUrl: require('@/assets/img/function.png'),
          moreBtn: true
        },
        {
          index: 2,
          gray: true,
          // state: this.dataObject.SwUpDn,
          name: '功能',
          // miniIcon: require("../../assets/img/mini/SwUpDn_mini.png"),
          ImgUrl: require('@/assets/img/function.png'),
          moreBtn: false
        }
      ]
    };
  }
};

export default drawerFunctionConfig;
