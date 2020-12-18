// 序号  故障名称  故障原因  故障代码  解决条件
// 运行中开门保护  运行过程中门未闭合好  无代码，显示“---”  关好门
// 温度传感器开短路  感温包开短路  E3  联系售后
// 缺水故障  水槽中水不足  F0  联系售后
// 溢水故障  有水溢出到整机底座  F1  联系售后
// 洗涤泵运转故障  洗涤泵异常  F2  联系售后
// 分水阀故障  分水阀异常，找不到位置  F3  联系售后
// 进水故障  进水异常，进不够水  进水指示灯闪烁，无故障代码  联系售后
// 排水故障  排水异常，不排水  F4  联系售后
// 加热器故障  不加热  F5  联系售后
// 显示板与主板间通讯故障  显示板与主板间通讯异常  H0  联系售后
// 触摸故障  主芯片与触摸芯片通讯异常  H8   联系售后
// 缺盐提示  洗碗盐不足  缺盐指示灯闪烁，无故障代码  添加洗碗盐
// 缺洗涤剂提示  洗涤剂不足  缺洗涤剂指示灯闪烁，无故障代码  添加洗涤剂

// 电控错误状态信息
const ErrObj1 = [
  { id: 1, code: 'F3', headtitle: '故障名称：', title: '分水阀故障', subtitle: '解除办法：', text: '请通知售后人员维修', reason: '分水阀异常，找不到位置', errorCode: 'F3', resolve: '请通知售后人员维修' },
  { id: 2, code: 'E3', headtitle: '故障名称：', title: '温度传感器开短路', subtitle: '解除办法：', text: '请通知售后人员维修', reason: '感温包开短路', errorCode: 'E3', resolve: '请通知售后人员维修' },
  { id: 3, code: 'F0', headtitle: '故障名称：', title: '缺水故障', subtitle: '解除办法：', text: '请通知售后人员维修', reason: '水槽中水不足', errorCode: 'F0', resolve: '请通知售后人员维修' },
  { id: 4, code: 'F4', headtitle: '故障名称：', title: '排水故障', subtitle: '解除办法：', text: '请通知售后人员维修', reason: '排水异常，不排水', errorCode: 'F4', resolve: '请通知售后人员维修' },
  { id: 5, code: 'F2', headtitle: '故障名称：', title: '洗涤泵运转故障', subtitle: '解除办法：', text: '请通知售后人员维修', reason: '洗涤泵异常', errorCode: 'F2', resolve: '请通知售后人员维修' },
  { id: 6, code: 'F1', headtitle: '故障名称：', title: '溢水故障', subtitle: '解除办法：', text: '请通知售后人员维修', reason: '有水溢出到整机底座', errorCode: 'F1', resolve: '请通知售后人员维修' },
  { id: 7, code: 'H0', headtitle: '故障名称：', title: '显示板与主板间通讯故障', subtitle: '解除办法：', text: '请通知售后人员维修', reason: '显示板与主板间通讯异常', errorCode: 'H0', resolve: '请通知售后人员维修' },
  { id: 8, code: 'F5', headtitle: '故障名称：', title: '加热器故障', subtitle: '解除办法：', text: '请通知售后人员维修', reason: '不加热', errorCode: 'F5', resolve: '请通知售后人员维修' },
];
const ErrObj2 = [
  { id: 1, code: '!', headtitle: '故障名称：', title: '运行中开门保护', subtitle: '解除办法：', text: '请关好门', reason: '运行过程中门未闭合好', errorCode: null, resolve: '请关好门' },
  { id: 2, code: '!', headtitle: '故障名称：', title: '进水故障', subtitle: '解除办法：', text: '请打开水龙头', reason: '进水异常，进不够水', errorCode: null, resolve: '请通知售后人员维修' },
  { id: 3, code: '!', headtitle: '故障名称：', title: '缺漂洗剂提示', subtitle: '解除办法：', text: '请添加漂洗剂', reason: '漂洗剂不足', errorCode: null, resolve: '请添加漂洗剂' },
  { id: 4, code: '!', headtitle: '故障名称：', title: '缺盐提示', subtitle: '解除办法：', text: '请添加洗碗机专用盐', reason: '洗碗机专用盐不足', errorCode: null, resolve: '请添加洗碗机专用盐' },
  { id: 5, code: 'H8', headtitle: '故障名称：', title: '触摸故障', subtitle: '解除办法：', text: '请通知售后人员维修', reason: '主芯片与触摸芯片通讯异常', errorCode: 'H8', resolve: '请通知售后人员维修' },
];
const ErrObj3 = [
  { id: 1, code: '!', headtitle: '故障名称：', title: 'WiFi通讯故障', subtitle: '解除办法：', text: '请通知售后人员维修', reason: 'WiFi串口通讯异常', errorCode: null, resolve: '请通知售后人员维修' }
];
export default { ErrObj1, ErrObj2, ErrObj3 };
