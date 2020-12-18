const state = {
  mac: '', // 设备mac
  g_mac: '',
  mainmac: '',
  functype: 0, // 0代表正常，1代表集中控制
  isScene: 0, // 是否是场景模式
  remarks: '',
  GasN: 0, // 点击时的盒子编号
  BoxStatus: true,
  // tabIndex: 2,
  isfromSetAirquality: false, // 是否来自 自动模式设置页
  isShowPopUp: false, // 是否显示弹框
  homeName: [{
      room: '客厅'
    },
    {
      room: '卧室'
    },
    {
      room: 'xxx'
    }
  ],
  dataObject: {
    isScene: 0, // 是否是场景模式
    tabIndex: 2,
    Pow: 1,
    ModS: 5, //(新增) 内机运行有效模式   0：无效；1：运行有效;2:联动有效; 4:自动有效;
    FanMod: 1, // 设定模式  1：运行；2：联动；3：自动；
    WdSpd: 3, // 风速设定   1：低档；2：中低档；3：中档；4：中高档；5：高档；6：强劲风；

    PctCle: 1, //   提示过滤网清洗   1 粗校清洗   2 IFD清洗，3:双清洗
    VitiGr: 100, //   高效过滤网污染程度（更换） 传输值=实际值+100，100%~200%
    PctRe: 0, // 提示过滤网更换   1粗校更换  2 高效更换   3:双更换
    GetEr: 0, // 室内机故障
    IDUAirQu: 0, // 室内空气品质等级目标值    0：无效；1：优；2：良
    AirQu: 1, //  室内空气品质等级  0：无效；；1：优；2：良；；3：轻度污染；4：中度污染；5：重度污染；6：严重污染
    TemSor: 20, //  室内空气盒子（温度） 传输值=实际温度+100，70~238℃
    HumSor: 20, // 室内空气盒子（湿度）       传输值=实际湿度+100，120%~190%
    // PM2P5: 35, //    室内空气盒子（PM2.5） 
    VOC: 200, //     室内空气盒子（VOC浓度）
    // CO2: 700, // 室内空气盒子（CO2浓度）
    GasQ: 1, // 盒子数量10进制    0：离线，没有安装；1:在线，已经安装
    // HCHO: 7, 
    PM2P5EN: 0,
    HCHOEN: 1,
    ODUViti: 4, //   室外空气污染的等级   0：无；1：优；2Air：良；；3：轻度污染；4：中度污染；5：重度污染；6：严重污染
    AppTimer: 0,
    // 新增
    RunMod: 1, // 运行模式显示   1:热交换模式；2：旁通模式；3：排风模式；4：低温模式；5：内循环；6：内循环；
    ErrType: 0, // 故障类型

    // MdVitiGr: 50,
    MIdType: '60a0',
    Inloop: 0, //    内循环控制  1：开启；0：关闭
    // InloopEN: 1,
    // SorSet: 2 // 0：无效；1：选择PM2.5；2：选择CO2；3：选择综合
    IFDtiGr: 0, // IFD过滤网污染程度（清洗）   传输值=实际值+100，100%~200%
    InVitiGr: 0, // 粗效过滤网污染程度（清洗）  传输值=实际值+100，100%~200%
    InVitiGrCg: 0, // 粗效过滤网污染程度（更换）  传输值=实际值+100，100%~200%
    InEffClRes: 1, //   粗效清洗复位  0：无；1：复位
    InEffReRes: 1, //  粗效更换复位	0：无；1：复位
    IFDClRes: 1, //  IFD清洗复位 	0：无；1：复位
    EffReRes: 2, // 高效更换复位	0：无；1：复位
  },
  // 盒子数值（最多两个）
  DataBoxData: [{
      TemSor: 100, // 室内空气盒子（温度）
      HumSor: 100, // 室内空气盒子（湿度）
      PM2P5: 293, //  室内空气盒子(PM2.5)
      CO2: 90, // 室内空气盒子(CO2浓度)
      GasLED: 1, // Led 开关状态
      GasMod: 1, // Led 模式
      GasAvail: 1, // 是否启用
      GasMas: 1, //  室内盒子主盒子设定
      SorErr: 1, // 空气盒子总故障
      AirQu: 1, // 空气品质
      CommErr: 0, // 盒子内部通讯故障
      PM2P5Sta: 1, // 空气盒子PM2.5检测
      VOC: 0 //  室内空气盒子(VOC浓度) 
    },
    {
      TemSor: 100,
      HumSor: 100,
      PM2P5: 39,
      CO2: 0,
      GasLED: 0,
      GasMod: 1,
      GasAvail: 0,
      GasMas: 0,
      SorErr: 0,
      AirQu: 2,
      CommErr: 0,
      PM2P5Sta: 0
    }
  ],
  SetAirqualityList: [{
      value: 1,
      text: '空气品质目标/优'
    },
    {
      value: 2,
      text: '空气品质目标/良'
    }
  ],
  // 当前污染等级参数
  PollutionList: [{
      value: 1,
      text: '优'
    },
    {
      value: 2,
      text: '良'
    },
    {
      value: 3,
      text: '轻度污染'
    },
    {
      value: 4,
      text: '中度污染'
    },
    {
      value: 5,
      text: '重度污染'
    },
    {
      value: 6,
      text: '严重污染'
    }
  ],
  // 除霾机配置参数
  swiperOptions: {
    effect: 'cube',
    cubeEffect: {
      slideShadows: false,
      shadow: false
    }
  },
  data: {
    // 风速
    WdSpdMode: {
      name: 'WdSpdMode',
      cName: '风速',
      power: true,
      controlable: true,
      range: [1, 2, 3, 4, 5, 6, 7],
      rNames: ['低风', '中低风', '中风', '中高风', '高风', '强劲风']
    },
    // 运行模式
    MoveMode: {
      name: 'MoveMode',
      cName: '运行模式',
      power: true,
      controlable: true,
      range: [1, 2, 3],
      rNames: ['运行', '联动', '自动']
    },
    RunMod: {
      name: 'RunMod',
      cName: '运行模式',
      power: true,
      controlable: true,
      range: [1, 2, 3, 4, 5, 6],
      rNames: ['热交换', '旁通模式', '排风模式', '低温模式', '内循环', '内循环']
    }
  },

  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: '', // 语言
    name: '新风净化机'
  },
  deviceNum: {
    num: 0 // 房间内设备数量
  },
  remarks_off: {
    // 关机状态下，场景模式需要返回给主体的文字
  }
};
export default state;