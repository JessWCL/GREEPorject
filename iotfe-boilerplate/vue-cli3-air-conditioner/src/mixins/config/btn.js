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
          Name: 'home.power',
          ImgName: 'btn_off'
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
      dataObject: state => state.dataObject
    }),
    functionList() {
      if (this.dataObject.Pow) {
        return [
          {
            index: 2,
            name: this.$language('btn.advance_updown'),
            miniIcon: require(`@/assets/img/mini/SwUpDn_mini_${
              this.dataObject.SwUpDn
            }.png`),
            ImgUrl: require(`@/assets/img/functionBtn/SwUpDn_${
              this.dataObject.SwUpDn
            }.png`),
            moreBtn: true,
            ScenesShow: true,
            sign: 'SwUpDn'
          },
          {
            index: 3,
            name: this.$language('btn.advance_leftright'),
            miniIcon: require(`@/assets/img/mini/SwingLfRig_mini_${
              this.dataObject.SwingLfRig
            }.png`),
            ImgUrl: require(`@/assets/img/functionBtn/SwingLfRig_${
              this.dataObject.SwingLfRig
            }.png`),
            moreBtn: true,
            ScenesShow: true,
            sign: 'SwingLfRig'
          },
          {
            index: 0,
            name: this.$language('btn.advance_light'),
            miniIcon: require('@/assets/img/mini/Lig_mini.png'),
            ImgUrl: this.dataObject.Lig
              ? require('@/assets/img/functionBtn/Lig_on.png')
              : require('@/assets/img/functionBtn/Lig_off.png'),
            moreBtn: false,
            ScenesShow: true,
            sign: 'Lig'
          },
          {
            index: 12,
            name: this.$language('btn.advance_vocCtlL'),
            miniIcon: require('@/assets/img/mini/VocCtl_mini.png'),
            ImgUrl: this.dataObject.VocCtl
              ? require('@/assets/img/functionBtn/VocCtl_on.png')
              : require('@/assets/img/functionBtn/VocCtl_off.png'),
            moreBtn: false,
            ScenesShow: true,
            sign: 'VocCtl'
          },
          {
            index: 4,
            name: this.$language('btn.advance_sleep'),
            miniIcon: require('@/assets/img/mini/SlpMod_mini.png'),
            ImgUrl: this.dataObject.SwhSlp
              ? require('@/assets/img/functionBtn/SlpMod_on.png')
              : require('@/assets/img/functionBtn/SlpMod_off.png'),
            moreBtn: false,
            ScenesShow: true,
            sign: 'SlpMod'
          },
          {
            index: 5,
            name: this.$language('btn.advance_ud_fan_port'),
            miniIcon: require('@/assets/img/mini/SwUpDn_mini.png'),
            ImgUrl:
              this.dataObject.UDFanPort === 3
                ? require('@/assets/img/functionBtn/UDFanPort_on.png')
                : require('@/assets/img/functionBtn/UDFanPort_off.png'),
            moreBtn: false,
            ScenesShow: true,
            sign: 'UDFanPort'
          },
          {
            index: 11,
            name: this.$language('btn.advance_ass_heating'),
            miniIcon: require('@/assets/img/mini/AssHt_mini.png'),
            ImgUrl: this.dataObject.AssHt
              ? require('@/assets/img/functionBtn/AssHt_on.png')
              : require('@/assets/img/functionBtn/AssHt_off.png'),
            moreBtn: false,
            ScenesShow: true,
            sign: 'AssHt'
          },
          {
            index: 9,
            name: this.$language('btn.advance_8heat'),
            miniIcon: require('@/assets/img/mini/StHt_8_mini.png'),
            ImgUrl: this.dataObject.StHt
              ? require('@/assets/img/functionBtn/StHt_8_on.png')
              : require('@/assets/img/functionBtn/StHt_8_off.png'),
            moreBtn: false,
            ScenesShow: true,
            sign: 'StHt'
          },
          {
            index: 10,
            name: this.$language('btn.advance_timer'),
            miniIcon: require('@/assets/img/mini/timing_mini.png'),
            ImgUrl: this.dataObject.AppTimer
              ? require('@/assets/img/functionBtn/timing_on.png')
              : require('@/assets/img/functionBtn/timing_off.png'),
            moreBtn: true,
            ScenesShow: false,
            sign: ''
          }
        ];
      }
      return [
        {
          index: 0,
          name: this.$language('btn.advance_light'),
          miniIcon: require('@/assets/img/mini/Lig_mini.png'),
          ImgUrl: this.dataObject.Lig
            ? require('@/assets/img/functionBtn/Lig_on.png')
            : require('@/assets/img/functionBtn/Lig_off.png'),
          moreBtn: false,
          ScenesShow: true,
          sign: 'Lig'
        },
        {
          index: 12,
          name: this.$language('btn.advance_vocCtlL'),
          miniIcon: require('@/assets/img/mini/VocCtl_mini.png'),
          ImgUrl: this.dataObject.VocCtl
            ? require('@/assets/img/functionBtn/VocCtl_on.png')
            : require('@/assets/img/functionBtn/VocCtl_off.png'),
          moreBtn: false,
          ScenesShow: true,
          sign: 'VocCtl'
        },
        {
          index: 10,
          name: this.$language('btn.advance_timer'),
          miniIcon: require('@/assets/img/mini/timing_mini.png'),
          ImgUrl: this.dataObject.AppTimer
            ? require('@/assets/img/functionBtn/timing_on.png')
            : require('@/assets/img/functionBtn/timing_off.png'),
          moreBtn: true,
          ScenesShow: false,
          sign: ''
        }
      ];
    }
  }
};

export default btnConfig;
