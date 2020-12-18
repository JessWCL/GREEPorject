/**
 * @description Monitors an element and scrolls to the bottom if a new child is added
 * @Usage
 * smooth：smooth(平滑滚动),instant(瞬间滚动)
 * always：Prevent scroll down when user has scrolled up & smooth scrolling
 * scrollonremoved：If you have a "loading" animation that disappears when you receive a message from an external source, use the scrollonremoved option to ensure the scroll will happen after the element has been removed
 */

const scrollToBottom = (el, smooth) => {
  if (typeof el.scroll === 'function') {
    el.scroll({
      top: el.scrollHeight,
      behavior: !smooth ? 'smooth' : 'instant'
    });
  } else {
    // eslint-disable-next-line no-param-reassign
    el.scrollTop = el.scrollHeight;
  }
};

const ChatScroll = {
  bind: (el, binding) => {
    let scrolled = false;

    el.addEventListener('scroll', () => {
      scrolled = el.scrollTop + el.clientHeight + 1 < el.scrollHeight;
    });

    new MutationObserver(e => {
      const config = binding.value || {};
      const pause = config.always === false && scrolled;
      if (config.scrollonremoved) {
        if (
          pause ||
          (e[e.length - 1].addedNodes.length !== 1 &&
            e[e.length - 1].removedNodes.length !== 1)
        ) {
          return;
        }
      } else if (pause || e[e.length - 1].addedNodes.length !== 1) {
        return;
      }
      scrollToBottom(el, config.smooth);
    }).observe(el, { childList: true, subtree: true });
  },
  inserted: scrollToBottom
};

export default ChatScroll;
