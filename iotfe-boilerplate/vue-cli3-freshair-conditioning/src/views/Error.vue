<template>
  <gree-view bg-color="#F4F4F4">
    <gree-header>故障详情</gree-header>
    <gree-page>
      <gree-error-page
        type="malfunction"
        :bg-url="BgUrl2"
        :text="errorMultiText"
      ></gree-error-page>
    </gree-page>
    <gree-toolbar position="bottom">
        <gree-row>
          <gree-col
            v-for="(item, index) in options"
            :key="index"
            @click.native="setFunction(index)"
          >
            <div class="icon">
              <img :src="require('../assets/img/' + item.ImgName + '.png')" />
            </div>
            <h3>{{ item.Name }}</h3>
          </gree-col>
        </gree-row>
     </gree-toolbar>
  </gree-view>
</template>

<script>
import { mapState } from 'vuex';
import { Header, ErrorPage, ToolBar, Row, Col } from 'gree-ui';
import errorConfig from '../mixins/config/error.js';
import getRealIndex from '../utils/getIndex';
import {
  toWebPage,
  callNumber
} from '../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [Header.name]: Header,
    [ErrorPage.name]: ErrorPage,
    [ToolBar.name]: ToolBar,
    [Row.name]: Row,
    [Col.name]: Col
  },
  mixins: [errorConfig],
  data() {
    return {
      BgUrl2: require('../assets/img/bg_error.png'),
      errShowList: [], // 页面显示的故障列表
      errorMultiText: [],
      options: [
        {
          ImgName: 'service',
          Name: '售后电话'
        },
        {
          ImgName: 'subscribe',
          Name: '服务预约'
        },
        {
          ImgName: 'search',
          Name: '进度查询'
        }
      ]
    };
  },
  computed: {
    ...mapState({
      ErrType: state => state.dataObject.ErrType
    })
  },
  watch: {
    ErrType() {
      this.updateError();
    }
  },
  mounted() {
    this.updateError();
  },
  methods: {
    /**
     * @function updateError
     * @description 遍历故障列表，更新页面故障信息
     */
    updateError() {
      let referenceNum = 4096;
      const errCacheList = [];
      this.errorMultiText = [];
      for (let i = 13; i > 0; referenceNum >>>= 1, i -= 1) {
        if (this.ErrType & referenceNum) {
          errCacheList.push(
            this.errorListMixins[
              getRealIndex(this.errorListMixins, 'itemId', referenceNum)
            ]
          );
        }
      }
      this.errorMultiText = errCacheList;
    },
    /**
     * @description 页面跳转
     */
    setFunction(index) {
      switch (index) {
        case 0:
          this.$i18n.locale === 'en'
            ? callNumber('020800889200')
            : callNumber(4008365315);
          break;
        case 1:
          toWebPage(
            'http://pgxt.gree.com:7909/hjzx/bx/addbx.jsp?source=greejia',
            `${this.$language('error.notify_fault_appointment')}`
          );
          break;
        case 2:
          toWebPage(
            'http://pgxt.gree.com:7909/hjzx/bx/chabx.jsp?source=greejia',
            `${this.$language('error.notify_fault_query')}`
          );
          break;
        default:
          // eslint-disable-next-line no-console
          console.log('Error，出错了！');
          break;
      }
    }
  }
};
</script>
