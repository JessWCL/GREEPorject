import { mapState } from 'vuex';
import updateStatus from './updateStatus'; // 自定义初始化功能，可以修改

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
        let lang = val.toLowerCase();
        if (lang.indexOf('zh') !== -1) {
          if (lang.indexOf('tw') !== -1 || lang.indexOf('hk') !== -1) {
            this.$options.i18n.locale = 'hant';
          } else {
            this.$options.i18n.locale = 'zh_CN';
          }
        } else if (lang.indexOf('hant') !== -1) {
          this.$options.i18n.locale = 'hant';
        } else {
          this.$options.i18n.locale = 'en';
        }
      },
      immediate: true
    }
  },
};

export default mixin;
