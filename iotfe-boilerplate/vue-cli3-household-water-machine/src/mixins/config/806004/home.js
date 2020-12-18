/**
 * @description Home配置列表
 */
import homeData from '@/api/806004/home';
import { mapState } from 'vuex';

const homeConfig = {
  data() {
    return {
      JsonData: {},
    };
  },
  created() {
    this.JsonData = homeData[0];
  },
  computed: {
    ...mapState({
      Mod: state => state.dataObject.Mod,
      Quiet: state => state.dataObject.Quiet,
      LefHom: state => state.dataObject.LefHom,
      AssHt: state => state.dataObject.AssHt,
      SvSt: state => state.dataObject.SvSt,
      Pow: state => state.dataObject.Pow,
      AcSvSt: state => state.dataObject.AcSvSt,
    }),
    BarColor() {
      return this.JsonData.BarColor;
    },
    DeviceStatusIcon() {
      this.JsonData.DeviceStatusIcon.forEach((item, index) => {
        switch (index) {
          case 0:
            this.JsonData.DeviceStatusIcon[index].isHidden = !this.Quiet;
            break;
          case 1:
            this.JsonData.DeviceStatusIcon[index].isHidden = !this.LefHom;
            break;
          case 2:
            this.JsonData.DeviceStatusIcon[index].isHidden = !this.SvSt;
            break;
          default:
            break;
        }
      });
      return this.JsonData.DeviceStatusIcon;
    },

    FootList() {
      this.JsonData.FootList.forEach((item, index) => {
        switch (index) {
          case 0:
            this.JsonData.FootList[index].ImgName = this.Pow
              ? 'btn_off'
              : 'btn_on';
            this.JsonData.FootList[index].isShowFuncBtn = true;
            break;
          case 1:
            this.JsonData.FootList[index].isDisabled = Boolean(!this.Pow);
            this.JsonData.FootList[index].isShowFuncBtn = Boolean(
              !this.isScene,
            );
            break;
          case 2:
            this.JsonData.FootList[index].isDisabled = Boolean(!this.Pow);
            this.JsonData.FootList[index].isShowFuncBtn = Boolean(
              !this.isScene,
            );
            break;
          case 3:
            this.JsonData.FootList[index].isShowFuncBtn = Boolean(
              !this.isScene,
            );
            break;
          default:
            break;
        }
      });
      return this.JsonData.FootList;
    },
    // 是否选择该功能，或禁用
    FootFuncList() {
      this.JsonData.FootFuncList.forEach((item, index) => {
        const IMGNAMEON = require(`@/assets/img/${item.ImgNameOn}.png`);
        const IMGNAMEOFF = require(`@/assets/img/${item.ImgNameOff}.png`);
        switch (index) {
          case 0:
            this.JsonData.FootFuncList[index].ImgUrl = this.Quiet
              ? IMGNAMEON
              : IMGNAMEOFF;
            this.JsonData.FootFuncList[index].Disabled =
              Boolean(this.LefHom) || Boolean(this.SvSt);
            break;
          case 1:
            this.JsonData.FootFuncList[index].ImgUrl = this.LefHom
              ? IMGNAMEON
              : IMGNAMEOFF;
            this.JsonData.FootFuncList[index].Disabled =
              Boolean(this.Quiet) || Boolean(this.SvSt) || this.Mod === 1;
            break;
          case 2:
            this.JsonData.FootFuncList[index].ImgUrl = this.SvSt
              ? IMGNAMEON
              : IMGNAMEOFF;
            this.JsonData.FootFuncList[index].Disabled =
              Boolean(this.Quiet) || Boolean(this.LefHom);
            break;
          default:
            break;
        }
      });
      return this.JsonData.FootFuncList;
    },
  },
};

export default homeConfig;
