<template>
  <gree-notice-bar
    v-show="isShow && warningMsg.length > 0"
    type="activity"
    scrollable
    @click.native="handleClickMachStat"
  >
    <img
      slot="left"
      :src="icon"
    />
    {{ warningMsg }}
  </gree-notice-bar>
</template>

<script>
import { mapState } from 'vuex';
import { NoticeBar } from 'gree-ui';

export default {
  components: {
    [NoticeBar.name]: NoticeBar,
  },

  data() {
    return {
      icon: require('@/assets/images/iconTips.png'),
    };
  },

  computed: {
    ...mapState({
      estate1: state => state.DataObject.estate1,
      estate2: state => state.DataObject.estate2,
    }),

    isShow() {
      const { isWarning } = this;
      if (isWarning) {
        return true;
      }
      return false;
    },

    isWarning() {
      const { estate2 } = this;
      if (estate2 !== 0) {
        return true;
      }
      return false;
    },

    warningMsg() {
      const { estate2 } = this;
      const ret = [];
      if (estate2 !== 0) {
        if (estate2 & (1 << 3)) ret.push(this.$language('error.estate_msg3'));
        if (estate2 & (1 << 2)) ret.push(this.$language('error.estate_msg2'));
        if (estate2 & (1 << 0)) ret.push(this.$language('error.estate_msg0'));
        if (ret.length === 0) {
          console.error('estate3非空，未匹配相关文案。');
        }
      }
      return ret.join('。');
    }
  },

  methods: {
    handleClickMachStat() {
      // this.$router.push('/Error');
    }
  }
};
</script>

<style lang="scss" scoped>
.gree-notice-bar.activity {
  transform: translateZ(0);
  background: none;
  color: #404657;
}
</style>
