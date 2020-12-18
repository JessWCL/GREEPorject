/** mutations */
export const SET_MAC = 'SET_MAC'; // 设置mac
export const SET_FUNCTYPE = 'SET_FUNCTYPE'; // 设置functype
export const SET_DATA_OBJECT = 'SET_DATA_OBJECT'; // 设备的各种状态
export const SET_DEVICE_INFO = 'SET_DEVICE_INFO'; // 设置deviceInfo
export const LOCAL_DEVICE_INFO = 'LOCAL_DEVICE_INFO';

export const SET_CACHE = 'SET_CACHE';

// 根据业务逻辑修改

/** actions */
export const INIT = 'INIT'; // cordov初始化后调用的方法
export const PARSE_DATA_BY_COLS = 'PARSE_DATA_BY_COLS';
export const INIT_TIMER_GET_DEVICE_DATA = 'INIT_TIMER_GET_DEVICE_DATA';
export const INIT_DEVICE_DATA = 'INIT_DEVICE_DATA'; // 初始化设备数据
export const GET_DEVICE_INFO = 'GET_DEVICE_INFO'; // 获取设备信息
export const GET_DEVICE_STATES = 'GET_DEVICE_STATES'; // 获取设备状态
export const GET_WORK_DEVICE_STATES = 'GET_WORK_DEVICE_STATES'; // 获取设备工作中状态

export const SEND_CTRL = 'SEND_CTRL'; // 发送控制指令
