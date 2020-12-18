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
      TmrOn: state => state.dataObject.TmrOn,
      Anion: state => state.dataObject.Anion,
      functype: state => state.functype,
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
      this.functype ? {
        isScenesShow: true,
        onlyLang: '',
        Name: 'btn.advance_anion',
        ImgName: this.Pow && this.Anion ? 'anion_on' : 'anion_off',
        moreBtn: false
      } : {
        isScenesShow: false,
        onlyLang: '',
        Name: 'btn.advance',
        ImgName: 'btn_function',
        moreBtn: false
      }];
    },
  }
};

export default btnConfig;
