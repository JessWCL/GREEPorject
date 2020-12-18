import {
  LIST1_SMART_MENU_BAKING,
  LIST1_SMART_MENU_STEAMING,
  LIST1_SMART_MENU_BAKING_STEAMING,
  LIST1_SMART_MENU_PACKAGE,
  LIST1_SMART_MENU_CLOUD,

  LIST1_BAKING_HOT_WIND_3D,
  LIST1_BAKING_SMALL_BARBECUE,
  LIST1_BAKING_LARGE_BARBECUE,
  LIST1_BAKING_HOT_AIR_BARBECUE,
  LIST1_BAKING_UP_DOWN_HEATING,
  LIST1_BAKING_BOTTOM_HEATING,
  LIST1_BAKING_BACK_HEATING,
  LIST1_BAKING_GREEN_HOT_AIR,
  LIST1_BAKING_SMALL_UP_DOWN_HEATING,

  LIST1_HELPER_UNFREEZE,
  LIST1_HELPER_FERMENT,
  LIST1_HELPER_REHEAT_BAKING,
  LIST1_HELPER_REHEAT_STEAM,
  LIST1_HELPER_DISINFECTION,
  LIST1_HELPER_BLANCH,
  LIST1_HELPER_WARM_DISH,
  LIST1_HELPER_HEAT_PRESERVATION,
} from '@/api/828d04/constant';

export const ProfessionalBakingFootFuncList = [
  { label: '3D热风', iconfont: 'hot-wind-3d', List1Value: LIST1_BAKING_HOT_WIND_3D },
  { label: '烧烤小面积', iconfont: 'small-barbecue', List1Value: LIST1_BAKING_SMALL_BARBECUE },
  { label: '烧烤大面积', iconfont: 'large-barbecue', List1Value: LIST1_BAKING_LARGE_BARBECUE },
  { label: '热风烧烤', iconfont: 'hot-air-barbecue', List1Value: LIST1_BAKING_HOT_AIR_BARBECUE },
  { label: '上下加热', iconfont: 'up-down-heating', List1Value: LIST1_BAKING_UP_DOWN_HEATING },
  { label: '底部加热', iconfont: 'bottom-heating', List1Value: LIST1_BAKING_BOTTOM_HEATING },
  { label: '背底加热', iconfont: 'back-heating', List1Value: LIST1_BAKING_BACK_HEATING },
  { label: '节能热风', iconfont: 'green-hot-air', List1Value: LIST1_BAKING_GREEN_HOT_AIR },
  { label: '节能上下加热', iconfont: 'small-up-down-heating', List1Value: LIST1_BAKING_SMALL_UP_DOWN_HEATING },
];

export const IntelligentFootFuncList = [
  { label: '烘烤', iconfont: 'baking-mode', List1Value: LIST1_SMART_MENU_BAKING },
  { label: '蒸制', iconfont: 'steamed-mode', List1Value: LIST1_SMART_MENU_STEAMING },
  { label: '蒸汽嫩烤', iconfont: 'steam-bake-mode', List1Value: LIST1_SMART_MENU_BAKING_STEAMING },
  { label: '蒸烤套餐', iconfont: 'sync-steam-bake-mode', List1Value: LIST1_SMART_MENU_PACKAGE },
  { label: '云菜单', iconfont: 'cloud-menu', List1Value: LIST1_SMART_MENU_CLOUD },
];

export const AuxiliaryFunctionList = [
  { label: '解冻', iconfont: 'unfreeze', List1Value: LIST1_HELPER_UNFREEZE },
  { label: '发酵', iconfont: 'ferment', List1Value: LIST1_HELPER_FERMENT },
  { label: '烘焙再加热', iconfont: 'reheat-baking', List1Value: LIST1_HELPER_REHEAT_BAKING },
  { label: '蒸汽再加热', iconfont: 'reheat-steam', List1Value: LIST1_HELPER_REHEAT_STEAM },
  { label: '餐具消毒', iconfont: 'disinfection', List1Value: LIST1_HELPER_DISINFECTION },
  { label: '焯水', iconfont: 'blanch', List1Value: LIST1_HELPER_BLANCH },
  { label: '保温', iconfont: 'heat-preservation', List1Value: LIST1_HELPER_WARM_DISH },
  { label: '暖盘', iconfont: 'warm-dish', List1Value: LIST1_HELPER_HEAT_PRESERVATION },
];
