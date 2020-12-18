<template>
  <div
    v-show="warningItemList.length >= 1"
    class="err-tips-container">
    <div class="err-tips">
      <div
        class="handle-wrapper"
        @click="handleShowErrorTips">
        <div class="img-box">
          <img
            class="img"
            src="../assets/images/iconError.png">
        </div>
        <span v-if="warningItemList.length === 1">{{ warningItemList[0].reason }}</span>
        <span v-if="warningItemList.length > 1">故障</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  name: 'ErrorTips',
  computed: mapState({
    warningItemList: state => state.device.warningItemList,
  }),
  methods: {
    ...mapActions('device', ['parseBarColor']),
    ...mapMutations('device', ['setIsShowWaringTipsDetails']),
    handleShowErrorTips() {
      // this.setIsShowWaringTipsDetails({ value: true });
      // this.$router.push('/errorTipsDetail');
      this.$router.push('/error');
      this.parseBarColor();
    },
  },
};
</script>

<style scoped>
.err-tips-container {
  background: rgba(0, 0, 0, 0.08);
}
.err-tips {
  display: flex;
  align-items: center;
  justify-items: center;
  margin-left: 1.8rem;
  height: 3rem;
  line-height: 3rem;
  font-size: 1.2rem;
  color: #ffffff;
}
.err-tips .handle-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;
  color: #FFFF;
}
.err-tips .img-box {
  margin-right: 0.5rem;
  height: 1.6rem;
  width: 1.6rem;
}
.err-tips .img-box .img {
  display: flex;
  max-height: 100%;
  max-width: 100%;
}
</style>

