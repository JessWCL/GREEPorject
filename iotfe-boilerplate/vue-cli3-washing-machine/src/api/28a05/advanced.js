
/**
 * @constant {object} advancedConfig
 * @description 高级功能配置列表
 */

const advancedList28a05 = [{
  index: 0, // 下标
  itemName: 'home.appointment', // 名称对应$language
  protocol: 'order', // 对应协议
  showArrowMore: true, // 跳转路由的名称, 不跳转的为空，跳转的写对应路由
  selected: false, // 是否被选中, true则图标亮起
  invalid: false, // 是否禁用该功能, true则图标置灰且不可用
  IconName: 'appointment'
},
{
  index: 1,
  itemName: 'home.eco2',
  protocol: 'energySave',
  showArrowMore: false,
  selected: false,
  invalid: false, // 是否禁用该功能
  IconName: 'eco'
},
{
  index: 2,
  itemName: 'home.nightWater',
  protocol: 'nightWash',
  showArrowMore: false,
  selected: false,
  invalid: false, // 是否禁用该功能
  IconName: 'yejianxi'
},
{
  index: 3,
  itemName: 'home.highWaterLevel',
  protocol: 'highWater',
  showArrowMore: false,
  selected: false,
  invalid: false, // 是否禁用该功能
  IconName: 'gaoshuiwei'
},
{
  index: 4,
  itemName: 'setUp.jingyin',
  protocol: 'mute',
  showArrowMore: false,
  selected: false,
  invalid: false, // 是否禁用该功能
  IconName: 'mute'
},
{
  index: 5,
  itemName: 'setUp.childLock',
  protocol: 'childLock',
  showArrowMore: false,
  selected: false,
  invalid: true, // 是否禁用该功能
  IconName: 'childLock'
},
{
  index: 6,
  itemName: 'setUp.detergentAutomaticDelivery2',
  protocol: 'autoScour',
  showArrowMore: false,
  selected: false,
  invalid: false, // 是否禁用该功能
  IconName: 'xidiji'
}, 
{
  index: 7,
  itemName: 'setUp.automaticDeliveryOfSoftener2',
  protocol: 'autoMeek',
  showArrowMore: false,
  selected: false,
  invalid: false, // 是否禁用该功能
  IconName: 'roushunji'
}, 
{
  index: 16,
  itemName: 'setUp.openDooor',
  protocol: 'autoOpenDoor',
  showArrowMore: false,
  selected: false,
  invalid: false, // 是否禁用该功能
  IconName: 'autoOpenDoor'
}
];

const orderList28a05 = [
  {
    name: 'setUp.childLock',
    ImgName: 'childLock',
    protocol: 'childLock',
    isDisabled: false
  },
  {
    name: 'setUp.jingyin',
    ImgName: 'mute',
    protocol: 'mute',
    isDisabled: false
  },
  {
    name: 'setUp.openDooor',
    ImgName: 'autoOpenDoor',
    protocol: 'autoOpenDoor',
    isDisabled: false
  },
];

const startFootList28a05 = [{
  index: 0,
  isShowFuncBtn: true,
  isDisabled: false,
  selected: true, // 是否被选中, true则图标亮起
  protocol: 'Pow',
  name: 'home.power',
  ImgName: 'btn_off',
  iconName: 'power',
},
{
  index: 1,
  isShowFuncBtn: true,
  isDisabled: false,
  selected: false, // 是否被选中, true则图标亮起
  protocol: 'childLock',
  name: 'setUp.childLock',
  ImgName: 'childLock',
  iconName: 'childLock',
},
{
  index: 2,
  isShowFuncBtn: true,
  isDisabled: false,
  selected: false, // 是否被选中, true则图标亮起
  protocol: 'mute',
  name: 'setUp.jingyin',
  ImgName: 'mute',
  iconName: 'mute',
},
{
  index: 3,
  isShowFuncBtn: true,
  isDisabled: false,
  selected: false, // 是否被选中, true则图标亮起
  protocol: 'autoOpenDoor',
  name: 'setUp.openDooor',
  ImgName: 'autoOpenDoor',
},
];

export {orderList28a05, advancedList28a05, startFootList28a05};
