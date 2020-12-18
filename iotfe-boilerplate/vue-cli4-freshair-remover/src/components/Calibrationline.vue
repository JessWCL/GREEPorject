<template>
  <div class="box-bg-img">
    <div class="typeVal" v-for="(item, index) in IndicatorList">
      <span class="tips_type">{{ item.type }}</span>
      <span class="typeVal_text">({{ item.unit }})：</span>

      <!-- :style="{ width: `${scalewidth}rem` }" -->
      <div class="scale">
        <div
          class="tips-text"
          :style="{
            width: `${tipsWidth}rem`,
            height: `${tipsHeight}rem`,
            left: `${getClientLeft(item.type)}rem`
          }"
        >
          {{ item.val }}
        </div>
        <span
          class="rules"
          v-for="(items, index) in item.number"
          :style="{ width: `${weight[item.type][index] * scalewidth}rem` }"
        />
      </div>

      <div class="tips" :style="{ width: `${scalewidth}rem` }">
        <span v-for="(item, index) in item.rang">{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ProgressBar } from 'gree-ui';
import { mapState } from 'vuex';

export default {
  components: {
    [ProgressBar.name]: ProgressBar
  },
  data() {
    return {
      scalewidth: 8,
      rulewidth: 0.8,
      // ruleNum: 10,
      tipsWidth: 0.8,
      tipsHeight: 0.48,
      IndicatorList: [
        {
          type: 'CO₂',
          rang: ['优', '良', '中', '差'],
          number: 4,
          unit: 'ppm'
        },
        {
          type: 'PM2.5',
          rang: ['优', '良', '中', '差'],
          number: 4,
          unit: 'μg/m³'
        }
        // { type: 'HCHO(甲醛)', rang: ['合格', '超标'], number: 2, unit: '' },
        // { type: 'TVOC', rang: ['', '', ''], number: 10, unit: 'mg/m³' }
      ],
      // 刻度宽度权重
      /**  标准                                                                实际算(范围) 注：为了好画刻度缩小临界值
       * PM2.5:1-999 (优:1-35 良：35-75 中：75-115 差：>115)                    0-35-75-115-150  超多150按照刻度最后显示
       * eCO2:1-1000 (优:1-600 良：600-1000 中：1000-1600 差：>1600)            0-600-1000-1600-2000
       * TVOC:0-2(无)                                                          分10份
       * HCOC:400-2000(合格：=<0.08 超标：>=0.08)                               分2份
       */
      weight: {
        'CO₂': [600 / 2000, 400 / 2000, 600 / 2000, 400 / 2000],
        'PM2.5': [35 / 150, 40 / 150, 40 / 150, 35 / 150],
        'HCHO(甲醛)': [0.5, 0.5],
        TVOC: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
      }
    };
  },
  computed: {
    ...mapState({
      GasN: state => state.GasN, // 点击的第几个盒子
      dataObject: state => state.dataObject,
      // PM2P5: state => state.dataObject.PM2P5,
      // CO2: state => state.dataObject.CO2,
      DataBoxData: state => state.DataBoxData

      // HCHO: state => state.dataObject.HCHO,
      // VOC: state => state.dataObject.VOC
    })
  },
  methods: {
    getClientLeft(type) {
      let val;
      let max;
      switch (type) {
        case 'CO₂':
          val = this.DataBoxData[this.GasN]['CO2'] > 2000 ? 2000 : this.DataBoxData[this.GasN]['CO2'];
          max = 2000;
          this.$set(this.IndicatorList[0], 'val', this.DataBoxData[this.GasN]['CO2']);
          break;
        case 'PM2.5':
          val = this.DataBoxData[this.GasN]['PM2P5'] > 150 ? 150 : this.DataBoxData[this.GasN]['PM2P5'];
          max = 150;
          this.$set(this.IndicatorList[1], 'val', this.DataBoxData[this.GasN]['PM2P5']);
          break;
        case 'HCHO(甲醛)':
          val = this.HCHO / 100 > 0.16 ? 0.16 : this.HCHO / 100;
          max = 0.16;
          this.$set(this.IndicatorList[2], 'val', this.HCHO / 100);
          break;
        case 'TVOC':
          val = this.VOC > 1000 ? 1000 : this.VOC;
          max = 1000;
          this.$set(this.IndicatorList[3], 'val', this.VOC);
          break;
        default:
          break;
      }
      let returnValue = (val / max) * this.scalewidth - this.tipsWidth / 2;
      if (returnValue > 7.4) returnValue = 7.4;
      return returnValue;
    }
  }
};
</script>
