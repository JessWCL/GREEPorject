/**
 * @description 功能配置列表
 */
import { mapState } from 'vuex';

const btnConfig = {
  data() {
    return {
      AreaList: [
        {
          value: '0',
          text: '自动选择',
        },
        {
          value: '1',
          text: '区域1',
        },
        {
          value: '2',
          text: '区域2',
        },
        {
          value: '3',
          text: '区域3',
        },
        {
          value: '4',
          text: '区域4',
        },
        {
          value: '5',
          text: '区域5',
        },
        {
          value: '6',
          text: '区域6',
        },
        {
          value: '7',
          text: '区域7',
        },
        {
          value: '8',
          text: '区域8',
        },
      ],
      tips:
        '为降低噪音,需设置一个区域的风阀为常开状态,您可以指定区域或选择自动模式让机组自动适配。',
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      Dry: state => state.dataObject.Dry,
      EnSvSt: state => state.dataObject.EnSvSt,
      isScene: state => state.isScene,
      Mod: state => state.dataObject.Mod,
      Dred: state => state.dataObject.Dred,
    }),
    footList() {
      if (this.dataObject.Pow) {
        return [
          {
            Name: 'btn.advance_Pow',
            ImgName: 'ic_open', // ic_off
            moreBtn: false,
            hidden: false,
          },
          {
            Name: 'btn.advance_function',
            ImgName: 'ic_function_nomal',
            moreBtn: false,
            hidden: this.isScene,
          },
        ];
      }
      return [
        {
          Name: 'btn.advance_Pow',
          ImgName: 'ic_off',
          moreBtn: false,
          hidden: false,
        },
        {
          Name: 'btn.advance_function',
          ImgName: 'ic_function_disabled',
          moreBtn: false,
          hidden: this.isScene,
        },
      ];
    },
    functionList() {
      if (this.dataObject.Pow) {
        return [
          {
            Disabled: !(this.Mod === 1 || this.Mod === 3),
            Name: this.$language('btn.advance_dry'),
            ImgUrl:
              this.Dry & (this.Mod === 1 || this.Mod === 3)
                ? require('@/assets/imgs/func/ic_AF_dry_pressed.png')
                : require('@/assets/imgs/func/ic_AF_dry_nomal.png'),
            showArrowMore: false,
          },
          {
            Disabled: !(this.Mod === 1 || this.Mod === 2 || this.Mod === 3),
            Name: this.$language('btn.advance_SE'),
            ImgUrl:
              this.EnSvSt & (this.Mod === 1 || this.Mod === 2 || this.Mod === 3)
                ? require('@/assets/imgs/func/ic_AF_conservation_pressed.png')
                : require('@/assets/imgs/func/ic_AF_conservation_nomal.png'),
            showArrowMore: true,
          },
          {
            Disabled: false,
            Name: this.$language('btn.advance_time'),
            ImgUrl: require('@/assets/imgs/func/ic_AF_time-calibration_nomal.png'),
            showArrowMore: false,
          },
          // {
          //   Disabled: false,
          //   Name: this.$language('btn.advance_aore'),
          //   ImgUrl: require('@/assets/imgs/func/ic_AF_open-area_nomal.png'),
          //   showArrowMore: false,
          // },
        ];
      }
      return [];
    },
    DeviceStatusIcon() {
      return [
        {
          ImgName: 'ic_D1_white',
          isHidden: this.Dred !== 1,
        },
        {
          ImgName: 'ic_D2_white',
          isHidden: this.Dred !== 2,
        },
        {
          ImgName: 'ic_D3_white',
          isHidden: this.Dred !== 3,
        },
        {
          ImgName: 'ic_tips_blo',
          isHidden: !this.Dry,
        },
      ];
    },
  },
};

export default btnConfig;
