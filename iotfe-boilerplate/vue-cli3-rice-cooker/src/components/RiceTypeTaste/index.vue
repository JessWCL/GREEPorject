<template>
  <div class="typetast-postion">
    <div
      class="mask-container"
      :class="{active: maskActive}"
    >
      <div
        class="mask-bg"
        @click="handleCancle"
      />
      <div class="confirm-box">
        <div class="title">
          <slot name="title" />
        </div>
        <div class="body">
          <div
            class="col-wrapper"
            :class="{ 'd-none': !hasRice }"
          >
            <div class="col">
              <span class="label">米种</span>
              <span
                v-for="(item, index) in typeList"
                :key="index"
                :class="{
                  'd-none': defaultTimeForCustomize[index + 1] === undefined,
                  active: typeSelected === index + 1
                }"
                :index="index"
                @click="handleTypeSelected(index + 1)"
              >{{ item }}</span>
            </div>
          </div>
          <div
            class="col-wrapper"
            :class="{ 'd-none': !hasTextre }"
          >
            <div class="col">
              <span class="label">口感</span>
              <span
                v-for="(item, index) in tasteList"
                :key="index"
                :class="{ active: tasteSelected === index + 1 }"
                @click="handleTasteSelected(index + 1)"
              >{{ item }}</span>
            </div>
          </div>
        </div>
        <div class="footer">
          <div @click="handleCancle">
            取消
          </div>
          <div @click="emitHandleConfirm">
            确定
          </div>
        </div>
      </div>
    </div>
    <div
      class="typetaste-clickbox"
      :class="{editable: editable}"
    >
      <p
        class="d-inline"
        @click="handleClick"
      >
        <span :class="{ 'd-none': !hasRice }">{{ typeList[typeSelected - 1] }}</span>
        <span :class="{ 'd-none': !hasTextre }">{{ tasteList[tasteSelected - 1] }}</span>
        <span
          class="arrow"
          :class="{ 'invisible': !editable }"
        />
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RiceTypeTaste',
  props: {
    typeList: {
      type: Array,
      required: true,
      // eslint-disable-next-line func-names
      default: function () {
        return ['长粒米', '短粒米', '糙米'];
      }
    },
    tasteList: {
      type: Array,
      required: true,
      // eslint-disable-next-line func-names
      default: function () {
        return ['稍软', '适中', '稍硬'];
      }
    },
    hasRice: { // 是否有米种选择
      type: Boolean,
      required: true,
      // eslint-disable-next-line func-names
      default: function () {
        return true;
      }
    },
    hasTextre: { // 是否口感选择
      type: Boolean,
      required: true,
      // eslint-disable-next-line func-names
      default: function () {
        return true;
      }
    },
    defaultTimeForCustomize: {
      type: Array,
      required: true,
      // eslint-disable-next-line func-names
      default: function () {
        return [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ];
      }
    },
    editable: {
      type: Boolean,
      required: true,
      // eslint-disable-next-line func-names
      default: function () {
        return true;
      }
    }
  },
  data() {
    return {
      maskActive: false,
      typeSelected: 0,
      tasteSelected: 0,
      typeCache: 0,
      tasteCache: 0,
    };
  },
  methods: {
    setMaskActive(payload) {
      this.maskActive = payload;
      this.$emit('handleConfirm', { type: this.typeSelected, taste: this.tasteSelected });
    },
    getMask() {
      return this.maskActive;
    },
    setMask(val) {
      this.maskActive = val;
    },
    setType(payload) {
      const { type } = payload;
      this.typeSelected = type;
    },
    setTaste(payload) {
      const { taste } = payload;
      this.tasteSelected = taste;
    },
    setEditable(payload) {
      const { editable } = payload;
      this.editable = editable;
    },
    handleTypeSelected(payload) {
      this.typeSelected = payload;
      this.$emit('handleConfirm', { type: this.typeSelected, taste: this.tasteSelected });
    },
    handleTasteSelected(payload) {
      this.tasteSelected = payload;
      this.$emit('handleConfirm', { type: this.typeSelected, taste: this.tasteSelected });
    },
    handleClick() {
      if (!this.editable) return;
      this.setMaskActive(true);
      this.typeCache = this.typeSelected;
      this.tasteCache = this.tasteSelected;
    },
    handleCancle() {
      this.setMaskActive(false);
      this.typeSelected = this.typeCache;
      this.tasteSelected = this.tasteCache;
      this.$emit('handleConfirm', { type: this.typeSelected, taste: this.tasteSelected });
    },
    emitHandleConfirm() {
      this.setMaskActive(false);
      this.$emit('handleConfirm', { type: this.typeSelected, taste: this.tasteSelected });
    },
    getTypeTaste() {
      return { type: this.typeSelected, taste: this.tasteSelected };
    }
  }
};
</script>

<style lang="scss" scoped>
.d-inline {
  display: inline;
}
.d-none {
  display: none;
}
.invisible {
  visibility: hidden;
}
.mask-container.active {
  display: flex;
}
.mask-container {
  z-index: 1000;
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  .mask-bg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -100; // bugfix iOS
    background: rgba(0, 0, 0, 0.5);
  }
}
.confirm-box {
  overflow: hidden;
  z-index: 1010;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-items: center;
  background: #fff;
  color: #535867;
  border-radius: 10px;
  width: 90%;

  .title {
    margin: 0.5rem;
    font-size: 0.5rem;

    span {
      padding: 0.1rem;
      font-size: 1rem;
    }
  }

  .body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 0.4rem;
    // padding: 0 1rem;

    div.col {
      display: flex;
      justify-content: flex-start;
      margin: 0.2rem 0;
    }

    span {
      width: 1.25rem;
      padding: 0.2rem;
      margin: 0 0.2rem;
      border-radius: 0.15rem;
      border: 1px solid #cdcdcd;
    }
    span.label {
      font-weight: bold;
      border: none;
    }
    span.active {
      border: 1px solid #fbe789;
      background: #fbe789;
    }
  }

  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.5rem;
    font-size: 0.4rem;
    border-top: 1px solid #ededed;

    div {
      flex: 1;
      padding: 0.4rem;
      text-align: center;
    }
    div:not(:first-child) {
      border-left: 1px solid #ededed;
    }
    div:hover {
      background: #ededed;
    }
  }
}

.typetaste-clickbox {
  width: 100%;
  text-align: left;
  font-size: 0.45rem;
  padding-left: 5%;
  height: 0.6rem; // 固定高度 防止没有米种口感，滑轮往上错位
  span {
    margin-right: 0.25rem;
  }
}
.typetaste-clickbox.editable span.arrow {
  margin-left: -0.3rem;
}
.typetaste-clickbox.editable span.arrow::after {
  content: "";
  display: inline-block;
  width: 0.3rem;
  height: 0.3rem;
  margin-bottom: -0.1rem;
  background: no-repeat;
  background-image: url("../../assets/img/arrow.png");
}
</style>
