/* eslint-disable */
!(function($) {
  require('./zepto.extend');
  for (
    var jQuery = Zepto,
      supportedCSS,
      styles = document.getElementsByTagName('head')[0].style,
      toCheck = 'transformProperty WebkitTransform OTransform msTransform MozTransform'.split(' '),
      a = 0;
    a < toCheck.length;
    a++
  )
    void 0 !== styles[toCheck[a]] && (supportedCSS = toCheck[a]);
  var IE = eval('"v"=="\x0B"');
  jQuery.fn.extend({
    rotate: function(parameters) {
      if (this.length === 0 || typeof parameters == 'undefined') {
        return;
      }
      if (typeof parameters == 'number') {
        parameters = {
          angle: parameters
        };
      }
      var returned = [];
      for (var i = 0, i0 = this.length; i < i0; i++) {
        var element = this.get(i);
        if (!element.Wilq32 || !element.Wilq32.PhotoEffect) {
          var paramClone = $.extend(true, {}, parameters);
          var newRotObject = new Wilq32.PhotoEffect(element, paramClone)._rootObj;

          returned.push($(newRotObject));
        } else {
          element.Wilq32.PhotoEffect._handleRotation(parameters);
        }
      }
      return returned;
    },
    getRotateAngle: function() {
      var ret = [];
      for (var i = 0, i0 = this.length; i < i0; i++) {
        var element = this.get(i);
        if (element.Wilq32 && element.Wilq32.PhotoEffect) {
          ret[i] = element.Wilq32.PhotoEffect._angle;
        }
      }
      return ret;
    },
    stopRotate: function() {
      for (var i = 0, i0 = this.length; i < i0; i++) {
        var element = this.get(i);
        if (element.Wilq32 && element.Wilq32.PhotoEffect) {
          clearTimeout(element.Wilq32.PhotoEffect._timer);
        }
      }
    }
  }),
    (Wilq32 = window.Wilq32 || {}),
    (Wilq32.PhotoEffect = (function() {
      return supportedCSS
        ? function(t, e) {
            (t.Wilq32 = {
              PhotoEffect: this
            }),
              (this._img = this._rootObj = this._eventObj = t),
              this._handleRotation(e);
          }
        : function(t, e) {
            if (
              ((this._img = t),
              (this._rootObj = document.createElement('span')),
              (this._rootObj.style.display = 'inline-block'),
              (this._rootObj.Wilq32 = {
                PhotoEffect: this
              }),
              t.parentNode.insertBefore(this._rootObj, t),
              t.complete)
            )
              this._Loader(e);
            else {
              var i = this;
              jQuery(this._img).bind('load', function() {
                i._Loader(e);
              });
            }
          };
    })()),
    (Wilq32.PhotoEffect.prototype = {
      _setupParameters: function(t) {
        (this._parameters = this._parameters || {}),
          'number' != typeof this._angle && (this._angle = 0),
          'number' == typeof t.angle && (this._angle = t.angle),
          (this._parameters.animateTo = 'number' == typeof t.animateTo ? t.animateTo : this._angle),
          (this._parameters.step = t.step || this._parameters.step || null),
          (this._parameters.easing =
            t.easing ||
            this._parameters.easing ||
            function(t, e, i, a, o) {
              return -a * ((e = e / o - 1) * e * e * e - 1) + i;
            }),
          (this._parameters.duration = t.duration || this._parameters.duration || 1e3),
          (this._parameters.callback = t.callback || this._parameters.callback || function() {}),
          t.bind && t.bind != this._parameters.bind && this._BindEvents(t.bind);
      },
      _handleRotation: function(t) {
        this._setupParameters(t),
          this._angle == this._parameters.animateTo ? this._rotate(this._angle) : this._animateStart();
      },
      _BindEvents: function(t) {
        if (t && this._eventObj) {
          if (this._parameters.bind) {
            var e = this._parameters.bind;
            for (var i in e) e.hasOwnProperty(i) && jQuery(this._eventObj).unbind(i, e[i]);
          }
          this._parameters.bind = t;
          for (var i in t) t.hasOwnProperty(i) && jQuery(this._eventObj).bind(i, t[i]);
        }
      },
      _Loader: (function() {
        return IE
          ? function(t) {
              var e = this._img.width,
                i = this._img.height;
              this._img.parentNode.removeChild(this._img),
                (this._vimage = this.createVMLNode('image')),
                (this._vimage.src = this._img.src),
                (this._vimage.style.height = i + 'px'),
                (this._vimage.style.width = e + 'px'),
                (this._vimage.style.position = 'absolute'),
                (this._vimage.style.top = '0px'),
                (this._vimage.style.left = '0px'),
                (this._container = this.createVMLNode('group')),
                (this._container.style.width = e),
                (this._container.style.height = i),
                (this._container.style.position = 'absolute'),
                this._container.setAttribute('coordsize', e - 1 + ',' + (i - 1)),
                this._container.appendChild(this._vimage),
                this._rootObj.appendChild(this._container),
                (this._rootObj.style.position = 'relative'),
                (this._rootObj.style.width = e + 'px'),
                (this._rootObj.style.height = i + 'px'),
                this._rootObj.setAttribute('id', this._img.getAttribute('id')),
                (this._rootObj.className = this._img.className),
                (this._eventObj = this._rootObj),
                this._handleRotation(t);
            }
          : function(t) {
              this._rootObj.setAttribute('id', this._img.getAttribute('id')),
                (this._rootObj.className = this._img.className),
                (this._width = this._img.width),
                (this._height = this._img.height),
                (this._widthHalf = this._width / 2),
                (this._heightHalf = this._height / 2);
              var e = Math.sqrt(this._height * this._height + this._width * this._width);
              (this._widthAdd = e - this._width),
                (this._heightAdd = e - this._height),
                (this._widthAddHalf = this._widthAdd / 2),
                (this._heightAddHalf = this._heightAdd / 2),
                this._img.parentNode.removeChild(this._img),
                (this._aspectW = (parseInt(this._img.style.width, 10) || this._width) / this._img.width),
                (this._aspectH = (parseInt(this._img.style.height, 10) || this._height) / this._img.height),
                (this._canvas = document.createElement('canvas')),
                this._canvas.setAttribute('width', this._width),
                (this._canvas.style.position = 'relative'),
                (this._canvas.style.left = -this._widthAddHalf + 'px'),
                (this._canvas.style.top = -this._heightAddHalf + 'px'),
                (this._canvas.Wilq32 = this._rootObj.Wilq32),
                this._rootObj.appendChild(this._canvas),
                (this._rootObj.style.width = this._width + 'px'),
                (this._rootObj.style.height = this._height + 'px'),
                (this._eventObj = this._canvas),
                (this._cnv = this._canvas.getContext('2d')),
                this._handleRotation(t);
            };
      })(),
      _animateStart: function() {
        this._timer && clearTimeout(this._timer),
          (this._animateStartTime = +new Date()),
          (this._animateStartAngle = this._angle),
          this._animate();
      },
      _animate: function() {
        var t = +new Date(),
          e = t - this._animateStartTime > this._parameters.duration;
        if (e && !this._parameters.animatedGif) clearTimeout(this._timer);
        else {
          if (this._canvas || this._vimage || this._img) {
            var i = this._parameters.easing(
              0,
              t - this._animateStartTime,
              this._animateStartAngle,
              this._parameters.animateTo - this._animateStartAngle,
              this._parameters.duration
            );
            this._rotate(~~(10 * i) / 10);
          }
          this._parameters.step && this._parameters.step(this._angle);
          var a = this;
          this._timer = setTimeout(function() {
            a._animate.call(a);
          }, 10);
        }
        this._parameters.callback &&
          e &&
          ((this._angle = this._parameters.animateTo),
          this._rotate(this._angle),
          this._parameters.callback.call(this._rootObj));
      },
      _rotate: (function() {
        var t = Math.PI / 180;
        return IE
          ? function(t) {
              (this._angle = t), (this._container.style.rotation = (t % 360) + 'deg');
            }
          : supportedCSS
          ? function(t) {
              (this._angle = t), (this._img.style[supportedCSS] = 'rotate3d(0,0,1,' + (t % 360) + 'deg)');
            }
          : function(e) {
              (this._angle = e),
                (e = (e % 360) * t),
                (this._canvas.width = this._width + this._widthAdd),
                (this._canvas.height = this._height + this._heightAdd),
                this._cnv.translate(this._widthAddHalf, this._heightAddHalf),
                this._cnv.translate(this._widthHalf, this._heightHalf),
                this._cnv.rotate(e),
                this._cnv.translate(-this._widthHalf, -this._heightHalf),
                this._cnv.scale(this._aspectW, this._aspectH),
                this._cnv.drawImage(this._img, 0, 0);
            };
      })()
    }),
    IE &&
      (Wilq32.PhotoEffect.prototype.createVMLNode = (function() {
        document.createStyleSheet().addRule('.rvml', 'behavior:url(#default#VML)');
        try {
          return (
            !document.namespaces.rvml && document.namespaces.add('rvml', 'urn:schemas-microsoft-com:vml'),
            function(t) {
              return document.createElement('<rvml:' + t + ' class="rvml">');
            }
          );
        } catch (t) {
          return function(t) {
            return document.createElement('<' + t + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
          };
        }
      })());
})(Zepto);
