<template>
  <gree-view bg-color="#1d59aa" class="view-appointment">
    <gree-header
      title="预约"
      :left-options="{ preventGoBack: false }"
      @on-click-back="goBack"
      :right-options="{ showMore: true }"
      @on-click-more="moreInfo"
    />
    <gree-page>
      <div class="picker-appointment-container">
        <gree-picker
          class="picker-appointment-time"
          ref="picker"
          is-view
          is-cascade
          :multi-line="false"
          :cols="2"
          :line-height="65"
          :default-index="pickerDefaultIndex"
          :data="pickerData"
          @confirm="onPickerConfirm()"
          title="自定义标题"
          ok-text="确认"
          cancel-text="取消"
        ></gree-picker>
        <div class="tips">完成烹饪</div>
      </div>
      <gree-list>
        <gree-list-item link title="模式" text="精煮饭" media-item></gree-list-item>
        <gree-list-item link title="烹饪设置" text="短粒米 适中" media-item></gree-list-item>
      </gree-list>
    </gree-page>
  </gree-view>
</template>

<script>
import { mapState } from 'vuex';
import { View, Page, Header, Picker, List, Item } from 'gree-ui';
import oneDayTimeData from '../../api/oneDayTimeData';

export default {
  components: {
    [View.name]: View,
    [Page.name]: Page,
    [Header.name]: Header,
    [Picker.name]: Picker,
    [List.name]: List,
    [Item.name]: Item
  },
  data() {
    return {
      pickerData: oneDayTimeData,
      pickerText: '查看',
      isPickerShow: true,
      pickerDefaultIndex: [1, 0]
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      devname: state => state.deviceInfo.name,
      functype: state => state.functype,
      mac: state => state.mac
    })
  },
  methods: {
    /**
     * @description 返回键
     */
    goBack() {
      closePage();
    },
    /**
     * @description 编辑设备名称
     */
    moreInfo() {
      Toast.info('跳转编辑界面');
    },

    onPickerConfirm() {}
  }
};
</script>

<style lang="scss"></style>
