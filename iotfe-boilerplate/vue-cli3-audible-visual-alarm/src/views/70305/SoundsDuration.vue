<template>
  <gree-view>
    <gree-header>
      {{ $language('SoundsDuration.title') }}
      <a slot="right" @click="clickSave">{{ $language('alertSettings.save') }}</a>
    </gree-header>
    <gree-page class="sounds-duration">
      <gree-picker
        ref="picker"
        :data="pickerData"
        :cols="1"
        :line-height="90"
        :default-index="pickerDefaultIndex"
        :default-value="pickerDefaultValue"
        is-view
        @change="onPickerChange"
        @initialed="onPickerInit"
      ></gree-picker>
      <!-- <span class="picker-unit" ref="pickerUnit">s</span> -->
    </gree-page>
  </gree-view>
</template>

<script>
import { 
  View, Page, Header, List, Item, Switch, Picker, 
  // Toast,
} from 'gree-ui';
import { mapState, mapMutations } from 'vuex';
import { tuyaControlDev } from '../../../../static/lib/PluginInterface.promise';
import * as type from '../../store/types.js';

let pickerData = [];
for (let i = 1; i <= 120; i += 1) {
  pickerData.push({ text: `${i}`, value: i });
}
pickerData = [pickerData];

export default {
  components: {
    [View.name]: View,
    [Page.name]: Page,
    [Header.name]: Header,
    [List.name]: List,
    [Item.name]: Item,
    [Switch.name]: Switch,
    [Picker.name]: Picker,
  },
  data() {
    return {
      pickerData,
      pickerDefaultIndex: [1],
      pickerDefaultValue: [1],
      pickerValue: '',
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      devId: state => state.dataObject.deviceId,
      soundDuration: state => {
        const alarmTime = state.dataObject.properties.find(el => {
          return el.code === 'alarm_time';
        });
        return alarmTime.value;
      },
    }),
  },
  watch: {
    /* soundDuration(newVal) {
      const unit = this.$refs.pickerUnit;
      if (newVal < 10) {
        unit.style['margin-left'] = '0.56rem';
      } else if (newVal >= 10 && newVal < 100) {
        unit.style['margin-left'] = '1.2rem';
      } else if (newVal >= 100) {
        unit.style['margin-left'] = '1.8rem';
      }
    }, */
  },
  methods: {
    ...mapMutations({
      setDataObject: type.SET_DATA_OBJECT,
    }),
    handler(name, active) {
      console.log(name);
      console.log(active);
    },
    clickSave(...arg) {
      console.log(arg);
      const picker = this.$refs.picker;
      const devId = this.devId;
      const key = 'alarm_time';
      const value = Number(picker.getColumnValue().value);
      tuyaControlDev(devId, key, value)
        .then(res => {
          console.log('SoundsDuration.vue > tuyaControlDev');
          console.log(res);
          // Toast.succeed('保存成功');
        })
        .catch(err => console.error(err));
      
      // 设置state
      const properties = [...this.dataObject.properties];
      const atIndex = properties.findIndex(el => el.code === 'alarm_time');
      properties[atIndex] = {
        code: 'alarm_time',
        value,
      };
      this.setDataObject({
        properties,
      });
      console.log(this.dataObject.properties);
    },
    onPickerChange(columnIndex, itemIndex, value) {
      if (value) {
        this.pickerValue = value.value;
      }
      /* const unit = this.$refs.pickerUnit;
      if (value.value < 10) {
        unit.style['margin-left'] = '0.56rem';
      } else if (this.pickerValue > 9 && this.pickerValue < 100) {
        unit.style['margin-left'] = '1.2rem';
      } else if (this.pickerValue > 99 && this.pickerValue < 1000) {
        unit.style['margin-left'] = '1.8rem';
      } */
    },
    onPickerInit() { // picker初始化成功
      console.log('onPickerInit');

      const picker = this.$refs.picker;
      console.log(picker);
      console.log(this.soundDuration);

      picker._props.defaultValue = [Number(this.soundDuration)];
      picker._props.defaultIndex = [Number(this.soundDuration)];
      picker.refresh();

      
      /* const unit = this.$refs.pickerUnit;
      unit.style.opacity = '1'; */
      /* if (this.soundDuration < 10) {
        unit.style['margin-left'] = '0.56rem';
      } else if (this.soundDuration > 9 && this.soundDuration < 100) {
        unit.style['margin-left'] = '1.2rem';
      } else if (this.soundDuration > 99 && this.soundDuration < 1000) {
        unit.style['margin-left'] = '1.8rem';
      } */
    },
  }
};
</script>


<style lang="scss">
// @font-face {
//   font-family: 'SourceHanSans-Light';
//   src: url('../../assets/fonts/SourceHanSans-Light.otf');
// }
.gree-picker{
  .gree-picker-column-item {
    .column-list {
      .column-item {
        // font-family: 'SourceHanSans-Light';
        font-weight: normal;
        font-weight: lighter;
        font-size:209px;
        position: relative;
        &:hover {
          color: #ccc;
        }
        &::after {
          content : 's';
          color: #c5cad5;
          font-size: 90px;
          font-weight: bold;
          margin-left: 20px;
        }
        &.active {
          color: #095ab5;
        }
        &.active::after {
          content : 's';
          color: #095ab5;
          font-size: 90px;
          font-weight: bold;
          margin-left: 20px;
        }
      }
    }
  }
}

.picker-unit{
  position: absolute;
  left: 50%;
  top: 4.2rem;
  margin-left: 60px;
  font-size: 90px;
  color: #095ab5;
  font-weight: lighter;
  opacity: 0;
}
</style>
