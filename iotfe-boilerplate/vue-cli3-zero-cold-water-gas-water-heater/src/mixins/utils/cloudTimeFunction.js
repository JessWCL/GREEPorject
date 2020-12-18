import { mapActions, mapMutations } from 'vuex';
import {
  hideLoading,
  showLoading,
  getCloudTimerByMac,
  setCloudTimer,
  modifyCloudTimer,
  startOrCancelCloudTimer,
  deleteCloudTimer,
  showToast,
} from '../../../../static/lib/PluginInterface.promise';

const cloudMethod = {
  mixins: [],
  data() {
    return {};
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT',
      setCloudTimerData: 'SET_CLOUD_TIMER_DATA', // 与写入时间重名，改为setCloudTimerData
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL',
    }),
    /**
     * @description cloudShowTip
     */
    cloudShowTip() {
      console.log('云定时方法');
    },
    /**
     * @description: 查询云定时
     * @function updateCloudTimer
     */
    updateCloudTimer(mac) {
      return new Promise((resolve, reject) => {
        try {
          console.log('------------查询云定时---------------');
          if (mac) {
            showLoading();
            console.log(`mac：${mac}`);
            getCloudTimerByMac(mac)
              .then(res => {
                console.log(`res------${res}`);
                const result = JSON.parse(res);
                console.log(`result------${result}`);
                if (result.r === 200) {
                  console.log('查询成功');
                  if (Object.keys(result.timerTasks).length > 0) {
                    this.setCloudTimerData(result); // vuex 暂存云定时状态
                    hideLoading();
                    resolve('success');
                  } else {
                    console.log('结果为空');
                    const timer = {};
                    this.setCloudTimerData(timer);
                    hideLoading();
                    resolve('empty');
                  }
                } else {
                  console.log('故障代码：', result.r);
                  hideLoading();
                  reject('error');
                }
              })
              .catch(err => {
                err;
                console.log(`发生错误------${err}`);
                hideLoading();
                reject('error');
              });
          } else {
            console.log('mac为空，无法查询。结束。');
            reject('error');
          }
        } catch (err) {
          err;
          console.log(`主体调用失败------${err}`);
          reject('error');
        }
      });
    },
    /**
     * 设置云定时，如果已经有了云定时，则修改云定时
     * @function pluginsSetCloudTimer
     */
    async pluginsSetCloudTimer(mac, startCloudTime, endCloudTime, CruiseVal) {
      console.log(startCloudTime, endCloudTime);
      this.updateCloudTimer(mac)
        .then(res => {
          console.log(res);
          if (Object.keys(this.cloudTimer).length > 0) {
            console.log('已经有了云定时，修改云定时');
            const startTimerID = this.cloudTimer.timerTasks[0].timer.timerID;
            const endTimerID = this.cloudTimer.timerTasks[1].timer.timerID;
            console.log(`timerID:${startTimerID},${endTimerID}`);
            this.asyncModifyCloudTimer(startCloudTime, startTimerID)
              .then(res => {
                console.log('开始时间修改成功', res);
                this.asyncModifyCloudTimer(endCloudTime, endTimerID)
                  .then(res => {
                    console.log('结束时间修改成功', res);
                    this.sendCtrl({ Mode: 4, Cruise: CruiseVal });
                    this.setDataObject({ Mode: 4, Cruise: CruiseVal });
                    this.updateCloudTimer(mac);
                  })
                  .catch(err => {
                    showToast('网络异常', 0);
                    console.log('结束时间修改失败', err);
                    this.deleteAllCloudTimer(this.mac);
                  });
              })
              .catch(err => {
                showToast('网络异常', 0);
                console.log('开始时间修改失败', err);
              });
          } else {
            console.log('没有有云定时，写入新云定时');
            this.asyncSetCloudTimer(startCloudTime)
              .then(res => {
                console.log('开始时间写入成功', res);
                this.asyncSetCloudTimer(endCloudTime)
                  .then(res => {
                    console.log('结束时间写入成功', res);
                    this.sendCtrl({ Mode: 4, Cruise: CruiseVal });
                    this.setDataObject({ Mode: 4, Cruise: CruiseVal });
                    this.updateCloudTimer(mac);
                  })
                  .catch(err => {
                    console.log('结束时间写入失败', err);
                    showToast('网络异常', 0);
                    this.deleteAllCloudTimer(this.mac);
                  });
              })
              .catch(err => {
                console.log('开始时间写入失败', err);
                showToast('网络异常', 0);
              });
          }
        // Promise.all([setStart, setEnd])
        //   .then(res => {
        //     console.log(res);
        //     this.sendCtrl({ Mode: 4 });
        //     this.setDataObject({ Mode: 4 });
        //     hideLoading();
        //     this.goBack();
        //   })
        //   .catch(err => {
        //     console.log(err);
        //     hideLoading();
        //   });
        })
        .catch(err => {
          console.log('查询失败，无法写入云定时', err);
          showToast('网络异常', 0);
        });
    },
    /**
     * 取消云定时，如果有，则取消云定时
     * @function cancelCloudTimer
     */
    async cancelCloudTimer(cloudTimer, ModeVal, CruiseVal) {
      console.log(cloudTimer, ModeVal, CruiseVal);
      this.sendCtrl({ Mode: ModeVal, Cruise: CruiseVal });
      this.setDataObject({ Mode: ModeVal, Cruise: CruiseVal });
      // 方法一：选择其他模式，删除云定时
      if (Object.keys(cloudTimer).length > 0) {
        this.deleteAllCloudTimer(this.mac);
      }
      // // 方法二：选择其他模式，取消云定时
      // if (Object.keys(cloudTimer).length > 0) {
      //   console.log('已经有了云定时，取消云定时');
      //   const startTimerID = cloudTimer.timerTasks[0].timer.timerID;
      //   const endTimerID = cloudTimer.timerTasks[1].timer.timerID;
      //   console.log(`timerID:${startTimerID},${endTimerID}`);
      //   let start = await this.asyncStartOrCancelCloudTimer(startTimerID, 0); // 取消开始时间
      //   if (start === 'success') {
      //     console.log('开始时间取消成功');
      //     let end = await this.asyncStartOrCancelCloudTimer(endTimerID, 0); // 取消结束时间
      //     if (end === 'success') {
      //       console.log('结束时间取消成功');
      //       this.sendCtrl({ Mode: ModeVal, Cruise: CruiseVal });
      //       this.setDataObject({ Mode: ModeVal, Cruise: CruiseVal });
      //     } else {
      //       console.log('结束时间取消失败');
      //       this.deleteAllCloudTimer(this.mac);
      //     }
      //   } else {
      //     console.log('开始时间取消失败');
      //   }
      //   // Promise.all([setStart, setEnd])
      //   //   .then(res => {
      //   //     console.log(res);
      //   //     this.sendCtrl({ Mode: ModeVal, Cruise: CruiseVal });
      //   //     this.setDataObject({ Mode: ModeVal, Cruise: CruiseVal });
      //   //     hideLoading();
      //   //     this.goBack();
      //   //   })
      //   //   .catch(err => {
      //   //     console.log(err);
      //   //     hideLoading();
      //   //   });
      // } else {
      //   this.sendCtrl({ Mode: ModeVal, Cruise: CruiseVal });
      //   this.setDataObject({ Mode: ModeVal, Cruise: CruiseVal });
      // }
    },
    /**
     * 删除所有云定时
     * @function deleteAllCloudTimer
     */
    deleteAllCloudTimer(mac) {
      return new Promise((resolve, reject) => {
        try {
          console.log('------------查询所有云定时---------------');
          console.log(`mac：${mac}`);
          if (mac) {
            showLoading();
            getCloudTimerByMac(mac)
              .then(res => {
                console.log('查询云定时');
                console.log(`res------${res}`);
                const result = JSON.parse(res);
                console.log(`result------${result}`);
                if (result.r === 200) {
                  console.log('查询成功');
                  // 判断是否设置了云定时
                  if (Object.keys(result.timerTasks).length > 0) {
                    let timerIDs = [];
                    for (
                      let i = 0;
                      i < Object.keys(result.timerTasks).length;
                      i += 1
                    ) {
                      timerIDs.push(result.timerTasks[i].timer.timerID); // 获取所有云定时的timerID
                    }
                    console.log(timerIDs);
                    // 确定云定时数量一致
                    if (
                      timerIDs.length === Object.keys(result.timerTasks).length
                    ) {
                      console.log('------------删除所有云定时---------------');
                      deleteCloudTimer(timerIDs)
                        .then(res => {
                          console.log(`res------${res}`);
                          const result = JSON.parse(res);
                          console.log(`result------${result}`);
                          if (result.r === 200) {
                            console.log('删除成功');
                            const timer = {};
                            this.setCloudTimerData(timer); // vuex 清除云定时状态
                            hideLoading();
                            resolve('success');
                          } else {
                            console.log('删除失败');
                            hideLoading();
                            reject('fail');
                          }
                        })
                        .catch(err => {
                          err;
                          console.log(`删除发生错误------${err}`);
                          hideLoading();
                          reject('error');
                        });
                    } else {
                      console.log('数量不符合');
                      hideLoading();
                      reject('error');
                    }
                  } else {
                    console.log('未设置云定时');
                    hideLoading();
                    reject('error');
                  }
                } else {
                  console.log('查询失败');
                  reject('error');
                }
              })
              .catch(err => {
                err;
                console.log(`查询发生错误------${err}`);
                hideLoading();
                reject('error');
              });
          } else {
            console.log('mac为空，无法删除。结束。');
            reject('error');
          }
        } catch (err) {
          err;
          console.log(`主体调用失败------${err}`);
          reject('error');
        }
      });
    },
    /**
     * 异步调用写入云定时
     * @function asyncSetCloudTimer
     */
    asyncSetCloudTimer(CloudTime) {
      return new Promise((resolve, reject) => {
        try {
          console.log('---------设置云定时----------');
          showLoading();
          console.log(`mac: ${CloudTime.taskDic.mac}`);
          setCloudTimer(CloudTime.timerDic, CloudTime.taskDic)
            .then(res => {
              console.log('调用成功');
              console.log(`res------${res}`);
              const result = JSON.parse(res);
              console.log(`result------${result}`);
              if (result.r === 200) {
                console.log('时间写入成功');
                hideLoading();
                resolve('success');
              } else {
                console.log('时间写入失败');
                hideLoading();
                reject('fail');
              }
            })
            .catch(err => {
              console.log(`发生错误------${err}`);
              hideLoading();
              reject('error');
            });
        } catch (err) {
          console.log(`调用失败------${err}`);
          reject('error');
        }
      });
    },
    /**
     * 异步调用修改云定时
     * @function asyncModifyCloudTimer
     */
    asyncModifyCloudTimer(CloudTime, timerID) {
      return new Promise((resolve, reject) => {
        try {
          console.log('---------修改云定时----------');
          showLoading();
          console.log(`mac: ${CloudTime.taskDic.mac}`);
          modifyCloudTimer(CloudTime.timerDic, CloudTime.taskDic, timerID)
            .then(res => {
              console.log('调用成功');
              console.log(`res------${res}`);
              const result = JSON.parse(res);
              console.log(`result------${result}`);
              if (result.r === 200) {
                console.log('时间修改成功');
                resolve('success');
              } else {
                console.log(`错误代码：${result.r}`);
                hideLoading();
                reject('fail');
              }
            })
            .catch(err => {
              console.log(`发生错误------${err}`);
              hideLoading();
              reject('error');
            });
        } catch (err) {
          console.log(`调用失败------${err}`);
          reject('error');
        }
      });
    },
    /**
     * 异步调用取消云定时
     * @function asyncStartOrCancelCloudTimer
     */
    asyncStartOrCancelCloudTimer(timerID, optVal) {
      return new Promise((resolve, reject) => {
        try {
          console.log('---------取消云定时----------');
          showLoading();
          console.log(`timerID: ${timerID},opt:${optVal}`);
          startOrCancelCloudTimer(timerID, optVal)
            .then(res => {
              console.log('调用成功');
              console.log(`res------${res}`);
              const result = JSON.parse(res);
              console.log(`result------${result}`);
              if (result.r === 200) {
                console.log('时间取消成功');
                resolve('success');
              } else {
                console.log(`错误代码：${result.r}`);
                hideLoading();
                reject('fail');
              }
            })
            .catch(err => {
              err;
              console.log(`发生错误------${err}`);
              hideLoading();
              reject('error');
            });
        } catch (err) {
          console.log(`调用失败------${err}`);
          reject('error');
        }
      });
    },
  }
};
export default cloudMethod;
