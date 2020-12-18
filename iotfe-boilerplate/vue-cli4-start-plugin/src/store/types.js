/** mutations */
export const SET_MAC = 'SET_MAC'; // 设置mac
export const SET_FUNCTYPE = 'SET_FUNCTYPE'; // 设置functype
export const SET_DEVICE_INFO = 'SET_DEVICE_INFO'; // 设置deviceInfo
export const SET_DATA_OBJECT = 'SET_DATA_OBJECT'; // 设备的各种状态

// 根据业务逻辑修改

/** actions */
export const INIT = 'INIT'; // cordov初始化后调用的方法
export const INIT_DEVICE_DATA = 'INIT_DEVICE_DATA'; // 初始化设备数据
export const GET_DEVICE_INFO = 'GET_DEVICE_INFO'; // 获取设备信息
export const GET_DEVICE_DATA = 'GET_DEVICE_DATA'; // 获取设备状态
export const PARSE_DATA_BY_COLS = 'PARSE_DATA_BY_COLS'; // 根据DeviceInfo解析设备数据
export const MQTT_CALLBACK = 'MQTT_CALLBACK'; // 原生调用插件的mqtt回调方法
export const TIMER_GET_ALL_DEVICE_STATES = 'TIMER_GET_ALL_DEVICE_STATES'; // 初始化定时器轮询设备数据
export const GET_WORKING_DEVICE_STATES = 'GET_WORKING_DEVICE_STATES'; // 获取设备信息，用于更新刚启动后更新工作状态
export const SEND_CTRL = 'SEND_CTRL'; // 发送控制指令
export const SEND_FUNCTYPE_CTRL = 'SEND_FUNCTYPE_CTRL'; // 保存场景控制指令
