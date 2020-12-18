export const preLoadImg = source => {
  const pr = [];
  const images = [];
  source.forEach(url => {
    let p = loadImage(url)
      .then(img => images.push(img))
      .catch(err => console.log(err));
    pr.push(p);
  });
  return Promise.all(pr);
};

const loadImage = url => {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
};
