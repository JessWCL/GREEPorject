<template>
  <gree-view>
    <gree-header>童锁</gree-header>
    <gree-page class="page-child-lock">
      <gree-list>
        <gree-list-item title="童锁">
          <gree-switch
            slot="after"
            v-model="isActive"
            @change="handler('switch', isActive, $event)"
          ></gree-switch>
        </gree-list-item>
      </gree-list>
    </gree-page>
  </gree-view>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { Header, List, Item, Switch } from 'gree-ui';
import * as types from '@/store/types';

export default {
  components: {
    [Header.name]: Header,
    [List.name]: List,
    [Item.name]: Item,
    [Switch.name]: Switch
  },
  data() {
    return {
      isActive: true
    };
  },
  computed: {
    ...mapState({
      ChildLock: state => state.dataObject.ChildLock
    })
  },
  watch: {
    ChildLock: {
      handler(val) {
        this.isActive = Boolean(val);
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions({
      sendCtrl: types.SEND_CTRL
    }),
    ...mapMutations({
      setChildLock: types.SET_CHILD_LOCK
    }),
    handler(name, active) {
      this.setChildLock(Number(active));
      this.sendCtrl({ ChildLock: Number(active) });
    }
  }
};
</script>
