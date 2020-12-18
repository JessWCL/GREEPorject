/*
 * @Author: Jerry-Rain
 * @Date: 2020-01-03 10:55:45
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-02-20 10:29:08
 * @Description: 测试数据
 */

// //高泳诗+慕思获取查询T10实时数据
// getDerucciGetBedStatus
// //高泳诗+慕思保存或修改女性生理信息
// getDerucciLadyInfo
// //高泳诗+慕思获取女性生理信息
// getDerucciGetLadyInfo
// //高泳诗+慕思获取睡眠报告
// getDerucciGetSleepData
// //高泳诗+慕思获取睡眠历史的日期列表
// getDerucciGetDataList
// //高泳诗+慕思获取控制T10软硬度接口
// getDerucciSetPressure
// //高泳诗+慕思获取控制T10自动补气时间
// getDerucciSetTime
// //高泳诗+慕思T10软硬度精准推荐
// getDerucciGetRecommendData

// getDerucciGetBedStatus
export const getDerucciGetBedStatus = {
  code: 200,
  message: {
    status: 'OK',
    result: {
      machineCode: 'B2020000001D',
      machineInfoNo: 'airBedT10',
      parts: [
        {
          bodyMotion: 0,
          breathRate: 88,
          heartRate: 76,
          inBedState: 1,
          machineEntityPartCode: 'B2020000001D####left'
        },
        {
          bodyMotion: 0,
          breathRate: 68,
          heartRate: 66,
          inBedState: 1,
          machineEntityPartCode: 'B2020000001D####right'
        }
      ]
    }
  }
}

// "breathRate": "80",
// "heartRate": "78",
// "inBedState": "0",
// 呼吸率
// 心率
// 是否在床
// message.result.parts
// getDerucciLadyInfo

// getDerucciLadyInfo
export const LadyInfoData = {
  payload: {
    birthday: '2000/12/30 08:44:10',
    height: '170',
    weight: '50',
    lastOnsetStart: '2019/11/30 08:44:10',
    continuousDays: '5', // 3<x<10
    menstrualCycle: '30', // 26<x<35
    modelType: '1', // 智韵模式 1魅力，2备孕
    phState: '4' // 1：妊娠期 2:哺乳期 3:绝经期 4：正常阶段
  }
}

export const getDerucciLadyInfo = {
  code: 200,
  message: {
    status: 'OK',
    result: {
      machineCode: 'xxx',
      birthday: '2000/12/30 08:44:10',
      height: 170,
      weight: 50,
      lastOnsetStart: '2019/11/30 08:44:10',
      continuousDays: 5,
      menstrualCycle: 30,
      modelType: 1,
      phState: 4,
      updateAt: null,
      active: true
    }
  }
}

// directive.payload
// LadyInfo

export const sleepReport = {
  message: {
    status: 'OK',
    result: {
      generateAt: 1578537000460,
      sleepModel: '百灵鸟型:早睡早起',
      id: '5e169028cff47e000106ec29',
      createAt: 1578520710000,
      enterSleepDuration: 22134,
      score: 70,
      sleepStage: [
        {
          endAt: 1578498696000,
          stage: 0,
          startAt: 1578498636000
        },
        {
          endAt: 1578498756000,
          stage: 0,
          startAt: 1578498696000
        },
        {
          endAt: 1578498816000,
          stage: 0,
          startAt: 1578498756000
        },
        {
          endAt: 1578498871000,
          stage: 0,
          startAt: 1578498816000
        },
        {
          endAt: 1578498931000,
          stage: 0,
          startAt: 1578498871000
        },
        {
          endAt: 1578498991000,
          stage: 0,
          startAt: 1578498931000
        },
        {
          endAt: 1578499051000,
          stage: 0,
          startAt: 1578498991000
        },
        {
          endAt: 1578499111000,
          stage: 0,
          startAt: 1578499051000
        },
        {
          endAt: 1578499179000,
          stage: 0,
          startAt: 1578499111000
        },
        {
          endAt: 1578499239000,
          stage: 0,
          startAt: 1578499179000
        },
        {
          endAt: 1578499299000,
          stage: 0,
          startAt: 1578499239000
        },
        {
          endAt: 1578499359000,
          stage: 0,
          startAt: 1578499299000
        },
        {
          endAt: 1578499419000,
          stage: 0,
          startAt: 1578499359000
        },
        {
          endAt: 1578499474000,
          stage: 0,
          startAt: 1578499419000
        },
        {
          endAt: 1578499534000,
          stage: 0,
          startAt: 1578499474000
        },
        {
          endAt: 1578499594000,
          stage: 0,
          startAt: 1578499534000
        },
        {
          endAt: 1578499654000,
          stage: 0,
          startAt: 1578499594000
        },
        {
          endAt: 1578499714000,
          stage: 0,
          startAt: 1578499654000
        },
        {
          endAt: 1578499768000,
          stage: 0,
          startAt: 1578499714000
        },
        {
          endAt: 1578499828000,
          stage: 0,
          startAt: 1578499768000
        },
        {
          endAt: 1578499888000,
          stage: 0,
          startAt: 1578499828000
        },
        {
          endAt: 1578499948000,
          stage: 0,
          startAt: 1578499888000
        },
        {
          endAt: 1578500008000,
          stage: 0,
          startAt: 1578499948000
        },
        {
          endAt: 1578500076000,
          stage: 0,
          startAt: 1578500008000
        },
        {
          endAt: 1578500136000,
          stage: 0,
          startAt: 1578500076000
        },
        {
          endAt: 1578500196000,
          stage: 0,
          startAt: 1578500136000
        },
        {
          endAt: 1578500256000,
          stage: 0,
          startAt: 1578500196000
        },
        {
          endAt: 1578500316000,
          stage: 0,
          startAt: 1578500256000
        },
        {
          endAt: 1578500371000,
          stage: 0,
          startAt: 1578500316000
        },
        {
          endAt: 1578500431000,
          stage: 0,
          startAt: 1578500371000
        },
        {
          endAt: 1578500491000,
          stage: 0,
          startAt: 1578500431000
        },
        {
          endAt: 1578500551000,
          stage: 0,
          startAt: 1578500491000
        },
        {
          endAt: 1578500611000,
          stage: 0,
          startAt: 1578500551000
        },
        {
          endAt: 1578500668000,
          stage: 0,
          startAt: 1578500611000
        },
        {
          endAt: 1578500728000,
          stage: 0,
          startAt: 1578500668000
        },
        {
          endAt: 1578500788000,
          stage: 0,
          startAt: 1578500728000
        },
        {
          endAt: 1578500848000,
          stage: 0,
          startAt: 1578500788000
        },
        {
          endAt: 1578500908000,
          stage: 0,
          startAt: 1578500848000
        },
        {
          endAt: 1578500975000,
          stage: 0,
          startAt: 1578500908000
        },
        {
          endAt: 1578501035000,
          stage: 0,
          startAt: 1578500975000
        },
        {
          endAt: 1578501095000,
          stage: 0,
          startAt: 1578501035000
        },
        {
          endAt: 1578501155000,
          stage: 1,
          startAt: 1578501095000
        },
        {
          endAt: 1578501215000,
          stage: 1,
          startAt: 1578501155000
        },
        {
          endAt: 1578501270000,
          stage: 1,
          startAt: 1578501215000
        },
        {
          endAt: 1578501330000,
          stage: 1,
          startAt: 1578501270000
        },
        {
          endAt: 1578501390000,
          stage: 1,
          startAt: 1578501330000
        },
        {
          endAt: 1578501450000,
          stage: 1,
          startAt: 1578501390000
        },
        {
          endAt: 1578501510000,
          stage: 1,
          startAt: 1578501450000
        },
        {
          endAt: 1578501576000,
          stage: 1,
          startAt: 1578501510000
        },
        {
          endAt: 1578501636000,
          stage: 1,
          startAt: 1578501576000
        },
        {
          endAt: 1578501696000,
          stage: 3,
          startAt: 1578501636000
        },
        {
          endAt: 1578501756000,
          stage: 3,
          startAt: 1578501696000
        },
        {
          endAt: 1578501816000,
          stage: 3,
          startAt: 1578501756000
        },
        {
          endAt: 1578501871000,
          stage: 3,
          startAt: 1578501816000
        },
        {
          endAt: 1578501931000,
          stage: 3,
          startAt: 1578501871000
        },
        {
          endAt: 1578501991000,
          stage: 3,
          startAt: 1578501931000
        },
        {
          endAt: 1578502051000,
          stage: 3,
          startAt: 1578501991000
        },
        {
          endAt: 1578502111000,
          stage: 3,
          startAt: 1578502051000
        },
        {
          endAt: 1578502178000,
          stage: 3,
          startAt: 1578502111000
        },
        {
          endAt: 1578502238000,
          stage: 3,
          startAt: 1578502178000
        },
        {
          endAt: 1578502298000,
          stage: 3,
          startAt: 1578502238000
        },
        {
          endAt: 1578502358000,
          stage: 3,
          startAt: 1578502298000
        },
        {
          endAt: 1578502418000,
          stage: 3,
          startAt: 1578502358000
        },
        {
          endAt: 1578502473000,
          stage: 3,
          startAt: 1578502418000
        },
        {
          endAt: 1578502533000,
          stage: 3,
          startAt: 1578502473000
        },
        {
          endAt: 1578502593000,
          stage: 3,
          startAt: 1578502533000
        },
        {
          endAt: 1578502653000,
          stage: 3,
          startAt: 1578502593000
        },
        {
          endAt: 1578502713000,
          stage: 3,
          startAt: 1578502653000
        },
        {
          endAt: 1578502768000,
          stage: 3,
          startAt: 1578502713000
        },
        {
          endAt: 1578502828000,
          stage: 3,
          startAt: 1578502768000
        },
        {
          endAt: 1578502888000,
          stage: 3,
          startAt: 1578502828000
        },
        {
          endAt: 1578502948000,
          stage: 3,
          startAt: 1578502888000
        },
        {
          endAt: 1578503008000,
          stage: 3,
          startAt: 1578502948000
        },
        {
          endAt: 1578503075000,
          stage: 3,
          startAt: 1578503008000
        },
        {
          endAt: 1578503135000,
          stage: 3,
          startAt: 1578503075000
        },
        {
          endAt: 1578503195000,
          stage: 3,
          startAt: 1578503135000
        },
        {
          endAt: 1578503255000,
          stage: 3,
          startAt: 1578503195000
        },
        {
          endAt: 1578503315000,
          stage: 3,
          startAt: 1578503255000
        },
        {
          endAt: 1578503370000,
          stage: 3,
          startAt: 1578503315000
        },
        {
          endAt: 1578503430000,
          stage: 3,
          startAt: 1578503370000
        },
        {
          endAt: 1578503490000,
          stage: 3,
          startAt: 1578503430000
        },
        {
          endAt: 1578503550000,
          stage: 3,
          startAt: 1578503490000
        },
        {
          endAt: 1578503610000,
          stage: 3,
          startAt: 1578503550000
        },
        {
          endAt: 1578503677000,
          stage: 3,
          startAt: 1578503610000
        },
        {
          endAt: 1578503737000,
          stage: 3,
          startAt: 1578503677000
        },
        {
          endAt: 1578503797000,
          stage: 3,
          startAt: 1578503737000
        },
        {
          endAt: 1578503857000,
          stage: 3,
          startAt: 1578503797000
        },
        {
          endAt: 1578503917000,
          stage: 3,
          startAt: 1578503857000
        },
        {
          endAt: 1578503972000,
          stage: 3,
          startAt: 1578503917000
        },
        {
          endAt: 1578504032000,
          stage: 3,
          startAt: 1578503972000
        },
        {
          endAt: 1578504092000,
          stage: 3,
          startAt: 1578504032000
        },
        {
          endAt: 1578504152000,
          stage: 3,
          startAt: 1578504092000
        },
        {
          endAt: 1578504212000,
          stage: 3,
          startAt: 1578504152000
        },
        {
          endAt: 1578504267000,
          stage: 3,
          startAt: 1578504212000
        },
        {
          endAt: 1578504327000,
          stage: 3,
          startAt: 1578504267000
        },
        {
          endAt: 1578504387000,
          stage: 3,
          startAt: 1578504327000
        },
        {
          endAt: 1578504447000,
          stage: 3,
          startAt: 1578504387000
        },
        {
          endAt: 1578504507000,
          stage: 3,
          startAt: 1578504447000
        },
        {
          endAt: 1578504575000,
          stage: 3,
          startAt: 1578504507000
        },
        {
          endAt: 1578504635000,
          stage: 3,
          startAt: 1578504575000
        },
        {
          endAt: 1578504695000,
          stage: 3,
          startAt: 1578504635000
        },
        {
          endAt: 1578504755000,
          stage: 2,
          startAt: 1578504695000
        },
        {
          endAt: 1578504815000,
          stage: 2,
          startAt: 1578504755000
        },
        {
          endAt: 1578504869000,
          stage: 2,
          startAt: 1578504815000
        },
        {
          endAt: 1578504929000,
          stage: 2,
          startAt: 1578504869000
        },
        {
          endAt: 1578504989000,
          stage: 2,
          startAt: 1578504929000
        },
        {
          endAt: 1578505049000,
          stage: 2,
          startAt: 1578504989000
        },
        {
          endAt: 1578505109000,
          stage: 2,
          startAt: 1578505049000
        },
        {
          endAt: 1578505178000,
          stage: 2,
          startAt: 1578505109000
        },
        {
          endAt: 1578505238000,
          stage: 2,
          startAt: 1578505178000
        },
        {
          endAt: 1578505298000,
          stage: 2,
          startAt: 1578505238000
        },
        {
          endAt: 1578505358000,
          stage: 2,
          startAt: 1578505298000
        },
        {
          endAt: 1578505418000,
          stage: 2,
          startAt: 1578505358000
        },
        {
          endAt: 1578505474000,
          stage: 2,
          startAt: 1578505418000
        },
        {
          endAt: 1578505534000,
          stage: 2,
          startAt: 1578505474000
        },
        {
          endAt: 1578505594000,
          stage: 2,
          startAt: 1578505534000
        },
        {
          endAt: 1578505654000,
          stage: 2,
          startAt: 1578505594000
        },
        {
          endAt: 1578505714000,
          stage: 2,
          startAt: 1578505654000
        },
        {
          endAt: 1578505769000,
          stage: 2,
          startAt: 1578505714000
        },
        {
          endAt: 1578505829000,
          stage: 2,
          startAt: 1578505769000
        },
        {
          endAt: 1578505889000,
          stage: 5,
          startAt: 1578505829000
        },
        {
          endAt: 1578505949000,
          stage: 5,
          startAt: 1578505889000
        },
        {
          endAt: 1578506009000,
          stage: 5,
          startAt: 1578505949000
        },
        {
          endAt: 1578506077000,
          stage: 5,
          startAt: 1578506009000
        },
        {
          endAt: 1578506137000,
          stage: 5,
          startAt: 1578506077000
        },
        {
          endAt: 1578506197000,
          stage: 5,
          startAt: 1578506137000
        },
        {
          endAt: 1578506257000,
          stage: 5,
          startAt: 1578506197000
        },
        {
          endAt: 1578506317000,
          stage: 5,
          startAt: 1578506257000
        },
        {
          endAt: 1578506372000,
          stage: 5,
          startAt: 1578506317000
        },
        {
          endAt: 1578506432000,
          stage: 5,
          startAt: 1578506372000
        },
        {
          endAt: 1578506492000,
          stage: 5,
          startAt: 1578506432000
        },
        {
          endAt: 1578506552000,
          stage: 5,
          startAt: 1578506492000
        },
        {
          endAt: 1578506612000,
          stage: 5,
          startAt: 1578506552000
        },
        {
          endAt: 1578506668000,
          stage: 5,
          startAt: 1578506612000
        },
        {
          endAt: 1578506728000,
          stage: 5,
          startAt: 1578506668000
        },
        {
          endAt: 1578506788000,
          stage: 3,
          startAt: 1578506728000
        },
        {
          endAt: 1578506848000,
          stage: 3,
          startAt: 1578506788000
        },
        {
          endAt: 1578506908000,
          stage: 3,
          startAt: 1578506848000
        },
        {
          endAt: 1578506976000,
          stage: 3,
          startAt: 1578506908000
        },
        {
          endAt: 1578507036000,
          stage: 3,
          startAt: 1578506976000
        },
        {
          endAt: 1578507096000,
          stage: 3,
          startAt: 1578507036000
        },
        {
          endAt: 1578507156000,
          stage: 3,
          startAt: 1578507096000
        },
        {
          endAt: 1578507216000,
          stage: 3,
          startAt: 1578507156000
        },
        {
          endAt: 1578507271000,
          stage: 3,
          startAt: 1578507216000
        },
        {
          endAt: 1578507331000,
          stage: 3,
          startAt: 1578507271000
        },
        {
          endAt: 1578507391000,
          stage: 3,
          startAt: 1578507331000
        },
        {
          endAt: 1578507451000,
          stage: 3,
          startAt: 1578507391000
        },
        {
          endAt: 1578507511000,
          stage: 3,
          startAt: 1578507451000
        },
        {
          endAt: 1578507579000,
          stage: 3,
          startAt: 1578507511000
        },
        {
          endAt: 1578507639000,
          stage: 3,
          startAt: 1578507579000
        },
        {
          endAt: 1578507699000,
          stage: 3,
          startAt: 1578507639000
        },
        {
          endAt: 1578507759000,
          stage: 3,
          startAt: 1578507699000
        },
        {
          endAt: 1578507819000,
          stage: 3,
          startAt: 1578507759000
        },
        {
          endAt: 1578507873000,
          stage: 3,
          startAt: 1578507819000
        },
        {
          endAt: 1578507933000,
          stage: 3,
          startAt: 1578507873000
        },
        {
          endAt: 1578507993000,
          stage: 3,
          startAt: 1578507933000
        },
        {
          endAt: 1578508053000,
          stage: 3,
          startAt: 1578507993000
        },
        {
          endAt: 1578508113000,
          stage: 3,
          startAt: 1578508053000
        },
        {
          endAt: 1578508169000,
          stage: 3,
          startAt: 1578508113000
        },
        {
          endAt: 1578508229000,
          stage: 3,
          startAt: 1578508169000
        },
        {
          endAt: 1578508289000,
          stage: 3,
          startAt: 1578508229000
        },
        {
          endAt: 1578508349000,
          stage: 3,
          startAt: 1578508289000
        },
        {
          endAt: 1578508409000,
          stage: 3,
          startAt: 1578508349000
        },
        {
          endAt: 1578508477000,
          stage: 3,
          startAt: 1578508409000
        },
        {
          endAt: 1578508537000,
          stage: 3,
          startAt: 1578508477000
        },
        {
          endAt: 1578508597000,
          stage: 3,
          startAt: 1578508537000
        },
        {
          endAt: 1578508657000,
          stage: 3,
          startAt: 1578508597000
        },
        {
          endAt: 1578508717000,
          stage: 3,
          startAt: 1578508657000
        },
        {
          endAt: 1578508773000,
          stage: 3,
          startAt: 1578508717000
        },
        {
          endAt: 1578508833000,
          stage: 3,
          startAt: 1578508773000
        },
        {
          endAt: 1578508893000,
          stage: 3,
          startAt: 1578508833000
        },
        {
          endAt: 1578508953000,
          stage: 3,
          startAt: 1578508893000
        },
        {
          endAt: 1578509013000,
          stage: 3,
          startAt: 1578508953000
        },
        {
          endAt: 1578509068000,
          stage: 3,
          startAt: 1578509013000
        },
        {
          endAt: 1578509128000,
          stage: 3,
          startAt: 1578509068000
        },
        {
          endAt: 1578509188000,
          stage: 3,
          startAt: 1578509128000
        },
        {
          endAt: 1578509248000,
          stage: 3,
          startAt: 1578509188000
        },
        {
          endAt: 1578509308000,
          stage: 3,
          startAt: 1578509248000
        },
        {
          endAt: 1578509376000,
          stage: 3,
          startAt: 1578509308000
        },
        {
          endAt: 1578509436000,
          stage: 3,
          startAt: 1578509376000
        },
        {
          endAt: 1578509496000,
          stage: 3,
          startAt: 1578509436000
        },
        {
          endAt: 1578509556000,
          stage: 3,
          startAt: 1578509496000
        },
        {
          endAt: 1578509616000,
          stage: 3,
          startAt: 1578509556000
        },
        {
          endAt: 1578509672000,
          stage: 3,
          startAt: 1578509616000
        },
        {
          endAt: 1578509732000,
          stage: 3,
          startAt: 1578509672000
        },
        {
          endAt: 1578509792000,
          stage: 3,
          startAt: 1578509732000
        },
        {
          endAt: 1578509852000,
          stage: 3,
          startAt: 1578509792000
        },
        {
          endAt: 1578509912000,
          stage: 3,
          startAt: 1578509852000
        },
        {
          endAt: 1578509967000,
          stage: 3,
          startAt: 1578509912000
        },
        {
          endAt: 1578510027000,
          stage: 5,
          startAt: 1578509967000
        },
        {
          endAt: 1578510087000,
          stage: 5,
          startAt: 1578510027000
        },
        {
          endAt: 1578510147000,
          stage: 5,
          startAt: 1578510087000
        },
        {
          endAt: 1578510207000,
          stage: 5,
          startAt: 1578510147000
        },
        {
          endAt: 1578510275000,
          stage: 5,
          startAt: 1578510207000
        },
        {
          endAt: 1578510335000,
          stage: 5,
          startAt: 1578510275000
        },
        {
          endAt: 1578510395000,
          stage: 5,
          startAt: 1578510335000
        },
        {
          endAt: 1578510455000,
          stage: 5,
          startAt: 1578510395000
        },
        {
          endAt: 1578510515000,
          stage: 5,
          startAt: 1578510455000
        },
        {
          endAt: 1578510570000,
          stage: 3,
          startAt: 1578510515000
        },
        {
          endAt: 1578510630000,
          stage: 3,
          startAt: 1578510570000
        },
        {
          endAt: 1578510690000,
          stage: 3,
          startAt: 1578510630000
        },
        {
          endAt: 1578510750000,
          stage: 3,
          startAt: 1578510690000
        },
        {
          endAt: 1578510810000,
          stage: 3,
          startAt: 1578510750000
        },
        {
          endAt: 1578510878000,
          stage: 3,
          startAt: 1578510810000
        },
        {
          endAt: 1578510938000,
          stage: 3,
          startAt: 1578510878000
        },
        {
          endAt: 1578510998000,
          stage: 3,
          startAt: 1578510938000
        },
        {
          endAt: 1578511058000,
          stage: 3,
          startAt: 1578510998000
        },
        {
          endAt: 1578511118000,
          stage: 3,
          startAt: 1578511058000
        },
        {
          endAt: 1578511172000,
          stage: 2,
          startAt: 1578511118000
        },
        {
          endAt: 1578511232000,
          stage: 2,
          startAt: 1578511172000
        },
        {
          endAt: 1578511292000,
          stage: 2,
          startAt: 1578511232000
        },
        {
          endAt: 1578511352000,
          stage: 2,
          startAt: 1578511292000
        },
        {
          endAt: 1578511412000,
          stage: 2,
          startAt: 1578511352000
        },
        {
          endAt: 1578511469000,
          stage: 2,
          startAt: 1578511412000
        },
        {
          endAt: 1578511529000,
          stage: 2,
          startAt: 1578511469000
        },
        {
          endAt: 1578511589000,
          stage: 2,
          startAt: 1578511529000
        },
        {
          endAt: 1578511649000,
          stage: 2,
          startAt: 1578511589000
        },
        {
          endAt: 1578511709000,
          stage: 2,
          startAt: 1578511649000
        },
        {
          endAt: 1578511778000,
          stage: 2,
          startAt: 1578511709000
        },
        {
          endAt: 1578511838000,
          stage: 2,
          startAt: 1578511778000
        },
        {
          endAt: 1578511898000,
          stage: 2,
          startAt: 1578511838000
        },
        {
          endAt: 1578511958000,
          stage: 2,
          startAt: 1578511898000
        },
        {
          endAt: 1578512018000,
          stage: 2,
          startAt: 1578511958000
        },
        {
          endAt: 1578512073000,
          stage: 2,
          startAt: 1578512018000
        },
        {
          endAt: 1578512133000,
          stage: 2,
          startAt: 1578512073000
        },
        {
          endAt: 1578512193000,
          stage: 2,
          startAt: 1578512133000
        },
        {
          endAt: 1578512253000,
          stage: 2,
          startAt: 1578512193000
        },
        {
          endAt: 1578512313000,
          stage: 2,
          startAt: 1578512253000
        },
        {
          endAt: 1578512368000,
          stage: 2,
          startAt: 1578512313000
        },
        {
          endAt: 1578512428000,
          stage: 2,
          startAt: 1578512368000
        },
        {
          endAt: 1578512488000,
          stage: 2,
          startAt: 1578512428000
        },
        {
          endAt: 1578512548000,
          stage: 2,
          startAt: 1578512488000
        },
        {
          endAt: 1578512608000,
          stage: 2,
          startAt: 1578512548000
        },
        {
          endAt: 1578512676000,
          stage: 2,
          startAt: 1578512608000
        },
        {
          endAt: 1578512736000,
          stage: 2,
          startAt: 1578512676000
        },
        {
          endAt: 1578512796000,
          stage: 2,
          startAt: 1578512736000
        },
        {
          endAt: 1578512856000,
          stage: 2,
          startAt: 1578512796000
        },
        {
          endAt: 1578512916000,
          stage: 2,
          startAt: 1578512856000
        },
        {
          endAt: 1578512972000,
          stage: 2,
          startAt: 1578512916000
        },
        {
          endAt: 1578513032000,
          stage: 2,
          startAt: 1578512972000
        },
        {
          endAt: 1578513092000,
          stage: 2,
          startAt: 1578513032000
        },
        {
          endAt: 1578513152000,
          stage: 2,
          startAt: 1578513092000
        },
        {
          endAt: 1578513212000,
          stage: 2,
          startAt: 1578513152000
        },
        {
          endAt: 1578513268000,
          stage: 2,
          startAt: 1578513212000
        },
        {
          endAt: 1578513328000,
          stage: 2,
          startAt: 1578513268000
        },
        {
          endAt: 1578513388000,
          stage: 2,
          startAt: 1578513328000
        },
        {
          endAt: 1578513448000,
          stage: 3,
          startAt: 1578513388000
        },
        {
          endAt: 1578513508000,
          stage: 3,
          startAt: 1578513448000
        },
        {
          endAt: 1578513577000,
          stage: 3,
          startAt: 1578513508000
        },
        {
          endAt: 1578513637000,
          stage: 3,
          startAt: 1578513577000
        },
        {
          endAt: 1578513697000,
          stage: 3,
          startAt: 1578513637000
        },
        {
          endAt: 1578513757000,
          stage: 3,
          startAt: 1578513697000
        },
        {
          endAt: 1578513817000,
          stage: 3,
          startAt: 1578513757000
        },
        {
          endAt: 1578513872000,
          stage: 3,
          startAt: 1578513817000
        },
        {
          endAt: 1578513932000,
          stage: 3,
          startAt: 1578513872000
        },
        {
          endAt: 1578513992000,
          stage: 3,
          startAt: 1578513932000
        },
        {
          endAt: 1578514052000,
          stage: 3,
          startAt: 1578513992000
        },
        {
          endAt: 1578514112000,
          stage: 3,
          startAt: 1578514052000
        },
        {
          endAt: 1578514168000,
          stage: 3,
          startAt: 1578514112000
        },
        {
          endAt: 1578514228000,
          stage: 3,
          startAt: 1578514168000
        },
        {
          endAt: 1578514288000,
          stage: 3,
          startAt: 1578514228000
        },
        {
          endAt: 1578514348000,
          stage: 5,
          startAt: 1578514288000
        },
        {
          endAt: 1578514408000,
          stage: 5,
          startAt: 1578514348000
        },
        {
          endAt: 1578514476000,
          stage: 5,
          startAt: 1578514408000
        },
        {
          endAt: 1578514536000,
          stage: 5,
          startAt: 1578514476000
        },
        {
          endAt: 1578514596000,
          stage: 5,
          startAt: 1578514536000
        },
        {
          endAt: 1578514656000,
          stage: 5,
          startAt: 1578514596000
        },
        {
          endAt: 1578514716000,
          stage: 5,
          startAt: 1578514656000
        },
        {
          endAt: 1578514770000,
          stage: 5,
          startAt: 1578514716000
        },
        {
          endAt: 1578514830000,
          stage: 5,
          startAt: 1578514770000
        },
        {
          endAt: 1578514890000,
          stage: 5,
          startAt: 1578514830000
        },
        {
          endAt: 1578514950000,
          stage: 5,
          startAt: 1578514890000
        },
        {
          endAt: 1578515010000,
          stage: 5,
          startAt: 1578514950000
        },
        {
          endAt: 1578515067000,
          stage: 5,
          startAt: 1578515010000
        },
        {
          endAt: 1578515127000,
          stage: 5,
          startAt: 1578515067000
        },
        {
          endAt: 1578515187000,
          stage: 5,
          startAt: 1578515127000
        },
        {
          endAt: 1578515247000,
          stage: 5,
          startAt: 1578515187000
        },
        {
          endAt: 1578515307000,
          stage: 5,
          startAt: 1578515247000
        },
        {
          endAt: 1578515375000,
          stage: 5,
          startAt: 1578515307000
        },
        {
          endAt: 1578515435000,
          stage: 5,
          startAt: 1578515375000
        },
        {
          endAt: 1578515495000,
          stage: 5,
          startAt: 1578515435000
        },
        {
          endAt: 1578515555000,
          stage: 5,
          startAt: 1578515495000
        },
        {
          endAt: 1578515615000,
          stage: 3,
          startAt: 1578515555000
        },
        {
          endAt: 1578515670000,
          stage: 3,
          startAt: 1578515615000
        },
        {
          endAt: 1578515730000,
          stage: 3,
          startAt: 1578515670000
        },
        {
          endAt: 1578515790000,
          stage: 3,
          startAt: 1578515730000
        },
        {
          endAt: 1578515850000,
          stage: 3,
          startAt: 1578515790000
        },
        {
          endAt: 1578515910000,
          stage: 2,
          startAt: 1578515850000
        },
        {
          endAt: 1578515979000,
          stage: 2,
          startAt: 1578515910000
        },
        {
          endAt: 1578516039000,
          stage: 2,
          startAt: 1578515979000
        },
        {
          endAt: 1578516099000,
          stage: 2,
          startAt: 1578516039000
        },
        {
          endAt: 1578516159000,
          stage: 2,
          startAt: 1578516099000
        },
        {
          endAt: 1578516219000,
          stage: 2,
          startAt: 1578516159000
        },
        {
          endAt: 1578516273000,
          stage: 2,
          startAt: 1578516219000
        },
        {
          endAt: 1578516333000,
          stage: 2,
          startAt: 1578516273000
        },
        {
          endAt: 1578516393000,
          stage: 2,
          startAt: 1578516333000
        },
        {
          endAt: 1578516453000,
          stage: 2,
          startAt: 1578516393000
        },
        {
          endAt: 1578516513000,
          stage: 2,
          startAt: 1578516453000
        },
        {
          endAt: 1578516569000,
          stage: 2,
          startAt: 1578516513000
        },
        {
          endAt: 1578516629000,
          stage: 2,
          startAt: 1578516569000
        },
        {
          endAt: 1578516689000,
          stage: 2,
          startAt: 1578516629000
        },
        {
          endAt: 1578516749000,
          stage: 2,
          startAt: 1578516689000
        },
        {
          endAt: 1578516809000,
          stage: 2,
          startAt: 1578516749000
        },
        {
          endAt: 1578516877000,
          stage: 2,
          startAt: 1578516809000
        },
        {
          endAt: 1578516937000,
          stage: 2,
          startAt: 1578516877000
        },
        {
          endAt: 1578516997000,
          stage: 2,
          startAt: 1578516937000
        },
        {
          endAt: 1578517057000,
          stage: 2,
          startAt: 1578516997000
        },
        {
          endAt: 1578517117000,
          stage: 2,
          startAt: 1578517057000
        },
        {
          endAt: 1578517171000,
          stage: 2,
          startAt: 1578517117000
        },
        {
          endAt: 1578517231000,
          stage: 2,
          startAt: 1578517171000
        },
        {
          endAt: 1578517291000,
          stage: 2,
          startAt: 1578517231000
        },
        {
          endAt: 1578517351000,
          stage: 2,
          startAt: 1578517291000
        },
        {
          endAt: 1578517411000,
          stage: 2,
          startAt: 1578517351000
        },
        {
          endAt: 1578517466000,
          stage: 2,
          startAt: 1578517411000
        },
        {
          endAt: 1578517526000,
          stage: 3,
          startAt: 1578517466000
        },
        {
          endAt: 1578517586000,
          stage: 3,
          startAt: 1578517526000
        },
        {
          endAt: 1578517646000,
          stage: 3,
          startAt: 1578517586000
        },
        {
          endAt: 1578517706000,
          stage: 3,
          startAt: 1578517646000
        },
        {
          endAt: 1578517775000,
          stage: 3,
          startAt: 1578517706000
        },
        {
          endAt: 1578517835000,
          stage: 3,
          startAt: 1578517775000
        },
        {
          endAt: 1578517895000,
          stage: 3,
          startAt: 1578517835000
        },
        {
          endAt: 1578517955000,
          stage: 3,
          startAt: 1578517895000
        },
        {
          endAt: 1578518015000,
          stage: 3,
          startAt: 1578517955000
        },
        {
          endAt: 1578518070000,
          stage: 3,
          startAt: 1578518015000
        },
        {
          endAt: 1578518130000,
          stage: 3,
          startAt: 1578518070000
        },
        {
          endAt: 1578518190000,
          stage: 3,
          startAt: 1578518130000
        },
        {
          endAt: 1578518250000,
          stage: 3,
          startAt: 1578518190000
        },
        {
          endAt: 1578518310000,
          stage: 3,
          startAt: 1578518250000
        },
        {
          endAt: 1578518377000,
          stage: 3,
          startAt: 1578518310000
        },
        {
          endAt: 1578518437000,
          stage: 3,
          startAt: 1578518377000
        },
        {
          endAt: 1578518497000,
          stage: 3,
          startAt: 1578518437000
        },
        {
          endAt: 1578518557000,
          stage: 3,
          startAt: 1578518497000
        },
        {
          endAt: 1578518617000,
          stage: 3,
          startAt: 1578518557000
        },
        {
          endAt: 1578518673000,
          stage: 3,
          startAt: 1578518617000
        },
        {
          endAt: 1578518733000,
          stage: 1,
          startAt: 1578518673000
        },
        {
          endAt: 1578518793000,
          stage: 1,
          startAt: 1578518733000
        },
        {
          endAt: 1578518853000,
          stage: 1,
          startAt: 1578518793000
        },
        {
          endAt: 1578518913000,
          stage: 1,
          startAt: 1578518853000
        },
        {
          endAt: 1578518969000,
          stage: 1,
          startAt: 1578518913000
        },
        {
          endAt: 1578519029000,
          stage: 3,
          startAt: 1578518969000
        },
        {
          endAt: 1578519089000,
          stage: 3,
          startAt: 1578519029000
        },
        {
          endAt: 1578519149000,
          stage: 3,
          startAt: 1578519089000
        },
        {
          endAt: 1578519209000,
          stage: 3,
          startAt: 1578519149000
        },
        {
          endAt: 1578519277000,
          stage: 3,
          startAt: 1578519209000
        },
        {
          endAt: 1578519337000,
          stage: 3,
          startAt: 1578519277000
        },
        {
          endAt: 1578519397000,
          stage: 3,
          startAt: 1578519337000
        },
        {
          endAt: 1578519457000,
          stage: 3,
          startAt: 1578519397000
        },
        {
          endAt: 1578519517000,
          stage: 3,
          startAt: 1578519457000
        },
        {
          endAt: 1578519572000,
          stage: 3,
          startAt: 1578519517000
        },
        {
          endAt: 1578519632000,
          stage: 3,
          startAt: 1578519572000
        },
        {
          endAt: 1578519692000,
          stage: 3,
          startAt: 1578519632000
        },
        {
          endAt: 1578519752000,
          stage: 3,
          startAt: 1578519692000
        },
        {
          endAt: 1578519812000,
          stage: 0,
          startAt: 1578519752000
        },
        {
          endAt: 1578519868000,
          stage: 0,
          startAt: 1578519812000
        },
        {
          endAt: 1578519928000,
          stage: 0,
          startAt: 1578519868000
        },
        {
          endAt: 1578519988000,
          stage: 0,
          startAt: 1578519928000
        },
        {
          endAt: 1578520048000,
          stage: 0,
          startAt: 1578519988000
        },
        {
          endAt: 1578520108000,
          stage: 0,
          startAt: 1578520048000
        },
        {
          endAt: 1578520175000,
          stage: 0,
          startAt: 1578520108000
        },
        {
          endAt: 1578520235000,
          stage: 0,
          startAt: 1578520175000
        },
        {
          endAt: 1578520295000,
          stage: 0,
          startAt: 1578520235000
        },
        {
          endAt: 1578520355000,
          stage: 0,
          startAt: 1578520295000
        },
        {
          endAt: 1578520415000,
          stage: 0,
          startAt: 1578520355000
        },
        {
          endAt: 1578520470000,
          stage: 0,
          startAt: 1578520415000
        },
        {
          endAt: 1578520530000,
          stage: 0,
          startAt: 1578520470000
        },
        {
          endAt: 1578520590000,
          stage: 0,
          startAt: 1578520530000
        },
        {
          endAt: 1578520650000,
          stage: 0,
          startAt: 1578520590000
        },
        {
          endAt: 1578520710000,
          stage: 0,
          startAt: 1578520650000
        },
        {
          stage: 0,
          startAt: 1578520710000
        }
      ],
      attrs: [
        // id 13 自己加上去的
        {
          healthResultAttr: {
            alias: '平均心率',
            id: 13,
            name: 'heart_beat_average',
            show: true,
            valueType: 0
          },
          value: '60'
        },
        {
          healthResultAttr: {
            valueType: 3,
            alias: '呼吸率时序图',
            id: 74,
            healthResultAttrMappers: [],
            orderNo: 1,
            show: true,
            name: 'breathTimeLog'
          },
          value:
            '{"labels":["2020-01-08 19:59:39","2020-01-08 20:00:39","2020-01-08 20:01:39","2020-01-08 20:02:39","2020-01-08 20:03:39","2020-01-08 20:04:36","2020-01-08 20:05:36","2020-01-08 20:06:36","2020-01-08 20:07:36","2020-01-08 20:08:36","2020-01-08 20:09:32","2020-01-08 20:10:32","2020-01-08 20:11:32","2020-01-08 20:12:32","2020-01-08 20:13:32","2020-01-08 20:14:40","2020-01-08 20:15:40","2020-01-08 20:16:40","2020-01-08 20:17:40","2020-01-08 20:18:40","2020-01-08 20:19:36","2020-01-08 20:20:36","2020-01-08 20:21:36","2020-01-08 20:22:36","2020-01-08 20:23:36","2020-01-08 20:24:31","2020-01-08 20:25:31","2020-01-08 20:26:31","2020-01-08 20:27:31","2020-01-08 20:28:31","2020-01-08 20:29:39","2020-01-08 20:30:39","2020-01-08 20:31:39","2020-01-08 20:32:39","2020-01-08 20:33:39","2020-01-08 20:34:35","2020-01-08 20:35:35","2020-01-08 20:36:35","2020-01-08 20:37:35","2020-01-08 20:38:35","2020-01-08 20:39:30","2020-01-08 20:40:30","2020-01-08 20:41:30","2020-01-08 20:42:30","2020-01-08 20:43:30","2020-01-08 20:44:38","2020-01-08 20:45:38","2020-01-08 20:46:38","2020-01-08 20:47:38","2020-01-08 20:48:38","2020-01-08 20:49:34","2020-01-08 20:50:34","2020-01-08 20:51:34","2020-01-08 20:52:34","2020-01-08 20:53:34","2020-01-08 20:54:31","2020-01-08 20:55:31","2020-01-08 20:56:31","2020-01-08 20:57:31","2020-01-08 20:58:31","2020-01-08 20:59:38","2020-01-08 21:00:38","2020-01-08 21:01:38","2020-01-08 21:02:38","2020-01-08 21:03:38","2020-01-08 21:04:34","2020-01-08 21:05:34","2020-01-08 21:06:34","2020-01-08 21:07:34","2020-01-08 21:08:34","2020-01-08 21:09:29","2020-01-08 21:10:29","2020-01-08 21:11:29","2020-01-08 21:12:29","2020-01-08 21:13:29","2020-01-08 21:14:39","2020-01-08 21:15:39","2020-01-08 21:16:39","2020-01-08 21:17:39","2020-01-08 21:18:39","2020-01-08 21:19:34","2020-01-08 21:20:34","2020-01-08 21:21:34","2020-01-08 21:22:34","2020-01-08 21:23:34","2020-01-08 21:24:31","2020-01-08 21:25:31","2020-01-08 21:26:31","2020-01-08 21:27:31","2020-01-08 21:28:31","2020-01-08 21:29:40","2020-01-08 21:30:40","2020-01-08 21:31:40","2020-01-08 21:32:40","2020-01-08 21:33:40","2020-01-08 21:34:36","2020-01-08 21:35:36","2020-01-08 21:36:36","2020-01-08 21:37:36","2020-01-08 21:38:36","2020-01-08 21:39:31","2020-01-08 21:40:31","2020-01-08 21:41:31","2020-01-08 21:42:31","2020-01-08 21:43:31","2020-01-08 21:44:29","2020-01-08 21:45:29","2020-01-08 21:46:29","2020-01-08 21:47:29","2020-01-08 21:48:29","2020-01-08 21:49:37","2020-01-08 21:50:37","2020-01-08 21:51:37","2020-01-08 21:52:37","2020-01-08 21:53:37","2020-01-08 21:54:33","2020-01-08 21:55:33","2020-01-08 21:56:33","2020-01-08 21:57:33","2020-01-08 21:58:33","2020-01-08 21:59:30","2020-01-08 22:00:30","2020-01-08 22:01:30","2020-01-08 22:02:30","2020-01-08 22:03:30","2020-01-08 22:04:38","2020-01-08 22:05:38","2020-01-08 22:06:38","2020-01-08 22:07:38","2020-01-08 22:08:38","2020-01-08 22:09:35","2020-01-08 22:10:35","2020-01-08 22:11:35","2020-01-08 22:12:35","2020-01-08 22:13:35","2020-01-08 22:14:30","2020-01-08 22:15:30","2020-01-08 22:16:30","2020-01-08 22:17:30","2020-01-08 22:18:30","2020-01-08 22:19:40","2020-01-08 22:20:40","2020-01-08 22:21:40","2020-01-08 22:22:40","2020-01-08 22:23:40","2020-01-08 22:24:35","2020-01-08 22:25:35","2020-01-08 22:26:35","2020-01-08 22:27:35","2020-01-08 22:28:35","2020-01-08 22:29:32","2020-01-08 22:30:32","2020-01-08 22:31:32","2020-01-08 22:32:32","2020-01-08 22:33:32","2020-01-08 22:34:28","2020-01-08 22:35:28","2020-01-08 22:36:28","2020-01-08 22:37:28","2020-01-08 22:38:28","2020-01-08 22:39:36","2020-01-08 22:40:36","2020-01-08 22:41:36","2020-01-08 22:42:36","2020-01-08 22:43:36","2020-01-08 22:44:33","2020-01-08 22:45:33","2020-01-08 22:46:33","2020-01-08 22:47:33","2020-01-08 22:48:33","2020-01-08 22:49:29","2020-01-08 22:50:29","2020-01-08 22:51:29","2020-01-08 22:52:29","2020-01-08 22:53:29","2020-01-08 22:54:36","2020-01-08 22:55:36","2020-01-08 22:56:36","2020-01-08 22:57:36","2020-01-08 22:58:36","2020-01-08 22:59:32","2020-01-08 23:00:32","2020-01-08 23:01:32","2020-01-08 23:02:32","2020-01-08 23:03:32","2020-01-08 23:04:27","2020-01-08 23:05:27","2020-01-08 23:06:27","2020-01-08 23:07:27","2020-01-08 23:08:27","2020-01-08 23:09:35","2020-01-08 23:10:35","2020-01-08 23:11:35","2020-01-08 23:12:35","2020-01-08 23:13:35","2020-01-08 23:14:31","2020-01-08 23:15:31","2020-01-08 23:16:31","2020-01-08 23:17:31","2020-01-08 23:18:31","2020-01-08 23:19:39","2020-01-08 23:20:39","2020-01-08 23:21:39","2020-01-08 23:22:39","2020-01-08 23:23:39","2020-01-08 23:24:33","2020-01-08 23:25:33","2020-01-08 23:26:33","2020-01-08 23:27:33","2020-01-08 23:28:33","2020-01-08 23:29:29","2020-01-08 23:30:29","2020-01-08 23:31:29","2020-01-08 23:32:29","2020-01-08 23:33:29","2020-01-08 23:34:38","2020-01-08 23:35:38","2020-01-08 23:36:38","2020-01-08 23:37:38","2020-01-08 23:38:38","2020-01-08 23:39:33","2020-01-08 23:40:33","2020-01-08 23:41:33","2020-01-08 23:42:33","2020-01-08 23:43:33","2020-01-08 23:44:28","2020-01-08 23:45:28","2020-01-08 23:46:28","2020-01-08 23:47:28","2020-01-08 23:48:28","2020-01-08 23:49:36","2020-01-08 23:50:36","2020-01-08 23:51:36","2020-01-08 23:52:36","2020-01-08 23:53:36","2020-01-08 23:54:31","2020-01-08 23:55:31","2020-01-08 23:56:31","2020-01-08 23:57:31","2020-01-08 23:58:31","2020-01-08 23:59:39","2020-01-09 00:00:39","2020-01-09 00:01:39","2020-01-09 00:02:39","2020-01-09 00:03:39","2020-01-09 00:04:34","2020-01-09 00:05:34","2020-01-09 00:06:34","2020-01-09 00:07:34","2020-01-09 00:08:34","2020-01-09 00:09:28","2020-01-09 00:10:28","2020-01-09 00:11:28","2020-01-09 00:12:28","2020-01-09 00:13:28","2020-01-09 00:14:36","2020-01-09 00:15:36","2020-01-09 00:16:36","2020-01-09 00:17:36","2020-01-09 00:18:36","2020-01-09 00:19:31","2020-01-09 00:20:31","2020-01-09 00:21:31","2020-01-09 00:22:31","2020-01-09 00:23:31","2020-01-09 00:24:28","2020-01-09 00:25:28","2020-01-09 00:26:28","2020-01-09 00:27:28","2020-01-09 00:28:28","2020-01-09 00:29:35","2020-01-09 00:30:35","2020-01-09 00:31:35","2020-01-09 00:32:35","2020-01-09 00:33:35","2020-01-09 00:34:30","2020-01-09 00:35:30","2020-01-09 00:36:30","2020-01-09 00:37:30","2020-01-09 00:38:30","2020-01-09 00:39:36","2020-01-09 00:40:36","2020-01-09 00:41:36","2020-01-09 00:42:36","2020-01-09 00:43:36","2020-01-09 00:44:31","2020-01-09 00:45:31","2020-01-09 00:46:31","2020-01-09 00:47:31","2020-01-09 00:48:31","2020-01-09 00:49:38","2020-01-09 00:50:38","2020-01-09 00:51:38","2020-01-09 00:52:38","2020-01-09 00:53:38","2020-01-09 00:54:33","2020-01-09 00:55:33","2020-01-09 00:56:33","2020-01-09 00:57:33","2020-01-09 00:58:33","2020-01-09 00:59:28","2020-01-09 01:00:28","2020-01-09 01:01:28","2020-01-09 01:02:28","2020-01-09 01:03:28","2020-01-09 01:04:35","2020-01-09 01:05:35","2020-01-09 01:06:35","2020-01-09 01:07:35","2020-01-09 01:08:35","2020-01-09 01:09:30","2020-01-09 01:10:30","2020-01-09 01:11:30","2020-01-09 01:12:30","2020-01-09 01:13:30","2020-01-09 01:14:37","2020-01-09 01:15:37","2020-01-09 01:16:37","2020-01-09 01:17:37","2020-01-09 01:18:37","2020-01-09 01:19:32","2020-01-09 01:20:32","2020-01-09 01:21:32","2020-01-09 01:22:32","2020-01-09 01:23:32","2020-01-09 01:24:27","2020-01-09 01:25:27","2020-01-09 01:26:27","2020-01-09 01:27:27","2020-01-09 01:28:27","2020-01-09 01:29:35","2020-01-09 01:30:35","2020-01-09 01:31:35","2020-01-09 01:32:35","2020-01-09 01:33:35","2020-01-09 01:34:29","2020-01-09 01:35:29","2020-01-09 01:36:29","2020-01-09 01:37:29","2020-01-09 01:38:29","2020-01-09 01:39:38","2020-01-09 01:40:38","2020-01-09 01:41:38","2020-01-09 01:42:38","2020-01-09 01:43:38","2020-01-09 01:44:34","2020-01-09 01:45:34","2020-01-09 01:46:34","2020-01-09 01:47:34","2020-01-09 01:48:34","2020-01-09 01:49:29","2020-01-09 01:50:29","2020-01-09 01:51:29","2020-01-09 01:52:29","2020-01-09 01:53:29","2020-01-09 01:54:37","2020-01-09 01:55:37","2020-01-09 01:56:37","2020-01-09 01:57:37","2020-01-09 01:58:37","2020-01-09 01:59:32","2020-01-09 02:00:32","2020-01-09 02:01:32","2020-01-09 02:02:32","2020-01-09 02:03:32","2020-01-09 02:04:28","2020-01-09 02:05:28","2020-01-09 02:06:28","2020-01-09 02:07:28","2020-01-09 02:08:28","2020-01-09 02:09:36","2020-01-09 02:10:36","2020-01-09 02:11:36","2020-01-09 02:12:36","2020-01-09 02:13:36","2020-01-09 02:14:31","2020-01-09 02:15:31","2020-01-09 02:16:31","2020-01-09 02:17:31","2020-01-09 02:18:31","2020-01-09 02:19:39","2020-01-09 02:20:39","2020-01-09 02:21:39","2020-01-09 02:22:39","2020-01-09 02:23:39","2020-01-09 02:24:33","2020-01-09 02:25:33","2020-01-09 02:26:33","2020-01-09 02:27:33","2020-01-09 02:28:33","2020-01-09 02:29:29","2020-01-09 02:30:29","2020-01-09 02:31:29","2020-01-09 02:32:29","2020-01-09 02:33:29","2020-01-09 02:34:37","2020-01-09 02:35:37","2020-01-09 02:36:37","2020-01-09 02:37:37","2020-01-09 02:38:37","2020-01-09 02:39:33","2020-01-09 02:40:33","2020-01-09 02:41:33","2020-01-09 02:42:33","2020-01-09 02:43:33","2020-01-09 02:44:28","2020-01-09 02:45:28","2020-01-09 02:46:28","2020-01-09 02:47:28","2020-01-09 02:48:28","2020-01-09 02:49:36","2020-01-09 02:50:36","2020-01-09 02:51:36","2020-01-09 02:52:36","2020-01-09 02:53:36","2020-01-09 02:54:32","2020-01-09 02:55:32","2020-01-09 02:56:32","2020-01-09 02:57:32","2020-01-09 02:58:32","2020-01-09 02:59:27","2020-01-09 03:00:27","2020-01-09 03:01:27","2020-01-09 03:02:27","2020-01-09 03:03:27","2020-01-09 03:04:35","2020-01-09 03:05:35","2020-01-09 03:06:35","2020-01-09 03:07:35","2020-01-09 03:08:35","2020-01-09 03:09:30","2020-01-09 03:10:30","2020-01-09 03:11:30","2020-01-09 03:12:30","2020-01-09 03:13:30","2020-01-09 03:14:38","2020-01-09 03:15:38","2020-01-09 03:16:38","2020-01-09 03:17:38","2020-01-09 03:18:38","2020-01-09 03:19:32","2020-01-09 03:20:32","2020-01-09 03:21:32","2020-01-09 03:22:32","2020-01-09 03:23:32","2020-01-09 03:24:29","2020-01-09 03:25:29","2020-01-09 03:26:29","2020-01-09 03:27:29","2020-01-09 03:28:29","2020-01-09 03:29:38","2020-01-09 03:30:38","2020-01-09 03:31:38","2020-01-09 03:32:38","2020-01-09 03:33:38","2020-01-09 03:34:33","2020-01-09 03:35:33","2020-01-09 03:36:33","2020-01-09 03:37:33","2020-01-09 03:38:33","2020-01-09 03:39:28","2020-01-09 03:40:28","2020-01-09 03:41:28","2020-01-09 03:42:28","2020-01-09 03:43:28","2020-01-09 03:44:36","2020-01-09 03:45:36","2020-01-09 03:46:36","2020-01-09 03:47:36","2020-01-09 03:48:36","2020-01-09 03:49:32","2020-01-09 03:50:32","2020-01-09 03:51:32","2020-01-09 03:52:32","2020-01-09 03:53:32","2020-01-09 03:54:28","2020-01-09 03:55:28","2020-01-09 03:56:28","2020-01-09 03:57:28","2020-01-09 03:58:28","2020-01-09 03:59:37","2020-01-09 04:00:37","2020-01-09 04:01:37","2020-01-09 04:02:37","2020-01-09 04:03:37","2020-01-09 04:04:32","2020-01-09 04:05:32","2020-01-09 04:06:32","2020-01-09 04:07:32","2020-01-09 04:08:32","2020-01-09 04:09:28","2020-01-09 04:10:28","2020-01-09 04:11:28","2020-01-09 04:12:28","2020-01-09 04:13:28","2020-01-09 04:14:36","2020-01-09 04:15:36","2020-01-09 04:16:36","2020-01-09 04:17:36","2020-01-09 04:18:36","2020-01-09 04:19:30","2020-01-09 04:20:30","2020-01-09 04:21:30","2020-01-09 04:22:30","2020-01-09 04:23:30","2020-01-09 04:24:27","2020-01-09 04:25:27","2020-01-09 04:26:27","2020-01-09 04:27:27","2020-01-09 04:28:27","2020-01-09 04:29:35","2020-01-09 04:30:35","2020-01-09 04:31:35","2020-01-09 04:32:35","2020-01-09 04:33:35","2020-01-09 04:34:30","2020-01-09 04:35:30","2020-01-09 04:36:30","2020-01-09 04:37:30","2020-01-09 04:38:30","2020-01-09 04:39:39","2020-01-09 04:40:39","2020-01-09 04:41:39","2020-01-09 04:42:39","2020-01-09 04:43:39","2020-01-09 04:44:33","2020-01-09 04:45:33","2020-01-09 04:46:33","2020-01-09 04:47:33","2020-01-09 04:48:33","2020-01-09 04:49:29","2020-01-09 04:50:29","2020-01-09 04:51:29","2020-01-09 04:52:29","2020-01-09 04:53:29","2020-01-09 04:54:37","2020-01-09 04:55:37","2020-01-09 04:56:37","2020-01-09 04:57:37","2020-01-09 04:58:37","2020-01-09 04:59:31","2020-01-09 05:00:31","2020-01-09 05:01:31","2020-01-09 05:02:31","2020-01-09 05:03:31","2020-01-09 05:04:26","2020-01-09 05:05:26","2020-01-09 05:06:26","2020-01-09 05:07:26","2020-01-09 05:08:26","2020-01-09 05:09:35","2020-01-09 05:10:35","2020-01-09 05:11:35","2020-01-09 05:12:35","2020-01-09 05:13:35","2020-01-09 05:14:30","2020-01-09 05:15:30","2020-01-09 05:16:30","2020-01-09 05:17:30","2020-01-09 05:18:30","2020-01-09 05:19:37","2020-01-09 05:20:37","2020-01-09 05:21:37","2020-01-09 05:22:37","2020-01-09 05:23:37","2020-01-09 05:24:33","2020-01-09 05:25:33","2020-01-09 05:26:33","2020-01-09 05:27:33","2020-01-09 05:28:33","2020-01-09 05:29:29","2020-01-09 05:30:29","2020-01-09 05:31:29","2020-01-09 05:32:29","2020-01-09 05:33:29","2020-01-09 05:34:37","2020-01-09 05:35:37","2020-01-09 05:36:37","2020-01-09 05:37:37","2020-01-09 05:38:37","2020-01-09 05:39:32","2020-01-09 05:40:32","2020-01-09 05:41:32","2020-01-09 05:42:32","2020-01-09 05:43:32","2020-01-09 05:44:28","2020-01-09 05:45:28","2020-01-09 05:46:28","2020-01-09 05:47:28","2020-01-09 05:48:28","2020-01-09 05:49:35","2020-01-09 05:50:35","2020-01-09 05:51:35","2020-01-09 05:52:35","2020-01-09 05:53:35","2020-01-09 05:54:30","2020-01-09 05:55:30","2020-01-09 05:56:30","2020-01-09 05:57:30","2020-01-09 05:58:30","2020-01-09 05:59:39","2020-01-09 06:00:39","2020-01-09 06:01:39","2020-01-09 06:02:39","2020-01-09 06:03:39","2020-01-09 06:04:34","2020-01-09 06:05:34","2020-01-09 06:06:34","2020-01-09 06:07:34","2020-01-09 06:08:34","2020-01-09 06:09:28","2020-01-09 06:10:28","2020-01-09 06:11:28","2020-01-09 06:12:28","2020-01-09 06:13:28","2020-01-09 06:14:35","2020-01-09 06:15:35","2020-01-09 06:16:35","2020-01-09 06:17:35","2020-01-09 06:18:35","2020-01-09 06:19:30","2020-01-09 06:20:30","2020-01-09 06:21:30","2020-01-09 06:22:30","2020-01-09 06:23:30","2020-01-09 06:24:37","2020-01-09 06:25:37","2020-01-09 06:26:37","2020-01-09 06:27:37","2020-01-09 06:28:37","2020-01-09 06:29:32","2020-01-09 06:30:32","2020-01-09 06:31:32","2020-01-09 06:32:32","2020-01-09 06:33:32","2020-01-09 06:34:26","2020-01-09 06:35:26","2020-01-09 06:36:26","2020-01-09 06:37:26","2020-01-09 06:38:26","2020-01-09 06:39:33","2020-01-09 06:40:33","2020-01-09 06:41:33","2020-01-09 06:42:33","2020-01-09 06:43:33","2020-01-09 06:44:28","2020-01-09 06:45:28","2020-01-09 06:46:28","2020-01-09 06:47:28","2020-01-09 06:48:28","2020-01-09 06:49:36","2020-01-09 06:50:36","2020-01-09 06:51:36","2020-01-09 06:52:36","2020-01-09 06:53:36","2020-01-09 06:54:31","2020-01-09 06:55:31","2020-01-09 06:56:31","2020-01-09 06:57:31","2020-01-09 06:58:31","2020-01-09 06:59:37","2020-01-09 07:00:37","2020-01-09 07:01:37","2020-01-09 07:02:37","2020-01-09 07:03:37","2020-01-09 07:04:32","2020-01-09 07:05:32","2020-01-09 07:06:32","2020-01-09 07:07:32","2020-01-09 07:08:32","2020-01-09 07:09:27","2020-01-09 07:10:27","2020-01-09 07:11:27","2020-01-09 07:12:27","2020-01-09 07:13:27","2020-01-09 07:14:34","2020-01-09 07:15:34","2020-01-09 07:16:34","2020-01-09 07:17:34","2020-01-09 07:18:34","2020-01-09 07:19:28","2020-01-09 07:20:28","2020-01-09 07:21:28","2020-01-09 07:22:28","2020-01-09 07:23:28","2020-01-09 07:24:36","2020-01-09 07:25:36","2020-01-09 07:26:36","2020-01-09 07:27:36","2020-01-09 07:28:36","2020-01-09 07:29:30","2020-01-09 07:30:30","2020-01-09 07:31:30","2020-01-09 07:32:30","2020-01-09 07:33:30","2020-01-09 07:34:39","2020-01-09 07:35:39","2020-01-09 07:36:39","2020-01-09 07:37:39","2020-01-09 07:38:39","2020-01-09 07:39:33","2020-01-09 07:40:33","2020-01-09 07:41:33","2020-01-09 07:42:33","2020-01-09 07:43:33","2020-01-09 07:44:29","2020-01-09 07:45:29","2020-01-09 07:46:29","2020-01-09 07:47:29","2020-01-09 07:48:29","2020-01-09 07:49:36","2020-01-09 07:50:36","2020-01-09 07:51:36","2020-01-09 07:52:36","2020-01-09 07:53:36","2020-01-09 07:54:33","2020-01-09 07:55:33","2020-01-09 07:56:33","2020-01-09 07:57:33","2020-01-09 07:58:33","2020-01-09 07:59:28","2020-01-09 08:00:28","2020-01-09 08:01:28","2020-01-09 08:02:28","2020-01-09 08:03:28","2020-01-09 08:04:36","2020-01-09 08:05:36","2020-01-09 08:06:36","2020-01-09 08:07:36","2020-01-09 08:08:36","2020-01-09 08:09:31","2020-01-09 08:10:31","2020-01-09 08:11:31","2020-01-09 08:12:31","2020-01-09 08:13:31","2020-01-09 08:14:27","2020-01-09 08:15:27","2020-01-09 08:16:27","2020-01-09 08:17:27","2020-01-09 08:18:27","2020-01-09 08:19:36","2020-01-09 08:20:36","2020-01-09 08:21:36","2020-01-09 08:22:36","2020-01-09 08:23:36","2020-01-09 08:24:31","2020-01-09 08:25:31","2020-01-09 08:26:31","2020-01-09 08:27:31","2020-01-09 08:28:31","2020-01-09 08:29:26","2020-01-09 08:30:26","2020-01-09 08:31:26","2020-01-09 08:32:26","2020-01-09 08:33:26","2020-01-09 08:34:34","2020-01-09 08:35:34","2020-01-09 08:36:34","2020-01-09 08:37:34","2020-01-09 08:38:34","2020-01-09 08:39:29","2020-01-09 08:40:29","2020-01-09 08:41:29","2020-01-09 08:42:29","2020-01-09 08:43:29","2020-01-09 08:44:26","2020-01-09 08:45:26","2020-01-09 08:46:26","2020-01-09 08:47:26","2020-01-09 08:48:26","2020-01-09 08:49:35","2020-01-09 08:50:35","2020-01-09 08:51:35","2020-01-09 08:52:35","2020-01-09 08:53:35","2020-01-09 08:54:32","2020-01-09 08:55:32","2020-01-09 08:56:32","2020-01-09 08:57:32","2020-01-09 08:58:32","2020-01-09 08:59:27","2020-01-09 09:00:27","2020-01-09 09:01:27","2020-01-09 09:02:27","2020-01-09 09:03:27","2020-01-09 09:04:36","2020-01-09 09:05:36","2020-01-09 09:06:36","2020-01-09 09:07:36","2020-01-09 09:08:36","2020-01-09 09:09:32","2020-01-09 09:10:32","2020-01-09 09:11:32","2020-01-09 09:12:32","2020-01-09 09:13:32"],"values":[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,16.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,18.0,0.0,17.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,17.0,0.0,17.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,17.0,14.0,0.0,0.0,0.0,0.0,16.0,14.0,17.0,15.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,16.0,15.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,16.0,13.0,16.0,17.0,19.0,16.0,17.0,15.0,17.0,18.0,15.0,13.0,15.0,17.0,17.0,14.0,13.0,13.0,16.0,16.0,14.0,11.0,17.0,17.0,17.0,12.0,12.0,16.0,15.0,16.0,11.0,15.0,11.0,18.0,19.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,19.0,14.0,14.0,12.0,19.0,18.0,15.0,15.0,15.0,17.0,18.0,15.0,15.0,15.0,15.0,15.0,14.0,13.0,15.0,17.0,17.0,17.0,15.0,10.0,16.0,17.0,16.0,16.0,16.0,17.0,16.0,14.0,18.0,16.0,16.0,16.0,15.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,17.0,21.0,16.0,15.0,18.0,18.0,14.0,16.0,14.0,15.0,15.0,10.0,16.0,14.0,14.0,16.0,14.0,12.0,10.0,14.0,16.0,17.0,16.0,11.0,14.0,14.0,17.0,20.0,16.0,13.0,13.0,11.0,8.0,10.0,13.0,12.0,14.0,15.0,14.0,12.0,13.0,12.0,10.0,11.0,14.0,13.0,21.0,15.0,11.0,13.0,13.0,14.0,17.0,17.0,13.0,13.0,13.0,13.0,9.0,13.0,13.0,13.0,17.0,14.0,13.0,13.0,12.0,20.0,23.0,14.0,13.0,10.0,12.0,24.0,13.0,13.0,11.0,11.0,10.0,12.0,13.0,9.0,9.0,16.0,14.0,15.0,17.0,17.0,19.0,17.0,17.0,16.0,17.0,17.0,17.0,17.0,16.0,18.0,16.0,17.0,15.0,16.0,13.0,10.0,13.0,14.0,15.0,13.0,18.0,14.0,14.0,14.0,9.0,10.0,13.0,14.0,16.0,12.0,10.0,14.0,15.0,11.0,8.0,13.0,13.0,13.0,18.0,15.0,18.0,13.0,13.0,12.0,16.0,19.0,13.0,13.0,12.0,14.0,14.0,13.0,12.0,13.0,17.0,16.0,13.0,13.0,12.0,10.0,13.0,13.0,12.0,11.0,14.0,15.0,13.0,17.0,17.0,17.0,16.0,17.0,17.0,17.0,15.0,15.0,13.0,14.0,15.0,17.0,17.0,14.0,13.0,11.0,13.0,13.0,13.0,13.0,15.0,13.0,12.0,12.0,12.0,16.0,16.0,17.0,13.0,12.0,15.0,18.0,19.0,13.0,13.0,15.0,17.0,17.0,13.0,13.0,15.0,18.0,16.0,13.0,12.0,16.0,13.0,13.0,12.0,12.0,16.0,14.0,14.0,13.0,12.0,11.0,11.0,19.0,13.0,13.0,13.0,17.0,11.0,13.0,13.0,15.0,13.0,13.0,13.0,13.0,15.0,14.0,14.0,14.0,15.0,10.0,12.0,12.0,14.0,14.0,13.0,13.0,12.0,14.0,15.0,15.0,14.0,11.0,15.0,14.0,10.0,10.0,14.0,14.0,15.0,16.0,13.0,12.0,13.0,12.0,13.0,14.0,12.0,12.0,12.0,12.0,12.0,13.0,13.0,12.0,14.0,13.0,15.0,13.0,12.0,14.0,16.0,16.0,13.0,13.0,15.0,14.0,16.0,15.0,13.0,10.0,13.0,15.0,15.0,15.0,17.0,12.0,14.0,14.0,14.0,14.0,14.0,12.0,13.0,13.0,13.0,12.0,12.0,14.0,15.0,13.0,13.0,13.0,14.0,13.0,12.0,14.0,15.0,13.0,13.0,14.0,13.0,17.0,13.0,16.0,17.0,18.0,19.0,18.0,17.0,16.0,16.0,18.0,17.0,14.0,13.0,16.0,14.0,14.0,14.0,19.0,17.0,14.0,12.0,12.0,15.0,14.0,11.0,16.0,18.0,16.0,21.0,16.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,16.0,17.0,18.0,18.0,17.0,16.0,15.0,16.0,18.0,16.0,13.0,12.0,17.0,17.0,16.0,15.0,14.0,15.0,17.0,18.0,15.0,16.0,12.0,17.0,19.0,15.0,16.0,13.0,18.0,17.0,17.0,11.0,12.0,16.0,17.0,14.0,16.0,16.0,16.0,19.0,17.0,17.0,14.0,16.0,17.0,17.0,13.0,16.0,17.0,16.0,15.0,16.0,15.0,16.0,17.0,17.0,14.0,16.0,15.0,17.0,16.0,17.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,17.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,16.0,14.0,0.0,16.0,17.0,17.0,16.0,17.0,16.0,17.0,17.0,17.0,0.0,17.0,19.0,16.0,16.0,17.0,17.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0]}'
        },
        {
          healthResultAttr: {
            valueType: 3,
            alias: '心率时序',
            id: 75,
            healthResultAttrMappers: [],
            orderNo: 1,
            show: true,
            name: 'heartTimeLog'
          },
          value:
            '{"labels":["2020-01-08 19:59:39","2020-01-08 20:00:39","2020-01-08 20:01:39","2020-01-08 20:02:39","2020-01-08 20:03:39","2020-01-08 20:04:36","2020-01-08 20:05:36","2020-01-08 20:06:36","2020-01-08 20:07:36","2020-01-08 20:08:36","2020-01-08 20:09:32","2020-01-08 20:10:32","2020-01-08 20:11:32","2020-01-08 20:12:32","2020-01-08 20:13:32","2020-01-08 20:14:40","2020-01-08 20:15:40","2020-01-08 20:16:40","2020-01-08 20:17:40","2020-01-08 20:18:40","2020-01-08 20:19:36","2020-01-08 20:20:36","2020-01-08 20:21:36","2020-01-08 20:22:36","2020-01-08 20:23:36","2020-01-08 20:24:31","2020-01-08 20:25:31","2020-01-08 20:26:31","2020-01-08 20:27:31","2020-01-08 20:28:31","2020-01-08 20:29:39","2020-01-08 20:30:39","2020-01-08 20:31:39","2020-01-08 20:32:39","2020-01-08 20:33:39","2020-01-08 20:34:35","2020-01-08 20:35:35","2020-01-08 20:36:35","2020-01-08 20:37:35","2020-01-08 20:38:35","2020-01-08 20:39:30","2020-01-08 20:40:30","2020-01-08 20:41:30","2020-01-08 20:42:30","2020-01-08 20:43:30","2020-01-08 20:44:38","2020-01-08 20:45:38","2020-01-08 20:46:38","2020-01-08 20:47:38","2020-01-08 20:48:38","2020-01-08 20:49:34","2020-01-08 20:50:34","2020-01-08 20:51:34","2020-01-08 20:52:34","2020-01-08 20:53:34","2020-01-08 20:54:31","2020-01-08 20:55:31","2020-01-08 20:56:31","2020-01-08 20:57:31","2020-01-08 20:58:31","2020-01-08 20:59:38","2020-01-08 21:00:38","2020-01-08 21:01:38","2020-01-08 21:02:38","2020-01-08 21:03:38","2020-01-08 21:04:34","2020-01-08 21:05:34","2020-01-08 21:06:34","2020-01-08 21:07:34","2020-01-08 21:08:34","2020-01-08 21:09:29","2020-01-08 21:10:29","2020-01-08 21:11:29","2020-01-08 21:12:29","2020-01-08 21:13:29","2020-01-08 21:14:39","2020-01-08 21:15:39","2020-01-08 21:16:39","2020-01-08 21:17:39","2020-01-08 21:18:39","2020-01-08 21:19:34","2020-01-08 21:20:34","2020-01-08 21:21:34","2020-01-08 21:22:34","2020-01-08 21:23:34","2020-01-08 21:24:31","2020-01-08 21:25:31","2020-01-08 21:26:31","2020-01-08 21:27:31","2020-01-08 21:28:31","2020-01-08 21:29:40","2020-01-08 21:30:40","2020-01-08 21:31:40","2020-01-08 21:32:40","2020-01-08 21:33:40","2020-01-08 21:34:36","2020-01-08 21:35:36","2020-01-08 21:36:36","2020-01-08 21:37:36","2020-01-08 21:38:36","2020-01-08 21:39:31","2020-01-08 21:40:31","2020-01-08 21:41:31","2020-01-08 21:42:31","2020-01-08 21:43:31","2020-01-08 21:44:29","2020-01-08 21:45:29","2020-01-08 21:46:29","2020-01-08 21:47:29","2020-01-08 21:48:29","2020-01-08 21:49:37","2020-01-08 21:50:37","2020-01-08 21:51:37","2020-01-08 21:52:37","2020-01-08 21:53:37","2020-01-08 21:54:33","2020-01-08 21:55:33","2020-01-08 21:56:33","2020-01-08 21:57:33","2020-01-08 21:58:33","2020-01-08 21:59:30","2020-01-08 22:00:30","2020-01-08 22:01:30","2020-01-08 22:02:30","2020-01-08 22:03:30","2020-01-08 22:04:38","2020-01-08 22:05:38","2020-01-08 22:06:38","2020-01-08 22:07:38","2020-01-08 22:08:38","2020-01-08 22:09:35","2020-01-08 22:10:35","2020-01-08 22:11:35","2020-01-08 22:12:35","2020-01-08 22:13:35","2020-01-08 22:14:30","2020-01-08 22:15:30","2020-01-08 22:16:30","2020-01-08 22:17:30","2020-01-08 22:18:30","2020-01-08 22:19:40","2020-01-08 22:20:40","2020-01-08 22:21:40","2020-01-08 22:22:40","2020-01-08 22:23:40","2020-01-08 22:24:35","2020-01-08 22:25:35","2020-01-08 22:26:35","2020-01-08 22:27:35","2020-01-08 22:28:35","2020-01-08 22:29:32","2020-01-08 22:30:32","2020-01-08 22:31:32","2020-01-08 22:32:32","2020-01-08 22:33:32","2020-01-08 22:34:28","2020-01-08 22:35:28","2020-01-08 22:36:28","2020-01-08 22:37:28","2020-01-08 22:38:28","2020-01-08 22:39:36","2020-01-08 22:40:36","2020-01-08 22:41:36","2020-01-08 22:42:36","2020-01-08 22:43:36","2020-01-08 22:44:33","2020-01-08 22:45:33","2020-01-08 22:46:33","2020-01-08 22:47:33","2020-01-08 22:48:33","2020-01-08 22:49:29","2020-01-08 22:50:29","2020-01-08 22:51:29","2020-01-08 22:52:29","2020-01-08 22:53:29","2020-01-08 22:54:36","2020-01-08 22:55:36","2020-01-08 22:56:36","2020-01-08 22:57:36","2020-01-08 22:58:36","2020-01-08 22:59:32","2020-01-08 23:00:32","2020-01-08 23:01:32","2020-01-08 23:02:32","2020-01-08 23:03:32","2020-01-08 23:04:27","2020-01-08 23:05:27","2020-01-08 23:06:27","2020-01-08 23:07:27","2020-01-08 23:08:27","2020-01-08 23:09:35","2020-01-08 23:10:35","2020-01-08 23:11:35","2020-01-08 23:12:35","2020-01-08 23:13:35","2020-01-08 23:14:31","2020-01-08 23:15:31","2020-01-08 23:16:31","2020-01-08 23:17:31","2020-01-08 23:18:31","2020-01-08 23:19:39","2020-01-08 23:20:39","2020-01-08 23:21:39","2020-01-08 23:22:39","2020-01-08 23:23:39","2020-01-08 23:24:33","2020-01-08 23:25:33","2020-01-08 23:26:33","2020-01-08 23:27:33","2020-01-08 23:28:33","2020-01-08 23:29:29","2020-01-08 23:30:29","2020-01-08 23:31:29","2020-01-08 23:32:29","2020-01-08 23:33:29","2020-01-08 23:34:38","2020-01-08 23:35:38","2020-01-08 23:36:38","2020-01-08 23:37:38","2020-01-08 23:38:38","2020-01-08 23:39:33","2020-01-08 23:40:33","2020-01-08 23:41:33","2020-01-08 23:42:33","2020-01-08 23:43:33","2020-01-08 23:44:28","2020-01-08 23:45:28","2020-01-08 23:46:28","2020-01-08 23:47:28","2020-01-08 23:48:28","2020-01-08 23:49:36","2020-01-08 23:50:36","2020-01-08 23:51:36","2020-01-08 23:52:36","2020-01-08 23:53:36","2020-01-08 23:54:31","2020-01-08 23:55:31","2020-01-08 23:56:31","2020-01-08 23:57:31","2020-01-08 23:58:31","2020-01-08 23:59:39","2020-01-09 00:00:39","2020-01-09 00:01:39","2020-01-09 00:02:39","2020-01-09 00:03:39","2020-01-09 00:04:34","2020-01-09 00:05:34","2020-01-09 00:06:34","2020-01-09 00:07:34","2020-01-09 00:08:34","2020-01-09 00:09:28","2020-01-09 00:10:28","2020-01-09 00:11:28","2020-01-09 00:12:28","2020-01-09 00:13:28","2020-01-09 00:14:36","2020-01-09 00:15:36","2020-01-09 00:16:36","2020-01-09 00:17:36","2020-01-09 00:18:36","2020-01-09 00:19:31","2020-01-09 00:20:31","2020-01-09 00:21:31","2020-01-09 00:22:31","2020-01-09 00:23:31","2020-01-09 00:24:28","2020-01-09 00:25:28","2020-01-09 00:26:28","2020-01-09 00:27:28","2020-01-09 00:28:28","2020-01-09 00:29:35","2020-01-09 00:30:35","2020-01-09 00:31:35","2020-01-09 00:32:35","2020-01-09 00:33:35","2020-01-09 00:34:30","2020-01-09 00:35:30","2020-01-09 00:36:30","2020-01-09 00:37:30","2020-01-09 00:38:30","2020-01-09 00:39:36","2020-01-09 00:40:36","2020-01-09 00:41:36","2020-01-09 00:42:36","2020-01-09 00:43:36","2020-01-09 00:44:31","2020-01-09 00:45:31","2020-01-09 00:46:31","2020-01-09 00:47:31","2020-01-09 00:48:31","2020-01-09 00:49:38","2020-01-09 00:50:38","2020-01-09 00:51:38","2020-01-09 00:52:38","2020-01-09 00:53:38","2020-01-09 00:54:33","2020-01-09 00:55:33","2020-01-09 00:56:33","2020-01-09 00:57:33","2020-01-09 00:58:33","2020-01-09 00:59:28","2020-01-09 01:00:28","2020-01-09 01:01:28","2020-01-09 01:02:28","2020-01-09 01:03:28","2020-01-09 01:04:35","2020-01-09 01:05:35","2020-01-09 01:06:35","2020-01-09 01:07:35","2020-01-09 01:08:35","2020-01-09 01:09:30","2020-01-09 01:10:30","2020-01-09 01:11:30","2020-01-09 01:12:30","2020-01-09 01:13:30","2020-01-09 01:14:37","2020-01-09 01:15:37","2020-01-09 01:16:37","2020-01-09 01:17:37","2020-01-09 01:18:37","2020-01-09 01:19:32","2020-01-09 01:20:32","2020-01-09 01:21:32","2020-01-09 01:22:32","2020-01-09 01:23:32","2020-01-09 01:24:27","2020-01-09 01:25:27","2020-01-09 01:26:27","2020-01-09 01:27:27","2020-01-09 01:28:27","2020-01-09 01:29:35","2020-01-09 01:30:35","2020-01-09 01:31:35","2020-01-09 01:32:35","2020-01-09 01:33:35","2020-01-09 01:34:29","2020-01-09 01:35:29","2020-01-09 01:36:29","2020-01-09 01:37:29","2020-01-09 01:38:29","2020-01-09 01:39:38","2020-01-09 01:40:38","2020-01-09 01:41:38","2020-01-09 01:42:38","2020-01-09 01:43:38","2020-01-09 01:44:34","2020-01-09 01:45:34","2020-01-09 01:46:34","2020-01-09 01:47:34","2020-01-09 01:48:34","2020-01-09 01:49:29","2020-01-09 01:50:29","2020-01-09 01:51:29","2020-01-09 01:52:29","2020-01-09 01:53:29","2020-01-09 01:54:37","2020-01-09 01:55:37","2020-01-09 01:56:37","2020-01-09 01:57:37","2020-01-09 01:58:37","2020-01-09 01:59:32","2020-01-09 02:00:32","2020-01-09 02:01:32","2020-01-09 02:02:32","2020-01-09 02:03:32","2020-01-09 02:04:28","2020-01-09 02:05:28","2020-01-09 02:06:28","2020-01-09 02:07:28","2020-01-09 02:08:28","2020-01-09 02:09:36","2020-01-09 02:10:36","2020-01-09 02:11:36","2020-01-09 02:12:36","2020-01-09 02:13:36","2020-01-09 02:14:31","2020-01-09 02:15:31","2020-01-09 02:16:31","2020-01-09 02:17:31","2020-01-09 02:18:31","2020-01-09 02:19:39","2020-01-09 02:20:39","2020-01-09 02:21:39","2020-01-09 02:22:39","2020-01-09 02:23:39","2020-01-09 02:24:33","2020-01-09 02:25:33","2020-01-09 02:26:33","2020-01-09 02:27:33","2020-01-09 02:28:33","2020-01-09 02:29:29","2020-01-09 02:30:29","2020-01-09 02:31:29","2020-01-09 02:32:29","2020-01-09 02:33:29","2020-01-09 02:34:37","2020-01-09 02:35:37","2020-01-09 02:36:37","2020-01-09 02:37:37","2020-01-09 02:38:37","2020-01-09 02:39:33","2020-01-09 02:40:33","2020-01-09 02:41:33","2020-01-09 02:42:33","2020-01-09 02:43:33","2020-01-09 02:44:28","2020-01-09 02:45:28","2020-01-09 02:46:28","2020-01-09 02:47:28","2020-01-09 02:48:28","2020-01-09 02:49:36","2020-01-09 02:50:36","2020-01-09 02:51:36","2020-01-09 02:52:36","2020-01-09 02:53:36","2020-01-09 02:54:32","2020-01-09 02:55:32","2020-01-09 02:56:32","2020-01-09 02:57:32","2020-01-09 02:58:32","2020-01-09 02:59:27","2020-01-09 03:00:27","2020-01-09 03:01:27","2020-01-09 03:02:27","2020-01-09 03:03:27","2020-01-09 03:04:35","2020-01-09 03:05:35","2020-01-09 03:06:35","2020-01-09 03:07:35","2020-01-09 03:08:35","2020-01-09 03:09:30","2020-01-09 03:10:30","2020-01-09 03:11:30","2020-01-09 03:12:30","2020-01-09 03:13:30","2020-01-09 03:14:38","2020-01-09 03:15:38","2020-01-09 03:16:38","2020-01-09 03:17:38","2020-01-09 03:18:38","2020-01-09 03:19:32","2020-01-09 03:20:32","2020-01-09 03:21:32","2020-01-09 03:22:32","2020-01-09 03:23:32","2020-01-09 03:24:29","2020-01-09 03:25:29","2020-01-09 03:26:29","2020-01-09 03:27:29","2020-01-09 03:28:29","2020-01-09 03:29:38","2020-01-09 03:30:38","2020-01-09 03:31:38","2020-01-09 03:32:38","2020-01-09 03:33:38","2020-01-09 03:34:33","2020-01-09 03:35:33","2020-01-09 03:36:33","2020-01-09 03:37:33","2020-01-09 03:38:33","2020-01-09 03:39:28","2020-01-09 03:40:28","2020-01-09 03:41:28","2020-01-09 03:42:28","2020-01-09 03:43:28","2020-01-09 03:44:36","2020-01-09 03:45:36","2020-01-09 03:46:36","2020-01-09 03:47:36","2020-01-09 03:48:36","2020-01-09 03:49:32","2020-01-09 03:50:32","2020-01-09 03:51:32","2020-01-09 03:52:32","2020-01-09 03:53:32","2020-01-09 03:54:28","2020-01-09 03:55:28","2020-01-09 03:56:28","2020-01-09 03:57:28","2020-01-09 03:58:28","2020-01-09 03:59:37","2020-01-09 04:00:37","2020-01-09 04:01:37","2020-01-09 04:02:37","2020-01-09 04:03:37","2020-01-09 04:04:32","2020-01-09 04:05:32","2020-01-09 04:06:32","2020-01-09 04:07:32","2020-01-09 04:08:32","2020-01-09 04:09:28","2020-01-09 04:10:28","2020-01-09 04:11:28","2020-01-09 04:12:28","2020-01-09 04:13:28","2020-01-09 04:14:36","2020-01-09 04:15:36","2020-01-09 04:16:36","2020-01-09 04:17:36","2020-01-09 04:18:36","2020-01-09 04:19:30","2020-01-09 04:20:30","2020-01-09 04:21:30","2020-01-09 04:22:30","2020-01-09 04:23:30","2020-01-09 04:24:27","2020-01-09 04:25:27","2020-01-09 04:26:27","2020-01-09 04:27:27","2020-01-09 04:28:27","2020-01-09 04:29:35","2020-01-09 04:30:35","2020-01-09 04:31:35","2020-01-09 04:32:35","2020-01-09 04:33:35","2020-01-09 04:34:30","2020-01-09 04:35:30","2020-01-09 04:36:30","2020-01-09 04:37:30","2020-01-09 04:38:30","2020-01-09 04:39:39","2020-01-09 04:40:39","2020-01-09 04:41:39","2020-01-09 04:42:39","2020-01-09 04:43:39","2020-01-09 04:44:33","2020-01-09 04:45:33","2020-01-09 04:46:33","2020-01-09 04:47:33","2020-01-09 04:48:33","2020-01-09 04:49:29","2020-01-09 04:50:29","2020-01-09 04:51:29","2020-01-09 04:52:29","2020-01-09 04:53:29","2020-01-09 04:54:37","2020-01-09 04:55:37","2020-01-09 04:56:37","2020-01-09 04:57:37","2020-01-09 04:58:37","2020-01-09 04:59:31","2020-01-09 05:00:31","2020-01-09 05:01:31","2020-01-09 05:02:31","2020-01-09 05:03:31","2020-01-09 05:04:26","2020-01-09 05:05:26","2020-01-09 05:06:26","2020-01-09 05:07:26","2020-01-09 05:08:26","2020-01-09 05:09:35","2020-01-09 05:10:35","2020-01-09 05:11:35","2020-01-09 05:12:35","2020-01-09 05:13:35","2020-01-09 05:14:30","2020-01-09 05:15:30","2020-01-09 05:16:30","2020-01-09 05:17:30","2020-01-09 05:18:30","2020-01-09 05:19:37","2020-01-09 05:20:37","2020-01-09 05:21:37","2020-01-09 05:22:37","2020-01-09 05:23:37","2020-01-09 05:24:33","2020-01-09 05:25:33","2020-01-09 05:26:33","2020-01-09 05:27:33","2020-01-09 05:28:33","2020-01-09 05:29:29","2020-01-09 05:30:29","2020-01-09 05:31:29","2020-01-09 05:32:29","2020-01-09 05:33:29","2020-01-09 05:34:37","2020-01-09 05:35:37","2020-01-09 05:36:37","2020-01-09 05:37:37","2020-01-09 05:38:37","2020-01-09 05:39:32","2020-01-09 05:40:32","2020-01-09 05:41:32","2020-01-09 05:42:32","2020-01-09 05:43:32","2020-01-09 05:44:28","2020-01-09 05:45:28","2020-01-09 05:46:28","2020-01-09 05:47:28","2020-01-09 05:48:28","2020-01-09 05:49:35","2020-01-09 05:50:35","2020-01-09 05:51:35","2020-01-09 05:52:35","2020-01-09 05:53:35","2020-01-09 05:54:30","2020-01-09 05:55:30","2020-01-09 05:56:30","2020-01-09 05:57:30","2020-01-09 05:58:30","2020-01-09 05:59:39","2020-01-09 06:00:39","2020-01-09 06:01:39","2020-01-09 06:02:39","2020-01-09 06:03:39","2020-01-09 06:04:34","2020-01-09 06:05:34","2020-01-09 06:06:34","2020-01-09 06:07:34","2020-01-09 06:08:34","2020-01-09 06:09:28","2020-01-09 06:10:28","2020-01-09 06:11:28","2020-01-09 06:12:28","2020-01-09 06:13:28","2020-01-09 06:14:35","2020-01-09 06:15:35","2020-01-09 06:16:35","2020-01-09 06:17:35","2020-01-09 06:18:35","2020-01-09 06:19:30","2020-01-09 06:20:30","2020-01-09 06:21:30","2020-01-09 06:22:30","2020-01-09 06:23:30","2020-01-09 06:24:37","2020-01-09 06:25:37","2020-01-09 06:26:37","2020-01-09 06:27:37","2020-01-09 06:28:37","2020-01-09 06:29:32","2020-01-09 06:30:32","2020-01-09 06:31:32","2020-01-09 06:32:32","2020-01-09 06:33:32","2020-01-09 06:34:26","2020-01-09 06:35:26","2020-01-09 06:36:26","2020-01-09 06:37:26","2020-01-09 06:38:26","2020-01-09 06:39:33","2020-01-09 06:40:33","2020-01-09 06:41:33","2020-01-09 06:42:33","2020-01-09 06:43:33","2020-01-09 06:44:28","2020-01-09 06:45:28","2020-01-09 06:46:28","2020-01-09 06:47:28","2020-01-09 06:48:28","2020-01-09 06:49:36","2020-01-09 06:50:36","2020-01-09 06:51:36","2020-01-09 06:52:36","2020-01-09 06:53:36","2020-01-09 06:54:31","2020-01-09 06:55:31","2020-01-09 06:56:31","2020-01-09 06:57:31","2020-01-09 06:58:31","2020-01-09 06:59:37","2020-01-09 07:00:37","2020-01-09 07:01:37","2020-01-09 07:02:37","2020-01-09 07:03:37","2020-01-09 07:04:32","2020-01-09 07:05:32","2020-01-09 07:06:32","2020-01-09 07:07:32","2020-01-09 07:08:32","2020-01-09 07:09:27","2020-01-09 07:10:27","2020-01-09 07:11:27","2020-01-09 07:12:27","2020-01-09 07:13:27","2020-01-09 07:14:34","2020-01-09 07:15:34","2020-01-09 07:16:34","2020-01-09 07:17:34","2020-01-09 07:18:34","2020-01-09 07:19:28","2020-01-09 07:20:28","2020-01-09 07:21:28","2020-01-09 07:22:28","2020-01-09 07:23:28","2020-01-09 07:24:36","2020-01-09 07:25:36","2020-01-09 07:26:36","2020-01-09 07:27:36","2020-01-09 07:28:36","2020-01-09 07:29:30","2020-01-09 07:30:30","2020-01-09 07:31:30","2020-01-09 07:32:30","2020-01-09 07:33:30","2020-01-09 07:34:39","2020-01-09 07:35:39","2020-01-09 07:36:39","2020-01-09 07:37:39","2020-01-09 07:38:39","2020-01-09 07:39:33","2020-01-09 07:40:33","2020-01-09 07:41:33","2020-01-09 07:42:33","2020-01-09 07:43:33","2020-01-09 07:44:29","2020-01-09 07:45:29","2020-01-09 07:46:29","2020-01-09 07:47:29","2020-01-09 07:48:29","2020-01-09 07:49:36","2020-01-09 07:50:36","2020-01-09 07:51:36","2020-01-09 07:52:36","2020-01-09 07:53:36","2020-01-09 07:54:33","2020-01-09 07:55:33","2020-01-09 07:56:33","2020-01-09 07:57:33","2020-01-09 07:58:33","2020-01-09 07:59:28","2020-01-09 08:00:28","2020-01-09 08:01:28","2020-01-09 08:02:28","2020-01-09 08:03:28","2020-01-09 08:04:36","2020-01-09 08:05:36","2020-01-09 08:06:36","2020-01-09 08:07:36","2020-01-09 08:08:36","2020-01-09 08:09:31","2020-01-09 08:10:31","2020-01-09 08:11:31","2020-01-09 08:12:31","2020-01-09 08:13:31","2020-01-09 08:14:27","2020-01-09 08:15:27","2020-01-09 08:16:27","2020-01-09 08:17:27","2020-01-09 08:18:27","2020-01-09 08:19:36","2020-01-09 08:20:36","2020-01-09 08:21:36","2020-01-09 08:22:36","2020-01-09 08:23:36","2020-01-09 08:24:31","2020-01-09 08:25:31","2020-01-09 08:26:31","2020-01-09 08:27:31","2020-01-09 08:28:31","2020-01-09 08:29:26","2020-01-09 08:30:26","2020-01-09 08:31:26","2020-01-09 08:32:26","2020-01-09 08:33:26","2020-01-09 08:34:34","2020-01-09 08:35:34","2020-01-09 08:36:34","2020-01-09 08:37:34","2020-01-09 08:38:34","2020-01-09 08:39:29","2020-01-09 08:40:29","2020-01-09 08:41:29","2020-01-09 08:42:29","2020-01-09 08:43:29","2020-01-09 08:44:26","2020-01-09 08:45:26","2020-01-09 08:46:26","2020-01-09 08:47:26","2020-01-09 08:48:26","2020-01-09 08:49:35","2020-01-09 08:50:35","2020-01-09 08:51:35","2020-01-09 08:52:35","2020-01-09 08:53:35","2020-01-09 08:54:32","2020-01-09 08:55:32","2020-01-09 08:56:32","2020-01-09 08:57:32","2020-01-09 08:58:32","2020-01-09 08:59:27","2020-01-09 09:00:27","2020-01-09 09:01:27","2020-01-09 09:02:27","2020-01-09 09:03:27","2020-01-09 09:04:36","2020-01-09 09:05:36","2020-01-09 09:06:36","2020-01-09 09:07:36","2020-01-09 09:08:36","2020-01-09 09:09:32","2020-01-09 09:10:32","2020-01-09 09:11:32","2020-01-09 09:12:32","2020-01-09 09:13:32"],"values":[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,92.0,68.0,0.0,70.0,69.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,74.0,0.0,72.0,69.0,0.0,0.0,0.0,69.0,0.0,0.0,72.0,0.0,72.0,69.0,0.0,0.0,0.0,0.0,69.0,0.0,69.0,0.0,70.0,70.0,75.0,0.0,70.0,0.0,0.0,73.0,69.0,70.0,68.0,71.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,69.0,0.0,70.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,69.0,70.0,0.0,76.0,0.0,0.0,70.0,0.0,0.0,66.0,0.0,0.0,69.0,85.0,0.0,0.0,0.0,70.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,69.0,69.0,73.0,72.0,81.0,70.0,77.0,70.0,71.0,75.0,73.0,73.0,82.0,72.0,71.0,70.0,69.0,68.0,66.0,66.0,69.0,66.0,71.0,70.0,74.0,68.0,64.0,68.0,64.0,67.0,71.0,76.0,68.0,75.0,81.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,78.0,78.0,71.0,72.0,82.0,74.0,71.0,69.0,71.0,74.0,77.0,74.0,70.0,73.0,63.0,62.0,62.0,66.0,72.0,69.0,73.0,70.0,68.0,70.0,69.0,71.0,68.0,69.0,72.0,71.0,66.0,67.0,70.0,65.0,67.0,69.0,72.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,72.0,74.0,71.0,71.0,75.0,73.0,68.0,70.0,69.0,64.0,64.0,63.0,64.0,60.0,60.0,66.0,58.0,59.0,59.0,58.0,67.0,62.0,60.0,59.0,58.0,60.0,60.0,53.0,54.0,57.0,57.0,56.0,56.0,54.0,57.0,53.0,54.0,54.0,55.0,51.0,55.0,56.0,54.0,54.0,57.0,54.0,54.0,54.0,57.0,55.0,56.0,55.0,55.0,54.0,55.0,56.0,56.0,55.0,55.0,55.0,54.0,55.0,56.0,55.0,55.0,55.0,53.0,56.0,56.0,56.0,56.0,54.0,56.0,56.0,55.0,57.0,55.0,56.0,54.0,51.0,55.0,52.0,61.0,57.0,57.0,65.0,73.0,72.0,75.0,72.0,74.0,72.0,71.0,74.0,72.0,73.0,70.0,74.0,71.0,72.0,66.0,55.0,54.0,55.0,56.0,58.0,58.0,59.0,59.0,58.0,59.0,59.0,57.0,53.0,53.0,60.0,56.0,57.0,57.0,57.0,63.0,62.0,60.0,58.0,58.0,57.0,57.0,56.0,56.0,56.0,55.0,56.0,54.0,55.0,54.0,54.0,55.0,54.0,54.0,54.0,53.0,54.0,55.0,54.0,54.0,55.0,54.0,59.0,55.0,55.0,54.0,53.0,55.0,55.0,56.0,70.0,71.0,69.0,69.0,73.0,71.0,70.0,68.0,61.0,58.0,60.0,57.0,58.0,58.0,59.0,57.0,59.0,59.0,54.0,55.0,54.0,53.0,53.0,52.0,53.0,51.0,53.0,53.0,52.0,53.0,54.0,51.0,54.0,53.0,55.0,53.0,54.0,55.0,51.0,54.0,53.0,52.0,52.0,52.0,54.0,53.0,53.0,52.0,52.0,52.0,52.0,53.0,53.0,53.0,53.0,52.0,54.0,61.0,54.0,54.0,55.0,55.0,62.0,70.0,58.0,56.0,56.0,57.0,55.0,55.0,55.0,54.0,53.0,54.0,61.0,64.0,65.0,64.0,65.0,61.0,61.0,60.0,62.0,59.0,58.0,65.0,67.0,62.0,68.0,65.0,60.0,61.0,60.0,61.0,61.0,63.0,60.0,54.0,54.0,54.0,53.0,56.0,53.0,55.0,53.0,54.0,56.0,57.0,57.0,55.0,52.0,53.0,54.0,61.0,54.0,54.0,54.0,54.0,54.0,55.0,55.0,53.0,52.0,55.0,61.0,55.0,55.0,60.0,57.0,63.0,64.0,66.0,72.0,58.0,60.0,58.0,56.0,56.0,59.0,58.0,55.0,56.0,54.0,56.0,59.0,65.0,63.0,62.0,63.0,57.0,53.0,55.0,56.0,54.0,55.0,57.0,56.0,54.0,56.0,54.0,67.0,70.0,73.0,75.0,75.0,73.0,68.0,70.0,74.0,71.0,58.0,53.0,52.0,55.0,59.0,61.0,53.0,50.0,51.0,51.0,52.0,51.0,53.0,54.0,69.0,76.0,72.0,70.0,66.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,75.0,78.0,86.0,70.0,74.0,78.0,69.0,68.0,77.0,67.0,73.0,78.0,72.0,71.0,67.0,68.0,71.0,73.0,73.0,74.0,73.0,67.0,75.0,72.0,78.0,66.0,68.0,69.0,74.0,73.0,73.0,68.0,72.0,69.0,74.0,75.0,70.0,73.0,69.0,79.0,73.0,70.0,71.0,70.0,73.0,74.0,72.0,73.0,73.0,68.0,71.0,76.0,76.0,69.0,70.0,72.0,71.0,70.0,66.0,71.0,70.0,73.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,71.0,74.0,66.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,68.0,71.0,69.0,75.0,77.0,71.0,71.0,70.0,77.0,76.0,71.0,70.0,0.0,70.0,78.0,68.0,72.0,70.0,68.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0]}'
        },
        {
          healthResultAttr: {
            valueType: 3,
            alias: '体动时序',
            id: 76,
            healthResultAttrMappers: [],
            orderNo: 1,
            show: true,
            name: 'movTimeLog'
          },
          value:
            '{"labels":["2020-01-08 19:59:39","2020-01-08 20:00:39","2020-01-08 20:01:39","2020-01-08 20:02:39","2020-01-08 20:03:39","2020-01-08 20:04:36","2020-01-08 20:05:36","2020-01-08 20:06:36","2020-01-08 20:07:36","2020-01-08 20:08:36","2020-01-08 20:09:32","2020-01-08 20:10:32","2020-01-08 20:11:32","2020-01-08 20:12:32","2020-01-08 20:13:32","2020-01-08 20:14:40","2020-01-08 20:15:40","2020-01-08 20:16:40","2020-01-08 20:17:40","2020-01-08 20:18:40","2020-01-08 20:19:36","2020-01-08 20:20:36","2020-01-08 20:21:36","2020-01-08 20:22:36","2020-01-08 20:23:36","2020-01-08 20:24:31","2020-01-08 20:25:31","2020-01-08 20:26:31","2020-01-08 20:27:31","2020-01-08 20:28:31","2020-01-08 20:29:39","2020-01-08 20:30:39","2020-01-08 20:31:39","2020-01-08 20:32:39","2020-01-08 20:33:39","2020-01-08 20:34:35","2020-01-08 20:35:35","2020-01-08 20:36:35","2020-01-08 20:37:35","2020-01-08 20:38:35","2020-01-08 20:39:30","2020-01-08 20:40:30","2020-01-08 20:41:30","2020-01-08 20:42:30","2020-01-08 20:43:30","2020-01-08 20:44:38","2020-01-08 20:45:38","2020-01-08 20:46:38","2020-01-08 20:47:38","2020-01-08 20:48:38","2020-01-08 20:49:34","2020-01-08 20:50:34","2020-01-08 20:51:34","2020-01-08 20:52:34","2020-01-08 20:53:34","2020-01-08 20:54:31","2020-01-08 20:55:31","2020-01-08 20:56:31","2020-01-08 20:57:31","2020-01-08 20:58:31","2020-01-08 20:59:38","2020-01-08 21:00:38","2020-01-08 21:01:38","2020-01-08 21:02:38","2020-01-08 21:03:38","2020-01-08 21:04:34","2020-01-08 21:05:34","2020-01-08 21:06:34","2020-01-08 21:07:34","2020-01-08 21:08:34","2020-01-08 21:09:29","2020-01-08 21:10:29","2020-01-08 21:11:29","2020-01-08 21:12:29","2020-01-08 21:13:29","2020-01-08 21:14:39","2020-01-08 21:15:39","2020-01-08 21:16:39","2020-01-08 21:17:39","2020-01-08 21:18:39","2020-01-08 21:19:34","2020-01-08 21:20:34","2020-01-08 21:21:34","2020-01-08 21:22:34","2020-01-08 21:23:34","2020-01-08 21:24:31","2020-01-08 21:25:31","2020-01-08 21:26:31","2020-01-08 21:27:31","2020-01-08 21:28:31","2020-01-08 21:29:40","2020-01-08 21:30:40","2020-01-08 21:31:40","2020-01-08 21:32:40","2020-01-08 21:33:40","2020-01-08 21:34:36","2020-01-08 21:35:36","2020-01-08 21:36:36","2020-01-08 21:37:36","2020-01-08 21:38:36","2020-01-08 21:39:31","2020-01-08 21:40:31","2020-01-08 21:41:31","2020-01-08 21:42:31","2020-01-08 21:43:31","2020-01-08 21:44:29","2020-01-08 21:45:29","2020-01-08 21:46:29","2020-01-08 21:47:29","2020-01-08 21:48:29","2020-01-08 21:49:37","2020-01-08 21:50:37","2020-01-08 21:51:37","2020-01-08 21:52:37","2020-01-08 21:53:37","2020-01-08 21:54:33","2020-01-08 21:55:33","2020-01-08 21:56:33","2020-01-08 21:57:33","2020-01-08 21:58:33","2020-01-08 21:59:30","2020-01-08 22:00:30","2020-01-08 22:01:30","2020-01-08 22:02:30","2020-01-08 22:03:30","2020-01-08 22:04:38","2020-01-08 22:05:38","2020-01-08 22:06:38","2020-01-08 22:07:38","2020-01-08 22:08:38","2020-01-08 22:09:35","2020-01-08 22:10:35","2020-01-08 22:11:35","2020-01-08 22:12:35","2020-01-08 22:13:35","2020-01-08 22:14:30","2020-01-08 22:15:30","2020-01-08 22:16:30","2020-01-08 22:17:30","2020-01-08 22:18:30","2020-01-08 22:19:40","2020-01-08 22:20:40","2020-01-08 22:21:40","2020-01-08 22:22:40","2020-01-08 22:23:40","2020-01-08 22:24:35","2020-01-08 22:25:35","2020-01-08 22:26:35","2020-01-08 22:27:35","2020-01-08 22:28:35","2020-01-08 22:29:32","2020-01-08 22:30:32","2020-01-08 22:31:32","2020-01-08 22:32:32","2020-01-08 22:33:32","2020-01-08 22:34:28","2020-01-08 22:35:28","2020-01-08 22:36:28","2020-01-08 22:37:28","2020-01-08 22:38:28","2020-01-08 22:39:36","2020-01-08 22:40:36","2020-01-08 22:41:36","2020-01-08 22:42:36","2020-01-08 22:43:36","2020-01-08 22:44:33","2020-01-08 22:45:33","2020-01-08 22:46:33","2020-01-08 22:47:33","2020-01-08 22:48:33","2020-01-08 22:49:29","2020-01-08 22:50:29","2020-01-08 22:51:29","2020-01-08 22:52:29","2020-01-08 22:53:29","2020-01-08 22:54:36","2020-01-08 22:55:36","2020-01-08 22:56:36","2020-01-08 22:57:36","2020-01-08 22:58:36","2020-01-08 22:59:32","2020-01-08 23:00:32","2020-01-08 23:01:32","2020-01-08 23:02:32","2020-01-08 23:03:32","2020-01-08 23:04:27","2020-01-08 23:05:27","2020-01-08 23:06:27","2020-01-08 23:07:27","2020-01-08 23:08:27","2020-01-08 23:09:35","2020-01-08 23:10:35","2020-01-08 23:11:35","2020-01-08 23:12:35","2020-01-08 23:13:35","2020-01-08 23:14:31","2020-01-08 23:15:31","2020-01-08 23:16:31","2020-01-08 23:17:31","2020-01-08 23:18:31","2020-01-08 23:19:39","2020-01-08 23:20:39","2020-01-08 23:21:39","2020-01-08 23:22:39","2020-01-08 23:23:39","2020-01-08 23:24:33","2020-01-08 23:25:33","2020-01-08 23:26:33","2020-01-08 23:27:33","2020-01-08 23:28:33","2020-01-08 23:29:29","2020-01-08 23:30:29","2020-01-08 23:31:29","2020-01-08 23:32:29","2020-01-08 23:33:29","2020-01-08 23:34:38","2020-01-08 23:35:38","2020-01-08 23:36:38","2020-01-08 23:37:38","2020-01-08 23:38:38","2020-01-08 23:39:33","2020-01-08 23:40:33","2020-01-08 23:41:33","2020-01-08 23:42:33","2020-01-08 23:43:33","2020-01-08 23:44:28","2020-01-08 23:45:28","2020-01-08 23:46:28","2020-01-08 23:47:28","2020-01-08 23:48:28","2020-01-08 23:49:36","2020-01-08 23:50:36","2020-01-08 23:51:36","2020-01-08 23:52:36","2020-01-08 23:53:36","2020-01-08 23:54:31","2020-01-08 23:55:31","2020-01-08 23:56:31","2020-01-08 23:57:31","2020-01-08 23:58:31","2020-01-08 23:59:39","2020-01-09 00:00:39","2020-01-09 00:01:39","2020-01-09 00:02:39","2020-01-09 00:03:39","2020-01-09 00:04:34","2020-01-09 00:05:34","2020-01-09 00:06:34","2020-01-09 00:07:34","2020-01-09 00:08:34","2020-01-09 00:09:28","2020-01-09 00:10:28","2020-01-09 00:11:28","2020-01-09 00:12:28","2020-01-09 00:13:28","2020-01-09 00:14:36","2020-01-09 00:15:36","2020-01-09 00:16:36","2020-01-09 00:17:36","2020-01-09 00:18:36","2020-01-09 00:19:31","2020-01-09 00:20:31","2020-01-09 00:21:31","2020-01-09 00:22:31","2020-01-09 00:23:31","2020-01-09 00:24:28","2020-01-09 00:25:28","2020-01-09 00:26:28","2020-01-09 00:27:28","2020-01-09 00:28:28","2020-01-09 00:29:35","2020-01-09 00:30:35","2020-01-09 00:31:35","2020-01-09 00:32:35","2020-01-09 00:33:35","2020-01-09 00:34:30","2020-01-09 00:35:30","2020-01-09 00:36:30","2020-01-09 00:37:30","2020-01-09 00:38:30","2020-01-09 00:39:36","2020-01-09 00:40:36","2020-01-09 00:41:36","2020-01-09 00:42:36","2020-01-09 00:43:36","2020-01-09 00:44:31","2020-01-09 00:45:31","2020-01-09 00:46:31","2020-01-09 00:47:31","2020-01-09 00:48:31","2020-01-09 00:49:38","2020-01-09 00:50:38","2020-01-09 00:51:38","2020-01-09 00:52:38","2020-01-09 00:53:38","2020-01-09 00:54:33","2020-01-09 00:55:33","2020-01-09 00:56:33","2020-01-09 00:57:33","2020-01-09 00:58:33","2020-01-09 00:59:28","2020-01-09 01:00:28","2020-01-09 01:01:28","2020-01-09 01:02:28","2020-01-09 01:03:28","2020-01-09 01:04:35","2020-01-09 01:05:35","2020-01-09 01:06:35","2020-01-09 01:07:35","2020-01-09 01:08:35","2020-01-09 01:09:30","2020-01-09 01:10:30","2020-01-09 01:11:30","2020-01-09 01:12:30","2020-01-09 01:13:30","2020-01-09 01:14:37","2020-01-09 01:15:37","2020-01-09 01:16:37","2020-01-09 01:17:37","2020-01-09 01:18:37","2020-01-09 01:19:32","2020-01-09 01:20:32","2020-01-09 01:21:32","2020-01-09 01:22:32","2020-01-09 01:23:32","2020-01-09 01:24:27","2020-01-09 01:25:27","2020-01-09 01:26:27","2020-01-09 01:27:27","2020-01-09 01:28:27","2020-01-09 01:29:35","2020-01-09 01:30:35","2020-01-09 01:31:35","2020-01-09 01:32:35","2020-01-09 01:33:35","2020-01-09 01:34:29","2020-01-09 01:35:29","2020-01-09 01:36:29","2020-01-09 01:37:29","2020-01-09 01:38:29","2020-01-09 01:39:38","2020-01-09 01:40:38","2020-01-09 01:41:38","2020-01-09 01:42:38","2020-01-09 01:43:38","2020-01-09 01:44:34","2020-01-09 01:45:34","2020-01-09 01:46:34","2020-01-09 01:47:34","2020-01-09 01:48:34","2020-01-09 01:49:29","2020-01-09 01:50:29","2020-01-09 01:51:29","2020-01-09 01:52:29","2020-01-09 01:53:29","2020-01-09 01:54:37","2020-01-09 01:55:37","2020-01-09 01:56:37","2020-01-09 01:57:37","2020-01-09 01:58:37","2020-01-09 01:59:32","2020-01-09 02:00:32","2020-01-09 02:01:32","2020-01-09 02:02:32","2020-01-09 02:03:32","2020-01-09 02:04:28","2020-01-09 02:05:28","2020-01-09 02:06:28","2020-01-09 02:07:28","2020-01-09 02:08:28","2020-01-09 02:09:36","2020-01-09 02:10:36","2020-01-09 02:11:36","2020-01-09 02:12:36","2020-01-09 02:13:36","2020-01-09 02:14:31","2020-01-09 02:15:31","2020-01-09 02:16:31","2020-01-09 02:17:31","2020-01-09 02:18:31","2020-01-09 02:19:39","2020-01-09 02:20:39","2020-01-09 02:21:39","2020-01-09 02:22:39","2020-01-09 02:23:39","2020-01-09 02:24:33","2020-01-09 02:25:33","2020-01-09 02:26:33","2020-01-09 02:27:33","2020-01-09 02:28:33","2020-01-09 02:29:29","2020-01-09 02:30:29","2020-01-09 02:31:29","2020-01-09 02:32:29","2020-01-09 02:33:29","2020-01-09 02:34:37","2020-01-09 02:35:37","2020-01-09 02:36:37","2020-01-09 02:37:37","2020-01-09 02:38:37","2020-01-09 02:39:33","2020-01-09 02:40:33","2020-01-09 02:41:33","2020-01-09 02:42:33","2020-01-09 02:43:33","2020-01-09 02:44:28","2020-01-09 02:45:28","2020-01-09 02:46:28","2020-01-09 02:47:28","2020-01-09 02:48:28","2020-01-09 02:49:36","2020-01-09 02:50:36","2020-01-09 02:51:36","2020-01-09 02:52:36","2020-01-09 02:53:36","2020-01-09 02:54:32","2020-01-09 02:55:32","2020-01-09 02:56:32","2020-01-09 02:57:32","2020-01-09 02:58:32","2020-01-09 02:59:27","2020-01-09 03:00:27","2020-01-09 03:01:27","2020-01-09 03:02:27","2020-01-09 03:03:27","2020-01-09 03:04:35","2020-01-09 03:05:35","2020-01-09 03:06:35","2020-01-09 03:07:35","2020-01-09 03:08:35","2020-01-09 03:09:30","2020-01-09 03:10:30","2020-01-09 03:11:30","2020-01-09 03:12:30","2020-01-09 03:13:30","2020-01-09 03:14:38","2020-01-09 03:15:38","2020-01-09 03:16:38","2020-01-09 03:17:38","2020-01-09 03:18:38","2020-01-09 03:19:32","2020-01-09 03:20:32","2020-01-09 03:21:32","2020-01-09 03:22:32","2020-01-09 03:23:32","2020-01-09 03:24:29","2020-01-09 03:25:29","2020-01-09 03:26:29","2020-01-09 03:27:29","2020-01-09 03:28:29","2020-01-09 03:29:38","2020-01-09 03:30:38","2020-01-09 03:31:38","2020-01-09 03:32:38","2020-01-09 03:33:38","2020-01-09 03:34:33","2020-01-09 03:35:33","2020-01-09 03:36:33","2020-01-09 03:37:33","2020-01-09 03:38:33","2020-01-09 03:39:28","2020-01-09 03:40:28","2020-01-09 03:41:28","2020-01-09 03:42:28","2020-01-09 03:43:28","2020-01-09 03:44:36","2020-01-09 03:45:36","2020-01-09 03:46:36","2020-01-09 03:47:36","2020-01-09 03:48:36","2020-01-09 03:49:32","2020-01-09 03:50:32","2020-01-09 03:51:32","2020-01-09 03:52:32","2020-01-09 03:53:32","2020-01-09 03:54:28","2020-01-09 03:55:28","2020-01-09 03:56:28","2020-01-09 03:57:28","2020-01-09 03:58:28","2020-01-09 03:59:37","2020-01-09 04:00:37","2020-01-09 04:01:37","2020-01-09 04:02:37","2020-01-09 04:03:37","2020-01-09 04:04:32","2020-01-09 04:05:32","2020-01-09 04:06:32","2020-01-09 04:07:32","2020-01-09 04:08:32","2020-01-09 04:09:28","2020-01-09 04:10:28","2020-01-09 04:11:28","2020-01-09 04:12:28","2020-01-09 04:13:28","2020-01-09 04:14:36","2020-01-09 04:15:36","2020-01-09 04:16:36","2020-01-09 04:17:36","2020-01-09 04:18:36","2020-01-09 04:19:30","2020-01-09 04:20:30","2020-01-09 04:21:30","2020-01-09 04:22:30","2020-01-09 04:23:30","2020-01-09 04:24:27","2020-01-09 04:25:27","2020-01-09 04:26:27","2020-01-09 04:27:27","2020-01-09 04:28:27","2020-01-09 04:29:35","2020-01-09 04:30:35","2020-01-09 04:31:35","2020-01-09 04:32:35","2020-01-09 04:33:35","2020-01-09 04:34:30","2020-01-09 04:35:30","2020-01-09 04:36:30","2020-01-09 04:37:30","2020-01-09 04:38:30","2020-01-09 04:39:39","2020-01-09 04:40:39","2020-01-09 04:41:39","2020-01-09 04:42:39","2020-01-09 04:43:39","2020-01-09 04:44:33","2020-01-09 04:45:33","2020-01-09 04:46:33","2020-01-09 04:47:33","2020-01-09 04:48:33","2020-01-09 04:49:29","2020-01-09 04:50:29","2020-01-09 04:51:29","2020-01-09 04:52:29","2020-01-09 04:53:29","2020-01-09 04:54:37","2020-01-09 04:55:37","2020-01-09 04:56:37","2020-01-09 04:57:37","2020-01-09 04:58:37","2020-01-09 04:59:31","2020-01-09 05:00:31","2020-01-09 05:01:31","2020-01-09 05:02:31","2020-01-09 05:03:31","2020-01-09 05:04:26","2020-01-09 05:05:26","2020-01-09 05:06:26","2020-01-09 05:07:26","2020-01-09 05:08:26","2020-01-09 05:09:35","2020-01-09 05:10:35","2020-01-09 05:11:35","2020-01-09 05:12:35","2020-01-09 05:13:35","2020-01-09 05:14:30","2020-01-09 05:15:30","2020-01-09 05:16:30","2020-01-09 05:17:30","2020-01-09 05:18:30","2020-01-09 05:19:37","2020-01-09 05:20:37","2020-01-09 05:21:37","2020-01-09 05:22:37","2020-01-09 05:23:37","2020-01-09 05:24:33","2020-01-09 05:25:33","2020-01-09 05:26:33","2020-01-09 05:27:33","2020-01-09 05:28:33","2020-01-09 05:29:29","2020-01-09 05:30:29","2020-01-09 05:31:29","2020-01-09 05:32:29","2020-01-09 05:33:29","2020-01-09 05:34:37","2020-01-09 05:35:37","2020-01-09 05:36:37","2020-01-09 05:37:37","2020-01-09 05:38:37","2020-01-09 05:39:32","2020-01-09 05:40:32","2020-01-09 05:41:32","2020-01-09 05:42:32","2020-01-09 05:43:32","2020-01-09 05:44:28","2020-01-09 05:45:28","2020-01-09 05:46:28","2020-01-09 05:47:28","2020-01-09 05:48:28","2020-01-09 05:49:35","2020-01-09 05:50:35","2020-01-09 05:51:35","2020-01-09 05:52:35","2020-01-09 05:53:35","2020-01-09 05:54:30","2020-01-09 05:55:30","2020-01-09 05:56:30","2020-01-09 05:57:30","2020-01-09 05:58:30","2020-01-09 05:59:39","2020-01-09 06:00:39","2020-01-09 06:01:39","2020-01-09 06:02:39","2020-01-09 06:03:39","2020-01-09 06:04:34","2020-01-09 06:05:34","2020-01-09 06:06:34","2020-01-09 06:07:34","2020-01-09 06:08:34","2020-01-09 06:09:28","2020-01-09 06:10:28","2020-01-09 06:11:28","2020-01-09 06:12:28","2020-01-09 06:13:28","2020-01-09 06:14:35","2020-01-09 06:15:35","2020-01-09 06:16:35","2020-01-09 06:17:35","2020-01-09 06:18:35","2020-01-09 06:19:30","2020-01-09 06:20:30","2020-01-09 06:21:30","2020-01-09 06:22:30","2020-01-09 06:23:30","2020-01-09 06:24:37","2020-01-09 06:25:37","2020-01-09 06:26:37","2020-01-09 06:27:37","2020-01-09 06:28:37","2020-01-09 06:29:32","2020-01-09 06:30:32","2020-01-09 06:31:32","2020-01-09 06:32:32","2020-01-09 06:33:32","2020-01-09 06:34:26","2020-01-09 06:35:26","2020-01-09 06:36:26","2020-01-09 06:37:26","2020-01-09 06:38:26","2020-01-09 06:39:33","2020-01-09 06:40:33","2020-01-09 06:41:33","2020-01-09 06:42:33","2020-01-09 06:43:33","2020-01-09 06:44:28","2020-01-09 06:45:28","2020-01-09 06:46:28","2020-01-09 06:47:28","2020-01-09 06:48:28","2020-01-09 06:49:36","2020-01-09 06:50:36","2020-01-09 06:51:36","2020-01-09 06:52:36","2020-01-09 06:53:36","2020-01-09 06:54:31","2020-01-09 06:55:31","2020-01-09 06:56:31","2020-01-09 06:57:31","2020-01-09 06:58:31","2020-01-09 06:59:37","2020-01-09 07:00:37","2020-01-09 07:01:37","2020-01-09 07:02:37","2020-01-09 07:03:37","2020-01-09 07:04:32","2020-01-09 07:05:32","2020-01-09 07:06:32","2020-01-09 07:07:32","2020-01-09 07:08:32","2020-01-09 07:09:27","2020-01-09 07:10:27","2020-01-09 07:11:27","2020-01-09 07:12:27","2020-01-09 07:13:27","2020-01-09 07:14:34","2020-01-09 07:15:34","2020-01-09 07:16:34","2020-01-09 07:17:34","2020-01-09 07:18:34","2020-01-09 07:19:28","2020-01-09 07:20:28","2020-01-09 07:21:28","2020-01-09 07:22:28","2020-01-09 07:23:28","2020-01-09 07:24:36","2020-01-09 07:25:36","2020-01-09 07:26:36","2020-01-09 07:27:36","2020-01-09 07:28:36","2020-01-09 07:29:30","2020-01-09 07:30:30","2020-01-09 07:31:30","2020-01-09 07:32:30","2020-01-09 07:33:30","2020-01-09 07:34:39","2020-01-09 07:35:39","2020-01-09 07:36:39","2020-01-09 07:37:39","2020-01-09 07:38:39","2020-01-09 07:39:33","2020-01-09 07:40:33","2020-01-09 07:41:33","2020-01-09 07:42:33","2020-01-09 07:43:33","2020-01-09 07:44:29","2020-01-09 07:45:29","2020-01-09 07:46:29","2020-01-09 07:47:29","2020-01-09 07:48:29","2020-01-09 07:49:36","2020-01-09 07:50:36","2020-01-09 07:51:36","2020-01-09 07:52:36","2020-01-09 07:53:36","2020-01-09 07:54:33","2020-01-09 07:55:33","2020-01-09 07:56:33","2020-01-09 07:57:33","2020-01-09 07:58:33","2020-01-09 07:59:28","2020-01-09 08:00:28","2020-01-09 08:01:28","2020-01-09 08:02:28","2020-01-09 08:03:28","2020-01-09 08:04:36","2020-01-09 08:05:36","2020-01-09 08:06:36","2020-01-09 08:07:36","2020-01-09 08:08:36","2020-01-09 08:09:31","2020-01-09 08:10:31","2020-01-09 08:11:31","2020-01-09 08:12:31","2020-01-09 08:13:31","2020-01-09 08:14:27","2020-01-09 08:15:27","2020-01-09 08:16:27","2020-01-09 08:17:27","2020-01-09 08:18:27","2020-01-09 08:19:36","2020-01-09 08:20:36","2020-01-09 08:21:36","2020-01-09 08:22:36","2020-01-09 08:23:36","2020-01-09 08:24:31","2020-01-09 08:25:31","2020-01-09 08:26:31","2020-01-09 08:27:31","2020-01-09 08:28:31","2020-01-09 08:29:26","2020-01-09 08:30:26","2020-01-09 08:31:26","2020-01-09 08:32:26","2020-01-09 08:33:26","2020-01-09 08:34:34","2020-01-09 08:35:34","2020-01-09 08:36:34","2020-01-09 08:37:34","2020-01-09 08:38:34","2020-01-09 08:39:29","2020-01-09 08:40:29","2020-01-09 08:41:29","2020-01-09 08:42:29","2020-01-09 08:43:29","2020-01-09 08:44:26","2020-01-09 08:45:26","2020-01-09 08:46:26","2020-01-09 08:47:26","2020-01-09 08:48:26","2020-01-09 08:49:35","2020-01-09 08:50:35","2020-01-09 08:51:35","2020-01-09 08:52:35","2020-01-09 08:53:35","2020-01-09 08:54:32","2020-01-09 08:55:32","2020-01-09 08:56:32","2020-01-09 08:57:32","2020-01-09 08:58:32","2020-01-09 08:59:27","2020-01-09 09:00:27","2020-01-09 09:01:27","2020-01-09 09:02:27","2020-01-09 09:03:27","2020-01-09 09:04:36","2020-01-09 09:05:36","2020-01-09 09:06:36","2020-01-09 09:07:36","2020-01-09 09:08:36","2020-01-09 09:09:32","2020-01-09 09:10:32","2020-01-09 09:11:32","2020-01-09 09:12:32","2020-01-09 09:13:32"],"values":[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,1.0,1.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0]}'
        },
        {
          healthResultAttr: {
            valueType: 3,
            alias: '打鼾时序',
            id: 77,
            healthResultAttrMappers: [],
            orderNo: 1,
            show: true,
            name: 'snoreTimeLog'
          },
          value:
            '{"labels":["2020-01-08 19:59:39","2020-01-08 20:00:39","2020-01-08 20:01:39","2020-01-08 20:02:39","2020-01-08 20:03:39","2020-01-08 20:04:36","2020-01-08 20:05:36","2020-01-08 20:06:36","2020-01-08 20:07:36","2020-01-08 20:08:36","2020-01-08 20:09:32","2020-01-08 20:10:32","2020-01-08 20:11:32","2020-01-08 20:12:32","2020-01-08 20:13:32","2020-01-08 20:14:40","2020-01-08 20:15:40","2020-01-08 20:16:40","2020-01-08 20:17:40","2020-01-08 20:18:40","2020-01-08 20:19:36","2020-01-08 20:20:36","2020-01-08 20:21:36","2020-01-08 20:22:36","2020-01-08 20:23:36","2020-01-08 20:24:31","2020-01-08 20:25:31","2020-01-08 20:26:31","2020-01-08 20:27:31","2020-01-08 20:28:31","2020-01-08 20:29:39","2020-01-08 20:30:39","2020-01-08 20:31:39","2020-01-08 20:32:39","2020-01-08 20:33:39","2020-01-08 20:34:35","2020-01-08 20:35:35","2020-01-08 20:36:35","2020-01-08 20:37:35","2020-01-08 20:38:35","2020-01-08 20:39:30","2020-01-08 20:40:30","2020-01-08 20:41:30","2020-01-08 20:42:30","2020-01-08 20:43:30","2020-01-08 20:44:38","2020-01-08 20:45:38","2020-01-08 20:46:38","2020-01-08 20:47:38","2020-01-08 20:48:38","2020-01-08 20:49:34","2020-01-08 20:50:34","2020-01-08 20:51:34","2020-01-08 20:52:34","2020-01-08 20:53:34","2020-01-08 20:54:31","2020-01-08 20:55:31","2020-01-08 20:56:31","2020-01-08 20:57:31","2020-01-08 20:58:31","2020-01-08 20:59:38","2020-01-08 21:00:38","2020-01-08 21:01:38","2020-01-08 21:02:38","2020-01-08 21:03:38","2020-01-08 21:04:34","2020-01-08 21:05:34","2020-01-08 21:06:34","2020-01-08 21:07:34","2020-01-08 21:08:34","2020-01-08 21:09:29","2020-01-08 21:10:29","2020-01-08 21:11:29","2020-01-08 21:12:29","2020-01-08 21:13:29","2020-01-08 21:14:39","2020-01-08 21:15:39","2020-01-08 21:16:39","2020-01-08 21:17:39","2020-01-08 21:18:39","2020-01-08 21:19:34","2020-01-08 21:20:34","2020-01-08 21:21:34","2020-01-08 21:22:34","2020-01-08 21:23:34","2020-01-08 21:24:31","2020-01-08 21:25:31","2020-01-08 21:26:31","2020-01-08 21:27:31","2020-01-08 21:28:31","2020-01-08 21:29:40","2020-01-08 21:30:40","2020-01-08 21:31:40","2020-01-08 21:32:40","2020-01-08 21:33:40","2020-01-08 21:34:36","2020-01-08 21:35:36","2020-01-08 21:36:36","2020-01-08 21:37:36","2020-01-08 21:38:36","2020-01-08 21:39:31","2020-01-08 21:40:31","2020-01-08 21:41:31","2020-01-08 21:42:31","2020-01-08 21:43:31","2020-01-08 21:44:29","2020-01-08 21:45:29","2020-01-08 21:46:29","2020-01-08 21:47:29","2020-01-08 21:48:29","2020-01-08 21:49:37","2020-01-08 21:50:37","2020-01-08 21:51:37","2020-01-08 21:52:37","2020-01-08 21:53:37","2020-01-08 21:54:33","2020-01-08 21:55:33","2020-01-08 21:56:33","2020-01-08 21:57:33","2020-01-08 21:58:33","2020-01-08 21:59:30","2020-01-08 22:00:30","2020-01-08 22:01:30","2020-01-08 22:02:30","2020-01-08 22:03:30","2020-01-08 22:04:38","2020-01-08 22:05:38","2020-01-08 22:06:38","2020-01-08 22:07:38","2020-01-08 22:08:38","2020-01-08 22:09:35","2020-01-08 22:10:35","2020-01-08 22:11:35","2020-01-08 22:12:35","2020-01-08 22:13:35","2020-01-08 22:14:30","2020-01-08 22:15:30","2020-01-08 22:16:30","2020-01-08 22:17:30","2020-01-08 22:18:30","2020-01-08 22:19:40","2020-01-08 22:20:40","2020-01-08 22:21:40","2020-01-08 22:22:40","2020-01-08 22:23:40","2020-01-08 22:24:35","2020-01-08 22:25:35","2020-01-08 22:26:35","2020-01-08 22:27:35","2020-01-08 22:28:35","2020-01-08 22:29:32","2020-01-08 22:30:32","2020-01-08 22:31:32","2020-01-08 22:32:32","2020-01-08 22:33:32","2020-01-08 22:34:28","2020-01-08 22:35:28","2020-01-08 22:36:28","2020-01-08 22:37:28","2020-01-08 22:38:28","2020-01-08 22:39:36","2020-01-08 22:40:36","2020-01-08 22:41:36","2020-01-08 22:42:36","2020-01-08 22:43:36","2020-01-08 22:44:33","2020-01-08 22:45:33","2020-01-08 22:46:33","2020-01-08 22:47:33","2020-01-08 22:48:33","2020-01-08 22:49:29","2020-01-08 22:50:29","2020-01-08 22:51:29","2020-01-08 22:52:29","2020-01-08 22:53:29","2020-01-08 22:54:36","2020-01-08 22:55:36","2020-01-08 22:56:36","2020-01-08 22:57:36","2020-01-08 22:58:36","2020-01-08 22:59:32","2020-01-08 23:00:32","2020-01-08 23:01:32","2020-01-08 23:02:32","2020-01-08 23:03:32","2020-01-08 23:04:27","2020-01-08 23:05:27","2020-01-08 23:06:27","2020-01-08 23:07:27","2020-01-08 23:08:27","2020-01-08 23:09:35","2020-01-08 23:10:35","2020-01-08 23:11:35","2020-01-08 23:12:35","2020-01-08 23:13:35","2020-01-08 23:14:31","2020-01-08 23:15:31","2020-01-08 23:16:31","2020-01-08 23:17:31","2020-01-08 23:18:31","2020-01-08 23:19:39","2020-01-08 23:20:39","2020-01-08 23:21:39","2020-01-08 23:22:39","2020-01-08 23:23:39","2020-01-08 23:24:33","2020-01-08 23:25:33","2020-01-08 23:26:33","2020-01-08 23:27:33","2020-01-08 23:28:33","2020-01-08 23:29:29","2020-01-08 23:30:29","2020-01-08 23:31:29","2020-01-08 23:32:29","2020-01-08 23:33:29","2020-01-08 23:34:38","2020-01-08 23:35:38","2020-01-08 23:36:38","2020-01-08 23:37:38","2020-01-08 23:38:38","2020-01-08 23:39:33","2020-01-08 23:40:33","2020-01-08 23:41:33","2020-01-08 23:42:33","2020-01-08 23:43:33","2020-01-08 23:44:28","2020-01-08 23:45:28","2020-01-08 23:46:28","2020-01-08 23:47:28","2020-01-08 23:48:28","2020-01-08 23:49:36","2020-01-08 23:50:36","2020-01-08 23:51:36","2020-01-08 23:52:36","2020-01-08 23:53:36","2020-01-08 23:54:31","2020-01-08 23:55:31","2020-01-08 23:56:31","2020-01-08 23:57:31","2020-01-08 23:58:31","2020-01-08 23:59:39","2020-01-09 00:00:39","2020-01-09 00:01:39","2020-01-09 00:02:39","2020-01-09 00:03:39","2020-01-09 00:04:34","2020-01-09 00:05:34","2020-01-09 00:06:34","2020-01-09 00:07:34","2020-01-09 00:08:34","2020-01-09 00:09:28","2020-01-09 00:10:28","2020-01-09 00:11:28","2020-01-09 00:12:28","2020-01-09 00:13:28","2020-01-09 00:14:36","2020-01-09 00:15:36","2020-01-09 00:16:36","2020-01-09 00:17:36","2020-01-09 00:18:36","2020-01-09 00:19:31","2020-01-09 00:20:31","2020-01-09 00:21:31","2020-01-09 00:22:31","2020-01-09 00:23:31","2020-01-09 00:24:28","2020-01-09 00:25:28","2020-01-09 00:26:28","2020-01-09 00:27:28","2020-01-09 00:28:28","2020-01-09 00:29:35","2020-01-09 00:30:35","2020-01-09 00:31:35","2020-01-09 00:32:35","2020-01-09 00:33:35","2020-01-09 00:34:30","2020-01-09 00:35:30","2020-01-09 00:36:30","2020-01-09 00:37:30","2020-01-09 00:38:30","2020-01-09 00:39:36","2020-01-09 00:40:36","2020-01-09 00:41:36","2020-01-09 00:42:36","2020-01-09 00:43:36","2020-01-09 00:44:31","2020-01-09 00:45:31","2020-01-09 00:46:31","2020-01-09 00:47:31","2020-01-09 00:48:31","2020-01-09 00:49:38","2020-01-09 00:50:38","2020-01-09 00:51:38","2020-01-09 00:52:38","2020-01-09 00:53:38","2020-01-09 00:54:33","2020-01-09 00:55:33","2020-01-09 00:56:33","2020-01-09 00:57:33","2020-01-09 00:58:33","2020-01-09 00:59:28","2020-01-09 01:00:28","2020-01-09 01:01:28","2020-01-09 01:02:28","2020-01-09 01:03:28","2020-01-09 01:04:35","2020-01-09 01:05:35","2020-01-09 01:06:35","2020-01-09 01:07:35","2020-01-09 01:08:35","2020-01-09 01:09:30","2020-01-09 01:10:30","2020-01-09 01:11:30","2020-01-09 01:12:30","2020-01-09 01:13:30","2020-01-09 01:14:37","2020-01-09 01:15:37","2020-01-09 01:16:37","2020-01-09 01:17:37","2020-01-09 01:18:37","2020-01-09 01:19:32","2020-01-09 01:20:32","2020-01-09 01:21:32","2020-01-09 01:22:32","2020-01-09 01:23:32","2020-01-09 01:24:27","2020-01-09 01:25:27","2020-01-09 01:26:27","2020-01-09 01:27:27","2020-01-09 01:28:27","2020-01-09 01:29:35","2020-01-09 01:30:35","2020-01-09 01:31:35","2020-01-09 01:32:35","2020-01-09 01:33:35","2020-01-09 01:34:29","2020-01-09 01:35:29","2020-01-09 01:36:29","2020-01-09 01:37:29","2020-01-09 01:38:29","2020-01-09 01:39:38","2020-01-09 01:40:38","2020-01-09 01:41:38","2020-01-09 01:42:38","2020-01-09 01:43:38","2020-01-09 01:44:34","2020-01-09 01:45:34","2020-01-09 01:46:34","2020-01-09 01:47:34","2020-01-09 01:48:34","2020-01-09 01:49:29","2020-01-09 01:50:29","2020-01-09 01:51:29","2020-01-09 01:52:29","2020-01-09 01:53:29","2020-01-09 01:54:37","2020-01-09 01:55:37","2020-01-09 01:56:37","2020-01-09 01:57:37","2020-01-09 01:58:37","2020-01-09 01:59:32","2020-01-09 02:00:32","2020-01-09 02:01:32","2020-01-09 02:02:32","2020-01-09 02:03:32","2020-01-09 02:04:28","2020-01-09 02:05:28","2020-01-09 02:06:28","2020-01-09 02:07:28","2020-01-09 02:08:28","2020-01-09 02:09:36","2020-01-09 02:10:36","2020-01-09 02:11:36","2020-01-09 02:12:36","2020-01-09 02:13:36","2020-01-09 02:14:31","2020-01-09 02:15:31","2020-01-09 02:16:31","2020-01-09 02:17:31","2020-01-09 02:18:31","2020-01-09 02:19:39","2020-01-09 02:20:39","2020-01-09 02:21:39","2020-01-09 02:22:39","2020-01-09 02:23:39","2020-01-09 02:24:33","2020-01-09 02:25:33","2020-01-09 02:26:33","2020-01-09 02:27:33","2020-01-09 02:28:33","2020-01-09 02:29:29","2020-01-09 02:30:29","2020-01-09 02:31:29","2020-01-09 02:32:29","2020-01-09 02:33:29","2020-01-09 02:34:37","2020-01-09 02:35:37","2020-01-09 02:36:37","2020-01-09 02:37:37","2020-01-09 02:38:37","2020-01-09 02:39:33","2020-01-09 02:40:33","2020-01-09 02:41:33","2020-01-09 02:42:33","2020-01-09 02:43:33","2020-01-09 02:44:28","2020-01-09 02:45:28","2020-01-09 02:46:28","2020-01-09 02:47:28","2020-01-09 02:48:28","2020-01-09 02:49:36","2020-01-09 02:50:36","2020-01-09 02:51:36","2020-01-09 02:52:36","2020-01-09 02:53:36","2020-01-09 02:54:32","2020-01-09 02:55:32","2020-01-09 02:56:32","2020-01-09 02:57:32","2020-01-09 02:58:32","2020-01-09 02:59:27","2020-01-09 03:00:27","2020-01-09 03:01:27","2020-01-09 03:02:27","2020-01-09 03:03:27","2020-01-09 03:04:35","2020-01-09 03:05:35","2020-01-09 03:06:35","2020-01-09 03:07:35","2020-01-09 03:08:35","2020-01-09 03:09:30","2020-01-09 03:10:30","2020-01-09 03:11:30","2020-01-09 03:12:30","2020-01-09 03:13:30","2020-01-09 03:14:38","2020-01-09 03:15:38","2020-01-09 03:16:38","2020-01-09 03:17:38","2020-01-09 03:18:38","2020-01-09 03:19:32","2020-01-09 03:20:32","2020-01-09 03:21:32","2020-01-09 03:22:32","2020-01-09 03:23:32","2020-01-09 03:24:29","2020-01-09 03:25:29","2020-01-09 03:26:29","2020-01-09 03:27:29","2020-01-09 03:28:29","2020-01-09 03:29:38","2020-01-09 03:30:38","2020-01-09 03:31:38","2020-01-09 03:32:38","2020-01-09 03:33:38","2020-01-09 03:34:33","2020-01-09 03:35:33","2020-01-09 03:36:33","2020-01-09 03:37:33","2020-01-09 03:38:33","2020-01-09 03:39:28","2020-01-09 03:40:28","2020-01-09 03:41:28","2020-01-09 03:42:28","2020-01-09 03:43:28","2020-01-09 03:44:36","2020-01-09 03:45:36","2020-01-09 03:46:36","2020-01-09 03:47:36","2020-01-09 03:48:36","2020-01-09 03:49:32","2020-01-09 03:50:32","2020-01-09 03:51:32","2020-01-09 03:52:32","2020-01-09 03:53:32","2020-01-09 03:54:28","2020-01-09 03:55:28","2020-01-09 03:56:28","2020-01-09 03:57:28","2020-01-09 03:58:28","2020-01-09 03:59:37","2020-01-09 04:00:37","2020-01-09 04:01:37","2020-01-09 04:02:37","2020-01-09 04:03:37","2020-01-09 04:04:32","2020-01-09 04:05:32","2020-01-09 04:06:32","2020-01-09 04:07:32","2020-01-09 04:08:32","2020-01-09 04:09:28","2020-01-09 04:10:28","2020-01-09 04:11:28","2020-01-09 04:12:28","2020-01-09 04:13:28","2020-01-09 04:14:36","2020-01-09 04:15:36","2020-01-09 04:16:36","2020-01-09 04:17:36","2020-01-09 04:18:36","2020-01-09 04:19:30","2020-01-09 04:20:30","2020-01-09 04:21:30","2020-01-09 04:22:30","2020-01-09 04:23:30","2020-01-09 04:24:27","2020-01-09 04:25:27","2020-01-09 04:26:27","2020-01-09 04:27:27","2020-01-09 04:28:27","2020-01-09 04:29:35","2020-01-09 04:30:35","2020-01-09 04:31:35","2020-01-09 04:32:35","2020-01-09 04:33:35","2020-01-09 04:34:30","2020-01-09 04:35:30","2020-01-09 04:36:30","2020-01-09 04:37:30","2020-01-09 04:38:30","2020-01-09 04:39:39","2020-01-09 04:40:39","2020-01-09 04:41:39","2020-01-09 04:42:39","2020-01-09 04:43:39","2020-01-09 04:44:33","2020-01-09 04:45:33","2020-01-09 04:46:33","2020-01-09 04:47:33","2020-01-09 04:48:33","2020-01-09 04:49:29","2020-01-09 04:50:29","2020-01-09 04:51:29","2020-01-09 04:52:29","2020-01-09 04:53:29","2020-01-09 04:54:37","2020-01-09 04:55:37","2020-01-09 04:56:37","2020-01-09 04:57:37","2020-01-09 04:58:37","2020-01-09 04:59:31","2020-01-09 05:00:31","2020-01-09 05:01:31","2020-01-09 05:02:31","2020-01-09 05:03:31","2020-01-09 05:04:26","2020-01-09 05:05:26","2020-01-09 05:06:26","2020-01-09 05:07:26","2020-01-09 05:08:26","2020-01-09 05:09:35","2020-01-09 05:10:35","2020-01-09 05:11:35","2020-01-09 05:12:35","2020-01-09 05:13:35","2020-01-09 05:14:30","2020-01-09 05:15:30","2020-01-09 05:16:30","2020-01-09 05:17:30","2020-01-09 05:18:30","2020-01-09 05:19:37","2020-01-09 05:20:37","2020-01-09 05:21:37","2020-01-09 05:22:37","2020-01-09 05:23:37","2020-01-09 05:24:33","2020-01-09 05:25:33","2020-01-09 05:26:33","2020-01-09 05:27:33","2020-01-09 05:28:33","2020-01-09 05:29:29","2020-01-09 05:30:29","2020-01-09 05:31:29","2020-01-09 05:32:29","2020-01-09 05:33:29","2020-01-09 05:34:37","2020-01-09 05:35:37","2020-01-09 05:36:37","2020-01-09 05:37:37","2020-01-09 05:38:37","2020-01-09 05:39:32","2020-01-09 05:40:32","2020-01-09 05:41:32","2020-01-09 05:42:32","2020-01-09 05:43:32","2020-01-09 05:44:28","2020-01-09 05:45:28","2020-01-09 05:46:28","2020-01-09 05:47:28","2020-01-09 05:48:28","2020-01-09 05:49:35","2020-01-09 05:50:35","2020-01-09 05:51:35","2020-01-09 05:52:35","2020-01-09 05:53:35","2020-01-09 05:54:30","2020-01-09 05:55:30","2020-01-09 05:56:30","2020-01-09 05:57:30","2020-01-09 05:58:30","2020-01-09 05:59:39","2020-01-09 06:00:39","2020-01-09 06:01:39","2020-01-09 06:02:39","2020-01-09 06:03:39","2020-01-09 06:04:34","2020-01-09 06:05:34","2020-01-09 06:06:34","2020-01-09 06:07:34","2020-01-09 06:08:34","2020-01-09 06:09:28","2020-01-09 06:10:28","2020-01-09 06:11:28","2020-01-09 06:12:28","2020-01-09 06:13:28","2020-01-09 06:14:35","2020-01-09 06:15:35","2020-01-09 06:16:35","2020-01-09 06:17:35","2020-01-09 06:18:35","2020-01-09 06:19:30","2020-01-09 06:20:30","2020-01-09 06:21:30","2020-01-09 06:22:30","2020-01-09 06:23:30","2020-01-09 06:24:37","2020-01-09 06:25:37","2020-01-09 06:26:37","2020-01-09 06:27:37","2020-01-09 06:28:37","2020-01-09 06:29:32","2020-01-09 06:30:32","2020-01-09 06:31:32","2020-01-09 06:32:32","2020-01-09 06:33:32","2020-01-09 06:34:26","2020-01-09 06:35:26","2020-01-09 06:36:26","2020-01-09 06:37:26","2020-01-09 06:38:26","2020-01-09 06:39:33","2020-01-09 06:40:33","2020-01-09 06:41:33","2020-01-09 06:42:33","2020-01-09 06:43:33","2020-01-09 06:44:28","2020-01-09 06:45:28","2020-01-09 06:46:28","2020-01-09 06:47:28","2020-01-09 06:48:28","2020-01-09 06:49:36","2020-01-09 06:50:36","2020-01-09 06:51:36","2020-01-09 06:52:36","2020-01-09 06:53:36","2020-01-09 06:54:31","2020-01-09 06:55:31","2020-01-09 06:56:31","2020-01-09 06:57:31","2020-01-09 06:58:31","2020-01-09 06:59:37","2020-01-09 07:00:37","2020-01-09 07:01:37","2020-01-09 07:02:37","2020-01-09 07:03:37","2020-01-09 07:04:32","2020-01-09 07:05:32","2020-01-09 07:06:32","2020-01-09 07:07:32","2020-01-09 07:08:32","2020-01-09 07:09:27","2020-01-09 07:10:27","2020-01-09 07:11:27","2020-01-09 07:12:27","2020-01-09 07:13:27","2020-01-09 07:14:34","2020-01-09 07:15:34","2020-01-09 07:16:34","2020-01-09 07:17:34","2020-01-09 07:18:34","2020-01-09 07:19:28","2020-01-09 07:20:28","2020-01-09 07:21:28","2020-01-09 07:22:28","2020-01-09 07:23:28","2020-01-09 07:24:36","2020-01-09 07:25:36","2020-01-09 07:26:36","2020-01-09 07:27:36","2020-01-09 07:28:36","2020-01-09 07:29:30","2020-01-09 07:30:30","2020-01-09 07:31:30","2020-01-09 07:32:30","2020-01-09 07:33:30","2020-01-09 07:34:39","2020-01-09 07:35:39","2020-01-09 07:36:39","2020-01-09 07:37:39","2020-01-09 07:38:39","2020-01-09 07:39:33","2020-01-09 07:40:33","2020-01-09 07:41:33","2020-01-09 07:42:33","2020-01-09 07:43:33","2020-01-09 07:44:29","2020-01-09 07:45:29","2020-01-09 07:46:29","2020-01-09 07:47:29","2020-01-09 07:48:29","2020-01-09 07:49:36","2020-01-09 07:50:36","2020-01-09 07:51:36","2020-01-09 07:52:36","2020-01-09 07:53:36","2020-01-09 07:54:33","2020-01-09 07:55:33","2020-01-09 07:56:33","2020-01-09 07:57:33","2020-01-09 07:58:33","2020-01-09 07:59:28","2020-01-09 08:00:28","2020-01-09 08:01:28","2020-01-09 08:02:28","2020-01-09 08:03:28","2020-01-09 08:04:36","2020-01-09 08:05:36","2020-01-09 08:06:36","2020-01-09 08:07:36","2020-01-09 08:08:36","2020-01-09 08:09:31","2020-01-09 08:10:31","2020-01-09 08:11:31","2020-01-09 08:12:31","2020-01-09 08:13:31","2020-01-09 08:14:27","2020-01-09 08:15:27","2020-01-09 08:16:27","2020-01-09 08:17:27","2020-01-09 08:18:27","2020-01-09 08:19:36","2020-01-09 08:20:36","2020-01-09 08:21:36","2020-01-09 08:22:36","2020-01-09 08:23:36","2020-01-09 08:24:31","2020-01-09 08:25:31","2020-01-09 08:26:31","2020-01-09 08:27:31","2020-01-09 08:28:31","2020-01-09 08:29:26","2020-01-09 08:30:26","2020-01-09 08:31:26","2020-01-09 08:32:26","2020-01-09 08:33:26","2020-01-09 08:34:34","2020-01-09 08:35:34","2020-01-09 08:36:34","2020-01-09 08:37:34","2020-01-09 08:38:34","2020-01-09 08:39:29","2020-01-09 08:40:29","2020-01-09 08:41:29","2020-01-09 08:42:29","2020-01-09 08:43:29","2020-01-09 08:44:26","2020-01-09 08:45:26","2020-01-09 08:46:26","2020-01-09 08:47:26","2020-01-09 08:48:26","2020-01-09 08:49:35","2020-01-09 08:50:35","2020-01-09 08:51:35","2020-01-09 08:52:35","2020-01-09 08:53:35","2020-01-09 08:54:32","2020-01-09 08:55:32","2020-01-09 08:56:32","2020-01-09 08:57:32","2020-01-09 08:58:32","2020-01-09 08:59:27","2020-01-09 09:00:27","2020-01-09 09:01:27","2020-01-09 09:02:27","2020-01-09 09:03:27","2020-01-09 09:04:36","2020-01-09 09:05:36","2020-01-09 09:06:36","2020-01-09 09:07:36","2020-01-09 09:08:36","2020-01-09 09:09:32","2020-01-09 09:10:32","2020-01-09 09:11:32","2020-01-09 09:12:32","2020-01-09 09:13:32"],"values":[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0]}'
        },
        {
          healthResultAttr: {
            valueType: 3,
            alias: '最大心率',
            id: 78,
            healthResultAttrMappers: [],
            orderNo: 1,
            show: true,
            name: 'maxHeart'
          },
          value: '{"time":"2020-01-08 21:10:29","value":92.0}'
        },
        {
          healthResultAttr: {
            valueType: 3,
            alias: '最小心率',
            id: 79,
            healthResultAttrMappers: [],
            orderNo: 1,
            show: true,
            name: 'minHeart'
          },
          value: '{"time":"2020-01-08 19:59:39","value":0.0}'
        },
        {
          healthResultAttr: {
            valueType: 3,
            alias: '最大呼吸率',
            id: 80,
            healthResultAttrMappers: [],
            orderNo: 1,
            show: true,
            name: 'maxBreath'
          },
          value: '{"time":"2020-01-09 01:38:29","value":24.0}'
        },
        {
          healthResultAttr: {
            valueType: 3,
            alias: '最小呼吸率',
            id: 81,
            healthResultAttrMappers: [],
            orderNo: 1,
            show: true,
            name: 'minBreath'
          },
          value: '{"time":"2020-01-08 19:59:39","value":0.0}'
        },
        {
          healthResultAttr: {
            valueType: 2,
            alias: '打鼾时长',
            id: 82,
            healthResultAttrMappers: [],
            orderNo: 1,
            show: true,
            name: 'snoreDuration'
          },
          value: '47700'
        }
      ],
      fallAsleepDuration: 2459,
      sleepStatus: '中等',
      deepDuration: 5020,
      sleepTip:
        '1.睡前太饿或太饱都会影响睡眠。不要在即将睡觉时吃太多的东西，因为消化过程会容易醒过来。如果吃得太饱后躺在床上，会出现反胃的现象，胃酸会反到食道中，睡眠中会出现气闷，或呼吸困难情况。如果很饿，可以吃一些富含碳水化合物的零食，它们可以帮助人体释放出一些化学物质复合胺，可以让身体松弛下来更快入睡。\n2.建议睡前不要在床上打毛衣、读书、吃东西、看电视等。如果你只把床和睡觉联系起来，让大脑形成条件反射，躺在床上时就会更容易入睡。\n3.洗个热水澡：在睡觉前一到两个小时洗个热水澡。洗完之后，体温会逐渐降低，这会使人感到疲劳。但是不要在临睡前洗澡，因为这会使你兴奋，难以入睡。',
      generateBy: 0,
      template: 'T10',
      user: {
        id: 42458
      },
      meanBreathRate: 9,
      nrDuration: 837,
      snore: 0,
      wakeDuration: 3477,
      sleepStartAt: 1578501095000,
      status: true,
      leaveBedDuration: 0,
      sleepType: '标准型睡眠',
      nr2Duration: 10086,
      turnOver: 3,
      machineEntityPartCode: 'B2020000001D####left',
      remDuration: 2714,
      apneaCount: 0,
      leaveBedAt: 1578520710000,
      machineCode: 'B2020000001D',
      meanHeartRate: 42,
      onBedAt: 1578498636000,
      sleepEndAt: 1578519752000
    }
  },
  code: 200
}

export const weekSleepReport = {
  message: {
    status: 'OK',
    result: {
      sleepStage: [
        {
          endAt: 1575115021000,
          stage: 0,
          startAt: 1575114961000
        },
        {
          endAt: 1575115081000,
          stage: 0,
          startAt: 1575115021000
        },
        {
          endAt: 1575115141000,
          stage: 0,
          startAt: 1575115081000
        },
        {
          endAt: 1575115201000,
          stage: 0,
          startAt: 1575115141000
        },
        {
          endAt: 1575115261000,
          stage: 0,
          startAt: 1575115201000
        },
        {
          endAt: 1575115321000,
          stage: 0,
          startAt: 1575115261000
        },
        {
          endAt: 1575115381000,
          stage: 0,
          startAt: 1575115321000
        },
        {
          endAt: 1575115441000,
          stage: 0,
          startAt: 1575115381000
        },
        {
          endAt: 1575115501000,
          stage: 0,
          startAt: 1575115441000
        },
        {
          endAt: 1575115561000,
          stage: 0,
          startAt: 1575115501000
        },
        {
          endAt: 1575115621000,
          stage: 0,
          startAt: 1575115561000
        },
        {
          endAt: 1575115681000,
          stage: 0,
          startAt: 1575115621000
        },
        {
          endAt: 1575115741000,
          stage: 0,
          startAt: 1575115681000
        },
        {
          endAt: 1575115801000,
          stage: 0,
          startAt: 1575115741000
        },
        {
          endAt: 1575115861000,
          stage: 0,
          startAt: 1575115801000
        },
        {
          endAt: 1575115921000,
          stage: 0,
          startAt: 1575115861000
        },
        {
          endAt: 1575115981000,
          stage: 0,
          startAt: 1575115921000
        },
        {
          endAt: 1575116041000,
          stage: 0,
          startAt: 1575115981000
        },
        {
          endAt: 1575116101000,
          stage: 0,
          startAt: 1575116041000
        },
        {
          endAt: 1575116162000,
          stage: 0,
          startAt: 1575116101000
        },
        {
          endAt: 1575116222000,
          stage: 0,
          startAt: 1575116162000
        },
        {
          endAt: 1575116282000,
          stage: 0,
          startAt: 1575116222000
        },
        {
          endAt: 1575116342000,
          stage: 0,
          startAt: 1575116282000
        },
        {
          endAt: 1575116402000,
          stage: 0,
          startAt: 1575116342000
        },
        {
          endAt: 1575116461000,
          stage: 0,
          startAt: 1575116402000
        },
        {
          endAt: 1575116521000,
          stage: 0,
          startAt: 1575116461000
        },
        {
          endAt: 1575116581000,
          stage: 0,
          startAt: 1575116521000
        },
        {
          endAt: 1575116641000,
          stage: 0,
          startAt: 1575116581000
        },
        {
          endAt: 1575116701000,
          stage: 0,
          startAt: 1575116641000
        },
        {
          endAt: 1575116761000,
          stage: 0,
          startAt: 1575116701000
        },
        {
          endAt: 1575116821000,
          stage: 0,
          startAt: 1575116761000
        },
        {
          endAt: 1575116881000,
          stage: 0,
          startAt: 1575116821000
        },
        {
          endAt: 1575116941000,
          stage: 0,
          startAt: 1575116881000
        },
        {
          endAt: 1575117001000,
          stage: 0,
          startAt: 1575116941000
        },
        {
          endAt: 1575117061000,
          stage: 0,
          startAt: 1575117001000
        },
        {
          endAt: 1575117121000,
          stage: 0,
          startAt: 1575117061000
        },
        {
          endAt: 1575117181000,
          stage: 0,
          startAt: 1575117121000
        },
        {
          endAt: 1575117241000,
          stage: 0,
          startAt: 1575117181000
        },
        {
          endAt: 1575117301000,
          stage: 0,
          startAt: 1575117241000
        },
        {
          endAt: 1575117360000,
          stage: 0,
          startAt: 1575117301000
        },
        {
          endAt: 1575117420000,
          stage: 0,
          startAt: 1575117360000
        },
        {
          endAt: 1575117480000,
          stage: 0,
          startAt: 1575117420000
        },
        {
          endAt: 1575117540000,
          stage: 0,
          startAt: 1575117480000
        },
        {
          endAt: 1575117600000,
          stage: 0,
          startAt: 1575117540000
        },
        {
          endAt: 1575117661000,
          stage: 0,
          startAt: 1575117600000
        },
        {
          endAt: 1575117721000,
          stage: 0,
          startAt: 1575117661000
        },
        {
          endAt: 1575117781000,
          stage: 0,
          startAt: 1575117721000
        },
        {
          endAt: 1575117841000,
          stage: 0,
          startAt: 1575117781000
        },
        {
          endAt: 1575117901000,
          stage: 0,
          startAt: 1575117841000
        },
        {
          endAt: 1575117961000,
          stage: 0,
          startAt: 1575117901000
        },
        {
          endAt: 1575118021000,
          stage: 0,
          startAt: 1575117961000
        },
        {
          endAt: 1575118081000,
          stage: 0,
          startAt: 1575118021000
        },
        {
          endAt: 1575118141000,
          stage: 0,
          startAt: 1575118081000
        },
        {
          endAt: 1575118201000,
          stage: 0,
          startAt: 1575118141000
        },
        {
          endAt: 1575118261000,
          stage: 0,
          startAt: 1575118201000
        },
        {
          endAt: 1575118321000,
          stage: 0,
          startAt: 1575118261000
        },
        {
          endAt: 1575118381000,
          stage: 0,
          startAt: 1575118321000
        },
        {
          endAt: 1575118441000,
          stage: 0,
          startAt: 1575118381000
        },
        {
          endAt: 1575118501000,
          stage: 0,
          startAt: 1575118441000
        },
        {
          endAt: 1575118561000,
          stage: 0,
          startAt: 1575118501000
        },
        {
          endAt: 1575118621000,
          stage: 0,
          startAt: 1575118561000
        },
        {
          endAt: 1575118681000,
          stage: 0,
          startAt: 1575118621000
        },
        {
          endAt: 1575118741000,
          stage: 0,
          startAt: 1575118681000
        },
        {
          endAt: 1575118801000,
          stage: 0,
          startAt: 1575118741000
        },
        {
          endAt: 1575118862000,
          stage: 0,
          startAt: 1575118801000
        },
        {
          endAt: 1575118922000,
          stage: 0,
          startAt: 1575118862000
        },
        {
          endAt: 1575118982000,
          stage: 0,
          startAt: 1575118922000
        },
        {
          endAt: 1575119042000,
          stage: 0,
          startAt: 1575118982000
        },
        {
          endAt: 1575119102000,
          stage: 0,
          startAt: 1575119042000
        },
        {
          endAt: 1575119161000,
          stage: 0,
          startAt: 1575119102000
        },
        {
          endAt: 1575119221000,
          stage: 0,
          startAt: 1575119161000
        },
        {
          endAt: 1575119281000,
          stage: 0,
          startAt: 1575119221000
        },
        {
          endAt: 1575119341000,
          stage: 0,
          startAt: 1575119281000
        },
        {
          endAt: 1575119401000,
          stage: 0,
          startAt: 1575119341000
        },
        {
          endAt: 1575119461000,
          stage: 0,
          startAt: 1575119401000
        },
        {
          endAt: 1575119521000,
          stage: 0,
          startAt: 1575119461000
        },
        {
          endAt: 1575119581000,
          stage: 0,
          startAt: 1575119521000
        },
        {
          endAt: 1575119641000,
          stage: 0,
          startAt: 1575119581000
        },
        {
          endAt: 1575119701000,
          stage: 0,
          startAt: 1575119641000
        },
        {
          endAt: 1575119760000,
          stage: 0,
          startAt: 1575119701000
        },
        {
          endAt: 1575119820000,
          stage: 0,
          startAt: 1575119760000
        },
        {
          endAt: 1575119880000,
          stage: 0,
          startAt: 1575119820000
        },
        {
          endAt: 1575119940000,
          stage: 0,
          startAt: 1575119880000
        },
        {
          endAt: 1575120000000,
          stage: 0,
          startAt: 1575119940000
        },
        {
          endAt: 1575120061000,
          stage: 0,
          startAt: 1575120000000
        },
        {
          endAt: 1575120121000,
          stage: 0,
          startAt: 1575120061000
        },
        {
          endAt: 1575120181000,
          stage: 0,
          startAt: 1575120121000
        },
        {
          endAt: 1575120241000,
          stage: 0,
          startAt: 1575120181000
        },
        {
          endAt: 1575120301000,
          stage: 0,
          startAt: 1575120241000
        },
        {
          endAt: 1575120361000,
          stage: 0,
          startAt: 1575120301000
        },
        {
          endAt: 1575120421000,
          stage: 0,
          startAt: 1575120361000
        },
        {
          endAt: 1575120481000,
          stage: 0,
          startAt: 1575120421000
        },
        {
          endAt: 1575120541000,
          stage: 0,
          startAt: 1575120481000
        },
        {
          endAt: 1575120601000,
          stage: 0,
          startAt: 1575120541000
        },
        {
          endAt: 1575120661000,
          stage: 0,
          startAt: 1575120601000
        },
        {
          endAt: 1575120721000,
          stage: 0,
          startAt: 1575120661000
        },
        {
          endAt: 1575120781000,
          stage: 0,
          startAt: 1575120721000
        },
        {
          endAt: 1575120841000,
          stage: 0,
          startAt: 1575120781000
        },
        {
          endAt: 1575120901000,
          stage: 0,
          startAt: 1575120841000
        },
        {
          endAt: 1575120961000,
          stage: 0,
          startAt: 1575120901000
        },
        {
          endAt: 1575121021000,
          stage: 0,
          startAt: 1575120961000
        },
        {
          endAt: 1575121081000,
          stage: 0,
          startAt: 1575121021000
        },
        {
          endAt: 1575121141000,
          stage: 0,
          startAt: 1575121081000
        },
        {
          endAt: 1575121201000,
          stage: 0,
          startAt: 1575121141000
        },
        {
          endAt: 1575121261000,
          stage: 0,
          startAt: 1575121201000
        },
        {
          endAt: 1575121321000,
          stage: 0,
          startAt: 1575121261000
        },
        {
          endAt: 1575121381000,
          stage: 0,
          startAt: 1575121321000
        },
        {
          endAt: 1575121441000,
          stage: 0,
          startAt: 1575121381000
        },
        {
          endAt: 1575121501000,
          stage: 0,
          startAt: 1575121441000
        },
        {
          endAt: 1575121561000,
          stage: 0,
          startAt: 1575121501000
        },
        {
          endAt: 1575121621000,
          stage: 0,
          startAt: 1575121561000
        },
        {
          endAt: 1575121681000,
          stage: 0,
          startAt: 1575121621000
        },
        {
          endAt: 1575121741000,
          stage: 0,
          startAt: 1575121681000
        },
        {
          endAt: 1575121801000,
          stage: 0,
          startAt: 1575121741000
        },
        {
          endAt: 1575121861000,
          stage: 0,
          startAt: 1575121801000
        },
        {
          endAt: 1575121921000,
          stage: 0,
          startAt: 1575121861000
        },
        {
          endAt: 1575121981000,
          stage: 0,
          startAt: 1575121921000
        },
        {
          endAt: 1575122041000,
          stage: 0,
          startAt: 1575121981000
        },
        {
          endAt: 1575122101000,
          stage: 0,
          startAt: 1575122041000
        },
        {
          endAt: 1575122160000,
          stage: 0,
          startAt: 1575122101000
        },
        {
          endAt: 1575122220000,
          stage: 0,
          startAt: 1575122160000
        },
        {
          endAt: 1575122280000,
          stage: 0,
          startAt: 1575122220000
        },
        {
          endAt: 1575122340000,
          stage: 0,
          startAt: 1575122280000
        },
        {
          endAt: 1575122400000,
          stage: 0,
          startAt: 1575122340000
        },
        {
          endAt: 1575122460000,
          stage: 0,
          startAt: 1575122400000
        },
        {
          endAt: 1575122520000,
          stage: 0,
          startAt: 1575122460000
        },
        {
          endAt: 1575122580000,
          stage: 0,
          startAt: 1575122520000
        },
        {
          endAt: 1575122640000,
          stage: 0,
          startAt: 1575122580000
        },
        {
          endAt: 1575122700000,
          stage: 0,
          startAt: 1575122640000
        },
        {
          endAt: 1575122761000,
          stage: 0,
          startAt: 1575122700000
        },
        {
          endAt: 1575122821000,
          stage: 0,
          startAt: 1575122761000
        },
        {
          endAt: 1575122881000,
          stage: 0,
          startAt: 1575122821000
        },
        {
          endAt: 1575122941000,
          stage: 0,
          startAt: 1575122881000
        },
        {
          endAt: 1575123001000,
          stage: 0,
          startAt: 1575122941000
        },
        {
          endAt: 1575123061000,
          stage: 0,
          startAt: 1575123001000
        },
        {
          endAt: 1575123121000,
          stage: 0,
          startAt: 1575123061000
        },
        {
          endAt: 1575123181000,
          stage: 0,
          startAt: 1575123121000
        },
        {
          endAt: 1575123241000,
          stage: 0,
          startAt: 1575123181000
        },
        {
          endAt: 1575123301000,
          stage: 0,
          startAt: 1575123241000
        },
        {
          endAt: 1575123361000,
          stage: 0,
          startAt: 1575123301000
        },
        {
          endAt: 1575123421000,
          stage: 0,
          startAt: 1575123361000
        },
        {
          endAt: 1575123481000,
          stage: 0,
          startAt: 1575123421000
        },
        {
          endAt: 1575123541000,
          stage: 0,
          startAt: 1575123481000
        },
        {
          endAt: 1575123601000,
          stage: 0,
          startAt: 1575123541000
        },
        {
          endAt: 1575123660000,
          stage: 0,
          startAt: 1575123601000
        },
        {
          endAt: 1575123720000,
          stage: 0,
          startAt: 1575123660000
        },
        {
          endAt: 1575123780000,
          stage: 0,
          startAt: 1575123720000
        },
        {
          endAt: 1575123840000,
          stage: 0,
          startAt: 1575123780000
        },
        {
          endAt: 1575123900000,
          stage: 0,
          startAt: 1575123840000
        },
        {
          endAt: 1575123961000,
          stage: 0,
          startAt: 1575123900000
        },
        {
          endAt: 1575124021000,
          stage: 0,
          startAt: 1575123961000
        },
        {
          endAt: 1575124081000,
          stage: 0,
          startAt: 1575124021000
        },
        {
          endAt: 1575124141000,
          stage: 0,
          startAt: 1575124081000
        },
        {
          endAt: 1575124201000,
          stage: 0,
          startAt: 1575124141000
        },
        {
          endAt: 1575124261000,
          stage: 0,
          startAt: 1575124201000
        },
        {
          endAt: 1575124321000,
          stage: 0,
          startAt: 1575124261000
        },
        {
          endAt: 1575124381000,
          stage: 0,
          startAt: 1575124321000
        },
        {
          endAt: 1575124441000,
          stage: 0,
          startAt: 1575124381000
        },
        {
          endAt: 1575124501000,
          stage: 0,
          startAt: 1575124441000
        },
        {
          endAt: 1575124561000,
          stage: 0,
          startAt: 1575124501000
        },
        {
          endAt: 1575124621000,
          stage: 0,
          startAt: 1575124561000
        },
        {
          endAt: 1575124681000,
          stage: 0,
          startAt: 1575124621000
        },
        {
          endAt: 1575124741000,
          stage: 0,
          startAt: 1575124681000
        },
        {
          endAt: 1575124801000,
          stage: 0,
          startAt: 1575124741000
        },
        {
          endAt: 1575124860000,
          stage: 0,
          startAt: 1575124801000
        },
        {
          endAt: 1575124920000,
          stage: 0,
          startAt: 1575124860000
        },
        {
          endAt: 1575124980000,
          stage: 0,
          startAt: 1575124920000
        },
        {
          endAt: 1575125040000,
          stage: 0,
          startAt: 1575124980000
        },
        {
          endAt: 1575125100000,
          stage: 0,
          startAt: 1575125040000
        },
        {
          endAt: 1575125161000,
          stage: 0,
          startAt: 1575125100000
        },
        {
          endAt: 1575125221000,
          stage: 0,
          startAt: 1575125161000
        },
        {
          endAt: 1575125281000,
          stage: 0,
          startAt: 1575125221000
        },
        {
          endAt: 1575125341000,
          stage: 0,
          startAt: 1575125281000
        },
        {
          endAt: 1575125401000,
          stage: 0,
          startAt: 1575125341000
        },
        {
          endAt: 1575125461000,
          stage: 0,
          startAt: 1575125401000
        },
        {
          endAt: 1575125521000,
          stage: 0,
          startAt: 1575125461000
        },
        {
          endAt: 1575125581000,
          stage: 0,
          startAt: 1575125521000
        },
        {
          endAt: 1575125641000,
          stage: 0,
          startAt: 1575125581000
        },
        {
          endAt: 1575125701000,
          stage: 0,
          startAt: 1575125641000
        },
        {
          endAt: 1575125761000,
          stage: 0,
          startAt: 1575125701000
        },
        {
          endAt: 1575125821000,
          stage: 0,
          startAt: 1575125761000
        },
        {
          endAt: 1575125881000,
          stage: 0,
          startAt: 1575125821000
        },
        {
          endAt: 1575125941000,
          stage: 0,
          startAt: 1575125881000
        },
        {
          endAt: 1575126001000,
          stage: 0,
          startAt: 1575125941000
        },
        {
          endAt: 1575126062000,
          stage: 0,
          startAt: 1575126001000
        },
        {
          endAt: 1575126122000,
          stage: 0,
          startAt: 1575126062000
        },
        {
          endAt: 1575126182000,
          stage: 0,
          startAt: 1575126122000
        },
        {
          endAt: 1575126242000,
          stage: 0,
          startAt: 1575126182000
        },
        {
          endAt: 1575126302000,
          stage: 0,
          startAt: 1575126242000
        },
        {
          endAt: 1575126360000,
          stage: 0,
          startAt: 1575126302000
        },
        {
          endAt: 1575126420000,
          stage: 0,
          startAt: 1575126360000
        },
        {
          endAt: 1575126480000,
          stage: 0,
          startAt: 1575126420000
        },
        {
          endAt: 1575126540000,
          stage: 0,
          startAt: 1575126480000
        },
        {
          endAt: 1575126600000,
          stage: 0,
          startAt: 1575126540000
        },
        {
          endAt: 1575126658000,
          stage: 0,
          startAt: 1575126600000
        },
        {
          endAt: 1575126718000,
          stage: 0,
          startAt: 1575126658000
        },
        {
          endAt: 1575126778000,
          stage: 0,
          startAt: 1575126718000
        },
        {
          endAt: 1575126838000,
          stage: 0,
          startAt: 1575126778000
        },
        {
          endAt: 1575126898000,
          stage: 0,
          startAt: 1575126838000
        },
        {
          endAt: 1575126959000,
          stage: 0,
          startAt: 1575126898000
        },
        {
          endAt: 1575127019000,
          stage: 0,
          startAt: 1575126959000
        },
        {
          endAt: 1575127079000,
          stage: 0,
          startAt: 1575127019000
        },
        {
          endAt: 1575127139000,
          stage: 0,
          startAt: 1575127079000
        },
        {
          endAt: 1575127199000,
          stage: 0,
          startAt: 1575127139000
        },
        {
          endAt: 1575127259000,
          stage: 0,
          startAt: 1575127199000
        },
        {
          endAt: 1575127319000,
          stage: 0,
          startAt: 1575127259000
        },
        {
          endAt: 1575127379000,
          stage: 0,
          startAt: 1575127319000
        },
        {
          endAt: 1575127439000,
          stage: 0,
          startAt: 1575127379000
        },
        {
          endAt: 1575127499000,
          stage: 0,
          startAt: 1575127439000
        },
        {
          endAt: 1575127558000,
          stage: 0,
          startAt: 1575127499000
        },
        {
          endAt: 1575127618000,
          stage: 0,
          startAt: 1575127558000
        },
        {
          endAt: 1575127678000,
          stage: 0,
          startAt: 1575127618000
        },
        {
          endAt: 1575127738000,
          stage: 0,
          startAt: 1575127678000
        },
        {
          endAt: 1575127798000,
          stage: 0,
          startAt: 1575127738000
        },
        {
          endAt: 1575127858000,
          stage: 0,
          startAt: 1575127798000
        },
        {
          endAt: 1575127918000,
          stage: 0,
          startAt: 1575127858000
        },
        {
          endAt: 1575127978000,
          stage: 0,
          startAt: 1575127918000
        },
        {
          endAt: 1575128038000,
          stage: 0,
          startAt: 1575127978000
        },
        {
          endAt: 1575128098000,
          stage: 0,
          startAt: 1575128038000
        },
        {
          endAt: 1575128159000,
          stage: 0,
          startAt: 1575128098000
        },
        {
          endAt: 1575128219000,
          stage: 0,
          startAt: 1575128159000
        },
        {
          endAt: 1575128279000,
          stage: 0,
          startAt: 1575128219000
        },
        {
          endAt: 1575128339000,
          stage: 0,
          startAt: 1575128279000
        },
        {
          endAt: 1575128399000,
          stage: 0,
          startAt: 1575128339000
        },
        {
          endAt: 1575128460000,
          stage: 0,
          startAt: 1575128399000
        },
        {
          endAt: 1575128520000,
          stage: 0,
          startAt: 1575128460000
        },
        {
          endAt: 1575128580000,
          stage: 0,
          startAt: 1575128520000
        },
        {
          endAt: 1575128640000,
          stage: 0,
          startAt: 1575128580000
        },
        {
          endAt: 1575128700000,
          stage: 0,
          startAt: 1575128640000
        },
        {
          endAt: 1575128758000,
          stage: 0,
          startAt: 1575128700000
        },
        {
          endAt: 1575128818000,
          stage: 0,
          startAt: 1575128758000
        },
        {
          endAt: 1575128878000,
          stage: 0,
          startAt: 1575128818000
        },
        {
          endAt: 1575128938000,
          stage: 0,
          startAt: 1575128878000
        },
        {
          endAt: 1575128998000,
          stage: 0,
          startAt: 1575128938000
        },
        {
          endAt: 1575129058000,
          stage: 0,
          startAt: 1575128998000
        },
        {
          endAt: 1575129118000,
          stage: 0,
          startAt: 1575129058000
        },
        {
          endAt: 1575129178000,
          stage: 0,
          startAt: 1575129118000
        },
        {
          endAt: 1575129238000,
          stage: 0,
          startAt: 1575129178000
        },
        {
          endAt: 1575129298000,
          stage: 0,
          startAt: 1575129238000
        },
        {
          endAt: 1575129358000,
          stage: 0,
          startAt: 1575129298000
        },
        {
          endAt: 1575129418000,
          stage: 0,
          startAt: 1575129358000
        },
        {
          endAt: 1575129478000,
          stage: 0,
          startAt: 1575129418000
        },
        {
          endAt: 1575129538000,
          stage: 0,
          startAt: 1575129478000
        },
        {
          endAt: 1575129598000,
          stage: 0,
          startAt: 1575129538000
        },
        {
          endAt: 1575129659000,
          stage: 0,
          startAt: 1575129598000
        },
        {
          endAt: 1575129719000,
          stage: 0,
          startAt: 1575129659000
        },
        {
          endAt: 1575129779000,
          stage: 0,
          startAt: 1575129719000
        },
        {
          endAt: 1575129839000,
          stage: 0,
          startAt: 1575129779000
        },
        {
          endAt: 1575129899000,
          stage: 0,
          startAt: 1575129839000
        },
        {
          endAt: 1575129958000,
          stage: 0,
          startAt: 1575129899000
        },
        {
          endAt: 1575130018000,
          stage: 0,
          startAt: 1575129958000
        },
        {
          endAt: 1575130078000,
          stage: 0,
          startAt: 1575130018000
        },
        {
          endAt: 1575130138000,
          stage: 0,
          startAt: 1575130078000
        },
        {
          endAt: 1575130198000,
          stage: 0,
          startAt: 1575130138000
        },
        {
          endAt: 1575130258000,
          stage: 0,
          startAt: 1575130198000
        },
        {
          endAt: 1575130318000,
          stage: 0,
          startAt: 1575130258000
        },
        {
          endAt: 1575130378000,
          stage: 0,
          startAt: 1575130318000
        },
        {
          endAt: 1575130438000,
          stage: 0,
          startAt: 1575130378000
        },
        {
          endAt: 1575130498000,
          stage: 0,
          startAt: 1575130438000
        },
        {
          endAt: 1575130558000,
          stage: 0,
          startAt: 1575130498000
        },
        {
          endAt: 1575130618000,
          stage: 0,
          startAt: 1575130558000
        },
        {
          endAt: 1575130678000,
          stage: 0,
          startAt: 1575130618000
        },
        {
          endAt: 1575130738000,
          stage: 0,
          startAt: 1575130678000
        },
        {
          endAt: 1575130798000,
          stage: 0,
          startAt: 1575130738000
        },
        {
          endAt: 1575130859000,
          stage: 0,
          startAt: 1575130798000
        },
        {
          endAt: 1575130919000,
          stage: 0,
          startAt: 1575130859000
        },
        {
          endAt: 1575130979000,
          stage: 0,
          startAt: 1575130919000
        },
        {
          endAt: 1575131039000,
          stage: 0,
          startAt: 1575130979000
        },
        {
          endAt: 1575131099000,
          stage: 0,
          startAt: 1575131039000
        },
        {
          endAt: 1575131158000,
          stage: 0,
          startAt: 1575131099000
        },
        {
          endAt: 1575131218000,
          stage: 0,
          startAt: 1575131158000
        },
        {
          endAt: 1575131278000,
          stage: 0,
          startAt: 1575131218000
        },
        {
          endAt: 1575131338000,
          stage: 0,
          startAt: 1575131278000
        },
        {
          endAt: 1575131398000,
          stage: 0,
          startAt: 1575131338000
        },
        {
          endAt: 1575131459000,
          stage: 0,
          startAt: 1575131398000
        },
        {
          endAt: 1575131519000,
          stage: 0,
          startAt: 1575131459000
        },
        {
          endAt: 1575131579000,
          stage: 0,
          startAt: 1575131519000
        },
        {
          endAt: 1575131639000,
          stage: 0,
          startAt: 1575131579000
        },
        {
          endAt: 1575131699000,
          stage: 0,
          startAt: 1575131639000
        },
        {
          endAt: 1575131758000,
          stage: 0,
          startAt: 1575131699000
        },
        {
          endAt: 1575131818000,
          stage: 0,
          startAt: 1575131758000
        },
        {
          endAt: 1575131878000,
          stage: 0,
          startAt: 1575131818000
        },
        {
          endAt: 1575131938000,
          stage: 0,
          startAt: 1575131878000
        },
        {
          endAt: 1575131998000,
          stage: 0,
          startAt: 1575131938000
        },
        {
          endAt: 1575132058000,
          stage: 0,
          startAt: 1575131998000
        },
        {
          endAt: 1575132118000,
          stage: 0,
          startAt: 1575132058000
        },
        {
          endAt: 1575132178000,
          stage: 0,
          startAt: 1575132118000
        },
        {
          endAt: 1575132238000,
          stage: 0,
          startAt: 1575132178000
        },
        {
          endAt: 1575132298000,
          stage: 0,
          startAt: 1575132238000
        },
        {
          endAt: 1575132358000,
          stage: 0,
          startAt: 1575132298000
        },
        {
          endAt: 1575132418000,
          stage: 0,
          startAt: 1575132358000
        },
        {
          endAt: 1575132478000,
          stage: 0,
          startAt: 1575132418000
        },
        {
          endAt: 1575132538000,
          stage: 0,
          startAt: 1575132478000
        },
        {
          endAt: 1575132598000,
          stage: 0,
          startAt: 1575132538000
        },
        {
          endAt: 1575132658000,
          stage: 0,
          startAt: 1575132598000
        },
        {
          endAt: 1575132718000,
          stage: 0,
          startAt: 1575132658000
        },
        {
          endAt: 1575132778000,
          stage: 0,
          startAt: 1575132718000
        },
        {
          endAt: 1575132838000,
          stage: 0,
          startAt: 1575132778000
        },
        {
          endAt: 1575132898000,
          stage: 0,
          startAt: 1575132838000
        },
        {
          endAt: 1575132959000,
          stage: 0,
          startAt: 1575132898000
        },
        {
          endAt: 1575133019000,
          stage: 0,
          startAt: 1575132959000
        },
        {
          endAt: 1575133079000,
          stage: 0,
          startAt: 1575133019000
        },
        {
          endAt: 1575133139000,
          stage: 0,
          startAt: 1575133079000
        },
        {
          endAt: 1575133199000,
          stage: 0,
          startAt: 1575133139000
        },
        {
          endAt: 1575133259000,
          stage: 0,
          startAt: 1575133199000
        },
        {
          endAt: 1575133319000,
          stage: 0,
          startAt: 1575133259000
        },
        {
          endAt: 1575133379000,
          stage: 0,
          startAt: 1575133319000
        },
        {
          endAt: 1575133439000,
          stage: 0,
          startAt: 1575133379000
        },
        {
          endAt: 1575133499000,
          stage: 0,
          startAt: 1575133439000
        },
        {
          endAt: 1575133560000,
          stage: 0,
          startAt: 1575133499000
        },
        {
          endAt: 1575133620000,
          stage: 0,
          startAt: 1575133560000
        },
        {
          endAt: 1575133680000,
          stage: 0,
          startAt: 1575133620000
        },
        {
          endAt: 1575133740000,
          stage: 0,
          startAt: 1575133680000
        },
        {
          endAt: 1575133800000,
          stage: 0,
          startAt: 1575133740000
        },
        {
          endAt: 1575133858000,
          stage: 0,
          startAt: 1575133800000
        },
        {
          endAt: 1575133918000,
          stage: 0,
          startAt: 1575133858000
        },
        {
          endAt: 1575133978000,
          stage: 0,
          startAt: 1575133918000
        },
        {
          endAt: 1575134038000,
          stage: 0,
          startAt: 1575133978000
        },
        {
          endAt: 1575134098000,
          stage: 0,
          startAt: 1575134038000
        },
        {
          endAt: 1575134158000,
          stage: 0,
          startAt: 1575134098000
        },
        {
          endAt: 1575134218000,
          stage: 0,
          startAt: 1575134158000
        },
        {
          endAt: 1575134278000,
          stage: 0,
          startAt: 1575134218000
        },
        {
          endAt: 1575134338000,
          stage: 0,
          startAt: 1575134278000
        },
        {
          endAt: 1575134398000,
          stage: 0,
          startAt: 1575134338000
        },
        {
          endAt: 1575134459000,
          stage: 0,
          startAt: 1575134398000
        },
        {
          endAt: 1575134519000,
          stage: 0,
          startAt: 1575134459000
        },
        {
          endAt: 1575134579000,
          stage: 0,
          startAt: 1575134519000
        },
        {
          endAt: 1575134639000,
          stage: 0,
          startAt: 1575134579000
        },
        {
          endAt: 1575134699000,
          stage: 0,
          startAt: 1575134639000
        },
        {
          endAt: 1575134758000,
          stage: 0,
          startAt: 1575134699000
        },
        {
          endAt: 1575134818000,
          stage: 0,
          startAt: 1575134758000
        },
        {
          endAt: 1575134878000,
          stage: 0,
          startAt: 1575134818000
        },
        {
          endAt: 1575134938000,
          stage: 0,
          startAt: 1575134878000
        },
        {
          endAt: 1575134998000,
          stage: 0,
          startAt: 1575134938000
        },
        {
          endAt: 1575135058000,
          stage: 0,
          startAt: 1575134998000
        },
        {
          endAt: 1575135118000,
          stage: 0,
          startAt: 1575135058000
        },
        {
          endAt: 1575135178000,
          stage: 0,
          startAt: 1575135118000
        },
        {
          endAt: 1575135238000,
          stage: 0,
          startAt: 1575135178000
        },
        {
          endAt: 1575135298000,
          stage: 0,
          startAt: 1575135238000
        },
        {
          endAt: 1575135358000,
          stage: 0,
          startAt: 1575135298000
        },
        {
          endAt: 1575135418000,
          stage: 0,
          startAt: 1575135358000
        },
        {
          endAt: 1575135478000,
          stage: 0,
          startAt: 1575135418000
        },
        {
          endAt: 1575135538000,
          stage: 0,
          startAt: 1575135478000
        },
        {
          endAt: 1575135598000,
          stage: 0,
          startAt: 1575135538000
        },
        {
          endAt: 1575135659000,
          stage: 0,
          startAt: 1575135598000
        },
        {
          endAt: 1575135719000,
          stage: 0,
          startAt: 1575135659000
        },
        {
          endAt: 1575135779000,
          stage: 0,
          startAt: 1575135719000
        },
        {
          endAt: 1575135839000,
          stage: 0,
          startAt: 1575135779000
        },
        {
          endAt: 1575135899000,
          stage: 0,
          startAt: 1575135839000
        },
        {
          endAt: 1575135960000,
          stage: 0,
          startAt: 1575135899000
        },
        {
          endAt: 1575136020000,
          stage: 0,
          startAt: 1575135960000
        },
        {
          endAt: 1575136080000,
          stage: 0,
          startAt: 1575136020000
        },
        {
          endAt: 1575136140000,
          stage: 0,
          startAt: 1575136080000
        },
        {
          endAt: 1575136200000,
          stage: 0,
          startAt: 1575136140000
        },
        {
          endAt: 1575136258000,
          stage: 0,
          startAt: 1575136200000
        },
        {
          endAt: 1575136318000,
          stage: 0,
          startAt: 1575136258000
        },
        {
          endAt: 1575136378000,
          stage: 0,
          startAt: 1575136318000
        },
        {
          endAt: 1575136438000,
          stage: 0,
          startAt: 1575136378000
        },
        {
          endAt: 1575136498000,
          stage: 0,
          startAt: 1575136438000
        },
        {
          endAt: 1575136558000,
          stage: 0,
          startAt: 1575136498000
        },
        {
          endAt: 1575136618000,
          stage: 0,
          startAt: 1575136558000
        },
        {
          endAt: 1575136678000,
          stage: 0,
          startAt: 1575136618000
        },
        {
          endAt: 1575136738000,
          stage: 0,
          startAt: 1575136678000
        },
        {
          endAt: 1575136798000,
          stage: 0,
          startAt: 1575136738000
        },
        {
          endAt: 1575136858000,
          stage: 0,
          startAt: 1575136798000
        },
        {
          endAt: 1575136918000,
          stage: 0,
          startAt: 1575136858000
        },
        {
          endAt: 1575136978000,
          stage: 0,
          startAt: 1575136918000
        },
        {
          endAt: 1575137038000,
          stage: 0,
          startAt: 1575136978000
        },
        {
          endAt: 1575137098000,
          stage: 0,
          startAt: 1575137038000
        },
        {
          endAt: 1575137159000,
          stage: 0,
          startAt: 1575137098000
        },
        {
          endAt: 1575137219000,
          stage: 0,
          startAt: 1575137159000
        },
        {
          endAt: 1575137279000,
          stage: 0,
          startAt: 1575137219000
        },
        {
          endAt: 1575137339000,
          stage: 0,
          startAt: 1575137279000
        },
        {
          endAt: 1575137399000,
          stage: 0,
          startAt: 1575137339000
        },
        {
          endAt: 1575137458000,
          stage: 0,
          startAt: 1575137399000
        },
        {
          endAt: 1575137518000,
          stage: 0,
          startAt: 1575137458000
        },
        {
          endAt: 1575137578000,
          stage: 0,
          startAt: 1575137518000
        },
        {
          endAt: 1575137638000,
          stage: 0,
          startAt: 1575137578000
        },
        {
          endAt: 1575137698000,
          stage: 0,
          startAt: 1575137638000
        },
        {
          endAt: 1575137758000,
          stage: 0,
          startAt: 1575137698000
        },
        {
          endAt: 1575137818000,
          stage: 0,
          startAt: 1575137758000
        },
        {
          endAt: 1575137878000,
          stage: 0,
          startAt: 1575137818000
        },
        {
          endAt: 1575137938000,
          stage: 0,
          startAt: 1575137878000
        },
        {
          endAt: 1575137998000,
          stage: 0,
          startAt: 1575137938000
        },
        {
          endAt: 1575138058000,
          stage: 0,
          startAt: 1575137998000
        },
        {
          endAt: 1575138118000,
          stage: 0,
          startAt: 1575138058000
        },
        {
          endAt: 1575138178000,
          stage: 0,
          startAt: 1575138118000
        },
        {
          endAt: 1575138238000,
          stage: 0,
          startAt: 1575138178000
        },
        {
          endAt: 1575138298000,
          stage: 0,
          startAt: 1575138238000
        },
        {
          endAt: 1575138360000,
          stage: 0,
          startAt: 1575138298000
        },
        {
          endAt: 1575138420000,
          stage: 0,
          startAt: 1575138360000
        },
        {
          endAt: 1575138480000,
          stage: 0,
          startAt: 1575138420000
        },
        {
          endAt: 1575138540000,
          stage: 0,
          startAt: 1575138480000
        },
        {
          endAt: 1575138600000,
          stage: 0,
          startAt: 1575138540000
        },
        {
          endAt: 1575138658000,
          stage: 0,
          startAt: 1575138600000
        },
        {
          endAt: 1575138718000,
          stage: 0,
          startAt: 1575138658000
        },
        {
          endAt: 1575138778000,
          stage: 0,
          startAt: 1575138718000
        },
        {
          endAt: 1575138838000,
          stage: 0,
          startAt: 1575138778000
        },
        {
          endAt: 1575138898000,
          stage: 0,
          startAt: 1575138838000
        },
        {
          endAt: 1575138958000,
          stage: 0,
          startAt: 1575138898000
        },
        {
          endAt: 1575139018000,
          stage: 0,
          startAt: 1575138958000
        },
        {
          endAt: 1575139078000,
          stage: 0,
          startAt: 1575139018000
        },
        {
          endAt: 1575139138000,
          stage: 0,
          startAt: 1575139078000
        },
        {
          endAt: 1575139198000,
          stage: 0,
          startAt: 1575139138000
        },
        {
          endAt: 1575139258000,
          stage: 0,
          startAt: 1575139198000
        },
        {
          endAt: 1575139318000,
          stage: 0,
          startAt: 1575139258000
        },
        {
          endAt: 1575139378000,
          stage: 0,
          startAt: 1575139318000
        },
        {
          endAt: 1575139438000,
          stage: 0,
          startAt: 1575139378000
        },
        {
          endAt: 1575139498000,
          stage: 0,
          startAt: 1575139438000
        },
        {
          endAt: 1575139558000,
          stage: 0,
          startAt: 1575139498000
        },
        {
          endAt: 1575139618000,
          stage: 0,
          startAt: 1575139558000
        },
        {
          endAt: 1575139678000,
          stage: 0,
          startAt: 1575139618000
        },
        {
          endAt: 1575139738000,
          stage: 0,
          startAt: 1575139678000
        },
        {
          endAt: 1575139798000,
          stage: 0,
          startAt: 1575139738000
        },
        {
          endAt: 1575139857000,
          stage: 0,
          startAt: 1575139798000
        },
        {
          endAt: 1575139917000,
          stage: 0,
          startAt: 1575139857000
        },
        {
          endAt: 1575139977000,
          stage: 0,
          startAt: 1575139917000
        },
        {
          endAt: 1575140037000,
          stage: 0,
          startAt: 1575139977000
        },
        {
          endAt: 1575140097000,
          stage: 0,
          startAt: 1575140037000
        },
        {
          endAt: 1575140158000,
          stage: 0,
          startAt: 1575140097000
        },
        {
          endAt: 1575140218000,
          stage: 0,
          startAt: 1575140158000
        },
        {
          endAt: 1575140278000,
          stage: 0,
          startAt: 1575140218000
        },
        {
          endAt: 1575140338000,
          stage: 0,
          startAt: 1575140278000
        },
        {
          endAt: 1575140398000,
          stage: 0,
          startAt: 1575140338000
        },
        {
          endAt: 1575140458000,
          stage: 0,
          startAt: 1575140398000
        },
        {
          endAt: 1575140518000,
          stage: 0,
          startAt: 1575140458000
        },
        {
          endAt: 1575140578000,
          stage: 0,
          startAt: 1575140518000
        },
        {
          endAt: 1575140638000,
          stage: 0,
          startAt: 1575140578000
        },
        {
          endAt: 1575140698000,
          stage: 0,
          startAt: 1575140638000
        },
        {
          endAt: 1575140759000,
          stage: 0,
          startAt: 1575140698000
        },
        {
          endAt: 1575140819000,
          stage: 0,
          startAt: 1575140759000
        },
        {
          endAt: 1575140879000,
          stage: 0,
          startAt: 1575140819000
        },
        {
          endAt: 1575140939000,
          stage: 0,
          startAt: 1575140879000
        },
        {
          endAt: 1575140999000,
          stage: 0,
          startAt: 1575140939000
        },
        {
          endAt: 1575141058000,
          stage: 0,
          startAt: 1575140999000
        },
        {
          endAt: 1575141118000,
          stage: 0,
          startAt: 1575141058000
        },
        {
          endAt: 1575141178000,
          stage: 0,
          startAt: 1575141118000
        },
        {
          endAt: 1575141238000,
          stage: 0,
          startAt: 1575141178000
        },
        {
          endAt: 1575141298000,
          stage: 0,
          startAt: 1575141238000
        },
        {
          endAt: 1575141358000,
          stage: 0,
          startAt: 1575141298000
        },
        {
          endAt: 1575141418000,
          stage: 0,
          startAt: 1575141358000
        },
        {
          endAt: 1575141478000,
          stage: 0,
          startAt: 1575141418000
        },
        {
          endAt: 1575141538000,
          stage: 0,
          startAt: 1575141478000
        },
        {
          endAt: 1575141598000,
          stage: 0,
          startAt: 1575141538000
        },
        {
          endAt: 1575141657000,
          stage: 0,
          startAt: 1575141598000
        },
        {
          endAt: 1575141717000,
          stage: 0,
          startAt: 1575141657000
        },
        {
          endAt: 1575141777000,
          stage: 0,
          startAt: 1575141717000
        },
        {
          endAt: 1575141837000,
          stage: 0,
          startAt: 1575141777000
        },
        {
          endAt: 1575141897000,
          stage: 0,
          startAt: 1575141837000
        },
        {
          endAt: 1575141958000,
          stage: 0,
          startAt: 1575141897000
        },
        {
          endAt: 1575142018000,
          stage: 0,
          startAt: 1575141958000
        },
        {
          endAt: 1575142078000,
          stage: 0,
          startAt: 1575142018000
        },
        {
          endAt: 1575142138000,
          stage: 0,
          startAt: 1575142078000
        },
        {
          endAt: 1575142198000,
          stage: 0,
          startAt: 1575142138000
        },
        {
          endAt: 1575142258000,
          stage: 0,
          startAt: 1575142198000
        },
        {
          endAt: 1575142318000,
          stage: 0,
          startAt: 1575142258000
        },
        {
          endAt: 1575142378000,
          stage: 0,
          startAt: 1575142318000
        },
        {
          endAt: 1575142438000,
          stage: 0,
          startAt: 1575142378000
        },
        {
          endAt: 1575142498000,
          stage: 0,
          startAt: 1575142438000
        },
        {
          endAt: 1575142558000,
          stage: 0,
          startAt: 1575142498000
        },
        {
          endAt: 1575142618000,
          stage: 0,
          startAt: 1575142558000
        },
        {
          endAt: 1575142678000,
          stage: 0,
          startAt: 1575142618000
        },
        {
          endAt: 1575142738000,
          stage: 0,
          startAt: 1575142678000
        },
        {
          endAt: 1575142798000,
          stage: 0,
          startAt: 1575142738000
        },
        {
          endAt: 1575142857000,
          stage: 0,
          startAt: 1575142798000
        },
        {
          endAt: 1575142917000,
          stage: 0,
          startAt: 1575142857000
        },
        {
          endAt: 1575142977000,
          stage: 0,
          startAt: 1575142917000
        },
        {
          endAt: 1575143037000,
          stage: 0,
          startAt: 1575142977000
        },
        {
          endAt: 1575143097000,
          stage: 0,
          startAt: 1575143037000
        },
        {
          endAt: 1575143159000,
          stage: 0,
          startAt: 1575143097000
        },
        {
          endAt: 1575143219000,
          stage: 0,
          startAt: 1575143159000
        },
        {
          endAt: 1575143279000,
          stage: 0,
          startAt: 1575143219000
        },
        {
          endAt: 1575143339000,
          stage: 0,
          startAt: 1575143279000
        },
        {
          endAt: 1575143399000,
          stage: 0,
          startAt: 1575143339000
        },
        {
          endAt: 1575143458000,
          stage: 0,
          startAt: 1575143399000
        },
        {
          endAt: 1575143518000,
          stage: 0,
          startAt: 1575143458000
        },
        {
          endAt: 1575143578000,
          stage: 0,
          startAt: 1575143518000
        },
        {
          endAt: 1575143638000,
          stage: 0,
          startAt: 1575143578000
        },
        {
          endAt: 1575143698000,
          stage: 0,
          startAt: 1575143638000
        },
        {
          endAt: 1575143758000,
          stage: 0,
          startAt: 1575143698000
        },
        {
          endAt: 1575143818000,
          stage: 0,
          startAt: 1575143758000
        },
        {
          endAt: 1575143878000,
          stage: 0,
          startAt: 1575143818000
        },
        {
          endAt: 1575143938000,
          stage: 0,
          startAt: 1575143878000
        },
        {
          endAt: 1575143998000,
          stage: 0,
          startAt: 1575143938000
        },
        {
          endAt: 1575144057000,
          stage: 0,
          startAt: 1575143998000
        },
        {
          endAt: 1575144117000,
          stage: 0,
          startAt: 1575144057000
        },
        {
          endAt: 1575144177000,
          stage: 0,
          startAt: 1575144117000
        },
        {
          endAt: 1575144237000,
          stage: 0,
          startAt: 1575144177000
        },
        {
          endAt: 1575144297000,
          stage: 0,
          startAt: 1575144237000
        },
        {
          endAt: 1575144358000,
          stage: 0,
          startAt: 1575144297000
        },
        {
          endAt: 1575144418000,
          stage: 0,
          startAt: 1575144358000
        },
        {
          endAt: 1575144478000,
          stage: 0,
          startAt: 1575144418000
        },
        {
          endAt: 1575144538000,
          stage: 0,
          startAt: 1575144478000
        },
        {
          endAt: 1575144598000,
          stage: 0,
          startAt: 1575144538000
        },
        {
          endAt: 1575144658000,
          stage: 0,
          startAt: 1575144598000
        },
        {
          endAt: 1575144718000,
          stage: 0,
          startAt: 1575144658000
        },
        {
          endAt: 1575144778000,
          stage: 0,
          startAt: 1575144718000
        },
        {
          endAt: 1575144838000,
          stage: 0,
          startAt: 1575144778000
        },
        {
          endAt: 1575144898000,
          stage: 0,
          startAt: 1575144838000
        },
        {
          endAt: 1575144958000,
          stage: 0,
          startAt: 1575144898000
        },
        {
          endAt: 1575145018000,
          stage: 0,
          startAt: 1575144958000
        },
        {
          endAt: 1575145078000,
          stage: 0,
          startAt: 1575145018000
        },
        {
          endAt: 1575145138000,
          stage: 0,
          startAt: 1575145078000
        },
        {
          endAt: 1575145198000,
          stage: 0,
          startAt: 1575145138000
        },
        {
          endAt: 1575145257000,
          stage: 0,
          startAt: 1575145198000
        },
        {
          endAt: 1575145317000,
          stage: 0,
          startAt: 1575145257000
        },
        {
          endAt: 1575145377000,
          stage: 0,
          startAt: 1575145317000
        },
        {
          endAt: 1575145437000,
          stage: 0,
          startAt: 1575145377000
        },
        {
          endAt: 1575145497000,
          stage: 0,
          startAt: 1575145437000
        },
        {
          endAt: 1575145558000,
          stage: 0,
          startAt: 1575145497000
        },
        {
          endAt: 1575145618000,
          stage: 0,
          startAt: 1575145558000
        },
        {
          endAt: 1575145678000,
          stage: 0,
          startAt: 1575145618000
        },
        {
          endAt: 1575145738000,
          stage: 0,
          startAt: 1575145678000
        },
        {
          endAt: 1575145798000,
          stage: 0,
          startAt: 1575145738000
        },
        {
          endAt: 1575145858000,
          stage: 0,
          startAt: 1575145798000
        },
        {
          endAt: 1575145918000,
          stage: 0,
          startAt: 1575145858000
        },
        {
          endAt: 1575145978000,
          stage: 0,
          startAt: 1575145918000
        },
        {
          endAt: 1575146038000,
          stage: 0,
          startAt: 1575145978000
        },
        {
          endAt: 1575146098000,
          stage: 0,
          startAt: 1575146038000
        },
        {
          endAt: 1575146158000,
          stage: 0,
          startAt: 1575146098000
        },
        {
          endAt: 1575146218000,
          stage: 0,
          startAt: 1575146158000
        },
        {
          endAt: 1575146278000,
          stage: 0,
          startAt: 1575146218000
        },
        {
          endAt: 1575146338000,
          stage: 0,
          startAt: 1575146278000
        },
        {
          endAt: 1575146398000,
          stage: 0,
          startAt: 1575146338000
        },
        {
          endAt: 1575146458000,
          stage: 0,
          startAt: 1575146398000
        },
        {
          endAt: 1575146518000,
          stage: 0,
          startAt: 1575146458000
        },
        {
          endAt: 1575146578000,
          stage: 0,
          startAt: 1575146518000
        },
        {
          endAt: 1575146638000,
          stage: 0,
          startAt: 1575146578000
        },
        {
          endAt: 1575146698000,
          stage: 0,
          startAt: 1575146638000
        },
        {
          endAt: 1575146757000,
          stage: 0,
          startAt: 1575146698000
        },
        {
          endAt: 1575146817000,
          stage: 0,
          startAt: 1575146757000
        },
        {
          endAt: 1575146877000,
          stage: 0,
          startAt: 1575146817000
        },
        {
          endAt: 1575146937000,
          stage: 0,
          startAt: 1575146877000
        },
        {
          endAt: 1575146997000,
          stage: 0,
          startAt: 1575146937000
        },
        {
          endAt: 1575147058000,
          stage: 0,
          startAt: 1575146997000
        },
        {
          endAt: 1575147118000,
          stage: 0,
          startAt: 1575147058000
        },
        {
          endAt: 1575147178000,
          stage: 0,
          startAt: 1575147118000
        },
        {
          endAt: 1575147238000,
          stage: 0,
          startAt: 1575147178000
        },
        {
          endAt: 1575147298000,
          stage: 0,
          startAt: 1575147238000
        },
        {
          endAt: 1575147358000,
          stage: 0,
          startAt: 1575147298000
        },
        {
          endAt: 1575147418000,
          stage: 0,
          startAt: 1575147358000
        },
        {
          endAt: 1575147478000,
          stage: 0,
          startAt: 1575147418000
        },
        {
          endAt: 1575147538000,
          stage: 0,
          startAt: 1575147478000
        },
        {
          endAt: 1575147598000,
          stage: 0,
          startAt: 1575147538000
        },
        {
          endAt: 1575147658000,
          stage: 0,
          startAt: 1575147598000
        },
        {
          endAt: 1575147718000,
          stage: 0,
          startAt: 1575147658000
        },
        {
          endAt: 1575147778000,
          stage: 0,
          startAt: 1575147718000
        },
        {
          endAt: 1575147838000,
          stage: 0,
          startAt: 1575147778000
        },
        {
          endAt: 1575147898000,
          stage: 0,
          startAt: 1575147838000
        },
        {
          endAt: 1575147958000,
          stage: 0,
          startAt: 1575147898000
        },
        {
          endAt: 1575148018000,
          stage: 0,
          startAt: 1575147958000
        },
        {
          endAt: 1575148078000,
          stage: 0,
          startAt: 1575148018000
        },
        {
          endAt: 1575148138000,
          stage: 0,
          startAt: 1575148078000
        },
        {
          endAt: 1575148198000,
          stage: 0,
          startAt: 1575148138000
        },
        {
          endAt: 1575148259000,
          stage: 0,
          startAt: 1575148198000
        },
        {
          endAt: 1575148319000,
          stage: 0,
          startAt: 1575148259000
        },
        {
          endAt: 1575148379000,
          stage: 0,
          startAt: 1575148319000
        },
        {
          endAt: 1575148439000,
          stage: 0,
          startAt: 1575148379000
        },
        {
          endAt: 1575148499000,
          stage: 0,
          startAt: 1575148439000
        },
        {
          endAt: 1575148558000,
          stage: 0,
          startAt: 1575148499000
        },
        {
          endAt: 1575148618000,
          stage: 0,
          startAt: 1575148558000
        },
        {
          endAt: 1575148678000,
          stage: 0,
          startAt: 1575148618000
        },
        {
          endAt: 1575148738000,
          stage: 0,
          startAt: 1575148678000
        },
        {
          endAt: 1575148798000,
          stage: 0,
          startAt: 1575148738000
        },
        {
          endAt: 1575148858000,
          stage: 0,
          startAt: 1575148798000
        },
        {
          endAt: 1575148918000,
          stage: 0,
          startAt: 1575148858000
        },
        {
          endAt: 1575148978000,
          stage: 0,
          startAt: 1575148918000
        },
        {
          endAt: 1575149038000,
          stage: 0,
          startAt: 1575148978000
        },
        {
          endAt: 1575149098000,
          stage: 0,
          startAt: 1575149038000
        },
        {
          endAt: 1575149157000,
          stage: 0,
          startAt: 1575149098000
        },
        {
          endAt: 1575149217000,
          stage: 0,
          startAt: 1575149157000
        },
        {
          endAt: 1575149277000,
          stage: 0,
          startAt: 1575149217000
        },
        {
          endAt: 1575149337000,
          stage: 0,
          startAt: 1575149277000
        },
        {
          endAt: 1575149397000,
          stage: 0,
          startAt: 1575149337000
        },
        {
          endAt: 1575149457000,
          stage: 0,
          startAt: 1575149397000
        },
        {
          endAt: 1575149517000,
          stage: 0,
          startAt: 1575149457000
        },
        {
          endAt: 1575149577000,
          stage: 0,
          startAt: 1575149517000
        },
        {
          endAt: 1575149637000,
          stage: 0,
          startAt: 1575149577000
        },
        {
          endAt: 1575149697000,
          stage: 0,
          startAt: 1575149637000
        },
        {
          endAt: 1575149758000,
          stage: 0,
          startAt: 1575149697000
        },
        {
          endAt: 1575149818000,
          stage: 0,
          startAt: 1575149758000
        },
        {
          endAt: 1575149878000,
          stage: 0,
          startAt: 1575149818000
        },
        {
          endAt: 1575149938000,
          stage: 0,
          startAt: 1575149878000
        },
        {
          endAt: 1575149998000,
          stage: 0,
          startAt: 1575149938000
        },
        {
          endAt: 1575150058000,
          stage: 0,
          startAt: 1575149998000
        },
        {
          endAt: 1575150118000,
          stage: 0,
          startAt: 1575150058000
        },
        {
          endAt: 1575150178000,
          stage: 0,
          startAt: 1575150118000
        },
        {
          endAt: 1575150238000,
          stage: 0,
          startAt: 1575150178000
        },
        {
          endAt: 1575150298000,
          stage: 0,
          startAt: 1575150238000
        },
        {
          endAt: 1575150358000,
          stage: 0,
          startAt: 1575150298000
        },
        {
          endAt: 1575150418000,
          stage: 0,
          startAt: 1575150358000
        },
        {
          endAt: 1575150478000,
          stage: 0,
          startAt: 1575150418000
        },
        {
          endAt: 1575150538000,
          stage: 0,
          startAt: 1575150478000
        },
        {
          endAt: 1575150598000,
          stage: 0,
          startAt: 1575150538000
        },
        {
          endAt: 1575150659000,
          stage: 0,
          startAt: 1575150598000
        },
        {
          endAt: 1575150719000,
          stage: 0,
          startAt: 1575150659000
        },
        {
          endAt: 1575150779000,
          stage: 0,
          startAt: 1575150719000
        },
        {
          endAt: 1575150839000,
          stage: 0,
          startAt: 1575150779000
        },
        {
          endAt: 1575150899000,
          stage: 0,
          startAt: 1575150839000
        },
        {
          endAt: 1575150957000,
          stage: 0,
          startAt: 1575150899000
        },
        {
          endAt: 1575151017000,
          stage: 0,
          startAt: 1575150957000
        },
        {
          endAt: 1575151077000,
          stage: 0,
          startAt: 1575151017000
        },
        {
          endAt: 1575151137000,
          stage: 0,
          startAt: 1575151077000
        },
        {
          endAt: 1575151197000,
          stage: 0,
          startAt: 1575151137000
        },
        {
          endAt: 1575151257000,
          stage: 0,
          startAt: 1575151197000
        },
        {
          endAt: 1575151317000,
          stage: 0,
          startAt: 1575151257000
        },
        {
          endAt: 1575151377000,
          stage: 0,
          startAt: 1575151317000
        },
        {
          endAt: 1575151437000,
          stage: 0,
          startAt: 1575151377000
        },
        {
          endAt: 1575151497000,
          stage: 0,
          startAt: 1575151437000
        },
        {
          endAt: 1575151558000,
          stage: 0,
          startAt: 1575151497000
        },
        {
          endAt: 1575151618000,
          stage: 0,
          startAt: 1575151558000
        },
        {
          endAt: 1575151678000,
          stage: 0,
          startAt: 1575151618000
        },
        {
          endAt: 1575151738000,
          stage: 0,
          startAt: 1575151678000
        },
        {
          endAt: 1575151798000,
          stage: 0,
          startAt: 1575151738000
        },
        {
          endAt: 1575151857000,
          stage: 0,
          startAt: 1575151798000
        },
        {
          endAt: 1575151917000,
          stage: 0,
          startAt: 1575151857000
        },
        {
          endAt: 1575151977000,
          stage: 0,
          startAt: 1575151917000
        },
        {
          endAt: 1575152037000,
          stage: 0,
          startAt: 1575151977000
        },
        {
          endAt: 1575152097000,
          stage: 0,
          startAt: 1575152037000
        },
        {
          endAt: 1575152157000,
          stage: 0,
          startAt: 1575152097000
        },
        {
          endAt: 1575152217000,
          stage: 0,
          startAt: 1575152157000
        },
        {
          endAt: 1575152277000,
          stage: 0,
          startAt: 1575152217000
        },
        {
          endAt: 1575152337000,
          stage: 0,
          startAt: 1575152277000
        },
        {
          endAt: 1575152397000,
          stage: 0,
          startAt: 1575152337000
        },
        {
          endAt: 1575152457000,
          stage: 0,
          startAt: 1575152397000
        },
        {
          endAt: 1575152517000,
          stage: 0,
          startAt: 1575152457000
        },
        {
          endAt: 1575152577000,
          stage: 0,
          startAt: 1575152517000
        },
        {
          endAt: 1575152637000,
          stage: 0,
          startAt: 1575152577000
        },
        {
          endAt: 1575152697000,
          stage: 0,
          startAt: 1575152637000
        },
        {
          endAt: 1575152757000,
          stage: 0,
          startAt: 1575152697000
        },
        {
          endAt: 1575152817000,
          stage: 0,
          startAt: 1575152757000
        },
        {
          endAt: 1575152877000,
          stage: 0,
          startAt: 1575152817000
        },
        {
          endAt: 1575152937000,
          stage: 0,
          startAt: 1575152877000
        },
        {
          endAt: 1575152997000,
          stage: 0,
          startAt: 1575152937000
        },
        {
          endAt: 1575153059000,
          stage: 0,
          startAt: 1575152997000
        },
        {
          endAt: 1575153119000,
          stage: 0,
          startAt: 1575153059000
        },
        {
          endAt: 1575153179000,
          stage: 0,
          startAt: 1575153119000
        },
        {
          endAt: 1575153239000,
          stage: 0,
          startAt: 1575153179000
        },
        {
          endAt: 1575153299000,
          stage: 0,
          startAt: 1575153239000
        },
        {
          endAt: 1575153299000,
          stage: 0,
          startAt: 1575153299000
        }
      ],
      leaveBedAt: 1575153299000,
      fallAsleepDuration: 0,
      remDuration: 0,
      status: true,
      meanHeartRate: 0,
      generateAt: 1575169200189,
      enterSleepDuration: 38398,
      createAt: 1575169200189,
      score: 47,
      template: 'T10',
      sleepStartAt: 1575114961000,
      meanBreathRate: 0,
      deepDuration: 0,
      attrs: [
        {
          healthResultAttr: {
            valueType: 3,
            alias: '呼吸率时序图',
            id: 74,
            healthResultAttrMappers: [],
            orderNo: 1,
            show: true,
            name: 'breathTimeLog'
          },
          value:
            '{"labels":["2019-11-30 19:56:01","2019-11-30 19:57:01","2019-11-30 19:58:01","2019-11-30 19:59:01","2019-11-30 20:00:01","2019-11-30 20:01:01","2019-11-30 20:02:01","2019-11-30 20:03:01","2019-11-30 20:04:01","2019-11-30 20:05:01","2019-11-30 20:06:01","2019-11-30 20:07:01","2019-11-30 20:08:01","2019-11-30 20:09:01","2019-11-30 20:10:01","2019-11-30 20:11:01","2019-11-30 20:12:01","2019-11-30 20:13:01","2019-11-30 20:14:01","2019-11-30 20:15:01","2019-11-30 20:16:02","2019-11-30 20:17:02","2019-11-30 20:18:02","2019-11-30 20:19:02","2019-11-30 20:20:02","2019-11-30 20:21:01","2019-11-30 20:22:01","2019-11-30 20:23:01","2019-11-30 20:24:01","2019-11-30 20:25:01","2019-11-30 20:26:01","2019-11-30 20:27:01","2019-11-30 20:28:01","2019-11-30 20:29:01","2019-11-30 20:30:01","2019-11-30 20:31:01","2019-11-30 20:32:01","2019-11-30 20:33:01","2019-11-30 20:34:01","2019-11-30 20:35:01","2019-11-30 20:36:00","2019-11-30 20:37:00","2019-11-30 20:38:00","2019-11-30 20:39:00","2019-11-30 20:40:00","2019-11-30 20:41:01","2019-11-30 20:42:01","2019-11-30 20:43:01","2019-11-30 20:44:01","2019-11-30 20:45:01","2019-11-30 20:46:01","2019-11-30 20:47:01","2019-11-30 20:48:01","2019-11-30 20:49:01","2019-11-30 20:50:01","2019-11-30 20:51:01","2019-11-30 20:52:01","2019-11-30 20:53:01","2019-11-30 20:54:01","2019-11-30 20:55:01","2019-11-30 20:56:01","2019-11-30 20:57:01","2019-11-30 20:58:01","2019-11-30 20:59:01","2019-11-30 21:00:01","2019-11-30 21:01:02","2019-11-30 21:02:02","2019-11-30 21:03:02","2019-11-30 21:04:02","2019-11-30 21:05:02","2019-11-30 21:06:01","2019-11-30 21:07:01","2019-11-30 21:08:01","2019-11-30 21:09:01","2019-11-30 21:10:01","2019-11-30 21:11:01","2019-11-30 21:12:01","2019-11-30 21:13:01","2019-11-30 21:14:01","2019-11-30 21:15:01","2019-11-30 21:16:00","2019-11-30 21:17:00","2019-11-30 21:18:00","2019-11-30 21:19:00","2019-11-30 21:20:00","2019-11-30 21:21:01","2019-11-30 21:22:01","2019-11-30 21:23:01","2019-11-30 21:24:01","2019-11-30 21:25:01","2019-11-30 21:26:01","2019-11-30 21:27:01","2019-11-30 21:28:01","2019-11-30 21:29:01","2019-11-30 21:30:01","2019-11-30 21:31:01","2019-11-30 21:32:01","2019-11-30 21:33:01","2019-11-30 21:34:01","2019-11-30 21:35:01","2019-11-30 21:36:01","2019-11-30 21:37:01","2019-11-30 21:38:01","2019-11-30 21:39:01","2019-11-30 21:40:01","2019-11-30 21:41:01","2019-11-30 21:42:01","2019-11-30 21:43:01","2019-11-30 21:44:01","2019-11-30 21:45:01","2019-11-30 21:46:01","2019-11-30 21:47:01","2019-11-30 21:48:01","2019-11-30 21:49:01","2019-11-30 21:50:01","2019-11-30 21:51:01","2019-11-30 21:52:01","2019-11-30 21:53:01","2019-11-30 21:54:01","2019-11-30 21:55:01","2019-11-30 21:56:00","2019-11-30 21:57:00","2019-11-30 21:58:00","2019-11-30 21:59:00","2019-11-30 22:00:00","2019-11-30 22:01:00","2019-11-30 22:02:00","2019-11-30 22:03:00","2019-11-30 22:04:00","2019-11-30 22:05:00","2019-11-30 22:06:01","2019-11-30 22:07:01","2019-11-30 22:08:01","2019-11-30 22:09:01","2019-11-30 22:10:01","2019-11-30 22:11:01","2019-11-30 22:12:01","2019-11-30 22:13:01","2019-11-30 22:14:01","2019-11-30 22:15:01","2019-11-30 22:16:01","2019-11-30 22:17:01","2019-11-30 22:18:01","2019-11-30 22:19:01","2019-11-30 22:20:01","2019-11-30 22:21:00","2019-11-30 22:22:00","2019-11-30 22:23:00","2019-11-30 22:24:00","2019-11-30 22:25:00","2019-11-30 22:26:01","2019-11-30 22:27:01","2019-11-30 22:28:01","2019-11-30 22:29:01","2019-11-30 22:30:01","2019-11-30 22:31:01","2019-11-30 22:32:01","2019-11-30 22:33:01","2019-11-30 22:34:01","2019-11-30 22:35:01","2019-11-30 22:36:01","2019-11-30 22:37:01","2019-11-30 22:38:01","2019-11-30 22:39:01","2019-11-30 22:40:01","2019-11-30 22:41:00","2019-11-30 22:42:00","2019-11-30 22:43:00","2019-11-30 22:44:00","2019-11-30 22:45:00","2019-11-30 22:46:01","2019-11-30 22:47:01","2019-11-30 22:48:01","2019-11-30 22:49:01","2019-11-30 22:50:01","2019-11-30 22:51:01","2019-11-30 22:52:01","2019-11-30 22:53:01","2019-11-30 22:54:01","2019-11-30 22:55:01","2019-11-30 22:56:01","2019-11-30 22:57:01","2019-11-30 22:58:01","2019-11-30 22:59:01","2019-11-30 23:00:01","2019-11-30 23:01:02","2019-11-30 23:02:02","2019-11-30 23:03:02","2019-11-30 23:04:02","2019-11-30 23:05:02","2019-11-30 23:06:00","2019-11-30 23:07:00","2019-11-30 23:08:00","2019-11-30 23:09:00","2019-11-30 23:10:00","2019-11-30 23:10:58","2019-11-30 23:11:58","2019-11-30 23:12:58","2019-11-30 23:13:58","2019-11-30 23:14:58","2019-11-30 23:15:59","2019-11-30 23:16:59","2019-11-30 23:17:59","2019-11-30 23:18:59","2019-11-30 23:19:59","2019-11-30 23:20:59","2019-11-30 23:21:59","2019-11-30 23:22:59","2019-11-30 23:23:59","2019-11-30 23:24:59","2019-11-30 23:25:58","2019-11-30 23:26:58","2019-11-30 23:27:58","2019-11-30 23:28:58","2019-11-30 23:29:58","2019-11-30 23:30:58","2019-11-30 23:31:58","2019-11-30 23:32:58","2019-11-30 23:33:58","2019-11-30 23:34:58","2019-11-30 23:35:59","2019-11-30 23:36:59","2019-11-30 23:37:59","2019-11-30 23:38:59","2019-11-30 23:39:59","2019-11-30 23:41:00","2019-11-30 23:42:00","2019-11-30 23:43:00","2019-11-30 23:44:00","2019-11-30 23:45:00","2019-11-30 23:45:58","2019-11-30 23:46:58","2019-11-30 23:47:58","2019-11-30 23:48:58","2019-11-30 23:49:58","2019-11-30 23:50:58","2019-11-30 23:51:58","2019-11-30 23:52:58","2019-11-30 23:53:58","2019-11-30 23:54:58","2019-11-30 23:55:58","2019-11-30 23:56:58","2019-11-30 23:57:58","2019-11-30 23:58:58","2019-11-30 23:59:58","2019-12-01 00:00:59","2019-12-01 00:01:59","2019-12-01 00:02:59","2019-12-01 00:03:59","2019-12-01 00:04:59","2019-12-01 00:05:58","2019-12-01 00:06:58","2019-12-01 00:07:58","2019-12-01 00:08:58","2019-12-01 00:09:58","2019-12-01 00:10:58","2019-12-01 00:11:58","2019-12-01 00:12:58","2019-12-01 00:13:58","2019-12-01 00:14:58","2019-12-01 00:15:58","2019-12-01 00:16:58","2019-12-01 00:17:58","2019-12-01 00:18:58","2019-12-01 00:19:58","2019-12-01 00:20:59","2019-12-01 00:21:59","2019-12-01 00:22:59","2019-12-01 00:23:59","2019-12-01 00:24:59","2019-12-01 00:25:58","2019-12-01 00:26:58","2019-12-01 00:27:58","2019-12-01 00:28:58","2019-12-01 00:29:58","2019-12-01 00:30:59","2019-12-01 00:31:59","2019-12-01 00:32:59","2019-12-01 00:33:59","2019-12-01 00:34:59","2019-12-01 00:35:58","2019-12-01 00:36:58","2019-12-01 00:37:58","2019-12-01 00:38:58","2019-12-01 00:39:58","2019-12-01 00:40:58","2019-12-01 00:41:58","2019-12-01 00:42:58","2019-12-01 00:43:58","2019-12-01 00:44:58","2019-12-01 00:45:58","2019-12-01 00:46:58","2019-12-01 00:47:58","2019-12-01 00:48:58","2019-12-01 00:49:58","2019-12-01 00:50:58","2019-12-01 00:51:58","2019-12-01 00:52:58","2019-12-01 00:53:58","2019-12-01 00:54:58","2019-12-01 00:55:59","2019-12-01 00:56:59","2019-12-01 00:57:59","2019-12-01 00:58:59","2019-12-01 00:59:59","2019-12-01 01:00:59","2019-12-01 01:01:59","2019-12-01 01:02:59","2019-12-01 01:03:59","2019-12-01 01:04:59","2019-12-01 01:06:00","2019-12-01 01:07:00","2019-12-01 01:08:00","2019-12-01 01:09:00","2019-12-01 01:10:00","2019-12-01 01:10:58","2019-12-01 01:11:58","2019-12-01 01:12:58","2019-12-01 01:13:58","2019-12-01 01:14:58","2019-12-01 01:15:58","2019-12-01 01:16:58","2019-12-01 01:17:58","2019-12-01 01:18:58","2019-12-01 01:19:58","2019-12-01 01:20:59","2019-12-01 01:21:59","2019-12-01 01:22:59","2019-12-01 01:23:59","2019-12-01 01:24:59","2019-12-01 01:25:58","2019-12-01 01:26:58","2019-12-01 01:27:58","2019-12-01 01:28:58","2019-12-01 01:29:58","2019-12-01 01:30:58","2019-12-01 01:31:58","2019-12-01 01:32:58","2019-12-01 01:33:58","2019-12-01 01:34:58","2019-12-01 01:35:58","2019-12-01 01:36:58","2019-12-01 01:37:58","2019-12-01 01:38:58","2019-12-01 01:39:58","2019-12-01 01:40:59","2019-12-01 01:41:59","2019-12-01 01:42:59","2019-12-01 01:43:59","2019-12-01 01:44:59","2019-12-01 01:46:00","2019-12-01 01:47:00","2019-12-01 01:48:00","2019-12-01 01:49:00","2019-12-01 01:50:00","2019-12-01 01:50:58","2019-12-01 01:51:58","2019-12-01 01:52:58","2019-12-01 01:53:58","2019-12-01 01:54:58","2019-12-01 01:55:58","2019-12-01 01:56:58","2019-12-01 01:57:58","2019-12-01 01:58:58","2019-12-01 01:59:58","2019-12-01 02:00:58","2019-12-01 02:01:58","2019-12-01 02:02:58","2019-12-01 02:03:58","2019-12-01 02:04:58","2019-12-01 02:05:59","2019-12-01 02:06:59","2019-12-01 02:07:59","2019-12-01 02:08:59","2019-12-01 02:09:59","2019-12-01 02:10:58","2019-12-01 02:11:58","2019-12-01 02:12:58","2019-12-01 02:13:58","2019-12-01 02:14:58","2019-12-01 02:15:58","2019-12-01 02:16:58","2019-12-01 02:17:58","2019-12-01 02:18:58","2019-12-01 02:19:58","2019-12-01 02:20:58","2019-12-01 02:21:58","2019-12-01 02:22:58","2019-12-01 02:23:58","2019-12-01 02:24:58","2019-12-01 02:26:00","2019-12-01 02:27:00","2019-12-01 02:28:00","2019-12-01 02:29:00","2019-12-01 02:30:00","2019-12-01 02:30:58","2019-12-01 02:31:58","2019-12-01 02:32:58","2019-12-01 02:33:58","2019-12-01 02:34:58","2019-12-01 02:35:58","2019-12-01 02:36:58","2019-12-01 02:37:58","2019-12-01 02:38:58","2019-12-01 02:39:58","2019-12-01 02:40:58","2019-12-01 02:41:58","2019-12-01 02:42:58","2019-12-01 02:43:58","2019-12-01 02:44:58","2019-12-01 02:45:58","2019-12-01 02:46:58","2019-12-01 02:47:58","2019-12-01 02:48:58","2019-12-01 02:49:58","2019-12-01 02:50:57","2019-12-01 02:51:57","2019-12-01 02:52:57","2019-12-01 02:53:57","2019-12-01 02:54:57","2019-12-01 02:55:58","2019-12-01 02:56:58","2019-12-01 02:57:58","2019-12-01 02:58:58","2019-12-01 02:59:58","2019-12-01 03:00:58","2019-12-01 03:01:58","2019-12-01 03:02:58","2019-12-01 03:03:58","2019-12-01 03:04:58","2019-12-01 03:05:59","2019-12-01 03:06:59","2019-12-01 03:07:59","2019-12-01 03:08:59","2019-12-01 03:09:59","2019-12-01 03:10:58","2019-12-01 03:11:58","2019-12-01 03:12:58","2019-12-01 03:13:58","2019-12-01 03:14:58","2019-12-01 03:15:58","2019-12-01 03:16:58","2019-12-01 03:17:58","2019-12-01 03:18:58","2019-12-01 03:19:58","2019-12-01 03:20:57","2019-12-01 03:21:57","2019-12-01 03:22:57","2019-12-01 03:23:57","2019-12-01 03:24:57","2019-12-01 03:25:58","2019-12-01 03:26:58","2019-12-01 03:27:58","2019-12-01 03:28:58","2019-12-01 03:29:58","2019-12-01 03:30:58","2019-12-01 03:31:58","2019-12-01 03:32:58","2019-12-01 03:33:58","2019-12-01 03:34:58","2019-12-01 03:35:58","2019-12-01 03:36:58","2019-12-01 03:37:58","2019-12-01 03:38:58","2019-12-01 03:39:58","2019-12-01 03:40:57","2019-12-01 03:41:57","2019-12-01 03:42:57","2019-12-01 03:43:57","2019-12-01 03:44:57","2019-12-01 03:45:59","2019-12-01 03:46:59","2019-12-01 03:47:59","2019-12-01 03:48:59","2019-12-01 03:49:59","2019-12-01 03:50:58","2019-12-01 03:51:58","2019-12-01 03:52:58","2019-12-01 03:53:58","2019-12-01 03:54:58","2019-12-01 03:55:58","2019-12-01 03:56:58","2019-12-01 03:57:58","2019-12-01 03:58:58","2019-12-01 03:59:58","2019-12-01 04:00:57","2019-12-01 04:01:57","2019-12-01 04:02:57","2019-12-01 04:03:57","2019-12-01 04:04:57","2019-12-01 04:05:58","2019-12-01 04:06:58","2019-12-01 04:07:58","2019-12-01 04:08:58","2019-12-01 04:09:58","2019-12-01 04:10:58","2019-12-01 04:11:58","2019-12-01 04:12:58","2019-12-01 04:13:58","2019-12-01 04:14:58","2019-12-01 04:15:58","2019-12-01 04:16:58","2019-12-01 04:17:58","2019-12-01 04:18:58","2019-12-01 04:19:58","2019-12-01 04:20:57","2019-12-01 04:21:57","2019-12-01 04:22:57","2019-12-01 04:23:57","2019-12-01 04:24:57","2019-12-01 04:25:58","2019-12-01 04:26:58","2019-12-01 04:27:58","2019-12-01 04:28:58","2019-12-01 04:29:58","2019-12-01 04:30:58","2019-12-01 04:31:58","2019-12-01 04:32:58","2019-12-01 04:33:58","2019-12-01 04:34:58","2019-12-01 04:35:58","2019-12-01 04:36:58","2019-12-01 04:37:58","2019-12-01 04:38:58","2019-12-01 04:39:58","2019-12-01 04:40:58","2019-12-01 04:41:58","2019-12-01 04:42:58","2019-12-01 04:43:58","2019-12-01 04:44:58","2019-12-01 04:45:57","2019-12-01 04:46:57","2019-12-01 04:47:57","2019-12-01 04:48:57","2019-12-01 04:49:57","2019-12-01 04:50:58","2019-12-01 04:51:58","2019-12-01 04:52:58","2019-12-01 04:53:58","2019-12-01 04:54:58","2019-12-01 04:55:58","2019-12-01 04:56:58","2019-12-01 04:57:58","2019-12-01 04:58:58","2019-12-01 04:59:58","2019-12-01 05:00:58","2019-12-01 05:01:58","2019-12-01 05:02:58","2019-12-01 05:03:58","2019-12-01 05:04:58","2019-12-01 05:05:58","2019-12-01 05:06:58","2019-12-01 05:07:58","2019-12-01 05:08:58","2019-12-01 05:09:58","2019-12-01 05:10:59","2019-12-01 05:11:59","2019-12-01 05:12:59","2019-12-01 05:13:59","2019-12-01 05:14:59","2019-12-01 05:15:58","2019-12-01 05:16:58","2019-12-01 05:17:58","2019-12-01 05:18:58","2019-12-01 05:19:58","2019-12-01 05:20:58","2019-12-01 05:21:58","2019-12-01 05:22:58","2019-12-01 05:23:58","2019-12-01 05:24:58","2019-12-01 05:25:57","2019-12-01 05:26:57","2019-12-01 05:27:57","2019-12-01 05:28:57","2019-12-01 05:29:57","2019-12-01 05:30:57","2019-12-01 05:31:57","2019-12-01 05:32:57","2019-12-01 05:33:57","2019-12-01 05:34:57","2019-12-01 05:35:58","2019-12-01 05:36:58","2019-12-01 05:37:58","2019-12-01 05:38:58","2019-12-01 05:39:58","2019-12-01 05:40:58","2019-12-01 05:41:58","2019-12-01 05:42:58","2019-12-01 05:43:58","2019-12-01 05:44:58","2019-12-01 05:45:58","2019-12-01 05:46:58","2019-12-01 05:47:58","2019-12-01 05:48:58","2019-12-01 05:49:58","2019-12-01 05:50:59","2019-12-01 05:51:59","2019-12-01 05:52:59","2019-12-01 05:53:59","2019-12-01 05:54:59","2019-12-01 05:55:57","2019-12-01 05:56:57","2019-12-01 05:57:57","2019-12-01 05:58:57","2019-12-01 05:59:57","2019-12-01 06:00:57","2019-12-01 06:01:57","2019-12-01 06:02:57","2019-12-01 06:03:57","2019-12-01 06:04:57","2019-12-01 06:05:58","2019-12-01 06:06:58","2019-12-01 06:07:58","2019-12-01 06:08:58","2019-12-01 06:09:58","2019-12-01 06:10:57","2019-12-01 06:11:57","2019-12-01 06:12:57","2019-12-01 06:13:57","2019-12-01 06:14:57","2019-12-01 06:15:57","2019-12-01 06:16:57","2019-12-01 06:17:57","2019-12-01 06:18:57","2019-12-01 06:19:57","2019-12-01 06:20:57","2019-12-01 06:21:57","2019-12-01 06:22:57","2019-12-01 06:23:57","2019-12-01 06:24:57","2019-12-01 06:25:57","2019-12-01 06:26:57","2019-12-01 06:27:57","2019-12-01 06:28:57","2019-12-01 06:29:57","2019-12-01 06:30:59","2019-12-01 06:31:59","2019-12-01 06:32:59","2019-12-01 06:33:59","2019-12-01 06:34:59"],"values":[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0]}'
        },
        {
          healthResultAttr: {
            valueType: 3,
            alias: '心率时序',
            id: 75,
            healthResultAttrMappers: [],
            orderNo: 1,
            show: true,
            name: 'heartTimeLog'
          },
          value:
            '{"labels":["2019-11-30 19:56:01","2019-11-30 19:57:01","2019-11-30 19:58:01","2019-11-30 19:59:01","2019-11-30 20:00:01","2019-11-30 20:01:01","2019-11-30 20:02:01","2019-11-30 20:03:01","2019-11-30 20:04:01","2019-11-30 20:05:01","2019-11-30 20:06:01","2019-11-30 20:07:01","2019-11-30 20:08:01","2019-11-30 20:09:01","2019-11-30 20:10:01","2019-11-30 20:11:01","2019-11-30 20:12:01","2019-11-30 20:13:01","2019-11-30 20:14:01","2019-11-30 20:15:01","2019-11-30 20:16:02","2019-11-30 20:17:02","2019-11-30 20:18:02","2019-11-30 20:19:02","2019-11-30 20:20:02","2019-11-30 20:21:01","2019-11-30 20:22:01","2019-11-30 20:23:01","2019-11-30 20:24:01","2019-11-30 20:25:01","2019-11-30 20:26:01","2019-11-30 20:27:01","2019-11-30 20:28:01","2019-11-30 20:29:01","2019-11-30 20:30:01","2019-11-30 20:31:01","2019-11-30 20:32:01","2019-11-30 20:33:01","2019-11-30 20:34:01","2019-11-30 20:35:01","2019-11-30 20:36:00","2019-11-30 20:37:00","2019-11-30 20:38:00","2019-11-30 20:39:00","2019-11-30 20:40:00","2019-11-30 20:41:01","2019-11-30 20:42:01","2019-11-30 20:43:01","2019-11-30 20:44:01","2019-11-30 20:45:01","2019-11-30 20:46:01","2019-11-30 20:47:01","2019-11-30 20:48:01","2019-11-30 20:49:01","2019-11-30 20:50:01","2019-11-30 20:51:01","2019-11-30 20:52:01","2019-11-30 20:53:01","2019-11-30 20:54:01","2019-11-30 20:55:01","2019-11-30 20:56:01","2019-11-30 20:57:01","2019-11-30 20:58:01","2019-11-30 20:59:01","2019-11-30 21:00:01","2019-11-30 21:01:02","2019-11-30 21:02:02","2019-11-30 21:03:02","2019-11-30 21:04:02","2019-11-30 21:05:02","2019-11-30 21:06:01","2019-11-30 21:07:01","2019-11-30 21:08:01","2019-11-30 21:09:01","2019-11-30 21:10:01","2019-11-30 21:11:01","2019-11-30 21:12:01","2019-11-30 21:13:01","2019-11-30 21:14:01","2019-11-30 21:15:01","2019-11-30 21:16:00","2019-11-30 21:17:00","2019-11-30 21:18:00","2019-11-30 21:19:00","2019-11-30 21:20:00","2019-11-30 21:21:01","2019-11-30 21:22:01","2019-11-30 21:23:01","2019-11-30 21:24:01","2019-11-30 21:25:01","2019-11-30 21:26:01","2019-11-30 21:27:01","2019-11-30 21:28:01","2019-11-30 21:29:01","2019-11-30 21:30:01","2019-11-30 21:31:01","2019-11-30 21:32:01","2019-11-30 21:33:01","2019-11-30 21:34:01","2019-11-30 21:35:01","2019-11-30 21:36:01","2019-11-30 21:37:01","2019-11-30 21:38:01","2019-11-30 21:39:01","2019-11-30 21:40:01","2019-11-30 21:41:01","2019-11-30 21:42:01","2019-11-30 21:43:01","2019-11-30 21:44:01","2019-11-30 21:45:01","2019-11-30 21:46:01","2019-11-30 21:47:01","2019-11-30 21:48:01","2019-11-30 21:49:01","2019-11-30 21:50:01","2019-11-30 21:51:01","2019-11-30 21:52:01","2019-11-30 21:53:01","2019-11-30 21:54:01","2019-11-30 21:55:01","2019-11-30 21:56:00","2019-11-30 21:57:00","2019-11-30 21:58:00","2019-11-30 21:59:00","2019-11-30 22:00:00","2019-11-30 22:01:00","2019-11-30 22:02:00","2019-11-30 22:03:00","2019-11-30 22:04:00","2019-11-30 22:05:00","2019-11-30 22:06:01","2019-11-30 22:07:01","2019-11-30 22:08:01","2019-11-30 22:09:01","2019-11-30 22:10:01","2019-11-30 22:11:01","2019-11-30 22:12:01","2019-11-30 22:13:01","2019-11-30 22:14:01","2019-11-30 22:15:01","2019-11-30 22:16:01","2019-11-30 22:17:01","2019-11-30 22:18:01","2019-11-30 22:19:01","2019-11-30 22:20:01","2019-11-30 22:21:00","2019-11-30 22:22:00","2019-11-30 22:23:00","2019-11-30 22:24:00","2019-11-30 22:25:00","2019-11-30 22:26:01","2019-11-30 22:27:01","2019-11-30 22:28:01","2019-11-30 22:29:01","2019-11-30 22:30:01","2019-11-30 22:31:01","2019-11-30 22:32:01","2019-11-30 22:33:01","2019-11-30 22:34:01","2019-11-30 22:35:01","2019-11-30 22:36:01","2019-11-30 22:37:01","2019-11-30 22:38:01","2019-11-30 22:39:01","2019-11-30 22:40:01","2019-11-30 22:41:00","2019-11-30 22:42:00","2019-11-30 22:43:00","2019-11-30 22:44:00","2019-11-30 22:45:00","2019-11-30 22:46:01","2019-11-30 22:47:01","2019-11-30 22:48:01","2019-11-30 22:49:01","2019-11-30 22:50:01","2019-11-30 22:51:01","2019-11-30 22:52:01","2019-11-30 22:53:01","2019-11-30 22:54:01","2019-11-30 22:55:01","2019-11-30 22:56:01","2019-11-30 22:57:01","2019-11-30 22:58:01","2019-11-30 22:59:01","2019-11-30 23:00:01","2019-11-30 23:01:02","2019-11-30 23:02:02","2019-11-30 23:03:02","2019-11-30 23:04:02","2019-11-30 23:05:02","2019-11-30 23:06:00","2019-11-30 23:07:00","2019-11-30 23:08:00","2019-11-30 23:09:00","2019-11-30 23:10:00","2019-11-30 23:10:58","2019-11-30 23:11:58","2019-11-30 23:12:58","2019-11-30 23:13:58","2019-11-30 23:14:58","2019-11-30 23:15:59","2019-11-30 23:16:59","2019-11-30 23:17:59","2019-11-30 23:18:59","2019-11-30 23:19:59","2019-11-30 23:20:59","2019-11-30 23:21:59","2019-11-30 23:22:59","2019-11-30 23:23:59","2019-11-30 23:24:59","2019-11-30 23:25:58","2019-11-30 23:26:58","2019-11-30 23:27:58","2019-11-30 23:28:58","2019-11-30 23:29:58","2019-11-30 23:30:58","2019-11-30 23:31:58","2019-11-30 23:32:58","2019-11-30 23:33:58","2019-11-30 23:34:58","2019-11-30 23:35:59","2019-11-30 23:36:59","2019-11-30 23:37:59","2019-11-30 23:38:59","2019-11-30 23:39:59","2019-11-30 23:41:00","2019-11-30 23:42:00","2019-11-30 23:43:00","2019-11-30 23:44:00","2019-11-30 23:45:00","2019-11-30 23:45:58","2019-11-30 23:46:58","2019-11-30 23:47:58","2019-11-30 23:48:58","2019-11-30 23:49:58","2019-11-30 23:50:58","2019-11-30 23:51:58","2019-11-30 23:52:58","2019-11-30 23:53:58","2019-11-30 23:54:58","2019-11-30 23:55:58","2019-11-30 23:56:58","2019-11-30 23:57:58","2019-11-30 23:58:58","2019-11-30 23:59:58","2019-12-01 00:00:59","2019-12-01 00:01:59","2019-12-01 00:02:59","2019-12-01 00:03:59","2019-12-01 00:04:59","2019-12-01 00:05:58","2019-12-01 00:06:58","2019-12-01 00:07:58","2019-12-01 00:08:58","2019-12-01 00:09:58","2019-12-01 00:10:58","2019-12-01 00:11:58","2019-12-01 00:12:58","2019-12-01 00:13:58","2019-12-01 00:14:58","2019-12-01 00:15:58","2019-12-01 00:16:58","2019-12-01 00:17:58","2019-12-01 00:18:58","2019-12-01 00:19:58","2019-12-01 00:20:59","2019-12-01 00:21:59","2019-12-01 00:22:59","2019-12-01 00:23:59","2019-12-01 00:24:59","2019-12-01 00:25:58","2019-12-01 00:26:58","2019-12-01 00:27:58","2019-12-01 00:28:58","2019-12-01 00:29:58","2019-12-01 00:30:59","2019-12-01 00:31:59","2019-12-01 00:32:59","2019-12-01 00:33:59","2019-12-01 00:34:59","2019-12-01 00:35:58","2019-12-01 00:36:58","2019-12-01 00:37:58","2019-12-01 00:38:58","2019-12-01 00:39:58","2019-12-01 00:40:58","2019-12-01 00:41:58","2019-12-01 00:42:58","2019-12-01 00:43:58","2019-12-01 00:44:58","2019-12-01 00:45:58","2019-12-01 00:46:58","2019-12-01 00:47:58","2019-12-01 00:48:58","2019-12-01 00:49:58","2019-12-01 00:50:58","2019-12-01 00:51:58","2019-12-01 00:52:58","2019-12-01 00:53:58","2019-12-01 00:54:58","2019-12-01 00:55:59","2019-12-01 00:56:59","2019-12-01 00:57:59","2019-12-01 00:58:59","2019-12-01 00:59:59","2019-12-01 01:00:59","2019-12-01 01:01:59","2019-12-01 01:02:59","2019-12-01 01:03:59","2019-12-01 01:04:59","2019-12-01 01:06:00","2019-12-01 01:07:00","2019-12-01 01:08:00","2019-12-01 01:09:00","2019-12-01 01:10:00","2019-12-01 01:10:58","2019-12-01 01:11:58","2019-12-01 01:12:58","2019-12-01 01:13:58","2019-12-01 01:14:58","2019-12-01 01:15:58","2019-12-01 01:16:58","2019-12-01 01:17:58","2019-12-01 01:18:58","2019-12-01 01:19:58","2019-12-01 01:20:59","2019-12-01 01:21:59","2019-12-01 01:22:59","2019-12-01 01:23:59","2019-12-01 01:24:59","2019-12-01 01:25:58","2019-12-01 01:26:58","2019-12-01 01:27:58","2019-12-01 01:28:58","2019-12-01 01:29:58","2019-12-01 01:30:58","2019-12-01 01:31:58","2019-12-01 01:32:58","2019-12-01 01:33:58","2019-12-01 01:34:58","2019-12-01 01:35:58","2019-12-01 01:36:58","2019-12-01 01:37:58","2019-12-01 01:38:58","2019-12-01 01:39:58","2019-12-01 01:40:59","2019-12-01 01:41:59","2019-12-01 01:42:59","2019-12-01 01:43:59","2019-12-01 01:44:59","2019-12-01 01:46:00","2019-12-01 01:47:00","2019-12-01 01:48:00","2019-12-01 01:49:00","2019-12-01 01:50:00","2019-12-01 01:50:58","2019-12-01 01:51:58","2019-12-01 01:52:58","2019-12-01 01:53:58","2019-12-01 01:54:58","2019-12-01 01:55:58","2019-12-01 01:56:58","2019-12-01 01:57:58","2019-12-01 01:58:58","2019-12-01 01:59:58","2019-12-01 02:00:58","2019-12-01 02:01:58","2019-12-01 02:02:58","2019-12-01 02:03:58","2019-12-01 02:04:58","2019-12-01 02:05:59","2019-12-01 02:06:59","2019-12-01 02:07:59","2019-12-01 02:08:59","2019-12-01 02:09:59","2019-12-01 02:10:58","2019-12-01 02:11:58","2019-12-01 02:12:58","2019-12-01 02:13:58","2019-12-01 02:14:58","2019-12-01 02:15:58","2019-12-01 02:16:58","2019-12-01 02:17:58","2019-12-01 02:18:58","2019-12-01 02:19:58","2019-12-01 02:20:58","2019-12-01 02:21:58","2019-12-01 02:22:58","2019-12-01 02:23:58","2019-12-01 02:24:58","2019-12-01 02:26:00","2019-12-01 02:27:00","2019-12-01 02:28:00","2019-12-01 02:29:00","2019-12-01 02:30:00","2019-12-01 02:30:58","2019-12-01 02:31:58","2019-12-01 02:32:58","2019-12-01 02:33:58","2019-12-01 02:34:58","2019-12-01 02:35:58","2019-12-01 02:36:58","2019-12-01 02:37:58","2019-12-01 02:38:58","2019-12-01 02:39:58","2019-12-01 02:40:58","2019-12-01 02:41:58","2019-12-01 02:42:58","2019-12-01 02:43:58","2019-12-01 02:44:58","2019-12-01 02:45:58","2019-12-01 02:46:58","2019-12-01 02:47:58","2019-12-01 02:48:58","2019-12-01 02:49:58","2019-12-01 02:50:57","2019-12-01 02:51:57","2019-12-01 02:52:57","2019-12-01 02:53:57","2019-12-01 02:54:57","2019-12-01 02:55:58","2019-12-01 02:56:58","2019-12-01 02:57:58","2019-12-01 02:58:58","2019-12-01 02:59:58","2019-12-01 03:00:58","2019-12-01 03:01:58","2019-12-01 03:02:58","2019-12-01 03:03:58","2019-12-01 03:04:58","2019-12-01 03:05:59","2019-12-01 03:06:59","2019-12-01 03:07:59","2019-12-01 03:08:59","2019-12-01 03:09:59","2019-12-01 03:10:58","2019-12-01 03:11:58","2019-12-01 03:12:58","2019-12-01 03:13:58","2019-12-01 03:14:58","2019-12-01 03:15:58","2019-12-01 03:16:58","2019-12-01 03:17:58","2019-12-01 03:18:58","2019-12-01 03:19:58","2019-12-01 03:20:57","2019-12-01 03:21:57","2019-12-01 03:22:57","2019-12-01 03:23:57","2019-12-01 03:24:57","2019-12-01 03:25:58","2019-12-01 03:26:58","2019-12-01 03:27:58","2019-12-01 03:28:58","2019-12-01 03:29:58","2019-12-01 03:30:58","2019-12-01 03:31:58","2019-12-01 03:32:58","2019-12-01 03:33:58","2019-12-01 03:34:58","2019-12-01 03:35:58","2019-12-01 03:36:58","2019-12-01 03:37:58","2019-12-01 03:38:58","2019-12-01 03:39:58","2019-12-01 03:40:57","2019-12-01 03:41:57","2019-12-01 03:42:57","2019-12-01 03:43:57","2019-12-01 03:44:57","2019-12-01 03:45:59","2019-12-01 03:46:59","2019-12-01 03:47:59","2019-12-01 03:48:59","2019-12-01 03:49:59","2019-12-01 03:50:58","2019-12-01 03:51:58","2019-12-01 03:52:58","2019-12-01 03:53:58","2019-12-01 03:54:58","2019-12-01 03:55:58","2019-12-01 03:56:58","2019-12-01 03:57:58","2019-12-01 03:58:58","2019-12-01 03:59:58","2019-12-01 04:00:57","2019-12-01 04:01:57","2019-12-01 04:02:57","2019-12-01 04:03:57","2019-12-01 04:04:57","2019-12-01 04:05:58","2019-12-01 04:06:58","2019-12-01 04:07:58","2019-12-01 04:08:58","2019-12-01 04:09:58","2019-12-01 04:10:58","2019-12-01 04:11:58","2019-12-01 04:12:58","2019-12-01 04:13:58","2019-12-01 04:14:58","2019-12-01 04:15:58","2019-12-01 04:16:58","2019-12-01 04:17:58","2019-12-01 04:18:58","2019-12-01 04:19:58","2019-12-01 04:20:57","2019-12-01 04:21:57","2019-12-01 04:22:57","2019-12-01 04:23:57","2019-12-01 04:24:57","2019-12-01 04:25:58","2019-12-01 04:26:58","2019-12-01 04:27:58","2019-12-01 04:28:58","2019-12-01 04:29:58","2019-12-01 04:30:58","2019-12-01 04:31:58","2019-12-01 04:32:58","2019-12-01 04:33:58","2019-12-01 04:34:58","2019-12-01 04:35:58","2019-12-01 04:36:58","2019-12-01 04:37:58","2019-12-01 04:38:58","2019-12-01 04:39:58","2019-12-01 04:40:58","2019-12-01 04:41:58","2019-12-01 04:42:58","2019-12-01 04:43:58","2019-12-01 04:44:58","2019-12-01 04:45:57","2019-12-01 04:46:57","2019-12-01 04:47:57","2019-12-01 04:48:57","2019-12-01 04:49:57","2019-12-01 04:50:58","2019-12-01 04:51:58","2019-12-01 04:52:58","2019-12-01 04:53:58","2019-12-01 04:54:58","2019-12-01 04:55:58","2019-12-01 04:56:58","2019-12-01 04:57:58","2019-12-01 04:58:58","2019-12-01 04:59:58","2019-12-01 05:00:58","2019-12-01 05:01:58","2019-12-01 05:02:58","2019-12-01 05:03:58","2019-12-01 05:04:58","2019-12-01 05:05:58","2019-12-01 05:06:58","2019-12-01 05:07:58","2019-12-01 05:08:58","2019-12-01 05:09:58","2019-12-01 05:10:59","2019-12-01 05:11:59","2019-12-01 05:12:59","2019-12-01 05:13:59","2019-12-01 05:14:59","2019-12-01 05:15:58","2019-12-01 05:16:58","2019-12-01 05:17:58","2019-12-01 05:18:58","2019-12-01 05:19:58","2019-12-01 05:20:58","2019-12-01 05:21:58","2019-12-01 05:22:58","2019-12-01 05:23:58","2019-12-01 05:24:58","2019-12-01 05:25:57","2019-12-01 05:26:57","2019-12-01 05:27:57","2019-12-01 05:28:57","2019-12-01 05:29:57","2019-12-01 05:30:57","2019-12-01 05:31:57","2019-12-01 05:32:57","2019-12-01 05:33:57","2019-12-01 05:34:57","2019-12-01 05:35:58","2019-12-01 05:36:58","2019-12-01 05:37:58","2019-12-01 05:38:58","2019-12-01 05:39:58","2019-12-01 05:40:58","2019-12-01 05:41:58","2019-12-01 05:42:58","2019-12-01 05:43:58","2019-12-01 05:44:58","2019-12-01 05:45:58","2019-12-01 05:46:58","2019-12-01 05:47:58","2019-12-01 05:48:58","2019-12-01 05:49:58","2019-12-01 05:50:59","2019-12-01 05:51:59","2019-12-01 05:52:59","2019-12-01 05:53:59","2019-12-01 05:54:59","2019-12-01 05:55:57","2019-12-01 05:56:57","2019-12-01 05:57:57","2019-12-01 05:58:57","2019-12-01 05:59:57","2019-12-01 06:00:57","2019-12-01 06:01:57","2019-12-01 06:02:57","2019-12-01 06:03:57","2019-12-01 06:04:57","2019-12-01 06:05:58","2019-12-01 06:06:58","2019-12-01 06:07:58","2019-12-01 06:08:58","2019-12-01 06:09:58","2019-12-01 06:10:57","2019-12-01 06:11:57","2019-12-01 06:12:57","2019-12-01 06:13:57","2019-12-01 06:14:57","2019-12-01 06:15:57","2019-12-01 06:16:57","2019-12-01 06:17:57","2019-12-01 06:18:57","2019-12-01 06:19:57","2019-12-01 06:20:57","2019-12-01 06:21:57","2019-12-01 06:22:57","2019-12-01 06:23:57","2019-12-01 06:24:57","2019-12-01 06:25:57","2019-12-01 06:26:57","2019-12-01 06:27:57","2019-12-01 06:28:57","2019-12-01 06:29:57","2019-12-01 06:30:59","2019-12-01 06:31:59","2019-12-01 06:32:59","2019-12-01 06:33:59","2019-12-01 06:34:59"],"values":[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0]}'
        },
        {
          healthResultAttr: {
            valueType: 3,
            alias: '体动时序',
            id: 76,
            healthResultAttrMappers: [],
            orderNo: 1,
            show: true,
            name: 'movTimeLog'
          },
          value:
            '{"labels":["2019-11-30 19:56:01","2019-11-30 19:57:01","2019-11-30 19:58:01","2019-11-30 19:59:01","2019-11-30 20:00:01","2019-11-30 20:01:01","2019-11-30 20:02:01","2019-11-30 20:03:01","2019-11-30 20:04:01","2019-11-30 20:05:01","2019-11-30 20:06:01","2019-11-30 20:07:01","2019-11-30 20:08:01","2019-11-30 20:09:01","2019-11-30 20:10:01","2019-11-30 20:11:01","2019-11-30 20:12:01","2019-11-30 20:13:01","2019-11-30 20:14:01","2019-11-30 20:15:01","2019-11-30 20:16:02","2019-11-30 20:17:02","2019-11-30 20:18:02","2019-11-30 20:19:02","2019-11-30 20:20:02","2019-11-30 20:21:01","2019-11-30 20:22:01","2019-11-30 20:23:01","2019-11-30 20:24:01","2019-11-30 20:25:01","2019-11-30 20:26:01","2019-11-30 20:27:01","2019-11-30 20:28:01","2019-11-30 20:29:01","2019-11-30 20:30:01","2019-11-30 20:31:01","2019-11-30 20:32:01","2019-11-30 20:33:01","2019-11-30 20:34:01","2019-11-30 20:35:01","2019-11-30 20:36:00","2019-11-30 20:37:00","2019-11-30 20:38:00","2019-11-30 20:39:00","2019-11-30 20:40:00","2019-11-30 20:41:01","2019-11-30 20:42:01","2019-11-30 20:43:01","2019-11-30 20:44:01","2019-11-30 20:45:01","2019-11-30 20:46:01","2019-11-30 20:47:01","2019-11-30 20:48:01","2019-11-30 20:49:01","2019-11-30 20:50:01","2019-11-30 20:51:01","2019-11-30 20:52:01","2019-11-30 20:53:01","2019-11-30 20:54:01","2019-11-30 20:55:01","2019-11-30 20:56:01","2019-11-30 20:57:01","2019-11-30 20:58:01","2019-11-30 20:59:01","2019-11-30 21:00:01","2019-11-30 21:01:02","2019-11-30 21:02:02","2019-11-30 21:03:02","2019-11-30 21:04:02","2019-11-30 21:05:02","2019-11-30 21:06:01","2019-11-30 21:07:01","2019-11-30 21:08:01","2019-11-30 21:09:01","2019-11-30 21:10:01","2019-11-30 21:11:01","2019-11-30 21:12:01","2019-11-30 21:13:01","2019-11-30 21:14:01","2019-11-30 21:15:01","2019-11-30 21:16:00","2019-11-30 21:17:00","2019-11-30 21:18:00","2019-11-30 21:19:00","2019-11-30 21:20:00","2019-11-30 21:21:01","2019-11-30 21:22:01","2019-11-30 21:23:01","2019-11-30 21:24:01","2019-11-30 21:25:01","2019-11-30 21:26:01","2019-11-30 21:27:01","2019-11-30 21:28:01","2019-11-30 21:29:01","2019-11-30 21:30:01","2019-11-30 21:31:01","2019-11-30 21:32:01","2019-11-30 21:33:01","2019-11-30 21:34:01","2019-11-30 21:35:01","2019-11-30 21:36:01","2019-11-30 21:37:01","2019-11-30 21:38:01","2019-11-30 21:39:01","2019-11-30 21:40:01","2019-11-30 21:41:01","2019-11-30 21:42:01","2019-11-30 21:43:01","2019-11-30 21:44:01","2019-11-30 21:45:01","2019-11-30 21:46:01","2019-11-30 21:47:01","2019-11-30 21:48:01","2019-11-30 21:49:01","2019-11-30 21:50:01","2019-11-30 21:51:01","2019-11-30 21:52:01","2019-11-30 21:53:01","2019-11-30 21:54:01","2019-11-30 21:55:01","2019-11-30 21:56:00","2019-11-30 21:57:00","2019-11-30 21:58:00","2019-11-30 21:59:00","2019-11-30 22:00:00","2019-11-30 22:01:00","2019-11-30 22:02:00","2019-11-30 22:03:00","2019-11-30 22:04:00","2019-11-30 22:05:00","2019-11-30 22:06:01","2019-11-30 22:07:01","2019-11-30 22:08:01","2019-11-30 22:09:01","2019-11-30 22:10:01","2019-11-30 22:11:01","2019-11-30 22:12:01","2019-11-30 22:13:01","2019-11-30 22:14:01","2019-11-30 22:15:01","2019-11-30 22:16:01","2019-11-30 22:17:01","2019-11-30 22:18:01","2019-11-30 22:19:01","2019-11-30 22:20:01","2019-11-30 22:21:00","2019-11-30 22:22:00","2019-11-30 22:23:00","2019-11-30 22:24:00","2019-11-30 22:25:00","2019-11-30 22:26:01","2019-11-30 22:27:01","2019-11-30 22:28:01","2019-11-30 22:29:01","2019-11-30 22:30:01","2019-11-30 22:31:01","2019-11-30 22:32:01","2019-11-30 22:33:01","2019-11-30 22:34:01","2019-11-30 22:35:01","2019-11-30 22:36:01","2019-11-30 22:37:01","2019-11-30 22:38:01","2019-11-30 22:39:01","2019-11-30 22:40:01","2019-11-30 22:41:00","2019-11-30 22:42:00","2019-11-30 22:43:00","2019-11-30 22:44:00","2019-11-30 22:45:00","2019-11-30 22:46:01","2019-11-30 22:47:01","2019-11-30 22:48:01","2019-11-30 22:49:01","2019-11-30 22:50:01","2019-11-30 22:51:01","2019-11-30 22:52:01","2019-11-30 22:53:01","2019-11-30 22:54:01","2019-11-30 22:55:01","2019-11-30 22:56:01","2019-11-30 22:57:01","2019-11-30 22:58:01","2019-11-30 22:59:01","2019-11-30 23:00:01","2019-11-30 23:01:02","2019-11-30 23:02:02","2019-11-30 23:03:02","2019-11-30 23:04:02","2019-11-30 23:05:02","2019-11-30 23:06:00","2019-11-30 23:07:00","2019-11-30 23:08:00","2019-11-30 23:09:00","2019-11-30 23:10:00","2019-11-30 23:10:58","2019-11-30 23:11:58","2019-11-30 23:12:58","2019-11-30 23:13:58","2019-11-30 23:14:58","2019-11-30 23:15:59","2019-11-30 23:16:59","2019-11-30 23:17:59","2019-11-30 23:18:59","2019-11-30 23:19:59","2019-11-30 23:20:59","2019-11-30 23:21:59","2019-11-30 23:22:59","2019-11-30 23:23:59","2019-11-30 23:24:59","2019-11-30 23:25:58","2019-11-30 23:26:58","2019-11-30 23:27:58","2019-11-30 23:28:58","2019-11-30 23:29:58","2019-11-30 23:30:58","2019-11-30 23:31:58","2019-11-30 23:32:58","2019-11-30 23:33:58","2019-11-30 23:34:58","2019-11-30 23:35:59","2019-11-30 23:36:59","2019-11-30 23:37:59","2019-11-30 23:38:59","2019-11-30 23:39:59","2019-11-30 23:41:00","2019-11-30 23:42:00","2019-11-30 23:43:00","2019-11-30 23:44:00","2019-11-30 23:45:00","2019-11-30 23:45:58","2019-11-30 23:46:58","2019-11-30 23:47:58","2019-11-30 23:48:58","2019-11-30 23:49:58","2019-11-30 23:50:58","2019-11-30 23:51:58","2019-11-30 23:52:58","2019-11-30 23:53:58","2019-11-30 23:54:58","2019-11-30 23:55:58","2019-11-30 23:56:58","2019-11-30 23:57:58","2019-11-30 23:58:58","2019-11-30 23:59:58","2019-12-01 00:00:59","2019-12-01 00:01:59","2019-12-01 00:02:59","2019-12-01 00:03:59","2019-12-01 00:04:59","2019-12-01 00:05:58","2019-12-01 00:06:58","2019-12-01 00:07:58","2019-12-01 00:08:58","2019-12-01 00:09:58","2019-12-01 00:10:58","2019-12-01 00:11:58","2019-12-01 00:12:58","2019-12-01 00:13:58","2019-12-01 00:14:58","2019-12-01 00:15:58","2019-12-01 00:16:58","2019-12-01 00:17:58","2019-12-01 00:18:58","2019-12-01 00:19:58","2019-12-01 00:20:59","2019-12-01 00:21:59","2019-12-01 00:22:59","2019-12-01 00:23:59","2019-12-01 00:24:59","2019-12-01 00:25:58","2019-12-01 00:26:58","2019-12-01 00:27:58","2019-12-01 00:28:58","2019-12-01 00:29:58","2019-12-01 00:30:59","2019-12-01 00:31:59","2019-12-01 00:32:59","2019-12-01 00:33:59","2019-12-01 00:34:59","2019-12-01 00:35:58","2019-12-01 00:36:58","2019-12-01 00:37:58","2019-12-01 00:38:58","2019-12-01 00:39:58","2019-12-01 00:40:58","2019-12-01 00:41:58","2019-12-01 00:42:58","2019-12-01 00:43:58","2019-12-01 00:44:58","2019-12-01 00:45:58","2019-12-01 00:46:58","2019-12-01 00:47:58","2019-12-01 00:48:58","2019-12-01 00:49:58","2019-12-01 00:50:58","2019-12-01 00:51:58","2019-12-01 00:52:58","2019-12-01 00:53:58","2019-12-01 00:54:58","2019-12-01 00:55:59","2019-12-01 00:56:59","2019-12-01 00:57:59","2019-12-01 00:58:59","2019-12-01 00:59:59","2019-12-01 01:00:59","2019-12-01 01:01:59","2019-12-01 01:02:59","2019-12-01 01:03:59","2019-12-01 01:04:59","2019-12-01 01:06:00","2019-12-01 01:07:00","2019-12-01 01:08:00","2019-12-01 01:09:00","2019-12-01 01:10:00","2019-12-01 01:10:58","2019-12-01 01:11:58","2019-12-01 01:12:58","2019-12-01 01:13:58","2019-12-01 01:14:58","2019-12-01 01:15:58","2019-12-01 01:16:58","2019-12-01 01:17:58","2019-12-01 01:18:58","2019-12-01 01:19:58","2019-12-01 01:20:59","2019-12-01 01:21:59","2019-12-01 01:22:59","2019-12-01 01:23:59","2019-12-01 01:24:59","2019-12-01 01:25:58","2019-12-01 01:26:58","2019-12-01 01:27:58","2019-12-01 01:28:58","2019-12-01 01:29:58","2019-12-01 01:30:58","2019-12-01 01:31:58","2019-12-01 01:32:58","2019-12-01 01:33:58","2019-12-01 01:34:58","2019-12-01 01:35:58","2019-12-01 01:36:58","2019-12-01 01:37:58","2019-12-01 01:38:58","2019-12-01 01:39:58","2019-12-01 01:40:59","2019-12-01 01:41:59","2019-12-01 01:42:59","2019-12-01 01:43:59","2019-12-01 01:44:59","2019-12-01 01:46:00","2019-12-01 01:47:00","2019-12-01 01:48:00","2019-12-01 01:49:00","2019-12-01 01:50:00","2019-12-01 01:50:58","2019-12-01 01:51:58","2019-12-01 01:52:58","2019-12-01 01:53:58","2019-12-01 01:54:58","2019-12-01 01:55:58","2019-12-01 01:56:58","2019-12-01 01:57:58","2019-12-01 01:58:58","2019-12-01 01:59:58","2019-12-01 02:00:58","2019-12-01 02:01:58","2019-12-01 02:02:58","2019-12-01 02:03:58","2019-12-01 02:04:58","2019-12-01 02:05:59","2019-12-01 02:06:59","2019-12-01 02:07:59","2019-12-01 02:08:59","2019-12-01 02:09:59","2019-12-01 02:10:58","2019-12-01 02:11:58","2019-12-01 02:12:58","2019-12-01 02:13:58","2019-12-01 02:14:58","2019-12-01 02:15:58","2019-12-01 02:16:58","2019-12-01 02:17:58","2019-12-01 02:18:58","2019-12-01 02:19:58","2019-12-01 02:20:58","2019-12-01 02:21:58","2019-12-01 02:22:58","2019-12-01 02:23:58","2019-12-01 02:24:58","2019-12-01 02:26:00","2019-12-01 02:27:00","2019-12-01 02:28:00","2019-12-01 02:29:00","2019-12-01 02:30:00","2019-12-01 02:30:58","2019-12-01 02:31:58","2019-12-01 02:32:58","2019-12-01 02:33:58","2019-12-01 02:34:58","2019-12-01 02:35:58","2019-12-01 02:36:58","2019-12-01 02:37:58","2019-12-01 02:38:58","2019-12-01 02:39:58","2019-12-01 02:40:58","2019-12-01 02:41:58","2019-12-01 02:42:58","2019-12-01 02:43:58","2019-12-01 02:44:58","2019-12-01 02:45:58","2019-12-01 02:46:58","2019-12-01 02:47:58","2019-12-01 02:48:58","2019-12-01 02:49:58","2019-12-01 02:50:57","2019-12-01 02:51:57","2019-12-01 02:52:57","2019-12-01 02:53:57","2019-12-01 02:54:57","2019-12-01 02:55:58","2019-12-01 02:56:58","2019-12-01 02:57:58","2019-12-01 02:58:58","2019-12-01 02:59:58","2019-12-01 03:00:58","2019-12-01 03:01:58","2019-12-01 03:02:58","2019-12-01 03:03:58","2019-12-01 03:04:58","2019-12-01 03:05:59","2019-12-01 03:06:59","2019-12-01 03:07:59","2019-12-01 03:08:59","2019-12-01 03:09:59","2019-12-01 03:10:58","2019-12-01 03:11:58","2019-12-01 03:12:58","2019-12-01 03:13:58","2019-12-01 03:14:58","2019-12-01 03:15:58","2019-12-01 03:16:58","2019-12-01 03:17:58","2019-12-01 03:18:58","2019-12-01 03:19:58","2019-12-01 03:20:57","2019-12-01 03:21:57","2019-12-01 03:22:57","2019-12-01 03:23:57","2019-12-01 03:24:57","2019-12-01 03:25:58","2019-12-01 03:26:58","2019-12-01 03:27:58","2019-12-01 03:28:58","2019-12-01 03:29:58","2019-12-01 03:30:58","2019-12-01 03:31:58","2019-12-01 03:32:58","2019-12-01 03:33:58","2019-12-01 03:34:58","2019-12-01 03:35:58","2019-12-01 03:36:58","2019-12-01 03:37:58","2019-12-01 03:38:58","2019-12-01 03:39:58","2019-12-01 03:40:57","2019-12-01 03:41:57","2019-12-01 03:42:57","2019-12-01 03:43:57","2019-12-01 03:44:57","2019-12-01 03:45:59","2019-12-01 03:46:59","2019-12-01 03:47:59","2019-12-01 03:48:59","2019-12-01 03:49:59","2019-12-01 03:50:58","2019-12-01 03:51:58","2019-12-01 03:52:58","2019-12-01 03:53:58","2019-12-01 03:54:58","2019-12-01 03:55:58","2019-12-01 03:56:58","2019-12-01 03:57:58","2019-12-01 03:58:58","2019-12-01 03:59:58","2019-12-01 04:00:57","2019-12-01 04:01:57","2019-12-01 04:02:57","2019-12-01 04:03:57","2019-12-01 04:04:57","2019-12-01 04:05:58","2019-12-01 04:06:58","2019-12-01 04:07:58","2019-12-01 04:08:58","2019-12-01 04:09:58","2019-12-01 04:10:58","2019-12-01 04:11:58","2019-12-01 04:12:58","2019-12-01 04:13:58","2019-12-01 04:14:58","2019-12-01 04:15:58","2019-12-01 04:16:58","2019-12-01 04:17:58","2019-12-01 04:18:58","2019-12-01 04:19:58","2019-12-01 04:20:57","2019-12-01 04:21:57","2019-12-01 04:22:57","2019-12-01 04:23:57","2019-12-01 04:24:57","2019-12-01 04:25:58","2019-12-01 04:26:58","2019-12-01 04:27:58","2019-12-01 04:28:58","2019-12-01 04:29:58","2019-12-01 04:30:58","2019-12-01 04:31:58","2019-12-01 04:32:58","2019-12-01 04:33:58","2019-12-01 04:34:58","2019-12-01 04:35:58","2019-12-01 04:36:58","2019-12-01 04:37:58","2019-12-01 04:38:58","2019-12-01 04:39:58","2019-12-01 04:40:58","2019-12-01 04:41:58","2019-12-01 04:42:58","2019-12-01 04:43:58","2019-12-01 04:44:58","2019-12-01 04:45:57","2019-12-01 04:46:57","2019-12-01 04:47:57","2019-12-01 04:48:57","2019-12-01 04:49:57","2019-12-01 04:50:58","2019-12-01 04:51:58","2019-12-01 04:52:58","2019-12-01 04:53:58","2019-12-01 04:54:58","2019-12-01 04:55:58","2019-12-01 04:56:58","2019-12-01 04:57:58","2019-12-01 04:58:58","2019-12-01 04:59:58","2019-12-01 05:00:58","2019-12-01 05:01:58","2019-12-01 05:02:58","2019-12-01 05:03:58","2019-12-01 05:04:58","2019-12-01 05:05:58","2019-12-01 05:06:58","2019-12-01 05:07:58","2019-12-01 05:08:58","2019-12-01 05:09:58","2019-12-01 05:10:59","2019-12-01 05:11:59","2019-12-01 05:12:59","2019-12-01 05:13:59","2019-12-01 05:14:59","2019-12-01 05:15:58","2019-12-01 05:16:58","2019-12-01 05:17:58","2019-12-01 05:18:58","2019-12-01 05:19:58","2019-12-01 05:20:58","2019-12-01 05:21:58","2019-12-01 05:22:58","2019-12-01 05:23:58","2019-12-01 05:24:58","2019-12-01 05:25:57","2019-12-01 05:26:57","2019-12-01 05:27:57","2019-12-01 05:28:57","2019-12-01 05:29:57","2019-12-01 05:30:57","2019-12-01 05:31:57","2019-12-01 05:32:57","2019-12-01 05:33:57","2019-12-01 05:34:57","2019-12-01 05:35:58","2019-12-01 05:36:58","2019-12-01 05:37:58","2019-12-01 05:38:58","2019-12-01 05:39:58","2019-12-01 05:40:58","2019-12-01 05:41:58","2019-12-01 05:42:58","2019-12-01 05:43:58","2019-12-01 05:44:58","2019-12-01 05:45:58","2019-12-01 05:46:58","2019-12-01 05:47:58","2019-12-01 05:48:58","2019-12-01 05:49:58","2019-12-01 05:50:59","2019-12-01 05:51:59","2019-12-01 05:52:59","2019-12-01 05:53:59","2019-12-01 05:54:59","2019-12-01 05:55:57","2019-12-01 05:56:57","2019-12-01 05:57:57","2019-12-01 05:58:57","2019-12-01 05:59:57","2019-12-01 06:00:57","2019-12-01 06:01:57","2019-12-01 06:02:57","2019-12-01 06:03:57","2019-12-01 06:04:57","2019-12-01 06:05:58","2019-12-01 06:06:58","2019-12-01 06:07:58","2019-12-01 06:08:58","2019-12-01 06:09:58","2019-12-01 06:10:57","2019-12-01 06:11:57","2019-12-01 06:12:57","2019-12-01 06:13:57","2019-12-01 06:14:57","2019-12-01 06:15:57","2019-12-01 06:16:57","2019-12-01 06:17:57","2019-12-01 06:18:57","2019-12-01 06:19:57","2019-12-01 06:20:57","2019-12-01 06:21:57","2019-12-01 06:22:57","2019-12-01 06:23:57","2019-12-01 06:24:57","2019-12-01 06:25:57","2019-12-01 06:26:57","2019-12-01 06:27:57","2019-12-01 06:28:57","2019-12-01 06:29:57","2019-12-01 06:30:59","2019-12-01 06:31:59","2019-12-01 06:32:59","2019-12-01 06:33:59","2019-12-01 06:34:59"],"values":[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0]}'
        },
        {
          healthResultAttr: {
            valueType: 3,
            alias: '打鼾时序',
            id: 77,
            healthResultAttrMappers: [],
            orderNo: 1,
            show: true,
            name: 'snoreTimeLog'
          },
          value:
            '{"labels":["2019-11-30 19:56:01","2019-11-30 19:57:01","2019-11-30 19:58:01","2019-11-30 19:59:01","2019-11-30 20:00:01","2019-11-30 20:01:01","2019-11-30 20:02:01","2019-11-30 20:03:01","2019-11-30 20:04:01","2019-11-30 20:05:01","2019-11-30 20:06:01","2019-11-30 20:07:01","2019-11-30 20:08:01","2019-11-30 20:09:01","2019-11-30 20:10:01","2019-11-30 20:11:01","2019-11-30 20:12:01","2019-11-30 20:13:01","2019-11-30 20:14:01","2019-11-30 20:15:01","2019-11-30 20:16:02","2019-11-30 20:17:02","2019-11-30 20:18:02","2019-11-30 20:19:02","2019-11-30 20:20:02","2019-11-30 20:21:01","2019-11-30 20:22:01","2019-11-30 20:23:01","2019-11-30 20:24:01","2019-11-30 20:25:01","2019-11-30 20:26:01","2019-11-30 20:27:01","2019-11-30 20:28:01","2019-11-30 20:29:01","2019-11-30 20:30:01","2019-11-30 20:31:01","2019-11-30 20:32:01","2019-11-30 20:33:01","2019-11-30 20:34:01","2019-11-30 20:35:01","2019-11-30 20:36:00","2019-11-30 20:37:00","2019-11-30 20:38:00","2019-11-30 20:39:00","2019-11-30 20:40:00","2019-11-30 20:41:01","2019-11-30 20:42:01","2019-11-30 20:43:01","2019-11-30 20:44:01","2019-11-30 20:45:01","2019-11-30 20:46:01","2019-11-30 20:47:01","2019-11-30 20:48:01","2019-11-30 20:49:01","2019-11-30 20:50:01","2019-11-30 20:51:01","2019-11-30 20:52:01","2019-11-30 20:53:01","2019-11-30 20:54:01","2019-11-30 20:55:01","2019-11-30 20:56:01","2019-11-30 20:57:01","2019-11-30 20:58:01","2019-11-30 20:59:01","2019-11-30 21:00:01","2019-11-30 21:01:02","2019-11-30 21:02:02","2019-11-30 21:03:02","2019-11-30 21:04:02","2019-11-30 21:05:02","2019-11-30 21:06:01","2019-11-30 21:07:01","2019-11-30 21:08:01","2019-11-30 21:09:01","2019-11-30 21:10:01","2019-11-30 21:11:01","2019-11-30 21:12:01","2019-11-30 21:13:01","2019-11-30 21:14:01","2019-11-30 21:15:01","2019-11-30 21:16:00","2019-11-30 21:17:00","2019-11-30 21:18:00","2019-11-30 21:19:00","2019-11-30 21:20:00","2019-11-30 21:21:01","2019-11-30 21:22:01","2019-11-30 21:23:01","2019-11-30 21:24:01","2019-11-30 21:25:01","2019-11-30 21:26:01","2019-11-30 21:27:01","2019-11-30 21:28:01","2019-11-30 21:29:01","2019-11-30 21:30:01","2019-11-30 21:31:01","2019-11-30 21:32:01","2019-11-30 21:33:01","2019-11-30 21:34:01","2019-11-30 21:35:01","2019-11-30 21:36:01","2019-11-30 21:37:01","2019-11-30 21:38:01","2019-11-30 21:39:01","2019-11-30 21:40:01","2019-11-30 21:41:01","2019-11-30 21:42:01","2019-11-30 21:43:01","2019-11-30 21:44:01","2019-11-30 21:45:01","2019-11-30 21:46:01","2019-11-30 21:47:01","2019-11-30 21:48:01","2019-11-30 21:49:01","2019-11-30 21:50:01","2019-11-30 21:51:01","2019-11-30 21:52:01","2019-11-30 21:53:01","2019-11-30 21:54:01","2019-11-30 21:55:01","2019-11-30 21:56:00","2019-11-30 21:57:00","2019-11-30 21:58:00","2019-11-30 21:59:00","2019-11-30 22:00:00","2019-11-30 22:01:00","2019-11-30 22:02:00","2019-11-30 22:03:00","2019-11-30 22:04:00","2019-11-30 22:05:00","2019-11-30 22:06:01","2019-11-30 22:07:01","2019-11-30 22:08:01","2019-11-30 22:09:01","2019-11-30 22:10:01","2019-11-30 22:11:01","2019-11-30 22:12:01","2019-11-30 22:13:01","2019-11-30 22:14:01","2019-11-30 22:15:01","2019-11-30 22:16:01","2019-11-30 22:17:01","2019-11-30 22:18:01","2019-11-30 22:19:01","2019-11-30 22:20:01","2019-11-30 22:21:00","2019-11-30 22:22:00","2019-11-30 22:23:00","2019-11-30 22:24:00","2019-11-30 22:25:00","2019-11-30 22:26:01","2019-11-30 22:27:01","2019-11-30 22:28:01","2019-11-30 22:29:01","2019-11-30 22:30:01","2019-11-30 22:31:01","2019-11-30 22:32:01","2019-11-30 22:33:01","2019-11-30 22:34:01","2019-11-30 22:35:01","2019-11-30 22:36:01","2019-11-30 22:37:01","2019-11-30 22:38:01","2019-11-30 22:39:01","2019-11-30 22:40:01","2019-11-30 22:41:00","2019-11-30 22:42:00","2019-11-30 22:43:00","2019-11-30 22:44:00","2019-11-30 22:45:00","2019-11-30 22:46:01","2019-11-30 22:47:01","2019-11-30 22:48:01","2019-11-30 22:49:01","2019-11-30 22:50:01","2019-11-30 22:51:01","2019-11-30 22:52:01","2019-11-30 22:53:01","2019-11-30 22:54:01","2019-11-30 22:55:01","2019-11-30 22:56:01","2019-11-30 22:57:01","2019-11-30 22:58:01","2019-11-30 22:59:01","2019-11-30 23:00:01","2019-11-30 23:01:02","2019-11-30 23:02:02","2019-11-30 23:03:02","2019-11-30 23:04:02","2019-11-30 23:05:02","2019-11-30 23:06:00","2019-11-30 23:07:00","2019-11-30 23:08:00","2019-11-30 23:09:00","2019-11-30 23:10:00","2019-11-30 23:10:58","2019-11-30 23:11:58","2019-11-30 23:12:58","2019-11-30 23:13:58","2019-11-30 23:14:58","2019-11-30 23:15:59","2019-11-30 23:16:59","2019-11-30 23:17:59","2019-11-30 23:18:59","2019-11-30 23:19:59","2019-11-30 23:20:59","2019-11-30 23:21:59","2019-11-30 23:22:59","2019-11-30 23:23:59","2019-11-30 23:24:59","2019-11-30 23:25:58","2019-11-30 23:26:58","2019-11-30 23:27:58","2019-11-30 23:28:58","2019-11-30 23:29:58","2019-11-30 23:30:58","2019-11-30 23:31:58","2019-11-30 23:32:58","2019-11-30 23:33:58","2019-11-30 23:34:58","2019-11-30 23:35:59","2019-11-30 23:36:59","2019-11-30 23:37:59","2019-11-30 23:38:59","2019-11-30 23:39:59","2019-11-30 23:41:00","2019-11-30 23:42:00","2019-11-30 23:43:00","2019-11-30 23:44:00","2019-11-30 23:45:00","2019-11-30 23:45:58","2019-11-30 23:46:58","2019-11-30 23:47:58","2019-11-30 23:48:58","2019-11-30 23:49:58","2019-11-30 23:50:58","2019-11-30 23:51:58","2019-11-30 23:52:58","2019-11-30 23:53:58","2019-11-30 23:54:58","2019-11-30 23:55:58","2019-11-30 23:56:58","2019-11-30 23:57:58","2019-11-30 23:58:58","2019-11-30 23:59:58","2019-12-01 00:00:59","2019-12-01 00:01:59","2019-12-01 00:02:59","2019-12-01 00:03:59","2019-12-01 00:04:59","2019-12-01 00:05:58","2019-12-01 00:06:58","2019-12-01 00:07:58","2019-12-01 00:08:58","2019-12-01 00:09:58","2019-12-01 00:10:58","2019-12-01 00:11:58","2019-12-01 00:12:58","2019-12-01 00:13:58","2019-12-01 00:14:58","2019-12-01 00:15:58","2019-12-01 00:16:58","2019-12-01 00:17:58","2019-12-01 00:18:58","2019-12-01 00:19:58","2019-12-01 00:20:59","2019-12-01 00:21:59","2019-12-01 00:22:59","2019-12-01 00:23:59","2019-12-01 00:24:59","2019-12-01 00:25:58","2019-12-01 00:26:58","2019-12-01 00:27:58","2019-12-01 00:28:58","2019-12-01 00:29:58","2019-12-01 00:30:59","2019-12-01 00:31:59","2019-12-01 00:32:59","2019-12-01 00:33:59","2019-12-01 00:34:59","2019-12-01 00:35:58","2019-12-01 00:36:58","2019-12-01 00:37:58","2019-12-01 00:38:58","2019-12-01 00:39:58","2019-12-01 00:40:58","2019-12-01 00:41:58","2019-12-01 00:42:58","2019-12-01 00:43:58","2019-12-01 00:44:58","2019-12-01 00:45:58","2019-12-01 00:46:58","2019-12-01 00:47:58","2019-12-01 00:48:58","2019-12-01 00:49:58","2019-12-01 00:50:58","2019-12-01 00:51:58","2019-12-01 00:52:58","2019-12-01 00:53:58","2019-12-01 00:54:58","2019-12-01 00:55:59","2019-12-01 00:56:59","2019-12-01 00:57:59","2019-12-01 00:58:59","2019-12-01 00:59:59","2019-12-01 01:00:59","2019-12-01 01:01:59","2019-12-01 01:02:59","2019-12-01 01:03:59","2019-12-01 01:04:59","2019-12-01 01:06:00","2019-12-01 01:07:00","2019-12-01 01:08:00","2019-12-01 01:09:00","2019-12-01 01:10:00","2019-12-01 01:10:58","2019-12-01 01:11:58","2019-12-01 01:12:58","2019-12-01 01:13:58","2019-12-01 01:14:58","2019-12-01 01:15:58","2019-12-01 01:16:58","2019-12-01 01:17:58","2019-12-01 01:18:58","2019-12-01 01:19:58","2019-12-01 01:20:59","2019-12-01 01:21:59","2019-12-01 01:22:59","2019-12-01 01:23:59","2019-12-01 01:24:59","2019-12-01 01:25:58","2019-12-01 01:26:58","2019-12-01 01:27:58","2019-12-01 01:28:58","2019-12-01 01:29:58","2019-12-01 01:30:58","2019-12-01 01:31:58","2019-12-01 01:32:58","2019-12-01 01:33:58","2019-12-01 01:34:58","2019-12-01 01:35:58","2019-12-01 01:36:58","2019-12-01 01:37:58","2019-12-01 01:38:58","2019-12-01 01:39:58","2019-12-01 01:40:59","2019-12-01 01:41:59","2019-12-01 01:42:59","2019-12-01 01:43:59","2019-12-01 01:44:59","2019-12-01 01:46:00","2019-12-01 01:47:00","2019-12-01 01:48:00","2019-12-01 01:49:00","2019-12-01 01:50:00","2019-12-01 01:50:58","2019-12-01 01:51:58","2019-12-01 01:52:58","2019-12-01 01:53:58","2019-12-01 01:54:58","2019-12-01 01:55:58","2019-12-01 01:56:58","2019-12-01 01:57:58","2019-12-01 01:58:58","2019-12-01 01:59:58","2019-12-01 02:00:58","2019-12-01 02:01:58","2019-12-01 02:02:58","2019-12-01 02:03:58","2019-12-01 02:04:58","2019-12-01 02:05:59","2019-12-01 02:06:59","2019-12-01 02:07:59","2019-12-01 02:08:59","2019-12-01 02:09:59","2019-12-01 02:10:58","2019-12-01 02:11:58","2019-12-01 02:12:58","2019-12-01 02:13:58","2019-12-01 02:14:58","2019-12-01 02:15:58","2019-12-01 02:16:58","2019-12-01 02:17:58","2019-12-01 02:18:58","2019-12-01 02:19:58","2019-12-01 02:20:58","2019-12-01 02:21:58","2019-12-01 02:22:58","2019-12-01 02:23:58","2019-12-01 02:24:58","2019-12-01 02:26:00","2019-12-01 02:27:00","2019-12-01 02:28:00","2019-12-01 02:29:00","2019-12-01 02:30:00","2019-12-01 02:30:58","2019-12-01 02:31:58","2019-12-01 02:32:58","2019-12-01 02:33:58","2019-12-01 02:34:58","2019-12-01 02:35:58","2019-12-01 02:36:58","2019-12-01 02:37:58","2019-12-01 02:38:58","2019-12-01 02:39:58","2019-12-01 02:40:58","2019-12-01 02:41:58","2019-12-01 02:42:58","2019-12-01 02:43:58","2019-12-01 02:44:58","2019-12-01 02:45:58","2019-12-01 02:46:58","2019-12-01 02:47:58","2019-12-01 02:48:58","2019-12-01 02:49:58","2019-12-01 02:50:57","2019-12-01 02:51:57","2019-12-01 02:52:57","2019-12-01 02:53:57","2019-12-01 02:54:57","2019-12-01 02:55:58","2019-12-01 02:56:58","2019-12-01 02:57:58","2019-12-01 02:58:58","2019-12-01 02:59:58","2019-12-01 03:00:58","2019-12-01 03:01:58","2019-12-01 03:02:58","2019-12-01 03:03:58","2019-12-01 03:04:58","2019-12-01 03:05:59","2019-12-01 03:06:59","2019-12-01 03:07:59","2019-12-01 03:08:59","2019-12-01 03:09:59","2019-12-01 03:10:58","2019-12-01 03:11:58","2019-12-01 03:12:58","2019-12-01 03:13:58","2019-12-01 03:14:58","2019-12-01 03:15:58","2019-12-01 03:16:58","2019-12-01 03:17:58","2019-12-01 03:18:58","2019-12-01 03:19:58","2019-12-01 03:20:57","2019-12-01 03:21:57","2019-12-01 03:22:57","2019-12-01 03:23:57","2019-12-01 03:24:57","2019-12-01 03:25:58","2019-12-01 03:26:58","2019-12-01 03:27:58","2019-12-01 03:28:58","2019-12-01 03:29:58","2019-12-01 03:30:58","2019-12-01 03:31:58","2019-12-01 03:32:58","2019-12-01 03:33:58","2019-12-01 03:34:58","2019-12-01 03:35:58","2019-12-01 03:36:58","2019-12-01 03:37:58","2019-12-01 03:38:58","2019-12-01 03:39:58","2019-12-01 03:40:57","2019-12-01 03:41:57","2019-12-01 03:42:57","2019-12-01 03:43:57","2019-12-01 03:44:57","2019-12-01 03:45:59","2019-12-01 03:46:59","2019-12-01 03:47:59","2019-12-01 03:48:59","2019-12-01 03:49:59","2019-12-01 03:50:58","2019-12-01 03:51:58","2019-12-01 03:52:58","2019-12-01 03:53:58","2019-12-01 03:54:58","2019-12-01 03:55:58","2019-12-01 03:56:58","2019-12-01 03:57:58","2019-12-01 03:58:58","2019-12-01 03:59:58","2019-12-01 04:00:57","2019-12-01 04:01:57","2019-12-01 04:02:57","2019-12-01 04:03:57","2019-12-01 04:04:57","2019-12-01 04:05:58","2019-12-01 04:06:58","2019-12-01 04:07:58","2019-12-01 04:08:58","2019-12-01 04:09:58","2019-12-01 04:10:58","2019-12-01 04:11:58","2019-12-01 04:12:58","2019-12-01 04:13:58","2019-12-01 04:14:58","2019-12-01 04:15:58","2019-12-01 04:16:58","2019-12-01 04:17:58","2019-12-01 04:18:58","2019-12-01 04:19:58","2019-12-01 04:20:57","2019-12-01 04:21:57","2019-12-01 04:22:57","2019-12-01 04:23:57","2019-12-01 04:24:57","2019-12-01 04:25:58","2019-12-01 04:26:58","2019-12-01 04:27:58","2019-12-01 04:28:58","2019-12-01 04:29:58","2019-12-01 04:30:58","2019-12-01 04:31:58","2019-12-01 04:32:58","2019-12-01 04:33:58","2019-12-01 04:34:58","2019-12-01 04:35:58","2019-12-01 04:36:58","2019-12-01 04:37:58","2019-12-01 04:38:58","2019-12-01 04:39:58","2019-12-01 04:40:58","2019-12-01 04:41:58","2019-12-01 04:42:58","2019-12-01 04:43:58","2019-12-01 04:44:58","2019-12-01 04:45:57","2019-12-01 04:46:57","2019-12-01 04:47:57","2019-12-01 04:48:57","2019-12-01 04:49:57","2019-12-01 04:50:58","2019-12-01 04:51:58","2019-12-01 04:52:58","2019-12-01 04:53:58","2019-12-01 04:54:58","2019-12-01 04:55:58","2019-12-01 04:56:58","2019-12-01 04:57:58","2019-12-01 04:58:58","2019-12-01 04:59:58","2019-12-01 05:00:58","2019-12-01 05:01:58","2019-12-01 05:02:58","2019-12-01 05:03:58","2019-12-01 05:04:58","2019-12-01 05:05:58","2019-12-01 05:06:58","2019-12-01 05:07:58","2019-12-01 05:08:58","2019-12-01 05:09:58","2019-12-01 05:10:59","2019-12-01 05:11:59","2019-12-01 05:12:59","2019-12-01 05:13:59","2019-12-01 05:14:59","2019-12-01 05:15:58","2019-12-01 05:16:58","2019-12-01 05:17:58","2019-12-01 05:18:58","2019-12-01 05:19:58","2019-12-01 05:20:58","2019-12-01 05:21:58","2019-12-01 05:22:58","2019-12-01 05:23:58","2019-12-01 05:24:58","2019-12-01 05:25:57","2019-12-01 05:26:57","2019-12-01 05:27:57","2019-12-01 05:28:57","2019-12-01 05:29:57","2019-12-01 05:30:57","2019-12-01 05:31:57","2019-12-01 05:32:57","2019-12-01 05:33:57","2019-12-01 05:34:57","2019-12-01 05:35:58","2019-12-01 05:36:58","2019-12-01 05:37:58","2019-12-01 05:38:58","2019-12-01 05:39:58","2019-12-01 05:40:58","2019-12-01 05:41:58","2019-12-01 05:42:58","2019-12-01 05:43:58","2019-12-01 05:44:58","2019-12-01 05:45:58","2019-12-01 05:46:58","2019-12-01 05:47:58","2019-12-01 05:48:58","2019-12-01 05:49:58","2019-12-01 05:50:59","2019-12-01 05:51:59","2019-12-01 05:52:59","2019-12-01 05:53:59","2019-12-01 05:54:59","2019-12-01 05:55:57","2019-12-01 05:56:57","2019-12-01 05:57:57","2019-12-01 05:58:57","2019-12-01 05:59:57","2019-12-01 06:00:57","2019-12-01 06:01:57","2019-12-01 06:02:57","2019-12-01 06:03:57","2019-12-01 06:04:57","2019-12-01 06:05:58","2019-12-01 06:06:58","2019-12-01 06:07:58","2019-12-01 06:08:58","2019-12-01 06:09:58","2019-12-01 06:10:57","2019-12-01 06:11:57","2019-12-01 06:12:57","2019-12-01 06:13:57","2019-12-01 06:14:57","2019-12-01 06:15:57","2019-12-01 06:16:57","2019-12-01 06:17:57","2019-12-01 06:18:57","2019-12-01 06:19:57","2019-12-01 06:20:57","2019-12-01 06:21:57","2019-12-01 06:22:57","2019-12-01 06:23:57","2019-12-01 06:24:57","2019-12-01 06:25:57","2019-12-01 06:26:57","2019-12-01 06:27:57","2019-12-01 06:28:57","2019-12-01 06:29:57","2019-12-01 06:30:59","2019-12-01 06:31:59","2019-12-01 06:32:59","2019-12-01 06:33:59","2019-12-01 06:34:59"],"values":[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0]}'
        },
        {
          healthResultAttr: {
            valueType: 3,
            alias: '最大心率',
            id: 78,
            healthResultAttrMappers: [],
            orderNo: 1,
            show: true,
            name: 'maxHeart'
          },
          value: '{"time":"2019-11-30 19:56:01","value":0.0}'
        },
        {
          healthResultAttr: {
            valueType: 3,
            alias: '最小心率',
            id: 79,
            healthResultAttrMappers: [],
            orderNo: 1,
            show: true,
            name: 'minHeart'
          },
          value: '{"time":"2019-11-30 19:56:01","value":0.0}'
        },
        {
          healthResultAttr: {
            valueType: 3,
            alias: '最大呼吸率',
            id: 80,
            healthResultAttrMappers: [],
            orderNo: 1,
            show: true,
            name: 'maxBreath'
          },
          value: '{"time":"2019-11-30 19:56:01","value":0.0}'
        },
        {
          healthResultAttr: {
            valueType: 3,
            alias: '最小呼吸率',
            id: 81,
            healthResultAttrMappers: [],
            orderNo: 1,
            show: true,
            name: 'minBreath'
          },
          value: '{"time":"2019-11-30 19:56:01","value":0.0}'
        },
        {
          healthResultAttr: {
            valueType: 2,
            alias: '打鼾时长',
            id: 82,
            healthResultAttrMappers: [],
            orderNo: 1,
            show: true,
            name: 'snoreDuration'
          },
          value: '38400'
        }
      ],
      id: '5de32cb05908010001c4f5e2',
      snore: 0,
      turnOver: 0,
      sleepType: '缺觉型睡眠',
      sleepStatus: '糟糕',
      apneaCount: 0,
      nr2Duration: 0,
      nrDuration: 0,
      leaveBedDuration: 0,
      machineEntityPartCode: 'B2020000001D####right',
      user: {
        id: 43016
      },
      wakeDuration: 38398,
      onBedAt: 1575114961000,
      sleepTip:
        '1.入睡时间过长：不要太在意睡眠，失眠的时候不要给自己压力，如果躺在床上超过30分钟仍然睡不着，建议起床做一些让自己放松的事情，如:听听音乐、翻翻书籍杂志、喝杯热牛奶等。\n2.避免摄入过多的咖啡，睡前8小时对这类食物敬而远之，即使不是在睡前吃的，也会导致睡觉不沉。\n3. 尝试一下锻炼，如果你到晚上感觉浑身疲劳，就可能会睡得好一些。有规律的身体锻炼能提高夜间睡眠的质量，切记睡前不宜剧烈运动。',
      sleepEndAt: 1575153299000,
      machineCode: 'B2020000001D',
      sleepModel: '百灵鸟型:早睡早起'
    }
  },
  code: 200
}

export const weekMonthReport = {
  code: 200,
  message: {
    status: 'OK',
    result: {
      total: 5,
      meanScore: 36,
      meanEnterSleepDuration: 32000,
      list: [
        {
          enterSleepDuration: 300,
          score: 30,
          createAt: '2019/11/30 11:00:01'
        },
        {
          enterSleepDuration: 50491,
          score: 30,
          createAt: '2019/11/29 11:00:00'
        },
        {
          enterSleepDuration: 41699,
          score: 38,
          createAt: '2019/11/28 11:00:00'
        },
        {
          enterSleepDuration: 14997,
          score: 50,
          createAt: '2019/11/27 11:00:00'
        },
        {
          enterSleepDuration: 50406,
          score: 30,
          createAt: '2019/11/26 11:00:00'
        }
      ]
    }
  }
}

/*
export const sleepReport = {
  code: 200,
  message: {
    status: 'OK',
    result: {
      apneaCount: 25,
      apneaMeanDuration: 14,
      attrs: [
        {
          healthResultAttr: {
            alias: '孕气指数',
            id: 1,
            name: 'pregnancy_index',
            show: true,
            valueType: 3
          },
          value:
            '{"explain":"孕气指数与怀孕的几率成正相关，孕气指数越高，怀孕的几率越高。","score":13,"suggest":["备孕及避孕的人群请根据自身需要采取相关措施。"],"type":"Pregnant"}'
        },
        {
          healthResultAttr: {
            alias: '易胖指数',
            id: 2,
            name: 'easy_fat_index',
            show: true,
            valueType: 3
          },
          value:
            '{"explain":"易胖指数用于衡量身体出现肥胖难易程度的指标，指数越高，越容易发胖。","score":52,"suggest":["应控制饮食，饮食清淡。增加慢跑、游泳、散步等有氧运动的频次，增加身体的能量消耗。易出现腹部胀满、胸闷者可用白术、苍术、茯苓煮水代茶饮。增重的人需注意可以适当增加有效营养摄入，食用营养高易吸收的食物。如果出现脾胃虚弱，可用黄芪党参白术等益气健脾的中药调养脾胃。"],"type":"Easyfat"}'
        },
        {
          healthResultAttr: {
            alias: '水润指数',
            id: 3,
            name: 'water_index',
            show: true,
            valueType: 3
          },
          value:
            '{"explain":"水润指数反映细胞水饱和度，水润指数越高，皮肤弹性越好，与生理周期特点及激素水平变化相关。水润指数越高，皮肤对刺激性护肤品的耐受度越强。","score":53,"suggest":["水润指数高时，可根据皮肤基底情况，选择性地进行美白、祛痘或者激光美白等护肤项目。水润指数低时，宜采取以补水和保水为主的温和护肤方式。"],"type":"Hydra"}'
        },
        {
          // healthResultAttr: {
          //   alias: '扣分详情',
          //   id: 7,
          //   name: 'penalty_info',
          //   show: true,
          //   valueType: 2
          // },
          // value:
          //   '{"otherVitalStatValues":"{{睡眠基准心率相对值}:0.948276,{睡眠时长}:6.000000,{年龄}:34.000000,{当次基准心率115的时长}:191.000000,{当次基准心率125的时长}:135.000000,{LF}:1405.000000,{LFHF相对值}:0.800000,{diseaseLevel}:-1.000000,{上床分}:8.000000,{ULF标准差均数}:0.570682,{异常标签数}:4.000000,{异常标签扣分}:-19.000000,{sportLevel}:1.000000,{生理周期}:1.000000,{超115小125分}:56.000000,{TP}:5340.000000,{LF基线值}:1300.000000,{长期基准心率}:58.000000,{平均心率}:60.000000,{睡眠效率}:0.360000,{超83次}:4.000000,{SDNN}:152.000000,{抗压能力}:83.000000,{体动总次数}:581.000000,{入睡用时}:171.000000,{呼吸高于115阈值1045次}:0.000000,{ULF}:922.730000,{LFHF}:0.800000,{TP基线值}:6072.000000,{SDNN相对值}:1.567010,{情绪应激}:65.000000,{睡眠基准呼吸频率}:16.000000,{深度睡眠比例}:23.920000,{快速眼动期}:12.160000,{LF相对值}:1.080769,{睡觉时间}:21.000000,{SDNN基线值}:97.000000,{心率高于125阈值1045次}:2.000000,{HF基线值}:1290.000000,{入睡时长}:171.000000,{是否预测排卵日}:1.000000,{totalscore}:48.000000,{睡眠基准心率}:55.000000,{超115小83}:185.000000,{ULF基线值}:1377.000000,{DC基线值}:7.000000,{呼吸暂停次数}:26.000000,{在床时间}:357.000000,{孕气指数}:13.000000,{上床时}:21.000000,{深睡时长分}:92.000000,{长期深度睡眠比例}:19.000000,{cycle}:1.000000,{超125小83次}:129.000000,{水润指数}:53.000000,{bmi}:22.000000,{VLF基线值}:1769.000000,{离枕次数}:5.000000,{是否生成HRV}:1.000000,{VLF}:1246.470000,{LFHF基线值}:1.000000,{易胖指数}:52.000000,{生理周期疑似排卵日次数}:0.000000,{生理周期水润}:2.000000,{距离排卵日}:-14.000000,{体动次数}:581.000000,{HF}:1765.000000,{DC}:7.110000,{DC相对值}:1.015714,}","vitalStatValues":"{{睡眠基准心率相对值}:0.948276,{睡眠时长}:6.000000,{年龄}:34.000000,{当次基准心率115的时长}:191.000000,{当次基准心率125的时长}:135.000000,{LF}:1405.000000,{LFHF相对值}:0.800000,{上床分}:8.000000,{ULF标准差均数}:0.570682,{生理周期}:1.000000,{超115小125分}:56.000000,{TP}:5340.000000,{LF基线值}:1300.000000,{长期基准心率}:58.000000,{平均心率}:60.000000,{睡眠效率}:0.360000,{超83次}:4.000000,{SDNN}:152.000000,{体动总次数}:581.000000,{入睡用时}:171.000000,{呼吸高于115阈值1045次}:0.000000,{ULF}:922.730000,{LFHF}:0.800000,{TP基线值}:6072.000000,{SDNN相对值}:1.567010,{睡眠基准呼吸频率}:16.000000,{深度睡眠比例}:23.920000,{快速眼动期}:12.160000,{LF相对值}:1.080769,{睡觉时间}:21.000000,{SDNN基线值}:97.000000,{心率高于125阈值1045次}:2.000000,{HF基线值}:1290.000000,{入睡时长}:171.000000,{是否预测排卵日}:1.000000,{睡眠基准心率}:55.000000,{超115小83}:185.000000,{ULF基线值}:1377.000000,{DC基线值}:7.000000,{呼吸暂停次数}:26.000000,{在床时间}:357.000000,{上床时}:21.000000,{深睡时长分}:92.000000,{长期深度睡眠比例}:19.000000,{cycle}:1.000000,{超125小83次}:129.000000,{bmi}:22.000000,{VLF基线值}:1769.000000,{离枕次数}:5.000000,{是否生成HRV}:1.000000,{VLF}:1246.470000,{LFHF基线值}:1.000000,{生理周期疑似排卵日次数}:0.000000,{生理周期水润}:2.000000,{距离排卵日}:-14.000000,{体动次数}:581.000000,{HF}:1765.000000,{DC}:7.110000,{DC相对值}:1.015714,}","serverSuggestion":"","other":""}'
        },
        {
          // healthResultAttr: {
          //   alias: '标签',
          //   id: 8,
          //   name: 'labels',
          //   show: true,
          //   valueType: 3
          // },
          // value:
          //   '[{"TagName":"轻度呼吸暂停","level":5,"Explain":"轻度呼吸暂停是指夜间睡眠期间出现呼吸暂停5～30次/每晚。呼吸暂停是一种睡眠时出现呼吸停止的睡眠障碍，多发于身体肥胖人群，常伴有打鼾、身体抽动等表现。长期出现睡眠呼吸暂停易导致高血压、心肌梗塞、心肌缺氧等。","suggest":["戒烟限酒。","睡眠时采取侧卧睡姿。","增强体育锻炼、减肥塑身，保持良好的生活习惯。"],"type":0},{"TagName":"睡眠不安","level":5,"Explain":"睡眠不安稳常表现为睡觉时体动次数较多，身体辗转反侧，甚至造成头部离枕过多。睡前进食、枕头高度不适、睡前心情波动以及身体疾病等因素均可造成睡眠不安。","suggest":["睡前远离咖啡和尼古丁，建议睡觉前八小时避免喝咖啡。","久坐不动者应坚持规律运动。","补充B族维生素，有助于改善睡眠。"],"type":0},{"TagName":"多梦","level":5,"Explain":"多梦是人完成睡眠过程后，感觉乱梦纷纭并伴有头晕疲倦的一种状态。当人体处于做梦状态时，可因情绪变化导致心率波动，通过夜间睡眠监测得到的心率波动情况可以有效评估人体夜间做梦的次数。","suggest":["适当参加体育活动，多食用安神补脑食品进行调节。睡前泡脚有助于改善睡眠。","有胸闷痰多、身体困重者可用陈皮、茯苓、半夏煎水代茶饮。"],"type":0},{"TagName":"极难入睡","level":5,"Explain":"极难入睡是指入睡的潜伏期明显较长，是睡眠障碍的一种表现，常由于情绪波动、心理压力以及胃肠不适、过敏等身体疾病等引起，长期入睡困难可诱发焦虑情绪，严重时可导致焦虑症、抑郁症等精神疾病的发生。","suggest":["若是由于身体疾病、精神疾病导致此种情况，建议积极治疗原有疾病。","有烦躁多梦、口舌生疮、口干口苦者可用莲子心煎水代茶饮；也可用莲子、粳米煮粥食用，但经常腹胀或便秘者不适用本品。"],"type":0}]'
        },
        {
          healthResultAttr: {
            alias: '建议',
            id: 9,
            name: 'advices',
            show: true,
            valueType: 3
          },
          value:
            '[{"Suggestion":"您今天适合中等强度运动，忙不是借口，10分钟的跳绳或者办公室伸展瑜伽都有帮助，只要动了就比不动好。","DirLevel":1,"SummaryStr":"","SuggestCode":"YunDong"},{"Suggestion":"要控制脂肪摄入，除了避免油炸食品之外，尽量用鸡蛋替代品来取代全蛋，用鱼类来取代部分猪肉。","DirLevel":-1,"SummaryStr":"","SuggestCode":"YY"},{"Suggestion":"关注当下的生活细节有助于缓解对未来或者过去的焦虑，比如倾听窗外的鸟鸣，或在喝牛奶的时候仔细感受牛奶划过喉咙的丝滑。","DirLevel":-1,"SummaryStr":"","SuggestCode":"QingXuYaLi"},{"Suggestion":"睡眠不足会导致喜怒无常、注意力无法集中、行动迟缓还会降低人体免疫力。","DirLevel":-1,"SummaryStr":"","SuggestCode":"ShuiMianXiuXi"}]'
        },
        {
          // healthResultAttr: {
          //   alias: '指数',
          //   id: 10,
          //   name: 'indexs',
          //   show: true,
          //   valueType: 3
          // },
          // value:
          //   '[{"explain":"孕气指数与怀孕的几率成正相关，孕气指数越高，怀孕的几率越高。","score":13,"suggest":["备孕及避孕的人群请根据自身需要采取相关措施。"],"type":"Pregnant"},{"explain":"水润指数反映细胞水饱和度，水润指数越高，皮肤弹性越好，与生理周期特点及激素水平变化相关。水润指数越高，皮肤对刺激性护肤品的耐受度越强。","score":53,"suggest":["水润指数高时，可根据皮肤基底情况，选择性地进行美白、祛痘或者激光美白等护肤项目。水润指数低时，宜采取以补水和保水为主的温和护肤方式。"],"type":"Hydra"},{"explain":"易胖指数用于衡量身体出现肥胖难易程度的指标，指数越高，越容易发胖。","score":52,"suggest":["应控制饮食，饮食清淡。增加慢跑、游泳、散步等有氧运动的频次，增加身体的能量消耗。易出现腹部胀满、胸闷者可用白术、苍术、茯苓煮水代茶饮。增重的人需注意可以适当增加有效营养摄入，食用营养高易吸收的食物。如果出现脾胃虚弱，可用黄芪党参白术等益气健脾的中药调养脾胃。"],"type":"Easyfat"},{"explain":"","score":65,"suggest":["睡前情绪有点紧张，有可能影响入睡，建议睡前洗个热水澡或者听舒缓的音乐，让心情放松下来。"],"type":"emostress"},{"explain":"","score":83,"suggest":["抗压能力较好，当外界环境发生变化或者承受很大压力的时候，身体能够及时调整、迅速适应现状。规律的运动有助于保持这种状态，面对压力时注意情绪调节。"],"type":"compressionability"}]'
        },
        {
          healthResultAttr: {
            alias: '最高心率统计',
            id: 12,
            name: 'heart_beat_max_count',
            show: true,
            valueType: 4
          },
          value: '[{"_VitalValue_":55,"Heartbeat":55,"Count":58}]'
        },
        {
          healthResultAttr: {
            alias: '平均心率',
            id: 13,
            name: 'heart_beat_average',
            show: true,
            valueType: 0
          },
          value: '60'
        },
        {
          healthResultAttr: {
            alias: '基准心率',
            id: 14,
            name: 'heart_beat_benchmark',
            show: true,
            valueType: 0
          },
          value: '55'
        },
        {
          healthResultAttr: {
            alias: '心率过快次数',
            id: 15,
            name: 'heart_beat_higher_count',
            show: true,
            valueType: 0
          },
          value: '6'
        },
        {
          healthResultAttr: {
            alias: '心率过慢次数',
            id: 16,
            name: 'heart_beat_lower_count',
            show: true,
            valueType: 0
          },
          value: '0'
        },
        {
          // healthResultAttr: {
          //   alias: '心率超出个人阈值范围',
          //   id: 17,
          //   name: 'heart_beat_higher',
          //   show: true,
          //   valueType: 0
          // },
          // value: '135'
        },
        {
          // healthResultAttr: {
          //   alias: '心率低于个人阈值范围',
          //   id: 18,
          //   name: 'heart_beat_lower',
          //   show: true,
          //   valueType: 0
          // },
          // value: '0'
        },
        {
          // healthResultAttr: {
          //   alias: '长期心率',
          //   id: 19,
          //   name: 'heart_beat_long_term',
          //   show: true,
          //   valueType: 0
          // },
          // value: '58'
        },
        {
          healthResultAttr: {
            alias: '最低心率',
            id: 20,
            name: 'heart_beat_min',
            show: true,
            valueType: 0
          },
          value: '49'
        },
        {
          healthResultAttr: {
            alias: '最大心率',
            id: 21,
            name: 'heart_beat_max',
            show: true,
            valueType: 0
          },
          value: '84'
        },
        {
          // healthResultAttr: {
          //   alias: '日间基准心率',
          //   id: 22,
          //   name: 'heart_beat_day_benchmark',
          //   show: true,
          //   valueType: 0
          // },
          // value: '62'
        },
        {
          // healthResultAttr: {
          //   alias: '日间长期心率',
          //   id: 23,
          //   name: 'heart_beat_day_long_term',
          //   show: true,
          //   valueType: 0
          // },
          // value: '61'
        },
        {
          // healthResultAttr: {
          //   alias: '当次基准心率',
          //   id: 24,
          //   name: 'heart_beat_day_cur_benchmark',
          //   show: true,
          //   valueType: 0
          // },
          // value: '62'
        },
        {
          // healthResultAttr: {
          //   alias: '夜间基准心率',
          //   id: 25,
          //   name: 'heart_beat_night_benchmark',
          //   show: true,
          //   valueType: 0
          // },
          // value: '55'
        },
        {
          // healthResultAttr: {
          //   alias: '夜间长期基准心率',
          //   id: 26,
          //   name: 'heart_beat_night_long_term',
          //   show: true,
          //   valueType: 0
          // },
          // value: '58'
        },
        {
          // healthResultAttr: {
          //   alias: '心脏总能量',
          //   id: 27,
          //   name: 'hrv_heart_index',
          //   show: true,
          //   valueType: 0
          // },
          // value: '5340'
        },
        {
          // healthResultAttr: {
          //   alias: '基准心脏总能量',
          //   id: 28,
          //   name: 'hrv_basetp',
          //   show: true,
          //   valueType: 0
          // },
          // value: '6072'
        },
        {
          // healthResultAttr: {
          //   alias: '交感神经调节能力',
          //   id: 29,
          //   name: 'hrv_lf',
          //   show: true,
          //   valueType: 0
          // },
          // value: '1405'
        },
        {
          // healthResultAttr: {
          //   alias: '基准交感神经调节能力',
          //   id: 30,
          //   name: 'hrv_base_lf',
          //   show: true,
          //   valueType: 0
          // },
          // value: '1300'
        },
        {
          // healthResultAttr: {
          //   alias: '迷走神经调节能力',
          //   id: 31,
          //   name: 'hrv_hf',
          //   show: true,
          //   valueType: 0
          // },
          // value: '1765'
        },
        {
          // healthResultAttr: {
          //   alias: '基准迷走神经调节能力',
          //   id: 32,
          //   name: 'hrv_base_hf',
          //   show: true,
          //   valueType: 0
          // },
          // value: '1290'
        },
        {
          // healthResultAttr: {
          //   alias: '自主神经平衡指数',
          //   id: 33,
          //   name: 'hrv_lf_hf',
          //   show: true,
          //   valueType: 1
          // },
          // value: '0.800000'
        },
        {
          // healthResultAttr: {
          //   alias: '基准自主神经平衡指数',
          //   id: 34,
          //   name: 'hrv_base_lf_hf',
          //   show: true,
          //   valueType: 1
          // },
          // value: '1'
        },
        {
          // healthResultAttr: {
          //   alias: '心力减速力',
          //   id: 35,
          //   name: 'hrv_dc_value',
          //   show: true,
          //   valueType: 1
          // },
          // value: '7.110000'
        },
        {
          // healthResultAttr: {
          //   alias: '基准心力减速力',
          //   id: 36,
          //   name: 'hrv_base_dc',
          //   show: true,
          //   valueType: 1
          // },
          // value: '7'
        },
        {
          // healthResultAttr: {
          //   alias: '心脑血管事件指数',
          //   id: 39,
          //   name: 'hrv_sd_nn',
          //   show: true,
          //   valueType: 1
          // },
          // value: '152'
        },
        {
          // healthResultAttr: {
          //   alias: '基准心脑血管事件指数',
          //   id: 40,
          //   name: 'hrv_base_sd_nn',
          //   show: true,
          //   valueType: 1
          // },
          // value: '97'
        },
        {
          // healthResultAttr: {
          //   alias: '内分泌指数',
          //   id: 41,
          //   name: 'hrv_endocrine',
          //   show: true,
          //   valueType: 1
          // },
          // value: '922.730000'
        },
        {
          // healthResultAttr: {
          //   alias: '血管舒缩指数',
          //   id: 42,
          //   name: 'hrv_temperature',
          //   show: true,
          //   valueType: 1
          // },
          // value: '1246.470000'
        },
        {
          // healthResultAttr: {
          //   alias: '基准内分泌指数',
          //   id: 43,
          //   name: 'hrv_base_ulf',
          //   show: true,
          //   valueType: 1
          // },
          // value: '1377'
        },
        {
          // healthResultAttr: {
          //   alias: '基准血管舒缩指数',
          //   id: 44,
          //   name: 'hrv_base_vlf',
          //   show: true,
          //   valueType: 1
          // },
          // value: '1769'
        },
        {
          healthResultAttr: {
            alias: '呼吸暂停统计',
            id: 45,
            name: 'breath_pause',
            show: true,
            valueType: 4
          },
          value:
            '[{"PauseTime":12,"EndTick":1578240904,"StartTick":1578240892},{"PauseTime":15,"EndTick":1578242017,"StartTick":1578242002},{"PauseTime":23,"EndTick":1578242514,"StartTick":1578242491},{"PauseTime":15,"EndTick":1578243499,"StartTick":1578243484},{"PauseTime":14,"EndTick":1578243786,"StartTick":1578243772},{"PauseTime":12,"EndTick":1578244060,"StartTick":1578244048},{"PauseTime":13,"EndTick":1578244143,"StartTick":1578244130},{"PauseTime":17,"EndTick":1578244332,"StartTick":1578244315},{"PauseTime":19,"EndTick":1578245038,"StartTick":1578245019},{"PauseTime":13,"EndTick":1578246079,"StartTick":1578246066},{"PauseTime":10,"EndTick":1578246153,"StartTick":1578246143},{"PauseTime":12,"EndTick":1578247931,"StartTick":1578247919},{"PauseTime":14,"EndTick":1578248669,"StartTick":1578248655},{"PauseTime":18,"EndTick":1578250209,"StartTick":1578250191},{"PauseTime":15,"EndTick":1578252144,"StartTick":1578252129},{"PauseTime":14,"EndTick":1578252250,"StartTick":1578252236},{"PauseTime":17,"EndTick":1578253983,"StartTick":1578253966},{"PauseTime":12,"EndTick":1578254044,"StartTick":1578254032},{"PauseTime":12,"EndTick":1578256354,"StartTick":1578256342},{"PauseTime":12,"EndTick":1578256589,"StartTick":1578256577},{"PauseTime":12,"EndTick":1578258400,"StartTick":1578258388},{"PauseTime":14,"EndTick":1578259717,"StartTick":1578259703},{"PauseTime":11,"EndTick":1578260030,"StartTick":1578260019},{"PauseTime":16,"EndTick":1578260670,"StartTick":1578260654},{"PauseTime":17,"EndTick":1578261297,"StartTick":1578261280},{"PauseTime":12,"EndTick":1578262150,"StartTick":1578262138}]'
        },
        {
          // healthResultAttr: {
          //   alias: '当次出现最多呼吸率统计',
          //   id: 46,
          //   name: 'breath_max_count',
          //   show: true,
          //   valueType: 4
          // },
          // value: '[{"_VitalValue_":16,"Breath":16,"Count":101}]'
        },
        {
          // healthResultAttr: {
          //   alias: '平均呼吸暂停时长（秒）',
          //   id: 47,
          //   name: 'breath_avg_pause',
          //   show: true,
          //   valueType: 0
          // },
          // value: '14'
        },
        {
          // healthResultAttr: {
          //   alias: '基准呼吸频率（次/分钟）',
          //   id: 48,
          //   name: 'breath_benchmark',
          //   show: true,
          //   valueType: 0
          // },
          // value: '16'
        },
        {
          // healthResultAttr: {
          //   alias: '长期睡眠基准呼吸频率',
          //   id: 49,
          //   name: 'breath_longterm',
          //   show: true,
          //   valueType: 0
          // },
          // value: '15'
        },
        {
          // healthResultAttr: {
          //   alias: '呼吸过急次数（分钟数）',
          //   id: 50,
          //   name: 'breath_higher_count',
          //   show: true,
          //   valueType: 0
          // },
          // value: '1'
        },
        {
          // healthResultAttr: {
          //   alias: '呼吸过缓次数（分钟数）',
          //   id: 51,
          //   name: 'breath_lower_count',
          //   show: true,
          //   valueType: 0
          // },
          // value: '91'
        },
        {
          healthResultAttr: {
            alias: '呼吸暂停次数',
            id: 52,
            name: 'breath_pause10_count',
            show: true,
            valueType: 0
          },
          value: '25'
        },
        {
          // healthResultAttr: {
          //   alias: '呼吸暂停大于30S次数',
          //   id: 53,
          //   name: 'breath_pause30_count',
          //   show: true,
          //   valueType: 0
          // },
          // value: '0'
        },
        {
          // healthResultAttr: {
          //   alias: '最长呼吸暂停时长（秒）',
          //   id: 54,
          //   name: 'breath_longest',
          //   show: true,
          //   valueType: 0
          // },
          // value: '23'
        },
        {
          // healthResultAttr: {
          //   alias: '最短呼吸暂停时长（秒）',
          //   id: 55,
          //   name: 'breath_shortest',
          //   show: true,
          //   valueType: 0
          // },
          // value: '10'
        },
        {
          healthResultAttr: {
            alias: '平均呼吸频率(次/分钟)',
            id: 56,
            name: 'breath_average',
            show: true,
            valueType: 0
          },
          value: '15'
        },
        {
          // healthResultAttr: {
          //   alias: '呼吸暂停总时长（秒）',
          //   id: 57,
          //   name: 'breath_pause_sum',
          //   show: true,
          //   valueType: 0
          // },
          // value: '371'
        },
        {
          healthResultAttr: {
            alias: '最大呼吸频率',
            id: 58,
            name: 'breath_max',
            show: true,
            valueType: 0
          },
          value: '24'
        },
        {
          healthResultAttr: {
            alias: '最小呼吸频率',
            id: 59,
            name: 'breath_min',
            show: true,
            valueType: 0
          },
          value: '7'
        },
        {
          // healthResultAttr: {
          //   alias: '情绪应激',
          //   id: 62,
          //   name: 'emostr_index',
          //   show: true,
          //   valueType: 3
          // },
          // value:
          //   '{"explain":"","score":65,"suggest":["睡前情绪有点紧张，有可能影响入睡，建议睡前洗个热水澡或者听舒缓的音乐，让心情放松下来。"],"type":"emostress"}'
        },
        {
          // healthResultAttr: {
          //   alias: '抗压能力',
          //   id: 63,
          //   name: 'strtol_index',
          //   show: true,
          //   valueType: 3
          // },
          // value:
          //   '{"explain":"","score":83,"suggest":["抗压能力较好，当外界环境发生变化或者承受很大压力的时候，身体能够及时调整、迅速适应现状。规律的运动有助于保持这种状态，面对压力时注意情绪调节。"],"type":"compressionability"}'
        },
        {
          healthResultAttr: {
            alias: '实时心率图表',
            id: 64,
            name: 'rd_heart_beat',
            show: true,
            valueType: 3
          },
          value:
            '{"NormalStart":63,"Comments":"","Title":"单次报告心率变化图","MaxAlert":68,"XDataTime":[1578229680,1578229740,1578229800,1578229860,1578229920,1578229980,1578230040,1578230100,1578230160,1578230220,1578230280,1578230340,1578230400,1578230460,1578230520,1578230580,1578230640,1578230700,1578230760,1578230820,1578230880,1578230940,1578231000,1578231060,1578231120,1578231180,1578231240,1578231300,1578231360,1578231420,1578231480,1578231540,1578231600,1578231660,1578231720,1578231780,1578231840,1578231900,1578231960,1578232020,1578232080,1578232140,1578232200,1578232260,1578232320,1578232380,1578232440,1578232500,1578232560,1578232620,1578232680,1578232740,1578232800,1578232860,1578232920,1578232980,1578233040,1578233100,1578233160,1578233220,1578233280,1578233340,1578233400,1578233460,1578233520,1578233580,1578233640,1578233700,1578233760,1578233820,1578233880,1578233940,1578234000,1578234060,1578234120,1578234180,1578234240,1578234300,1578234360,1578234420,1578234480,1578234540,1578234600,1578234660,1578234720,1578234780,1578234840,1578234900,1578234960,1578235020,1578235080,1578235140,1578235200,1578235260,1578235320,1578235380,1578235440,1578235500,1578235560,1578235620,1578235680,1578235740,1578235800,1578235860,1578235920,1578235980,1578236040,1578236100,1578236160,1578236220,1578236280,1578236340,1578236400,1578236460,1578236520,1578236580,1578236640,1578236700,1578236760,1578236820,1578236880,1578236940,1578237000,1578237060,1578237120,1578237180,1578237240,1578237300,1578237360,1578237420,1578237480,1578237540,1578237600,1578237660,1578237720,1578237780,1578237840,1578237900,1578237960,1578238020,1578238080,1578238140,1578238200,1578238260,1578238320,1578238380,1578238440,1578238500,1578238560,1578238620,1578238680,1578238740,1578238800,1578238860,1578238920,1578238980,1578239040,1578239100,1578239160,1578239220,1578239280,1578239340,1578239400,1578239460,1578239520,1578239580,1578239640,1578239700,1578239760,1578239820,1578239880,1578239940,1578240000,1578240060,1578240120,1578240180,1578240240,1578240300,1578240360,1578240420,1578240480,1578240540,1578240600,1578240660,1578240720,1578240780,1578240840,1578240900,1578240960,1578241020,1578241080,1578241140,1578241200,1578241260,1578241320,1578241380,1578241440,1578241500,1578241560,1578241620,1578241680,1578241740,1578241800,1578241860,1578241920,1578241980,1578242040,1578242100,1578242160,1578242220,1578242280,1578242340,1578242400,1578242460,1578242520,1578242580,1578242640,1578242700,1578242760,1578242820,1578242880,1578242940,1578243000,1578243060,1578243120,1578243180,1578243240,1578243300,1578243360,1578243420,1578243480,1578243540,1578243600,1578243660,1578243720,1578243780,1578243840,1578243900,1578243960,1578244020,1578244080,1578244140,1578244200,1578244260,1578244320,1578244380,1578244440,1578244500,1578244560,1578244620,1578244680,1578244740,1578244800,1578244860,1578244920,1578244980,1578245040,1578245100,1578245160,1578245220,1578245280,1578245340,1578245400,1578245460,1578245520,1578245580,1578245640,1578245700,1578245760,1578245820,1578245880,1578245940,1578246000,1578246060,1578246120,1578246180,1578246240,1578246300,1578246360,1578246420,1578246480,1578246540,1578246600,1578246660,1578246720,1578246780,1578246840,1578246900,1578246960,1578247020,1578247080,1578247140,1578247200,1578247260,1578247320,1578247380,1578247440,1578247500,1578247560,1578247620,1578247680,1578247740,1578247800,1578247860,1578247920,1578247980,1578248040,1578248100,1578248160,1578248220,1578248280,1578248340,1578248400,1578248460,1578248520,1578248580,1578248640,1578248700,1578248760,1578248820,1578248880,1578248940,1578249000,1578249060,1578249120,1578249180,1578249240,1578249300,1578249360,1578249420,1578249480,1578249540,1578249600,1578249660,1578249720,1578249780,1578249840,1578249900,1578249960,1578250020,1578250080,1578250140,1578250200,1578250260,1578250320,1578250380,1578250440,1578250500,1578250560,1578250620,1578250680,1578250740,1578250800,1578250860,1578250920,1578250980,1578251040,1578251100,1578251160,1578251220,1578251280,1578251340,1578251400,1578251460,1578251520,1578251580,1578251640,1578251700,1578251760,1578251820,1578251880,1578251940,1578252000,1578252060,1578252120,1578252180,1578252240,1578252300,1578252360,1578252420,1578252480,1578252540,1578252600,1578252660,1578252720,1578252780,1578252840,1578252900,1578252960,1578253020,1578253080,1578253140,1578253200,1578253260,1578253320,1578253380,1578253440,1578253500,1578253560,1578253620,1578253680,1578253740,1578253800,1578253860,1578253920,1578253980,1578254040,1578254100,1578254160,1578254220,1578254280,1578254340,1578254400,1578254460,1578254520,1578254580,1578254640,1578254700,1578254760,1578254820,1578254880,1578254940,1578255000,1578255060,1578255120,1578255180,1578255240,1578255300,1578255360,1578255420,1578255480,1578255540,1578255600,1578255660,1578255720,1578255780,1578255840,1578255900,1578255960,1578256020,1578256080,1578256140,1578256200,1578256260,1578256320,1578256380,1578256440,1578256500,1578256560,1578256620,1578256680,1578256740,1578256800,1578256860,1578256920,1578256980,1578257040,1578257100,1578257160,1578257220,1578257280,1578257340,1578257400,1578257460,1578257520,1578257580,1578257640,1578257700,1578257760,1578257820,1578257880,1578257940,1578258000,1578258060,1578258120,1578258180,1578258240,1578258300,1578258360,1578258420,1578258480,1578258540,1578258600,1578258660,1578258720,1578258780,1578258840,1578258900,1578258960,1578259020,1578259080,1578259140,1578259200,1578259260,1578259320,1578259380,1578259440,1578259500,1578259560,1578259620,1578259680,1578259740,1578259800,1578259860,1578259920,1578259980,1578260040,1578260100,1578260160,1578260220,1578260280,1578260340,1578260400,1578260460,1578260520,1578260580,1578260640,1578260700,1578260760,1578260820,1578260880,1578260940,1578261000,1578261060,1578261120,1578261180,1578261240,1578261300,1578261360,1578261420,1578261480,1578261540,1578261600,1578261660,1578261720,1578261780,1578261840,1578261900,1578261960,1578262020,1578262080,1578262140,1578262200,1578262260,1578262320,1578262380,1578262440,1578262500,1578262560,1578262620,1578262680,1578262740,1578262800,1578262860,1578262920,1578262980,1578263040,1578263100,1578263160,1578263220,1578263280,1578263340,1578263400,1578263460,1578263520,1578263580,1578263640,1578263700,1578263760,1578263820,1578263880,1578263940,1578264000,1578264060,1578264120,1578264180,1578264240,1578264300,1578264360,1578264420,1578264480,1578264540,1578264600,1578264660,1578264720,1578264780,1578264840,1578264900,1578264960,1578265020,1578265080,1578265140,1578265200,1578265260,1578265320,1578265380,1578265440,1578265500,1578265560,1578265620,1578265680,1578265740,1578265800,1578265860,1578265920,1578265980,1578266040,1578266100,1578266160,1578266220,1578266280,1578266340,1578266400,1578266460,1578266520,1578266580,1578266640,1578266700,1578266760,1578266820,1578266880,1578266940,1578267000,1578267060,1578267120,1578267180,1578267240,1578267300,1578267360,1578267420,1578267480,1578267540,1578267600,1578267660,1578267720,1578267780,1578267840,1578267900,1578267960,1578268020,1578268080,1578268140,1578268200,1578268260,1578268320,1578268380,1578268440,1578268500,1578268560,1578268620,1578268680,1578268740,1578268800,1578268860,1578268920,1578268980,1578269040,1578269100,1578269160,1578269220,1578269280],"MinAlert":43,"XDataValue":[73,72,72,71,71,70,69,71,70,70,71,71,70,70,70,70,69,70,70,72,74,75,68,62,55,58,62,61,61,61,60,60,59,58,58,59,73,73,78,83,84,75,67,65,65,69,67,62,59,61,78,78,77,73,74,74,77,75,74,76,78,76,70,66,71,73,76,73,76,78,75,75,74,73,76,81,84,78,72,72,74,74,72,72,72,73,71,72,72,72,73,74,72,72,74,73,74,72,71,74,73,72,73,72,64,57,63,73,76,69,67,73,84,84,77,76,75,70,69,69,77,79,74,74,76,68,63,65,69,71,68,74,70,66,66,67,68,67,66,65,61,58,57,58,61,64,60,57,56,57,58,57,56,57,55,53,55,57,55,55,55,53,53,53,53,52,52,52,54,53,53,53,53,52,53,52,53,53,54,54,53,54,54,53,54,53,53,54,53,53,54,54,55,54,55,55,54,54,54,54,53,55,55,54,54,55,55,56,55,55,55,56,63,63,60,56,57,58,60,63,63,58,59,62,60,60,61,61,61,59,56,56,55,55,55,55,56,57,57,56,55,55,57,58,57,57,58,64,62,59,61,60,55,56,59,55,55,55,53,52,53,53,52,53,52,52,52,53,52,54,57,55,56,55,53,53,55,57,59,58,57,55,58,57,57,57,52,51,53,51,54,56,54,54,53,53,54,53,53,53,54,52,51,53,52,53,54,52,55,54,55,55,53,54,55,57,58,54,53,54,55,56,57,58,55,56,55,55,55,52,52,52,53,53,54,54,53,51,52,52,51,52,52,50,51,51,51,51,51,52,52,54,55,57,56,57,55,55,55,57,57,56,57,55,53,54,54,53,50,49,52,58,58,62,58,58,53,54,56,54,56,54,54,55,51,53,54,50,50,50,50,51,51,51,52,52,56,54,58,57,58,57,58,56,57,58,58,61,70,69,64,64,67,67,66,63,62,59,63,72,72,72,72,73,72,72,73,71,70,68,62,60,61,67,69,70,71,71,75,74,73,75,77,75,75,76,66,59,59,59,60,60,60,68,70,65,63,61,66,68,63,66,66,67,67,68,66,65,65,67,65,64,66,65,64,65,65,66,65,69,67,66,61,55,55,54,52,53,52,53,52,55,56,51,51,52,53,54,56,56,59,59,58,58,62,60,60,61,60,60,61,61,62,62,63,59,60,61,62,63,58,58,59,62,60,57,55,56,55,56,60,62,60,53,53,54,54,57,58,57,58,57,57,58,60,63,62,61,63,61,56,54,55,58,55,53,55,55,55,54,55,55,53,52,54,57,57,55,54,56,57,59,62,62,61,59,60,60,59,58,60,60,61,60,56,56,57,56,56,56,59,62,62,62,62,62,62,62,62,62,62,62,61,61,66,66,66,79,79,83,81,75,75,74,74,74,74,67,67,62,62,62,62,61,60,70,76,71,71,71,71,71,71,71,72,72,69,68,66,66,68,65,64,65,69,68,68,68,68,68,68,68,62,62,63,62,62,62,63,63,64],"NormalEnd":46,"ChartTypeId":2106}'
        },
        {
          healthResultAttr: {
            alias: '实时呼吸率图表',
            id: 65,
            name: 'rd_breath',
            show: true,
            valueType: 3
          },
          value:
            '{"NormalStart":18,"Comments":"","Title":"单次报告呼吸变化图","MaxAlert":20,"XDataTime":[1578229680,1578229740,1578229800,1578229860,1578229920,1578229980,1578230040,1578230100,1578230160,1578230220,1578230280,1578230340,1578230400,1578230460,1578230520,1578230580,1578230640,1578230700,1578230760,1578230820,1578230880,1578230940,1578231000,1578231060,1578231120,1578231180,1578231240,1578231300,1578231360,1578231420,1578231480,1578231540,1578231600,1578231660,1578231720,1578231780,1578231840,1578231900,1578231960,1578232020,1578232080,1578232140,1578232200,1578232260,1578232320,1578232380,1578232440,1578232500,1578232560,1578232620,1578232680,1578232740,1578232800,1578232860,1578232920,1578232980,1578233040,1578233100,1578233160,1578233220,1578233280,1578233340,1578233400,1578233460,1578233520,1578233580,1578233640,1578233700,1578233760,1578233820,1578233880,1578233940,1578234000,1578234060,1578234120,1578234180,1578234240,1578234300,1578234360,1578234420,1578234480,1578234540,1578234600,1578234660,1578234720,1578234780,1578234840,1578234900,1578234960,1578235020,1578235080,1578235140,1578235200,1578235260,1578235320,1578235380,1578235440,1578235500,1578235560,1578235620,1578235680,1578235740,1578235800,1578235860,1578235920,1578235980,1578236040,1578236100,1578236160,1578236220,1578236280,1578236340,1578236400,1578236460,1578236520,1578236580,1578236640,1578236700,1578236760,1578236820,1578236880,1578236940,1578237000,1578237060,1578237120,1578237180,1578237240,1578237300,1578237360,1578237420,1578237480,1578237540,1578237600,1578237660,1578237720,1578237780,1578237840,1578237900,1578237960,1578238020,1578238080,1578238140,1578238200,1578238260,1578238320,1578238380,1578238440,1578238500,1578238560,1578238620,1578238680,1578238740,1578238800,1578238860,1578238920,1578238980,1578239040,1578239100,1578239160,1578239220,1578239280,1578239340,1578239400,1578239460,1578239520,1578239580,1578239640,1578239700,1578239760,1578239820,1578239880,1578239940,1578240000,1578240060,1578240120,1578240180,1578240240,1578240300,1578240360,1578240420,1578240480,1578240540,1578240600,1578240660,1578240720,1578240780,1578240840,1578240900,1578240960,1578241020,1578241080,1578241140,1578241200,1578241260,1578241320,1578241380,1578241440,1578241500,1578241560,1578241620,1578241680,1578241740,1578241800,1578241860,1578241920,1578241980,1578242040,1578242100,1578242160,1578242220,1578242280,1578242340,1578242400,1578242460,1578242520,1578242580,1578242640,1578242700,1578242760,1578242820,1578242880,1578242940,1578243000,1578243060,1578243120,1578243180,1578243240,1578243300,1578243360,1578243420,1578243480,1578243540,1578243600,1578243660,1578243720,1578243780,1578243840,1578243900,1578243960,1578244020,1578244080,1578244140,1578244200,1578244260,1578244320,1578244380,1578244440,1578244500,1578244560,1578244620,1578244680,1578244740,1578244800,1578244860,1578244920,1578244980,1578245040,1578245100,1578245160,1578245220,1578245280,1578245340,1578245400,1578245460,1578245520,1578245580,1578245640,1578245700,1578245760,1578245820,1578245880,1578245940,1578246000,1578246060,1578246120,1578246180,1578246240,1578246300,1578246360,1578246420,1578246480,1578246540,1578246600,1578246660,1578246720,1578246780,1578246840,1578246900,1578246960,1578247020,1578247080,1578247140,1578247200,1578247260,1578247320,1578247380,1578247440,1578247500,1578247560,1578247620,1578247680,1578247740,1578247800,1578247860,1578247920,1578247980,1578248040,1578248100,1578248160,1578248220,1578248280,1578248340,1578248400,1578248460,1578248520,1578248580,1578248640,1578248700,1578248760,1578248820,1578248880,1578248940,1578249000,1578249060,1578249120,1578249180,1578249240,1578249300,1578249360,1578249420,1578249480,1578249540,1578249600,1578249660,1578249720,1578249780,1578249840,1578249900,1578249960,1578250020,1578250080,1578250140,1578250200,1578250260,1578250320,1578250380,1578250440,1578250500,1578250560,1578250620,1578250680,1578250740,1578250800,1578250860,1578250920,1578250980,1578251040,1578251100,1578251160,1578251220,1578251280,1578251340,1578251400,1578251460,1578251520,1578251580,1578251640,1578251700,1578251760,1578251820,1578251880,1578251940,1578252000,1578252060,1578252120,1578252180,1578252240,1578252300,1578252360,1578252420,1578252480,1578252540,1578252600,1578252660,1578252720,1578252780,1578252840,1578252900,1578252960,1578253020,1578253080,1578253140,1578253200,1578253260,1578253320,1578253380,1578253440,1578253500,1578253560,1578253620,1578253680,1578253740,1578253800,1578253860,1578253920,1578253980,1578254040,1578254100,1578254160,1578254220,1578254280,1578254340,1578254400,1578254460,1578254520,1578254580,1578254640,1578254700,1578254760,1578254820,1578254880,1578254940,1578255000,1578255060,1578255120,1578255180,1578255240,1578255300,1578255360,1578255420,1578255480,1578255540,1578255600,1578255660,1578255720,1578255780,1578255840,1578255900,1578255960,1578256020,1578256080,1578256140,1578256200,1578256260,1578256320,1578256380,1578256440,1578256500,1578256560,1578256620,1578256680,1578256740,1578256800,1578256860,1578256920,1578256980,1578257040,1578257100,1578257160,1578257220,1578257280,1578257340,1578257400,1578257460,1578257520,1578257580,1578257640,1578257700,1578257760,1578257820,1578257880,1578257940,1578258000,1578258060,1578258120,1578258180,1578258240,1578258300,1578258360,1578258420,1578258480,1578258540,1578258600,1578258660,1578258720,1578258780,1578258840,1578258900,1578258960,1578259020,1578259080,1578259140,1578259200,1578259260,1578259320,1578259380,1578259440,1578259500,1578259560,1578259620,1578259680,1578259740,1578259800,1578259860,1578259920,1578259980,1578260040,1578260100,1578260160,1578260220,1578260280,1578260340,1578260400,1578260460,1578260520,1578260580,1578260640,1578260700,1578260760,1578260820,1578260880,1578260940,1578261000,1578261060,1578261120,1578261180,1578261240,1578261300,1578261360,1578261420,1578261480,1578261540,1578261600,1578261660,1578261720,1578261780,1578261840,1578261900,1578261960,1578262020,1578262080,1578262140,1578262200,1578262260,1578262320,1578262380,1578262440,1578262500,1578262560,1578262620,1578262680,1578262740,1578262800,1578262860,1578262920,1578262980,1578263040,1578263100,1578263160,1578263220,1578263280,1578263340,1578263400,1578263460,1578263520,1578263580,1578263640,1578263700,1578263760,1578263820,1578263880,1578263940,1578264000,1578264060,1578264120,1578264180,1578264240,1578264300,1578264360,1578264420,1578264480,1578264540,1578264600,1578264660,1578264720,1578264780,1578264840,1578264900,1578264960,1578265020,1578265080,1578265140,1578265200,1578265260,1578265320,1578265380,1578265440,1578265500,1578265560,1578265620,1578265680,1578265740,1578265800,1578265860,1578265920,1578265980,1578266040,1578266100,1578266160,1578266220,1578266280,1578266340,1578266400,1578266460,1578266520,1578266580,1578266640,1578266700,1578266760,1578266820,1578266880,1578266940,1578267000,1578267060,1578267120,1578267180,1578267240,1578267300,1578267360,1578267420,1578267480,1578267540,1578267600,1578267660,1578267720,1578267780,1578267840,1578267900,1578267960,1578268020,1578268080,1578268140,1578268200,1578268260,1578268320,1578268380,1578268440,1578268500,1578268560,1578268620,1578268680,1578268740,1578268800,1578268860,1578268920,1578268980,1578269040,1578269100,1578269160,1578269220,1578269280],"MinAlert":12,"XDataValue":[19,11,17,15,14,14,19,22,21,22,13,21,9,10,9,11,14,19,13,18,14,10,10,11,9,10,10,12,17,10,8,10,14,9,10,12,10,10,22,23,21,17,13,13,22,23,22,21,20,15,23,24,22,16,23,21,20,19,17,16,18,19,17,16,17,17,18,14,20,16,12,18,19,17,15,13,16,15,16,17,16,19,15,19,19,18,18,15,16,19,15,18,20,19,18,19,12,18,16,18,17,18,19,17,18,17,19,20,19,18,11,20,15,21,19,20,19,19,19,22,14,18,17,16,12,15,17,14,15,18,18,18,15,17,18,13,12,16,11,13,21,18,19,20,11,16,14,12,16,19,18,13,18,17,19,17,15,17,16,17,16,17,17,16,17,17,16,13,16,17,17,17,18,18,18,18,18,18,18,18,18,18,18,19,18,18,18,19,15,12,15,16,16,16,16,16,16,16,15,16,9,16,16,15,15,15,14,17,15,16,12,17,13,16,15,14,15,14,18,18,18,17,18,19,18,18,17,18,14,8,13,12,14,11,17,13,14,15,17,16,18,16,18,17,17,18,10,14,16,15,14,15,16,15,13,16,15,9,11,18,19,17,17,16,14,17,17,15,10,15,15,16,15,16,11,15,16,15,15,16,16,16,16,16,14,16,15,16,16,17,16,17,17,16,17,16,17,16,18,16,16,16,15,14,16,12,17,15,16,17,16,15,15,16,17,17,16,15,16,16,15,17,18,16,15,16,16,16,15,16,14,16,15,12,16,15,15,13,12,15,14,15,14,10,14,16,10,14,14,15,13,16,15,14,12,14,13,14,14,15,14,15,13,16,14,16,11,10,12,15,10,15,13,15,14,15,11,9,16,14,15,13,13,15,14,16,13,13,18,15,16,12,15,13,15,15,12,14,17,18,17,18,13,9,15,9,14,13,18,16,14,9,16,9,13,10,14,10,15,14,18,16,21,20,20,19,20,21,19,16,17,14,16,11,9,15,17,20,10,20,16,13,21,17,20,20,16,14,13,14,16,15,12,18,16,18,17,15,12,17,13,18,12,16,16,11,17,16,13,17,18,15,18,14,18,17,18,16,18,13,11,15,15,15,15,14,15,16,18,13,17,11,13,12,13,15,13,15,16,17,18,18,16,17,16,15,18,13,8,16,15,15,13,15,13,14,16,15,16,17,19,19,13,21,19,17,14,16,14,13,16,15,11,15,13,15,14,16,14,12,14,18,13,14,12,16,9,15,15,12,18,19,18,17,17,18,18,19,18,18,18,18,18,19,17,12,15,16,17,16,15,15,14,18,18,17,19,19,18,17,18,10,12,13,14,13,13,14,14,12,9,14,13,13,13,13,13,13,13,13,13,13,13,9,14,15,15,15,15,10,13,10,10,10,10,10,10,10,8,8,16,16,16,16,15,12,13,11,10,10,10,10,10,10,10,10,16,9,14,11,11,14,12,9,10,12,11,7,11,12,12,12,12,11,11,14,15,12,7,7,11],"NormalEnd":13,"ChartTypeId":2107}'
        },
        {
          healthResultAttr: {
            alias: '心脏总能量多天回溯曲线图数据',
            id: 66,
            name: 'tp_days_trent_chart',
            show: true,
            valueType: 3
          },
          value:
            '{"Title":"TP","Data":[{"color":"green","basevalue":"6072.00","time":1577749566000,"value":"4673.00"},{"color":"yellow","basevalue":"6072.00","time":1577841377000,"value":"4378.00"},{"color":"green","basevalue":"6072.00","time":1577922500000,"value":"4602.00"},{"color":"green","basevalue":"6072.00","time":1578007484000,"value":"5549.00"},{"color":"yellow","basevalue":"6072.00","time":1578100721000,"value":"9853.00"},{"color":"green","basevalue":"6072.00","time":1578269495000,"value":"5340.00"}],"Warns":{"red":{"min":8000,"max":99999},"green":{"min":1000,"max":3000},"yellow":{"min":3000,"max":7999}},"ChartTypeId":2103}'
        },
        {
          healthResultAttr: {
            alias: '交感神经调节能力回溯曲线图数据',
            id: 67,
            name: 'lf_days_trent_chart',
            show: true,
            valueType: 3
          },
          value:
            '{"Title":"LF","Data":[{"color":"green","basevalue":"1300.00","time":1577749566000,"value":"1258.00"},{"color":"green","basevalue":"1300.00","time":1577841377000,"value":"1265.00"},{"color":"green","basevalue":"1300.00","time":1577922500000,"value":"1045.00"},{"color":"green","basevalue":"1300.00","time":1578007484000,"value":"1197.00"},{"color":"green","basevalue":"1300.00","time":1578100721000,"value":"1051.00"},{"color":"green","basevalue":"1300.00","time":1578269495000,"value":"1405.00"}],"Warns":{"red":{"min":8000,"max":99999},"green":{"min":1000,"max":3000},"yellow":{"min":3000,"max":7999}},"ChartTypeId":2104}'
        },
        {
          healthResultAttr: {
            alias: '迷走神经张力指数多天回溯曲线图数据',
            id: 68,
            name: 'hf_days_trent_chart',
            show: true,
            valueType: 3
          },
          value:
            '{"Title":"HF","Data":[{"color":"green","basevalue":"1290.00","time":1577749566000,"value":"1708.00"},{"color":"green","basevalue":"1290.00","time":1577841377000,"value":"1846.00"},{"color":"green","basevalue":"1290.00","time":1577922500000,"value":"1380.00"},{"color":"green","basevalue":"1290.00","time":1578007484000,"value":"1882.00"},{"color":"green","basevalue":"1290.00","time":1578100721000,"value":"1902.00"},{"color":"green","basevalue":"1290.00","time":1578269495000,"value":"1765.00"}],"Warns":{"red":{"min":8000,"max":99999},"green":{"min":1000,"max":3000},"yellow":{"min":3000,"max":7999}},"ChartTypeId":2102}'
        },
        {
          healthResultAttr: {
            alias: '自主神经平衡指数多天回溯曲线图数据',
            id: 69,
            name: 'lf_hf_days_trent_chart',
            show: true,
            valueType: 3
          },
          value:
            '{"Title":"lf/hf","Data":[{"color":"","basevalue":"1.00","time":1577749566000,"value":"0.74"},{"color":"","basevalue":"1.00","time":1577841377000,"value":"0.69"},{"color":"","basevalue":"1.00","time":1577922500000,"value":"0.76"},{"color":"","basevalue":"1.00","time":1578007484000,"value":"0.64"},{"color":"","basevalue":"1.00","time":1578100721000,"value":"0.55"},{"color":"","basevalue":"1.00","time":1578269495000,"value":"0.80"}],"Warns":{"red":{"min":8000,"max":99999},"green":{"min":1000,"max":3000},"yellow":{"min":3000,"max":7999}},"ChartTypeId":2105}'
        },
        {
          healthResultAttr: {
            alias: '内分泌指数多天回溯曲线图数据',
            id: 70,
            name: 'endocrine_days_trent_chart',
            show: true,
            valueType: 3
          },
          value:
            '{"Title":"endocrine","Data":[{"color":"","basevalue":"1377.00","time":1575675370000,"value":"587.28"},{"color":"","basevalue":"1377.00","time":1575753312000,"value":"4424.33"},{"color":"","basevalue":"1377.00","time":1575844720000,"value":"5759.02"},{"color":"","basevalue":"1377.00","time":1575934079000,"value":"1782.31"},{"color":"","basevalue":"1377.00","time":1576019634000,"value":"4519.77"},{"color":"","basevalue":"1377.00","time":1576100491000,"value":"2046.39"},{"color":"","basevalue":"1377.00","time":1576194149000,"value":"1983.82"},{"color":"","basevalue":"1377.00","time":1576279180000,"value":"298.13"},{"color":"","basevalue":"1377.00","time":1576358269000,"value":"1363.13"},{"color":"","basevalue":"1377.00","time":1576452733000,"value":"8168.09"},{"color":"","basevalue":"1377.00","time":1576538016000,"value":"495.93"},{"color":"","basevalue":"1377.00","time":1576624979000,"value":"2733.78"},{"color":"","basevalue":"1377.00","time":1576710880000,"value":"1075.74"},{"color":"","basevalue":"1377.00","time":1576797872000,"value":"397.24"},{"color":"","basevalue":"1377.00","time":1576889328000,"value":"1788.14"},{"color":"","basevalue":"1377.00","time":1576980599000,"value":"397.85"},{"color":"","basevalue":"1377.00","time":1577060438000,"value":"460.90"},{"color":"","basevalue":"1377.00","time":1577126479000,"value":"890.47"},{"color":"","basevalue":"1377.00","time":1577228273000,"value":"2122.89"},{"color":"","basevalue":"1377.00","time":1577301723000,"value":"1595.83"},{"color":"","basevalue":"1377.00","time":1577477460000,"value":"243.16"},{"color":"","basevalue":"1377.00","time":1577565811000,"value":"1023.51"},{"color":"","basevalue":"1377.00","time":1577653503000,"value":"1322.67"},{"color":"","basevalue":"1377.00","time":1577749566000,"value":"944.67"},{"color":"","basevalue":"1377.00","time":1577841377000,"value":"456.43"},{"color":"","basevalue":"1377.00","time":1577922500000,"value":"1135.48"},{"color":"","basevalue":"1377.00","time":1578007484000,"value":"1475.57"},{"color":"","basevalue":"1377.00","time":1578100721000,"value":"5891.66"},{"color":"","basevalue":"1377.00","time":1578269495000,"value":"922.73"}],"Warns":{"red":{"min":8000,"max":99999},"green":{"min":1000,"max":3000},"yellow":{"min":3000,"max":7999}},"ChartTypeId":2101}'
        },
        {
          healthResultAttr: {
            alias: '心率减速力DC（猝死风险指数）多天回溯曲线图数据',
            id: 71,
            name: 'dc_days_trent_chart',
            show: true,
            valueType: 3
          },
          value:
            '{"Title":"dc","Data":[{"color":"green","basevalue":"7.00","time":1577749566000,"value":"7.63"},{"color":"green","basevalue":"7.00","time":1577841377000,"value":"7.62"},{"color":"green","basevalue":"7.00","time":1577922500000,"value":"7.79"},{"color":"green","basevalue":"7.00","time":1578007484000,"value":"6.57"},{"color":"green","basevalue":"7.00","time":1578100721000,"value":"6.79"},{"color":"green","basevalue":"7.00","time":1578269495000,"value":"7.11"}],"Warns":{"red":{"min":8000,"max":99999},"green":{"min":1000,"max":3000},"yellow":{"min":3000,"max":7999}},"ChartTypeId":2100}'
        },
        {
          healthResultAttr: {
            alias: '心脑血管事件指数SDNN（心律失常指数）多天回溯曲线图数据',
            id: 72,
            name: 'sdnn_days_trent_chart',
            show: true,
            valueType: 3
          },
          value:
            '{"Title":"SDNN","Data":[{"color":"green","basevalue":"97.00","time":1577749566000,"value":"116.00"},{"color":"green","basevalue":"97.00","time":1577841377000,"value":"149.00"},{"color":"green","basevalue":"97.00","time":1577922500000,"value":"94.00"},{"color":"green","basevalue":"97.00","time":1578007484000,"value":"131.00"},{"color":"green","basevalue":"97.00","time":1578100721000,"value":"168.00"},{"color":"green","basevalue":"97.00","time":1578269495000,"value":"152.00"}],"Warns":{"red":{"min":8000,"max":99999},"green":{"min":1000,"max":3000},"yellow":{"min":3000,"max":7999}},"ChartTypeId":2097}'
        },
        {
          healthResultAttr: {
            alias: '血管舒缩指数(vlf)多天回溯曲线图数据',
            id: 73,
            name: 'temperature_days_trent_chart',
            show: true,
            valueType: 3
          },
          value:
            '{"Title":"temperature","Data":[{"color":"","basevalue":"1769.00","time":1577749566000,"value":"761.25"},{"color":"","basevalue":"1769.00","time":1577841377000,"value":"809.94"},{"color":"","basevalue":"1769.00","time":1577922500000,"value":"1041.38"},{"color":"","basevalue":"1769.00","time":1578007484000,"value":"994.08"},{"color":"","basevalue":"1769.00","time":1578100721000,"value":"1007.91"},{"color":"","basevalue":"1769.00","time":1578269495000,"value":"1246.47"}],"Warns":{"red":{"min":8000,"max":99999},"green":{"min":1000,"max":3000},"yellow":{"min":3000,"max":7999}},"ChartTypeId":2098}'
        }
      ],
      createAt: 1578269495000,
      deepDuration: 5568,
      enterSleepDuration: 23386,
      generateAt: 1578271594000,
      id: '5e12adebe23432e6d6157d02',
      leaveBedAt: 1578269495000,
      leaveBedDuration: 105,
      machineCode: 'f0051ceac710',
      meanBreathRate: 15,
      meanHeartRate: 60,
      meanTurnOverDuration: 6,
      nr2Duration: 0,
      nrDuration: 13071,
      onBedAt: 1578229721000,
      remDuration: 2830,
      score: 71,
      sleepCycleCount: 4,
      sleepEndAt: 1578263395000,
      sleepModel: '树懒型:早睡晚起',
      sleepStage: [
        {
          endAt: 1578240009000,
          id: 148816,
          resultId: 4466,
          stage: 0,
          startAt: 1578229721000
        },
        {
          endAt: 1578240009000,
          id: 148817,
          resultId: 4466,
          stage: 2,
          startAt: 1578240010000
        },
        {
          endAt: 1578240465000,
          id: 148818,
          resultId: 4466,
          stage: 1,
          startAt: 1578240202000
        },
        {
          endAt: 1578240657000,
          id: 148819,
          resultId: 4466,
          stage: 3,
          startAt: 1578240466000
        },
        {
          endAt: 1578241041000,
          id: 148820,
          resultId: 4466,
          stage: 1,
          startAt: 1578240658000
        },
        {
          endAt: 1578241425000,
          id: 148821,
          resultId: 4466,
          stage: 2,
          startAt: 1578241042000
        },
        {
          endAt: 1578241809000,
          id: 148822,
          resultId: 4466,
          stage: 1,
          startAt: 1578241426000
        },
        {
          endAt: 1578242193000,
          id: 148823,
          resultId: 4466,
          stage: 2,
          startAt: 1578241810000
        },
        {
          endAt: 1578242769000,
          id: 148824,
          resultId: 4466,
          stage: 1,
          startAt: 1578242194000
        },
        {
          endAt: 1578243537000,
          id: 148825,
          resultId: 4466,
          stage: 3,
          startAt: 1578242770000
        },
        {
          endAt: 1578244305000,
          id: 148826,
          resultId: 4466,
          stage: 1,
          startAt: 1578243538000
        },
        {
          endAt: 1578244689000,
          id: 148827,
          resultId: 4466,
          stage: 2,
          startAt: 1578244306000
        },
        {
          endAt: 1578245457000,
          id: 148828,
          resultId: 4466,
          stage: 1,
          startAt: 1578244690000
        },
        {
          endAt: 1578246009000,
          id: 148829,
          resultId: 4466,
          stage: 2,
          startAt: 1578245458000
        },
        {
          endAt: 1578246909000,
          id: 148830,
          resultId: 4466,
          stage: 5,
          startAt: 1578246010000
        },
        {
          endAt: 1578246933000,
          id: 148831,
          resultId: 4466,
          stage: 2,
          startAt: 1578246910000
        },
        {
          endAt: 1578247125000,
          id: 148832,
          resultId: 4466,
          stage: 1,
          startAt: 1578246934000
        },
        {
          endAt: 1578247317000,
          id: 148833,
          resultId: 4466,
          stage: 2,
          startAt: 1578247126000
        },
        {
          endAt: 1578248277000,
          id: 148834,
          resultId: 4466,
          stage: 1,
          startAt: 1578247318000
        },
        {
          endAt: 1578248469000,
          id: 148835,
          resultId: 4466,
          stage: 2,
          startAt: 1578248278000
        },
        {
          endAt: 1578248853000,
          id: 148836,
          resultId: 4466,
          stage: 1,
          startAt: 1578248470000
        },
        {
          endAt: 1578249429000,
          id: 148837,
          resultId: 4466,
          stage: 2,
          startAt: 1578248854000
        },
        {
          endAt: 1578249621000,
          id: 148838,
          resultId: 4466,
          stage: 1,
          startAt: 1578249430000
        },
        {
          endAt: 1578250389000,
          id: 148839,
          resultId: 4466,
          stage: 2,
          startAt: 1578249622000
        },
        {
          endAt: 1578250773000,
          id: 148840,
          resultId: 4466,
          stage: 1,
          startAt: 1578250390000
        },
        {
          endAt: 1578251349000,
          id: 148841,
          resultId: 4466,
          stage: 2,
          startAt: 1578250774000
        },
        {
          endAt: 1578251541000,
          id: 148842,
          resultId: 4466,
          stage: 1,
          startAt: 1578251350000
        },
        {
          endAt: 1578251733000,
          id: 148843,
          resultId: 4466,
          stage: 2,
          startAt: 1578251542000
        },
        {
          endAt: 1578252309000,
          id: 148844,
          resultId: 4466,
          stage: 1,
          startAt: 1578251734000
        },
        {
          endAt: 1578252501000,
          id: 148845,
          resultId: 4466,
          stage: 2,
          startAt: 1578252310000
        },
        {
          endAt: 1578252693000,
          id: 148846,
          resultId: 4466,
          stage: 1,
          startAt: 1578252502000
        },
        {
          endAt: 1578253077000,
          id: 148847,
          resultId: 4466,
          stage: 3,
          startAt: 1578252694000
        },
        {
          endAt: 1578253269000,
          id: 148848,
          resultId: 4466,
          stage: 2,
          startAt: 1578253078000
        },
        {
          endAt: 1578253461000,
          id: 148849,
          resultId: 4466,
          stage: 3,
          startAt: 1578253270000
        },
        {
          endAt: 1578253509000,
          id: 148850,
          resultId: 4466,
          stage: 1,
          startAt: 1578253462000
        },
        {
          endAt: 1578254177000,
          id: 148851,
          resultId: 4466,
          stage: 5,
          startAt: 1578253510000
        },
        {
          endAt: 1578254283000,
          id: 148852,
          resultId: 4466,
          stage: 6,
          startAt: 1578254178000
        },
        {
          endAt: 1578256094000,
          id: 148853,
          resultId: 4466,
          stage: 0,
          startAt: 1578254284000
        },
        {
          endAt: 1578256456000,
          id: 148854,
          resultId: 4466,
          stage: 5,
          startAt: 1578256095000
        },
        {
          endAt: 1578256600000,
          id: 148855,
          resultId: 4466,
          stage: 1,
          startAt: 1578256457000
        },
        {
          endAt: 1578256960000,
          id: 148856,
          resultId: 4466,
          stage: 3,
          startAt: 1578256601000
        },
        {
          endAt: 1578257344000,
          id: 148857,
          resultId: 4466,
          stage: 1,
          startAt: 1578256961000
        },
        {
          endAt: 1578257536000,
          id: 148858,
          resultId: 4466,
          stage: 3,
          startAt: 1578257345000
        },
        {
          endAt: 1578257920000,
          id: 148859,
          resultId: 4466,
          stage: 1,
          startAt: 1578257537000
        },
        {
          endAt: 1578258112000,
          id: 148860,
          resultId: 4466,
          stage: 3,
          startAt: 1578257921000
        },
        {
          endAt: 1578258496000,
          id: 148861,
          resultId: 4466,
          stage: 1,
          startAt: 1578258113000
        },
        {
          endAt: 1578258688000,
          id: 148862,
          resultId: 4466,
          stage: 2,
          startAt: 1578258497000
        },
        {
          endAt: 1578259456000,
          id: 148863,
          resultId: 4466,
          stage: 1,
          startAt: 1578258689000
        },
        {
          endAt: 1578259648000,
          id: 148864,
          resultId: 4466,
          stage: 2,
          startAt: 1578259457000
        },
        {
          endAt: 1578260224000,
          id: 148865,
          resultId: 4466,
          stage: 1,
          startAt: 1578259649000
        },
        {
          endAt: 1578260416000,
          id: 148866,
          resultId: 4466,
          stage: 3,
          startAt: 1578260225000
        },
        {
          endAt: 1578260608000,
          id: 148867,
          resultId: 4466,
          stage: 1,
          startAt: 1578260417000
        },
        {
          endAt: 1578260709000,
          id: 148868,
          resultId: 4466,
          stage: 3,
          startAt: 1578260609000
        },
        {
          endAt: 1578261609000,
          id: 148869,
          resultId: 4466,
          stage: 5,
          startAt: 1578260710000
        },
        {
          endAt: 1578261700000,
          id: 148870,
          resultId: 4466,
          stage: 3,
          startAt: 1578261610000
        },
        {
          endAt: 1578262084000,
          id: 148871,
          resultId: 4466,
          stage: 2,
          startAt: 1578261701000
        },
        {
          endAt: 1578262972000,
          id: 148872,
          resultId: 4466,
          stage: 1,
          startAt: 1578262085000
        },
        {
          endAt: 1578263284000,
          id: 148873,
          resultId: 4466,
          stage: 3,
          startAt: 1578262973000
        },
        {
          endAt: 1578263395000,
          id: 148874,
          resultId: 4466,
          stage: 1,
          startAt: 1578263285000
        },
        {
          endAt: 1578265152000,
          id: 148875,
          resultId: 4466,
          stage: 0,
          startAt: 1578263396000
        },
        {
          endAt: 1578266090000,
          id: 148876,
          resultId: 4466,
          stage: 6,
          startAt: 1578265153000
        },
        {
          endAt: 1578266352000,
          id: 148877,
          resultId: 4466,
          stage: 0,
          startAt: 1578266091000
        },
        {
          endAt: 1578267186000,
          id: 148878,
          resultId: 4466,
          stage: 6,
          startAt: 1578266353000
        },
        {
          endAt: 1578267367000,
          id: 148879,
          resultId: 4466,
          stage: 0,
          startAt: 1578267187000
        },
        {
          endAt: 1578267714000,
          id: 148880,
          resultId: 4466,
          stage: 6,
          startAt: 1578267368000
        },
        {
          endAt: 1578268458000,
          id: 148881,
          resultId: 4466,
          stage: 0,
          startAt: 1578267715000
        },
        {
          endAt: 1578268781000,
          id: 148882,
          resultId: 4466,
          stage: 6,
          startAt: 1578268459000
        },
        {
          endAt: 1578269495000,
          id: 148883,
          resultId: 4466,
          stage: 0,
          startAt: 1578268782000
        }
      ],
      sleepStartAt: 1578240009000,
      sleepStatus: '中等',
      sleepTip:
        '1.睡前太饿或太饱都会影响睡眠。不要在即将睡觉时吃太多的东西，因为消化过程会容易醒过来。如果吃得太饱后躺在床上，会出现反胃的现象，胃酸会反到食道中，睡眠中会出现气闷，或呼吸困难情况。如果很饿，可以吃一些富含碳水化合物的零食，它们可以帮助人体释放出一些化学物质复合胺，可以让身体松弛下来更快入睡。\n2.建议睡前不要在床上打毛衣、读书、吃东西、看电视等。如果你只把床和睡觉联系起来，让大脑形成条件反射，躺在床上时就会更容易入睡。\n3.洗个热水澡：在睡觉前一到两个小时洗个热水澡。洗完之后，体温会逐渐降低，这会使人感到疲劳。但是不要在临睡前洗澡，因为这会使你兴奋，难以入睡。',
      sleepType: '标准型睡眠',
      status: true,
      template: 'CARING_FOR_WOMEN',
      turnOver: 581,
      wakeDuration: 1810
    }
  }
}
*/
