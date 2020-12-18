const state = {
  mac: '', // 设备mac
  functype: 0, // 0代表正常，1代表集中控制
  isScene: 0, // 是否是场景模式
  isPCDebug: true,
  isMorebtn: false, // 功能详细
  isTime: false,
  isSleep: 0,
  dataObject: {
    Pow: 1, // 电源
    Mod: 2, // 模式 1 制冷 2制热
    // SetTem: 42, // 设置温度 16-30
    HeWatOutTemSet: 231,
    HeWatOutTemSetFloor: 31,
    CoWatOutTemSet: 152,
    Quiet: 0, // 静音
    LefHom: 0, // 外出模式
    SvSt: 0, // 节能
    EnvironmentTem: 0, // 环境温度（高位）
    AirInTem: 0, // 吸气温度（高位）
    AirOutTem: 0, // 排气温度（高位）
    DefrostTem: 0, // 化霜温度（高位）
    AllInWatTem: 0, // 进水温度（高位）
    AllOutWatTem: 0, // 出水温度（高位）
    AntifreezeTem: 0, // 防冻温度（高位）
    CodeCoalGasTem: 0, // 冷媒侧气管温度（高位）
    CodeCoalLiquidTem: 0, // 冷媒侧液管温度（高位）
    HighPressureTem: 0, // 高压温度（高位）
    AllErr: 0, // 总故障标志位
    FloorHeat: 0, // 地暖有无
    TemUn: 0, // 0摄氏度 1华氏度
  },
  // timesList: [16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
  setTime: {
    t: 'setT',
    ManageType: 0,
    id: 0,
    enable: 0,
    hr: 12,
    min: 30,
    sec: 0,
    tz: 8,
    week: [1, 1, 1, 1, 1, 1, 1],
    cmd: [
      {
        mac: '',
        BrdNum: 1,
        BrdContent: [0],
      },
    ],
  },
  queryTime: {
    t: 'queryT',
    index: 0,
    count: 2,
  },
  timeList: {
    t: 'listT',
    total: 0,
    index: 0,
    list: [
      {
        id: 0,
        enable: 1,
        hr: 8,
        min: 30,
        sec: 0,
        tz: 8,
        week: [0, 0, 0, 0, 0, 0, 0],
        cmd: [
          {
            mac: '',
            BrdNum: 1,
            BrdContent: [0],
          },
        ],
      },
    ],
  },
  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: '', // 语言
    name: '空调',
  },
  deviceList: {
    num: 0, // 房间内设备数量
    devlist: [], // 房间内设备列表
    roomName: '', // 房间类别
  },
  remarks_on: {
    // 开机状态下，场景模式需要返回给主体的文字, “保存”按键的点击事件在components/DevInfo，匹配数组里的值，返回给主体
    LigPow: ['灯带关', '灯带开'],
    ScrTime: [' 永久', ' 15秒', ' 30秒', ' 1分钟', ' 2分钟', ' 5分钟'],
  },
  remarks_off: {
    // 关机状态下，场景模式需要返回给主体的文字
  },
};
export default state;
