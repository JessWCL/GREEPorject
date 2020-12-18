
/**
 * @constant {object} initPickerSlotsMixin
 * @description 饭煲picker配置列表
 */
const minuteAll = [];
const hourAll = [];
// 时间范围数组
for (let i = 0; i < 24; i += 1) {
  if (i < 10) {
    hourAll.push(`0${i}`);
  } else {
    hourAll.push(i);
  }
}
for (let i = 0; i < 60; i += 1) {
  if (i < 10) {
    minuteAll.push(`0${i}`);
  } else {
    minuteAll.push(i);
  }
}
const initPickerSlotsMixin = {
  data() {
    return {
      // 定时时间picker配置
      initTimingPickerSlots: [
        {
          flex: '40%',
          values: hourAll,
          defaultIndex: 1,
          className: 'time-slot1',
          textAlign: 'center',
        },
        {
          flex: '10%',
          divider: true,
          content: '小时',
          className: 'slot2',
        },
        {
          flex: '40%',
          values: minuteAll,
          defaultIndex: 0,
          className: 'time-slot3',
          textAlign: 'center',
        },
        {
          flex: '10%',
          divider: true,
          content: '分钟',
          className: 'slot4',
          textAlign: 'left',
        },
      ],

      // 预约时间picker配置
      initAppointmentPickerSlots: [
        {
          flex: '40%',
          values: hourAll,
          defaultIndex: 1,
          className: 'time-slot1',
          textAlign: 'center',
        },
        {
          flex: '10%',
          divider: true,
          content: ':',
          className: 'slot2 standard-time',
        },
        {
          flex: '40%',
          values: minuteAll,
          defaultIndex: 0,
          className: 'time-slot3',
          textAlign: 'center',
        },
        {
          flex: '10%',
          divider: true,
          content: '',
          className: 'slot4',
          textAlign: 'left',
        },
      ]
    };
  }
};

export default initPickerSlotsMixin;
