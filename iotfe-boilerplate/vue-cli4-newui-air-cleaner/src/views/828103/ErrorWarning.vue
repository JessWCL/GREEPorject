<template>
  <error-warning-component
    :type="errorList.type"
    :errorList="errorList.Err"
    :warningList="errorList.Not"
  />
</template>

<script>
import { mapState } from 'vuex';
import error from '../../mixins/utils/config/error.js';
import { changeBarColor } from '../../../../static/lib/PluginInterface.promise';
export default {
  mixins: [error],
  data() {
    return { // error: 故障组件 warning: 提醒组件
    };
  },
  computed: {
    ...mapState({
      MidType: state => state.dataObject.MidType,
      estate: state => state.dataObject.estate,
      estate1: state => state.dataObject.estate1,
      JFerr: state => state.dataObject.JFerr
    }),
  },
  mounted(){
    changeBarColor("#ffffff");
  },
  methods: {
  }
};
</script>
<style>
</style>