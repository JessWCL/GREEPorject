const modeList = [
  {
    index: 0, // 在该数组中的下标
    modeId: 5, // 与整机模式对应
    modeName: '稀饭test', // 稀饭
    timeType: 'countdown', // 倒计时, 除了保温为正计时
    isCookingProcess: false, // 是否显示烹饪过程
    hasRunlight: false, // 是否有跑马灯阶段
    selected: false,
    defaultTime: 60, // 默认烹饪时间
    minTime: 40, // 最小烹饪时间
    maxTime: 90, // 最大烹饪时间
    hasTimer: true, // 有没有定时
    hasAppointment: true, // 有没有预约
    canEditableRiceTextreComponent: false, // 是否能编辑米种口感组件
    /*
      cooking_steps: 分五个工作阶段，最后第五个阶段显示时间; run_light: 没有工作时间时，显示跑马灯；有时间显示时间; display_time: 直接显示时间
    */
    cookingType: 'display_time', // 工作时的显示方式
    defaultValueRiceTextre: [1, 1], // 米种口感默认值  [0, x]: 长粒米, 短粒米, 糙米， [x. 0]: 稍软, 适中, 稍硬
    hasRice: false, // 是否有米种选择
    hasTextre: false, // 是否口感选择
    defaultTimeForCustomize: [], // 根据米种口感自定义时间
    ImgUrl: require('../assets/img/new_btn_congeegal.png'),
    selectImgUrl: require('../assets/img/new_btn_congeegal_select.png'),
    carouselImgUrl: require('../assets/img/new_icon_congeegal_index.png'), // 稀饭
  },
  {
    index: 1, // 在该数组中的下标
    modeId: 5, // 与整机模式对应
    modeName: '稀饭test', // 稀饭
    timeType: 'countdown', // 倒计时, 除了保温为正计时
    isCookingProcess: false, // 是否显示烹饪过程
    hasRunlight: false, // 是否有跑马灯阶段
    selected: false,
    defaultTime: 60, // 默认烹饪时间
    minTime: 40, // 最小烹饪时间
    maxTime: 90, // 最大烹饪时间
    hasTimer: true, // 有没有定时
    hasAppointment: true, // 有没有预约
    canEditableRiceTextreComponent: false, // 是否能编辑米种口感组件
    /*
      cooking_steps: 分五个工作阶段，最后第五个阶段显示时间; run_light: 没有工作时间时，显示跑马灯；有时间显示时间; display_time: 直接显示时间
    */
    cookingType: 'display_time', // 工作时的显示方式
    defaultValueRiceTextre: [1, 1], // 米种口感默认值  [0, x]: 长粒米, 短粒米, 糙米， [x. 0]: 稍软, 适中, 稍硬
    hasRice: false, // 是否有米种选择
    hasTextre: false, // 是否口感选择
    defaultTimeForCustomize: [], // 根据米种口感自定义时间
    ImgUrl: require('../assets/img/new_btn_congeegal.png'),
    selectImgUrl: require('../assets/img/new_btn_congeegal_select.png'),
    carouselImgUrl: require('../assets/img/new_icon_congeegal_index.png'), // 稀饭
  },
];

export default modeList;
