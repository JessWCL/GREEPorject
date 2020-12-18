<template>
  <gree-view
    bg-color="#ffffff"
    class="view-purifier"
  >
    <gree-header
      :title="deviceName"
      theme
      :left-options="{ showBack: true, preventGoBack: false }"
      :right-options="{ showMore: false }"
    >
      <a
        slot="right"
        @click="handleSave"
      >保存</a>
    </gree-header>
    <gree-page :no-navbar="false">
      <!-- <gree-block class="time-range">保洁有防潮防霉除异味功能，在运行烘干后开启</gree-block> -->
      <gree-picker
        class="only-hour"
        ref="picker"
        :data="pickerData"
        @change="onPickerConfirm"
        :cols="1"
        :line-height="100"
        :default-index="defaultIndex"
        is-view
        :multi-line="false"
      ></gree-picker>
    </gree-page>
  </gree-view>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { Block, Page, View, Header, Picker } from 'gree-ui';
import * as types from '@/store/types';
import { NORMAL_MOD_PURIFIER_LIST } from '../../api/constant';

const data = [];
NORMAL_MOD_PURIFIER_LIST.forEach(item => {
  data.push({
    text: `${item}`,
    value: item
  });
});

export default {
  components: {
    [Block.name]: Block,
    [Header.name]: Header,
    [Page.name]: Page,
    [Picker.name]: Picker,
    [View.name]: View
  },
  data() {
    return {
      pickerData: [data],
      pickerValue: 1
    };
  },
  computed: {
    ...mapState({
      deviceName: state => state.deviceInfo.name,
      dataObject: state => state.DataObject,
      PurifierTime: state => state.DataObject.PurifierTime
    }),

    defaultIndex() {
      // const { PurifierTime } = this;
      return [0];
    },
  },
  methods: {
    ...mapMutations({
      setDataObject: types.SET_DATA_OBJECT
    }),
    ...mapActions({
      sendCtrl: types.SEND_CTRL
    }),

    handleSave() {
      const pickerValue = this.$refs.picker.getColumnValues()[0].value;
      this.pickerValue = pickerValue;
      const PurifierTime = pickerValue;
      const Purifier = 1;
      this.setDataObject({ Purifier, PurifierTime });
      this.sendCtrl({ Purifier, PurifierTime });
      this.$router.back();
    },

    onPickerConfirm(columnIndex, itemIndex, value) {
      if (value) {
        const Purifier = value.value;
        this.pickerValue = Purifier;
      }
    }
  }
};
</script>

<style lang='scss'>
</style>
