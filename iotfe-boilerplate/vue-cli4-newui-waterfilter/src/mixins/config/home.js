/**
 * @description home页配置
*/

const homeConfig = {
  data() {
    return{
      modeAll: [
        {
          name: '待机',
          value: 0,
        },
        {
          name: '制水',
          value: 1,
        },
        {
          name: '冲洗',
          value: 2,
        },
        {
          name: '水满',
          value: 3,
        },
        {
          name: '滤芯寿命复位',
          value: 4,
        },
        {
          name: '缺水',
          value: 5,
        },
        {
          name: '共振',
          value: 6,
        },
        {
          name: '反冲洗',
          value: 7,
        },
      ],
      WorkStatus: [
        { // 待机
          value: 0,
          name: '待机',
          // name: 'Standby',
        },
        { // 制水
          value: 1,
          name: '制水',
          // name: 'WaterMaking',
        },
        { // 水满
          value: 2,
          name: '冲洗',
          // name: 'WaterWash',
        },
        { // 冲洗
          value: 3,
          name: '水满',
          // name: 'WaterFull',
        },
        { // 反冲洗
          value: 4,
          name: '滤芯寿命复位',
          // name: 'reset',
        },
        { // 排水
          value: 5,
          name: '缺水',
          // name: 'Lackofwater',
        },
        { // 共振
          value: 6,
          name: '共振',
          // name: 'resonance',
        },
        { // 反冲洗
          value: 7,
          name: '反冲洗',
          // name: 'BackFlush',
        },
      ],
      filters: [
        {
          name: 'PCB复合', // PRB复合滤芯
          val: 8,
          text:
            '前置部分：有效降低浊度，截留水中的泥沙、铁锈、悬浮物等杂质，同时有效去除水中的余氯、异色、异味、有机物等。后置部分：改善口感，使出水甘冽可口。',
          url:
            'https://mall.gree.com/',
        },
        {
          name: '反渗透膜',
          val: 4,
          text:
            '有效拦截水中的泥沙、铁锈、悬浮物等大颗粒杂质，去除水中的余氯及异色异味，并进一步去除重金属、农药、细菌、病毒等，同时改善口感。',
          url:
            'http://mall.gree.com/',
        },
        // {
        //   name: 'PRB复合滤芯',
        //   val: 0,
        //   text:
        //     '有效拦截水中的泥沙、铁锈、悬浮物等大颗粒杂质，去除水中的余氯及异色异味，并进一步去除重金属、农药、细菌、病毒等，同时改善口感。',
        //   url:
        //     'http://mall.gree.com/mall/ProductDisplayWap?catalog=10001&storeId=10651&productId=11506&langId=-7',
        // },
        // {
        //   name: 'PRB复合滤芯',
        //   val: 0,
        //   text:
        //     '有效拦截水中的泥沙、铁锈、悬浮物等大颗粒杂质，去除水中的余氯及异色异味，并进一步去除重金属、农药、细菌、病毒等，同时改善口感。',
        //   url:
        //     'http://mall.gree.com/mall/ProductDisplayWap?catalog=10001&storeId=10651&productId=11506&langId=-7',
        // },
      ],

      filterKinds: ['PCB复合', '反渗透膜'],
    };
  },
};
export default homeConfig;
