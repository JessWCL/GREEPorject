import { CouponList } from "vant";

/*
 * @Author: Jerry-Rain
 * @Date: 2019-08-09 14:43:49
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-06-22 16:14:43
 * @Description: 
 */
/** mutations */
export const DEV_NAME = 'DEV_NAME'; // 设备名称
export const SET_DEVICE_INFO = 'SET_DEVICE_INFO'; // 设置deviceInfo
export const SET_MAC = 'SET_MAC'; // 设置mac
export const SET_MAIN_MAC = 'SET_MAIN_MAC'; // 设置mainMac
export const SET_MESHID = 'SET_MESHID'; // 设置meshId 
export const SET_SWITCHNUM = 'SET_SWITCHNUM'; // 设置switchNum
export const SET_SCROLL_Y = 'SET_SCROLL_Y'; // 设置滚动Y轴位置
export const SET_DATA_OBJECT = 'SET_DATA_OBJECT'; // 设备的各种状态
export const IS_SCENE = 'IS_SCENE'; // 是否场景模式
export const SET_TYPE = 'SET_TYPE'; // 删除模式
export const SET_CLOUD_TIMER = 'SET_CLOUD_TIMER'; // 设置云定时


// 根据业务逻辑修改

/** actions */
export const GET_DEVICE_INFO = 'GET_DEVICE_INFO'; // 获取设备信息
export const GET_ALL_STATES = 'GET_ALL_STATES'; // 获取全部状态
export const SEND_CTRL = 'SEND_CTRL'; // 发送控制指令

// Jerry 业务需要自己添加
export const GET_TIMERLIST = 'GET_TIMERLIST'; // 获取定时列表
export const SET_TIMERLIST = 'SET_TIMERLIST'; // 设置时间列表
export const SEND_TIMER = 'SEND_TIMER'; // 设置时间列表
export const MODIFY_TIMER = 'MODIFY_TIMER'; // 修改使能开关状态
export const FORMAT_TIMERLIST = 'FORMAT_TIMERLIST'; // 格式化查询返回的时间
export const STOP_TIMER = 'STOP_TIMER'; // 停止轮询
export const BEGIN_TIMER = 'BEGIN_TIMER'; // 开始轮询
export const GET_CLOUD_TIMER_LIST = 'GET_CLOUD_TIMER_LIST'; // 获取云定时列表
// export const MODYFY_TIMERLIST = 'MODYFY_TIMERLIST'; // 修改 定时列表
