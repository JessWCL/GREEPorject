// 包含 0 ~ 59 的数组
const minuteArr = [];
for (let i = 0; i < 60; i += 1) {
  minuteArr.push({
    text: i > 9 ? `${i}` : `0${i}`,
    value: i
  });
}

const hourArr = [];
// 24小时
for (let hour = 0; hour < 24; hour += 1) {
  const children = minuteArr;
  hourArr.push({
    text: hour > 9 ? `${hour}` : `0${hour}`,
    value: hour,
    children
  });
}

const timeData = [];
timeData.push(hourArr);

export { timeData };
