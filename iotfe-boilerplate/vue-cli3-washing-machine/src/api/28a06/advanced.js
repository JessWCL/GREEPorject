/*
 * @Descripttion: 高级功能配置
 * @version: 1.0
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2020-07-09 09:17:36
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-07-09 19:21:25
 */
/**
 * @description 28a06 首页底部功能配置列表 
 */
const footListHome = [
  {
    index: 0,
    itemName: 'setUp.childLock',
    chineseName: '童锁',
    protocol: 'childLock',
    showArrowMore: false,
    selected: false,
    invalid: false, // 是否禁用该功能
    show: true,
    IconName: 'childLock',
  }, {
    index: 1, // 下标 实际无用到
    itemName: 'home.power', // 名称对应$language
    chineseName: '开关',
    protocol: 'Pow', // 对应协议
    showArrowMore: false, // 跳转路由的名称, 不跳转的为空，跳转的写对应路由
    selected: false, // 是否被选中, true则图标亮起
    invalid: false, // 是否禁用该功能, true则图标置灰且不可用
    show: true, // 是否显示
    IconName: 'Pow'
  },
  {
    index: 2,
    itemName: 'setUp.shengyin',
    chineseName: '静音',
    protocol: 'mute',
    showArrowMore: true,
    selected: false,
    invalid: false, // 是否禁用该功能
    show: true,
    IconName: 'mute'
  }
];


// 各层底部功能配置列表 
const footListStandby = [
  {
    index: 0,
    itemName: 'home.pattern',
    chineseName: '模式',
    protocol: 'mode',
    showArrowMore: true,
    selected: false,
    invalid: false, // 是否禁用该功能
    show: true,
    IconName: 'mode'
  },
  {
    index: 1,
    itemName: 'home.appointment',
    chineseName: '预约',
    protocol: 'appointment',
    showArrowMore: true,
    selected: false,
    invalid: false, // 是否禁用该功能
    show: true,
    IconName: 'appointment'
  },
  {
    index: 2,
    itemName: 'home.senior',
    chineseName: '高级',
    protocol: 'senior',
    showArrowMore: true,
    selected: false,
    invalid: false, // 是否禁用该功能
    show: true,
    IconName: 'senior'
  },
];

// 各层待机的高级功能
const funcConfig = [
  {
    index: 0,
    itemName: 'home.soak',
    protocol: 'soak',
    showArrowMore: false,
    selected: false,
    invalid: false, // 是否禁用该功能
    IconName: 'soak'
  },
  {
    index: 1,
    itemName: 'home.clear',
    protocol: 'clear',
    showArrowMore: false,
    selected: false,
    invalid: false, // 是否禁用该功能
    IconName: 'soak'
  },
  {
    index: 2,
    itemName: 'home.quiet',
    protocol: 'nightWash',
    showArrowMore: false,
    selected: false,
    invalid: false, // 是否禁用该功能
    IconName: 'yejianxi'
  },
  {
    index: 3,
    itemName: 'home.creaseProof',
    protocol: 'creaseRes',
    showArrowMore: false,
    selected: false,
    invalid: false, // 是否禁用该功能
    IconName: 'creaseProof'
  },
  {
    index: 4,
    itemName: 'home.highWaterLevel',
    protocol: 'highWater',
    showArrowMore: false,
    selected: false,
    invalid: false, // 是否禁用该功能
    IconName: 'gaoshuiwei'
  }
];

// 启动页的底层高级功能
const startup = [
  {
    index: 0, // 下标 实际无用到
    itemName: 'home.power', // 名称对应$language
    chineseName: '开关',
    protocol: 'Pow', // 对应协议
    showArrowMore: false, // 跳转路由的名称, 不跳转的为空，跳转的写对应路由
    selected: false, // 是否被选中, true则图标亮起
    invalid: false, // 是否禁用该功能, true则图标置灰且不可用
    show: true, // 是否显示
    IconName: 'Pow'
  },  
  {
    index: 1,
    itemName: 'setUp.childLock',
    chineseName: '童锁',
    protocol: 'childLock',
    showArrowMore: false,
    selected: false,
    invalid: false, // 是否禁用该功能
    show: true,
    IconName: 'childLock',
  },
  {
    index: 2,
    itemName: 'setUp.shengyin',
    chineseName: '静音',
    protocol: 'mute',
    showArrowMore: true,
    selected: false,
    invalid: false, // 是否禁用该功能
    show: true,
    IconName: 'mute'
  }
];

export {
  footListHome, 
  footListStandby,
  funcConfig,
  startup
};
