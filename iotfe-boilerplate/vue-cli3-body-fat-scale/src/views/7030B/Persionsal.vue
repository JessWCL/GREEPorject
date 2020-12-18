<template>
  <gree-view>
    <gree-page
      no-navbar
      class="page-persional"
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
      <div class="page-body">
        <div class="page-message">
          <img :src="persionimg">
          <ul>
            <li> Hello,{{ nick_name }}</li>
            <li> Please complete your persional information</li>
            <li> before weigh yourself</li>
          </ul>   
          <gree-block>
            <gree-row>
              <gree-button 
                type="positive" 
                @click="editPersionBtn">Complete Persional information</gree-button>
            </gree-row>
          </gree-block>       
        </div>
      </div>
    </gree-page>
  </gree-view>
</template>
<script>
import {
  Header,
  Icon,
  Dropdown,
  DropdownItem,
  Block,
  Button,
  Row
} from 'gree-ui';
import { mapState } from 'vuex';
import {
  closePage,
  editDevice
} from '../../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [Header.name]: Header,
    [Icon.name]: Icon,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [Block.name]: Block,
    [Button.name]: Button,
    [Row.name]: Row
  },
  data() {
    return {
      persionimg: require('../../assets/images/headportrait.png')
    };
  },

  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      mac: state => state.mac,
      nick_name: state => state.dataObject.nick_name
    })
  },
  mounted() {
    // this.getUserList();
  },
  methods: {
    // ...mapActions({
    //   getUserList: 'GET_USER_LIST'
    // }),
    /**
     * @description 返回键
     */
    goBack() {
      closePage();
    },
    editPersionBtn() {
      this.$router.push({ name: 'EditPersionsal' });
    },
    moreInfo() {
      editDevice(this.mac);
    }
  }
};
</script>
