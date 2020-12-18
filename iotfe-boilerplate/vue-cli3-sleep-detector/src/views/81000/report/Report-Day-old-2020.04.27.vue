<template>
  <div class="report-day">
    <report-head
      :param-list="paramList"
      :score="score"
      :date-text="dateText"
      v-on:dateBoxClick="dateBoxClick"
    ></report-head>
    <gree-calendar
      v-model="showCalendar"
      ref="reportCalendar"
      :type="calendarComputed.type"
      :color="calendarComputed.color"
      :round="true"
      :title="calendarData.title"
      :min-date="calendarComputed.minDate"
      :max-date="calendarComputed.maxDate"
      :default-date="calendarComputed.defaultDate"
      :position="calendarComputed.position"
      :poppable="calendarComputed.poppable"
      :show-confirm="calendarComputed.showConfirm"
      :show-mark="calendarComputed.showMark"
      @confirm="calendarOnConfirm"
      @select="calendarOnSelect"
      @hide="calendarOnHide"
    ></gree-calendar>
  </div>
</template>

<script>
import { Calendar } from 'gree-ui';
import reportHead from './Report-Head';


export default {
  components: {
    reportHead,
    [Calendar.name]: Calendar,
  },
  data() {
    return {
      showCalendar: false,
      calendarData: {
        title: '',
      },
    };
  },
  computed: {
    score() {
      return 87;
    },
    paramList() {
      return [{
        value: 165,
        unit: ' 次 / 分',
        desc: '平均心率',
      }, {
        value: [1, 35],
        unit: ['时', '分'],
        desc: '打鼾',
      }, {
        value: 20,
        unit: ' 次',
        desc: '体动',
      }, {
        value: 11,
        unit: ' 次 / 分',
        desc: '呼吸频率',
      }];
    },
    dateText() {
      const dateObj = new Date();
      dateObj.setDate(dateObj.getDate() - 1);

      const year = dateObj.getFullYear();
      const month = `0${dateObj.getMonth() + 1}`.slice(-2);
      const date = `0${dateObj.getDate()}`.slice(-2);

      return `${year}/${month}/${date}`;
    },
    calendarComputed() {
      const maxDate = new Date();
      const minDate = new Date();
      const defaultDate = new Date();
      minDate.setDate(minDate.getDate() - 60);
      maxDate.setDate(maxDate.getDate() - 1);
      defaultDate.setDate(defaultDate.getDate() - 1);
      console.log(`minDate:${minDate}`);
      console.log(`maxDate:${maxDate}`);
      return {
        type: 'single',
        color: '#008def',
        round: true,
        minDate,
        maxDate,
        defaultDate,
        poppable: true,
        position: 'bottom',
        showConfirm: true,
        showMark: true,
      };
    },
  },
  methods: {
    dateBoxClick() {
      this.showCalendar = !this.showCalendar;
      this.calendarData.title = this.calendarSetTitle(this.calendarComputed.maxDate);
    },
    calendarOnConfirm() {
      console.log('calendarOnConfirm');
      console.log(this.$refs.reportCalendar);
    },
    calendarOnSelect(dateObj) {
      // console.log('calendarOnSelect');
      if (dateObj instanceof Date) {
        this.calendarSetTitle(dateObj);
      }
    },
    calendarSetTitle(dateObj) {
      if (dateObj instanceof Date) {
        this.calendarData.title = `${dateObj.getFullYear()}年${dateObj.getMonth() + 1}月`;
      }
    },
    calendarOnHide() {
      console.log('calendarOnHide');
    }
  },
};
</script>

<style lang="scss">
.report-day {
  .gree-calendar__popup {
    .gree-calendar__selected-day {
      border-radius: 100%;
    }
  }
}

</style>
