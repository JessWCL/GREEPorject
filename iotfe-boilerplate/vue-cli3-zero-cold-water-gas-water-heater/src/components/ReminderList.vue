<template>
  <div id="ReminderList">
    <!-- 提醒列表 -->
    <gree-list>
      <gree-list-item
        media-item
        :style="{backgroundImage:'url(' + bgUrl + ')'}"
        v-for="(item, index) in text"
        :key="index"
      >
        <!-- 每条提醒的图片logo -->
        <div
          class="logo"
          slot="media"
        >
          <img
            :src="imgUrl"
            width="79"
          />
          <div class="vertical-bar"></div>
        </div>
        <!-- 每条提醒的文案 -->
        <div slot="title">
          <div class="text">
            <div class="title-text">{{ item.title }}</div>
            <div class="main-text">{{ item.text }}</div>
            <div
              v-if="item.operationText"
              class="operation-text"
              @click="changeOperation(item.operationText)"
            >
              {{ item.operationText }}
              <gree-icon
                name="arrow-right"
                size="sm"
              ></gree-icon>
            </div>
          </div>
        </div>
      </gree-list-item>
    </gree-list>
  </div>
</template>

<script>
import { List, Item, Icon } from 'gree-ui';

export default {
  name: 'PopupWindow',
  components: {
    [List.name]: List,
    [Item.name]: Item,
    [Icon.name]: Icon
  },
  props: {
    // 内容文本，title--标题；text--具体描述；operationText--右下角操作提示；
    text: {
      type: Array,
      default() {
        return [];
      }
    },
    // 背景图
    bgUrl: {
      type: String,
      default() {
        return '';
      }
    },
    // 提示图，logo图
    imgUrl: {
      type: String,
      default() {
        return '';
      }
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    changeOperation(val) {
      console.log(val);
    }
  }
};
</script>

<style lang="scss">
#ReminderList {
  .list {
    margin-top: 50px;
    margin-left: 53px;
    margin-right: 53px;
    > ul {
      background: transparent;
      > li {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        margin-bottom: 40px;
        border-radius: 20px;
        min-height: 380px;
        .item-content {
          min-height: 380px;
          padding-left: 30px;
          .item-media {
            .logo {
              // width: 250px;
              // padding-right: 18px;
              display: flex;
              align-items: center;
            }
            .vertical-bar {
              width: 18px;
              height: 130px;
              border-right: 1px solid #ffffff;
              // background-color: aquamarine;
            }
          }
          .item-inner {
            padding-left: 18px;
            .item-title {
              width: 100%;
              height: 100%;
              .text {
                width: 100%;
                height: 100%;
                color: #ffffff;
                .title-text {
                  margin-top: 80px;
                  font-size: 0.42rem;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
                .main-text {
                  width: 100%;
                  height: 108px;
                  margin-top: 30px;
                  font-size: 0.38rem;
                  white-space: normal;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  overflow: hidden;
                  // word-break: break-all;
                  // display: -webkit-box;
                  // -webkit-box-orient: vertical;
                }
                .operation-text {
                  // width: 100%;
                  // height: 100%;
                  font-size: 0.38rem;
                  margin: 10px 0 0 390px;
                }
              }
            }
          }
        }
      }
    }
    ul::before {
      height: 0;
    }
    ul::after {
      height: 0;
    }
  }
}
</style>
