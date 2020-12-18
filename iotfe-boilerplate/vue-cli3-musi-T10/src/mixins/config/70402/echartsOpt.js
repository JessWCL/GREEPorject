/*
 * @Author: Jerry-Rain
 * @Date: 2020-03-24 10:42:08
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-03-25 14:02:30
 * @Description: 
 */
import echarts from 'echarts';

const echartsOpt = {
  data() {
    return {
      heartOption: {
        fontFamily: 'monospace',
        title: {
          // text: "　心率波动图",
          textStyle: {
            fontWeight: '100',
            fontSize: '15',
            fontFamily: 'Helvetica'
          }
        },
        tooltip: {
          trigger: 'axis', // 触发类型
          axisPointer: {
            type: 'line',
            lineStyle: {
              // color: '#D9F3FF'
              type: 'dotted'
            }
          },

          backgroundColor: 'rgba(245, 245, 245, 0.8)',
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          textStyle: {
            color: '#000'
          }
        },
        grid: {
          // top: "50px",
          left: '10%',
          // right: "15%",
          // bottom: "50px",
          // backgroundColor: "#fff",
          width: '85%', // 图例宽度
          height: '65%' // 图例高度
        },
        calculable: false, // 拖拽手柄
        xAxis: {
          axisLine: {
            show: false // 坐标轴线
          },
          axisTick: {
            show: false // 坐标轴刻度
          },
          splitLine: {
            show: false // 坐标轴刻度线
          },
          type: 'category',
          // boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          // boundaryGap: false,
          type: 'value'
        },
        series: [
          {
            name: '心率值',
            type: 'line',
            stack: '总量',
            // symbol: "circle", //折线点设置为实心点
            symbolSize: 0, // 折线点的大小
            itemStyle: {
              normal: {
                // 添加渐变颜色
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgb(179, 231, 255)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(255, 255, 255)'
                  }
                ]),
                areaStyle: { type: 'default' },
                borderWidth: 5,
                borderColor: '#66ceff'
              }
            },
            data: [68, 73, 82, 90, 85, 77, 95]
          }
        ]
      },
      breathOption: {
        fontFamily: 'monospace',
        title: {
          // text: "　呼吸波动图",
          textStyle: {
            fontWeight: '100',
            fontSize: '15',
            fontFamily: 'Helvetica'
          }
        },
        tooltip: {
          trigger: 'axis', // 触发类型
          axisPointer: {
            type: 'line',
            lineStyle: {
              // color: '#D9F3FF'
              type: 'dotted'
            }
          },

          backgroundColor: 'rgba(245, 245, 245, 0.8)',
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          textStyle: {
            color: '#000'
          }
        },
        grid: {
          // top: "50px",
          left: '10%',
          // right: "15%",
          // bottom: "50px",
          // backgroundColor: "#fff",
          width: '85%', // 图例宽度
          height: '65%' // 图例高度
        },
        calculable: false, // 拖拽手柄
        xAxis: {
          axisLine: {
            show: false // 坐标轴线
          },
          axisTick: {
            show: false // 坐标轴刻度
          },
          splitLine: {
            show: false // 坐标轴刻度线
          },
          type: 'category',
          // boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          // boundaryGap: false,
          type: 'value'
        },
        series: [
          {
            name: '心率值',
            type: 'line',
            stack: '总量',
            // symbol: "circle", //折线点设置为实心点
            symbolSize: 0, // 折线点的大小
            itemStyle: {
              normal: {
                // 添加渐变颜色
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgb(179, 231, 255)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(255, 255, 255)'
                  }
                ]),
                areaStyle: { type: 'default' },
                borderWidth: 5,
                borderColor: '#66ceff'
              }
            },
            data: [68, 73, 82, 90, 85, 77, 95]
          }
        ]
      },
      weekOption: {
        fontFamily: 'monospace',
        title: {
          textStyle: {
            fontWeight: '100',
            fontSize: '15',
            fontFamily: 'Helvetica'
          }
        },
        tooltip: {
          trigger: 'axis', // 触发类型
          axisPointer: {
            type: 'line',
            lineStyle: {
              // color: '#D9F3FF'
              type: 'dotted'
            }
          },

          backgroundColor: 'rgba(245, 245, 245, 0.8)',
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          textStyle: {
            color: '#000'
          }
        },
        grid: {
          // top: "50px",
          left: '10%',
          // right: "15%",
          // bottom: "50px",
          // backgroundColor: "#fff",
          width: '85%', // 图例宽度
          height: '65%' // 图例高度
        },
        calculable: false, // 拖拽手柄
        xAxis: {
          axisLine: {
            show: false // 坐标轴线
          },
          axisTick: {
            show: false // 坐标轴刻度
          },
          splitLine: {
            show: false // 坐标轴刻度线
          },
          type: 'category',
          // boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          // boundaryGap: false,
          type: 'value'
        },
        series: [
          {
            name: '睡眠评分',
            type: 'line',
            stack: '总量',
            // symbol: "circle", //折线点设置为实心点
            symbolSize: 1, // 折线点的大小
            itemStyle: {
              normal: {
                // 添加渐变颜色
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgb(179, 231, 255)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(255, 255, 255)'
                  }
                ]),
                areaStyle: { type: 'default' },
                borderWidth: 5,
                borderColor: '#66ceff'
              }
            },
            data: [68, 73, 82, 90, 85, 77, 95]
          }
        ]
      },
      weekHeartOption: {
        fontFamily: 'monospace',
        title: {
          // text: "　心率波动图",
          textStyle: {
            fontWeight: '100',
            fontSize: '15',
            fontFamily: 'Helvetica'
          }
        },
        tooltip: {
          trigger: 'axis', // 触发类型
          axisPointer: {
            type: 'line',
            lineStyle: {
              // color: '#D9F3FF'
              type: 'dotted'
            }
          },

          backgroundColor: 'rgba(245, 245, 245, 0.8)',
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          textStyle: {
            color: '#000'
          }
        },
        grid: {
          // top: "50px",
          left: '10%',
          // right: "15%",
          // bottom: "50px",
          // backgroundColor: "#fff",
          width: '85%', // 图例宽度
          height: '65%' // 图例高度
        },
        calculable: false, // 拖拽手柄
        xAxis: {
          axisLine: {
            show: false // 坐标轴线
          },
          axisTick: {
            show: false // 坐标轴刻度
          },
          splitLine: {
            show: false // 坐标轴刻度线
          },
          type: 'category',
          // boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          // boundaryGap: false,
          type: 'value'
        },
        series: [
          {
            name: '心率值',
            type: 'line',
            stack: '总量',
            // symbol: "circle", //折线点设置为实心点
            symbolSize: 1, // 折线点的大小
            itemStyle: {
              normal: {
                // 添加渐变颜色
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgb(179, 231, 255)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(255, 255, 255)'
                  }
                ]),
                areaStyle: { type: 'default' },
                borderWidth: 5,
                borderColor: '#66ceff'
              }
            },
            data: [68, 73, 82, 90, 85, 77, 95]
          }
        ]
      },
      weekBreathOption: {
        fontFamily: 'monospace',
        title: {
          // text: "　呼吸波动图",
          textStyle: {
            fontWeight: '100',
            fontSize: '15',
            fontFamily: 'Helvetica'
          }
        },
        tooltip: {
          trigger: 'axis', // 触发类型
          axisPointer: {
            type: 'line',
            lineStyle: {
              // color: '#D9F3FF'
              type: 'dotted'
            }
          },

          backgroundColor: 'rgba(245, 245, 245, 0.8)',
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          textStyle: {
            color: '#000'
          }
        },
        grid: {
          // top: "50px",
          left: '10%',
          // right: "15%",
          // bottom: "50px",
          // backgroundColor: "#fff",
          width: '85%', // 图例宽度
          height: '65%' // 图例高度
        },
        calculable: false, // 拖拽手柄
        xAxis: {
          axisLine: {
            show: false // 坐标轴线
          },
          axisTick: {
            show: false // 坐标轴刻度
          },
          splitLine: {
            show: false // 坐标轴刻度线
          },
          type: 'category',
          // boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          // boundaryGap: false,
          type: 'value'
        },
        series: [
          {
            name: '心率值',
            type: 'line',
            stack: '总量',
            // symbol: "circle", //折线点设置为实心点
            symbolSize: 1, // 折线点的大小
            itemStyle: {
              normal: {
                // 添加渐变颜色
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgb(179, 231, 255)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(255, 255, 255)'
                  }
                ]),
                areaStyle: { type: 'default' },
                borderWidth: 5,
                borderColor: '#66ceff'
              }
            },
            data: [68, 73, 82, 90, 85, 77, 95]
          }
        ]
      },
    };
  }
};

export default echartsOpt;
