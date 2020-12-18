const state = {
  mac: '', // 设备mac
  functype: 0, // 0代表正常，1代表集中控制
  isScene: 0, // 是否是场景模式
  isMorebtn: false, // 功能详细
  isTime: false,
  isSleep: 0,
  dataObject: {
    Pow: 1, // 电源
    LigPow: 1, // 灯带 0:关
    ScrTime: 0, // 熄屏时间设置 默认永久亮
    AutoCtr: 0, // 关闭
    TemSor: 1260, // 温度=温度*10+1000
    HumSor: 400, // 湿度=温度*10
    HCHO: 10, // 甲醛=甲醛*1000
    PM2P5: 1, // PM2.5
    CO2: 1, // CO2
    InAirQuality: 2, // 室内空气品质 0：优 1：良 2：中 3：差
    SensorErr: 0, // 故障标志 0：PM2.5传感器 1：温湿度传感器 2：甲醛传感器 3：CO2传感器 4：与主控板通讯 5-7：预留
    BatteryWarn: 0 // 0：默认，不提示任何内容 1：电池电量低提示 2:电池电量低，关闭自动控制+自动开启相关设备 3：电池电量低，请自行关闭自动控制开启的设备
  },
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
        BrdContent: [0]
      }
    ]
  },
  queryTime: {
    t: 'queryT',
    index: 0,
    count: 2
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
        cmd: [{ mac: '', BrdNum: 1, BrdContent: [0] }]
      }
    ]
  },
  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: '', // 语言
    name: '环境感知器'
  },
  deviceList: {
    num: 0, // 房间内设备数量
    devlist: [], // 房间内设备列表
    roomName: '' // 房间类别
  },
  remarks_on: {
    // 开机状态下，场景模式需要返回给主体的文字, “保存”按键的点击事件在components/DevInfo，匹配数组里的值，返回给主体
    LigPow: ['灯带关', '灯带开'],
    ScrTime: [' 永久', ' 15秒', ' 30秒', ' 1分钟', ' 2分钟', ' 5分钟']
  },
  remarks_off: {
    // 关机状态下，场景模式需要返回给主体的文字
  }
};
export default state;
