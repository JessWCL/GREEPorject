/**
 * @description 功能配置列表
 */
import { mapState } from 'vuex';

const btnConfig = {
  data() {
    return {
      footList: [
        {
          isScenesShow: true,
          onlyLang: '',
          Name: 'btn.power',
          ImgName: 'btn_off.svg',
          miniIcon: require('@/assets/img/mini/AssHt_mini.png')
        },
        {
          isScenesShow: false,
          onlyLang: '',
          Name: 'btn.zeroCold',
          ImgName: 'ic_zero_cold_water_off.svg',
          miniIcon: require('@/assets/img/mini/SwingLfRig_mini.png')
        },
        {
          isScenesShow: true,
          onlyLang: '',
          Name: 'btn.booster',
          ImgName: 'ic_booster_off.svg',
          miniIcon: require('@/assets/img/mini/SwingLfRig_mini.png')
        }
      ],
      footList2: [
        {
          isScenesShow: true,
          onlyLang: '',
          Name: 'btn.onceCycle',
          ImgName: 'SwingLfRig_0.svg'
        },
        {
          isScenesShow: true,
          onlyLang: '',
          Name: 'btn.pointCycle',
          ImgName: 'SwingLfRig_0.svg'
        },
        {
          isScenesShow: true,
          onlyLang: '',
          Name: 'btn.allWeatherCycle',
          ImgName: 'SwingLfRig_0.svg'
        },
        {
          isScenesShow: true,
          onlyLang: '',
          Name: 'btn.timingCycle',
          ImgName: 'SwingLfRig_0.svg'
        },
      ]
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject
    })
  }
};

export default btnConfig;
