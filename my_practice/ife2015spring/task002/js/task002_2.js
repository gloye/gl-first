/**
 * Created by Shaox on 2016/3/20.
 */
//表单提交事件
$.on("#form", "submit", submitDate)
//提交事件执行函数
function submitDate(event) {
  event.preventDefault();
  var btn = event.target.elements['submit'];
  btn.disabled = true;
  var input = event.target.elements[0];
  //读取事件格式
  readDate(event);
}
//读取函数
function readDate(e) {
  var val = e.target.value || e.target.elements[0].value;
  var reg = /^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]$/;
  if (!val.match(reg)) {
    writeError("您输入的时间格式不对，请重新输入");
    var btn = document.querySelector('#submit');
    btn.disabled=false;
  } else {
    clearError();
    var nowDate = new Date();
    var userDate = new Date(val);
    var rel = userDate.getTime() - nowDate.getTime();
    var getSeconds = Math.floor(rel / 1000) % 60;
    var getMinutes = Math.floor(rel / 1000 / 60) % 60;
    var getHours = Math.floor(rel / (1000 * 60 * 60)) + (nowDate.getTimezoneOffset() / 60);
    s.innerHTML = getSeconds;
    m.innerHTML = getMinutes;
    h.innerHTML = getHours;
    automate();
  }
}
var s = $("#second;")
var m = $("#minute");
var h = $("#hour");

var timeout = false;
function automate() {
  if (timeout != false) {
    clearTimeout(timeout);
  }
  var sVal = parseInt(s.innerHTML);
  if (sVal == 0) {
    if (m.innerHTML == 0) {
      if (h.innerHTML == 0) {
        clearTimeout(timeout);
        return false;
      } else {
        m.innerHTML = 59;
        h.innerHTML = parseInt(h.innerHTML) - 1;
      }
    }else{
      m.innerHTML = parseInt(m.innerHTML)-1;
    }
    sVal = 60;
  };
  s.innerHTML = sVal - 1;
  timeout = setTimeout('automate()', 1000);
};

function clearError() {
  var el = $("#error");
  if (el) {
    el.parentNode.removeChild(el);
  }
};
function writeError(msg) {
  clearError();
  $("#submit").insertAdjacentHTML('beforebegin', '<p id="error">' + msg + '</p>');
};