<template>
  <!-- 米种、口感组件 -->
  <gree-popup
    v-model="enableRiceBox.center"
    position="center"
  >
    <div class="popup-center">
      <div class="title">
        {{ modeName }}约{{ cookTime }}分钟
      </div>
      <gree-list>
        <gree-item>
          <div class="item-media">
            米种
          </div>
          <div class="item-inner">
            <div class="item-title">
              <div class="row">
                <div
                  class="col-33"
                  v-for="(item, index) in riceList"
                  :key="index"
                >
                  <gree-radio
                    :name="index"
                    v-model="riceBuffer"
                    icon=""
                    icon-inverse=""
                    icon-disabled=""
                    :label="item.name"
                    inline
                    @input="setRiceId(index)"
                  />
                </div>
              </div>
            </div>
          </div>
        </gree-item>
        <gree-item>
          <div class="item-media">
            口感
          </div>
          <div class="item-inner">
            <div class="item-title">
              <div class="row">
                <div
                  class="col-33"
                  v-for="(item, index) in tasteList"
                  :key="index"
                >
                  <gree-radio
                    :name="index"
                    v-model="tasteBuffer"
                    icon=""
                    icon-inverse=""
                    icon-disabled=""
                    :label="item.name"
                    inline
                    @input="setTasteId(index)"
                  />
                </div>
              </div>
            </div>
          </div>
        </gree-item>
      </gree-list>
      <footer class="actions">
        <div
          class="popup-btn"
          @click="cancel"
        >取消</div>
        <div
          class="popup-btn"
          @click="begin"
        >开始</div>
      </footer>
    </div>
  </gree-popup>
</template>

<script>
export default {
  name: 'RiceBox',
  props: {
    modeName: {
      type: String,
      default: '精煮饭'
    },
    cookTime: {
      type: Number,
      default: 50
    },
    enableRiceBox: {
      // 是否开始选择米种
      type: Object,
      default() {
        return {};
      }
    },
    hasTaste: {
      // 是否有选择口感的功能
      type: Boolean,
      default() {
        return true;
      }
    },
    riceList: {
      // 米种数据源
      type: Array,
      default() {
        return [];
      }
    },
    tasteList: {
      // 口感数据源
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      /* 临时数组，储存Radio选中 */
      riceArrayTemp: [],
      tasteArrayTemp: [],
      /* Radio 选中项的value */
      riceBuffer: 0,
      tasteBuffer: 0
    };
  },
  mounted() {
    for (let i = 0; i < this.riceList.length; i += 1) {
      this.riceArrayTemp.push(false);
    }
    for (let i = 0; i < this.tasteArrayTemp.length; i += 1) {
      this.tasteArrayTemp.push(false);
    }
  },
  methods: {
    /**
     * @param index 米种列表下标
     * @description 选择米种触发事件
     */
    setRiceId(index) {
      for (let i = 0; i < this.riceArrayTemp.length; i += 1) {
        this.riceArrayTemp[i] = false;
      }
      this.riceBuffer = index;
      this.$set(this.riceArrayTemp, index, true);
      this.$emit('setCookTime', { rice: index, taste: this.tasteBuffer });
    },
    /**
     * @param index 口感列表下标
     * @description 选择口感触发事件
     */
    setTasteId(index) {
      if (this.hasTaste) {
        for (let i = 0; i < this.tasteArrayTemp.length; i += 1) {
          this.tasteArrayTemp[i] = false;
        }
        this.tasteBuffer = index;
        this.tasteList[index].vaild
          ? this.$set(this.tasteArrayTemp, index, true)
          : '';
        this.$emit('setCookTime', { rice: this.riceBuffer, taste: index });
      }
    },
    /**
     * @description 米种、口感弹框的取消键
     */
    cancel() {
      this.$emit('cancel');
    },
    /**
     * @description 米种、口感弹框的确认键
     */
    begin() {
      this.$emit('begin', { rice: this.riceBuffer, taste: this.tasteBuffer });
    }
  }
};
</script>
