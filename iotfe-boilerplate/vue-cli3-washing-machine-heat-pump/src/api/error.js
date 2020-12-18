const errorList = {
  data() {
    return {
      errorList1: [{
        code: 'E10', //    1
        title: this.$language('error.notify_fault_name_E10'),
        text: this.$language('error.notify_fault_resolve_E10'),
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 1,
      },
      {
        code: 'E1', //   2
        title: this.$language('error.notify_fault_name_E1'),
        text: this.$language('error.notify_fault_resolve_E1'),
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 2
      },
      {
        code: 'E8', //    1
        title: this.$language('error.notify_fault_name_E8'),
        text: this.$language('error.notify_fault_resolve_E8'),
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 4
      },
      {
        code: 'E3', //    8
        title: this.$language('error.notify_fault_name_E3'),
        text: this.$language('error.notify_fault_resolve_E3'),
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 8
      },
      {
        code: 'E6', //    1
        title: this.$language('error.notify_fault_name_E6'),
        text: this.$language('error.notify_fault_resolve_E6'),
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 16
      },
      {
        code: 'E2', //    4
        title: this.$language('error.notify_fault_name_E2'),
        text: this.$language('error.notify_fault_resolve_E2'),
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 32
      },
      {
        code: 'E9', //    1
        title: this.$language('error.notify_fault_name_E9'),
        text: this.$language('error.notify_fault_resolve_E9'),
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 64
      },
      {
        code: 'EE', //  故障代码  1
        title: this.$language('error.notify_fault_name_EE'), // 故障名称
        text: this.$language('error.notify_fault_resolve_EE'), // 解决方案
        headtitle: this.$language('error.headtitle'), // '故障名称：'
        subtitle: this.$language('error.subtitle'), // '解除办法：'
        index: 128
      },
      {
        code: 'EH3', //    1
        title: this.$language('error.notify_fault_name_EH3'),
        text: this.$language('error.notify_fault_resolve_EH3'),
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 256
      },
      {
        code: 'F3', //    1
        title: this.$language('error.notify_fault_name_F3'),
        text: this.$language('error.notify_fault_resolve_F3'),
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 512
      },
      {
        code: 'F4', //    1
        title: this.$language('error.notify_fault_name_F4'),
        text: this.$language('error.notify_fault_resolve_F4'),
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 1024
      },
      {
        code: 'F2', //    1
        title: this.$language('error.notify_fault_name_F2'),
        text: this.$language('error.notify_fault_resolve_F2'),
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 2048
      },
      {
        code: 'F1', //    1
        title: this.$language('error.notify_fault_name_F1'),
        text: this.$language('error.notify_fault_resolve_F1'),
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 4096
      },
      {
        code: 'EH2', //    1
        title: this.$language('error.notify_fault_name_EH2'),
        text: this.$language('error.notify_fault_resolve_EH2'),
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 8192
      },
      {
        code: 'EH1', //    1
        title: this.$language('error.notify_fault_name_EH1'),
        text: this.$language('error.notify_fault_resolve_EH1'),
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 16384
      },
      {
        code: 'E7', //    1
        title: this.$language('error.notify_fault_name_E7'),
        text: this.$language('error.notify_fault_resolve_E7'),
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 32768
      },
      ],


      errorList2: [{
        code: 'E58', //    1
        title: this.$language('error.notify_fault_name_E58'),
        text: this.$language('error.notify_fault_resolve_E58'),
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 1,
      },
      {
        code: 'E57', //    1
        title: this.$language('error.notify_fault_name_E57'),
        text: this.$language('error.notify_fault_resolve_E57'),
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 2,
      },
      {
        code: 'E56', //    1
        title: this.$language('error.notify_fault_name_E56'),
        text: this.$language('error.notify_fault_resolve_E56'),
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 4
      },
      {
        code: 'E55', //    1
        title: this.$language('error.notify_fault_name_E55'),
        text: this.$language('error.notify_fault_resolve_E55'),
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 8
      },
      {
        code: 'E54', //    1
        title: this.$language('error.notify_fault_name_E54'),
        text: this.$language('error.notify_fault_resolve_E54'),
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 16
      },
      {
        code: 'E53', //    256
        title: this.$language('error.notify_fault_name_E53'),
        text: this.$language('error.notify_fault_resolve_E53'),
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 32
      },
      {
        code: 'E52', //    128
        title: this.$language('error.notify_fault_name_E52'),
        text: this.$language('error.notify_fault_resolve_E52'),
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 64
      },
      {
        code: 'E51', //    64
        title: this.$language('error.notify_fault_name_E51'),
        text: this.$language('error.notify_fault_resolve_E51'),
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 128
      },
      {
        code: 'E41', //    16
        title: this.$language('error.notify_fault_name_E41'),
        text: this.$language('error.notify_fault_resolve_E41'),
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 256
      },
      {
        code: 'E42', //    32
        title: this.$language('error.notify_fault_name_E42'),
        text: this.$language('error.notify_fault_resolve_E42'),
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 512
      },
      {
        code: 'EH5', //    1
        title: this.$language('error.notify_fault_name_EH5'),
        text: this.$language('error.notify_fault_resolve_EH5'),
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 1024
      },
      {
        code: 'EH4', //    1
        title: this.$language('error.notify_fault_name_EH4'),
        text: this.$language('error.notify_fault_resolve_EH4'),
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 2048
      },
      {
        code: 'EH8', //    1
        title: this.$language('error.notify_fault_name_EH8'),
        text: this.$language('error.notify_fault_resolve_EH8'),
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 4096
      },
      {
        code: 'EH6', //    1
        title: this.$language('error.notify_fault_name_EH6'),
        text: this.$language('error.notify_fault_resolve_EH6'),
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 8192
      },
      {
        code: 'EH9', //    1
        title: this.$language('error.notify_fault_name_EH9'),
        text: this.$language('error.notify_fault_resolve_EH9'),
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 16384
      },
      {
        code: 'HC', //    1
        title: this.$language('error.notify_fault_name_HC'),
        text: this.$language('error.notify_fault_resolve_HC'),
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 32768
      },
      ],

      errorList3: [
        {
          code: 'EH13', //    0
          title: this.$language('error.notify_fault_name_EH13'),
          text: this.$language('error.notify_fault_resolve_EH13'),
          headtitle: this.$language('error.headtitle'),
          subtitle: this.$language('error.subtitle'),
          index: 1
        },
        {
          code: 'EH12', //    1
          title: this.$language('error.notify_fault_name_EH12'),
          text: this.$language('error.notify_fault_resolve_EH12'),
          headtitle: this.$language('error.headtitle'),
          subtitle: this.$language('error.subtitle'),
          index: 2
        },
        {
          code: 'EH11', //    2
          title: this.$language('error.notify_fault_name_EH11'),
          text: this.$language('error.notify_fault_resolve_EH11'),
          headtitle: this.$language('error.headtitle'),
          subtitle: this.$language('error.subtitle'),
          index: 4
        },
        {
          code: 'EH10', //    3
          title: this.$language('error.notify_fault_name_EH10'),
          text: this.$language('error.notify_fault_resolve_EH10'),
          headtitle: this.$language('error.headtitle'),
          subtitle: this.$language('error.subtitle'),
          index: 8
        },
        {
          code: 'E14', //    4
          title: this.$language('error.notify_fault_name_E14'),
          text: this.$language('error.notify_fault_resolve_E14'),
          headtitle: this.$language('error.headtitle'),
          subtitle: this.$language('error.subtitle'),
          index: 8
        },
        {
          code: 'EH7', //    5
          title: this.$language('error.notify_fault_name_EH7'),
          text: this.$language('error.notify_fault_resolve_EH7'),
          headtitle: this.$language('error.headtitle'),
          subtitle: this.$language('error.subtitle'),
          index: 32
        },
        {
          code: 'E12', //    6
          title: this.$language('error.notify_fault_name_E12'),
          text: this.$language('error.notify_fault_resolve_E12'),
          headtitle: this.$language('error.headtitle'),
          subtitle: this.$language('error.subtitle'),
          index: 64
        },
        {
          code: 'E11', //    7
          title: this.$language('error.notify_fault_name_E11'),
          text: this.$language('error.notify_fault_resolve_E11'),
          headtitle: this.$language('error.headtitle'),
          subtitle: this.$language('error.subtitle'),
          index: 128
        },
        // 预留  8 
        {},
        {
          code: 'F0', //    9
          title: this.$language('error.notify_fault_name_F0'),
          text: this.$language('error.notify_fault_resolve_F0'),
          headtitle: this.$language('error.headtitle'),
          subtitle: this.$language('error.subtitle'),
          index: 512
        },
        {
          code: 'F6', //    10
          title: this.$language('error.notify_fault_name_F6'),
          text: this.$language('error.notify_fault_resolve_F6'),
          headtitle: this.$language('error.headtitle'),
          subtitle: this.$language('error.subtitle'),
          index: 1024
        },
        {
          code: 'F7', //    11
          title: this.$language('error.notify_fault_name_F7'),
          text: this.$language('error.notify_fault_resolve_F7'),
          headtitle: this.$language('error.headtitle'),
          subtitle: this.$language('error.subtitle'),
          index: 2048
        },
        {
          code: 'F52', //    12
          title: this.$language('error.notify_fault_name_F52'),
          text: this.$language('error.notify_fault_resolve_F52'),
          headtitle: this.$language('error.headtitle'),
          subtitle: this.$language('error.subtitle'),
          index: 4096
        },
        {
          code: 'F51', //    13
          title: this.$language('error.notify_fault_name_F51'),
          text: this.$language('error.notify_fault_resolve_F51'),
          headtitle: this.$language('error.headtitle'),
          subtitle: this.$language('error.subtitle'),
          index: 8192
        },
        {
          code: 'F54', //    14
          title: this.$language('error.notify_fault_name_F54'),
          text: this.$language('error.notify_fault_resolve_F54'),
          headtitle: this.$language('error.headtitle'),
          subtitle: this.$language('error.subtitle'),
          index: 16384
        },
        {
          code: 'F53', //    15
          title: this.$language('error.notify_fault_name_F53'),
          text: this.$language('error.notify_fault_resolve_F53'),
          headtitle: this.$language('error.headtitle'),
          subtitle: this.$language('error.subtitle'),
          index: 32768
        },
      ],

      errorList4: [
        // 预留 0-10
        {}, {}, {}, {}, 
        {}, {}, {}, {}, 
        {}, {}, {},
        {
          code: 'UL', //    11
          title: this.$language('error.notify_fault_name_UL'),
          text: this.$language('error.notify_fault_resolve_UL'),
          headtitle: this.$language('error.headtitle'),
          subtitle: this.$language('error.subtitle'),
          index: 2048 // 8192
        },        
        {
          code: 'LF', //    12
          title: this.$language('error.notify_fault_name_LF'),
          text: this.$language('error.notify_fault_resolve_LF'),
          headtitle: this.$language('error.headtitle'),
          subtitle: this.$language('error.subtitle'),
          index: 4096 // 8192
        },        
        {
          code: 'JF', //    13
          title: this.$language('error.notify_fault_name_JF'),
          text: this.$language('error.notify_fault_resolve_JF'),
          headtitle: this.$language('error.headtitle'),
          subtitle: this.$language('error.subtitle'),
          index: 8192 // 8192
        },
        {
          code: 'E13', //    14
          title: this.$language('error.notify_fault_name_E13'),
          text: this.$language('error.notify_fault_resolve_E13'),
          headtitle: this.$language('error.headtitle'),
          subtitle: this.$language('error.subtitle'),
          index: 16384 
        },
        {
          code: 'E15', //    15
          title: this.$language('error.notify_fault_name_E15'),
          text: this.$language('error.notify_fault_resolve_E15'),
          headtitle: this.$language('error.headtitle'),
          subtitle: this.$language('error.subtitle'),
          index: 32768
        },
      ],
      wifiErrorList: [{
        code: '!', // 0
        title: this.$language('error.notify_fault_name_wifi'),
        text: this.$language('error.notify_fault_resolve_wifi'),
        headtitle: this.$language('error.headtitle'),
        subtitle: this.$language('error.subtitle'),
        index: 1
      }],
      prompt1List: [
        {
          code: 'LC3', // 0
          title: this.$language('error.notify_fault_name_LC3'),
          text: this.$language('error.notify_fault_resolve_LC3'),
          headtitle: this.$language('error.headtitle'),
          subtitle: this.$language('error.subtitle'),
          index: 1
        },
        {
          code: 'LC2', // 1
          title: this.$language('error.notify_fault_name_LC2'),
          text: this.$language('error.notify_fault_resolve_LC2'),
          headtitle: this.$language('error.headtitle'),
          subtitle: this.$language('error.subtitle'),
          index: 2
        },
        {
          code: 'LC1', // 2
          title: this.$language('error.notify_fault_name_LC1'),
          text: this.$language('error.notify_fault_resolve_LC1'),
          headtitle: this.$language('error.headtitle'),
          subtitle: this.$language('error.subtitle'),
          index: 4
        },
        {
          code: 'LF', // 3
          title: this.$language('error.notify_fault_name_LF'),
          text: this.$language('error.notify_fault_resolve_LF'),
          headtitle: this.$language('error.headtitle'),
          subtitle: this.$language('error.subtitle'),
          index: 8
        },
        {
          code: 'LE', // 4
          title: this.$language('error.notify_fault_name_LE'),
          text: this.$language('error.notify_fault_resolve_LE'),
          headtitle: this.$language('error.headtitle'),
          subtitle: this.$language('error.subtitle'),
          index: 16
        },
        {
          code: 'Ld', // 5
          title: this.$language('error.notify_fault_name_Ld'),
          text: this.$language('error.notify_fault_resolve_Ld'),
          headtitle: this.$language('error.headtitle'),
          subtitle: this.$language('error.subtitle'),
          index: 32
        },
        {
          code: 'HLt', // 6
          title: this.$language('error.notify_fault_name_HLt'),
          text: this.$language('error.notify_fault_resolve_HLt'),
          headtitle: this.$language('error.headtitle'),
          subtitle: this.$language('error.subtitle'),
          index: 64
        },
        {
          code: 'HHt', // 7
          title: this.$language('error.notify_fault_name_HHt'),
          text: this.$language('error.notify_fault_resolve_HHt'),
          headtitle: this.$language('error.headtitle'),
          subtitle: this.$language('error.subtitle'),
          index: 128
        },
        {
          code: 'UL', // 8
          title: this.$language('error.notify_fault_name_UL'),
          text: this.$language('error.notify_fault_resolve_UL'),
          headtitle: this.$language('error.headtitle'),
          subtitle: this.$language('error.subtitle'),
          index: 256
        }, {
          code: 'Lt', // 9
          title: this.$language('error.notify_fault_name_Lt'),
          text: this.$language('error.notify_fault_resolve_Lt'),
          headtitle: this.$language('error.headtitle'),
          subtitle: this.$language('error.subtitle'),
          indexL: 512
        },
        {
          code: 'H', // 10
          title: this.$language('error.notify_fault_name_H'),
          text: this.$language('error.notify_fault_resolve_H'),
          headtitle: this.$language('error.headtitle'),
          subtitle: this.$language('error.subtitle'),
          index: 1024
        },
        {}, {}, // 预留 11 2048 // 预留 12 4096
        {
          code: '!', // 13
          title: this.$language('error.notify_fault_name_OFTEN'),
          text: this.$language('error.notify_fault_resolve_OFTEN'),
          headtitle: this.$language('error.headtitle'),
          subtitle: this.$language('error.subtitle'),
          index: 8192
        },
        {
          code: 'Ub', // 14
          title: this.$language('error.notify_fault_name_Ub'),
          text: this.$language('error.notify_fault_resolve_Ub'),
          headtitle: this.$language('error.headtitle'),
          subtitle: this.$language('error.subtitle'),
          index: 16384
        },
        {
          code: 'Std', // 15
          title: this.$language('error.notify_fault_name_Std'),
          text: this.$language('error.notify_fault_resolve_Std'),
          headtitle: this.$language('error.headtitle'),
          subtitle: this.$language('error.subtitle'),
          index: 32768
        },
      ],

      prompt2List: [
        {}, {}, {}, {}, // 预留 0-3
        {}, {}, {}, {}, // 预留 4-7
        {}, {}, {}, {}, // 预留 8-11
        {
          code: 'notify_fault_name_LC4', // 12
          title: this.$language('error.notify_fault_name_LC4'),
          text: this.$language('error.notify_fault_resolve_LC4'),
          headtitle: this.$language('error.headtitle'),
          subtitle: this.$language('error.subtitle'),
          index: 4096
        }, 
        {}, {}, {}// 13-15
      ]
    };
  }
};
export default errorList;
