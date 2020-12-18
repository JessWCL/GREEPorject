/**
 * @description 功能配置列表
 */
import { mapState } from 'vuex';

const btnConfig = {
  data() {
    return {
      lightMode: ['灯已关', '灯已开'],
    };
  },
  computed: {
    ...mapState({
      Pow: state => state.dataObject.Pow,
      Breathe: state => state.dataObject.Breathe,
    }),
    footList() {
      if (this.Pow) {
        return [
          {
            Name: '功能',
            ImgName: 'ic_function_nomal',
            moreBtn: false,
            Disabled: false,
          },
        ];
      }
      return [];
    },
    functionList() {
      return [
        {
          Name: '调节',
          ImgName: 'adjust',
          moreBtn: false,
          Disabled: false,
        },
        {
          Name: '呼吸灯',
          ImgName: this.Breathe ? 'light_on' : 'light_off',
          moreBtn: false,
          Disabled: false,
        },
      ];
    },
    colorList() {
      return [
        {
          name: '1',
          value: '',
          color: '#FFF',
        },
        {
          name: '2',
          value: '',
          color: '#FFFFCC',
        },
        {
          name: '3',
          value: '',
          color: '#FFFF99',
        },
        {
          name: '4',
          value: '',
          color: '#FFFF66',
        },
      ];
    },
    brightList() {
      return [
        {
          name: '亮',
          value: '',
        },
        {
          name: '中',
          value: '',
        },
        {
          name: '暗',
          value: '',
        },
      ];
    },
  },
};

export default btnConfig;
