<template>
  <div class="work-time">
    <span
      class="time-text"
      :class="{ 'none': isShowAbout }"
    >{{ about }}</span>
    <span
      v-if="parseInt(time / 60) >= 1"
      class="time-num"
    >{{ parseInt(time / 60) }}</span>
    <span
      v-if="parseInt(time / 60) >= 1"
      class="time-text"
    >{{ unitHour }}</span>
    <span class="time-num">{{ time % 60 }}</span>
    <span class="time-text">{{ unitMin }}</span>
  </div>
</template>

<script>
export default {
  name: 'WorkTime',
  props: {
    time: {
      type: Number,
      required: true,
      // eslint-disable-next-line func-names
      default: function () {
        return 0;
      }
    },
    isShowAbout: {
      type: Boolean,
      // eslint-disable-next-line func-names
      default: function () {
        return true;
      }
    },
    about: {
      type: String,
      // eslint-disable-next-line func-names
      default: function () {
        return '约';
      }
    },
    unitHour: {
      type: String,
      // eslint-disable-next-line func-names
      default: function () {
        return '小时';
      }
    },
    unitMin: {
      type: String,
      // eslint-disable-next-line func-names
      default: function () {
        return '分钟';
      }
    }
  }
};
</script>

<style scoped>
.none {
  display: none;
}
</style>


<style>
.work-time {
  display: flex;
  justify-content: center;
  align-items: baseline;
}
.time-text {
  font-size: 0.5rem;
}
.time-num {
  font-size: 1.5rem;
}
</style>
