/** mutations */
export const SET_MAC = 'SET_MAC'; // 设置mac
export const SET_LOADING = 'SET_LOADING'; // 设置 loading
export const SET_FUNCTYPE = 'SET_FUNCTYPE'; // 设置functype
export const SET_DEVICE_INFO = 'SET_DEVICE_INFO'; // 设置deviceInfo
export const SET_DATA_OBJECT = 'SET_DATA_OBJECT'; // 设备的各种状态
export const SET_IS_SCENE = 'SET_IS_SCENE'; // 设置是否场景模式

// 根据业务逻辑修改

/** actions */
export const INIT = 'INIT'; // cordov初始化后调用的方法
export const INIT_DEVICE_DATA = 'INIT_DEVICE_DATA'; // 初始化设备数据
export const INIT_TIMER_GET_DEVICE_DATA = 'INIT_TIMER_GET_DEVICE_DATA'; // 初始化定时器轮询设备数据
export const PARSE_DATA_BY_COLS = 'PARSE_DATA_BY_COLS'; // 根据DeviceInfo解析设备数据
export const GET_DEVICE_INFO = 'GET_DEVICE_INFO'; // 获取设备信息
export const GET_WORKING_DEVICE_STATES = 'GET_WORKING_DEVICE_STATES'; // 获取设备信息，用于更新刚启动后更新工作状态
export const GET_DEVICE_STATES = 'GET_DEVICE_STATES'; // 获取设备状态
export const SEND_CTRL = 'SEND_CTRL'; // 发送控制指令

// 获取报告
export const GET_DAY_REPORT = 'GET_DAY_REPORT'; // 日报告
export const GET_WEEK_REPORT = 'GET_WEEK_REPORT'; // 周报告
export const GET_MONTH_REPORT = 'GET_MONTH_REPORT'; // 月报告

// 查询实时数据
export const SEARCH_REALTIME_DATA = 'SEARCH_REALTIME_DATA'; // 查询实时数据
export const SEARCH_POWER_DATA = 'SEARCH_POWER_DATA'; // 查询电池电量

// 设置报告数据
export const SET_DATA_MID_STATE = 'SET_DATA_MID_STATE'; // 设置对应mid的state

