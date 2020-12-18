module.exports = {
  DeviceName: '空气净化器',
  windSpeed: '风速',
  power_on: '开机',
  power: '开关',
  // 定时
  Timer_editor: '定时',
  Regular_type: '定时类型',
  Cancel: '取消定时',
  Start: '开始定时',
  on: '开',
  off: '关',
  hour: '小时',
  min: '分钟后',
  Cancel_timer: '取消定时',

  // 模式
  mode: '模式',
  mode_auto: '自动',
  mode_manual: '手动',
  mode_sleep: '睡眠',
  mode_quick: '快速',


  // PM2.5
  air_inlet: '进风口PM2.5',
  air_outlet: '出风口 PM2.5',
  air_inlet_excellent: '优',
  air_inlet_good: '良',
  air_inlet_worse: '差',
  textpm2p5Air: '当前室内PM2.5的值',
  textAirPM: '空气检测',

  // 标题
  filter_title: '滤网更换',
  filter_title2: '滤网信息',

  // 高级
  advance_light: '灯光',
  advance_timer: '定时',
  advance_renewal: '滤网',
  advance_chlidLock: '童锁',

  // 标题编辑按钮
  title_editor: '编辑',
  // //标题编辑按钮
  // title_editor:"编辑",
  // 底部按钮
  btnFunc: '功能',
  btnVoice: '语音',
  // save按钮
  btnSave: '保存',
  // 开关
  txtPow: '开/关',
  // 提示语
  toast_Start: '定时已开始',
  toast_Cancel: '定时已取消',
  // 滤网
  filter_leaving: '滤网余量',
  filter_cep: 'CEP净化模块余量',
  filter_table: '滤网型号规格如下表',
  filter_up: '臭氧还原网/甲醛网更换',
  filter_below: 'CEP净化模块(请清洗净化模块)',
  filter_belowMain: 'CEP净化模块',
  filter_type: '复合滤网',
  fllter_effect: '同时去除颗粒物和甲醛',
  fllter_tip1: '滤网寿命已到，请及时更换正版滤网',
  fllter_tip2: '点击购买',
  fllter_tip3: '滤网寿命即将到期，请及时更换正版滤网',
  fllter_tip4: '未检测到有效滤网，请及时安装。',
  

  table_name: '配件型号',
  table_func: '功能描述',
  table_match: '适用机型',
  table_jqlvwang: '甲醛滤网',
  table_chouyang: '臭氧还原网',
  table_xifu: '甲醛过滤网吸附甲醛',
  table_fenjie: '分解臭氧',
  table_Mation: 'KJ280G-A01',
  voice_cmd_not_found: '该口令暂时未开放，请尝试其它指令',
  voice_cmd_max_level: '已经是最大档位',
  voice_cmd_min_level: '已经是最小档位',

  // 离线
  zero: '离线检查',
  first: '1.家庭是否连接电源？',
  second: '2.设备是否连接上家庭WIFI？',
  third: '3.拔插电源插头再插上试试看？',
  four: '如果以上仍未恢复连接，您可尝试重置WIFI。',
  btnOffline: '取消',
  device_offline: '连接已断开,',
  device_offline_detail: '查看详情',
  openboard: '开门保护',
  openboard_reason: '请检查装饰板是否安装到位，若仍不能解决,请联系售后',

  warning_pow_off: '关机状态下不能发送其它指令，请开机。',

  warning_network: '网络不给力，请检查网络设置。',
  // voice_msg_max_temp: '温度已调到最高',
  // voice_msg_min_temp: '温度已调到最低，请小心着凉',
  // voice_broadcast_on: '播报已开',
  // voice_broadcast_off: '播报已关',

  // 故障
  err_reason: '故障原因',
  F1_reason: '高压模块升压异常保护',
  F2_reason: '芯片损坏保护',
  L3_reason: '电机堵转保护',
  E3_reason: '温湿度传感器通讯故障',
  E4_reason: '场效应管感温包开路或短路故障',
  E5_reason: '进风口粉尘传感器通讯故障',
  E6_reason: '出风口粉尘传感器通讯故障',
  H0_reason: '板间通讯故障',
  H8_reason: '触摸芯片通信故障',
  H3_reason: 'RFID通讯故障',
  E8_reason: '辅热感温包故障',

  err_project: '解决方案',
  common_project: '请联系售后',
  F1_project: '更换主板或倍压模块,请联系客服并送维修点维修',
  F2_project: '请联系售后',
  L3_project: '检查电机连接是否正常；依次更换电机、主板,请联系客服并送维修点维修',
  E3_project: '更换温湿度传感器；更换主板，请联系客服并送维修点维修',
  E4_project: '更换主板，请联系客服并送维修点维修',
  E5_project: '进风口粉尘传感器通讯故障，请联系客服并送维修点维修',
  E6_project: '出风口粉尘传感器通讯故障，请联系客服并送维修点维修',
  H0_project: '请联系售后',
  H8_project: '更换显示板，请联系客服并送维修点维修',
  H3_project: 'RFID通讯故障，请联系客服并送维修点维修',
  E8_project: '请联系售后',

  Err_MultiP: '点击按钮后可查看故障详情',
  Err_MultiR: '当前设备发生了多个故障',
  error_project: '客服热线：4008 365 315',
  timing: '定时',
  Err_Detail: '查看详情',

  notify_fault_name_wifi: 'WiFi串口通讯异常',
  notify_fault_resolve_wifi: '请通知售后人员维修',
  error: {
    headtitle: '故障名称：',
    subtitle: '解除办法：',
  }
};
