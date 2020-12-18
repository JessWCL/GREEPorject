/*
 * @Author: Jerry-Rain
 * @Date: 2020-04-21 19:26:20
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-07-23 16:37:46
 * @Description: 
 */

const chartsConfig = {
  data() {
    return {
      tooltip: {
        formatter: '当年用电量：{c} kW·h',
        trigger: 'item', // 数据项图形触发
        backgroundColor: '#fff',
        padding: 3,
        show: true,
        textStyle: {
          fontFamily: 'FZLTH--GB1-4',
          fontSize: '0.31rem',
          color: '#404657',
        },
      },
      dataZoom: [
        {
          type: 'inside',
          show: false,
          startValue: 0,
          endValue: 10,
        }
      ],
      dayChartOpt: {
        grid: {
          // left: '6%',
        //   top: '25%',
          right: '6%',
          bottom: '20%',
          containLabel: false,
        },
        xAxis: {
          // name: '/h',
          type: 'category',
          data: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24], // X轴数据
          nameLocation: 'end', // 单位显示位置
          axisTick: {
            // 坐标轴的刻度
            show: false, // 是否显示
            nameTextStyle: {
              height: '100%',
            },
          },
          axisLine: {
            // 坐标轴 轴线
            show: true, // 是否显示
            // ----- 线 -------
            lineStyle: {
              color: '#fff',
              width: 1,
              type: 'solid',
            },
          },
    
          splitLine: {
            // gird 区域中的分割线
            onZero: true,
            show: false, // 是否显示
            lineStyle: {
              color: '#666',
              width: 1,
              type: 'dotted',
            },
          },
          axisLabel: {
            // 刻度文字
            color: '#fff',
            fontSize: '0.29rem',
          },
        },
        yAxis: {
          // show: false,
          // min: function (value) {
          //     return value.min - 20;
          // },
          minInterval: 0.01, // 最小单位刻度设置
          name: 'kW·h',
          boundaryGp: [0, 0],
          splitLine: {
            // Y轴横线
            show: true, // y轴数值线  ####################
            lineStyle: {
              color: '#CEEDFB', // 颜色 #############
              width: 1,
              type: 'dotted',
            },
          },
          axisLine: {
            // 坐标轴 轴线
            show: false, // 是否显示 ############################
            // ----- 线 -------
            lineStyle: {
              color: '#fff',
              width: 1,
              type: 'solid',
            },
          },
          axisTick: {
            // 坐标轴的刻度
            show: false, // 是否显示  #############################
            nameTextStyle: {
              height: '100%',
            },
          },
          axisLabel: {
            // 刻度文字
            show: true,
            color: '#fff',
            fontSize: '0.25rem',
          },
        },
        series: [
          {
            // name: "使用电量：",
            data: [80, 20, 18, 60, 20, 66, 21, 33, 20, 18, 100, 88],
            color: '#98D9F7',
            type: 'bar',
            barCategoryGap: '0', // 柱形的间距
            label: {
              // 图形上的文本标签
              show: false,
              position: 'insideTop', // 相对位置
              rotate: 0, // 旋转角度
              color: '#eee',
            }, // 配置样式
            itemStyle: {
              normal: {
                // 当前选中的柱子使用亮色，其余的使用基本颜色
                color: function (param) {
                  return '#92D6F6';
                },
                borderColor: '#CEEDFB', // 边框颜色
              }, // 鼠标悬停时：
              emphasis: {
                color: '#fff',
              },
            },
          },
        ],
        tooltip: {
          formatter: '累计用电量:{c} kW·h',
          trigger: 'item', // 数据项图形触发
          backgroundColor: '#fff',
          padding: 3,
          show: true, // 是否显示提示框，默认为true
          textStyle: {
            // 提示框内容的样式
            fontFamily: 'FZLTH--GB1-4',
            fontSize: '0.31rem',
            color: '#404657',
          },
        },
      },
      otherOpt: {
        grid: {
          left: '12%',
          top: '11%',
          right: '6%',
          bottom: '20%',
          containLabel: false,
        },
        xAxis: {
          // name: '日',
          type: 'category',
          data: [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29,
            30,
            31,
          ], // X轴数据
          nameLocation: 'end', // 单位显示位置
          axisTick: {
            // 坐标轴的刻度
            show: false, // 是否显示
            nameTextStyle: {
              height: '100%',
            },
          },
          axisLine: {
            // 坐标轴 轴线
            show: true, // 是否显示
            // ----- 线 -------
            lineStyle: {
              color: '#fff',
              width: 1,
              type: 'solid',
            },
          },
    
          splitLine: {
            onZero: true,
            show: false, // 是否显示
            lineStyle: {
              color: '#666',
              width: 1,
              type: 'dotted',
            },
          },
          axisLabel: {
            // 刻度文字
            color: '#fff',
            fontSize: '0.4rem',
            // interval: 0, // 坐标全显示 #############
          },
        },
        yAxis: {
          show: true,
          name: 'kW·h',
          type: 'value',
          minInterval: 0.01, // 最小单位刻度设置
          splitLine: {
            // Y轴横线
            show: true, // y轴数值线  ####################
            lineStyle: {
              color: '#CEEDFB', // 颜色 #############
              width: 1,
              type: 'dotted',
            },
          },
          axisLine: {
            // 坐标轴 轴线
            show: false, // 是否显示 ############################
            // ----- 线 -------
            lineStyle: {
              color: '#fff',
              width: 1,
              type: 'solid',
            },
          },
          axisTick: {
            // 坐标轴的刻度
            show: false, // 是否显示  #############################
            nameTextStyle: {
              height: '100%',
            },
          },
          axisLabel: {
            // 刻度文字
            show: true,
            color: '#fff',
            fontSize: '50px',
          },
        },
        series: [
          {
            data: [
              10,
              20,
              18,
              10,
              2,
              66,
              21,
              10,
              20,
              18,
              10,
              2,
              66,
              21,
              10,
              20,
              18,
              10,
              2,
              66,
              21,
              10,
              20,
              18,
              10,
              2,
              66,
              21,
              28,
              50,
            ],
            color: '#98D9F7',
            type: 'bar',
            barMaxWidth: 30, // 柱图宽度 #######################
            barCategoryGap: 10, // 柱形的间距
            label: {
              // 图形上的文本标签
              show: false,
              position: 'insideTop', // 相对位置
              rotate: 0, // 旋转角度
              color: '#eee',
            }, // 配置样式
            itemStyle: {
              padding: 10,
              // 通常情况下：
              normal: {
                // 当前选中的柱子使用亮色，其余的使用基本颜色
                barBorderRadius: [5, 5, 5, 5], // （顺时针左上，右上，右下，左下）
                color: function (param) {
                  return '#92D6F6';
                },
                // borderColor: "#CEEDFB" // 边框颜色
              }, // 鼠标悬停时：
              emphasis: {
                color: '#fff',
              },
            },
          },
        ],
        dataZoom: [
          {
            type: 'inside',
            show: false,
            startValue: 0,
            endValue: 10,
          }
        ],
        tooltip: {
          formatter: '当年用电量：{c} kW·h',
          trigger: 'item', // 数据项图形触发
          // position: "top",
          backgroundColor: '#fff',
          padding: 3,
          show: true, // 是否显示提示框，默认为true
          textStyle: {
            // 提示框内容的样式
            fontFamily: 'FZLTH--GB1-4',
            fontSize: '0.31rem',
            color: '#404657',
          },
        },
      },
      // eslint-disable-next-line max-len
      debugData: { dayChart: [[80, 20, 18, 60, 20, 66, 21, 33, 20, 18, 100, 88], [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]], weekChart: [[100, 200, 108, 100, 20, 66, 21, 10, 200, 180, 100, 2, 66, 210, 100, 20, 108, 100, 20, 66, 21, 100, 20, 180, 10, 2, 66, 21, 28, 500], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]], monthChart: [[100, 200, 100, 500, 303, 202, 500, 40, 101, 505, 700, 300], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]], yearChart: [[888, 111], [2018, 2019]]}
    };
  },
};
  
export default chartsConfig;
  
