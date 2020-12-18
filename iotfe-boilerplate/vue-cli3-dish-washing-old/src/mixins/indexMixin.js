import { mapState, mapActions } from 'vuex';

const _mixin = {
  computed: {
    ...mapState({
      estate1: state => state.device.DataObject.estate1,
      estate2: state => state.device.DataObject.estate2,
      JFerr: state => state.device.DataObject.JFerr,
      errItemList: state => state.device.errItemList,
      warningItemList: state => state.device.warningItemList,
    }),
  },
  watch: {
    estate1() {
      if (!this.$store.state.device.isNotify) {
        this.$store.commit('device/updateUIForErrorCode');
      }
    },
    estate2() {
      if (!this.$store.state.device.isNotify) {
        this.$store.commit('device/updateUIForErrorCode');
      }
    },
    JFerr() {
      if (!this.$store.state.device.isNotify) {
        this.$store.commit('device/updateUIForErrorCode');
      }
    },
    errItemList(newV, oldV) {
      const haveError = newV.length > 0 && newV.length !== oldV.length;
      const noError = newV.length === 0 && newV.length !== oldV.length;
      if (haveError) {
        const needsUpdate = this.$route.path !== '/error';
        if (needsUpdate) {
          this.$router.push('/error');
          this.parseBarColor();
        }
      } else if (noError) {
        this.$router.back();
        this.parseBarColor();
      }
    },
  },
  created() {
  },
  methods: {
    ...mapActions('device', ['initApp']),

    init() {
      console.log('==== cordova init() ====');
      this.initApp();
    },

  },
};

export default _mixin;
