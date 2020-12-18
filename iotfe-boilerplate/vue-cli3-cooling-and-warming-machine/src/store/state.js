/*
 * @Descripttion: 
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2019-09-05 14:12:57
 * @LastEditors  : ZM_lee└(^o^)┘
 * @LastEditTime : 2020-01-02 15:58:47
 */
/* eslint-disable no-param-reassign */
const state = {
  mac: '', // 设备mac 
  functype: 0, // 0代表正常，1代表集中控制
  isScene: 0, // 是否是场景模式
  isPCDebug: true,
  isMorebtn: false, // 功能详细
  isTime: false,
  isSleep: 0,
  dataObject: {
    isFirstOrder: true,
    //  新增
    Pow: 1, // 电源
    Mod: 1, // 模式 1 制冷 2制热
    Quiet: 1, // 静音
    AssHt: 0, // 辅热
    OutMode: 0, // 外出模式
    SvSt: 0, // 节能 
    SvStDebug: 0, // 节能调试模式
    DebugOk: 0, // 是否节能调试过
    Machine: 1, // 0 单模块 1 二模块 2 模块化版
    AcSvSt: 0, // 空调节能 
    enAcSvSt: 1, // 空调节能是否有效
    UnSvSt: 0, // 联合节能

    WtTemp: 38, // 进水温度
    HtWtSetTem: 42, // 制热出水设置温度
    ColWtSetTem: 15, // 制冷出水设置温度
    Temp: 39, // 室内温度(空调节能下)
    HtSetTem: 43, // 制热设置室内温度(空调节能下)
    ColSetTem: 16, // 制冷设置室内温度(空调节能下)

    HWMax: 60, // 制热进水温度设置上限
    HWMin: 30, // 制热进水温度设置下限
    CWMax: 22, // 制冷进水温度设置上限
    CWMin: 12, // 制冷进水温度设置下限
    HSMax: 60, // 制热房间温度设置上限(空调节能下)
    HSMin: 30, // 制热房间温度设置下限(空调节能下)
    CSMax: 22, // 制冷房间温度设置上限(空调节能下)
    CSMin: 12, // 制冷房间温度设置下限(空调节能下)

    AntiF: 0, // 防冻标识
    Ocmd: 0, // 手操器预约


    as1: ['', ''], // 状态查询1
    as2: ['', '', ''], // 状态查询2
    as3: ['', '', ''], // 状态查询3
    Er: 0, // 是否有故障
    err: [], // 具体故障（数组）
    Order: 1, // 预约
  },
  setTime: {},
  queryTime: {
    t: 'queryT',
    index: 0,
    count: 10
  },
  timeList: {
    t: 'listT',
    total: 0,
    index: 0,
    list: []
  },
  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: '', // 语言
    name: '冷暖一体机'
  },
  deviceList: {
    num: 0, // 房间内设备数量
    devlist: [], // 房间内设备列表
    roomName: '' // 房间类别
  },
  remarks_on: {
    // 开机状态下，场景模式需要返回给主体的文字, “保存”按键的点击事件在components/DevInfo，匹配数组里的值，返回给主体
    // LigPow: ['灯带关', '灯带开'],
    // ScrTime: [' 永久', ' 15秒', ' 30秒', ' 1分钟', ' 2分钟', ' 5分钟']
  },
  remarks_off: {
    // 关机状态下，场景模式需要返回给主体的文字
  }
};
export default state;
