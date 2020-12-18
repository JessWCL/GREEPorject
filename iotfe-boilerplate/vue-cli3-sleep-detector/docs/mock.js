const json = {
  daily: {
    date: 1587202410958,
    score: 85,
    heartRate: 12,
    snore: 1587202410958,
    movement: 20,
    breathRate: 11,
    sleepDuration: 5050,
    wakeDuration: 300,
    lightSleepDuration: 500,
    deepSleepDuration: 500,
    REM: 3000,
    leaveBed: 2000,
    sleepStart: 1575076011000,
    sleepEnd: 1575076012000,
    sleepTip: '睡眠建议',
    sleepStage: [
      {
        stage: 0,
        start: 1587202410958,
        end: 1587202410980,
      },
      {
        stage: 2,
        start: 1587202410980,
        end: 1587202410999,
      },
    ],
    charts: {
      heartRate: {
        name: '心率波动',
        maximum: 80,
        maximumAt: 1575076011000,
        minimum: 60,
        minimumAt: 1575076011000,
        times: [1586620800, 1586707200],
        values: [469, 462],
      },
      breath: {
        name: '呼吸波动',
        maximum: 80,
        maximumAt: 1575076011000,
        minimum: 60,
        minimumAt: 1575076011000,
        times: [1586620800, 1586707200],
        values: [469, 462],
      },
      movement: {
        name: '体动',
        times: [1586620800, 1586707200],
        values: [469, 462],
      },
    },

  },
  week: {}
};

function sliceArr(arr, max = 10) {
  if (arr.length <= max) {
    return arr;
  }
  const quotient = arr.length / max;
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (i % Math.ceil(quotient) === 0) {
      result.push(arr[i]);
    }
  }
  return result;
}

module.exports = {
  json,
  sliceArr,
};
