<template>
  <div id="ERROR">
    <ErrorAndWaring
      :type="tabs_type"
      :error-list="errorMultiText"
    />
    <div v-if="Er"></div>
  </div>
</template>

<script>
import {
  View,
  Page,
  Header,
  Row,
  Col,
  Icon,
  ToolBar,
  Toast,
  ErrorPage,
  Block,
  Tabs,
  TabPane,
  List,
  Item,
} from 'gree-ui';
import { mapState } from 'vuex';
import errorList from '../api/error';
import {
  toWebPage,
  // callNumber
} from '../../../static/lib/PluginInterface.promise';
import ErrorAndWaring from '../components/ErrorAndWaring';
import ReminderList from '../components/ReminderList';

export default {
  components: {
    [View.name]: View,
    [Page.name]: Page,
    [Header.name]: Header,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [ToolBar.name]: ToolBar,
    [Toast.name]: Toast,
    [Block.name]: Block,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    [List.name]: List,
    [Item.name]: Item,
    [ErrorPage.name]: ErrorPage,
    ReminderList,
    ErrorAndWaring,
  },
  mixins: [errorList],
  data() {
    return {
      statusBarColor: '#ffffff',
      EmptyImg: require('@/assets/img/bg/bg_no_error.png'),
      BgUrl: require('../assets/img/bg/bg_error.png'),
      reminder_BgUrl: require('../assets/img/bg/bg_reminder.png'),
      imgUrl: require('../assets/img/ic_reminder.webp'),
      errorMultiText: [], // 故障列表
      reminderText: [
        // {
        //   title: '显示板故障蝴蝶很高i福大很高iu发的说过iu发的事故',
        //   text:
        //     '请联系售后回复ID是覅US和豆腐ID很糟糕iuhi函数会儿文化覅会对发生的哈u覅厚度赛回复ID暗示啊佛号打碎回复第A股回复第噶',
        //   name: '格力商城',
        //   href: 'https://www.gree.com/',
        //   btnText: '立即购买',
        // },
        // {
        //   title: '显示板故障蝴蝶很高i福大很高iu发的说过iu发的事故',
        //   text: '请联系售后回复ID是覅US和豆腐ID很糟糕iuhi函数回复第A股回复第噶',
        // },
      ],
      options: [
        {
          ImgName: 'service',
          Name: '售后电话',
        },
        {
          ImgName: 'subscribe',
          Name: '服务预约',
        },
        {
          ImgName: 'search',
          Name: '进度查询',
        },
      ],
      tabs_type: 'error',
    };
  },
  computed: {
    ...mapState({
      ErrorCode1: state => state.dataObject.ErrorCode1,
      ErrorCode2: state => state.dataObject.ErrorCode2,
      // ErrorCode3: state => state.dataObject.ErrorCode3,
      JFerr: state => state.dataObject.JFerr,

      /**
       * @description 检测是否有故障
       */
      Er() {
        let hasError = false;
        if (
          this.ErrorCode1 !== 0 ||
          this.ErrorCode2 !== 0 ||
          // this.ErrorCode3 !== 0 ||
          this.JFerr !== 0
        ) {
          this.updateError();
          hasError = true;
        }
        console.log(`Are you have error? ${hasError ? 'yes' : 'no'}`);
        return hasError;
      },
      NoErrorBg() {
        return require('@/assets/img/bg/bg_no_error.png');
      },
    }),
  },
  watch: {
    /**
     * @description 无故障时退出故障页面
     */
    Er: function watchError(newV) {
      if (!newV) {
        this.$router.push({ path: '/' });
      }
    },
  },
  created() {
    this.tabs_type = this.$route.params.id === 0 ? 'error' : 'warning';
    console.log(`tabs_type: ${this.tabs_type}`);
  },
  methods: {
    /**
     * @description: 返回按钮
     * @function goBack
     */
    goBack() {
      console.log('返回上级');
      this.$router.go(-1);
    },
    /**
     * @description 页面跳转
     */
    setFunction(index) {
      console.log(index);
      switch (index) {
        // case 0: callNumber(4008365315); break;
        case 0:
          toWebPage('https://grih.gree.com/zixun/#/customerChats', '售后电话');
          break;
        case 1:
          toWebPage(
            'http://pgxt.gree.com:7909/hjzx/bx/addbx.jsp?source=greejia',
            '服务预约'
          );
          break;
        case 2:
          toWebPage(
            'http://pgxt.gree.com:7909/hjzx/bx/chabx.jsp?source=greejia',
            '进度查询'
          );
          break;
        default:
          console.log('Error，出错了！');
          break;
      }
    },
    /**
     * @description 故障解析
     */
    updateError() {
      this.errorMultiText = [];
      const ErrorCode1 = this.ErrorCode1;
      const ErrorCode2 = this.ErrorCode2;
      // const ErrorCode3 = this.ErrorCode3;
      const JFerr = this.JFerr;
      const errorData1 = errorList.data().errorMultiText1;
      const errorData2 = errorList.data().errorMultiText2;
      // const errorData3 = errorList.data().errorMultiText3;
      const errorMultiTextJFerr = errorList.data().errorMultiTextJFerr;
      if (ErrorCode1 !== 0) {
        // Data1多个错误显示
        for (let i = 0; i < 8; i += 1) {
          if (ErrorCode1 & (0x01 << i)) {
            errorData1[i].title !== '' &&
              this.errorMultiText.push(errorData1[i]);
          }
        }
      }
      if (ErrorCode2 !== 0) {
        // Data2多个错误显示
        for (let i = 0; i < 8; i += 1) {
          if (ErrorCode2 & (0x01 << i)) {
            errorData2[i].title !== '' &&
              this.errorMultiText.push(errorData2[i]);
          }
        }
      }
      // if (ErrorCode3 !== 0) {
      //   // Data3多个错误显示
      //   for (let i = 0; i < 8; i += 1) {
      //     if (ErrorCode3 & (0x01 << i)) {
      //       errorData3[i].title !== '' &&
      //         this.errorMultiText.push(errorData3[i]);
      //     }
      //   }
      // }
      if (JFerr !== 0) {
        // wifi故障
        this.errorMultiText.push(errorMultiTextJFerr[0]);
      }
      console.log('故障页面', this.errorMultiText);
    },
  },
};
</script>

