<template>
  <div class="v-loading-container" v-show="show">
    <div class="item">
      <img src="../../public/images/loading2.gif">
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .v-loading-container {
    width: 100vw;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9999;
    .item {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      padding: 20px 20px;
      display: inline-block;
      background-color: rgba(0, 0, 0, 0.65);
      img {
        width: 128px;
        height: 128px;
      }
    }
  }
</style>
<script>
import { mapState } from 'vuex';

const UA = window.navigator.userAgent.toLowerCase();
const isAndroid = (UA && UA.indexOf('android') > 0);
export default {
  name: 'Loading',
  computed: {
    ...mapState({
      show: state => state.showLoading && (window.location.href.indexOf('Appointment') !== -1)
    })
  }
};
</script>
