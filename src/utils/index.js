export const ready = function (callback) {
  // 如果jsbridge已经注入则直接调用
  if (window.AlipayJSBridge) {
    callback && callback();
  } else {
    // 如果没有注入则监听注入的事件
    document.addEventListener('AlipayJSBridgeReady', callback, false);
  }
}

// 获取url
export const getQueryString = string => {
  var reg = new RegExp('(^|&)' + string + '=([^&]*)(&|$)', 'i');
  var r = window.location.href.match(reg);
  if (r != null) {
    return decodeURI(r[2]);
  }
  return "";
}
