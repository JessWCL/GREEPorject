<template>
  <gree-popup-activity v-model="isPopupShow" @hide="$_close">
    <div class="dialog rule-prize">
      <div class="dialog-header">
        <div class="dialog-title">活动规则</div>
      </div>
      <div class="dialog-body">
        <gree-scroll-view ref="scrollView" :scrolling-x="false" auto-reflow>
          <div class="body-title">
            <p>1. 活动时间</p>
            <p>北京时间{{ startTime }}-{{ endTime }}</p>
            <p>2. 参与规则</p>
            <p>（1）配网成功一个设备，即可获得一张抽奖券，不限设备数</p>
            <p>（2）已配网成功设备，直接发放对应张数抽奖券至账户</p>
            <p>1.用户参与抽奖有机会获得的奖品信息如下：</p>
            <p>（1）1099元的电饭煲</p>
            <p>（2）459元的塔扇</p>
            <p>（3）200元指定产品优惠券</p>
            <p>（4）50元优惠券</p>
            <p>（5）5元优惠券</p>
            <p>2.发奖方式：</p>
            <p>（1）奖品均发放至“董明珠的店”对应用户的账号下</p>
            <p>（2）实物奖品需用户通过认筹码进入“董明珠的店”购买对应产品</p>
            <p>（3）优惠券使用范围仅限“董明珠的店”，具体使用条件见优惠券</p>
            <p>3.注意事项</p>
            <p>（1）本活动仅限中国大陆地区的格力智能家居用户参与和使用</p>
            <p>（2）用户如出现作弊等违反法律法规的行为，我们有权撤回用户参与活动及奖励使用资格，并有权收回用户已经获得的权益</p>
            <p>（3）本活动最终解释权归“格力+”App所有</p>
          </div>
        </gree-scroll-view>
      </div>
    </div>
  </gree-popup-activity>
</template>

<script>
import { mapState } from 'vuex';
import { PopupActivity, ScrollView } from 'gree-ui';

export default {
  name: 'popup-lose',
  components: {
    [PopupActivity.name]: PopupActivity,
    [ScrollView.name]: ScrollView
  },
  props: {
    value: Boolean
  },
  computed: {
    ...mapState({
      activityObject: state => state.activityObject
    })
  },
  data() {
    return {
      isPopupShow: this.value,
      startTime: '',
      endTime: ''
    };
  },
  watch: {
    value(val) {
      this.isPopupShow = val;
    }
  },
  created() {
    this.startTime = this.$options.filters.timeformat(this.activityObject.startTime, 'YYYY年MM月DD日HH:mm:ss');
    this.endTime = this.$options.filters.timeformat(this.activityObject.endTime, 'YYYY年MM月DD日HH:mm:ss');
  },
  methods: {
    $_close() {
      this.isPopupShow = false;
      this.$emit('hide');
    }
  }
};
</script>
