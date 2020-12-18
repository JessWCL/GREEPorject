/*
 * @Descripttion: 
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2019-09-05 14:12:57
 * @LastEditors  : ZM_lee└(^o^)┘
 * @LastEditTime : 2019-12-30 14:09:00
 */
/**
 * @description Home配置列表
 */
import homeData from '@/api/809030/home';
import {
  mapState
} from 'vuex';

const homeConfig = {
  data() {
    return {
      JsonData: {}
    };
  },
  created() {
    this.JsonData = homeData[0];
  },
  computed: {
    ...mapState({
      Mod: state => state.dataObject.Mod,
      Quiet: state => state.dataObject.Quiet,
      OutMode: state => state.dataObject.OutMode,
      AssHt: state => state.dataObject.AssHt,
      SvSt: state => state.dataObject.SvSt,
      Pow: state => state.dataObject.Pow,
      AcSvSt: state => state.dataObject.AcSvSt,
      enAcSvSt: state => state.dataObject.enAcSvSt,
      SvStDebug: state => state.dataObject.SvStDebug,
      as1: state => state.dataObject.as1,
      as2: state => state.dataObject.as2,
      as3: state => state.dataObject.as3,
      Machine: state => state.dataObject.Machine,
    }),
    BarColor() {
      return this.JsonData.BarColor;
    },
    DeviceStatusIcon() {
      this.JsonData.DeviceStatusIcon.forEach((item, index) => {
        switch (index) {
          case 0:
            this.JsonData.DeviceStatusIcon[index].isHidden = !this.Quiet || !this.Pow;
            break;
          case 1:
            if (this.enAcSvSt) {
              this.JsonData.DeviceStatusIcon[index].isHidden = !this.OutMode || !this.Pow || this.Mod === 1;
            } else if (this.Mod === 1) {
              this.JsonData.DeviceStatusIcon[index].isHidden = true;
            } else {
              this.JsonData.DeviceStatusIcon[index].isHidden = !this.OutMode || !this.Pow;
            }
            break;
          case 2:
            this.JsonData.DeviceStatusIcon[index].isHidden = this.Mod === 1 || !this.AssHt || !this.Pow;
            break;
          case 3:
            this.JsonData.DeviceStatusIcon[index].isHidden = !this.enAcSvSt || !this.AcSvSt || !this.Pow;
            break;
          case 4:
            this.JsonData.DeviceStatusIcon[index].isHidden = this.Mod === 1 || !this.SvSt || !this.Pow;
            break;
          default:
            break;
        }
      });
      return this.JsonData.DeviceStatusIcon;
    },

    FootList() {
      this.JsonData.FootList.forEach((item, index) => {
        if (index === 1) {
          this.JsonData.FootList[index].isDisabled = Boolean(!this.Pow);
        } else {
          this.JsonData.FootList[index].isDisabled = false;
        }
        if (index === 2) {
          this.JsonData.FootList[index].isDisabled = Boolean(!this.Pow);
          this.JsonData.FootList[index].isShowFuncBtn = true;
        } else {
          this.JsonData.FootList[index].isShowFuncBtn = true;
        }
        if (this.SvStDebug) {
          if (index === 2) {
            this.JsonData.FootList[index].isShowFuncBtn = true;
          } else {
            this.JsonData.FootList[index].isShowFuncBtn = false;
          }
        }
      });
      return this.JsonData.FootList;
    },
    // 是否选择该功能，或禁用
    FootFuncList() {
      this.JsonData[`FootFuncList${this.Mod}`].forEach((item, index) => {
        const IMGNAMEON = require(`@/assets/img/${item.ImgNameOn}.png`);
        const IMGNAMEOFF = require(`@/assets/img/${item.ImgNameOff}.png`);
        switch (index) {
          case 0:
            this.JsonData[`FootFuncList${this.Mod}`][index].ImgUrl = this.Quiet ?
              IMGNAMEON :
              IMGNAMEOFF;
            break;
          case 1:
            if (this.Mod === 1) {
              if (this.enAcSvSt) {
                this.JsonData[`FootFuncList${this.Mod}`][index].ImgUrl = this.AcSvSt ?
                  IMGNAMEON :
                  IMGNAMEOFF;
              } else {
                this.JsonData[`FootFuncList${this.Mod}`][index].isHidden = true;
              }
            } else {
              this.JsonData[`FootFuncList${this.Mod}`][index].ImgUrl = this.OutMode ?
                IMGNAMEON :
                IMGNAMEOFF;
              this.JsonData[`FootFuncList${this.Mod}`][index].Disabled = Boolean(this.SvSt) || (Boolean(this.AcSvSt) && this.enAcSvSt === 1);
            }
            break;
          case 2:
            this.JsonData[`FootFuncList${this.Mod}`][index].ImgUrl = this.AssHt ?
              IMGNAMEON :
              IMGNAMEOFF;
            break;
          case 3:
            if (this.enAcSvSt) {
              this.JsonData[`FootFuncList${this.Mod}`][index].ImgUrl = this.AcSvSt ?
                IMGNAMEON :
                IMGNAMEOFF;
              this.JsonData[`FootFuncList${this.Mod}`][index].Disabled = Boolean(this.OutMode) || Boolean(this.SvSt);
            } else {
              this.JsonData[`FootFuncList${this.Mod}`][index].isHidden = true;
            }
            break;
          // eslint-disable-next-line no-case-declarations
          case 4:
            let num = 0;
            for (let index = 1; index < 4; index++) {
              for (let row = 0; row < this[`as${index}`].length; row++) {
                this[`as${index}`][row] ? num++ : '';
              }
            }
            if (this.Machine === 2) {
              this.JsonData[`FootFuncList${this.Mod}`][index].isHidden = true;
            } else {
              this.JsonData[`FootFuncList${this.Mod}`][index].ImgUrl = this.SvSt ?
                IMGNAMEON :
                IMGNAMEOFF;
            }
            this.JsonData[`FootFuncList${this.Mod}`][index].Disabled = Boolean(this.OutMode) || (Boolean(this.AcSvSt) && this.enAcSvSt === 1) || num > 2;
            break;
          default:
            break;
        }
      });

      return this.JsonData[`FootFuncList${this.Mod}`];
    }
  }
};

export default homeConfig;
