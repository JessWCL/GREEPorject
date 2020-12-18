/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
  // Application Constructor
  initialize: function() {
    console.log('initialize========================================initialize');
    this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    console.log('bindEvents========================================bindEvents');
    document.addEventListener('deviceready', this.onDeviceReady, false);
    //console.log("==================================bindEvents");
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    console.log(
      'onDeviceReady========================================onDeviceReady'
    );
    navigator.PluginInterface.onCallBack(onCallBack);
    //监听安卓后退键
    document.addEventListener(
      'backbutton',
      function() {
        backButton();
      },
      false
    );
    init();
    initVconsole();
  },
  // Update DOM on a Received Event
  receivedEvent: function(id) {}
};

function onCallBack(result) {
  console.log('onCallBack:' + result);
  var ret = JSON.parse(result);
  if (ret[0] == 'onResume') {
    onResume();
  } else if (ret[0] == 'updateKeyValue') {
    for (var i = 1; i < ret.length; i++) {
      var data = JSON.parse(ret[i]);
      updateKeyValue(data.key, data.value);
    }
  } else if (ret[0] == 'onFocus') {
    onReFocus();
  } else if (ret[0] == 'onBackPressed') {
    backButton();
  } else if (ret[0] === 'onToPage') {
    onToPage(ret); // ret: ['onToPage', 'pathName', { ...params } ]
  } else if (ret[0] == 'onSceneListUpdate') {
    onSceneList();
  } else if (ret[0] == 'onMusicActivityFinish') {
    updataMusicStatus();
  }
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>222:' + result);
}

try {
  console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');
  app.initialize();
} catch (e) {
  console.log(e);
}

/**
* 加载script文件
* @param url
* @param callback
*/
function loadScript (url, callback) {
  const script = document.createElement('script');
  script.src = url;
  // 加载之后立即执行
  script.onload = function () {
    callback && callback();
  };
  document.body.appendChild(script);
}

var tryDebugCount = 10;
var loggerTimer = 0;
function initVconsole () {
  if (tryDebugCount <= 0) return;
  try {
    tryDebugCount -= 1;
    var loggerDom = document.querySelector('.left-arrow');
    loggerDom.addEventListener('touchstart', function () {
      loggerTimer && clearTimeout(loggerTimer);
      loggerTimer = setTimeout(function () {
        loadScript('https://cdn.jsdelivr.net/npm/vconsole', function () {
          // eslint-disable-next-line no-undef
          new VConsole();
        });
      }, 1000 * 5);
    });
    loggerDom.addEventListener('touchmove', function () {
      loggerTimer && clearTimeout(loggerTimer);
    });
    loggerDom.addEventListener('touchend', function () {
      loggerTimer && clearTimeout(loggerTimer);
    });
  } catch (e) {
    console.log(e);
    setTimeout(function () {
      initVconsole();
    }, 1000);
  }
}
