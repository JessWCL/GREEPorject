<template>
  <!-- 在控制页面才显示 -->
  <section>
    <ul class="list-unstyled status-container">
      <transition-group
        tag="li"
        name=""
        v-for="(item, index) in statusImgList"
        :key="index"
        :style="{ order: item.txtActiveIcon ? 1 : 0 }"
        :class="{ 'd-none': !item.show }"
      >
        <span
          class="status"
          :key="index">
          <img
            class="img"
            :src="item.activeIconSrc">
          <span v-if="item.txtActiveIcon">{{ item.txtActiveIcon }}</span>
        </span>
      </transition-group>
    </ul>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import { WORK_STATUS, FUN_BTNS } from '../api/constants';
import { formatPurifierTime } from '../utils/index';

export default {
  name: 'GreeStatus',
  computed: {
    ...mapState({
      Purifier: state => state.device.DataObject.Purifier,
      WorkStatus: state => state.device.DataObject.WorkStatus,
      PurifierTime: state => state.device.DataObject.PurifierTime,
      statusImgList: state => {
        const { WorkStatus, PurifierTime, WashDone } = state.device.DataObject;
        const _vModeTime = formatPurifierTime(PurifierTime);
        const isPurifying = WashDone === 0 && WorkStatus !== WORK_STATUS.PURIFYING;
        const text = isPurifying === true ? `待保洁${_vModeTime / 60}小时` : '';

        const ret = [];
        const funBtnList = state.device.funBtnList;
        funBtnList.forEach((ele, index) => {
          const btn = Object.assign({}, ele);
          if (ele.isActive === true) {
            if (index === FUN_BTNS.PURIFIER) {
              btn.txtActiveIcon = text;
            }
            ret.push(btn);
          }
        });
        return ret;
      },
    }),
  },

  watch: {
    WorkStatus() {
      // this.setPurifierTimeTips();
    },
    PurifierTime() {
      // this.setPurifierTimeTips();
    },
  },

  methods: {
    // ...mapMutations('device', ['setPurifierTimeTips']),
  },
};
</script>

<style scoped>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-enter-active, .slide-leave-active {
  transition: all .3s ease;
}
.slide-enter, .slide-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

.list-complete-item {
  transition: all 1s ease-in-out;
}
.list-complete-enter, .list-complete-leave-to {
  opacity: 0;
  margin-right: 1rem;
}

.status-container {
  position: absolute;
  top: 3rem;
  left: 0;
  right: 0;
  display: flex;
  padding-left: 0.5rem;
}
.status-container span {
  color: #fff;
  font-size: 1.2rem;
}

.status-container .img {
  width: 3.5rem;
  height: 3.5rem;
  vertical-align: middle;
}
</style>
