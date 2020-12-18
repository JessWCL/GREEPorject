<template>
  <div class="page-section sleep-page" id="">
    <div class="gree-logo">
      <h5>格力零碳健康家</h5>
      <p>Gree Carbon-Free Health House</p>
    </div>
    <div class="sleep-container">
      <div class="sleep-title">
        <h2>晚安</h2>
        <div class="music-box">
          <!-- <p class="music-name">
            <span>幽谷山涧</span>
          </p> -->
          <div class="music-ico">
            <!-- <img :src="imgAssets.music[icoIndex]" alt="music ico"> -->
            <canvas ref="canvas_ico" id="canvas_ico" class="canvas_ico" width="80" height="100" ></canvas>
          </div>
          <!-- <div class="log">
            {{ log }}
          </div> -->
        </div>
      </div>
      <div class="environment-data">
        <ul>
          <li>
            <img :src="imgAssets.environment[0]" alt="">
            <span>室内</span>
            <span>{{ sleep.temperature }}℃</span>
          </li>
          <li>
            <img :src="imgAssets.environment[1]" alt="">
            <span>室内</span>
            <span>{{ sleep.humidity }}%</span>
          </li>
          <li>
            <img :src="imgAssets.environment[2]" alt="">
            <span>优</span>
          </li>
          <li>
            <img class="pm" :src="imgAssets.environment[3]" alt="">
            <span>{{ sleep.pm2p5 }}</span>
          </li>
        </ul>
      </div>
      <div class="sleep-section">
        <div class="sleep-card sleep-data">
          <h5>睡眠数据</h5>
          <ul>
            <li>
              <div>
                <b>{{ sleep.heartRate === 0 ? '--' : sleep.heartRate }}</b><span>bpm</span>
              </div>
              <p>心率</p>
            </li>
            <li>
              <div>
                <b>{{ sleep.breathRate === 0 ? '--' : sleep.breathRate }}</b><span>bpm</span>
              </div>
              <p>呼吸率</p>
            </li>
            <li>
              <div>
                <b>{{ sleep.bodyMotion === 0 ? '--' : sleep.bodyMotion }}</b><span>次</span>
              </div>
              <p>体动</p>
            </li>
          </ul>
        </div>
        <div class="sleep-card sleep-device">
          <h5>设备状态</h5>
          <ul>
            <li :class="{active: sleep.pow828502 === 1}">
              <div class="device-img" >
                <img 
                  :src="sleep.pow828502 === 1 ? imgAssets.device[0] : imgAssets.deviceFail[0]" 
                  alt="">
              </div>
              <p>加湿器</p>
            </li>
            <li :class="{active: sleep.pow10f10 === 1}">
              <div class="device-img" >
                <img 
                  :src="sleep.pow10f10 === 1 ? imgAssets.device[1] : imgAssets.deviceFail[1]" 
                  alt="">
              </div>
              <p>新风空调</p>
            </li>
            <li :class="{active: sleep.pow828202 === 1}">
              <div class="device-img">
                <img 
                  :src="sleep.pow828202 === 1 ? imgAssets.device[2] : imgAssets.deviceFail[2]" 
                  alt="">
              </div>
              <p>塔扇</p>
            </li>
            <li :class="{active: sleep.pow828a01 === 1}">
              <div class="device-img">
                <img 
                  :src="sleep.pow828a01 === 1 ? imgAssets.device[3] : imgAssets.deviceFail[3]" 
                  alt="">
              </div>
              <p>电暖器</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import myFunc from '../utils/myFunc.js';

const imgAssets = {};
function imgSrcInit() {
  imgAssets.music = [];
  for (let i = 0; i < 13; i++) {
    let num = 0;
    i < 10 ? num = '0' + i : num = i;
    const img = require('../assets/img/sleep/ico_sequence/Notes_player_music' + num + '.png');
    imgAssets.music.push(img);
  }
  {
    imgAssets.environment = [];
    imgAssets.environment[0] = require('../assets/img/sleep/ic_wendu.svg');
    imgAssets.environment[1] = require('../assets/img/sleep/ic_shidu.svg');
    imgAssets.environment[2] = require('../assets/img/sleep/ic_kongqizhiliang.svg');
    imgAssets.environment[3] = require('../assets/img/sleep/ic_PM2.5.svg');
    imgAssets.device = [];
    imgAssets.device[0] = require('../assets/img/sleep/ic_ele_jiashiqi.svg');
    imgAssets.device[1] = require('../assets/img/sleep/ic_ele_kongtiao.svg');
    imgAssets.device[2] = require('../assets/img/sleep/ic_ele_tashan.svg');
    imgAssets.device[3] = require('../assets/img/sleep/ic_ele_diannuanqi.svg');
    imgAssets.deviceFail = [];
    imgAssets.deviceFail[0] = require('../assets/img/sleep/ic_ele_jiashiqi_fail.svg');
    imgAssets.deviceFail[1] = require('../assets/img/sleep/ic_ele_kongtiao_fail.svg');
    imgAssets.deviceFail[2] = require('../assets/img/sleep/ic_ele_tashan_fail.svg');
    imgAssets.deviceFail[3] = require('../assets/img/sleep/ic_ele_diannuanqi_fail.svg');
  }
  
  // console.log(imgAssets);
}
imgSrcInit();

export default {
  name: "sleep",
  components: {},
  data() {
    return {
      imgAssets,
      icoIndex: 0, // 当前ico图序号
      icoImgArr: [], // img元素数组
      timer_ico: null, // 动画计时器
      animation: { // requestAnimationFrame
        start: null, // 开始时间
        targetProgress: 77, // 刷新间隔时间(ms)
      },
      log: [],
      timer_getData: null,
    };
  },
  computed: {
    ...mapState({
      sleep: state => state.dataObject.sleep,
    }),
    canvasIco() {
      return this.$refs.canvas_ico;
    },
  },
  watch: {},
  created() {
    // this.createdInit();
  },
  mounted() {
    // this.icoImgPlay();
    this.CanvasIcoInit();
  },
  beforeDestroy() {
    this.timerDestroy();
  },
  methods: {
    ...mapActions({
      getData: 'getFiveSystemData',
    }),
    createdInit() {
      const htmlName = myFunc.getHtmlName();
      console.log(htmlName);
      this.log.push(htmlName);
      // 调用接口测试
      this.getData('sleep').then(res => {
        console.log('Sleep.vue ', res);
        this.log.push(res);
      });
      this.timer_getData = window.setInterval(() => {
        this.getData('sleep').then(res => {
          console.log('Sleep.vue ', res);
          this.log.push(res);
        });
      }, 5000);
    },
    // 获取图像元素集合Promise,全部onload后resolve
    imgIcoAll() {
      const imgPromiseArr = this.imgAssets.music.map(el => {
        const img = new Image();
        const result = new Promise((resolve, reject) => {
          img.onload = function imgLoad() {
            resolve(img);
          };
          img.onerror = function imgError(err) {
            reject(err);
          };
        });
        img.src = el;
        return result;
      });
      return Promise.all(imgPromiseArr);
    },
    // 初始化canvas
    CanvasIcoInit() {
      const ctx = this.canvasIco.getContext('2d');
      const imgIcoAll = this.imgIcoAll();
      imgIcoAll
        .then(res => {
          // console.log(res);
          this.icoImgArr = res;
          ctx.drawImage(this.icoImgArr[0], 0, 0, 80, 100);
          this.timer_ico = window.requestAnimationFrame(this.canvasIcoPlay);
        })
        .catch(err => {
          console.error(err);
        });
    },
    // 播放canvas动画
    canvasIcoPlay(timestamp) {
      if (!this.animation.start) {
        // 初试时间
        this.animation.start = timestamp;
      }
      const ctx = this.canvasIco.getContext('2d');
      // 初始到现在经过的时间
      const progress = timestamp - this.animation.start;
      if (progress >= this.animation.targetProgress) {
        this.icoIndex >= 12 ? this.icoIndex = 0 : this.icoIndex++;
        ctx.clearRect(0, 0, 80, 100);
        ctx.drawImage(this.icoImgArr[this.icoIndex], 0, 0, 80, 100);
        this.animation.start = timestamp;
      }
      // 递归调用
      this.timer_ico = window.requestAnimationFrame(this.canvasIcoPlay);
    },
    /**
     * @deprecated 已废弃，使用Canvas
     * @description img播放
     */
    icoImgPlay() {
      this.timer_ico = setInterval(() => {
        this.icoIndex >= 12 ? this.icoIndex = 0 : this.icoIndex++;
      }, 75);
    },
    // Timer和动画销毁
    timerDestroy() {
      this.timer_ico && window.clearTimeout(this.timer_ico);
      this.timer_ico = null;
      this.timer_getData && window.clearTimeout(this.timer_getData);
      this.timer_getData = 0;
    },
  },
};
</script>

<style lang="scss" scoped>
$skyblue: #32C5FF;
$grassgreen: #6DD400;
$khaki: #F7B500;

.sleep-page {
  border: none;
  border-radius: 0;
  background-color: transparent;
  position: relative;
  color: #fff;
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
  .sleep-container {
    padding: 0 110px;
  }
  .sleep-title {
    margin-bottom: 0;
    margin-top: 200px;
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-end;
    h2 {
      color: #fff;
      text-align: left;
      font-size: 132px;
      font-weight: normal;
      margin-bottom: 0;
      user-select: none;
    }
    .music-box {
      padding-left: 20px;
      display: flex;
      flex-flow: row nowrap;
      align-items: flex-end;
      p.music-name {
        margin: 0;
        width: 130px;
        font-weight: lighter;
      }
      .music-ico {
        width: 80px;
        height: 100px;
        margin-bottom: -10px;
        img {
          width: 100%;
        }
        canvas {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .environment-data {
    height: 120px;
    ul {
      display: flex;
      flex-flow: row nowrap;
      li {
        line-height: 120px;
        margin-right: 80px;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        img {
          display: block;
          width: 38px;
          height: 38px;
          margin-right: 10px;
          &.pm {
            width: 42px;
            height: 42px;
          }
        }
        span {
          display: block;
          font-size: 38px;
          font-weight: lighter;
          margin-right: 10px;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
  .sleep-section {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    .sleep-card {
      background-color: rgba(193, 176, 255, .1);
      border-radius: 14px;
      width: calc(50% - 10px);
      height: 380px;
      box-sizing: border-box;
      padding: 0 50px;
      h5 {
        font-size: 28px;
        color: #fff;
        font-weight: normal;
        // color: rgba(255,255,255,.5);
        padding-top: 20px;
        padding-left: 20px;
      }
      ul {
        padding-top: 80px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
        li {
          b {
            font-size: 72px;
            font-weight: lighter;
            font-family: 'Roboto-Light';
          }
          span {
            padding-left: 5px;
          }
          p {
            text-align: center;
            font-size: 28px;
            // color: rgba(255,255,255,.5);
          }
        }
      }
    }
    .sleep-device {
      ul {
        padding-top: 70px;
        li {
          .device-img {
            opacity: 1;
            width: 100px;
            height: 100px;
            /* mask: url('../assets/img/sleep/ic_ele_jiashiqi.svg') no-repeat center center;
            mask-size: 100% 100%;
            background-color: #fff; */
            img {
              width: 100%;
              height: 100%;
            }
          }
          p {
            margin-top: 15px;
            // color: $skyblue;
          }
          &.active {
            p {
              color: $skyblue;
            }
          }
        }
      }
    }
  }
}
</style>
