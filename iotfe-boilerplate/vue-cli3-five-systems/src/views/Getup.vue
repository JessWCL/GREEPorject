<template>
  <div class="page-section getup-page" id="">
    <div class="gree-logo">
      <h5>格力零碳健康家</h5>
      <p>Gree Carbon-Free Health House</p>
    </div>
    <div class="getup-page-content">
      <div class="getup-title">
        <h4><strong>早安</strong> 祝您有健康美好的一天！</h4>
      </div>
      <div class="getup-data">
        <table class="table">
          <tbody>
            <tr>
              <td>
                <p>今日{{ city }}天气: <span>{{ getup.weatherStatus }}</span></p>
              </td>
              <td>
                <p>安防: <span>撤销</span></p>
              </td>
            </tr>
            <tr>
              <td>
                <p>今日室外温度、湿度为: <span>{{ getup.temperature }}℃，{{ getup.humidity }}%</span></p>
              </td>
              <td>
                <p>今日空气品质为: <span>清新</span></p>
              </td>
            </tr>
            <tr>
              <td>
                <p>热水已经准备好: <span class="orange">54℃，小心烫</span></p>
              </td>
              <td>
                <p>昨晚睡眠时长: <span>{{ sleepLength }}</span></p>
              </td>
            </tr>
            <tr>
              <td>
                <p>净水水质: <span>优</span></p>
              </td>
              <td>
                <p>昨晚睡眠质量: <span>优</span></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "getup",
  components: {},
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      getup: state => state.dataObject.getup,
      sleepDataArr: state => state.dataObject.sleepDataArr,
      dateRemainder: state => state.dataObject.dateRemainder,
    }),
    sleepLength() {
      return this.sleepDataArr[this.dateRemainder].sleepLength;
    },
    city() {
      return this.getup.city ? this.getup.city : "";
    },
  },
  watch: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
$skyblue: #32C5FF;
$blue: #1594E2;
$grassgreen: #6DD400;
$khaki: #F7B500;
$orange: #FF5700 ;

.getup-page {
  border: none;
  border-radius: 0;
  background-color: transparent;
  position: relative;
  padding:0 40px;
  box-sizing: border-box;
  height: auto;
  .gree-logo {
    position: absolute;
    top: 25px;
    left: 25px;
    h5 {
      color: #000;
      font-size: 40px;
      font-weight: normal;
      margin-bottom: 0;
    }
    p {
      margin: 0;
      font-size: 18px;
    }
  }
  .getup-page-content {
    // background-color: #81E1FF;
    margin-top: 120px;
    padding:0 8%;
    height: auto;
    // height: 820px;
    &::before { // 阻止外边距塌陷
      content:"";
      display: table;
      border-collapse: collapse;
      height: 0;
      width: 0;
      visibility: hidden;
    }
    .getup-title {
      margin-bottom: 30px;
      margin-top: 100px;
      h4 {
        color: $blue;
        font-size: 50px;
        font-weight: normal;
        text-align: left;
        margin-top: 100px;
        margin-bottom: 0;
        vertical-align: baseline;
        strong {
          font-size: 120px;
          vertical-align: baseline;
          font-weight: normal;
        }
      }
    }
    .getup-data {
      padding: 0;
      .table {
        width: 100%;
        border-collapse: collapse;
        p {
          font-size: 40px;
          padding-left: 40px;
          margin: 36px 0;
          span {
            margin-left: 30px;
            color: $blue;
            &.orange {
              color: $orange;
            }
          }
        }
      }
    }
  }
}
</style>
