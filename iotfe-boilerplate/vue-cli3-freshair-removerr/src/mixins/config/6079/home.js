/**
 * @description Home配置列表
 */
import homeData from '@/api/6079/home';

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
      for (let i = 0; i < this.ChargeOnesCountInNum2(); i += 1) {
        this.JsonData[`ColsList_${i}`].forEach((item, index) => {
          switch (index) {
            case 0:
              this.JsonData[`ColsList_${i}`][index].Value =
                `${this.DataBoxData[i].TemSor}` === '0'
                  ? '--'
                  : `${this.DataBoxData[i].TemSor - 100}℃`;
              break;
            case 1:
              this.JsonData[`ColsList_${i}`][index].Value =
                `${this.DataBoxData[i].HumSor}` === '0'
                  ? '--'
                  : `${this.DataBoxData[i].HumSor - 100}%`;
              break;
            case 2:
              this.JsonData[`ColsList_${i}`][index].Value =
                `${this.DataBoxData[i].CO2}` === '0'
                  ? '--'
                  : `${this.DataBoxData[i].CO2}`;    // ppm
              break;
            case 3:
              this.JsonData[`ColsList_${i}`][index].Value =
                `${this.DataBoxData[i].PM2P5}` === '0'
                  ? '--'
                  : `${this.DataBoxData[i].PM2P5}`;    // μg/m3
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
        if (index === 1) {
          this.JsonData.FootList[index].isShowFuncBtn = Boolean(!this.isScene);
        } else {
          this.JsonData.FootList[index].isShowFuncBtn = true;
        }
      });
      return this.JsonData.FootList;
    },
    FootFuncList() {
      // (Number(this.MIdType) === 6079 || Number(this.MIdType) === 6099) ? this.JsonData.FootFuncList.splice(2, 1) : '';
      let FootFuncArray = [];
      if (Number(this.MIdType) === 6079 || Number(this.MIdType) === 6099) {
        FootFuncArray.push(this.JsonData.FootFuncList[0]);
        FootFuncArray.push(this.JsonData.FootFuncList[1]);
      } else {
        FootFuncArray = this.JsonData.FootFuncList;
      }
      FootFuncArray.forEach((item, index) => {
        const IMGNAMEON = require(`@/assets/img/${item.ImgNameOn}.png`);
        const IMGNAMEOFF = require(`@/assets/img/${item.ImgNameOff}.png`);
        switch (index) {
          case 0:
            FootFuncArray[index].ImgUrl = this.Timer
              ? IMGNAMEON
              : IMGNAMEOFF;
            FootFuncArray[index].Disabled = false;
            break;
          case 1:
            FootFuncArray[index].ImgUrl = IMGNAMEOFF;
            FootFuncArray[index].Disabled = false;
            break;
          case 2:
            FootFuncArray[index].ImgUrl = this.Inloop 
              ? IMGNAMEON
              : IMGNAMEOFF;
            FootFuncArray[index].Disabled = 
               (this.SensorErr > 0 || this.FanMod === 3);
            // &&
            // parseInt(this.SensorErr.toString(2), 2) !== 2;
            break;
          default:
            break;
        }
      });
      return FootFuncArray;
    },
    FilterScreen() {
      let FilterList = [];
      if (Number(this.MIdType) === 6079) {
        // this.JsonData.Filter.splice(1, 1);
        FilterList.push(this.JsonData.Filter[0]);
        FilterList.push(this.JsonData.Filter[1]);
      } else if (Number(this.MIdType) === 6099) {
        // this.JsonData.Filter.splice(1, 2);
        FilterList.push(this.JsonData.Filter[0]);
      } else {
        FilterList = this.JsonData.Filter;
      }
      FilterList.forEach((item, index) => {
        switch (index) {
          case 0:
            Number(this.MIdType) === 6079 ? this.InVitiGr === 0 ? '--' : FilterList[index].Value = `${200 - this.InVitiGr}%` : this.InVitiGrCg === 0 ? '--' : FilterList[index].Value = `${200 - this.InVitiGrCg}%`;
            FilterList[index].tips = '粗效滤网';
            if (this.PctRe === 1 || this.PctRe === 3) {
              FilterList[index].msg = '请断电并更换粗效过滤网';
            } else if (this.PctCle === 1 || this.PctCle === 3) {
              FilterList[index].msg = '请断电并清洗粗效过滤网';
            } else {
              FilterList[index].msg = '';
            }
            break;
          case 1:
            this.VitiGr === 0 ? '--' : FilterList[index].Value = `${200 - this.VitiGr}%`;
            FilterList[index].tips = '高效滤网';
            if (this.PctRe === 2 || this.PctRe === 3) {
              FilterList[index].msg = '请断电并更换高效过滤网';
            } else {
              FilterList[index].msg = '';
            }
            break;
          case 2:
            this.IFDtiGr === 0 ? '--' : FilterList[index].Value = `${200 - this.IFDtiGr}%`;
            FilterList[index].tips = 'IFD滤网';
            if (this.PctCle === 2 || this.PctCle === 3) {
              FilterList[index].msg = '请断电并清洗IFD过滤网';
            } else {
              FilterList[index].msg = '';
            }
            break;
          default: 
            break;
        }
      });
      return FilterList;
    },
  },
};

export default homeConfig;
