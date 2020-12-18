/** mutations */
export const DEV_NAME = 'DEV_NAME'; // 设备名称
export const SET_DEVICE_INFO = 'SET_DEVICE_INFO'; // 设置deviceInfo
export const SET_DEVICE_LIST = 'SET_DEVICE_LIST'; // 设置房间内设备相关信息
export const SET_MAC = 'SET_MAC'; // 设置mac
export const SET_DATA_OBJECT = 'SET_DATA_OBJECT'; // 设备的各种状态
export const SET_DATA_OBJECT_CACHE = 'SET_DATA_OBJECT_CACHE'; // 设备的各种缓存状态
export const IS_SCENE = 'IS_SCENE'; // 是否场景模式
export const SET_IS_APPOINTMENT = 'SET_IS_APPOINTMENT'; // 是否预约
export const SET_IS_APPOINTMENT_DETAIL = 'SET_IS_APPOINTMENT_DETAIL'; // 是否预约
export const SET_SELECTED_LIST3_ITEM = 'SET_SELECTED_LIST3_ITEM'; // 是否预约

export const SET_POW = 'SET_POW';
export const SET_RUNSTAT = 'SET_RUNSTAT';
export const SET_MOD = 'SET_MOD';
export const SET_LIST1 = 'SET_LIST1';
export const SET_LIST2 = 'SET_LIST2';
export const SET_LIST3 = 'SET_LIST3';
export const SET_LIST4 = 'SET_LIST4';
export const SET_LIST5 = 'SET_LIST5';
export const SET_SET_HOUR = 'SET_SET_HOUR';
export const SET_SET_MIN = 'SET_SET_MIN';
export const SET_SET_TMP = 'SET_SET_TMP';
export const SET_TMR_HOUR = 'SET_TMR_HOUR';
export const SET_TMR_MIN = 'SET_TMR_MIN';
export const SET_PAUSE = 'SET_PAUSE';
export const SET_DIS_TMP = 'SET_DIS_TMP';
export const SET_DIS_SET_HOUR = 'SET_DIS_SET_HOUR';
export const SET_DIS_SET_MIN = 'SET_DIS_SET_MIN';
export const SET_DIS_TMR_HOUR = 'SET_DIS_TMR_HOUR';
export const SET_DIS_TMR_MIN = 'SET_DIS_TMR_MIN';
export const SET_MACH_STAT = 'SET_MACH_STAT';
export const SET_TMP_CTRL = 'SET_TMP_CTRL';
export const SET_CHILD_LOCK = 'SET_CHILD_LOCK';
export const SET_ESTATE1 = 'SET_ESTATE1';
export const SET_ESTATE2 = 'SET_ESTATE2';
export const SET_ESTATE3 = 'SET_ESTATE3';
export const SET_ESTATE4 = 'SET_ESTATE4';
export const SET_ESTATE5 = 'SET_ESTATE5';
export const SET_FAVORITE_MENU = 'SET_FAVORITE_MENU'; // 我的菜单本地收藏
export const SET_FAVORITE_MENU_CLOUD = 'SET_FAVORITE_MENU_CLOUD'; // 我的菜单云收藏

// 根据业务逻辑修改
export const IS_FUNCTION_LIST_POPUP_SHOW = 'IS_FUNCTION_LIST_POPUP_SHOW';
export const IS_MOREBTN = 'IS_MOREBTN';
export const IS_TIME = 'IS_TIME';
export const IS_SLEEP = 'IS_SLEEP';
export const RE_FRESH = 'RE_FRESH';
export const SET_TIME = 'SET_TIME';
export const SEND_TIME = 'SEND_TIME';
export const QUERY_TIME = 'QUERY_TIME';
export const GET_TIMELIST = 'GET_TIMELIST';
export const SET_IS_SHRINK_ONRESIZE = 'SET_IS_SHRINK_ONRESIZE';

/** actions */
export const DISPOSE = 'DISPOSE'; // 清空状态
export const SUBPACKAGE_SEND_DATA_TO_DEVICE = 'SUBPACKAGE_SEND_DATA_TO_DEVICE'; // 分包查询设备状态
export const SEND_DATA_TO_DEVICE = 'SEND_DATA_TO_DEVICE'; //查询设备状态
export const UPDATE_STATES = 'UPDATE_STATES'; // 更新小卡片状态
export const GET_DEVICE_INFO = 'GET_DEVICE_INFO'; // 获取设备信息
export const GET_DEVICE_DATA_BY_URL = 'GET_DEVICE_DATA_BY_URL'; // URL的设备信息
export const GET_ALL_STATES = 'GET_ALL_STATES'; // 获取全部状态
export const QUERY_WORKING_STATE = 'QUERY_WORKING_STATE'; // 获取工作中的状态
export const SEND_CTRL = 'SEND_CTRL'; // 发送控制指令
export const QUERY_MENU = 'QUERY_MENU'; // 查询云菜单
export const SAVE_MENU = 'SAVE_MENU'; // 保存云菜单
export const SAVE_MENU_FOR_FAVORITE_PAGE = 'SAVE_MENU_FOR_FAVORITE_PAGE'; // 保存云菜单
export const DELETE_MENU = 'DELETE_MENU'; // 删除云菜单
export const SET_USER_DATA_FAVORITE_MENU = 'SET_USER_DATA_FAVORITE_MENU'; // 保存用户自定义数据
export const GET_USER_DATA_FAVORITE_MENU = 'GET_USER_DATA_FAVORITE_MENU'; // 读取用户自定义数据

// 云菜单
export const SEARCH_CLOUD_MENU = 'SEARCH_CLOUD_MENU';
export const GET_CLOUD_MENU_LIST = 'GET_CLOUD_MENU_LIST';
export const SET_COUNT_CLOUD_MENU_LIST = 'SET_COUNT_CLOUD_MENU_LIST';
export const SET_CLOUD_MENU_LIST = 'SET_CLOUD_MENU_LIST';
export const APPEND_CLOUD_MENU_LIST = 'APPEND_CLOUD_MENU_LIST'; // 追加云菜单
export const GET_CLOUD_MENU_DETAIL_STEPS = 'GET_CLOUD_MENU_DETAIL_STEPS';
export const SET_CLOUD_MENU_DETAIL_STEPS = 'SET_CLOUD_MENU_DETAIL_STEPS';
