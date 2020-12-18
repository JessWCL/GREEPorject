/*
 * @Descripttion: 
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2020-03-17 15:43:46
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-03-18 17:01:31
 */
/** mutations */
export const DEV_NAME = 'DEV_NAME'; // 设备名称
export const SET_DEVICE_INFO = 'SET_DEVICE_INFO'; // 设置deviceInfo
export const SET_MAC = 'SET_MAC'; // 设置mac
export const SET_SCROLL_Y = 'SET_SCROLL_Y'; // 设置滚动Y轴位置
export const SET_DATA_OBJECT = 'SET_DATA_OBJECT'; // 设备的各种状态
export const IS_SCENE = 'IS_SCENE'; // 是否场景模式
export const IS_ERROR = 'IS_ERROR'; // 是否故障
export const SET_PM2P5 = 'SET_PM2P5'; // 设置pm2.5,场景中使用
export const SET_DISINFECT = 'SET_DISINFECT'; //设置消毒，场景中使用
export const SET_DEVICE_DATA = 'SET_DEVICE_DATA'; // 设备的各种状态

// 根据业务逻辑修改

/** actions */
export const GET_DEVICE_INFO = 'GET_DEVICE_INFO'; // 获取设备信息
export const GET_ALL_STATES = 'GET_ALL_STATES'; // 获取全部状态
export const SEND_CTRL = 'SEND_CTRL'; // 发送控制指令
