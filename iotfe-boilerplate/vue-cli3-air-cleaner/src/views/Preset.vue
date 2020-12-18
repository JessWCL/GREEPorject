<!--
 * @Descripttion: 定时页
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2020-03-16 09:59:28
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-03-31 10:57:45
 -->
<template>
  <gree-view :bg-color="'f4f4f4'">
    <gree-header
      :left-options="{ preventGoBack: true }"
      @on-click-back="goBack"
    >定时
      <a slot="right" @click="save">保存</a>
    </gree-header>
    <gree-page class="preset">
      <div
        class="gree-example-child gree-example-child-picker gree-example-child-picker-1"
      >
        <gree-picker
          ref="picker"
          :data="pickerData"
          :cols="2"
          :line-height="90"
          :multi-line="false"
          :default-index="pickerDefaultIndex"
          is-view
          @change="onPickerConfirm2"
        />
      </div>
      <div class="preset-type">
        <span>
          定时类型
        </span>
        <span class="preset-btn">
          {{ Pow ? '关' : '开' }}
        </span>
      </div>
      <span v-if="TmrOn || TmrOff" class="cancel" @click="handleCancel">
        取消定时
      </span>
    </gree-page>
  </gree-view>
</template>

<script>
import { Picker, Header } from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import {
  editDevicePlugin,
  changeBarColorPlugin,
  showToastPlugin
} from '../utils/pluginInterface';

export default {
  components: {
    [Picker.name]: Picker,
    [Header.name]: Header,
  },
  data() {
    return {
      pickerData: this.timeData(),
      pickerDefaultIndex: [1, 0],
      presetType: '关',
    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      Pow: state => state.dataObject.Pow,
      TmrOff: state => state.dataObject.TmrOff,
      TmrOn: state => state.dataObject.TmrOn,
      StTmr: state => state.dataObject.StTmr,

      isError: state => state.isError,

    }),
  },
  watch: {
    isError(newV) {
      if (newV) {
        showToastPlugin('故障中, 无法设置定时');
        this.$router.push({ name: 'Home'});
      }
    }
  },
  created() {
    console.log(this.StTmr);
    this.pickerDefaultIndex = [~~(this.StTmr / 60), ~~(this.StTmr % 60)];
  },
  mounted() {
    changeBarColorPlugin('#f4f4f4');
  },
  methods: {
    ...mapMutations({
      setDataObj: 'SET_DATA_OBJECT',
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL',
    }),
    /**
     * @description 保存定时
     */  
    save() {
      const columnValues = this.$refs.picker.getColumnValues();
      const obj = {
        StTmr: columnValues[0].value * 60 + columnValues[1].value,
        TmrOn: this.Pow ? 0 : 1,
        TmrOff: this.Pow ? 1 : 0
      };

      this.setDataObj(obj);
      this.sendCtrl(obj);
      this.goBack();
    },
    /**
     * @description 取消定时
     */
    handleCancel() {
      const obj = {
        StTmr: 0,
        TmrOn: 0,
        TmrOff: 0
      };
      this.setDataObj(obj);
      this.sendCtrl(obj);
      this.goBack();
    },

    /**
     * @description 返回键
     */
    goBack() {
      this.$router.go(-1);
    },
    // /**
    //  * @description 编辑设备名称
    //  */
    // moreInfo() {
    //   editDevicePlugin(this.mac);
    // },
    
    onPickerConfirm2(columnIndex, itemIndex, value) {
      if (value) {
        this.pickerValue = value.text;
      }
    },

    timeData() {
      const timelist = [];
      const minLIist = [];
      for (let index = 0; index < 60; index++) {
        const child = {};
        child.value = index;
        child.text = index < 10 ? `0${index}` : `${index}`;
        minLIist.push(child);
      }
      for (let index = 0; index < 24; index++) {
        const parent = {};
        parent.value = index;
        parent.text = index < 10 ? `0${index}` : `${index}`;
        timelist.push(parent);
      }
      return [timelist, minLIist];
    },
  },
};
</script>

<style lang="scss" scope>
.gree-example-child-picker-1 {
  .gree-picker-column {
    .gree-picker-column-container {
      .gree-picker-column-masker {
        &.top {
          &::before {
            visibility: hidden;
          }
        }
        &.bottom {
          &::after {
            visibility: hidden;
          }
        }
      }
      .gree-picker-column-list {
        .gree-picker-column-item {
          &:nth-of-type(1)::after {
            content: '小时';
          }
          &:nth-of-type(2)::after {
            content: '分钟后';
          }
          &:nth-of-type(1),
          &:nth-of-type(2) {
            &::after {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              right: 0;
              font-size: 50px !important;
            }
          }
        }
        .column-list {
          .column-item {
            color: #3b99ff;
            font-size: 150px !important;
            font-weight: 10 !important;
            font-family: Hiragino Sans GB !important;
          }
        }
      }
    }
  }
}
</style>
