import { mapState } from 'vuex';

const ERRORS_MAP = {
  estate2: {
    32: {
      code: 'E3', 
      headtitle: '故障名称：',
      title: '感温包故障',
      subtitle: '解除办法：',
      text: '联系售后'
    }
  },
  JFerr: {
    1: {
      code: 'H1', 
      headtitle: '故障名称：',
      title: 'WIFI通讯故障',
      subtitle: '解除办法：',
      text: '联系售后'
    }
  }
};

export default {
  data() {
    return {
      errors: []
    };
  },
  computed: {
    ...mapState({
      estate2: state => state.dataObject.estate2,
      JFerr: state => state.dataObject.JFerr,
      isError: state => state.dataObject.estate2 + state.dataObject.JFerr,
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
        estate2: this.estate2,
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
