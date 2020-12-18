<template>
  <div class="health-page page-section">
    <div class="page-left">
      <div class="card-container">
        <div class="card-header">
          <h4>睡眠数据</h4>
        </div>
        <div class="card-body">
          <div class="sleeping-score">
            <h4>睡眠得分</h4>
            <div class="sleeping-score-num">
              <span class="border-circle">{{ sleepDataArr[dateRemainder].score }}</span>
            </div>
          </div>
          <div class="sleeping-statistics">
            <ul>
              <li>
                <dl>
                  <dt>
                    <b>{{ sleepDataArr[dateRemainder].sleepLength.slice(0, sleepDataArr[dateRemainder].sleepLength.indexOf('时')) }}</b> h
                    <b>{{ sleepDataArr[dateRemainder].sleepLength.slice(
                      sleepDataArr[dateRemainder].sleepLength.indexOf('时') + 1,
                      sleepDataArr[dateRemainder].sleepLength.indexOf('分')) }}</b> min
                  </dt>
                  <dd>睡眠时长</dd>
                </dl>
              </li>
              <li>
                <dl>
                  <dt>
                    <b>{{ sleepDataArr[dateRemainder].heartRateHigh }}</b> bpm
                  </dt>
                  <dd>最高心率</dd>
                </dl>
              </li>
              <li>
                <dl>
                  <dt>
                    <b>{{ sleepDataArr[dateRemainder].heartRateLow }}</b> bpm
                  </dt>
                  <dd>最低心律</dd>
                </dl>
              </li>
              <li>
                <dl>
                  <dt>
                    <b>{{ sleepDataArr[dateRemainder].respirationRate }}</b> bpm
                  </dt>
                  <dd>呼吸率</dd>
                </dl>
              </li>
            </ul>
          </div>
          <div class="sleeping-data">
            <ul>
              <li>体动：{{ sleepDataArr[dateRemainder].bodyMotion }}次</li>
              <li>REM：{{ sleepDataArr[dateRemainder].REM }}</li>
              <li>离床：{{ sleepDataArr[dateRemainder].leave }}</li>
              <li>浅睡：{{ sleepDataArr[dateRemainder].lightSleep }}</li>
              <li>清醒：{{ sleepDataArr[dateRemainder].awake }}</li>
              <li>深睡：{{ sleepDataArr[dateRemainder].deepSleep }}</li>
            </ul>
          </div>
        </div>
        <div class="card-footer">
          <h5>适当的运动更有助于睡眠哦！</h5>
        </div>
      </div>
    </div>
    <div class="page-right">
      <div class="pr-part pr-upper">
        <div class="card-container">
          <div class="card-header">
            <h4>洗护管理</h4>
          </div>
          <div class="card-body">
            <ul>
              <li>
                <h5>洗衣机</h5>
                <div class="status-svg">
                  <img ref="svg1" class="washer-svg" :src="imgAssets.wave" style="width: 100%; height:100%;" />
                  <span>{{ health.laundry === 1 ? '正在洗衣' : '未洗衣' }}</span>
                </div>
                <p>洗衣状态：<i>{{ health.laundry === 1 ? '正在洗衣' : '未洗衣' }}</i></p>
              </li>
              <li>
                <h5>洗碗机</h5>
                <div class="status-svg">
                  <img class="washer-svg" :src="imgAssets.wave" style="width: 100%; height:100%;" />
                  <span>{{ health.dishWashing === 1 ? '正在洗碗' : '未洗碗' }}</span>
                </div>
                <p>洗碗状态：<i>{{ health.dishWashing === 1 ? '正在洗碗' : '未洗碗' }}</i></p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="pr-part pr-lower">
        <div class="prlow-part prlow-left">
          <div class="card-container">
            <div class="card-header">
              <h4>用水管理</h4>
            </div>
            <div class="card-body">
              <table class="table">
                <tbody>
                  <tr>
                    <td>
                      <h6>自来水TDS值</h6>
                    </td>
                    <td>20</td>
                    <td>
                      <i class="water-blue">良好</i>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h6>净水TDS值</h6>
                    </td>
                    <td>14</td>
                    <td>
                      <i class="water-green">可直饮</i>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h6>热水水温</h6>
                    </td>
                    <td>56℃</td>
                    <td>
                      <i class="water-orange">小心烫</i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="prlow-part prlow-right">
          <div class="card-container">
            <div class="card-header">
              <h4>饮食管理</h4>
            </div>
            <div class="card-body">
              <dl>
                <dt>即将过期食品</dt>
                <dd>益力多</dd>
              </dl>
              <dl>
                <dt>剩余天数</dt>
                <dd>1天</dd>
              </dl>
              <dl>
                <dt>推荐食谱</dt>
                <dd>香菇焖鸡</dd>
              </dl>
              <dl>
                <dt>缺少食材</dt>
                <dd>香菇</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import wave from "../assets/img/health/img_xiyi.png";

export default {
  name: "health",
  components: {},
  data() {
    return {
      imgAssets: {
        wave,
      }
    };
  },
  computed: {
    ...mapState({
      dateRemainder: state => state.dataObject.dateRemainder,
      sleepDataArr: state => state.dataObject.sleepDataArr,
      health: state => state.dataObject.health,
    }),
  },
  watch: {},
  mounted() {
    // console.log(this.$refs.svg1);
    // console.log(this.$refs.svg1.getBoundingClientRect());
  },
  methods: {
    /* vconsoleCLick() {
      const vconsole = document.querySelector("#__vconsole");
      // console.log(window.vconsole_count);
      if (window.vconsole_count < 5) {
        window.vconsole_count += 1;
      } else if (window.vconsole_count >= 5 && window.vconsole_count < 10) {
        window.vconsole_count += 1;
        vconsole.style.display = "block";
      } else if (window.vconsole_count >= 10) {
        window.vconsole_count = 0;
        vconsole.style.display = "none";
      }
    }, */
  }
};
</script>

<style lang="scss" scoped>

$skyblue: #32c5ff;
$grassgreen: #6DD400;

@mixin card-style {
  border-radius: 15px;
  box-sizing: border-box;
  background-color: #cdc5ff22;
  border: 1px solid rgba(255, 255, 255, .1);
  .card-header {
    padding-left: 30px;
    margin-bottom: 26px;
  }
}

/* 渐变圆环边框::before */
@mixin border-circle-before(
  $width: 100%, 
  $height: 100%, 
  $url: '../assets/img/border-circle.svg',
  $bg: linear-gradient(to bottom, #0EF69D, #05D5EF),
  ) {
  content: "";
  display: block;
  position: absolute;
  width: $width;
  height: $height;
  background: $bg;
  mask: url($url) no-repeat center center;
  mask-size: 100% 100%;
}
/* 渐变圆环边框 */
.border-circle {
  position:relative;
  box-sizing: border-box;
}

h4 {
  font-size: 34px;
  font-weight: normal;
  margin: 0;
  line-height: 54px;
}
.health-page {
  display: flex;
  flex-flow: row nowrap;
  background-color: transparent;
  border: none;
  color: #FFF;
  .page-left {
    width: 50%;
    height: 100%;
    padding-right: 12px;
    .card-container {
      height: 100%;
      @include card-style;
      .card-header {
        padding-left: 30px;
        margin-bottom: 26px;
      }
      .card-body {
        margin-bottom: 40px;
        .sleeping-score {
          margin-bottom: 36px;
          h4 {
            text-align: center;
            margin-bottom: 20px;
          }
          .sleeping-score-num {
            text-align: center;
            font-size: 90px;
            // color: $grassgreen;
            display: flex;
            justify-content: center;
            user-select: none;
            span {
              // border: 10px solid $grassgreen;
              width: 260px;
              height: 260px;
              line-height: 260px;
              background-color: #0001;
              &::before {
                @include border-circle-before(
                $width: 260px,
                $height: 260px,
                $url: '../assets/img/border-circle.svg', );
              }
            }
          }
        }
        .sleeping-statistics {
          margin-bottom: 45px;
          ul {
            display: flex;
            justify-content: space-around;
            > li {
              dl {
                font-size: 24px;
                dt {
                  margin-bottom: 12px;
                  color: $skyblue;
                  b {
                    font-size: 60px;
                    font-weight: normal;
                    color: $skyblue;
                  }
                }
                dd {
                  text-align: center;
                }
              }
            }
          }
        }
        .sleeping-data {
          font-size: 26px;
          ul {
            display: flex;
            flex-flow: row wrap;
            li {
              width: 50%;
              text-align: left;
              margin-bottom: 20px;
              &:nth-child(odd) {
                padding-left: 150px;
              }
              &:nth-child(even) {
                padding-left: 80px;
              }
            }
          }
        }
      }
      .card-footer {
        h5 {
          text-align: center;
          font-size: 32px;
          font-weight: normal;
          color: $skyblue;
        }
      }
    }
  }
  .page-right {
    width: 50%;
    height: 100%;
    padding-left: 12px;
    .pr-part {
      height: calc(50% - 12px);
    }
    .pr-upper {
      margin-bottom: 24px;
      .card-container {
        @include card-style;
        height: 100%;
        .card-body {
          ul {
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            li {
              width: 50%;
              text-align: center;
              h5 {
                font-size: 32px;
                font-weight: normal;
                margin-bottom: 10px;
              }
              .status-svg {
                width: 190px;
                height: 190px;
                position: relative;
                margin: 0 auto;
                border-radius: 100px;
                // border: 4px solid $skyblue;
                .washer-svg {
                  width: 100%;
                  height: 100%;
                  border-radius: 100px;
                  overflow: hidden;
                  img {
                    width: 100%;
                    height: auto;
                  }
                }
                span {
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  transform: translate(-50%, -50%);
                  white-space: nowrap;
                  font-size: 32px;
                }
              }
              p {
                font-size: 24px;
                margin-top: 30px;
                i {
                  font-style: normal;
                  color: $skyblue;
                }
              }
            }
          }
        }
      }
    }
    .pr-lower {
      display: flex;
      flex-flow: row nowrap;
      .prlow-part {
        width: 50%;
        height: 100%;
        .card-container {
          @include card-style;
          height: 100%;
          font-size: 24px;
          .card-header {
            margin-bottom: 50px;
          }
          .card-body {
            padding: 0 30px;
          }
        }
      }
      .prlow-left {
        padding-right: 12px;
        .table {
          width: 100%;
          border-collapse: collapse;
          tr {
            td {
              text-align: center;
              padding-bottom: 50px;
            }
            td:first-child {
              text-align: left;
            }
            td:last-child {
              text-align: right;
            }
            td:nth-child(2) {
              color: $skyblue;
            }
          }
          h6 {
            font-size: 24px;
            font-weight: normal;
          }
          i {
            display: inline-block;
            text-align: center;
            padding: 2px 0;
            width: 120px;
            font-size: 24px;
            font-style: normal;
            border-radius: 30px;
            background-color: #ccc;
            &.water-blue {
              background-color: #32C5FF;
            }
            &.water-green {
              background-color: #73C82A;
            }
            &.water-orange {
              background-color: #FA6400;
            }
          }
        }
      }
      .prlow-right {
        padding-left: 12px;
        dl {
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          margin-bottom: 50px;
          &:last-child {
            margin-bottom: 0;
          }
          dd {
            color: $skyblue;
          }
        }
      }
    }
  }
}
</style>
