/** mutations */
export const DEV_NAME = 'DEV_NAME'; // 设备名称
export const SET_DEVICE_INFO = 'SET_DEVICE_INFO'; // 设置deviceInfo
export const SET_MAC = 'SET_MAC'; // 设置mac
export const SET_DATA_OBJECT = 'SET_DATA_OBJECT'; // 设备的各种状态
export const IS_SCENE = 'IS_SCENE'; // 是否场景模式

// 当前用户信息
export const USER_INFO = 'USER_INFO';
export const EDIT_USER_INFO = 'EDIT_USER_INFO';

export const SET_USER_LIST = 'SET_USER_LIST';

// 用户体脂数据赋值
export const SET_USER_MESSAGE = 'SET_USER_MESSAGE';
// 根据业务逻辑修改

// 设置当前指标数据
export const SET_KPI_VALUE = 'SET_KPI_VALUE';

/** actions */
export const GET_DEVICE_INFO = 'GET_DEVICE_INFO'; // 获取设备信息
export const GET_TUYA_INFO = 'GET_TUYA_INFO'; // 获取涂鸦信息
export const GET_ALL_STATES = 'GET_ALL_STATES'; // 获取全部状态

// 涂鸦体脂称接口
export const GET_USER_LIST = 'GET_USER_LIST'; // 获取用户列表
// 保存修改单个信息
export const GET_USER_UPDATE = 'GET_USER_UPDATE';
// 删除用户信息
export const GET_USER_DELETE = 'GET_USER_DELETE';
// 获取用户体脂数据
export const GET_USER_MESSAGE = 'GET_USER_MESSAGE';
// 获取历史数据
export const GET_HISTORY_MESSAGE = 'GET_HISTORY_MESSAGE';

// 存给主体用户
export const SET_USER_SAVE = 'SET_USER_SAVE';

// 涂鸦体脂秤删除单个体重数据接口
export const DELETE_WEIGH_DATA = 'DELETE_WEIGH_DATA';

// 给主体提供方法
export const UPDATE_DATA_FOR_PLUGIN = 'UPDATE_DATA_FOR_PLUGIN';
