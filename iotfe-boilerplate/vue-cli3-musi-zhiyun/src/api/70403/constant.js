/*
 * @Author: Jerry-Rain
 * @Date: 2020-04-09 16:59:04
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-04-09 16:59:15
 * @Description:
 */

// 生产环境
export const __PROD__ = process.env.NODE_ENV === 'production';
// 开发环境
export const __DEV__ = process.env.NODE_ENV === 'development';
// 测试环境
export const __TEST__ = process.env.NODE_ENV === 'testing';
