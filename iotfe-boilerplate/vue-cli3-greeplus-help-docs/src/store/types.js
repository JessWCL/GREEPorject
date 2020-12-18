/** mutations */
export const SET_MAC = 'SET_MAC'; // 设置mac
export const SET_FUNCTYPE = 'SET_FUNCTYPE'; // 设置functype
export const SET_DEVICE_INFO = 'SET_DEVICE_INFO'; // 设置deviceInfo
export const SET_DATA_OBJECT = 'SET_DATA_OBJECT'; // 设备的各种状态
export const SET_IS_SCENE = 'SET_IS_SCENE'; // 设置是否场景模式
export const SET_ALL_HELPDOC_ITEMS = 'SET_ALL_HELPDOC_ITEMS'; // 设置所有帮助文档内容
export const SET_TOP_HELPDOC_ITEMS = 'SET_TOP_HELPDOC_ITEMS'; // 设置点击量前8的帮助文档项
export const IS_DATA_INIT = 'IS_DATA_INIT'; // 数据是否获取到了，刷新页面需要监听数据的变化
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
