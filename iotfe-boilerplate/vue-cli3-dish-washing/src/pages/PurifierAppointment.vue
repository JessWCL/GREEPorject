<template>
  <div class="purifier-container">
    <SafeAreaInsetTopComponent :top-color="barColor" />
    <!-- header start -->
    <!--导航栏-->
    <GreeHeader
      @handleLeftClick="handleLeftClick"
      @handleRightClick="handleRightClick">
      <template slot="left">
        <img
          src="../assets/images/return_black.png"
          alt="back" >
      </template>
      <template slot="center">
        <span>预约编辑</span>
      </template>
      <template slot="right">
        <div>保存</div>
      <!-- <img
        src="../assets/images/btnInfo.png"
        alt="more" > -->
      </template>
    </GreeHeader>
    <!-- header end -->
    <div class="purifier-tips">保洁有防潮防霉除异味功能，在运行烘干后开启</div>
    <mt-picker
      class="purifierAppointment"
      :item-height="130"
      :visible-item-count="3"
      :slots="slots"
      @change="onValuesChange"/>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { Picker } from 'mint-ui';
import GreeHeader from '../components/GreeHeader';
import SafeAreaInsetTopComponent from '../components/SafeAreaInsetTopComponent';

export default {
  name: 'PurifierAppointment',
  components: {
    GreeHeader,
    Picker,
    SafeAreaInsetTopComponent,
  },
  data() {
    return {
      purifiertimes: [6, 12, 18, 1, 2, 3, 4],
      slots: [
        {
          // flex: 1,
          values: [6, 12, 18, 1, 2, 3, 4],
          className: 'slot1',
          textAlign: 'center'
        },
        {
          divider: true,
          content: '时',
          className: 'slot2'
        },
      ],
      PurifierTimeCache: 1,
    };
  },
  computed: {
    ...mapState({
      barColor: state => state.barColor,
    }),
  },
  methods: {
    ...mapMutations(['setBtnStatus']),
    ...mapMutations(['setPurifier']),
    ...mapMutations(['setPurifierTime']),
    // ...mapMutations(['setPurifierTimeTips']),
    ...mapMutations(['setIsPurifierAppointment']),
    handleLeftClick() {
      // eslint-disable-next-line no-console
      console.log('handleLeftClick');
      this.$emit('closePopup');
    },
    handleRightClick() {
      // eslint-disable-next-line no-console
      console.log('handleRightClick');
      this.setPurifier({ value: 1 });
      const _index = this.purifiertimes.indexOf(this.PurifierTimeCache);
      this.setPurifierTime({ value: _index + 1 });
      // this.setPurifierTimeTips();
      this.setIsPurifierAppointment({ value: false });
      this.setBtnStatus({ id: this.$store.state.FUN_BTNS.PURIFIER, isActive: true });
    },
    onValuesChange(picker, values) {
      if (values[0] < 6) {
        this.slots[1].content = '天';
      } else {
        this.slots[1].content = '时';
      }
      this.PurifierTimeCache = values[0];
    }
  }
};
</script>

<style>
.purifier-container {
  position: relative;
  background: #f4f4f4;
  height: 100%;
}

.purifier-tips {
  color: #989898;
  font-size: 1.5rem;
  padding: 0.65rem 1rem;
}

.picker.purifierAppointment {
  background: #ffffff;
}
.picker.purifierAppointment .picker-item {
  font-family: appleUltralight;
  font-size: 7rem;
  color: #dadada;
  /* 渐变 */
  background-color: #ffffff;
  background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#ffffff), to(#dadada));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.picker.purifierAppointment .picker-item.picker-selected {
  color: #5eb2e8;
  /* 渐变 */
  -webkit-text-fill-color: #5eb2e8;
}
.picker.purifierAppointment .picker-slot.picker-slot-divider {
  padding-top: 3rem;
  font-size: 2rem;
  color: #5eb2e8;
}
</style>
