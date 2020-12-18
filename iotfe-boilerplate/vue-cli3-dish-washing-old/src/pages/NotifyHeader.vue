<template>
  <div class="header-container">
    <div
      class="btnBack"
      @click="handleBack">
      <img
        src="../assets/images/headerBtnBack.png"
        alt="back" >
    </div>
  </div>
</template>


<script>
import { mapActions } from 'vuex';

export default {
  name: 'NotifyHeader',
  methods: {
    ...mapActions('device', ['handleBack']),
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
  width: 2.5rem;
  height: 2.5rem;
  text-align: center;
}
.btnBack:active {
  background: rgba(0, 0, 0, 0.1);
}

.btnBack img {
  height: 1.5rem;
  margin-top: 0.5rem;
}
</style>
