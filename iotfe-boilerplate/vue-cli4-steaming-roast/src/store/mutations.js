import * as type from './types';
// 同步操作放这里
export default {
  [type.SET_MAC](state, mac) {
    state.mac = mac;
  },
  [type.SET_DEVICE_INFO](state, deviceInfo) {
    state.deviceInfo = deviceInfo;
  },
  [type.SET_DEVICE_LIST](state, deviceList) {
    state.deviceList = deviceList;
  },
  [type.GET_TIMELIST](state, timeList) {
    state.timeList = timeList;
    console.log('状态仓库已修改');
    console.log(state.timeList);
  },
  [type.SET_DATA_OBJECT](state, obj) {
    state.dataObject = { ...state.dataObject, ...obj };
  },
  [type.IS_SCENE](state, isScene) {
    state.isScene = isScene;
  },
  [type.IS_FUNCTION_LIST_POPUP_SHOW](state, payload) {
    state.isFunctionListPopupShow = payload;
  },
  [type.IS_MOREBTN](state, isMorebtn) {
    state.isMorebtn = isMorebtn;
  },
  [type.IS_TIME](state, isTime) {
    state.isTime = isTime;
  },
  [type.IS_SLEEP](state, isSleep) {
    state.isSleep = isSleep;
  },
  [type.RE_FRESH](state, payload) {
    console.log(`reFresh: ${payload}`);
    state.reFresh = payload;
  },
  [type.SET_IS_APPOINTMENT](state, payload) {
    state.isAppointment = payload;
  },
  [type.SET_IS_APPOINTMENT_DETAIL](state, payload) {
    state.isAppointmentDetail = payload;
  },
  [type.SET_SELECTED_LIST3_ITEM](state, payload) {
    state.selectedList3Item = payload;
  },
  [type.SET_TIME](state, data) {
    state.setTime = { ...state.setTime, ...data };
  },
  [type.QUERY_TIME](state, data) {
    state.queryTime = { ...state.queryTime, ...data };
  },
  [type.SET_IS_SHRINK_ONRESIZE](state, payload) {
    state.isShrinkOnresize = payload;
  },
  [type.SET_POW](state, payload) {
    state.dataObject = { ...state.dataObject, Pow: payload };
  },
  [type.SET_RUNSTAT](state, payload) {
    state.dataObject = { ...state.dataObject, RunStat: payload };
  },
  [type.SET_MOD](state, payload) {
    state.dataObject = { ...state.dataObject, Mod: payload };
  },
  [type.SET_LIST1](state, payload) {
    state.dataObject = { ...state.dataObject, List1: payload };
  },
  [type.SET_LIST2](state, payload) {
    state.dataObject = { ...state.dataObject, List2: payload };
  },
  [type.SET_LIST3](state, payload) {
    state.dataObject = { ...state.dataObject, List3: payload };
  },
  [type.SET_LIST4](state, payload) {
    state.dataObject = { ...state.dataObject, List4: payload };
  },
  [type.SET_LIST5](state, payload) {
    state.dataObject = { ...state.dataObject, List5: payload };
  },
  [type.SET_SET_HOUR](state, payload) {
    state.dataObject = { ...state.dataObject, SetHour: payload };
  },
  [type.SET_SET_MIN](state, payload) {
    state.dataObject = { ...state.dataObject, SetMin: payload };
  },
  [type.SET_SET_TMP](state, payload) {
    state.dataObject = { ...state.dataObject, SetTmp: payload };
  },
  [type.SET_TMR_HOUR](state, payload) {
    state.dataObject = { ...state.dataObject, TmrHour: payload };
  },
  [type.SET_TMR_MIN](state, payload) {
    state.dataObject = { ...state.dataObject, TmrMin: payload };
  },
  [type.SET_PAUSE](state, payload) {
    state.dataObject = { ...state.dataObject, Pause: payload };
  },
  [type.SET_DIS_TMP](state, payload) {
    state.dataObject = { ...state.dataObject, DisTmp: payload };
  },
  [type.SET_DIS_SET_HOUR](state, payload) {
    state.dataObject = { ...state.dataObject, DisSetHour: payload };
  },
  [type.SET_DIS_SET_MIN](state, payload) {
    state.dataObject = { ...state.dataObject, DisSetMin: payload };
  },
  [type.SET_DIS_TMR_HOUR](state, payload) {
    state.dataObject = { ...state.dataObject, DisTmrHour: payload };
  },
  [type.SET_DIS_TMR_MIN](state, payload) {
    state.dataObject = { ...state.dataObject, DisTmrMin: payload };
  },
  [type.SET_MACH_STAT](state, payload) {
    state.dataObject = { ...state.dataObject, MachStat: payload };
  },
  [type.SET_TMP_CTRL](state, payload) {
    state.dataObject = { ...state.dataObject, TmpCtrl: payload };
  },
  [type.SET_CHILD_LOCK](state, payload) {
    state.dataObject = { ...state.dataObject, ChildLock: payload };
  },
  [type.SET_ESTATE1](state, payload) {
    state.dataObject = { ...state.dataObject, estate1: payload };
  },
  [type.SET_ESTATE2](state, payload) {
    state.dataObject = { ...state.dataObject, estate2: payload };
  },
  [type.SET_ESTATE3](state, payload) {
    state.dataObject = { ...state.dataObject, estate3: payload };
  },
  [type.SET_ESTATE4](state, payload) {
    state.dataObject = { ...state.dataObject, estate4: payload };
  },
  [type.SET_ESTATE5](state, payload) {
    state.dataObject = { ...state.dataObject, estate5: payload };
  },
  [type.SET_DATA_OBJECT_CACHE](state, payload) {
    state.dataObjectCache = { ...state.dataObjectCache, ...payload };
  },
  [type.SET_COUNT_CLOUD_MENU_LIST](state, payload) {
    state.countCloudMenuList = payload;
  },
  [type.APPEND_CLOUD_MENU_LIST](state, payload) {
    const { cloudMenuList } = state;
    state.cloudMenuList = cloudMenuList.concat(payload);
  },
  [type.SET_CLOUD_MENU_LIST](state, payload) {
    state.cloudMenuList = payload;
  },
  [type.SET_CLOUD_MENU_DETAIL_STEPS](state, payload) {
    state.cloudMenuDetailSteps = payload;
  },
  [type.SET_FAVORITE_MENU](state, payload) {
    state.favoriteMenu = payload;
  },
  [type.SET_FAVORITE_MENU_CLOUD](state, payload) {
    state.favoriteCloudMenu = payload;
  },
};
