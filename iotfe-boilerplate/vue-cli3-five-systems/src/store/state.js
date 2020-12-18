/*
 * @Author: 
 * @Date: 
 * @LastEditors: Feng
 * @LastEditTime: 2020-06-27 16:52:27
 * @Description: 
 */

/**
 * @param {number} [n=3]
 * @describtion 取Date，按照n天为周期，返回Date位于周期中哪天，用于每天显示不同的sleepData
 * @return 返回 0 ~ (n-1)
 */
function dateRemainder(n = 3) {
  const d = new Date();
  const date = d.getDate();
  let num = 0;
  if (date <= n) {
    num = date - 1;
  } else {
    date % n === 0 ? num = n - 1 : num = date % n - 1;
  }

  return num;
}

const state = {
  mac: '', // 设备mac
  functype: 0, // 0代表正常，1代表集中控制
  isScene: 0, // 是否是场景模式
  dataObject: {
    home: {
      air: {
        formaldehyde: 0,
        humidity: 39,
        pm2p5: 0,
        temperature: 22,
        CO2: 400,
      },
      photovoltaicAirResBean: {
        currentCapacityKWh: '',
        savePowerTotal: '',
        generationPower: '',
        reduceCO2: '',
        reduceNOx: '',
        consumePower: '',
        totalProvideQ: '',
        reduceSO2: '',
        reduceTreeNum: '',
        days: 32,
      },
      illuminationBeanList: [{
        roomName: 'testRoom',
        name: '筒灯',
        pow: 1,
        mid: 80401,
      }, {
        roomName: 'testRoom2',
        name: '灯带',
        pow: 1,
        mid: 80401,
      }],
      health: {
        dishWashing: 0,
        laundry: 0,
      }
    },
    illumination: [{
      roomName: 'testRoom',
      name: '筒灯',
      pow: 1,
      mid: 80401,
    }, {
      roomName: 'testRoom',
      name: 'test2',
      pow: 0,
      mid: 80401,
    }, {
      roomName: 'testRoom2',
      name: '灯带',
      pow: 0,
      mid: 80501,
    }],
    health: {
      laundry: 0,
      dishWashing: 0,
    },
    air: {
      formaldehyde: 0,
      humidity: 39,
      pm2p5: 0,
      temperature: 22,
      CO2: 400,
    },
    energy: {
      currentCapacityKWh: '',
      savePowerTotal: '',
      generationPower: '',
      reduceCO2: '',
      reduceNOx: '',
      consumePower: '',
      totalProvideQ: '',
      reduceSO2: '',
      reduceTreeNum: '0',
      days: 32,
    },
    getup: {
      humidity: '48',
      temperature: '16',
      weatherStatus: '多云',
      city: '',
    },
    sleep: {
      bodyMotion: '--',
      breathRate: '--',
      formaldehyde: 0,
      heartRate: '--',
      humidity: 48,
      pm2p5: 0,
      temperature: 18,
      pow828502: 0, // 加湿器
      pow10f10: 0, // 空调
      pow828202: 0, // 塔扇
      pow828a01: 0, // 电暖气
    },
    dateRemainder: dateRemainder(3),
    sleepDataArr: [
      {
        score: 85,
        conclusion: '指标正常',
        heartRate: 78,
        heartRateHigh: 78,
        heartRateLow: 62,
        respirationRate: 18,
        bodyMotion: 9,
        sleepLength: '6时47分',
        awake: '5分44秒',
        lightSleep: '2时3分',
        deepSleep: '3时25分',
        REM: '1时09分',
        leave: '3分10秒',
      },
      {
        score: 92,
        conclusion: '继续保持',
        heartRate: 69,
        heartRateHigh: 69,
        heartRateLow: 63,
        respirationRate: 20,
        bodyMotion: 9,
        sleepLength: '8时10分',
        awake: '3分11秒',
        lightSleep: '2时27分',
        deepSleep: '4时09分',
        REM: '1时30分',
        leave: '0秒',
      },
      {
        score: 88,
        conclusion: '继续保持',
        heartRate: 75,
        heartRateHigh: 75,
        heartRateLow: 67,
        respirationRate: 21,
        bodyMotion: 9,
        sleepLength: '7时33分',
        awake: '5分12秒',
        lightSleep: '2时55分',
        deepSleep: '3时20分',
        REM: '1时12分',
        leave: '0秒',
      },
    ],
  },
  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: '', // 语言
    name: '五大系统'
  }
};
export default state;
