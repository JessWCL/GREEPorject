<template>
  <div class="header-container">
    <div
      class="btnBack"
      @click="handleBack">
      <img
        src="../assets/images/headerBtnBack.png"
        alt="back" >
    </div>
    <div class="device-name ellipsis h3 mb-0">
      <span>{{ $t(deviceName) }}</span>
    </div>
    <div
      @click="handleRightClick"
      class="titleMore">
      <img
        v-if="!functype"
        src="../assets/images/btnInfo.png"
        alt="more" >
      <span v-if="functype">保存</span>
    </div>
  </div>
</template>


<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'GreeHeader',

  computed: mapState({
    functype: state => state.functype,
    deviceName: state => state.deviceInfo.name,
  }),
  methods: {
    ...mapActions(['editDevice']),
    ...mapActions(['handleBack']),
    ...mapActions(['getCCcmd']),
    handleRightClick() {
      if (this.functype) {
        this.getCCcmd();
      } else {
        this.editDevice();
      }
    }
  },
};
</script>

<style scoped>
.header-container {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
}
.btnBack {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  text-align: center;
}
.btnBack:active {
  background: rgba(0, 0, 0, 0.1);
}

.btnBack img {
  height: 1.5rem;
}

.device-name {
  margin: 0 auto;
  width: 80%;
  height: 3rem;
  line-height: 3rem;
  /* font-size: 1.7rem; */
  text-align: center;
  color: #fff;
}

.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}


.device-name img {
  margin-left: 0.5rem;
  height: 1.5rem;
  width: 1.5rem;
}

.titleMore {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: #ffffff;
  text-align: center;
}
.titleMore:active {
  background: rgba(0, 0, 0, 0.1);
}

.titleMore img {
  height: 1.4rem;
}
.titleMore span {
  padding: 0 1rem;
}
</style>
