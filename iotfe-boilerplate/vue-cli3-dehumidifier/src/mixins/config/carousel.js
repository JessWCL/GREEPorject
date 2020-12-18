/**
 * @description 滑轮配置列表
 */

const CarouselConfig = {
  data() {
    return {
      ModAll: ['mode.mode_continuous'],
      ModImg: [
        require('@/assets/img/mode/smartmode_s.png') // 连续除湿
      ],
      WdSpdAll: ['fan.fan_low', 'fan.fan_high'],
      WdSpdImg: [
        require('@/assets/img/fan/fan_low_s.png'), // 低风
        require('@/assets/img/fan/fan_high_s.png') // 高风
      ],
      WdSpdImgList: [
        require('@assets/img/13804/wind_low.png'),
        require('@assets/img/13804/wind_high.png')
      ], 
      WdSpdData: {
        0: [['WdSpd'], [0]],
        1: [['WdSpd'], [1]]
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
        height: window.VUE_APP_MID === '13803'? '1rem' : '0.82rem', // 图片大小
        fontSize: '2.9rem',
        radiusMutiply: 1.5 // 半径系数
      },
      // 模式滑轮的配置
      ModeItems: [
        require('@/assets/img/13804/mode_dehumidify.png'),
        require('@/assets/img/13804/mode_uv.png')
      ],
      ModeCarouselOptions: {
        isShow: true, // 是否显示
        controlAble: true, // 滑轮能不能滑动
        showNumOrImg: false, // 显示数字还是图片
        horizontal: true, // 水平显示or竖直显示
        controlMode: 1,
        threeOrAll: false, // 显示3个or全部显示
        width: '100%', // 组件宽度
        spaceBetween: '1.5rem', // 间距
        marginLeft: '0rem', // 组件左边距
        height: '0.82rem', // 图片大小
        fontSize: '2.9rem',
        radiusMutiply: 1.5 // 半径系数
      },
      humidityCarouselOptions: {
        isShow: true, // 是否显示
        controlAble: true, // 滑轮能不能滑动
        showNumOrImg: true, // 显示数字还是图片
        horizontal: true, // 水平显示or竖直显示
        controlMode: 1,
        threeOrAll: false, // 显示3个or全部显示
        width: '100%', // 组件宽度
        spaceBetween: '3.3rem', // 间距
        marginLeft: '0rem', // 组件左边距
        height: '3.2rem', // 图片大小
        fontSize: '3.2rem',
        radiusMutiply: 0.8, // 半径系数
        flat: true
      }
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
        radiusMutiply: 1.5 // 半径系数
      };
    }
  }
};

export default CarouselConfig;
