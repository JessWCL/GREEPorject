<template>
  <div>
    <gree-block-title>烹饪温度</gree-block-title>
    <gree-block
      v-show="true"
      @click.native="tempPick"
    >
      <gree-row>
        <gree-col>
          <section>
            {{ pickerValue }}
            <code>&#x2103;</code>
          </section>
        </gree-col>
      </gree-row>
    </gree-block>
    <div
      class="picker-column"
      :class="{'not-visible': false}"
    >
      <gree-picker
        ref="picker"
        :data="pickerData"
        :cols="1"
        :line-height="60"
        :default-index="pickerDefaultIndex"
        :default-value="pickerDefaultValue"
        is-view
        :multi-line="false"
        @initialed="onPickerInitialed"
        @change="onPickerConfirm"
      ></gree-picker>
    </div>
  </div>
</template>

<script>

import {
  BlockTitle, Block, Row, Col, Button, Picker
} from 'gree-ui';

let Data1 = [
  { text: '高', value: 0 },
  { text: '中', value: 0 },
  { text: '低', value: 0 },
];
Data1 = [Data1];

export default {
  name: 'TempPicker',
  components: {
    [BlockTitle.name]: BlockTitle,
    [Block.name]: Block,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [Picker.name]: Picker,
  },
  data() {
    return {
      pickerData: Data1,
      pickerDefaultIndex: [1],
      pickerDefaultValue: [1],
      pickerValue: '中',
    };
  },
  methods: {
    onPickerInitialed() {
      const columnValues = this.$refs.picker.getColumnValues();
      let value = '';
      columnValues.forEach(item => {
        value += `${item.value}-`;
      });
    },
    onPickerConfirm(columnIndex, itemIndex, value) {
      if (value) {
        this.pickerValue = value.text;
      }
    }
  }
};
</script>
