
const myFunc = {
  getHtmlName() {
    let htmlname = '';
    const path = decodeURI(window.location.pathname);
    const pathArr = path.split('/');
    const filename = pathArr.filter(el => {
      return el.indexOf('html') !== -1;
    })[0];
    if (filename) {
      htmlname = filename.replace('.html', '');
    }
    return htmlname;
  }
};

export default myFunc;
