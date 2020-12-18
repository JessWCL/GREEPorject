/**
 * @description Home配置列表
 */
import homeData from '@/api/80242/home';

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
    BarColor() {
      return this.JsonData.BarColor;
    },
    DeviceStatusIcon() {
      this.JsonData.DeviceStatusIcon.forEach((item, index) => {
        switch (index) {
          case 0:
            this.JsonData.DeviceStatusIcon[index].isHidden =
              !this.isTime || !this.Pow;
            break;
          case 1:
            this.JsonData.DeviceStatusIcon[index].isHidden =
              !this.isSleep || !this.Pow;
            break;
          case 2:
            this.JsonData.DeviceStatusIcon[index].isHidden =
              !this.AutoCtr || !this.Pow;
            break;
          default:
            break;
        }
      });
      return this.JsonData.DeviceStatusIcon;
    },
    ColsList() {
      this.JsonData.ColsList.forEach((item, index) => {
        switch (index) {
          case 0:
            this.JsonData.ColsList[index].Value = `${(this.TemSor - 1000) /
              10}℃`;
            break;
          case 1:
            this.JsonData.ColsList[index].Value = `${this.HumSor / 10}%`;
            break;
          case 2:
            this.JsonData.ColsList[index].Value = `${this.HCHO / 1000}mg/m³`;
            break;
          case 3:
            this.JsonData.ColsList[index].Value = `${this.CO2}ppm`;
            break;
          default:
            break;
        }
      });
      return this.JsonData.ColsList;
    },
    FootList() {
      this.JsonData.FootList.forEach((item, index) => {
        if (index === 1) {
          this.JsonData.FootList[index].isDisabled = Boolean(!this.Pow);
        } else {
          this.JsonData.FootList[index].isDisabled = false;
        }
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
            this.JsonData.FootFuncList[index].ImgUrl = this.AutoCtr
              ? IMGNAMEON
              : IMGNAMEOFF;
            this.JsonData.FootFuncList[index].Disabled =
              this.SensorErr.toString(2) > 0;
            break;
          default:
            break;
        }
      });
      return this.JsonData.FootFuncList;
    }
  }
};

export default homeConfig;
