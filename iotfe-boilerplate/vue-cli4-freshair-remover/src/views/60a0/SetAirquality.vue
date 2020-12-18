<template>
  <gree-view bgColor="#F4F4F4" class="detail-page">
    <gree-header>自动模式目标设定</gree-header>
    <gree-page>
      <div class="page-main">
        <gree-radio-list :options="SetAirqualityList" :value="IDUAirQu" @change="setAirquality" />
      </div>
    </gree-page>
  </gree-view>
</template>

<script>
import { Header, Radio, RadioList } from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import { showToast } from '../../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [Header.name]: Header,
    [Radio.name]: Radio,
    [RadioList.name]: RadioList
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      SetAirqualityList: state => state.SetAirqualityList,
      IDUAirQu: state => state.dataObject.IDUAirQu,
      Pow: state => state.dataObject.Pow
    })
  },
  watch: {
    Pow(newV) {
      if (newV === 0) {
        showToast('设备已被关闭, 自动退出目标设定');
        this.$router.go(-1);
      }
    }
  },
  beforeDesotry() {
    this.setShowPopop(false);
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT',
      setShowPopop: 'SET_SHOW_POPOP'
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL'
    }),
    setAirquality(index) {
      const sendObj = {
        IDUAirQu: index.value,
        FanMod: 3
      };
      this.setDataObject(sendObj);
      this.sendCtrl(sendObj);
    }
  }
};
</script>
