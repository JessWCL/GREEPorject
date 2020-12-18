<template>
  <section>{{ clock }}</section>
</template>

<script>
import { parseTimeData, padZero } from '@/utils';

export default {
  props: {
    time: {
      type: Number,
      default: 0
    }
  },
  computed: {
    clock() {
      return padZero(this.hour) + ':' + padZero(this.min) + ':' + padZero(this.sec);
    }
  },
  data() {
    return {
      hour: 0,
      min: 0,
      sec: 0
    };
  },
  methods: {
    start() {
      const timeData = parseTimeData(this.time);
      this.hour = timeData.hours;
      this.min = timeData.minutes;
      this.sec = timeData.seconds;
      this.pause();
      this.continue();
    },
    pause() {
      clearInterval(this.$_timeId);
      this.$_timeId = null;
    },
    continueCountup() {
      this.$_timeId = setInterval(() => {
        this.sec += 1;
        if (this.min === 60) {
          this.hour += 1;
          this.min = 0;
        }
        if (this.sec === 60) {
          this.min += 1;
          this.sec = 0;
        }
      }, 1000);
    },
    continue() {
      if (this.$_timeId) {
        return;
      }
      this.continueCountup();
    },
    stop() {
      this.pause();
      this.hour = 0;
      this.min = 0;
      this.sec = 0;
    }
  },
  mounted() {
    this.start();
  },
  beforeDestroy() {
    this.pause();
  }
};
</script>
