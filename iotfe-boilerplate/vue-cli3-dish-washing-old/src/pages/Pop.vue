<template>
  <div>
    <transition name="fade">
      <div
        class="mask"
        v-show="isShowPop"
        @click="handleClickMask" />
    </transition>
    <PopContentComponent :is-show="isShowPop" />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import PopContentComponent from './PopContentComponent';

export default {
  name: 'Pop',
  components: {
    PopContentComponent,
  },
  computed: mapState({
    isShowPop: state => state.device.isShowPop,
  }),
  methods: {
    ...mapMutations('device', ['setIsShowPop']),
    ...mapActions('device', ['parseBarColor']),

    handleClickMask() {
      this.setIsShowPop(false);
      setTimeout(() => {
        this.parseBarColor();
      }, 300);
    }
  },
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all .3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.mask {
  z-index: 1001;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
}
</style>

