import { mapState } from 'vuex';

const btnConfig = {
  data() {
    return {
      footList: [
        {
          isScenesShow: true,
          onlyLang: '',
          Name: 'home.power',
          ImgName: 'btn_on'
        },
        {
          isScenesShow: true,
          onlyLang: '',
          Name: 'home.function',
          ImgName: 'btn_function'
        }
      ]
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
    }),
    functionList() {
      return [
        {
          index: 1,
          name: 'func.uv',
          miniIcon: require('../../assets/images/uv_mini.png'),
          ImgUrl: this.dataObject.UVLight ? require('../../assets/images/uv_on.png') : require('../../assets/images/uv_off.png'),
          moreBtn: false,
          ScenesShow: true,
          sign: 'UVLight',
        },
        {
          index: 2,
          name: 'func.light',
          miniIcon: require('../../assets/images/light_mini.png'),
          ImgUrl: this.dataObject.WaterTankLight ? require('../../assets/images/light_on.png') : require('../../assets/images/light_off.png'),
          moreBtn: false,
          ScenesShow: true,
          sign: 'WaterTankLight',
        },
        {
          index: 3,
          name: '睡眠',
          miniIcon: require('../../assets/images/sleep_mini.png'),
          ImgUrl: this.dataObject.Sleep ? require('../../assets/images/828502/sleep_on.png') : require('../../assets/images/828502/sleep_off.png'),
          moreBtn: false,
          ScenesShow: true,
          sign: 'Sleep',
        },
        {
          index: 4,
          name: 'func.timer',
          miniIcon: require('../../assets/images/timer_mini.png'),
          ImgUrl: this.dataObject.TmrOn ? require('../../assets/images/timer_on.png') : require('../../assets/images/timer_off.png'),
          moreBtn: false,
          ScenesShow: false,
          sign: 'TmrOn',
        },
      ];
    }
  }
};
export default btnConfig;
