/**
 * Created by admin on 2016/3/17.
 */
//stage1
/*function submit(event) {
 event.preventDefault();
 var val = event.target.querySelector("#input").value;
 var arr = val.trim().split(",");
 $("#result").innerHTML = uniqArray(arr);
 }*/
//stage2
/*function submit(event) {
 event.preventDefault();
 var val = event.target.querySelector("#input").value;
 var reg = /\s|；|;|、|，/g;
 var arr= val.replace(reg,",").split(",");
 $("#result").innerHTML = uniqArray(arr) ;
 }*/
//stage3
function readError(e) {
  var val = e.target.value|| e.target.elements[0].value;
  var reg = /\s|；|;|、|，/g;
  var arr = val.replace(reg, ",").split(",");
  if (val.length < 1) {
    writeError("不能为空");
  } else if (arr.length > 10) {
    writeError("数目不能超过10");
  } else {
    clearError();
    $("#result").innerHTML = uniqArray(arr);
  }
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
function submitForm(event) {
  event.preventDefault();
  var btn = event.target.elements['submit'];
  btn.disabled = true;
  readError(event);
  var input = event.target.elements[0];
  $.on(input, "change", readError);
}
//$.on("#input", "change", readError);
$.on("#form", "submit", submitForm);
