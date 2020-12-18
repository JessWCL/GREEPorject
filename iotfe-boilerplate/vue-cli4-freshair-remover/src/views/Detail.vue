<template>
  <gree-view bgColor="#F4F4F4" class="detail-page">
    <gree-header>当前污染等级设置</gree-header>
    <gree-page>
      <div class="page-main">
        <gree-radio-list :options="PollutionList" :value="ODUViti" @change="setPollutionLevel" />
      </div>
    </gree-page>
  </gree-view>
</template>

<script>
import { Header, Radio, RadioList } from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import { closePage } from '../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [Header.name]: Header,
    [Radio.name]: Radio,
    [RadioList.name]: RadioList
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      ScrTime: state => state.dataObject.ScrTime,
      PollutionList: state => state.PollutionList,
      ODUViti: state => state.dataObject.ODUViti
    })
  },
  created() {
    this.timeMode = this.ScrTime;
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT'
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL'
    }),
    /**
     * @description 返回键
     */
    goBack() {
      closePage();
    },
    setPollutionLevel(index) {
      this.setDataObject({ ODUViti: index.value });
      this.sendCtrl({ ODUViti: index.value });
    }
  }
};
</script>
