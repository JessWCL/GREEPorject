import { mapState } from 'vuex';
import state from '../../../store/state';

const error = {
  data() {
    return {
      errorList0: [
        { code: 'H1', title: 'WIFI通讯故障', text: '请联系售后' },
        //estate
        { code: 'H3', title: 'RFID通讯故障', text: '请联系售后' },
        { code: 'H8', title: '触摸芯片通信异常', text: '换显示板，请联系客服并送维修点维修' },
        { code: 'E5', title: '粉尘传感器故障', text: '请联系售后' },
        { code: 'L3', title: '电机堵转保护', text: '请联系售后' },
        { code: '!', title: '开门保护', text: '请检查装饰板是否安装到位，仍不能解决，请联系售后' },
        { code: 'F3', title: '甲醛传感器异常', text: '若长时间异常请联系售后' },
        { code: 'F4', title: '甲醛传感器高浓度酒精环境', text: '请将净化器移至低浓度酒精环境中使用' },
        { code: 'F5', title: '甲醛传感器高浓度甲醛环境，传感器接近爆表', text: '等待净化浓度变低即可自动恢复正常' },
        { code: 'H4', title: '甲醛传感器通讯故障', text: '请联系指定服务商或客户服务中心' },
        { code: 'F1', title: '高压模块升压异常保护', text: '更换主板或倍压模块,请联系客服并送维修点维修' },
        { code: 'E3', title: '温湿度传感器通信故障', text: '更换温湿度传感器；更换主板，请联系客服并送维修点维修' },
        { code: 'E4', title: '场效应管感温包开短路异常', text: '更换主板，请联系客服并送维修点维修' },
        { code: 'E6', title: '出风口粉尘传感器通讯故障', text: '出风口粉尘传感器通讯故障，请联系客服并送维修点维修' },
        {
          code: 'H0',
          title: '主板与显示板通信异常',
          text: '检查主板与显示板的连接是否正常,更换主板,更换显示板，请联系客服并送维修点维修'
        },
        {
          code: 'f',
          title: '非法滤网提醒',
          text: '未检测到有效滤网，请及时安装',
          name: '格力商城',
          href: 'https://www.gree.com/'
        },
        { code: 'E5', title: '进风口粉尘传感器通讯故障', text: '进风口粉尘传感器通讯故障，请联系客服并送维修点维修' },
      ],
      warningList0: [
        { title: '滤芯寿命将尽',
          text: '请及时更换正版滤网',
          name: '格力商城',
          href: 'https://www.gree.com/'
        },
        {
          code: '!',
          title: '滤网寿命已到',
          text: '请及时更换正版滤网',
          name: '格力商城',
          href: 'https://www.gree.com/'
        },
      //滤网寿命已到，整机不处理wifi发来的数据，寿命已到直接跳转至故障页
      ],
    };
  },
  computed: {
    ...mapState({
      MidType: state => state.dataObject.MidType,
      estate: state => state.dataObject.estate,
      estate1: state => state.dataObject.estate1,
      JFerr: state => state.dataObject.JFerr,
      MeshWarning1: state =>state.dataObject.MeshWarning1
    }),
    errorList() {
      let Err = [];
      let Not = [];
      let isErr=false,isNot=false;
      let type='error';
      if(this.MidType&1024){
        let ErrArray = this.ErrorCheck();
        if(ErrArray!==null) {
          for (let j = 0; j <= ErrArray.length - 1; j++) {
            if (ErrArray[j] === 'L3') {
              Err.push(this.errorList0[4]);
            } else if (ErrArray[j] === 'H1') {
              Err.push(this.errorList0[0]);
            } else if (ErrArray[j] === 'E5') {
              Err.push(this.errorList0[3]);
            } else if (ErrArray[j] === 'H8') {
              Err.push(this.errorList0[2]);
            } else if (ErrArray[j] === '!') {
              Err.push(this.errorList0[5]);
            } else if (ErrArray[j] === 'H3') {
              Err.push(this.errorList0[1]);
            } else if (ErrArray[j] === 'H4') {
              Not.push(this.errorList0[9]);
            } else if (ErrArray[j] === 'H0') {
              Err.push(this.errorList0[14]);
            } else if (ErrArray[j] === 'F5') {
              Not.push(this.errorList0[8]);
            } else if (ErrArray[j] === 'F4') {
              Not.push(this.errorList0[7]);
            } else if (ErrArray[j] === 'F3') {
              Not.push(this.errorList0[6]);
            } else if (ErrArray[j] === 'f') {
              Not.push(this.errorList0[15]);
            }
          }
        }
          if(this.MidType===16128&&this.estate===256)
          Not.push(this.errorList0[15]);
      }
      else{
        switch (this.estate) {
          case 225:
            Err.push(this.errorList0[10]);
            break;
          case 226:
            Err.push(this.errorList0[4]);
            break;
          case 227:
            Err.push(this.errorList0[11]);
            break;
          case 228:
            Err.push(this.errorList0[12]);
            break;
          case 229:
            Err.push(this.errorList0[16]);
            break;
          case 230:
            Err.push(this.errorList0[13]);
            break;
          case 231:
            Err.push(this.errorList0[14]);
            break;
          case 232:
            Err.push(this.errorList0[2]);
            break;
        }
      }
      if(this.MeshWarning1===1)
      Not.push(this.warningList0[0]);
      else if(this.MeshWarning1===2)
      Not.push(this.warningList0[1]);
      if(Not.length!==0) {type='warning';isNot=true;}
      if(Err.length!==0) {type='error';isErr=true;}
      if(Not.length===0&&Err.length==0) {type='warning'}
      return {Err,Not,isErr,isNot,type};
    }
  },
  methods: {
    ErrorCheck() {
      const ErrorImageName = ['L3', 'E5', 'H8', 'H3', '!', ''];
      const ErrorImageName2 = ['f', 'F3', 'F4', 'F5', 'H4'];//f表示非格力滤芯
      let TotalError = 0; //错误总数
      let TotalError2 = 0; //错误总数
      let ErrorImage = new Array(ErrorImageName.length); //故障错误缓存（运算用）
      let ErrorImage2 = new Array(ErrorImageName2.length);
      for (let i = 0; i < 5; i += 1) {
        if (this.estate & (0x01 << i)) {
          ErrorImage[TotalError] = ErrorImageName[i]; //故障图片
          TotalError += 1; //故障总数
        }
      }
      for (let i = 0; i < 5; i += 1) {
        if (this.estate1 & (0x01 << i)) {
          ErrorImage2[TotalError2] = ErrorImageName2[i]; //故障图片
          TotalError2 += 1; //故障总数
        }
      }
      if (this.JFerr !== 0) TotalError = TotalError + TotalError2 + 1;
      else TotalError = TotalError + TotalError2;
      if (TotalError === 0) {
        return null;
      } else {
        if (TotalError > 1) {
          TotalError += 1; //多个故障时将index_warning 放在数组最后
        }
        let Ima = ErrorImage + ErrorImage2;
        if (this.JFerr !== 0) {
          Ima = ErrorImage + ErrorImage2 + ['H1']; //暂用h1代表wifi通讯故障
        }
        let ImageName = Ima.split(',').filter(item => item !== '' && item !== 'null');
        if (TotalError > 1) {
          ImageName[TotalError - 1] = ErrorImageName[ErrorImageName.length - 1]; //index_warning
        }
        return ImageName; //最终使用的错误数组
      }
    }
  }
}
;

export default error;
