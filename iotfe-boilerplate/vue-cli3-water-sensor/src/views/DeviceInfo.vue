<template>
  <gree-view>
    <gree-header>
      {{ $language('editinfo.title') }}
      <a
        slot="right"
        @click="clickSave"
      >{{ $language('editinfo.navRight') }}</a>
    </gree-header>
    <gree-page class="page-device-info">
      <gree-block>
        <gree-block-title>MID:1001-V3.1</gree-block-title>
        <gree-block-title>Device Name:AF-ID-2R-5682.14</gree-block-title>
        <gree-block-title>In The Area:Beimeizhou</gree-block-title>
      </gree-block>
      <gree-list>
        <gree-list-item
          title="Name"
          text="Audible and Visual Alarm"
        ></gree-list-item>
        <gree-list-item
          title="The Firmware Update"
          text="V1.0"
        ></gree-list-item>
      </gree-list>
      <gree-list class="last">
        <gree-list-item>
          <span slot="title">Delete</span>
        </gree-list-item>
      </gree-list>
    </gree-page>
  </gree-view>
</template>

<script>
import { View, Page, Header, Block, BlockTitle, List, Item } from 'gree-ui';

export default {
  components: {
    [View.name]: View,
    [Page.name]: Page,
    [Header.name]: Header,
    [Block.name]: Block,
    [BlockTitle.name]: BlockTitle,
    [List.name]: List,
    [Item.name]: Item
  },
  methods: {
    clickSave() {
      console.log(123);
    }
  }
};
</script>
