
<template>
  <transition name="fade" v-on:after-leave="mask_afterLeave">
    <div class="mask" v-show="pageShow" @click.stop.self="cancel()" key="mask">
      <transition name="popup" mode="out-in">
        <div
          class="popup-wrapper popup-picker"
          v-show="pageShow"
          key="popupWrapper"
          :class="{'double-picker': modeConfig.type==='double' }"
        >
          <div
            class="popup-header"
            :class="{'double-picker-header': modeConfig.type==='double'}"
          >
            {{ modeConfig.title }}
            <div class="header-right" v-if="modeConfig.type==='double'" >
              <gree-switch v-model="switchVal" ></gree-switch>
              <my-switch></my-switch>
            </div>
          </div>
          <div
            class="popup-body"
            :class="{'double-picker-body': modeConfig.type==='double' }"
          >
            <div class="picker-box single-picker" v-if="modeConfig.type === 'single'">
              <gree-picker
                class="gree-picker single-picker"
                ref="single_picker"
                :data="pickerData"
                :cols="pickerConfig.cols"
                :default-value="pickerConfig.defaultValue"
                :line-height="45"
                is-view
                @initialed="onPickerInitialed"
                @change="onPickerConfirm"
              ></gree-picker>
              <span class="unit">{{ modeConfig.unit }}</span>
            </div>
            <div class="picker-box double-picker" v-if="modeConfig.type === 'double'">
              <div class="picker-switch">
                <span :class="{active: pickerSwitch_show === 1}" @click="pickerSwitch_show = 1">
                  开 &nbsp;{{ modeConfig.onH }}时{{ modeConfig.onM }}分
                </span>
                <span :class="{active: pickerSwitch_show === 0}" @click="pickerSwitch_show = 0">
                  关 &nbsp;{{ modeConfig.offH }}时{{ modeConfig.offM }}分
                </span>
              </div>
              <div class="picker-content">
                <!-- 开picker -->
                <gree-picker
                  v-show="pickerSwitch_show === 1"
                  class="gree-picker single-picker"
                  ref="double_picker1"
                  :data="pickerData"
                  :cols="pickerConfig.cols"
                  :default-value="pickerConfig.defaultValue"
                  :line-height="35"
                  is-view
                  @initialed="onPickerInitialed"
                  @change="onPickerConfirm"
                ></gree-picker>
                <!-- 关picker -->
                <gree-picker
                  v-show="pickerSwitch_show === 0"
                  class="gree-picker single-picker"
                  ref="double_picker2"
                  :data="pickerData"
                  :cols="pickerConfig.cols"
                  :default-value="pickerConfig.defaultValue"
                  :line-height="35"
                  is-view
                  @initialed="onPickerInitialed"
                  @change="onPickerConfirm"
                ></gree-picker>
              </div>
              <div class="unit">
                <span>小时</span>
                <span>分钟</span>
              </div>
            </div>
          </div>
          <div class="popup-footer">
            <div class="button-wrapper">
              <div class="footerBtn leftBtn" @click="cancel()">取消</div>
              <div class="footerBtn rightBtn" @click="submit()">确定</div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { Icon, Switch, Picker } from "gree-ui";
import { mapState, mapMutations, mapActions } from "vuex";
import popFunctionConfig from "../../../../mixins/config/828e00/Popfunction.js";
import { plantsList, plantsConfig } from "../../../../assets/js/plants-data.js";
import mySwitch from "../my-components/mySwitch.vue";

const imgAssets = {
  Light: [
    require("../../../../assets/img/function.png"),
    require("../../../../assets/img/function-on.png")
  ],
  Wind: [
    require("../../../../assets/img/function.png"),
    require("../../../../assets/img/function-on.png")
  ],
  WatPump: [
    require("../../../../assets/img/function.png"),
    require("../../../../assets/img/function-on.png")
  ]
};
// home 配置文件
export default {
  name: "FunctionList",
  components: {
    [Icon.name]: Icon,
    [Switch.name]: Switch,
    [Picker.name]: Picker,
    mySwitch,
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
      pageShow: false,
      pickerSwitch_show: 1, // 显示开或关循环picker
      // switchVal: true,
    };
  },
  computed: {
    ...mapState({
      Light: state => state.dataObject.Light,
      Wind: state => state.dataObject.Wind,
      WatPump: state => state.dataObject.WatPump,
      TempS: state => state.dataObject.TempS,
      HumdS: state => state.dataObject.HumdS,
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
      WatOffM: state => state.dataObject.WatOffM,
    }),
    modeConfig() {
      const mode = this.mode;
      const modeConfig = {
        title: "mode",
        type: "single",
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
    single_picker() {
      return this.$refs.single_picker;
    },
    double_picker1() {
      return this.$refs.double_picker1;
    },
    double_picker2() {
      return this.$refs.double_picker2;
    },
    pickerData() {
      const mode = this.mode;
      const data = {};
      let arr = [{
        value: 0,
        text: '0',
      }, {
        value: 1,
        text: '1',
      }, {
        value: 2,
        text: '2',
      }, ];
      switch (mode) {
        case 'TempS':
          arr = [];
          for (let i = plantsConfig.temperatureRange[0]; i <= plantsConfig.temperatureRange[1]; i++) {
            arr.push({
              value: i,
              text: `${i}`,
            });
          }
          break;
        case 'HumdS':
          arr = [];
          for (let i = plantsConfig.humidityRange[0]; i <= plantsConfig.humidityRange[1]; i++) {
            arr.push({
              value: i,
              text: `${i}`,
            });
          }
          break;
        case 'Light':
          break;
        case 'Wind':
          break;
        case 'WatPump':
          break;
        default:
          break;
      }
      arr = [arr];
      // console.log(arr);
      
      return arr;
    },
    pickerConfig() {
      const mode = this.mode;
      const config = {};
      switch (mode) {
        case 'TempS':
          config.cols = 1;
          config.defaultIndex = [0];
          config.defaultValue = [this.TempS];
          break;
        case 'HumdS':
          config.cols = 1;
          config.defaultIndex = [0];
          config.defaultValue = [this.HumdS];
          break;
        case 'Light':
          config.cols = 2;
          config.defaultIndex = [0];
          break;
        case 'Wind':
          config.cols = 2;
          break;
        case 'WatPump':
          config.cols = 2;
          break;
        default:
          break;
      }
      // console.log(config);
      return config;
    },
    switchVal: { // 循环开关
      get() {
        let val = 1;
        if (this.modeConfig.type === 'double') {
          val = this[this.mode] === 1;
        }
        return val;
      },
      set(val) {
        let state = 0;
        const mode = this.mode;
        val ? state = 1 : state = 0;
        this.setDataObject({
          [mode]: state,
        });
        this.sendCtrl({ [mode]: state, });
      },
    },
  },
  watch: {
    TempS(newVal, oldVal) {
      // console.log(this.single_picker);
      // this.single_picker.defaultValue = newVal;
      if (this.mode === 'TempS' && newVal !== oldVal) this.single_picker.refresh();
    },
    HumdS(newVal, oldVal) {
      if (this.mode === 'HumdS' && newVal !== oldVal) this.single_picker.refresh();
    }
  },
  created() {
    /* this.$once('hook:beforeDestroy', (...params) => {
      console.log(params);
    }); */
  },
  mounted() {
    this.pageShow = true;
  },
  methods: {
    ...mapMutations({
      setDataObject: "SET_DATA_OBJECT",
    }),
    ...mapActions({
      sendCtrl: "SEND_CTRL",
    }),
    /**
     * @function submit
     * @description 确定提交
     */
    submit() {
      // console.log(this.single_picker)
      if (this.modeConfig.type === 'single') {
        const val = this.single_picker.getColumnValue().value;
        console.log(this.single_picker);
        console.log(`submit :`, val);
        const mode = this.mode;
        if (val !== this[mode]) { // 当值不一样时才发送指令
          console.log('Popup-picker >submit: ', val);
          this.setDataObject({[mode]: val});
          this.sendCtrl({[mode]: val});
        }
      }
    },
    /**
     * @function cancel
     * @description 取消popup，回退路由
     */
    cancel() {
      this.pageShow = false;
    },
    /**
     * @function mask_afterLeave
     * @param el div.mask的DOM
     * @description 在mask离开动画结束之后调用, 回退路由
     */
    mask_afterLeave(el) {
      // console.log(el);
      this.$router.go(-1);
    },
    onPickerInitialed() {
    },
    onPickerConfirm(...params) {
      // console.log(`onPickerConfirm: ${params}`);
    },
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../assets/scss/popup.scss";
.popup-wrapper.popup-picker {
  height: 50vh;
  max-height: 50vh;
  .popup-header {
    text-align: center;
    font-size: 36px;
    box-sizing: border-box;
    padding: 0 40px;
    height: 120px;
    line-height: 120px;
    border-bottom: 1px solid #ccc;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
    &.double-picker-header {
      text-align: left;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      .header-right {
        display: flex;
        flex-flow: row-reverse nowrap;
        justify-content: flex-end;
      }
    }
  }
  .popup-body {
    height: calc(100% - 270px);
    .picker-box {
      height: 100%;
      overflow: hidden;
      position: relative;
    }
    .single-picker {
      .unit {
        position: absolute;
        z-index: 2;
        left: 50%;
        top: 50%;
        margin-left: 80px;
        margin-top: -35px;
        font-size: 50px;
        color: #00aeff;
      }
    }
    .double-picker {
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
            border-color: rgba(0,0,0,.1);
            background-color: #00aeff;
          }
        }
      }
      .unit {
        position: absolute;
        z-index: 2;
        left: 50%;
        top: 50%;
        margin-left: 80px;
        margin-top: -35px;
        font-size: 50px;
        color: #00aeff;
      }
      .picker-content {
        height: calc(100% - 160px);
      }
    }
  }
  .gree-picker {
    height: 90%;
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
  .popup-footer {
    height: 150px;
    .button-wrapper {
      height: 100%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: flex-end;
      height: 100%;
      line-height: 150px;
      .footerBtn {
        width: 50%;
        height: 100%;
        padding: 0;
        box-sizing: border-box;
        text-align: center;
        font-size: 36px;
        color: #333;
        border: 1px solid #ccc;
        border-left: none;
        border-right: none;
        &.leftBtn {
          border-right: 1px solid #ccc;
        }
        &.rightBtn {
          color: #00aeff;
        }
        &.leftBtn:active {
          background-color: #999;
          color: #fff;
        }
        &.rightBtn:active {
          background-color: #00aeff;
          color: #fff;
        }
      }
    }
  }
}
</style>
