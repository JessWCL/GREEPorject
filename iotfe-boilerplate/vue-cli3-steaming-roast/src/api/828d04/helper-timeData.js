// 辅助模式

// 包含 0 ~ 59 的数组
const minuteArr = [];
for (let i = 0; i < 60; i += 1) {
  minuteArr.push({
    text: `${i}`,
    value: i,
  });
}

// 模式顺序对应AuxiliaryFunction.vue中swiper的顺序
/*
  {
    hourRange: [0, 1], // 小时取值范围 [最小值, 最大值]
    defaultIndex: [0, 20], // 默认索引 [小时, 分钟]
    minuteRange: { 
      // 分钟取值范围 
      // key中未包含的小时，取 minuteArr (包含 1 ~ 59 的数组)
      0: [5, 59], // key:value <=> 小时 : [分钟最小值, 分钟最大值]
    },
  },
*/
const timeConfig = [
  {// 解冻
    hourRange: [0, 1],
    defaultIndex: [0, 15],
    defaultValue: [0, 20],
    minuteRange: {
      0: [5, 59],
      1: [0, 0],
    },
  },
  {// 发酵
    hourRange: [0, 24],
    defaultIndex: [1, 0],
    defaultValue: [1, 0],
    minuteRange: {
      0: [20, 59],
      24: [0, 0],
    },
  },
  {// 烘焙再加热
    hourRange: [0, 1],
    defaultIndex: [0, 10],
    defaultValue: [0, 15],
    minuteRange: {
      0: [5, 59],
      1: [0, 0],
    },
  },
  {// 蒸汽再加热
    hourRange: [0, 1],
    defaultIndex: [0, 10],
    defaultValue: [0, 15],
    minuteRange: {
      0: [5, 59],
      1: [0, 0],
    },
  },
  {// 餐具消毒
    hourRange: [0, 2],
    defaultIndex: [0, 10],
    defaultValue: [0, 30],
    minuteRange: {
      0: [20, 59],
      2: [0, 0],
    },
  },
  {// 焯水
    hourRange: [0, 0],
    defaultIndex: [0, 7],
    defaultValue: [0, 10],
    minuteRange: {
      0: [3, 20],
    },
  },
  {// 保温
    hourRange: [0, 4],
    defaultIndex: [0, 29],
    defaultValue: [0, 30],
    minuteRange: {
      0: [1, 59],
      4: [0, 0],
    },
  },
  {// 暖盘
    hourRange: [0, 0],
    defaultIndex: [0, 9],
    defaultValue: [0, 10],
    minuteRange: {
      0: [1, 30],
    },
  },
];

const timeData = [];

for (let i = 0; i < timeConfig.length; i += 1) {
  // 循环每个模式的配置
  const arr = [];
  const {hourRange} = timeConfig[i];
  for (let hour = hourRange[0]; hour <= hourRange[1]; hour += 1) {
    // 循环每个小时配置
    let children = [];
    const minuteRange = timeConfig[i].minuteRange[hour];
    if (minuteRange) {
      for (let minute = minuteRange[0]; minute <= minuteRange[1]; minute += 1) {
        // 循环每个特殊处理的分钟的配置
        children.push({
          text: `${minute}`,
          value: minute,
        });
      }
    } else {
      // 0~59 的默认分钟数组
      children = minuteArr.slice();
    }
    arr.push({
      text: `${hour}`,
      value: hour,
      children,
    });
  }
  timeData.push([arr]);
}

export {
  timeConfig,
  timeData,
};
