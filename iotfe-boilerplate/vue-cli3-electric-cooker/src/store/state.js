const state = {
  mac: '', // 设备mac
  functype: 0, // 0代表正常，1代表集中控制
  isDebug: false,
  editEnable: true, // 消息里进入故障页面禁止解绑设备
  modeName: '精煮饭',
  modeTime: 50, // 模式默认工作时间
  synchronize: {
    // 跟小卡片同步数据的字段，跟config/statueJson保持一致
    Pow: 0, // 工作状态
    mode: 2, // 功能模式
    TmrEn: 0, // 定时使能
    StTmr: 150, // 定时时间
    SchEn: 0, // 预约使能
    SchTmr: 20, // 预约时间
    Rice: 1, // 米种
    Textre: 2, // 口感
    StpRic: 3, // 煮饭阶段
    KpTpEn: 0, // 保温使能
    KpTpTmr: 75, // 保温时间
    Runlight: 1, // 跑马灯使能
    estate: 0, // 故障代码
    estate2: 0, // 故障代码
    estate3: 0, // 故障代码
    estate4: 0 // 故障代码
  },
  dataObject: {
    // 插件跟wifi通信的字段，跟config/statueJson2保持一致
    Pow: 0, // 工作状态
    mode: 2, // 功能模式
    TmrEn: 0, // 定时使能
    StTmr: 50, // 定时时间
    SchEn: 0, // 预约使能
    SchTmr: 120, // 预约时间
    Rice: 1, // 米种
    Textre: 2, // 口感
    Runlight: 1, // 跑马灯使能
    StpRic: 3, // 煮饭阶段
    KpTpEn: 0, // 保温使能
    KpTpTmr: 75, // 保温时间
    estate: 0, // 故障代码
    estate2: 0, // 故障代码
    estate3: 0, // 故障代码
    estate4: 0 // 故障代码
  },
  remarks_on: {
    // 开机状态下，场景模式需要返回给主体的文字
    mode: [
      ' ',
      '标准煮',
      '精煮饭',
      '快煮饭',
      '煮粥',
      '稀饭',
      '煲汤',
      '热饭',
      '杂粮粥',
      '锅巴饭',
      '蒸煮',
      '蛋糕',
      '酸奶',
      '发芽饭',
      '婴儿粥',
      '煲仔饭',
      '杂粮饭',
      '快煮粥',
      '糙米饭',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '保温'
    ], // 模式
    Rice: [' ', ' 长粒米', ' 短粒米', ' 糙米'], // 米种
    Textre: [' ', ' 稍软', ' 适中', ' 稍硬'] // 口感
  },
  remarks_off: {
    // 关机机状态下，场景模式需要返回给主体的文字
  },
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，设备状态 0近程发现设备 1远程发现设备 2近程在线 3远程在线 -1掉线
    lang: '', // 语言
    name: 'IH电饭煲GDCF-4010C'
  }
};
export default state;
