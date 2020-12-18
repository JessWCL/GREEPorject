<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
};
</script>

<script>
// rem 适配
(function(document, window) {
  var baseFontSize = 10;
  var baseWidth = 320;
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  var set = function() {
    var clientWidth = document.documentElement.clientWidth || window.innerWidth;
    var rem = 10;
    if (clientWidth != baseWidth) {
      rem = Math.floor(clientWidth / baseWidth * baseFontSize);
    }
    document.querySelector('html').style.fontSize = rem + 'px';
  }
  set();
  window.addEventListener(resizeEvt, set);
}(document, window));
</script>

<style lang="sass">
@import '../node_modules/mint-ui/lib/style.css';
</style>

<style>
@import url('./assets/css/bootstrap.min.css');
* {
  margin: 0;
  padding: 0;

  -webkit-touch-callout:none;

  user-select: none;
  -webkit-user-select:none;
  -khtml-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
}
html * {
  outline: 0;
  -webkit-text-size-adjust: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

html, body {
  overflow-x: hidden;
  height: 100%; width: 100%;
  font-family: appleLight, appleUltralight;
}
body { background: #f4f4f4; }

.btn-myerror { color: #404657; background: #fff; box-shadow: rgba(0, 0, 0, .1) 2px 0 13px; }

</style>
