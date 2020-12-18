import { mapState, mapMutations } from 'vuex';
import updateStatus from './updateStatus'; // 自定义初始化功能，可以修改
import { SET_INIT_STATUS, SET_DATA_OBJECT } from '../../store/types';

const mixin = {
  mixins: [updateStatus],
  computed: {
    ...mapState({
      lang: state => state.deviceInfo.lang
    })
  },
  watch: {
    lang: {
      handler(val) {
        if (!val) {
          return;
        }
        console.log(val);
        if (val.toLowerCase().indexOf('zh') !== -1) {
          this.$options.i18n.locale = 'zh_CN';
        } else {
          this.$options.i18n.locale = 'en';
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations({
      setInitStatus: SET_INIT_STATUS,
      setDataObject: SET_DATA_OBJECT,
    }),
    init() {
      setTimeout(() => {
        this.setInitStatus(true);
      }, 1000);
    }
  }
};

export default mixin;
