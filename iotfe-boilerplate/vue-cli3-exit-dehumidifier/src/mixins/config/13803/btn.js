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
      // if (this.dataObject.DwatFul) return [];
      if (this.dataObject.Pow) {
        return [
          {
            isScenesShow: true,
            onlyLang: '',
            Name: 'btn.advance_Pow',
            ImgName: 'btn_off',
            moreBtn: false
          },
          {
            isScenesShow: true,
            onlyLang: '',
            name: '',
            ImgName: 'blank',
            moreBtn: false
          },
          {
            isScenesShow: true,
            onlyLang: '',
            Name: 'btn.functions',
            ImgName: 'btn_function',
            moreBtn: false
          }
        ];
      } 
      if (this.functype) {
        return [
          {
            isScenesShow: true,
            onlyLang: '',
            Name: 'btn.advance_Pow',
            ImgName: 'btn_on',
            moreBtn: false
          },
          {
            isScenesShow: true,
            onlyLang: '',
            name: '',
            ImgName: 'blank',
            moreBtn: false
          },
        ];
      }
      return [
        {
          isScenesShow: true,
          onlyLang: '',
          Name: 'btn.advance_Pow',
          ImgName: 'btn_on',
          moreBtn: false
        },
        {
          isScenesShow: true,
          onlyLang: '',
          name: '',
          ImgName: 'blank',
          moreBtn: false
        },
        {
          isScenesShow: true,
          onlyLang: '',
          Name: 'btn.functions',
          ImgName: 'btn_function',
          moreBtn: false
        }
      ];
    },
    functionList() {
      // if (this.dataObject.Pow) {
      //   return [
      //     {
      //       index: 2,
      //       name: this.$language('btn.advance_timer'),
      //       miniIcon: require('@/assets/img/mini/timer_ic.png'),
      //       ImgUrl: this.dataObject.AppTimer
      //         ? require('@/assets/img/functionBtn/timer_light.png')
      //         : require('@/assets/img/functionBtn/timer_nomal.png'),
      //       ScenesShow: false,
      //       sign: ''
      //     }
      //   ];
      // }
      // return [];
      if (!this.dataObject.MidType) {
        if (!this.dataObject.Pow) {
          return [
            { 
              index: 2, 
              sign: '',
              ScenesShow: false,
              name: 'btn.advance_timer',
              ImgUrl: this.dataObject.AppTimer ? 
                require('@/assets/img/functionBtn/btn_time_on.png')
                : require('@/assets/img/functionBtn/btn_time_off.png'),
              moreBtn: true,
              miniIcon: require('@/assets/img/mini/timer_ic.png'),
            }
          ];
        }
        return [
          { 
            index: 1, 
            sign: 'Lig',
            ScenesShow: true,
            name: 'btn.light',
            ImgUrl: this.dataObject.Lig ? 
              require('@/assets/img/functionBtn/btn_light_on.png')
              : require('@/assets/img/functionBtn/btn_light_off.png'),
            moreBtn: false,
            miniIcon: require('@/assets/img/mini/light_ic.png'),
          },
          { 
            index: 2, 
            sign: '',
            ScenesShow: false,
            name: 'btn.advance_timer',
            ImgUrl: this.dataObject.AppTimer ? 
              require('@/assets/img/functionBtn/btn_time_on.png')
              : require('@/assets/img/functionBtn/btn_time_off.png'),
            moreBtn: true,
            miniIcon: require('@/assets/img/mini/timer_ic.png'),
          }
        ];
      } 
      return [
        { 
          index: 2, 
          sign: '',
          ScenesShow: false,
          name: 'btn.advance_timer',
          ImgUrl: this.dataObject.AppTimer ? 
            require('@/assets/img/functionBtn/btn_time_on.png')
            : require('@/assets/img/functionBtn/btn_time_off.png'),
          moreBtn: true,
          miniIcon: require('@/assets/img/mini/timer_ic.png'),
        }
      ];
    }
  }
};

export default btnConfig;
