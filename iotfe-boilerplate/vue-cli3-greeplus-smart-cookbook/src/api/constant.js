// 开发环境
export const __DEV__ = process.env.NODE_ENV === 'development';
// 生产环境
export const __PROD__ = process.env.NODE_ENV === 'production';
// 测试环境
export const __TEST__ = process.env.NODE_ENV === 'testing';
// 分享
export const __SHARE__ = process.env.NODE_ENV === 'development' && process.env.VUE_APP_SHARE === 'true';

const ua = navigator.userAgent;
export const isIPhone = /iPhone/i.test(ua);

export const INIT_DATA = { count: 0, data: [] };
export const INIT_DATA2 = { count: 0, data: [], dataMsg: {} }; // dataMsg for detail steps

export const GREE_REST_ASIA = 'http://grih.gree.com';
export const GREE_REST_ASIA_TEST = 'http://testgrih.gree.com';
export const GREE_REST_ASIA_DEV = '';

export const DeviceRiceCooker = { mid: '1', deviceType: 'rice_cooker', deviceTypeName: '电饭煲' };
export const DeviceSteamingBaking = { mid: '2', deviceType: 'steaming_baking', deviceTypeName: '蒸烤双能机' };
export const DeviceHotPot = { mid: '3', deviceType: 'hot_pot', deviceTypeName: '电火锅' };
export const DeviceNull = { mid: '', deviceType: '', deviceTypeName: '' };

// 搜索历史记录
export const LS_KEY_GREE_SMART_COOKBOOK_HISTORY_LIST = 'LS_KEY_GREE_SMART_COOKBOOK_HISTORY_LIST';
