/**
 * @constant {object} homeConfig
 * @description 饭煲配置列表
 */
const miniteAll = [];
const hourAll = [];
// 时间范围数组
for (let i = 0; i < 24; i += 1) {
  if (i < 10) {
    hourAll.push(`0${i}`);
  } else {
    hourAll.push(i);
  }
}
for (let i = 0; i < 60; i += 1) {
  if (i < 10) {
    miniteAll.push(`0${i}`);
  } else {
    miniteAll.push(i);
  }
}
const homeConfig = {
  data() {
    return {
      ModList: [
        {
          src: require('../../assets/img/carousel_marrow.png'), // 精煮饭
          title: this.$language('mode.marrow')
        },
        {
          src: require('../../assets/img/carousel_marrow.png'), // 快煮饭
          title: this.$language('mode.fastCook')
        },
        {
          src: require('../../assets/img/carousel_marrow.png'), // 糙米饭
          title: this.$language('mode.crude')
        },
        {
          src: require('../../assets/img/carousel_germination.png'), // 发芽饭
          title: this.$language('mode.germination')
        },
        {
          src: require('../../assets/img/carousel_cerealCongee.png'), // 杂粮粥
          title: this.$language('mode.cerealCongee')
        },
        {
          src: require('../../assets/img/carousel_congee.png'), // 煮粥
          title: this.$language('mode.congee')
        },
        {
          src: require('../../assets/img/carousel_porridge.png'), // 稀饭
          title: this.$language('mode.porridge')
        },
        {
          src: require('../../assets/img/carousel_soup.png'), // 煲汤
          title: this.$language('mode.soup')
        },
        {
          src: require('../../assets/img/carousel_heating.png'), // 热饭
          title: this.$language('mode.heating')
        },
        {
          src: require('../../assets/img/carousel_steam.png'), // 蒸煮
          title: this.$language('mode.steam')
        },
        {
          src: require('../../assets/img/carousel_cake.png'), // 蛋糕
          title: this.$language('mode.cake')
        },
        {
          src: require('../../assets/img/carousel_yoghurt.png'), // 酸奶
          title: this.$language('mode.yogurt')
        },
        {
          src: require('../../assets/img/carousel_keepWarm.png'), // 保温
          title: this.$language('mode.keepWarm')
        }
      ],
      // 通用滑轮配置
      swiperOptions: {
        effect: 'cube',
        cubeEffect: {
          slideShadows: false,
          shadow: false
        },
        noSwiping: true
      },
      footList: [
        {
          index: 0,
          name: this.$language('home.function'),
          show: false, // 开始烹饪后是否显示该功能
          sceneInvalid: false, // 场景模式下是否禁用此功能
          ImgUrl: require('../../assets/img/btn_function.png')
        },
        {
          index: 1,
          name: this.$language('home.Appointment'),
          show: false,
          sceneInvalid: true,
          ImgUrl: require('../../assets/img/btn_timer.png')
        },
        {
          index: 2,
          name: this.$language('home.menu'),
          show: true,
          sceneInvalid: false,
          ImgUrl: require('../../assets/img/btn_menu.png')
        },
        {
          index: 3,
          name: this.$language('home.voice'),
          show: true,
          sceneInvalid: true,
          ImgUrl: require('../../assets/img/btn_voice.png')
        }
      ],
      riceList: [
        // 米种
        {
          name: '长粒米'
        },
        {
          name: '短粒米'
        }
        // {
        //   name: '糙米'
        // }
      ],
      tasteList: [
        // 口感
        {
          name: '稍软'
        },
        {
          name: '适中'
        },
        {
          name: '稍硬'
        }
      ],
      defaultTime: [
        // 不同米种口感对应的烹饪时间
        [60, 50, 40], // 长粒米: [稍软、适中、稍硬]
        [60, 55, 45], // 短粒米: [稍软、适中、稍硬]
        [60, 50, 40] // 长粒米: [稍软、适中、稍硬]
      ],
      progressList: [
        // 煮饭阶段
        {
          index: 0,
          modeId: 0,
          stepName: this.$language('home.cooking'),
          className: 0
        },
        {
          index: 1,
          modeId: 1,
          stepName: this.$language('home.stage_one'),
          className: 1
        },
        {
          index: 2,
          modeId: 2,
          stepName: this.$language('home.stage_two'),
          className: 2
        },
        {
          index: 3,
          modeId: 3,
          stepName: this.$language('home.stage_three'),
          className: 3
        },
        {
          index: 4,
          modeId: 4,
          stepName: this.$language('home.stage_four'),
          className: 4
        },
        {
          index: 5,
          modeId: 5,
          stepName: this.$language('home.stage_five'),
          className: 5
        },
        {
          index: 6,
          modeId: 6,
          stepName: this.$language('home.cooking'),
          className: 6
        }
      ]
    };
  }
};

export default homeConfig;
