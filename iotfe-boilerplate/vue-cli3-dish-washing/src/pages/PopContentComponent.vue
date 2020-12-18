<template>
  <transition name="fadeInUp">
    <div
      v-if="isShow"
      class="fixed-bottom pop-container">
      <div
        class="pop-header"
        @click="togglePop()"
      >
        <img
          class="btn-back"
          src="../assets/images/icon_PopBtn.png">
      </div>
      <div class="pop-body">
        <div
          :key="index"
          v-for="(item, index) in btnList"
          class="item"
          :class="{
            none: !item.show,
            forbided: item.isForbided || ( functype && item.isForbidedInFunctype )
          }"
          :style="{ order: item.order }">
          <div
            class="img-container"
            :class="[
              {
                forbided: item.isForbided || ( functype && item.isForbidedInFunctype ),
                active: item.isActive,
                normal: item.isNormal,
              },
              item.btnClassName,
            ]"
            @click="handleClickBtnWidthParams({ id: index, isForbided: item.isForbided })">
            <img
              v-if="item.isForbided || ( functype && item.isForbidedInFunctype)"
              :src="item.forbidedIconSrc"
              class="img">
            <img
              v-else-if="item.isActive"
              :src="item.activeIconSrc"
              class="img">
            <img
              v-else-if="item.isNormal"
              :src="item.normalIconSrc"
              class="img">
            <img
              v-else
              :src="item.normalIconSrc"
              class="img">
          </div>
          <span
            v-if="item.handleDescFunName != undefined"
            class="name"
            :class="{ more: item.handleDescFunName }"
            @click="handleMoreFun({ funDescName: item.handleDescFunName, btn: item })">
            {{ item.name }}
          </span>
          <span
            v-else
            class="name">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'PopContentComponent',
  props: {
    isShow: {
      type: Boolean,
      required: true,
    },
  },
  computed: mapState({
    functype: state => state.functype,
    btnList: state => state.btnListObj.btnList,
  }),
  methods: {
    ...mapActions(['togglePop']),
    ...mapActions(['handleClickBtn']),
    ...mapActions(['handleMoreFun']),
    handleClickBtnWidthParams(payload) {
      const { id, isForbided } = payload;
      if (!isForbided) {
        this.handleClickBtn({ id });
      } else {
        // eslint-disable-next-line no-console
        console.warn('==== btn is forbidden ====');
      }
    },
  },
};
</script>

<style scoped>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.fadeInUp-enter-active, .fadeInUp-leave-active {
  transition: all .3s ease-in-out;
}
.fadeInUp-enter, .fadeInUp-leave-to {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}

.pop-container {
  display: flex;
  flex-direction: column;
  background: #fff;
}
.pop-container .pop-header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0 1rem;
  margin-bottom: 1rem;
}
.pop-container .pop-header:active {
  background: #f8f8f8;
}
.pop-container .pop-header .btn-back {
  width: 2rem;
}
.pop-container .pop-body {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.pop-container .pop-body .item.none {
  display: none;
}
.pop-container .pop-body .item.forbided .name {
  color: #cdcdcd;
}
.pop-container .pop-body .item {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  /* flex: 1; */
  flex-basis: 25%;
  justify-content: center;
  align-items: center;
}
.pop-container .item .img-container {
  overflow: hidden;
  display: flex;
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
}
.pop-container .item .img-container.normal:active {
  background: #cdcdcd;
}
.pop-container .item .img-container.normal.forbided:active {
  background: #ffffff;
}
.pop-container .item .img-container.normal {
  border: 1px solid #cdcdcd;
}
.pop-container .item .img-container.btn-blue.active {
  background: #52b2e8;
}
.pop-container .item .img-container.btn-yellow.active {
  background: #f6b039;
}
.pop-container .item .img-container.forbided {
  border: 1px solid #cdcdcd;
}
.pop-container .item .img {
  max-width: 100%;
  max-height: 100%;
}
.pop-container .item .name {
  position: relative;
  margin: 0.5rem 0 1.7rem;
  min-width: 4rem; /* easier to click */
  max-width: 8rem;
  line-height: 2rem;
  font-size: 1.2rem;
  text-align: center;
  color: #707070;
}
.pop-container .item .name.more:hover {
  color: #52b2e8;
}
.pop-container .item .name.more::after {
  content: '';
  position: absolute;
  right: 0rem;
  bottom: 20%;
  display: inline-block;
  border: 0.3rem solid transparent;
  border-right: 0.3rem solid #707070;
  border-bottom: 0.3rem solid #707070;
}
.pop-container .item .name.more:hover::after {
  border-right: 0.3rem solid #52b2e8;
  border-bottom: 0.3rem solid #52b2e8;
}

</style>
