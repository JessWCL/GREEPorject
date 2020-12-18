<template>
  <transition name="fade">
    <div 
      class="myToast-wrapper" 
      :class="{
        'with-mask': hasMask,
      }"
      v-show="visible"
    >
      <div class="myToast-mask"></div>
      <div class="myToast-box" :class="position | toLowerCase">
        <div class="myToast-content" >
          <div v-if="content" v-html="content">
          </div>
          <slot v-if="$slots.default">
            My Toast!
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "MyToast",
  filters: {
    toLowerCase(val) {
      return val.toLowerCase();
    }
  },
  props: {
    content: {
      type: [String],
      default: '',
    },
    duration: {
      type: Number,
      default: 2000,
    },
    hasMask: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
      default: 'center',
    }
  },
  data() {
    return {
      visible: true,
      hideAnimateTimer: null,
    };
  },
  beforeDestroy() {
    this.hideAnimateTimer && clearTimeout(this.hideAnimateTimer);
  },
  methods: {
    show() {
      if (this.hideAnimateTimer) {
        clearTimeout(this.hideAnimateTimer);
      }
      
      this.visible = true;

      if (this.duration) {
        this.hideAnimateTimer = setTimeout(() => {
          this.hide();
          this.hideAnimateTimer = null;
        }, this.duration);
      }
    },
    hide() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss">
.myToast-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  z-index: 9999;
  .myToast-mask {
    display: none;
    pointer-events: auto;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0, .05);
    position: absolute;
  }
  &.hide {
    display: none;
  }
  &.with-mask {
    .myToast-mask {
      display: block;
    }
  }

  .myToast-box {
    pointer-events: auto;
    position: absolute;
    padding: 3%;
    background-color: rgba(0,0,0,.4);
    border-radius: 10px;
    max-width: 50vw;
    max-height: 90vh;
    box-sizing: border-box;
    overflow: auto;
    transition: opacity 400ms;
    &.center {
      top: 50%;
      bottom: initial;
      left: 50%;
      right: initial;
      transform: translate(-50%);
    }
    &.bottom {
      top: initial;
      bottom: 20%;
      left: 50%;
      right: initial;
      transform: translate(-50%, 0);
    }
    &.top {
      top: 20%;
      bottom: initial;
      left: 50%;
      transform: translate(-50%, 0);
    }
    &.hide {
      opacity: 0;
    }
    .myToast-content {
      color: #fff;
      overflow-wrap: break-word;
    }
  }
}
</style>
<style lang='scss' >
.fade-enter {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-enter-active {
  transition: all .3s ease;
}
.fade-leave {
  opacity: 0;
}
.fade-leave-to {
  opacity: 0;
}
.fade-leave-active {
  transition: all .3s ease;
}
</style>
