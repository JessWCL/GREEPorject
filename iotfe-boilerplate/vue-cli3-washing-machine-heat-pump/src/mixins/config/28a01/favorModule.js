//  和收藏夹有关的所有东西事件都在这
import {
  mapState,
  mapMutations
} from 'vuex';
import {
  Dialog
} from 'gree-ui';
import {modeIndexList, washList} from '../../../api/index';
import { showToastPlugin } from '../../../api/pluginInterface.js';

/**
 * @description favor 收藏夹的东西
 */
const favorModule = {
  data() {
    return {
      modeIndexList,
      washList,
      washModeIndex: 0,
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      washType: state => state.dataObject.washType,
      washMode: state => state.dataObject.washMode,
      favor1Params: state => state.dataObject.favor1Params,
      favor2Params: state => state.dataObject.favor2Params,
      favor3Params: state => state.dataObject.favor3Params,
      devState: state => state.dataObject.devState,
      childLock: state => state.dataObject.childLock,
      specialLock: state => state.dataObject.specialLock,
      sync: state => state.dataObject.sync,
    }),
    /**
     * @description 判断当前模式是否为收藏夹模式
     */
    favorStatus() {
      const list = this.getStatus();
      for (let index = 1; index < 4; index++) {
        if (JSON.stringify(this[`favor${index}Params`]) === JSON.stringify(list)) {
          return true;
        }
      }
      return false;
    },
  },
  watch: {
    /**
     * @description 获取洗涤模式对应的list下标
     */
    washMode: {
      handler(newV) {
        const washModeIndex = this.modeIndexList[this.washType][newV];
        this.washModeIndex = washModeIndex;       
        this.setShowData({washModeIndex});
      },
      immediate: true,
    },
    /**
     * @function favorStatus
     * @description 收藏夹是否高亮
     */
    favorStatus: {
      immediate: true,
      handler(newV) {
        this.star = newV ? 1 : 0;
      }
    },
  },
  beforeDestroy() {
    Dialog.closeAll(); // 关闭所有Dialog
  },
  methods: {
    ...mapMutations({
      setShowData: 'SET_SHOW_DATA',
      setDataObj: 'SET_DATA_OBJECT',
      setStatusList: 'SET_STATUS_LIST'
    }),
    /**
     * @function handleStar
     * @description 收藏夹点击事件
     */
    handleStar(val) {
      if (this.specialLock) {
        showToastPlugin('请先解锁童锁');
        return;
      }
      if (this.sync) {
        showToastPlugin('收藏夹数据同步中, 请稍后操作');
        return;
      }
      // 收藏夹点击事件预处理，判断属于哪个收藏夹，否则为初始值null
      let favor = null;
      const key = `${[this.washType, this.washMode]}`;
      const favor1Array = `${[this.favor1Params[12] >> 4, this.favor1Params[4]]}`;
      const favor2Array = `${[this.favor2Params[12] >> 4, this.favor2Params[4]]}`;
      const favor3Array = `${[this.favor3Params[12] >> 4, this.favor3Params[4]]}`;
      switch (key) { 
        case favor1Array:
          favor = 'favor1Params';
          break;
        case favor2Array:
          favor = 'favor2Params';
          break;
        case favor3Array:
          favor = 'favor3Params';
          break;
        default:
          break;
      }
      this.star = val;
      // 收藏还是取消
      if (val) {
        const list = this.getStatus();
        // 收藏夹判断是否有相同模式
        if (favor) {
          Dialog.confirm({
            title: '提示',
            content: '收藏夹已有相同模式，是否覆盖',
            confirmText: '确定',
            onConfirm: () => {
              const obj = {};
              obj[favor] = list;
              obj.changeFavor = 3; 
              obj.exeFavor = ~~favor[5]; 
              this.setDataObj(obj);
              this.sendCtrl(obj);
            },
            cancelText: '取消',
            onCancel: () => {
              this.star = 0;
            }
          });
        } else if (this.favor1Params[4] && this.favor2Params[4] && this.favor3Params[4]) {
          Dialog.confirm({
            title: '提示',
            content: '收藏夹已满!请删除收藏夹中部分程序后再进行操作',
            confirmText: '转到收藏夹',
            onConfirm: () => {
              this.$router.push({
                name: 'Favorites'
              });
            },
            cancelText: '取消',
            onCancel: () => {
              this.star = 0;
            }
          });
        } else {
          for (let index = 1; index < 4; index++) {
            if (!this[`favor${index}Params`][4]) {
              const obj = {};
              obj.changeFavor = 1; // 改变的类型 新增1、删除2、改变3
              obj.exeFavor = index; // 改变的收藏夹编号
              obj[`favor${index}Params`] = list;
              this.setDataObj(obj);
              this.sendCtrl(obj);
              break;
            }
          }
        }
      } else {
        Dialog.confirm({
          title: '',
          content: '确认取消收藏？',
          confirmText: '确定',
          onConfirm: () => {
            const deletList = new Array(14);
            deletList.fill(0);
            const index = ~~favor[5];
            let obj = {
              changeFavor: 2, // 删除
              exeFavor: index
            };
            obj[`favor${index}Params`] = deletList; // 告诉整机 删除第一个.变化在app显示
  
            let commitObj = {
              favor3Params: deletList // 无论如何都是无值
            };
            switch (index) {
              case 0:
                if (this.favor2Params[4]) { // 如果第二个有值，更新2、3
                  commitObj.favor1Params = this.favor2Params;
                  commitObj.favor2Params = this.favor3Params;
                } else { // 如果第二个无值，更新1
                  commitObj.favor1Params = deletList;
                }
                break;
              case 1: 
                if (this.favor3Params[4]) { // 如果第三个有值，更新2
                  commitObj.favor2Params = this.favor3Params;
                }
                break;
              default:
                break;
            }
            this.setDataObj(obj);
            this.setDataObj(commitObj);
            this.sendCtrl(obj);
          },
          cancelText: '取消',
          onCancel: () => {
            this.star = 1;
          }
        });
      }
    },
    /**
     * @function getStatus
     * @description 获取当前的所有模式参数
     */
    getStatus() {
      let list = [];
      // 辅助功能
      const dataObject = this.dataObject;
      let list0 = dataObject.soak << 6; // 浸泡
      list0 += dataObject.energySave << 5; // 节能
      list0 += dataObject.noDrain << 4; // 免排水
      list0 += dataObject.highWater << 2; // 高水位
      list0 += dataObject.creaseRes << 1; // 防皱
      list[0] = list0; 

      list[1] = 0; // 预约不处理
      list[2] = 0; 
      list[3] = 0; 

      list[4] = dataObject.washMode; // 洗涤模式

      const setList = this.washList[this.washType].washMode[this.washModeIndex].configList;
      const configObj = {};
      setList.forEach(element => {
        configObj[element.protocol] = dataObject[element.protocol];
      });

      if (configObj.speed) { // 转速 高位低位
        const speedvalue = dataObject.speed;
        list[5] = (speedvalue / 256) | 0; // 等于(speedvalue / 256) >> 0
        list[6] = speedvalue % 256;
      } else {
        list[5] = 0;
        list[6] = 0;
      }

      list[7] = configObj.washTemp === undefined ? 0 : dataObject.washTemp; // 温度
      list[8] = configObj.setWashTime === undefined ? 0 : dataObject.setWashTime; // 洗涤时间
      list[9] = configObj.potch === undefined ? 0 : dataObject.potch; // 洗涤次数


      const timeAllValue = dataObject.timeAll; // 总运行时间
      list[10] = ~~(timeAllValue / 256); // 运行时间高位
      list[11] = timeAllValue % 256; // 运行时间低位

      list[12] = dataObject.washType << 4; // 洗涤类型 + 浸泡时间
      if (dataObject.soak) list[12] += dataObject.soakTime;
      
      list[13] = configObj.dry === undefined ? 0 : dataObject.dry; // 烘干/蒸汽 状态
      this.setStatusList(list);
      // const notObj = {};
      // console.log('收藏夹数据', Object.assign(notObj, configObj));
      return list;
    },
    /**
     * @function loglist
     * @description log 收藏夹
     */
    loglist(list) {
      // const obj = {};
      // console.log('收藏夹obj', obj);
    }
  }
};
export default favorModule;
