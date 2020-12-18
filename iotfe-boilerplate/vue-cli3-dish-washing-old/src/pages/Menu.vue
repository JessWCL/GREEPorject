<template>
  <transition name="fade">
    <!-- 菜单 start -->
    <div class="menu-container">
      <div
        :key="index"
        v-for="(item, index) in menuBtnList"
        class="item">
        <div
          class="img-container"
          :class="{
            'is-forbided': item.isForbided
          }"
          @click="handleClick(item)">
          <img
            class="img"
            v-if="item.isForbided"
            :src="item.forbidedIconSrc">
          <img
            class="img"
            v-else
            :src="item.normalIconSrc">
        </div>
        <span
          class="name"
          :class="{
            'is-forbided': item.isForbided
          }"
        >{{ item.name }}</span>
      </div>
    </div>
    <!-- 菜单 end -->
  </transition>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { menuBtnList } from '@/api/index';

export default {
  name: 'Menu',

  data() {
    return {
      menuBtnList,
    };
  },

  computed: {
    ...mapState({
      Mod: state => state.device.DataObject.Mod,
    }),
  },

  watch: {
    Mod() {
      this.parseMenuBtnAndForbidden();
    }
  },

  mounted() {
    this.parseMenuBtnAndForbidden();
  },

  methods: {
    ...mapMutations('device', ['parseMenuBtnAndForbidden']),
    ...mapActions('device', ['handleFun']),

    handleClick(item) {
      if (item.isForbided) {
        console.log('=== menu btn is forbided ===');
      } else {
        this.handleFun({ funName: item.handleFunName });
      }
    }
  },
};
</script>

<style scoped>
.fade-enter-active {
  transition: all .3s ease-in-out;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
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
.menu-container .item .img-container.is-forbided:active {
  background: #ffffff;
}
.menu-container .item .img-container:active {
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
.menu-container .item .name.is-forbided {
  color: #989898;
}
</style>
