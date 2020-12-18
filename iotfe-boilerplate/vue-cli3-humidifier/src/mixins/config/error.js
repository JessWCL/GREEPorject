/**
 * @description 故障配置
 */
const DRY_ERROR = 8; // 干烧故障
const LACK_OF_WATER = 16; // 缺水保护
const LIFT_THE_TANK = 4; // 水箱提起保护
const errorConfig = {
  data() {
    return {
      errorMap: {
        [DRY_ERROR]: {
          imgUrl: require('../../assets/img/dryError.png'),
          name: this.$language('error.dry_error'),
          description: this.$language('error.dry_error_description')
        },
        [LACK_OF_WATER]: {
          imgUrl: require('../../assets/img/lackOfWater.png'),
          name: this.$language('error.lack_of_water'),
          description: this.$language('error.lack_of_water_description')
        },
        [LIFT_THE_TANK]: {
          imgUrl: require('../../assets/img/liftTheTank.png'),
          name: this.$language('error.water_tank'),
          description: this.$language('error.water_tank_description')
        }
      }
    };
  }
};

export default errorConfig;
