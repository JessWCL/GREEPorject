const modeList = [
  {
    index: 0, // 在该数组中的下标
    modeId: 3, // 与整机模式对应
    modeName: '快煮饭', // 快煮饭
    timeType: 'countdown', // 倒计时, 除了保温为正计时
    isCookingProcess: true, // 是否显示烹饪过程
    hasRunlight: false, // 是否有跑马灯阶段
    selected: false,
    defaultTime: 30, // 默认烹饪时间
    minTime: 30, // 最小烹饪时间
    maxTime: 30, // 最大烹饪时间
    hasTimer: false, // 有没有定时
    hasAppointment: false, // 有没有预约
    canEditableRiceTextreComponent: true, // 是否能编辑米种口感组件
    /*
      cooking_steps: 分五个工作阶段，最后第五个阶段显示时间; run_light: 没有工作时间时，显示跑马灯；有时间显示时间; display_time: 直接显示时间
    */
    cookingType: 'run_light', // 工作时的显示方式
    defaultValueRiceTextre: [1, 1], // 米种口感默认值 [0, x]: 长粒米, 短粒米, 糙米， [x. 0]: 稍软, 适中, 稍硬
    hasRice: false, // 是否有米种选择
    hasTextre: false, // 是否口感选择
    defaultTimeForCustomize: [], // 根据米种口感自定义时间
    ImgUrl: require('../assets/img/btn_quickCook.png'),
    selectImgUrl: require('../assets/img/btn_quickCook_select.png'),
    carouselImgUrl: require('../assets/img/carousel_rice.png'), // 快煮饭
  },
  {
    index: 1, // 在该数组中的下标
    modeId: 2, // 与整机模式对应
    modeName: '精煮饭', // 精煮饭 // 模式名称
    timeType: 'countdown', // 倒计时, 除了保温为正计时
    isCookingProcess: true, // 是否显示烹饪过程
    hasRunlight: true, // 是否有跑马灯阶段
    selected: false, // Mode页面的模式是否被选中
    defaultTime: 55, // 默认烹饪时间
    minTime: 55, // 最小烹饪时间
    maxTime: 55, // 最大烹饪时间
    hasTimer: false, // 有没有定时
    hasAppointment: true, // 有没有预约
    canEditableRiceTextreComponent: true, // 是否能编辑米种口感组件
    /*
      cooking_steps: 分五个工作阶段，最后第五个阶段显示时间; run_light: 没有工作时间时，显示跑马灯；有时间显示时间; display_time: 直接显示时间
    */
    cookingType: 'run_light', // 工作时的显示方式
    defaultValueRiceTextre: [1, 1], // 米种口感默认值 [0, x]: 长粒米, 短粒米, 糙米， [x. 0]: 稍软, 适中, 稍硬
    hasRice: true, // 是否有米种选择
    hasTextre: true, // 是否口感选择
    defaultTimeForCustomize: [
      [0, 0, 0, 0],
      [0, 55, 50, 45],
      [0, 55, 50, 45],
      [0, 60, 55, 50]
    ], // 根据米种口感自定义时间
    ImgUrl: require('../assets/img/btn_rice.png'), // 未选中模式图标
    selectImgUrl: require('../assets/img/btn_rice_select.png'), // 选中模式的图标
    carouselImgUrl: require('../assets/img/carousel_rice.png'), // 精煮饭
  },
  {
    index: 2, // 在该数组中的下标
    modeId: 15, // 与整机模式对应
    modeName: '煲仔饭', // 煲仔饭
    timeType: 'countdown', // 倒计时, 除了保温为正计时
    isCookingProcess: false, // 是否显示烹饪过程
    hasRunlight: true, // 是否有跑马灯阶段
    selected: false,
    defaultTime: 50, // 默认烹饪时间
    minTime: 50, // 最小烹饪时间
    maxTime: 50, // 最大烹饪时间
    hasTimer: false, // 有没有定时
    hasAppointment: false, // 有没有预约
    canEditableRiceTextreComponent: false, // 是否能编辑米种口感组件
    /*
      cooking_steps: 分五个工作阶段，最后第五个阶段显示时间; run_light: 没有工作时间时，显示跑马灯；有时间显示时间; display_time: 直接显示时间
    */
    cookingType: 'run_light', // 工作时的显示方式
    defaultValueRiceTextre: [1, 1], // 米种口感默认值 [0, x]: 长粒米, 短粒米, 糙米， [x. 0]: 稍软, 适中, 稍硬
    hasRice: false, // 是否有米种选择
    hasTextre: false, // 是否口感选择
    defaultTimeForCustomize: [], // 根据米种口感自定义时间
    ImgUrl: require('../assets/img/btn_PotRice.png'),
    selectImgUrl: require('../assets/img/btn_potRice_select.png'),
    carouselImgUrl: require('../assets/img/carousel_potRice.png'), // 煲仔饭
  },
  {
    index: 3, // 在该数组中的下标
    modeId: 13, // 与整机模式对应 // 与整机模式对应
    modeName: '发芽饭', // 发芽饭
    timeType: 'countdown', // 倒计时, 除了保温为正计时
    isCookingProcess: false, // 是否显示烹饪过程
    hasRunlight: false, // 是否有跑马灯阶段
    selected: false,
    defaultTime: 240, // 默认烹饪时间
    minTime: 240, // 最小烹饪时间
    maxTime: 240, // 最大烹饪时间
    hasTimer: false, // 有没有定时
    hasAppointment: true, // 有没有预约
    canEditableRiceTextreComponent: false, // 是否能编辑米种口感组件
    /*
      cooking_steps: 分五个工作阶段，最后第五个阶段显示时间; run_light: 没有工作时间时，显示跑马灯；有时间显示时间; display_time: 直接显示时间
    */
    cookingType: 'run_light', // 工作时的显示方式
    defaultValueRiceTextre: [3, 0], // 米种口感默认值 [0, x]: 长粒米, 短粒米, 糙米， [x. 0]: 稍软, 适中, 稍硬
    hasRice: true, // 是否有米种选择
    hasTextre: false, // 是否口感选择
    defaultTimeForCustomize: [
      0, 0, 0, 240
    ], // 根据米种口感自定义时间
    ImgUrl: require('../assets/img/btn_sproutRice.png'),
    selectImgUrl: require('../assets/img/btn_sproutRice_select.png'),
    carouselImgUrl: require('../assets/img/carousel_sproutRice.png'), // 发芽饭
  },
  {
    index: 4, // 在该数组中的下标
    modeId: 4, // 与整机模式对应 // 与整机模式对应
    modeName: '煮粥', // 煮粥
    timeType: 'countdown', // 倒计时, 除了保温为正计时
    isCookingProcess: false, // 是否显示烹饪过程
    hasRunlight: false, // 是否有跑马灯阶段
    selected: false,
    defaultTime: 90, // 默认烹饪时间
    minTime: 90, // 最小烹饪时间
    maxTime: 120, // 最大烹饪时间
    hasTimer: true, // 有没有定时
    hasAppointment: true, // 有没有预约
    canEditableRiceTextreComponent: false, // 是否能编辑米种口感组件
    /*
      cooking_steps: 分五个工作阶段，最后第五个阶段显示时间; run_light: 没有工作时间时，显示跑马灯；有时间显示时间; display_time: 直接显示时间
    */
    cookingType: 'display_time', // 工作时的显示方式
    defaultValueRiceTextre: [1, 1], // 米种口感默认值 [0, x]: 长粒米, 短粒米, 糙米， [x. 0]: 稍软, 适中, 稍硬
    hasRice: false, // 是否有米种选择
    hasTextre: false, // 是否口感选择
    defaultTimeForCustomize: [], // 根据米种口感自定义时间
    ImgUrl: require('../assets/img/btn_porridge.png'),
    selectImgUrl: require('../assets/img/btn_porridge_select.png'),
    carouselImgUrl: require('../assets/img/carousel_porridge.png'), // 煮粥
  },
  {
    index: 5, // 在该数组中的下标
    modeId: 5, // 与整机模式对应
    modeName: '稀饭', // 稀饭
    timeType: 'countdown', // 倒计时, 除了保温为正计时
    isCookingProcess: false, // 是否显示烹饪过程
    hasRunlight: false, // 是否有跑马灯阶段
    selected: false,
    defaultTime: 60, // 默认烹饪时间
    minTime: 60, // 最小烹饪时间
    maxTime: 90, // 最大烹饪时间
    hasTimer: true, // 有没有定时
    hasAppointment: true, // 有没有预约
    canEditableRiceTextreComponent: false, // 是否能编辑米种口感组件
    /*
      cooking_steps: 分五个工作阶段，最后第五个阶段显示时间; run_light: 没有工作时间时，显示跑马灯；有时间显示时间; display_time: 直接显示时间
    */
    cookingType: 'display_time', // 工作时的显示方式
    defaultValueRiceTextre: [1, 1], // 米种口感默认值 [0, x]: 长粒米, 短粒米, 糙米， [x. 0]: 稍软, 适中, 稍硬
    hasRice: false, // 是否有米种选择
    hasTextre: false, // 是否口感选择
    defaultTimeForCustomize: [], // 根据米种口感自定义时间
    ImgUrl: require('../assets/img/btn_conjee.png'),
    selectImgUrl: require('../assets/img/btn_conjee_select.png'),
    carouselImgUrl: require('../assets/img/carousel_conjee.png'), // 稀饭
  },
  {
    index: 6, // 在该数组中的下标
    modeId: 17, // 与整机模式对应 // 与整机模式对应
    modeName: '快煮粥', // 快煮粥
    timeType: 'countdown', // 倒计时, 除了保温为正计时
    isCookingProcess: false, // 是否显示烹饪过程
    hasRunlight: false, // 是否有跑马灯阶段
    selected: false,
    defaultTime: 60, // 默认烹饪时间
    minTime: 60, // 最小烹饪时间
    maxTime: 60, // 最大烹饪时间
    hasTimer: false, // 有没有定时
    hasAppointment: false, // 有没有预约
    canEditableRiceTextreComponent: false, // 是否能编辑米种口感组件
    /*
      cooking_steps: 分五个工作阶段，最后第五个阶段显示时间; run_light: 没有工作时间时，显示跑马灯；有时间显示时间; display_time: 直接显示时间
    */
    cookingType: 'display_time', // 工作时的显示方式
    defaultValueRiceTextre: [1, 1], // 米种口感默认值 [0, x]: 长粒米, 短粒米, 糙米， [x. 0]: 稍软, 适中, 稍硬
    hasRice: false, // 是否有米种选择
    hasTextre: false, // 是否口感选择
    defaultTimeForCustomize: [], // 根据米种口感自定义时间
    ImgUrl: require('../assets/img/btn_porridge.png'),
    selectImgUrl: require('../assets/img/btn_porridge_select.png'),
    carouselImgUrl: require('../assets/img/carousel_porridge.png'), // 快煮粥
  },
  {
    index: 7, // 在该数组中的下标
    modeId: 6, // 与整机模式对应
    modeName: '煲汤', // 煲汤
    timeType: 'countdown', // 倒计时, 除了保温为正计时
    isCookingProcess: false, // 是否显示烹饪过程
    hasRunlight: false, // 是否有跑马灯阶段
    selected: false,
    defaultTime: 90, // 默认烹饪时间
    minTime: 90, // 最小烹饪时间
    maxTime: 180, // 最大烹饪时间
    hasTimer: true, // 有没有定时
    hasAppointment: true, // 有没有预约
    canEditableRiceTextreComponent: false, // 是否能编辑米种口感组件
    /*
      cooking_steps: 分五个工作阶段，最后第五个阶段显示时间; run_light: 没有工作时间时，显示跑马灯；有时间显示时间; display_time: 直接显示时间
    */
    cookingType: 'display_time', // 工作时的显示方式
    defaultValueRiceTextre: [1, 1], // 米种口感默认值 [0, x]: 长粒米, 短粒米, 糙米， [x. 0]: 稍软, 适中, 稍硬
    hasRice: false, // 是否有米种选择
    hasTextre: false, // 是否口感选择
    defaultTimeForCustomize: [], // 根据米种口感自定义时间
    ImgUrl: require('../assets/img/btn_Soup.png'),
    selectImgUrl: require('../assets/img/btn_soup_select.png'),
    carouselImgUrl: require('../assets/img/carousel_soup.png'), // 煲汤
  },
  {
    index: 8, // 在该数组中的下标
    modeId: 10, // 与整机模式对应
    modeName: '蒸煮', // 蒸煮
    timeType: 'countdown', // 倒计时, 除了保温为正计时
    isCookingProcess: false, // 是否显示烹饪过程
    hasRunlight: true, // 是否有跑马灯阶段
    selected: false,
    defaultTime: 30, // 默认烹饪时间
    minTime: 10, // 最小烹饪时间
    maxTime: 30, // 最大烹饪时间
    hasTimer: true, // 有没有定时
    hasAppointment: true, // 有没有预约
    canEditableRiceTextreComponent: false, // 是否能编辑米种口感组件
    /*
      cooking_steps: 分五个工作阶段，最后第五个阶段显示时间; run_light: 没有工作时间时，显示跑马灯；有时间显示时间; display_time: 直接显示时间
    */
    cookingType: 'run_light', // 工作时的显示方式
    defaultValueRiceTextre: [1, 1], // 米种口感默认值 [0, x]: 长粒米, 短粒米, 糙米， [x. 0]: 稍软, 适中, 稍硬
    hasRice: false, // 是否有米种选择
    hasTextre: false, // 是否口感选择
    defaultTimeForCustomize: [], // 根据米种口感自定义时间
    ImgUrl: require('../assets/img/btn_stew.png'),
    selectImgUrl: require('../assets/img/btn_stew_select.png'),
    carouselImgUrl: require('../assets/img/carousel_stew.png'), // 蒸煮
  },
  {
    index: 9, // 在该数组中的下标
    modeId: 11, // 与整机模式对应
    modeName: '蛋糕', // 蛋糕
    timeType: 'countdown', // 倒计时, 除了保温为正计时
    isCookingProcess: false, // 是否显示烹饪过程
    hasRunlight: true, // 是否有跑马灯阶段
    selected: false,
    defaultTime: 50, // 默认烹饪时间
    minTime: 50, // 最小烹饪时间
    maxTime: 50, // 最大烹饪时间
    hasTimer: false, // 有没有定时
    hasAppointment: false, // 有没有预约
    canEditableRiceTextreComponent: false, // 是否能编辑米种口感组件
    /*
      cooking_steps: 分五个工作阶段，最后第五个阶段显示时间; run_light: 没有工作时间时，显示跑马灯；有时间显示时间; display_time: 直接显示时间
    */
    cookingType: 'display_time', // 工作时的显示方式
    defaultValueRiceTextre: [1, 1], // 米种口感默认值 [0, x]: 长粒米, 短粒米, 糙米， [x. 0]: 稍软, 适中, 稍硬
    hasRice: false, // 是否有米种选择
    hasTextre: false, // 是否口感选择
    defaultTimeForCustomize: [], // 根据米种口感自定义时间
    ImgUrl: require('../assets/img/btn_Cake.png'),
    selectImgUrl: require('../assets/img/btn_cake_select.png'),
    carouselImgUrl: require('../assets/img/carousel_cake.png'), // 蛋糕
  },
  {
    index: 10, // 在该数组中的下标
    modeId: 7, // 与整机模式对应
    modeName: '热饭', // 热饭
    timeType: 'countdown', // 倒计时, 除了保温为正计时
    isCookingProcess: false, // 是否显示烹饪过程
    hasRunlight: true, // 是否有跑马灯阶段
    selected: false,
    defaultTime: 20, // 默认烹饪时间
    minTime: 20, // 最小烹饪时间
    maxTime: 20, // 最大烹饪时间
    hasTimer: false, // 有没有定时
    hasAppointment: true, // 有没有预约
    canEditableRiceTextreComponent: false, // 是否能编辑米种口感组件
    /*
      cooking_steps: 分五个工作阶段，最后第五个阶段显示时间; run_light: 没有工作时间时，显示跑马灯；有时间显示时间; display_time: 直接显示时间
    */
    cookingType: 'run_light', // 工作时的显示方式
    defaultValueRiceTextre: [1, 1], // 米种口感默认值 [0, x]: 长粒米, 短粒米, 糙米， [x. 0]: 稍软, 适中, 稍硬
    hasRice: false, // 是否有米种选择
    hasTextre: false, // 是否口感选择
    defaultTimeForCustomize: [], // 根据米种口感自定义时间
    ImgUrl: require('../assets/img/btn_reheat.png'),
    selectImgUrl: require('../assets/img/btn_reheat_select.png'),
    carouselImgUrl: require('../assets/img/carousel_reheat.png'), // 热饭
  },
  {
    index: 11, // 在该数组中的下标
    modeId: 30, // 与整机模式对应
    modeName: '保温', // 保温
    timeType: 'timing', // 正计时，保温为正计时，其他为倒计时
    isCookingProcess: false, // 是否显示烹饪过程
    hasRunlight: false, // 是否有跑马灯阶段
    selected: false,
    defaultTime: 0, // 默认烹饪时间
    minTime: 0, // 最小烹饪时间
    maxTime: 0, // 最大烹饪时间
    hasTimer: false, // 有没有定时
    hasAppointment: false, // 有没有预约
    canEditableRiceTextreComponent: false, // 是否能编辑米种口感组件
    /*
      cooking_steps: 分五个工作阶段，最后第五个阶段显示时间; run_light: 没有工作时间时，显示跑马灯；有时间显示时间; display_time: 直接显示时间
    */
    cookingType: 'display_time', // 工作时的显示方式
    defaultValueRiceTextre: [1, 1], // 米种口感默认值 [0, x]: 长粒米, 短粒米, 糙米， [x. 0]: 稍软, 适中, 稍硬
    hasRice: false, // 是否有米种选择
    hasTextre: false, // 是否口感选择
    defaultTimeForCustomize: [], // 根据米种口感自定义时间
    ImgUrl: require('../assets/img/btn_keepWarm.png'),
    selectImgUrl: require('../assets/img/btn_keepWarm_select.png'),
    carouselImgUrl: require('../assets/img/carousel_keepWarm.png'), // 保温
  },
];

export default modeList;
