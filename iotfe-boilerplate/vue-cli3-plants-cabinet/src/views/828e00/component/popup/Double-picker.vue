
<template>
  <div class="double-picker-container">
    <div class="picker-switch">
      <span
        :class="{active: pickerSwitch_show === 1}"
        @click="pickerSwitchClick(1)"
      >开 &nbsp;{{ modeConfig.onH }}时{{ modeConfig.onM }}分</span>
      <span
        :class="{active: pickerSwitch_show === 0}"
        @click="pickerSwitchClick(0)"
      >关 &nbsp;{{ modeConfig.offH }}时{{ modeConfig.offM }}分</span>
    </div>
    <div class="picker-content">
      <!-- 开picker -->
      <gree-picker
        v-show="pickerSwitch_show === 1"
        class="gree-picker double-picker"
        ref="double_picker1"
        :data="pickerData"
        :cols="picker1Config.cols"
        :default-value="picker1Config.defaultValue"
        :line-height="35"
        is-cascade
        is-view
        @initialed="onPicker1Initialed"
        @change="onPicker1Confirm"
      ></gree-picker>
      <!-- 关picker -->
      <gree-picker
        v-show="pickerSwitch_show === 0"
        class="gree-picker double-picker"
        ref="double_picker2"
        :data="pickerData"
        :cols="picker2Config.cols"
        :default-value="picker2Config.defaultValue"
        :line-height="35"
        is-cascade
        is-view
        @initialed="onPicker2Initialed"
        @change="onPicker2Confirm"
      ></gree-picker>

      <div class="unit">
        <span>小时</span>
        <span>分钟</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Switch, Picker } from "gree-ui";
import { mapState, mapMutations, mapActions } from "vuex";
import { plantsList, plantsConfig } from "../../../../assets/js/plants-data.js";
import mySwitch from "../my-components/mySwitch.vue";

const imgAssets = {};

export default {
  name: "FunctionList",
  components: {
    [Switch.name]: Switch,
    [Picker.name]: Picker,
    mySwitch
  },
  props: {
    mode: {
      // 路由进入的是什么模式[温度，湿度，灯光，新风，水循环,]
      type: [String, Number],
      default: "TempS"
    }
  },
  data() {
    return {
      pickerSwitch_show: 1, // 显示开或关循环picker
      firstSwitchTo2: true,
    };
  },
  computed: {
    ...mapState({
      Light: state => state.dataObject.Light,
      Wind: state => state.dataObject.Wind,
      WatPump: state => state.dataObject.WatPump,
      LigOnH: state => state.dataObject.LigOnH,
      LigOnM: state => state.dataObject.LigOnM,
      LigOffH: state => state.dataObject.LigOffH,
      LigOffM: state => state.dataObject.LigOffM,
      WindOnH: state => state.dataObject.WindOnH,
      WindOnM: state => state.dataObject.WindOnM,
      WindOffH: state => state.dataObject.WindOffH,
      WindOffM: state => state.dataObject.WindOffM,
      WatOnH: state => state.dataObject.WatOnH,
      WatOnM: state => state.dataObject.WatOnM,
      WatOffH: state => state.dataObject.WatOffH,
      WatOffM: state => state.dataObject.WatOffM
    }),
    modeConfig() {
      const mode = this.mode;
      const modeConfig = {
        title: "mode",
        type: "single"
      };
      switch (mode) {
        case "TempS":
          modeConfig.title = "调整温度";
          modeConfig.type = "single";
          modeConfig.unit = "℃";
          break;
        case "HumdS":
          modeConfig.title = "调整湿度";
          modeConfig.type = "single";
          modeConfig.unit = "%";
          break;
        case "Light":
          modeConfig.title = "灯光";
          modeConfig.type = "double";
          modeConfig.onH = this.LigOnH;
          modeConfig.onM = this.LigOnM;
          modeConfig.offH = this.LigOffH;
          modeConfig.offM = this.LigOffM;
          break;
        case "Wind":
          modeConfig.title = "新风";
          modeConfig.type = "double";
          modeConfig.onH = this.WindOnH;
          modeConfig.onM = this.WindOnM;
          modeConfig.offH = this.WindOffH;
          modeConfig.offM = this.WindOffM;
          break;
        case "WatPump":
          modeConfig.title = "水循环";
          modeConfig.type = "double";
          modeConfig.onH = this.WatOnH;
          modeConfig.onM = this.WatOnM;
          modeConfig.offH = this.WatOffH;
          modeConfig.offM = this.WatOffM;
          break;
        default:
          break;
      }
      return modeConfig;
    },
    double_picker1() {
      return this.$refs.double_picker1;
    },
    double_picker2() {
      return this.$refs.double_picker2;
    },
    pickerData() {
      const mode = this.mode;
      let arr = [];
      
      for (let i = 0; i <= 24; i++) {
        arr.push({
          text: `${i}`,
          value: i,
          children: [],
        });
        for (let j = 0; j <= 59; j++) {
          if (i === 24) {
            arr[i].children.push({
              text: `0`,
              value: 0,
            });
            break;
          } else {
            arr[i].children.push({
              text: `${j}`,
              value: j,
            });
          }
        }
      }

      arr = [arr];
      // console.log(arr);

      return arr;
    },
    picker1Config() {
      const mode = this.mode;
      const config = {};
      switch (mode) {
        case "Light":
          config.cols = 2;
          config.defaultValue = [this.LigOnH, this.LigOnM];
          break;
        case "Wind":
          config.cols = 2;
          config.defaultValue = [this.WindOnH, this.WindOnM];
          break;
        case "WatPump":
          config.cols = 2;
          config.defaultValue = [this.WatOnH, this.WatOnM];
          break;
        default:
          break;
      }
      // console.log(config);
      return config;
    },
    picker2Config() {
      const mode = this.mode;
      const config = {};
      switch (mode) {
        case "Light":
          config.cols = 2;
          config.defaultValue = [this.LigOffH, this.LigOffM];
          break;
        case "Wind":
          config.cols = 2;
          config.defaultValue = [this.WindOffH, this.WindOffM];
          break;
        case "WatPump":
          config.cols = 2;
          config.defaultValue = [this.WatOffH, this.WatOffM];
          break;
        default:
          break;
      }
      // console.log(config);
      return config;
    },
    switchVal: {
      // 循环开关
      get() {
        let val = 1;
        if (this.modeConfig.type === "double") {
          val = this[this.mode] === 1;
        }
        return val;
      },
      set(val) {
        let state = 0;
        const mode = this.mode;
        val ? (state = 1) : (state = 0);
        this.setDataObject({
          [mode]: state
        });
        this.sendCtrl({ [mode]: state });
      }
    }
  },
  watch: {
  },
  created() {
    /* this.$once('hook:beforeDestroy', (...params) => {
      console.log(params);
    }); */
  },
  mounted() {
  },
  methods: {
    ...mapMutations({
      setDataObject: "SET_DATA_OBJECT"
    }),
    ...mapActions({
      sendCtrl: "SEND_CTRL"
    }),
    onPicker1Initialed() {
    },
    onPicker2Initialed() {
    },
    onPicker1Confirm(...params) {
      console.log(params);
    },
    onPicker2Confirm(...params) {
      console.log(params);
    },
    pickerSwitchClick(index) {
      this.pickerSwitch_show = index;
      if (index === 0 && this.firstSwitchTo2) {
        this.double_picker2.refresh();
        this.firstSwitchTo2 = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>

.double-picker-container {
  // background-color: #fac;
  .picker-switch {
    height: 160px;
    border-bottom: 1px solid #ccc;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    span {
      border: 1px solid #333;
      border-radius: 20px;
      padding: 20px 40px;
      line-height: 1;
      font-size: 40px;
      background-color: #fff;
      &.active {
        color: #fff;
        border-color: rgba(0, 0, 0, 0.1);
        background-color: #00aeff;
      }
    }
  }
  .unit {
    font-size: 40px;
    color: #00aeff;
    span {
      position: absolute;
      z-index: 2;
      left: 50%;
      top: 50%;
      margin-top: -10px;
      &:nth-child(1) {
        margin-left: -80px;
      }
      &:nth-child(2) {
        margin-left: 250px;
      }
    }
  }
  .picker-content {
    height: calc(100% - 160px);
    position: relative;
  }
  .gree-picker {
    height: 90%;
    width: 70%;
    margin: 0 auto;
    /deep/ .gree-picker-column {
      .gree-picker-column-container {
        .gree-picker-column-list {
          .gree-picker-column-item {
            ul.column-list {
              li.column-item {
                font-size: 100px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
