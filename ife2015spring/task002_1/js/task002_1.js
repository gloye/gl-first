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
function submit(event) {
  event.preventDefault();
  function writeError() {
    var el = $("#error");
    if (el) {
      el.parentNode.removeChild(el);
    }
    $("#submit").insertAdjacentHTML('beforebegin', '<p id="error">请重新输入</p>');
  }
}
$.on("#form", "submit", submit);
