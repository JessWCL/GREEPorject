const globalMixin = {
  methods: {
    getCurrentModeByModeId(modeId) {
      let currentMode = this.modeList[0];
      // 整机的模式
      const selectedModeId = modeId || this.dataObject.mode;
      let hasWarn = true;
      this.modeList.forEach(ele => {
        const m = ele;
        if (m.modeId === selectedModeId) {
          currentMode = m;
          hasWarn = false;
        }
      });
      // eslint-disable-next-line no-console
      if (hasWarn) console.warn('currentMode is default mode!');
      return currentMode;
    },

    /**
     * 获取默认返回模式工作时间，
     * 如果有米种或口感时，返回米种、口感的工作时间
     *
     * @param {*} currentMode
     * @param {number} [rice=0]
     * @param {number} [taste=0]
     */
    getRiceTextreModeTime(currentMode, rice, textre) {
      // 默认时间
      const {
        defaultTime,
        hasRice,
        hasTextre,
        defaultValueRiceTextre,
        canEditableRiceTextreComponent
      } = currentMode;
      const [defaultRice, defaultTextre] = defaultValueRiceTextre;

      const canEditable = canEditableRiceTextreComponent || false;

      if (defaultRice > 3 || defaultRice < 1) {
        console.warn(`defaultRice array bound. defaultRice: ${defaultRice}`); // eslint-disable-line
      }
      if (defaultTextre > 3 || defaultTextre < 1) {
        console.warn(`defaultTextre array bound. defaultTextre: ${defaultTextre}`); // eslint-disable-line
      }
      if (rice > 3 || rice < 1) {
        console.warn(`Rice array bound. rice: ${rice}`); // eslint-disable-line
        rice = defaultRice; // eslint-disable-line
      }
      if (textre > 3 || textre < 1) {
        console.warn(`Textre array bound. defaultTextre: ${textre}`); // eslint-disable-line
        textre = defaultRice; // eslint-disable-line
      }

      let currentModeTime = defaultTime;

      // 是否有米种 口感选择
      if (hasRice && hasTextre) {
        // 不能编辑直接读取默认时间
        if (!canEditable) {
          currentModeTime = currentMode.defaultTimeForCustomize[defaultRice][defaultTextre];
        } else if (canEditable) {
          currentModeTime = currentMode.defaultTimeForCustomize[rice][textre];
        } else {
          currentModeTime = currentMode.defaultTimeForCustomize[rice][textre];
        }

        // 是否有米种选择
      } else if (hasRice) {
        // 不能编辑直接读取默认时间
        if (!canEditable) {
          currentModeTime = currentMode.defaultTimeForCustomize[defaultRice];
        } else if (canEditable) {
          currentModeTime = currentMode.defaultTimeForCustomize[rice];
        } else {
          currentModeTime = currentMode.defaultTimeForCustomize[rice];
        }

        // 是否口感选择
      } else if (hasTextre) {
        // 不能编辑直接读取默认时间
        if (!canEditable) {
          currentModeTime = currentMode.defaultTimeForCustomize[defaultTextre];
        } else if (canEditable) {
          currentModeTime = currentMode.defaultTimeForCustomize[textre];
        } else {
          currentModeTime = currentMode.defaultTimeForCustomize[textre];
        }
      }

      if (currentModeTime <= 0) {
        currentModeTime = defaultTime;
        console.log('RiceTextre ModeTime is zero, set defaultTime to currentModeTime.'); // eslint-disable-line
        console.log(`currentModeTime: ${currentModeTime}`); // eslint-disable-line
      }

      return currentModeTime;
    },

    globalTimerTitleTips(title, currentMode) {
      const { maxTime, minTime } = currentMode;
      let result = '';
      if (currentMode.hasTimer) {
        const _maxTime = Math.max(maxTime, minTime);
        const _minTime = Math.min(maxTime, minTime);

        const allGreaterThanOneHour = _maxTime >= 60 && _minTime >= 60;
        const allLessThanOneHour = _maxTime < 60 && _minTime < 60;

        const hasHour = _maxTime >= 60 || _minTime >= 60;
        const hasMinute = _maxTime < 60 || _minTime < 60;

        const parseMinTime = parseFloat(_minTime / 60);
        const parseMaxTime = parseFloat(_maxTime / 60);

        let beforeUnit = '';
        let afterUnit = '';

        if (allGreaterThanOneHour) {
          afterUnit = '小时';
          result = `${title}：${parseMinTime}~${parseMaxTime}${afterUnit}`;
        } else if (allLessThanOneHour) {
          afterUnit = '分钟';
          result = `${title}：${_minTime}~${_maxTime}${afterUnit}`;
        } else if (hasHour || hasMinute) {
          beforeUnit = hasMinute ? '分钟' : '';
          afterUnit = hasHour ? '小时' : '分钟';
          result = `${title}：${_minTime}${beforeUnit}~${parseMaxTime}${afterUnit}`;
        } else {
          afterUnit = '分钟';
          result = `${title}：${_minTime}~${_maxTime}${afterUnit}`;
        }
      }
      return result;
    },

    /**
     * @function fixBug
     * @param defaultTime 当前模式默认时间
     * @description Mint-UI picker的bug：当两次所选的值相同，并且两个值都是所在区间的边界值，样式会混乱
     * 如：第一个区间是['00', '01']，setValue = '01'，调整到['01', '02', '03']，setValue = '01'。这时滑轮样式会混乱
     * 这里是为了解决这个问题。先设置为别的值，再设置想要的值
     */
    fixBug(defaultTime) {
      console.log('===== use FixBug ===='); // eslint-disable-line
      const selfPicker = this.$refs.timePicker;
      const hourList = selfPicker.getSlotValues(0);
      const minList = selfPicker.getSlotValues(1);
      const curHour = parseInt(defaultTime / 60, 10);
      const curMin = parseInt(defaultTime % 60, 10);
      // 获取当前值
      const _curHour = curHour < 10 ? `0${curHour}` : curHour;
      const _curMin = curMin < 10 ? `0${curMin}` : curMin;
      // 获取当前值的前一个或者后一个值
      let bufferHour = hourList[hourList.indexOf(_curHour) - 1]
        ? hourList[hourList.indexOf(_curHour) - 1]
        : hourList[hourList.indexOf(_curHour) + 1];
      const bufferMin = minList[minList.indexOf(_curMin) - 1]
        ? minList[minList.indexOf(_curMin) - 1]
        : minList[minList.indexOf(_curMin) + 1];

      const isOnlyOne = hourList[hourList.indexOf(_curHour) - 1] === undefined
        && hourList[hourList.indexOf(_curHour) + 1] === undefined;
      if (isOnlyOne) {
        selfPicker.setSlotValues(0, [_curHour, 10]);
        bufferHour = 10;
        // 先设置当前值的前一个或者后一个，下一个eventloop再设置回正确的值，代价是页面可能会闪一下
        bufferHour && selfPicker.setSlotValue(0, bufferHour);
        bufferMin && selfPicker.setSlotValue(1, bufferMin);
        setTimeout(() => {
          selfPicker.setSlotValue(0, _curHour);
          selfPicker.setSlotValue(1, _curMin);
          selfPicker.setSlotValues(0, [_curHour]);
        }, 0);
      } else {
        // 先设置当前值的前一个或者后一个，下一个eventloop再设置回正确的值，代价是页面可能会闪一下
        bufferHour && selfPicker.setSlotValue(0, bufferHour);
        bufferMin && selfPicker.setSlotValue(1, bufferMin);
        setTimeout(() => {
          selfPicker.setSlotValue(0, _curHour);
          selfPicker.setSlotValue(1, _curMin);
        }, 0);
      }
    },

    fixMinuteDefaultValue(timePicker, preArrMinute) {
      const selfPicker = timePicker;
      const curArrMinute = selfPicker.getSlotValues(1);

      const curArrMinuteLength = (curArrMinute && curArrMinute.length) || 0;
      const preArrMinuteLength = (preArrMinute && preArrMinute.length) || 0;

      const isFix = curArrMinuteLength !== preArrMinuteLength;
      if (isFix) selfPicker.setSlotValue(1, curArrMinute[0]);
    },

    /**
     * 设置Picker slot 时间
     *
     * @param {Array<Number>} hour
     * @param {Array<Number>} minute
     */
    setPickerSlots(arrHour, arrMinute) {
      const selfPicker = this.$refs.timePicker;
      selfPicker.setSlotValues(0, arrHour);
      selfPicker.setSlotValues(1, arrMinute);
    },

    parseTimeRange(minTime, maxTime, selectedTime) {
      const minTimeHour = parseInt(minTime / 60, 10);
      const maxTimeHour = parseInt(maxTime / 60, 10);

      const minTimeMinute = parseInt(minTime % 60, 10);
      const maxTimeMinute = parseInt(maxTime % 60, 10);

      const pickerHour = parseInt(selectedTime / 60, 10);
      // const pickerMinute = parseInt(selectedTime % 60, 10);

      // 时间范围数组
      const arrHour = [];
      const arrMinute = [];

      for (let i = minTimeHour; i <= maxTimeHour; i += 1) {
        if (i < 10) {
          arrHour.push(`0${i}`);
        } else {
          arrHour.push(i);
        }
      }

      // 处于最小值
      if (pickerHour === minTimeHour) {
        let _maxMinute = 59;

        // 同一个时间区间
        if (minTimeHour === maxTimeHour) _maxMinute = maxTimeMinute;

        // 时间范围数组
        for (let i = minTimeMinute; i <= _maxMinute; i += 1) {
          if (i < 10) {
            arrMinute.push(`0${i}`);
          } else {
            arrMinute.push(i);
          }
        }

        // 处于最大值
      } else if (pickerHour === maxTimeHour) {
        // 时间范围数组
        for (let i = 0; i <= maxTimeMinute; i += 1) {
          if (i < 10) {
            arrMinute.push(`0${i}`);
          } else {
            arrMinute.push(i);
          }
        }

        // 处于中间值
      } else {
        // 时间范围数组
        for (let i = 0; i <= 59; i += 1) {
          if (i < 10) {
            arrMinute.push(`0${i}`);
          } else {
            arrMinute.push(i);
          }
        }
      }

      return {
        arrHour,
        arrMinute
      };
    }
  }
};

export default globalMixin;
