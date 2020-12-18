import { mapState } from 'vuex';

const ERRORS_MAP = {
  estate1: {
    64: {
      code: 'H8', 
      headtitle: '故障名称：',
      title: '触摸通讯故障',
      subtitle: '解除办法：',
      text: '联系售后'
    }
  },
};

export default {
  data() {
    return {
      errors: []
    };
  },
  computed: {
    ...mapState({
      estate1: state => state.dataObject.estate1,
      JFerr: state => state.dataObject.JFerr,
      isError: state => {
        if (state.functype) {
          return 0;
        }
        return state.dataObject.estate1 + state.dataObject.JFerr;
      },
    }),
  },
  watch: {
    isError: {
      handler(val) {
        this.checkErrors(val);
      },
      immediate: true
    }
  },
  methods: {
    setErrors() {
      const estates = {
        estate1: this.estate1,
        JFerr: this.JFerr
      };
      Object.keys(estates).forEach(k => {
        if (k === 'JFerr') {
          if (this.JFerr !== 0) {
            this.errors.push({
              code: 'H1', 
              headtitle: '故障名称：',
              title: 'WIFI通讯故障',
              subtitle: '解除办法：',
              text: '联系售后'
            });
          }
        } else {
          const errorVal = estates[k];
          for (let i = 1; i <= 256; i *= 2) {
            Object.keys(ERRORS_MAP[k]).forEach(err => {
              if ((i & errorVal) === Number(err)) {
                this.errors.push(ERRORS_MAP[k][err]);
              }
            });
          }
        }
      });
    },
    checkErrors(val) {
      this.errors.splice(0, this.errors.length);
      this.setErrors();
    }
  }
};
