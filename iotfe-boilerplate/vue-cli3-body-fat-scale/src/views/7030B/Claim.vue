<template>
  <gree-view>
    <gree-header>{{ $language('setting.title') }}</gree-header>
    <gree-page class="page-setting">
      <gree-list>
        <gree-list-item 
          :title="`${weight_fnl(item.weight/1000) + unit}`" 
          v-for="(item,index) in list" 
          :key="item.data_id">
          <span 
            slot="after" 
            class="confirm" 
            @click="confirem(item.data_id,index)">{{ item.tips }}</span>
        </gree-list-item>
      </gree-list>
    </gree-page>
  </gree-view>
</template>

<script>
import dayjs from 'dayjs';
import { mapState } from 'vuex';
import { View, Page, Header, List, Item, Toast } from 'gree-ui';
import {
  tuyaWeightHistory,
  tuyaWeightCheckData
} from '../../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [View.name]: View,
    [Page.name]: Page,
    [Header.name]: Header,
    [List.name]: List,
    [Item.name]: Item
  },
  data() {
    return {
      list: []
    };
  },
  computed: {
    ...mapState({
      mac: state => state.mac,
      userId: state => state.dataObject.user_id,
      pageNo: state => state.pageNo,
      pageSize: state => state.pageSize,
      unit: state => state.dataObject.unit
    })
  },
  mounted() {
    this.getDataList();
  },

  methods: {
    confirem(id, index) {
      // 认领单个数据
      tuyaWeightCheckData(this.mac, this.userId, id).then(res => {
        console.log('认领单个数据返回值', res, typeof res);
        if (JSON.parse(res).code === 200) {
          this.list[index].tips = 'Claimed';
          this.$set(this.list, index, this.list[index]);
        } else {
          Toast.failed(JSON.parse(res).msg, 1500, true, true);
        }
      });
    },
    // 获取未认领数据列表
    getDataList() {
      const pageNo = this.pageNo;
      const pageSize = this.pageSize;
      const startTime = dayjs('2000-01-01 00:00:00').valueOf();
      const endTime = dayjs().valueOf();
      const userId = 0;
      const json = JSON.stringify({
        pageNo,
        pageSize,
        startTime,
        endTime,
        userId
      });
      console.log('查询未认领数据传的参数', json);
      tuyaWeightHistory(this.mac, json).then(res => {
        this.list = JSON.parse(res).result.records;
        this.list.forEach((item, index) => {
          this.list[index].tips = 'claim';
        });
        console.log('未认领数据列表数据:', this.list);
      });
    },
    weight_fnl(val) {
      let value = val;
      switch (this.unit) {
        case 'kg':
          value = val;
          break;
        case 'lb':
          value = (val * 2.20462262185).toFixed(2);
          break;
        case 'st':
          value = (val * 0.157473044418).toFixed(2);
          break;
        default:
          break;
      }
      return value;
    }
  }
};
</script>
