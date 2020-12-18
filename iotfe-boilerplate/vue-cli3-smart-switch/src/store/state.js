/*
 * @Descripttion: 
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2019-09-12 08:58:51
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2019-11-28 16:19:27
 */
const state = {
  mac: '', // 设备mac
  functype: 0, // 0代表正常，1代表集中控制
  isScene: 0, // 是否是场景模式
  typeNumber: 0, // 为0 代表单路开关
  isFirst: true,
  isUiLock: false,
  dataObject: {},
  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: 'zh_CN', // 语言
    name: 'Smart Swi'
  }
};

let DataObject;
if (process.env.VUE_APP_MID.startsWith('702')) {
  DataObject = {
    OnLine: 'online', // 设备是否在线
    Percentage: '', // 设备百分比
    RemoteStatus: '', // 设备开关状态
    RunStatus: '', //
    alarm: 'false', // false 正常；true 报警
    batteryLow: 'false', // true 低电量；false 正常电量
    close: '', // false 打开；true 关闭
    continuousIntrusion: '', // true 入侵的人一直存在
    electricity: '', // 10 电量值，范围0~100
    keyNo: '', // 按键值
    press: '' // 按下动作（singleClick：单击，doubleClick：双击）
  };
} else {
  DataObject = {
    // switch: true
    properties: [{
        code: 'switch_1',
        value: 'false',
      },
      {
        code: 'switch_2',
        value: 'false',
      },
      {
        code: 'switch_3',
        value: 'false',
      },
      {
        code: 'switch_3',
        value: 'false',
      },
      {
        code: 'switch_1',
        value: 'false',
      },
    ]
  };
}
state.dataObject = DataObject;

export default state;