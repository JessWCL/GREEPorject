const homeData = {
  air: {
    CO2: 500.0,
    formaldehyde: 20.0,
    humidity: 0.0,
    pm2p5: 1.0,
    temperature: 26.1
  },
  health: {
    dishWashing: 0,
    hangClothes: 0,
    hotWaterTemp: 0,
    laundry: 0,
    littleReminder: 0,
    pureWaterTDS: 0,
    tapWaterTDS: 0
  },
  illuminationBeanList: [{
    mid: "80401",
    pow: 0,
    roomName: "默认房间"
  }, {
    mid: "80401",
    pow: 0,
    roomName: "卫生间"
  }, {
    mid: "80401",
    pow: 0,
    roomName: "主卧"
  }, {
    mid: "80401",
    pow: 0,
    roomName: "客厅"
  }],
  photovoltaicAirResBean: {
    chargePowerQ: 14751.42032,
    consumeCurrent: "11.3",
    consumePower: "2771.0",
    consumeQDay: 0.0,
    consumeQHour: 0.4,
    consumeQMonth: 290.74,
    consumeVoltage: "224.1",
    currentCapacityKWh: "0.3972",
    currentCapacityPercent: "3.0",
    days: 639.0,
    dischargePowerQ: 7921.06075,
    extraBonus: 4873.18868,
    generationCurrent: "0.0",
    generationPower: "0.0",
    generationVoltage: "271.0",
    provideQDay: 0.0,
    provideQHour: 0.0,
    provideQMonth: 0.0,
    reduceCO2: 7982.26,
    reduceNOx: 30.701,
    reduceSO2: 67.5422,
    reduceTotal: 4295.6,
    reduceTreeNum: 1596.5,
    savePowerDay: 0.0,
    savePowerHour: 0.0,
    savePowerMonth: 0.0,
    savePowerTotal: 9446.38,
    totalConsumeQ: 582140.29006,
    totalProvideQ: 6335.15
  }
};

const data = {
  home: homeData,
};

export default data;
