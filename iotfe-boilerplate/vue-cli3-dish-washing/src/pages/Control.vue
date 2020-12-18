<template>
  <div class="control-contianer">
    <SafeAreaInsetTopComponent :top-color="barColor" />
    <GreePow />
    <GreeMain />
    <!-- 状态栏 -->
    <!-- <GreeStatus /> -->
    <Pop />
    <GreeContent />
    <!-- <Error /> -->
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import Pop from './Pop';
import Error from './Error';
import NewError from './NewError';
import GreePow from './GreePow';
import GreeMain from './Main';
import GreeStatus from './GreeStatus';
import GreeContent from './Content';
import GreeAppointment from './Appointment';
import SafeAreaInsetTopComponent from '../components/SafeAreaInsetTopComponent';
import GreeHeader from './Header';

export default {
  name: 'Control',
  components: {
    GreePow,
    GreeMain,
    GreeStatus,
    Pop,
    Error,
    NewError,
    GreeContent,
    GreeAppointment,
    SafeAreaInsetTopComponent,
    GreeHeader
  },

  computed: {
    ...mapState({
      deviceState: state => state.deviceState,
      barColor: state => state.barColor,
    }),
  },

  watch: {
    deviceState(newV, oldV) {
      // 判断设备是否离线
      if (newV === -1) {
        console.log('设备离线了~'); // eslint-disable-line
        // eslint-disable-next-line no-undef
        vm.$router.push('/Offline');
      } else if ((newV === 2 || newV === 3) && oldV === -1) {
        console.log('设备在线了~'); // eslint-disable-line
        // eslint-disable-next-line no-undef
        vm.$router.push('/');
      }
    },
  },
};
</script>

<style scoped>
.control-contianer {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
}
</style>
