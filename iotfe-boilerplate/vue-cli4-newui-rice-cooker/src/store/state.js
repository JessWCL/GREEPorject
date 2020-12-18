const state = {
  mac: '', // 设备mac
  functype: 0, // 0代表正常，1代表集中控制
  isScene: 0, // 是否是场景模式（集中控制）
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
  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: '', // 语言
    name: '我的电饭煲'
  }
};

export default state;
