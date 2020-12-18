/**
 * @constant {object} modeConfig
 * @description 模式列表
 */
const modeConfig = {
  data() {
    return {
      modeList: [
        {
          index: 0, // 在该数组中的下标
          itemId: 2, // 与整机模式对应
          modeName: this.$language('mode_jhz'), // 精煮饭 // 模式名称
          timeType: 'countdown', // 倒计时, 除了保温为正计时
          isCookingProcess: true, // 是否显示烹饪过程
          hasRunlight: true, // 是否有跑马灯阶段
          requireTime: 50, // 默认烹饪时间
          selected: false, // Mode页面的模式是否被选中
          defaultTime: 50, // 默认烹饪时间
          minTime: 50, // 最小烹饪时间
          maxTime: 50, // 最大烹饪时间
          hasTimer: false, // 有没有定时
          hasAppointment: true, // 有没有预约
          hasRice: true, // 是否有米种选择
          hasTextre: true, // 是否口感选择
          defaultTimeForCustomize: [
            [50, 40, 30],
            [55, 45, 35],
            [85, 75, 65],
          ],
          ImgUrl: require('../assets/img/new_btn_finecooking.png'), // 未选中模式图标
          selectImgUrl: require('../assets/img/new_btn_finecooking_select.png'), // 选中模式的图标
          carouselImgUrl: require('../assets/img/new_icon_finecooking_index.png'), // 精煮饭
        },
        {
          index: 1,
          itemId: 3,
          modeName: this.$language('mode_ckz'), // 快煮饭
          timeType: 'countdown', // 倒计时, 除了保温为正计时
          isCookingProcess: true, // 是否显示烹饪过程
          hasRunlight: false, // 是否有跑马灯阶段
          requireTime: 30,
          selected: false,
          defaultTime: 30, // 默认烹饪时间
          minTime: 30, // 最小烹饪时间
          maxTime: 30, // 最大烹饪时间
          hasTimer: false, // 有没有定时
          imerAppointmentDesc: '', // 预约定时界面的提示语
          hasAppointment: false, // 有没有预约
          hasRice: false, // 是否有米种选择
          hasTextre: false, // 是否口感选择
          ImgUrl: require('../assets/img/new_btn_fastCooking.png'),
          selectImgUrl: require('../assets/img/new_btn_fastCooking_select.png'),
          carouselImgUrl: require('../assets/img/new_icon_fastCooking_index.png'), // 快煮饭
        },
        {
          index: 2,
          itemId: 4,
          modeName: this.$language('mode_zz'), // 煮粥
          timeType: 'countdown', // 倒计时, 除了保温为正计时
          isCookingProcess: false, // 是否显示烹饪过程
          hasRunlight: false, // 是否有跑马灯阶段
          requireTime: 90,
          selected: false,
          defaultTime: 90, // 默认烹饪时间
          minTime: 60, // 最小烹饪时间
          maxTime: 120, // 最大烹饪时间
          hasTimer: true, // 有没有定时
          hasAppointment: true, // 有没有预约
          hasRice: false, // 是否有米种选择
          hasTextre: false, // 是否口感选择
          ImgUrl: require('../assets/img/new_btn_cookcongee.png'),
          selectImgUrl: require('../assets/img/new_btn_cookcongee_select.png'),
          carouselImgUrl: require('../assets/img/new_icon_cookcongee_index.png'), // 煮粥
        },
        {
          index: 3,
          itemId: 5,
          modeName: this.$language('mode_xf'), // 稀饭
          timeType: 'countdown', // 倒计时, 除了保温为正计时
          isCookingProcess: false, // 是否显示烹饪过程
          hasRunlight: false, // 是否有跑马灯阶段
          requireTime: 60,
          selected: false,
          defaultTime: 60, // 默认烹饪时间
          minTime: 40, // 最小烹饪时间
          maxTime: 90, // 最大烹饪时间
          hasTimer: true, // 有没有定时
          hasAppointment: true, // 有没有预约
          hasRice: false, // 是否有米种选择
          hasTextre: false, // 是否口感选择
          ImgUrl: require('../assets/img/new_btn_congeegal.png'),
          selectImgUrl: require('../assets/img/new_btn_congeegal_select.png'),
          carouselImgUrl: require('../assets/img/new_icon_congeegal_index.png'), // 稀饭
        },
        {
          index: 4,
          itemId: 6,
          modeName: this.$language('mode_bt'), // 煲汤
          timeType: 'countdown', // 倒计时, 除了保温为正计时
          isCookingProcess: false, // 是否显示烹饪过程
          hasRunlight: false, // 是否有跑马灯阶段
          requireTime: 90,
          selected: false,
          defaultTime: 90, // 默认烹饪时间
          minTime: 90, // 最小烹饪时间
          maxTime: 180, // 最大烹饪时间
          hasTimer: true, // 有没有定时
          hasAppointment: true, // 有没有预约
          hasRice: false, // 是否有米种选择
          hasTextre: false, // 是否口感选择
          ImgUrl: require('../assets/img/new_btn_soup.png'),
          selectImgUrl: require('../assets/img/new_btn_soup_select.png'),
          carouselImgUrl: require('../assets/img/new_icon_soup_index.png'), // 煲汤
        },
        {
          index: 5,
          itemId: 7,
          modeName: this.$language('mode_zjr'), // 熱饭
          timeType: 'countdown', // 倒计时, 除了保温为正计时
          isCookingProcess: false, // 是否显示烹饪过程
          hasRunlight: true, // 是否有跑马灯阶段
          requireTime: 20,
          selected: false,
          defaultTime: 20, // 默认烹饪时间
          minTime: 20, // 最小烹饪时间
          maxTime: 20, // 最大烹饪时间
          hasTimer: false, // 有没有定时
          hasAppointment: true, // 有没有预约
          hasRice: false, // 是否有米种选择
          hasTextre: false, // 是否口感选择
          ImgUrl: require('../assets/img/new_btn_hotmeal.png'),
          selectImgUrl: require('../assets/img/new_btn_hotmeal_select.png'),
          carouselImgUrl: require('../assets/img/new_icon_hotmeal_index.png'), // 热饭
        },
        {
          index: 6,
          itemId: 9,
          modeName: this.$language('mode_gbf'), // 锅巴饭
          timeType: 'countdown', // 倒计时, 除了保温为正计时
          isCookingProcess: true, // 是否显示烹饪过程
          hasRunlight: false, // 是否有跑马灯阶段
          requireTime: 50,
          selected: false,
          defaultTime: 50, // 默认烹饪时间
          minTime: 50, // 最小烹饪时间
          maxTime: 50, // 最大烹饪时间
          hasTimer: false, // 有没有定时
          hasAppointment: true, // 有没有预约
          hasRice: false, // 是否有米种选择
          hasTextre: false, // 是否口感选择
          ImgUrl: require('../assets/img/new_btn_crust.png'),
          selectImgUrl: require('../assets/img/new_btn_crust_select.png'),
          carouselImgUrl: require('../assets/img/new_icon_crust_index.png'), // 锅巴饭
        },
        {
          index: 7,
          itemId: 11,
          modeName: this.$language('mode_dg'), // 蛋糕
          timeType: 'countdown', // 倒计时, 除了保温为正计时
          isCookingProcess: false, // 是否显示烹饪过程
          hasRunlight: true, // 是否有跑马灯阶段
          requireTime: 50,
          selected: false,
          defaultTime: 50, // 默认烹饪时间
          minTime: 50, // 最小烹饪时间
          maxTime: 50, // 最大烹饪时间
          hasTimer: false, // 有没有定时
          hasAppointment: false, // 有没有预约
          hasRice: false, // 是否有米种选择
          hasTextre: false, // 是否口感选择
          ImgUrl: require('../assets/img/new_btn_cake.png'),
          selectImgUrl: require('../assets/img/new_btn_cake_select.png'),
          carouselImgUrl: require('../assets/img/new_icon_cake_index.png'), // 蛋糕
        },
        {
          index: 8,
          itemId: 30,
          modeName: this.$language('mode_bw'), // 保温
          timeType: 'timing', // 正计时，保温为正计时，其他为倒计时
          isCookingProcess: false, // 是否显示烹饪过程
          hasRunlight: false, // 是否有跑马灯阶段
          requireTime: 0,
          selected: false,
          defaultTime: 0, // 默认烹饪时间
          minTime: 0, // 最小烹饪时间
          maxTime: 0, // 最大烹饪时间
          hasTimer: false, // 有没有定时
          hasAppointment: false, // 有没有预约
          hasRice: false, // 是否有米种选择
          hasTextre: false, // 是否口感选择
          ImgUrl: require('../assets/img/new_btn_keepwarm.png'),
          selectImgUrl: require('../assets/img/new_btn_keepwarm_select.png'),
          carouselImgUrl: require('../assets/img/new_icon_keepwarm_index.png'), // 保温
        },
      ],
      riceList: [
        {
          index: 0,
          itemId: 1,
          name: this.$language('long_rice'),
          selected: true,
        },
        {
          index: 1,
          itemId: 2,
          name: this.$language('short_rice'),
          selected: false,
        },
        {
          index: 2,
          itemId: 3,
          name: this.$language('cao_rice'),
          selected: false,
        },
      ],
      tasteList: [
        {
          index: 0,
          itemId: 1,
          name: this.$language('soft'),
          selected: false,
        },
        {
          index: 1,
          itemId: 2,
          name: this.$language('suitable'),
          selected: true,
        },
        {
          index: 2,
          itemId: 3,
          name: this.$language('hard'),
          selected: false,
        },
      ],
    };
  },
};
/**
 * @constant {object} carouselCofig
 * @description 主页面和定时页面的滑轮配置
 */
const carouselConfig = {
  data() {
    return {
      carouselOptions: {
        isShow: true, // 是否显示
        controlAble: true, // 滑轮能不能滑动
        showNumOrImg: false, // 显示数字还是图片
        horizontal: true, // 水平显示or竖直显示
        controlMode: 1,
        threeOrAll: true, // 显示3个or全部显示
        width: '60%', // 组件宽度
        spaceBetween: '3rem', // 间距
        marginLeft: '0', // 组件左边距
        height: '1rem', // 图片大小
        fontSize: '32px',
      },
    };
  },
};

export {
  modeConfig,
  carouselConfig,
};
