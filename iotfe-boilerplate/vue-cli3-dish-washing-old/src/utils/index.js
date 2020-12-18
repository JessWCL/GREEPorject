
// eslint-disable-next-line import/prefer-default-export
export const getMID = () => {
  // location.href: file:///data/user/0/com.gree.greesmarthome/files/assets/Plugins/MID/control.html
  // location.href: file:///data/user/0/com.gree.greesmarthome/files/assets/Plugins/MID/notify.html
  const href = location.href;
  const reg = /\/Plugins\/(.*)\/(.*).html/;
  const ret = reg.exec(href);
  if (ret != null) return ret[1];
  return '';
};

export const formatPurifierTime = (PurifierTime, defaultModeTime = 0) => {
  let ret = defaultModeTime;
  const hour = 60;
  const day = 24 * 60;
  const purifierTimerPickers = [
    6 * hour,
    12 * hour,
    18 * hour,
    1 * day,
    2 * day,
    3 * day,
    4 * day
  ];
  if (PurifierTime > 0 && PurifierTime <= 7) {
    ret = purifierTimerPickers[PurifierTime - 1];
  }
  return ret;
};

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

export const sleep = ms => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

export const parseDataObject = strArray => {
  const arrObj = JSON.parse(strArray);
  const Pow = parseInt(arrObj[0], 10);
  const Wash = parseInt(arrObj[1], 10);
  const WashDone = parseInt(arrObj[2], 10);
  const WorkStatus = parseInt(arrObj[3], 10);
  const PauseStart = parseInt(arrObj[4], 10);
  const Mod = parseInt(arrObj[5], 10);
  const LayerWash = parseInt(arrObj[6], 10);
  const Dry = parseInt(arrObj[7], 10);
  const Hard = parseInt(arrObj[8], 10);
  const StHard = parseInt(arrObj[9], 10);
  const RmTmrHour = parseInt(arrObj[10], 10);
  const RmTmrMin = parseInt(arrObj[11], 10);
  const TmrOff = parseInt(arrObj[12], 10);
  const TmrOn = parseInt(arrObj[13], 10);
  const estate1 = parseInt(arrObj[14], 10);
  const estate2 = parseInt(arrObj[15], 10);
  const TmrStatus = parseInt(arrObj[16], 10);
  const TmrHour = parseInt(arrObj[17], 10);
  const TmrMin = parseInt(arrObj[18], 10);
  const StTmr = parseInt(arrObj[19], 10);
  const Purifier = parseInt(arrObj[20], 10);
  const PurifierTime = parseInt(arrObj[21], 10);
  const Disinfect = parseInt(arrObj[22], 10);
  const JFerr = parseInt(arrObj[23], 10);
  const MidType = parseInt(arrObj[24], 10);
  const ret = {
    Pow,
    Wash,
    WashDone,
    WorkStatus,
    PauseStart,
    Mod,
    LayerWash,
    Dry,
    Hard,
    StHard,
    RmTmrHour,
    RmTmrMin,
    TmrOff,
    TmrOn,
    estate1,
    estate2,
    TmrStatus,
    TmrHour,
    TmrMin,
    StTmr,
    Purifier,
    PurifierTime,
    Disinfect,
    JFerr,
    MidType,
  };
  return ret;
};

export const padZero = num => {
  return num > 10 ? num : `0${num}`;
};

export const getCharCodeAtForArray = strArray => {
  let ret = 0;
  for (let index = 0; index < strArray.length; index += 1) {
    const code = strArray[index].charCodeAt() || 0;
    ret += code;
  }
  return ret;
};

export const getAppointmentTime = time => {
  const [strHour, strMinute] = time.split(':');
  const tHour = parseInt(strHour, 10);
  const tMinute = parseInt(strMinute, 10);
  const currentDate = new Date();
  const cHour = currentDate.getHours();
  const cMinute = currentDate.getMinutes();

  const countParamTime = tHour * 60 + tMinute;
  const countCurrentTime = cHour * 60 + cMinute;

  const isAppointmentTomorrow = countParamTime < countCurrentTime;
  const isAppointmentToday = countParamTime >= countCurrentTime;

  const COUNT_ONE_DAY_TIME = 24 * 60;

  let ret = 0;
  if (isAppointmentTomorrow) {
    ret = COUNT_ONE_DAY_TIME - countCurrentTime + countParamTime;
  } else if (isAppointmentToday) {
    ret = countParamTime - countCurrentTime;
  } else {
    console.error('=== getAppointmentTime ===');
  }
  return ret;
};
