import { mapActions } from 'vuex';
import BtnConfig from '@/mixins/config/btn';
import LogicConfig from '@/mixins/config/logic';
import { showToast } from '../../../../static/lib/PluginInterface.promise';

const logicWatch = {
  mixins: [BtnConfig, LogicConfig],
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
    const setData = {};
    // 遍历5种模式
    for (i; i <= this.ModNum; i += 1) {
      if (this.WdSpdtoMod[i].indexOf(this.ModName) === 0) {
        break;
      }
    }
    // 遍历8种风档
    for (let o = 1; o <= this.WdSpdNum; o += 1) {
      if (this.WdSpdtoMod[i][o]) {
        truePos.push(o);
      }
    }
    this.WdSpdOptions.controlAble = true;
    // 比如 Mod = 2 除湿状态时，风档不可控
    if (truePos.length === 1) {
      const state = this.WdSpdFunc[this.WdSpdtoMod[0][truePos]][0][0];
      const num = this.WdSpdFunc[this.WdSpdtoMod[0][truePos]][0][1];
      setData[state] = num;
      if (this.Pow) {
        this.setDataObject(setData);
      }
      this.WdSpdOptions.controlAble = false;
    }
  },
  computed: {
    /**
     * @returns 高级功能数量
     */
    funcNum() {
      return this.AdvtoAdv[0].length - 1;
    },
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
      return this.ModFunc[this.Mod];
    },
    /**
     * @returns 当前风档名称
     */
    WdSpdName() {
      let name;
      const WdSpdMsg = [[], [], [], []];
      for (let i = 1; i <= this.WdSpdNum; i += 1) {
        WdSpdMsg[0].push(this.WdSpdFunc[this.WdSpdtoMod[0][i]][0][0]);
        WdSpdMsg[1].push(this.WdSpdFunc[this.WdSpdtoMod[0][i]][0][1]);
        WdSpdMsg[2].push(this.WdSpdFunc[this.WdSpdtoMod[0][i]][0][2]);
        WdSpdMsg[3].push(this.WdSpdtoMod[0][i]);
      }
      for (let o = 1; o <= this.WdSpdNum; o += 1) {
        const pos = WdSpdMsg[2].indexOf(Math.max.apply(null, WdSpdMsg[2]));
        name = WdSpdMsg[0][pos];
        const dataObjectval = this.dataObject[name];
        const targetVal = WdSpdMsg[1][pos];
        if (dataObjectval === targetVal) {
          name = WdSpdMsg[3][pos];
          break;
        }
        WdSpdMsg[0].splice(pos, 1);
        WdSpdMsg[1].splice(pos, 1);
        WdSpdMsg[2].splice(pos, 1);
        WdSpdMsg[3].splice(pos, 1);
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
    },
    /**
     * @description 监听所有高级功能的状态变化
     * @returns 所有高级功能的状态
     */
    AdvWatch() {
      let val = 0;
      for (let i = 1; i < this.AdvtoAdv[0].length; i += 1) {
        val +=
          this.dataObject[this.AdvFunc[this.AdvtoAdv[0][i]][0][0]] *
          10 ** (i - 1);
      }
      return val;
    },
    /**
     * @description 高级功能名称列表
     * @returns 所有高级功能的名称
     */
    AdvList() {
      const val = [];
      for (let i = 1; i < this.AdvtoAdv[0].length; i += 1) {
        val[i - 1] = this.AdvtoAdv[0][i];
      }
      return val;
    }
  },
  watch: {
    /**
     * @description 高级功能被点击时执行互斥逻辑判断
     */
    AdvWatch(newv, oldv) {
      const val = [...JSON.stringify(Math.abs(newv - oldv))].reverse();
      for (let i = 0; i < val.length; i += 1) {
        if (val[i] !== '0') {
          if (
            this.dataObject[this.AdvFunc[this.AdvList[i]][0][0]] ===
            this.AdvFunc[this.AdvList[i]][1][0]
          ) {
            this.checkAdvtoAdv(this.AdvList[i]);
          }
        }
      }
    },
    /**
     * @description 切换模式时执行逻辑判断
     */
    Mod(newVal) {
      const setData = this.checkModtoWdSpd();
      Object.assign(setData, this.checkModtoAdv());
      this.setDataObject(setData);
      setData.Mod = newVal;
      this.sendCtrl(setData);
    },
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
        if (!this.WdSpdtoMod[ModPos][WdSpdPos]) {
          const state = this.WdSpdFunc[oldVal][0][0];
          const num = this.WdSpdFunc[oldVal][0][1];
          const setData = JSON.parse(JSON.stringify(this.WdSpdSpecial));
          const tip = `mode.fan_${newVal}_${this.ModName}_tips`.toLowerCase();
          setData[state] = num;
          this.setDataObject(setData);
          this.sendCtrl(setData);
          showToast(this.$language(tip), 0);
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
  },
  methods: {
    ...mapActions({
      sendCtrl: 'SEND_CTRL'
    }),
    /**
     * @description 高级功能之间的互斥关系
     */
    checkAdvtoAdv(val) {
      const falsePos = this.AdvtoAdv[0].indexOf(val);
      const setData = {};
      for (let i = 1; i <= this.funcNum; i += 1) {
        if (!this.AdvtoAdv[falsePos][i]) {
          const Arr = this.AdvFunc[this.AdvtoAdv[0][i]];
          for (let o = 0; o < Arr[0].length; o += 1) {
            if (
              this.dataObject[Arr[0][o]] !== 0 &&
              Arr[0][o] !== this.AdvFunc[val][0][0] &&
              ((this.dataObject[Arr[0][o]] === Arr[1][o] &&
                Arr[2][0] === 'Only') ||
                (this.dataObject[Arr[0][o]] !== 0 && Arr[2][0] === 'All'))
            ) {
              setData[Arr[0][o]] = 0;
            }
          }
        }
      }
      this.setDataObject(setData);
      for (let i = 0; i < this.AdvFunc[val][0].length; i += 1) {
        setData[this.AdvFunc[val][0][i]] = this.AdvFunc[val][1][i];
      }
      this.sendCtrl(setData);
    },
    /**
     * @description 切换模式时对当前风档进行判断
     */
    checkModtoWdSpd() {
      let ModPos = 0;
      const falsePos = [];
      const truePos = [];
      const setData = {};
      for (ModPos; ModPos <= this.ModNum; ModPos += 1) {
        if (this.WdSpdtoMod[ModPos].indexOf(this.ModName) === 0) {
          break;
        }
      }
      for (let o = 1; o <= this.WdSpdNum; o += 1) {
        if (!this.WdSpdtoMod[ModPos][o]) {
          falsePos.push(o);
        } else {
          truePos.push(o);
        }
      }
      this.WdSpdOptions.controlAble = true;
      if (truePos.length === 1) {
        const state = this.WdSpdFunc[this.WdSpdtoMod[0][truePos]][0][0];
        const num = this.WdSpdFunc[this.WdSpdtoMod[0][truePos]][0][1];
        setData[state] = num;
        Object.assign(setData, this.WdSpdSpecial);
        this.WdSpdOptions.controlAble = false;
        if (typeof setData.WdSpd !== 'undefined') {
          this.WdSpdTure = this.WdSpdFunc[setData.WdSpd];
        }
        return setData;
      } else if (falsePos.length > 1) {
        for (let o = 0; o < falsePos.length; o += 1) {
          if (
            !this.WdSpdtoMod[ModPos][falsePos[o]] &&
            this.dataObject[
              this.WdSpdFunc[this.WdSpdtoMod[0][falsePos[o]]][0][0]
            ] === this.WdSpdFunc[this.WdSpdtoMod[0][falsePos[o]]][0][1]
          ) {
            for (
              let j = 1;
              j < this.WdSpdFunc[this.WdSpdtoMod[0][falsePos[o]]].length;
              j += 1
            ) {
              const state = this.WdSpdFunc[this.WdSpdtoMod[0][falsePos[o]]][
                j
              ][0];
              const num = this.WdSpdFunc[this.WdSpdtoMod[0][falsePos[o]]][j][1];
              setData[state] = num;
            }
            if (typeof setData.WdSpd !== 'undefined') {
              this.WdSpdTure = this.WdSpdFunc[setData.WdSpd];
            }
            return setData;
          }
        }
      }

      return setData;
    },
    /**
     * @description 切换模式时对高级功能进行判断
     */
    checkModtoAdv() {
      let ModPos = 0;
      const setData = {};
      for (ModPos; ModPos <= this.ModNum; ModPos += 1) {
        if (this.AdvtoMod[ModPos].indexOf(this.ModName) === 0) {
          break;
        }
      }
      for (let i = 1; i < this.AdvtoMod[0].length; i += 1) {
        if (!this.AdvtoMod[ModPos][i]) {
          const Arr = this.AdvFunc[this.AdvtoMod[0][i]];
          for (let o = 0; o < Arr[0].length; o += 1) {
            if (setData[Arr[0][o]] !== 0) {
              setData[Arr[0][o]] = 0;
            }
          }
        }
      }
      return setData;
    }
  }
};
export default logicWatch;
