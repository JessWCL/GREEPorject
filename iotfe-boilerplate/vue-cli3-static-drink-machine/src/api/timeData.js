const timeChildren = (minV, maxV) => {
  const list = [];
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
  for (let index = 0; index < 24; index++) {
    const parent = {};
    parent.value = index;
    parent.text = index < 10 ? `0${index}` : `${index}`;
    parent.children = timeChildren(0, 59);
    list.push(parent);
  }
  return [list];
}

// eg:
// [{
//     text: '00',
//     value: 0,
//     children: [{
//       value: 0,
//       text: '00'
//     }],
//   },
//   {
//     text: '01',
//     value: 1,
//     children: timeChildren(0, 59),
//   },
// ]
