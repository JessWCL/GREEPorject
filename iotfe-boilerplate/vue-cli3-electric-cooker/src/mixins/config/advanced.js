/**
 * @constant {object} advancedConfig
 * @description 高级功能配置列表
 */
const advancedConfig = {
  data() {
    return {
      advancedList: [
        {
          index: 0, // 在该数组中的下标
          protocol: 'mode', // 对应协议
          protocolVal: 2, // 对应协议的取值
          name: this.$language('mode.marrow'), // 模式名称, 精煮饭
          defaultTime: 50, // 默认烹饪时间
          minTime: 50, // 最小烹饪时间
          maxTime: 50, // 最大烹饪时间
          hasTimer: false, // 有没有定时
          hasAppointment: true, // 有没有预约
          ImgUrl: require('../../assets/img/btn_marrow.png'), // 未选中模式图标
          lightImgUrl: require('../../assets/img/btn_marrow_select.png') // 选中模式的图标
        },
        {
          index: 1,
          protocol: 'mode',
          protocolVal: 3,
          name: this.$language('mode.fastCook'), // 快煮饭
          defaultTime: 38,
          minTime: 38,
          maxTime: 38,
          hasTimer: false,
          hasAppointment: false,
          ImgUrl: require('../../assets/img/btn_fastCook.png'),
          lightImgUrl: require('../../assets/img/btn_fastCook_select.png')
        },
        {
          index: 2,
          protocol: 'mode',
          protocolVal: 18,
          name: this.$language('mode.crude'), // 糙米饭
          defaultTime: 95,
          minTime: 95,
          maxTime: 95,
          hasTimer: false,
          hasAppointment: true,
          ImgUrl: require('../../assets/img/btn_crude.png'),
          lightImgUrl: require('../../assets/img/btn_crude_select.png')
        },
        {
          index: 3,
          protocol: 'mode',
          protocolVal: 13,
          name: this.$language('mode.germination'), // 发芽饭
          defaultTime: 240,
          minTime: 240,
          maxTime: 240,
          hasTimer: false,
          hasAppointment: true,
          ImgUrl: require('../../assets/img/btn_germination.png'),
          lightImgUrl: require('../../assets/img/btn_germination_select.png')
        },
        {
          index: 4,
          protocol: 'mode',
          protocolVal: 8,
          name: this.$language('mode.cerealCongee'), // 杂粮粥
          defaultTime: 120,
          minTime: 90,
          maxTime: 180,
          hasTimer: true,
          hasAppointment: true,
          ImgUrl: require('../../assets/img/btn_cerealCongee.png'),
          lightImgUrl: require('../../assets/img/btn_cerealCongee_select.png')
        },
        {
          index: 5,
          protocol: 'mode',
          protocolVal: 4,
          name: this.$language('mode.congee'), // 煮粥
          defaultTime: 90,
          minTime: 60,
          maxTime: 120,
          hasTimer: true,
          hasAppointment: true,
          ImgUrl: require('../../assets/img/btn_congee.png'),
          lightImgUrl: require('../../assets/img/btn_congee_select.png')
        },
        {
          index: 6,
          protocol: 'mode',
          protocolVal: 5,
          name: this.$language('mode.porridge'), // 稀饭
          defaultTime: 60,
          minTime: 60,
          maxTime: 90,
          hasTimer: true,
          hasAppointment: true,
          ImgUrl: require('../../assets/img/btn_porridge.png'),
          lightImgUrl: require('../../assets/img/btn_porridge_select.png')
        },
        {
          index: 7,
          protocol: 'mode',
          protocolVal: 6,
          name: this.$language('mode.soup'), // 煲汤
          defaultTime: 90,
          minTime: 90,
          maxTime: 180,
          hasTimer: true,
          hasAppointment: true,
          ImgUrl: require('../../assets/img/btn_Soup.png'),
          lightImgUrl: require('../../assets/img/btn_soup_select.png')
        },
        {
          index: 8,
          protocol: 'mode',
          protocolVal: 7,
          name: this.$language('mode.heating'), // 热饭
          defaultTime: 20,
          minTime: 20,
          maxTime: 20,
          hasTimer: false,
          hasAppointment: false,
          ImgUrl: require('../../assets/img/btn_heating.png'),
          lightImgUrl: require('../../assets/img/btn_heating_select.png')
        },
        {
          index: 9,
          protocol: 'mode',
          protocolVal: 10,
          name: this.$language('mode.steam'), // 蒸煮
          defaultTime: 30,
          minTime: 5,
          maxTime: 60,
          hasTimer: true,
          hasAppointment: true,
          ImgUrl: require('../../assets/img/btn_steam.png'),
          lightImgUrl: require('../../assets/img/btn_steam_select.png')
        },
        {
          index: 10,
          protocol: 'mode',
          protocolVal: 11,
          name: this.$language('mode.cake'), // 蛋糕
          defaultTime: 50,
          minTime: 50,
          maxTime: 50,
          hasTimer: false,
          hasAppointment: false,
          ImgUrl: require('../../assets/img/btn_Cake.png'),
          lightImgUrl: require('../../assets/img/btn_cake_select.png')
        },
        {
          index: 11,
          protocol: 'mode',
          protocolVal: 12,
          name: this.$language('mode.yogurt'), // 酸奶
          defaultTime: 480,
          minTime: 360,
          maxTime: 720,
          hasTimer: true,
          hasAppointment: false,
          ImgUrl: require('../../assets/img/btn_yoghurt.png'),
          lightImgUrl: require('../../assets/img/btn_yoghurt_select.png')
        },
        {
          index: 12,
          protocol: 'mode',
          protocolVal: 30,
          name: this.$language('mode.keepWarm'), // 保温
          defaultTime: 0,
          minTime: 0,
          maxTime: 0,
          hasTimer: false,
          hasAppointment: false,
          ImgUrl: require('../../assets/img/btn_keepWarm.png'),
          lightImgUrl: require('../../assets/img/btn_keepWarm_select.png')
        }
      ]
    };
  }
};

export default advancedConfig;
