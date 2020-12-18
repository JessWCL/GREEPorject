<template>
  <gree-view>
    <gree-page
      no-navbar
      class="page-datail-extend"
    >
      <div class="page-header">
        <gree-header 
          style="background-color: #FFFFFF;"
          :left-options="{preventGoBack: true}"
          @on-click-back="goBack"
        >
          {{ devname }}
          <gree-dropdown
            slot="right"
            position="is-bottom-left"
          >
            <gree-icon
              slot="trigger"
              name="more"
              size="lg"
            ></gree-icon>
            <gree-dropdown-item @click.native="moreInfo">Device Information</gree-dropdown-item>
            <gree-dropdown-item @click.native="jumpTo('Setting')">Alert Settings</gree-dropdown-item>
          </gree-dropdown>
        </gree-header>
      </div>
      <gree-block>
        <gree-tab-bar 
          v-model="current2" 
          :items="items2" 
          @change="onTabBarChange"></gree-tab-bar>
      </gree-block>
      <BMI v-if="current2 === 1"/>
      <Body-Fat v-if="current2 === 2"/>
      <Weigh v-if="current2 === 4"/>
      <Body-Water v-if="current2 === 3"/>
      <Body-Shape v-if="current2 === 5"/>
    </gree-page>
  </gree-view>
</template>
<script>
import { Header, Icon, Dropdown, DropdownItem, Block, TabBar } from 'gree-ui';
import { mapState } from 'vuex';
import Weigh from '../../components/DataDetailsExtend/Weigh';
import BMI from '../../components/DataDetailsExtend/BMI';
import BodyShape from '../../components/DataDetailsExtend/BodyShape';
import BodyFat from '../../components/DataDetailsExtend/BodyFat';
import BodyWater from '../../components/DataDetailsExtend/BodyWater';

export default {
  components: {
    [Header.name]: Header,
    [Icon.name]: Icon,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [Block.name]: Block,
    [TabBar.name]: TabBar,
    Weigh,
    BMI,
    BodyShape,
    BodyFat,
    BodyWater
  },
  data() {
    return {
      current2: 1,
      items2: [
        { name: 1, label: 'BMI' },
        { name: 2, label: 'Body Fat' },
        { name: 3, label: 'Body Water' },
        { name: 4, label: 'Weight' },
        { name: 5, label: 'Body Shape' }
      ]
    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name
    })
  },
  mounted() {
    this.current2 = Number(this.$route.params.id) + 1;
  },
  methods: {
    /**
     * @description 返回键
     */
    goBack() {
      // closePage();
      this.$router.go(-1);
    },
    editPersionBtn() {
      this.$router.push({ name: 'EditPersionsal' });
    },
    onTabBarChange(item, index, prevIndex) {
      this.current2 = item.name;
      console.log(this.current2);
      console.log(
        `currentIndex: ${index}, prevIndex: ${prevIndex}, label: ${item.label}`
      );
    }
  }
};
</script>
