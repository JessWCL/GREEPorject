import _modeList from '../api/API_4030C';

const state = {
  mac: '', // 设备mac
  isDebug: false, // 是否是debug状态
  functype: 0, // 0代表正常，1代表集中控制
  editEnable: true, // 消息里进入故障页面禁止解绑设备
  uilock: false, // UI锁，防止数据跳变
  notify: -1, // 从消息里点进去的故障代码, 没有则显示-1

  currentMode: _modeList[0], // 当前页面模式
  modeList: _modeList, // 功能按钮组
  modeName: '精煮饭',
  isMode: false, // 判断是否是mode界面
  isWarn: false, // 显示可调时间
  isAbout: false, // 是否显示“约...小时”中的“约”字
  adjustime: '', // 显示可调时间范围
  firLoad: true, // 初次加载数据
  unLock: false, // 互斥锁
  dataObject: {
    Pow: 0, // 工作状态
    mode: 2, // 功能模式
    TmrEn: 0, // 定时使能
    StTmr: 50, // 定时时间
    SchEn: 0, // 预约使能
    SchTmr: 20, // 预约时间
    Rice: 1, // 米种
    Textre: 2, // 口感
    StpRic: 6, // 煮饭阶段
    KpTpEn: 0, // 保温使能
    KpTpTmr: 75, // 保温时间
    ModeTmr: 0, // 定时总时间
    estate: 0, // 故障代码
    estate2: 0, // 故障代码
    Volt: 0, // 电源电压
    estate3: 0, // 故障代码
    estate4: 0, // 故障代码
    MidType: 26116, // 机型细分码, 26116是GDCF-4009C, 否则是GDCF-2008C
  },
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    lang: '', // 语言
    name: '电饭煲',
  },
  menuPages: {
    isMenuSelected: false,
  }
};
export default state;
