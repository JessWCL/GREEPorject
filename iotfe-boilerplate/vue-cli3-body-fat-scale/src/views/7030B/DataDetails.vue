<template>
  <gree-view>
    <gree-page
      no-navbar
      class="page-datails"
    >
      <div
        class="page-header"
        :style="{backgroundImage:'url(' + head_bg + ')'}"
      >
        <gree-header
          theme="transparent"
          :left-options="{preventGoBack: true}"
          @on-click-back="goBack"
        >
          Data Detils
          <gree-dropdown
            slot="right"
            position="is-bottom-left"
          >
            <gree-icon
              slot="trigger"
              name="more"
              size="lg"
            ></gree-icon>
            <gree-dropdown-item @click.native="moreInfo">Device Information</gree-dropdown-item>
            <gree-dropdown-item @click.native="jumpTo('Setting')">Alert Settings</gree-dropdown-item>
          </gree-dropdown>
        </gree-header>
        <div class="fat-remind">
          <span>Today 14:30</span>
          <h3>88</h3>
          <span>Scores</span>
          <span>point</span>
        </div>
      </div>
      <div class="page-main">
        <gree-list>
          <gree-list-item 
            v-for="(item,index) in dataList2" 
            :key="index"
            link 
            :title="item.name" 
            :after="item.value" 
            @click.native="DetailsExtend"></gree-list-item>
        </gree-list>
      </div>
    </gree-page>
  </gree-view>
</template>
<script>
import { Header, Icon, Dropdown, DropdownItem, List, Item } from 'gree-ui';
import { mapState, mapMutations } from 'vuex';
// import DataDatil from '../../components/DataDatil';
// import HistoricalData from '../../components/HistoricalData';
// import DataTrends from '../../components/DataTrends';
import {
  closePage,
  editDevice
} from '../../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [Header.name]: Header,
    [Icon.name]: Icon,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [List.name]: List,
    [Item.name]: Item
  },
  data() {
    return {
      current2: 1,
      dataList2: [
        { name: 'Weight 46.8kg', value: 'Too Low' },
        { name: 'Body Fat 19.9%', value: 'Normal' },
        { name: 'BMI 16.9%', value: 'Normal' },
        { name: 'Body Water 58.2%', value: 'Normal' },
        { name: 'Music Mass 53.7%', value: 'Normal' },
        { name: 'Basal Metabolism 1130', value: 'Skinny' },
        { name: 'Protein 19.7%', value: 'Skinny' }
      ]
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      devname: state => state.deviceInfo.name,
      functype: state => state.functype,
      mac: state => state.mac,
      isScene: state => state.isScene
    }),
    head_bg() {
      const bg = require('@/assets/images/bg_header.png');
      return bg;
    }
  },
  watch: {},
  mounted() {},
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT'
    }),
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
      editDevice(this.mac);
    },
    jumpTo(path) {
      this.$router.push(path);
    },
    DetailsExtend() {
      this.$router.push({ name: 'DataDetailsExtend' });
    }
  }
};
</script>
