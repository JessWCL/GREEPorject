<template>
  <gree-view>
    <gree-header>{{ $language('setting.title') }}</gree-header>
    <gree-page class="page-setting">
      <gree-list>
        <gree-list-item :title="$language('setting.notification1')">
          <gree-switch
            slot="after"
            v-model="isActive1"
            @change="handler('switch', isActive1, $event)"
          ></gree-switch>
        </gree-list-item>
        <gree-list-item :title="$language('setting.notification2')">
          <gree-switch
            slot="after"
            v-model="isActive2"
            @change="handler('switch', isActive2, $event)"
          ></gree-switch>
        </gree-list-item>
      </gree-list>
    </gree-page>
  </gree-view>
</template>

<script>
import { View, Page, Header, List, Item, Switch } from 'gree-ui';

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
  methods: {
    handler(name, active) {
      //
    }
  }
};
</script>
