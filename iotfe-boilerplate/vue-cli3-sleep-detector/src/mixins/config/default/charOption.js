// import echarts from 'echarts';

class ChartOption {
  constructor() {
    this.init();
  }
  
  init() {
  }
}

ChartOption.heartRate = {
  fontFamily: 'monospace',
  title: {
    show: false,
    text: "心率波动图",
    textStyle: {
      fontWeight: '100',
      fontSize: '15',
      fontFamily: 'Helvetica',
    },
  },
  tooltip: {
    show: true,
    trigger: 'axis', // 触发类型
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: '#0a9ee4',
        type: 'dotted',
      },
    },
    backgroundColor: 'rgba(245, 245, 245, 0.8)',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    textStyle: {
      color: '#333',
    },
  },
  legend: false,
  grid: {
    left: 'center',
    top: '18%',
    right: '0',
    bottom: 0,
    containLabel: true,
    width: '92%', // 图例宽度
    height: 'auto', // 图例高度
  },
  // calculable: false, // 拖拽手柄
  xAxis: {
    axisLine: {
      show: false, // 坐标轴线
      lineStyle: {
        color: '#5C5C5C',
      },
    },
    axisTick: {
      show: false, // 坐标轴刻度
    },
    splitLine: {
      show: false, // 坐标轴刻度线
    },
    type: 'category',
    boundaryGap: true,
    // data: ['10:00', '10:10', '10:10', '10:20', '10:30', '10:40', '10:50'],
    data: ['10:00', '10:10', '10:10', '10:20', '10:30', '10:40', '10:50'].map(el => {
      return {
        value: el, 
        textStyle: { color: '#666' },
      };
    }),
    // data: [1588815905830, 1588816505830, 1588817105830, 1588817705830, 1588818305830, 1588818905830, 1588819505830],
  },
  yAxis: {
    axisLine: {
      show: false,
    },
    splitLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: true,
      color: "#666",
    },
    name: '    睡眠过程心率',
    nameTextStyle: {
      color: '#999',
      fontSize: 14,
      padding: [0, 0, 0, 20],
    },
    // boundaryGap: false,
    type: 'value',
  },
  series: [
    {
      name: '心率值',
      type: 'line',
      showSymbol: false,
      symbol: "circle", // 折线点设置为实心点
      symbolSize: 0, // 折线点的大小
      itemStyle: {
        normal: {
          // 添加渐变颜色
          /* color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(179, 231, 255)',
            },
            {
              offset: 1,
              color: 'rgb(255, 255, 255)',
            },
          ]), */
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgb(180, 231, 255)' // 0% 处的颜色
            }, {
              offset: 0.8, color: 'rgb(241, 250, 255)' // 80% 处的颜色
            }, {
              offset: 1, color: 'rgb(253, 254, 255)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          },
          areaStyle: { type: 'default' },
          borderWidth: 5,
          borderColor: '#66ceff',
        },
      },
      lineStyle: {
        color: "rgba(167, 224, 250, .8)",
        width: 1,
      },
      data: [68, 73, 82, 90, 85, 77, 95, ],
    },
  ],
  // tooltip: {
  //   show: true,
  //   trigger: 'axis', // 触发类型
  //   formatter: params  => {
  //     console.log(params);
  //     return `<div style="text-align: left;padding: 2px">时间：${params[0].name}<br/>
  //     心率：${params[0].value} 次/分</div>`;
  //   },
  //   axisPointer: {
  //     type: 'line',
  //     lineStyle: {
  //       color: '#0a9ee4',
  //       type: 'dotted',
  //     },
  //   },
  //   backgroundColor: 'rgba(245, 245, 245, 0.8)',
  //   borderWidth: 1,
  //   borderColor: '#ccc',
  //   padding: 5,
  //   textStyle: {
  //     fontFamily: 'FZLTH--GB1-4',
  //     fontSize: 13,
  //     lineHeight: 60,
  //     color: '#333',

  //   },
  // },
};

ChartOption.breathRate = {
  fontFamily: 'monospace',
  title: {
    show: false,
    text: "   呼吸波动图",
    textStyle: {
      fontWeight: '100',
      fontSize: '15',
      fontFamily: 'Helvetica',
    },
  },
  tooltip: {
    show: true,
    trigger: 'axis', // 触发类型
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: '#0a9ee4',
        type: 'dotted',
      },
    },
    backgroundColor: 'rgba(245, 245, 245, 0.8)',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    textStyle: {
      color: '#333',
    },
  },
  legend: false,
  grid: {
    left: 'center',
    top: '18%',
    right: '0',
    bottom: 0,
    containLabel: true,
    width: '92%', // 图例宽度
    height: 'auto', // 图例高度
  },
  // calculable: false, // 拖拽手柄
  xAxis: {
    axisLine: {
      show: false, // 坐标轴线
      lineStyle: {
        color: '#5C5C5C',
      },
    },
    axisTick: {
      show: false, // 坐标轴刻度
    },
    splitLine: {
      show: false, // 坐标轴刻度线
    },
    type: 'category',
    boundaryGap: true,
    // data: ['10:00', '10:10', '10:10', '10:20', '10:30', '10:40', '10:50'],
    data: ['10:00', '10:10', '10:10', '10:20', '10:30', '10:40', '10:50'].map(el => {
      return {
        value: el, 
        textStyle: { color: '#666' },
      };
    }),
    // data: [1588815905830, 1588816505830, 1588817105830, 1588817705830, 1588818305830, 1588818905830, 1588819505830],
  },
  yAxis: {
    axisLine: {
      show: false,
    },
    splitLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: true,
      color: "#666",
    },
    name: '       睡眠过程呼吸率',
    nameTextStyle: {
      color: '#999',
      fontSize: 14,
      padding: [0, 0, 0, 20],
    },
    // boundaryGap: false,
    type: 'value',
  },
  series: [
    {
      name: '呼吸率',
      type: 'line',
      // stack: '总量',
      // symbol: "circle", //折线点设置为实心点
      symbolSize: 0, // 折线点的大小
      itemStyle: {
        normal: {
          // 添加渐变颜色
          /* color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(179, 231, 255)',
            },
            {
              offset: 1,
              color: 'rgb(255, 255, 255)',
            },
          ]), */
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgb(180, 231, 255)' // 0% 处的颜色
            }, {
              offset: 0.8, color: 'rgb(241, 250, 255)' // 80% 处的颜色
            }, {
              offset: 1, color: 'rgb(253, 254, 255)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          },
          areaStyle: { type: 'default' },
          borderWidth: 5,
          borderColor: '#66ceff',
        },
      },
      data: [68, 73, 82, 90, 85, 77, 95, ],
    },
  ],
};

ChartOption.movement = {
  fontFamily: 'monospace',
  title: {
    show: false,
    text: "体动图",
    textStyle: {
      fontWeight: '100',
      fontSize: '15',
      fontFamily: 'Helvetica',
    },
  },
  tooltip: {
    show: true,
    trigger: 'axis', // 触发类型
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: '#0a9ee4',
        type: 'dotted',
      },
    },
    backgroundColor: 'rgba(245, 245, 245, 0.8)',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    textStyle: {
      color: '#333',
    },
  },
  legend: false,
  grid: {
    left: 'center',
    top: '18%',
    right: '0',
    bottom: 0,
    containLabel: true,
    width: '92%', // 图例宽度
    height: 'auto', // 图例高度
  },
  // calculable: false, // 拖拽手柄
  xAxis: {
    axisLine: {
      show: false, // 坐标轴线
      lineStyle: {
        color: '#5C5C5C',
      },
    },
    axisTick: {
      show: false, // 坐标轴刻度
    },
    splitLine: {
      show: false, // 坐标轴刻度线
    },
    type: 'category',
    boundaryGap: true,
    // data: ['10:00', '10:10', '10:10', '10:20', '10:30', '10:40', '10:50'],
    data: ['10:00', '10:10', '10:10', '10:20', '10:30', '10:40', '10:50'].map(el => {
      return {
        value: el, 
        textStyle: { color: '#666' },
      };
    }),
    // data: [1588815905830, 1588816505830, 1588817105830, 1588817705830, 1588818305830, 1588818905830, 1588819505830],
  },
  yAxis: {
    minInterval: 1, // 最小单位刻度设置
    axisLine: {
      show: false,
    },
    splitLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: true,
      color: "#666",
    },
    name: '(弱/强)',
    nameTextStyle: {
      color: '#999',
      fontSize: 14,
      padding: [0, 0, 0, 20],
    },
    // boundaryGap: false,
    type: 'value',
  },
  series: [
    {
      name: '体动',
      type: 'line',
      // stack: '总量',
      // symbol: "circle", //折线点设置为实心点
      symbolSize: 0, // 折线点的大小
      itemStyle: {
        normal: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgb(180, 231, 255)' // 0% 处的颜色
            }, {
              offset: 0.8, color: 'rgb(232, 248, 255)' // 80% 处的颜色
            }, {
              offset: 1, color: 'rgb(253, 254, 255)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          },
          areaStyle: { type: 'default' },
          borderWidth: 5,
          borderColor: '#66ceff',
        },
      },
      data: [2, 4, 5, 3, 5, 1, 2, ],
    },
  ],
};

ChartOption.sleepScore_week = {
  fontFamily: 'monospace',
  title: {
    show: false,
    text: "睡眠评分",
    textStyle: {
      fontWeight: '100',
      fontSize: '15',
      fontFamily: 'Helvetica',
    },
  },
  tooltip: {
    show: true,
    trigger: 'axis', // 触发类型
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: '#0a9ee4',
        type: 'dotted',
      },
    },
    backgroundColor: 'rgba(245, 245, 245, 0.8)',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    textStyle: {
      color: '#333',
    },
  },
  legend: false,
  grid: {
    left: 'center',
    top: '18%',
    right: '0',
    bottom: 0,
    containLabel: true,
    width: '92%', // 图例宽度
    height: 'auto', // 图例高度
  },
  // calculable: false, // 拖拽手柄
  xAxis: {
    axisLine: {
      show: false, // 坐标轴线
      lineStyle: {
        color: '#5C5C5C',
      },
    },
    axisTick: {
      show: false, // 坐标轴刻度
    },
    splitLine: {
      show: false, // 坐标轴刻度线
    },
    type: 'category',
    boundaryGap: true,
    // data: ['10:00', '10:10', '10:10', '10:20', '10:30', '10:40', '10:50'],
    data: ['5/03', '5/04', '5/05', '5/06', '5/07', '5/08', '5/09'].map(el => {
      return {
        value: el, 
        textStyle: { color: '#666' },
      };
    }),
    // data: [1588815905830, 1588816505830, 1588817105830, 1588817705830, 1588818305830, 1588818905830, 1588819505830],
  },
  yAxis: {
    axisLine: {
      show: false,
    },
    splitLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: true,
      color: "#666",
    },
    name: '每日睡眠评分',
    nameTextStyle: {
      color: '#333',
      fontSize: 12,
      padding: [0, 0, 0, 20],
    },
    // boundaryGap: false,
    min: 0,
    max: 100,
    type: 'value',
  },
  series: [
    {
      name: '睡眠评分',
      type: 'bar',
      barWidth: '50%',
      // stack: '总量',
      // symbol: "circle", //折线点设置为实心点
      symbolSize: 0, // 折线点的大小
      itemStyle: {
        normal: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(77, 197, 252, 1)' // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(77, 197, 252, .2)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          },
          areaStyle: { type: 'default' },
          borderWidth: 1,
          borderColor: 'rgba(128,128,128, .1)',
        },
      },
      // data: [90, 60, 40, 60, 70, 60, 100, ],
      data: [{
        value: 90,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(149, 227, 162, 1)' // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(149, 227, 162, .2)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          },
        },
      }, {
        value: 60,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(77, 197, 252, 1)' // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(77, 197, 252, .2)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          },
        },
      }, {
        value: 40,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(248, 152, 118, 1)' // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(248, 152, 118, .2)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          },
        },
      }, {
        value: 60,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(77, 197, 252, 1)' // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(77, 197, 252, .2)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          },
        },
      }, {
        value: 70,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(77, 197, 252, 1)' // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(77, 197, 252, .2)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          },
        },
      }, {
        value: 60,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(77, 197, 252, 1)' // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(77, 197, 252, .2)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          },
        },
      }, {
        value: 100,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(149, 227, 162, 1)' // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(149, 227, 162, .2)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          },
        },
      }, ],
    },
  ],
};

ChartOption.sleepScore_month = {
  fontFamily: 'monospace',
  title: {
    show: false,
    text: "睡眠评分",
    textStyle: {
      fontWeight: '100',
      fontSize: '15',
      fontFamily: 'Helvetica',
    },
  },
  tooltip: {
    show: true,
    trigger: 'axis', // 触发类型
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: '#0a9ee4',
        type: 'dotted',
      },
    },
    backgroundColor: 'rgba(245, 245, 245, 0.8)',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    textStyle: {
      color: '#333',
    },
  },
  legend: false,
  grid: {
    left: 'center',
    top: '18%',
    right: '0',
    bottom: 0,
    containLabel: true,
    width: '92%', // 图例宽度
    height: 'auto', // 图例高度
  },
  // calculable: false, // 拖拽手柄
  xAxis: {
    axisLine: {
      show: false, // 坐标轴线
      lineStyle: {
        color: '#5C5C5C',
      },
    },
    axisTick: {
      show: false, // 坐标轴刻度
    },
    splitLine: {
      show: false, // 坐标轴刻度线
    },
    type: 'category',
    boundaryGap: true,
    // data: ['10:00', '10:10', '10:10', '10:20', '10:30', '10:40', '10:50'],
    data: ['5/03', '5/04', '5/05', '5/06', '5/07', '5/08', '5/09'].map(el => {
      return {
        value: el, 
        textStyle: { color: '#666' },
      };
    }),
    // data: [1588815905830, 1588816505830, 1588817105830, 1588817705830, 1588818305830, 1588818905830, 1588819505830],
  },
  yAxis: {
    axisLine: {
      show: false,
    },
    splitLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: true,
      color: "#666",
    },
    name: '每日睡眠评分',
    nameTextStyle: {
      color: '#333',
      fontSize: 12,
      padding: [0, 0, 0, 20],
    },
    // boundaryGap: false,
    min: 0,
    max: 100,
    type: 'value',
  },
  series: [
    {
      name: '睡眠评分',
      type: 'bar',
      barWidth: '50%',
      // stack: '总量',
      // symbol: "circle", //折线点设置为实心点
      symbolSize: 0, // 折线点的大小
      itemStyle: {
        normal: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(77, 197, 252, 1)' // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(77, 197, 252, .2)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          },
          areaStyle: { type: 'default' },
          borderWidth: 1,
          borderColor: 'rgba(128,128,128, .1)',
        },
      },
      // data: [90, 60, 40, 60, 70, 60, 100, ],
      data: [{
        value: 90,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(149, 227, 162, 1)' // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(149, 227, 162, .2)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          },
        },
      }, {
        value: 60,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(77, 197, 252, 1)' // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(77, 197, 252, .2)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          },
        },
      }, {
        value: 40,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(248, 152, 118, 1)' // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(248, 152, 118, .2)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          },
        },
      }, {
        value: 60,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(77, 197, 252, 1)' // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(77, 197, 252, .2)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          },
        },
      }, {
        value: 70,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(77, 197, 252, 1)' // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(77, 197, 252, .2)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          },
        },
      }, {
        value: 60,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(77, 197, 252, 1)' // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(77, 197, 252, .2)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          },
        },
      }, {
        value: 100,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(149, 227, 162, 1)' // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(149, 227, 162, .2)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          },
        },
      }],
    },
  ],
};

export default ChartOption;
