/*
 * @Descripttion: 
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2020-03-17 15:43:46
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-03-30 19:08:17
 */
const state = {
  mac: '', // 设备mac
  isScene: 0, // 是否是场景模式
  isError: false, // 是否故障
  dataObject: {
    Pow: 1, // 开关
    mode: 1, // 模式 2自动 3睡眠 4快速 5消毒
    light: 0, // 灯光  
    // AirChildLock: 0, // 童锁  改需求后未用到
    FiltUPercent: 1.1, // 滤网1剩余寿命比百分比 HEPS
    FiltUPercent1: 50.1, // 滤网2剩余寿命比百分比 还原网
    FiltUPercent2: 100, // 滤网3剩余寿命比百分比 极板
    wipm25: 33, // PM2.5值（入口） 颜色跟随这个改变

    // StTmr: 0, // 定时时长 改需求后未用到
    // TmrOff: 0, // 是否定时关机 改需求后未用到
    // TmrOn: 0, // 是否定时启动 改需求后未用到

    JFerr: 0, // 通讯故障
    estate: 0, // 故障
    estate1: 0, // 故障1
    estate2: 0, // 故障2
    sterilize: 0, //消毒
    
    // 以下暂未用到
    // MeshWarning1: 1, // 提醒
    // wopm25: 0, // PM2.5值（出口）
    // TmrStatus: 0, // 定时动作 0关机 1开机（新增）
    // TmrHour: 0, // 定时小时（新增）
    // TmrMin: 0, // 定时分钟（新增）
    // FiltUT: 0, // 滤网已使用时间 
    // FiltBT: 0, // 初效网/电极板已使用时间
    // LifeTimeMesh_1: 100, // 滤网1剩余寿命百分比 （新增）
    // LifeTimeMesh_2: 100, // 滤网2剩余寿命百分比 （新增）

    // MeshWarning_1: 0, // 第一级滤芯寿命到期提醒 （新增）
  },
  remarks_on: {
    mode: ['', '', '自动', '睡眠', '快速', '消毒'],
  },
  remarks_off: {},
  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: '', // 语言
    name: '净化器'
  },
  deviceData: {},
};
export default state;
