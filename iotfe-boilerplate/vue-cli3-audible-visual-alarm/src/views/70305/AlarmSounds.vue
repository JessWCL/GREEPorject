<template>
  <gree-view>
    <gree-header>{{ devname }}</gree-header>
    <gree-page class="page-setting">
      <gree-list>
        <gree-list-item :title="$language('alertSettings.notification1')">
          <gree-switch
            slot="after"
            v-model="isActive1"
            @change="handler('switch', isActive1, $event)"
          ></gree-switch>
        </gree-list-item>
        <gree-list-item :title="$language('alertSettings.notification2')">
          <gree-switch
            slot="after"
            v-model="isActive2"
            @change="handler('switch', isActive2, $event)"
          ></gree-switch>
        </gree-list-item>
      </gree-list>
      <!-- <div class="list">
        <ul>
          <li>
            <div class="item-content">
              <div class="item-inner">

              </div>
            </div>
          </li>
        </ul>
      </div> -->
    </gree-page>
  </gree-view>
</template>

<script>
import { View, Page, Header, List, Item, Switch } from 'gree-ui';
import { mapState } from 'vuex';

export default {
  components: {
    [View.name]: View,
    [Page.name]: Page,
    [Header.name]: Header,
    [List.name]: List,
    [Item.name]: Item,
    [Switch.name]: Switch
  },
  data() {
    return {
      isActive1: true,
      isActive2: true
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      devname: state => state.deviceInfo.name,
    }),
  },
  methods: {
    handler(name, active) {
      console.log(name);
      console.log(active);
    }
  }
};
</script>
