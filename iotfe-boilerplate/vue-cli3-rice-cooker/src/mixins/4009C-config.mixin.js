/**
 * @constant {object} modeConfig
 * @description 模式列表
 */
const modeConfig = {
  data() {
    return {
      isTaste: false,
      modeList: [
        {
          index: 0, // 在该数组中的下标
          itemId: 2, // 与整机模式对应
          modeName: this.$language('mode_jhz'), // 模式名称
          requireTime: 50, // 默认烹饪时间
          selected: false, // Mode页面的模式是否被选中
          ImgUrl: require('../assets/img/btn_rice.png'), // 未选中模式图标
          selectImgUrl: require('../assets/img/btn_rice_select.png'), // 选中模式的图标
        },
        {
          index: 1,
          itemId: 3,
          modeName: this.$language('mode_ckz'),
          requireTime: 30,
          selected: false,
          ImgUrl: require('../assets/img/btn_quickCook.png'),
          selectImgUrl: require('../assets/img/btn_quickCook_select.png'),
        },
        {
          index: 2,
          itemId: 13,
          modeName: this.$language('mode_fyf'),
          requireTime: 240,
          selected: false,
          ImgUrl: require('../assets/img/btn_sproutRice.png'),
          selectImgUrl: require('../assets/img/btn_sproutRice_select.png'),
        },
        {
          index: 3,
          itemId: 4,
          modeName: this.$language('mode_zz'),
          requireTime: 90,
          selected: false,
          ImgUrl: require('../assets/img/btn_porridge.png'),
          selectImgUrl: require('../assets/img/btn_porridge_select.png'),
        },
        {
          index: 4,
          itemId: 5,
          modeName: this.$language('mode_xf'),
          requireTime: 60,
          selected: false,
          ImgUrl: require('../assets/img/btn_conjee.png'),
          selectImgUrl: require('../assets/img/btn_conjee_select.png'),
        },
        {
          index: 5,
          itemId: 17,
          modeName: this.$language('mode_kzz'),
          requireTime: 60,
          selected: false,
          ImgUrl: require('../assets/img/btn_porridge.png'),
          selectImgUrl: require('../assets/img/btn_porridge_select.png'),
        },
        {
          index: 6,
          itemId: 15,
          modeName: this.$language('mode_bzf'),
          requireTime: 50,
          selected: false,
          ImgUrl: require('../assets/img/btn_PotRice.png'),
          selectImgUrl: require('../assets/img/btn_potRice_select.png'),
        },
        {
          index: 7,
          itemId: 6,
          modeName: this.$language('mode_bt'),
          requireTime: 90,
          selected: false,
          ImgUrl: require('../assets/img/btn_Soup.png'),
          selectImgUrl: require('../assets/img/btn_soup_select.png'),
        },
        {
          index: 8,
          itemId: 10,
          modeName: this.$language('mode_zhz'),
          requireTime: 30,
          selected: false,
          ImgUrl: require('../assets/img/btn_stew.png'),
          selectImgUrl: require('../assets/img/btn_stew_select.png'),
        },
        {
          index: 9,
          itemId: 7,
          modeName: this.$language('mode_zjr'),
          requireTime: 20,
          selected: false,
          ImgUrl: require('../assets/img/btn_reheat.png'),
          selectImgUrl: require('../assets/img/btn_reheat_select.png'),
        },
        {
          index: 10,
          itemId: 11,
          modeName: this.$language('mode_dg'),
          requireTime: 50,
          selected: false,
          ImgUrl: require('../assets/img/btn_Cake.png'),
          selectImgUrl: require('../assets/img/btn_cake_select.png'),
        },
        {
          index: 11,
          itemId: 30,
          modeName: this.$language('mode_bw'),
          requireTime: 0,
          selected: false,
          ImgUrl: require('../assets/img/btn_keepWarm.png'),
          selectImgUrl: require('../assets/img/btn_keepWarm_select.png'),
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
      timeList: [
        {
          index: 0,
          modeId: 4,
          range: this.$language('timeRange_zhuzhou_4009C'),
        },
        { index: 1, modeId: 5, range: this.$language('timeRange_xifan_4009C') },
        {
          index: 2,
          modeId: 8,
          range: this.$language('timeRange_zaliangzhou_4009C'),
        },
        {
          index: 4,
          modeId: 6,
          range: this.$language('timeRange_baotang_4009C'),
        },
        {
          index: 5,
          modeId: 10,
          range: this.$language('timeRange_zhengzhu_4009C'),
        },
      ],
    };
  },
  computed: {},
  methods: {},
};
/**
 * @constant {object} carouselCofig
 * @description 主页面和定时页面的滑轮配置
 */
const carouselConfig = {
  data() {
    return {
      carouselDataH: [
        require('../assets/img/carousel_rice.png'), // 精煮饭
        require('../assets/img/carousel_rice.png'), // 快煮饭
        require('../assets/img/carousel_sproutRice.png'), // 发芽饭
        require('../assets/img/carousel_porridge.png'), // 煮粥
        require('../assets/img/carousel_conjee.png'), // 稀饭
        require('../assets/img/carousel_porridge.png'), // 快煮粥
        require('../assets/img/carousel_potRice.png'), // 煲仔饭
        require('../assets/img/carousel_soup.png'), // 煲汤
        require('../assets/img/carousel_stew.png'), // 蒸煮
        require('../assets/img/carousel_reheat.png'), // 热饭
        require('../assets/img/carousel_cake.png'), // 蛋糕
        require('../assets/img/carousel_keepWarm.png'), // 保温
      ],
      carouselDataL: [
        require('../assets/img/carousel_rice.png'), // 精煮饭
        require('../assets/img/carousel_porridge.png'), // 煮粥
        require('../assets/img/carousel_conjee.png'), // 稀饭
        require('../assets/img/carousel_soup.png'), // 煲汤
        require('../assets/img/carousel_stew.png'), // 蒸煮
        require('../assets/img/carousel_reheat.png'), // 热饭
      ],
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
        height: '1.2rem', // 图片大小
        fontSize: '32px',
      },
    };
  },
};
/**
 * @constant {object} timeRangeConfig
 * @description 定时界面的定时范围配置
 */
const timeRangeConfig = {
  data() {
    return {
      modeInfo: [
        {
          index: 0, // 模式下标
          itemId: 2, // 与整机字段对应
          timeName: this.$language('txt_jinghuazhu'), // 定时界面的提示语
          timeRange: '', // 定时范围
          defaultTime: 50, // 默认时间
          minTime: 50, // 最小定时时间
          maxTime: 50, // 最大定时时间
          name: this.$language('mode_jhz'), // 模式名称
        },
        {
          index: 1,
          itemId: 4,
          timeName: this.$language('txt_zhuzhou'),
          timeRange: this.$language('time_zhuzhou_4009C'),
          defaultTime: 90,
          minTime: 90,
          maxTime: 120,
          name: this.$language('mode_zz'),
        },
        {
          index: 2,
          itemId: 5,
          timeName: this.$language('txt_xifan'),
          timeRange: this.$language('time_xifan_4009C'),
          defaultTime: 60,
          minTime: 60,
          maxTime: 90,
          name: this.$language('mode_xf'),
        },
        {
          index: 3,
          itemId: 6,
          timeName: this.$language('txt_baotang'),
          timeRange: this.$language('time_baotang_4009C'),
          defaultTime: 90,
          minTime: 90,
          maxTime: 180,
          name: this.$language('mode_bt'),
        },
        {
          index: 4,
          itemId: 10,
          timeName: this.$language('txt_zhengzhu'),
          timeRange: this.$language('time_zhengzhu_4009C'),
          defaultTime: 30,
          minTime: 10,
          maxTime: 30,
          name: this.$language('mode_zhz'),
        },
        {
          index: 5,
          itemId: 7,
          timeName: this.$language('txt_zaijiare'),
          timeRange: '',
          defaultTime: 20,
          minTime: 20,
          maxTime: 20,
          name: this.$language('mode_zjr'),
        },
      ],
    };
  },
};

export {
  modeConfig,
  carouselConfig,
  timeRangeConfig,
};
