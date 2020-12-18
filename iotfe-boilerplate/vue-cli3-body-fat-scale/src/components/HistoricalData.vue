<template>
  <div class="main-historical"> 
    <gree-list>
      <gree-list-item 
        @click.native="goClaim"
        title="You have unchecked Data" 
        link></gree-list-item>
    </gree-list>
    <gree-collapse  
      v-model="activeNames" 
    >
      <leftslip
        ref="slipItem"
        @oneDelete="oneDel($event,item.data_id)"
        v-model="activeNames" 
        v-for="(item,index) in historyDate" 
        :key="index"  
      >
        <gree-collapse-item 
          slot="slip-main"
          :title="item.create_time" 
          :name="index"
        >
          <gree-block 
            strong 
            no-hairlines>
            <gree-timeline>
              <gree-timeline-item color="green">
                <span>Weigh: {{ item.weight/1000 }}kg</span>  
              </gree-timeline-item>
              <gree-timeline-item color="red">
                <span> Body Fat: {{ item.body_r }}</span>
              </gree-timeline-item>
            </gree-timeline>
          </gree-block>
        </gree-collapse-item>
        <div 
          slot="slipbtns" 
          class="slipbtns">
          <a 
            href="javascript:;"
            @click="oneDel(index,item.data_id)">删除</a>
        </div>
      </leftslip>
    </gree-collapse>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import {
  List,
  Item,
  Block,
  Timeline,
  TimelineItem,
  Collapse,
  CollapseItem
} from 'gree-ui';
import { mapState, mapActions } from 'vuex';
import leftslip from '../components/leftslip';
import {
  tuyaWeightHistory,
  tuyaWeightHistorySingleDelete
} from '../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [List.name]: List,
    [Item.name]: Item,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Block.name]: Block,
    [Timeline.name]: Timeline,
    [TimelineItem.name]: TimelineItem,
    leftslip
  },
  data() {
    return {
      dataList2: [{ name: 'Today' }, { name: 'Yest' }],
      activeNames: ['1'],
      historyDate: []
    };
  },
  computed: {
    ...mapState({
      pageNo: state => state.pageNo,
      pageSize: state => state.pageSize,
      userid: state => state.dataObject.user_id,
      mac: state => state.mac
    })
  },
  watch: {
    userid: {
      handler(newVal) {
        this.getHistoryMessage(newVal);
      }
    }
  },
  mounted() {
    this.getHistoryMessage(this.userid);
  },
  methods: {
    goClaim() {
      this.$router.push({ name: 'Claim' });
    },
    async getHistoryMessage(Id) {
      const pageNo = this.pageNo;
      const pageSize = this.pageSize;
      const startTime = dayjs('2000-01-01 00:00:00').valueOf();
      const endTime = dayjs().valueOf();
      const userId = Id;
      const json = JSON.stringify({
        pageNo,
        pageSize,
        startTime,
        endTime,
        userId
      });
      console.log('查询某人数据入参', json);
      await tuyaWeightHistory(this.mac, json).then(res => {
        console.log('某人历史数据获取返回值', res);
        // eslint-disable-next-line no-prototype-builtins
        if (JSON.parse(res).result.hasOwnProperty('records')) {
          this.historyDate = JSON.parse(res).result.records;
          this.historyDate.forEach(item => {
            // eslint-disable-next-line no-param-reassign
            item.create_time = dayjs(item.create_time).format(
              'YYYY-MM-DD HH:mm:ss'
            );
          });
        } else {
          this.historyDate = [];
        }
      });
    },
    delSlipItem() {},
    oneDel(index, id) {
      this.$refs.slipItem[index].sliderEle.remove();
      tuyaWeightHistorySingleDelete(this.mac, id).then(res => {
        console.log('删除单个体重返回值', res);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
