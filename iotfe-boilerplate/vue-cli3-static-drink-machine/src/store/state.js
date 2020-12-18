const state = {
  mac: '', // 设备mac
  functype: 0, // 0代表正常，1代表集中控制
  isScene: 0, // 是否是场景模式
  dataObject: {},
  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: '', // 语言
    name: '净饮机',
  },
};

const DataObject = {
  ErrorCode1: 0, // 多个错误代码
  ErrorCode2: 0, // 多个错误代码
  LifeTimeFilter1: 100, // 滤芯寿命  取值范围：0-100，间距：1, 单位：%
  LifeTimeFilter2: 0, // 滤芯寿命  取值范围：0-100，间距：1, 单位：%
  LifeTimeFilter3: 0, // 滤芯寿命  取值范围：0-100，间距：1, 单位：%
  LifeTimeFilter4: 0, // 滤芯寿命  取值范围：0-100，间距：1, 单位：%
  TotalPureWater: 28, // 总制水量  取值范围：0-65535，间距：1, 单位：L
  FilterKind1: 5, // 滤芯种类
  FilterKind2: 2, // 滤芯种类
  FilterKind3: 3, // 滤芯种类
  FilterKind4: 4, // 滤芯种类
  FilterWarning1: 0, // 滤芯寿命提醒  枚举值：0（正常） 1（更换） 2（已到期提醒）
  FilterWarning2: 0, // 滤芯寿命提醒  枚举值：0（正常） 1（更换） 2（已到期提醒）
  FilterWarning3: 0, // 滤芯寿命提醒  枚举值：0（正常） 1（更换） 2（已到期提醒）
  FilterWarning4: 0, // 滤芯寿命提醒  枚举值：0（正常） 1（更换） 2（已到期提醒）
  WorkStatus: 7, // 设备状态 详见WORKSTATUS
  LifeFilterDays1: 10, // 滤芯寿命天数  取值范围：0-1100，间距：1, 单位：d
  LifeFilterDays2: 1, // 滤芯寿命天数  取值范围：0-1100，间距：1, 单位：d
  LifeFilterDays3: 6, // 滤芯寿命天数  取值范围：0-1100，间距：1, 单位：d
  LifeFilterDays4: 10, // 滤芯寿命天数  取值范围：0-1100，间距：1, 单位：d
  JFerr: 0, // wifi通讯故障
};
state.dataObject = DataObject;

export default state;
