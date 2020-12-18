const HumidityRange = [];
for (let i = 30; i <= 80;){
  HumidityRange.push(i);
  i = i + 5;
}

const CarouselConfig = {
  data() {
    return {
      // 除湿模式滑轮的配置
      modeDehumidity: {
        carouselData: ['subMode.continuity', 'subMode.smart', 'subMode.quiet'],
        carouselOptions: {
          isShow: true, // 是否显示
          controlAble: true, // 滑轮能不能滑动
          showNumOrImg: true, // 显示数字还是图片
          horizontal: true, // 水平显示or竖直显示
          controlMode: 1,
          threeOrAll: true, // 显示3个or全部显示
          width: '100%', // 组件宽度
          spaceBetween: '3rem', // 间距
          marginLeft: '0rem', // 组件左边距
          height: '0.8rem', // 图片大小
          fontSize: '0.72rem',
          radiusMutiply: 0.7, // 半径系数
          flat: true // 平面不透视
        }
      },
      // 干衣模式滑轮的配置
      modeDry: {
        carouselData: ['subMode.fast', 'subMode.keep'],
        carouselOptions: {
          isShow: true, // 是否显示
          controlAble: true, // 滑轮能不能滑动
          showNumOrImg: true, // 显示数字还是图片
          horizontal: true, // 水平显示or竖直显示
          controlMode: 1,
          threeOrAll: true, // 显示3个or全部显示
          width: '100%', // 组件宽度
          spaceBetween: '3rem', // 间距
          marginLeft: '0rem', // 组件左边距
          height: '0.8rem', // 图片大小
          fontSize: '0.72rem',
          radiusMutiply: 0.86, // 半径系数
          flat: true // 平面不透视
        }
      },
      // 湿度滑轮配置项
      humidity: {
        carouselData: HumidityRange,
        carouselOptions: {
          isShow: true, // 是否显示
          controlAble: true, // 滑轮能不能滑动
          showNumOrImg: true, // 显示数字还是图片
          horizontal: true, // 水平显示or竖直显示
          controlMode: 1,
          threeOrAll: false, // 显示3个or全部显示
          width: '100%', // 组件宽度
          spaceBetween: '3rem', // 间距
          marginLeft: '0rem', // 组件左边距
          height: '2.36rem', // 图片大小
          fontSize: '3.2rem',
          radiusMutiply: 0.8, // 半径系数
          flat: true
        }
      },
      // 风档滑轮配置项
      windSpeed: {
        carouselData: [
          require('../../../assets/img/windSpeed/auto.png'),
          require('../../../assets/img/windSpeed/low.png'),
          require('../../../assets/img/windSpeed/middle.png'),
          require('../../../assets/img/windSpeed/high.png'),
        ],
        nameList: ['windSpeed.auto', 'windSpeed.low', 'windSpeed.middle', 'windSpeed.high'],
        carouselOptions: {
          isShow: true, // 是否显示
          controlAble: true, // 滑轮能不能滑动
          showNumOrImg: false, // 显示数字还是图片
          horizontal: true, // 水平显示or竖直显示
          controlMode: 1,
          threeOrAll: false, // 显示3个or全部显示
          width: '100%', // 组件宽度
          spaceBetween: '2rem', // 间距
          marginLeft: '0rem', // 组件左边距
          height: '1rem', // 图片大小
          fontSize: '2.9rem',
          radiusMutiply: 1 // 半径系数
        }
      }
    }
  }
};

export default CarouselConfig;