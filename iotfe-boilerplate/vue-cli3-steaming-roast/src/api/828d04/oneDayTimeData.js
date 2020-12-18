const oneDayTimeData = [];

const children01To59 = [];

for (let index = 0; index < 60; index += 1) {
  if (index < 10) {
    children01To59.push({
      text: `0${index}`,
      value: index
    });
  } else {
    children01To59.push({
      text: `${index}`,
      value: index
    });
  }
}

for (let index = 0; index < 24; index += 1) {
  if (index < 10) {
    oneDayTimeData.push({
      text: `0${index}`,
      value: index,
      children: children01To59
    });
  } else {
    oneDayTimeData.push({
      text: `${index}`,
      value: index,
      children: children01To59
    });
  }
}

const ret = [oneDayTimeData];

export default ret;
