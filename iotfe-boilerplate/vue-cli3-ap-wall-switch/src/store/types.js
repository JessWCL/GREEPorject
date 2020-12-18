/*
 * @Author: Jerry-Rain
 * @Date: 2020-04-22 14:07:56
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-07-22 14:23:44
 * @Description: 
 */
/** mutations */
export const DEV_NAME = 'DEV_NAME'; // 设备名称
export const SET_DEVICE_INFO = 'SET_DEVICE_INFO'; // 设置deviceInfo
export const SET_MAC = 'SET_MAC'; // 设置mac
export const SET_PATH_NAME = 'SET_PATH_NAME'; // 设置pathName
export const SET_SCROLL_Y = 'SET_SCROLL_Y'; // 设置滚动Y轴位置
export const SET_DATA_OBJECT = 'SET_DATA_OBJECT'; // 设备的各种状态
export const SET_CHART_DATA = 'SET_CHART_DATA'; // 图表数据
export const IS_SCENE = 'IS_SCENE'; // 是否场景模式
export const SET_TOTAL = 'SET_TOTAL'; // 所有用电量

// 根据业务逻辑修改

/** actions */
export const GET_DEVICE_INFO = 'GET_DEVICE_INFO'; // 获取设备信息
export const GET_ALL_STATES = 'GET_ALL_STATES'; // 获取全部状态
export const SEND_CTRL = 'SEND_CTRL'; // 发送控制指令
export const GET_CLOUD_TIMER_LIST = 'GET_CLOUD_TIMER_LIST'; // 获取云定时列表

export const GET_DAY_ELE_USED = 'GET_DAY_ELE_USED'; // 获取日定时
export const GET_MONTH_ELE_USED = 'GET_MONTH_ELE_USED'; // 获取月定时
