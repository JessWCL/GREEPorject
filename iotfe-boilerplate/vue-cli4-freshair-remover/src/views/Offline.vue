<template>
  <offline-component title="新风净化机" />
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Offline',
  computed: {
    ...mapState({
      isOffline: state => state.deviceInfo.deviceState
    })
  },

  watch: {
    // isOffline(newV) {
    //   if (newV === 2) {
    //     this.$router.push({ path: '/' });
    //   }
    // }
  }
};
</script>
