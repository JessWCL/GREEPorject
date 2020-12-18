/*
 * @Author: Jerry-Rain
 * @Date: 2019-09-11 16:43:42
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-05-11 16:49:28
 * @Description:
 */
const state = {
  mac: '', // 设备mac
  pathName: '', // 语音跳转
  functype: 0, // 0代表正常，1代表集中控制
  isScene: 0, // 是否是场景模式
  yesScoreLeft: null, // 昨日左床分数 0.00
  yesScoreRight: null, // 昨日右床分数 0.00
  apiObject: {
    getBedStatusJson: '', // T10实时数据

    getDateListLeft: '', // 获取 左 睡眠时间列表
    getDateListRight: '', // 获取 右 睡眠时间列表

    getSleepDataLeft: '', // 获取睡眠报告数据
    getSleepDataRight: '', // 获取睡眠报告数据
    getWeekSleepDataLeft: '', // 获取 周 睡眠报告数据
    getWeekSleepDataRight: '', // 获取 周 睡眠报告数据
    
    getWeekListLeft: '', // 获取周、月报告
    getWeekListRight: '', // 获取周、月报告
  },
  dataObject: {
    AutoLeftWai: 180, // 自动左侧腰部调节
    AutoLeftLeg: 50, // 自动左侧臀部调节
    
    AutoRighWai: 180, // 自动右侧腰部调节
    AutoRighLeg: 70, // 自动右侧臀部调节

    HumLeftWai: 20, // 手动左侧腰部调节
    HumLeftLeg: 50, // 手动左侧臀部调节
    
    HumRighWai: 30, // 手动右侧腰部调节
    HumRighLeg: 80, // 手动右侧臀部调节
  },
  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: '', // 语言
    name: 'Jerry的模板'
  }
}
export default state
