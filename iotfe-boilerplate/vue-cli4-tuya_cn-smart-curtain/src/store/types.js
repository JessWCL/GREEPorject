/** mutations */
export const DEV_NAME = 'DEV_NAME'; // 设备名称
export const SET_DEVICE_INFO = 'SET_DEVICE_INFO'; // 设置deviceInfo
export const SET_MAC = 'SET_MAC'; // 设置mac
export const SET_DATA_OBJECT = 'SET_DATA_OBJECT'; // 设备的各种状态
export const IS_SCENE = 'IS_SCENE'; // 是否场景模式

// 根据业务逻辑修改
export const SET_VOICE_TEXT = 'SET_VOICE_TEXT'; // 设置语音text
export const IS_MOREBTN = 'IS_MOREBTN';
export const IS_TIME = 'IS_TIME';
export const IS_SLEEP = 'IS_SLEEP';
export const SET_TIME = 'SET_TIME';
export const SEND_TIME = 'SEND_TIME';
export const QUERY_TIME = 'QUERY_TIME';
export const GET_TIMELIST = 'GET_TIMELIST';

/** actions */
export const INIT_DEVICE_DATA = 'INIT_DEVICE_DATA'; // 初始化设备数据
export const GET_DEVICE_INFO = 'GET_DEVICE_INFO'; // 获取设备信息（欧瑞博|涂鸦）
export const GET_TUYA_DEVICE_INFO = 'GET_TUYA_DEVICE_INFO'; // 获取设备信息（欧瑞博|涂鸦）
export const INIT_TIMER_GET_DEVICE_DATA = 'INIT_TIMER_GET_DEVICE_DATA'; // 获取全部状态
export const GET_THIRD_INFO = 'GET_THIRD_INFO'; // 获取第三方信息（欧瑞博|涂鸦）
export const TUYA_CONTROL_DEV = 'TUYA_CONTROL_DEV'; // 发送控制指令
