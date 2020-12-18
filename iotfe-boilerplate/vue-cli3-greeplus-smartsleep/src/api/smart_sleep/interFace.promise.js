/*
 * @Author: Jerry-Rain
 * @Date: 2020-01-08 17:25:30
 * @LastEditors  : Jerry-Rain
 * @LastEditTime : 2020-01-09 11:35:50
 * @Description: 慕斯主体接口
 */

// T10
export const musiGetData = (mac, data, functionName) => {
  return new Promise((resolve, reject) => {
    try {
      navigator.PluginInterface[functionName](mac, data, callback => {
        resolve(callback)
      })
    } catch (err) {
      reject(err)
    }
  })
}
