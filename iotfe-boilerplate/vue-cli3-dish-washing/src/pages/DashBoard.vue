<template>
  <div class="dash-board-wrapper position-relative">
    <div
      class="dash-board-start-container"
      v-show="!Wash && !TmrOn && !WashDone">
      <div class="dash-board-body">
        <div class="txt-start-time d-flex flex-row">
          <div
            class="txt-time-num"
            v-show="parseInt(ModeTime / 60, 10)">
            {{ parseInt(ModeTime / 60, 10) }}
          </div>
          <div
            class="txt-time-unit"
            v-show="parseInt(ModeTime / 60, 10)">小时</div>
          <div class="txt-time-num">{{ parseInt(ModeTime % 60, 10) }}</div>
          <div class="txt-time-unit">分钟</div>
        </div>
      </div>
      <div class="dash-board-footer">
        <div
          @click="handleClickStart"
          class="button btn-start">启动</div>
      </div>
      <!-- 菜单 start -->
      <GreeMenu />
      <!-- 菜单 end -->
    </div>
    <div v-show="(Wash && !TmrOn) || WashDone">
      <!-- 画布 -->
      <canvas
        id="canvas"
        ref="canvas"
        class="absolute-container" />
      <div class="absolute-container">
        <div class="surplus-container">
          <div class="dash-board-body">
            <div
              class="txt-title"
              :class="{ invisible: WashDone }"
            >剩余</div>
            <div
              class="txt-working-time d-flex flex-row"
              :class="{ invisible: WashDone }"
            >
              <div
                class="txt-time-num"
                v-show="RmTmrHour">{{ RmTmrHour }}</div>
              <div
                class="txt-time-unit"
                v-show="RmTmrHour">小时</div>
              <div class="txt-time-num">{{ RmTmrMin }}</div>
              <div class="txt-time-unit">分钟</div>
            </div>
            <!-- 占位 -->
            <div
              class="txt-status"
              :class="{ invisible: textWorkStatus === '' }"
            >{{ textWorkStatus }}</div>
          </div>
        </div>
        <div class="dash-board-footer">
          <!-- 工作中显示按钮 -->
          <div
            v-if="!WashDone"
            @click="cancle"
            class="button">取消</div>
          <!-- 工作中显示按钮 -->
          <div
            v-if="!WashDone"
            @click="handleClickPause"
            :class="{
              'disabled': functype
            }"
            class="button">{{ textPauseStart }}</div>
          <!-- 已完成显示按钮 -->
          <div
            v-if="WashDone"
            @click="handleClickConfirm"
            class="button">{{ $language('home.confirm') }}</div>
        </div>

        <!-- 保洁 start -->
        <div
          class="toolbar-container"
          :class="{
            'd-none': !isShow
        }">
          <div class="item-container">
            <div
              class="item-img-container button-shadow"
              :class="[
                {
                  forbided: funBtnList[PURIFIER].isForbided
                    || ( functype && funBtnList[PURIFIER].isForbidedInFunctype ),
                  active: funBtnList[PURIFIER].isActive,
                  normal: funBtnList[PURIFIER].isNormal,
                },
                funBtnList[PURIFIER].btnClassName,
              ]"
              @click="handleClickBtnWidthParams({ id: funBtnList[PURIFIER].id,
                                                  isForbided: funBtnList[PURIFIER].isForbided })">
              <img
                v-if="funBtnList[PURIFIER].isForbided
                || ( functype && funBtnList[PURIFIER].isForbidedInFunctype)"
                :src="funBtnList[PURIFIER].forbidedIconSrc"
                class="img">
              <img
                v-else-if="funBtnList[PURIFIER].isActive"
                :src="funBtnList[PURIFIER].activeIconSrc"
                class="img">
              <img
                v-else-if="funBtnList[PURIFIER].isNormal"
                :src="funBtnList[PURIFIER].normalIconSrc"
                class="img">
              <img
                v-else
                :src="funBtnList[PURIFIER].normalIconSrc"
                class="img">
            </div>
            <div class="name">{{ funBtnList[PURIFIER].name }}</div>
          </div>
        </div>
        <!-- 保洁 end -->
      </div>
    </div>
    <div
      class="appointment-wrapper"
      v-show="TmrOn">
      <div class="appointment-container">
        <div class="title">
          <div class="font-title">预约完成时间<span v-show="isShowTomorrowText">（明天）</span></div>
        </div>
        <div class="time-txt">
          {{ parseInt(computedTmrHour, 10) >= 10
            ? parseInt(computedTmrHour, 10)
          : '0' + parseInt(computedTmrHour, 10) }}
          <span>:</span>
          {{ parseInt(computedTmrMin, 10) >= 10
            ? parseInt(computedTmrMin, 10)
          : '0' + parseInt(computedTmrMin, 10) }}
        </div>
        <div class="button-container">
          <div
            @click="handleDashBoardAppointmentCancel()"
            class="button">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import GreeMenu from './Menu';
import { FUN_BTNS, DW_MID_828B00, WORK_STATUS } from '../api/constant';
import { MID } from '../api/index';

const { PURIFIER } = FUN_BTNS;

export default {
  name: 'DashBoard',
  components: {
    GreeMenu,
  },
  data() {
    return {
      PURIFIER,
    };
  },
  computed: {
    ...mapGetters(['ModeTime']),
    ...mapState({
      functype: state => state.functype,
      PurifierTime: state => state.DataObject.PurifierTime,
      PauseStart: state => state.DataObject.PauseStart,
      TmrHour: state => state.DataObject.TmrHour,
      TmrMin: state => state.DataObject.TmrMin,
      RmTmrHour: state => state.DataObject.RmTmrHour,
      RmTmrMin: state => state.DataObject.RmTmrMin,
      WorkStatus: state => state.DataObject.WorkStatus,
      StTmr: state => state.DataObject.StTmr,
      Wash: state => state.DataObject.Wash,
      WashDone: state => state.DataObject.WashDone,
      Dry: state => state.DataObject.Dry,
      TmrOn: state => state.DataObject.TmrOn,
      funBtnList: state => state.funBtnList,

      computedTmrHour: state => {
        const TmrHour = state.DataObject.TmrHour;
        const TmrMin = state.DataObject.TmrMin;
        const hour = new Date().getHours();
        const minute = new Date().getMinutes();
        // 整机时间
        const countTmrTime = TmrHour * 60 + TmrMin;
        // 现在时间
        const countRealTime = hour * 60 + minute;
        // 总的时间
        const countTime = countTmrTime + countRealTime;
        return (countTime / 60) % 24;
      },

      isShowTomorrowText(state) {
        const TmrHour = state.DataObject.TmrHour;
        const TmrMin = state.DataObject.TmrMin;
        // 整机时间
        const countTmrTime = TmrHour * 60 + TmrMin;
        const d = new Date();
        const tmrDate = new Date(countTmrTime * 60 * 1000 + d.getTime());
        const ret = d.getDate() !== tmrDate.getDate();
        return ret;
      },

      computedTmrMin: state => {
        const TmrHour = state.DataObject.TmrHour;
        const TmrMin = state.DataObject.TmrMin;
        const hour = new Date().getHours();
        const minute = new Date().getMinutes();
        // 整机时间
        const countTmrTime = TmrHour * 60 + TmrMin;
        // 现在时间
        const countRealTime = hour * 60 + minute;
        // 总的时间
        const countTime = countTmrTime + countRealTime;
        return countTime % 60;
      },

      isShow() {
        let ret = false;
        const WorkStatus = this.WorkStatus;
        const WashDone = this.WashDone;
        const isPurifying = WorkStatus === WORK_STATUS.PURIFYING;
        if (DW_MID_828B00 === MID && !isPurifying && WashDone === 0) {
          ret = true;
        }
        return ret;
      },

      textWorkStatus() {
        const WorkStatus = this.WorkStatus;
        const PauseStart = this.PauseStart;
        const WashDone = this.WashDone;
        let ret = '';
        if (WashDone === 1) {
          ret = '已完成';
        } else if (PauseStart === 0) {
          ret = '暂停中';
        } else if (WorkStatus === 1) {
          ret = '进水中';
        } else if (WorkStatus === 2) {
          ret = '洗涤中';
        } else if (WorkStatus === 3) {
          ret = '洗涤加热中';
        } else if (WorkStatus === 4) {
          ret = '排水中';
        } else if (WorkStatus === 5) {
          ret = '烘干中';
        } else if (WorkStatus === 6) {
          ret = '保洁中';
        }
        return ret;
      },

      textPauseStart() {
        let ret = '';
        const PauseStart = this.PauseStart;
        if (PauseStart === 1) {
          ret = '暂停';
        } else if (PauseStart === 0) {
          ret = '启动';
        }
        return ret;
      },

      isBlueColor(state) {
        const modeBtnList = state.modeBtnList;
        let ret = true;
        let btn = modeBtnList[0];
        modeBtnList.forEach(ele => {
          if (ele.isActive === true) {
            btn = ele;
          }
        });
        if (btn.modeTheme === 'blue') {
          ret = true;
        } else if (btn.modeTheme === 'yellow') { // 单烘干模式 是黄色
          ret = false;
        }
        return ret;
      }

    }),
  },
  mounted() {
    const canvas = this.$refs.canvas;
    this.handleRenderCanvas({ canvas });
  },
  methods: {
    ...mapActions(['handleRenderCanvas']),
    ...mapActions(['handleClickStart']),
    ...mapActions(['handleClickCancle']),
    ...mapActions(['handleClickPause']),
    ...mapActions(['handleClickConfirm']),
    ...mapActions(['handleDashBoardAppointmentCancel']),
    ...mapActions(['handleClickPurifierBtn']),
    handleClickBtnWidthParams(payload) {
      const { id, isForbided } = payload;
      if (!isForbided) {
        this.handleClickPurifierBtn({ id });
      } else {
        // eslint-disable-next-line no-console
        console.warn('==== btn is forbidden ====');
      }
    },
    cancle() {
      this.$dialog.confirm({
        title: '提示',
        message: '确定取消洗涤吗？',
        cancelButtonText: '否',
        confirmButtonText: '是',
      }).then(() => {
        // on confirm
        this.handleClickCancle();
      }).catch(() => {
        // on cancel
      });
    },
  },
};
</script>

<style scoped>

.invisible {
  visibility: hidden;
}

.absolute-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
}
.dash-board-wrapper {
  display: flex;
  flex: 1;
}

/* 开始时间 start */
.dash-board-start-container {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
}
.dash-board-start-container .dash-board-body .txt-start-time {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #404657;
  align-items: baseline;
  margin-top: 3rem;
}
.dash-board-start-container .dash-board-body .txt-start-time .txt-time-num {
  font-size: 8rem;
  font-family: appleUltralight;
}
.dash-board-start-container .dash-board-body .txt-start-time .txt-time-unit {
  font-size: 2rem;
}
/* 开始时间 end */

/* 结束时间 start */
.surplus-container .dash-board-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #404657;
}
.txt-title {
  margin-top: 6rem;
  font-size: 2rem
}
.txt-time {
  position: relative;
  font-size: 4rem;
}
.txt-time .txt-time-num {
  font-size: 5rem;
  font-family: appleUltralight;
}
.txt-time .txt-time-unit {
  position: absolute;
  right: -4.2rem;
  bottom: 1.4rem;
  font-size: 2rem;
}
.txt-working-time {
  display: flex;
  justify-content: center;
  align-items: baseline;
}
.txt-working-time .txt-time-num {
  font-size: 5rem;
  font-family: appleUltralight;
}
.txt-working-time .txt-time-unit {
  font-size: 2rem;
}
.txt-status {
  font-size: 2.2rem;
  height: 3.3rem;
}
.dash-board-footer {
  display: flex;
  flex: row;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  padding: 0rem 2rem;
}
.dash-board-footer .button{
  display: flex;
  flex-basis: 35%;
  justify-content: center;
  align-content: center;
  margin: 0 1.45rem;
  font-size: 1.8rem;
  line-height: 4rem;
  background: #fff;
  box-shadow: 0 2px 13px rgba(0, 0, 0, 0.1);
  border-radius: 2rem;
  color: #404657;
}
.dash-board-footer .button:active {
  background: #f8f8f8;
}
.dash-board-footer .button.btn-yellow {
  background: #f6b039;
  color: #fff;
}
.dash-board-footer .button.btn-blue {
  background: #52b2e8;
  color: #fff;
}
.dash-board-footer .button.disabled {
  color: #9fa2ab;
}
.dash-board-footer .button.disabled:active {
  background: #fff;
}
.button.btn-start {
  flex-basis: 45%;
  font-size: 2.5rem;
  border-radius: 4rem;
  line-height: 4.5rem;
  color: #404657;
}

/* 结束时间 end */
.appointment-wrapper {
  display: flex;
  flex: 1;
}
.appointment-container {
  display: flex;
  flex: 1;
  flex-direction: column;
}
.appointment-container .title {
  display: flex;
  padding: 1rem 2rem;
}
.appointment-container .title .font-title {
  font-size: 1.5rem;
  color: #404657;
}
.appointment-container .time-txt {
  font-size: 8rem;
  text-align: center;
  font-family: appleUltralight;
}
.appointment-container .time-txt span {
  vertical-align: text-bottom;
}
.button-container {
  display: flex;
  justify-content: center;
  align-content: center;
}
.button-container .button{
  display: flex;
  flex-basis: 38%;
  justify-content: center;
  align-content: center;
  margin: 0 1.45rem;
  font-size: 1.8rem;
  line-height: 4rem;
  background: #fff;
  box-shadow: 0 2px 13px rgba(0, 0, 0, 0.1);
  border-radius: 2rem;
  flex-basis: 50%;
  font-size: 2.5rem;
  border-radius: 4rem;
  line-height: 4.5rem;
  color: #404657;
}
.button-container .button:active {
  background: #f8f8f8;
}
@media screen and (max-width: 320px) {
  .dash-board-start-container .dash-board-body .txt-start-time { margin-top: 2rem; }
  .dash-board-footer { margin-top: 0; }
}
.toolbar-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 2rem;
}
.item-container .item-img-container {
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  margin-bottom: 0.5rem;
  margin: auto;
}
.item-container .item-img-container .img {
  height: 5rem;
  width: 5rem;
}
.item-container .name {
  width: 5rem;
  padding-top:0.5rem;
  font-size: 1.3rem;
  text-align: center;
}
.normal {
  background: #fff;
}
.active {
  background: #52b2e8;
}
</style>
