/**
 * @description 功能配置列表
 */
import {
  mapState
} from 'vuex';

const btnConfig = {
  computed: {
    ...mapState({
      Pow: state => state.dataObject.Pow,
      Rotate: state => state.dataObject.Rotate,
      TmrOn: state => state.dataObject.TmrOn
    }),
    footList() {
      return [{
        isScenesShow: true,
        onlyLang: '',
        Name: 'btn.advance_Pow',
        ImgName: this.Pow ? 'btn_off' : 'btn_on',
        moreBtn: false
      },
      {
        isScenesShow: true,
        onlyLang: '',
        Name: 'btn.advance_sweep',
        ImgName: this.Pow && this.Rotate ? 'rotate_on' : 'rotate_off',
        moreBtn: false
      },
      {
        isScenesShow: false,
        onlyLang: '',
        Name: 'btn.advance_timer',
        ImgName: this.TmrOn ? 'btn_time_on' : 'btn_time_off',
        moreBtn: false
      }
      ];
    },
  }
};

export default btnConfig;
