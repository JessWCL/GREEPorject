<template>
  <gree-view bg-color="#F4F4F4">
    <gree-header  
      :left-options="{preventGoBack: true}"
      @on-click-back="goBack"
    >
      {{ devname }}
      <div 
        slot="right" 
        class="header-right">
        <a @click="svstSave">
          {{ $language("home.btnSave") }}
        </a>  
      </div>
    </gree-header>
    <div class="page-content-se">
      <gree-list>
        <gree-list-item title="节能">
          <gree-switch 
            slot="after" 
            v-model="isActive2"></gree-switch>
        </gree-list-item>
      </gree-list>
      <div 
        class="picker-content" 
        v-if="isActive2">
        <div class="picker-title">
          <span>{{ EnergyText }}</span>
        </div>
        <gree-picker
          class="picker1"
          ref="picker"
          :data="pickerData"
          :cols="1"
          :line-height="90"
          :default-index="pickerDefaultIndex"
          :default-value="pickerDefaultValue"
          is-view
          @initialed="onPickerInitialed"
          @change="onPickerConfirm"
        ></gree-picker>
        <div v-show="false">{{ Mod }}</div>
      </div>
    </div>
  </gree-view>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { Header, Switch, List, Item, Picker } from 'gree-ui';
import { changeBarColor } from '../../../static/lib/PluginInterface.promise';

let Data1 = [];
for (let i = 16; i < 31; i += 1) {
  Data1[i - 16] = { text: `${i}`, value: i };
}
Data1 = [Data1];
export default {
  components: {
    [Header.name]: Header,
    [Switch.name]: Switch,
    [List.name]: List,
    [Item.name]: Item,
    [Picker.name]: Picker
  },
  data() {
    return {
      devname: '节能',
      isActive2: false,
      pickerData: Data1,
      pickerDefaultIndex: [2],
      pickerDefaultValue: [3],
      pickerValue: '',
      EnergyText: ''
    };
  },
  computed: {
    ...mapState({
      SvSt: state => state.dataObject.SvSt,
      Mod(state) {
        this.EnergyText =
          state.dataObject.Mod === 1
            ? this.$language('se.CoolSvStTemMin')
            : this.$language('se.HeatSvStTemMax');
        return state.dataObject.Mod;
      },
      CoolSvStTemMin: state => state.dataObject.CoolSvStTemMin,
      HeatSvStTemMax: state => state.dataObject.HeatSvStTemMax
    })
  },
  mounted() {
    this.isActive2 = Boolean(this.SvSt);
    const pickerIndex =
      this.Mod === 1 ? this.CoolSvStTemMin : this.HeatSvStTemMax;
    this.pickerDefaultIndex[0] = parseInt(pickerIndex, 10) - 16;
    this.pickerValue = pickerIndex;
    changeBarColor('#F4F4F4');
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT'
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL'
    }),
    goBack() {
      this.$router.go(-1);
    },
    onPickerInitialed() {
      const columnValues = this.$refs.picker.getColumnValues();
      let value = '';
      columnValues.forEach(item => {
        value += `${item.value}-`;
      });
      console.log(value);
    },
    onPickerConfirm(columnIndex, itemIndex, value) {
      if (value) {
        this.pickerValue = value.text;
      }
    },
    svstSave() {
      const SvstValue = this.isActive2 ? 1 : 0;
      if (this.Mod === 1) {
        this.sendCtrl({
          CoolSvStTemMin: Number(this.pickerValue),
          SvSt: SvstValue
        });
        this.setDataObject({
          CoolSvStTemMin: this.pickerValue,
          SvSt: SvstValue
        });
      } else {
        this.sendCtrl({
          HeatSvStTemMax: Number(this.pickerValue),
          SvSt: SvstValue
        });
        this.setDataObject({
          HeatSvStTemMax: this.pickerValue,
          SvSt: SvstValue
        });
      }
      this.$router.go(-1);
    }
  }
};
</script>
