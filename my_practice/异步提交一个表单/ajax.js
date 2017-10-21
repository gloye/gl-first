window.addEventListener("load",function(){
  function sendData(){
    var XHR = new XMLHttpRequest();
    var FD = new FormData(form);
    XHR.addEventListener("load",function(event){
      alert(event.target.responseText);
    })
    XHR.addEventListener("error",function(event){
      alert("Oups! Something goes wrong")
    })
    XHR.open("post","http://ucommbieber.unl.edu/CORS/cors.php")
    XHR.send(FD);
  }
  var form = document.getElementById("myForm");
  form.addEventListener("submit",function(event){
    event.preventDefault();
    sendData();
  })
})