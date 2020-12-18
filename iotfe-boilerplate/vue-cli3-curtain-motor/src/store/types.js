/*
 * @Descripttion: 
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2019-09-09 14:12:03
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2019-11-28 11:29:42
 */
/** mutations */
export const DEV_NAME = 'DEV_NAME'; // 设备名称
export const SET_DEVICE_INFO = 'SET_DEVICE_INFO'; // 设置deviceInfo
export const SET_MAC = 'SET_MAC'; // 设置mac
export const SET_DATA_OBJECT = 'SET_DATA_OBJECT'; // 设备的各种状态
export const IS_SCENE = 'IS_SCENE'; // 是否场景模式
export const CHANGE_STATUS = 'CHANGE_STATUS'; // 改变按钮状态
export const SET_UILOCK = 'SET_UILOCK'; // set uilock
export const SET_ISFIRST = 'SET_ISFIRST'; // set isfirst
// 根据业务逻辑修改

/** actions */
export const GET_DEVICE_INFO = 'GET_DEVICE_INFO'; // 获取设备信息
export const GET_THIRD_INFO = 'GET_THIRD_INFO'; // 获取第三方信息（欧瑞博|涂鸦）
export const GET_ALL_STATES = 'GET_ALL_STATES'; // 获取全部状态
export const SEND_CTRL = 'SEND_CTRL'; // 发送控制指令
