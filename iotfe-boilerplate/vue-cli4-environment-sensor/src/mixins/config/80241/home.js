/**
 * @description Home配置列表
 */
import homeData from '@/api/80241/home';
import { mapState } from 'vuex';

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
      AutoCtr: state => state.dataObject.AutoCtr,
      CO2: state => state.dataObject.CO2,
      HCHO: state => state.dataObject.HCHO,
      HumSor: state => state.dataObject.HumSor,
      isScene: state => state.isScene,
      LigPow: state => state.dataObject.LigPow,
      PM2P5: state => state.dataObject.PM2P5,
      Pow: state => state.dataObject.Pow,
      ScrTime: state => state.dataObject.ScrTime,
      TemSor: state => state.dataObject.TemSor
    }),
    DeviceStatusIcon() {
      this.JsonData.DeviceStatusIcon.forEach((item, index) => {
        switch (index) {
          case 0:
            this.JsonData.DeviceStatusIcon[index].isHidden = !this.LigPow || !this.Pow;
            break;
          case 1:
            this.JsonData.DeviceStatusIcon[index].isHidden = !this.isTime || !this.Pow;
            break;
          case 2:
            this.JsonData.DeviceStatusIcon[index].isHidden = this.ScrTime === 0 || !this.Pow;
            break;
          case 3:
            this.JsonData.DeviceStatusIcon[index].isHidden = this.AutoCtr === 0 || this.AutoCtr === 2 || !this.Pow;
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
            this.JsonData.ColsList[index].Value = `${(this.TemSor - 1000) / 10}℃`;
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
          case 4:
            this.JsonData.ColsList[index].Value = `${this.PM2P5}μg/m³`;
            break;
          default:
            break;
        }
      });
      return this.JsonData.ColsList;
    },
    FootList() {
      this.JsonData.FootList.forEach((item, index) => {
        if (index === 0) {
          this.JsonData.FootList[index].ImgName = !this.Pow ? 'btn_on' : 'btn_off';
        }
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
            this.JsonData.FootFuncList[index].ImgUrl = this.ScrTime > 0 ? IMGNAMEON : IMGNAMEOFF;
            this.JsonData.FootFuncList[index].Disabled = false;
            break;
          case 1:
            this.JsonData.FootFuncList[index].ImgUrl = this.AutoCtr === 1 ? IMGNAMEON : IMGNAMEOFF;
            this.JsonData.FootFuncList[index].Disabled = this.SensorErr.toString(2) > 0;
            break;
          case 2:
            this.JsonData.FootFuncList[index].ImgUrl = this.LigPow ? IMGNAMEON : IMGNAMEOFF;
            this.JsonData.FootFuncList[index].Disabled = this.SensorErr > 0 && parseInt(this.SensorErr.toString(2), 2) !== 2;
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
