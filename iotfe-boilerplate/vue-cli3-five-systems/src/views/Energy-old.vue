<template>
  <div class="page-section energy-page" id="">
    <div class="energy-title">
      <div class="energy-title-part">
        <h4>光伏发电</h4>
        <div class="energy-title-num">
          <span>{{ energyData.totalProvideQ | parseInt }}度</span>
        </div>
      </div>
      <div class="energy-title-part">
        <h4>节省电费</h4>
        <div class="energy-title-num">
          <span>{{ energyData.savePowerTotal | parseInt }}元</span>
        </div>
      </div>
    </div>
    <div class="energy-data">
      <table class="table">
        <tbody>
          <tr>
            <td>
              <p>光伏发电功率: <span>{{ energyData.generationPower }}W</span></p>
            </td>
            <td>
              <p>累计数据: <span>{{ energyData.days }}天</span></p>
            </td>
            <td>
              <p>二氧化碳: <span>{{ energyData.reduceCO2 }}kg</span></p>
            </td>
            <td>
              <p>氮化物: <span>{{ energyData.reduceNOx }}kg</span></p>
            </td>
          </tr>
          <tr>
            <td>
              <p>用电功率: <span>{{ energyData.consumePower }}W</span></p>
            </td>
            <td>
              <p>储能剩余电量: <span>{{ energyData.currentCapacityKWh }}kWh</span></p>
            </td>
            <td>
              <p>二氧化硫: <span>{{ energyData.reduceSO2 }}kg</span></p>
            </td>
            <td>
              <p>树: <span>{{ energyData.reduceTreeNum }}棵</span></p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "energy",
  components: {},
  filters: {
    parseInt(val) {
      if (!val) return '';
      const intVal = Math.round(val);
      return intVal;
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      energy: state => state.dataObject.energy,
    }),
    energyData() {
      let origin = this.energy;
      origin = JSON.stringify(origin);
      const data = JSON.parse(origin, (key, val) => {
        if (key === '') return val; 
        return Math.round(Number(val) * 100) / 100;
      });
      /* origin.entries().forEach(el => {
        data[el[0]] = el[1];
      }); */
      return data;
    },
  },
  watch: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
$skyblue: #32C5FF;
$grassgreen: #6DD400;

.energy-page {
  color: #FFF;
  .energy-title {
    margin-bottom: 120px;
    display: flex;
    flex-flow: row nowrap;
    .energy-title-part {
      width: 50%;
      &:first-child {
        padding-left: 40px;
      }
      &:last-child {
        padding-right: 40px;
      }
      h4 {
        text-align: center;
        margin-top: 160px;
        font-size: 36px;
        font-weight: normal;
        margin-bottom: 40px;
      }
      .energy-title-num {
        text-align: center;
        font-size: 50px;
        color: $skyblue;;
        display: flex;
        justify-content: center;
        span {
          width: 240px;
          height: 240px;
          display: block;
          line-height: 220px;
          border: 10px solid $skyblue;
          border-radius: 300px;
        }
      }
    }
  }
  .energy-data {
    padding: 0 10%;
    .table {
      width: 100%;
      border-collapse: collapse;
      p {
        font-size: 32px;
        span {
          color: $skyblue;
          font-weight: normal;
        }
      }
    }
  }
}
</style>
