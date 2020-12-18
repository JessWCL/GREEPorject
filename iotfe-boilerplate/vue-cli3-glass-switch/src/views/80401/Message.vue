<!--
 * @Author: Jerry-Rain
 * @Date: 2020-05-11 15:13:54
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-09-14 14:26:34
 * @Description: 留言页面，墨水瓶款，好像凉凉了
 -->

<template>
  <gree-view class="page-message">
    <gree-header
      :left-options="{ preventGoBack: true }"
      @on-click-back="goBack()"
    >
      留言
      <div slot="right" @click="submit()">
        发布
      </div>
    </gree-header>
    <gree-page class="page-content">
      <div class="tip">设置好的留言将同步显示在开关屏幕上</div>
      <div class="box" id="assess">
        <van-cell-group>
          <van-field
            v-model="content"
            type="textarea"
            rows="9"
            autosize
            placeholder="请输入留言（最多输入20字）"
            :maxlength="len"
            :border="false"
            :show-word-limit="true"
            class="txt-area"
          ></van-field>
          <div class="limit_zoom">
            <span class="limit_txt">{{ remnant }}/20</span>
            <div class="clean" @click="clean()">清空</div>
          </div>
        </van-cell-group>
      </div>
    </gree-page>
  </gree-view>
</template>

<script>
import { Header, Field, InputItem } from 'gree-ui';
import { mapState } from 'vuex';

export default {
  name: 'Message',
  components: {
    [Header.name]: Header,
    [Field.name]: Field,
    [InputItem.name]: InputItem
  },
  data() {
    return {
      content: '', // 输入内容
      remnant: 20, // 字数剩余，
      len: 40 // 字数限制
    };
  },
  computed: {
    ...mapState({
      mac: state => state.mac
    })
  },
  watch: {
    content(newv) {
      const nowLen = this.getByteLen(newv);
      console.log('newLen', nowLen);
      if (nowLen > 20) {
        this.remnant = 0;
        console.log('this.content.length', this.content.length);
        this.len = this.content.length - 1;
        this.content = this.content.substring(0, this.len);
      } else {
        this.remnant = 20 - Math.ceil(this.getByteLen(this.content));
        this.len = 40;
      }
    }
  },
  methods: {
    // 计算字符 汉字1 数字字母 0.5
    getByteLen(val) {
      let len = 0;
      for (let i = 0; i < val.length; i++) {
        const a = val.charAt(i);
        if (a.match(/[^\x00-\xff]/gi) != null) {
          len += 1;
        } else {
          len += 0.5;
        }
      }
      return len;
    },
    // 清除输入输入内容
    clean() {
      this.content = '';
    },
    // 提交意见反馈
    submit() {
      // TODO: 添加提交的接口
      console.log('发布');
    },
    goBack() {
      this.$router.push({ path: '/' });
    }
  }
};
</script>

<style lang="scss">
.page-message {
  background: white !important;
  .gree-header {
    background: white;
    border-bottom: 1px solid #e8e8e8;
    .gree-header-left {
      color: black;
    }
    .gree-header-title {
      color: black;
    }
    .gree-header-right {
      color: #00aeff;
      width: 100px;
    }
  }
  .page-content {
    padding-bottom: 0;
    background: #f4f4f4;
    .tip {
      padding-left: 40px;
      height: 100px;
      line-height: 100px;
      font-size: 36px;
      color: #969799;
    }
    .box {
      border-top: 1px solid #e8e8e8;
      border-bottom: 1px solid #e8e8e8;
      .txt-area {
        height: 520px;
      }
      .limit_zoom {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        text-align: right;
        height: 140px;
        font-size: 42px;
        .limit_txt {
          color: #969799;
          margin-right: 30px;
        }
        .clean {
          background: #ececee;
          height: 80px;
          width: 150px;
          margin-right: 30px;
          text-align: center;
          line-height: 80px;
          border-radius: 45px;
        }
      }
    }
  }
}

#assess .van-cell__value.van-cell__value--alone {
  font-size: 0.4rem !important;
  line-height: 2;
}
</style>
