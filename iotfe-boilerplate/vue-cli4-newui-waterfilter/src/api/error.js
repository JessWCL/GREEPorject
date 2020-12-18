const errorList = {
  data() {
    return {
      errorMultiText1: [
        {
          code: 'EC',
          headtitle: '故障名称：',
          title: '记忆故障',
          subtitle: '解除办法：',
          text: '请联系售后'
        },
        {
          code: 'EE',
          headtitle: '故障名称：',
          title: '长时间制水提醒',
          subtitle: '解除办法：',
          text: '按复位1键退出，如若再次出现请通知售后'
        },
        {
          code: 'C5',
          headtitle: '故障名称：',
          title: '跳线帽故障',
          subtitle: '解除办法：',
          text: '请联系售后'
        },
      ],
      errorMultiText2: [
      ],
      errorMultiTextJFerr: [
        {
          code: 'H1',
          headtitle: '故障名称：',
          title: '整机与WiFi通讯异常',
          subtitle: '解除办法：',
          text: '联系售后'
        }
      ],
    };
  }
};

export default errorList;
