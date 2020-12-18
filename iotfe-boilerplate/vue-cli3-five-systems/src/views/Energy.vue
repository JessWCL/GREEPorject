<template>
  <div class="page-section energy-page" id="">
    <div class="page-left">
      <div class="card-container">
        <ul class="head-group">
          <li>
            <h3>光伏发电功率</h3>
            <div class="head-num">
              <span class="border-circle">
                {{ energyData.generationPower | parseInt }}w
              </span>
            </div>
          </li>
          <li>
            <h3>用电功率</h3>
            <div class="head-num">
              <span class="border-circle">
                {{ energyData.consumePower | parseInt }}w
              </span>
            </div>
          </li>
          <li>
            <h3>光伏发电</h3>
            <div class="head-num">
              <span class="border-circle">
                {{ energyData.totalProvideQ | parseInt }}度
              </span>
            </div>
          </li>
        </ul>
        <div class="center-title">
          <h4>累计{{ energyData.days }}天数据</h4>
        </div>
        <div class="energy-data">
          <table class="table">
            <tbody>
              <tr>
                <td>
                  <dl>
                    <dt>储能剩余电量:</dt>
                    <dd>{{ energyData.currentCapacityKWh }}度</dd>
                  </dl>
                </td>
                <td>
                  <dl>
                    <dt>减排二氧化碳:</dt>
                    <dd>{{ energyData.reduceCO2 }}kg</dd>
                  </dl>
                </td>
                <td>
                  <dl>
                    <dt>减排氮化物:</dt>
                    <dd>{{ energyData.reduceNOx }}kg</dd>
                  </dl>
                </td>
              </tr>
              <tr>
                <td>
                  <dl>
                    <dt>节省电费:</dt>
                    <dd>{{ energyData.savePowerTotal }}元</dd>
                  </dl>
                </td>
                <td>
                  <dl>
                    <dt>减排二氧化硫:</dt>
                    <dd>{{ energyData.reduceSO2 }}kg</dd>
                  </dl>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="page-right">
      <div class="card-container">
        <div class="tree-head">
          <div class="bubble">氮化物</div>
          <div class="bubble">SO<sub>2</sub></div>
          <div class="bubble">CO<sub>2</sub></div>
          <img :src="imgAssets.funnel" alt="">
        </div>
        <div class="tree-content">
          <p>减排效益约等于</p>
          <strong>{{ energyData.reduceTreeNum }}棵</strong>
          <p>大树一天的吸收量</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const imgAssets = {
  funnel: require('../assets/img/energy/img_loudou2.svg'),
};

export default {
  name: "energy",
  components: {},
  filters: {
    parseInt(val) {
      if (!val) return 0;
      const intVal = Math.round(val);
      return intVal;
    }
  },
  data() {
    return {
      imgAssets,
    };
  },
  computed: {
    ...mapState({
      energy: state => state.dataObject.energy,
    }),
    energyData() {
      let origin = this.energy;
      origin = JSON.stringify(origin);
      const data = JSON.parse(origin, (key, val) => {
        if (key === '') return val; 
        return Math.round(Number(val) * 100) / 100;
      });
      /* origin.entries().forEach(el => {
        data[el[0]] = el[1];
      }); */
      return data;
    },
  },
  watch: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
$skyblue: #32C5FF;
$grassgreen: #6DD400;
$khaki: #FFB909;

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

.energy-page {
  color: #FFF;
  display: flex;
  flex-flow: row nowrap;
  background-color: transparent;
  border: none;
  .page-left {
    width: 75%;
    height: 100%;
    padding-right: 20px;
    .card-container {
      height: 100%;
      @include card-style;
      .head-group {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
        padding-top: 100px;
        margin-bottom: 60px;
        li {
          text-align: center;
          h3 {
            font-size: 42px;
            font-weight: normal;
            margin-bottom: 40px;
          }
          .head-num {
            text-align: center;
            span {
              display: block;
              font-size: 60px;
              width: 260px;
              height: 260px;
              line-height: 260px;
              &::before {
                @include border-circle-before(
                  $width: 260px,
                  $height: 260px,
                  $url: '../assets/img/border-circle.svg', )
              }
            }
          }
        }
      }
      .center-title {
        padding-top: 20px;
        text-align: center;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        margin-bottom: 60px;
        h4 {
          font-size: 52px;
          font-weight: normal;
        }
        &::before {
          content:"";
          width: 25%;
          height: 2px;
          margin-right: 40px;
          // background: linear-gradient(to left, #fffa 50%, #fff0 50%);
          // background-size: 10px 4px;
          background:linear-gradient(to left, #fffa, #fff0);
        }
        &::after {
          content:"";
          width: 25%;
          height: 2px;
          margin-left: 40px;
          // background: linear-gradient(to left, #fffa 50%, #fff0 50%);
          // background-size: 10px 4px;
          background:linear-gradient(to right, #fffa, #fff0);
        }
      }
      .energy-data {
        .table {
          border-collapse: collapse;
          width: 100%;
          tr {
            td {
              padding-bottom: 40px;
              padding-left: 40px;
              dl {
                display: flex;
                flex-flow: row nowrap;
                font-size: 36px;
                dt {
                  margin-right: 40px;
                }
                dd {
                  color: $skyblue;
                }
              }
            }
            &:last-of-type {
              td {
                padding-bottom: 0;
              }
            }
          }
        }
      }
    }
  }
  .page-right {
    width: 25%;
    height: 100%;
    padding-right: 20px;
    .card-container {
      height: 100%;
      @include card-style;
      .tree-head {
        height: 560px;
        // border-bottom: 1px solid #fff;
        position: relative;
        .bubble {
          width: 100px;
          height: 100px;
          background-color: rgba(255,255,255,.1);
          text-align: center;
          line-height: 100px;
          border-radius: 100%;
          font-size: 24px;
          position: absolute;
          &:nth-child(1) {
            top: 100px;
            left: 50%;
            margin-left: -50px;
          }
          &:nth-child(2) {
            top: 220px;
            left: 50%;
            margin-left: 40px;
            font-size: 36px;
          }
          &:nth-child(3) {
            top: 300px;
            left: 50%;
            margin-left: -100px;
            font-size: 36px;
          }
        }
        img {
          position: absolute;
          bottom: 0;
          display: block;
          width: 128px;
          height: 113px;
          left: 50%;
          margin-left: -64px;
        }
      }
      .tree-content {
        padding-top: 40px;
        text-align: center;
        p {
          font-size: 38px;
          margin: 0;
        }
        strong {
          display: block;
          font-size: 64px;
          color: $khaki;
          margin: 20px;
          font-weight: normal;
        }
      }
    }
  }

}
</style>
