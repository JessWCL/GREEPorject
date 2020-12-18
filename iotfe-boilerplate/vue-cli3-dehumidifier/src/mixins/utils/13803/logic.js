// import BtnConfig from '@/mixins/config/13803/btn';
import { mapState } from 'vuex';
import LogicConfig from '@/mixins/config/logic';

const logicWatch = {
  mixins: [LogicConfig],
  data() {
    return {
      WdSpdTure: '' // 当前实际风档（因风档互斥时，其值会改变两次，故需要实际风档值做判断）
    };
  },
  /**
   * @description 初始化时风档是否可控
   */
  mounted() {
    let i = 0;
    const truePos = [];
    // 遍历1种模式
    for (i; i <= this.ModNum; i += 1) {
      if (this.WdSpdtoMod[i].indexOf(this.ModName) === 0) {
        break;
      }
    }
    // 遍历2种风档
    for (let o = 1; o <= this.WdSpdNum; o += 1) {
      if (this.WdSpdtoMod[i - 1][o]) {
        truePos.push(o);
      }
    }
    this.WdSpdOptions.controlAble = true;
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      functype: state => state.functype
    }),
    /**
     * @returns 模式数量
     */
    ModNum() {
      return this.WdSpdtoMod.length - 1;
    },
    /**
     * @returns 风档数量
     */
    WdSpdNum() {
      return this.WdSpdtoMod[0].length - 1;
    },
    /**
     * @returns 当前模式名称
     */
    ModName() {
      return this.ModFunc[this.Dmod];
    },
    /**
     * @returns 当前风档名称
     */
    WdSpdName() {
      let name;
      const WdSpdMsg = [[], [], []];
      for (let i = 1; i <= this.WdSpdNum; i += 1) {
        WdSpdMsg[0].push(this.WdSpdFunc[this.WdSpdtoMod[0][i]][0][0]);
        WdSpdMsg[1].push(this.WdSpdFunc[this.WdSpdtoMod[0][i]][0][1]);
        WdSpdMsg[2].push(this.WdSpdtoMod[0][i]);
      }
      for (let o = 1; o <= this.WdSpdNum; o += 1) {
        const pos = WdSpdMsg[1].indexOf(Math.max.apply(null, WdSpdMsg[1]));
        name = WdSpdMsg[0][pos];
        const dataObjectval = this.dataObject[name];
        const targetVal = WdSpdMsg[1][pos];
        if (dataObjectval === targetVal) {
          name = WdSpdMsg[2][pos];
          break;
        }
        WdSpdMsg[0].splice(pos, 1);
        WdSpdMsg[1].splice(pos, 1);
        WdSpdMsg[2].splice(pos, 1);
      }
      return name;
    },
    /**
     * @returns 特殊风档列表（如：静音风、强劲风）
     */
    WdSpdSpecial() {
      const SpecialState = {};
      for (let i = 0; i < this.WdSpdNum; i += 1) {
        if (this.WdSpdFunc[this.WdSpdFunc[i]][0][2] === 2) {
          SpecialState[this.WdSpdFunc[this.WdSpdFunc[i]][0][0]] = 0;
        }
      }
      return SpecialState;
    }
  },
  watch: {
    /**
     * @description 切换风档时执行逻辑判断
     */
    WdSpdName(newVal, oldVal) {
      if (newVal !== oldVal && this.WdSpdTure !== newVal && this.Pow) {
        const WdSpdPos = this.WdSpdtoMod[0].indexOf(newVal); // 风档值在逻辑表中的位置
        let ModPos = 0; // 模式值在逻辑表中的位置
        for (ModPos; ModPos <= this.ModNum; ModPos += 1) {
          if (this.WdSpdtoMod[ModPos].indexOf(this.ModName) === 0) {
            break;
          }
        }
        if (!this.WdSpdtoMod[ModPos - 1][WdSpdPos]) {
          const state = this.WdSpdFunc[oldVal][0][0];
          const num = this.WdSpdFunc[oldVal][0][1];
          const setData = JSON.parse(JSON.stringify(this.WdSpdSpecial));
          // const tip = `mode.fan_${newVal}_${this.ModName}_tips`.toLowerCase();
          setData[state] = num;
          this.setDataObject(setData);
          this.sendCtrl(setData);
          // showToast(this.$language(tip), 0);
        } else {
          const state = this.WdSpdFunc[newVal][0][0];
          const num = this.WdSpdFunc[newVal][0][1];
          const setData = JSON.parse(JSON.stringify(this.WdSpdSpecial));
          setData[state] = num;
          this.sendCtrl(setData);
          this.WdSpdTure = newVal;
        }
      }
    }
  }
};
export default logicWatch;
