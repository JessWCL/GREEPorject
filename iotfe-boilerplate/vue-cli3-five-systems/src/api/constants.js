// 生产环境
export const __PROD__ = process.env.NODE_ENV === 'production';
// 开发环境
export const __DEV__ = process.env.NODE_ENV === 'development';
// 测试环境
export const __TEST__ = process.env.NODE_ENV === 'testing';

export const isChina = process.env.VUE_APP_MID === '90000';
export const isThailand = process.env.VUE_APP_MID === '90001';
