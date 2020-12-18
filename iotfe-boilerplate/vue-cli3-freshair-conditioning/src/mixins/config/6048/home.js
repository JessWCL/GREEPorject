/**
 * @description Home配置列表
 */
import homeData from '@/api/6048/home';

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
      this.JsonData.ColsList.forEach((item, index) => {
        switch (index) {
          case 0:
            this.JsonData.ColsList[index].Value =
              `${this.TemSor}` === '0' ? '--' : `${this.TemSor / 10 - 100}℃`; // 温度
            break;
          case 1:
            this.JsonData.ColsList[index].Value =
              `${this.HumSor}` === '0' // 湿度
                ? '--'
                : `${this.HumSor}%`;
            break;
          case 2:
            this.JsonData.ColsList[index].Value =
              `${this.HCHO}` === '0' ? '--' : `${this.HCHO / 100}`; // 甲醛
            break;
          case 3:
            this.JsonData.ColsList[index].Value =
              `${this.VOC}` === '0' ? '--' : `${this.VOC}`; // ppm
            break;
          case 4:
            this.JsonData.ColsList[index].Value =
              `${this.CO2}` === '0' ? '--' : `${this.CO2}`; // co2
            break;
          case 5:
            this.JsonData.ColsList[index].Value =
              `${this.PM2P5}` === '0' ? '--' : `${this.PM2P5}`; // μg/m3
            break;
          default:
            break;
        }
      });
      return this.JsonData;
    },
    FootList() {
      console.log(this.JsonData);
      this.JsonData.FootList.forEach((item, index) => {
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
      const FootFuncArray = this.JsonData.FootFuncList;
      FootFuncArray.forEach((item, index) => {
        const IMGNAMEON = require(`@/assets/img/${item.ImgNameOn}.png`);
        const IMGNAMEOFF = require(`@/assets/img/${item.ImgNameOff}.png`);
        switch (index) {
          case 0:
            FootFuncArray[index].ImgUrl = this.Timer ? IMGNAMEON : IMGNAMEOFF;
            FootFuncArray[index].Disabled = false;
            break;
          case 1:
            FootFuncArray[index].ImgUrl = IMGNAMEOFF;
            FootFuncArray[index].Disabled = false;
            break;
          case 2:
            FootFuncArray[index].ImgUrl = this.Inloop ? IMGNAMEON : IMGNAMEOFF;
            FootFuncArray[index].Disabled = this.SensorErr || !this.InloopEN;
            break;
          default:
            break;
        }
      });
      return FootFuncArray;
    },
    FilterScreen() {
      // 此处逻辑写的不优雅
      let FilterList = [];
      FilterList = this.JsonData.Filter;
      if (this.MIdType === this.JsonData.midTypeList[0]) {
        FilterList[2].status = false;
      } else if (this.MIdType === this.JsonData.midTypeList[1]) {
        FilterList[1].status = false;
        FilterList[2].status = false;
      } else if (this.MIdType === this.JsonData.midTypeList[2]) {
        FilterList[2].status = false;
      } else if (this.MIdType === this.JsonData.midTypeList[3]) {
        FilterList[0].status = false;
      }
      FilterList.forEach((item, index) => {
        switch (index) {
          case 0:
            FilterList[index].Value = `${100 - this.InVitiGr}%`;

            FilterList[index].tips = '粗效滤网';
            if (this.getDataList(this.PctRe)[0] === '1') {
              FilterList[index].msg = '请断电并更换粗效过滤网';
            } else if (this.getDataList(this.PctCle)[0] === '1') {
              FilterList[index].msg = '请断电并清洗粗效过滤网';
            } else {
              FilterList[index].msg = '';
            }
            break;
          case 1:
            FilterList[index].Value = `${100 - this.VitiGr}%`;
            FilterList[index].tips = '高效滤网';
            if (this.getDataList(this.PctRe)[1] === '1') {
              FilterList[index].msg = '请断电并更换HEPA过滤网';
            } else {
              FilterList[index].msg = '';
            }
            break;
          case 2:
            FilterList[index].Value = `${100 - this.MdVitiGr}%`;
            FilterList[index].tips = '中效滤网';
            if (this.getDataList(this.PctRe)[2] === '1') {
              FilterList[index].msg = '请断电并更换中效过滤网';
            } else if (this.getDataList(this.PctCle)[2] === '1') {
              FilterList[index].msg = '请断电并清洗中效过滤网';
            } else {
              FilterList[index].msg = '';
            }
            break;
          default:
            break;
        }
      });
      const result = FilterList.filter(item => {
        return item.status;
      });
      return result;
    },
  },
  methods: {
    // 10进制转二进制倒叙数组
    getDataList(data) {
      return data
        .toString(2)
        .split('')
        .reverse();
    },
  },
};

export default homeConfig;
