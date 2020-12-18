/**
 * @description home页配置
 */

const homeConfig = {
  data() {
    return {
      ModeImg: [
        require('@/assets/img/standby.png'),
        require('@/assets/img/water_making.png'),
        require('@/assets/img/water_shortage.png'),
        require('@/assets/img/water_off.png'),
      ],
      modeAll: [
        {
          name: '待机',
          value: 0,
        },
        {
          name: '制水',
          value: 2,
        },
        {
          name: '缺水',
          value: 6,
        },
        {
          name: '排水',
          value: 7,
        },
      ],
      ModeOptions: {
        isShow: true, // 是否显示
        controlAble: false, // 滑轮能不能滑动
        showNumOrImg: false, // 显示数字还是图片
        horizontal: true, // 水平显示or竖直显示
        controlMode: 1,
        threeOrAll: false, // 显示3个or全部显示
        width: '100%', // 组件宽度
        spaceBetween: '1.5rem', // 间距
        marginLeft: '0rem', // 组件左边距
        height: '0.79rem', // 图片大小
        fontSize: '2.9rem',
        radiusMutiply: 1.5, // 半径系数
        WorkStatus: 0,
      },
      filters: [
        {
          name: 'PP棉',
          val: 0,
          text:
            '对水进行粗滤，有效降低浊度，截留<br>水中的  泥沙、铁锈、悬浮物等杂质。',
          url:
            'http://mall.gree.com/mall/ProductDisplayWap?catalog=10001&storeId=10651&productId=11496&langId=-7',
        },
        {
          name: '活性炭',
          val: 0,
          text: '有效去除水中的余氯、异色、异味、<br>小分子有机物。',
          url:
            'http://mall.gree.com/mall/ProductDisplayWap?catalog=10001&storeId=10651&productId=11506&langId=-7',
        },
        {
          name: '反渗透膜',
          val: 0,
          text: '有效去除水中的重金属、农药、<br>细菌、病毒等。',
          url: 'https://gree.m.tmall.com',
        },
        {
          name: '复合滤芯',
          val: 0,
          text:
            '活性炭有效去除异味，改善口感。超滤 <br> 膜有效截留可能存在的细菌、病毒。',
          url:
            'http://mall.gree.com/mall/ProductDisplayWap?catalog=10001&storeId=10651&productId=11540&langId=-7',
        },
      ],
      filterKinds: ['pp棉', '前置活性炭', '碳棒', 'RO膜', '超滤', '复合滤芯'],
    };
  },
};
export default homeConfig;
