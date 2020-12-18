/**
 * @description Home配置列表
 */
import { mapState } from 'vuex';
import homeData from '@/api/828d04/home';
import {
  RUN_STAT,
  MODE_STEAMING,
  MODE_SMART_MENU,
  MODE_NETWORK_MODE,
  MODE_HELPER,
  MODE_CLEAN,
  LIST1_SMART_MENU_CLOUD,
} from '@/api/828d04/constant';

const homeConfig = {
  data() {
    return {
      JsonData: {}
    };
  },
  created() {
    const [data] = homeData;
    this.JsonData = data;
  },
  computed: {
    ...mapState({
      cacheMod: state => state.dataObjectCache.Mod,
      cacheRunStat: state => state.dataObjectCache.RunStat,
      Mod: state => state.dataObject.Mod,
      Pow: state => state.dataObject.Pow,
      RunStat: state => state.dataObject.RunStat,
    }),
    BarColor() {
      return this.JsonData.BarColor;
    },
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
            this.JsonData.DeviceStatusIcon[index].isHidden = !this.isSleep || !this.Pow;
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
            this.JsonData.ColsList[index].Value = `${(this.TemSor - 1000)
              / 10}℃`;
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
        // 开关机
        if (index === 0) {
          this.Pow
            ? (this.JsonData.FootList[index].ImgName = 'btn_off')
            : (this.JsonData.FootList[index].ImgName = 'btn_on');
        }

        // 判断模式按钮是否禁用
        if (index === 1) {
          const { Pow, Mod } = this;
          this.JsonData.FootList[index].isDisabled = Boolean(!Pow) || Mod === MODE_STEAMING;
        // 判预约按钮是否禁用
        } else if (index === 2) {
          const { Pow, Mod, List1 } = this;
          const isCloudMenu = (Mod === MODE_SMART_MENU && List1 === LIST1_SMART_MENU_CLOUD) || Mod === MODE_NETWORK_MODE;
          const isHelper = Mod === MODE_HELPER;
          this.JsonData.FootList[index].isDisabled = Boolean(!Pow) || isHelper || isCloudMenu;
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
      const { Mod } = this;
      return this.JsonData.FootFuncList[Mod];
    }
  }
};

export default homeConfig;
