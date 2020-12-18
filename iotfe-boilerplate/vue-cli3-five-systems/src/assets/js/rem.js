// eslint-disable-next-line
(function () {
  const baseSize = 192;
  function setRem() {
    const scale = document.documentElement.clientWidth / 1920;
    document.documentElement.style.fontSize = (baseSize * scale) + 'px';
  }
  setRem();
  window.addEventListener('resize', () => {
    setRem();
  });
}());
