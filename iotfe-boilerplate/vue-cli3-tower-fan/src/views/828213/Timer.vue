<template>
  <gree-view bg-color="#f4f4f4">
    <gree-header>
      定时
      <a
        slot="right"
        @click="save"
      >完成</a>
    </gree-header>
    <gree-page
      class="page-timer"
    >
      <div class="content">
        <div class="picker-container">
          <gree-picker
            class="time-picker"
            ref="timePicker"
            :data="pickerData"
            :cols="1"
            :line-height="90"
            is-view
            is-cascade
            :multi-line="false"
            :default-value="defaultTimer"
          ></gree-picker>
          <span class="label-hour">小时后</span>
        </div>
        <div class="type-bar">
          <span>执行类型</span>
          <div class="tag-group">
            <div 
              class="tag"
              v-show="!Pow"
              :class="{active: !Pow ? true : false}"
            >开</div>
            <div 
              class="tag"
              v-show="Pow"
              :class="{active: Pow ? true : false}"
            >关</div>
          </div>
        </div>
        <gree-action-bar :actions="actions"></gree-action-bar>
      </div>
    </gree-page>
  </gree-view>
</template>

<script>
import { Header, Picker, ActionBar } from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import { timerData, getTimerIndex} from '../../mixins/config/828213/timer';

export default {
  components: {
    [Header.name]: Header,
    [Picker.name]: Picker,
    [ActionBar.name]: ActionBar,
  },
  data() {
    return {
      pickerData: timerData,
      defaultTimer: [0],
      actions: [
        {
          text: '删除',
          onClick: this.deleteTimer
        }
      ]
    };
  },
  computed: {
    ...mapState({
      Pow: state => state.dataObject.Pow,
      TmrOn: state => state.dataObject.TmrOn,
      TmrHour: state => state.dataObject.TmrHour,
      TmrMin: state => state.dataObject.TmrMin
    }),
  },
  watch: {
    TmrHour: {
      handler(hour) {
        console.log('hour', hour);
        this.setTimePicker(hour, this.TmrMin);
      },
      immediate: true
    },
    TmrMin: {
      handler(min) {
        console.log('min', min);
        this.setTimePicker(this.TmrHour, min);
      },
      immediate: true
    },
    Pow(val) {
      this.$router.push('/');
    }
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT',
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL'
    }),
    save() {
      // console.log(this.$refs.timePicker.getColumnValues());
      const selectedVal = this.$refs.timePicker.getColumnValue(0).value;
      const hour = parseInt(selectedVal / 1);
      const minute = selectedVal % 1 === 0.5 ? 30 : 0;
      console.log(hour, minute);
      const cmd = {
        TmrOn: 1,
        TmrAction: this.Pow ? 0 : 1,
        TmrHour: hour,
        TmrMin: minute
      };
      this.setDataObject(cmd);
      this.sendCtrl(cmd);
      this.$router.push('/');
    },
    deleteTimer() {
      const cmd = {
        TmrOn: 0,
        TmrHour: 0,
        TmrMin: 0
      };
      this.setDataObject(cmd);
      this.sendCtrl(cmd);
      this.$router.push('/');
    },
    setTimePicker(hour, min) {
      if (this.TmrOn) {
        const totalMinutes = hour * 60 + min;
        const timerIndex = getTimerIndex(totalMinutes);
        this.defaultTimer = [timerIndex];
        if (this.$refs.timePicker) {
          this.$refs.timePicker.refresh();
        }
      }
    }
  }
};
</script>
<style lang="scss">
.label-hour {
  left: 680px !important;
}
</style>
