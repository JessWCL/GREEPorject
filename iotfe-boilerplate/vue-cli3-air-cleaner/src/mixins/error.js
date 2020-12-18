/*
 * @Descripttion: 洗衣机故障及提示判断
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2020-02-25 17:12:53
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-03-30 19:03:54
 */
import { mapState, mapMutations } from 'vuex';
import { HandleErrorCode } from '../utils/index';
import errorList from '../api/errorList';

const error = {
  mixins: [errorList],
  data() {
    return {
      errMsg: '', // 故障文字
      errorMultiText: [],
    };
  },
  computed: {
    ...mapState({
      estate: state => state.dataObject.estate,
      estate2: state => state.dataObject.estate2,
      JFerr: state => state.dataObject.JFerr,
    }),
    /**
     * @description 检测是否有故障
     */
    errStatus() {
      let errState = false;
      const estateList = '04';
      const estate2List = '12345';
      const list = HandleErrorCode(this.estate);
      const list2 = HandleErrorCode(this.estate2);
      let estate = false;
      list.forEach(item => {
        if (estateList.indexOf(item) > -1) {
          estate = true;
        }
      });

      let estate2 = false;
      list2.forEach(item => {
        if (estate2List.indexOf(item) > -1) {
          estate2 = true;
        }
      });  

      if (estate || estate2 || this.JFerr) {
        this.showDrawer = false;
        errState = true;
        this.setIsError(true);
        this.getErrMsg();
      } else {
        this.setIsError(false);
      }
      return errState;
    },
  },
  
  methods: {
    ...mapMutations({
      setIsError: 'IS_ERROR'
    }),
    /**
     * @function getErrMsg
     * @description 获取需要显示的errMsg
     */
    getErrMsg() {
      let msg = [];
      msg = HandleErrorCode(this.estate);
      //  如果当前路由为当前页
      if (this.$route.name === 'Error') {
        this.updateError();
      } else if (this.JFerr) {
        this.errMsg = `故障：${this.wifiErrorList[0].title}。 `;
      } else if (msg.length > 0) {
        this.errMsg = `故障： ${this.errorList[msg[0]].code}， ${
          this.errorList[msg[0]].title
        }。 `;
      } else {
        msg = HandleErrorCode(this.estate2);
        this.errMsg = `故障： ${this.error2List[msg[0]].code}，  ${
          this.error2List[msg[0]].title
        }。 `;
      } 
    },
    /**
     * @description 故障解析
     */
    updateError() {
      this.errorMultiText = [];
      let errorIndexList = [];
      errorIndexList = HandleErrorCode(this.estate);
      for (let index = 0; index < errorIndexList.length; index++) {
        this.errorMultiText.push(this.errorList[errorIndexList[index]]);
      }
      errorIndexList = HandleErrorCode(this.estate2);
      for (let index = 0; index < errorIndexList.length; index++) {
        this.errorMultiText.push(this.error2List[errorIndexList[index]]);
      }
      errorIndexList = HandleErrorCode(this.JFerr);
      for (let index = 0; index < errorIndexList.length; index++) {
        this.errorMultiText.push(this.wifiErrorList[errorIndexList[index]]);
      }
      // console.log('故障页面', this.errorMultiText);
    }
  }
}
;

export default error;
