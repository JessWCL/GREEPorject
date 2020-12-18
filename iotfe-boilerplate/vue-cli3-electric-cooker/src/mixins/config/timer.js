import { getRealIndex } from '../../utils';

/**
 * @constant {object} timerConfig
 * @description 饭煲预约配置列表
 */

// 时间范围
const miniteAll = [];
for (let i = 0; i < 60; i += 1) {
  if (i < 10) {
    miniteAll[i] = { text: `0${i}`, value: i };
  } else {
    miniteAll[i] = { text: `${i}`, value: i };
  }
}
let presetPickerData = [];
for (let i = 0; i < 24; i += 1) {
  presetPickerData[i] = { text: `${i}`, value: i, children: miniteAll };
}
presetPickerData = [presetPickerData];

const timerConfig = {
  data() {
    return {
      swiperOptions: {
        effect: 'cube',
        cubeEffect: {
          slideShadows: false,
          shadow: false
        },
        noSwiping: true
      },
      modeDataTime: [
        {
          src: require('../../assets/img/carousel_marrow.png'), // 精煮饭
          title: this.$language('mode.marrow')
        },
        {
          src: require('../../assets/img/carousel_marrow.png'), // 糙米饭
          title: this.$language('mode.crude')
        },
        {
          src: require('../../assets/img/carousel_germination.png'), // 发芽饭
          title: this.$language('mode.germination')
        },
        {
          src: require('../../assets/img/carousel_cerealCongee.png'), // 杂粮粥
          title: this.$language('mode.cerealCongee')
        },
        {
          src: require('../../assets/img/carousel_congee.png'), // 煮粥
          title: this.$language('mode.congee')
        },
        {
          src: require('../../assets/img/carousel_porridge.png'), // 稀饭
          title: this.$language('mode.porridge')
        },
        {
          src: require('../../assets/img/carousel_soup.png'), // 煲汤
          title: this.$language('mode.soup')
        },
        {
          src: require('../../assets/img/carousel_steam.png'), // 蒸煮
          title: this.$language('mode.steam')
        }
      ],
      presetList: presetPickerData,
      hasTimer: false, // 是否有定时
      showMinWarnFir: false, // 可调时间范围前面的分钟
      showMinWarn: false, // 可调时间范围单位控制
      warnTimeMin: 1, // 可调时间范围小时
      warnTimeMax: 3 // 可调时间范围分钟
    };
  },
  methods: {
    /**
     * @param val 当前模式
     * @description 更新各个模式的`可调时间范围`
     */
    updateTimeRange(val) {
      const timeRangeMin = this.advancedList[
        getRealIndex(this.advancedList, 'protocolVal', val)
      ].minTime;
      const timeRangeMax = this.advancedList[
        getRealIndex(this.advancedList, 'protocolVal', val)
      ].maxTime;
      const minTime =
        timeRangeMin % 60 ? (timeRangeMin / 60).toFixed(1) : timeRangeMin / 60;
      const maxTime =
        timeRangeMax % 60 ? (timeRangeMax / 60).toFixed(1) : timeRangeMax / 60;
      if (timeRangeMin < 60) {
        this.showMinWarnFir = true;
        this.showMinWarn = true;
        this.warnTimeMin = timeRangeMin;
        this.warnTimeMax = timeRangeMax;
      } else {
        this.showMinWarnFir = false;
        this.showMinWarn = false;
        this.warnTimeMin = minTime;
        this.warnTimeMax = maxTime;
      }
    },
    /**
     * @param reqTime 总时间分钟数
     * @description 换算时间
     */
    timeChange(reqTime) {
      let hour;
      let min;
      if (reqTime >= 60) {
        this.showHour = true;
        hour = parseInt(reqTime / 60, 10);
        min = parseInt(reqTime % 60, 10);
      } else {
        this.showHour = false;
        hour = 0;
        min = reqTime;
      }
      return { hour, min };
    },
    /**
     * @description 根据模式的最小和最大时间设置滑轮范围
     */
    setPickerRange() {
      if (this.isPicking) {
        const timeRangeMin = this.advancedList[
          getRealIndex(this.advancedList, 'protocolVal', this.mode)
        ].minTime;
        const timeRangeMax = this.advancedList[
          getRealIndex(this.advancedList, 'protocolVal', this.mode)
        ].maxTime;
        const minHour = Math.floor(timeRangeMin / 60);
        const maxHour = Math.floor(timeRangeMax / 60);
        const RemainingMin = parseInt(timeRangeMin % 60, 10);
        const RemainingMax = parseInt(timeRangeMax % 60, 10);
        // 生成`分钟`数组
        const pickerMinutes = [];
        for (let i = minHour; i <= maxHour; i += 1) {
          pickerMinutes[i] = [];
          switch (i) {
            case minHour:
              if (minHour === maxHour) {
                // 如果min小时和max小时在同一时段，则选择max
                if (RemainingMax > 0) {
                  for (let j = 0; j < RemainingMax; j += 1) {
                    pickerMinutes[i][j] = {
                      text: j < 10 ? `0${j}` : `${j}`,
                      value: j
                    };
                  }
                } else {
                  pickerMinutes[i][0] = {
                    text: '00',
                    value: 0
                  };
                }
              } else if (RemainingMin > 0 || minHour < maxHour) {
                for (let j = 0; j < 60 - RemainingMin; j += 1) {
                  pickerMinutes[i][j] = {
                    text: j < 10 ? `0${j}` : `${j}`,
                    value: j
                  };
                }
              } else {
                pickerMinutes[i][0] = {
                  text: '00',
                  value: 0
                };
              }
              break;
            case maxHour:
              if (RemainingMax > 0) {
                for (let j = 0; j < RemainingMax; j += 1) {
                  pickerMinutes[i][j] = {
                    text: j < 10 ? `0${j}` : `${j}`,
                    value: j
                  };
                }
              } else {
                pickerMinutes[i][0] = {
                  text: '00',
                  value: 0
                };
              }
              break;
            default:
              for (let j = 0; j < 60; j += 1) {
                pickerMinutes[i][j] = {
                  text: j < 10 ? `0${j}` : `${j}`,
                  value: j
                };
              }
              break;
          }
        }
        let pickerData = [];
        for (let i = minHour; i <= maxHour; i += 1) {
          pickerData[i - minHour] = {
            text: i < 10 ? `0${i}` : `${i}`,
            value: i,
            children: pickerMinutes[i]
          };
        }
        pickerData = [pickerData];
        // 设置timePicker各列初始选中项索引
        const defaultTime = this.advancedList[
          getRealIndex(this.advancedList, 'protocolVal', this.mode)
        ].defaultTime;
        this.pickerDefaultIndex = [
          parseInt(defaultTime / 60, 10) - minHour,
          parseInt(defaultTime % 60, 10)
        ];
        return pickerData;
      }
      return [];
    },
    /**
     * @description 模式改变后改变timePicker取值范围
     */
    changeCarouselTime() {
      if (this.hasTimer) {
        this.refreshPicker();
      } else {
        this.isPicking = false;
      }
    }
  }
};

export default timerConfig;
