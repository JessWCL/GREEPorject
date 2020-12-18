const state = {
  mac: '', // 设备mac
  functype: 0, // 0代表正常，1代表集中控制
  isScene: 0, // 是否是场景模式
  scrollY: 0,
  dataObject: {},
  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: '', // 语言
    name: process.env.VUE_APP_MID.startsWith('703')
      ? 'Water Sensor'
      : '水浸报警器'
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
    electricity: '50', // 10 电量值，范围0~100
    keyNo: '', // 按键值
    press: '' // 按下动作（singleClick：单击，doubleClick：双击）
  };
} else {
  DataObject = {
    active_time: 0,
    category: '',
    create_time: 0,
    id: '',
    ip: '',
    local_key: '',
    name: '',
    online: true,
    owner_id: '',
    product_id: '',
    status: [
      {
        code: 'watersensor_state',
        value: '0'
      },
      {
        code: 'battery_percentage',
        value: '0'
      },
      {
        code: 'temper_alarm',
        value: 'false'
      }
    ],
    sub: true,
    time_zone: '',
    uid: '',
    updata_time: 0,
    uuid: ''
  };
}
state.dataObject = DataObject;

export default state;
