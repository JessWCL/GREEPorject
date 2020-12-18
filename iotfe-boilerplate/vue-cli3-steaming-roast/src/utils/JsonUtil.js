// eslint-disable-next-line
export const getChildList = parentObj => {
  const ret = [];
  parentObj.children.forEach(ele => {
    ret.push(ele);
  });
  return ret;
};
