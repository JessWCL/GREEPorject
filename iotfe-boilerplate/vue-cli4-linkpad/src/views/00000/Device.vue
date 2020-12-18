<template>
  <gree-view :bg-color="statusBarColor" class="page-device">
    <gree-header>
      设备
      <a slot="right" @click="onEdit">{{ !isEditing ? '编辑' : '完成' }}</a>
    </gree-header>
    <gree-page>
      <div class="page-main">
        <gree-tab-bar v-model="currentTab" :items="tabItems" />
        <gree-block-title>{{ $language('device.blockTitle') }}</gree-block-title>
        <gree-list v-if="!isEditing">
          <gree-list-item :title="item.title" :text="item.position" v-for="(item, index) in devices" :key="index" />
        </gree-list>
        <gree-check-list :options="devices" v-model="device" :is-slot-scope="true" v-else>
          <template slot-scope="{ option }">
            <h3>{{ option.title }}</h3>
            <span>{{ option.position }}</span>
          </template>
        </gree-check-list>
      </div>
      <div v-show="false">{{ ColorChange }}</div>
    </gree-page>
  </gree-view>
</template>

<script>
import { Header, BlockTitle, TabBar, List, Item, CheckList } from 'gree-ui';
import { mapState, mapMutations } from 'vuex';
import { changeBarColor } from '../../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [Header.name]: Header,
    [BlockTitle.name]: BlockTitle,
    [TabBar.name]: TabBar,
    [List.name]: List,
    [Item.name]: Item,
    [CheckList.name]: CheckList
  },
  data() {
    return {
      statusBarColor: '#FFFFFF',
      isEditing: false,
      currentTab: 1,
      tabItems: [
        { name: 1, label: '全部 (6/9)' },
        { name: 2, label: '客厅 (4/4)' },
        { name: 3, label: '主卧 (1/1)' },
        { name: 4, label: '阳台 (1/1)' },
        { name: 5, label: '厨房 (1/1)' }
      ],
      device: [],
      devices: [
        {
          value: '0',
          title: '空调',
          position: '客厅'
        },
        {
          value: '1',
          title: '温湿度传感器',
          position: '卧室'
        },
        {
          value: '2',
          title: '窗帘',
          position: '客厅'
        },
        {
          value: '3',
          title: '灯',
          position: '客厅'
        },
        {
          value: '4',
          title: '烟雾传感器',
          position: '客厅'
        },
        {
          value: '5',
          title: '一氧化碳报警器',
          position: '阳台'
        }
      ]
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      devname: state => state.deviceInfo.name,
      functype: state => state.functype,
      mac: state => state.mac
    }),
    /**
     * @description 主页面下更新状态栏颜色
     */
    ColorChange() {
      let color = false;
      if (this.$route.name === 'Settings') {
        color = this.statusBarColor;
      }
      color ? changeBarColor(color) : '';
      return color;
    }
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT'
    }),
    onEdit() {
      this.isEditing = !this.isEditing;
    }
  }
};
</script>
