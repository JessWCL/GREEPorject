/*
 * @Date: 2020-05-11 13:49:09
 * @LastEditors: Feng
 * @LastEditTime: 2020-05-13 17:15:53
 * @Description: 自定义插件MyToast
 * ----------------------------------------
 * Usage:
 *  import MyToast from 'MyToast.js';
 *  const myToast = MyToast.create({...});
 *  myToast.set({...});
 *  myToast.show();
 *  myToast.hide();
 */

const defaultParams = {
  content: `My Toast!`,
  duration: 2000,
  hasMask: true,
  parentNode: null,
};

/**
 * @class MyToast
 */
class MyToast {
  constructor(params = {}) {
    this.params = Object.assign({}, defaultParams, params);
    this.id = null;
    this.node = null;
    this.nodeBox = null;
    this.durationTimer = null;
    this.hideAnimateTimer = null;

    this.init();
  }

  static create(params) {
    return new MyToast(params);
  }

  init() {
    this.id = `myToast_${Date.now()}`;
    const htmlTemplate = `
        <div class="myToast-mask"></div>
        <div class="myToast-box hide">
          <div class="myToast-content">
            ${this.params.content}
          </div>
        </div>
    `;

    let parentNode = window.document.body;
    if (this.parentNode && this.parentNode instanceof HTMLElement) {
      parentNode = this.parentNode;
    }

    const classList = ['myToast-wrapper', 'hide'];
    this.params.hasMask ? classList.push(`with-mask`) : ``;

    const div = window.document.createElement('div');
    div.classList.add(...classList);
    div.innerHTML = htmlTemplate;

    this.node = div;
    this.nodeBox = div.children[1];


    const style = window.document.createElement('style');
    const duration = 350;
    const styleTemplate = `
      .myToast-wrapper {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        pointer-events: none;
        z-index: 9999;
      }
      .myToast-wrapper.hide {
        display: none;
      }
      .myToast-wrapper .myToast-mask {
        display: none;
        pointer-events: auto;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.01);
        position: absolute;
      }
      .myToast-wrapper.with-mask .myToast-mask {
        display: block;
      }
      .myToast-wrapper .myToast-box {
        pointer-events: auto;
        position: absolute;
        bottom: 20%;
        left: 50%;
        transform: translate(-50%, 0);
        padding: 3%;
        background-color: rgba(0, 0, 0, 0.4);
        border-radius: 10px;
        max-width: 50vw;
        max-height: 90vh;
        box-sizing: border-box;
        overflow: auto;
        transition: opacity ${duration}ms;
      }
      .myToast-wrapper .myToast-box.hide {
        opacity: 0;
      }
      .myToast-wrapper .myToast-box .myToast-content {
        color: #fff;
        overflow-wrap: break-word;
      }
    `;

    style.innerHTML = styleTemplate;
    window.document.head.appendChild(style);


    parentNode.appendChild(div);
    return this;
  }

  _update(params) {
    this.nodeBox.children[0].innerHTML = params.content;
    if (this.params.hasMask) {
      this.node.classList.add('with-mask');
    } else {
      this.node.classList.remove('with-mask');
    }
    return this;
  }

  set(params) {
    this.params = Object.assign({}, this.params, params);
    this._update(this.params);
    return this;
  }

  show() {
    if (this.hideAnimateTimer) {
      clearTimeout(this.hideAnimateTimer);
      this.hideAnimateTimer = null;
    }
    if (this.durationTimer) {
      clearTimeout(this.durationTimer);
      this.durationTimer = null;
    }
    
    this.node.classList.remove('hide');
    setTimeout(() => {
      this.nodeBox.classList.remove('hide');
    }, 1);

    const duration = this.params.duration;
    if (duration) {
      this.durationTimer = setTimeout(() => {
        this.hide();
        this.durationTimer = null;
      }, duration);
    }

    return this;
  }

  hide() {
    this.nodeBox.classList.add('hide');

    if (this.hideAnimateTimer) {
      clearTimeout(this.hideAnimateTimer);
      this.hideAnimateTimer = null;
      this.node.classList.add('hide');
    } else {
      this.hideAnimateTimer = setTimeout(() => {
        this.node.classList.add('hide');
        this.hideAnimateTimer = null;
      }, 350);
    }

    return this;
  }
}

export default MyToast;
