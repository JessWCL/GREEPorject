/*
 * @Descripttion: 
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2019-11-18 15:05:08
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-05-14 10:13:34
 */
/** mutations */
/* *******************请勿修改***************start************ */
export const DEV_NAME = 'DEV_NAME'; // 设备名称
export const SET_DEVICE_INFO = 'SET_DEVICE_INFO'; // 设置deviceInfo
export const SET_MAC = 'SET_MAC'; // 设置mac
export const SET_SHOW_DATA = 'SET_SHOW_DATA'; // 设备的显示状态
export const SET_DATA_OBJECT = 'SET_DATA_OBJECT'; // 设备的各种状态
export const SET_FUNCTYPE = 'SET_FUNCTYPE'; // 是否场景模式
export const IS_SCENE = 'IS_SCENE'; // 是否场景模式
export const SET_ISDEBUG = 'SET_ISDEBUG'; // 是否debug
export const EDIT_ENABLE = 'EDIT_ENABLE'; // 是否是消息界面
/* *******************请勿修改***************end************ */

// 业务逻辑
export const SET_STATUS_LIST = 'SET_STATUS_LIST'; // 设置目前的状态数据列表 热泵用
export const QUERY_FAVOURITE = 'QUERY_FAVOURITE'; // 收藏夹 热泵用
export const ERROR_STATUS = 'ERROR_STATUS'; // 故障提醒类字段

// 根据业务逻辑修改
export const SET_VOICE_TEXT = 'SET_VOICE_TEXT'; // 设置语音text

/** actions, 请勿修改 */
export const GET_DEVICE_INFO = 'GET_DEVICE_INFO'; // 获取设备信息
export const GET_ALL_STATES = 'GET_ALL_STATES'; // 获取全部状态
export const GET_ONCE_STATES = 'GET_ONCE_STATES'; // 获取一包数据
export const SEND_CTRL = 'SEND_CTRL'; // 发送控制指令
export const GET_ALL_STATES_TWO = 'GET_ALL_STATES_TWO';
