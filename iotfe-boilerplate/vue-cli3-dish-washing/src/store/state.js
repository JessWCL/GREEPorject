import { MID, funBtnList, modeBtnList, menuBtnList } from '../api/index';
import { FUN_BTNS, LOCAL_STORAGE_DEVICE_INFO, __PROD__ } from '../api/constant';

let fullstatueJson = '';
try {
  const localDeviceInfo = localStorage.getItem(LOCAL_STORAGE_DEVICE_INFO);
  console.log('localDeviceInfo:', localDeviceInfo);
  if (localDeviceInfo !== null || localDeviceInfo !== undefined || localDeviceInfo !== '') {
    const deviceInfo = JSON.parse(localDeviceInfo);
    fullstatueJson = deviceInfo.fullstatueJson;
  }
} catch (e) {
  console.warn(e);
}

const state = {
  MID,
  mac: '', // url mac
  functype: 0, // 0代表正常，1代表集中控制
  cache: {
    modType: 0, // tabbar index
    Dry: 0,
    Purifier: 0,
    normalModIndex: 0,
    singleDryModIndex: 0,
    singlePurifierModIndex: 0
  },
  DataObject: {
    Pow: __PROD__ ? -1 : 1, // 开关 0=关机，1=开机
    Wash: 0, // 洗涤 0=未开启洗涤，1=开启洗涤
    WashDone: 0, // 洗涤未结束，1=洗涤结束
    WorkStatus: 0, // 1=进水中，2=洗涤中，3=洗涤加热中，4=排水中，5=烘干中，6=保洁中，其他保留
    PauseStart: 0, // 暂停/启动 0=暂停，1=启动
    Mod: 0, // 模式 0=空模式，1=智能洗，2=强力洗，3=节能洗，4=快速洗，5=玻璃洗，6=自清洁，7=除菌洗
    LayerWash: 0, // 分层洗  0=上下层循环洗，1=上层洗，2=下层洗，3=预留
    Dry: 0, // 加强烘干 0=不开启，1=开启
    Hard: 0, // 水硬度参数 水硬度参数 0~7
    // StHard: 0, // 水硬度设置 0=无设置，1=开启设置
    RmTmrHour: 0, // 洗涤剩余时间小时位
    RmTmrMin: 0, // 洗涤剩余时间分钟位
    TmrOff: 0, // 定时关 0=空，1=定时关机
    TmrOn: 0, // 定时开 0=空，1=定时执行
    estate1: 0, // 故障代码
    estate2: 0, // 故障代码
    TmrStatus: 0, // 定时状态 0=定时关闭 1=定时开启
    TmrHour: 0, // 定时小时
    TmrMin: 0, // 定时分钟
    StTmr: 0, // 定时时间 定时执行剩余分钟数
    Purifier: 0, // 保洁 0=定时关闭 1=定时开启
    PurifierTime: 1, // 保洁时间 1-96h;
    Disinfect: 0, // 消毒 0=关闭 1=开启
    Lighting: 0, // 照明
    Lock: 0, // 童锁
    MidType: 0, // 是否有照明功能 256:有照明
    JFerr: 0 // WiFi故障
  },
  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson, // config.xml里对应的查询字段
    statueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: '', // 语言
    name: '洗碗机'
  },

  isNotifyDebug: false, // 是否为notify debug模式

  workStatusName: null, // 工作状态
  workStatusImgSrc: null, // 工作状态图片
  workStatusImgBG: null, // 工作状态背景图
  carouselId: 0, // 滑轮ID
  errItemList: [], // 故障信息列表
  warningItemList: [], // 故障信息列表
  timer: null, // 定时器
  msTimer: 10000, // 定时器查询时间间隔
  allowableTimer: true, // 是否允许定时器

  funBtnList,
  modeBtnList,
  menuBtnList,
  FUN_BTNS,
  btnListObj: {
    type: null, // 按钮类型
    btnList: [] // 按钮组
  },
  isShowPop: false, // 是否显示弹出框
  isShowWaringTipsDetails: false, // 是否显示提示信息
  isWorking: false, // 是否工作中
  isFirstParseData: true, // 是否第一解析Data
  isPurifierAppointment: false, // 是否保洁预约

  LayerWashCache: 0, // 交互体验缓存
  DisinfectCache: 0, // 交互体验缓存
  DryCache: 0, // 交互体验缓存
  barColor: '#ffffff',

  // notify.html
  isNotify: false,
  ext: null,
  code: null,
  evt: null,
  t: null,
  mid: null,
  // notify.html
};

export default state;
