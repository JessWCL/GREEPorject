<template>
  <div class="home-page  page-section" :class="{th: lang === 'th'}" id="home">
    <ul class="home-section-box">
      <li class="home-section air-section">
        <div class="section-card">
          <h2 class="section-title">
            {{ $t('home.air.title') }}
          </h2>
          <div class="score-container">
            <p>{{ $t('home.air.scoreTitle') }}</p>
            <span class="border-circle">
              {{ $t('home.air.score[0]') }}
            </span>
          </div>
          <div class="side-data-box">
            <div class="side-data">
              <dl>
                <dt>{{ $t('home.air.listTitle.temperature') }}</dt>
                <dd>
                  <span class="white">{{ air.temperature }}℃</span>
                  <span>{{ $t(`home.air.listValue.temperature[${temperature_grade}]`) }}</span>
                </dd>
              </dl>
              <dl>
                <dt>{{ $t('home.air.listTitle.humidity') }}</dt>
                <dd>
                  <span class="white">{{ air.humidity }}%</span>
                  <span>{{ $t(`home.air.listValue.humidity[${humidity_grade}]`) }}</span>
                </dd>
              </dl>
              <dl>
                <dt>{{ $t('home.air.listTitle.pm2p5') }}</dt>
                <dd>
                  <span>{{ $t(`home.air.listValue.pm2p5[${pm2p5_grade}]`) }}</span>
                </dd>
              </dl>
              <dl>
                <dt>{{ $t('home.air.listTitle.co2') }}</dt>
                <dd>
                  <span>{{ $t(`home.air.listValue.co2[${CO2_grade}]`) }}</span>
                </dd>
              </dl>
              <dl>
                <dt>{{ $t('home.air.listTitle.formaldehyde') }}</dt>
                <dd>
                  <span>{{ $t(`home.air.listValue.formaldehyde[${formaldehyde_grade}]`) }}</span>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </li>
      <li class="home-section energy-section">
        <div class="section-card">
          <h2 class="section-title">
            {{ $t(`home.energy.title`) }}
          </h2>
          <div class="side-data-box">
            <div class="side-data-title">
              <h4>{{ $t(`home.energy.subTitle1`) }}</h4>
            </div>
            <div class="side-data">
              <dl>
                <dt>{{ $t(`home.energy.generationPower`) }}</dt>
                <dd>
                  <span >{{ energyData.generationPower }}W</span>
                </dd>
              </dl>
              <dl>
                <dt>{{ $t(`home.energy.consumePower`) }}</dt>
                <dd>
                  <span >{{ energyData.consumePower }}W</span>
                </dd>
              </dl>
              <dl>
                <dt>{{ $t(`home.energy.currentCapacityKWh`) }}</dt>
                <dd>
                  <span >{{ $t(`home.energy.currentCapacityKWhValue`, {value: energyData.currentCapacityKWh}) }}</span>
                </dd>
              </dl>
            </div>
          </div>
          <div class="side-data-box">
            <div class="side-data-title">
              <h4>{{ $t(`home.energy.subTitle2`, {day: energyData.days}) }}</h4>
            </div>
            <div class="side-data">
              <dl>
                <dt>{{ $t(`home.energy.totalProvideQ`) }}</dt>
                <dd>
                  <span >{{ $t(`home.energy.totalProvideQValue`, {value: energyData.totalProvideQ}) }}</span>
                </dd>
              </dl>
              <dl>
                <dt>{{ $t(`home.energy.savePowerTotal`) }}</dt>
                <dd>
                  <span >{{ $t(`home.energy.savePowerTotalValue`, {value: savePowerTotalValue}) }}</span>
                </dd>
              </dl>
              <dl>
                <dt>{{ $t(`home.energy.reduceCO2`) }}</dt>
                <dd>
                  <span >{{ energyData.reduceCO2 }}kg</span>
                </dd>
              </dl>
            </div>
          </div>
          <div class="energy-footer">
            <img :src="imgAssets.funnel" alt="">
            <!-- <p>约等于<b>{{ energyData.reduceTreeNum }}棵</b>大树<br />一天的吸收量</p> -->
            <p v-html="$t(`home.energy.tree`, {value: energyData.reduceTreeNum})"></p>
          </div>
        </div>
      </li>
      <li class="home-section health-section">
        <div class="section-card">
          <h2 class="section-title">
            {{ $t('home.health.title') }}
          </h2>
          <div class="score-container">
            <p>{{ $t('home.health.scoreTitle') }}</p>
            <span class="border-circle">
              {{ sleepDataArr[dateRemainder].score }}
            </span>
          </div>
          <div class="side-data-box">
            <div class="side-data-title">
              <h4>{{ $t('home.health.subTitle1') }}</h4>
            </div>
            <div class="side-data">
              <dl>
                <dt>{{ $t('home.health.laundryTitle') }}</dt>
                <dd>
                  <span>{{ $t(`home.health.lanudryValue[${health.laundry}]`) }}</span>
                </dd>
              </dl>
              <dl>
                <dt>{{ $t('home.health.dishTitle') }}</dt>
                <dd>
                  <span>{{ $t(`home.health.dishValue[${health.dishWashing}]`) }}</span>
                </dd>
              </dl>
            </div>
            <div class="side-data-title">
              <h4>{{ $t('home.health.subTitle2') }}</h4>
            </div>
            <div class="side-data">
              <dl>
                <dt>{{ $t('home.health.water1Title') }}</dt>
                <dd>
                  <span>{{ $t('home.health.water1Value') }}</span>
                </dd>
              </dl>
              <dl>
                <dt>{{ $t('home.health.water2Title') }}</dt>
                <dd>
                  <span>{{ $t('home.health.water2Value') }}</span>
                </dd>
              </dl>
            </div>
            <div class="side-data-title">
              <h4>{{ $t('home.health.subTitle3') }}</h4>
            </div>
            <div class="side-data">
              <dl>
                <dt>{{ $t('home.health.recipe') }}</dt>
                <dd>
                  <span>{{ $t('home.health.recipeValue[0]') }}</span>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </li>
      <li class="home-section illumination-section">
        <div class="section-card">
          <h2 class="section-title">
            {{ $t('home.illumination.title') }}
          </h2>
          <div class="side-data-box">
            <div class="side-data-title">
              <h4>{{ $t('home.illumination.subTitle1') }}</h4>
            </div>
            <div class="illumination-align light-align">
              <ul>
                <!-- <li class="active">
                  <span class="ico ico-light"></span>
                  <p>入口</p>
                </li> -->
                <li
                  v-for="(el, i) in illumination_light"
                  :key="i"
                  :class="{active: el.pow === 1}"
                >
                  <span class="ico ico-light"></span>
                  <p>{{ el.roomName }}</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="side-data-box" :class="{
            hidden: isChina || isThailand
          }">
            <div class="side-data-title">
              <h4>{{ $t('home.illumination.subTitle2') }}</h4>
            </div>
            <div class="illumination-align curtain-align">
              <ul>
                <li class="active">
                  <span class="ico ico-curtain"></span>
                  <p>{{ $t('home.illumination.room[0]') }}</p>
                </li>
                <li class="active">
                  <span class="ico ico-curtain"></span>
                  <p>{{ $t('home.illumination.room[1]') }}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </li>

      <li class="home-section security-section">
        <div class="section-card">
          <h2 class="section-title">
            {{ $t('home.security.title') }}
          </h2>
          <div class="switcher-box">
            <div class="switcher-item">
              <img :src="imgAssets.securityOn[1]" alt="">
              <p>{{ $t('home.security.status1') }}</p>
            </div>
            <div class="switcher-item">
              <img :src="imgAssets.securityOn[0]" alt="">
              <p>{{ $t('home.security.status2') }}</p>
            </div>
          </div>
          <div class="side-data-box">
            <div class="side-data">
              <dl>
                <dt>{{ $t('home.security.device1') }}</dt>
                <dd>
                  <span>{{ $t('home.security.deviceStatus[1]') }}</span>
                </dd>
              </dl>
              <dl>
                <dt>{{ $t('home.security.device2') }}</dt>
                <dd>
                  <span>{{ $t('home.security.deviceStatus[1]') }}</span>
                </dd>
              </dl>
              <dl class="">
                <dt>{{ $t('home.security.device3') }}</dt>
                <dd>
                  <span>{{ $t('home.security.deviceStatus[1]') }}</span>
                </dd>
              </dl>
              <dl>
                <dt>{{ $t('home.security.device4') }}</dt>
                <dd>
                  <span>{{ $t('home.security.deviceStatus[1]') }}</span>
                </dd>
              </dl>
              <dl>
                <dt>{{ $t('home.security.device5') }}</dt>
                <dd>
                  <span>{{ $t('home.security.deviceStatus[1]') }}</span>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { isChina, isThailand } from '../api/constants';

const imgAssets = {
  line: [require('../assets/img/home/ic_line_left.svg'), require('../assets/img/home/ic_line_right.svg')],
  funnel: require('../assets/img/home/img_loudou.svg'),
  light: [require('../assets/img/home/ic_light_off.svg'), require('../assets/img/home/ic_light_on.svg')],
  curtain: [require('../assets/img/home/ic_curtain_off.svg'), require('../assets/img/home/ic_curtain_on.svg')],
  securityOn: [require('../assets/img/home/ic_bufang_on.svg'), require('../assets/img/home/ic_chefang_off.svg')],
  securityOff: [require('../assets/img/home/ic_bufang_off.svg'), require('../assets/img/home/ic_chefang_on.svg')],
};

export default {
  name: "Home",
  components: {},
  data() {
    return {
      imgAssets,
      isChina,
      isThailand
    };
  },
  computed: {
    ...mapState({
      home: state => state.dataObject.home,
      dateRemainder: state => state.dataObject.dateRemainder,
      sleepDataArr: state => state.dataObject.sleepDataArr,
    }),
    lang() {
      return this.$i18n.locale;
    },
    air() {
      return this.home.air;
    },
    energy() {
      return this.home.photovoltaicAirResBean;
    },
    health() {
      return this.home.health;
    },
    illumination() {
      return this.home.illuminationBeanList;
    },
    // energy数值格式化
    energyData() {
      let origin = this.energy;
      origin = JSON.stringify(origin);
      const data = JSON.parse(origin, (key, val) => {
        if (key === '') return val;
        return Math.round(Number(val) * 100) / 100;
      });
      return data;
    },
    // 节省电费
    savePowerTotalValue() {
      return this.RMBtoBaht(this.energyData.savePowerTotal);
    },
    // air判断规则 ----start----
    temperature_grade() {
      const val = this.air.temperature;
      let result = '';
      if (val >= 38) {
        result = '酷热';
        result = 0;
      } else if (val >= 35) {
        result = '炎热';
        result = 1;
      } else if (val >= 28) {
        result = '闷热';
        result = 2;
      } else if (val >= 20) {
        result = '舒适';
        result = 3;
      } else if (val >= 10) {
        result = '凉爽';
        result = 4;
      } else if (val >= -9) {
        result = '寒冷';
        result = 5;
      } else if (val < -9) {
        result = '严寒';
        result = 6;
      }
      return result;
    },
    humidity_grade() {
      const val = this.air.humidity;
      let result = '';
      if (val >= 60) {
        result = '潮湿';
        result = 0;
      } else if (val >= 40) {
        result = '舒适';
        result = 1;
      } else if (val < 40) {
        result = '干燥';
        result = 2;
      }
      return result;
    },
    pm2p5_grade() {
      const val = this.air.pm2p5;
      let result = '';
      if (val >= 250) {
        result = '严重污染';
        result = 0;
      } else if (val >= 150) {
        result = '重度污染';
        result = 1;
      } else if (val >= 115) {
        result = '中度污染';
        result = 2;
      } else if (val >= 75) {
        result = '轻度污染';
        result = 3;
      } else if (val >= 35) {
        result = '良';
        result = 4;
      } else if (val > 0 && val < 35) {
        result = '优';
        result = 5;
      } else if (val <= 0) {
        result = '--';
        result = 6;
      }
      return result;
    },
    CO2_grade() {
      const val = this.air.CO2;
      let result = '';
      if (val >= 1000) {
        result = '浑浊';
        result = 0;
      } else if (val > 450) {
        result = '正常';
        result = 1;
      } else if (val <= 450) {
        result = '清新';
        result = 2;
      }
      return result;
    },
    formaldehyde_grade() {
      const val = this.air.formaldehyde;
      let result = '';
      if (val >= 80) {
        result = '超标';
        result = 0;
      } else if (val < 80) {
        result = '合格';
        result = 1;
      }
      return result;
    },
    // air判断规则 ----end----
    illumination_light() {
      const arr = this.illumination.filter(el => el.mid === '80401' || el.mid === 80401);
      return arr;
    }
  },
  watch: {},
  mounted() {
    // console.log(this.$i18n.locale);
  },
  methods: {
    RMBtoBaht(val) {
      if (this.$i18n.locale === 'th') {
        return (val * 4.5).toFixed(2);
      }
      return val;
    },
  }
};
</script>

<style lang="scss" scoped>
$skyblue: #32C5FF;
$khaki: #FFB909;
$greenCyan: linear-gradient(to bottom, #0EF69D, #05D5EF);

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

.home-page {
  color: #fff;
  background-color: transparent;
  .home-section-box {
    margin-top: 80px;
    display: flex;
    justify-content: space-between;
    .home-section {
      width: 20%;
      padding-right: 20px;
      &:last-child {
        padding-right: 0;
      }
      .section-card {
        border: 1px solid rgba(255,255,255,.1);
        box-sizing: border-box;
        border-radius: 15px;
        background-color: #cdc5ff22;
        height: 730px;
        h2 {
          font-weight: normal;
          padding-top: 10px;
          padding-left: 20px;
          font-size: 36px;
          margin-bottom: 20px;
        }
        .score-container {
          text-align: center;
          display: flex;
          flex-flow: column nowrap;
          justify-content: center;
          align-items: center;
          margin-bottom: 80px;
          p{
            font-size: 20px;
            margin: 0;
            margin-bottom: 10px;
          }
          span {
            display: block;
            width: 160px;
            height: 160px;
            text-align: center;
            line-height: 160px;
            font-size: 50px;
            &::before {
              @include border-circle-before(
                $width: 160px,
                $height: 160px,
                $url: '../assets/img/border-circle.svg',
                $bg: $greenCyan,
              );
            }
          }
        }
        .side-data-box {
          padding: 0 20px;
          .side-data-title {
            padding-top: 20px;
            text-align: center;
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            margin-bottom: 40px;
            h4 {
              font-size: 26px;
              font-weight: normal;
            }
            &::before {
              content:"";
              width: 20%;
              height: 2px;
              margin-right: 10px;
              // background: linear-gradient(to left, #fffa 50%, #fff0 50%);
              // background-size: 10px 4px;
              background:linear-gradient(to left, #fffa, #fff0);
            }
            &::after {
              content:"";
              width: 20%;
              height: 2px;
              margin-left: 10px;
              // background: linear-gradient(to left, #fffa 50%, #fff0 50%);
              // background-size: 10px 4px;
              background:linear-gradient(to right, #fffa, #fff0);
            }
          }
          .side-data {
            dl {
              display: flex;
              flex-flow: row nowrap;
              justify-content: space-between;
              font-size: 26px;
              padding-top: 48px;
              &:first-child{
                padding-top: 0;
              }
              dt {
                font-size: 26px;
              }
              dd {
                span {
                  margin-right: 20px;
                  color: $skyblue;
                  &:last-child {
                    margin-right: 0;
                  }
                  &.white {
                    color: #fff;
                  }
                }
              }
            }
          }
        }
      }

      &.energy-section {
        .section-card {
          .side-data-box {
            margin-bottom: 30px;
            .side-data-title {
              white-space: nowrap;
            }
            .side-data {
              dl {
                padding-top: 25px;
                &:first-child{
                  padding-top: 0;
                }
              }
            }
            &:last-of-type {
              margin-bottom: 0;
            }
          }
          .energy-footer {
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            padding-top: 36px;
            img {
              display: block;
              width: 57px;
              height: 50px;
            }
            p {
              text-align: left;
              font-size: 22px;
              padding-left: 10px;
              margin: 0;
              letter-spacing: 2px;
              b {
                font-weight: normal;
                color: $khaki;
              }
            }
          }
        }
      }
      &.health-section {
        .section-card {
          .side-data-box {
            margin-bottom: 30px;
            margin-top: -45px;
            .side-data-title {
              padding-top: 0;
              margin-bottom: 10px;
              h4 {
                font-size: 20px;
              }
              &:not(:first-child) {
                margin-top: 40px;
              }
            }
            .side-data {
              dl {
                padding-top: 25px;
                &:first-child{
                  padding-top: 0;
                }
              }
            }
            &:last-of-type {
              margin-bottom: 0;
            }
          }
        }
      }
      &.illumination-section {
        .section-card {
          .side-data-box {
            margin-bottom: 30px;
            &:last-of-type {
              margin-bottom: 0;
            }
            .side-data-title {
              margin-bottom: 5px;
            }
            .illumination-align {
              ul {
                display: flex;
                flex-flow: row wrap;
                li {
                  width: 33.33%;
                  text-align: center;
                  margin-top: 16px;
                  .ico {
                     display: block;
                     margin: 0 auto;
                     width: 65px;
                     height: 65px;
                     background-color: #fff;
                     border-radius: 100%;
                     &.ico-light {
                       background: #fff url('../assets/img/home/ic_light_off.svg') no-repeat center center;
                       background-size: contain;
                     }
                     &.ico-curtain {
                       background: #fff url('../assets/img/home/ic_curtain_off.svg') no-repeat center center;
                       background-size: contain;
                     }
                  }
                  p {
                     margin: 0;
                     font-size: 20px;
                     margin-top: 10px;
                  }
                  &.active {
                    .ico-light {
                      background: $khaki url('../assets/img/home/ic_light_on.svg') no-repeat center center;
                      background-size: contain;
                    }
                    .ico-curtain {
                       background: #fff url('../assets/img/home/ic_curtain_on.svg') no-repeat center center;
                       background-size: contain;
                    }
                  }
                }
              }
            }
          }
        }
      }
      &.security-section {
        .section-card {
          .switcher-box {
            padding-top: 60px;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-around;
            margin-bottom: 80px;
            .switcher-item {
              img {
                display: block;
                width: 100px;
                height: 100px;
              }
              p {
                text-align: center;
                font-size: 20px;
                margin: 0;
                margin-top: 10px;
              }
            }
          }
          .side-data-box {
            margin-bottom: 30px;
            .side-data {
              dl {
                &:first-child{
                  padding-top: 0;
                }
                &.active {
                  dd {
                    span {
                      color: $khaki;
                    }
                  }
                }
              }
            }
            &:last-of-type {
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }

  &#home.th {
    .energy-section {
      .energy-footer {
        padding-top: 10px;
      }
    }
    .security-section {
      .switcher-item {
        display: flex;
        flex-flow: column wrap;
        align-items: center;
      }
      .side-data-box {
        .side-data {
          dl {
            padding-top: 28px;
            &:first-child {
              padding-top: 0;
            }
          }
        }
      }
    }
  }
}
</style>
