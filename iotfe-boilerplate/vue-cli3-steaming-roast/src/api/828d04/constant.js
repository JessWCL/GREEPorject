// 模版MID
export const MID_828D04 = '828d04';

// 生产环境
export const __PROD__ = process.env.NODE_ENV === 'production';
// 开发环境
export const __DEV__ = process.env.NODE_ENV === 'development';
// 测试环境
export const __TEST__ = process.env.NODE_ENV === 'testing';

export const POW = {
  TurnOff: 0,
  TurnOn: 1
};

export const RUN_STAT = {
  TurnOff: 0,
  TurnOn: 1,
  Appointment: 2,
  Working: 3
};

export const PAUSE = {
  Off: 0,
  On: 1
};

export const FavoriteType = {
  Add: 1,
  Delete: 2,
  Update: 3
};

// 工作模式
export const MODE_SMART_MENU = 0; // 智能菜单
export const MODE_BAKING = 1; // 专业烘烤
export const MODE_STEAMING = 2; // 专业蒸制
export const MODE_HELPER = 3; // 辅助功能
export const MODE_CLEAN = 4; // 清洁
export const MODE_NETWORK_MODE = 5; // 网络模式

// 工作模式为智能菜单
export const LIST1_SMART_MENU_BAKING = 0; // 烘烤
export const LIST1_SMART_MENU_STEAMING = 1; // 蒸制
export const LIST1_SMART_MENU_BAKING_STEAMING = 2; // 蒸汽嫩烤
export const LIST1_SMART_MENU_PACKAGE = 3; // 蒸烤套餐
export const LIST1_SMART_MENU_CLOUD = 4; // 云菜单

// 工作模式为专业烘烤
export const LIST1_BAKING_HOT_WIND_3D = 0; // 3D热风
export const LIST1_BAKING_SMALL_BARBECUE = 1; // 烧烤小面积
export const LIST1_BAKING_LARGE_BARBECUE = 2; // 烧烤大面积
export const LIST1_BAKING_HOT_AIR_BARBECUE = 3; // 热风烧烤
export const LIST1_BAKING_UP_DOWN_HEATING = 4; // 上下加热
export const LIST1_BAKING_BOTTOM_HEATING = 5; // 底部加热
export const LIST1_BAKING_BACK_HEATING = 6; // 背底加热
export const LIST1_BAKING_GREEN_HOT_AIR = 7; // 节能热风
export const LIST1_BAKING_SMALL_UP_DOWN_HEATING = 8; // 节能上下加热
// 工作模式为专业烘烤
export const MODE_BAKING_TEMP_NAMES = {
  230: '高',
  210: '中',
  190: '低'
};


// 工作模式为辅助功能
export const LIST1_HELPER_UNFREEZE = 0; // 解冻
export const LIST1_HELPER_FERMENT = 1; // 发酵
export const LIST1_HELPER_REHEAT_BAKING = 2; // 烘焙再加热
export const LIST1_HELPER_REHEAT_STEAM = 3; // 蒸汽再加热
export const LIST1_HELPER_DISINFECTION = 4; // 餐具消毒
export const LIST1_HELPER_BLANCH = 5; // 焯水
export const LIST1_HELPER_WARM_DISH = 6; // 暖盘
export const LIST1_HELPER_HEAT_PRESERVATION = 7; // 保温

// 工作模式为清洁
export const LIST1_CLEAN_STEAM_ASSISTED_CLEANING = 0; // 蒸汽辅助清洁
export const LIST1_CLEAN_DESCALING = 1; // 除垢

// 工作模式为 智能菜单-蒸汽嫩烤
export const LIST2_SMART_MENU__SMART_MENU_BAKING_STEAMING__ROASTING = 0; // 西式烘焙
export const LIST3_SMART_MENU__SMART_MENU_BAKING_STEAMING__ROASTING__CHIFFON_CAKE = 0; // 戚风蛋糕

// export const LIST2_SMART_MENU_MEAT = 0; // 肉类
// export const LIST2_SMART_MENU_VEGETABLES = 1; // 蔬菜类
// export const LIST2_SMART_MENU_SEAFOOD = 2; // 河海鲜类
// export const LIST2_SMART_MENU_BREAD = 3; // 面包类
// export const LIST2_SMART_MENU_COOKIES = 4; // 饼干类
// export const LIST2_SMART_MENU_CAKE = 5; // 蛋糕类
// export const LIST2_SMART_MENU_PIE = 6; // 蛋派类
// export const LIST2_SMART_MENU_DESSERT = 7; // 米面点心

// 工作模式为专业烘烤
export const LIST2_BAKING_LOW = 0; // 低
export const LIST2_BAKING_MIDDLE = 1; // 中
export const LIST2_BAKING_HEIGHT = 2; // 高
export const LIST2_BAKING_LOW_TMP = 190; // 低 温度值
export const LIST2_BAKING_MIDDLE_TMP = 210; // 中 温度值
export const LIST2_BAKING_HEIGHT_TMP = 230; // 高 温度值

export const LIST1 = {
  DefaultValue: 0
};

export const LIST2 = {
  DefaultValue: 0
};

export const TipsType = {
  /**
   * 开门提示
   */
  Opening: 0,
  /**
   * 净水箱取出
   */
  WaterTankOut: 1,
  /**
   * 废水箱取出
   */
  WasteTankOut: 2,
  /**
   * 废水箱水满
   */
  WasteTankFull: 3,
  /**
   * 净水箱缺水
   */
  WaterTankLack: 4,
  /**
   * 面板开启
   */
  PanelOpening: 5,
  /**
   * 除垢提示
   */
  WasteDescaling: 6,
  /**
   * 高温提示-烘烤位
   */
  HighTemp4SmartMenuBaking: 7,
  /**
   * 高温提示-蒸汽位
   */
  HighTemp4SmartMenuSteaming: 0,
}

export const FoodCategory = '食品类别';
export const GET_ALL_TEXT = '全部'; // 与 LIST2_ALL.List2Label对应
export const GET_ALL = -1; // 与 LIST2_ALL.List2Value对应
export const LIST2_ALL = { iconfont: undefined, List1Label: undefined, List1Value: undefined, List2Label: GET_ALL_TEXT, List2Value: GET_ALL };

export const TAG_LOADING_TIME = '-';

export const LIGHT_BAR_COLOR = '#f4f4f4';
export const DARK_BAR_COLOR = '#342f32';

export const UseCanTurnOnType = {
  CloudMenu: 'CLOUD_MENU'
}

export const QuickClickToast = '亲，你操作有点快了...';
