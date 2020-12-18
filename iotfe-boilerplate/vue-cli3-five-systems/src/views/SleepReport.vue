<template>
  <div class="sleep-report-page page-section" :class="{heightFull: !envInDev}" id="sleep-report">
    <img v-if="!envInDev && env === 'production'" class="page-img" :src="imgAssets.page[randomNum]" alt />
    <template v-if="envInDev">
      <div class="gree-logo">
        <h5>格力零碳健康家</h5>
        <p>Gree Carbon-Free Health House</p>
      </div>
      <div class="sleep-report-container">
        <h2 class="title">睡眠报告</h2>
        <div class="main-box">
          <div class="main-left">
            <div class="chart-box">
              <div ref="chart1" id="chart1" class="chart-wrapper"></div>
            </div>
            <div class="chart-box">
              <div ref="chart2" id="chart2" class="chart-wrapper"></div>
            </div>
          </div>
          <div class="main-middle">
            <div class="score">
              <div class="score-bg">
                <canvas class="score-canvas" id="scoreCanvas" ref="scoreCanvas"></canvas>
              </div>
              <h2>{{ sleepData.score }}</h2>
              <p>睡眠评分</p>
            </div>
            <div class="body-data">
              <ul>
                <li>
                  <b>{{ sleepData.heartRate }}bpn</b>
                  <p>心率</p>
                </li>
                <li>
                  <b>{{ sleepData.respirationRate }}bpm</b>
                  <p>呼吸率</p>
                </li>
                <li>
                  <b>{{ sleepData.bodyMotion }}次</b>
                  <p>体动次数</p>
                </li>
              </ul>
            </div>
            <div class="health-tips">
              <h5>健康贴士</h5>
              <ul>
                <li>
                  <img :src="imgAssets.tips[0]" alt />
                  <b>运动</b>
                </li>
                <li>
                  <img :src="imgAssets.tips[1]" alt />
                  <b>营养</b>
                </li>
                <li>
                  <img :src="imgAssets.tips[2]" alt />
                  <b>情绪</b>
                </li>
                <li>
                  <img :src="imgAssets.tips[3]" alt />
                  <b>睡眠</b>
                </li>
              </ul>
              <div class="result">
                <h4>{{ sleepData.conclusion }}</h4>
                <p>睡眠质量很棒，请继续保持。</p>
              </div>
            </div>
          </div>
          <div class="main-right">
            <div class="sleep-chart-box">
              <ul class="sleep-chart-wrapper">
                <li
                  v-for="(el, i) in sleepChart"
                  :key="i"
                  :class="el.type"
                  :style="{width: el.proportion + '%'}"
                ></li>
              </ul>
              <div class="sleep-chart-xAxis">
                <ul>
                  <li v-for="(el, i) in sleepChartXAxis" :key="i">{{ getHMTime(el) }}</li>
                </ul>
              </div>
            </div>
            <div class="sleep-data">
              <ul>
                <li>
                  <b>{{ sleepData.sleepLength }}</b>
                  <p>睡眠时长</p>
                </li>
                <li>
                  <b>{{ sleepData.awake }}</b>
                  <p>清醒</p>
                </li>
                <li>
                  <b>{{ sleepData.lightSleep }}</b>
                  <p>浅睡</p>
                </li>
                <li>
                  <b>{{ sleepData.deepSleep }}</b>
                  <p>深睡</p>
                </li>
                <li>
                  <b>{{ sleepData.REM }}</b>
                  <p>rem</p>
                </li>
                <li>
                  <b>{{ sleepData.leave }}</b>
                  <p>离床</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";

const imgAssets = {
  page: [
    require("../assets/img/sleep-report/a.jpg"),
    require("../assets/img/sleep-report/b.jpg"),
    require("../assets/img/sleep-report/c.jpg")
  ],
  tips: [
    require("../assets/img/sleep-report/ic_sport.png"),
    require("../assets/img/sleep-report/ic_nutrition.png"),
    require("../assets/img/sleep-report/ic_emotion.png"),
    require("../assets/img/sleep-report/ic_sleep.png")
  ]
};

export default {
  name: "SleepReport",
  components: {},
  data() {
    return {
      env: process.env.NODE_ENV,
      imgAssets,
      // randomNum: Math.round(Math.random() * 2),
      // randomNum: 0,
      chart1: null,
      chart1Options: {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,.8)"
            }
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,.8)"
            }
          },
          splitLine: {
            show: false
          }
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            symbol: "none",
            smooth: true,
            itemStyle: {
              color: "rgba(255,255,255,.1)"
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#8AFFD3FF" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#05D6EE00" // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            }
          }
        ]
      },
      chart2: null,
      chart2Options: {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,.8)"
            }
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,.8)"
            }
          },
          splitLine: {
            show: false
          }
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            symbol: "none",
            smooth: true,
            itemStyle: {
              color: "rgba(255,255,255,.1)"
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#8AFFD3FF" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#05D6EE00" // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            }
          }
        ]
      },
      /* sleepDataArr: [
        {
          score: 85,
          conclusion: '指标正常',
          heartRate: 78,
          respirationRate: 18,
          bodyMotion: 433,
          sleepLength: '6时47分',
          awake: '5分44秒',
          lightSleep: '2时3分',
          deepSleep: '3时25分',
          REM: '1时09分',
          leave: '3分10秒',
        },
        {
          score: 92,
          conclusion: '继续保持',
          heartRate: 69,
          respirationRate: 20,
          bodyMotion: 377,
          sleepLength: '8时10分',
          awake: '3分11秒',
          lightSleep: '2时27分',
          deepSleep: '4时09分',
          REM: '1时30分',
          leave: '0秒',
        },
        {
          score: 88,
          conclusion: '继续保持',
          heartRate: 75,
          respirationRate: 21,
          bodyMotion: 429,
          sleepLength: '7时33分',
          awake: '5分12秒',
          lightSleep: '2时55分',
          deepSleep: '3时20分',
          REM: '1时12分',
          leave: '0秒',
        },
      ], */
      sleepChartData: [
        [
          {
            type: "awake",
            start: 1576685230315,
            end: 0,
            duration: 10,
          },
          {
            type: "light-sleep",
            start: 0,
            end: 0,
            duration: 5,
          },
          {
            type: "rem",
            start: 0,
            end: 0,
            duration: 30,
          },
          {
            type: "light-sleep",
            start: 0,
            end: 0,
            duration: 93,
          },
          {
            type: "rem",
            start: 0,
            end: 0,
            duration: 25,
          },
          {
            type: "leave",
            start: 0,
            end: 0,
            duration: 5,
          },
          {
            type: "deep-sleep",
            start: 0,
            end: 0,
            duration: 143,
          },
          {
            type: "awake",
            start: 0,
            end: 0,
            duration: 5,
          },
          {
            type: "rem",
            start: 0,
            end: 0,
            duration: 40,
          },
          {
            type: "leave",
            start: 0,
            end: 1576709650315,
            duration: 22,
          }
        ],
        [
          {
            type: "awake",
            start: 1576685230315,
            end: 0,
            duration: 5,
          },
          {
            type: "light-sleep",
            start: 0,
            end: 0,
            duration: 10,
          },
          {
            type: "rem",
            start: 0,
            end: 0,
            duration: 44,
          },
          {
            type: "light-sleep",
            start: 0,
            end: 0,
            duration: 79,
          },
          {
            type: "rem",
            start: 0,
            end: 0,
            duration: 16,
          },
          {
            type: "deep-sleep",
            start: 0,
            end: 0,
            duration: 175,
          },
          {
            type: "awake",
            start: 0,
            end: 0,
            duration: 5,
          },
          {
            type: "rem",
            start: 0,
            end: 1576714630315,
            duration: 40,
          },
        ],
        [
          {
            type: "awake",
            start: 1576685230315,
            end: 0,
            duration: 6,
          },
          {
            type: "light-sleep",
            start: 0,
            end: 0,
            duration: 29,
          },
          {
            type: "rem",
            start: 0,
            end: 0,
            duration: 24,
          },
          {
            type: "light-sleep",
            start: 0,
            end: 0,
            duration: 124,
          },
          {
            type: "deep-sleep",
            start: 0,
            end: 0,
            duration: 132,
          },
          {
            type: "awake",
            start: 0,
            end: 0,
            duration: 18,
          },
          {
            type: "rem",
            start: 0,
            end: 1576712410315,
            duration: 40,
          },
        ]
      ],
    };
  },
  computed: {
    ...mapState({
      sleepDataArr: state => state.dataObject.sleepDataArr,
      randomNum: state => state.dataObject.dateRemainder,
    }),
    envInDev() {
      if (this.env === "development" || this.env === "testing") return true;
      return false;
    },
    scoreCanvas() {
      return this.$refs.scoreCanvas;
    },
    /* randomNum() {
      const d = new Date();
      const date = d.getDate();
      let num = 0;
      if (date <= 3) {
        num = date - 1;
      } else {
        date % 3 === 0 ? num = 2 : num = date % 3 - 1;
      }

      return num;
    }, */
    sleepData() {
      return this.sleepDataArr[this.randomNum];
    },
    sleepChart() {
      let duration = 0;

      duration = this.sleepChartData[this.randomNum].reduce(
        (accumulator, val) => {
          if (val.duration || val.duration === 0) {
            return accumulator + val.duration;
          }
          return accumulator + (val.end - val.start);
        }, 0);

      const arr = [];
      this.sleepChartData[this.randomNum].forEach((el, i) => {
        let el_duration = 0;
        if (el.duration) {
          el_duration = el.duration;
        } else {
          el_duration = el.end - el.start;
        }
        arr.push({
          type: el.type,
          proportion: (el_duration * 100) / duration
        });
      });

      // console.log(arr);
      return arr;
    },
    sleepChartXAxis() {
      const data = this.sleepChartData[this.randomNum];
      const step = Math.round((data[data.length - 1].end - data[0].start) / 4);
      const arr = [data[0].start];
      for (let i = 0; i < 3; i++) {
        arr.push(arr[i] + step);
      }
      arr.push(data[data.length - 1].end);

      return arr;
    },
  },
  watch: {},
  created() {
    console.log(this.randomNum);
    // console.log(this.sleepChartXAxis);
    // console.log(this.sleepChartXAxis.map(el => this.getHMTime(el)));
  },
  mounted() {
    this.mountedInit();
    if (this.envInDev) {
      this.chartsInit();
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeFunc);
  },
  methods: {
    mountedInit() {
      window.addEventListener("resize", this.resizeFunc);
    },
    resizeFunc() {
      console.log("resize!!");
    },
    chartsInit() {
      // chart1
      this.chart1 = this.$echarts.init(this.$refs.chart1);
      this.chart1.setOption(this.chart1Options);

      // chart2
      this.chart2 = this.$echarts.init(this.$refs.chart2);
      this.chart2.setOption(this.chart2Options);
    },
    chartFakeData(option) {
      const defaultOption = {
        range: [60, 80]
      };
    },
    getHMTime(timestamp) {
      const d = new Date(timestamp);
      let hours = '0' + d.getHours();
      hours = hours.slice(-2);
      let minutes = '0' + d.getMinutes();
      minutes = minutes.slice(-2);
      return hours + ':' + minutes;
    },
  }
};
</script>

<style lang="scss" scoped>
$skyblue: #32c5ff;
$purpleTranslucent: rgba(193, 176, 255, 0.1);

// sleep-data background-color
$SD_Green: linear-gradient(to bottom, #d4f986, #4ef063);
$SD_Orange: linear-gradient(to bottom, #f9dc86, #f0854e);
$SD_DeepBlue: linear-gradient(to bottom, #86b1f9, #4e7df0);
$SD_Cyan: linear-gradient(to bottom, #86f9ed, #4eabf0);
$SD_Magenta: linear-gradient(to bottom, #f98692, #f04e59);

@mixin frostedBG {
  background-color: $purpleTranslucent;
  border-radius: 15px;
}

.sleep-report-page {
  // background: transparent url('./../assets/img/img3_bg.png') top center no-repeat;
  background-size: cover;
  border: none;
  border-radius: 0;
  background: none;
  background-color: transparent;
  position: relative;
  color: #fff;
  box-sizing: border-box;
  &.heightFull {
    height: 100%;
  }
  .page-img {
    display: block;
    width: 100%;
    height: auto;
  }

  .gree-logo {
    position: absolute;
    top: 25px;
    left: 25px;
    color: #fff;
    h5 {
      font-size: 40px;
      font-weight: normal;
      margin-bottom: 0;
    }
    p {
      margin: 0;
      font-size: 18px;
    }
  }
  .sleep-report-container {
    padding: 0 100px;
  }
  h2.title {
    font-size: 54px;
    text-align: right;
    font-weight: normal;
    padding-top: 80px;
    padding-bottom: 50px;
  }
  .main-box {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    .main-left {
      width: 700px;
      .chart-box {
        height: 350px;
        box-sizing: border-box;
        &:first-child {
          padding-bottom: 10px;
        }
        &:last-child {
          padding-top: 10px;
        }
        .chart-wrapper {
          @include frostedBG;
          height: 100%;
          box-sizing: border-box;
        }
      }
    }
    .main-middle {
      width: 430px;
      .score {
        height: 350px;
        margin-bottom: 10px;
        position: relative;
        text-align: center;
        .score-bg {
          width: 340px;
          height: 340px;
          position: absolute;
          left: 50%;
          margin-left: -170px;
          z-index: 0;
          border: 6px solid $purpleTranslucent;
          border-radius: 200px;
          .score-canvas {
            width: 280px;
            height: 280px;
          }
        }
        h2 {
          font-size: 116px;
          font-weight: normal;
          padding-top: 80px;
          margin-bottom: 10px;
        }
        p {
          font-size: 30px;
          margin: 0;
        }
      }
      .body-data {
        margin-bottom: 20px;
        ul {
          display: flex;
          justify-content: space-around;
          li {
            text-align: center;
            b {
              display: block;
              font-size: 28px;
              margin-bottom: 10px;
              font-weight: normal;
            }
            p {
              font-size: 28px;
              margin: 0;
              color: #fff9;
            }
          }
        }
      }
      .health-tips {
        @include frostedBG;
        height: 250px;
        padding: 0 30px;
        padding-top: 15px;
        h5 {
          font-size: 18px;
          font-weight: normal;
          color: #fff9;
          margin-bottom: 10px;
        }
        ul {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          li {
            text-align: center;
            img {
              display: block;
              width: auto;
              height: 40px;
              margin: 0 auto;
              max-width: 40px;
              max-height: 40px;
              background: transparent;
              margin-bottom: 10px;
            }
            b {
              display: block;
              font-weight: normal;
              font-size: 24px;
            }
          }
        }
        .result {
          h4 {
            font-size: 24px;
            margin-bottom: 5px;
            background: linear-gradient(to bottom, #d4f986, #74f26c, #4ef063);
            color: transparent;
            background-clip: text;
            -webkit-background-clip: text;
            margin-bottom: 10px;
          }
          p {
            font-size: 24px;
            margin: 0;
          }
        }
      }
    }
    .main-right {
      width: 430px;
      @include frostedBG;
      .sleep-chart-box {
        height: 50%;
        padding: 0 40px;
        padding-top: 40px;
        border-bottom: 1px solid #ccc;
        .sleep-chart-wrapper {
          display: flex;
          flex-flow: row nowrap;
          align-items: flex-end;
          width: 100%;
          li {
            display: block;
            height: 100px;
            background: rgba(255, 255, 255, 0.1);
            box-shadow: 0 0 2px 1px rgba(255, 255, 255, 0.3);
            &.awake {
              height: 110px;
              background: $SD_Green;
            }
            &.light-sleep {
              height: 235px;
              background: $SD_Orange;
            }
            &.deep-sleep {
              height: 265px;
              background: $SD_DeepBlue;
            }
            &.rem {
              height: 180px;
              background: $SD_Cyan;
            }
            &.leave {
              height: 210px;
              background: $SD_Magenta;
            }
          }
        }
        .sleep-chart-xAxis {
          padding-top: 5px;
          ul {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            border-top: 1px solid #fff;
            li {
              font-size: 16px;
              &:before {
                content: "";
                display: block;
                height: 5px;
                width: 2px;
                background: #ffffffcc;
                margin: 0 auto;
              }
            }
          }
        }
      }
      .sleep-data {
        height: 50%;
        padding-top: 10px;
        ul {
          display: flex;
          flex-flow: row wrap;
          text-align: center;
          li {
            padding-top: 60px;
            width: 33.3%;
            b {
              display: block;
              font-weight: normal;
              margin-bottom: 10px;
              font-size: 26px;
              color: transparent;
              background: linear-gradient(to bottom, #0ef69d, #05d5ee);
              background-clip: text;
              -webkit-background-clip: text;
            }
            p {
              margin: 0;
              line-height: 1;
              font-size: 24px;
              color: #fff9;
            }
            &:not(:first-child) > p::before {
              content: "";
              display: inline-block;
              width: 24px;
              height: 24px;
              margin-right: 5px;
              vertical-align: baseline;
              background-color: #fff;
            }
            &:nth-child(2) > p::before {
              background: $SD_Green;
            }
            &:nth-child(3) > p::before {
              background: $SD_Orange;
            }
            &:nth-child(4) > p::before {
              background: $SD_DeepBlue;
            }
            &:nth-child(5) > p::before {
              background: $SD_Cyan;
            }
            &:nth-child(6) > p::before {
              background: $SD_Magenta;
            }
          }
        }
      }
    }
  }
}
</style>
