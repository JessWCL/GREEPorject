import { mapState } from 'vuex';
/**
 * @constant {object} initStatusMixin
 * @description 初始化时检测有没有故障、预约
 */
const initStatusMixin = {

  data() {
    return {};
  },
  mounted() {
    this.initError();
    this.updateTimer();
  },
  computed: {
    ...mapState({
      Pow: state => state.dataObject.Pow,
      SchEn: state => state.dataObject.SchEn,
      MidType: state => state.dataObject.MidType,
      /**
       * @function isError
       * @param {object} state
       * @description 检测是否有故障
       */
      isError: function isError(state) {
        const {estate} = state.dataObject;
        const {estate2} = state.dataObject;
        const {estate3} = state.dataObject;
        const {estate4} = state.dataObject;
        let errStatus;
        if (estate !== 0 || estate2 !== 0) {
          errStatus = true;
        } else if (estate3 !== 0 || estate4 !== 0) {
          this.MidType === 26116 ? errStatus = true : errStatus = false;
        } else {
          errStatus = false;
        }
        return errStatus;
      },
      isOffline: state => state.deviceInfo.deviceState
    }),
  },
  watch: {
    /**
     * @function getSchEn
     * @param {number} newv
     * @description 跳转预约页面
     */
    SchEn: function getSchEn(newV, oldV) {
      const isAppointment = newV === 1 && oldV === 0 && this.Pow === 1;
      const isNormal = !this.isError && this.isOffline !== -1;
      const isTurnOff = newV === 0 && oldV === 1;
      if (isTurnOff && isNormal) {
        console.log('watch SchEn $router: /Home'); // eslint-disable-line
        this.$router.push({ name: 'Home' });
      }
      if (isAppointment && isNormal) {
        console.log('watch SchEn $router: /Appointment'); // eslint-disable-line
        this.$router.push({name: 'Appointment'});
      }
      const isTurnToWorking = newV === 0 && oldV === 1 && this.Pow === 1;
      if (isTurnToWorking && isNormal) {
        console.log('watch SchEn $router: /Home'); // eslint-disable-line
        this.$router.push({name: 'Home'});
      }
    },

    /**
     * @function isError
     * @param {number} newv
     * @description 设备故障时跳转故障页面
     */
    isError(newv, oldv) {
      if (!oldv && newv) {
        this.initError();
      }
    },
    /**
     * @function isOffline
     * @param {number} newv
     * @description 设备离线时跳转离线页面
     */
    isOffline: function updateOffline(newv) {
      newv === -1 ? this.$router.push({name: 'Offline'}) : '';
    },
  },
  methods: {
    /**
     * @function updateTimer
     * @description 预约
     */
    updateTimer() {
      if (this.Pow && this.SchEn && !this.isError && this.isOffline !== -1) {
        this.$router.push({ name: 'Appointment' });
      }
    },
    /**
     * @function initError
     * @description APP初始化时检查有没有故障
     */
    initError() {
      if (this.isError && this.isOffline !== -1) {
        this.$router.push({ name: 'Error' });
      } else {
        this.$router.push({ path: '/' });
      }
    },
  },
};

/**
 * @constant {object} timePickerConfig
 * @description 定时配置
 */
const timePickerConfig = {
  data() {
    return {
      appointTime: 60, // 定时时间
    };
  },
  computed: {},
  methods: {
    /**
     * 设置Picker时间
     *
     * @param {*} hour
     * @param {*} minute
     */
    setPickerTime(hour, minute) {
      const selfPicker = this.$refs.timePicker;
      selfPicker.setSlotValue(0, hour);
      selfPicker.setSlotValue(1, minute);
    },

    /**
     * @function setAppointTime
     * @param {number} index 模式Index
     * @description 设置不同机型不同模式的时间滑轮默认值, 设置后主页的显示值也会改变
     */
    setAppointTime(hour, minute) {
      try {
        const selfPicker = this.$refs.timePicker;
        selfPicker.setSlotValue(0, hour);
        selfPicker.setSlotValue(1, minute);
      } catch (e) {
        console.log(e); // eslint-disable-line
      }
    },
  },
};

/**
 * @constant {object} setTime
 * @description 包含时间转换方法和不同米种口感时间的转换方法
 */
const setTime = {
  data() {
    return {
      isTaste: false, // 有没有口感
      isTimeH: false,
      timeH: '1',
      timeM: '30',
    };
  },
  computed: {
    ...mapState({
      MidType: state => state.dataObject.MidType,
    }),
  },
  methods: {
    /**
       * @function timeChange
       * @param {number} reqTime 总时间
       * @param {object} _ptPicker 预约界面的预约滑轮
       * @description 输入烹饪时间/预约时间（总分钟数），转换为小时、分钟
       */
    timeChange(reqTime, _ptPicker = null) {
      let hour;
      let min;
      const myPicker = _ptPicker;
      if (reqTime >= 60) {
        this.isTimeH = true;
        hour = parseInt(reqTime / 60, 10);
        min = parseInt(reqTime % 60, 10);
      } else {
        this.isTimeH = false;
        hour = 0;
        min = reqTime;
      }
      if (myPicker !== null) {
        hour < 10 ? hour = `0${hour}` : hour;
        min < 10 ? min = `0${min}` : min;
        // myPicker.setSlotValue(0, hour);
        // myPicker.setSlotValue(1, min);
        this.presetingH = hour;
        this.presetingM = min;
      } else {
        this.timeH = hour;
        this.timeM = min;
      }
    },

    /**
     *
     * @function typeTasteChangeByMode
     * @description 不同米种和时间对应的烹饪时间
     * @param {any} _index 滑轮数组的index
     * @param {any} _type 米种类型
     * @param {any} _taste 口感类型
     * @returns {number} rTime 返回烹饪时间
     */
    // typeTasteChangeByMode(_index, _type, _taste) {
    //   let rTime = 0;
    //   try {
    //     const currentMode = this.modeList[_index];
    //     const type = _type - 1; // 米种类：1=长粒米，2=短粒米，3=糙米
    //     const taste = _taste - 1; // 口感：1=稍软， 2=适中， 3=稍硬
    //     rTime = currentMode.defaultTimeForCustomize[type][taste];
    //     return rTime;
    //   } catch (e) {
    //     console.log(e);
    //   }
    //   return rTime;
    // },

    /**
     * @function typeChangeByMode
     * @description 不同米种和时间对应的烹饪时间
     * @param {any} _index 滑轮数组的index
     * @param {any} _type 米种类型
     * @returns {number} rTime 返回烹饪时间
     */
    // typeChangeByMode(_index, _type) {
    //   const currentMode = this.modeList[_index];
    //   const type = _type; // 米种类：1=长粒米，2=短粒米，3=糙米
    //   const rTime = currentMode.defaultTimeForCustomize[type];
    //   return rTime;
    // },

    /**
     * 
     * @function typeChange
     * @description 不同米种和时间对应的烹饪时间
     * @param {any} _tpye 
     * @param {any} _taste 
     * @returns {number} rTime 返回烹饪时间 
     */
    typeChange(_tpye, _taste) {
      const type = _tpye;
      const taste = _taste;
      let rTime;
      if (this.isTaste) {
        if (type === 1) {
          switch (taste) {
            case 1:
              this.MidType === 26116 ? rTime = 55 : rTime = 50;
              break;
            case 2:
              rTime = 50;
              break;
            case 3:
              rTime = 45;
              break;
            default:
              rTime = 50;
              break;
          }
        } else if (type === 2) {
          switch (taste) {
            case 1:
              this.MidType === 26116 ? rTime = 55 : rTime = 50;
              break;
            case 2:
              this.MidType === 26116 ? rTime = 50 : rTime = 45;
              break;
            case 3:
              rTime = 45;
              break;
            default:
              rTime = 50;
              break;
          }
        } else if (type === 3) {
          switch (taste) {
            case 1:
              this.MidType === 26116 ? rTime = 60 : rTime = 90;
              break;
            case 2:
              this.MidType === 26116 ? rTime = 55 : rTime = 80;
              break;
            case 3:
              this.MidType === 26116 ? rTime = 50 : rTime = 70;
              break;
            default:
              rTime = 50;
              break;
          }
        }
      } else {
        switch (type) {
          case 1:
            this.MidType === 26116 ? rTime = 30 : rTime = 38;
            break;
          case 2:
            this.MidType === 26116 ? rTime = 30 : rTime = 35;
            break;
          case 3:
            this.MidType === 26116 ? rTime = 30 : rTime = 65;
            break;
          default:
            this.MidType === 26116 ? rTime = 30 : rTime = 38;
            break;
        }
      }
      return rTime;
    },
    /**
     * @function handleCookFunc
     * @description 开始烹饪和预约之后功能跳转
     */
    handleCookFunc() {
      this.$router.push({ path: '/Menu' });
    },
  },
};

export {
  setTime,
  initStatusMixin,
  timePickerConfig,
};
