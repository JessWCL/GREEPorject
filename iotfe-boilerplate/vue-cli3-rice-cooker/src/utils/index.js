// eslint-disable-next-line import/prefer-default-export
export const parseTimeRange = (minTime, maxTime, selectedTime) => {
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
};

export const parseVantDateTimeToInt = currentTime => {
  const currentTimeHour = parseInt(currentTime.split(':')[0], 10);
  const currentTimeMinute = parseInt(currentTime.split(':')[1], 10);
  const ret = currentTimeHour * 60 + currentTimeMinute;
  return ret;
};

export const getVantDateTimeForTiming = (WorkTime = 0) => {
  const nowTimeDate = new Date();
  nowTimeDate.setHours(0);
  nowTimeDate.setMinutes(0);
  nowTimeDate.setMilliseconds(0);
  const nowTime = nowTimeDate.getTime();
  const retTime = new Date(WorkTime * 60 * 1000 + nowTime);
  const hour = retTime.getHours();
  const minute = retTime.getMinutes();
  const ret = `${formateIndex(hour)}:${formateIndex(minute)}`;
  return ret;
};

export const getVantDateTimeForAppointment = (WorkTime = 0) => {
  const nowTime = new Date().getTime();
  const retTime = new Date(WorkTime * 60 * 1000 + nowTime);
  const hour = retTime.getHours();
  const minute = retTime.getMinutes();
  const ret = `${formateIndex(hour)}:${formateIndex(minute)}`;
  return ret;
};

export const formateVantDatetime = currentTime => {
  const currentTimeHour = parseInt(currentTime.split(':')[0], 10);
  const currentTimeMinute = parseInt(currentTime.split(':')[1], 10);
  const ret = `${formateIndex(currentTimeHour)}:${formateIndex(currentTimeMinute)}`;
  return ret;
};

export const formateIndex = index => {
  return index > 9 ? `${index}` : `0${index}`;
};

export const getArrMinToMax = (min, max) => {
  const ret = [];
  for (let index = min; index <= max; index += 1) {
    ret.push(formateIndex(index));
  }
  return ret;
};

export const generatorColumns = ({ minTime, maxTime }) => {
  const _minTime = Math.min(minTime, maxTime);
  const _maxTime = Math.max(minTime, maxTime);
  const minTimeHour = parseInt(_minTime / 60, 10);
  const minTimeMinute = parseInt(_minTime % 60, 10);
  const maxTimeHour = parseInt(_maxTime / 60, 10);
  const maxTimeMinute = parseInt(_maxTime % 60, 10);


  const ret = {};

  // 同一小时范围
  if (minTimeHour === maxTimeHour) {
    if (minTimeMinute !== maxTimeMinute) {
      ret[formateIndex(minTimeHour)] = getArrMinToMax(minTimeMinute, maxTimeMinute);
    }

  // 不同小时范围
  } else if (minTimeHour !== maxTimeHour) {
    // const arrKey = getArrMinToMax(minTimeHour, maxTimeHour);
    ret[formateIndex(minTimeHour)] = getArrMinToMax(minTimeMinute, 59);
    for (let index = minTimeHour + 1; index < maxTimeHour; index += 1) {
      ret[formateIndex(index)] = getArrMinToMax(0, 59);
    }
    ret[formateIndex(maxTimeHour)] = getArrMinToMax(0, maxTimeMinute);
  }

  return ret;
};

export const getVantPickerTimeRange = currentMode => {
  const { maxTime, minTime } = currentMode;

  const _minTime = Math.min(minTime, maxTime);
  const _maxTime = Math.max(minTime, maxTime);
  const minHour = parseInt(_minTime / 60, 10);
  const maxHour = parseInt(_maxTime / 60, 10);
  const minMinute = parseInt(_minTime % 60, 10);
  const maxMinute = parseInt(_maxTime % 60, 10);

  return {
    minHour,
    maxHour,
    minMinute,
    maxMinute,
  };
};

/**
 * 用于设置默认值
 * 由于不同设备，有些设备没有此字段模块回空字符串
 *
 * @param {Object | Array} obj 设备数据
 * @param {Number | String} defaultValue 字段默认值
 */
export const useDefaultValue = (obj, defaultValue = 0) => {
  let ret;
  let isLog = false;

  const isArray = Array.isArray(obj);

  function isObject(val) {
    return val != null && typeof val === 'object' && Array.isArray(val) === false;
  }

  if (isArray) {
    ret = [];
    for (let index = 0; index < obj.length; index += 1) {
      const value = obj[index];
      const isGetDefaultValue = value === '' || value === null || isNaN(value);
      if (isGetDefaultValue) {
        if (!isLog) isLog = true;
        ret.push(defaultValue);
      } else {
        ret.push(value);
      }
    }
  } else if (isObject(obj)) {
    ret = {};
    for (const key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const isGetDefaultValue = value === '' || value === null || isNaN(value);
        if (isGetDefaultValue) {
          if (!isLog) isLog = true;
          ret[key] = defaultValue;
        } else {
          ret[key] = value;
        }
      }
    }
  } else {
    console.error('=== not match any type ===');
  }

  if (isLog) console.log('==== useDefaultValue ====');

  return ret;
};
/*
 * 判读模块是否 MQTT 协议
 */
export const isMqtt = () => {
  const reg = /upper_device_protocol_version\/(.+)/g;
  const ver = reg.exec(navigator.userAgent);
  try {
    if (ver === null) return false;

    const version = ver[1]; // 模块传的值 "V3.0"
    if (Number(version.split('V')[1].split('.')[0]) >= 3) {
      return true;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};
