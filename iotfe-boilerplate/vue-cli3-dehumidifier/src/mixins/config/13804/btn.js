/**
 * @description 功能配置列表
 */
import { mapState } from 'vuex';

const btnConfig = {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      functype: state => state.functype
    }),
    functionList() {
      return [
        {
          isScenesShow: true, 
          isShowInPowOffState: true,
          isShowInWaterFull: true, // 是否在水满提醒页面显示
          name: 'btn.advance_pow',
          imgUrl: this.dataObject.Pow ? require('@assets/img/13804/btn_pow_on.png') : require('@assets/img/13804/btn_pow_off.png')
        },
        {
          isScenesShow: false,
          isShowInPowOffState: true,
          isShowInWaterFull: false,
          name: 'btn.advance_timer1',
          imgUrl: this.dataObject.AppTimer ? require('@assets/img/13804/btn_time_on.png') : require('@assets/img/13804/btn_time_off.png'),
        },
        {
          isScenesShow: true,
          isShowInPowOffState: false,
          isShowInWaterFull: false,
          name: 'btn.advance_uv',
          imgUrl: (this.dataObject.Dmod !== 0 || this.dataObject.Health) ? require('@assets/img/13804/btn_uv_on.png') : require('@assets/img/13804/btn_uv_off.png'),
        },
      ];
    },
    // functionList() {
    //   let functionList = [];
    //   if (this.dataObject.Pow) {
    //     functionList = [
    //       {
    //         index: 2,
    //         name: this.$language('btn.advance_timer'),
    //         miniIcon: require('@/assets/img/mini/timer_ic.png'),
    //         ImgUrl: this.dataObject.AppTimer
    //           ? require('@/assets/img/functionBtn/timer_light.png')
    //           : require('@/assets/img/functionBtn/timer_nomal.png'),
    //         ScenesShow: false,
    //         sign: ''
    //       }
    //     ];
    //   }
    //   return functionList;
    // }
  }
};

export default btnConfig;
