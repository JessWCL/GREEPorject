// 辅助模式
// 模式顺序对应AuxiliaryFunction.vue中swiper的顺序
const tempConfig = [
  {// 解冻
    tempMin: 50,
    tempMax: 70,
    defaultIndex: 10,
    defaultTemp: 60,
  },
  {// 发酵
    tempMin: 30,
    tempMax: 45,
    defaultIndex: 10,
    defaultTemp: 40,
  },
  {// 烘焙再加热
    tempMin: 80,
    tempMax: 130,
    defaultIndex: 15,
    defaultTemp: 100,
  },
  {// 蒸汽再加热
    tempMin: 80,
    tempMax: 100,
    defaultIndex: 20,
    defaultTemp: 95,
  },
  {// 餐具消毒
    tempMin: 100,
    tempMax: 130,
    defaultIndex: 20,
    defaultTemp: 120,
  },
  {// 焯水
    tempMin: 80,
    tempMax: 100,
    defaultIndex: 15,
    defaultTemp: 95,
  },
  {// 保温
    tempMin: 60,
    tempMax: 60,
    defaultIndex: 0,
    defaultTemp: 60,
  },
  {// 暖盘
    tempMin: 60,
    tempMax: 60,
    defaultIndex: 0,
    defaultTemp: 60,
  },
];

const tempData = [];

for (let i = 0; i < tempConfig.length; i += 1) {
  const arr = [];
  for (let min = tempConfig[i].tempMin; min <= tempConfig[i].tempMax; min += 1) {
    arr.push({
      text: `${min}`,
      value: min,
    });
  }
  tempData.push([arr]);
}

export {
  tempConfig,
  tempData,
};
