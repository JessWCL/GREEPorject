/*
 * @Author: Jerry-Rain
 * @Date: 2019-09-11 16:43:42
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2019-09-30 15:36:30
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
          url: require('@/assets/img/rice_cooker.png'),
          name: '电饭煲'
        },
        {
          url: require('@/assets/img/steaming_baking.png'),
          name: '蒸烤双能机'
        },
        {
          url: require('@/assets/img/hot_pot.png'),
          name: '电火锅'
        }
      ]
    };
  }
};

export default homeConfig;
