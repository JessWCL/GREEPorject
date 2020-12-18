<template>
  <section>
    <gree-block-title v-show="isHasTemp">
      烹饪温度
    </gree-block-title>
    <gree-block
      v-show="isHasTemp"
      class="temp"
    >
      <gree-row>
        <gree-col>
          <div class="section">
            {{ textTemp }}
            <code v-show="isShowTempUnit">&#x2103;</code>
          </div>
        </gree-col>
      </gree-row>
    </gree-block>
    <gree-block-title v-show="isHasFoodName">
      食品名称
    </gree-block-title>
    <gree-block v-show="isHasFoodName">
      <gree-row>
        <gree-col>
          <div class="section">
            {{ foodName }}
          </div>
        </gree-col>
      </gree-row>
    </gree-block>
    <gree-block-title>预约完成时间</gree-block-title>
    <gree-block class="appoint-time">
      <gree-row>
        <gree-col>
          <div class="section">
            {{ DisTmrHour }}<span class="semicolon">:</span>{{ DisTmrMin }}
          </div>
        </gree-col>
      </gree-row>
    </gree-block>
    <gree-row>
      <gree-col>
        <gree-button
          round
          @click="handleCancleAppointment"
        >
          取消
        </gree-button>
      </gree-col>
    </gree-row>
  </section>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import uniqBy from 'lodash/uniqBy';
import { BlockTitle, Block, Row, Col, Button } from 'gree-ui';
import * as types from '@/store/types';
import IntelligentMenusV2 from '@/api/828d04/IntelligentMenusV2';
import {
  RUN_STAT,
  MODE_SMART_MENU,
  MODE_BAKING,
  MODE_STEAMING,
  LIST1_BAKING_SMALL_BARBECUE,
  LIST1_BAKING_LARGE_BARBECUE,
  MODE_BAKING_TEMP_NAMES,
  LIST2_BAKING_MIDDLE_TMP
} from '@/api/828d04/constant';
import { padZero } from '@/utils/index';

export default {
  name: 'Appointmenting',
  components: {
    [BlockTitle.name]: BlockTitle,
    [Block.name]: Block,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      RunStat: state => state.dataObject.RunStat,
      Mod: state => state.dataObject.Mod,
      List1: state => state.dataObject.List1,
      List2: state => state.dataObject.List2,
      List3: state => state.dataObject.List3,
      List4: state => state.dataObject.List4,
      List5: state => state.dataObject.List5,
      SetTmp: state => state.dataObject.SetTmp,
      DisTmrHour: state => {
        const {DisTmrHour} = state.dataObject;
        return padZero(DisTmrHour);
      },
      DisTmrMin: state => {
        const {DisTmrMin} = state.dataObject;
        return padZero(DisTmrMin);
      },
    }),

    isShowTempUnit() {
      let ret = true;
      const { Mod, List1 } = this;
      const isSmallOrLargeBaking = Mod === MODE_BAKING && (List1 === LIST1_BAKING_SMALL_BARBECUE || List1 === LIST1_BAKING_LARGE_BARBECUE);
      if (isSmallOrLargeBaking) {
        ret = false;
      }
      return ret;
    },

    textTemp() {
      const { Mod, List1 } = this;
      const isSmallOrLargeBaking = Mod === MODE_BAKING && (List1 === LIST1_BAKING_SMALL_BARBECUE || List1 === LIST1_BAKING_LARGE_BARBECUE);
      let ret = this.SetTmp;
      if (isSmallOrLargeBaking) {
        ret = MODE_BAKING_TEMP_NAMES[this.SetTmp] || MODE_BAKING_TEMP_NAMES[LIST2_BAKING_MIDDLE_TMP];
      }
      return ret;
    },

    foodName() {
      let ret = '';
      let retList = [];
      retList = IntelligentMenusV2.filter(ele => {
        return ele.List1Value === this.List1
          && ele.List2Value === this.List2
          && ele.List3Value === this.List3;
      });
      retList = uniqBy(retList, 'List3Value');
      if (retList.length > 0) {
        ret = retList[0].List3Label;
      }
      return ret;
    },

    isHasTemp() {
      let ret = false;
      const isHasTemp = this.Mod === MODE_BAKING || this.Mod === MODE_STEAMING;
      if (isHasTemp) {
        ret = true;
      }
      return ret;
    },

    isHasFoodName() {
      let ret = false;
      const isHasFoodName = this.Mod === MODE_SMART_MENU;
      if (isHasFoodName) {
        ret = true;
      }
      return ret;
    },

  },
  methods: {
    ...mapMutations({
      setRunStat: types.SET_RUNSTAT
    }),
    ...mapActions({
      sendCtrl: types.SEND_CTRL,
    }),
    handleCancleAppointment() {
      this.setRunStat(RUN_STAT.TurnOn);
      const { RunStat } = this.dataObject;
      this.sendCtrl({ RunStat });
    },
  },
};
</script>

<style lang='scss' scoped>
section {
  display: flex;
  flex: 1;
  flex-direction: column;
  transform: translateZ(0);
  .block-title {
    margin: 20px 52px 20px;
    color: #404657;
    font-size: 45px;
  }
  .block {
    &:last-child {
      margin-top: auto;
      margin-bottom: 0.8rem;
    }
    margin: 33px 52px;
    color: #404657;
    text-align: center;
    font-size: 48px;
    &.temp {
      position: relative;
      font-size: 120px;
      font-family: appleLight;
      code {
        position: absolute;
        top: 10px;
        margin-left: 20px;
        font-size: 60px;
        font-family: appleLight;
      }
    }
    &.appoint-time {
      font-size: 120px;
      font-family: appleLight;
    }
  }
  .row {
    margin-top: auto;
    margin-bottom: 0.8rem;
    .col {
      .gree-button {
        margin: 0 auto;
      }
    }
  }
}
</style>
