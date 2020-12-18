const state = {
  mac: '', // 设备mac
  functype: 0, // 0代表正常，1代表集中控制
  isScene: 0, // 是否是场景模式
  scrollY: 0,
  pageNo: '1',
  pageSize: '100',
  dataObject: {
    // 当前用户信息
    nick_name: 'MING',
    sex: 2,
    birthday: 20200317,
    height: 185,
    weight: '46',
    contact: '15269589689',
    user_id: '123455',
    unit: 'kg',
  },
  // 当前编辑的用户信息
  currentUserMessage: {
    nick_name: 'MING',
    sex: 2,
    birthday: 20200317,
    height: 185,
    weight: '46',
    contact: '15269589689',
    user_id: '123455',
  },
  useerMessage: {
    bmi: '--', // string BMI
    bones: '--', // string 骨量
    calories: '--', // double 卡洛里
    fat: '--', // string 体脂
    fatRate: '--', // string 体脂率
    muscle: '--', // string 肌肉量
    muscleRate: '--', // string 肌肉率
    waterRate: '--', // double 水分
    weight: '--', // double 体重
  },
  kpiValue: {
    bmiType: '--',
    bonesType: '--',
    fatRateType: '--',
    fatType: '--',
    muscleRateType: '--',
    muscleType: '--',
    waterType: '--',
  },
  // 家庭下得用户列表
  userList: [],
  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: '', // 语言
    name: 'Body Fat Scale',
  },
};
export default state;
