<template>
  <error-warning-component
    :type="type"
    :errorList="errorList"
    :warningList="warningList"
    :left-options="{ preventGoBack: true }"
    @on-click-back="clickBack"
  />
</template>

<script>
import { closePage } from '../../../static/lib/PluginInterface.promise';
import errList from '../api/error';
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'ErrorWarning',
  components: {},
  data() {
    return {
      type: 'error', // error: 故障组件 warning: 提醒组件
      errorList: [], // { code: 'E3', title: '感温包故障', text: '请通知售后人员维修' }
      warningList: [] // { title: '缺盐提示', text: '请添加洗碗机专用盐' }
    };
  },
  watch: {
    type(newV, oldV) {
      console.log(newV, oldV);
    },

    GetEr: {
      immediate: true,
      handler(newV, oldV) {
        if (newV === 0 && this.ErrType === 0) {
          this.$router.push({
            path: '/'
          });
        } else if (newV && this.ErrType) {
          this.getErrlist();
        }
      }
    },

    ErrType: {
      immediate: true,
      handler(newV, oloV) {
        this.errorList = [];
        if (newV === 0 && this.GetEr === 0) {
          this.$router.push({
            path: '/'
          });
        } else if (newV) {
          this.getErrlist();
        }
      }
    }
  },
  computed: {
    ...mapState({
      GetEr: state => state.dataObject.GetEr,
      ErrType: state => state.dataObject.ErrType
    })
  },
  methods: {
    clickBack() {
      if (this.ErrType === 0 && this.GetEr === 0) {
        this.$router.go(-1);
      } else {
        closePage();
      }
    },

    getErrlist() {
      const errNumberList = this.ErrType.toString(2)
        .split('')
        .reverse();
      errNumberList.forEach((element, index) => {
        if (element === '1') {
          console.log(errList[index]);
          this.errorList.push(errList[index]);
        }
      });
    }
  }
};
</script>
