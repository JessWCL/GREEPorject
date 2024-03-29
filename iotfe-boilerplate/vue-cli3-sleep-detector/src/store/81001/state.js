/*
 * @Date: 2020-05-13 17:21:01
 * @LastEditors: Feng
 * @LastEditTime: 2020-05-14 15:12:30
 * @Description: 
 */

const state = {
  mid: 81001,
  sleepReal: {
    bodyMotion: 0,
    breathRate: 0,
    heartRate: 0,
    inBedState: 0,
    part: ""
  },
  // dayReportData: null,
  weekReportData: {
    mac: "mac00001",
    startDate: "2020-08-11",
    endDate: "2020-08-11",
    score: 66, // 周平均得分
    heartRate: 66, // 平均心率
    breatheRate: 66, // 平均呼吸率
    inBedTime: 666, // 平均睡眠时间
    scorePlot: [78, 88, 96, 50, 71], // 周内评分
    datePlot: ["2020-08-11", "2020-08-12", "2020-08-13", "2020-08-14", "2020-08-15"] // 日期列表
  },
  monthReportData: {
    mac: "mac00001",
    startDate: "2020-08-11",
    endDate: "2020-08-11",
    score: 66, // 周平均得分
    heartRate: 66, // 平均心率
    breatheRate: 66, // 平均呼吸率
    inBedTime: 666, // 平均睡眠时间
    scorePlot: [90, 88, 96, 50, 66, 90, 88, 96, 50, 20], // 周内评分
    datePlot: ["2020-08-11", "2020-08-12", "2020-08-13", "2020-08-14", "2020-08-15", "2020-08-11", "2020-08-12", "2020-08-13", "2020-08-14", "2020-08-15"] // 日期列表
  },
  dayReportData: {
    "left": {
      "onBedAt": 1597144904000,
      "sleepStartAt": null,
      "leaveBedAt": 1597172963000,
      "sleepEndAt": null,
      "turnOver": 326,
      "sleepCycleCount": null,
      "score": 78,
      "meanHeartRate": 59,
      "meanBreathRate": 19,
      "nrDuration": 4,
      "deepDuration": 0,
      "wakeDuration": 438,
      "remDuration": 24,
      "leaveBedDuration": null,
      "enterSleepDuration": 28,
      "meanTurnOverDuration": null,
      "minHeartRateMoment": 1597153883000,
      "maxHeartRateMoment": 1597156163000,
      "maxBreathRateMoment": 1597150523000,
      "minBreathRateMoment": 1597170203000,
      "snore": 0,
      "apneaCount": null,
      "apneaMeanDuration": null,
      "sleepStage": {
        "times": [
          1597144904000,
          1597145024000,
          1597145144000,
          1597145264000,
          1597145384000,
          1597145504000,
          1597145624000,
          1597145744000,
          1597145864000,
          1597145984000,
          1597146104000,
          1597146224000,
          1597146344000,
          1597146464000,
          1597146584000,
          1597146704000,
          1597146824000,
          1597146944000,
          1597147064000,
          1597147184000,
          1597147304000,
          1597147424000,
          1597147544000,
          1597147664000,
          1597147784000,
          1597147904000,
          1597148024000,
          1597148144000,
          1597148264000,
          1597148384000,
          1597148504000,
          1597148854000,
          1597148963000,
          1597148974000,
          1597149083000,
          1597149094000,
          1597149203000,
          1597149323000,
          1597149443000,
          1597149563000,
          1597149683000,
          1597149803000,
          1597149923000,
          1597150043000,
          1597150163000,
          1597150283000,
          1597150403000,
          1597150523000,
          1597150643000,
          1597150763000,
          1597150883000,
          1597151003000,
          1597151123000,
          1597151243000,
          1597151363000,
          1597151483000,
          1597151603000,
          1597151723000,
          1597151843000,
          1597151963000,
          1597152083000,
          1597152203000,
          1597152323000,
          1597152443000,
          1597152563000,
          1597152683000,
          1597152803000,
          1597152923000,
          1597153043000,
          1597153163000,
          1597153283000,
          1597153403000,
          1597153523000,
          1597153643000,
          1597153763000,
          1597153883000,
          1597154003000,
          1597154123000,
          1597154243000,
          1597154363000,
          1597154483000,
          1597154603000,
          1597154723000,
          1597154843000,
          1597154963000,
          1597155083000,
          1597155203000,
          1597155323000,
          1597155443000,
          1597155563000,
          1597155683000,
          1597155803000,
          1597155923000,
          1597156043000,
          1597156163000,
          1597156283000,
          1597156403000,
          1597156523000,
          1597156643000,
          1597156763000,
          1597156883000,
          1597157003000,
          1597157123000,
          1597157243000,
          1597157363000,
          1597157483000,
          1597157603000,
          1597157723000,
          1597157843000,
          1597157963000,
          1597158083000,
          1597158203000,
          1597158323000,
          1597158443000,
          1597158563000,
          1597158683000,
          1597158803000,
          1597158923000,
          1597159043000,
          1597159163000,
          1597159283000,
          1597159403000,
          1597159523000,
          1597159643000,
          1597159763000,
          1597159883000,
          1597160003000,
          1597160123000,
          1597160243000,
          1597160363000,
          1597160483000,
          1597160603000,
          1597160723000,
          1597160843000,
          1597160963000,
          1597161083000,
          1597161203000,
          1597161323000,
          1597161443000,
          1597161563000,
          1597161683000,
          1597161803000,
          1597161923000,
          1597162043000,
          1597162163000,
          1597162283000,
          1597162403000,
          1597162523000,
          1597162643000,
          1597162763000,
          1597162883000,
          1597163003000,
          1597163123000,
          1597163243000,
          1597163363000,
          1597163483000,
          1597163603000,
          1597163723000,
          1597163843000,
          1597163963000,
          1597164083000,
          1597164203000,
          1597164323000,
          1597164443000,
          1597164563000,
          1597164683000,
          1597164803000,
          1597164923000,
          1597165043000,
          1597165163000,
          1597165283000,
          1597165403000,
          1597165523000,
          1597165643000,
          1597165763000,
          1597165883000,
          1597166003000,
          1597166123000,
          1597166243000,
          1597166363000,
          1597166483000,
          1597166603000,
          1597166723000,
          1597166843000,
          1597166963000,
          1597167083000,
          1597167203000,
          1597167323000,
          1597167443000,
          1597167563000,
          1597167683000,
          1597167803000,
          1597167923000,
          1597168043000,
          1597168163000,
          1597168283000,
          1597168403000,
          1597168523000,
          1597168643000,
          1597168763000,
          1597168883000,
          1597169003000,
          1597169123000,
          1597169243000,
          1597169363000,
          1597169483000,
          1597169603000,
          1597169723000,
          1597169843000,
          1597169963000,
          1597170083000,
          1597170203000,
          1597170323000,
          1597170443000,
          1597170563000,
          1597170683000,
          1597170803000,
          1597170923000,
          1597171043000,
          1597171163000,
          1597171283000,
          1597171403000,
          1597171523000,
          1597171643000,
          1597171763000,
          1597171883000,
          1597172003000,
          1597172123000,
          1597172243000,
          1597172363000,
          1597172483000,
          1597172603000,
          1597172723000,
          1597172843000,
          1597172963000
        ],
        "stages": [
          3,
          3,
          2,
          2,
          2,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          2,
          3,
          2,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          2,
          2,
          3,
          3,
          3,
          1,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          2,
          2,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          1,
          3,
          2,
          2,
          2,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3
        ],
        "inBedStatus": [
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1
        ]
      },
      "sleepRate": {
        "times": [
          1597144904000,
          1597145384000,
          1597145984000,
          1597146584000,
          1597147064000,
          1597147664000,
          1597148264000,
          1597148963000,
          1597149323000,
          1597149923000,
          1597150523000,
          1597151003000,
          1597151603000,
          1597152203000,
          1597152683000,
          1597153283000,
          1597153883000,
          1597154363000,
          1597154963000,
          1597155563000,
          1597156163000,
          1597156643000,
          1597157243000,
          1597157843000,
          1597158323000,
          1597158923000,
          1597159523000,
          1597160003000,
          1597160603000,
          1597161203000,
          1597161803000,
          1597162283000,
          1597162883000,
          1597163483000,
          1597163963000,
          1597164563000,
          1597165163000,
          1597165643000,
          1597166243000,
          1597166843000,
          1597167443000,
          1597167923000,
          1597168523000,
          1597169123000,
          1597169603000,
          1597170203000,
          1597170803000,
          1597171283000,
          1597171883000,
          1597172963000
        ],
        "heartRate": [
          71,
          72,
          50,
          54,
          61,
          76,
          53,
          46,
          49,
          65,
          63,
          44,
          57,
          62,
          70,
          66,
          42,
          50,
          56,
          74,
          78,
          66,
          75,
          50,
          78,
          48,
          76,
          56,
          48,
          63,
          62,
          62,
          63,
          61,
          48,
          72,
          62,
          57,
          66,
          76,
          62,
          55,
          78,
          71,
          57,
          56,
          75,
          78,
          69,
          72
        ],
        "breathRate": [
          15,
          18,
          16,
          27,
          14,
          19,
          20,
          19,
          17,
          23,
          29,
          19,
          25,
          21,
          26,
          24,
          29,
          20,
          25,
          16,
          26,
          16,
          22,
          16,
          22,
          25,
          16,
          29,
          27,
          25,
          17,
          20,
          28,
          12,
          19,
          13,
          11,
          13,
          26,
          18,
          25,
          22,
          15,
          14,
          19,
          10,
          19,
          25,
          21,
          28
        ],
        "bodyMov": [
          1,
          2,
          3,
          2,
          2,
          0,
          2,
          1,
          2,
          2,
          1,
          1,
          2,
          0,
          0,
          3,
          1,
          3,
          0,
          3,
          1,
          1,
          1,
          0,
          2,
          0,
          0,
          1,
          0,
          0,
          1,
          0,
          1,
          2,
          2,
          1,
          2,
          1,
          2,
          1,
          1,
          1,
          2,
          0,
          1,
          0,
          2,
          2,
          3,
          1
        ],
        "snoreRate": [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      }
    },
    // left: {
    //   apneaCount: 66, // 呼吸暂停次数
    //   apneaMeanDuration: 366, // 呼吸暂停平均时长， 单位： 秒
    //   deepDuration: 366, // 深睡时长
    //   enterSleepDuration: 366, // 睡眠总时长
    //   leaveBedAt: 1597147064000, // 离开床的时刻
    //   leaveBedDuration: 366, // 离床时长
    //   maxBreathRateMoment: 1597147064000, // 最大呼吸率出现的时间
    //   maxHeartRateMoment: 1597147064000, // 最小呼吸率出现的时间
    //   meanBreathRate: 66, // 平均呼吸率
    //   meanHeartRate: 66, // 平均心率
    //   meanTurnOverDuration: 366, // 平均翻身时长
    //   minBreathRateMoment: 1597147064000, // 最小呼吸率出现的时间
    //   minHeartRateMoment: 1597147064000, // 最小心率出现的时间
    //   nrDuration: 366, // 浅睡时长
    //   onBedAt: 0, // 开始躺床的时刻
    //   remDuration: 366, // REM快速眼动时长
    //   score: 66, // 睡眠评分
    //   sleepCycleCount: 66, // 周期次数
    //   sleepEndAt: 1597701966000, // 结束睡眠时刻
    //   sleepRate: {
    //     times: [
    //       1597144904000,
    //       1597145384000,
    //       1597145984000,
    //       1597146584000,
    //       1597147064000,
    //       1597147664000,
    //       1597148264000,
    //       1597148963000,
    //       1597149323000,
    //       1597149923000,
    //       1597150523000,
    //       1597151003000,
    //       1597151603000,
    //       1597152203000,
    //       1597152683000,
    //       1597153283000,
    //       1597153883000,
    //       1597154363000,
    //       1597154963000,
    //       1597155563000,
    //       1597156163000,
    //       1597156643000,
    //       1597157243000,
    //       1597157843000,
    //       1597158323000,
    //       1597158923000,
    //       1597159523000,
    //       1597160003000,
    //       1597160603000,
    //       1597161203000,
    //       1597161803000,
    //       1597162283000,
    //       1597162883000,
    //       1597163483000,
    //       1597163963000,
    //       1597164563000,
    //       1597165163000,
    //       1597165643000,
    //       1597166243000,
    //       1597166843000,
    //       1597167443000,
    //       1597167923000,
    //       1597168523000,
    //       1597169123000,
    //       1597169603000,
    //       1597170203000,
    //       1597170803000,
    //       1597171283000,
    //       1597171883000,
    //       1597172963000
    //     ],
    //     heartRate: [
    //       71,
    //       72,
    //       50,
    //       54,
    //       61,
    //       76,
    //       53,
    //       46,
    //       49,
    //       65,
    //       63,
    //       44,
    //       57,
    //       62,
    //       70,
    //       66,
    //       42,
    //       50,
    //       56,
    //       74,
    //       78,
    //       66,
    //       75,
    //       50,
    //       78,
    //       48,
    //       76,
    //       56,
    //       48,
    //       63,
    //       62,
    //       62,
    //       63,
    //       61,
    //       48,
    //       72,
    //       62,
    //       57,
    //       66,
    //       76,
    //       62,
    //       55,
    //       78,
    //       71,
    //       57,
    //       56,
    //       75,
    //       78,
    //       69,
    //       72
    //     ],
    //     breathRate: [
    //       15,
    //       18,
    //       16,
    //       27,
    //       14,
    //       19,
    //       20,
    //       19,
    //       17,
    //       23,
    //       29,
    //       19,
    //       25,
    //       21,
    //       26,
    //       24,
    //       29,
    //       20,
    //       25,
    //       16,
    //       26,
    //       16,
    //       22,
    //       16,
    //       22,
    //       25,
    //       16,
    //       29,
    //       27,
    //       25,
    //       17,
    //       20,
    //       28,
    //       12,
    //       19,
    //       13,
    //       11,
    //       13,
    //       26,
    //       18,
    //       25,
    //       22,
    //       15,
    //       14,
    //       19,
    //       10,
    //       19,
    //       25,
    //       21,
    //       28
    //     ],
    //     bodyMov: [
    //       1,
    //       2,
    //       3,
    //       2,
    //       2,
    //       0,
    //       2,
    //       1,
    //       2,
    //       2,
    //       1,
    //       1,
    //       2,
    //       0,
    //       0,
    //       3,
    //       1,
    //       3,
    //       0,
    //       3,
    //       1,
    //       1,
    //       1,
    //       0,
    //       2,
    //       0,
    //       0,
    //       1,
    //       0,
    //       0,
    //       1,
    //       0,
    //       1,
    //       2,
    //       2,
    //       1,
    //       2,
    //       1,
    //       2,
    //       1,
    //       1,
    //       1,
    //       2,
    //       0,
    //       1,
    //       0,
    //       2,
    //       2,
    //       3,
    //       1
    //     ],
    //     snoreRate: [
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0,
    //       0
    //     ]
    //   },
    //   sleepStage: { // 睡眠阶段
    //     inBedStatus: [
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1,
    //       1
    //     ], // 睡眠时间点数组对应,0.离床;1.在床
    //     stages: [
    //       3,
    //       3,
    //       2,
    //       2,
    //       2,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       2,
    //       3,
    //       2,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       2,
    //       2,
    //       3,
    //       3,
    //       3,
    //       1,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       2,
    //       2,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       1,
    //       3,
    //       2,
    //       2,
    //       2,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3,
    //       3
    //     ], // 睡眠时间点数组对应的睡眠阶段,0.清醒； 1.浅睡； 2.深睡, 3.REM
    //     times: [
    //       1597144904000,
    //       1597145024000,
    //       1597145144000,
    //       1597145264000,
    //       1597145384000,
    //       1597145504000,
    //       1597145624000,
    //       1597145744000,
    //       1597145864000,
    //       1597145984000,
    //       1597146104000,
    //       1597146224000,
    //       1597146344000,
    //       1597146464000,
    //       1597146584000,
    //       1597146704000,
    //       1597146824000,
    //       1597146944000,
    //       1597147064000,
    //       1597147184000,
    //       1597147304000,
    //       1597147424000,
    //       1597147544000,
    //       1597147664000,
    //       1597147784000,
    //       1597147904000,
    //       1597148024000,
    //       1597148144000,
    //       1597148264000,
    //       1597148384000,
    //       1597148504000,
    //       1597148854000,
    //       1597148963000,
    //       1597148974000,
    //       1597149083000,
    //       1597149094000,
    //       1597149203000,
    //       1597149323000,
    //       1597149443000,
    //       1597149563000,
    //       1597149683000,
    //       1597149803000,
    //       1597149923000,
    //       1597150043000,
    //       1597150163000,
    //       1597150283000,
    //       1597150403000,
    //       1597150523000,
    //       1597150643000,
    //       1597150763000,
    //       1597150883000,
    //       1597151003000,
    //       1597151123000,
    //       1597151243000,
    //       1597151363000,
    //       1597151483000,
    //       1597151603000,
    //       1597151723000,
    //       1597151843000,
    //       1597151963000,
    //       1597152083000,
    //       1597152203000,
    //       1597152323000,
    //       1597152443000,
    //       1597152563000,
    //       1597152683000,
    //       1597152803000,
    //       1597152923000,
    //       1597153043000,
    //       1597153163000,
    //       1597153283000,
    //       1597153403000,
    //       1597153523000,
    //       1597153643000,
    //       1597153763000,
    //       1597153883000,
    //       1597154003000,
    //       1597154123000,
    //       1597154243000,
    //       1597154363000,
    //       1597154483000,
    //       1597154603000,
    //       1597154723000,
    //       1597154843000,
    //       1597154963000,
    //       1597155083000,
    //       1597155203000,
    //       1597155323000,
    //       1597155443000,
    //       1597155563000,
    //       1597155683000,
    //       1597155803000,
    //       1597155923000,
    //       1597156043000,
    //       1597156163000,
    //       1597156283000,
    //       1597156403000,
    //       1597156523000,
    //       1597156643000,
    //       1597156763000,
    //       1597156883000,
    //       1597157003000,
    //       1597157123000,
    //       1597157243000,
    //       1597157363000,
    //       1597157483000,
    //       1597157603000,
    //       1597157723000,
    //       1597157843000,
    //       1597157963000,
    //       1597158083000,
    //       1597158203000,
    //       1597158323000,
    //       1597158443000,
    //       1597158563000,
    //       1597158683000,
    //       1597158803000,
    //       1597158923000,
    //       1597159043000,
    //       1597159163000,
    //       1597159283000,
    //       1597159403000,
    //       1597159523000,
    //       1597159643000,
    //       1597159763000,
    //       1597159883000,
    //       1597160003000,
    //       1597160123000,
    //       1597160243000,
    //       1597160363000,
    //       1597160483000,
    //       1597160603000,
    //       1597160723000,
    //       1597160843000,
    //       1597160963000,
    //       1597161083000,
    //       1597161203000,
    //       1597161323000,
    //       1597161443000,
    //       1597161563000,
    //       1597161683000,
    //       1597161803000,
    //       1597161923000,
    //       1597162043000,
    //       1597162163000,
    //       1597162283000,
    //       1597162403000,
    //       1597162523000,
    //       1597162643000,
    //       1597162763000,
    //       1597162883000,
    //       1597163003000,
    //       1597163123000,
    //       1597163243000,
    //       1597163363000,
    //       1597163483000,
    //       1597163603000,
    //       1597163723000,
    //       1597163843000,
    //       1597163963000,
    //       1597164083000,
    //       1597164203000,
    //       1597164323000,
    //       1597164443000,
    //       1597164563000,
    //       1597164683000,
    //       1597164803000,
    //       1597164923000,
    //       1597165043000,
    //       1597165163000,
    //       1597165283000,
    //       1597165403000,
    //       1597165523000,
    //       1597165643000,
    //       1597165763000,
    //       1597165883000,
    //       1597166003000,
    //       1597166123000,
    //       1597166243000,
    //       1597166363000,
    //       1597166483000,
    //       1597166603000,
    //       1597166723000,
    //       1597166843000,
    //       1597166963000,
    //       1597167083000,
    //       1597167203000,
    //       1597167323000,
    //       1597167443000,
    //       1597167563000,
    //       1597167683000,
    //       1597167803000,
    //       1597167923000,
    //       1597168043000,
    //       1597168163000,
    //       1597168283000,
    //       1597168403000,
    //       1597168523000,
    //       1597168643000,
    //       1597168763000,
    //       1597168883000,
    //       1597169003000,
    //       1597169123000,
    //       1597169243000,
    //       1597169363000,
    //       1597169483000,
    //       1597169603000,
    //       1597169723000,
    //       1597169843000,
    //       1597169963000,
    //       1597170083000,
    //       1597170203000,
    //       1597170323000,
    //       1597170443000,
    //       1597170563000,
    //       1597170683000,
    //       1597170803000,
    //       1597170923000,
    //       1597171043000,
    //       1597171163000,
    //       1597171283000,
    //       1597171403000,
    //       1597171523000,
    //       1597171643000,
    //       1597171763000,
    //       1597171883000,
    //       1597172003000,
    //       1597172123000,
    //       1597172243000,
    //       1597172363000,
    //       1597172483000,
    //       1597172603000,
    //       1597172723000,
    //       1597172843000,
    //       1597172963000
    //     ], // 睡眠时间点数组
    //   },
    //   sleepStartAt: 1597701966000, // 进入睡眠时刻
    //   snore: 66, // 打鼾次数
    //   turnOver: 66, // 体动次数
    //   wakeDuration: 366, // 清醒时长
    // },
    period: ""
  },
};

export default state;
