<template>
  <main :class="{'new-error': type === 'malfunction'}">
    <div
      class="gree-new-error"
      v-if="type === 'malfunction'"
    >
      <!-- 新版故障 -->
      <gree-list>
        <gree-list-item
          media-item
          :style="{backgroundImage:'url(' + bgUrl + ')'}"
          v-for="(item, index) in text"
          :key="index"
        >
          <div
            class="logo"
            slot="media"
          >
            {{ item.code }}
            <div class="divider"></div>
          </div>
          <p slot="title">{{ item.headtitle }}{{ item.title }}</p>
          <p slot="after">{{ item.subtitle }}{{ item.text }}</p>
        </gree-list-item>
      </gree-list>
    </div>
    <div
      class="gree-error"
      :style="{backgroundImage:'url(' + bgUrl + ')'}"
      v-else-if="type === 'offline' || type === 'fault'"
    >
      <template v-if="type === 'offline'">
        <!-- 离线 -->
        <div class="gree-offline-content">
          <div
            class="gree-offline-pic"
            :style="{backgroundImage:'url(' + imgUrl + ')'}"
          ></div>
          <div class="gree-offline-text">
            <span v-if="text">{{ text }}</span>
            <slot></slot>
          </div>
        </div>
      </template>
      <template v-else-if="type === 'fault'">
        <!-- 单错误 -->
        <div
          class="single-error"
          v-if="!isMulti"
        >
          <div
            class="gree-error-image"
            :style="{backgroundImage:'url(' + imgUrl + ')'}"
          ></div>
          <section
            v-for="(item, index) in text"
            :key="index"
          >
            <p v-if="item.title">{{ item.title }}</p>
            <p v-if="item.text">{{ item.text }}</p>
          </section>
        </div>
        <!-- 多错误 -->
        <div
          class="multi-error"
          v-else
        >
          <section
            v-for="(item, index) in text"
            :key="index"
          >
            <h3>{{ item.title }}</h3>
            <p>{{ item.subtitle }}</p>
            <p>{{ item.text }}</p>
          </section>
        </div>
        <div
          class="gree-result-action-bar"
          v-if="buttons.length"
        >
          <gree-action-bar :actions="buttons"></gree-action-bar>
        </div>
      </template>
    </div>
  </main>
</template>

<script>
import { List, Item, ActionBar } from 'gree-ui';

export default {
  name: 'Errorpage',
  components: {
    [ActionBar.name]: ActionBar,
    [List.name]: List,
    [Item.name]: Item
  },
  props: {
    // 类型
    type: {
      type: String,
      default: 'fault', // fault、offline、malfunction
      validator: val => {
        return ['fault', 'offline', 'malfunction'].indexOf(val) !== -1;
      }
    },
    // 背景图
    bgUrl: {
      type: String,
      default: ''
    },
    // 提示图
    imgUrl: {
      type: String,
      default: ''
    },
    // 文本内容
    text: {
      type: [String, Array],
      default: ''
    },
    // 是否多故障
    isMulti: {
      type: Boolean,
      default: false
    },
    // 底部按钮
    buttons: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style lang="stylus">
main
  box-sizing border-box
  height 100%
  position relative
  z-index 1

  &.new-error
    height auto

.gree-new-error
  .list
    margin-top 50px
    margin-left 53px
    margin-right 53px

    ul
      background transparent
      remove-hairline(top)
      remove-hairline(bottom)

      li
        background-repeat no-repeat
        background-size cover
        background-position center
        margin-bottom 40px
        border-radius 20px

        .item-content
          min-height 384px

          .item-media
            .logo
              position relative
              display flex
              align-items center
              justify-content center
              width 180px
              height 180px
              color #fff
              font-size 88px
              border 4px solid #fff
              border-radius 100%

              .divider
                position absolute
                height 130px
                width 100%
                top 25px
                left 0

                &::before, &::after
                  position absolute
                  content ''
                  width 1px
                  // height 130px
                  left 221px
                  border-left 1px solid #fff

                &::before
                  bottom 50%
                  top 0

                &::after
                  top 50%
                  bottom 0

          .item-inner
            min-height 384px
            display block
            align-self stretch
            padding-top 120px
            margin-left 70px
            remove-hairline(top)

            .item-title
              color #fff
              font-size 42px

            .item-after
              color #fff
              font-size 33px
              padding-top 40px
              padding-left 0

.gree-error
  display flex
  align-items center
  justify-content center
  flex-direction column
  width 100%
  height 100%
  text-align center
  background-repeat no-repeat
  background-size 100% 100%

  .gree-offline-content
    position absolute
    box-sizing border-box
    width 100%
    height 400px
    top 50%
    left 0
    transform translateY(-50%)

    .gree-offline-pic
      position absolute
      width 312px
      height 63px
      left 50%
      top 80px
      transform translateX(-50%)
      background-size 100% 100%

    .gree-offline-text
      position absolute
      top 157px
      width 100%
      text-align center
      padding-top 30px
      font-size 43px

  .single-error, .multi-error
    font-size 42px
    text-align center

    .gree-error-image
      display flex
      align-items center
      justify-content center
      width 333px
      height 333px
      margin-bottom 76px
      background-repeat no-repeat
      background-size 100% 100%

    p
      margin-bottom 30px

      &:nth-of-type(2n)
        margin-bottom 60px

  .multi-error
    position absolute
    top 200px
    left 120px
    width 100%
    height 75%
    text-align left
    overflow-x hidden

    h3
      color color-danger
      font-size font-heading-large
      margin-bottom 66px

    p
      &:nth-of-type(1)
        margin-bottom 34px

      &::nth-of-type(2)
        margin-bottom 76px

  .gree-result-action-bar
    display flex

    .gree-action-bar
      background-color transparent
      padding 0 76px 78px 77px

      .gree-button
        height 140px
        border-radius grid-gap
        color color-dark
        font-size font-heading-normal
        background-color color-light
        box-shadow 0px 2px 6px rgba(2, 8, 20, 0.1), 0px 1px 2px rgba(2, 8, 20, 0.08)

        &::after
          border none
</style>
