/*
 * @Descripttion: 28a01 advancedConfig
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2019-11-18 15:05:07
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-02-26 18:17:57
 */
/**
 * @description 高级功能配置列表 28a01
 */

const advancedList = [{
  index: 0, // 下标
  itemName: 'home.appointment', // 名称对应$language
  protocol: 'order', // 对应协议
  showArrowMore: true, // 跳转路由的名称, 不跳转的为空，跳转的写对应路由
  selected: false, // 是否被选中, true则图标亮起
  invalid: false, // 是否禁用该功能, true则图标置灰且不可用
  show: true, // 是否显示
  IconName: 'yuYue'
},
{
  index: 1,
  itemName: 'home.highWaterLevel',
  protocol: 'highWater',
  showArrowMore: false,
  selected: false,
  invalid: false, // 是否禁用该功能
  show: true,
  IconName: 'gaoShuiWei'
},
{
  index: 2,
  itemName: 'home.soak',
  protocol: 'soak',
  showArrowMore: true,
  selected: false,
  invalid: false, // 是否禁用该功能
  show: true,
  IconName: 'jinPao'
},
{
  index: 3,
  itemName: 'home.creaseProof',
  protocol: 'creaseRes',
  showArrowMore: false,
  selected: false,
  invalid: false, // 是否禁用该功能
  show: true,
  IconName: 'fangZhou'
},
{
  index: 4,
  itemName: 'home.eco2',
  protocol: 'energySave',
  showArrowMore: false,
  selected: false,
  invalid: false, // 是否禁用该功能
  show: true,
  IconName: 'ECO'
},
{
  index: 5,
  itemName: 'home.drainageFree',
  protocol: 'noDrain',
  showArrowMore: false,
  selected: false,
  invalid: false, // 是否禁用该功能
  show: true,
  IconName: 'mianPaishui'
},
];

export default advancedList;
