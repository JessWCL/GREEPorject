const timeChildren = (minV, maxV) => {
  const list = [];
  // eslint-disable-next-line no-plusplus
  for (let index = minV; index <= maxV; index++) {
    const child = {};
    child.value = index;
    child.text = index < 10 ? `0${index}` : `${index}`;
    list.push(child);
  }
  return list;
};

export function timeData() {
  const list = [];
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index <= 23; index += 1) {
    const parent = {};
    if (index < 10) {
      parent.value = index;
      parent.text = index % 1 === 0 ? `0${index}` : `${index}`;
    } else if (index >= 10 && index % 1 === 0) {
      parent.value = index;
      parent.text = `${index}`;
    } else {
      // eslint-disable-next-line no-continue
      continue;
    }

    // if (index === 12) {
    //   parent.children = timeChildren(0, 0);
    // } else {
    parent.children = timeChildren(0, 59);
    // }
    list.push(parent);
  }
  return [list];
}
