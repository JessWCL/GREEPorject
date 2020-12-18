<template>
  <gree-view class="view-review">
    <gree-page>
      <dir class="banner-wrapper">
        <gree-image
          :src="CloudMenuDetailSteps.dataMsg.Pic"
          class="banner"
          width="100%">
          <template v-slot:loading>
            <gree-activity-indicator
              type="spinner"
              :size="30" />
          </template>
          <template v-slot:error>加载失败</template>
        </gree-image>
      </dir>
      <gree-block
        v-html="CloudMenuDetailSteps.dataMsg.Dis"
        class="dis"></gree-block>
      <gree-block class="basket-button-wrapper">
        <gree-divider class="title">主料</gree-divider>
      </gree-block>
      <div class="foods-wrapper">
        <gree-row
          v-for="(mItem, mIndex) in CloudMenuDetailSteps.dataMsg.MainFoods"
          :key="'card_main' + mIndex">
          <gree-col>{{ mItem.ingredName }}<span>{{ mItem.num | toCookerStr }}{{ mItem.unit }}</span></gree-col>
        </gree-row>
        <gree-row
          v-if="!CloudMenuDetailSteps.dataMsg.MainFoods.length > 0"
          class="loading">
          <gree-col key="loading_card_main0">&nbsp;</gree-col>
        </gree-row>
      </div>
      <gree-divider class="title">辅料</gree-divider>
      <div class="foods-wrapper">
        <gree-row
          class="loading"
          v-for="(item, index) in 5"
          v-show="!CloudMenuDetailSteps.dataMsg.AuxiliaryFoods.length > 0"
          :key="'loading_card_auxi' + index">
          <gree-col>&nbsp;</gree-col>
        </gree-row>
        <gree-row
          v-for="(aItem, aIndex) in CloudMenuDetailSteps.dataMsg.AuxiliaryFoods"
          :key="'card_auxi' + aIndex">
          <gree-col>{{ aItem.ingredName }}<span>{{ aItem.num | toCookerStr }}{{ aItem.unit }}</span></gree-col>
        </gree-row>
      </div>
      <gree-divider class="title">制作步骤</gree-divider>
      <div
        class="steps"
        v-for="(item, index) in CloudMenuDetailSteps.data"
        :key="'steps_' + index"
      >
        <gree-block class="title">
          {{ item.Step }} / {{ CloudMenuDetailSteps.data.length }}
        </gree-block>
        <gree-image
          v-show="item.Spic !== ''"
          :src="item.Spic"
          width="100%">
          <template v-slot:loading>
            <gree-activity-indicator
              type="spinner"
              :size="30" />
          </template>
          <template v-slot:error>加载失败</template>
        </gree-image>
        <gree-block class="sdis">
          {{ item.Sdis }}
        </gree-block>
      </div>
      <gree-block
        v-show="isShowTips"
        class="title title__tips">小贴士</gree-block>
      <gree-block
        v-html="CloudMenuDetailSteps.dataMsg.Tips"
        class="tips"></gree-block>
        <!-- <gree-divider>我是有底线的</gree-divider> -->
    </gree-page>
  </gree-view>
</template>

<script>
import {
  View,
  Page,
  Row,
  Col,
  Image,
  Block,
  ActivityIndicator,
  Divider,
  Toast
} from 'gree-ui';
import { sortByProps } from '@/utils';
import { isJSONStr, getQueryStringByName } from '../../utils/index';
import filtersMixin from '../../mixins/utils/filtersMixin';
import { __DEV__ } from '../../api/constant';

export default {

  components: {
    [View.name]: View,
    [Page.name]: Page,
    [Row.name]: Row,
    [Col.name]: Col,
    [Image.name]: Image,
    [Block.name]: Block,
    [ActivityIndicator.name]: ActivityIndicator,
    [Divider.name]: Divider,
    [Toast.name]: Toast,
  },

  mixins: [filtersMixin],

  data() {
    return {
      // count: 0,
      // data: [],
      // dataMsg: {},
      // message: '',
      // r: 200
      localCloudMenuDetailSteps: {}
    };
  },

  computed: {
    CloudMenuDetailSteps() {
      const CloudMenuDetailSteps = this.localCloudMenuDetailSteps;
      const cloneData = JSON.parse(JSON.stringify(CloudMenuDetailSteps));
      try {
        cloneData.data = sortByProps(cloneData.data, ['Step:asc']);
        if (cloneData.dataMsg.Dis) {
          cloneData.dataMsg.Dis = cloneData.dataMsg.Dis.replace(/\n/g, '<br/>');
        }
        if (cloneData.dataMsg.Tips) {
          cloneData.dataMsg.Tips = cloneData.dataMsg.Tips.replace(/\n/g, '<br/>');
        }
        cloneData.dataMsg.MainFoods = [];
        cloneData.dataMsg.AuxiliaryFoods = [];
        if (cloneData.dataMsg.Foods) {
          let Foods = {};
          if (isJSONStr(cloneData.dataMsg.Foods)) {
            console.log('DetailSteps computed parse');
            Foods = JSON.parse(cloneData.dataMsg.Foods);
          } else {
            console.log('DetailSteps computed no parse');
            Foods = cloneData.dataMsg.Foods;
          }
          const MainFoods = Foods.main || [];
          const AuxiliaryFoods = Foods.auxiliary || [];
          for (let index = 0; index < MainFoods.length; index += 1) {
            const item = MainFoods[index];
            item.num = parseFloat(item.num) || item.num;
          }
          for (let index = 0; index < AuxiliaryFoods.length; index += 1) {
            const item = AuxiliaryFoods[index];
            item.num = parseFloat(item.num) || item.num;
          }
          cloneData.dataMsg.MainFoods = MainFoods;
          cloneData.dataMsg.AuxiliaryFoods = AuxiliaryFoods;
        }
      } catch (e) {
        console.error(e);
      }
      return cloneData;
    },

    isShowTips() {
      const {
        CloudMenuDetailSteps: {
          dataMsg: {
            Tips
          }
        }
      } = this;
      if (Tips && Tips.length > 0) {
        return true;
      }
      return false;
    }

  },

  created() {
    try {
      const cid = getQueryStringByName('cid');
      const path = `/newfoodsapi/menu/GetCloudMenuDetailSteps?cid=${cid}`;
      if (__DEV__) {
        const url = path;
        this.fetchData(url);
      } else if (window.location.href.indexOf('file:///') === 0) {
        const url = `http://grih.gree.com${path}`;
        this.fetchData(url);
      } else {
        const url = `${window.location.origin}${path}`;
        this.fetchData(url);
      }
    } catch (e) {
      console.error(e);
    }
  },

  methods: {
    async fetchData(url) {
      const res = await fetch(url).then(response => response.json());
      console.log(res);
      const { r, msg } = res;
      if (r === 200) {
        this.localCloudMenuDetailSteps = res;
      } else {
        Toast.info(msg);
      }
    },
  },
};
</script>
