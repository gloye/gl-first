function slider(selector) {
  //顺序，循环，速度
  var order, loop, speed;
  //容器宽度
  var len = selector.children.length;
  selector.style.width = 480 * len+'px';
  //小圆点
  var pagers = document.createElement("div");
  pagers.setAttribute('id','pagers');
  var pagerItem = document.createElement('a');
  pagerItem.setAttribute('href','javacript:;');
  //防止重绘DOM树
  var frag = document.createDocumentFragment();
  frag.appendChild(pagers);
  for(var i=0;i<len;i++){
    pagers.appendChild(pagerItem.cloneNode(true));
  }
  $('#wrapper').appendChild(frag);
  var left = selector.style.left;
  //动画
  function animation(){
    var init = false;
    if(left == -480){
      clearTimeout(init);
    }else{
      left -= 1;
      selector.style.left=left+'px';
      init = setTimeout(animation,5);
    }
  }
  setTimeout(animation,1000);
}