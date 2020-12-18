<template>
  <!-- error start -->
  <div
    v-show="hasError"
    class="err-bg">
    <!-- 单个错误代码显示 start -->
    <div 
      v-show="computedErrorList.length == 1"
      class="err-box">
      <section
        :key="index"
        v-for="(item, index) in computedErrorList">
        <div class="img-box">
          {{ item.errorCode !== null ? item.errorCode : '!' }}
        </div>
        <p id="j-reasonLable">故障原因：</p>
        <p id="j-reasonContext">{{ item.reason }}</p>
        <br>
        <p id="j-resolveLable">解除条件：</p>
        <p id="j-resolveContext">{{ item.resolve }}</p>
      </section>
    </div>
    <!-- 单个错误代码显示 end -->
    <!-- 多个错误显示代码 start -->
    <div
      v-show="computedErrorList.length >= 2"
      class="multi-err-container">
      <div class="multi-err">
        <div
          :key="index"
          v-for="(errItem, index) in computedErrorList"
          class="err-item-container">
          <p class="err-item-title">{{ errItem.errorCode }} {{ errItem.title }}</p>
          <p class="err-item-lable">故障原因：</p>
          <p class="err-item-txt">{{ errItem.reason }}</p>
          <p class="err-item-lable">解除条件：</p>
          <p
            v-html="errItem.resolve"
            class="err-item-txt" />
        </div>
      </div>
    </div>
    <!-- 我个错误显示代码 end -->
  </div>
  <!-- error end -->
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Error',
  computed: {
    ...mapState({
      errItemList: state => state.errItemList,
      warningItemList: state => state.warningItemList,
    }),
    computedErrorList() {
      return this.warningItemList.concat(this.errItemList);
    },
    hasError() {
      return this.errItemList.length > 0;
    }
  }
};
</script>

<style scoped>
/* error start */
.err-bg {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: url("../assets/images/closeBG.png") no-repeat;
  background-size: cover;
}

.err-box {
  padding-top: 9.5rem;
}
.err-box .img-box {
  text-align: center;
  margin: 13rem auto 1.5rem;
  border: 2px solid red;
  height: 12rem;
  width: 12rem;
  border-radius: 50%;
  font-size: 6.5rem;
  color: #ff0000;
  line-height: 12rem;
  font-family: appleUltralight;
}
.err-box p {
  margin: 0;
  margin-bottom: 0.5rem;
  padding: 0 2.5rem;
  font-size: 1.4rem;
  color: #404657;
  text-align: center;
}

.multi-err-container {
  position: relative;
  height: 100%;
}
.multi-err {
  overflow-y: auto;
  position: absolute;
  top: 2.5rem;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1.03rem 3.3rem 0;
}
.err-item-container {
  margin: 2.3rem 0;
}
.err-item-title {
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: #ff0000;
}
.err-item-lable {
  margin-bottom: 0.5rem;
  font-size: 1.27rem;
  color: #404657;
}
.err-item-txt {
  margin-bottom: 1.5rem;
  font-size: 1.27rem;
  color: #404657;
}
/* error end */
</style>
