// 植物默认配置表

// 配置说明：
// eslint-disable-next-line
{
  /* const plantsExample = {
    species: '植物种类',
    light: { // 光照
      on: [14, 0], // 光照开启[小时, 分钟]
      off: [10, 0], // 光照关闭[小时, 分钟]
    },
    wind: { // 新风
      on: [1, 0],
      off: [0, 30],
    },
    water: { // 水循环
      on: [1, 1],
      off: [0, 0],
      // 关闭设置为0, 开启设置非0时，常开
      // 关闭设置非0, 开启设置为0时，常关
      // 关闭设置为0, 开启设置为0时，用户手动控制
    },
    humidity: 75, // 湿度
    temperature: 20, // 温度
    children: [
      {
        name: '优雅生菜',
        PltType: 1, // wifi协议字段值
        humidity: null, // 湿度
        temperature: null, // 温度
      },
    ],
  }; */
}

const plantsList = [
  // 生菜
  {
    species: '生菜',
    light: {
      on: [14, 0],
      off: [10, 0],
    },
    wind: {
      on: [1, 0],
      off: [0, 30],
    },
    water: {
      on: [1, 1],
      off: [0, 0],
    },
    humidity: 75,
    temperature: 20,
    children: [
      {
        name: '优雅生菜',
        PltType: 1,
        humidity: null,
        temperature: null,
      },
      {
        name: '绿蝶生菜',
        PltType: 2,
        humidity: null,
        temperature: null,
      },
      {
        name: '波士顿生菜',
        PltType: 3,
        humidity: null,
        temperature: null,
      },
    ],
  },
  // 十字花科
  {
    species: '十字花科',
    light: {
      on: [14, 0],
      off: [10, 0],
    },
    wind: {
      on: [1, 0],
      off: [0, 30],
    },
    water: {
      on: [1, 1],
      off: [0, 0],
    },
    humidity: 85,
    temperature: 20,
    children: [
      {
        name: '青珍蔬菜',
        PltType: 4,
        humidity: null,
        temperature: null,
      },
      {
        name: '青梗青菜',
        PltType: 5,
        humidity: null,
        temperature: null,
      },
      {
        name: '白梗青菜',
        PltType: 6,
        humidity: null,
        temperature: null,
      },
    ],
  },
  // 嫩芽菜
  {
    species: '嫩芽菜',
    light: {
      on: [14, 0],
      off: [10, 0],
    },
    wind: {
      on: [1, 0],
      off: [0, 30],
    },
    water: {
      on: [1, 1],
      off: [0, 0],
    },
    humidity: 70,
    temperature: 22,
    children: [
      {
        name: '小叶菠菜',
        PltType: 7,
        humidity: 70,
        temperature: 22,
      },
      {
        name: '甜菜',
        PltType: 8,
        humidity: 80,
        temperature: 25,
      },
      {
        name: '紫罗马',
        PltType: 9,
        humidity: 72,
        temperature: 18,
      },
    ],
  },
  // 茄果
  {
    species: '茄果',
    light: {
      on: [16, 0],
      off: [8, 0],
    },
    wind: {
      on: [1, 0],
      off: [0, 30],
    },
    water: {
      on: [1, 1],
      off: [0, 0],
    },
    humidity: 72,
    temperature: 24,
    children: [
      {
        name: '草莓',
        PltType: 10,
        humidity: 85,
        temperature: 26,
      },
      {
        name: '樱桃萝卜',
        PltType: 11,
        humidity: 70,
        temperature: 22,
      },
      {
        name: '圣女果',
        PltType: 12,
        humidity: 72,
        temperature: 24,
      },
    ],
  },

];

const plantsConfig = {
  temperatureRange: [6, 30],
  humidityRange: [50, 90],
};

export {
  plantsList,
  plantsConfig,
};
