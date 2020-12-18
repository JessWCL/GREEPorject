
// 生产环境
export const __PROD__ = process.env.NODE_ENV === 'production';
// 开发环境
export const __DEV__ = process.env.NODE_ENV === 'development';
// 测试环境
export const __TEST__ = process.env.NODE_ENV === 'testing';
// 本地缓存deviceInfo键名
export const LOCAL_STORAGE_DEVICE_INFO = `MID_${process.env.VUE_APP_MID}_DEVICE_INFO`;

// 内销12套
export const DW_MID_828B00 = '828b00'; // 精英系列底嵌式洗碗机
export const DW_MID_828901 = '828901'; // 精英系列小台式洗碗机
export const DW_MID_828902 = '828902'; // 豪华系列洗碗机

// 插件控制类型
export const FUNC_TYPE = {
  MODE_CONTROL: '0', // 普通控制
  MODE_CENTER_CONTROL: '1', // 集中控制页
};

// 错误代码，默认为0
export const ERROR_CODE = {
  NONE: 0, // 正常，没有故障
};

// 按钮类型
export const BTN_TYPE = {
  BTN_FUNCTION: 'BTN_FUNCTION', // 功能按键
  BTN_MODEL: 'BTN_MODEL', // 模式按键
};

export const BTN_TYPE_INDEX = {
  PowerSwitch: 0, // 开关
  Model: 1, // 模式
  Function: 2, // 功能
};

// 分层洗按钮枚举
export const BTN_LAYERWASH_TYPE = {
  DEFAULT: 0, // 默认上下层洗
  UP_WASH: 1, // 上层洗
  DOWN_WASH: 2, // 下层洗
};

// 功能按钮 (副加) index
export const FUN_BTNS = {
  DEFAULT: 0, // 默认上下层洗
  UP_WASH: 1, // 上层洗
  DOWN_WASH: 2, // 下层洗
  HOT_AIR_DRYING: 3, // 热风烘干
  APPOINTMENT: 4, // 预约
  PURIFIER: 5, // 保洁
  DISINFECT: 6, // 消毒
};

// 模式按钮 index
export const MODE_BTNS = {
  STRONG_WASHING: 0, // 强劲洗
  ENERGY_SAVING_WASH: 1, // 节能洗
  ANTI_BACTERIAL_WASH: 2, // 除菌洗
  INSTANT_WASH: 3, // 即时洗
  QUICK_WASH: 4, // 快速洗
  HOT_AIR_DRYING: 5, // 单烘干
  DISINFECT: 6, // 单消毒
  DRY_AND_DISINFECT: 7, // 消毒烘干
};

// 模式按钮
export const MOD_ID = {
  HOT_AIR_DRYING: 0, // 单烘干
  DISINFECT: 0, // 消毒
  QUICK_WASH: process.env.VUE_APP_MID === DW_MID_828B00 ? 5 : 3, // 快速洗
};


// 828b00 模式ID
export const MOD_828B00 = {
  FastWash: 5, // 快速洗
};

export const MOD_NONE = 0; // 空模式用于 单烘干、单消毒、烘干消毒

export const BtnClassName = {
  blue: 'btn-blue',
  yellow: 'btn-yellow',
};

export const ModeTheme = {
  blue: 'blue',
  yellow: 'yellow',
};

export const BarColor = {
  blue: '#0880ee',
  yellow: '#f6b039', // 烘干
  yellow1: '#f6bb42', // 除菌烘干
  black: '#000000',
  white: '#f4f4f4',
};

export const WORK_STATUS = {
  CHARGE_WATER: 1, // 进水中
  WASHING: 2, // 洗涤中
  WASH_AND_WARNING: 3, // 洗涤加热中
  DISCHARGE_WATER: 4, // 排水中
  DRYING: 5, // 烘干中
  PURIFYING: 6, // 保洁中
};

export const PRIMARY_BAR_COLOR = '#0980ee';
export const LIGHT_BAR_COLOR = '#f4f4f4';
export const DARK_BAR_COLOR = '#2a2a2a';

// 普通模式保洁时间
export const NORMAL_MOD_PURIFIER_LIST = [6, 12, 24, 48, 72, 96];
