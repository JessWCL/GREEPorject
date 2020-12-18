<template>
  <gree-popup-activity v-model="isPopupShow" @hide="$_close">
    <div class="dialog list-prize" v-if="!loaded">
      <gree-activity-indicator :size="20" :text-size="16" vertical>加载中...</gree-activity-indicator>
    </div>
    <template v-else>
      <div class="no-prize" v-if="prizeList.length === 0" />
      <div class="dialog list-prize" v-else>
        <gree-scroll-view ref="scrollView" :scrolling-x="false" auto-reflow>
          <gree-list contacts-list media-list no-hairlines no-hairlines-between>
            <gree-list-item media-item v-for="item in prizeList" :key="item.awardId">
              <template slot="title">{{ item.awardName }}</template>
              <template slot="after">
                <gree-button size="mini" @click="execCopy(item.awardCode)">复制</gree-button>
              </template>
              <template slot="subtitle">认筹码:{{ item.awardCode }}</template>
              <template slot="text">
                {{ $options.filters.timeformat(item.cTime) }}
                <span @click="goToMall">
                  前往查看
                  <i class="more-icon" />
                </span>
              </template>
              <gree-image slot="media" :src="item.awardImg" fit="contain" />
            </gree-list-item>
          </gree-list>
        </gree-scroll-view>
      </div>
      <input id="copyNode" ref="copyNode" type="hidden" :value="copyData" />
    </template>
  </gree-popup-activity>
</template>

<script>
import { PopupActivity, List, Item, Image, Button, ScrollView, Toast, ActivityIndicator } from 'gree-ui';
import ClipboardJS from 'clipboard';
import { isIOS } from '@/utils';
import { activityGetWinHistory, toMallUserPage } from '../../../static/lib/PluginInterface.promise';

export default {
  name: 'popup-prize-list',
  components: {
    [PopupActivity.name]: PopupActivity,
    [List.name]: List,
    [Item.name]: Item,
    [Image.name]: Image,
    [Button.name]: Button,
    [ScrollView.name]: ScrollView,
    [ActivityIndicator.name]: ActivityIndicator
  },
  props: {
    value: Boolean
  },
  data() {
    return {
      isPopupShow: this.value,
      loaded: false,
      prizeList: [],
      copyData: null
    };
  },
  watch: {
    value(val) {
      this.isPopupShow = val;
    }
  },
  mounted() {
    activityGetWinHistory()
      .then(res => {
        this.loaded = true;
        // console.log(`GetWinHistory: ${res}`);
        let resInfo;
        if (isIOS) {
          try {
            resInfo = res.match(/msg":"(\S*)/)[1];
            resInfo = resInfo.substr(0, resInfo.length - 2);
            resInfo = JSON.parse(resInfo);
          } catch (e) {
            Toast.failed('Parse Data Error');
          }
        } else {
          resInfo = eval('(' + JSON.parse(res)['msg'] + ')');
        }
        this.prizeList = resInfo.content;

        return res;
      })
      .catch(err => {
        Toast.failed(err);
        err;
      });
    const clipboard = new ClipboardJS('#copyNode', {
      text: () => {
        Toast.info('复制成功');
        return this.copyData;
      }
    });
    clipboard.on('error', () => {
      Toast.failed('复制失败');
    });
  },
  methods: {
    $_close() {
      this.isPopupShow = false;
      this.$emit('hide');
    },
    execCopy(data) {
      this.copyData = data;
      this.$refs.copyNode.click();
    },
    goToMall() {
      toMallUserPage();
    }
  }
};
</script>
