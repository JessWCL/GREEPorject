/*
 * @Descripttion: 洗衣机故障及提示判断
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2020-02-25 17:12:53
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-06-04 09:09:54
 */
import { mapState } from 'vuex';
import { HandleErrorCode } from '../../utils/index';
import errorList from '../../api/error';

const error = {
  mixins: [errorList],
  data() {
    return {
      errMsg: '', // 故障文字
      warnMsg: '', // 提醒文字
    };
  },
  computed: {
    ...mapState({
      error1: state => state.dataObject.error1,
      error2: state => state.dataObject.error2,
      error3: state => state.dataObject.error3,
      error4: state => state.dataObject.error4,
      prompt1: state => state.dataObject.prompt1,
      prompt2: state => state.dataObject.prompt2,
      JFerr: state => state.dataObject.JFerr,
      Pow: state => state.dataObject.Pow,
    }),
    /**
     * @description 检测是否有故障
     */
    errStatus() {
      let errState;
      if ((this.error1 || this.error2 || this.error3 || this.error4 || this.JFerr) && this.Pow) {
        errState = true;
        this.getErrMsg();
      } else {
        errState = false;
      }
      return errState;
    },
    /**
     * @description 检测是否有提醒
     */
    warningStatus() {
      let status;
      if ((this.prompt1 || this.prompt2) && this.Pow) {
        status = true;
        this.getPrompt();
      } else {
        status = false;
      }
      return status;
    },
  },
  
  methods: {
    /**
     * @function getErrMsg
     * @description 获取需要显示的errMsg
     */
    getErrMsg() {
      let msg = [];
      for (let index = 1; index < 5; index++) {
        msg = HandleErrorCode(this[`error${index}`]);
        // console.log(msg);
        if (msg.length > 0) {
          this.errMsg = `故障:  ${this[`errorList${index}`][msg[0]].code}, ${
            this[`errorList${index}`][msg[0]].title
          }。 `;
          // console.log(this[`errorList${index}`][msg[0]]);
          break;
        } else if (this.JFerr) {
          this.errMsg = `故障：${this.wifiErrorList[0].title}。 `;
        }
      }
    },
    /**
     * @function getPrompt
     * @description 获取需要显示的warnMsg
     */
    getPrompt() {
      const msg = HandleErrorCode(this.prompt1 || this.prompt2);
      this.warnMsg = this.prompt1 ? this.prompt1List[msg[0]].title : this.prompt2List[msg[0]].title;
    },
  }
}
;

export default error;
