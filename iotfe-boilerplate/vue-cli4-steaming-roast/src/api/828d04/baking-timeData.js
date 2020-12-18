// 专业烘烤

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
  {// 3D热风
    hourRange: [0, 2],
    defaultIndex: [0, 20],
    defaultValue: [0, 20],
    minuteRange: {
      0: [1, 59],
      2: [0, 0],
    },
  },
  {// 烧烤小面积
    hourRange: [0, 2],
    defaultIndex: [0, 15],
    defaultValue: [0, 15],
    minuteRange: {
      0: [1, 59],
      2: [0, 0],
    },
  },
  {// 烧烤大面积
    hourRange: [0, 2],
    defaultIndex: [0, 15],
    defaultValue: [0, 15],
    minuteRange: {
      0: [1, 59],
      2: [0, 0],
    },
  },
  {// 热风烧烤
    hourRange: [0, 2],
    defaultIndex: [0, 20],
    defaultValue: [0, 20],
    minuteRange: {
      0: [1, 59],
      2: [0, 0],
    },
  },
  {// 上下加热
    hourRange: [0, 2],
    defaultIndex: [0, 40],
    defaultValue: [0, 40],
    minuteRange: {
      0: [1, 59],
      2: [0, 0],
    },
  },
  {// 底部加热
    hourRange: [0, 2],
    defaultIndex: [0, 30],
    defaultValue: [0, 30],
    minuteRange: {
      0: [1, 59],
      2: [0, 0],
    },
  },
  {// 背底加热
    hourRange: [0, 2],
    defaultIndex: [0, 15],
    defaultValue: [0, 15],
    minuteRange: {
      0: [1, 59],
      2: [0, 0],
    },
  },
  {// 节能热风
    hourRange: [0, 2],
    defaultIndex: [0, 30],
    defaultValue: [0, 30],
    minuteRange: {
      0: [1, 59],
      2: [0, 0],
    },
  },
  {// 节能上下加热
    hourRange: [0, 2],
    defaultIndex: [0, 30],
    defaultValue: [0, 30],
    minuteRange: {
      0: [1, 59],
      2: [0, 0],
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
