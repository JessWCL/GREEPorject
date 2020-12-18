import zhCNLang from '../../i18n/zh_CN';
import enLang from '../../i18n/en';
import { getInfo, sendDataToDevice, updateStates, changeBarColor, finishLoad } from '../../../../static/lib/PluginInterface.promise';
import { MID, funBtnList, modeBtnList, menuBtnList, errorObjects } from '../../api/index';
import { formatPurifierTime, useDefaultValue, parseDataObject, sleep } from '../../utils/index';
import {
  BTN_TYPE,
  FUN_BTNS,
  ERROR_CODE,
  MODE_BTNS,
  MOD_ID,
  MOD_NONE,
  BTN_TYPE_INDEX,
  BTN_LAYERWASH_TYPE,
  DW_MID_828B00,
  DW_MID_828901,
  WORK_STATUS,
  BarColor,
} from '../../api/constants';

const { ErrObj1, ErrObj2, ErrObj3 } = errorObjects;

// init state
const state = {
  isDebug: false, // 是否为debug模式
  isNotifyDebug: false, // 是否为notify debug模式

  MID,
  mac: null, // url mac
  data: null, // url data
  path: null, // 插件所在地方
  functype: 0, // 0代表正常，1代表集中控制
  fullstatueJson: null, // 查询字段
  deviceState: 2, // 设备状态 0近程发现设备 1远程发现设备 2近程在线 3远程在线 -1掉线
  deviceName: 'DeviceName', // i18n
  workStatusName: null, // 工作状态
  workStatusImgSrc: null, // 工作状态图片
  workStatusImgBG: null, // 工作状态背景图
  carouselId: 0, // 滑轮ID
  errItemList: [], // 故障信息列表
  warningItemList: [], // 故障信息列表
  timer: null, // 定时器
  msTimer: 10000, // 定时器查询时间间隔
  allowableTimer: true, // 是否允许定时器

  funBtnList,
  modeBtnList,
  menuBtnList,
  FUN_BTNS,
  btnListObj: {
    type: null, // 按钮类型
    btnList: [] // 按钮组
  },
  isShowPop: false, // 是否显示弹出框
  isShowWaringTipsDetails: false, // 是否显示提示信息
  isWorking: false, // 是否工作中
  isFirstParseData: true, // 是否第一解析Data
  isPurifierAppointment: false, // 是否保洁预约

  LayerWashCache: 0, // 交互体验缓存
  DisinfectCache: 0, // 交互体验缓存
  DryCache: 0, // 交互体验缓存
  barColor: '#ffffff',

  // notify.html
  isNotify: false,
  ext: null,
  code: null,
  evt: null,
  t: null,
  mid: null,
  // notify.html

  DataObject: {
    Pow: 1, // 开关 0=关机，1=开机
    Wash: 0, // 洗涤 0=未开启洗涤，1=开启洗涤
    WashDone: 0, // 洗涤未结束，1=洗涤结束
    WorkStatus: 0, // 1=进水中，2=洗涤中，3=洗涤加热中，4=排水中，5=干燥中，6=保洁中，其他保留
    PauseStart: 0, // 暂停/启动 0=暂停，1=启动
    Mod: 0, // 模式 0=空模式，1=智能洗，2=强力洗，3=节能洗，4=快速洗，5=玻璃洗，6=自清洁，7=除菌洗
    LayerWash: 0, // 分层洗  0=上下层循环洗，1=上层洗，2=下层洗，3=预留
    Dry: 0, // 加强烘干 0=不开启，1=开启
    Hard: 0, // 水硬度参数 水硬度参数 0~7
    StHard: 0, // 水硬度设置 0=无设置，1=开启设置
    RmTmrHour: 0, // 洗涤剩余时间小时位
    RmTmrMin: 0, // 洗涤剩余时间分钟位
    TmrOff: 0, // 定时关 0=空，1=定时关机
    TmrOn: 0, // 定时开 0=空，1=定时执行
    estate1: 0, // 故障代码
    estate2: 0, // 故障代码
    TmrStatus: 0, // 定时状态 0=定时关闭 1=定时开启
    TmrHour: 0, // 定时小时
    TmrMin: 0, // 定时分钟
    StTmr: 0, // 定时时间 定时执行剩余分钟数
    Purifier: 0, // 保洁 0=定时关闭 1=定时开启
    PurifierTime: 1, // 保洁时间 1=6h, 2=12h, 3=18h, 4=24h, 5=48h, 6=72h, 7=96h
    Disinfect: 0, // 消毒 0=关闭 1=开启
    JFerr: 0, // WiFi故障
    MidType: 256, // 设备细分码 256=派生精英小台式
  }
};

// getters
const getters = {
  ModeTime: state => {
    const modeBtnList = state.modeBtnList;
    let ret = modeBtnList[0].modeTime;
    let _btn = modeBtnList[0];
    state.modeBtnList.forEach(ele => {
      if (ele.isActive === true) {
        _btn = ele;
      }
    });

    const { MidType } = state.DataObject;
    const { Dry, LayerWash, Disinfect } = state.DataObject;

    const { Mod, modeDryLayerTime, modeLayerWashTime } = _btn;
    let { modeTime, modeDryTime, modeDisinfectTime, modeDryDisinfectTime } = _btn;

    if (MidType !== 0 && Mod === 2) {
      modeTime = 125; // 模式工作时间
      modeDryTime = 152; // 附加烘干时间
      modeDisinfectTime = 144; // 消毒时间
      modeDryDisinfectTime = 171; // (附加烘干 && 消毒) 时间
    }

    ret = modeTime;
    try {
      // 先判断 是否为保洁功能
      // if (Purifier === 1) {
      //   const _vModeTime = formatPurifierTime(PurifierTime, modeTime);
      //   ret = _vModeTime || modeTime; // 默认工作时间
      //   ret = modeTime;

      // 是否分层洗
      const isHaveLayerWash = LayerWash === 1 || LayerWash === 2;

      // （上层/下层 & 附加烘干）
      if (isHaveLayerWash && Dry === 1) {
        if (modeDryLayerTime !== -1) ret = modeDryLayerTime;

        // （消毒 & 附加烘干）
      } else if (Disinfect === 1 && Dry === 1) {
        if (modeDryDisinfectTime !== -1) ret = modeDryDisinfectTime;

        // 是否消毒
      } else if (Disinfect === 1) {
        if (modeDisinfectTime !== -1) ret = modeDisinfectTime;

        // 是否分层洗
      } else if (isHaveLayerWash) {
        if (modeLayerWashTime !== -1) ret = modeLayerWashTime;

        // 附加烘干功能
      } else if (Dry === 1) {
        if (modeDryTime !== -1) ret = modeDryTime;

        // 模式时间
      } else {
        ret = modeTime;
      }
    } catch (error) {
      console.error('==== getters ModeTime ====', error); // eslint-disable-line
    }
    if (isNaN(ret)) {
      console.warn('==== ModeTime is NaN ====');
      ret = modeTime;
    }
    return ret;
  }
};

// actions
const actions = {

  async initApp({ state, commit, dispatch }) {
    const { isDebug, functype, data, isNotify, ext, isNotifyDebug } = state;
    // 解析url初始值
    commit('getMac');
    commit('getFunctype');
    commit('getExt');
    if (isDebug) {
      commit('setTestData');
      commit('parseData', data);
      commit('updateUIForErrorCode');
      dispatch('handleFunBtnAndForbidden');
      commit('setActiveModeBtnByMod');
      commit('parseWorkState');
      dispatch('setCarouselIdByMode');
    }

    // notify.html
    if (isNotifyDebug) {
      // eslint-disable-next-line no-console
      console.log('==== test notify.html ====');
      commit('setTestNotiyfyData');
    }
    if (ext !== null && ext !== '') {
      // eslint-disable-next-line no-console
      console.log('==== notify.html ====');
      commit('setNotefy', true);
      commit('parseNotifyStates');
      commit('updateUIForError');
      this.$router.push('/notify');
      finishLoad();
    }
    // 场景
    if (functype === 1) {
      dispatch('getInfoAndUpdateDeviceInfo');
      commit('parseData', data);
      commit('updateUIForErrorCode');
      dispatch('handleFunBtnAndForbidden');
      commit('setActiveModeBtnByMod');
      commit('parseWorkState');
      dispatch('setCarouselIdByMode');
      dispatch('parseBarColor');
      dispatch('initStatesByDevice'); // 数据初始化
    }
    // 生产环境
    if (!isDebug && !functype && !isNotify) {
      dispatch('getInfoAndUpdateDeviceInfo');
      commit('getData');
      const { data } = state;
      commit('parseData', data);
      commit('updateUIForErrorCode');
      dispatch('handleFunBtnAndForbidden');
      commit('setActiveModeBtnByMod');
      commit('parseWorkState');
      dispatch('setCarouselIdByMode');
      dispatch('parseBarColor');
      dispatch('initStatesByDevice'); // 数据初始化
      dispatch('timerGetStates'); // 数据定时刷新
    }
  },

  async getDeviceInfo({ state }) {
    const mac = state.mac;
    const deviceInfo = await getInfo(mac);
    return deviceInfo;
  },

  /**
   * @description 发送控制指令
   * @function SEND_CTRL
   * @param commit vuex同步分发
   * @param state vuex store 状态
   * @param DataObject state中存储config.xml字段数据的对象
   */
  async sendControl({ state }, DataObject) {
    const keys = Object.keys(DataObject);
    const opt = [];
    const p = [];
    keys.forEach(key => {
      opt.push(key);
      p.push(DataObject[key]);
    });
    const mac = state.mac;
    const t = 'cmd';
    const json = JSON.stringify({ t, opt, p });
    // 调用原生方法发送控制命令
    if (!state.isScene) {
      console.log('json:', json); // eslint-disable-line
      // navigator.PluginInterface.showToast(json, 0); // 不作toast提示
      const res = await sendDataToDevice(mac, json, false)
        .then(res => res)
        .catch(err => err);
      const result = JSON.parse(res);
      const { r } = result;
      // 成功之后更新主体状态
      if (r === 200) {
        const _p = [];
        Object.keys(state.DataObject).forEach(key => {
          const isPush = key !== 'StTmr' || key !== 'Purifier' || key !== 'PurifierTime' || key !== 'Disinfect';
          if (isPush) {
            _p.push(state.DataObject[key]);
          }
        });
        await updateStates(mac, JSON.stringify(_p))
          .then(res => res)
          .catch(err => err);
      }
    }
  },
  // handle Fun
  handleFun({ dispatch }, payload) {
    dispatch(payload.funName);
  },
  // handleFunAction
  handleFunAction({ commit, dispatch}) {
    commit('setBtnList', { type: BTN_TYPE.BTN_FUNCTION, btnList: funBtnList });
    commit('togglePop');
    dispatch('parseBarColor');
  },
  // handleModelAction
  handleModelAction({ commit, dispatch }) {
    commit('setBtnList', { type: BTN_TYPE.BTN_MODEL, btnList: modeBtnList });
    commit('togglePop');
    dispatch('parseBarColor');
  },
  // toggle Pop
  togglePop({ commit, dispatch }) {
    commit('togglePop');
    dispatch('parseBarColor');
  },
  // 处理点击事件
  handleClickBtn(context, payload) {
    console.log(context, payload); // eslint-disable-line
    const { id } = payload;
    const btn = state.btnListObj.btnList[id];
    context.dispatch(btn.handleFunName, { btn, id }); // 分发按钮事件
  },
  // 保洁处理点击事件
  handleClickPurifierBtn(context, payload) {
    console.log(context, payload); // eslint-disable-line
    const { state, dispatch } = context;
    context.commit('setBtnList', { type: BTN_TYPE.BTN_FUNCTION, btnList: funBtnList });
    const { id } = payload;
    const btn = state.btnListObj.btnList[id];
    context.dispatch(btn.handleFunName, { btn, id }); // 分发按钮事件
    const { Purifier, PurifierTime } = state.DataObject;
    dispatch('sendControl', { Purifier, PurifierTime });
  },
  // 处理按钮更多点击事件
  handleMoreFun(context, payload) {
    const { funDescName, btn } = payload;
    context.dispatch(funDescName, btn); // 分发按钮事件
  },
  // 处理电源开事件
  handlePowOn({ commit, dispatch }) {
    commit('setPow', { value: 1 });
    dispatch('parseBarColor');
    if (!this.state.device.isDebug && !this.state.device.functype) {
      dispatch('timerAllowableTimer');
      const { Pow } = this.state.device.DataObject;
      dispatch('sendControl', { Pow });
    }
  },
  // 处理开关点击事件
  powerSwitchAction({ commit, dispatch }) {
    commit('setPow', { value: 0 });
    dispatch('parseBarColor');
    if (!this.state.device.isDebug && !this.state.device.functype) {
      dispatch('timerAllowableTimer');
      const { Pow } = this.state.device.DataObject;
      dispatch('sendControl', { Pow });
    }
  },
  getCCcmd({ state }) {
    console.log('集中控制，保存用户所选择的操作'); // eslint-disable-line
    const keys = Object.keys(state.DataObject);
    const opt = [];
    const p = [];
    keys.forEach(key => {
      opt.push(key);
      p.push(state.DataObject[key]);
    });
    const mac = state.mac;
    const t = 'cmd';
    const json = JSON.stringify({ t, opt, p });

    // 给主体返回模式的字段
    const modeBtns = this.state.device.modeBtnList;
    let arrIndex = 0;
    modeBtns.forEach((element, index) => {
      if (element.Mod === state.DataObject.Mod) {
        // 判断顺序ID相等
        arrIndex = index;
      }
    });

    let remarks = '';
    if (state.DataObject.Wash) {
      remarks += `模式${modeBtns[arrIndex].name}`;
      switch (state.DataObject.LayerWash) {
        case 0:
          remarks += ' 上下层循环洗';
          break;
        case 1:
          remarks += ' 上层洗';
          break;
        case 2:
          remarks += ' 下层洗';
          break;
        default:
          break;
      }
      if (state.DataObject.Dry) remarks += ' 加强烘干';
      if (state.DataObject.Purifier) remarks += ' 保洁开';
    }
    remarks += '...';
    console.log(remarks); // eslint-disable-line

    navigator.PluginInterface.getCCcmd(mac, json, remarks, p);
  },
  // 处理画布渲染
  handleRenderCanvas({ getters, state }, payload) {
    console.log('==== canvas ===='); // eslint-disable-line
    const { canvas } = payload;

    if (canvas === null) return;

    const ctx = canvas.getContext('2d');
    // const ctx = document.getElementById('canvas').getContext('2d');

    const blueColor = { startColor: '#2dd8f1', endColor: '#1184ef' }; // 蓝色
    const yellowColor = { startColor: '#ffda89', endColor: '#f79942' }; // 黄色
    const grayColor = { startColor: '#dedede', endColor: '#dedede' }; // 灰色

    let tickStartTime = new Date().getTime();
    let tickNowTime = new Date().getTime();

    const ONE_SECOND = 1000; // 一秒毫秒数

    const devicePixelRatio = window.devicePixelRatio || 1;

    const CANVAS_WIDTH = document.body.offsetWidth * devicePixelRatio;
    const CANVAS_HEIGHT = (CANVAS_WIDTH * 3) / 4;
    const ANGLE_STEP = 5;
    canvas.setAttribute('width', CANVAS_WIDTH);
    canvas.setAttribute('height', CANVAS_HEIGHT);
    canvas.style.height = `${CANVAS_HEIGHT / devicePixelRatio}px`;

    const originX = CANVAS_WIDTH / 2; // 圆心原点x
    const originY = CANVAS_HEIGHT / 2; // 圆心原点y
    const circleRadius = CANVAS_WIDTH / 3.2; // 圆形半径
    const gradientStartX = CANVAS_WIDTH / 2 - CANVAS_WIDTH / 7.5;
    const gradientEndX = CANVAS_WIDTH - CANVAS_WIDTH / 7.5;
    const rectHeight = 3 * devicePixelRatio; // 小方块高
    const rectWidth = 10 * devicePixelRatio; // 小方块宽

    const START_ANGLE = 145;
    const END_ANGLE = 400;

    let dynamicAngle = START_ANGLE;

    const animate = () => {
      requestAnimationFrame(animate);

      const { PauseStart, WorkStatus, Purifier, PurifierTime, WashDone } = state.DataObject;

      // 滑动色块
      if (PauseStart === 1) tick();

      // 保洁时间
      const _vModeTime = formatPurifierTime(PurifierTime);
      const isPurifying = WashDone === 0 && Purifier === 1 && WorkStatus === WORK_STATUS.PURIFYING;
      const MODE_WORK_TIME = isPurifying === true ? _vModeTime : getters.ModeTime;

      const WashTime = state.DataObject.RmTmrHour * 60 + state.DataObject.RmTmrMin;
      let finishPercent = (MODE_WORK_TIME - WashTime) / MODE_WORK_TIME;
      // 防止溢出
      if (finishPercent >= 100) {
        finishPercent = 100;
      } else if (finishPercent <= 0) {
        finishPercent = 0;
      }
      const middleLine = START_ANGLE + (END_ANGLE - START_ANGLE) * finishPercent;

      const modeBtnList = this.state.device.modeBtnList;
      let _btn = modeBtnList[0];
      modeBtnList.forEach(ele => {
        if (ele.isActive === true) {
          _btn = ele;
        }
      });

      let isBlueColor = false;
      let isYellowColor = false;
      // 防止为空
      isBlueColor = _btn.modeTheme === 'blue';
      isYellowColor = _btn.modeTheme === 'yellow'; // 单烘干模式 是黄色

      // console.log('==== canvas setInterval ====');
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      // 画圆
      for (let i = START_ANGLE; i < END_ANGLE; i += ANGLE_STEP) {
        const coordinate = getCoordinate(i);
        if (i < middleLine) {
          if (isBlueColor) {
            createRect(coordinate, i, blueColor); // 蓝色
          } else if (isYellowColor) {
            createRect(coordinate, i, yellowColor); // 黄色
          } else {
            createRect(coordinate, i, blueColor); // 蓝色
          }
        } else {
          createRect(coordinate, i, grayColor); // 灰色
        }
      }

      const dynamicAngleFirst = limitAngle(dynamicAngle - ANGLE_STEP * 2);
      const dynamicAngleSecond = limitAngle(dynamicAngle - ANGLE_STEP);
      const dynamicAngleThird = limitAngle(dynamicAngle);
      if (isBlueColor) {
        createRect(getCoordinate(dynamicAngleFirst), dynamicAngleFirst, blueColor);
        createRect(getCoordinate(dynamicAngleSecond), dynamicAngleSecond, blueColor);
        createRect(getCoordinate(dynamicAngleThird), dynamicAngleThird, blueColor);
      } else if (isYellowColor) {
        createRect(getCoordinate(dynamicAngleFirst), dynamicAngleFirst, yellowColor);
        createRect(getCoordinate(dynamicAngleSecond), dynamicAngleSecond, yellowColor);
        createRect(getCoordinate(dynamicAngleThird), dynamicAngleThird, yellowColor);
      }
    };
    animate();

    // eslint-disable-next-line
    function tick() {
      tickNowTime = new Date().getTime();
      if (tickNowTime - tickStartTime >= ONE_SECOND / 20) {
        tickStartTime = new Date().getTime();
        dynamicAngle += ANGLE_STEP;

        if (dynamicAngle >= END_ANGLE) dynamicAngle = START_ANGLE;
      }
    }

    function limitAngle(angle) {
      let ret = angle;
      if (angle >= END_ANGLE) {
        ret = END_ANGLE;
      } else if (angle <= START_ANGLE) {
        ret = START_ANGLE;
      }
      return ret;
    }

    function getCoordinate(angle) {
      const x = originX + circleRadius * Math.cos((angle * Math.PI) / 180);
      const y = originY + circleRadius * Math.sin((angle * Math.PI) / 180);
      return { x, y };
    }

    // 创建矩形
    function createRect(point, num, colors) {
      const { startColor, endColor } = colors;
      ctx.save();
      ctx.translate(point.x, point.y); // 将画布坐标系原点移至中心
      ctx.rotate((num * Math.PI) / 180); // 旋转角
      ctx.translate(-point.x, -point.y); // 修正画布坐标
      // 渐变
      const gradient = ctx.createLinearGradient(gradientStartX, 0, gradientEndX, 0);
      gradient.addColorStop(0, startColor);
      gradient.addColorStop(1, endColor);
      ctx.fillStyle = gradient;
      ctx.fillRect(point.x - rectWidth / 2, point.y - rectHeight / 2, rectWidth, rectHeight);
      ctx.fill();
      ctx.restore();
    }
  },
  // 取消点击开始
  handleClickStart(context) {
    const { state, getters, commit, dispatch } = context;

    // 单烘干 Mod: 0, Dry: 1, Disinfect: 0
    const isDryMod = MOD_NONE === Mod && Dry === 1 && Disinfect === 0;
    // 消毒 Mod: 0, Disinfect: 1, Dry: 0|1
    const isDisinfectMod = MOD_NONE === Mod && Disinfect === 1;
    if (isDryMod) {
      commit('setDry', { value: 1 });
      commit('setMod', { Mod: 0 });
      commit('setDisinfect', { value: 0 });
    } else if (isDisinfectMod) {
      commit('setDisinfect', { value: 1 });
      commit('setMod', { Mod: 0 });
      commit('setDry', { value: 0 });
    }

    commit('setPauseStart', { value: 1 });
    commit('setWash', { value: 1 });
    commit('setWorkStatus', 0);

    const { PauseStart, Wash, Mod, Dry, LayerWash, Purifier, PurifierTime, Disinfect } = state.DataObject;

    dispatch('timerAllowableTimer');
    if (state.MID === DW_MID_828B00 && Purifier) {
      dispatch('sendControl', { PauseStart, Wash, Mod, Dry, LayerWash, Purifier, PurifierTime });
    } else if (state.MID === DW_MID_828B00) {
      dispatch('sendControl', { PauseStart, Wash, Mod, Dry, LayerWash, Purifier });
    } else if (state.MID === DW_MID_828901) {
      dispatch('sendControl', { PauseStart, Wash, Mod, Dry, Disinfect });
    } else {
      dispatch('sendControl', { PauseStart, Wash, Mod, Dry, LayerWash, Purifier, PurifierTime, Disinfect });
    }

    // 洗涤剩余时间数
    const RmTmrHour = parseInt(getters.ModeTime / 60, 10);
    const RmTmrMin = parseInt(getters.ModeTime % 60, 10);
    commit('setRmTmrHour', RmTmrHour);
    commit('setRmTmrMin', RmTmrMin);
  },
  // 处理点击取消
  handleClickCancle({ state, commit, dispatch }) {
    commit('setPauseStart', { value: 0 });
    commit('setWash', { value: 0 });
    dispatch('timerAllowableTimer');
    const { PauseStart, Wash, Mod, Dry, Purifier, PurifierTime } = state.DataObject;
    dispatch('sendControl', { PauseStart, Wash, Mod, Dry, Purifier, PurifierTime });
  },
  // 处理暂停
  handleClickPause({ state, commit, dispatch }) {
    const value = state.DataObject.PauseStart === 0 ? 1 : 0;
    commit('setPauseStart', { value });
    dispatch('timerAllowableTimer');
    const { PauseStart, Wash } = state.DataObject;
    dispatch('sendControl', { PauseStart, Wash });
  },
  // 处理确认
  handleClickConfirm({ commit, dispatch }) {
    commit('setWashDone', 0);
    const { WashDone } = state.DataObject;
    dispatch('sendControl', { WashDone });
  },
  // 处理仪表盘取消预约事件
  handleDashBoardAppointmentCancel({ commit, dispatch }) {
    commit('setWash', { value: 0 });
    commit('setTmrOn', { value: 0 });
    // commit('setPauseStart', { value: 0 });
    commit('setTmrStatus', { value: 0 });
    dispatch('handleFunBtnAndForbidden');
    if (!this.state.device.isDebug) {
      dispatch('timerAllowableTimer');
      const { TmrOn, TmrStatus, Wash } = state.DataObject;
      dispatch('sendControl', { TmrOn, TmrStatus, Wash });
      // dispatch('sendControl', state.DataObject);
    }
  },
  // 处理预约取消事件
  handleAppointmentCancel({ commit, dispatch }) {
    commit('setPauseStart', { value: 0 });
    commit('setWash', { value: 0 });
    commit('setTmrOn', { value: 0 });
    commit('setTmrStatus', { value: 0 });
    commit('setStTmr', { value: 0 });
    if (!this.state.device.isDebug) {
      dispatch('timerAllowableTimer');
      dispatch('sendControl', state.DataObject);
    }
    vm.$router.push('/index'); // eslint-disable-line
  },
  // 处理预约开始事件
  handleAppointmentStart({ state, commit, dispatch }) {
    dispatch('handleFunBtnAndForbidden');
    commit('setPow', { value: 1 });
    commit('setWash', { value: 1 }); // 有没有预约 Wash 恒为 1

    // 判断是否有预约
    const isAppointment = state.DataObject.TmrHour > 0 || state.DataObject.TmrMin > 0;

    if (isAppointment) {
      console.log('=== 预约 ==='); // eslint-disable-line
      commit('setPauseStart', { value: 0 }); // 预约时 PauseStart = 0
      commit('setTmrOn', { value: 1 });
      commit('setTmrStatus', { value: 1 });
    } else {
      commit('setPauseStart', { value: 1 });
      commit('setTmrOn', { value: 0 });
      commit('setTmrStatus', { value: 0 });
    }
    dispatch('timerAllowableTimer');
    commit('parseFunBtnAndForbidden');

    // 单烘干 Mod: 0, Dry: 1
    if (state.DataObject.Mod === 0) {
      commit('setDry', { value: 1 });
    }

    //  ==== 判断是否有预约 ====

    if (state.MID === DW_MID_828B00) {
      if (isAppointment) {
        // 有预约
        const { Dry, Mod, Wash, PauseStart, TmrOn, TmrStatus, TmrHour, TmrMin, LayerWash, Purifier, PurifierTime } = state.DataObject; // eslint-disable-line
        dispatch('sendControl', { Dry, Mod, Wash, PauseStart, TmrOn, TmrStatus, TmrHour, TmrMin, LayerWash, Purifier, PurifierTime });
      } else {
        // 没预约
        const { Dry, Mod, Wash, PauseStart, LayerWash, Purifier, PurifierTime } = state.DataObject; // eslint-disable-line
        dispatch('sendControl', { Dry, Mod, Wash, PauseStart, LayerWash, Purifier, PurifierTime });
      }
    } else if (state.MID === DW_MID_828901) {
      if (isAppointment) {
        // 有预约
        const { Dry, Mod, Wash, PauseStart, TmrOn, TmrStatus, TmrHour, TmrMin, Disinfect } = state.DataObject; // eslint-disable-line
        dispatch('sendControl', { Dry, Mod, Wash, PauseStart, TmrOn, TmrStatus, TmrHour, TmrMin, Disinfect });
      } else {
        // 没预约
        const { Dry, Mod, Wash, PauseStart, Disinfect } = state.DataObject; // eslint-disable-line
        dispatch('sendControl', { Dry, Mod, Wash, PauseStart, Disinfect });
      }
    }
    vm.$router.push('/index'); // eslint-disable-line
  },
  // 处理预约上下层洗事件
  handleAppointmentLayerWash({ dispatch }, payload) {
    const { value, isForbided } = payload;
    if (!isForbided) {
      dispatch('toggleLayerWash', { value });
    } else {
      console.warn('==== btn is forbidden ===='); // eslint-disable-line
    }
  },
  // 处理预约热风烘干事件
  handleAppointmentSetDry({ commit }, payload) {
    const { value, isForbided } = payload;
    if (!isForbided) {
      commit('setDry', { value });
    } else {
      console.warn('==== btn is forbidden ===='); // eslint-disable-line
    }
  },
  // 处理预约保洁事件
  handleAppointmentSetPurifier({ commit }, payload) {
    const { value, isForbided } = payload;
    if (!isForbided) {
      commit('setPurifier', { value });
      commit('setBtnActive', { id: FUN_BTNS.PURIFIER });
      commit('setTextActiveIcon', { id: FUN_BTNS.PURIFIER });
    } else {
      // commit('setBtnActive', { id: FUN_BTNS.PURIFIER });
      console.warn('==== btn is forbidden ===='); // eslint-disable-line
    }
  },
  timerAllowableTimer({ commit }) {
    // 不允许定时器查询
    commit('setAllowableTime', { value: false });
    setTimeout(() => {
      commit('setAllowableTime', { value: true });
    }, 1000);
  },
  // 处理模式点击事件
  handleModelBtnAction({ dispatch }, payload) {
    console.log('==== handleModelBtnAction ===='); // eslint-disable-line
    dispatch('setModeByRoot', payload, { root: true });
  },
  // 处理点击 上下 层洗事件
  handleBtnAllWashingAction({ commit }) {
    const value = BTN_LAYERWASH_TYPE.DEFAULT;
    commit('setLayerWashCache', { value });
    commit('setLayerWash', { value });
    commit('parseActiveFunLayerWashBtns');
    commit('parseFunBtnAndForbidden');
  },
  // 处理点击上层洗事件
  handleBtnUpperWashingAction({ commit }) {
    let value = BTN_LAYERWASH_TYPE.DEFAULT;
    if (this.state.device.funBtnList[FUN_BTNS.UP_WASH].isActive) {
      value = BTN_LAYERWASH_TYPE.DEFAULT;
    } else {
      value = BTN_LAYERWASH_TYPE.UP_WASH;
    }
    commit('setLayerWashCache', { value });
    commit('setLayerWash', { value });
    commit('parseActiveFunLayerWashBtns');
    commit('parseFunBtnAndForbidden');
  },
  // 处理点击下层洗事件
  handleBtnUnderLayerAction({ commit }) {
    let value = BTN_LAYERWASH_TYPE.DEFAULT;
    if (this.state.device.funBtnList[FUN_BTNS.DOWN_WASH].isActive) {
      value = BTN_LAYERWASH_TYPE.DEFAULT;
    } else {
      value = BTN_LAYERWASH_TYPE.DOWN_WASH;
    }
    commit('setLayerWashCache', { value });
    commit('setLayerWash', { value });
    commit('parseActiveFunLayerWashBtns');
    commit('parseFunBtnAndForbidden');
  },
  // 处理加强烘干点击事件
  handleBtnHotAirAction({ commit }, payload) {
    commit('setBtnActive', { id: payload.id });
    const value = state.funBtnList[FUN_BTNS.HOT_AIR_DRYING].isActive ? 1 : 0;
    commit('setDry', { value });

    const isTurnOn = value === 1;
    if (isTurnOn) {
      commit('setDryCache', { value });
    }
  },
  // handleSetStTmr
  handleSetStTmr({ commit }, payload) {
    commit('setStTmr', { value: payload.value });
  },
  // toggle LayerWash
  toggleLayerWash({ commit }, payload) {
    commit('toggleLayerWash', { value: payload.value });
  },
  // toggle Wash
  toggleWash({ commit }) {
    commit('toggleWash');
  },
  // 处理点击预约事件
  handleBtnAppointmentAction({ dispatch }) {
    dispatch('togglePop');
    vm.$router.push('/appointment'); // eslint-disable-line
  },
  // 处理保洁功能按钮事件
  handleBtnPurifierAction({ commit }, payload) {
    commit('setBtnActive', { id: payload.id });
    commit('setTextActiveIcon', { id: FUN_BTNS.PURIFIER });
    // toggle
    const isActive = !state.funBtnList[FUN_BTNS.PURIFIER].isActive;
    if (isActive) {
      commit('setPurifier', { value: 0 });
    } else {
      commit('setPurifier', { value: 1 });
    }
    const PurifierTime = state.DataObject.PurifierTime || 1;
    commit('setPurifierTime', { value: PurifierTime });
    // commit('parseFunBtnAndForbidden');
  },
  // 处理保洁更多按钮事件
  handleBtnDescAppointmentAction({ commit, dispatch }) {
    // eslint-disable-next-line no-undef
    // vm.$router.push('/purifierAppointment');
    commit('setIsPurifierAppointment', { value: true });
    commit('togglePop');
    dispatch('parseBarColor');
  },

  // 处理消毒按钮事件
  handleBtnDisinfectAction({ commit }) {
    commit('toggleDisinfect');
    commit('toggleFunBtnStatus', FUN_BTNS.DISINFECT);
  },

  /**
   * @description 根据isDebug判断修改插件信息
   * @version 1.0.0
   * @todo 修改插件信息
   */
  editDevice(context) {
    if (!this.state.device.isDebug) {
      navigator.PluginInterface && navigator.PluginInterface.editDevice(context.state.mac);
    } else {
      console.log('==== navigator.PluginInterface.editDevice() ===='); // eslint-disable-line
    }
  },

  handleBack() {
    window.backButton();
  },

  getModeBtnFromCarouselId(context, payload) {
    const modeBtnList = this.state.device.modeBtnList;
    let ret = modeBtnList[0];
    modeBtnList.forEach((ele, index) => {
      if (ele.show === true && index === payload.id) {
        ret = ele;
      }
    });
    return ret;
  },

  // 滑轮ID 映射 电控模式ID
  async changeModeFromCarouselId({ commit, dispatch }, payload) {
    try {
      const { modeBtn } = payload;
      const { Mod, modeTime, modeDryTime, modeDisinfectTime } = modeBtn;

      const isNormalMod = Mod !== MOD_NONE && modeTime !== -1;
      const isDryMod = Mod === MOD_NONE && modeTime !== -1 && (modeDryTime === -1 || modeDryTime === undefined);
      const isDisinfectMod = Mod === MOD_NONE && modeTime !== -1 && (modeDisinfectTime === -1 || modeDisinfectTime === undefined);
      const isDryDisinfectMod = Mod === MOD_NONE && modeTime === -1 && (modeDryTime === -1 || modeDryTime === -1) && (modeDisinfectTime === -1 || modeDisinfectTime === undefined);

      if (isDryMod) {
        commit('setMod', { Mod: MOD_NONE }); // 单烘干
        commit('setDry', { value: 1 });
        commit('setDisinfect', { value: 0 });
      } else if (isDisinfectMod) {
        commit('setMod', { Mod: MOD_NONE }); // 单消毒
        commit('setDisinfect', { value: 1 });
        commit('setDry', { value: 0 });
      } else if (isDryDisinfectMod) {
        commit('setMod', { Mod: MOD_NONE }); // 消毒烘干
        commit('setDisinfect', { value: 1 });
        commit('setDry', { value: 1 });
      } else if (isNormalMod) {
        commit('setMod', { Mod });
      }

      dispatch('handleFunBtnAndForbidden');
      commit('setActiveModeBtnByMod');
      commit('parseWorkState');
      dispatch('setCarouselIdByMode');
      dispatch('parseBarColor');
    } catch (e) {
      console.log(e); // eslint-disable-line
    }
  },

  getCarouselIdFromDevice() {
    const { Mod, Disinfect, Dry } = state.DataObject;
    const modeBtnList = this.state.device.modeBtnList;

    const isDryMod = Mod === MOD_NONE && Dry === 1 && Disinfect === 0;
    const isDisinfectMod = Mod === MOD_NONE && Dry === 0 && Disinfect === 1;
    const isDryDisinfectMod = Mod === MOD_NONE && Dry === 1 && Disinfect === 1;
    const isNormalMod = Mod !== MOD_NONE;

    let ret = 0;
    if (isDryMod) {
      ret = MODE_BTNS.HOT_AIR_DRYING;
    } else if (isDisinfectMod) {
      ret = MODE_BTNS.DISINFECT;
    } else if (isDryDisinfectMod) {
      ret = MODE_BTNS.DRY_AND_DISINFECT;
    } else if (isNormalMod) {
      modeBtnList.forEach((ele, index) => {
        const isEqual = ele.show === true && ele.Mod === Mod;
        if (isEqual) {
          ret = index;
        }
      });
    } else {
      console.error('=== not match: ModeBtn ===');
    }

    return ret;
  },
  // handleFunBtnAndForbidden
  async handleFunBtnAndForbidden({ state, commit }) {
    if (state.DataObject.LayerWash === 0) {
      console.log('==== useCache ===='); // eslint-disable-line
      commit('setLayerWash', { value: state.LayerWashCache });
    }
    commit('parseFunBtnAndForbidden');
  },
  // setCarouselIdByMode
  async setCarouselIdByMode({ commit, dispatch }) {
    const _carouselId = await dispatch('getCarouselIdFromDevice');
    commit('setCarouselId', { value: _carouselId });
  },
  // 修改状态栏
  parseBarColor({ state, commit }) {
    let barColor = BarColor.blue;
    const {
      DataObject: { Pow, Mod, Disinfect, Dry },
      isShowPop,
      isPurifierAppointment,
    } = state;
    if (vm.$route.path === '/offline') { // eslint-disable-line
      barColor = BarColor.blue;
    } else if (vm.$route.path === '/error') { // eslint-disable-line
      barColor = BarColor.black;
    } else if (isPurifierAppointment === true) {
      barColor = BarColor.black;
    } else if (isShowPop === true) {
      barColor = BarColor.black;
    } else if (Pow === 0) {
      barColor = BarColor.blue;
    } else if (Mod === 0) {
      const isDryMod = Dry === 1 && Disinfect === 0;
      const isDisinfectMod = Dry === 0 && Disinfect === 0;
      const isDryDisinfectMod = Dry === 1 && Disinfect === 1;
      if (isDryMod) {
        barColor = BarColor.yellow;
      } else if (isDisinfectMod) {
        barColor = BarColor.blue;
      } else if (isDryDisinfectMod) {
        barColor = BarColor.yellow1;
      }
    }
    changeBarColor(barColor);
    commit('setBarColor', barColor);
  },
  // 电控模式ID 映射 滑轮ID
  async changeCarouselIdFromDevice({ commit, dispatch }) {
    try {
      const _carouselId = await dispatch('getCarouselIdFromDevice');
      commit('setCarouselId', { value: _carouselId });
    } catch (error) {
      console.error('==== changeCarouselIdFromDevice error ==='); // eslint-disable-line
    }
  },
  // 设置Mode
  setModeByRoot: {
    root: true,
    handler({ dispatch, commit }, payload) {
      const {
        btn,
        // id
      } = payload;
      const { Mod, modeTime, modeDryTime, modeDisinfectTime } = btn;

      const isNormalMod = Mod !== MOD_NONE && modeTime !== -1;
      const isDryMod = Mod === MOD_NONE && modeTime !== -1 && (modeDryTime === -1 || modeDryTime === undefined);
      const isDisinfectMod = Mod === MOD_NONE && modeTime !== -1 && (modeDisinfectTime === -1 || modeDisinfectTime === undefined);
      const isDryDisinfectMod = Mod === MOD_NONE && modeTime === -1 && (modeDryTime === -1 || modeDryTime === -1) && (modeDisinfectTime === -1 || modeDisinfectTime === undefined);

      if (isDryMod) {
        commit('setMod', { Mod: MOD_NONE }); // 单烘干 Mod: 0 强制设置
        commit('setDry', { value: 1 });
        commit('setDisinfect', { value: 0 });
      } else if (isDisinfectMod) {
        commit('setMod', { Mod: MOD_NONE }); // 单消毒 Mod: 0 强制设置
        commit('setDry', { value: 0 });
        commit('setDisinfect', { value: 1 });
      } else if (isDryDisinfectMod) {
        commit('setMod', { Mod: MOD_NONE }); // 消毒烘干 Mod: 0
        commit('setDry', { value: 1 });
        commit('setDisinfect', { value: 1 });
      } else if (isNormalMod) {
        commit('setMod', { Mod });
      }

      // commit('setActiveModeBtnByModeBtn', { index: id, modeBtn: btn });
      dispatch('changeCarouselIdFromDevice');
      commit('setActiveModeBtnByMod');
      dispatch('handleFunBtnAndForbidden');
      commit('parseWorkState');
      dispatch('setCarouselIdByMode');
      dispatch('parseBarColor');
    }
  },
  /**
   * 从设备初化state状态
   */
  async initStatesByDevice({ state, commit, dispatch }) {
    const { mac, fullstatueJson } = state;
    // 防止Android端第一次下载插件fullstatueJson为空值
    if (fullstatueJson === null || fullstatueJson === undefined || fullstatueJson === '') {
      console.error('fullstatueJson为空，等待1秒...');
      await sleep(500);
      dispatch('getInfoAndUpdateDeviceInfo'); // 获取设备状态，更新设备状态
      console.log('重新获取getInfo()');
      dispatch('initStatesByDevice');
    } else {
      try {
        const result = await sendDataToDevice(mac, fullstatueJson, false);
        console.log(`initStatesByDevice result: ${result}`); // eslint-disable-line
        commit('parseData', result);
        commit('updateUIForErrorCode');
        dispatch('handleFunBtnAndForbidden');
        commit('setActiveModeBtnByMod');
        commit('parseWorkState');
        dispatch('setCarouselIdByMode');
        dispatch('parseBarColor');
        finishLoad();
        console.log('==== navigator.PluginInterface.finishLoad() ===='); // eslint-disable-line
      } catch (e) {
        console.log(e); // eslint-disable-line
      }
    }
  },

  // 定时查询
  timerGetStates({ dispatch, commit, state }) {
    const { allowableTimer, msTimer } = state;
    const _timer = setInterval(async () => {
      if (!allowableTimer) {
        console.log('==== 不允许定时器查询 ===='); // eslint-disable-line
        return;
      }
      console.log('定时 timerGetStates'); // eslint-disable-line
      try {
        const { mac, fullstatueJson, allowableTimer } = state;
        const result = await sendDataToDevice(mac, fullstatueJson, false);
        // 允许定时器
        if (allowableTimer) {
          dispatch('getInfoAndUpdateDeviceInfo'); // 获取设备状态，更新设备状态
          console.log(`定时回调result: ${result}`); // eslint-disable-line
          commit('parseData', result);
          commit('updateUIForErrorCode');
          dispatch('handleFunBtnAndForbidden');
          // commit('setActiveModeBtnByModeBtn', { index: 1, modeBtn: btn });
          commit('setActiveModeBtnByMod');
          commit('parseWorkState');
          dispatch('setCarouselIdByMode');
          dispatch('parseBarColor');
        } else {
          console.log('==== sendDataToDevice 不允许定时器查询 ===='); // eslint-disable-line
        }
      } catch (e) {
        console.log(e); // eslint-disable-line
      }
    }, msTimer);
    commit('setTimer', _timer);
  },
  /**
   * @function 获取设备状态，更新设备状态
   * @description 获取设备状态，更新设备状态
   */
  async getInfoAndUpdateDeviceInfo({ commit, state }) {
    const { mac } = state;
    const deviceInfo = await getInfo(mac);
    commit('setDeviceInfo', deviceInfo);
  }
};

// mutations
const mutations = {
  setIsDebug(state, payload) {
    state.isDebug = payload;
  },
  getMac() {
    state.mac = getQueryStringByName('mac'); // 调用getQueryStringByName()函数获取数据
  },
  getData() {
    state.data = getQueryStringByName('data'); // 调用getQueryStringByName()函数获取数据
  },
  getFunctype() {
    const functype = getQueryStringByName('functype'); // 调用getQueryStringByName()函数获取数据
    state.functype = Number(functype);
  },
  getExt() {
    const extStr = getQueryStringByName('ext'); // 调用getQueryStringByName()函数获取数据
    state.ext = extStr.replace(/%3A/g, ':').split('#/')[0];
    // state.ext = '{"data":{"code":{"ErrorCode1": "7", "ErrorCode2": "1"},' +
    // '"evt":"4","t":"error"},"mac":"f4911e4664d1","mid":"828301"}';
    console.log(state.ext); // eslint-disable-line
  },
  setDeviceInfo(state, payload) {
    const deviceInfo = JSON.parse(payload);
    state.path = deviceInfo.path; // 插件所在地方
    state.fullstatueJson = deviceInfo.fullstatueJson; // 查询字段
    state.deviceState = deviceInfo.deviceState;
    const deviceName = deviceInfo.name; // 设备名称
    if (deviceName !== null && deviceName !== '') {
      state.deviceName = deviceName;
    } else {
      state.deviceName = 'DeviceName';
    }
    if (deviceInfo.lang === 'zh_CN') {
      state.lang = zhCNLang;
    } else {
      state.lang = enLang;
    }
  },
  /**
   * 设置定时器
   */
  setTimer(state, payload) {
    state.timer = payload;
  },
  /**
   * 清空定时器
   */
  clearTimer(state) {
    clearInterval(state.timer);
  },
  setNotefy(state, payload) {
    state.isNotify = payload;
  },
  setTestNotiyfyData(state) {
    state.ext = '{"data":{"code":{"estate": "7"},"evt":"4","t":"error"},"mac":"f4911e4664d1","mid":"828301"}';
  },
  setTestData(state) {
    // state.data = '[1, 0, 1, 1, 2, 0, 0, 0, 50, 0, 0, 0, 2048, 0, 1, 1 ]';
    state.data = '[1.0,0.0,0.0,0.0,0.0,0.0,"",0.0,"","",0.0,0.0,"","",0.0,0.0,"","","","","","",0.0]';
  },
  // 解析notify.html data数据
  parseNotifyStates(state) {
    try {
      console.log(state.ext); // eslint-disable-line
      const jsonExt = JSON.parse(state.ext);
      state.data = jsonExt.data;
      state.code = jsonExt.data.code;
      state.DataObject.estate1 = jsonExt.data.code.estate1;
      state.DataObject.estate2 = jsonExt.data.code.estate2;
      // 区分五级滤芯还是其他滤芯，在解除条件说明不一样
      state.FilterNum = jsonExt.data.code.FilterNum;
      state.evt = jsonExt.data.evt;
      state.t = jsonExt.data.t;
      state.mac = jsonExt.mac;
      state.mid = jsonExt.mid;
    } catch (e) {
      console.log(e); // eslint-disable-line
      console.log(`notify.html json parse error: ${state.ext}`); // eslint-disable-line
    }
  },
  // 解析数据
  parseData(state, payload) {
    try {
      state.data = payload;
      // let obj = JSON.parse(state.data);

      let DataObject = parseDataObject(payload);
      DataObject = useDefaultValue(DataObject); // remove illegal value;

      const {
        Pow,
        Wash,
        WashDone,
        WorkStatus,
        PauseStart,
        Mod,
        LayerWash,
        Dry,
        Hard,
        StHard,
        RmTmrHour,
        RmTmrMin,
        TmrOff,
        TmrOn,
        estate1,
        estate2,
        TmrStatus,
        TmrHour,
        TmrMin,
        StTmr,
        Purifier,
        PurifierTime,
        Disinfect,
        JFerr,
      } = DataObject;

      state.DataObject.Pow = Pow;
      state.DataObject.Wash = Wash;
      state.DataObject.WashDone = WashDone;
      state.DataObject.WorkStatus = WorkStatus;
      state.DataObject.PauseStart = PauseStart;
      state.DataObject.TmrOff = TmrOff;
      state.DataObject.TmrOn = TmrOn;
      state.DataObject.estate1 = estate1;
      state.DataObject.estate2 = estate2;
      state.DataObject.TmrStatus = TmrStatus;
      state.DataObject.JFerr = JFerr;

      // 第一次初始化查询 && 工作时才查询
      if (state.isFirstParseData === true || WashDone === 1 || Wash === 1 || TmrOn === 1) {
        state.isFirstParseData = false;

        state.DataObject.Mod = Mod;
        state.DataObject.LayerWash = LayerWash;
        state.DataObject.Dry = Dry;
        state.DataObject.Hard = Hard;
        state.DataObject.StHard = StHard;
        state.DataObject.RmTmrHour = RmTmrHour;
        state.DataObject.RmTmrMin = RmTmrMin;

        state.DataObject.TmrHour = TmrHour;
        state.DataObject.TmrMin = TmrMin;
        state.DataObject.StTmr = StTmr;
        state.DataObject.Purifier = Purifier;
        state.DataObject.PurifierTime = PurifierTime || 1;// default value is 1
        state.DataObject.Disinfect = Disinfect;
      }
    } catch (e) {
      console.error(e);
    }
    console.log(JSON.stringify(state.DataObject));
  },

  parseAdditionalFunc() {
    // const { Mod, Disinfect } = state.DataObject;
    // TODO:
  },

  parseMenuBtnAndForbidden(state) {
    const { Mod } = state.DataObject;
    const { menuBtnList } = state;

    const isDisable = MID === DW_MID_828901 && Mod === MOD_NONE;
    if (isDisable) {
      menuBtnList[BTN_TYPE_INDEX.Function].isNormal = false;
      menuBtnList[BTN_TYPE_INDEX.Function].isActive = false;
      menuBtnList[BTN_TYPE_INDEX.Function].isForbided = true;
    } else {
      menuBtnList[BTN_TYPE_INDEX.Function].isNormal = true;
      menuBtnList[BTN_TYPE_INDEX.Function].isActive = false;
      menuBtnList[BTN_TYPE_INDEX.Function].isForbided = false;
    }
  },

  // parseFunBtnAndForbidden
  parseFunBtnAndForbidden(state) {
    const { Mod, LayerWash, TmrOn, Dry, Disinfect, Purifier } = state.DataObject;
    // 分层洗
    if (LayerWash === BTN_LAYERWASH_TYPE.DEFAULT) {
      state.funBtnList[FUN_BTNS.DEFAULT].isNormal = false;
      state.funBtnList[FUN_BTNS.DEFAULT].isForbided = false;
      state.funBtnList[FUN_BTNS.DEFAULT].isActive = true;

      state.funBtnList[FUN_BTNS.UP_WASH].isNormal = true;
      state.funBtnList[FUN_BTNS.UP_WASH].isForbided = false;
      state.funBtnList[FUN_BTNS.UP_WASH].isActive = false;

      state.funBtnList[FUN_BTNS.DOWN_WASH].isNormal = true;
      state.funBtnList[FUN_BTNS.DOWN_WASH].isForbided = false;
      state.funBtnList[FUN_BTNS.DOWN_WASH].isActive = false;
    } else if (LayerWash === BTN_LAYERWASH_TYPE.UP_WASH) {
      state.funBtnList[FUN_BTNS.DEFAULT].isNormal = true;
      state.funBtnList[FUN_BTNS.DEFAULT].isForbided = false;
      state.funBtnList[FUN_BTNS.DEFAULT].isActive = false;

      state.funBtnList[FUN_BTNS.UP_WASH].isNormal = false;
      state.funBtnList[FUN_BTNS.UP_WASH].isForbided = false;
      state.funBtnList[FUN_BTNS.UP_WASH].isActive = true;

      state.funBtnList[FUN_BTNS.DOWN_WASH].isNormal = true;
      state.funBtnList[FUN_BTNS.DOWN_WASH].isForbided = false;
      state.funBtnList[FUN_BTNS.DOWN_WASH].isActive = false;
    } else if (LayerWash === BTN_LAYERWASH_TYPE.DOWN_WASH) {
      state.funBtnList[FUN_BTNS.DEFAULT].isNormal = true;
      state.funBtnList[FUN_BTNS.DEFAULT].isForbided = false;
      state.funBtnList[FUN_BTNS.DEFAULT].isActive = false;

      state.funBtnList[FUN_BTNS.UP_WASH].isNormal = true;
      state.funBtnList[FUN_BTNS.UP_WASH].isForbided = false;
      state.funBtnList[FUN_BTNS.UP_WASH].isActive = false;

      state.funBtnList[FUN_BTNS.DOWN_WASH].isNormal = false;
      state.funBtnList[FUN_BTNS.DOWN_WASH].isForbided = false;
      state.funBtnList[FUN_BTNS.DOWN_WASH].isActive = true;
    }

    // 启动烘干
    if (Dry === 1) {
      state.funBtnList[FUN_BTNS.HOT_AIR_DRYING].isNormal = false;
      state.funBtnList[FUN_BTNS.HOT_AIR_DRYING].isForbided = false;
      state.funBtnList[FUN_BTNS.HOT_AIR_DRYING].isActive = true;
    } else {
      state.funBtnList[FUN_BTNS.HOT_AIR_DRYING].isNormal = true;
      state.funBtnList[FUN_BTNS.HOT_AIR_DRYING].isForbided = false;
      state.funBtnList[FUN_BTNS.HOT_AIR_DRYING].isActive = false;
    }

    // 启动预约
    if (TmrOn === 1) {
      state.funBtnList[FUN_BTNS.APPOINTMENT].isNormal = false;
      state.funBtnList[FUN_BTNS.APPOINTMENT].isForbided = false;
      state.funBtnList[FUN_BTNS.APPOINTMENT].isActive = true;
    } else {
      state.funBtnList[FUN_BTNS.APPOINTMENT].isNormal = true;
      state.funBtnList[FUN_BTNS.APPOINTMENT].isForbided = false;
      state.funBtnList[FUN_BTNS.APPOINTMENT].isActive = false;
    }

    // 启动消毒
    if (Disinfect === 1) {
      state.funBtnList[FUN_BTNS.DISINFECT].isNormal = false;
      state.funBtnList[FUN_BTNS.DISINFECT].isForbided = false;
      state.funBtnList[FUN_BTNS.DISINFECT].isActive = true;
    } else {
      state.funBtnList[FUN_BTNS.DISINFECT].isNormal = true;
      state.funBtnList[FUN_BTNS.DISINFECT].isForbided = false;
      state.funBtnList[FUN_BTNS.DISINFECT].isActive = false;
    }

    // 处理保洁功能
    if (Purifier === 1) {
      state.funBtnList[FUN_BTNS.PURIFIER].isNormal = false;
      state.funBtnList[FUN_BTNS.PURIFIER].isForbided = false;
      state.funBtnList[FUN_BTNS.PURIFIER].isActive = true;
    } else {
      state.funBtnList[FUN_BTNS.PURIFIER].isNormal = true;
      state.funBtnList[FUN_BTNS.PURIFIER].isForbided = false;
      state.funBtnList[FUN_BTNS.PURIFIER].isActive = false;
    }

    /**
     *  禁用按钮
     */
    const isFastMod = MOD_ID.QUICK_WASH === Mod;
    const isDryMod = Mod === MOD_NONE && Dry === 1 && Disinfect === 0;
    const isDisinfectMod = Mod === MOD_NONE && Dry === 0 && Disinfect === 1;
    const isDryDisinfectMod = Mod === MOD_NONE && Dry === 1 && Disinfect === 1;
    const isNormalMod = Mod !== MOD_NONE;

    if (isDryMod) {
      // 单烘干
      state.funBtnList[FUN_BTNS.UP_WASH].isNormal = false;
      state.funBtnList[FUN_BTNS.UP_WASH].isForbided = true;
      state.funBtnList[FUN_BTNS.UP_WASH].isActive = false;

      state.funBtnList[FUN_BTNS.DOWN_WASH].isNormal = false;
      state.funBtnList[FUN_BTNS.DOWN_WASH].isForbided = true;
      state.funBtnList[FUN_BTNS.DOWN_WASH].isActive = false;

      state.funBtnList[FUN_BTNS.HOT_AIR_DRYING].isNormal = false;
      state.funBtnList[FUN_BTNS.HOT_AIR_DRYING].isForbided = true;
      state.funBtnList[FUN_BTNS.HOT_AIR_DRYING].isActive = false;

      state.funBtnList[FUN_BTNS.DISINFECT].isNormal = false;
      state.funBtnList[FUN_BTNS.DISINFECT].isForbided = true;
      state.funBtnList[FUN_BTNS.DISINFECT].isActive = false;

      state.DataObject.Dry = 1;
      // 单烘干 没有 附加消毒
      state.DataObject.Disinfect = 0;
      // 828b00 单烘干 没有上下层
      state.DataObject.LayerWash = 0;
      state.DataObject.Mod = MOD_NONE;
    } else if (isDisinfectMod) {
      // 单消毒
      state.funBtnList[FUN_BTNS.DISINFECT].isNormal = false;
      state.funBtnList[FUN_BTNS.DISINFECT].isForbided = true;
      state.funBtnList[FUN_BTNS.DISINFECT].isActive = false;

      state.DataObject.Disinfect = 1;
      state.DataObject.Mod = MOD_NONE;
    } else if (isDryDisinfectMod) {
      // 消毒烘干
      state.funBtnList[FUN_BTNS.DISINFECT].isNormal = false;
      state.funBtnList[FUN_BTNS.DISINFECT].isForbided = true;
      state.funBtnList[FUN_BTNS.DISINFECT].isActive = false;

      state.funBtnList[FUN_BTNS.HOT_AIR_DRYING].isNormal = false;
      state.funBtnList[FUN_BTNS.HOT_AIR_DRYING].isForbided = true;
      state.funBtnList[FUN_BTNS.HOT_AIR_DRYING].isActive = false;

      state.DataObject.Dry = 1;
      state.DataObject.Disinfect = 1;
      state.DataObject.Mod = MOD_NONE;
    } else if (isFastMod) {
      // 快速洗
      state.funBtnList[FUN_BTNS.UP_WASH].isNormal = false;
      state.funBtnList[FUN_BTNS.UP_WASH].isForbided = true;
      state.funBtnList[FUN_BTNS.UP_WASH].isActive = false;

      state.funBtnList[FUN_BTNS.DOWN_WASH].isNormal = false;
      state.funBtnList[FUN_BTNS.DOWN_WASH].isForbided = true;
      state.funBtnList[FUN_BTNS.DOWN_WASH].isActive = false;

      // 快速洗 没有上下层，默认上下层洗
      state.DataObject.LayerWash = BTN_LAYERWASH_TYPE.DEFAULT;
      state.funBtnList[FUN_BTNS.DEFAULT].isNormal = false;
      state.funBtnList[FUN_BTNS.DEFAULT].isForbided = false;
      state.funBtnList[FUN_BTNS.DEFAULT].isActive = true;
    } else if (isNormalMod) {
      console.log('=== nothing to handle ===');
    } else {
      console.error('=== not match: Mod ===');
    }
  },
  // setter Wash
  setWash(state, payload) {
    const { value } = payload;
    state.DataObject.Wash = value;
  },

  setWashDone(state, payload) {
    state.DataObject.WashDone = payload;
  },

  setWorkStatus(state, payload) {
    state.DataObject.WorkStatus = payload;
  },

  setRmTmrHour(state, payload) {
    state.DataObject.RmTmrHour = payload;
  },

  setRmTmrMin(state, payload) {
    state.DataObject.RmTmrMin = payload;
  },

  // 设置Mode
  setMod(state, payload) {
    console.log(`==== Mod: ${payload.Mod} ====`); // eslint-disable-line
    try {
      state.DataObject.Mod = payload.Mod;
    } catch (e) {
      console.log(e); // eslint-disable-line
    }
  },
  // 设置滑轮模式
  setCarouselId(state, payload) {
    state.carouselId = payload.value;
  },
  /**
   * setter PauseStart
   */
  setPauseStart(state, payload) {
    state.DataObject.PauseStart = payload.value;
  },
  // 解析工作状态

  parseWorkState(state) {
    const { modeBtnList, DataObject } = state;
    const { Mod, Dry, Disinfect } = DataObject;

    const isDryMod = Mod === MOD_NONE && Dry === 1 && Disinfect === 0;
    const isDisinfectMod = Mod === MOD_NONE && Dry === 0 && Disinfect === 1;
    const isDryDisinfectMod = Mod === MOD_NONE && Dry === 1 && Disinfect === 1;
    // const isFastMod = MOD_ID.QUICK_WASH === Mod;
    const isNormalMod = MOD_NONE !== Mod;

    try {
      let ret = modeBtnList[0];
      if (isDryMod) {
        ret = modeBtnList[MODE_BTNS.HOT_AIR_DRYING];
      } else if (isDisinfectMod) {
        ret = modeBtnList[MODE_BTNS.DISINFECT];
      } else if (isDryDisinfectMod) {
        ret = modeBtnList[MODE_BTNS.DRY_AND_DISINFECT];
      } else if (isNormalMod) {
        modeBtnList.forEach(ele => {
          const { show, isActive } = ele;
          if (show === true && isActive === true) {
            ret = ele;
          }
        });
      } else {
        console.error('=== not match: modeBtn ===');
      }
      const { name, carouselIconSrc, carouselImgBGSrc } = ret;
      state.workStatusName = name;
      state.workStatusImgSrc = carouselIconSrc;
      state.workStatusImgBG = carouselImgBGSrc;
    } catch (e) {
      console.warn(e); // eslint-disable-line
    }
  },
  setPurifier(state, payload) {
    state.DataObject.Purifier = payload.value;
  },
  setPurifierTime(state, payload) {
    state.DataObject.PurifierTime = payload.value;
  },
  setPurifierTimeTips(state) {
    const { WorkStatus, PurifierTime } = state.DataObject;
    const _vModeTime = formatPurifierTime(PurifierTime);
    const isPurifying = WorkStatus === WORK_STATUS.PURIFYING;
    const text = isPurifying === true ? '' : `待保洁${_vModeTime / 60}小时`;
    const btn = state.btnListObj.btnList[FUN_BTNS.PURIFIER];
    if (btn && btn.txtActiveIcon) {
      btn.txtActiveIcon = text;
    }
  },
  // 整机显示保洁，插件更新
  setPurifierTimeTipsInit(state) {
    const { WorkStatus, PurifierTime } = state.DataObject;
    const _vModeTime = formatPurifierTime(PurifierTime);
    const isPurifying = WorkStatus === WORK_STATUS.PURIFYING;
    const text = isPurifying === true ? '' : `待保洁${_vModeTime / 60}小时`;
    const btn = state.btnListObj.btnList[FUN_BTNS.PURIFIER];
    if (btn && btn.txtActiveIcon) {
      btn.txtActiveIcon = text;
    }
  },
  setIsPurifierAppointment(state, payload) {
    state.isPurifierAppointment = payload.value;
  },
  setIsShowWaringTipsDetails(state, payload) {
    state.isShowWaringTipsDetails = payload.value;
  },

  setBarColor(state, payload) {
    state.barColor = payload;
  },

  // setActiveModeBtnByModeBtn(state, payload) {
  //   const { index, modeBtn } = payload;

  //   const { show, Mod, modeDryTime, modeDisinfectTime } = modeBtn;

  //   const isNormalMod = show === true && Mod !== MOD_NONE;
  //   const isDisinfectMod = show === true && Mod === MOD_NONE && (modeDisinfectTime === -1 || modeDisinfectTime === undefined);
  //   const isDryMod = show === true && Mod === MOD_NONE && (modeDryTime === -1 || modeDryTime === undefined);

  //   const { modeBtnList } = state;
  //   modeBtnList.forEach(element => {
  //     const _element = element;
  //     _element.isNormal = true;
  //     _element.isForbided = false;
  //     _element.isActive = false;
  //   });
  //   state.modeBtnList[index].isNormal = false;
  //   state.modeBtnList[index].isForbided = false;
  //   state.modeBtnList[index].isActive = true;
  // },

  // 设备激活的模式按钮
  setActiveModeBtnByMod(state) {
    const {
      modeBtnList,
      DataObject: { Mod, Disinfect, Dry }
    } = state;

    const isNormalMod = Mod !== MOD_NONE;
    const isDryMod = Mod === MOD_NONE && Dry === 1 && Disinfect === 0;
    const isDisinfectMod = Mod === MOD_NONE && Dry === 0 && Disinfect === 1;
    const isDryDisinfectMod = Mod === MOD_NONE && Dry === 1 && Disinfect === 1;

    let currentNormalModeIndex = 0;
    modeBtnList.forEach((element, index) => {
      // reset default values
      const _element = element;
      _element.isNormal = true;
      _element.isForbided = false;
      _element.isActive = false;
      if (isNormalMod && Mod === _element.Mod) {
        currentNormalModeIndex = index;
      }
    });

    if (isDryMod) {
      modeBtnList[MODE_BTNS.HOT_AIR_DRYING].isNormal = false;
      modeBtnList[MODE_BTNS.HOT_AIR_DRYING].isForbided = false;
      modeBtnList[MODE_BTNS.HOT_AIR_DRYING].isActive = true;
    } else if (isDisinfectMod) {
      modeBtnList[MODE_BTNS.DISINFECT].isNormal = false;
      modeBtnList[MODE_BTNS.DISINFECT].isForbided = false;
      modeBtnList[MODE_BTNS.DISINFECT].isActive = true;
    } else if (isDryDisinfectMod) {
      modeBtnList[MODE_BTNS.DRY_AND_DISINFECT].isNormal = false;
      modeBtnList[MODE_BTNS.DRY_AND_DISINFECT].isForbided = false;
      modeBtnList[MODE_BTNS.DRY_AND_DISINFECT].isActive = true;
    } else if (isNormalMod) {
      modeBtnList[currentNormalModeIndex].isNormal = false;
      modeBtnList[currentNormalModeIndex].isForbided = false;
      modeBtnList[currentNormalModeIndex].isActive = true;
    }
  },
  // 设置激活功能按钮
  parseActiveFunLayerWashBtns(state) {
    const { DataObject: { LayerWash } } = state;
    // 默认上下层洗
    if (BTN_LAYERWASH_TYPE.DEFAULT === LayerWash) {
      this.state.device.funBtnList.forEach(element => {
        const _element = element;
        // 设置激活
        if (Object.hasOwnProperty.call(element, 'layerWash') && BTN_LAYERWASH_TYPE.DEFAULT === element.layerWash) {
          _element.isNormal = false;
          _element.isForbided = false;
          _element.isActive = true;
        }
        // 设置不激活
        if (Object.hasOwnProperty.call(element, 'layerWash') && BTN_LAYERWASH_TYPE.UP_WASH === element.layerWash) {
          _element.isNormal = true;
          _element.isForbided = false;
          _element.isActive = false;
        }
        // 设置不激活
        if (Object.hasOwnProperty.call(element, 'layerWash') && BTN_LAYERWASH_TYPE.DOWN_WASH === element.layerWash) {
          _element.isNormal = true;
          _element.isForbided = false;
          _element.isActive = false;
        }
      });
    } else if (BTN_LAYERWASH_TYPE.UP_WASH === LayerWash) {
      this.state.device.funBtnList.forEach(element => {
        const _element = element;
        // 设置不激活
        if (Object.hasOwnProperty.call(element, 'layerWash') && BTN_LAYERWASH_TYPE.DEFAULT === element.layerWash) {
          _element.isNormal = true;
          _element.isForbided = false;
          _element.isActive = false;
        }
        // 设置激活
        if (Object.hasOwnProperty.call(element, 'layerWash') && BTN_LAYERWASH_TYPE.UP_WASH === element.layerWash) {
          _element.isNormal = false;
          _element.isForbided = false;
          _element.isActive = true;
        }
        // 设置不激活
        if (Object.hasOwnProperty.call(element, 'layerWash') && BTN_LAYERWASH_TYPE.UP_WASH !== element.layerWash) {
          _element.isNormal = true;
          _element.isForbided = false;
          _element.isActive = false;
        }
      });
    } else if (BTN_LAYERWASH_TYPE.DOWN_WASH === LayerWash) {
      this.state.device.funBtnList.forEach(element => {
        const _element = element;
        // 设置不激活
        if (Object.hasOwnProperty.call(element, 'layerWash') && BTN_LAYERWASH_TYPE.DEFAULT === element.layerWash) {
          _element.isNormal = true;
          _element.isForbided = false;
          _element.isActive = false;
        }
        // 设置激活
        if (Object.hasOwnProperty.call(element, 'layerWash') && BTN_LAYERWASH_TYPE.DOWN_WASH === element.layerWash) {
          _element.isNormal = false;
          _element.isForbided = false;
          _element.isActive = true;
        }
        // 设置不激活
        if (Object.hasOwnProperty.call(element, 'layerWash') && BTN_LAYERWASH_TYPE.DOWN_WASH !== element.layerWash) {
          _element.isNormal = true;
          _element.isForbided = false;
          _element.isActive = false;
        }
      });
    }
  },

  updateUIForError(state) {
    const resultErrList = [];
    const { code } = state;
    for (let i = 0; i <= 8; i += 1) {
      if (ErrObj1[i] && ErrObj1[i].code === code) {
        ErrObj1[i] && resultErrList.push(ErrObj1[i]);
      }
    }
    state.errItemList = resultErrList;
  },

  // 更新ErrorCode相关UI
  updateUIForErrorCode(state) {
    const resultErrList = [];
    const resultWaringList = [];
    const { estate1, estate2, JFerr } = state.DataObject;
    if (estate1 !== ERROR_CODE.NONE) {
      // 多个错误显示
      for (let i = 0; i <= 8; i += 1) {
        if (estate1 & (0x01 << i)) {
          ErrObj1[i] && resultErrList.push(ErrObj1[i]);
        }
      }
    }
    if (estate2 !== ERROR_CODE.NONE) {
      // 多个错误显示
      for (let i = 0; i <= 8; i += 1) {
        if (estate2 & (0x01 << i) && (i === 1 || i === 4)) {
          ErrObj2[i] && resultErrList.push(ErrObj2[i]);
        }
      }
      // 多个提示显示
      for (let i = 0; i <= 8; i += 1) {
        if (estate2 & (0x01 << i) && (i === 0 || i === 2 || i === 3)) {
          ErrObj2[i] && resultWaringList.push(ErrObj2[i]);
        }
      }
    }
    if (JFerr !== ERROR_CODE.NONE) {
      // WiFi故障
      state.errItemList = resultErrList.push(ErrObj3[0]);
    }
    state.errItemList = resultErrList;
    state.warningItemList = resultWaringList;
  },
  // setter vModeTime
  setVModeTime(state, payload) {
    state.vModeTime = payload.value;
  },
  // setter isBlueColor
  setIsBlueColor(state, payload) {
    state.isBlueColor = payload.value;
  },

  // setter TmrStatus
  setTmrStatus(state, payload) {
    state.DataObject.TmrStatus = payload.value;
  },
  // setter allowableTime
  setAllowableTime(state, payload) {
    state.allowableTimer = payload.value;
  },
  // setter Pow
  setPow(state, payload) {
    state.DataObject.Pow = payload.value;
  },

  // setter DryCache
  setDryCache(state, payload) {
    state.DryCache = payload.value;
  },

  // setter Dry
  setDry(state, payload) {
    state.DataObject.Dry = payload.value;
  },
  // setter Dry
  toggleDry(state) {
    const Dry = state.DataObject.Dry;
    state.DataObject.Dry = Dry === 0 ? 1 : 0;
  },

  toggleFunBtnStatus(state, payload) {
    const index = payload;
    const isActive = state.funBtnList[index].isActive;
    if (isActive) {
      state.funBtnList[index].isNormal = true;
      state.funBtnList[index].isForbided = false;
      state.funBtnList[index].isActive = false;
    } else {
      state.funBtnList[index].isNormal = false;
      state.funBtnList[index].isForbided = false;
      state.funBtnList[index].isActive = true;
    }
  },

  // setter DisinfectCache
  setDisinfectCache(state, payload) {
    state.DisinfectCache = payload.value;
  },

  // setter Disinfect
  setDisinfect(state, payload) {
    state.DataObject.Disinfect = payload.value;
  },
  // toggle Disinfect
  toggleDisinfect(state) {
    const Disinfect = state.DataObject.Disinfect;
    state.DataObject.Disinfect = Disinfect === 0 ? 1 : 0;
  },
  // setter StTmr
  setStTmr(state, payload) {
    const { value } = payload;
    state.DataObject.StTmr = value;
  },
  // setter StTmr
  setTmrHour(state, payload) {
    const { value } = payload;
    state.DataObject.TmrHour = value;
  },
  // setter StTmr
  setTmrMin(state, payload) {
    const { value } = payload;
    state.DataObject.TmrMin = value;
  },
  setTmrOn(state, payload) {
    const { value } = payload;
    state.DataObject.TmrOn = value;
  },
  setTmrOff(state, payload) {
    const { value } = payload;
    state.DataObject.TmrOff = value;
  },
  // toggleLayerWash
  toggleLayerWash(state, payload) {
    const { value } = payload;
    const _layerWash = state.DataObject.LayerWash;
    if (_layerWash !== value && value === 1) {
      state.DataObject.LayerWash = 1;
    } else if (_layerWash !== value && value === 2) {
      state.DataObject.LayerWash = 2;
    } else {
      state.DataObject.LayerWash = 0;
    }
    console.log('=== test ==='); // eslint-disable-line
  },
  // toggle Wash
  toggleWash(state) {
    state.DataObject.Wash = state.DataObject.Wash === 0 ? 1 : 0;
  },

  // setter LayerWashCache
  setLayerWashCache(state, payload) {
    state.LayerWashCache = payload.value;
  },

  // setter LayerWash
  setLayerWash(state, payload) {
    state.DataObject.LayerWash = payload.value;
  },

  // setter btnList
  setBtnList(state, payload) {
    state.btnListObj.type = payload.type;
    state.btnListObj.btnList = payload.btnList;
  },
  // toggle Pop
  togglePop(state) {
    state.isShowPop = !state.isShowPop;
  },

  setIsShowPop(state, payload) {
    state.isShowPop = payload;
  },

  setBtnStatus(state, payload) {
    const { id, isActive } = payload;
    if (isActive) {
      state.btnListObj.btnList[id].isNormal = false;
      state.btnListObj.btnList[id].isForbided = false;
      state.btnListObj.btnList[id].isActive = true;
    } else {
      state.btnListObj.btnList[id].isNormal = true;
      state.btnListObj.btnList[id].isForbided = false;
      state.btnListObj.btnList[id].isActive = false;
    }
  },
  // 设置按钮状态
  setBtnActive(state, payload) {
    const { id } = payload;
    const isActive = state.btnListObj.btnList[id].isActive;
    const type = state.btnListObj.type;
    if (type === BTN_TYPE.BTN_MODEL) {
      state.btnListObj.btnList.forEach((_element, index) => {
        const element = _element;
        if (id !== index) {
          element.isNormal = true;
          element.isForbided = false;
          element.isActive = false;
        } else {
          element.isNormal = false;
          element.isForbided = false;
          element.isActive = true;
        }
      });
    } else if (type === BTN_TYPE.BTN_FUNCTION) {
      if (isActive) {
        state.btnListObj.btnList[id].isNormal = true;
        state.btnListObj.btnList[id].isForbided = false;
        state.btnListObj.btnList[id].isActive = false;
      } else {
        state.btnListObj.btnList[id].isNormal = false;
        state.btnListObj.btnList[id].isForbided = false;
        state.btnListObj.btnList[id].isActive = true;
      }
    }
  },
  // 设置提示语
  setTextActiveIcon(state, payload) {
    const { id } = payload;
    if (id === FUN_BTNS.PURIFIER) {
      const { PurifierTime } = state.DataObject;
      const _vModeTime = formatPurifierTime(PurifierTime);
      state.btnListObj.btnList[id].txtActiveIcon = `待保洁${_vModeTime / 60}小时`;
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

// 根据QueryString参数名称获取值
function getQueryStringByName(name) {
  const href = decodeURI(location.href); // 转义
  const result = href.match(new RegExp(`[?&]${name}=([^&]+)`, 'i')); // 正则表达式，将原始数据转为可用数据
  if (result == null || result.length < 1) {
    return '';
  }
  return result[1];
}
