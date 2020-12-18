/**
 * @description home页配置
 */
import { mapState } from 'vuex';

const homeConfig = {
  data() {
    return {
      modeAll: [
        {
          name: '自动运行状态',
          mode: 0,
          state: 1,
        },
        {
          name: '自动停止状态',
          mode: 0,
          state: 0,
        },
        {
          name: '手动状态',
          mode: 1,
          state: -1,
        },
      ],
    };
  },
  computed: {
    ...mapState({
      InPressC: state => state.dataObject.InPressC, // 进水压力
      InPressN: state => state.dataObject.InPressN,
      MemPressC: state => state.dataObject.MemPressC, // 膜前压力
      MemPressN: state => state.dataObject.MemPressN,
      InElecC: state => state.dataObject.InElecC, // 进水电导率
      InElecN: state => state.dataObject.InElecN,
      ProElecC: state => state.dataObject.ProElecC, // 产水电导率
      ProElecN: state => state.dataObject.ProElecN,
      RawLevelC: state => state.dataObject.RawLevelC, // 原水箱夜位
      RawLevelN: state => state.dataObject.RawLevelN,
      ProLevelC: state => state.dataObject.ProLevelC, // 产水箱液位
      ProLevelN: state => state.dataObject.ProLevelN,
    }),
    contentList() {
      return [
        {
          name: '进水压力 ',
          value: `${this.InPressC === 0 ? '' : '-'}${this.InPressN / 1000}MPa`,
          Range: '0.200-0.600MPa',
          desc: '体现进水泵是否正常工作，压力是否正常',
          status: this.computedVals(0),
        },
        {
          name: '膜前压力',
          value: `${this.MemPressC === 0 ? '' : '-'}${this.MemPressN /
            1000}MPa`,
          Range: '0.400-1.200 MPa',
          desc: '体现高压泵是否正常工作，反渗透压是否正常',
          status: this.computedVals(1),
        },
        {
          name: '进水电导率',
          value: `${this.InElecC === 0 ? '' : '-'}${this.InElecN / 100}μS/cm`,
          Range: '0-600.0μS/cm',
          desc: '体现净化前的水质状况',
          status: this.computedVals(2),
        },
        {
          name: '产水电导率',
          value: `${this.ProElecC === 0 ? '' : '-'}${this.ProElecN / 100}μS/cm`,
          Range: '0-50μs/cm',
          desc: '体现净化后的水质状况',
          status: this.computedVals(3),
        },
        {
          name: '原水箱夜位',
          value: `${this.RawLevelC === 0 ? '' : '-'}${this.RawLevelN / 10}cm`,
          Range: '50.0-300.0cm',
          desc: '原水箱水位高度，根据数据判断进水电磁阀的启停',
          status: this.computedVals(4),
        },
        {
          name: '产水箱液位',
          value: `${this.ProLevelC === 0 ? '' : '-'}${this.ProLevelN / 10}cm`,
          Range: '50.0-300.0 cm',
          desc: '产水箱水位高度，根据数据判断主机与变频供水系统启停',
          status: this.computedVals(5),
        },
      ];
    },
  },
  methods: {
    computedVals(val) {
      let status = false;
      switch (val) {
        // eslint-disable-next-line no-case-declarations
        case 0:
          const value0 = Number(
            `${this.InPressC === 0 ? '' : '-'}${this.InPressN / 1000}`,
          );
          if ((value0 >= 0.2) & (value0 <= 0.6)) {
            status = true;
          }
          break;
        // eslint-disable-next-line no-case-declarations
        case 1:
          const value1 = Number(
            `${this.MemPressC === 0 ? '' : '-'}${this.MemPressN / 1000}`,
          );
          if ((value1 >= 0.4) & (value1 <= 1.2)) {
            status = true;
          }
          break;
        // eslint-disable-next-line no-case-declarations
        case 2:
          const value2 = Number(
            `${this.InElecC === 0 ? '' : '-'}${this.InElecN / 100}`,
          );
          if ((value2 >= 0) & (value2 <= 600)) {
            status = true;
          }
          break;
        // eslint-disable-next-line no-case-declarations
        case 3:
          const value3 = Number(
            `${this.ProElecC === 0 ? '' : '-'}${this.ProElecN / 100}`,
          );
          if ((value3 >= 0) & (value3 <= 50)) {
            status = true;
          }
          break;
        // eslint-disable-next-line no-case-declarations
        case 4:
          const value4 = Number(
            `${this.RawLevelC === 0 ? '' : '-'}${this.RawLevelN / 10}`,
          );
          if ((value4 >= 50) & (value4 <= 300)) {
            status = true;
          }
          break;
        // eslint-disable-next-line no-case-declarations
        case 5:
          const value5 = Number(
            `${this.ProLevelC === 0 ? '' : '-'}${this.ProLevelN / 10}`,
          );
          if ((value5 >= 50) & (value5 <= 300)) {
            status = true;
          }
          break;
        default:
          break;
      }
      return status;
    },
  },
};
export default homeConfig;
