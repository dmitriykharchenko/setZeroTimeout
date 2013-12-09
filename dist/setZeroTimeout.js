var setZeroTimeout;

setZeroTimeout = new function() {
  var counter, handleMessage, messageName, timeouts, zeroTimeoutsCount;
  timeouts = [];
  messageName = "zero-timeout-message-" + new Date().getTime();
  zeroTimeoutsCount = 1000;
  counter = 0;
  handleMessage = function(event) {
    var fn;
    if (event.data === messageName) {
      event.cancelBubble = true;
      event.returnValue = false;
      if (typeof event.stopPropagation === "function") {
        event.stopPropagation();
      }
      if (typeof event.preventDefault === "function") {
        event.preventDefault();
      }
      if (0 < timeouts.length) {
        fn = timeouts.shift();
        return fn();
      }
    }
  };
  if (window.addEventListener) {
    window.addEventListener("message", handleMessage, true);
  } else if (window.attachEvent) {
    zeroTimeoutsCount = 0;
    window.attachEvent("onmessage", handleMessage);
  }
  return function(fn) {
    counter--;
    if (counter < 0) {
      counter = zeroTimeoutsCount;
      return setTimeout(fn, 10);
    } else {
      timeouts.push(fn);
      return window.postMessage(messageName, "*");
    }
  };
};
