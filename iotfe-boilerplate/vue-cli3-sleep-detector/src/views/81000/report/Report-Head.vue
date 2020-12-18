<template>
  <div class="report-head">
    <div class="date-select-box" v-on:click="dateBoxClick">
      <gree-icon name="arrow-right" style="transform: rotate(180deg)" size="lg"/>
      <div class="date-select">
        {{ dateText }}
      </div>
      <gree-icon name="arrow-right" size="lg"/>
    </div>
    <div class="score">
      <gree-progress
        type="dashboard"
        ref="progress"
        :width="progressWidth"
        :stroke-width="3"
        :value="score / 100"
        color="#6ed4ff"
      ></gree-progress>
      <div class="score-content">
        <p>睡眠评分</p>
        <h2>{{ progressText }}</h2>
        <p v-if="routeName === 'report_day'"></p>
        <div v-else style="height: 30px;"></div>
      </div>
    </div>
    <div class="sleep-parameter">
      <dl v-for="(item, i) in paramList" :key="i">
        <template v-if="/打鼾|平均睡眠/.test(item.desc)">
          <dt >
            {{ item.value[0] }}
            <i>{{ item.unit[0] }}</i>
            {{ item.value[1] }}
            <i>{{ item.unit[0] }}</i>
          </dt>
          <dd>
            {{ item.desc }}
          </dd>
        </template>
        <template v-else >
          <dt>
            {{ item.value }}
            <i>{{ item.unit }}</i>
          </dt>
          <dd>
            {{ item.desc }}
          </dd>
        </template>
      </dl>
    </div>
  </div>
</template>

<script>
import { Progress, Icon } from "gree-ui";
import dayjs from 'dayjs';

export default {
  name: 'ReportHead',
  components: {
    [Progress.name]: Progress,
    [Icon.name]: Icon,
  },
  props: {
    paramList: {
      type: Array,
      default: function paramList() {
        return [{
          value: '--',
          unit: ' 次 / 分',
          desc: '平均心率',
        }, {
          value: ['--', '--'],
          unit: ['时', '分'],
          desc: '打鼾',
        }, {
          value: '--',
          unit: ' 次',
          desc: '体动',
        }, {
          value: '--',
          unit: ' 次 / 分',
          desc: '呼吸频率',
        }];
      },
    },
    score: {
      type: Number,
      default: 0,
    },
    dateText: {
      type: String,
      default: function () {
        return dayjs().subtract(1, 'day').format('YYYY-MM-DD');
      },
    },
  },
  data() {
    return {
      progressWidth: 150,
    };
  },
  computed: {
    routeName() {
      return this.$route.name;
    },
    progressText() {
      return !this.score ? '--' : this.score;
    },
  },
  created() {},
  mounted() {
    this.mountedInit();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.progressResize);
  },
  methods: {
    mountedInit() {
      this.progressWidth = this.progressSizeCount();
      window.addEventListener('resize', this.progressResize);
    },
    // 计算分数progress尺寸
    progressSizeCount() {
      const docWidth = document.documentElement.clientWidth;
      const scoreHeight = document.querySelector('.report-head >.score').getBoundingClientRect().height;
      const progressWidth = 440 * docWidth / 1080;
      const progressHeight = 410 * scoreHeight / 500;

      return progressWidth > progressHeight * 44 / 40 ? progressHeight : progressWidth;
    },
    progressResize() {
      setTimeout(() => {
        console.log('progress resize!');
        this.progressWidth = this.progressSizeCount();
      }, 400);
    },
    dateBoxClick() {
      this.$emit('dateBoxClick');
    },
  }
};
</script>

<style lang='scss' scoped>

.report-head {
  background: linear-gradient(to top, #40b6dc, #3681df);
  box-sizing: border-box;
  height: 750px;
  position: relative;
  overflow: hidden;
  .date-select-box {
    height: 65px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    color: #fff;
    .arrow {
      width: 30px;
      height: 30px;
      border-left: 1PX solid #fff;
      border-bottom: 1PX solid #fff;
      display: block;
    }
    .left-arrow {
      transform: rotate(45deg);
    }
    .right-arrow {
      transform: rotate(-135deg);
    }
    .date-select {
      min-width: 480px;
      font-size: 40px;
      text-align: center;
      color: #ddd;
      letter-spacing: 1px;
    }
  }
  .score {
    box-sizing: border-box;
    padding-top: 40px;
    height: 500px;
    text-align: center;
    position: relative;
    /deep/ .gree-progress-dashboard {
      .gree-progress__text {
        display: none;
      }
    }
    .score-content {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -40%);
      color: #eee;
      font-weight: normal;
      p {
        font-size: 40px;
        margin-bottom: 20px;
      }
      h2 {
        font-family: Helvetica, "Microsoft YaHei", sans-serif !important;
        font-size: 180px;
        color:#fff;
        font-weight: lighter;
        line-height: 1;
      }
    }
  }
  .sleep-parameter {
    height: 185px;
    background-color: rgba(0,0,0,.1);
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    dl {
      color: #fff;
      text-align: center;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      font-size: 44px;
      dt {
        font-size: 50px;
        i {
          font-style: normal;
          font-size: 36px;
        }
      }
    }
  }
}
</style>
