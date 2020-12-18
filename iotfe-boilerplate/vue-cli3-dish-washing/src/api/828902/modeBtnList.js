/* eslint-disable no-multi-spaces */
import intelligentWash from '../../assets/828902/Mod/intelligent_wash.png'; // 智能洗
import strongWash from '../../assets/828902/Mod/strong_wash.png'; // 强净洗
import energySavingWashing from '../../assets/828902/Mod/energy_saving_washing.png'; // 节能洗
import quickWash from '../../assets/828902/Mod/quick_wash.png'; // 快速洗
import glassWash from '../../assets/828902/Mod/glass_wash.png'; // 玻璃洗
import sterilization from '../../assets/828902/Mod/sterilization.png'; // 除菌洗
import selfCleaning from '../../assets/828902/Mod/self_cleaning.png'; // 自清洁
import mildDrying from '../../assets/828902/Mod/mild_drying.png'; // 单轻度烘干
import standardDrying from '../../assets/828902/Mod/standard_drying.png'; // 单标准烘干
import enhancedDrying from '../../assets/828902/Mod/enhanced_drying.png'; // 单加强烘干
import purifier from '../../assets/828902/Mod/purifier.png'; // 单保洁

const _modeBtnList = [
  {
    name: '智能洗',
    command: { Mod: 1 },
    modType: 0,
    normalTime: '1:35-2:41,2:11',
    layerTime: '1:35-2:41,2:11',
    mildDryingTime: '2:01-3:07,2:37',
    dryingTime: '2:05-3:11,2:41',
    enhancedDryingTime: '2:07-3:13,2:43',
    LMDTime: '2:01-3:07,2:37', // 分层 + 轻度烘干
    LDTime: '2:05-3:11,2:41', // 分层 + 标准烘干
    LEDTime: '2:07-3:13,2:43', // 分层 + 加强烘干
    normalIconSrc: intelligentWash
  },
  {
    name: '强净洗',
    command: { Mod: 2 },
    modType: 0,
    normalTime: '2:17',
    layerTime: '2:02',
    mildDryingTime: '2:43',
    dryingTime: '2:49',
    enhancedDryingTime: '2:49',
    LMDTime: '2:28',
    LDTime: '2:34',
    LEDTime: '2:34',
    normalIconSrc: strongWash
  },
  {
    name: '节能洗',
    command: { Mod: 3 },
    modType: 0,
    normalTime: '3:19',
    layerTime: '2:49',
    mildDryingTime: '3:28',
    dryingTime: '3:28',
    enhancedDryingTime: '3:34',
    LMDTime: '2:58',
    LDTime: '2:58',
    LEDTime: '3:04',
    normalIconSrc: energySavingWashing
  },
  {
    name: '快速洗',
    command: { Mod: 4 },
    modType: 0,
    normalTime: '0:29',
    layerTime: '0:00',
    mildDryingTime: '1:28',
    dryingTime: '1:28',
    enhancedDryingTime: '1:34',
    LMDTime: undefined,
    LDTime: undefined,
    LEDTime: undefined,
    normalIconSrc: quickWash
  },
  {
    name: '玻璃洗',
    command: { Mod: 5 },
    modType: 0,
    normalTime: '1:37',
    layerTime: '1:32',
    mildDryingTime: '2:06',
    dryingTime: '2:06',
    enhancedDryingTime: 0,
    LMDTime: '2:01',
    LDTime: '2:01',
    LEDTime: undefined,
    normalIconSrc: glassWash
  },
  {
    name: '除菌洗',
    command: { Mod: 6 },
    modType: 0,
    normalTime: '1:50',
    layerTime: '1:43',
    mildDryingTime: '2:13',
    dryingTime: '2:19',
    enhancedDryingTime: '2:19',
    LMDTime: '2:06',
    LDTime: '2:12',
    LEDTime: '2:12',
    normalIconSrc: sterilization
  },
  {
    name: '自清洁',
    command: { Mod: 7 },
    modType: 0,
    normalTime: '1:18',
    layerTime: '0',
    mildDryingTime: '1:58',
    dryingTime: '2:02',
    enhancedDryingTime: '2:04',
    LMDTime: undefined,
    LDTime: undefined,
    LEDTime: undefined,
    normalIconSrc: selfCleaning
  },
  {
    name: '轻度烘干',
    command: { Mod: 0, Dry: 1, Purifier: 0, PurifierTime: 0 },
    modType: 1,
    mildDryingTime: '2:00',
    layerTime: undefined,
    normalIconSrc: mildDrying
  },
  {
    name: '标准烘干',
    command: { Mod: 0, Dry: 2, Purifier: 0, PurifierTime: 0 },
    modType: 1,
    dryingTime: '2:30',
    layerTime: undefined,
    normalIconSrc: standardDrying
  },
  {
    name: '加强烘干',
    command: { Mod: 0, Dry: 3, Purifier: 0, PurifierTime: 0 },
    modType: 1,
    enhancedDryingTime: '3:00',
    layerTime: undefined,
    normalIconSrc: enhancedDrying
  },
  {
    name: '单保洁',
    command: { Mod: 0, Dry: 0 },
    modType: 2,
    normalTime: '0',
    layerTime: undefined,
    normalIconSrc: purifier
  }
];

const ModeBtnList = [];

_modeBtnList.forEach((ele, index) => {
  const modeBtn = ele;
  modeBtn.id = index;
  ModeBtnList.push(modeBtn);
});

export default ModeBtnList;
