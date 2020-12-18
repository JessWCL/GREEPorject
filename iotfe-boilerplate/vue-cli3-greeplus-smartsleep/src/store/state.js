/*
 * @Author: Jerry-Rain
 * @Date: 2019-09-11 16:43:42
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2019-10-08 15:31:30
 * @Description:
 */
const state = {
  mac: '', // 设备mac
  functype: 0, // 0代表正常，1代表集中控制
  isScene: 0, // 是否是场景模式
  dataObject: {
    musicIndex: 0,
    playStatus: false,
    tryStatus: 0,
    sceneList: '',
    currentSenceId: '',
    // progress: 0.1,
    // {
    //   src: require('@/assets/img/huijia.png'),
    //   groupname: '回家',
    //   picName: '1',
    // },
    // {
    //   src: require('@/assets/img/lijia.png'),
    //   groupname: '离家',
    //   picName: '2',
    // },
    // {
    //   src: require('@/assets/img/dianying.png'),
    //   groupname: '电影',
    //   picName: '3',
    // },
    // {
    //   src: require('@/assets/img/chifan.png'),
    //   groupname: '吃饭',
    //   picName: '4',
    // },
    // 家庭列表数据
  },
  // 默认数据
  mainPageData: {
    funcSleepValue: 0,
    funcSleep: false,
    sleepIndex: -1,
    funcWakeValue: 0,
    funcWake: false,
    wakeupindex: -1,
    circleValue: '',
    sleepStartAt: '--:--',
    sleepEndAt: '--:--',
    deviceList: [],
    currentMacIndex: 0,
    smartMode: false,
    musicDataArray: [
      // 初始化没拿到数据默认值
      {
        icon_a: require('@/assets/img/zwt.png'),
        disk_a: require('@/assets/img/zwt.png'),
        name: '',
        progress: 0.01,
        id: 1,
      },
      {
        icon_a: require('@/assets/img/zwt.png'),
        disk_a: require('@/assets/img/zwt.png'),
        name: '',
        progress: 0.01,
        id: 2,
      },
      {
        icon_a: require('@/assets/img/zwt.png'),
        disk_a: require('@/assets/img/zwt.png'),
        name: '',
        progress: 0.01,
        id: 3,
      },
      {
        icon_a: require('@/assets/img/zwt.png'),
        disk_a: require('@/assets/img/zwt.png'),
        name: '',
        progress: 0.01,
        id: 4,
      },
    ],
    hasAirCondition: 0,
    sleepStandardTime: '22:00',
    wakeUpStandardTime: '07:00',
  },
  zwtArray: [
    // 占位图
    {
      icon_a: require('@/assets/img/zwt.png'),
      disk_a: require('@/assets/img/zwt.png'),
      name: '',
      progress: 0.01,
      id: 1,
    },
    {
      icon_a: require('@/assets/img/zwt.png'),
      disk_a: require('@/assets/img/zwt.png'),
      name: '',
      progress: 0.01,
      id: 2,
    },
    {
      icon_a: require('@/assets/img/zwt.png'),
      disk_a: require('@/assets/img/zwt.png'),
      name: '',
      progress: 0.01,
      id: 3,
    },
    {
      icon_a: require('@/assets/img/zwt.png'),
      disk_a: require('@/assets/img/zwt.png'),
      name: '',
      progress: 0.01,
      id: 4,
    },
  ],
  secondsData: {
    smartIndex: 0,
    no: 1,
    mac: '',
  },
  linkData: {
    hour: 22,
    min: 0,
    musicId: 0,
    selectedScene: '',
    name: '',
    id: '',
  },
  sceneDetail: {}, // 为ios准备
  Status: true, // 轮询状态
  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: '', // 语言
    name: 'Jerry的模板',
  },
};
export default state;
