/**
 * @description Home配置列表
 */
import homeData from '@/api/6099/home';

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
    BarColor() {
      return this.JsonData.BarColor;
    },
    DeviceStatusIcon() {
      this.JsonData.DeviceStatusIcon.forEach((item, index) => {
        switch (index) {
          case 0:
            this.JsonData.DeviceStatusIcon[index].isHidden =
              !this.Timer || !this.Pow;
            break;
          case 1:
            this.JsonData.DeviceStatusIcon[index].isHidden =
              !this.isTime || !this.Pow;
            break;
          case 2:
            this.JsonData.DeviceStatusIcon[index].isHidden =
              !this.isSleep || !this.Pow;
            break;
          case 3:
            this.JsonData.DeviceStatusIcon[index].isHidden =
              !this.AutoCtr || !this.Pow;
            break;
          default:
            break;
        }
      });
      return this.JsonData.DeviceStatusIcon;
    },
    JsonDataList() {
      for (let i = 0; i < this.ChargeOnesCountInNum2(); i++) {
        this.JsonData[`ColsList_${i}`].forEach((item, index) => {
          switch (index) {
            case 0:
              this.JsonData[`ColsList_${i}`][index].Value = `${this.DataBoxData[
                i
              ].TemSor - 100}℃`;
              break;
            case 1:
              this.JsonData[`ColsList_${i}`][index].Value = `${this.DataBoxData[
                i
              ].HumSor -100 }%`;
              break;
            case 2:
              this.JsonData[`ColsList_${i}`][index].Value = this.DataBoxData[
                i
              ].CO2;
              break;
            case 3:
              this.JsonData[`ColsList_${i}`][index].Value = this.DataBoxData[
                i
              ].PM2P5;
              break;
            default:
              break;
          }
        });
      }
      return this.JsonData;
    },
    FootList() {
      this.JsonData.FootList.forEach((item, index) => {
        // if (index === 1) {
        //   this.JsonData.FootList[index].isDisabled = Boolean(!this.Pow);
        // } else {
        //   this.JsonData.FootList[index].isDisabled = false;
        // }
        if (index === 2) {
          this.JsonData.FootList[index].isShowFuncBtn = Boolean(!this.isScene);
        } else {
          this.JsonData.FootList[index].isShowFuncBtn = true;
        }
      });
      return this.JsonData.FootList;
    },
    FootFuncList() {
      this.JsonData.FootFuncList.forEach((item, index) => {
        const IMGNAMEON = require(`@/assets/img/${item.ImgNameOn}.png`);
        const IMGNAMEOFF = require(`@/assets/img/${item.ImgNameOff}.png`);
        switch (index) {
          case 0:
            this.JsonData.FootFuncList[index].ImgUrl = this.Timer
              ? IMGNAMEON
              : IMGNAMEOFF;
            this.JsonData.FootFuncList[index].Disabled = false;
            break;
          case 1:
            this.JsonData.FootFuncList[index].ImgUrl = IMGNAMEOFF;
            this.JsonData.FootFuncList[index].Disabled = false;
            break;
          // case 2:
          //   this.JsonData.FootFuncList[index].ImgUrl = IMGNAMEOFF;
          //   this.JsonData.FootFuncList[index].Disabled =
          //     this.SensorErr > 0 &&
          //     parseInt(this.SensorErr.toString(2), 2) !== 2;
          //   break;
          default:
            break;
        }
      });
      return this.JsonData.FootFuncList;
    },
    FilterScreen() {
      this.JsonData.Filter.forEach((item, index) => {
        switch (index) {
          case 0:
            this.JsonData.Filter[index].Value = `${100 - this.InVitiGrCg}%`;
            this.JsonData.Filter[index].tips = '粗效滤网';
            if (this.PctRe) {
              this.JsonData.Filter[index].msg = '请及时更换滤网';
            } else if (this.PctCle) {
              this.JsonData.Filter[index].msg = '请及时清洗滤网';
            } else {
              this.JsonData.Filter[index].msg = '';
            }
            break;
        }
      });
      return this.JsonData.Filter;
    },
  },
};

export default homeConfig;
