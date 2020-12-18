/** mutations */
export const DEV_NAME = 'DEV_NAME'; // 设备名称
export const SET_DEVICE_INFO = 'SET_DEVICE_INFO'; // 设置deviceInfo
export const SET_MAC = 'SET_MAC'; // 设置mac
export const SET_SCROLL_Y = 'SET_SCROLL_Y'; // 设置滚动Y轴位置
export const SET_DATA_OBJECT = 'SET_DATA_OBJECT'; // 设备的各种状态
export const SET_DATA_OBJECT_CACHE = 'SET_DATA_OBJECT_CACHE'; // 设备的各种状态缓存
export const IS_SCENE = 'IS_SCENE'; // 是否场景模式
export const INIT_SEARCH_CLOUD_MENU = 'INIT_SEARCH_CLOUD_MENU'; // 初始化云菜谱列表
export const SET_SEARCH_CLOUD_MENU = 'SET_SEARCH_CLOUD_MENU'; // 设置云菜谱列表
export const APPEND_SEARCH_CLOUD_MENU = 'APPEND_SEARCH_CLOUD_MENU'; // 追加云菜谱列表
export const SET_GLOBAL_SEARCH_CLOUD_MENU = 'SET_GLOBAL_SEARCH_CLOUD_MENU'; // 设置全局菜谱关键字搜索列表
export const APPEND_GLOBAL_SEARCH_CLOUD_MENU = 'APPEND_GLOBAL_SEARCH_CLOUD_MENU'; // 追加全局菜谱关键字搜索列表
export const INIT_GLOBAL_SEARCH_CLOUD_MENU = 'INIT_GLOBAL_SEARCH_CLOUD_MENU'; // 初始化全局菜谱关键字搜索列表
export const INIT_CLOUD_MENU_DETAIL_STEPS = 'INIT_CLOUD_MENU_DETAIL_STEPS'; // 初始化云菜谱详情
export const SET_CLOUD_MENU_DETAIL_STEPS = 'SET_CLOUD_MENU_DETAIL_STEPS'; // 设置云菜谱详情
export const SET_RECOMMENDED_MENU = 'SET_RECOMMENDED_MENU'; // 设置一日三餐推荐菜谱
export const SET_DISH_FROM_BASKET = 'SET_DISH_FROM_BASKET'; // 设置菜篮子列表
export const SET_SHARE_DISH_BASKET = 'SET_SHARE_DISH_BASKET'; // 设置分享链接

// 根据业务逻辑修改

/** actions */
export const GET_DEVICE_INFO = 'GET_DEVICE_INFO'; // 获取设备信息
export const GET_ALL_STATES = 'GET_ALL_STATES'; // 获取全部状态
export const SEND_CTRL = 'SEND_CTRL'; // 发送控制指令
export const GET_SEARCH_CLOUD_MENU = 'GET_SEARCH_CLOUD_MENU'; // 搜索云菜谱列表
export const GET_GLOBAL_SEARCH_CLOUD_MENU = 'GET_GLOBAL_SEARCH_CLOUD_MENU'; // 全局菜谱关键字搜索
export const GET_GLOBAL_RECOMMENDED_MENU = 'GET_GLOBAL_RECOMMENDED_MENU'; // 全局菜谱推荐搜索
export const GET_CLOUD_MENU = 'GET_CLOUD_MENU'; // 获取云菜谱列表
export const GET_CLOUD_MENU_DETAIL_STEPS = 'GET_CLOUD_MENU_DETAIL_STEPS'; // 获取云菜谱详情
export const SHARE_DISH_BASKET = 'SHARE_DISH_BASKET'; // 分享菜单

// http://grih.gree.com/app/GetRecommendedMenu
export const GET_RECOMMENDED_MENU = 'GET_RECOMMENDED_MENU'; // 获取一日三餐推荐菜谱
export const GET_DISH_FROM_BASKET = 'GET_DISH_FROM_BASKET'; // 获取菜篮子列表
export const GET_SHARE_DISH_BASKET = 'GET_SHARE_DISH_BASKET'; // 获取分享菜篮子列表
export const ADD_DISH_TO_BASKET = 'ADD_DISH_TO_BASKET'; // 添加菜谱到菜篮子
export const REMOVE_DISH_FROM_BASKET = 'REMOVE_DISH_FROM_BASKET'; // 从菜篮子里移除菜谱
