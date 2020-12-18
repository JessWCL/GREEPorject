/*
 * @Author: Jerry-Rain
 * @Date: 2020-04-06 08:47:21
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-04-17 10:08:10
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
            fontFamily: 'Helvetica',
          },
        },
        tooltip: {
          trigger: 'axis', // 触发类型
          axisPointer: {
            type: 'line',
            lineStyle: {
              // color: '#D9F3FF'
              type: 'dotted',
            },
          },
    
          backgroundColor: 'rgba(245, 245, 245, 0.8)',
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          textStyle: {
            color: '#000',
          },
        },
        grid: {
          // top: "50px",
          left: '10%',
          // right: "15%",
          // bottom: "50px",
          // backgroundColor: "#fff",
          width: '85%', // 图例宽度
          height: '65%', // 图例高度
        },
        calculable: false, // 拖拽手柄
        xAxis: {
          axisLine: {
            show: false, // 坐标轴线
          },
          axisTick: {
            show: false, // 坐标轴刻度
          },
          splitLine: {
            show: false, // 坐标轴刻度线
          },
          type: 'category',
          // boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
          // boundaryGap: false,
          type: 'value',
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
                    color: 'rgb(179, 231, 255)',
                  },
                  {
                    offset: 1,
                    color: 'rgb(255, 255, 255)',
                  },
                ]),
                areaStyle: { type: 'default' },
                borderWidth: 5,
                borderColor: '#66ceff',
              },
            },
            data: [68, 73, 82, 90, 85, 77, 95],
          },
        ],
      },
      breathOption: {
        fontFamily: 'monospace',
        title: {
          // text: "　呼吸波动图",
          textStyle: {
            fontWeight: '100',
            fontSize: '15',
            fontFamily: 'Helvetica',
          },
        },
        tooltip: {
          trigger: 'axis', // 触发类型
          axisPointer: {
            type: 'line',
            lineStyle: {
              // color: '#D9F3FF'
              type: 'dotted',
            },
          },
    
          backgroundColor: 'rgba(245, 245, 245, 0.8)',
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          textStyle: {
            color: '#000',
          },
        },
        grid: {
          // top: "50px",
          left: '10%',
          // right: "15%",
          // bottom: "50px",
          // backgroundColor: "#fff",
          width: '85%', // 图例宽度
          height: '65%', // 图例高度
        },
        calculable: false, // 拖拽手柄
        xAxis: {
          axisLine: {
            show: false, // 坐标轴线
          },
          axisTick: {
            show: false, // 坐标轴刻度
          },
          splitLine: {
            show: false, // 坐标轴刻度线
          },
          type: 'category',
          // boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
          // boundaryGap: false,
          type: 'value',
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
                    color: 'rgb(179, 231, 255)',
                  },
                  {
                    offset: 1,
                    color: 'rgb(255, 255, 255)',
                  },
                ]),
                areaStyle: { type: 'default' },
                borderWidth: 5,
                borderColor: '#66ceff',
              },
            },
            data: [68, 73, 82, 90, 85, 77, 95],
          },
        ],
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
      monthOption: {
        title: {
          text: '　每日睡眠评分',
          textStyle: {
            fontWeight: '100',
            fontSize: '15',
            fontFamily: 'Helvetica',
          },
        },
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(179, 231, 255)',
          },
          {
            offset: 1,
            color: 'rgb(255, 255, 255)',
          },
        ]),
        tooltip: {
          trigger: 'axis', // 触发类型
          axisPointer: {
            type: 'line',
            lineStyle: {
              // color: '#D9F3FF'
              type: 'dotted',
            },
          },
    
          backgroundColor: 'rgba(245, 245, 245, 0.8)',
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          textStyle: {
            color: '#000',
          },
        },
        grid: {
          // top: "50px",
          left: '10%',
          // right: "15%",
          // bottom: "50px",
          // backgroundColor: "#fff",
          width: '90%', // 图例宽度
          height: '50%', // 图例高度
        },
        xAxis: [
          {
            type: 'category',
            data: [
              '12/01',
              '12/02',
              '12/03',
              '12/04',
              '12/05',
              '12/06',
              '12/07',
              '12/08',
              '12/09',
              '12/10',
              '12/11',
              '12/12',
              '12/13',
              '12/14',
              '12/15',
              '12/16',
              '12/17',
              '12/18',
              '12/19',
              '12/20',
              '12/21',
              '12/22',
              '12/21',
              '12/22',
              '12/23',
              '12/24',
              '12/25',
              '12/26',
            ],
            axisLine: {
              show: false, // 坐标轴线
            },
            axisTick: {
              show: false, // 坐标轴刻度
            },
            splitLine: {
              show: false, // 坐标轴刻度线
            },
            type: 'category',
          },
        ],
        yAxis: [
          {
            axisLine: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            type: 'value',
          },
        ],
        series: [
          {
            name: '睡眠评分',
            type: 'bar',
            barWidth: '60%',
            data: [
              68,
              58,
              73,
              55,
              66,
              99,
              77,
              68,
              58,
              73,
              55,
              66,
              99,
              77,
              68,
              58,
              73,
              55,
              66,
              99,
              77,
              68,
              58,
              73,
              55,
              66,
              99,
              77,
            ],
          },
        ],
      },
      // 统计图的配置
      option: {
        fontFamily: 'monospace',
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
          top: '8%',
          left: '10%',
          // right: "15%",
          // bottom: "50px",
          // backgroundColor: "#fff",
          width: '90%', // 图例宽度
          height: '75%' // 图例高度
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
          axisLabel: {
            formatter: function(parms) {
              return `${parms / 1000} k`;
            }
          },
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
            name: '数值',
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
            data: [11, 22, 24, 15, 24, 22, 31]
          }
        ],
        week: '',
        month: ''
      },
      standerOption: {
        fontFamily: 'monospace',
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
          top: '8%',
          left: '8%',
          width: '88%', // 图例宽度
          height: '75%' // 图例高度
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
            name: '数值',
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
            data: [11, 22, 24, 15, 24, 22, 31]
          }
        ],
        week: '',
        month: ''
      },
      personalOption: {
        fontFamily: 'monospace',
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
          top: '8%',
          left: '8%',
          width: '88%', // 图例宽度
          height: '75%' // 图例高度
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
            name: '数值',
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
            data: [11, 22, 24, 15, 24, 22, 31]
          }
        ],
        week: '',
        month: ''
      },
    };
  }
};

export default echartsOpt;
