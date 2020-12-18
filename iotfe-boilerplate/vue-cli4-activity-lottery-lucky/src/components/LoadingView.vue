<template>
  <gree-activity-indicator type="spinner" :size="40" v-if="!loaded" />
</template>

<script>
import { ActivityIndicator } from 'gree-ui';

export default {
  components: {
    [ActivityIndicator.name]: ActivityIndicator
  },
  props: {
    loaded: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss" scoped>
.gree-activity-indicator {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
