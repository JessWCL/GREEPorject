<!--
 * @Author: Jerry-Rain
 * @Date: 2019-08-09 14:43:49
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2019-12-14 14:11:01
 * @Description: 报告可见管理
 -->
<template>
  <gree-view class="page-manage-auth">
    <gree-header
      :style="{ backgroup: 'white' }"
      :left-options="{ preventGoBack: true }"
      @on-click-back="goBack()"
    >
      报告可见人
      <span slot="right" @click="saveAuth()">保存</span>
    </gree-header>
    <gree-page class="page-content">
      <!-- <gree-list>
        <gree-list-item title="黄倬莹" media-item>
          <img :src="headIcon" slot="media"/>
          <span slot="after">
            <radio></radio>
          </span>
        </gree-list-item>
        <gree-list-item title="渣男中" media-item>
          <img :src="headIcon" slot="media" />
        </gree-list-item> -->

        <gree-check-list :options="personList" v-model="selectList" :is-slot-scope="true">
          <template slot-scope="{ option }">
            <img :src="headIcon"/>
            <span>{{ option.text }}</span>
            <!-- <p>{{ option.text }}</p> -->
          </template>
        </gree-check-list>
        
      <!-- </gree-list> -->
    </gree-page>
  </gree-view>
</template>

<script>
import { Header, Field, InputItem, List, Item, CheckList } from "gree-ui"
import { mapState, mapMutations, mapActions } from "vuex"

export default {
  name: "FirstIn",
  components: {
    [Header.name]: Header,
    [Field.name]: Field,
    [InputItem.name]: InputItem,
    [List.name]: List,
    [Item.name]: Item,
    [CheckList .name]: CheckList ,
  },
  data() {
    return {
      head_bg: require("@/assets/img/bg_header_on.png"),
      headIcon: require("@/assets/img/sleeping.png"),
      selectList: ['0'],
      personList: [
        {
          value: '0',
          text: '简瑞瑞',
        },
        {
          value: '1',
          text: '温忠忠',
        },
      ]
    }
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      mac: state => state.mac
    })
  },
  watch: {},
  methods: {
    saveAuth() {
      console.log('保存权限', this.selectList);
      this.$router.push({ name: 'Home' })
    },
    goBack() {
      this.$router.go(-1)
    },
    moreInfo() {
      editDevice(this.mac)
    }
  }
}
</script>

<style lang="scss">
.page-manage-auth {
  .gree-header {
    backgroup: white;
    height: 120px;
    .gree-header-left {
      color: black;
    }
    .gree-header-title {
      color: black;
    }
    .gree-header-right {
      color: black;
      right: 30px;
    }
  }

  .page-content {
    padding-bottom: 0;
    .header-block {
      height: 450px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100% 100%;
      .header-content {
      }
    }

    .list {
      margin: 0;
      .item-content {
        border-bottom: 1px solid #ededed;
        .item-inner {
          min-height: 180px;
          .item-title {
            font-size: 46px;
          }
        }
        :after {
          display: none;
        }
      }
    }
    img {
        width: 100px;
        margin-left: 40px;
    }
    .gree-cell-item-content {
      display: flex;
      align-items: center;
      span {
        font-size: 46px;
        margin-left: 25px;
      }
    }
    .gree-icon.icon-font.md {
      font-size: 65px;
      margin-right: 40px;
    }
  }
}
</style>
