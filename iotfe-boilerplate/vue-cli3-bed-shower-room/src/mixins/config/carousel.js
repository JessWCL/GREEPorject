/**
 * @description 滑轮配置列表
 */

const CarouselConfig = {
  data() {
    return {
      // ModAll: [this.$language('mode.mode_continuous')],
      // 浴室空调模式参数
      ModeImg: [
        require('@/assets/imgs/mode/ic_cool.png'), // 制冷
        require('@/assets/imgs/mode/ic_blowing.png'), // 送风
        require('@/assets/imgs/mode/ic_heating.png'), // 制热
        require('@/assets/imgs/mode/ic_drying_selected.png'), // 干衣
      ],
      modeAll: ['制冷', '送风', '制热', '干衣'],
      modeVal: [
        {
          name: '制冷',
          value: 1,
        },
        {
          name: '送风',
          value: 3,
        },
        {
          name: '制热',
          value: 4,
        },
        {
          name: '干衣',
          value: 8,
        },
      ],
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
      },
      // 卧室空调模式参数
      ModeForBedImg: [
        require('@/assets/imgs/mode/ic_cool.png'), // 制冷
        require('@/assets/imgs/mode/ic_blowing.png'), // 送风
        require('@/assets/imgs/mode/ic_heating.png'), // 制热
        require('@/assets/imgs/mode/ic_fresh_selected.png'), // 清爽
        require('@/assets/imgs/mode/ic_automatic-dehunmidification_selected.png'), // 自动除湿
        require('@/assets/imgs/mode/ic_go-out_selected.png'), // 外出
      ],
      // 卧室空调模式参数（场景）
      ModeForBedImgScene: [
        require('@/assets/imgs/mode/ic_cool.png'), // 制冷
        require('@/assets/imgs/mode/ic_blowing.png'), // 送风
        require('@/assets/imgs/mode/ic_heating.png'), // 制热
        require('@/assets/imgs/mode/ic_fresh_selected.png'), // 清爽
        require('@/assets/imgs/mode/ic_automatic-dehunmidification_selected.png'), // 自动除
      ],
      ModeOptionsForBed: {
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
      },
      modeForBedAll: ['制冷', '送风', '制热', '清爽', '自动除湿', '外出'],
      modeForBedVal: [
        {
          name: '制冷',
          value: 1,
        },
        {
          name: '送风',
          value: 3,
        },
        {
          name: '制热',
          value: 4,
        },
        {
          name: '清爽',
          value: 9,
        },
        {
          name: '自动除湿',
          value: 10,
        },
        {
          name: '外出',
          value: 11,
        },
      ],
      // 浴室空调风档参数
      WdSpdImg: [
        require('@/assets/imgs/fan/ic_low-wind_nomal.png'), // 低风
        require('@/assets/imgs/fan/ic_high-wind_nomal.png'), // 高风
        require('@/assets/imgs/fan/ic_silent_nomal.png'), // 静音
      ],
      WdSpdAll: ['低风', '高风', '静音'],
      WdSpdAllValue: [
        {
          name: '低风',
          value: 1,
          Quiet: 0,
        },
        {
          name: '高风',
          value: 5,
          Quiet: 0,
        },
        {
          name: '静音',
          value: 1,
          Quiet: 1,
        },
      ],
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
        height: '1rem', // 图片大小
        fontSize: '2.9rem',
        radiusMutiply: 1.5, // 半径系数
        Mid: '',
      },
      // 卧室空调风档参数
      WdSpdForBedImg: [
        require('@/assets/imgs/fan/ic_silent_nomal.png'), // 静音
        require('@/assets/imgs/fan/ic_automatic_nomal.png'), // 自动
        require('@/assets/imgs/fan/ic_low-wind_nomal.png'), // 低风
        require('@/assets/imgs/fan/ic_medium-low-wind_nomal.png'), // 中低风
        require('@/assets/imgs/fan/ic_medium-wind_nomal.png'), // 中风
        require('@/assets/imgs/fan/ic_medium-high-wind_nomal.png'), // 中高风
        require('@/assets/imgs/fan/ic_high-wind_nomal.png'), // 高风
        require('@/assets/imgs/fan/ic_strong-wind_nomal.png'), // 强劲风
      ],
      WdSpdForBedAll: [
        '静音',
        '自动',
        '低风',
        '中低风',
        '中风',
        '中高风',
        '高风',
        '强劲风',
      ],
      WdSpdAllForBedValue: [
        {
          name: '静音',
          value: -1,
          Quiet: 1,
        },
        {
          name: '自动',
          value: 0,
          Quiet: 0,
        },
        {
          name: '低风',
          value: 1,
          Quiet: 0,
        },
        {
          name: '中低风',
          value: 2,
          Quiet: 0,
        },
        {
          name: '中风',
          value: 3,
          Quiet: 0,
        },
        {
          name: '中高风',
          value: 4,
          Quiet: 0,
        },
        {
          name: '高风',
          value: 5,
          Quiet: 0,
        },
        {
          name: '强劲风',
          value: 6,
          Quiet: -1,
        },
      ],
      WdSpdForBedOptions: {
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
        Has05: false,
      },
      //  清爽温度滑轮
      TempOptionsqs: {
        isShow: true, // 是否显示
        controlAble: true, // 滑轮能不能滑动
        showNumOrImg: true, // 显示数字还是图片
        horizontal: false, // 水平显示or竖直显示
        controlMode: 1,
        threeOrAll: false, // 显示3个or全部显示
        width: '100%', // 组件宽度
        spaceBetween: '70%', // 间距
        marginLeft: '0%', // 组件左边距
        height: '1rem', // 图片大小
        fontSize: '1.9rem',
        radiusMutiply: 1.5, // 半径系数
        Has05: false,
      },
      HumidityOption: {
        isShow: true, // 是否显示
        controlAble: true, // 滑轮能不能滑动
        showNumOrImg: true, // 显示数字还是图片
        horizontal: false, // 水平显示or竖直显示
        controlMode: 1,
        threeOrAll: false, // 显示3个or全部显示
        width: '100%', // 组件宽度
        spaceBetween: '70%', // 间距
        marginLeft: '0%', // 组件左边距
        height: '1rem', // 图片大小
        fontSize: '1.9rem',
        radiusMutiply: 1.5, // 半径系数
      },
      // 卧室空调温度范围
      TempData: [
        16,
        16,
        17,
        17,
        18,
        18,
        19,
        19,
        20,
        20,
        21,
        21,
        22,
        22,
        23,
        23,
        24,
        24,
        25,
        25,
        26,
        26,
        27,
        27,
        28,
        28,
        29,
        29,
        30,
      ],
      // 卧室空调湿度范围
      HumidityData: [45, 50, 55, 60, 65],
      // 浴室空调温度范围
      TempDatays: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    };
  },
  computed: {
    TemData() {
      return [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80];
    },
    TemOptions() {
      return {
        isShow: true, // 是否显示
        controlAble: true, // 滑轮能不能滑动
        showNumOrImg: true, // 显示数字还是图片
        horizontal: true, // 水平显示or竖直显示
        controlMode: 1,
        threeOrAll: false, // 显示3个or全部显示
        width: '100%', // 组件宽度
        spaceBetween: '6.8rem', // 间距
        marginLeft: '-.5rem', // 组件左边距
        height: '3.9rem', // 图片大小
        fontSize: '2.9rem',
        radiusMutiply: 1.5, // 半径系数
      };
    },
  },
};

export default CarouselConfig;
