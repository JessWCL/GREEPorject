/** mutations */
export const DEV_NAME = 'DEV_NAME'; // 设备名称
export const COOK_REQUIRETIME = 'COOK_REQUIRETIME'; // 烹饪时间
export const MODE_NAME = 'MODE_NAME'; // 模式名称
export const SET_FUNCTYPE = 'SET_FUNCTYPE'; // 是否场景
export const IS_MODE = 'IS_MODE'; // 是否是在Mode界面
export const IS_WARN = 'IS_WARN'; // 是否显示定时时间范围
export const IS_ABOUT = 'IS_ABOUT'; // 是否显示“约2小时3分钟”的“约”
export const ADJUSTIME = 'ADJUSTIME'; // 预约界面的定时时间范围显示
export const SET_DEVICE_INFO = 'SET_DEVICE_INFO'; // 设置deviceInfo
export const SET_MAC = 'SET_MAC'; // 设置mac
export const SET_DATA_OBJECT = 'SET_DATA_OBJECT'; // 设置饭煲的各种状态
export const SET_CURRENT_MODE = 'SET_CURRENT_MODE'; // 设置饭煲的各种状态
export const UPDATE_DATA_OBJECT = 'UPDATE_DATA_OBJECT'; // 更新饭煲状态
export const SET_UNLOCK = 'SET_UNLOCK'; // 状态锁
export const SET_VOICE_TEXT = 'SET_VOICE_TEXT'; // 设置语音text
export const SET_FIRLOAD_DATA = 'SET_FIRLOAD_DATA'; // 从小卡片点进来，第一次加载数据时煲仔饭不弹框
export const SET_MODE_LIST = 'SET_MODE_LIST'; // 设置模式列表
export const SET_ACTIVE_MODE = 'SET_ACTIVE_MODE'; // 设置选中的模式
export const SET_ISDEBUG = 'SET_ISDEBUG'; // 是否debug
export const SET_NOTIFY = 'SET_NOTIFY'; // 是否是从消息点进故障界面的
export const SET_LOCK = 'SET_LOCK'; // UI锁

export const EDIT_ENABLE = 'EDIT_ENABLE';

export const SET_IS_MENU_SELECTED = 'SET_IS_MENU_SELECTED';

/** actions */
export const GET_ALL_STATES = 'GET_ALL_STATES'; // 获取全部状态
export const SEND_CTRL = 'SEND_CTRL'; // 发送控制指令
export const GET_DEVICE_INFO = 'GET_DEVICE_INFO'; // 获取设备信息
export const MQTT_INIT = 'MQTT_INIT'; // cordov初始化后调用的方法
export const MQTT_CALLBACK = 'MQTT_CALLBACK'; // 原生调用插件的mqtt回调方法
