<template>
  <div
    v-show="!Pow"
    class="pow-container">
    <div class="btn-close">
      <transition name="fade">
        <div class="txt">已关机</div>
      </transition>
      <img
        class="img none"
        :src="closeImgSrc">
    </div>
    <!-- 菜单 start -->
    <div class="menu-container">
      <div
        :key="index"
        v-for="(item, index) in menuBtnList"
        class="item">
        <div
          v-if="index === 0"
          class="img-container"
          @click="handlePowOn()">
          <img
            class="img"
            :src="item.forbidedIconSrc">
        </div>
        <div
          v-else
          class="img-container">
          <img
            class="img"
            :src="item.forbidedIconSrc">
        </div>
        <span class="name">{{ item.name }}</span>
      </div>
    </div>
    <!-- 菜单 end -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import _closeBtnImgSrc from '../assets/images/close.png';

export default {
  name: 'GreePow',
  data() {
    return {
      closeImgSrc: _closeBtnImgSrc,
    };
  },
  computed: mapState({
    menuBtnList: state => state.device.menuBtnList,
    Pow: state => state.device.DataObject.Pow,
  }),
  methods: {
    ...mapActions('device', ['handlePowOn']),
  },
};
</script>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.none {
  display: none;
}
.pow-container {
  z-index: 100;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../assets/images/closeBG.png');
  background-size: cover; /* fixed iPhoneX */
}
.btn-close {
  width: 35%;
}
.btn-close .txt {
  font-size: 3.5rem;
  text-align: center;
  color: #989898;
}
.btn-close .img {
  max-width: 100%;
}

.menu-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.menu-container .item:not(:first-child) .name {
  color: #989898;
}
.menu-container .item {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
}
.menu-container .item .img-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  box-shadow: 0 2px 13px rgba(0, 0, 0, 0.1);
  background: #fff;
}
.menu-container .item:first-child .img-container:active {
  background: #f8f8f8;
}
.menu-container .item .img {
  width: 3rem;
  height: 3rem;
}
.menu-container .item .name {
  font-size: 1.3rem;
  text-align: center;
  color: #404657;
}
</style>
