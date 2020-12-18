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
      Blo: state => state.dataObject.Blo,
      SvSt: state => state.dataObject.SvSt,
      isScene: state => state.isScene,
      Air: state => state.dataObject.Air,
      Mod: state => state.dataObject.Mod,
    }),
    footList() {
      if (this.dataObject.Pow) {
        return [
          {
            Name: 'btn.advance_Pow',
            ImgName: 'ic_open',
            moreBtn: false,
            showFlag: false,
          },
          {
            Name: 'btn.advance_function',
            ImgName: 'ic_function_nomal',
            moreBtn: false,
            showFlag: this.isScene,
          },
        ];
      }
      return [
        {
          Name: 'btn.advance_Pow',
          ImgName: 'ic_off',
          moreBtn: false,
          showFlag: false,
        },
        {
          Name: 'btn.advance_function',
          ImgName: 'ic_function_nomal',
          moreBtn: false,
          showFlag: this.isScene,
        },
      ];
    },
    functionListChildren() {
      if (this.dataObject.Pow & !this.isScene) {
        return [
          {
            Disabled: this.Mod !== 1,
            Name: this.$language('btn.advance_dry'),
            ImgUrl:
              this.Blo && this.Mod === 1
                ? require('@/assets/imgs/func/ic_AF_dry_pressed.png')
                : require('@/assets/imgs/func/ic_AF_dry_nomal.png'),
            showArrowMore: false,
          },
          {
            Disabled: this.Mod === 3 || this.Mod === 8,
            Name: this.$language('btn.advance_SE'),
            ImgUrl:
              this.SvSt & (this.Mod === 1 || this.Mod === 4)
                ? require('@/assets/imgs/func/ic_AF_conservation_pressed.png')
                : require('@/assets/imgs/func/ic_AF_conservation_nomal.png'),
            showArrowMore: true,
          },
          // {
          //   Disabled: this.Mod === 8,
          //   Name: this.$language('btn.advance_reflashing'),
          //   ImgUrl:
          //     this.Air && this.Mod !== 8
          //       ? require('@/assets/imgs/func/ic_AF_umlufttaste_selected.png')
          //       : require('@/assets/imgs/func/ic_AF_umlufttaste.png'),
          //   showArrowMore: false,
          // },
          {
            Disabled: false,
            Name: this.$language('btn.advance_Timer'),
            ImgUrl: require('@/assets/imgs/func/ic_AF_appointment_nomal.png'),
            showArrowMore: false,
          },
        ];
      } else if (this.dataObject.Pow & this.isScene) {
        return [
          {
            Disabled: this.Mod === 3 || this.Mod === 8 || this.Mod === 9,
            Name: this.$language('btn.advance_SE'),
            ImgUrl: this.SvSt
              ? require('@/assets/imgs/func/ic_AF_conservation_pressed.png')
              : require('@/assets/imgs/func/ic_AF_conservation_nomal.png'),
            showArrowMore: true,
          },
        ];
      }
      return [
        // {
        //   Disabled: false,
        //   Name: this.$language('btn.advance_reflashing'),
        //   ImgUrl: this.Air
        //     ? require('@/assets/imgs/func/ic_AF_umlufttaste_selected.png')
        //     : require('@/assets/imgs/func/ic_AF_umlufttaste.png'),
        //   showArrowMore: false,
        // },
        {
          Disabled: false,
          Name: this.$language('btn.advance_Timer'),
          ImgUrl: require('@/assets/imgs/func/ic_AF_appointment_nomal.png'),
          showArrowMore: false,
        },
      ];
    },
    DeviceStatusIcon() {
      return [
        {
          ImgName: 'ic_tips_blo',
          isHidden: !this.Blo || !this.Pow || this.Mod !== 1,
        },
        {
          ImgName: 'ic_AF_umlufttaste_light',
          isHidden: !this.Air,
        },
        {
          ImgName: 'ic_tips_svst',
          isHidden:
            !this.SvSt ||
            !this.Pow ||
            (this.Mod !== 1 && this.Mod !== 4) ||
            this.isScene,
        },
      ];
    },
  },
};

export default btnConfig;
