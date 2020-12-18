<template>
  <div class="report-section">
    <div class="report-section-head">
      <span><img :src="titleIcon"></span>
      <h4>{{ title }}</h4>
    </div>
    <div class="report-section-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ReportSection',
  components: {
  },
  props: {
    title: {
      type: String,
      default: 'Report-Section-title',
    },
    titleIcon: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
    };
  },
  computed: {
  },
  watch: {
  },
  methods: {
  },
};
</script>

<style lang='scss' scoped >
.report-section {
  border-top: 1px solid #ececec;
  border-bottom: 1px solid #ececec;
  margin-bottom: 18px;
  overflow: hidden;
  overflow-wrap: break-word;
  .report-section-head {
    background-color: #fff;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    height: 126px;
    padding: 0 60px;
    box-sizing: border-box;
    border-bottom: 1px solid #f3f3f3;
    span {
      display: block;
      width: 50px;
      height: 50px;
      margin-right: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    h4 {
      font-size: 42px;
    }
  }
  .report-section-body {
    background-color: #fff;
    padding: 36px 60px;
    border-top: 1px solid #f5f5f5;
  }
}
</style>

