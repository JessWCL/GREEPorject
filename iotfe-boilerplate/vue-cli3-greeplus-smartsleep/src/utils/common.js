// 用于主体回调
// function updateUI(params) {}
// 播放音乐 index
export const startSleepMusic = (index, callback) => {
  return new Promise((resolve, reject) => {
    try {
      navigator.PluginInterface.startSleepMusic(
        index,
        // (...params) => {
        //   resolve(...params);
        // },
        callback,
      );
    } catch (err) {
      reject(err);
    }
  });
};
