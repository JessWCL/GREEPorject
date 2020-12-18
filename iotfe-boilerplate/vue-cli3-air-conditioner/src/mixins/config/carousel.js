/**
 * @description 滑轮配置列表
 */
import { mapState } from 'vuex';

const CarouselConfig = {
  data() {
    return {
      ModAll: [
        this.$language('mode.mode_auto'),
        this.$language('mode.mode_cool'),
        this.$language('mode.mode_dry'),
        this.$language('mode.mode_fan'),
        this.$language('mode.mode_heat')
      ],
      ModImg: [
        require('@/assets/img/mode/index_mode_auto.png'), // 自动
        require('@/assets/img/mode/index_mode_cool.png'), // 制冷
        require('@/assets/img/mode/index_mode_dry.png'), // 除湿
        require('@/assets/img/mode/index_mode_fan.png'), // 送风
        require('@/assets/img/mode/index_mode_heat.png'), // 制热
      ],
      ModOptions: {
        isShow: true, // 是否显示
        controlAble: true, // 滑轮能不能滑动
        showNumOrImg: false, // 显示数字还是图片
        horizontal: true, // 水平显示or竖直显示
        controlMode: 1,
        threeOrAll: true, // 显示3个or全部显示
        width: '60%', // 组件宽度
        spaceBetween: '3rem', // 间距
        marginLeft: '0', // 组件左边距
        height: '.967rem', // 图片大小
        fontSize: '32px',
        radiusMutiply: 1, // 半径系数
      },
      WdSpdAll: [
        this.$language('fan.fan_auto'),
        this.$language('fan.fan_low'),
        this.$language('fan.fan_medium_low'),
        this.$language('fan.fan_medium'),
        this.$language('fan.fan_medium_high'),
        this.$language('fan.fan_high'),
        this.$language('fan.fan_turbo'),
        this.$language('fan.fan_quiet'),
      ],
      WdSpdImg: [
        require('@/assets/img/fan/n_auto.png'), // 自动风
        require('@/assets/img/fan/n_low.png'), // 低风档
        require('@/assets/img/fan/n_medium_low.png'), // 中低风档
        require('@/assets/img/fan/n_medium.png'), // 中风档
        require('@/assets/img/fan/n_medium_high.png'), // 中高风档
        require('@/assets/img/fan/n_high.png'), // 高风档
        require('@/assets/img/fan/n_turbo.png'), // 强劲档
        require('@/assets/img/fan/n_quiet.png'), // 静音档
      ],
      WdSpdData: {
        0: [['WdSpd', 'Tur', 'Quiet'], [0, 0, 0]],
        1: [['WdSpd', 'Tur', 'Quiet'], [1, 0, 0]],
        2: [['WdSpd', 'Tur', 'Quiet'], [2, 0, 0]],
        3: [['WdSpd', 'Tur', 'Quiet'], [3, 0, 0]],
        4: [['WdSpd', 'Tur', 'Quiet'], [4, 0, 0]],
        5: [['WdSpd', 'Tur', 'Quiet'], [5, 0, 0]],
        6: [['WdSpd', 'Tur', 'Quiet'], [6, 1, 0]],
        7: [['WdSpd', 'Tur', 'Quiet'], [7, 0, 2]],
      },
      WdSpdOptions: {
        isShow: true, // 是否显示
        controlAble: true, // 滑轮能不能滑动
        showNumOrImg: false, // 显示数字还是图片
        horizontal: true, // 水平显示or竖直显示
        controlMode: 1,
        threeOrAll: false, // 显示3个or全部显示
        width: '100%', // 组件宽度
        spaceBetween: '1rem', // 间距
        marginLeft: '0rem', // 组件左边距
        height: '1rem', // 图片大小
        fontSize: '2.9rem',
        radiusMutiply: 1.5, // 半径系数
      },
      airfanAll: [
        this.$language('fan.fan_low'),
        this.$language('fan.fan_medium'),
        this.$language('fan.fan_high'),
      ],
      airFan: [
        require('@/assets/img/fan/n_low.png'), // 低风档
        require('@/assets/img/fan/n_medium.png'), // 中风档
        require('@/assets/img/fan/n_high.png'), // 高风档
      ],
      airFanOptions: {
        isShow: true, // 是否显示
        controlAble: true, // 滑轮能不能滑动
        showNumOrImg: false, // 显示数字还是图片
        horizontal: true, // 水平显示or竖直显示
        controlMode: 1,
        threeOrAll: false, // 显示3个or全部显示
        width: '100%', // 组件宽度
        spaceBetween: '1rem', // 间距
        marginLeft: '0rem', // 组件左边距
        height: '1rem', // 图片大小
        fontSize: '2.9rem',
        radiusMutiply: 3, // 半径系数
      }
    };
  },
  computed: {
    ...mapState({
      Has05: state => state.Has05,
      Add05: state => state.dataObject.Add05,
    }),
    TemData() {
      return this.Has05 ? [16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21,
        21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26,
        27, 27, 28, 28, 29, 29, 30] :
        [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    },
    TemOptions() {
      const pos = this.Add05 ? '-.9rem' : '-.5rem';
      return {
        isShow: true, // 是否显示
        controlAble: true, // 滑轮能不能滑动
        showNumOrImg: true, // 显示数字还是图片
        horizontal: true, // 水平显示or竖直显示
        controlMode: 1,
        threeOrAll: false, // 显示3个or全部显示
        width: '100%', // 组件宽度
        spaceBetween: '6.8rem', // 间距
        marginLeft: this.Has05 ? pos : '-.5rem', // 组件左边距
        height: '3.9rem', // 图片大小
        fontSize: '2.9rem',
        radiusMutiply: 1.5, // 半径系数
        Has05: this.Has05
      };
    },
  }
};

export default CarouselConfig;
