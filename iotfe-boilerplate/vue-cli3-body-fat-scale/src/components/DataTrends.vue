<template>
  <div class="trend-main">
    <gree-tab-bar
      class="custom-tab-bar"
      v-model="current"
      :items="items"
      :has-ink="false"
      @change="onChangeTabBar"
    ></gree-tab-bar>
    <gree-list>
      <gree-list-item title="Weight Trends"></gree-list-item>
    </gree-list>
    <gree-block>
      <div class="trend-container">
        <div 
          id="myChartId" 
          class="trend-echert"></div>
      </div>
    </gree-block>
  </div>

</template>

<script>
import dayjs from 'dayjs';
import { mapState } from 'vuex';
import { List, Item, Block, TabBar } from 'gree-ui';
import 'echarts/theme/macarons.js';
import echarts from 'echarts';
import { tuyaWeightTrend } from '../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [List.name]: List,
    [Item.name]: Item,
    [Block.name]: Block,
    [TabBar.name]: TabBar,
    echarts
  },
  data() {
    return {
      items: [
        { name: 1, label: '7 Days' },
        { name: 2, label: '1 Month' },
        { name: 3, label: '1 Year' }
      ],
      current: 1
    };
  },
  computed: {
    ...mapState({
      mac: state => state.mac,
      userid: state => state.dataObject.user_id
    })
  },
  watch: {
    userid: {
      handler(newVal) {
        this.getTendData(0, newVal);
      }
    }
  },
  mounted() {
    // this.getTendData(0, this.userid);
    this.drawLine(
      ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      [1, 2, 4, 5, 4, 2, 1]
    );
  },
  methods: {
    drawLine(x, y) {
      // 基于准备好的dom，初始化echarts实例
      // eslint-disable-next-line new-cap
      const myChart = new echarts.init(
        document.getElementById('myChartId'),
        'macarons'
      );
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          top: '35px'
          // left: '4px',
          // right: '4px',
          // bottom: '50px',
          // backgroundColor: '#fff',
          // width: 'auto', // 图例宽度
          // height: '100%' // 图例高度
        },
        calculable: true,
        xAxis: [
          {
            show: true,
            type: 'category',
            boundaryGap: false,
            data: x // ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            show: true,
            type: 'value',
            axisLabel: {
              formatter: '{value}kg'
            }
          }
        ],
        series: [
          {
            name: 'bodyWeight',
            type: 'line',
            stack: 'total',
            symbol: 'circle', // 折线点设置为实心点
            symbolSize: 5, // 折线点的大小
            // itemStyle: {
            //   normal: {
            //     // 添加渐变颜色
            //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //       {
            //         offset: 0,
            //         color: 'rgb(179, 231, 255)'
            //       },
            //       {
            //         offset: 1,
            //         color: 'rgb(255, 255, 255)'
            //       }
            //     ]),
            //     areaStyle: { type: 'default' },
            //     borderWidth: 5,
            //     borderColor: '#66ceff'
            //   }
            // },
            data: y // [1, 2, 4, 5, 4, 2, 1]
          }
        ]
      });
      // console.log(myChart);
    },
    onChangeTabBar(item, index, prevIndex) {
      console.log(
        `currentIndex: ${index}, prevIndex: ${prevIndex}, label: ${item.label}`
      );
      this.getTendData(index, this.userid);
    },
    getTendData(time, id) {
      const mac = this.mac;
      const userId = id;
      let startDay = '';
      let endDay = '';
      switch (time) {
        case 0:
          startDay = dayjs()
            .subtract(7, 'day')
            .format('YYYYMMDD');
          endDay = dayjs().format('YYYYMMDD');
          break;
        case 1:
          startDay = dayjs()
            .subtract(1, 'month')
            .format('YYYYMMDD');
          endDay = dayjs().format('YYYYMMDD');
          break;
        case 2:
          startDay = dayjs()
            .subtract(1, 'year')
            .format('YYYYMMDD');
          endDay = dayjs().format('YYYYMMDD');
          break;
        default:
          break;
      }
      console.log(
        '体重趋势入参:',
        'mac:',
        mac,
        'userId:',
        userId,
        'startDay:',
        startDay,
        'endDay:',
        endDay,
        typeof startDay
      );
      tuyaWeightTrend(mac, userId, startDay, endDay)
        .then(res => {
          console.log('体重趋势返回值', JSON.parse(res));
          if (JSON.parse(res).code === 200) {
            const x = Object.keys(JSON.parse(res).result);
            const y = [];
            Object.keys(JSON.parse(res).result).forEach(item => {
              y.push(JSON.parse(res).result[item] / 1000);
            });
            console.log(`X:${x}`);
            console.log(`Y:${y}`);
            this.drawLine(x, y);
          }
        })
        .catch(err => err);
    }
  }
};
</script>
