/**
 * @description Home配置列表
 */
import { mapState } from 'vuex';

const homeConfig = {
  data() {
    return {};
  },
  created() {},
  computed: {
    ...mapState({
      useerMessage: state => state.useerMessage,
      sex: state => state.dataObject.sex,
      kpiValue: state => state.kpiValue,
    }),
    itemsTab() {
      return [
        { name: 1, label: 'Data Detail' },
        { name: 2, label: 'Historical Data' },
        { name: 3, label: 'Data Trends' },
      ];
    },
    dataList() {
      return [
        {
          name: 'Body Fat',
          value: `${this.useerMessage.fat}%`,
          color: this.getstandedVal('Body Fat').split(',')[1],
          status: this.getstandedVal('Body Fat').split(',')[0],
        },
        {
          name: 'BMI',
          value: this.useerMessage.bmi,
          color: this.getstandedVal('BMI').split(',')[1],
          status: this.getstandedVal('BMI').split(',')[0],
        },
        {
          name: 'Muscle',
          value: `${this.useerMessage.muscle}%`,
          color: this.getstandedVal('Muscle').split(',')[1],
          status: this.getstandedVal('Muscle').split(',')[0],
        },
      ];
    },
  },
  methods: {
    // 判断当前类型标准
    getstandedVal(type) {
      let result;
      switch (type) {
        case 'BMI':
          if (this.kpiValue.bmiType === 'Thin') {
            result = 'Low,#00B4FF';
          } else if (this.kpiValue.bmiType === 'Fat') {
            result = 'Intermed,#FBC31A';
          } else if (this.kpiValue.bmiType === 'Corpulent') {
            result = 'Height,#e4393ca3';
          } else if (this.kpiValue.bmiType === 'Obese') {
            result = 'Height,#e4393c';
          } else {
            result = 'Middle,#00CC00';
          }
          break;
        case 'Body Fat':
          if (this.kpiValue.fatType === 'Low') {
            result = 'Low,#00B4FF';
          } else if (this.kpiValue.fatType === 'Intermed') {
            result = 'Intermed,#FBC31A';
          } else if (this.kpiValue.fatType === 'High') {
            result = 'Height,#e4393c';
          } else {
            result = 'Middle,#00CC00';
          }
          break;
        case 'Muscle':
          if (this.kpiValue.muscleType === 'Low') {
            result = 'Low,#00B4FF';
          } else if (this.kpiValue.muscleType === 'High') {
            result = 'Height,#e4393c';
          } else {
            result = 'Middle,#00CC00';
          }
          break;
        default:
          break;
      }
      return result;
    },
    // getstandedVal(type) {
    //   switch (type) {
    //     case 'Body Fat':
    //       if ((this.sex === 1) & (this.useerMessage.fat < 9.9)) {
    //         return 'Low,#00B4FF';
    //       } else if ((this.sex === 1) & (this.useerMessage.fat > 10 < 19.9)) {
    //         return 'Middle,#00CC00';
    //       } else if ((this.sex === 1) & (this.useerMessage.fat > 20 < 24.9)) {
    //         return 'Intermed,#FBC31A';
    //       } else if ((this.sex === 1) & (this.useerMessage.fat > 25)) {
    //         return 'Height,#e4393c';
    //       } else if ((this.sex === 2) & (this.useerMessage.fat < 19.9)) {
    //         return 'Low,#00B4FF';
    //       } else if ((this.sex === 2) & (this.useerMessage.fat > 20 < 29.9)) {
    //         return 'Middle,#00CC00';
    //       } else if ((this.sex === 2) & (this.useerMessage.fat > 30 < 34.9)) {
    //         return 'Intermed,#FBC31A';
    //       } else if ((this.sex === 2) & (this.useerMessage.fat > 35)) {
    //         return 'Height,#e4393c';
    //       }
    //       break;
    //     case 'BMI':
    //       if (this.useerMessage.fat < 18.5) {
    //         return 'Thin,#00B4FF';
    //       } else if (this.useerMessage.fat > 18.5 < 24.9) {
    //         return 'Normal,#00CC00';
    //       } else if (this.useerMessage.fat > 25 < 27.9) {
    //         return 'Fat,#FBC31A';
    //       } else if (this.useerMessage.fat > 28 < 39.9) {
    //         return 'Corpulent,#FF424D';
    //       } else if (this.useerMessage.fat > 40) {
    //         return 'Obese,#e4393c';
    //       }
    //       break;
    //     case 'Muscle':
    //       if ((this.sex === 1) & (this.useerMessage.fat < 9.9)) {
    //         return 'Low,#00B4FF';
    //       } else if ((this.sex === 1) & (this.useerMessage.fat > 10 < 19.9)) {
    //         return 'Middle,#00CC00';
    //       } else if ((this.sex === 1) & (this.useerMessage.fat > 20 < 24.9)) {
    //         return 'Intermed,#FBC31A';
    //       } else if ((this.sex === 1) & (this.useerMessage.fat > 25)) {
    //         return 'Height,#e4393c';
    //       } else if ((this.sex === 2) & (this.useerMessage.fat < 19.9)) {
    //         return 'Low,#00B4FF';
    //       } else if ((this.sex === 2) & (this.useerMessage.fat > 20 < 29.9)) {
    //         return 'Middle,#00CC00';
    //       } else if ((this.sex === 2) & (this.useerMessage.fat > 30 < 34.9)) {
    //         return 'Intermed,#FBC31A';
    //       } else if ((this.sex === 2) & (this.useerMessage.fat > 35)) {
    //         return 'Height,#e4393c';
    //       }
    //       break;
    //     default:
    //       break;
    //   }
    // },
  },
};

export default homeConfig;
