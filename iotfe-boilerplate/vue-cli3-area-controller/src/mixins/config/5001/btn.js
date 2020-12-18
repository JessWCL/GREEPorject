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
      TemUnit: state => state.dataObject.TemUnit,
      AppTimer: state => state.dataObject.AppTimer,
      isScene: state => state.isScene,
      Dred: state => state.dataObject.Dred
    }),
    footListChildren() {
      if (this.dataObject.Pow) {
        return [
          {
            Name: 'btn.advance_Pow',
            ImgName: 'ic_open',
            moreBtn: false,
            hidden: false
          },
          {
            Name: 'btn.advance_function',
            ImgName: 'ic_function_nomal',
            moreBtn: false,
            hidden: this.isScene
          }
        ];
      }
      return [
        {
          Name: 'btn.advance_Pow',
          ImgName: 'ic_off',
          moreBtn: false,
          hidden: false
        },
        {
          Name: 'btn.advance_Timer',
          ImgName: 'powoff_timer',
          moreBtn: true,
          hidden: this.isScene
        }
      ];
    },
    functionListChildren() {
      if (this.dataObject.Pow) {
        return [
          {
            Disabled: false,
            Name: this.$language('btn.advance_CF'),
            ImgUrl: this.TemUnit
              ? require('@/assets/imgs/func/ic_AF_℉_nomal_pressed.png')
              : require('@/assets/imgs/func/ic_AF℃_pressed.png'),
            showArrowMore: false
          },
          {
            Disabled: false,
            Name: this.$language('btn.advance_Timer'),
            ImgUrl: this.AppTimer
              ? require('@/assets/imgs/func/ic_AF_appointment_pressed.png')
              : require('@/assets/imgs/func/ic_AF_appointment_nomal.png'),
            showArrowMore: true
          }
        ];
      }
      return [
        // {
        //   Disabled: false,
        //   Name: this.$language('btn.advance_Timer'),
        //   ImgUrl: this.AppTimer
        //     ? require('@/assets/imgs/func/ic_AF_appointment_pressed.png')
        //     : require('@/assets/imgs/func/ic_AF_appointment_nomal.png'),
        //   showArrowMore: true
        // }
      ];
    },
    DeviceStatusIcon() {
      return [
        {
          ImgName: 'ic_D1_white',
          isHidden: this.Dred !== 1
        },
        {
          ImgName: 'ic_D2_white',
          isHidden: this.Dred !== 2
        },
        {
          ImgName: 'ic_D3_white',
          isHidden: this.Dred !== 3
        },
        {
          ImgName: 'ic_tips_blo',
          isHidden: !this.Dry
        }
      ];
    }
  }
};

export default btnConfig;
