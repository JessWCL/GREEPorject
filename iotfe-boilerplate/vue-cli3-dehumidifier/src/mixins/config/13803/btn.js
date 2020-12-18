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
    footList() {
      if (this.dataObject.DwatFul || this.functype) return [];
      if (this.dataObject.Pow) {
        return [
          // {
          //   isScenesShow: true,
          //   onlyLang: '',
          //   Name: 'btn.advance_health',
          //   ImgName: this.dataObject.Health ? 'health_light' : 'health_nomal',
          //   moreBtn: false
          // },
          {
            isScenesShow: false,
            onlyLang: '',
            Name: 'btn.advance_timer',
            ImgName: this.dataObject.AppTimer ? 'timer_light' : 'timer_nomal',
            moreBtn: true
          }
        ];
      }
      return [
        {
          isScenesShow: false,
          onlyLang: '',
          Name: 'btn.advance_timer',
          ImgName: this.dataObject.AppTimer ? 'timer_light' : 'timer_nomal',
          moreBtn: true
        }
      ];
    },
    functionList() {
      if (this.dataObject.Pow) {
        return [
          // {
          //   index: 1,
          //   name: this.$language('btn.advance_health'),
          //   miniIcon: require('@/assets/img/mini/health_ic.png'),
          //   ImgUrl: this.dataObject.Health
          //     ? require('@/assets/img/functionBtn/health_light.png')
          //     : require('@/assets/img/functionBtn/health_nomal.png'),
          //   ScenesShow: true,
          //   sign: 'Health'
          // },
          {
            index: 2,
            name: this.$language('btn.advance_timer'),
            miniIcon: require('@/assets/img/mini/timer_ic.png'),
            ImgUrl: this.dataObject.AppTimer
              ? require('@/assets/img/functionBtn/timer_light.png')
              : require('@/assets/img/functionBtn/timer_nomal.png'),
            ScenesShow: false,
            sign: ''
          }
        ];
      }
      return [];
    }
  }
};

export default btnConfig;
