/*
 * @Author: Jerry-Rain
 * @Date: 2019-11-25 10:13:47
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2019-11-25 10:16:40
 * @Description: 
 */
export function timeData() {
  const list0 = []
  const list1 = []
  for (let index = 0; index < 24; index++) {
    const parent = {}
    parent.value = index
    parent.text = index < 10 ? `0${index}` : `${index}`
    list0.push(parent)
  }
  for (let index = 0; index < 60; index++) {
    const parent = {}
    parent.value = index
    parent.text = index < 10 ? `0${index}` : `${index}`
    list1.push(parent)
  }
  return [list0, list1]
}
