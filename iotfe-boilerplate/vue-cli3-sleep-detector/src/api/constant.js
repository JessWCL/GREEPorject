/*
 * @Author: Jerry-Rain
 * @Date: 2020-06-19 12:05:15
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-09-25 14:30:29
 * @Description: 
 */
// 开发环境
export const __DEV__ = process.env.NODE_ENV === 'development';
// 生产环境
export const __PROD__ = process.env.NODE_ENV === 'production';
// 测试环境
export const __TEST__ = process.env.NODE_ENV === 'testing';
// 本地缓存deviceInfo键名
export const LOCAL_STORAGE_DEVICE_INFO = `MID_${process.env.VUE_APP_MID}_DEVICE_INFO`;

export const DEFAULT_COLOR = '#2D71DC';
