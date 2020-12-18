<!--
 * @Descripttion: 浸泡时间选择 
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2020-02-19 09:07:59
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-04-20 15:58:44
 -->
<template>
  <div class="body-main-soak">
    <div class="time-describe">
      <span>请选择浸泡时长</span>
    </div>
    <div class="picker-column">
      <gree-picker
        class="picker-time"
        ref="pickerTime"
        :data="pickerDataTime"
        :cols="1"
        :line-height="60"
        :default-index="pickerDefalutData"
        :default-value="pickerDefalutData"
        is-view
        :multi-line="false"
        is-cascade
      ></gree-picker>
    </div>
    <gree-block>
      <!-- 按钮、取消&&确认 -->
      <gree-row >
        <gree-col width="10"/>
        <gree-col width="35">
          <gree-button @click="$emit('close', false)" round style="width:100%">{{
            $language('timer.cancel')
          }}</gree-button>
        </gree-col>
        <gree-col width="35">
          <gree-button @click="handleConfirm" round style="width:100%">确认</gree-button>
        </gree-col>
        <gree-col width="10"/>
      </gree-row>
    </gree-block>
  </div>
</template>

<script>
import { Picker, Block, Row, Col, Button } from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'SoakPicker',
  components: {
    [Picker.name]: Picker,
    [Block.name]: Block,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
  },
  props: {
    timeValue: {
      type: Number,
      default() {
        return 60;
      },
    },
  },
  data() {
    let Data1 = [{ text: 30, value: 30 }, { text: 40, value: 40 }, { text: 50, value: 50 }, { text: 60, value: 60 }];
    Data1 = [Data1];
    return {
      pickerDataTime: Data1,
      pickerDefalutData: [30],
    };
  },
  computed: {
    ...mapState({
      timeAll: state => state.dataObject.timeAll,
    })
  },
  mounted() {
    setTimeout(() => {
      this.$refs.pickerTime.refresh();
    }, 500);
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT',
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL',
    }),
    /**
     * @description 取消浸泡
     */
    handleCancel() {
      this.$emit('close');
    },
    /**
     * @description 浸泡确认
     */
    handleConfirm() {
      const columnValues = this.$refs.pickerTime.getColumnValues();
      const obj = {
        soak: 1,
        soakTime: (columnValues[0].value / 10) >> 0,
      };
      const obj2 = {timeAll: this.timeAll + columnValues[0].value};
      this.setDataObject(Object.assign(obj2, obj));
      this.sendCtrl(obj);
      this.$emit('close');
    }
  },
};
</script>

<style lang="scss" scope>
// 预约
.body-main-soak {
  position: relative;
  .time-describe {
    margin: 15px 0 0 30px;
    font-size: 40px;
  }

  .gree-picker {
    &.picker-time {
      .gree-picker-column {
        padding: 0 !important;
        width: 100% !important;
        .gree-picker-column-container {
          .gree-picker-column-masker {
            left: 0;
            right: 0;
            &.top {
              top: 0 !important;
              background: #f4f4f4 !important;
              z-index: 0;
              &:before {
                visibility: hidden;
              }
            }
            &.bottom {
              bottom: 0 !important;
              background: #f4f4f4 !important;
              z-index: 0;
              &:after {
                visibility: hidden;
              }
            }
          }
          .gree-picker-column-list {
            .gree-picker-column-item {
              &::after {
              content: '分钟';
              position: absolute;
              top: 50%;
              transform: translateY(-50%) ;
              right: 30%;
              color: #404657;
              font-size: 50px !important;
            }
            }
            .column-list {
              .column-item {
                color: #404657;
                font-size: 110px !important;
                font-weight: 100;
              }
            }
          }
          .gree-picker-column-hooks {
            .gree-picker-column-hook {
              &:nth-of-type(1) {
                flex: 1;
              }
            }
          }
        }
      }
    }
  }

  .order-time {
    // border: 1px solid red;
    position: absolute;
    top: 150px;
    left: 50%;
    transform: translate(-50%, 0);
    // width: 100%;
    font-size: 226px;
    color: #404657;
  }
  .order-btn {
    position: absolute;
    top: 460px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 535px !important;
    height: 172px;

    &.round:after {
      border-radius: 268px !important;
    }
  }
}
</style>
