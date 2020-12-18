// 开发环境
export const __DEV__ = process.env.NODE_ENV === 'development';
// 生产环境
export const __PROD__ = process.env.NODE_ENV === 'production';
// 测试环境
export const __TEST__ = process.env.NODE_ENV === 'testing';
// 本地缓存deviceInfo键名
export const LOCAL_STORAGE_DEVICE_INFO = `MID_${process.env.VUE_APP_MID}_DEVICE_INFO`;

export const DEFAULT_COLOR = '#000000';

export const CATEGORY_MAP = {
  配网: 'network',
  账号: 'account',
  设备: 'device',
  其他: 'other',
  network: '配网',
  account: '账号',
  device: '设备',
  other: '其他'
};
