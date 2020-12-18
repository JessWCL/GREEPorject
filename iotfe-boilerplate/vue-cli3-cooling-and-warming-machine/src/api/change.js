export function OxChangeBinary(value) {
  return Number(value[0]) * 16 + Number(value[1]);
}

export function weekChangle(arr) {
  let str = '';
  let num = 0;
  const valueArr = ['日', '一', '二', '三', '四', '五', '六'];
  for (let index = 0; index < arr.length; index++) {
    if (arr[index]) {
      str = `${str}${valueArr[index]}、`;
      num++;
    }
  }
  return str.split('、')[0];
}

export function changeTimerList(arr) {
  let list = arr;
  if (list.length > 0) {
    for (let index = 0; index < list.length; index++) {
      list[index].enable = !Boolean(list[index].enable);
    }
  }
  return list;
}