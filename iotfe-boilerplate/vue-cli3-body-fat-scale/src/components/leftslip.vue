<template>
  <div class="gree-leftslip">
    <div class="gree-leftslip-item" ref="slipItem" :class="{ 'leftslip-open': isOpen }">
      <div class="gree-leftslip-item-main" @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)">
        <slot name="slip-main"></slot>
      </div>

      <div class="gree-leftslip-item-btn" ref="right">
        <slot name="slipbtns">
          <!-- <a class="gree-delet-btn" @click.prevent="onlyDelClick($event)" v-if="onlyDelBtn">删除</a> -->
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GreeLeftslip',
  props: {
    isClickBack: {
      type: Boolean,
      default: true
    },
    rightWidth: {
      type: [Number, String],
      default: '0.8'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: [String, Number, Array]
  },
  data() {
    return {
      startX: 0,
      startY: 0,
      moveX: 0,
      moveY: 0,
      buttonWidth: 0,
      pageWidth: null,
      startPos: 0,
      startLeft: 0,
      startRightW: 0,
      isOpen: false,
      scrollTop: 0,
      oldScrollTop: 0,
      lock: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      for (var slot of this.$slots.slipbtns) {
        this.buttonWidth = this.buttonWidth + slot.elm.offsetWidth;
      }
    });
    this.pageWidth = document.documentElement.clientWidth;
    this.sliderEle = this.$refs.slipItem;
  },
  beforeDestroy() {
    // 移除监听
    window.removeEventListener('scroll', this.handleScroll, true);
  },
  methods: {
    handleRestet() {
      var slip = document.getElementsByClassName('leftslip-open');
      if (slip) {
        this.restSlide();
      }
    },
    handleScroll() {
      window.addEventListener('scroll', () => {
        this.scrollTop = window.scrollY;
      });
    },
    touchStart(e) {
      if (this.disabled) {
        return false;
      }
      let parentElement = e.currentTarget.parentElement;
      let slip = [];
      slip = document.getElementsByClassName('leftslip-open');
      if (slip) {
        if (parentElement.dataset.type === 1) {
          return;
        }
        this.restSlide();
      }
      if (e.touches.length === 1) {
        this.startX = e.touches[0].pageX;
        this.startY = e.touches[0].pageY;
      }
      const transform = this.sliderEle.style.transform;
      this.startLeft = Number(
        transform ? transform.split('(')[1].split('px')[0] : 0
      );
      this.startRightW =
        this.startLeft < 0
          ? Number(this.$refs.right.style.width.split('px')[0])
          : 0;
    },
    touchMove(e) {
      if (this.disabled) {
        return false;
      }
      // eslint-disable-next-line no-unused-vars
      let parentElement = e.currentTarget.parentElement;
      let disX = e.touches[0].pageX - this.startX; // >0 右滑，<0 左滑
      let disY = e.touches[0].pageY - this.startY;
      if (e.touches.length === 1) {
        if (Math.abs(disY) < 5) {
          // console.log(disX, disY)
          if (disX > 0 || (disX > 0 && this.startLeft >= 0)) {
            // 禁止右滑
            return false;
          } else {
            this.doSlide(-this.buttonWidth, true); // 最大滑动距离为右侧宽度
          }
        }
      }
    },
    touchEnd(e) {
      if (this.disabled) {
        return false;
      }
      let parentElement = e.currentTarget.parentElement;
      const disX = e.changedTouches[0].pageX - this.startX; // >0 右滑，<0 左滑
      let distance;
      // console.log(1, disX, this.isClickBack)
      if (!this.isClickBack && disX === 0) {
        // 点击时不收起右侧
        // console.log(2, disX, this.isClickBack)
        return false;
      } else {
        if (-disX > 50) {
          // 向左滑动超过阙值时,右侧滑出固定距离
          distance =
            this.buttonWidth > this.pageWidth
              ? this.pageWidth * Number(this.rightWidth)
              : this.buttonWidth;
          parentElement.className = 'gree-leftslip-item leftslip-open';
          parentElement.dataset.type = 1;
        } else {
          // 向左滑动未超过阙值，或向右滑动时，回原位
          distance = 0;
          parentElement.className = 'gree-leftslip-item';
          parentElement.dataset.type = 0;
        }
        // console.log(3, disX, this.isClickBack)
        this.doSlide(-distance, true);
      }
    },
    doSlide(distance, animate = false) {
      this.sliderEle.style.transform = `translateX(${distance}px)`;
      this.$refs.right.style.width = -distance + 'px';
      this.sliderEle.style.transition = animate ? 'transform .5s' : 'initial';
      this.$refs.right.style.transition = animate ? 'width .5s' : 'initial';
    },
    restSlide() {
      let listItems = document.querySelectorAll(
        '.gree-leftslip-item.leftslip-open'
      );
      // 复位
      for (let i = 0; i < listItems.length; i++) {
        // listItems[i].style = 'transform:translateX(0px)';
        listItems[i].setAttribute('style', 'transform:translateX(0px)');
        listItems[i].dataset.type = 0; // 是否展开标志位默认0，左滑展开为1，右滑隐藏为0
        listItems[i].className = 'gree-leftslip-item';
        this.isOpen = false;
      }
    },
    $_switch(name, expanded) {
      this.$parent.$_switch(name, expanded);
    }
  }
};
</script>

<style lang="stylus" scoped>
.gree-leftslip
  position relative
  overflow hidden

  &:first-child .nut-slip-main
    border-top 1px solid #d8d8d8

  .slip-main
    padding 30px
    position relative
    overflow hidden
    display flex
    border-bottom 1px solid #d8d8d8
    background #fff
    font-size 40px

  .gree-leftslip-item
    transition all 0.6s ease

  .delbtn
    position absolute
    right -152px
    top 0
    min-width 140px
    height 100%
    display flex
    align-items center
    justify-content center
    // transform: translateX(100%);
    background #ff4949
    color #fff
    padding 0 5px
    font-size 34px

    span
      // width: 40px;
      display flex
      position absolute
      right 0
      width 100%
      align-items center
      justify-content center
      height 100%

  .slipbtns
    position absolute
    right 0
    top 0
    // width: 80px;
    height 100%
    display flex
    align-items center
    justify-content center
    transform translateX(100%)

    a
      display flex
      width 110px
      background #ff4949
      color #fff
      height 100%
      padding 0 5px
      font-size 34px
      align-items center
      justify-content center
      text-align center
</style>
