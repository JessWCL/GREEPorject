<template>
  <gree-popup
    v-model="isPopupShow.bottom"
    position="bottom"
  >
    <div class="popup-bottom">
      <div
        class="arrow-down"
        @click="cancel"
        @touchmove="cancel"
      ></div>
      <gree-row>
        <gree-col
          :width="functionList.length < 4 ? 'auto' : 25"
          :class="{'disabled': setGrey[item.index]}"
          v-for="(item, index) in functionList"
          :key="index"
        >
          <div
            class="icon"
            @click="BtnFunction(setGrey[item.index], item.sign, item.index)"
            v-show="item.ScenesShow || !functype"
          >
            <img :src="item.ImgUrl" />
          </div>
          <span
            v-if="item.name"
            @click="jumpPage(index)"
          >
            {{ item.name }}
            <i
              class="triangle"
              v-if="item.moreBtn"
            ></i>
          </span>
        </gree-col>
      </gree-row>
    </div>
  </gree-popup>
</template>

<script>
import { Popup, Row, Col } from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import BtnConfig from '@/mixins/config/btn';
import LogicConfig from '@/mixins/config/logic';
import { timerListDevice } from '../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [Popup.name]: Popup,
    [Row.name]: Row,
    [Col.name]: Col
  },
  mixins: [BtnConfig, LogicConfig],
  props: {
    isPopupShow: {
      type: Object,
      default() {
        return {};
      }
    },
    modeList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      Pow: state => state.dataObject.Pow,
      Mod: state => state.dataObject.Mod,
      functype: state => state.functype,
      mac: state => state.mac
    }),
    ModName() {
      return this.ModFunc[this.Mod];
    },
    setGrey() {
      const val = {};
      const ModPos = this.AdvtoMod.findIndex(value => {
        return value[0].includes(this.ModName);
      });
      this.functionList.forEach(item => {
        const AdvPos = this.AdvtoMod[0].findIndex(value => {
          return value === item.sign;
        });
        if (AdvPos !== -1) {
          val[item.index] = !this.AdvtoMod[ModPos][AdvPos];
        }
      });
      return val;
    }
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT'
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL'
    }),
    cancel() {
      this.$set(this.isPopupShow, 'bottom', false);
    },
    BtnFunction(enAble, val, index) {
      if (enAble) return;
      switch (index) {
        case 10:
          timerListDevice(this.mac);
          return;
        default:
          break;
      }
      val ? this.setVal(val) : '';
    },
    setVal(val) {
      const Arr = this.AdvFunc[val];
      const setData = {};
      let isSend = 0;
      for (let o = 0; o < Arr[0].length; o += 1) {
        if (
          (this.dataObject[Arr[0][o]] === Arr[1][o] && Arr[2][0] === 'Only') ||
          (this.dataObject[Arr[0][o]] !== 0 && Arr[2][0] === 'All')
        ) {
          setData[Arr[0][o]] = 0;
          isSend += 1;
        } else {
          setData[Arr[0][o]] = Arr[1][o];
        }
      }
      this.setDataObject(setData);
      isSend >= 1 ? this.sendCtrl(setData) : '';
    },
    jumpPage(index) {
      if (this.functionList[index].moreBtn) {
        switch (this.functionList[index].index) {
          case 2:
            this.$router.push({
              name: 'Sweep',
              params: { id: 2 }
            });
            break;
          case 3:
            this.$router.push({
              name: 'Sweep',
              params: { id: 1 }
            });
            break;
          case 10:
            timerListDevice(this.mac);
            break;
          default:
            break;
        }
      }
    }
  }
};
</script>
