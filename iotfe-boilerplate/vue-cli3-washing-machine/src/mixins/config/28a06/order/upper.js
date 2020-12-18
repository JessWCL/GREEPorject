/**
 * @description order 的 upper
 */
// import { mapState, mapMutations, mapActions} from 'vuex';


// 暂无用到了, 先保留

// const upper = {
//   data() {
//     return {};
//   },
//   computed: {
//     ...mapState({
//       childLock: state => state.parseObj.childLock,    
//       timeAll: state => state.parseObj.drum1Params.timeAll,    
//       order: state => state.parseObj.drum1Params.order,    
//       orderLaunch: state => state.parseObj.drum1Params.orderLaunch,    
//       orderTimeDay: state => state.parseObj.drum1Params.orderTimeDay,    
//       orderTimeHour(state) {
//         let value = state.parseObj.drum1Params.orderTimeHour;
//         value = value > 9 ? value : `0${value}`;
//         return value;
//       },
//       orderTimeMin(state) {
//         let value = state.parseObj.drum1Params.orderTimeMin;
//         value = value > 9 ? value : `0${value}`;
//         return value;
//       }, 
//     }),
//   },
//   watch: {
//   },
//   methods: {
//     ...mapMutations({
//       setUpperObj: 'SET_UPPER_OBJECT',
//     }),
//     ...mapActions({
//       sendCtrl: 'SEND_CTRL',
//     }),

//     // 构建映射
//     setDataObj(obj) {
//       this.setUpperObj(obj);
//     },

//     // 构建映射
//     sendCtrl(obj) {
//       console.log('--=-order发送的数据==', JSON.stringify(obj));
//     }
//   }
// };

// export default upper;
