import { mapState, mapActions } from 'vuex';

const _mixin = {
  computed: {
    ...mapState({
      estate1: state => state.DataObject.estate1,
      estate2: state => state.DataObject.estate2,
      JFerr: state => state.DataObject.JFerr,
      errItemList: state => state.errItemList,
      warningItemList: state => state.warningItemList,
    }),
  },
  watch: {
    estate1() {
      if (!this.$store.state.isNotify) {
        this.$store.commit('updateUIForErrorCode');
      }
    },
    estate2() {
      if (!this.$store.state.isNotify) {
        this.$store.commit('updateUIForErrorCode');
      }
    },
    JFerr() {
      if (!this.$store.state.isNotify) {
        this.$store.commit('updateUIForErrorCode');
      }
    },
    errItemList(newV, oldV) {
      const haveError = newV.length > 0 && newV.length !== oldV.length;
      const noError = newV.length === 0 && newV.length !== oldV.length;
      if (haveError) {
        const needsUpdate = this.$route.path !== '/error';
        if (needsUpdate) {
          this.$router.push('/error');
        }
      } else if (noError) {
        this.$router.back();
      }
    },
  },
  created() {
  },
  methods: {
    ...mapActions(['initApp']),

    init() {
      console.log('==== cordova init() ====');
      this.initApp();
    },

  },
};

export default _mixin;
