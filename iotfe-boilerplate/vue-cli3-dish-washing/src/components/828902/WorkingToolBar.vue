<template>
  <gree-toolbar
    class="toolbar"
    position="bottom"
    no-hairline
  >
    <gree-row>
      <gree-col
        v-for="(item, index) in FootList"
        :key="index"
        @click.native="setFunction(item, index)"
        :class="{
          invisibale: index === 0 || index === 1,
          disabled: item.disabled === true
        }"
      >
        <div>
          <img :src="item.src" />
          <div>{{ item.name }}</div>
        </div>
      </gree-col>
    </gree-row>
  </gree-toolbar>
</template>

<script>
import { Row, Col, ToolBar } from 'gree-ui';
import { menuBtnList } from '@/api/index';
import { mapState } from 'vuex';

export default {
  name: 'WorkingToolBar',
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [ToolBar.name]: ToolBar
  },

  data() {
    return {};
  },

  computed: {
    ...mapState({
      Pow: state => state.DataObject.Pow
    }),
    isShowToolbar() {
      return true;
    },
    FootList() {
      const isTurnOff = this.Pow === 0;
      if (isTurnOff) {
        menuBtnList[1].disabled = true;
      } else {
        menuBtnList[1].disabled = false;
      }
      menuBtnList.forEach((element, index) => {
        const item = element;
        if (index === 0 && isTurnOff) {
          item.src = item.forbidedIconSrc;
        } else {
          item.src = item.normalIconSrc;
        }
      });
      return menuBtnList;
    }
  },

  methods: {
    setFunction(footerItem, index) {
      this.$emit('click', footerItem, index);
    }
  }
};
</script>
