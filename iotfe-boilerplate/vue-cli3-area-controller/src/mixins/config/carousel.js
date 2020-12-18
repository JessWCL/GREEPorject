/**
 * @description 滑轮配置列表
 */

const CarouselConfig = {
  data() {
    return {
      // ModAll: [this.$language('mode.mode_continuous')],
      ModeOptions: {
        isShow: true, // 是否显示
        controlAble: true, // 滑轮能不能滑动
        showNumOrImg: false, // 显示数字还是图片
        horizontal: true, // 水平显示or竖直显示
        controlMode: 1,
        threeOrAll: false, // 显示3个or全部显示
        width: '100%', // 组件宽度
        spaceBetween: '1.5rem', // 间距
        marginLeft: '0rem', // 组件左边距
        height: '1rem', // 图片大小
        fontSize: '2.9rem',
        radiusMutiply: 1.5, // 半径系数
        currentMod: 0,
      },
      ModeOptionsChildren: {
        isShow: true, // 是否显示
        controlAble: false, // 滑轮能不能滑动
        showNumOrImg: false, // 显示数字还是图片
        horizontal: true, // 水平显示or竖直显示
        controlMode: 1,
        threeOrAll: false, // 显示3个or全部显示
        width: '100%', // 组件宽度
        spaceBetween: '1.5rem', // 间距
        marginLeft: '0rem', // 组件左边距
        height: '1rem', // 图片大小
        fontSize: '2.9rem',
        radiusMutiply: 1.5, // 半径系数
      },
      WdSpdOptions: {
        isShow: true, // 是否显示
        controlAble: true, // 滑轮能不能滑动
        showNumOrImg: false, // 显示数字还是图片
        horizontal: true, // 水平显示or竖直显示
        controlMode: 1,
        threeOrAll: false, // 显示3个or全部显示
        width: '100%', // 组件宽度
        spaceBetween: '1.5rem', // 间距
        marginLeft: '0rem', // 组件左边距
        height: '1.0rem', // 图片大小
        fontSize: '2.9rem',
        radiusMutiply: 1.5, // 半径系数
      },
      TempOptions: {
        isShow: true, // 是否显示
        controlAble: true, // 滑轮能不能滑动
        showNumOrImg: true, // 显示数字还是图片
        horizontal: true, // 水平显示or竖直显示
        controlMode: 1,
        threeOrAll: false, // 显示3个or全部显示
        width: '100%', // 组件宽度
        spaceBetween: '100%', // 间距
        marginLeft: '0%', // 组件左边距
        height: '3rem', // 图片大小
        fontSize: '2.9rem',
        radiusMutiply: 1.5, // 半径系数
      },
    };
  },
  computed: {
    ModeImg() {
      return [
        require('@/assets/imgs/mode/ic_cool.png'), // 制冷
        require('@/assets/imgs/mode/ic_heating.png'), // 制热
        require('@/assets/imgs/mode/ic_arefaction.png'), // 除湿
        require('@/assets/imgs/mode/ic_blowing.png'), // 送风
        require('@/assets/imgs/mode/ic_automation.png'), // 自动
      ]; // '制冷', '制热', '除湿', '送风', '自动'
    },
    modeAll() {
      return [
        {
          name: this.$language('mode.Cool'),
          val: 1,
        },
        {
          name: this.$language('mode.Heat'),
          val: 2,
        },
        {
          name: this.$language('mode.Dry'),
          val: 3,
        },
        {
          name: this.$language('mode.Fan'),
          val: 4,
        },
        {
          name: this.$language('mode.Auto'),
          val: 5,
        },
      ];
    },
    ModeCoolImg() {
      return [
        require('@/assets/imgs/mode/ic_cool.png'), // 制冷
        require('@/assets/imgs/mode/ic_arefaction.png'), // 除湿
        require('@/assets/imgs/mode/ic_blowing.png'), // 送风
        require('@/assets/imgs/mode/ic_automation.png'), // 自动
      ];
    },
    modeCoolAll() {
      return [
        {
          name: this.$language('mode.Cool'),
          val: 1,
        },
        {
          name: this.$language('mode.Dry'),
          val: 3,
        },
        {
          name: this.$language('mode.Fan'),
          val: 4,
        },
        {
          name: this.$language('mode.Auto'),
          val: 5,
        },
      ];
    },
    ModeHeatImg() {
      return [
        require('@/assets/imgs/mode/ic_heating.png'), // 制热
        require('@/assets/imgs/mode/ic_blowing.png'), // 送风
        require('@/assets/imgs/mode/ic_automation.png'), // 自动
      ];
    },
    modeHeatAll() {
      return [
        {
          name: this.$language('mode.Heat'),
          val: 2,
        },
        {
          name: this.$language('mode.Fan'),
          val: 4,
        },
        {
          name: this.$language('mode.Auto'),
          val: 5,
        },
      ];
    },
    ModeFanImg() {
      return [
        require('@/assets/imgs/mode/ic_blowing.png'), // 送风
        require('@/assets/imgs/mode/ic_blowing.png'), // 送风
      ];
    },
    modeFanAll() {
      return [
        {
          name: this.$language('mode.Fan'),
          val: 4,
        },
        {
          name: this.$language('mode.Fan'),
          val: 4,
        },
      ];
    },

    WdSpdImg() {
      return [
        require('@/assets/imgs/fan/ic_automatic_nomal.png'), // 自动风
        require('@/assets/imgs/fan/ic_low-wind_nomal.png'), // 低风
        require('@/assets/imgs/fan/ic_medium-low-wind_nomal.png'), // 中低风
        require('@/assets/imgs/fan/ic_medium-wind_nomal.png'), // 中风
        require('@/assets/imgs/fan/ic_medium-high-wind_nomal.png'), // 中高风
        require('@/assets/imgs/fan/ic_high-wind_nomal.png'), // 高风
        require('@/assets/imgs/fan/ic_strong-wind_nomal.png'), // 强劲风
        require('@/assets/imgs/fan/ic_silent_nomal.png'), // 静音风
      ];
    },
    WdSpdAll() {
      return [
        this.$language('Fan.fan_auto'),
        this.$language('Fan.fan_low'),
        this.$language('Fan.fan_medium_low'),
        this.$language('Fan.fan_medium'),
        this.$language('Fan.fan_medium_high'),
        this.$language('Fan.fan_high'),
        this.$language('Fan.fan_turbo'),
        this.$language('Fan.fan_quiet'),
      ];
    },
    TempData() {
      return [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    },
    TempDataF() {
      return [
        61,
        62,
        63,
        64,
        65,
        66,
        67,
        68,
        69,
        70,
        71,
        72,
        73,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        82,
        83,
        84,
        85,
        86,
      ];
    },
    TempDataFRec() {
      return [
        { valC: 16, valF: 61, Rec: 0 },
        { valC: 17, valF: 62, Rec: 0 },
        { valC: 17, valF: 63, Rec: 1 },
        { valC: 18, valF: 64, Rec: 0 },
        { valC: 18, valF: 65, Rec: 1 },
        { valC: 19, valF: 66, Rec: 0 },
        { valC: 19, valF: 67, Rec: 1 },
        { valC: 20, valF: 68, Rec: 0 },
        { valC: 21, valF: 69, Rec: 0 },
        { valC: 21, valF: 70, Rec: 1 },
        { valC: 22, valF: 71, Rec: 0 },
        { valC: 22, valF: 72, Rec: 1 },
        { valC: 23, valF: 73, Rec: 0 },
        { valC: 23, valF: 74, Rec: 1 },
        { valC: 24, valF: 75, Rec: 0 },
        { valC: 24, valF: 76, Rec: 1 },
        { valC: 25, valF: 77, Rec: 0 },
        { valC: 26, valF: 78, Rec: 0 },
        { valC: 26, valF: 79, Rec: 1 },
        { valC: 27, valF: 80, Rec: 0 },
        { valC: 27, valF: 81, Rec: 1 },
        { valC: 28, valF: 82, Rec: 0 },
        { valC: 28, valF: 83, Rec: 1 },
        { valC: 29, valF: 84, Rec: 0 },
        { valC: 29, valF: 85, Rec: 1 },
        { valC: 30, valF: 86, Rec: 0 },
      ];
    },
    TempData812() {
      return [
        8,
        12,
        8,
        12,
        8,
        12,
        8,
        12,
        8,
        12,
        8,
        12,
        8,
        12,
        8,
        12,
        8,
        12,
        8,
        12,
      ];
    },
    TempData812F() {
      return [
        46,
        54,
        46,
        54,
        46,
        54,
        46,
        54,
        46,
        54,
        46,
        54,
        46,
        54,
        46,
        54,
        46,
        54,
        46,
        54,
      ];
    },
    RmTypeList() {
      return [
        this.$language('room.Area'),
        this.$language('room.Master_bedroom'),
        this.$language('room.Guest_bedroom'),
        this.$language('room.Bedroom'),
        this.$language('room.Dining_room'),
        this.$language('room.Children_room'),
        this.$language('room.Study_room'),
        this.$language('room.Coffee_room'),
        this.$language('room.Storage_room'),
        this.$language('room.Activity_room'),
        this.$language('room.Kitchen'),
        this.$language('room.Bathroom'),
        this.$language('room.Living_room'),
        this.$language('room.other'),
      ];
    },
  },
};

export default CarouselConfig;
