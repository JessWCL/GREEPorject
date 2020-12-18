/**
 * @description Home配置列表
 */
import homeData from '@/api/60a0/home';

const homeConfig = {
  data() {
    return {
      JsonData: {}
    };
  },
  created() {
    this.JsonData = homeData;
  },
  computed: {
    // 
    BarColor() {
      return this.JsonData.BarColor;
    },

    ModeList() {
      this.JsonData.ModeList.forEach((item, index) => {
        // 是否选中
        const key = item.value.split('_')[0];
        const value = item.value.split('_')[1] >> 0;
        const isSelct = this.dataObject[key] == value;
        this.JsonData.ModeList[index].isSelct = !!isSelct

        // 是否置灰
        this.JsonData.ModeList[index].disabled = !!disabled
        const disabled = item.disabled_arr.find(ele => {
          const key = ele.split('_')[0];
          const value = ele.split('_')[1] >> 0;
          return this.dataObject[key] == value;
        })
        this.JsonData.ModeList[index].disabled = !!disabled

        if (disabled) this.JsonData.ModeList[index].isSelct = false

        this.JsonData.ModeList[index].imgSatus = isSelct && !disabled ? 'on' : 'off'
      })
      return this.JsonData.ModeList;
    },

    // 小图标
    DeviceStatusIcon() {
      this.JsonData.DeviceStatusIcon.forEach((item, index) => {
        const active = item.active_arr.find((ele) => {
          const key = ele.split('_')[0];
          const value = ele.split('_')[1] >> 0;
          return this.dataObject[key] == value;
        })
        this.JsonData.DeviceStatusIcon[index].isHidden = !active
      });
      return this.JsonData.DeviceStatusIcon;
    },

    // 盒子卡片底部数据
    JsonDataList() {
      for (let i = 0; i < this.ChargeOnesCountInNum2(); i += 1) {
        this.JsonData[`ColsList_${i}`].forEach((item, index) => {
          switch (index) {
            case 0:
              this.JsonData[`ColsList_${i}`][index].Value =
                `${this.DataBoxData[i].TemSor}` === '0' ? '--' : `${this.DataBoxData[i].TemSor - 100} ℃`;
              break;
            case 1:
              this.JsonData[`ColsList_${i}`][index].Value =
                `${this.DataBoxData[i].HumSor}` === '0' ? '--' : `${this.DataBoxData[i].HumSor - 100} %`;
              break;
            case 2:
              this.JsonData[`ColsList_${i}`][index].Value =
                `${this.DataBoxData[i].CO2}` === '0' ? '--' : `${this.DataBoxData[i].CO2} ppm`; // ppm
              break;
            case 3:
              this.JsonData[`ColsList_${i}`][index].Value =
                `${this.DataBoxData[i].PM2P5}` === '0' ? '--' : `${this.DataBoxData[i].PM2P5} μg/m3`; // μg/m3
              break;
            default:
              break;
          }
        });
      }
      return this.JsonData;
    },

    // 底部功能显示控制
    FootList() {
      this.JsonData.FootList.forEach((item, index) => {
        this.JsonData.FootList[index].isShowFuncBtn = Boolean(!this.isScene);

        const isHidden = item.hidden_arr.find(ele => {
          const key = ele.split('_')[0];
          const value = ele.split('_')[1] >> 0;
          return this.dataObject[key] == value;
        })
        if (isHidden) {
          this.JsonData.FootList[index].imgSatus = 'off'
          this.JsonData.FootList[index].hide = true
        } else {
          this.JsonData.FootList[index].hide = false
          const isActive = item.active_arr.find(ele => {
            const key = ele.split('_')[0];
            const value = ele.split('_')[1] >> 0;
            return this.dataObject[key] == value;
          });
          this.JsonData.FootList[index].active = !!isActive;

          const isGray = item.gray_arr.find(ele => {
            const key = ele.split('_')[0];
            const value = ele.split('_')[1] >> 0;
            return this.dataObject[key] == value;
          });
          this.JsonData.FootList[index].gray = !!isGray;

          if (isGray) this.JsonData.FootList[index].active = false

          this.JsonData.FootList[index].imgSatus = isActive && !isGray ? 'on' : 'off'
        }

      });
      return this.JsonData.FootList;
    },

    // 
    FootFuncList() {
      let FootFuncArray = [];
      FootFuncArray = this.JsonData.FootFuncList;
      // 这一块 缺少ui图，接手的大佬记得改下真实图标
      FootFuncArray.forEach((item, index) => {
        const IMGNAMEON = item.ImgNameOn;
        const IMGNAMEOFF = item.ImgNameOff;
        switch (index) {
          case 0:
            FootFuncArray[index].iconName = this.Timer ? IMGNAMEON : IMGNAMEOFF;
            FootFuncArray[index].bgcolor = this.Timer;
            FootFuncArray[index].Disabled = false;
            break;
          case 1:
            FootFuncArray[index].iconName = IMGNAMEOFF;
            FootFuncArray[index].Disabled = false;
            FootFuncArray[index].bgcolor = false;
            break;
          case 2:
            FootFuncArray[index].iconName = this.Inloop ? IMGNAMEON : IMGNAMEOFF;
            FootFuncArray[index].bgcolor = this.Inloop;
            FootFuncArray[index].Disabled = this.SensorErr > 0 || this.FanMod === 3;
            break;
          default:
            break;
        }
      });
      return FootFuncArray;
    },

    // 滤网文案
    FilterScreen() {
      let FilterList = [];
      FilterList = this.JsonData.Filter;
      FilterList.forEach((item, index) => {
        switch (index) {
          case 0:
            FilterList[index].Value = this.InVitiGrCg === 0 ? 0 : 200 - this.InVitiGrCg;
            FilterList[index].tips = '粗效/中效滤网';
            if (this.PctRe === 1 || this.PctRe === 3) { // 清洗 & 更换同时存在 优先显示更换 
              FilterList[index].msg = '请断电并更换粗效/中效过滤网';
            } else if (this.PctCle === 1 || this.PctCle === 3) {
              FilterList[index].msg = '请断电并清洗粗效/中效过滤网';
            } else {
              FilterList[index].msg = '正常';
            }
            break;
          case 1:
            FilterList[index].Value = this.VitiGr === 0 ? 0 : 200 - this.VitiGr;
            FilterList[index].tips = '高效滤网';
            if (this.PctRe === 2 || this.PctRe === 3) {
              FilterList[index].msg = '请断电并更换高效过滤网';
            } else {
              FilterList[index].msg = '正常';
            }
            break;
          case 2:
            FilterList[index].Value = this.IFDtiGr === 0 ? 0 : 200 - this.IFDtiGr;
            FilterList[index].tips = 'IFD滤网';
            if (this.PctCle === 2 || this.PctCle === 3) {
              FilterList[index].msg = '请断电并清洗IFD过滤网';
            } else {
              FilterList[index].msg = '正常';
            }
            break;
          default:
            break;
        }
      });

      FilterList.forEach((ele, row) => {
        const arr = this.JsonData.filterColor.value
        const IndexValue = arr.findIndex(item => {
          return item > (ele.Value >> 0)
        })
        FilterList[row].color = this.JsonData.filterColor.color[IndexValue]
      })
      return FilterList;
    }
  }
};

export default homeConfig;