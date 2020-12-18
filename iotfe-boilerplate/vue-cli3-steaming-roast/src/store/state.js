import { GET_ALL } from '@/api/828d04/constant';

const state = {
  mac: '', // 设备mac
  functype: 0, // 0代表正常，1代表集中控制
  isScene: 0, // 是否是场景模式
  isMorebtn: false, // 功能详细
  isTime: false,
  isSleep: 0,
  reFresh: 0,
  selectedList3Item: undefined, // 选择List3对象
  isAppointment: false, // 是否预约
  isAppointmentDetail: false, // 是否预约
  countCloudMenuList: 0, // 云菜单总数量
  cloudMenuList: [], // 云菜单
  cloudMenuDetailSteps: [], // 云菜单明细
  isShrinkOnresize: false, // 屏幕是否变小，系统键盘唤起时，显示或者隐藏ToolBar
  isFunctionListPopupShow: {}, // 是否显示模式列表
  favoriteMenu: [], // 我的菜单本地收藏
  favoriteCloudMenu: [], // 我的菜单云收藏
  dataObjectCache: {
    RunStat: 1,
    Mod: 0,
    List1: 0,
    CleanList1: 0,
    SmartMenuList1: 0,
    ProfessionalBakingList1: 0,
    AuxiliaryFunctionList1: 0,
  },
  dataObject: {
    Pow: 1, // 0关机 1开机
    RunStat: 1, // 运行状态 1:待机 2:预约中 3:工作中
    Mod: 0, // 大模式分类
    List1: 0, // 一级序列 工作模式
    List2: GET_ALL, // 二级序列 食物分类
    List3: 0, // 三级序列
    List4: 0, // 三级序列
    List5: 0, // 三级序列
    SetHour: 0, // 设定小时。下发用，不作显示
    SetMin: 0, // 设定分钟。下发用，不作显示
    SetTmp: 0, // 设定温度。下发用，不作显示
    TmrHour: 0, // 定时小时
    TmrMin: 0, // 定时分钟
    Pause: 0, // 暂停标志
    DisTmp: 0, // 当前显示温度，只作显示
    DisSetHour: 0, // 工作倒计时小时，只作显示
    DisSetMin: 0, // 工作倒计时分钟，只作显示
    DisTmrHour: 0, // 预约倒计小时，只作显示
    DisTmrMin: 0, // 预约倒计分钟，只作显示
    MachStat: 0, // 整机状态
    TmpCtrl: 0, // 温度控制状态 0：升温中 1：维温中
    ChildLock: 0, // 童锁 0不锁 1锁
    estate1: 0,
    estate2: 0, // 预留
    estate3: 0,
    estate4: 0,
    estate5: 5, // 除垢剩余次数
  },
  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    statueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: '', // 语言
    name: '蒸烤双能机'
  }
};
export default state;
